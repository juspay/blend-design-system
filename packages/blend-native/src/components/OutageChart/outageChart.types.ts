import type { StyleProp, ViewStyle } from 'react-native'
import type { SkeletonVariant } from '../Skeleton/Skeleton'

/** One point on the trend line. `x` is typically a timestamp. */
export type OutageTrendDatum = {
    x: number
    y: number
}

/**
 * A color zone on the trend line's x-axis. From the zone's `from` value to the
 * next zone's `from`, the line draws in `color`. The last zone covers
 * [from, +∞).
 */
export type OutageZone = {
    from: number
    color: string
}

/**
 * One outage/quality segment on the timeline. Renders as a colored bar from
 * `start` to `end` on the row for `laneLabel`.
 *
 * `meta` is open-ended so a consumer can attach anything (downTime,
 * fluctuation, count) and read it back in `onSegmentPress`.
 */
export type OutageSegment = {
    start: number
    end: number
    /** Row label — one row per unique value, in first-seen order. */
    laneLabel: string
    color: string
    meta?: Record<string, string | number>
}

export type OutageChartNativeProps = {
    /** Trend-line data (e.g. success-rate over time). */
    trendData: OutageTrendDatum[]
    /** Color zones for the trend line, sorted by `from`. */
    zones?: OutageZone[]
    /** Timeline segments. One row per unique `laneLabel`. */
    segments?: OutageSegment[]
    /** Trend line stroke color used when `zones` is empty. */
    trendColor?: string
    /** Total width of both sub-charts is measured; this is the trend chart height. Default 160. */
    trendHeight?: number
    /** Height of one timeline row. Default 48. */
    laneHeight?: number
    /** Segment bar pill height. Default 8. */
    segmentHeight?: number
    /** Trend chart title row (e.g. 'UPI Outage Trend'). */
    title?: string
    /** Trailing content in the title row (dropdowns, menus). */
    header?: React.ReactNode
    /** Currently selected segment (controlled). */
    selectedSegmentId?: number | null
    /** Called when a segment is tapped; `null` on background tap. */
    onSegmentSelect?: (
        selection: { index: number; segment: OutageSegment } | null
    ) => void
    /** Empty state. */
    noData?: { title?: string; subtitle?: string }
    skeleton?: { show: boolean; variant?: SkeletonVariant }
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
