import type { StyleProp, ViewStyle } from 'react-native'

/** One datum in the sparkline series. */
export type SparklineDatum = {
    /** Y-axis value. */
    value: number
}

export type SparklineType = 'line' | 'area' | 'bar'

/**
 * Minimal chart surface embedded inside `StatCard` (and usable standalone later).
 * Wraps `victory-native` with Blend token styling and sane RN defaults.
 */
export type SparklineNativeProps = {
    data: SparklineDatum[]
    /** Shape of the series. Defaults to `area`, web parity with sparklines. */
    type?: SparklineType
    /** Total height of the canvas. */
    height?: number
    /** Stroke colour for line/area, bar colour for bar. Defaults to the active theme. */
    color?: string
    /** Width of the canvas; defaults to full container width. */
    width?: number | string
    /** Stroke thickness for line/area. */
    strokeWidth?: number
    style?: StyleProp<ViewStyle>
    testID?: string
}
