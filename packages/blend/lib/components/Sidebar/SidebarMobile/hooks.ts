import { useState, useEffect, useRef, useCallback } from 'react'
import type { MobileNavigationItem } from '../types'
import { swapItemsByLabel, updateItemProperties } from './utils'

/**
 * Custom hook to manage ordered items with smart property updates.
 * Only resets order when items are added/removed, otherwise preserves order
 * and just updates properties (like isSelected).
 *
 * This hook is extracted because:
 * 1. It encapsulates complex state logic
 * 2. The logic is reusable across different navigation contexts
 * 3. It keeps the component clean and focused on rendering
 */
export const useOrderedItems = <T extends { label: string }>(items: T[]) => {
    const [orderedItems, setOrderedItems] = useState<T[]>(() => items)
    const itemsCountRef = useRef(items.length)

    useEffect(() => {
        if (items.length !== itemsCountRef.current) {
            // Items were added or removed, reset the order
            setOrderedItems(items)
            itemsCountRef.current = items.length
        } else {
            // Just update the properties (like isSelected) without changing order
            setOrderedItems((currentOrdered) =>
                updateItemProperties(currentOrdered, items)
            )
        }
    }, [items])

    return [orderedItems, setOrderedItems] as const
}

/**
 * Custom hook for item selection with smart swapping logic.
 * Handles the complex behavior of swapping secondary items with primary items.
 *
 * This hook is extracted because:
 * 1. It encapsulates business logic for item swapping
 * 2. It reduces component complexity
 * 3. The logic is testable in isolation
 */
export const useItemSelection = (
    orderedItems: MobileNavigationItem[],
    setOrderedItems: (items: MobileNavigationItem[]) => void,
    primaryItems: MobileNavigationItem[],
    hasSecondaryItems: boolean,
    onCollapse: () => void
) => {
    return useCallback(
        (item: MobileNavigationItem, isSecondaryItem: boolean = false) => {
            // Call the item's onClick handler
            item.onClick?.()

            // If clicking a secondary item, swap it with the last primary item
            if (
                isSecondaryItem &&
                hasSecondaryItems &&
                primaryItems.length > 0
            ) {
                const lastPrimaryItem = primaryItems[primaryItems.length - 1]

                if (lastPrimaryItem) {
                    const swapped = swapItemsByLabel(
                        orderedItems,
                        item.label,
                        lastPrimaryItem.label
                    )
                    setOrderedItems(swapped)
                }
            }

            // Collapse the drawer
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
