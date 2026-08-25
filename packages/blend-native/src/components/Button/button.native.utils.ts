import type { ViewStyle, TextStyle } from 'react-native'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
    type ButtonV2TokensType,
} from '@juspay/blend-design-system/node'

/**
 * Native ButtonV2 style resolver.
 *
 * Reimplements the spirit of `packages/blend/lib/components/ButtonV2/utils.ts`
 * but returns RN `ViewStyle` / `TextStyle` objects directly (no CSS strings).
 *
 * The web `utils.ts` builds a `ButtonStylesReturn` with `_active` / `_hover` /
 * `_focusVisible` / `_disabled` pseudo-state maps. RN has no CSS
 * pseudo-selectors, so instead we return explicit per-state style objects:
 * `default`, `pressed` (replaces `_active`), `disabled` (replaces
 * `_disabled`). Hover is a no-op on native (see plan "Known Limitations").
 */

export type ButtonV2NativeStyles = {
    /** Outer container style for the default (non-pressed, non-disabled) state. */
    container: ViewStyle
    /** Style applied on press (replaces web `_active`). */
    pressed: ViewStyle
    /** Style applied when disabled (replaces web `_disabled`). */
    disabled: ViewStyle
    /** Text style for the current state. */
    text: TextStyle
    /** The CSS-string background token for the current state (gradient/flat/none). */
    background: string
    /** The CSS-string active background token. */
    activeBackground: string
    /** The CSS-string disabled background token. */
    disabledBackground: string
    /** The CSS-string border token for the default state. */
    border: string
    /** The CSS-string border token for the active state. */
    activeBorder: string
    /** The CSS-string border token for the disabled state. */
    disabledBorder: string
    /** The CSS-string box-shadow token for the default state. */
    boxShadow: string
    /** The CSS-string box-shadow token for the active state. */
    activeBoxShadow: string
    /** Parsed padding values per direction (numbers). */
    padding: {
        top: number | undefined
        right: number | undefined
        bottom: number | undefined
        left: number | undefined
    }
    /** Gap between slots (number). */
    gap: number | undefined
    /** Border radius (number or per-corner object). */
    borderRadius: string | number
    /** Whether the default background is a gradient. */
    isGradient: boolean
}

/**
 * Resolve padding tokens to a per-direction numeric record.
 * Mirrors `getButtonPadding` in web `utils.ts`.
 */
export function getButtonPadding(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType
): {
    top: string
    right: string
    bottom: string
    left: string
} {
    return {
        top: String(
            tokens.padding[PaddingDirection.TOP][size][buttonType][subType]
        ),
        right: String(
            tokens.padding[PaddingDirection.RIGHT][size][buttonType][subType]
        ),
        bottom: String(
            tokens.padding[PaddingDirection.BOTTOM][size][buttonType][subType]
        ),
        left: String(
            tokens.padding[PaddingDirection.LEFT][size][buttonType][subType]
        ),
    }
}

/**
 * Resolve the border radius CSS string for the button.
 * Mirrors `getButtonV2BorderRadius` in web `utils.ts`.
 */
export function getButtonV2BorderRadius(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonV2TokensType
): string {
    const variantBorderRadius = String(
        tokens.borderRadius[size][buttonType][subType]
    )
    if (buttonGroupPosition === undefined) return variantBorderRadius
    if (buttonGroupPosition === 'left')
        return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
    if (buttonGroupPosition === 'right')
        return `0 ${variantBorderRadius} ${variantBorderRadius} 0`
    return '0px 0px 0px 0px'
}

/**
 * Resolve the text color for the current state.
 * Mirrors `getTextColor` in web `utils.ts`.
 */
export function getTextColor(
    isSkeleton: boolean,
    disabled: boolean | undefined,
    state: ButtonV2State,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType
): string {
    if (isSkeleton) return 'transparent'
    const color =
        tokens.text.color[buttonType][subType][
            disabled ? ButtonV2State.DISABLED : state
        ]
    return color ? String(color) : 'transparent'
}

/**
 * Resolve the icon (slot) color.
 * Mirrors `getIconColor` in web `utils.ts`.
 */
export function getIconColor(
    isSkeleton: boolean,
    disabled: boolean | undefined,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType
): string {
    if (isSkeleton) return 'transparent'
    const color =
        tokens.text.color[buttonType][subType][
            disabled ? ButtonV2State.DISABLED : ButtonV2State.DEFAULT
        ]
    return color ? String(color) : 'transparent'
}

