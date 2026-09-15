import type { ViewStyle } from 'react-native'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
    type ButtonV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    getGroupedBorderRadius,
    getGroupedBorderWidths,
    type GroupPosition,
} from '../shared/group'

/**
 * Native ButtonV2 style resolver.
 *
 * Reimplements `packages/blend/lib/components/ButtonV2/utils.ts` for RN. Web
 * builds a `ButtonStylesReturn` carrying `_active` / `_hover` /
 * `_focusVisible` / `_disabled` pseudo-state maps; RN has no pseudo-selectors,
 * so this returns the token strings per state and lets `Pressable` compose
 * them against `{ pressed }`.
 *
 * `_hover` and `_focusVisible` have no native counterpart and are dropped.
 */

export type ButtonV2NativeStyles = {
    /** CSS-string background token for the default state. */
    background: string
    activeBackground: string
    disabledBackground: string
    /** CSS-string border token per state. */
    border: string
    activeBorder: string
    disabledBorder: string
    /** CSS-string box-shadow token per state. */
    boxShadow: string
    activeBoxShadow: string
    /** Resolved text/icon colour for the current state. */
    textColor: string
    /** Padding token strings per direction. */
    padding: {
        top: string
        right: string
        bottom: string
        left: string
    }
    gap: string
    borderRadius: string
    /**
     * Border widths to overlay for the group position. Interior members drop
     * their shared edges so a seam is one line wide, not two.
     */
    groupBorderWidths: Pick<ViewStyle, 'borderLeftWidth' | 'borderRightWidth'>
    /** `'auto'` for the inline subType, otherwise undefined. */
    height: string | undefined
}

/**
 * Resolve padding tokens per direction.
 * Mirrors `getButtonPadding` in web `utils.ts`.
 */
export function getButtonPadding(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType
): { top: string; right: string; bottom: string; left: string } {
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
 * Resolve the border radius, collapsing joined edges inside a button group.
 *
 * Mirrors `getButtonV2BorderRadius` in web `utils.ts`. The collapsing itself
 * lives in `shared/group` because Tag needs the same algorithm.
 */
export function getButtonV2BorderRadius(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    buttonGroupPosition: GroupPosition | undefined,
    tokens: ButtonV2TokensType
): string {
    return getGroupedBorderRadius(
        tokens.borderRadius[size][buttonType][subType] as string | number,
        buttonGroupPosition
    )
}

/**
 * Resolve the max height for each icon slot.
 *
 * Mirrors `getIconMaxHeight` in web `utils.ts`, including both behaviours
 * that were previously missing on native: the inline subType stretches slots
 * to `100%`, and a per-slot `maxHeight` overrides the size-derived default.
 */
export function getIconMaxHeight(
    subType: ButtonV2SubType,
    leftSlotMaxHeight: string | number | undefined,
    rightSlotMaxHeight: string | number | undefined,
    defaultMaxHeight: string | number
): { left: string | number; right: string | number } {
    if (subType === ButtonV2SubType.INLINE) {
        return { left: '100%', right: '100%' }
    }
    return {
        left: leftSlotMaxHeight ?? defaultMaxHeight,
        right: rightSlotMaxHeight ?? defaultMaxHeight,
    }
}

/**
 * Height override for the inline subType.
 * Mirrors `getButtonHeight` in web `utils.ts` (`fit-content` → RN `auto`).
 */
export function getButtonHeight(subType: ButtonV2SubType): string | undefined {
    return subType === ButtonV2SubType.INLINE ? 'auto' : undefined
}

/**
 * Spinner size for the current button size.
 *
 * Web maps these to explicit pixel sizes (16/18/20 for sm/md/lg) so the
 * loader never overflows a small button; RN's `ActivityIndicator` accepts a
 * number on both platforms.
 */
export function getLoaderSize(size: ButtonV2Size): number {
    const loaderSizeMap: Record<ButtonV2Size, number> = {
        [ButtonV2Size.SMALL]: 16,
        [ButtonV2Size.MEDIUM]: 18,
        [ButtonV2Size.LARGE]: 20,
    }
    return loaderSizeMap[size] ?? 16
}

/**
 * Resolve the text/icon colour for the current state.
 * Mirrors `getTextColor` in web `utils.ts`.
 */
export function getTextColor(
    disabled: boolean | undefined,
    state: ButtonV2State,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType
): string {
    const color =
        tokens.text.color[buttonType][subType][
            disabled ? ButtonV2State.DISABLED : state
        ]
    return color ? String(color) : 'transparent'
}

/**
 * Compute the full native style set for a button.
 *
 * The native equivalent of `getButtonStyles` in web `utils.ts`.
 */
export function getButtonNativeStyles(
    isDisabled: boolean,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    size: ButtonV2Size,
    state: ButtonV2State,
    tokens: ButtonV2TokensType,
    buttonGroupPosition?: GroupPosition
): ButtonV2NativeStyles {
    const bg = tokens.backgroundColor[buttonType][subType]
    const borders = tokens.border[buttonType][subType]
    const shadows = tokens.shadow[buttonType][subType]

    return {
        background: String(bg.default),
        activeBackground: String(bg.active),
        disabledBackground: String(bg.disabled),

        border: String(borders.default),
        activeBorder: String(borders?.active ?? ''),
        disabledBorder: String(borders?.disabled ?? ''),

        boxShadow: String(shadows.default),
        activeBoxShadow: String(shadows?.active ?? 'none'),

        textColor: getTextColor(isDisabled, state, buttonType, subType, tokens),

        padding: getButtonPadding(size, buttonType, subType, tokens),
        gap: String(tokens.gap),
        groupBorderWidths: getGroupedBorderWidths(buttonGroupPosition),
        borderRadius: getButtonV2BorderRadius(
            size,
            buttonType,
            subType,
            buttonGroupPosition,
            tokens
        ),
        height: getButtonHeight(subType),
    }
}
