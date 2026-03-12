import React, { type ReactNode } from 'react'
import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type FlattenedItem,
    type SingleSelectV2GroupType,
    type SingleSelectV2ItemType,
    type SingleSelectV2SkeletonProps,
} from './singleSelectV2.types'

export const defaultSingleSelectV2Skeleton: SingleSelectV2SkeletonProps = {
    count: 3,
    show: false,
    variant: 'pulse',
}

export const DROPDOWN_DATA_ATTR = 'data-dropdown="dropdown"' as const
export const MENU_SCROLL_SELECTORS = [
    '[data-dropdown="dropdown"]',
    '[role="listbox"]',
    '[role="menu"]',
    '[data-radix-popper-content-wrapper]',
    '[data-radix-dropdown-menu-content]',
] as const

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

export const mergeAriaDescribedBy = (
    ...ids: (string | undefined)[]
): string | undefined => {
    const merged = ids.filter(Boolean).join(' ')
    return merged || undefined
}

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

export const VIRTUAL_ROW_ESTIMATES = {
    label: 32,
    separator: 8,
    item: 38,
    itemWithSubLabel: 58,
} as const

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
