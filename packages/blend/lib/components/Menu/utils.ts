import {
    MenuGroupType,
    type MenuItemType,
    type MenuSearchSortFn,
} from './types'

export enum MenuMatchRank {
    EXACT = 0,
    PREFIX = 1,
    SUBSTRING = 2,
    NONE = 3,
}

const getFieldMatchRank = (
    fieldValue: string | undefined,
    lower: string
): MenuMatchRank => {
    if (!fieldValue) return MenuMatchRank.NONE
    const value = fieldValue.toLowerCase()
    if (value === lower) return MenuMatchRank.EXACT
    if (value.startsWith(lower)) return MenuMatchRank.PREFIX
    if (value.includes(lower)) return MenuMatchRank.SUBSTRING
    return MenuMatchRank.NONE
}

export const getItemMatchRank = (
    item: MenuItemType,
    lower: string
): MenuMatchRank => {
    return Math.min(
        getFieldMatchRank(item.label, lower),
        getFieldMatchRank(item.subLabel, lower)
    ) as MenuMatchRank
}

export const defaultSearchSortFn: MenuSearchSortFn = (items, searchText) => {
    if (!searchText.trim()) return items
    const lower = searchText.toLowerCase()
    return [...items].sort(
        (a, b) => getItemMatchRank(a, lower) - getItemMatchRank(b, lower)
    )
}

// Utility: Recursively filter menu items and groups by search text
export const filterMenuGroups = (
    groups: MenuGroupType[],
    searchText: string,
    searchSortFn: MenuSearchSortFn = defaultSearchSortFn
): MenuGroupType[] => {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group: MenuGroupType) => {
            // TODO: Should we include the whole group if the label matches?
            // if (group.label && group.label.toLowerCase().includes(lower)) {
            //   return group;
            // }
            const filteredItems = group.items
                .map((item: MenuItemType) => filterMenuItem(item, lower))
                .filter(Boolean) as MenuItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: searchSortFn(filteredItems, searchText) }
        })
        .filter(Boolean) as MenuGroupType[]
}

export const filterMenuItem = (
    item: MenuItemType,
    lower: string
): MenuItemType | null => {
    // Check if this item matches
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    // If it has a submenu, filter recursively
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: MenuItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as MenuItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}
