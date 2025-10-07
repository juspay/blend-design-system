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
import type { VirtualListProps, VirtualListRef, VirtualListItem } from './types'
import {
    useVirtualList,
    isBrowser,
    handleVirtualListKeyDown,
    scrollToPosition,
    scrollToIndex,
    createVirtualItemStyle,
    setupResizeObserver,
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
            ssrMode = false,
            ariaRole = 'list',
            onKeyDown,
            emptyState,
            ...props
        }: VirtualListProps<T>,
        ref: React.Ref<VirtualListRef>
    ) => {
        const containerRef = useRef<HTMLDivElement>(null)
        const [isMounted, setIsMounted] = useState(!ssrMode)

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
        } = useVirtualList({
            items,
            itemHeight,
            containerHeight,
            overscan,
            getItemHeight,
            dynamicHeight,
            ssrMode,
        })

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const newScrollTop = e.currentTarget.scrollTop
                setScrollTop(newScrollTop)
                onScroll?.(newScrollTop)
            },
            [setScrollTop, onScroll]
        )

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

        const scrollTo = useCallback((scrollTop: number) => {
            scrollToPosition(containerRef, scrollTop)
        }, [])

        const scrollToIndexMethod = useCallback(
            (index: number) => {
                scrollToIndex(containerRef, index, itemOffsets, items.length)
            },
            [itemOffsets, items.length]
        )

        useImperativeHandle(
            ref,
            () => ({
                scrollTo,
                scrollToIndex: scrollToIndexMethod,
                getScrollOffset: () => scrollTop,
                recalculateHeights,
            }),
            [scrollTo, scrollToIndexMethod, scrollTop, recalculateHeights]
        )

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
                recalculateHeights
            )
        }, [dynamicHeight, isMounted, recalculateHeights, startIndex, endIndex])

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
                </div>
            </VirtualListContainer>
        )
    }
)

VirtualList.displayName = 'VirtualList'

export default VirtualList
