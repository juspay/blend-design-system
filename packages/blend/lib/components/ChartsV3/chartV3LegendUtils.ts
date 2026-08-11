import type { EChartsOption } from 'echarts'
import type { ChartV3, ChartV3LegendItem } from './chartV3.types'
import { getChartV3SeriesList } from './chartV3Options'

type EChartsLegendOption = {
    selected?: Record<string, boolean>
}

const getColor = (value: unknown): string | undefined => {
    if (typeof value === 'string') return value
    if (Array.isArray(value)) return getColor(value[0])
    return undefined
}

const getPointName = (point: unknown, fallback: string): string => {
    if (Array.isArray(point)) return String(point[0] ?? fallback)
    if (point && typeof point === 'object' && 'name' in point) {
        const name = (point as { name?: unknown }).name
        if (typeof name === 'string') return name
    }
    return fallback
}

const getPointColor = (point: unknown): string | undefined => {
    if (point && typeof point === 'object') {
        const itemStyle = (point as { itemStyle?: { color?: unknown } })
            .itemStyle
        const color = (point as { color?: unknown }).color ?? itemStyle?.color
        return getColor(color)
    }
    return undefined
}

const getSelectedMap = (
    options: EChartsOption | undefined
): Record<string, boolean> => {
    if (!options) return {}

    const legend = Array.isArray(options.legend)
        ? options.legend[0]
        : options.legend
    if (legend && typeof legend === 'object') {
        return ((legend as EChartsLegendOption).selected ?? {}) as Record<
            string,
            boolean
        >
    }
    return {}
}

export const getChartV3LegendItems = (
    chart: ChartV3 | null
): ChartV3LegendItem[] => {
    if (!chart) return []

    const option = chart.getOption() as EChartsOption | undefined
    if (!option) return []

    const selected = getSelectedMap(option)
    const series = getChartV3SeriesList(option)
    const pieSeries = series.find((item) => item.type === 'pie')

    if (pieSeries && Array.isArray(pieSeries.data)) {
        return pieSeries.data.map((point, dataIndex) => {
            const name = getPointName(point, String(dataIndex))
            return {
                key: name,
                name,
                color: getPointColor(point) ?? getColor(pieSeries.color),
                selected: selected[name] !== false,
                seriesIndex: series.indexOf(pieSeries),
                dataIndex,
            }
        })
    }

    return series
        .filter((item) => item.showInLegend !== false)
        .map((item, seriesIndex) => {
            const name =
                typeof item.name === 'string'
                    ? item.name
                    : `Series ${seriesIndex + 1}`
            return {
                key: name,
                name,
                color:
                    getColor(item.color) ??
                    getColor(
                        (item as { itemStyle?: { color?: unknown } }).itemStyle
                            ?.color
                    ),
                selected: selected[name] !== false,
                seriesIndex,
            }
        })
}

export const setChartV3LegendHover = (
    chart: ChartV3 | null,
    item: ChartV3LegendItem | null
) => {
    if (!chart) return

    chart.dispatchAction({ type: 'downplay' })
    if (!item) return

    chart.dispatchAction({
        type: 'highlight',
        seriesIndex: item.seriesIndex,
        dataIndex: item.dataIndex,
    })
    chart.dispatchAction({
        type: 'showTip',
        seriesIndex: item.seriesIndex,
        dataIndex: item.dataIndex,
    })
}

export const toggleChartV3LegendItem = (
    chart: ChartV3 | null,
    item: ChartV3LegendItem
) => {
    chart?.dispatchAction({
        type: 'legendToggleSelect',
        name: item.name,
    })
}
