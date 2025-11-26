type BaseMenuItemType = {
    label: string
    value: string
    subMenu?: BaseMenuItemType[]
    [key: string]: any
}

type BaseMenuGroupType<T extends BaseMenuItemType = BaseMenuItemType> = {
    groupLabel?: string
    items: T[]
    showSeparator?: boolean
}

/**
 * Checks if the search text exactly matches any existing item's label or value
 * @param searchText - The text to search for
 * @param groups - Array of menu groups to search in
 * @returns true if an exact match is found, false otherwise
 */
export const hasExactMatch = <T extends BaseMenuItemType>(
    searchText: string,
    groups: BaseMenuGroupType<T>[]
): boolean => {
    if (!searchText.trim()) return false

    const checkItems = (items: T[]): boolean => {
        return items.some(
            (item) =>
                item.label.toLowerCase() === searchText.toLowerCase() ||
                item.value.toLowerCase() === searchText.toLowerCase() ||
                (item.subMenu && checkItems(item.subMenu as T[]))
        )
    }

    return groups.some((group) => checkItems(group.items))
}

/**
 * Returns filtered items with optional custom value item appended
 * @param baseFilteredItems - Already filtered items
 * @param searchText - Current search text
 * @param hasMatch - Whether an exact match exists
 * @param allowCustomValue - Whether custom values are allowed
 * @param enableSearch - Whether search is enabled
 * @param customValueLabel - Label prefix for custom value (default: "Specify")
 * @returns Filtered groups with custom value item if applicable
 */
export const getFilteredItemsWithCustomValue = <
    T extends BaseMenuItemType,
    G extends BaseMenuGroupType<T> = BaseMenuGroupType<T>,
>(
    baseFilteredItems: G[],
    searchText: string,
    hasMatch: boolean,
    allowCustomValue: boolean,
    enableSearch: boolean,
    customValueLabel: string = 'Specify'
): G[] => {
    if (allowCustomValue && searchText.trim() && !hasMatch && enableSearch) {
        const customItem = {
            label: `${customValueLabel}: "${searchText}"`,
            value: searchText,
        } as T

        return [
            ...baseFilteredItems,
            {
                items: [customItem],
                showSeparator: baseFilteredItems.length > 0,
            } as G,
        ]
    }

    return baseFilteredItems
}
