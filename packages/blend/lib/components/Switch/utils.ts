import React from 'react'
import { SwitchSize, type SwitchProps } from './types'
import { FOUNDATION_THEME } from '../../tokens'
import type { SwitchTokensType } from './switch.token'

export const getSwitchDataState = (checked: boolean): string => {
    return checked ? 'checked' : 'unchecked'
}

export const getSpacingBySize = (
    size: SwitchSize
): { marginLeft: string; marginTop: string } => {
    const sizeMap = {
        [SwitchSize.SMALL]: {
            marginLeft: String(FOUNDATION_THEME.unit[32]),
            marginTop: String(FOUNDATION_THEME.unit[4]),
        },
        [SwitchSize.MEDIUM]: {
            marginLeft: String(FOUNDATION_THEME.unit[36]),
            marginTop: String(FOUNDATION_THEME.unit[4]),
        },
    }

    return sizeMap[size]
}

/**
 * Gets the text color based on switch state
 */

export const getSwitchTextColor = (
    tokens: SwitchTokensType,
    disabled: boolean,
    error: boolean
): string => {
    if (error) return String(tokens.content.label.color.error || '')
    if (disabled) return String(tokens.content.label.color.disabled || '')
    return String(tokens.content.label.color.default || '')
}

/**
 * Gets the subtext color based on switch state
 */
export const getSwitchSubtextColor = (
    tokens: SwitchTokensType,
    disabled: boolean,
    error: boolean
): string => {
    if (disabled) return String(tokens.content.subtext.color.disabled || '')
    if (error) return String(tokens.content.subtext.color.error || '')
    return String(tokens.content.subtext.color.default || '')
}

/**
 * Gets the text properties for switch labels
 */
export const getSwitchTextProps = (
    tokens: SwitchTokensType,
    size: SwitchSize,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    fontWeight: string
    color: string
} => ({
    fontSize: String(tokens.content.label.fontSize[size] || ''),
    fontWeight: String(tokens.content.label.fontWeight[size] || ''),
    color: getSwitchTextColor(tokens, disabled, error),
})

/**
 * Gets the subtext properties for switch
 */
export const getSwitchSubtextProps = (
    tokens: SwitchTokensType,
    size: SwitchSize,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    color: string
} => ({
    fontSize: String(tokens.content.subtext.fontSize[size] || ''),
    color: getSwitchSubtextColor(tokens, disabled, error),
})

/**
 * Gets label styles for switch components
 */
export const getSwitchLabelStyles = (disabled: boolean) => ({
    cursor: disabled ? ('not-allowed' as const) : ('pointer' as const),
    display: 'flex' as const,
    alignItems: 'center' as const,
    margin: 0,
    padding: 0,
})

/**
 * Validates if a child element is a Switch component
 */
export const isSwitchElement = (
    child: React.ReactElement,
    SwitchComponent: React.ComponentType<SwitchProps>
): child is React.ReactElement<SwitchProps> => {
    return child.type === SwitchComponent
}

/**
 * Creates a group change handler for switch groups
 */
export const createSwitchGroupChangeHandler = (
    values: string[],
    isControlled: boolean,
    setInternalValues?: React.Dispatch<React.SetStateAction<string[]>>,
    onChange?: (values: string[]) => void
) => {
    return (checked: boolean, childValue: string) => {
        let newValues: string[]

        if (checked) {
            newValues = [...values, childValue]
        } else {
            newValues = values.filter((v) => v !== childValue)
        }

        if (!isControlled && setInternalValues) {
            setInternalValues(newValues)
        }

        onChange?.(newValues)
    }
}

/**
 * Gets the subtext ID for aria-describedby connection
 * WCAG 3.3.2 (Labels or Instructions) & 4.1.2 (Name, Role, Value)
 */
export const getSubtextId = (
    uniqueId: string,
    hasSubtext: boolean
): string | undefined => {
    return hasSubtext ? `${uniqueId}-subtext` : undefined
}

/**
 * Merges aria-describedby values, combining custom and subtext IDs
 * WCAG 4.1.2 (Name, Role, Value)
 */
export const mergeAriaDescribedBy = (
    subtextId: string | undefined,
    customAriaDescribedBy: string | undefined
): string | undefined => {
    if (subtextId && customAriaDescribedBy) {
        return `${customAriaDescribedBy} ${subtextId}`.trim()
    }
    return subtextId || customAriaDescribedBy
}
