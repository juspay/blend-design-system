import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type {
    AlertBaseProps,
    AlertV2ActionPosition,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native `Alert`.
 *
 * The scalar core (`type`, `subType`, `heading`, `description`) derives from
 * web's platform-neutral `AlertBaseProps`, so a web-side rename or addition
 * reaches this type instead of drifting silently. The rest is re-declared
 * natively because web's shapes are DOM-bound:
 *
 * - `onClick` handlers become `onPress`, carrying a `GestureResponderEvent`.
 * - `HTMLAttributes` passthrough becomes RN `View` props via `...rest`.
 * - `width` / `maxWidth` / `minWidth` accept token strings or numbers and are
 *   resolved by `parseSize` (web types them as `CSSObject` values).
 */

export type AlertSlot = {
    slot: React.ReactNode
    /** Overrides the token-derived slot max height. */
    maxHeight?: string | number
}

export type AlertAction = {
    text: string
    onPress?: (event: GestureResponderEvent) => void
    /** Overrides the accessible name, which defaults to `<text> action`. */
    accessibilityLabel?: string
}

export type AlertActions = {
    /**
     * `BOTTOM` stacks the actions under the text; `RIGHT` places them inline
     * and enables the separator before the close button.
     */
    position?: AlertV2ActionPosition
    primaryAction?: AlertAction
    secondaryAction?: AlertAction
}

export type AlertCloseButton = {
    show?: boolean
    onPress?: (event: GestureResponderEvent) => void
    /**
     * Replaces the default lucide `X`. Tinted by `Slot` like any other icon,
     * so a custom icon only needs to accept a `color` prop.
     */
    icon?: React.ReactNode
    accessibilityLabel?: string
}

export type AlertNativeProps = AlertBaseProps & {
    slot?: AlertSlot
    actions?: AlertActions
    closeButton?: AlertCloseButton

    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number

    /**
     * Announce the alert to assistive tech when it appears. Defaults to `true`,
     * matching web's hard-coded `aria-live="assertive"`.
     *
     * Pass `false` for alerts that are part of a screen's initial content
     * rather than a response to something the user did. Several alerts mounting
     * at once each queue an announcement, so a static list of them talks over
     * itself — the showcase in `apps/native-site` disables it for that reason.
     */
    announce?: boolean
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
