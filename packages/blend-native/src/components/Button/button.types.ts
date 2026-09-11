import type React from 'react'
import type {
    GestureResponderEvent,
    PressableProps,
    StyleProp,
    ViewStyle,
} from 'react-native'
import type { ButtonBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `Button`.
 *
 * Extends web's `ButtonBaseProps` (buttonType, size, subType, text, slots,
 * loading, state, width, ...) with DOM-specific pieces swapped for RN ones:
 *
 * - `onClick` → `onPress`, carrying a `GestureResponderEvent` so consumers
 *   can read `nativeEvent.locationX` for anchored menus and popovers.
 * - `data-testid` → `testID`.
 * - `Omit<ButtonHTMLAttributes>` passthrough → `Omit<PressableProps>`, which
 *   also supplies `onPressIn`/`onPressOut`/`onLongPress`/`hitSlop`/
 *   `accessibilityHint` for free.
 *
 * `skeleton` is **omitted** rather than accepted-and-ignored. It is part of
 * `ButtonBaseProps` on web, but there is no native `Skeleton` yet — leaving
 * it in the type made `skeleton={{ showSkeleton: true }}` type-check while
 * doing nothing. Omitting it turns that into a compile error instead.
 */
export type ButtonNativeProps = Omit<ButtonBaseProps, 'skeleton'> & {
    /** Called when the button is pressed (replaces web `onClick`). */
    onPress?: (event: GestureResponderEvent) => void
    /** Disables interaction and applies disabled tokens. */
    disabled?: boolean
    /** RN test ID (replaces web `data-testid`). */
    testID?: string
    /**
     * Flex alignment along the main axis, for slot layout. Typed off RN's own
     * `ViewStyle` rather than a hand-maintained union so it stays correct as
     * RN adds values.
     */
    justifyContent?: ViewStyle['justifyContent']
    /** Escape hatch for RN styles the token props do not cover. */
    style?: StyleProp<ViewStyle>
} & Omit<
        PressableProps,
        'style' | 'onPress' | 'disabled' | 'children' | 'testID'
    >

/**
 * Props for the native `IconButton` — an icon-only `Button`, mirroring web's
 * `IconButton` wrapper over `ButtonV2`.
 *
 * `text`, `leftSlot`, `rightSlot` and `subType` are omitted so the icon-only
 * shape cannot be undone from outside: the icon always renders through
 * `leftSlot` with `subType` forced to `ICON_ONLY`.
 *
 * `accessibilityLabel` is **required** (web requires `aria-label` the same
 * way): an icon-only control has no text to derive an accessible name from,
 * so omitting the label would ship a button screen readers announce as
 * nothing.
 */
export type IconButtonNativeProps = Omit<
    ButtonNativeProps,
    'text' | 'leftSlot' | 'rightSlot' | 'subType' | 'accessibilityLabel'
> & {
    /** The icon to render. Tinted by `Slot` like any other button slot. */
    icon: React.ReactNode
    accessibilityLabel: string
}

/**
 * Props for the native `LinkButton` — a `Button` announced as a link.
 *
 * Web's `LinkButton` renders an anchor; RN has no anchor, so navigation is
 * the app's job via `onPress` (locked decision) and the whole difference is
 * `accessibilityRole="link"`. Deliberately omitted rather than
 * accepted-and-ignored (compile errors, the `skeleton` precedent):
 *
 * - `href` / `target` / `rel` — never existed here; wire navigation (or
 *   `Linking.openURL` for external URLs) in `onPress`.
 * - `justifyContent` — web's LinkButton hardcodes center.
 * - `buttonGroupPosition` — web's LinkButton has no group support.
 * - `accessibilityRole` — forced to `link`; overriding it would undo the
 *   component's one job.
 */
export type LinkButtonNativeProps = Omit<
    ButtonNativeProps,
    'justifyContent' | 'buttonGroupPosition' | 'accessibilityRole'
>
