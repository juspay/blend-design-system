import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import type {
    VirtualListItem,
    UseVirtualListParams,
    UseVirtualListReturn,
    ScrollAlignment,
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
    overscan: number,
    itemsToRender?: number
) => {
    const startIndex = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - overscan
    )

    let visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan

    // If itemsToRender is specified, limit the visible count
    if (itemsToRender !== undefined && itemsToRender > 0) {
        visibleCount = Math.min(visibleCount, itemsToRender)
    }

    const endIndex = Math.min(itemsLength - 1, startIndex + visibleCount)
    return { startIndex, endIndex }
}

// Calculate visible range for dynamic heights using binary search
export const calculateDynamicHeightRange = (
    scrollTop: number,
    containerHeight: number,
    itemOffsets: number[],
    itemsLength: number,
    overscan: number,
    itemsToRender?: number
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
    let endIndex = findEndIndexBinarySearch(
        startIndex,
        viewportBottom,
        itemOffsets,
        itemsLength,
        overscan
    )

    // If itemsToRender is specified, limit the range
    if (itemsToRender !== undefined && itemsToRender > 0) {
        endIndex = Math.min(endIndex, startIndex + itemsToRender - 1)
    }

    return { startIndex, endIndex }
}

// Calculate item heights efficiently with min/max constraints
export const calculateItemHeights = <T extends VirtualListItem>(
    items: T[],
    itemHeight?: number | ((item: T, index: number) => number),
    getItemHeight?: (item: T, index: number) => number,
    estimatedItemHeight?: number,
    minHeight?: number,
    maxHeight?: number,
    measuredHeights?: Map<number, number>
): number[] => {
    const defaultHeight = estimatedItemHeight || 40

    if (typeof itemHeight === 'number') {
        // Fixed height - fastest path
        const constrainedHeight = constrainHeight(
            itemHeight,
            minHeight,
            maxHeight
        )
        return new Array(items.length).fill(constrainedHeight)
    }

    // Dynamic heights - cache for performance
    return items.map((item, index) => {
        // Check if we have a measured height
        if (measuredHeights?.has(index)) {
            return measuredHeights.get(index)!
        }

        let height = defaultHeight

        if (getItemHeight) {
            height = getItemHeight(item, index)
        } else if (typeof itemHeight === 'function') {
            height = itemHeight(item, index)
        } else if (item.height) {
            height = item.height
        }

        return constrainHeight(height, minHeight, maxHeight)
    })
}

// Constrain height to min/max bounds
export const constrainHeight = (
    height: number,
    minHeight?: number,
    maxHeight?: number
): number => {
    let constrained = height
    if (minHeight !== undefined) {
        constrained = Math.max(constrained, minHeight)
    }
    if (maxHeight !== undefined) {
        constrained = Math.min(constrained, maxHeight)
    }
    return constrained
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
    estimatedItemHeight,
    itemsToRender,
    minHeight,
    maxHeight,
}: UseVirtualListParams<T>): UseVirtualListReturn {
    const [scrollTop, setScrollTop] = useState(0)
    const [forceRecalculate, setForceRecalculate] = useState(0)
    const measuredHeightsRef = useRef<Map<number, number>>(new Map())

    // SSR safety - ensure initial render is consistent
    const safeScrollTop = ssrMode && !isBrowser ? 0 : scrollTop

    // Measure item method for dynamic heights
    const measureItem = useCallback(
        (index: number, height: number) => {
            const constrainedHeight = constrainHeight(
                height,
                minHeight,
                maxHeight
            )
            const current = measuredHeightsRef.current.get(index)

            if (current !== constrainedHeight) {
                measuredHeightsRef.current.set(index, constrainedHeight)
                setForceRecalculate((prev) => prev + 1)
            }
        },
        [minHeight, maxHeight]
    )

    // Ultra-fast height calculation with dynamic height support
    const itemHeights = useMemo(() => {
        return calculateItemHeights(
            items,
            itemHeight,
            getItemHeight,
            estimatedItemHeight,
            minHeight,
            maxHeight,
            measuredHeightsRef.current
        )
    }, [
        items,
        itemHeight,
        getItemHeight,
        estimatedItemHeight,
        minHeight,
        maxHeight,
        forceRecalculate,
    ])

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
                overscan,
                itemsToRender
            )
        }

        // Dynamic heights - optimized binary search
        return calculateDynamicHeightRange(
            safeScrollTop,
            containerHeight,
            itemOffsets,
            items.length,
            overscan,
            itemsToRender
        )
    }, [
        safeScrollTop,
        containerHeight,
        itemHeight,
        itemOffsets,
        items.length,
        overscan,
        itemsToRender,
    ])

    // Force recalculation method for dynamic heights
    const recalculateHeights = useCallback(() => {
        measuredHeightsRef.current.clear()
        setForceRecalculate((prev) => prev + 1)
    }, [])

    return {
        scrollTop: safeScrollTop,
        setScrollTop,
        totalHeight,
        itemOffsets,
        itemHeights,
        recalculateHeights,
        measureItem,
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

// Calculate scroll position for alignment
export const calculateScrollForAlignment = (
    index: number,
    alignment: ScrollAlignment,
    containerHeight: number,
    itemOffsets: number[],
    itemHeights: number[],
    itemsLength: number
): number => {
    if (index < 0 || index >= itemsLength) {
        return 0
    }

    const itemOffset = itemOffsets[index] || 0
    const itemHeight = itemHeights[index] || 40

    switch (alignment) {
        case 'start':
            return itemOffset
        case 'center':
            return itemOffset - (containerHeight - itemHeight) / 2
        case 'end':
            return itemOffset - containerHeight + itemHeight
        case 'auto':
        default: {
            // Auto: scroll only if item is not visible
            const scrollTop = itemOffsets[0] || 0
            const itemEnd = itemOffset + itemHeight
            const viewportEnd = scrollTop + containerHeight

            if (itemOffset < scrollTop) {
                return itemOffset // Scroll to start
            } else if (itemEnd > viewportEnd) {
                return itemOffset - containerHeight + itemHeight // Scroll to end
            }
            return scrollTop // No scroll needed
        }
    }
}

// Scroll utilities with smooth scrolling support
export const scrollToPosition = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    scrollTop: number,
    smooth: boolean = false
) => {
    if (containerRef.current) {
        if (smooth) {
            containerRef.current.scrollTo({
                top: scrollTop,
                behavior: 'smooth',
            })
        } else {
            containerRef.current.scrollTop = scrollTop
        }
    }
}

