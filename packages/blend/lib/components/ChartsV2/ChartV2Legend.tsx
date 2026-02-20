import { useEffect, useState, useCallback, useMemo } from 'react'
import Highcharts from 'highcharts'
import type {
    ChartV2LegendProps,
    ChartV2LegendItem,
    ChartV2,
    ChartV2ReactRefObject,
} from './chartV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import Text from '../Text/Text'
import Seperator from '../common/Seperator'

// --- Helpers ---

function getLegendItems(chart: ChartV2 | null): ChartV2LegendItem[] {
    if (!chart) return []
    const series = chart.series ?? []
    const pie = series.find(
        (s) => (s as Highcharts.Series).options?.type === 'pie'
    )
    if (pie?.points?.length) {
        return pie.points.filter(
            (p) =>
                (
                    p.options as Highcharts.PointOptionsObject & {
                        showInLegend?: boolean
                    }
                )?.showInLegend !== false
        ) as ChartV2LegendItem[]
    }
    return (
        (chart.legend?.allItems?.length
            ? chart.legend.allItems
            : series) as ChartV2LegendItem[]
    ).filter(
        (s) => (s as Highcharts.Series).options?.showInLegend !== false
    ) as ChartV2LegendItem[]
}

function applyHoverState(
    items: ChartV2LegendItem[],
    hovered: ChartV2LegendItem | null
) {
    items.forEach((item) => {
        const isHovered = hovered === item
        const series = item as Highcharts.Series
        const point = item as Highcharts.Point

        if (series.points && (series.options?.type as string) !== 'pie') {
            if (isHovered) series.setState('hover')
            else if (hovered) series.setState('inactive')
            else series.setState(undefined)
        } else if (typeof point.setState === 'function') {
            try {
                if (isHovered) point.setState('hover')
                else if (!hovered) point.setState(undefined)
            } catch {
                /* Pie: setState('inactive') throws */
            }
        }
    })
}

function useChartRefs(
    refs: ReadonlyArray<React.RefObject<{ chart?: ChartV2 } | null>>
): ChartV2[] {
    const [charts, setCharts] = useState<ChartV2[]>([])
    useEffect(() => {
        const poll = () => {
            const next: ChartV2[] = []
            for (const r of refs) {
                const ch = r.current?.chart
                if (ch) next.push(ch)
            }
            if (next.length === refs.length) {
                setCharts(next)
                return true
            }
            return false
        }
        if (!poll()) {
            const id = setInterval(poll, 50)
            return () => clearInterval(id)
        }
    }, [refs])
    return charts
}

// --- Component ---

