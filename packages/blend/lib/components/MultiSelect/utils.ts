import {
    type MultiSelectMenuGroupType,
    type MultiSelectMenuItemType,
} from './types'

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

export const map = function getValueLabelMap(
    groups: MultiSelectMenuGroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}

    function traverse(items: MultiSelectMenuItemType[]) {
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

export const getAllValues = (groups: MultiSelectMenuGroupType[]): string[] => {
    const values: string[] = []

    const collectValues = (items: MultiSelectMenuItemType[]) => {
        items.forEach((item) => {
            if (!item.disabled && !item.alwaysSelected) {
                values.push(item.value)
            }
            if (item.subMenu) {
                collectValues(item.subMenu)
            }
        })
    }

    groups.forEach((group) => {
        collectValues(group.items)
    })

    return values
}

export const handleSelectAll = (
    selectAll: boolean,
    items: MultiSelectMenuGroupType[],
    selectedValues: string[],
    onChange: (value: string) => void
) => {
    if (selectAll) {
        const allValues = getAllValues(items)
        allValues.forEach((value) => {
            if (!selectedValues.includes(value)) {
                onChange(value)
            }
        })
    } else {
        selectedValues.forEach((value) => {
            onChange(value)
        })
    }
}

export const filterMenuItem = (
    item: MultiSelectMenuItemType,
    lower: string
): MultiSelectMenuItemType | null => {
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: MultiSelectMenuItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as MultiSelectMenuItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

export const getAllAvailableValues = (
    groups: MultiSelectMenuGroupType[]
): string[] => {
    const values: string[] = []

    const collectValues = (items: MultiSelectMenuItemType[]) => {
        items.forEach((item) => {
            if (!item.disabled && !item.alwaysSelected) {
                values.push(item.value)
            }
            if (item.subMenu) {
                collectValues(item.subMenu)
            }
        })
    }

    groups.forEach((group) => {
        collectValues(group.items)
    })

    return values
}

export const filterMenuGroups = (
    groups: MultiSelectMenuGroupType[],
    searchText: string
): MultiSelectMenuGroupType[] => {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group: MultiSelectMenuGroupType) => {
            const filteredItems = group.items
                .map((item: MultiSelectMenuItemType) =>
                    filterMenuItem(item, lower)
                )
                .filter(Boolean) as MultiSelectMenuItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as MultiSelectMenuGroupType[]
}
