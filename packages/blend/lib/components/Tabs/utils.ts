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
export const prepareDropdownItems = (
    tabs: TabItem[],
    originalItems?: TabItem[]
) => {
    if (!tabs.length) return []

    const originalTabValues = originalItems
        ? new Set(originalItems.map((item) => item.value))
        : new Set<string>()

    return [
        {
            items: tabs.map((tab) => {
                const value = originalTabValues.has(tab.value)
                    ? tab.value
                    : tab.value.includes('_')
                      ? tab.value.split('_')[0]
                      : tab.value

                return {
                    value,
                    label: tab.label,
                }
            }),
        },
    ]
}

/**
 * Returns all tabs for display (no limiting - let horizontal scroll handle overflow)
 */
export const getDisplayTabs = (tabs: TabItem[]): TabItem[] => {
    return tabs
}

/**
 * Calculates the position and width for the tab indicator
 */
export const calculateTabIndicatorPosition = (
    tabElement: HTMLButtonElement,
    listElement: HTMLDivElement
) => {
    const listWidth = listElement.offsetWidth
    const tabLeft = tabElement.offsetLeft
    const tabWidth = tabElement.offsetWidth / listWidth

    return { tabLeft, tabWidth }
}

/**
 * Determines if the tab movement is from left to right
 */
export const isMovingRight = (
    oldTab: HTMLButtonElement,
    newTab: HTMLButtonElement
): boolean => {
    return oldTab.compareDocumentPosition(newTab) === 4
}

/**
 * Calculates transition dimensions for the animated underline
 */
export const calculateTransitionDimensions = (
    oldTab: HTMLButtonElement,
    newTab: HTMLButtonElement,
    listElement: HTMLDivElement
) => {
    const listWidth = listElement.offsetWidth
    const oldTabLeft = oldTab.offsetLeft
    const oldTabWidth = oldTab.offsetWidth
    const newTabLeft = newTab.offsetLeft
    const newTabWidth = newTab.offsetWidth

    const movingRight = isMovingRight(oldTab, newTab)

    if (movingRight) {
        // Moving right: expand from old position to cover both tabs
        const transitionWidth =
            (newTabLeft + newTabWidth - oldTabLeft) / listWidth
        return {
            left: oldTabLeft,
            width: transitionWidth,
            finalLeft: newTabLeft,
            finalWidth: newTabWidth / listWidth,
        }
    } else {
        // Moving left: jump to new position and expand to cover both tabs
        const transitionWidth =
            (oldTabLeft + oldTabWidth - newTabLeft) / listWidth
        return {
            left: newTabLeft,
            width: transitionWidth,
            finalLeft: newTabLeft,
            finalWidth: newTabWidth / listWidth,
        }
    }
}
