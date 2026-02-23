import type { KeyboardEvent } from 'react'
import { CheckboxV2Size, CheckboxV2CheckedState } from './checkboxV2.types'
import { CheckboxV2TokensType } from './checkboxV2.tokens'

export const getCheckboxDataState = (
    checked: boolean | 'indeterminate'
): string => {
    if (checked === 'indeterminate') return CheckboxV2CheckedState.INDETERMINATE
    return checked
        ? CheckboxV2CheckedState.CHECKED
        : CheckboxV2CheckedState.UNCHECKED
}

/**
 * Gets the icon color based on checkbox state
 */
export const getCheckboxIconColor = (
    tokens: CheckboxV2TokensType,
    currentChecked: boolean | 'indeterminate',
    disabled: boolean
): string => {
    if (disabled) {
        return currentChecked === CheckboxV2CheckedState.INDETERMINATE
            ? String(tokens.checkbox.icon.color.indeterminate?.disabled || '')
            : String(tokens.checkbox.icon.color.checked?.disabled || '')
    }
    return currentChecked === CheckboxV2CheckedState.INDETERMINATE
        ? String(tokens.checkbox.icon.color.indeterminate?.default || '')
        : String(tokens.checkbox.icon.color.checked?.default || '')
}

/**
 * Gets the text color based on checkbox state
 */
export const getCheckboxTextColor = (
    tokens: CheckboxV2TokensType,
    disabled: boolean,
    error: boolean
): string => {
    if (disabled) return String(tokens.content.label.color.disabled || '')
    if (error) return String(tokens.content.label.color.error || '')
    return String(tokens.content.label.color.default || '')
}

/**
 * Gets the subtext color based on checkbox state
 */
export const getCheckboxSubtextColor = (
    tokens: CheckboxV2TokensType,
    disabled: boolean,
    error: boolean
): string => {
    if (disabled) return String(tokens.content.subLabel.color.disabled || '')
    if (error) return String(tokens.content.subLabel.color.error || '')
    return String(tokens.content.subLabel.color.default || '')
}

/**
 * Gets the text properties for checkbox labels
 */
export const getCheckboxTextProps = (
    tokens: CheckboxV2TokensType,
    size: CheckboxV2Size,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    fontWeight: string
    color: string
} => ({
    fontSize: String((tokens.content.label.fontSize[size] as string) || ''),
    fontWeight: String((tokens.content.label.fontWeight[size] as string) || ''),
    color: getCheckboxTextColor(tokens, disabled, error),
})

/**
 * Gets the subtext properties for checkbox
 */
export const getCheckboxSubtextProps = (
    tokens: CheckboxV2TokensType,
    size: CheckboxV2Size,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    color: string
} => ({
    fontSize: String(tokens.content.subLabel.fontSize[size] || ''),
    color: getCheckboxSubtextColor(tokens, disabled, error),
})

/**
 * Gets label styles for checkbox components
 */
export const getCheckboxLabelStyles = (disabled: boolean) => ({
    cursor: disabled ? ('not-allowed' as const) : ('pointer' as const),
    display: 'flex' as const,
    alignItems: 'center' as const,
    margin: 0,
    padding: 0,
})

/**
 * Gets accessibility attributes for checkbox
 */
export const getAccessibilityAttributes = (
    uniqueId: string,
    isIndeterminate: boolean
) => {
    return {
        role: 'checkbox',
        'aria-checked': isIndeterminate ? 'mixed' : undefined,
        'aria-labelledby': `${uniqueId}-label`,
        'aria-describedby': `${uniqueId}-description`,
    }
}

/**
 * Generates subtext ID for aria-describedby connection
 * WCAG 4.1.2: aria-describedby must connect to subtext/error messages
 */
export const getSubtextId = (
    uniqueId: string,
    hasSubtext: boolean
): string | undefined => {
    return hasSubtext ? `${uniqueId}-subtext` : undefined
}

/**
 * Merges custom aria-describedby with subtext ID
 * WCAG 4.1.2: Supports multiple IDs space-separated
 */
export const mergeAriaDescribedBy = (
    subtextId: string | undefined,
    customAriaDescribedBy?: string
): string | undefined => {
    if (!subtextId && !customAriaDescribedBy) return undefined
    if (!subtextId) return customAriaDescribedBy
    if (!customAriaDescribedBy) return subtextId
    return `${customAriaDescribedBy} ${subtextId}`.trim()
}

/**
 * Handles keyboard interaction for checkbox root.
 * - On Enter: toggles checked state (indeterminate -> true, otherwise toggles boolean)
 */
export const handleCheckboxKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    checked: boolean | 'indeterminate' | undefined,
    disabled: boolean,
    onCheckedChange?: (checked: boolean | 'indeterminate') => void
): void => {
    if (e.key === 'Enter' && !disabled) {
        e.preventDefault()
        const current = checked || false
        const newValue = current === 'indeterminate' ? true : !current
        onCheckedChange?.(newValue)
    }
}

// getIconSize is now handled by tokens.indicator.iconSize
// getSpacingBySize is now handled by tokens.subtext.spacing and tokens.slotGap
// getFocusRingStyles is now handled by tokens.root.focus
