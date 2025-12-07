import type { MobileNavigationItem } from '../types'
import type { MobileNavigationTokenType } from './mobile.tokens'
import { parseUnitValue } from '../utils'

export const calculateMobileNavigationSnapPoints = (
    secondaryRowCount: number,
    viewportHeight: number | undefined,
    tokens: MobileNavigationTokenType,
    viewportHeightMultiplier: number
): Array<string | number> => {
    const containerPaddingY = parseUnitValue(tokens.padding.y)
    const containerGap = parseUnitValue(tokens.gap)
    const rowPaddingY = parseUnitValue(tokens.row.padding.y)
    const itemHeight = parseUnitValue(tokens.row.item.height)
    const containerBorder = parseUnitValue('1px')

    const rowHeight = rowPaddingY * 2 + itemHeight
    const collapsedHeight = containerPaddingY * 2 + rowHeight + containerBorder

    if (secondaryRowCount === 0) {
        return [`${collapsedHeight}px`]
    }

    const totalRows = 1 + secondaryRowCount
    const totalRowHeights = totalRows * rowHeight
    const totalRowGaps = secondaryRowCount * containerGap
    const totalExpandedHeight =
        containerPaddingY * 2 + containerBorder + totalRowHeights + totalRowGaps

    if (!viewportHeight) {
        return [`${collapsedHeight}px`, `${totalExpandedHeight}px`]
    }

    const viewportLimit = viewportHeight * viewportHeightMultiplier
    const maxHeight = Math.min(totalExpandedHeight, viewportLimit)

    return [`${collapsedHeight}px`, `${maxHeight}px`]
}

export const getMobileNavigationLayout = (
    items: MobileNavigationItem[],
    viewportHeight: number | undefined,
    tokens: MobileNavigationTokenType,
    primaryVisibleLimit: number,
    viewportHeightMultiplier: number,
    options?: {
        primaryReservedSlots?: number
    }
) => {
    const reservedSlots = Math.max(0, options?.primaryReservedSlots ?? 0)
    const hasOverflow = items.length > primaryVisibleLimit
    const primaryCapacity = hasOverflow
        ? Math.max(0, primaryVisibleLimit - 1)
        : primaryVisibleLimit
    const effectivePrimaryCapacity = Math.max(
        0,
        primaryCapacity - reservedSlots
    )

    const primaryItems = items.slice(0, effectivePrimaryCapacity)
    const secondaryItems = items.slice(effectivePrimaryCapacity)
    const hasSecondaryItems = secondaryItems.length > 0
    const secondaryRowCount = hasSecondaryItems
        ? Math.ceil(secondaryItems.length / primaryVisibleLimit)
        : 0
    const snapPoints = calculateMobileNavigationSnapPoints(
        secondaryRowCount,
        viewportHeight,
        tokens,
        viewportHeightMultiplier
    )

    return {
        primaryItems,
        secondaryItems,
        hasSecondaryItems,
        snapPoints,
    }
}

export const getMobileNavigationSecondaryRows = (
    secondaryItems: MobileNavigationItem[],
    primaryVisibleLimit: number
): MobileNavigationItem[][] => {
    if (!secondaryItems.length) {
        return []
    }

    const rows: MobileNavigationItem[][] = []

    for (
        let index = 0;
        index < secondaryItems.length;
        index += primaryVisibleLimit
    ) {
        rows.push(secondaryItems.slice(index, index + primaryVisibleLimit))
    }

    return rows
}

export const getMobileNavigationFillerCount = (
    itemsInRow: number,
    primaryVisibleLimit: number
): number => {
    return Math.max(0, primaryVisibleLimit - Math.max(itemsInRow, 0))
}

export const splitPrimaryItems = (
    primaryItems: MobileNavigationItem[],
    showPrimaryAction: boolean
): {
    leftItems: MobileNavigationItem[]
    rightItems: MobileNavigationItem[]
} => {
    if (!showPrimaryAction || primaryItems.length === 0) {
        return {
            leftItems: primaryItems,
            rightItems: [],
        }
    }

    const midpoint = Math.ceil(primaryItems.length / 2)

    return {
        leftItems: primaryItems.slice(0, midpoint),
        rightItems: primaryItems.slice(midpoint),
    }
}

/**
 * Swap two items in an array by their labels
 */
export const swapItemsByLabel = <T extends { label: string }>(
    items: T[],
    itemLabel1: string,
    itemLabel2: string
): T[] => {
    const newItems = [...items]
    const index1 = newItems.findIndex((i) => i.label === itemLabel1)
    const index2 = newItems.findIndex((i) => i.label === itemLabel2)

    if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
        const temp = newItems[index1]
        newItems[index1] = newItems[index2]
        newItems[index2] = temp
    }

    return newItems
}

/**
 * Update item properties without changing order
 */
export const updateItemProperties = <T extends { label: string }>(
    orderedItems: T[],
    newItems: T[]
): T[] => {
    return orderedItems.map((orderedItem) => {
        const updatedItem = newItems.find(
            (item) => item.label === orderedItem.label
        )
        return updatedItem || orderedItem
    })
}
