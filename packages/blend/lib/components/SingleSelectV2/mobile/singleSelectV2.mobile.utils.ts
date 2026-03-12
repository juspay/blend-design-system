import type {
    SingleSelectV2GroupType,
    SingleSelectV2ItemType,
} from '../singleSelectV2.types'

export const filterMobileMenuItem = (
    item: SingleSelectV2ItemType,
    searchText: string
): SingleSelectV2ItemType | null => {
    const lowerSearch = searchText.toLowerCase()
    const isMatch =
        (item.label && item.label.toLowerCase().includes(lowerSearch)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lowerSearch))

    if (!item.subMenu) {
        return isMatch ? item : null
    }

    const filteredSubMenu = item.subMenu
        .map((subItem: SingleSelectV2ItemType) =>
            filterMobileMenuItem(subItem, lowerSearch)
        )
        .filter(Boolean) as SingleSelectV2ItemType[]

    if (filteredSubMenu.length > 0 || isMatch) {
        return { ...item, subMenu: filteredSubMenu }
    }

    return null
}

export const filterMobileMenuGroups = (
    groups: SingleSelectV2GroupType[],
    searchText: string
): SingleSelectV2GroupType[] => {
    if (!searchText) {
        return groups
    }

    return groups
        .map((group: SingleSelectV2GroupType) => {
            const filteredItems = group.items
                .map((item: SingleSelectV2ItemType) =>
                    filterMobileMenuItem(item, searchText)
                )
                .filter(Boolean) as SingleSelectV2ItemType[]

            if (filteredItems.length === 0) {
                return null
            }

            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SingleSelectV2GroupType[]
}
