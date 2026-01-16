import type { MouseEvent } from 'react'
import type { ButtonSize, ButtonState } from './buttonV2.types'
import { ButtonSubType, ButtonType } from './buttonV2.types'
import type { ButtonTokensType } from './button.tokens'
import { FOUNDATION_THEME } from '../../tokens'

export function getBorderRadius(
    size: ButtonSize,
    buttonType: ButtonType,
    subType: ButtonSubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonTokensType
): string {
    const variantBorderRadius = String(
        tokens.borderRadius[size][buttonType][subType].default
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

export function getDefaultLineHeight(): string | undefined {
    const lineHeight = FOUNDATION_THEME.font.size.body.md.lineHeight
    if (lineHeight === undefined || lineHeight === null) return undefined
    return typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight
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

export function getButtonHeight(subType: ButtonSubType): string | undefined {
    if (subType === ButtonSubType.INLINE) {
        return 'fit-content'
    }
    return undefined
}

export function getIconMaxHeight(
    subType: ButtonSubType,
    size: ButtonSize,
    tokens: ButtonTokensType
): string {
    if (subType === ButtonSubType.INLINE) {
        return '100%'
    }
    return String(tokens.slotMaxHeight[size])
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
    size: ButtonSize,
    buttonType: ButtonType,
    subType: ButtonSubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonTokensType
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
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType,
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
    const outlineState = isSkeleton
        ? 'transparent'
        : tokens.outline[buttonType][subType].default

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
        outline: outlineState,
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
                  outline: tokens.outline[buttonType][subType].active,
                  outlineOffset: FOUNDATION_THEME.unit[2],
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
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
): string {
    if (isSkeleton) return 'transparent'
    const color =
        tokens.text.color[buttonType][subType][
            disabled ? 'disabled' : 'default'
        ]
    return color ? String(color) : 'transparent'
}

export function getTextColor(
    isSkeleton: boolean,
    disabled: boolean | undefined,
    state: ButtonState,
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
): string {
    if (isSkeleton) return 'transparent'
    const color =
        tokens.text.color[buttonType][subType][disabled ? 'disabled' : state]
    return color ? String(color) : 'transparent'
}
