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

// Cap on the number of x-axis labels rendered for category-style axes
// before labels are thinned (matches the V1 DEFAULT_MAX_CATEGORY_LABELS).
const DEFAULT_MAX_X_LABELS = 12

/**
 * Computes the Highcharts `labels.step` (show only labels at indices where
 * index % step === 0) needed to cap rendered x-axis labels for dense
 * category-style axes. Returns `undefined` when thinning does not apply, so
 * Highcharts' native auto behavior is preserved.
 */
const getXAxisLabelStep = (options: Highcharts.Options): number | undefined => {
    const { chart, series, xAxis } = options
    const xAxisOpt = Array.isArray(xAxis) ? xAxis[0] : xAxis

    // Consumer wins: explicit step or tick controls opt out entirely.
    if (
        xAxisOpt?.labels?.step !== undefined ||
        xAxisOpt?.tickInterval !== undefined ||
        xAxisOpt?.tickPixelInterval !== undefined
    ) {
        return undefined
    }

    const axisType = xAxisOpt?.type
    if (
        axisType === 'datetime' ||
        axisType === 'linear' ||
        axisType === 'logarithmic'
    ) {
        return undefined
    }

    // Category-style axis: explicit 'category' type, or bar/column series
    // with the axis type unset (Highcharts defaults to category for those).
    const isBarLike =
        chart?.type === 'bar' ||
        chart?.type === 'column' ||
        (series ?? []).some((s) => s?.type === 'bar' || s?.type === 'column')
    const isCategoryAxis =
        axisType === 'category' || (axisType === undefined && isBarLike)
    if (!isCategoryAxis) {
        return undefined
    }

    const seriesPointCount = (s: Highcharts.SeriesOptionsType): number => {
        const data = (s as { data?: unknown[] }).data
        return Array.isArray(data) ? data.length : 0
    }
    const pointCount =
        xAxisOpt?.categories?.length ??
        (series ?? []).reduce<number>(
            (max, s) => Math.max(max, s ? seriesPointCount(s) : 0),
            0
        )
    if (pointCount <= DEFAULT_MAX_X_LABELS) return undefined

    return Math.ceil(pointCount / DEFAULT_MAX_X_LABELS)
}

type AxisStyleTokens = {
    fontSize: string | number | undefined
    color: string | undefined
    fontWeight: string | number | undefined
    lineHeight: string | number | undefined
}

const toAxisStyle = (tokens: AxisStyleTokens): Highcharts.CSSObject => {
    return {
        fontSize:
            tokens.fontSize === undefined ? undefined : String(tokens.fontSize),
        color: tokens.color,
        fontWeight:
            tokens.fontWeight === undefined
                ? undefined
                : String(tokens.fontWeight),
        lineHeight:
            tokens.lineHeight === undefined
                ? undefined
                : String(tokens.lineHeight),
    }
}

export const mergeChartOptions = (
    options: Highcharts.Options,
    tokens: ChartV2TokensType
): Record<string, unknown> => {
    const { chart, title, subtitle, legend, xAxis, yAxis } = options
    const { chart: chartTokens, legends: legendsTokens } = tokens

    const xAxisOpt = Array.isArray(xAxis) ? xAxis[0] : xAxis
    const yAxisOpt = Array.isArray(yAxis) ? yAxis[0] : yAxis

    const xAxisLabelStep = getXAxisLabelStep(options)

    return {
        ...options,
        chart: {
            backgroundColor: 'transparent',
            ...chart,
            spacingLeft: chart?.spacingLeft ?? 0,
        },
        title: { text: '', ...title },
        subtitle: { text: '', ...subtitle },
        legend: {
            ...legend,
            ...LEGEND_DEFAULTS,
            enabled: legend?.enabled ?? true,
            align: legend?.align ?? 'left',
            verticalAlign: legend?.verticalAlign ?? 'top',
            itemStyle:
                legend?.itemStyle ??
                toAxisStyle(legendsTokens.legendItem.text.name),
            x: legend?.x ?? 0,
            y: legend?.y ?? -5,
            padding: legend?.padding ?? 0,
            margin: legend?.margin ?? 0,
            itemMarginTop: legend?.itemMarginTop ?? 0,
            itemMarginBottom: legend?.itemMarginBottom ?? 34,
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
                step: xAxisOpt?.labels?.step ?? xAxisLabelStep,
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
