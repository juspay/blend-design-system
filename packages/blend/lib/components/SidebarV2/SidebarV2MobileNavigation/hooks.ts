import { useCallback, useEffect, useRef, useState } from 'react'
import type { SidebarV2MobileNavigationItem } from '../types'
import { swapItemsByLabel, updateItemProperties } from './utils'

export const useOrderedItems = <T extends { label: string }>(items: T[]) => {
    const [orderedItems, setOrderedItems] = useState<T[]>(() => items)
    const itemsCountRef = useRef(items.length)

    useEffect(() => {
        if (items.length !== itemsCountRef.current) {
            setOrderedItems(items)
            itemsCountRef.current = items.length
        } else {
            setOrderedItems((current) => updateItemProperties(current, items))
        }
    }, [items])

    return [orderedItems, setOrderedItems] as const
}

export const useItemSelection = (
    orderedItems: SidebarV2MobileNavigationItem[],
    setOrderedItems: (items: SidebarV2MobileNavigationItem[]) => void,
    primaryItems: SidebarV2MobileNavigationItem[],
    hasSecondaryItems: boolean,
    onCollapse: () => void
) => {
    return useCallback(
        (
            item: SidebarV2MobileNavigationItem,
            isSecondaryItem: boolean = false
        ) => {
            item.onClick?.()

            if (
                isSecondaryItem &&
                hasSecondaryItems &&
                primaryItems.length > 0
            ) {
                const lastPrimaryItem = primaryItems[primaryItems.length - 1]
                if (lastPrimaryItem) {
                    setOrderedItems(
                        swapItemsByLabel(
                            orderedItems,
                            item.label,
                            lastPrimaryItem.label
                        )
                    )
                }
            }

            onCollapse()
        },
        [
            orderedItems,
            setOrderedItems,
            primaryItems,
            hasSecondaryItems,
            onCollapse,
        ]
    )
}
