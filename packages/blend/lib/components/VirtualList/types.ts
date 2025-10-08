import React from 'react'

export type VirtualListItem = {
    id: string | number
    height?: number
    data?: Record<string, unknown>
}

export type VirtualListRenderParams<T extends VirtualListItem> = {
    item: T
    index: number
    style: React.CSSProperties
}

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto'

export type VisibleRange = {
    startIndex: number
    endIndex: number
}

export type VirtualListProps<T extends VirtualListItem> = {
    items: T[]
    itemHeight?: number | ((item: T, index: number) => number)
    containerHeight?: number
    overscan?: number
    onScroll?: (scrollTop: number) => void
    renderItem: (params: VirtualListRenderParams<T>) => React.ReactNode
    className?: string
    style?: React.CSSProperties
    getItemHeight?: (item: T, index: number) => number
    // Dynamic height support
    dynamicHeight?: boolean
    estimatedItemHeight?: number // For better initial rendering with dynamic heights
    // SSR safety
    ssrMode?: boolean
    // Accessibility
    ariaRole?: 'listbox' | 'menu' | 'table' | 'list'
    onKeyDown?: (event: React.KeyboardEvent) => void
    // Empty state
    emptyState?: React.ReactNode
    // Performance
    throttleScrollMs?: number
    // Infinite scroll / Load more
    onEndReached?: () => void
    endReachedThreshold?: number // Distance from bottom to trigger onEndReached (default: 200px)
    isLoading?: boolean
    loadingComponent?: React.ReactNode
    hasMore?: boolean
    // Range change callback
    onRangeChange?: (range: VisibleRange) => void
    // Initial scroll
    initialScrollOffset?: number
    initialScrollIndex?: number
    scrollAlignment?: ScrollAlignment
    // Item count to render
    itemsToRender?: number // Max items to render at once (overrides overscan calculation)
    // Height management
    minHeight?: number // Minimum height for items
    maxHeight?: number // Maximum height for items
    maintainScrollPosition?: boolean // Maintain scroll position when items change
}

export type VirtualListRef = {
    scrollTo: (scrollTop: number, smooth?: boolean) => void
    scrollToIndex: (
        index: number,
        alignment?: ScrollAlignment,
        smooth?: boolean
    ) => void
    getScrollOffset: () => number
    recalculateHeights: () => void
    getVisibleRange: () => VisibleRange
    measureItem: (index: number) => void
}

export type UseVirtualListParams<T extends VirtualListItem> = {
    items: T[]
    itemHeight?: number | ((item: T, index: number) => number)
    containerHeight: number
    overscan?: number
    getItemHeight?: (item: T, index: number) => number
    dynamicHeight?: boolean
    ssrMode?: boolean
    estimatedItemHeight?: number
    itemsToRender?: number
    minHeight?: number
    maxHeight?: number
}

export type UseVirtualListReturn = {
    scrollTop: number
    setScrollTop: React.Dispatch<React.SetStateAction<number>>
    totalHeight: number
    itemOffsets: number[]
    itemHeights: number[]
    recalculateHeights: () => void
    startIndex: number
    endIndex: number
    measureItem: (index: number, height: number) => void
}
