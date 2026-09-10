import {
    FOUNDATION_THEME,
    Theme,
    getAccordionV2Tokens,
    getAlertV2Tokens,
    getAvatarV2Tokens,
    getBadgeTokens,
    getButtonV2Tokens,
    getCardV2Tokens,
    getCheckboxV2Tokens,
    getKeyValuePairV2Tokens,
    getMenuV2Tokens,
    getModalV2Tokens,
    getMultiSelectV2Tokens,
    getNumberInputV2Tokens,
    getOTPInputV2Tokens,
    getPopoverV2Tokens,
    getProgressBarV2Tokens,
    getRadioV2Tokens,
    getSearchInputV2Tokens,
    getSingleSelectV2Tokens,
    getSkeletonTokens,
    getSnackbarV2Tokens,
    getSpinnerTokens,
    getSwitchV2Tokens,
    getTabsV2Tokens,
    getTagV2Tokens,
    getTooltipV2Tokens,
    getTextAreaV2Tokens,
    getTextInputV2Tokens,
    getUploadV2Tokens,
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
    ACCORDIONV2: getAccordionV2Tokens,
    ALERTV2: getAlertV2Tokens,
    AVATARV2: getAvatarV2Tokens,
    BADGE: getBadgeTokens,
    BUTTONV2: getButtonV2Tokens,
    CARDV2: getCardV2Tokens,
    CHECKBOXV2: getCheckboxV2Tokens,
    KEYVALUEPAIRV2: getKeyValuePairV2Tokens,
    MENU_V2: getMenuV2Tokens,
    MODALV2: getModalV2Tokens,
    MULTI_SELECT_V2: getMultiSelectV2Tokens,
    NUMBER_INPUT_V2: getNumberInputV2Tokens,
    OTP_INPUTV2: getOTPInputV2Tokens,
    POPOVERV2: getPopoverV2Tokens,
    PROGRESS_BARV2: getProgressBarV2Tokens,
    RADIOV2: getRadioV2Tokens,
    SEARCH_INPUT_V2: getSearchInputV2Tokens,
    SINGLE_SELECT_V2: getSingleSelectV2Tokens,
    SKELETON: getSkeletonTokens,
    SNACKBARV2: getSnackbarV2Tokens,
    SPINNER: getSpinnerTokens,
    SWITCHV2: getSwitchV2Tokens,
    TABSV2: getTabsV2Tokens,
    TAGV2: getTagV2Tokens,
    TEXT_AREA_V2: getTextAreaV2Tokens,
    TEXT_INPUTV2: getTextInputV2Tokens,
    UPLOADV2: getUploadV2Tokens,
    TOOLTIPV2: getTooltipV2Tokens,
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
