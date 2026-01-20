import { addPxToValue } from './../../global-utils/GlobalUtils'
import type { MouseEvent } from 'react'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
} from './buttonV2.types'
import type { ButtonV2TokensType } from './buttonV2.tokens'
import { FOUNDATION_THEME } from '../../tokens'

export function getBorderRadius(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonV2TokensType
): string {
    const variantBorderRadius = String(
        tokens.borderRadius[size][buttonType][subType]
    )

    if (buttonGroupPosition === undefined) {
        return variantBorderRadius
    }

    if (buttonGroupPosition === 'left') {
        return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
    }

    if (buttonGroupPosition === 'right') {
        return `0 ${variantBorderRadius} ${variantBorderRadius} 0`
    }

    return '0px 0px 0px 0px'
}

export function createButtonClickHandler(
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
    isSkeleton?: boolean,
    isDisabled?: boolean,
    isLoading?: boolean
) {
    return (event: MouseEvent<HTMLButtonElement>) => {
        if (isSkeleton || isDisabled || isLoading) return
        onClick?.(event)
    }
}

export function getButtonHeight(subType: ButtonV2SubType): string | undefined {
    if (subType === ButtonV2SubType.INLINE) {
        return 'fit-content'
    }
    return undefined
}

export function getIconMaxHeight(
    subType: ButtonV2SubType,
    leftSlotMaxHeight: string | number | undefined,
    rightSlotMaxHeight: string | number | undefined,
    size: ButtonV2Size
): string {
    if (subType === ButtonV2SubType.INLINE) {
        return '100%'
    }
    // Default max height based on button size
    const defaultMaxHeightMap: Record<ButtonV2Size, string> = {
        [ButtonV2Size.SMALL]: '16px',
        [ButtonV2Size.MEDIUM]: '18px',
        [ButtonV2Size.LARGE]: '20px',
    }
    const defaultMaxHeight = defaultMaxHeightMap[size] || '16px'
    return String(leftSlotMaxHeight ?? rightSlotMaxHeight ?? defaultMaxHeight)
}

export function getButtonStatus(
    isLoading: boolean | undefined,
    isDisabled: boolean | undefined
): 'loading' | 'disabled' | 'enabled' {
    if (isLoading) return 'loading'
    if (isDisabled) return 'disabled'
    return 'enabled'
}

export function getButtonTabIndex(
    isDisabled: boolean,
    providedTabIndex?: number
): number {
    if (isDisabled) return -1
    if (providedTabIndex !== undefined) {
        return Math.max(-1, Math.min(0, providedTabIndex))
    }
    return 0
}

export function getSkeletonBorderRadius(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonV2TokensType
): string {
    return getBorderRadius(
        size,
        buttonType,
        subType,
        buttonGroupPosition,
        tokens
    )
}

export function getSkeletonWidth(width?: string | number): string {
    return width ? String(width) : 'fit-content'
}

export function getButtonBorderStyles(
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    defaultBorder: string | undefined
): {
    border?: string
    borderTop?: string
    borderRight?: string
    borderBottom?: string
    borderLeft?: string
} {
    const border = defaultBorder ?? 'none'

    if (buttonGroupPosition === undefined) {
        return { border }
    }

    if (buttonGroupPosition === 'left') {
        return {
            borderTop: border,
            borderBottom: border,
            borderLeft: border,
            borderRight: border,
        }
    }

    if (buttonGroupPosition === 'right') {
        return {
            borderTop: border,
            borderBottom: border,
            borderLeft: border,
            borderRight: border,
        }
    }

    return {
        borderTop: border,
        borderBottom: border,
        borderLeft: 'none',
        borderRight: 'none',
    }
}

/**
 * Get all button styles in one call for better performance
 */
export function getButtonStyles(
    isSkeleton: boolean,
    isDisabled: boolean,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType,
    buttonGroupPosition?: 'center' | 'left' | 'right'
) {
    const tokenState = isSkeleton
        ? 'transparent'
        : tokens.backgroundColor[buttonType][subType].default
    const textColorState = isSkeleton
        ? 'transparent'
        : tokens.text.color[buttonType][subType].default
    const borderState = isSkeleton
        ? 'transparent'
        : tokens.border[buttonType][subType].default

    const borderStyles = buttonGroupPosition
        ? getButtonBorderStyles(buttonGroupPosition, String(borderState))
        : { border: String(borderState) }

    const activeBorder = tokens.border[buttonType][subType]?.active
    const activeBorderStyles =
        buttonGroupPosition && !isSkeleton && !isDisabled && activeBorder
            ? getButtonBorderStyles(buttonGroupPosition, String(activeBorder))
            : undefined

    const hoverBorder = tokens.border[buttonType][subType]?.hover
    const hoverBorderStyles =
        buttonGroupPosition && !isSkeleton && hoverBorder
            ? getButtonBorderStyles(buttonGroupPosition, String(hoverBorder))
            : undefined

    const defaultBorder = tokens.border[buttonType][subType]?.default
    const focusBorderStyles =
        buttonGroupPosition && !isSkeleton && defaultBorder
            ? getButtonBorderStyles(buttonGroupPosition, String(defaultBorder))
            : undefined

    const disabledBorder = tokens.border[buttonType][subType]?.disabled
    const disabledBorderStyles =
        buttonGroupPosition && !isSkeleton && disabledBorder
            ? getButtonBorderStyles(buttonGroupPosition, String(disabledBorder))
            : undefined

    return {
        background: tokenState,
        color: textColorState,
        ...borderStyles,
        _active:
            isSkeleton || isDisabled
                ? undefined
                : {
                      background:
                          tokens.backgroundColor[buttonType][subType].active,
                      ...(activeBorderStyles || {
                          border: String(
                              tokens.border[buttonType][subType].active
                          ),
                      }),
                      boxShadow: tokens.shadow[buttonType][subType].active,
                      transform: 'scale(0.99)',
                  },
        _hover: isSkeleton
            ? undefined
            : {
                  background: tokens.backgroundColor[buttonType][subType].hover,
                  color: tokens.text.color[buttonType][subType].hover,
                  ...(hoverBorderStyles || {
                      border: String(tokens.border[buttonType][subType].hover),
                  }),
              },
        _focusVisible: isSkeleton
            ? undefined
            : {
                  ...(focusBorderStyles || {
                      border: String(
                          tokens.border[buttonType][subType].default
                      ),
                  }),
                  boxShadow: `0 0 0 3px ${FOUNDATION_THEME.colors.primary[200]}`,
              },
        _disabled: isSkeleton
            ? {
                  background: 'transparent',
                  border: 'transparent',
                  borderTop: 'none',
                  borderBottom: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  cursor: 'default',
              }
            : {
                  background:
                      tokens.backgroundColor[buttonType][subType].disabled,
                  ...(disabledBorderStyles || {
                      border: String(
                          tokens.border[buttonType][subType].disabled
                      ),
                  }),
                  cursor: 'not-allowed',
              },
    }
}

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

export function getButtonLineHeight(
    size: ButtonV2Size,
    tokens: ButtonV2TokensType
): string {
    const lineHeight = tokens.text.lineHeight?.[size]
    return lineHeight ? addPxToValue(lineHeight) : 'normal'
}
