import Highcharts from 'highcharts'
import * as SankeyModule from 'highcharts/modules/sankey'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sankeyAny: any = SankeyModule
const init =
    typeof sankeyAny === 'function'
        ? (sankeyAny as (H: typeof Highcharts) => void)
        : typeof sankeyAny.default === 'function'
          ? (sankeyAny.default as (H: typeof Highcharts) => void)
          : null

type HighchartsWithSeriesTypes = typeof Highcharts & {
    seriesTypes?: Record<string, unknown>
    SeriesRegistry?: { seriesTypes?: Record<string, unknown> }
}

export const ensureSankeyRegistered = (
    highchartsInstance: typeof Highcharts = Highcharts
): typeof Highcharts => {
    const instance = highchartsInstance as HighchartsWithSeriesTypes
    const hasSankey = Boolean(
        instance.SeriesRegistry?.seriesTypes?.sankey ??
        instance.seriesTypes?.sankey
    )
    if (init && !hasSankey) {
        init(highchartsInstance)
    }
    return highchartsInstance
}
