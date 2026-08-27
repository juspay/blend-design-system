import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type {
    ButtonV2Type,
    ModalBaseProps,
} from '@juspay/blend-design-system/node'

/**
 * A footer action. Web types these as `Omit<ButtonV2Props, ...>` — which has
 * a platform-neutral core but drags DOM handlers; native takes the neutral
 * fields and renders its own `Button`.
 */
export type ModalAction = {
    text: string
    onPress?: (event: GestureResponderEvent) => void
    /** Defaults: primary action PRIMARY, secondary action SECONDARY. */
    buttonType?: ButtonV2Type
    disabled?: boolean
    loading?: boolean
    accessibilityLabel?: string
}

/**
 * Props for the native `Modal` — the port of web's `ModalV2`.
 *
 * Derives from `ModalBaseProps`. Presentation follows the breakpoint:
 * phones (`sm`) get a bottom sheet — exactly web's vaul-under-1024px
 * behaviour, with `useDrawerOnMobile` omitted since the breakpoint
 * decides — and tablets (`lg`) a centered dialog card.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 * `isCustom` (web-internal layout switch), `skeleton` (deferred
 * Wave-C-wide), and the DOM attribute spread. `dimensions` are numbers
 * (web types them as CSS values) and apply to the `lg` card only.
 */
export type ModalNativeProps = ModalBaseProps & {
    children?: React.ReactNode
    primaryAction?: ModalAction
    secondaryAction?: ModalAction
    /** Replaces the built-in header entirely. */
    customHeader?: React.ReactNode
    /** Replaces the built-in footer entirely. */
    customFooter?: React.ReactNode
    /** Extra content rendered beside the title block. */
    headerSlot?: React.ReactNode
    dimensions?: {
        width?: number
        height?: number
        minWidth?: number
        maxWidth?: number
        minHeight?: number
        maxHeight?: number
    }
    /** Sheet-mode height cap as a window fraction. Default 0.9. */
    maxHeightFraction?: number
    testID?: string
    /** Styles the modal surface (both presentations). */
    style?: StyleProp<ViewStyle>
}
