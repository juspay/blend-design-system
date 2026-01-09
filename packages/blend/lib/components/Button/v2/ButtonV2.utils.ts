import type { MouseEvent } from 'react'
import {
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
    type ButtonV2GroupPosition,
    type ButtonV2Props,
} from './ButtonV2.types'
import type { ButtonV2TokensType } from './ButtonV2.tokens'
import { getSkeletonState } from '../../Skeleton/utils'
import { FOUNDATION_THEME } from '../../../tokens'

/**
 * Button Utilities
 *
 * Pure functions for button logic.
 * All business logic extracted from component rendering.
 */

/**
 * Calculate border radius based on button group position
 *
 * @param baseRadius - Base border radius value
 * @param buttonGroupPosition - Position in button group (left, right, center, or undefined)
 * @returns Calculated border radius string
 */
export const calculateBorderRadius = (
    baseRadius: string,
    buttonGroupPosition?: ButtonV2GroupPosition
): string => {
    if (buttonGroupPosition === undefined) {
        return baseRadius
    }

    if (buttonGroupPosition === 'left') {
        return `${baseRadius} 0 0 ${baseRadius}`
    }

    if (buttonGroupPosition === 'right') {
        return `0 ${baseRadius} ${baseRadius} 0`
    }

    return '0px 0px 0px 0px'
}

/**
 * Get border radius from tokens
 *
 * @param tokens - Button tokens
 * @param size - Button size
 * @param buttonType - Button type
 * @param subType - Button sub-type
 * @returns Border radius value
 */
export const getBorderRadiusFromTokens = (
    tokens: ButtonV2TokensType,
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType
): string => {
    const radius = tokens.borderRadius[size][buttonType][subType]?.default
    return radius ? String(radius) : '0px'
}

/**
 * Calculate skeleton width
 *
 * @param fullWidth - Whether button should be full width
 * @param width - Custom width value
 * @returns Calculated width string
 */
export const calculateSkeletonWidth = (
    fullWidth?: boolean,
    width?: string | number
): string => {
    if (fullWidth) {
        return '100%'
    }
    return width ? String(width) : 'fit-content'
}

/**
 * Format line height value
 *
 * @param value - Line height value (number or string)
 * @returns Formatted line height string
 */
export const formatLineHeight = (
    value?: number | string | null
): string | undefined => {
    if (value === undefined || value === null) {
        return undefined
    }
    return typeof value === 'number' ? `${value}px` : value
}

/**
 * Get button status for data attributes
 *
 * @param loading - Whether button is loading
 * @param disabled - Whether button is disabled
 * @returns Status string: 'loading' | 'disabled' | 'enabled'
 */
export const getButtonStatus = (
    loading: boolean,
    disabled: boolean
): 'loading' | 'disabled' | 'enabled' => {
    if (loading) {
        return 'loading'
    }
    if (disabled) {
        return 'disabled'
    }
    return 'enabled'
}

/**
 * Calculate button height
 *
 * @param subType - Button sub-type
 * @param isInButtonGroup - Whether button is in a button group
 * @returns Height value or undefined
 */
export const calculateButtonHeight = (
    subType: ButtonV2SubType,
    isInButtonGroup: boolean
): string | undefined => {
    if (subType === ButtonV2SubType.INLINE) {
        return 'fit-content'
    }
    if (isInButtonGroup) {
        return undefined
    }
    return 'fit-content'
}

/**
 * Calculate icon max height
 *
 * @param subType - Button sub-type
 * @param tokens - Button tokens
 * @param size - Button size
 * @returns Max height value
 */
export const calculateIconMaxHeight = (
    subType: ButtonV2SubType,
    tokens: ButtonV2TokensType,
    size: ButtonV2Size
): string => {
    if (subType === ButtonV2SubType.INLINE) {
        return '100%'
    }
    const maxHeight = tokens.slotMaxHeight[size]
    return maxHeight ? String(maxHeight) : '100%'
}

/**
 * Create click handler with disabled/loading/skeleton checks
 *
 * @param onClick - Original onClick handler
 * @param isSkeleton - Whether button is in skeleton state
 * @param disabled - Whether button is disabled
 * @param loading - Whether button is loading
 * @returns Click handler function
 */
export const createButtonClickHandler = (
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
    isSkeleton?: boolean,
    disabled?: boolean,
    loading?: boolean
) => {
    return (event: MouseEvent<HTMLButtonElement>) => {
        if (isSkeleton || disabled || loading) {
            return
        }
        onClick?.(event)
    }
}

/**
 * Get default line height from foundation theme
 *
 * @returns Line height value
 */
export const getDefaultLineHeight = (): string | undefined => {
    return formatLineHeight(FOUNDATION_THEME.font.size.body.md.lineHeight)
}

/**
 * Check if button should show skeleton
 *
 * @param showSkeleton - Whether to show skeleton
 * @returns Skeleton state object
 */
export const shouldShowSkeleton = (showSkeleton: boolean) => {
    return getSkeletonState(showSkeleton)
}

/**
 * Validate button props
 *
 * @param props - Button props
 * @param componentName - Component name for error messages
 */
export const validateButtonV2Props = (
    props: ButtonV2Props,
    componentName: string = 'ButtonV2'
): void => {
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    // Check icon-only button has aria-label
    if (
        props.subType === ButtonV2SubType.ICON_ONLY &&
        !props.text &&
        !props['aria-label']
    ) {
        console.warn(
            `${componentName}: Icon-only buttons should have an aria-label for accessibility`
        )
    }

    // Check loading and disabled together
    if (props.loading && props.disabled) {
        console.warn(
            `${componentName}: "loading" and "disabled" should not be used together`
        )
    }

    // Check button group position without group context
    if (props.buttonGroupPosition && !props.text && !props.leadingIcon) {
        console.warn(
            `${componentName}: buttonGroupPosition is set but button appears to be standalone`
        )
    }
}
