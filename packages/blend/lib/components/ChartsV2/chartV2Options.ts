import type Highcharts from 'highcharts'
import type { ChartV2TokensType } from './chartV2.tokens'

const DEFAULT_DATETIME_FORMATS = {
    hour: '%H:%M',
    minute: '%H:%M',
    second: '%H:%M:%S',
} as const

const LEGEND_DEFAULTS = {
    symbolWidth: 12,
    symbolHeight: 12,
    symbolRadius: 4,
    squareSymbol: true,
} as const

type AxisStyleTokens = {
    fontSize: unknown
    color: unknown
    fontWeight: unknown
    lineHeight: unknown
}

const toAxisStyle = (tokens: AxisStyleTokens) => {
    return {
        fontSize: tokens.fontSize,
        color: tokens.color,
        fontWeight: tokens.fontWeight,
        lineHeight: tokens.lineHeight,
    }
}

export const mergeChartOptions = (
    options: Highcharts.Options,
    tokens: ChartV2TokensType
) => {
    const { chart, title, subtitle, legend, xAxis, yAxis } = options
    const { chart: chartTokens, legends: legendsTokens } = tokens

    const xAxisOpt = Array.isArray(xAxis) ? xAxis[0] : xAxis
    const yAxisOpt = Array.isArray(yAxis) ? yAxis[0] : yAxis

    return {
        ...options,
        chart: { backgroundColor: 'transparent', ...chart },
        title: { text: '', ...title },
        subtitle: { text: '', ...subtitle },
        legend: {
            ...legend,
            ...LEGEND_DEFAULTS,
            enabled: legend?.enabled ?? true,
            itemStyle: toAxisStyle(legendsTokens.name),
        },
        xAxis: {
            ...xAxisOpt,
            title: {
                text: xAxisOpt?.title?.text ?? '',
                style: toAxisStyle(chartTokens.xAxis.title),
            },
            dateTimeLabelFormats:
                xAxisOpt?.dateTimeLabelFormats ?? DEFAULT_DATETIME_FORMATS,
            labels: {
                ...xAxisOpt?.labels,
                enabled: xAxisOpt?.labels?.enabled ?? true,
                y: 40,
                style: toAxisStyle(chartTokens.xAxis.labels),
            },
            tickLength: 0,
            lineWidth: xAxisOpt?.lineWidth ?? chartTokens.xAxis.line.width,
            lineColor: xAxisOpt?.lineColor ?? chartTokens.xAxis.line.color,
            gridLineWidth:
                xAxisOpt?.gridLineWidth ?? chartTokens.xAxis.gridLine.width,
            gridLineColor:
                xAxisOpt?.gridLineColor ?? chartTokens.xAxis.gridLine.color,
        },
        yAxis: {
            ...yAxisOpt,
            title: {
                text: yAxisOpt?.title?.text ?? '',
                style: toAxisStyle(chartTokens.yAxis.title),
            },
            labels: {
                ...yAxisOpt?.labels,
                enabled: yAxisOpt?.labels?.enabled ?? true,
                ...(yAxisOpt?.labels?.useHTML
                    ? {}
                    : { style: toAxisStyle(chartTokens.yAxis.labels) }),
            },
            tickLength: 0,
            lineWidth: yAxisOpt?.lineWidth ?? chartTokens.yAxis.line.width,
            lineColor: yAxisOpt?.lineColor ?? chartTokens.yAxis.line.color,
            gridLineWidth:
                yAxisOpt?.gridLineWidth ?? chartTokens.yAxis.gridLine.width,
            gridLineColor:
                yAxisOpt?.gridLineColor ?? chartTokens.yAxis.gridLine.color,
        },
    }
}
