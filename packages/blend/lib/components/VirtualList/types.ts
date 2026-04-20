import React from 'react'

export type VirtualListItem = {
    id: string | number
    [key: string]: unknown
}

export type VirtualListRenderParams<T> = {
    item: T
    index: number
}

export type VirtualListProps<T> = {
    items: T[]
    renderItem: (params: VirtualListRenderParams<T>) => React.ReactNode
    height?: number | string
    itemHeight?: number
    overscan?: number // Number of items to render outside viewport
    onScroll?: (scrollTop: number) => void
    onEndReached?: () => void
    endReachedThreshold?: number // Distance from bottom to trigger onEndReached
    isLoading?: boolean
    hasMore?: boolean
    className?: string
    style?: React.CSSProperties
}

export type VirtualListRef = {
    scrollTo: (offset: number) => void
    scrollToIndex: (index: number) => void
}
