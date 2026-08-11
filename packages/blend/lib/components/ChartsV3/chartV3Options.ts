import type { EChartsOption } from 'echarts'
import type { ChartV3TokensType } from './chartV3.tokens'

type PlainObject = Record<string, unknown>

const isObject = (value: unknown): value is PlainObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

const mergeObject = (base: PlainObject, value: unknown): PlainObject => {
    if (!isObject(value)) return base

    return Object.entries(value).reduce<PlainObject>(
        (merged, [key, overrideValue]) => {
            const baseValue = merged[key]
            merged[key] =
                isObject(baseValue) && isObject(overrideValue)
                    ? mergeObject(baseValue, overrideValue)
                    : overrideValue
            return merged
        },
        { ...base }
    )
}

const mergeArrayOrObject = (
    value: unknown,
    defaults: PlainObject
): PlainObject | PlainObject[] => {
    if (Array.isArray(value))
        return value.map((item) => mergeObject(defaults, item))
    return mergeObject(defaults, value)
}

const getChartV3AnimationDelay = (index: number) => Math.min(index * 48, 560)
const getChartV3AnimationDelayUpdate = (index: number) =>
    Math.min(index * 18, 220)

export const mergeChartV3Options = (
    options: EChartsOption,
    tokens: ChartV3TokensType
): EChartsOption => {
    const { chart, legends } = tokens

    const xAxisDefaults = {
        axisTick: { show: false },
        axisLine: {
            lineStyle: {
                width: chart.xAxis.line.width,
                color: chart.xAxis.line.color,
            },
        },
        splitLine: {
            lineStyle: {
                width: chart.xAxis.gridLine.width,
                color: chart.xAxis.gridLine.color,
            },
        },
        axisLabel: {
            color: chart.xAxis.labels.color,
            fontSize: chart.xAxis.labels.fontSize,
            fontWeight: chart.xAxis.labels.fontWeight,
        },
        nameTextStyle: {
            color: chart.xAxis.title.color,
            fontSize: chart.xAxis.title.fontSize,
            fontWeight: chart.xAxis.title.fontWeight,
        },
    }

    const yAxisDefaults = {
        axisTick: { show: false },
        axisLine: {
            lineStyle: {
                width: chart.yAxis.line.width,
                color: chart.yAxis.line.color,
            },
        },
        splitLine: {
            lineStyle: {
                width: chart.yAxis.gridLine.width,
                color: chart.yAxis.gridLine.color,
            },
        },
        axisLabel: {
            color: chart.yAxis.labels.color,
            fontSize: chart.yAxis.labels.fontSize,
            fontWeight: chart.yAxis.labels.fontWeight,
        },
        nameTextStyle: {
            color: chart.yAxis.title.color,
            fontSize: chart.yAxis.title.fontSize,
            fontWeight: chart.yAxis.title.fontWeight,
        },
    }
    const gridDefaults = {
        containLabel: true,
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
    }

    return {
        backgroundColor: 'transparent',
        animation: true,
        animationDuration: 2000,
        animationDurationUpdate: 700,
        animationEasing: 'quinticOut',
        animationEasingUpdate: 'cubicOut',
        animationDelay: getChartV3AnimationDelay,
        animationDelayUpdate: getChartV3AnimationDelayUpdate,
        animationThreshold: 5000,
        ...options,
        grid:
            options.grid === undefined
                ? gridDefaults
                : mergeArrayOrObject(options.grid, gridDefaults),
        legend:
            options.legend === undefined
                ? {
                      show: false,
                      left: 0,
                      top: 0,
                      itemWidth: 12,
                      itemHeight: 12,
                      textStyle: {
                          color: legends.legendItem.text.name.color,
                          fontSize: legends.legendItem.text.name.fontSize,
                          fontWeight: legends.legendItem.text.name.fontWeight,
                      },
                  }
                : mergeArrayOrObject(options.legend, {
                      itemWidth: 12,
                      itemHeight: 12,
                      textStyle: {
                          color: legends.legendItem.text.name.color,
                          fontSize: legends.legendItem.text.name.fontSize,
                          fontWeight: legends.legendItem.text.name.fontWeight,
                      },
                  }),
        xAxis:
            options.xAxis === undefined
                ? undefined
                : mergeArrayOrObject(options.xAxis, xAxisDefaults),
        yAxis:
            options.yAxis === undefined
                ? undefined
                : mergeArrayOrObject(options.yAxis, yAxisDefaults),
    }
}

export const getChartV3SeriesList = (options: EChartsOption): PlainObject[] => {
    const series = options.series
    const list = Array.isArray(series) ? series : series ? [series] : []
    return list.filter(isObject)
}

const hasDatasetSourceData = (options: EChartsOption): boolean => {
    const dataset = options.dataset
    const datasets = Array.isArray(dataset) ? dataset : dataset ? [dataset] : []

    return datasets.some((item) => {
        if (!isObject(item)) return false

        const source = item.source
        return Array.isArray(source) && source.length > 0
    })
}

export const hasChartV3SeriesData = (options: EChartsOption): boolean =>
    hasDatasetSourceData(options) ||
    getChartV3SeriesList(options).some((series) => {
        const data = series.data
        const links = series.links
        const edges = series.edges
        const nodes = series.nodes
        return (
            (Array.isArray(data) && data.length > 0) ||
            (Array.isArray(links) && links.length > 0) ||
            (Array.isArray(edges) && edges.length > 0) ||
            (Array.isArray(nodes) && nodes.length > 0)
        )
    })

export const getChartV3Type = (options: EChartsOption): string => {
    const first = getChartV3SeriesList(options)[0]
    const type = first?.type
    return typeof type === 'string' && type.length > 0 ? type : 'Chart'
}

export const getChartV3Title = (options: EChartsOption): string => {
    const title = Array.isArray(options.title)
        ? options.title[0]
        : options.title
    if (isObject(title) && typeof title.text === 'string' && title.text) {
        return title.text
    }
    return 'Chart'
}
