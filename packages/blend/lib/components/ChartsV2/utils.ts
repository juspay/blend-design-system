import { ChartV2, ChartV2LegendItem } from './chartV2.types'

export const getLegendItems = (chart: ChartV2 | null): ChartV2LegendItem[] => {
    if (!chart) return []
    const series = chart.series ?? []
    const pie = series.find(
        (s) => (s as Highcharts.Series).options?.type === 'pie'
    )
    if (pie?.points?.length) {
        return pie.points.filter(
            (p) =>
                (
                    p.options as Highcharts.PointOptionsObject & {
                        showInLegend?: boolean
                    }
                )?.showInLegend !== false
        ) as ChartV2LegendItem[]
    }
    return (
        (chart.legend?.allItems?.length
            ? chart.legend.allItems
            : series) as ChartV2LegendItem[]
    ).filter(
        (s) => (s as Highcharts.Series).options?.showInLegend !== false
    ) as ChartV2LegendItem[]
}

export const applyHoverState = (
    items: ChartV2LegendItem[],
    hovered: ChartV2LegendItem | null
) => {
    items.forEach((item) => {
        const isHovered = hovered === item
        const series = item as Highcharts.Series
        const point = item as Highcharts.Point

        if (series.points && (series.options?.type as string) !== 'pie') {
            if (isHovered) series.setState('hover')
            else if (hovered) series.setState('inactive')
            else series.setState(undefined)
        } else if (typeof point.setState === 'function') {
            try {
                if (isHovered) point.setState('hover')
                else if (!hovered) point.setState(undefined)
            } catch {
                /* Pie: setState('inactive') throws */
            }
        }
    })
}
