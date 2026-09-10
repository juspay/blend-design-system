import {
    SelectV2Variant,
    SelectV2Size,
    MultiSelectV2SelectionTagType,
    type MultiSelectV2ItemType,
    type MultiSelectV2GroupType,
    type MultiSelectV2TokensType,
    type SelectV2ItemStates,
    getNextSelectionAfterToggle,
    isBlockedByMaxSelections,
    clampScopeToMaxSelections,
    emitLegacyScopeChanges,
} from '@juspay/blend-design-system/node'
import type {
    DropdownItemAdapter,
    DropdownContentTokens,
    DropdownItemTokens,
    DropdownItemState,
    DropdownTriggerState,
} from '../shared/dropdown/dropdown.types'
import type { FilterableItem } from '../shared/dropdown/dropdownFilter'

export {
    getNextSelectionAfterToggle,
    isBlockedByMaxSelections,
    clampScopeToMaxSelections,
    emitLegacyScopeChanges,
}

/**
 * Adapt a `MultiSelectV2ItemType` to the common `DropdownItemAdapter`.
 * The selected state is derived by checking if `item.value` is in the
 * `selectedValues` array.
 */
export function multiSelectItemAdapter(
    item: MultiSelectV2ItemType,
    index: number,
    selectedValues: string[]
): DropdownItemAdapter<MultiSelectV2ItemType> {
    return {
        id: `ms-item-${index}`,
        primaryText: item.label,
        secondaryText: item.subLabel,
        leadingSlot: item.slot1,
        trailingSlot: item.slot2,
        disabled: item.disabled,
        isSelected: selectedValues.includes(item.value),
        hasSubMenu: Boolean(item.subMenu && item.subMenu.length > 0),
        variant: 'default',
        item,
    }
}

/** Build a value→label map (ported from web, pure). */
export function getValueLabelMap(
    groups: MultiSelectV2GroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}
    const traverse = (items: MultiSelectV2ItemType[]) => {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) traverse(item.subMenu)
        }
    }
    for (const group of groups) traverse(group.items)
    return map
}

/**
 * Compute select-all state (ported from web, pure).
 * `allSelected` is true only when there are available values and every one
 * is in the selected list. `someSelected` is true when any available value
 * is selected.
 */
export function getSelectAllState(
    selected: string[],
    availableValues: string[]
) {
    const allSelected =
        availableValues.length > 0 &&
        availableValues.every((value) => selected.includes(value))
    const someSelected = selected.some((value) =>
        availableValues.includes(value)
    )
    return { allSelected, someSelected }
}

/**
 * Collect all selectable values — not disabled, not alwaysSelected —
 * recursing into sub-menus (ported from web, pure).
 */