/**
 * Resolve the text line-height CSS string.
 * Mirrors `getButtonLineHeight` in web `utils.ts`.
 */
export function getButtonLineHeight(
    size: ButtonV2Size,
    tokens: ButtonV2TokensType
): string {
    const lineHeight = tokens.text.lineHeight?.[size]
    return lineHeight ? String(lineHeight) : 'normal'
}

/**
 * Resolve the button's status label for accessibility / data-status.
 * Mirrors `getButtonStatus` in web `utils.ts`.
 */
export function getButtonStatus(
    isLoading: boolean | undefined,
    isDisabled: boolean | undefined
): 'loading' | 'disabled' | 'enabled' {
    if (isLoading) return 'loading'
    if (isDisabled) return 'disabled'
    return 'enabled'
}

/**
 * Compute the full set of native styles for a ButtonV2 given its configuration.
 *
 * This is the native equivalent of `getButtonStyles` in web `utils.ts`, but
 * returns `ViewStyle` / `TextStyle` objects instead of CSS-string maps with
 * pseudo-state keys.
 *
 * @param isSkeleton  — whether the skeleton placeholder is showing
 * @param isDisabled  — whether the button is disabled
 * @param buttonType  — primary / secondary / danger / success
 * @param subType     — default / iconOnly / inline
 * @param state       — default / hover / active (hover is a no-op on native)
 * @param tokens      — the resolved ButtonV2 token object (already breakpoint-flattened)
 * @param buttonGroupPosition — for button groups (left/right/center)
 */
export function getButtonNativeStyles(
    isSkeleton: boolean,
    isDisabled: boolean,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    size: ButtonV2Size,
    state: ButtonV2State,
    tokens: ButtonV2TokensType,
    buttonGroupPosition?: 'center' | 'left' | 'right'
): ButtonV2NativeStyles {
    // Background tokens
    const bgDefault = isSkeleton
        ? 'transparent'
        : String(tokens.backgroundColor[buttonType][subType].default)
    const bgActive = isSkeleton
        ? 'transparent'
        : String(tokens.backgroundColor[buttonType][subType].active)
    const bgDisabled = isSkeleton
        ? 'transparent'
        : String(tokens.backgroundColor[buttonType][subType].disabled)

    // Border tokens
    const borderDefault = isSkeleton
        ? 'transparent'
        : String(tokens.border[buttonType][subType].default)
    const borderActive = isSkeleton
        ? 'transparent'
        : String(tokens.border[buttonType][subType]?.active ?? '')
    const borderDisabled = isSkeleton
        ? 'transparent'
        : String(tokens.border[buttonType][subType]?.disabled ?? '')

    // Shadow tokens
    const shadowDefault = isSkeleton
        ? 'none'
        : String(tokens.shadow[buttonType][subType].default)
    const shadowActive = isSkeleton
        ? 'none'
        : String(tokens.shadow[buttonType][subType]?.active ?? 'none')

    // Text color
    const textColor = getTextColor(
        isSkeleton,
        isDisabled,
        state,
        buttonType,
        subType,
        tokens
    )

    // Padding
    const padRaw = getButtonPadding(size, buttonType, subType, tokens)

    // Border radius
    const borderRadius = getButtonV2BorderRadius(
        size,
        buttonType,
        subType,
        buttonGroupPosition,
        tokens
    )

    return {
        container: {
            // Base container is mostly layout; colors come from Pressable.
            opacity: isSkeleton ? 0 : 1,
        },
        pressed: {
            // Pressed-state overrides are handled by Pressable via the
            // activeBackground / activeBorder / activeBoxShadow props.
        },
        disabled: {},
        text: {
            color: textColor,
            fontSize: 14, // placeholder; resolved by Text primitive from token
            fontWeight: '500',
        },
        background: bgDefault,
        activeBackground: bgActive,
        disabledBackground: bgDisabled,
        border: borderDefault,
        activeBorder: borderActive,
        disabledBorder: borderDisabled,
        boxShadow: shadowDefault,
        activeBoxShadow: shadowActive,
        padding: {
            top: parseFloat(padRaw.top),
            right: parseFloat(padRaw.right),
            bottom: parseFloat(padRaw.bottom),
            left: parseFloat(padRaw.left),
        },
        gap: parseFloat(String(tokens.gap)) || undefined,
        borderRadius,
        isGradient: /linear-gradient/.test(bgDefault),
    }
}
