import { toPixels } from '../../global-utils/GlobalUtils'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import {
    MultiSelectV2Size,
    MultiSelectV2Variant,
    type FlattenedMultiSelectV2Item,
    type MultiSelectV2GroupType,
    type MultiSelectV2ItemType,
} from './multiSelectV2.types'

export const getSelectAllState = (
    selected: string[],
    availableValues: string[]
) => {
    const allSelected =
        availableValues.length > 0 &&
        availableValues.every((value) => selected.includes(value))
    const someSelected = selected.some((value) =>
        availableValues.includes(value)
    )

    return { allSelected, someSelected }
}

export const getValueLabelMap = (
    groups: MultiSelectV2GroupType[]
): Record<string, string> => {
    const valueLabelMap: Record<string, string> = {}

    const traverse = (items: MultiSelectV2ItemType[]) => {
        for (const item of items) {
            valueLabelMap[item.value] = item.label
            if (item.subMenu) traverse(item.subMenu)
        }
    }

    for (const group of groups) {
        traverse(group.items)
    }

    return valueLabelMap
}

export function getMultiSelectBorderRadius(
    size: MultiSelectV2Size,
    variant: MultiSelectV2Variant,
    multiSelectGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: MultiSelectV2TokensType,
    shouldShowClearButton: boolean
): string {
    const variantBorderRadius = String(
        tokens.trigger.borderRadius[size][variant]
    )

    if (multiSelectGroupPosition === undefined) {
        return shouldShowClearButton
            ? `${variantBorderRadius} 0 0 ${variantBorderRadius}`
            : variantBorderRadius
    }

    if (multiSelectGroupPosition === 'left') {
        return `${variantBorderRadius} 0 0 ${variantBorderRadius}`
    }

    if (multiSelectGroupPosition === 'right') {
        return variant === MultiSelectV2Variant.NO_CONTAINER
            ? `0 ${variantBorderRadius} ${variantBorderRadius} 0`
            : `0 0 0 0`
    }

    return '0px 0px 0px 0px'
}

export function getMultiSelectCrossBorderRadius(
    size: MultiSelectV2Size,
    variant: MultiSelectV2Variant,
    multiSelectGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: MultiSelectV2TokensType
): { borderRadius: string; borderRight?: string } {
    const variantBorderRadius = String(
        tokens.trigger.borderRadius[size][variant]
    )

    if (multiSelectGroupPosition === undefined) {
        return {
            borderRadius: `0 ${variantBorderRadius} ${variantBorderRadius} 0`,
            borderRight: '',
        }
    }

    if (multiSelectGroupPosition === 'left') {
        return { borderRadius: '0 0 0 0', borderRight: '0px !important' }
    }

    if (multiSelectGroupPosition === 'right') {
        return {
            borderRadius: `0 ${variantBorderRadius} ${variantBorderRadius} 0`,
            borderRight: '',
        }
    }

    return { borderRadius: '0 0 0 0', borderRight: '0px !important' }
}

export const getFilteredMenuItem = (
    item: MultiSelectV2ItemType,
    queryLower: string
): MultiSelectV2ItemType | null => {
    const matches =
        (item.label && item.label.toLowerCase().includes(queryLower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(queryLower))

    if (item.subMenu) {
        const filteredSubItems = item.subMenu
            .map((subItem: MultiSelectV2ItemType) =>
                getFilteredMenuItem(subItem, queryLower)
            )
            .filter(Boolean) as MultiSelectV2ItemType[]
        if (filteredSubItems.length > 0 || matches) {
            return { ...item, subMenu: filteredSubItems }
        }
        return null
    }
    return matches ? item : null
}

export const filterMenuGroups = (
    groups: MultiSelectV2GroupType[],
    searchText: string
): MultiSelectV2GroupType[] => {
    if (!searchText) return groups
    const queryLower = searchText.toLowerCase()
    return groups
        .map((group: MultiSelectV2GroupType) => {
            const filteredItems = group.items
                .map((item: MultiSelectV2ItemType) =>
                    getFilteredMenuItem(item, queryLower)
                )
                .filter(Boolean) as MultiSelectV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as MultiSelectV2GroupType[]
}

export const getAllAvailableValues = (
    groups: MultiSelectV2GroupType[]
): string[] => {
    const values: string[] = []

    const collectValues = (items: MultiSelectV2ItemType[]) => {
        items.forEach((item) => {
            if (!item.disabled && !item.alwaysSelected) {
                values.push(item.value)
            }
            if (item.subMenu) collectValues(item.subMenu)
        })
    }

    groups.forEach((group) => collectValues(group.items))
    return values
}

export const handleSelectAll = (
    selectAll: boolean,
    items: MultiSelectV2GroupType[],
    selectedValues: string[],
    onChange: (value: string) => void
) => {
    const scopedValues = getAllAvailableValues(items)
    if (selectAll) {
        scopedValues.forEach((value) => {
            if (!selectedValues.includes(value)) onChange(value)
        })
    } else {
        selectedValues.forEach((value) => {
            if (scopedValues.includes(value)) onChange(value)
        })
    }
}

export const flattenMenuGroups = (
    groups: MultiSelectV2GroupType[]
): FlattenedMultiSelectV2Item[] => {
    const flattened: FlattenedMultiSelectV2Item[] = []
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

const DEFAULT_TRIGGER_PADDING_X = 14
const DEFAULT_TRIGGER_PADDING_Y = 8

export const getTriggerHorizontalPadding = (
    tokens: MultiSelectV2TokensType,
    size: MultiSelectV2Size,
    variant: MultiSelectV2Variant
): number => {
    const value = tokens.trigger?.padding?.[size]?.[variant]?.x
    return value != null ? toPixels(value) : DEFAULT_TRIGGER_PADDING_X
}

export const getTriggerVerticalPadding = (
    tokens: MultiSelectV2TokensType,
    size: MultiSelectV2Size,
    variant: MultiSelectV2Variant
): number => {
    const value = tokens.trigger?.padding?.[size]?.[variant]?.y
    return value != null ? toPixels(value) : DEFAULT_TRIGGER_PADDING_Y
}
