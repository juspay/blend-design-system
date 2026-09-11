import type { StyleProp, ViewStyle } from 'react-native'
import type {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `ProgressBar` — the port of web's `ProgressBarV2`.
 *
 * Determinate only, like web: `value` is required and there is no
 * indeterminate mode. Announced through RN's `accessibilityValue`
 * (min/max/now) instead of web's ARIA attributes.
 *
 * Divergence: web paints the segmented empty track with a
 * `repeating-linear-gradient`; RN cannot, so native renders discrete tick
 * marks with the same color, width and period decoded from the tokens.
 */
export type ProgressBarNativeProps = {
    value: number
    min?: number
    max?: number
    size?: ProgressBarV2Size
    variant?: ProgressBarV2Variant
    appearance?: ProgressBarV2Appearance
    /** Show the rounded percentage next to (linear) or under (circular). */
    showLabel?: boolean
    /** Screen-reader name; defaults to web's `Progress: N%`. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