const ChartV2Legend = ({
    chartRef,
    chartRefs,
    customLegendItems,
    renderItem,
    layout = 'horizontal',
}: ChartV2LegendProps) => {
    const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
    const legends = tokens.legends
    const refList = useMemo(
        () =>
            chartRefs?.length
                ? (chartRefs as Array<
                      React.RefObject<ChartV2ReactRefObject | null>
                  >)
                : chartRef
                  ? [chartRef]
                  : [],
        [chartRef, chartRefs]
    )
    const charts = useChartRefs(refList)
    const chart = charts[0] ?? null

    const [hoveredItem, setHoveredItem] = useState<ChartV2LegendItem | null>(
        null
    )

    const [redrawKey, setRedrawKey] = useState(0)
    const allItems = useMemo(() => getLegendItems(chart), [chart])

    useEffect(() => {
        if (!chart) return
        const unsub = Highcharts.addEvent(chart, 'redraw', () =>
            setRedrawKey((k) => k + 1)
        ) as () => void
        return unsub
    }, [chart])

    useEffect(() => {
        if (!charts.length) return
        const unsubs: Array<() => void> = []
        charts.forEach((ch) => {
            ch.series?.forEach((s, seriesIndex) => {
                const canonicalItem =
                    allItems[seriesIndex] ?? (s as ChartV2LegendItem)
                const setHover = () => setHoveredItem(canonicalItem)
                unsubs.push(
                    Highcharts.addEvent(s, 'mouseOver', setHover) as () => void,
                    Highcharts.addEvent(s, 'mouseOut', () =>
                        setHoveredItem(null)
                    ) as () => void
                )
                s.points?.forEach((p) => {
                    const item =
                        (s.options?.type as string) === 'pie'
                            ? (p as ChartV2LegendItem)
                            : (s as ChartV2LegendItem)
                    const canonical =
                        (s.options?.type as string) === 'pie'
                            ? (allItems.find(
                                  (a) =>
                                      (a as Highcharts.Point).name ===
                                      (p as Highcharts.Point).name
                              ) ?? item)
                            : canonicalItem
                    unsubs.push(
                        Highcharts.addEvent(p, 'mouseOver', () =>
                            setHoveredItem(canonical)
                        ) as () => void,
                        Highcharts.addEvent(p, 'mouseOut', () =>
                            setHoveredItem(null)
                        ) as () => void
                    )
                })
            })
        })
        return () => unsubs.forEach((u) => u())
    }, [charts, redrawKey, allItems])

    useEffect(() => {
        if (!allItems.length) return
        if (charts.length <= 1) {
            applyHoverState(allItems, hoveredItem)
            return
        }
        const hoveredIndex = hoveredItem ? allItems.indexOf(hoveredItem) : -1
        charts.forEach((ch) => {
            const items = getLegendItems(ch)
            const target =
                hoveredIndex >= 0 ? (items[hoveredIndex] ?? null) : null
            applyHoverState(items, target)
        })
    }, [hoveredItem, allItems, charts])

    const handleClick = useCallback(
        (item: ChartV2LegendItem, itemIndex: number) => {
            const nextVisible = !item.visible
            charts.forEach((ch) => {
                const items = getLegendItems(ch)
                const target = items[itemIndex]
                if (target && 'setVisible' in target) {
                    target.setVisible(nextVisible)
                }
                ch.redraw()
            })
        },
        [charts]
    )

    if (!chart || !allItems.length) return null

    const isVertical = layout === 'vertical'

    return (
        <Block
            as="div"
            display="flex"
            flexDirection={isVertical ? 'column' : 'row'}
            flexWrap="wrap"
            gap={isVertical ? 8 : 16}
            alignItems={isVertical ? 'stretch' : 'center'}
            role="list"
            aria-label="Chart legend"
        >
            {allItems.map((item, i) => {
                const key = item.name ?? ''
                const custom = customLegendItems?.find((c) => c.key === key)
                const name = custom?.name ?? key
                const value = custom?.value
                const hasValue = value != null && value !== ''
                const color =
                    custom?.color ??
                    (item as { color?: string }).color ??
                    '#888'
                const visible = Boolean(item.visible)
                const isDimmed = hoveredItem !== null && hoveredItem !== item
                const opacity = !visible ? 0.5 : isDimmed ? 0.3 : 1

                const handlers = {
                    onClick: () => handleClick(item, i),
                    onMouseEnter: () => setHoveredItem(item),
                    onMouseLeave: () => setHoveredItem(null),
                }

                if (renderItem) {
                    return (
                        <Block
                            as="span"
                            key={`${key}-${i}`}
                            role="listitem"
                            opacity={opacity}
                            transition="opacity 0.2s ease"
                            {...handlers}
                        >
                            {renderItem({
                                item,
                                name,
                                visible,
                                color,
                                value,
                                onClick: handlers.onClick,
                            })}
                        </Block>
                    )
                }

                return (
                    <PrimitiveButton
                        key={`${key}-${i}`}
                        display="inline-flex"
                        alignItems="center"
                        gap={8}
                        padding={0}
                        margin={0}
                        backgroundColor="transparent"
                        border="none"
                        cursor="pointer"
                        color="inherit"
                        opacity={opacity}
                        transition="opacity 0.2s ease"
                        role="listitem"
                        {...handlers}
                    >
                        <Block
                            as="span"
                            width={12}
                            height={12}
                            borderRadius={4}
                            flexShrink={0}
                            backgroundColor={color}
                            opacity={isDimmed ? 0.3 : 1}
                            transition="opacity 0.2s ease"
                            aria-hidden
                        />
                        <Block
                            as="span"
                            display="inline-flex"
                            alignItems="center"
                            gap={4}
                        >
                            <Text
                                data-legend="label"
                                fontSize={legends.name.fontSize}
                                fontWeight={legends.name.fontWeight}
                                color={legends.name.color}
                                lineHeight={`${legends.name.lineHeight}px`}
                            >
                                {name}
                            </Text>
                            {hasValue && (
                                <>
                                    <Seperator
                                        color={legends.separator.color}
                                        height="9px"
                                        width="1px"
                                    />
                                    <Text
                                        data-legend="value"
                                        fontSize={legends.value.fontSize}
                                        fontWeight={legends.value.fontWeight}
                                        color={legends.value.color}
                                        lineHeight={`${legends.value.lineHeight}px`}
                                    >
                                        {value}
                                    </Text>
                                </>
                            )}
                        </Block>
                    </PrimitiveButton>
                )
            })}
        </Block>
    )
}

ChartV2Legend.displayName = 'ChartV2Legend'

export default ChartV2Legend
