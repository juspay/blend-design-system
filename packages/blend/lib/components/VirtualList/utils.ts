import { useState, useCallback, useMemo } from 'react'
import type {
    VirtualListItem,
    UseVirtualListParams,
    UseVirtualListReturn,
} from './types'

// Throttle utility for scroll performance
export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0

    return (...args: Parameters<T>) => {
        const currentTime = Date.now()

        if (currentTime - lastExecTime > wait) {
            func(...args)
            lastExecTime = currentTime
        } else {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(
                () => {
                    func(...args)
                    lastExecTime = Date.now()
                },
                wait - (currentTime - lastExecTime)
            )
        }
    }
}

// SSR safety check
export const isBrowser = typeof window !== 'undefined'

// Binary search for finding the end index efficiently
export const findEndIndexBinarySearch = (
    startIndex: number,
    viewportBottom: number,
    itemOffsets: number[],
    itemsLength: number,
    overscan: number
): number => {
    let low = startIndex
    let high = itemsLength - 1
    let result = startIndex

    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const midOffset = itemOffsets[mid] || 0

        if (midOffset < viewportBottom) {
            result = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return Math.min(itemsLength - 1, result + overscan)
}

// Calculate visible range for fixed heights (optimized)
export const calculateFixedHeightRange = (
    scrollTop: number,
    containerHeight: number,
    itemHeight: number,
    itemsLength: number,
    overscan: number
) => {
    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan
    )
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan
    const endIndex = Math.min(itemsLength - 1, startIndex + visibleCount)
    return { startIndex, endIndex }
}

// Calculate visible range for dynamic heights using binary search
export const calculateDynamicHeightRange = (
    scrollTop: number,
    containerHeight: number,
    itemOffsets: number[],
    itemsLength: number,
    overscan: number
) => {
    if (itemsLength === 0) {
        return { startIndex: 0, endIndex: 0 }
    }

    // Binary search for start index
    let startIndex = 0
    let low = 0
    let high = itemOffsets.length - 1

    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if (itemOffsets[mid] <= scrollTop) {
            startIndex = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    // Apply overscan to start
    startIndex = Math.max(0, startIndex - overscan)

    // Use optimized binary search for end
    const viewportBottom = scrollTop + containerHeight
    const endIndex = findEndIndexBinarySearch(
        startIndex,
        viewportBottom,
        itemOffsets,
        itemsLength,
        overscan
    )

    return { startIndex, endIndex }
}

// Calculate item heights efficiently
export const calculateItemHeights = <T extends VirtualListItem>(
    items: T[],
    itemHeight?: number | ((item: T, index: number) => number),
    getItemHeight?: (item: T, index: number) => number
): number[] => {
    if (typeof itemHeight === 'number') {
        // Fixed height - fastest path
        return new Array(items.length).fill(itemHeight)
    }

    // Dynamic heights - cache for performance
    return items.map((item, index) => {
        if (getItemHeight) {
            return getItemHeight(item, index)
        }
        if (typeof itemHeight === 'function') {
            return itemHeight(item, index)
        }
        return item.height || 40
    })
}

// Calculate offsets efficiently
export const calculateItemOffsets = (itemHeights: number[]) => {
    const offsets: number[] = []
    let total = 0

    for (let i = 0; i < itemHeights.length; i++) {
        offsets[i] = total
        total += itemHeights[i]
    }

    return { totalHeight: total, itemOffsets: offsets }
}

// Main virtual list hook with all production features
export function useVirtualList<T extends VirtualListItem>({
    items,
    itemHeight,
    containerHeight,
    overscan = 5,
    getItemHeight,
    ssrMode = false,
}: UseVirtualListParams<T>): UseVirtualListReturn {
    const [scrollTop, setScrollTop] = useState(0)
    const [forceRecalculate, setForceRecalculate] = useState(0)

    // SSR safety - ensure initial render is consistent
    const safeScrollTop = ssrMode && !isBrowser ? 0 : scrollTop

    // Ultra-fast height calculation with dynamic height support
    const itemHeights = useMemo(() => {
        return calculateItemHeights(items, itemHeight, getItemHeight)
    }, [items, itemHeight, getItemHeight, forceRecalculate])

    // Efficient offset calculation
    const { totalHeight, itemOffsets } = useMemo(() => {
        return calculateItemOffsets(itemHeights)
    }, [itemHeights])

    // Ultra-fast visible range calculation
    const visibleRange = useMemo(() => {
        if (items.length === 0) {
            return { startIndex: 0, endIndex: 0 }
        }

        // Fixed heights - simple math (ultra-fast)
        if (typeof itemHeight === 'number') {
            return calculateFixedHeightRange(
                safeScrollTop,
                containerHeight,
                itemHeight,
                items.length,
                overscan
            )
        }

        // Dynamic heights - optimized binary search
        return calculateDynamicHeightRange(
            safeScrollTop,
            containerHeight,
            itemOffsets,
            items.length,
            overscan
        )
    }, [
        safeScrollTop,
        containerHeight,
        itemHeight,
        itemOffsets,
        items.length,
        overscan,
    ])

    // Force recalculation method for dynamic heights
    const recalculateHeights = useCallback(() => {
        setForceRecalculate((prev) => prev + 1)
    }, [])

    return {
        scrollTop: safeScrollTop,
        setScrollTop,
        totalHeight,
        itemOffsets,
        itemHeights,
        recalculateHeights,
        ...visibleRange,
    }
}

// Keyboard navigation utilities
export const handleVirtualListKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    ariaRole: string,
    totalHeight: number,
    containerRef: React.RefObject<HTMLDivElement | null>,
    onKeyDown?: (event: React.KeyboardEvent) => void
) => {
    onKeyDown?.(e)

    // Basic keyboard navigation for accessibility
    if (ariaRole === 'listbox' || ariaRole === 'menu') {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                // Could implement focus management here
                break
            case 'ArrowUp':
                e.preventDefault()
                // Could implement focus management here
                break
            case 'Home':
                e.preventDefault()
                if (containerRef.current) {
                    containerRef.current.scrollTop = 0
                }
                break
            case 'End':
                e.preventDefault()
                if (containerRef.current) {
                    containerRef.current.scrollTop = totalHeight
                }
                break
        }
    }
}

// Scroll utilities
export const scrollToPosition = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    scrollTop: number
) => {
    if (containerRef.current) {
        containerRef.current.scrollTop = scrollTop
    }
}

export const scrollToIndex = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    index: number,
    itemOffsets: number[],
    itemsLength: number
) => {
    if (containerRef.current && index >= 0 && index < itemsLength) {
        const offset = itemOffsets[index] || 0
        containerRef.current.scrollTop = offset
    }
}

// Render optimization utilities
export const createVirtualItemStyle = (
    top: number,
    height: number
): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height,
    transform: `translateY(${top}px)`,
})

// ResizeObserver setup for dynamic heights
export const setupResizeObserver = (
    dynamicHeight: boolean,
    isMounted: boolean,
    containerRef: React.RefObject<HTMLDivElement | null>,
    recalculateHeights: () => void
) => {
    if (!dynamicHeight || !isBrowser || !isMounted) return

    const resizeObserver = new ResizeObserver(() => {
        // Recalculate heights when any item resizes
        recalculateHeights()
    })

    const container = containerRef.current
    if (container) {
        // Observe all visible items
        const items = container.querySelectorAll('[data-virtual-item]')
        items.forEach((item) => resizeObserver.observe(item))
    }

    return () => {
        resizeObserver.disconnect()
    }
}
