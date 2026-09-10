import type {
    OutageSegment,
    OutageTrendDatum,
    OutageZone,
} from './outageChart.types'

/**
 * Split a trend line into per-zone segments for Victory rendering.
 *
 * Highcharts draws one series and recolors the stroke by x-zone; Victory has
 * no zones, so we produce one polyline per zone span. At each zone boundary
 * we interpolate the y value (linear between the two surrounding data points)
 * so adjacent segments share a boundary point and the stroke is continuous.
 * If the boundary lies exactly on a data point, that point is included in
 * both segments.
 */
export function splitTrendByZones(
    data: OutageTrendDatum[],
    zones: OutageZone[]
): { color: string; data: OutageTrendDatum[] }[] {
    if (data.length === 0) return []
    if (zones.length === 0) {
        return [{ color: '#2B7FFF', data }]
    }

    const sorted = [...zones].sort((a, b) => a.from - b.from)
    const result: { color: string; data: OutageTrendDatum[] }[] = []

    /** Linearly interpolate y at x between the two surrounding data points. */
    const interpolate = (
        x: number,
        lo: OutageTrendDatum,
        hi: OutageTrendDatum
    ) => {
        const t = (x - lo.x) / (hi.x - lo.x)
        return lo.y + t * (hi.y - lo.y)
    }

    for (let i = 0; i < sorted.length; i++) {
        const zone = sorted[i]
        const nextFrom = sorted[i + 1]?.from ?? Infinity
        const points: OutageTrendDatum[] = []

        for (let j = 0; j < data.length; j++) {
            const d = data[j]

            // Left boundary handling for the first point in the zone:
            if (
                points.length === 0 &&
                j > 0 &&
                zone.from > data[j - 1].x &&
                zone.from <= d.x
            ) {
                if (zone.from < d.x) {
                    // Zone starts between points — interpolate y at boundary.
                    const y = interpolate(zone.from, data[j - 1], d)
                    points.push({ x: zone.from, y })
                } else {
                    // zone.from === d.x — include the previous point
                    // as-is so the stroke is continuous across the boundary.
                    points.push(data[j - 1])
                }
            }

            if (d.x >= zone.from && d.x < nextFrom) {
                points.push(d)
            }

            // Right boundary: interpolate if the next zone starts between
            // the current point and the following one.
            if (
                d.x < nextFrom &&
                j + 1 < data.length &&
                data[j + 1].x >= nextFrom &&
                nextFrom > d.x
            ) {
                const y = interpolate(nextFrom, d, data[j + 1])
                points.push({ x: nextFrom, y })
            }
        }

        if (points.length > 0) {
            result.push({ color: zone.color, data: points })
        }
    }

    return result
}

/**
 * Unique lane labels from segments, in first-seen order. The timeline's rows
 * are keyed off this list.
 */
export function computeLanes(segments: OutageSegment[]): string[] {
    const seen = new Set<string>()
    const lanes: string[] = []
    for (const s of segments) {
        if (!seen.has(s.laneLabel)) {
            seen.add(s.laneLabel)
            lanes.push(s.laneLabel)
        }
    }
    return lanes
}

/** The shared x-domain used by both the trend chart and the timeline. */
export function computeXDomain(
    trendData: OutageTrendDatum[],
    segments: OutageSegment[]
): { min: number; max: number } {
    const xs: number[] = []
    for (const d of trendData) xs.push(d.x)
    for (const s of segments) {
        xs.push(s.start, s.end)
    }
    if (xs.length === 0) return { min: 0, max: 1 }
    const min = Math.min(...xs)
    const max = Math.max(...xs)
    return min === max ? { min, max: min + 1 } : { min, max }
}

/** Map an x value to a 0–1 fraction of the shared domain. */
export function xToFraction(
    x: number,
    domain: { min: number; max: number }
): number {
    return (x - domain.min) / (domain.max - domain.min)
}
