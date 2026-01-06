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
    const contentGroups = new Map<ReactNode, TabItem[]>()

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
                newItem: false,
            })
        } else {
            // Single item - keep as is
            processedDynamic.push(groupItems[0])
        }
    })

    return [...tabs, ...processedDynamic]
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
            isDefault: false,
            closable: false,
        }))
}

/**
 * Prepares items for SingleSelect dropdown (all tabs including scrolled-out)
 */
export const prepareDropdownItems = (
    tabs: TabItem[],
    originalItems?: TabItem[]
) => {
    const itemsToShow =
        originalItems && originalItems.length > 0 ? originalItems : tabs

    if (!itemsToShow.length) return []

    return [
        {
            items: itemsToShow.map((tab) => ({
                value: tab.value,
                label: tab.label,
            })),
        },
    ]
}

/**
 * Returns tabs for display based on isDefault flag and maxDisplayTabs limit.
 * - Default tabs (isDefault: true) are shown in the list
 * - Non-default tabs are shown in dropdown
 * - If maxDisplayTabs is set and there are more default tabs, only maxDisplayTabs are shown in list
 */
export const getDisplayTabs = (
    tabs: TabItem[],
    maxDisplayTabs?: number,
    activeTab?: string
): TabItem[] => {
    const defaultTabs = tabs.filter((tab) => tab.isDefault === true)

    if (
        !maxDisplayTabs ||
        maxDisplayTabs <= 0 ||
        defaultTabs.length <= maxDisplayTabs
    ) {
        return defaultTabs.length > 0 ? defaultTabs : tabs
    }

    const activeIndex = activeTab
        ? defaultTabs.findIndex((tab) => tab.value === activeTab)
        : -1

    if (activeIndex === -1) {
        return defaultTabs.slice(0, maxDisplayTabs)
    }

    let startIndex = Math.max(0, activeIndex - Math.floor(maxDisplayTabs / 2))

    if (startIndex + maxDisplayTabs > defaultTabs.length) {
        startIndex = Math.max(0, defaultTabs.length - maxDisplayTabs)
    }

    return defaultTabs.slice(startIndex, startIndex + maxDisplayTabs)
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

/**
 * Determines the actual tab value from a potentially concatenated value
 * Concatenated tabs use underscore as separator, but we need to distinguish
 * from single tabs that naturally have underscores in their values
 */
export const getActualTabValue = (
    processedValue: string,
    originalTabValues: Set<string>
): string => {
    if (originalTabValues.has(processedValue)) {
        return processedValue
    }

    if (processedValue.includes('_')) {
        return processedValue.split('_')[0]
    }

    return processedValue
}

/**
 * Checks if a concatenated tab value should trigger multiple close events
 */
export const isConcatenatedTab = (
    tabValue: string,
    originalTabValues: Set<string>
): boolean => {
    return tabValue.includes('_') && !originalTabValues.has(tabValue)
}

/**
 * Extracts original values from a concatenated tab value
 */
export const extractOriginalValues = (concatenatedValue: string): string[] => {
    return concatenatedValue.split('_')
}
