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

export const ensureSankeyRegistered = (
    highchartsInstance: typeof Highcharts = Highcharts
): typeof Highcharts => {
    if (init && !highchartsInstance.seriesTypes.sankey) {
        init(highchartsInstance)
    }
    return highchartsInstance
}