export function getAllAvailableValues(
    groups: MultiSelectV2GroupType[]
): string[] {
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

/**
 * Handle a select-all gesture (ported from web, pure). Computes the scoped
 * values (clamped to maxSelections on the select branch), emits the legacy
 * per-item `onChange` calls, and returns the resulting selection for the
 * aggregate `onSelectionChange` callback.
 */
export function handleSelectAll(
    selectAll: boolean,
    items: MultiSelectV2GroupType[],
    selectedValues: string[],
    onChange?: (value: string) => void,
    maxSelections?: number
): string[] {
    const availableValues = getAllAvailableValues(items)
    const scopedValues = selectAll
        ? clampScopeToMaxSelections(
              selectedValues,
              availableValues,
              maxSelections
          )
        : availableValues

    emitLegacyScopeChanges(selectAll, scopedValues, selectedValues, onChange)

    // Compute the resulting selection
    const selectedSet = new Set(selectedValues)
    if (selectAll) {
        // Add all scoped values
        scopedValues.forEach((v) => selectedSet.add(v))
    } else {
        // Remove all scoped values
        scopedValues.forEach((v) => selectedSet.delete(v))
    }
    return Array.from(selectedSet)
}

/** Filter a single item (ported from web, pure). */
export function getFilteredMenuItem(
    item: MultiSelectV2ItemType,
    queryLower: string
): MultiSelectV2ItemType | null {
    const matches =
        (item.label && item.label.toLowerCase().includes(queryLower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(queryLower))

    if (item.subMenu) {
        const filteredSubItems = item.subMenu
            .map((subItem) => getFilteredMenuItem(subItem, queryLower))
            .filter(Boolean) as MultiSelectV2ItemType[]
        if (filteredSubItems.length > 0 || matches) {
            return { ...item, subMenu: filteredSubItems }
        }
        return null
    }
    return matches ? item : null
}

/** Filter groups (ported from web, pure). */
export function filterMultiSelectV2MenuGroups(
    groups: MultiSelectV2GroupType[],
    searchText: string
): MultiSelectV2GroupType[] {
    if (!searchText) return groups
    const queryLower = searchText.toLowerCase()
    return groups
        .map((group) => {
            const filteredItems = group.items
                .map((item) => getFilteredMenuItem(item, queryLower))
                .filter(Boolean) as MultiSelectV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as MultiSelectV2GroupType[]
}

/** Flatten groups (ported from web, pure). */
export function flattenMenuGroups(groups: MultiSelectV2GroupType[]): Array<{
    label?: string
    items: DropdownItemAdapter<MultiSelectV2ItemType>[]
    showSeparator?: boolean
}> {
    let globalIndex = 0
    return groups.map((group) => ({
        label: group.groupLabel,
        items: group.items.map((item) =>
            multiSelectItemAdapter(item, globalIndex++, [])
        ),
        showSeparator: group.showSeparator,
    }))
}

/** Convert a MultiSelect item to a filterable shape. */
export function toFilterableItem(
    item: MultiSelectV2ItemType
): FilterableItem<MultiSelectV2ItemType> {
    return {
        primaryText: item.label,
        secondaryText: item.subLabel,
        subItems: item.subMenu?.map(toFilterableItem),
    }
}

/** Map MultiSelectV2 content tokens to the shared `DropdownContentTokens`. */
export function getMultiSelectContentTokens(
    tokens: MultiSelectV2TokensType,
    size: SelectV2Size,
    variant: SelectV2Variant
): DropdownContentTokens {
    const menu = tokens.menu
    return {
        backgroundColor: String(menu.backgroundColor),
        border: String(menu.border),
        borderRadius: menu.borderRadius,
        paddingTop: menu.padding[size][variant].top,
        paddingRight: menu.padding[size][variant].right,
        paddingBottom: menu.padding[size][variant].bottom,
        paddingLeft: menu.padding[size][variant].left,
        minWidth: menu.minWidth,
    }
}

/** Map MultiSelectV2 item tokens to the shared `DropdownItemTokens`. */
export function getMultiSelectItemTokens(
    tokens: MultiSelectV2TokensType
): DropdownItemTokens {
    const item = tokens.menu.item
    const states: DropdownItemState[] = [
        'default',
        'hover',
        'active',
        'focus',
        'focusVisible',
        'disabled',
        'selected',
    ]
    const bgRecord = {} as Record<DropdownItemState, string>
    const colorRecord = {} as Record<DropdownItemState, string>
    const subColorRecord = {} as Record<DropdownItemState, string>
    for (const s of states) {
        bgRecord[s] = String(item.backgroundColor[s as SelectV2ItemStates])
        colorRecord[s] = String(item.option.color[s as SelectV2ItemStates])
        subColorRecord[s] = String(
            item.description.color[s as SelectV2ItemStates]
        )
    }

    return {
        paddingTop: item.paddingTop,
        paddingRight: item.paddingRight,
        paddingBottom: item.paddingBottom,
        paddingLeft: item.paddingLeft,
        margin: item.margin,
        gap: item.gap,
        borderRadius: item.borderRadius,
        backgroundColor: bgRecord,
        text: {
            fontSize: item.option.fontSize,
            fontWeight: item.option.fontWeight,
            color: colorRecord,
            subText: {
                fontSize: item.description.fontSize,
                fontWeight: item.description.fontWeight,
                color: subColorRecord,
            },
            leftSlot: {
                maxWidth: 20,
                maxHeight: 20,
            },
            rightChevron: {
                color: '#6B7280',
                width: 16,
            },
        },
    }
}

/** Flatten groups with selected state into adapter-backed groups. */
export function flattenMultiSelectGroups(
    groups: MultiSelectV2GroupType[],
    selectedValues: string[],
    decorate?: (
        adapter: DropdownItemAdapter<MultiSelectV2ItemType>
    ) => DropdownItemAdapter<MultiSelectV2ItemType>
): Array<{
    label?: string
    items: DropdownItemAdapter<MultiSelectV2ItemType>[]
    showSeparator?: boolean
}> {
    let globalIndex = 0
    return groups.map((group) => ({
        label: group.groupLabel,
        items: group.items.map((item) => {
            const adapter = multiSelectItemAdapter(
                item,
                globalIndex++,
                selectedValues
            )
            return decorate ? decorate(adapter) : adapter
        }),
        showSeparator: group.showSeparator,
    }))
}

/** Resolve the trigger state for token lookup. */
export function getTriggerState(
    open: boolean,
    disabled: boolean,
    hasError: boolean
): DropdownTriggerState {
    if (disabled) return 'closed'
    if (hasError) return 'error'
    if (open) return 'open'
    return 'closed'
}

/** Build the selection tag text for the trigger. */
export function getSelectionTagText(
    selectionTagType: MultiSelectV2SelectionTagType,
    selectedValues: string[],
    valueLabelMap: Record<string, string>
): string | null {
    if (selectedValues.length === 0) return null
    if (selectionTagType === MultiSelectV2SelectionTagType.COUNT) {
        return String(selectedValues.length)
    }
    // TEXT type: show comma-separated labels
    return selectedValues.map((v) => valueLabelMap[v] ?? v).join(', ')
}
