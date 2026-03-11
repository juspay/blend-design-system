import type { ChartV2Options } from '../ChartsV2'

const BASE_STATCARD_CHART_OPTIONS: ChartV2Options = {
    legend: {
        enabled: false,
    },
    chart: {
        backgroundColor: 'transparent',
        height: 50,
        spacingLeft: 0,
        spacingRight: 0,
        spacingTop: 0,
        spacingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false,
            },
        },
    },
    xAxis: {
        labels: {
            enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 0,
    },
    yAxis: {
        labels: {
            enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 0,
    },
}

export const buildStatCardV2ChartOptions = (
    overrides?: ChartV2Options
): ChartV2Options => ({
    ...BASE_STATCARD_CHART_OPTIONS,
    ...overrides,
})
