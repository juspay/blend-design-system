import { ReactNode } from 'react'
import { TabItem } from './types'

/**
 * Groups tabs by content and concatenates labels for tabs with identical content.
 * Maximum 3 items can be concatenated.
 *
 * @param tabs - Array of tab items to process
 * @returns Processed tabs with concatenation applied
 */
export const processTabsWithConcatenation = (tabs: TabItem[]): TabItem[] => {
    const defaultTabs = tabs.filter((tab) => tab.isDefault)
    const dynamicTabs = tabs.filter((tab) => !tab.isDefault)

    const contentGroups = new Map<ReactNode, TabItem[]>()

    dynamicTabs.forEach((tab) => {
        const existingGroup = Array.from(contentGroups.entries()).find(
            ([content]) => content === tab.content
        )

        if (existingGroup) {
            existingGroup[1].push(tab)
        } else {
            contentGroups.set(tab.content, [tab])
        }
    })

    const processedDynamic: TabItem[] = []

    contentGroups.forEach((groupItems) => {
        if (groupItems.length > 1) {
            const limitedItems = groupItems.slice(0, 3)
            const concatenatedLabel = limitedItems
                .map((item) => item.label)
                .join('+')

            processedDynamic.push({
                value: limitedItems.map((item) => item.value).join('_'),
                label: concatenatedLabel,
                content: limitedItems[0].content,
                closable: true,
                isDefault: false,
            })
        } else {
            // Single item - keep as is
            processedDynamic.push(groupItems[0])
        }
    })

    return [...defaultTabs, ...processedDynamic]
}

/**
 * Sorts tabs to ensure default tabs appear first
 */
export const sortTabsByDefault = (tabs: TabItem[]): TabItem[] => {
    const defaultTabs = tabs.filter((tab) => tab.isDefault)
    const dynamicTabs = tabs.filter((tab) => !tab.isDefault)
    return [...defaultTabs, ...dynamicTabs]
}

/**
 * Filters available items that haven't been added as tabs yet
 */
export const getAvailableItems = <T extends { value: string }>(
    availableItems: T[],
    existingTabs: TabItem[]
): T[] => {
    const existingValues = existingTabs.map((tab) => tab.value)
    return availableItems.filter((item) => !existingValues.includes(item.value))
}

/**
 * Creates tab items from selected values with shared content
 */
export const createTabsFromSelection = <
    T extends { value: string; label: string },
>(
    selectedValues: string[],
    availableItems: T[],
    content: ReactNode
): TabItem[] => {
    return selectedValues
        .map((value) => availableItems.find((item) => item.value === value))
        .filter((item): item is T => item !== undefined)
        .map((item) => ({
            value: item.value,
            label: item.label,
            content,
            closable: true,
            isDefault: false,
        }))
}

/**
 * Prepares items for SingleSelect dropdown (all tabs including scrolled-out)
 */
export const prepareDropdownItems = (tabs: TabItem[]) => {
    if (!tabs.length) return []

    return [
        {
            items: tabs.map((tab) => ({
                value: tab.value.includes('_')
                    ? tab.value.split('_')[0]
                    : tab.value,
                label: tab.label,
            })),
        },
    ]
}

/**
 * Returns all tabs for display (no limiting - let horizontal scroll handle overflow)
 */
export const getDisplayTabs = (tabs: TabItem[]): TabItem[] => {
    return tabs
}
