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
    const firstPoint = items[0] as Highcharts.Point | undefined
    const pieSeries =
        firstPoint &&
        firstPoint.series &&
        (firstPoint.series.type === 'pie' ||
            (firstPoint.series.options?.type as string) === 'pie')
            ? firstPoint.series
            : undefined

    if (pieSeries) {
        const hoveredPoint = hovered as Highcharts.Point | null

        pieSeries.points.forEach((p) => {
            const samePoint =
                hoveredPoint &&
                (p === hoveredPoint ||
                    (typeof p.name !== 'undefined' &&
                        typeof hoveredPoint.name !== 'undefined' &&
                        p.name === hoveredPoint.name))

            const targetOpacity = hoveredPoint ? (samePoint ? 1 : 0.2) : 1

            if (p.graphic) {
                // Use a short animation for smoother transitions to avoid jitter.
                // Highcharts' animate falls back gracefully if called repeatedly.
                p.graphic.animate({ opacity: targetOpacity }, { duration: 150 })
            }

            if (typeof p.setState === 'function') {
                try {
                    p.setState(samePoint ? 'hover' : undefined)
                } catch {
                    // Ignore invalid states for points
                }
            }
        })

        return
    }

    // Default behaviour for non-pie charts: use Highcharts series states
    // so the hovered series stays normal and others are dimmed.
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
                /* Safeguard for unsupported states */
            }
        }
    })
}
