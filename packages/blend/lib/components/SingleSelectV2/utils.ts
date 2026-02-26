/**
 * Utility functions for SingleSelectV2 component
 * Following the refactoring pattern: logic separated from UI
 */

import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type SingleSelectV2GroupType,
    type SingleSelectV2ItemType,
} from './types'

export type AriaAttributes = {
    'aria-describedby'?: string
    'aria-label'?: string
    'aria-labelledby'?: string
    'aria-invalid'?: boolean
    [key: string]: unknown
}

export type ExtractedAriaProps = {
    'aria-describedby'?: string
    'aria-label'?: string
    'aria-labelledby'?: string
    restProps: Record<string, unknown>
}

export type AccessibilitySetupOptions = {
    name?: string
    generatedId: string
    label?: string
    hintText?: string
    error?: boolean
    errorMessage?: string
    rest?: Record<string, unknown>
    prefix?: string
    needsMenuId?: boolean
}

export type AccessibilitySetupResult = {
    uniqueName: string
    labelId?: string
    hintTextId?: string
    errorMessageId?: string
    menuId?: string
    ariaAttributes: AriaAttributes
}

/**
 * Gets border radius for trigger based on size, variant, and group position
 */
export function getBorderRadius(
    size: SingleSelectV2Size,
    variant: SingleSelectV2Variant,
    singleSelectGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: SingleSelectV2TokensType
): { borderRadius: string; borderRight?: string } {
    const variantBorderRadius = String(
        tokens.trigger.borderRadius[size][variant]
    )
    const styles = {
        borderRadius: '',
        borderRight: '',
    }
    if (singleSelectGroupPosition === undefined) {
        return { ...styles, borderRadius: variantBorderRadius, borderRight: '' }
    }

    if (singleSelectGroupPosition === 'left') {
        return {
            ...styles,
            borderRadius: `${variantBorderRadius} 0 0 ${variantBorderRadius}`,
            borderRight: '0px !important',
        }
    }

    if (singleSelectGroupPosition === 'right') {
        return {
            ...styles,
            borderRadius: `0 ${variantBorderRadius} ${variantBorderRadius} 0`,
            borderRight: '',
        }
    }

    return {
        ...styles,
        borderRadius: '0px 0px 0px 0px',
        borderRight: '0px !important',
    }
}

/**
 * Creates a value-to-label map from groups
 */
export function getValueLabelMap(
    groups: SingleSelectV2GroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: SingleSelectV2ItemType[]) {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) {
                traverse(item.subMenu)
            }
        }
    }

    for (const group of groups) {
        traverse(group.items)
    }

    return map
}

/**
 * Generates unique IDs for accessibility attributes
 * WCAG 4.1.2 (Name, Role, Value)
 */
export const generateAccessibilityIds = (
    uniqueName: string,
    options: {
        hasLabel?: boolean
        hasHintText?: boolean
        hasErrorMessage?: boolean
        needsMenuId?: boolean
    }
): {
    labelId?: string
    hintTextId?: string
    errorMessageId?: string
    menuId?: string
} => {
    return {
        labelId: options.hasLabel ? `${uniqueName}-label` : undefined,
        hintTextId: options.hasHintText ? `${uniqueName}-hint` : undefined,
        errorMessageId: options.hasErrorMessage
            ? `${uniqueName}-error`
            : undefined,
        menuId: options.needsMenuId ? `${uniqueName}-menu` : undefined,
    }
}

/**
 * Extracts ARIA attributes from rest props
 * WCAG 4.1.2 (Name, Role, Value)
 */
export const extractAriaProps = (
    rest: Record<string, unknown> | undefined
): ExtractedAriaProps => {
    const {
        'aria-describedby': customAriaDescribedBy,
        'aria-label': ariaLabel,
        'aria-labelledby': customAriaLabelledBy,
        ...restProps
    } = (rest || {}) as {
        'aria-describedby'?: string
        'aria-label'?: string
        'aria-labelledby'?: string
        [key: string]: unknown
    }

    return {
        'aria-describedby': customAriaDescribedBy,
        'aria-label': ariaLabel,
        'aria-labelledby': customAriaLabelledBy,
        restProps,
    }
}

/**
 * Merges aria-describedby IDs from multiple sources
 * WCAG 3.3.2 (Labels or Instructions) & 4.1.3 (Status Messages)
 */
export const mergeAriaDescribedBy = (
    ...ids: (string | undefined)[]
): string | undefined => {
    const merged = ids.filter(Boolean).join(' ')
    return merged || undefined
}

/**
 * Builds ARIA attributes object for SingleSelectV2 components
 * Note: Radix UI handles aria-expanded and aria-controls automatically
 * We only add form-specific attributes: aria-labelledby, aria-describedby, aria-invalid
 * WCAG 4.1.2 (Name, Role, Value)
 */
export const buildAriaAttributes = (options: {
    error?: boolean
    ariaLabelledBy?: string
    ariaDescribedBy?: string
    ariaLabel?: string
    restProps?: Record<string, unknown>
}): AriaAttributes => {
    const { error, ariaLabelledBy, ariaDescribedBy, ariaLabel, restProps } =
        options

    return {
        'aria-invalid': error ? true : undefined,
        ...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy }),
        ...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy }),
        ...(ariaLabel && { 'aria-label': ariaLabel }),
        ...(restProps || {}),
    }
}

/**
 * Complete accessibility setup for SingleSelectV2 components
 * Handles ID generation, ARIA attribute extraction, and attribute building
 * WCAG 4.1.2 (Name, Role, Value), 3.3.2 (Labels or Instructions), 4.1.3 (Status Messages)
 */
export const setupAccessibility = (
    options: AccessibilitySetupOptions
): AccessibilitySetupResult => {
    const {
        name,
        generatedId,
        label,
        hintText,
        error,
        errorMessage,
        rest,
        prefix = 'singleselectv2',
        needsMenuId = false,
    } = options

    const uniqueName = name || `${prefix}-${generatedId}`

    const { labelId, hintTextId, errorMessageId, menuId } =
        generateAccessibilityIds(uniqueName, {
            hasLabel: !!label,
            hasHintText: !!hintText,
            hasErrorMessage: !!(error && errorMessage),
            needsMenuId,
        })

    const {
        'aria-describedby': customAriaDescribedBy,
        'aria-label': ariaLabel,
        'aria-labelledby': customAriaLabelledBy,
        restProps,
    } = extractAriaProps(rest)

    const ariaDescribedBy = mergeAriaDescribedBy(
        customAriaDescribedBy,
        hintTextId,
        errorMessageId
    )

    const ariaLabelledBy = customAriaLabelledBy || labelId

    const ariaAttributes = buildAriaAttributes({
        error,
        ariaLabelledBy,
        ariaDescribedBy,
        ariaLabel,
        restProps,
    })

    return {
        uniqueName,
        labelId,
        hintTextId,
        errorMessageId,
        menuId,
        ariaAttributes,
    }
}
