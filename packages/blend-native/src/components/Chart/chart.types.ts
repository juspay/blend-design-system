import type { StyleProp, ViewStyle } from 'react-native'
import type { SkeletonVariant } from '../Skeleton/Skeleton'

// ---- Chart types --------------------------------------------------------

export type ChartType =
    | 'line'
    | 'area'
    | 'bar'
    | 'column'
    | 'lineColumn'
    | 'scatter'
    | 'pie'
    | 'donut'

// ---- Series data --------------------------------------------------------

/** One datum in a series. */
export type ChartDatum = {
    /** X-axis value (label). */
    x: string | number
    /** Y-axis value. */
    y: number
    /** Optional per-point color (overrides series color). */
    color?: string
}

/** A named series of data points. */
export type ChartSeries = {
    /** Unique name for this series (used as legend label). */
    name: string
    /** Data points. */
    data: ChartDatum[]
    /** Series color. Defaults to a rotating palette. */
    color?: string
    /** Line/area stroke width. */
    strokeWidth?: number
    /** Fill opacity for area charts (0–1). */
    fillOpacity?: number
    /**
     * Per-series chart type for combo charts. Only read when the chart
     * `type` is `'lineColumn'` — series default to `'column'`, so a combo
     * is one or more `'line'` series plus one or more columns.
     */
    chartType?: 'line' | 'column'
}

// ---- Pie data -----------------------------------------------------------

/** One slice of a pie/donut chart. */
export type ChartPieSlice = {
    /** Slice label. */
    label: string
    /** Slice value. */
    value: number
    /** Slice color. Defaults to a rotating palette. */
    color?: string
}

// ---- Legend items -------------------------------------------------------

export type ChartLegendItem = {
    /** Unique key (matches series name or slice label). */
    key: string
    /** Display name. */
    name: string
    /** Swatch color. */
    color: string
    /** Optional value shown after the name. */
    value?: string | number
    /** Whether the series/slice is currently visible. */
    visible: boolean
}

// ---- Component props ----------------------------------------------------

export type ChartSkeletonProps = {
    show: boolean
    variant?: SkeletonVariant
    height?: number
}

export type ChartNoDataProps = {
    title?: string
    subtitle?: string
    slot?: React.ReactNode
}

export type ChartLegendProps = {
    /** Legend items. If not provided, built from series/pie data. */
    items?: ChartLegendItem[]
    /** Called when a legend item is tapped. `key` is the item's key. */
    onToggle?: (key: string) => void
    layout?: 'horizontal' | 'vertical'
    style?: StyleProp<ViewStyle>
}

export type ChartHeaderProps = {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}

export type ChartContainerProps = {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}

/**
 * Props for the native `Chart` component.
 *
 * Renders one of: line, area, bar, column, pie, or donut chart using
 * `victory-native`, styled from `CHARTSV2` tokens.
 */
export type ChartNativeProps = {
    /** Which chart to render. */
    type: ChartType
    /** Series data (line/area/bar/column). */
    series?: ChartSeries[]
    /** Pie/donut data. */
    data?: ChartPieSlice[]
    /** Chart height. */
    height?: number
    /** Show the legend. Defaults to `true` when multiple series/pie. */
    showLegend?: boolean
    /** Show axis grid lines. */
    showGrid?: boolean
    /** Show x-axis labels. */
    showXAxis?: boolean
    /** Show y-axis labels. */
    showYAxis?: boolean
    /** Interactive legend toggle. */
    onLegendToggle?: (key: string) => void
    /** Hidden series keys (controlled). */
    hiddenKeys?: string[]
    /** Donut center label. */
    centerLabel?: string
    /** Donut center value. */
    centerValue?: string
    /** Skeleton loading state. */
    skeleton?: ChartSkeletonProps
    /** No-data state. */
    noData?: ChartNoDataProps
    /** Custom header content. */
    header?: React.ReactNode
    /** Accessibility label for the chart. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

/** Default palette for multi-series charts. */
export const CHART_PALETTE = [
    '#2B7FFF', // blue-500
    '#FB2C36', // red-500
    '#FF6B00', // orange-500
    '#00C950', // green-500
    '#A855F7', // purple-500
    '#06B6D4', // cyan-500
    '#EAB308', // yellow-500
    '#EC4899', // pink-500
    '#6366F1', // indigo-500
    '#14B8A6', // teal-500
] as const

/** Pick a palette color by index (wraps around). */
export function paletteColor(index: number): string {
    return CHART_PALETTE[index % CHART_PALETTE.length]
}

/** Build legend items from series or pie slices. */
export function buildLegendItems(
    type: ChartType,
    series?: ChartSeries[],
    data?: ChartPieSlice[],
    hiddenKeys?: string[]
): ChartLegendItem[] {
    const hidden = new Set(hiddenKeys ?? [])
    if (type === 'pie' || type === 'donut') {
        return (data ?? []).map((s, i) => ({
            key: s.label,
            name: s.label,
            color: s.color ?? paletteColor(i),
            visible: !hidden.has(s.label),
        }))
    }
    return (series ?? []).map((s, i) => ({
        key: s.name,
        name: s.name,
        color: s.color ?? paletteColor(i),
        visible: !hidden.has(s.name),
    }))
}
