import { useCallback, useEffect, useMemo, useState } from 'react'
import Highcharts from 'highcharts'
import type { ChartV2, ChartV2LegendItem } from './chartV2.types'
import { applyHoverState, getLegendItems } from './utils'

export const useChartLegendHover = (
    chart: ChartV2 | null,
    charts: ChartV2[]
) => {
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
                const isPie = (s.options?.type as string) === 'pie'
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
                    const item = isPie
                        ? (p as ChartV2LegendItem)
                        : (s as ChartV2LegendItem)
                    const canonical = isPie
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

    return { hoveredItem, setHoveredItem, allItems, handleClick }
}
