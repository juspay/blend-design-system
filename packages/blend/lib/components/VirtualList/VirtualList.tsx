import React, {
    useRef,
    useCallback,
    useMemo,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react'
import styled from 'styled-components'
import type {
    VirtualListProps,
    VirtualListRef,
    VirtualListItem,
    ScrollAlignment,
} from './types'
import {
    useVirtualList,
    isBrowser,
    handleVirtualListKeyDown,
    scrollToPosition,
    scrollToIndex,
    createVirtualItemStyle,
    setupResizeObserver,
    checkEndReached,
    usePreviousRange,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import { foundationToken } from '../../foundationToken'

const VirtualListContainer = styled.div<{ height: number }>`
    height: ${({ height }) => height}px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    &:focus {
        outline: 2px solid ${FOUNDATION_THEME.colors.primary[500]};
        outline-offset: -2px;
    }
`

const LoadingContainer = styled.div`
    padding: ${FOUNDATION_THEME.unit[16]};
    text-align: center;
    color: ${foundationToken.colors.gray[500]};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${FOUNDATION_THEME.unit[8]};
`

const DefaultLoader = () => (
    <LoadingContainer>
        <div
            style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${foundationToken.colors.gray[300]}`,
                borderTop: `2px solid ${foundationToken.colors.primary[500]}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}
        />
        <span>Loading...</span>
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
    </LoadingContainer>
)

const VirtualList = forwardRef<
    VirtualListRef,
    VirtualListProps<VirtualListItem>
>(
    <T extends VirtualListItem>(
        {
            items,
            itemHeight = 40,
            containerHeight,
            overscan = 5,
            onScroll,
            renderItem,
            className,
            style,
            getItemHeight,
            dynamicHeight = false,
            estimatedItemHeight,
            ssrMode = false,
            ariaRole = 'list',
            onKeyDown,
            emptyState,
            onEndReached,
            endReachedThreshold = 200,
            isLoading = false,
            loadingComponent,
            hasMore = false,
            onRangeChange,
            initialScrollOffset,
            initialScrollIndex,
            scrollAlignment = 'start',
            itemsToRender,
            minHeight,
            maxHeight,
            ...props
        }: VirtualListProps<T>,
        ref: React.Ref<VirtualListRef>
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const [isMounted, setIsMounted] = useState(!ssrMode)
        const endReachedCalledRef = useRef(false)
        const previousItemCountRef = useRef(items.length)

        useLayoutEffect(() => {
            if (ssrMode && isBrowser) {
                setIsMounted(true)
            }
        }, [ssrMode])

        const {
            scrollTop,
            setScrollTop,
            totalHeight,
            itemOffsets,
            itemHeights,
            startIndex,
            endIndex,
            recalculateHeights,
            measureItem,
        } = useVirtualList({
            items,
            itemHeight,
            containerHeight,
            overscan,
            getItemHeight,
            dynamicHeight,
            ssrMode,
            estimatedItemHeight,
            itemsToRender,
            minHeight,
            maxHeight,
        })

        usePreviousRange(startIndex, endIndex, onRangeChange)

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const newScrollTop = e.currentTarget.scrollTop
                setScrollTop(newScrollTop)
                onScroll?.(newScrollTop)

                if (
                    hasMore &&
                    !isLoading &&
                    onEndReached &&
                    !endReachedCalledRef.current
                ) {
                    const isEndReached = checkEndReached(
                        newScrollTop,
                        totalHeight,
                        containerHeight,
                        endReachedThreshold
                    )

                    if (isEndReached) {
                        endReachedCalledRef.current = true
                        onEndReached()
                    }
                }
            },
            [
                setScrollTop,
                onScroll,
                hasMore,
                isLoading,
                onEndReached,
                totalHeight,
                containerHeight,
                endReachedThreshold,
            ]
        )

        useEffect(() => {
            if (!isLoading || items.length > previousItemCountRef.current) {
                endReachedCalledRef.current = false
                previousItemCountRef.current = items.length
            }
        }, [isLoading, items.length])

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                handleVirtualListKeyDown(
                    e,
                    ariaRole,
                    totalHeight,
                    containerRef,
                    onKeyDown
                )
            },
            [ariaRole, totalHeight, onKeyDown]
        )

        const scrollTo = useCallback(
            (scrollTop: number, smooth: boolean = false) => {
                scrollToPosition(containerRef, scrollTop, smooth)
            },
            []
        )

        const scrollToIndexMethod = useCallback(
            (
                index: number,
                alignment: ScrollAlignment = 'start',
                smooth: boolean = false
            ) => {
                scrollToIndex(
                    containerRef,
                    index,
                    itemOffsets,
                    itemHeights,
                    items.length,
                    containerHeight,
                    alignment,
                    smooth
                )
            },
            [itemOffsets, itemHeights, items.length, containerHeight]
        )

        const getVisibleRange = useCallback(
            () => ({ startIndex, endIndex }),
            [startIndex, endIndex]
        )

        const measureItemMethod = useCallback(
            (index: number) => {
                if (containerRef.current) {
                    const item = containerRef.current.querySelector(
                        `[data-index="${index}"]`
                    )
                    if (item) {
                        const height = item.getBoundingClientRect().height
                        measureItem(index, height)
                    }
                }
            },
            [measureItem]
        )

        useImperativeHandle(
            ref,
            () => ({
                scrollTo,
                scrollToIndex: scrollToIndexMethod,
                getScrollOffset: () => scrollTop,
                recalculateHeights,
                getVisibleRange,
                measureItem: measureItemMethod,
            }),
            [
                scrollTo,
                scrollToIndexMethod,
                scrollTop,
                recalculateHeights,
                getVisibleRange,
                measureItemMethod,
            ]
        )

        useEffect(() => {
            if (isMounted && containerRef.current) {
                if (initialScrollIndex !== undefined) {
                    scrollToIndexMethod(initialScrollIndex, scrollAlignment)
                } else if (initialScrollOffset !== undefined) {
                    scrollTo(initialScrollOffset)
                }
            }
        }, [isMounted])

        const visibleItems = useMemo(() => {
            const renderedItems = []

            for (let i = startIndex; i <= endIndex && i < items.length; i++) {
                const item = items[i]
                const top = itemOffsets[i] || 0
                const height =
                    itemHeights[i] ||
                    (typeof itemHeight === 'number' ? itemHeight : 40)
                const itemStyle = createVirtualItemStyle(top, height)

                renderedItems.push(
                    <div
                        key={item.id || i}
                        style={itemStyle}
                        data-virtual-item={true}
                        data-index={i}
                    >
                        {renderItem({ item, index: i, style: itemStyle })}
                    </div>
                )
            }

            return renderedItems
        }, [
            items,
            startIndex,
            endIndex,
            itemOffsets,
            itemHeights,
            itemHeight,
            renderItem,
        ])

        useEffect(() => {
            return setupResizeObserver(
                dynamicHeight,
                isMounted,
                containerRef,
                measureItem
            )
        }, [dynamicHeight, isMounted, measureItem, startIndex, endIndex])

        if (items.length === 0) {
            return (
                <VirtualListContainer
                    ref={containerRef}
                    height={containerHeight}
                    className={className}
                    style={style}
                    role={ariaRole}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    {...props}
                >
                    {emptyState || (
                        <div
                            style={{
                                padding: FOUNDATION_THEME.unit[20],
                                textAlign: 'center',
                                color: foundationToken.colors.gray[500],
                            }}
                        >
                            No items
                        </div>
                    )}
                </VirtualListContainer>
            )
        }

        if (ssrMode && !isMounted) {
            return (
                <VirtualListContainer
                    ref={containerRef}
                    height={containerHeight}
                    className={className}
                    style={style}
                    role={ariaRole}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    {...props}
                >
                    <div style={{ height: totalHeight, position: 'relative' }}>
                        <div style={{ padding: '20px' }}>Loading...</div>
                    </div>
                </VirtualListContainer>
            )
        }

        return (
            <VirtualListContainer
                ref={containerRef}
                height={containerHeight}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                className={className}
                style={style}
                role={ariaRole}
                tabIndex={0}
                aria-label={`Virtual list with ${items.length} items`}
                {...props}
            >
                <div style={{ height: totalHeight, position: 'relative' }}>
                    {visibleItems}
                    {isLoading && (loadingComponent || <DefaultLoader />)}
                </div>
            </VirtualListContainer>
        )
    }
)

VirtualList.displayName = 'VirtualList'

export default VirtualList
