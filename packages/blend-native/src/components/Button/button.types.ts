import type {
    GestureResponderEvent,
    PressableProps,
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
    style?: ViewStyle
} & Omit<
        PressableProps,
        'style' | 'onPress' | 'disabled' | 'children' | 'testID'
    >
