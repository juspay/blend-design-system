import type React from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type { PopoverBaseProps } from '@juspay/blend-design-system/node'

/**
 * A footer action — the Alert pattern. Web types these as V1 `ButtonProps`
 * (DOM-bound); native takes the plain fields and renders its own `Button`.
 */
export type PopoverAction = {
    text: string
    onPress?: (event: GestureResponderEvent) => void
    disabled?: boolean
    loading?: boolean
    accessibilityLabel?: string
}

/**
 * Props for the native `Popover` — the port of web's `PopoverV2`.
 *
 * Derives from `PopoverBaseProps`. Presentation follows the breakpoint:
 * phones (`sm`) get a bottom sheet — web's `useDrawerOnMobile` behaviour,
 * with the prop itself omitted since the breakpoint decides — and tablets
 * (`lg`) get an anchored surface.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `alignOffset` — the positioning engine aligns and clamps; a fixed
 *   cross-axis nudge has no place to act once clamping runs.
 * - `asModal` — the anchored surface always captures outside taps.
 * - `shadow` — elevation is a token concern, not a prop.
 * - `avoidCollisions` — the engine always flips and clamps.
 * - `skeleton` — deferred Wave-C-wide with the loading-state policy.
 * - The DOM attribute spread.
 *
 * `width`/`minWidth`/`maxWidth`/`height`/`minHeight`/`maxHeight` are
 * numbers and apply to the anchored (`lg`) surface only; the sheet sizes
 * itself, capped by `maxHeightFraction`.
 */
export type PopoverNativeProps = Omit<PopoverBaseProps, 'alignOffset'> & {
    /** The anchor. Press opens the popover. */
    trigger: React.ReactNode
    children?: React.ReactNode
    primaryAction?: PopoverAction
    secondaryAction?: PopoverAction
    /** Sheet-mode height cap as a window fraction. Default 0.9. */
    maxHeightFraction?: number
    width?: number
    minWidth?: number
    maxWidth?: number
    height?: number
    minHeight?: number
    maxHeight?: number
    testID?: string
    /** Styles the popover surface (both presentations). */
    style?: StyleProp<ViewStyle>
}
