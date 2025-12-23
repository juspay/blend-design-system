import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
    forwardRef,
    useImperativeHandle,
} from 'react'
import type { VirtualListProps, VirtualListRef, VirtualListItem } from './types'
import Block from '../../components/Primitives/Block/Block'
import {
    findStartNode,
    findEndNode,
    calculateChildPositions,
    calculateTotalHeight,
} from './utils'

/* ---------------------------------------------
 * Scroll-aware hook with rAF throttling
 * ------------------------------------------- */
function useScrollAware<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [scrollTop, setScrollTop] = useState(0)
    const rafId = useRef<number | null>(null)

    const handleScroll = useCallback((event: Event) => {
        if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current)
        }

        rafId.current = requestAnimationFrame(() => {
            setScrollTop((event.target as T).scrollTop)
            rafId.current = null
        })
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        setScrollTop(el.scrollTop)
        el.addEventListener('scroll', handleScroll)

        return () => {
            el.removeEventListener('scroll', handleScroll)
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current)
            }
        }
    }, [handleScroll])

    return [scrollTop, ref] as const
}

/* ---------------------------------------------
 * VirtualList Component
 * ------------------------------------------- */
function VirtualListInner<T extends VirtualListItem>(
    {
        items,
        renderItem,
        height = 400,
        itemHeight,
        overscan = 20,
        onScroll,
        onEndReached,
        endReachedThreshold = 200,
        isLoading = false,
        hasMore = false,
        className,
        style,
    }: VirtualListProps<T>,
    ref: React.Ref<VirtualListRef>
) {
    const [scrollTop, containerRef] = useScrollAware<HTMLDivElement>()
    const [containerHeight, setContainerHeight] = useState(
        typeof height === 'number' ? height : 400
    )

    const endReachedCalledRef = useRef(false)

    /* ---------------------------------------------
     * Measure container height
     * ------------------------------------------- */
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateHeight = () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }

            rafRef.current = requestAnimationFrame(() => {
                if (containerRef.current) {
                    setContainerHeight(containerRef.current.clientHeight)
                }
                rafRef.current = null
            })
        }

        updateHeight()
        const observer = new ResizeObserver(updateHeight)
        observer.observe(container)

        return () => {
            observer.disconnect()
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [containerRef])

    /* ---------------------------------------------
     * Virtualization calculations
     * ------------------------------------------- */
    const childPositions = useMemo(
        () => calculateChildPositions(items.length, itemHeight),
        [items.length, itemHeight]
    )

    const totalHeight = useMemo(
        () => calculateTotalHeight(childPositions, items.length, itemHeight),
        [childPositions, items.length, itemHeight]
    )

    const firstVisibleIndex = useMemo(() => {
        if (!items.length) return 0
        return findStartNode(scrollTop, childPositions, items.length)
    }, [scrollTop, childPositions, items.length])

    const startIndex = Math.max(0, firstVisibleIndex - overscan)

    const lastVisibleIndex = useMemo(() => {
        if (!containerHeight) return Math.min(20, items.length - 1)

        return findEndNode(
            childPositions,
            firstVisibleIndex,
            items.length,
            containerHeight
        )
    }, [childPositions, firstVisibleIndex, items.length, containerHeight])

    const endIndex = Math.min(items.length - 1, lastVisibleIndex + overscan)

    const offsetY = childPositions[startIndex] ?? 0

    /* ---------------------------------------------
     * Render visible items
     * ------------------------------------------- */
    const visibleItems = useMemo(() => {
        const rendered: React.ReactNode[] = []

        for (let index = startIndex; index <= endIndex; index++) {
            const item = items[index]
            if (!item) continue

            rendered.push(
                <Block key={item.id ?? index}>
                    {renderItem({ item, index })}
                </Block>
            )
        }

        return rendered
    }, [items, startIndex, endIndex, renderItem])

    /* ---------------------------------------------
     * Scroll callbacks & infinite scroll
     * ------------------------------------------- */
    useEffect(() => {
        onScroll?.(scrollTop)

        if (
            hasMore &&
            !isLoading &&
            onEndReached &&
            !endReachedCalledRef.current
        ) {
            const distanceFromBottom =
                totalHeight - (scrollTop + containerHeight)

            if (distanceFromBottom < endReachedThreshold) {
                endReachedCalledRef.current = true
                onEndReached()
            }
        }
    }, [
        scrollTop,
        onScroll,
        hasMore,
        isLoading,
        onEndReached,
        totalHeight,
        containerHeight,
        endReachedThreshold,
    ])

    useEffect(() => {
        if (!isLoading) {
            endReachedCalledRef.current = false
        }
    }, [isLoading])

    /* ---------------------------------------------
     * Imperative API
     * ------------------------------------------- */
    useImperativeHandle(
        ref,
        () => ({
            scrollTo(offset: number) {
                containerRef.current?.scrollTo({ top: offset })
            },
            scrollToIndex(index: number) {
                const top = childPositions[index]
                if (top !== undefined) {
                    containerRef.current?.scrollTo({ top })
                }
            },
        }),
        [childPositions, containerRef]
    )

    /* ---------------------------------------------
     * Render
     * ------------------------------------------- */
    return (
        <Block
            ref={containerRef}
            className={className}
            style={{
                height,
                overflow: 'auto',
                position: 'relative',
                ...style,
            }}
        >
            <Block
                style={{
                    height: totalHeight,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Block
                    style={{
                        transform: `translateY(${offsetY}px)`,
                        willChange: 'transform',
                    }}
                >
                    {visibleItems}
                </Block>
            </Block>
        </Block>
    )
}
const VirtualList = forwardRef(VirtualListInner) as (<
    T extends VirtualListItem,
>(
    props: VirtualListProps<T> & { ref?: React.Ref<VirtualListRef> }
) => ReturnType<typeof VirtualListInner>) & { displayName?: string }

VirtualList.displayName = 'VirtualList'

export default VirtualList
