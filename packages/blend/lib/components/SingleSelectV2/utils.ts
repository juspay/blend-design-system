/**
 * Utility functions for SingleSelectV2 component
 * Following the refactoring pattern: logic separated from UI
 */

import React, { type ReactNode } from 'react'
import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type FlattenedItem,
    type SingleSelectV2GroupType,
    type SingleSelectV2ItemType,
    type SingleSelectV2SkeletonProps,
} from './types'

/** Default skeleton config for SingleSelectV2 menu (avoids exporting from component file for fast refresh). */
export const defaultSingleSelectV2Skeleton: SingleSelectV2SkeletonProps = {
    count: 3,
    show: false,
    variant: 'pulse',
}

// ---------------------------------------------------------------------------
// Menu / dropdown constants (align with SingleSelect v1 for a11y and data-ids)
// ---------------------------------------------------------------------------

export const DROPDOWN_DATA_ATTR = 'data-dropdown="dropdown"' as const
export const MENU_SCROLL_SELECTORS = [
    '[data-dropdown="dropdown"]',
    '[role="listbox"]',
    '[role="menu"]',
    '[data-radix-popper-content-wrapper]',
    '[data-radix-dropdown-menu-content]',
] as const

/** Default threshold (px from bottom) to trigger onEndReached */
export const DEFAULT_END_REACHED_THRESHOLD = 200

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

// ---------------------------------------------------------------------------
// Menu list flattening (for virtualized lists and consistent indexing)
// ---------------------------------------------------------------------------

export function flattenGroups(
    groups: SingleSelectV2GroupType[]
): FlattenedItem[] {
    const flattened: FlattenedItem[] = []
    let idCounter = 0

    groups.forEach((group, groupId) => {
        if (group.groupLabel) {
            flattened.push({
                id: `label-${groupId}`,
                type: 'label',
                label: group.groupLabel,
                groupId,
            })
        }

        group.items.forEach((item) => {
            flattened.push({
                id: `item-${idCounter++}`,
                type: 'item',
                item,
                groupId,
            })
        })

        if (groupId !== groups.length - 1 && group.showSeparator) {
            flattened.push({
                id: `separator-${groupId}`,
                type: 'separator',
                groupId,
            })
        }
    })

    return flattened
}

// ---------------------------------------------------------------------------
// Menu search filtering (recursive by label / subLabel)
// ---------------------------------------------------------------------------

export function filterMenuGroups(
    groups: SingleSelectV2GroupType[],
    searchText: string
): SingleSelectV2GroupType[] {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group) => {
            const filteredItems = group.items
                .map((item) => filterMenuItem(item, lower))
                .filter(Boolean) as SingleSelectV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SingleSelectV2GroupType[]
}

export function filterMenuItem(
    item: SingleSelectV2ItemType,
    lower: string
): SingleSelectV2ItemType | null {
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub) => filterMenuItem(sub, lower))
            .filter(Boolean) as SingleSelectV2ItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

// ---------------------------------------------------------------------------
// Trigger / DOM helpers
// ---------------------------------------------------------------------------

/** Detect if trigger is a Tooltip wrapping the actual button (for Radix asChild) */
export function isTooltipWrappingTrigger(trigger: ReactNode): boolean {
    return (
        typeof trigger === 'object' &&
        trigger !== null &&
        React.isValidElement(trigger) &&
        trigger.props !== null &&
        typeof trigger.props === 'object' &&
        'content' in trigger.props &&
        'children' in trigger.props
    )
}

/** Compute global item index from group index and item index within group */
export function getMenuItemIndex(
    filteredGroups: SingleSelectV2GroupType[],
    groupId: number,
    itemIndex: number
): number {
    let index = 0
    for (let i = 0; i < groupId; i++) {
        index += filteredGroups[i].items.length
    }
    return index + itemIndex
}

/** Default row height estimates for virtualizer (px). Match static list: item padding + line height; with subLabel add one line + gap. */
export const VIRTUAL_ROW_ESTIMATES = {
    /** Group label row (font sm + padding) */
    label: 32,
    /** Separator bar */
    separator: 8,
    /** Single-line item (padding 6*2 + line ~20) */
    item: 38,
    /** Item with subLabel (label line + gap + description line) */
    itemWithSubLabel: 58,
} as const

/** Per-index size estimate for virtual list so initial layout matches static list (label/separator/item/subLabel). */
export function getVirtualRowEstimate(
    flattened: FlattenedItem[],
    index: number
): number {
    if (index < 0 || index >= flattened.length)
        return VIRTUAL_ROW_ESTIMATES.item
    const row = flattened[index]
    if (row.type === 'label') return VIRTUAL_ROW_ESTIMATES.label
    if (row.type === 'separator') return VIRTUAL_ROW_ESTIMATES.separator
    if (row.type === 'item' && row.item?.subLabel)
        return VIRTUAL_ROW_ESTIMATES.itemWithSubLabel
    return VIRTUAL_ROW_ESTIMATES.item
}

/** Count of selectable items in flattened list up to (and excluding) flatIndex */
export function getItemOrdinalIndex(
    flattened: FlattenedItem[],
    flatIndex: number
): number {
    let count = 0
    for (let i = 0; i < flatIndex && i < flattened.length; i++) {
        if (flattened[i].type === 'item') count++
    }
    return count
}
