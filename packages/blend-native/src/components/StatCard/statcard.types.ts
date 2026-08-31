import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Variant,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'
import type { SparklineDatum, SparklineType } from '../Sparkline'

/**
 * Props for the native `StatCard` — the port of web's `StatCardV2`.
 *
 * Divergences from web, by design:
 *
 * - `titleIcon` / `actionIcon` take ReactNode — the consumer composes rather
 *   than passing icon descriptors.
 * - `valueTooltip` and `change.tooltip` are omitted — RN has no hover; wrap
 *   the card in your own tooltip/press handler if needed.
 * - The web's full Highcharts `options` object is replaced by two small
 *   props — `chartData` and `chartType`. Highcharts can't run on RN and the
 *   card strips everything except a 50px sparkline anyway (legend off,
 *   axes off, markers off, tooltips off), so this is the *entire* surface
 *   web consumers use in practice.
 * - `dropdownProps` is omitted — compose a native select inside `children`
 *   if a small-screen dropdown is needed.
 * - `helpIconText` is omitted — render a help icon yourself via `titleIcon`.
 * - `skeleton` uses the native Skeleton shape (`{ show, variant? }`).
 */
export type StatCardChange = {
    /** The change value text, e.g. `"5%"`. */
    value: string
    changeType?: StatCardV2ChangeType
    leftSymbol?: string
    rightSymbol?: string
    arrowDirection?: StatCardV2ArrowDirection
}

export type StatCardSkeletonProps = {
    show: boolean
    variant?: SkeletonVariant
    /** Skeleton block height in points. Defaults to 106 (web parity). */
    height?: number
}

export type StatCardNativeProps = {
    title: string
    variant?: StatCardV2Variant
    /** Leading icon next to the title. */
    titleIcon?: React.ReactNode
    /** Trailing action icon (top-right). */
    actionIcon?: React.ReactNode
    /** The main stat value, e.g. `"1,234"`. Falls back to `"--"`. */
    value?: string
    /** 0–100, shown as a ProgressBar when `variant` is `PROGRESS_BAR`. */
    progressValue?: number
    /** Sparkline series shown when `variant` is `CHART`. */
    chartData?: SparklineDatum[]
    /** Sparkline shape. Defaults to `area` (web parity). */
    chartType?: SparklineType
    /** Delta / change indicator next to the value. */
    change?: StatCardChange
    subtitle?: string
    /** Toggle the border + shadow + padding chrome. Defaults to `true`. */
    showBorder?: boolean
    skeleton?: StatCardSkeletonProps
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    height?: string | number
    children?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
