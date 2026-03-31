import type { SidebarV2MobileNavigationItem } from '../types'
import type { MobileNavigationV2TokenType } from './mobile.tokens'

export const parseUnitValue = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value
    if (!value) return 0
    const numericValue = Number.parseFloat(String(value))
    return Number.isNaN(numericValue) ? 0 : numericValue
}

export const getSidebarV2CollapsedMobilePadding = (
    tokens: MobileNavigationV2TokenType
): string => {
    const safeAreaOffset = parseUnitValue(tokens.safeAreaOffset)
    const floatingPadding = parseUnitValue(tokens.floatingPadding)
    const rowPaddingY = parseUnitValue(tokens.rowPaddingTop)
    const itemHeight = parseUnitValue(tokens.item.height)
    const rowHeight = rowPaddingY * 2 + itemHeight
    const containerPaddingY = parseUnitValue(tokens.paddingTop)
    const border = parseUnitValue('1px')

    const collapsedHeight =
        rowHeight +
        containerPaddingY * 2 +
        border +
        floatingPadding +
        safeAreaOffset

    return `${collapsedHeight}px`
}

export const calculateMobileNavigationSnapPoints = (
    secondaryRowCount: number,
    viewportHeight: number | undefined,
    tokens: MobileNavigationV2TokenType,
    viewportHeightMultiplier: number
): Array<string | number> => {
    const containerPaddingY = parseUnitValue(tokens.paddingTop)
    const containerGap = parseUnitValue(tokens.gap)
    const rowPaddingY = parseUnitValue(tokens.rowPaddingTop)
    const itemHeight = parseUnitValue(tokens.item.height)
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
    items: SidebarV2MobileNavigationItem[],
    viewportHeight: number | undefined,
    tokens: MobileNavigationV2TokenType,
    primaryVisibleLimit: number,
    viewportHeightMultiplier: number,
    options?: { primaryReservedSlots?: number }
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
    secondaryItems: SidebarV2MobileNavigationItem[],
    primaryVisibleLimit: number
): SidebarV2MobileNavigationItem[][] => {
    if (!secondaryItems.length) return []
    const rows: SidebarV2MobileNavigationItem[][] = []

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
): number => Math.max(0, primaryVisibleLimit - Math.max(itemsInRow, 0))

export const splitPrimaryItems = (
    primaryItems: SidebarV2MobileNavigationItem[],
    showPrimaryAction: boolean
): {
    leftItems: SidebarV2MobileNavigationItem[]
    rightItems: SidebarV2MobileNavigationItem[]
} => {
    if (!showPrimaryAction || primaryItems.length === 0) {
        return { leftItems: primaryItems, rightItems: [] }
    }

    const midpoint = Math.ceil(primaryItems.length / 2)
    return {
        leftItems: primaryItems.slice(0, midpoint),
        rightItems: primaryItems.slice(midpoint),
    }
}

export const swapItemsByLabel = <T extends { label: string }>(
    items: T[],
    itemLabel1: string,
    itemLabel2: string
): T[] => {
    const next = [...items]
    const index1 = next.findIndex((i) => i.label === itemLabel1)
    const index2 = next.findIndex((i) => i.label === itemLabel2)

    if (index1 !== -1 && index2 !== -1 && index1 !== index2) {
        const temp = next[index1]
        next[index1] = next[index2]
        next[index2] = temp
    }

    return next
}

export const updateItemProperties = <T extends { label: string }>(
    orderedItems: T[],
    newItems: T[]
): T[] =>
    orderedItems.map((orderedItem) => {
        const updatedItem = newItems.find(
            (item) => item.label === orderedItem.label
        )
        return updatedItem || orderedItem
    })
