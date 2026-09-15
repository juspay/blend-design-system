import type { ViewStyle } from 'react-native'

/**
 * Press feedback is platform-idiomatic, not uniform.
 *
 * Web scales the surface by `0.99`, and that reads correctly on iOS where a
 * subtle depress is the convention. Android users expect a **ripple**, and a
 * scale transform there looks like a bug. Applying both would double the
 * feedback.
 *
 * The decision lives here — a leaf module with no `react-native` value import
 * — so it is unit-testable outside a renderer, the same split as
 * `theme/breakpoint.ts`, `primitives/touchTarget.ts` and the shadow handling
 * in `adapters/surfaceStyle.ts`. `Pressable` passes the real `Platform.OS`.
 */

export type PressFeedbackPlatform =
    | 'ios'
    | 'android'
    | 'web'
    | 'windows'
    | 'macos'

export type AndroidRipple = {
    color: string
    borderless: boolean
}

export type PressFeedback = {
    /** Passed to RN's `android_ripple`; `undefined` off Android. */
    androidRipple?: AndroidRipple
    /** Style merged in while pressed; empty on Android, where the ripple carries it. */
    pressedTransform: ViewStyle
}

/**
 * Ripple colour used when neither the caller nor the active-state token
 * supplies one. Low-alpha black is Android's own default for light surfaces.
 */
export const DEFAULT_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.12)'

export function resolvePressFeedback(
    platform: PressFeedbackPlatform,
    options: {
        /** Explicit ripple colour from the caller. */
        rippleColor?: string
        /** Active-state background token, used when no explicit colour is set. */
        activeBackgroundColor?: string
        rippleBorderless?: boolean
        pressedScale?: number
    } = {}
): PressFeedback {
    const {
        rippleColor,
        activeBackgroundColor,
        rippleBorderless = false,
        pressedScale = 0.99,
    } = options

    if (platform === 'android') {
        return {
            androidRipple: {
                color:
                    rippleColor ??
                    activeBackgroundColor ??
                    DEFAULT_RIPPLE_COLOR,
                borderless: rippleBorderless,
            },
            // The ripple is the feedback; scaling as well would double it.
            pressedTransform: {},
        }
    }

    return {
        androidRipple: undefined,
        pressedTransform: { transform: [{ scale: pressedScale }] },
    }
}
