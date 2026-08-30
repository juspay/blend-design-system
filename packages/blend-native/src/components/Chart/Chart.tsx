import { forwardRef, useMemo, useState, useCallback } from 'react'
import type { View as RNView, LayoutChangeEvent } from 'react-native'
import { View } from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryArea,
    VictoryBar,
    VictoryScatter,
    VictoryPie,
    VictoryAxis,
    VictoryGroup,
} from 'victory-native'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import ChartContainer from './ChartContainer'
import ChartHeader from './ChartHeader'
import ChartSkeleton from './ChartSkeleton'
import ChartNoData from './ChartNoData'
import ChartLegend from './ChartLegend'
import { buildLegendItems, paletteColor } from './chart.types'
import type { ChartNativeProps } from './chart.types'

const DEFAULT_HEIGHT = 400
const DEFAULT_STROKE_WIDTH = 2

/**
 * Full-featured chart component — the native port of web's `Chart`.
 *
 * Supports line, area, bar/column, scatter, pie, and donut charts. Uses
 * `victory-native` for rendering; styled from `CHARTSV2` tokens.
 *
 * For the minimal sparkline inside `StatCard`, see `Chart` from `../Chart`.
 */
const Chart = forwardRef<RNView, ChartNativeProps>(function Chart(
    {
        type,
        series,
        data: pieData,
        height = DEFAULT_HEIGHT,
        showLegend,
        showGrid = true,
        showXAxis = true,
        showYAxis = true,
        onLegendToggle,
        hiddenKeys: controlledHiddenKeys,
        centerLabel,
        centerValue,
        skeleton,
        noData,
        header,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')
    const ct = tokens.chart

    // --- Hidden keys (controlled or uncontrolled) -------------------------
    const isControlled = controlledHiddenKeys !== undefined
    const [internalHidden, setInternalHidden] = useState<string[]>([])
    const hiddenKeys = isControlled ? controlledHiddenKeys : internalHidden

    const handleLegendToggle = useCallback(
        (key: string) => {
            if (!isControlled) {
                setInternalHidden((prev) =>
                    prev.includes(key)
                        ? prev.filter((k) => k !== key)
                        : [...prev, key]
                )
            }
            onLegendToggle?.(key)
        },
        [isControlled, onLegendToggle]
    )

    // --- Determine data -----------------------------------------------
    const isPie = type === 'pie' || type === 'donut'
    const hasData = isPie
        ? (pieData ?? []).length > 0
        : (series ?? []).some((s) => s.data.length > 0)

    // --- Filter out hidden series/pie slices ------------------------------
    const hidden = useMemo(() => new Set(hiddenKeys), [hiddenKeys])
    const visibleSeries = useMemo(
        () => (series ?? []).filter((s) => !hidden.has(s.name)),
        [series, hidden]
    )
    const visiblePieData = useMemo(
        () => (pieData ?? []).filter((s) => !hidden.has(s.label)),
        [pieData, hidden]
    )

    // --- Legend items ---------------------------------------------------
    const legendItems = useMemo(
        () => buildLegendItems(type, series, pieData, hiddenKeys),
        [type, series, pieData, hiddenKeys]
    )
    const shouldShowLegend =
        showLegend ??
        (isPie ? visiblePieData.length > 1 : visibleSeries.length > 1)

    // --- Layout measurement -------------------------------------------
    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>()
    const onLayout = (event: LayoutChangeEvent) => {
        const w = event.nativeEvent.layout.width
        if (w > 0 && w !== measuredWidth) setMeasuredWidth(w)
    }

    // --- Skeleton / No-data --------------------------------------------------
    if (skeleton?.show) {
        return (
            <ChartContainer>
                {header ? <ChartHeader>{header}</ChartHeader> : null}
                <ChartSkeleton height={height} />
            </ChartContainer>
        )
    }

    if (!hasData) {
        return (
            <ChartContainer>
                {header ? <ChartHeader>{header}</ChartHeader> : null}
                <ChartNoData
                    title={noData?.title ?? 'No data available'}
                    subtitle={
                        noData?.subtitle ??
                        'Data will appear here once available'
                    }
                    slot={noData?.slot}
                />
            </ChartContainer>
        )
    }

    // --- Axis styles (from tokens) ------------------------------------------
    const axisLabelStyle = {
        fill: String(ct.xAxis.labels.color),
        fontSize: parseDimension(ct.xAxis.labels.fontSize as string | number),
        fontFamily: undefined as string | undefined,
    }

    const axisStyle = {
        axis: {
            stroke: String(ct.xAxis.line.color),
            strokeWidth: parseDimension(ct.xAxis.line.width as string | number),
        },
        tickLabels: axisLabelStyle,
        grid: {
            stroke: showGrid ? String(ct.yAxis.gridLine.color) : 'transparent',
            strokeWidth: showGrid
                ? parseDimension(ct.yAxis.gridLine.width as string | number)
                : 0,
        },
        ticks: { size: 0 },
    }

    const dependentAxisStyle = {
        axis: { stroke: 'transparent' },
        tickLabels: axisLabelStyle,
        grid: {
            stroke: showGrid ? String(ct.yAxis.gridLine.color) : 'transparent',
            strokeWidth: showGrid
                ? parseDimension(ct.yAxis.gridLine.width as string | number)
                : 0,
        },
        ticks: { size: 0 },
    }

    // --- Series data in Victory format ----------------------------------------
    const victorySeries = visibleSeries.map((s, i) => ({
        name: s.name,
        data: s.data.map((d) => ({
            x: String(d.x),
            y: d.y,
        })),
        color: s.color ?? paletteColor(i),
    }))

    // --- Render helpers -----------------------------------------------

    const renderSeriesChart = () => {
        if (!measuredWidth) {
            return (
                <View
                    onLayout={onLayout}
                    style={{
                        width: '100%',
                        height,
                        backgroundColor: 'transparent',
                    }}
                />
            )
        }

        const domainPadding = { x: 20, y: 10 }

        if (type === 'bar' || type === 'column') {
            // Grouped bars: VictoryGroup splits each category band into N
            // equal slices (offset = the pixel width of each slice). Give the
            // group a fixed barWidth so bars keep a gap between series within
            // a category, and let domainPadding x widen the bands so
            // categories aren't jammed edge-to-edge.
            const isHorizontal = type === 'bar'
            const groupOffset = 16
            const barWidth = 12

            // When `horizontal` is on, Victory keeps the *roles* of the two
            // axis components but rotates their placement: the independent
            // (categories) axis ends up on the left, the dependent (value)
            // axis on the bottom. Match that with the paddings and which
            // one hosts the category labels, so 'Q4'/'Q1' sit on the left
            // like on web, and numeric ticks stay on the bottom.
            return (
                <View onLayout={onLayout} style={{ width: '100%' }}>
                    <VictoryChart
                        width={measuredWidth}
                        height={height}
                        padding={{
                            top: 8,
                            bottom: 40,
                            // Categories sit on the *left* for horizontal bars —
                            // they need a wider lane than the 8px default.
                            left: isHorizontal ? 60 : showYAxis ? 50 : 8,
                            right: 8,
                        }}
                        domainPadding={{ x: 40, y: 10 }}
                        horizontal={isHorizontal}
                    >
                        {/* Independent axis — category labels ('Q1', 'Jan').
                            No grid: web only shows horizontal grid lines for
                            column charts, vertical ones are noise in both. */}
                        <VictoryAxis
                            style={{
                                axis: axisStyle.axis,
                                tickLabels: showXAxis
                                    ? axisStyle.tickLabels
                                    : { fill: 'transparent' },
                                grid: {
                                    stroke: 'transparent',
                                    strokeWidth: 0,
                                },
                                ticks: axisStyle.ticks,
                            }}
                        />
                        {/* Dependent axis — numeric scale + grid lines. For
                            horizontal bars its ticks land on the bottom;
                            the grid runs vertically, which still reads as
                            web's "horizontal grid" orientation flipped. */}
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axis: dependentAxisStyle.axis,
                                tickLabels: showYAxis
                                    ? dependentAxisStyle.tickLabels
                                    : { fill: 'transparent' },
                                grid: dependentAxisStyle.grid,
                                ticks: dependentAxisStyle.ticks,
                            }}
                        />
                        <VictoryGroup
                            offset={groupOffset}
                            horizontal={isHorizontal}
                        >
                            {victorySeries.map((s) => (
                                <VictoryBar
                                    key={s.name}
                                    data={s.data}
                                    horizontal={isHorizontal}
                                    barWidth={barWidth}
                                    style={{
                                        data: {
                                            fill: s.color,
                                        },
                                    }}
                                    cornerRadius={4}
                                />
                            ))}
                        </VictoryGroup>
                    </VictoryChart>
                </View>
            )
        }

        if (type === 'scatter') {
            return (
                <View onLayout={onLayout} style={{ width: '100%' }}>
                    <VictoryChart
                        width={measuredWidth}
                        height={height}
                        padding={{
                            top: 8,
                            bottom: 40,
                            left: showYAxis ? 50 : 8,
                            right: 8,
                        }}
                        domainPadding={domainPadding}
                    >
                        <VictoryAxis
                            style={{
                                axis: axisStyle.axis,
                                tickLabels: showXAxis
                                    ? axisStyle.tickLabels
                                    : { fill: 'transparent' },
                                grid: {
                                    stroke: 'transparent',
                                    strokeWidth: 0,
                                },
                                ticks: axisStyle.ticks,
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axis: dependentAxisStyle.axis,
                                tickLabels: showYAxis
                                    ? dependentAxisStyle.tickLabels
                                    : { fill: 'transparent' },
                                grid: dependentAxisStyle.grid,
                                ticks: dependentAxisStyle.ticks,
                            }}
                        />
                        {victorySeries.map((s) => (
                            <VictoryScatter
                                key={s.name}
                                data={s.data}
                                size={4}
                                style={{
                                    data: { fill: s.color },
                                }}
                            />
                        ))}
                    </VictoryChart>
                </View>
            )
        }

        // line / area
        return (
            <View onLayout={onLayout} style={{ width: '100%' }}>
                <VictoryChart
                    width={measuredWidth}
                    height={height}
                    padding={{
                        top: 8,
                        bottom: 40,
                        left: showYAxis ? 50 : 8,
                        right: 8,
                    }}
                    domainPadding={domainPadding}
                >
                    <VictoryAxis
                        style={{
                            axis: axisStyle.axis,
                            tickLabels: showXAxis
                                ? axisStyle.tickLabels
                                : { fill: 'transparent' },
                            grid: {
                                stroke: 'transparent',
                                strokeWidth: 0,
                            },
                            ticks: axisStyle.ticks,
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{
                            axis: dependentAxisStyle.axis,
                            tickLabels: showYAxis
                                ? dependentAxisStyle.tickLabels
                                : { fill: 'transparent' },
                            grid: dependentAxisStyle.grid,
                            ticks: dependentAxisStyle.ticks,
                        }}
                    />
                    {victorySeries.map((s) => (
                        <VictoryLine
                            key={s.name}
                            data={s.data}
                            interpolation="monotoneX"
                            style={{
                                data: {
                                    stroke: s.color,
                                    strokeWidth: DEFAULT_STROKE_WIDTH,
                                },
                            }}
                        />
                    ))}
                    {type === 'area' &&
                        victorySeries.map((s) => (
                            <VictoryArea
                                key={`area-${s.name}`}
                                data={s.data}
                                interpolation="monotoneX"
                                style={{
                                    data: {
                                        fill: s.color,
                                        fillOpacity: 0.15,
                                        // VictoryArea strokes the entire
                                        // closed path (including baseline)
                                        // by default — suppress it so only
                                        // the fill shows; the top edge is
                                        // drawn by VictoryLine above.
                                        stroke: 'transparent',
                                    },
                                }}
                            />
                        ))}
                </VictoryChart>
            </View>
        )
    }

    const renderPieChart = () => {
        const radius = Math.min(measuredWidth ?? 200, height) / 2 - 8
        const innerRadius = type === 'donut' ? radius * 0.65 : 0

        const pieDataFormatted = visiblePieData.map((s) => ({
            x: s.label,
            y: s.value,
        }))

        const colorScale = visiblePieData.map(
            (s, i) => s.color ?? paletteColor(i)
        )

        if (measuredWidth) {
            return (
                <View onLayout={onLayout} style={{ alignItems: 'center' }}>
                    <VictoryPie
                        data={pieDataFormatted}
                        width={measuredWidth}
                        height={height}
                        radius={radius}
                        innerRadius={innerRadius}
                        colorScale={colorScale}
                        labels={() => null}
                        style={{
                            data: {
                                strokeWidth: 0,
                            },
                        }}
                    />
                    {type === 'donut' && (centerLabel || centerValue) && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            pointerEvents="none"
                        >
                            <Text
                                fontSize={24}
                                fontWeight={700}
                                color={String(ct.xAxis.title.color)}
                            >
                                {centerValue}
                            </Text>
                            {centerLabel ? (
                                <Text
                                    fontSize={12}
                                    fontWeight={400}
                                    color={String(ct.xAxis.labels.color)}
                                >
                                    {centerLabel}
                                </Text>
                            ) : null}
                        </View>
                    )}
                </View>
            )
        }
        return (
            <View
                onLayout={onLayout}
                style={{
                    width: '100%',
                    height,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        )
    }

    return (
        <ChartContainer ref={ref} style={style}>
            {header ? <ChartHeader>{header}</ChartHeader> : null}
            <View
                style={{
                    padding: 16,
                    gap: 12,
                    backgroundColor: String(ct.backgroundColor),
                }}
                accessibilityLabel={
                    accessibilityLabel ??
                    `${type} chart with ${visibleSeries.length || visiblePieData.length} series`
                }
                testID={testID}
            >
                {isPie ? renderPieChart() : renderSeriesChart()}
                {shouldShowLegend && (
                    <ChartLegend
                        items={legendItems}
                        onToggle={handleLegendToggle}
                    />
                )}
            </View>
        </ChartContainer>
    )
})

Chart.displayName = 'Chart'

export default Chart
