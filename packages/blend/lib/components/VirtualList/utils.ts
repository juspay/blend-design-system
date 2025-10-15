export const isBrowser = typeof window !== 'undefined'

/**
 * Binary search to find the first visible node
 */
export function findStartNode(
    scrollTop: number,
    nodePositions: number[],
    itemCount: number
): number {
    let startRange = 0
    let endRange = itemCount - 1

    while (endRange !== startRange) {
        const middle = Math.floor((endRange - startRange) / 2 + startRange)

        if (
            nodePositions[middle] <= scrollTop &&
            nodePositions[middle + 1] > scrollTop
        ) {
            return middle
        }

        if (middle === startRange) {
            // Edge case - start and end range are consecutive
            return endRange
        } else {
            if (nodePositions[middle] <= scrollTop) {
                startRange = middle
            } else {
                endRange = middle
            }
        }
    }
    return 0
}

/**
 * Find the last visible node
 */
export function findEndNode(
    nodePositions: number[],
    startNode: number,
    itemCount: number,
    viewportHeight: number
): number {
    let endNode
    for (endNode = startNode; endNode < itemCount; endNode++) {
        if (
            nodePositions[endNode] >
            nodePositions[startNode] + viewportHeight
        ) {
            return endNode
        }
    }
    return endNode
}

/**
 * Calculate which items should be visible based on scroll position
 */
export function calculateVisibleRange(
    scrollTop: number,
    containerHeight: number,
    itemOffsets: number[],
    itemsLength: number,
    overscan: number
): { startIndex: number; endIndex: number } {
    if (!containerHeight || itemsLength === 0) {
        return { startIndex: 0, endIndex: Math.min(20, itemsLength - 1) }
    }

    const viewportTop = scrollTop
    const viewportBottom = scrollTop + containerHeight

    // Find start index
    let startIndex = 0
    for (let i = 0; i < itemOffsets.length; i++) {
        if (itemOffsets[i] >= viewportTop) {
            startIndex = Math.max(0, i - overscan)
            break
        }
    }

    // Find end index
    let endIndex = itemsLength - 1
    for (let i = startIndex; i < itemOffsets.length; i++) {
        if (itemOffsets[i] > viewportBottom) {
            endIndex = Math.min(itemsLength - 1, i + overscan)
            break
        }
    }

    return { startIndex, endIndex }
}

/**
 * Calculate child positions for virtual list items
 */
export function calculateChildPositions(
    itemsLength: number,
    itemHeight: number | undefined,
    defaultHeight: number = 50
): number[] {
    if (!itemsLength) return [0]

    const results = new Array(itemsLength)
    results[0] = 0
    const height = itemHeight || defaultHeight

    for (let i = 1; i < itemsLength; i++) {
        results[i] = results[i - 1] + height
    }

    return results
}

/**
 * Calculate total height based on child positions and item height
 */
export function calculateTotalHeight(
    childPositions: number[],
    itemsLength: number,
    itemHeight: number | undefined,
    defaultHeight: number = 50
): number {
    if (!childPositions.length || !itemsLength) return 0
    return childPositions[itemsLength - 1] + (itemHeight || defaultHeight)
}

/**
 * Calculate visible range with overscan
 */
export function calculateVisibleNodes(
    firstVisibleNode: number,
    lastVisibleNode: number,
    itemsLength: number,
    overscan: number
): { startNode: number; endNode: number; visibleNodeCount: number } {
    const startNode = Math.max(0, firstVisibleNode - overscan)
    const endNode = Math.min(itemsLength - 1, lastVisibleNode + overscan)
    const visibleNodeCount = Math.max(0, endNode - startNode + 1)

    return { startNode, endNode, visibleNodeCount }
}

/**
 * Calculate total height and offsets for all items
 */
export function calculateItemPositions(
    itemsLength: number,
    itemHeight: number | undefined,
    measuredHeights: Map<number, number>,
    defaultHeight: number = 50
): { totalHeight: number; itemOffsets: number[] } {
    const offsets: number[] = []
    let currentOffset = 0

    for (let i = 0; i < itemsLength; i++) {
        offsets.push(currentOffset)
        const height = itemHeight || measuredHeights.get(i) || defaultHeight
        currentOffset += height
    }

    return {
        totalHeight: currentOffset,
        itemOffsets: offsets,
    }
}
