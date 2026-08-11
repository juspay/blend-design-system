import { useCallback, useEffect, useMemo, useState } from 'react'
import type { RefObject } from 'react'
import type {
    ChartV3LegendItem,
    ChartV3LegendProps,
    ChartV3ReactRefObject,
} from './chartV3.types'
import useChartV3Refs from './useChartV3Refs'
import {
    getChartV3LegendItems,
    setChartV3LegendHover,
    toggleChartV3LegendItem,
} from './chartV3LegendUtils'

export function useChartV3Legend(
    chartRef: ChartV3LegendProps['chartRef'],
    chartRefs: ChartV3LegendProps['chartRefs']
) {
    const refList = useMemo((): Array<
        RefObject<ChartV3ReactRefObject | null>
    > => {
        if (chartRefs?.length)
            return chartRefs as Array<RefObject<ChartV3ReactRefObject | null>>
        if (chartRef) return [chartRef]
        return []
    }, [chartRef, chartRefs])

    const charts = useChartV3Refs(refList)
    const chart = charts[0] ?? null
    const [redrawKey, setRedrawKey] = useState(0)
    const [hoveredItem, setHoveredItem] = useState<ChartV3LegendItem | null>(
        null
    )
    const allItems = useMemo(() => {
        void redrawKey
        return getChartV3LegendItems(chart)
    }, [chart, redrawKey])

    useEffect(() => {
        if (!charts.length) return

        const refresh = () => setRedrawKey((key) => key + 1)
        const finishedHandlers: Array<{
            chart: (typeof charts)[number]
            handler: () => void
        }> = []

        charts.forEach((item) => {
            const refreshOnce = () => {
                item.off('finished', refreshOnce)
                refresh()
            }

            item.on('legendselectchanged', refresh)
            item.on('finished', refreshOnce)
            finishedHandlers.push({ chart: item, handler: refreshOnce })
        })

        return () => {
            charts.forEach((item) => {
                item.off('legendselectchanged', refresh)
            })
            finishedHandlers.forEach(({ chart, handler }) => {
                chart.off('finished', handler)
            })
        }
    }, [charts])

    useEffect(() => {
        const hoveredIndex = hoveredItem ? allItems.indexOf(hoveredItem) : -1

        charts.forEach((item) => {
            const items = getChartV3LegendItems(item)
            setChartV3LegendHover(
                item,
                hoveredIndex >= 0 ? (items[hoveredIndex] ?? null) : null
            )
        })
    }, [allItems, charts, hoveredItem])

    const handleClick = useCallback(
        (item: ChartV3LegendItem, itemIndex: number) => {
            charts.forEach((chartItem) => {
                const items = getChartV3LegendItems(chartItem)
                const target = items[itemIndex] ?? item
                toggleChartV3LegendItem(chartItem, target)
            })
            setRedrawKey((key) => key + 1)
        },
        [charts]
    )

    return { chart, charts, allItems, hoveredItem, setHoveredItem, handleClick }
}
