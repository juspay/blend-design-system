import { MenuGroupType, type MenuItemType } from './types'

// Utility: Recursively filter menu items and groups by search text
export const filterMenuGroups = (
    groups: MenuGroupType[],
    searchText: string
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
            return { ...group, items: filteredItems }
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
