/**
 * Button utility functions for business logic extraction
 * Following RFC 0007: Component Refactoring Standards
 */

import type { MouseEvent } from 'react'
import type { ButtonSize, ButtonState } from './types'
import { ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { FOUNDATION_THEME } from '../../tokens'

/**
 * Calculate border radius based on button group position
 */
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

/**
 * Get default line height from foundation theme
 */
export function getDefaultLineHeight(): string | undefined {
    const lineHeight = FOUNDATION_THEME.font.size.body.md.lineHeight
    if (lineHeight === undefined || lineHeight === null) return undefined
    return typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight
}

/**
 * Create click handler with disabled/loading/skeleton checks
 */
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

/**
 * Calculate button height based on subType and buttonGroupPosition
 * Returns undefined for most cases as height is managed by padding
 */
export function getButtonHeight(subType: ButtonSubType): string | undefined {
    // Only inline buttons have fit-content height
    if (subType === ButtonSubType.INLINE) {
        return 'fit-content'
    }
    // For all other cases, return undefined to let padding determine height
    return undefined
}

/**
 * Calculate icon max height based on subType and size
 */
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

/**
 * Get button status for data attributes
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
 * Calculate tabIndex based on disabled state and provided tabIndex
 */
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

/**
 * Calculate skeleton border radius based on button group position
 */
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

/**
 * Calculate skeleton width based on fullWidth and width props
 */
export function getSkeletonWidth(
    fullWidth?: boolean,
    width?: string | number
): string {
    if (fullWidth) return '100%'
    return width ? String(width) : 'fit-content'
}

/**
 * Get button layout props
 */
export function getButtonLayoutProps(
    fullWidth?: boolean,
    width?: string | number,
    justifyContent?: string,
    buttonHeight?: string | undefined,
    gap?: string | number
) {
    return {
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: (justifyContent ?? 'center') as
            | 'flex-start'
            | 'center'
            | 'flex-end'
            | 'space-between',
        width: fullWidth ? '100%' : (width ?? 'fit-content'),
        gap,
        ...(buttonHeight !== undefined && { height: buttonHeight }),
    }
}

/**
 * Get button state styles (_active)
 */
export function getButtonActiveStyles(
    isSkeleton: boolean,
    isDisabled: boolean,
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
) {
    if (isSkeleton || isDisabled) return undefined

    return {
        background: tokens.backgroundColor[buttonType][subType].active,
        border: tokens.border[buttonType][subType].active,
        boxShadow: tokens.shadow[buttonType][subType].active,
        transform: 'scale(0.99)',
    }
}

/**
 * Get button state styles (_hover)
 */
export function getButtonHoverStyles(
    isSkeleton: boolean,
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
) {
    if (isSkeleton) return undefined

    return {
        background: tokens.backgroundColor[buttonType][subType].hover,
        color: tokens.text.color[buttonType][subType].hover,
        border: tokens.border[buttonType][subType].hover,
    }
}

/**
 * Get button state styles (_focusVisible)
 */
export function getButtonFocusVisibleStyles(
    isSkeleton: boolean,
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
) {
    if (isSkeleton) return undefined

    return {
        border: tokens.border[buttonType][subType].default,
        outline: tokens.outline[buttonType][subType].active,
        outlineOffset: FOUNDATION_THEME.unit[2],
    }
}

/**
 * Get button state styles (_disabled)
 */
export function getButtonDisabledStyles(
    isSkeleton: boolean,
    buttonType: ButtonType,
    subType: ButtonSubType,
    tokens: ButtonTokensType
) {
    if (isSkeleton) {
        return {
            background: 'transparent',
            border: 'transparent',
            cursor: 'default',
        }
    }

    return {
        background: tokens.backgroundColor[buttonType][subType].disabled,
        border: tokens.border[buttonType][subType].disabled,
        cursor: 'not-allowed',
    }
}

/**
 * Get icon color based on state
 */
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

/**
 * Get text color based on state
 */
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

/**
 * Get aria label for button
 */
export function getButtonAriaLabel(
    isSkeleton: boolean,
    text: string | undefined,
    providedAriaLabel: string | undefined
): string | undefined {
    if (isSkeleton && text && !providedAriaLabel) {
        return text
    }
    return providedAriaLabel
}