export const scrollToIndex = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    index: number,
    itemOffsets: number[],
    itemHeights: number[],
    itemsLength: number,
    containerHeight: number,
    alignment: ScrollAlignment = 'start',
    smooth: boolean = false
) => {
    if (containerRef.current && index >= 0 && index < itemsLength) {
        const scrollTop = calculateScrollForAlignment(
            index,
            alignment,
            containerHeight,
            itemOffsets,
            itemHeights,
            itemsLength
        )
        scrollToPosition(containerRef, Math.max(0, scrollTop), smooth)
    }
}

// Render optimization utilities
export const createVirtualItemStyle = (
    top: number,
    height: number,
    useAbsolute: boolean = true
): React.CSSProperties => {
    if (!useAbsolute) {
        return {
            minHeight: height,
            height: 'auto',
        }
    }

    return {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height,
        transform: `translateY(${top}px)`,
    }
}

// ResizeObserver setup for dynamic heights with better measurement
export const setupResizeObserver = (
    dynamicHeight: boolean,
    isMounted: boolean,
    containerRef: React.RefObject<HTMLDivElement | null>,
    measureItem: (index: number, height: number) => void
) => {
    if (!dynamicHeight || !isBrowser || !isMounted) return

    const resizeObserver = new ResizeObserver((entries) => {
        // Measure each resized item individually
        entries.forEach((entry) => {
            const element = entry.target as HTMLElement
            const index = element.getAttribute('data-index')
            if (index !== null) {
                const height = entry.contentRect.height
                measureItem(parseInt(index, 10), height)
            }
        })
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

// Check if end is reached for infinite scroll
export const checkEndReached = (
    scrollTop: number,
    totalHeight: number,
    containerHeight: number,
    threshold: number
): boolean => {
    const scrollBottom = scrollTop + containerHeight
    const distanceFromBottom = totalHeight - scrollBottom
    return distanceFromBottom <= threshold
}

// Previous range tracker for detecting range changes
export const usePreviousRange = (
    startIndex: number,
    endIndex: number,
    onRangeChange?: (range: { startIndex: number; endIndex: number }) => void
) => {
    const previousRangeRef = useRef({ startIndex: -1, endIndex: -1 })

    useEffect(() => {
        const prev = previousRangeRef.current
        if (
            onRangeChange &&
            (prev.startIndex !== startIndex || prev.endIndex !== endIndex)
        ) {
            previousRangeRef.current = { startIndex, endIndex }
            onRangeChange({ startIndex, endIndex })
        }
    }, [startIndex, endIndex, onRangeChange])
}
