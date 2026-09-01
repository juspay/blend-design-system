/**
 * Pure group/item filter — recursive for sub-menus.
 *
 * Mirrors web's `filterMenuV2Groups` / `filterMultiSelectV2MenuGroups`:
 * case-insensitive substring match on primary + secondary text, preserving
 * sub-menu structure (a parent that matches stays even if its children do
 * not; children that match stay even if the parent does not).
 */

export type FilterableItem<TItem = unknown> = {
    primaryText: string
    secondaryText?: string
    subItems?: FilterableItem<TItem>[]
}

/**
 * Filter a single item against a query. Returns the item (with filtered
 * sub-items) if it or any descendant matches, or `null` otherwise.
 */
export function filterItem<TItem extends FilterableItem>(
    item: TItem,
    queryLower: string
): TItem | null {
    const matches =
        item.primaryText.toLowerCase().includes(queryLower) ||
        (item.secondaryText != null &&
            item.secondaryText.toLowerCase().includes(queryLower))

    if (item.subItems) {
        const filteredSubItems = item.subItems
            .map((sub) => filterItem(sub, queryLower))
            .filter((x): x is TItem => x !== null)
        if (filteredSubItems.length > 0 || matches) {
            return { ...item, subItems: filteredSubItems }
        }
        return null
    }

    return matches ? item : null
}

/**
 * Filter a list of groups. Groups with no surviving items are dropped.
 */
export function filterGroups<
    TItem extends FilterableItem<TItem>,
    TGroup extends { items: TItem[] },
>(groups: TGroup[], query: string): TGroup[] {
    if (!query) return groups
    const queryLower = query.toLowerCase()
    return groups
        .map((group) => {
            const filteredItems = group.items
                .map((item) => filterItem(item, queryLower))
                .filter((x): x is TItem => x !== null)
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter((x): x is TGroup => x !== null)
}
