import { ReactNode } from 'react'
import type { SkeletonVariant } from '../Skeleton/skeleton.tokens'
import type { TabsV2TabItem } from './tabsV2.types'

export const processTabsWithConcatenation = (
    tabs: TabsV2TabItem[]
): TabsV2TabItem[] => {
    const contentGroups = new Map<ReactNode, TabsV2TabItem[]>()
    const processedDynamic: TabsV2TabItem[] = []

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
            processedDynamic.push(groupItems[0])
        }
    })

    return [...tabs, ...processedDynamic]
}

export const prepareDropdownItems = (
    tabs: TabsV2TabItem[],
    originalItems?: TabsV2TabItem[]
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

export const calculateTabIndicatorPosition = (
    tabElement: HTMLButtonElement,
    listElement: HTMLDivElement
) => {
    const listWidth = listElement.offsetWidth
    const tabLeft = tabElement.offsetLeft
    const tabWidth = tabElement.offsetWidth / listWidth

    return { tabLeft, tabWidth }
}

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

export const isConcatenatedTab = (
    tabValue: string,
    originalTabValues: Set<string>
): boolean => {
    return tabValue.includes('_') && !originalTabValues.has(tabValue)
}

export const extractOriginalValues = (concatenatedValue: string): string[] => {
    return concatenatedValue.split('_')
}

export const mergeItemsWithDefaultOrdering = (
    items: TabsV2TabItem[],
    defaultTabs: Set<string>,
    newlyAddedTabs: Set<string>
): TabsV2TabItem[] => {
    const updatedItems = items.map((item) => {
        if (defaultTabs.has(item.value)) {
            const isNewItem = newlyAddedTabs.has(item.value)
            return {
                ...item,
                ...(isNewItem && { newItem: true }),
            }
        }
        return { ...item }
    })

    const nonDefaultItems = updatedItems.filter(
        (item) => !defaultTabs.has(item.value)
    )
    const defaultItems = updatedItems.filter((item) =>
        defaultTabs.has(item.value)
    )
    return [...nonDefaultItems, ...defaultItems]
}

export const applyTabItemDisplayDefaults = (
    items: TabsV2TabItem[],
    disable: boolean,
    showSkeleton: boolean,
    skeletonVariant: SkeletonVariant
): TabsV2TabItem[] => {
    return items.map((item) => ({
        ...item,
        disable: item.disable || disable,
        showSkeleton:
            item.showSkeleton !== undefined ? item.showSkeleton : showSkeleton,
        skeletonVariant:
            item.skeletonVariant !== undefined
                ? item.skeletonVariant
                : skeletonVariant,
    }))
}
