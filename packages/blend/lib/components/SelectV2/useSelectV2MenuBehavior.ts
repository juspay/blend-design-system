import { useEffect, useState, type RefObject } from 'react'

export type UseSelectV2MenuBehaviorParams = {
    open: boolean
    enableSearch?: boolean
    searchText: string
    searchInputRef: RefObject<HTMLInputElement | null>
    searchContainerRef?: RefObject<HTMLDivElement | null>
    shouldMeasureSearchHeight?: boolean
    focusSearchOnOpen?: boolean
    focusSearchDelayMs?: number
    refocusSearchOnTextChange?: boolean
    menuContainerSelector?: string
    enableVirtualization?: boolean
    onVirtualizedSearchChange?: () => void
    virtualScrollRef?: RefObject<HTMLDivElement | null>
    onEndReached?: () => void
    hasMore?: boolean
    endReachedThreshold?: number
}

type UseSelectV2MenuBehaviorResult = {
    searchHeight: number
}

const DEFAULT_MENU_SELECTOR = '[data-dropdown="dropdown"]'
const DEFAULT_END_REACHED_THRESHOLD = 100

export function useSelectV2MenuBehavior({
    open,
    enableSearch,
    searchText,
    searchInputRef,
    searchContainerRef,
    shouldMeasureSearchHeight = false,
    focusSearchOnOpen = true,
    focusSearchDelayMs = 0,
    refocusSearchOnTextChange = false,
    menuContainerSelector = DEFAULT_MENU_SELECTOR,
    enableVirtualization = false,
    onVirtualizedSearchChange,
    virtualScrollRef,
    onEndReached,
    hasMore,
    endReachedThreshold = DEFAULT_END_REACHED_THRESHOLD,
}: UseSelectV2MenuBehaviorParams): UseSelectV2MenuBehaviorResult {
    const [searchHeight, setSearchHeight] = useState(0)

    useEffect(() => {
        if (!shouldMeasureSearchHeight || !searchContainerRef?.current) return
        const measure = () => {
            setSearchHeight(searchContainerRef.current?.offsetHeight ?? 0)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(searchContainerRef.current)
        return () => observer.disconnect()
    }, [shouldMeasureSearchHeight, open, enableSearch, searchContainerRef])

    useEffect(() => {
        if (!open || !enableVirtualization || !onVirtualizedSearchChange) return
        onVirtualizedSearchChange()
    }, [searchText, open, enableVirtualization, onVirtualizedSearchChange])

    useEffect(() => {
        if (!focusSearchOnOpen || !open || !enableSearch) return
        if (focusSearchDelayMs > 0) {
            const timeoutId = setTimeout(() => {
                searchInputRef.current?.focus()
            }, focusSearchDelayMs)
            return () => clearTimeout(timeoutId)
        }
        const frameId = requestAnimationFrame(() => {
            searchInputRef.current?.focus()
        })
        return () => cancelAnimationFrame(frameId)
    }, [
        open,
        enableSearch,
        focusSearchOnOpen,
        focusSearchDelayMs,
        searchInputRef,
    ])

    useEffect(() => {
        if (!refocusSearchOnTextChange || !open || !enableSearch) return
        if (!searchInputRef.current) return
        const menuElement = searchInputRef.current.closest(
            menuContainerSelector
        )
        const activeElement = document.activeElement
        if (
            menuElement &&
            activeElement &&
            menuElement.contains(activeElement) &&
            activeElement !== searchInputRef.current
        ) {
            const frameId = requestAnimationFrame(() => {
                searchInputRef.current?.focus()
            })
            return () => cancelAnimationFrame(frameId)
        }
    }, [
        searchText,
        open,
        enableSearch,
        refocusSearchOnTextChange,
        menuContainerSelector,
        searchInputRef,
    ])

    useEffect(() => {
        if (!enableVirtualization || !onEndReached || !hasMore) return
        if (!virtualScrollRef?.current) return

        const scrollElement = virtualScrollRef.current
        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = scrollElement
            if (scrollHeight - scrollTop - clientHeight < endReachedThreshold) {
                onEndReached()
            }
        }

        scrollElement.addEventListener('scroll', handleScroll)
        return () => scrollElement.removeEventListener('scroll', handleScroll)
    }, [
        enableVirtualization,
        virtualScrollRef,
        onEndReached,
        hasMore,
        endReachedThreshold,
    ])

    return { searchHeight }
}
