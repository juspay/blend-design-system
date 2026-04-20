import { useMemo } from 'react'
import type { RefObject } from 'react'
import type { ChartV2LegendProps, ChartV2ReactRefObject } from './chartV2.types'
import useChartRefs from './useChartRefs'
import { useChartLegendHover } from './useChartLegendHover'

export function useChartLegend(
    chartRef: ChartV2LegendProps['chartRef'],
    chartRefs: ChartV2LegendProps['chartRefs']
) {
    const refList = useMemo((): Array<
        RefObject<ChartV2ReactRefObject | null>
    > => {
        if (chartRefs?.length)
            return chartRefs as Array<RefObject<ChartV2ReactRefObject | null>>
        if (chartRef) return [chartRef]
        return []
    }, [chartRef, chartRefs])

    const charts = useChartRefs(refList)
    const chart = charts[0] ?? null
    const legend = useChartLegendHover(chart, charts)

    return { chart, charts, ...legend }
}
