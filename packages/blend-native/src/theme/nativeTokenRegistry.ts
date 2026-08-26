import {
    FOUNDATION_THEME,
    Theme,
    getAlertV2Tokens,
    getAvatarV2Tokens,
    getButtonV2Tokens,
    getCardV2Tokens,
    getKeyValuePairV2Tokens,
    getProgressBarV2Tokens,
    getSkeletonTokens,
    getSnackbarV2Tokens,
    getSpinnerTokens,
    getTagV2Tokens,
    getTextInputV2Tokens,
    type BreakpointType,
} from '@juspay/blend-design-system/node'

/**
 * Slot name → token factory.
 *
 * **This is the only file to edit when adding a component.** Web needs three
 * files changed in lockstep for a new token slot (`context/ThemeContext.tsx`
 * for the type + default, `context/initComponentTokens.ts` for the `??`
 * fallback, `context/useComponentToken.ts` for the union and `switch` case) —
 * and missing one throws at runtime. Native collapses that to a single
 * registry entry, with the slot union derived from the object rather than
 * hand-maintained alongside it.
 *
 * Factories come from `@juspay/blend-design-system/node`, the React-free
 * entry, so registering one pulls in no UI code.
 */
export const NATIVE_TOKEN_REGISTRY = {
    ALERTV2: getAlertV2Tokens,
    AVATARV2: getAvatarV2Tokens,
    BUTTONV2: getButtonV2Tokens,
    CARDV2: getCardV2Tokens,
    KEYVALUEPAIRV2: getKeyValuePairV2Tokens,
    PROGRESS_BARV2: getProgressBarV2Tokens,
    SKELETON: getSkeletonTokens,
    SNACKBARV2: getSnackbarV2Tokens,
    SPINNER: getSpinnerTokens,
    TAGV2: getTagV2Tokens,
    TEXT_INPUTV2: getTextInputV2Tokens,
} as const

/** Every component slot native can resolve. Derived, never hand-written. */
export type NativeTokenSlot = keyof typeof NATIVE_TOKEN_REGISTRY

/**
 * A Blend token factory: pure, takes foundation tokens plus a theme, and
 * returns one token object per breakpoint.
 */
export type TokenFactory<T> = (
    foundation: typeof FOUNDATION_THEME,
    theme?: Theme | string
) => Record<keyof BreakpointType, T>

/** Overrides accepted by `BlendNativeProvider`, keyed by slot. */
export type NativeComponentTokenOverrides = Partial<
    Record<NativeTokenSlot, unknown>
>

export const NATIVE_TOKEN_SLOTS = Object.keys(
    NATIVE_TOKEN_REGISTRY
) as NativeTokenSlot[]

export function isNativeTokenSlot(value: string): value is NativeTokenSlot {
    return Object.prototype.hasOwnProperty.call(NATIVE_TOKEN_REGISTRY, value)
}
