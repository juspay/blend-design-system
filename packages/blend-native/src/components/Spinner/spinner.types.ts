import type { StyleProp, ViewStyle } from 'react-native'
import type {
    SpinnerColor,
    SpinnerSize,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Spinner` — the port of web's `Spinner`.
 *
 * Web animates an SVG arc with SMIL (`<animateTransform>`), which RN lacks;
 * native rotates the same arc geometry with Reanimated. Under reduce-motion
 * both render the static arc (web omits the animation element).
 *
 * Web's `Omit<BlockProps>` surface passthrough is replaced by the explicit
 * props below — the spinner is a leaf indicator, not a layout surface.
 */
export type SpinnerNativeProps = {
    size?: SpinnerSize
    color?: SpinnerColor
    /** Announced to screen readers. Web renders it visually hidden. */
    label?: string
    /**
     * Absolute-fill scrim behind a centred spinner (blocking overlays).
     * The token `overlay.zIndex` is ignored on RN — layer order is tree
     * order.
     */
    overlay?: boolean
    testID?: string
    style?: StyleProp<ViewStyle>
}
