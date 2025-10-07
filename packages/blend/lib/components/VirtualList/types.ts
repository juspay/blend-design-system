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

export type VirtualListProps<T extends VirtualListItem> = {
    items: T[]
    itemHeight?: number | ((item: T, index: number) => number)
    containerHeight: number
    overscan?: number
    onScroll?: (scrollTop: number) => void
    renderItem: (params: VirtualListRenderParams<T>) => React.ReactNode
    className?: string
    style?: React.CSSProperties
    getItemHeight?: (item: T, index: number) => number
    // Dynamic height support
    dynamicHeight?: boolean
    // SSR safety
    ssrMode?: boolean
    // Accessibility
    ariaRole?: 'listbox' | 'menu' | 'table' | 'list'
    onKeyDown?: (event: React.KeyboardEvent) => void
    // Empty state
    emptyState?: React.ReactNode
    // Performance
    throttleScrollMs?: number
}

export type VirtualListRef = {
    scrollTo: (scrollTop: number) => void
    scrollToIndex: (index: number) => void
    getScrollOffset: () => number
    recalculateHeights: () => void
}

export type UseVirtualListParams<T extends VirtualListItem> = {
    items: T[]
    itemHeight?: number | ((item: T, index: number) => number)
    containerHeight: number
    overscan?: number
    getItemHeight?: (item: T, index: number) => number
    dynamicHeight?: boolean
    ssrMode?: boolean
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
}
