import { CheckboxSize, CheckboxCheckedState } from './types'
import type { CheckboxTokensType } from './checkbox.token'

export const getCheckboxDataState = (
    checked: boolean | 'indeterminate'
): string => {
    if (checked === 'indeterminate') return CheckboxCheckedState.INDETERMINATE
    return checked
        ? CheckboxCheckedState.CHECKED
        : CheckboxCheckedState.UNCHECKED
}

/**
 * Gets the icon color based on checkbox state
 */
export const getCheckboxIconColor = (
    tokens: CheckboxTokensType,
    currentChecked: boolean | 'indeterminate',
    disabled: boolean
): string => {
    if (disabled) {
        return currentChecked === CheckboxCheckedState.INDETERMINATE
            ? String(tokens.indicator.icon.color.indeterminate?.disabled || '')
            : String(tokens.indicator.icon.color.checked?.disabled || '')
    }
    return currentChecked === CheckboxCheckedState.INDETERMINATE
        ? String(tokens.indicator.icon.color.indeterminate?.default || '')
        : String(tokens.indicator.icon.color.checked?.default || '')
}

/**
 * Gets the text color based on checkbox state
 */
export const getCheckboxTextColor = (
    tokens: CheckboxTokensType,
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
    tokens: CheckboxTokensType,
    disabled: boolean,
    error: boolean
): string => {
    if (disabled) return String(tokens.content.subtext.color.disabled || '')
    if (error) return String(tokens.content.subtext.color.error || '')
    return String(tokens.content.subtext.color.default || '')
}

/**
 * Gets the text properties for checkbox labels
 */
export const getCheckboxTextProps = (
    tokens: CheckboxTokensType,
    size: CheckboxSize,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    fontWeight: string
    color: string
} => ({
    fontSize: String(tokens.content.label.fontSize[size] || ''),
    fontWeight: String(tokens.content.label.fontWeight[size] || ''),
    color: getCheckboxTextColor(tokens, disabled, error),
})

/**
 * Gets the subtext properties for checkbox
 */
export const getCheckboxSubtextProps = (
    tokens: CheckboxTokensType,
    size: CheckboxSize,
    disabled: boolean,
    error: boolean
): {
    fontSize: string
    color: string
} => ({
    fontSize: String(tokens.content.subtext.fontSize[size] || ''),
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

// getIconSize is now handled by tokens.indicator.iconSize
// getSpacingBySize is now handled by tokens.subtext.spacing and tokens.slotGap
// getFocusRingStyles is now handled by tokens.root.focus
