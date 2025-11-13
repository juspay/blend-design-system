import type { MobileNavigationItem } from '../types'
import type { MobileNavigationTokenType } from './mobile.tokens'

const parseUnitValue = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
        return value
    }
    if (!value) {
        return 0
    }

    const numericValue = Number.parseFloat(String(value))
    return Number.isNaN(numericValue) ? 0 : numericValue
}

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
