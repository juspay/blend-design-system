import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useMemo,
} from 'react'
import type { VirtualListProps, VirtualListRef, VirtualListItem } from './types'
import Block from '../../components/Primitives/Block/Block'
import {
    findStartNode,
    findEndNode,
    calculateChildPositions,
    calculateTotalHeight,
} from './utils'

/**
 * Hook for scroll detection with requestAnimationFrame optimization
 */
function useScrollAware<T extends HTMLElement>() {
    const [scrollTop, setScrollTop] = useState(0)
    const ref = useRef<T>(null)
    const animationFrame = useRef<number | undefined>(undefined)

    const onScroll = useCallback((e: Event) => {
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current)
        }
        animationFrame.current = requestAnimationFrame(() => {
            setScrollTop((e.target as T).scrollTop)
        })
    }, [])

    useEffect(() => {
        const scrollContainer = ref.current
        if (!scrollContainer) return

        setScrollTop(scrollContainer.scrollTop)
        scrollContainer.addEventListener('scroll', onScroll)
        return () => {
            scrollContainer.removeEventListener('scroll', onScroll)
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current)
            }
        }
    }, [onScroll])

    return [scrollTop, ref] as const
}

/**
 * A simple, performant virtual list component that only renders visible items.
 *
 */
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

    // Measure container height
    useEffect(() => {
        if (!containerRef.current) return

        const updateHeight = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight)
            }
        }

        updateHeight()
        const resizeObserver = new ResizeObserver(updateHeight)
        resizeObserver.observe(containerRef.current)

        return () => resizeObserver.disconnect()
    }, [containerRef])

    // Calculate child positions (memoized for performance)
    const childPositions = useMemo(() => {
        return calculateChildPositions(items.length, itemHeight)
    }, [items.length, itemHeight])

    // Calculate total height
    const totalHeight = useMemo(() => {
        return calculateTotalHeight(childPositions, items.length, itemHeight)
    }, [childPositions, items.length, itemHeight])

    // Find first visible node using binary search (only when scrolled)
    const firstVisibleNode = useMemo(() => {
        if (!items.length || !childPositions.length) return 0
        return findStartNode(scrollTop, childPositions, items.length)
    }, [scrollTop, childPositions, items.length])

    // Calculate start node with overscan
    const startNode = Math.max(0, firstVisibleNode - overscan)

    // Find last visible node
    const lastVisibleNode = useMemo(() => {
        if (!items.length || !containerHeight)
            return Math.min(20, items.length - 1)
        return findEndNode(
            childPositions,
            firstVisibleNode,
            items.length,
            containerHeight
        )
    }, [childPositions, firstVisibleNode, items.length, containerHeight])

    // Calculate end node with overscan
    const endNode = Math.min(items.length - 1, lastVisibleNode + overscan)
    const visibleNodeCount = Math.max(0, endNode - startNode + 1)

    // Calculate offset for shifting nodes down
    const offsetY = childPositions[startNode]

    // Render visible children (memoized)
    const visibleChildren = useMemo(() => {
        const children = []
        for (let i = 0; i < visibleNodeCount; i++) {
            const itemIndex = i + startNode
            if (items[itemIndex]) {
                children.push(
                    <Block key={items[itemIndex].id || itemIndex}>
                        {renderItem({
                            item: items[itemIndex],
                            index: itemIndex,
                        })}
                    </Block>
                )
            }
        }
        return children
    }, [startNode, visibleNodeCount, items, renderItem])

    // Handle scroll callbacks
    useEffect(() => {
        onScroll?.(scrollTop)

        // Check for infinite scroll
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

    // Reset endReachedCalled when loading completes
    useEffect(() => {
        if (!isLoading) {
            endReachedCalledRef.current = false
        }
    }, [isLoading])

    // Expose methods via ref
    useImperativeHandle(
        ref,
        () => ({
            scrollTo: (offset: number) => {
                if (containerRef.current) {
                    containerRef.current.scrollTop = offset
                }
            },
            scrollToIndex: (index: number) => {
                if (
                    containerRef.current &&
                    childPositions[index] !== undefined
                ) {
                    containerRef.current.scrollTop = childPositions[index]
                }
            },
        }),
        [childPositions, containerRef]
    )

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
                    overflow: 'hidden',
                    willChange: 'transform',
                    position: 'relative',
                }}
            >
                <Block
                    style={{
                        willChange: 'transform',
                        transform: `translateY(${offsetY}px)`,
                    }}
                >
                    {visibleChildren}
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
