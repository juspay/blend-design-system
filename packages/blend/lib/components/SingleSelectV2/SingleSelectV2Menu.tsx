import { useState, useMemo, useRef } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
    SingleSelectV2Alignment,
    SingleSelectV2Side,
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type SingleSelectV2MenuProps,
} from './SingleSelectV2.types'
import Text from '../Text/Text'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { usePreventParentScroll, useScrollLock } from '../../hooks'
import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import SingleSelectV2Skeleton from './SingleSelectV2Skeleton'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'
import {
    flattenGroups,
    filterMenuGroups,
    getVirtualRowEstimate,
    defaultSingleSelectV2Skeleton,
    MENU_SCROLL_SELECTORS,
    DEFAULT_END_REACHED_THRESHOLD,
} from './utils'
import { menuContentAnimations } from './singleSelectV2.animations'
import SingleSelectV2Search from './SingleSelectV2Search'
import SingleSelectV2List from './SingleSelectV2List'
import SingleSelectV2VirtualList from './SingleSelectV2VirtualList'
import { SELECT_V2_MENU_Z_INDEX } from '../SelectV2/selectV2.constants'
import { useSelectV2MenuBehavior } from '../SelectV2/useSelectV2MenuBehavior'

const Content = styled(RadixMenu.Content)`
    position: relative;
    z-index: ${SELECT_V2_MENU_Z_INDEX};
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    &[data-state='closed'] {
        pointer-events: none;
    }

    ${menuContentAnimations}
`

const SingleSelectV2Menu = ({
    items,
    selected,
    onSelect,
    trigger,
    menuDimensions,
    search,
    disabled,
    menuPosition,
    collisionBoundary,
    open,
    onOpenChange,
    size = SingleSelectV2Size.MD,
    variant = SingleSelectV2Variant.CONTAINER,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 2,
    onEndReached,
    endReachedThreshold = DEFAULT_END_REACHED_THRESHOLD,
    hasMore,
    loadingComponent,
    skeleton = defaultSingleSelectV2Skeleton,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    menuId,
}: SingleSelectV2MenuProps) => {
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')

    const enableSearch = search?.show
    const searchPlaceholder = search?.placeholder ?? 'Search options...'
    const maxMenuHeight = menuDimensions?.maxHeight as number | undefined
    const alignment = menuPosition?.alignment ?? SingleSelectV2Alignment.START
    const side = menuPosition?.side ?? SingleSelectV2Side.BOTTOM
    const sideOffset = menuPosition?.sideOffset ?? 8
    const alignOffset = menuPosition?.alignOffset ?? 0

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const virtualScrollRef = useRef<HTMLDivElement>(null)

    usePreventParentScroll(open, contentRef, [...MENU_SCROLL_SELECTORS])
    useScrollLock(open)

    const hasMatch = useMemo(
        () => checkExactMatch(searchText, items),
        [searchText, items]
    )

    const filteredItems = useMemo(() => {
        const base = searchText ? filterMenuGroups(items, searchText) : items
        return getFilteredItemsWithCustomValue(
            base,
            searchText,
            hasMatch,
            allowCustomValue ?? false,
            enableSearch ?? false,
            customValueLabel
        )
    }, [
        items,
        searchText,
        allowCustomValue,
        hasMatch,
        enableSearch,
        customValueLabel,
    ])

    const flattenedItems = useMemo(
        () => flattenGroups(filteredItems),
        [filteredItems]
    )
    const virtualViewportHeight = maxMenuHeight
        ? Math.max(maxMenuHeight - (enableSearch ? 0 : 0), 120)
        : 340

    const virtualizer = useVirtualizer({
        count: flattenedItems.length,
        getScrollElement: () => virtualScrollRef.current,
        getItemKey: (index) => flattenedItems[index]?.id ?? index,
        estimateSize: (index) =>
            getVirtualRowEstimate(flattenedItems, index) ??
            virtualListItemHeight,
        overscan: virtualListOverscan,
        initialRect: {
            width: 0,
            height: virtualViewportHeight,
        },
        enabled: enableVirtualization && flattenedItems.length > 0,
    })

    const { searchHeight } = useSelectV2MenuBehavior({
        open,
        enableSearch,
        searchText,
        searchInputRef,
        searchContainerRef,
        shouldMeasureSearchHeight: true,
        refocusSearchOnTextChange: true,
        enableVirtualization,
        onVirtualizedSearchChange: () => virtualizer.scrollToIndex(0),
        virtualScrollRef,
        onEndReached,
        hasMore,
        endReachedThreshold,
    })

    const adjustedVirtualViewportHeight = maxMenuHeight
        ? Math.max(maxMenuHeight - (enableSearch ? searchHeight : 0), 120)
        : 340

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled && newOpen) return
        if (newOpen && enableSearch) setSearchText('')
        onOpenChange(newOpen)
    }

    const menuContent = singleSelectTokens.menu.content
    const menuItem = singleSelectTokens.menu.item

    const showEmptyState =
        items.length === 0 ||
        (filteredItems.length === 0 && searchText.length > 0)
    const emptyMessage =
        items.length === 0 ? 'No items available' : 'No results found'

    const showVirtualList =
        enableVirtualization && flattenedItems.length > 0 && !showEmptyState
    const virtualItems = virtualizer.getVirtualItems()
    const hasVirtualRows = virtualItems.length > 0

    return (
        <RadixMenu.Root
            modal={false}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <RadixMenu.Portal>
                <Content
                    id={menuId}
                    ref={contentRef}
                    data-dropdown="dropdown"
                    align={alignment}
                    side={side}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    avoidCollisions
                    collisionBoundary={collisionBoundary}
                    style={{
                        backgroundColor: menuContent.backgroundColor,
                        border: menuContent.border,
                        borderRadius: menuContent.borderRadius,
                        boxShadow: menuContent.boxShadow,
                        maxHeight: maxMenuHeight,
                        minWidth: menuDimensions?.minWidth ?? '250px',
                        width: 'max(var(--radix-dropdown-menu-trigger-width))',
                        maxWidth:
                            menuDimensions?.maxWidth ??
                            'var(--radix-dropdown-menu-trigger-width)',
                    }}
                    onKeyDown={(e) => {
                        if (!enableSearch || !searchInputRef.current) return
                        const targetIsSearch =
                            e.target === searchInputRef.current ||
                            searchInputRef.current.contains(e.target as Node)
                        if (targetIsSearch) return

                        const isTypingKey =
                            e.key.length === 1 &&
                            !e.ctrlKey &&
                            !e.metaKey &&
                            !e.altKey

                        if (e.key === 'Backspace') {
                            e.preventDefault()
                            setSearchText((prev) =>
                                prev.length > 0 ? prev.slice(0, -1) : prev
                            )
                            searchInputRef.current.focus()
                            return
                        }

                        if (e.key === 'Delete') {
                            e.preventDefault()
                            searchInputRef.current.focus()
                            return
                        }

                        if (isTypingKey) {
                            searchInputRef.current.focus()
                        }
                    }}
                >
                    {skeleton.show ? (
                        <SingleSelectV2Skeleton
                            singleSelectTokens={singleSelectTokens}
                            skeleton={skeleton}
                        />
                    ) : (
                        <>
                            <SingleSelectV2Search
                                enabled={enableSearch}
                                hasItems={items.length > 0}
                                backgroundColor={
                                    menuContent.backgroundColor as string
                                }
                                searchPlaceholder={searchPlaceholder}
                                searchText={searchText}
                                onSearchTextChange={setSearchText}
                                searchInputRef={searchInputRef}
                                containerRef={searchContainerRef}
                            />

                            {showEmptyState ? (
                                <Block
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    padding={menuItem.padding}
                                >
                                    <Text
                                        variant="body.md"
                                        fontSize={
                                            menuItem.groupLabelText.fontSize
                                        }
                                        fontWeight={
                                            menuItem.groupLabelText.fontWeight
                                        }
                                        color={
                                            menuItem.groupLabelText.color
                                                .default
                                        }
                                        textAlign="center"
                                    >
                                        {emptyMessage}
                                    </Text>
                                </Block>
                            ) : showVirtualList && hasVirtualRows ? (
                                <SingleSelectV2VirtualList
                                    flattenedItems={flattenedItems}
                                    selected={selected}
                                    onSelect={onSelect}
                                    singleSelectTokens={singleSelectTokens}
                                    size={size}
                                    variant={variant}
                                    virtualViewportHeight={
                                        adjustedVirtualViewportHeight
                                    }
                                    virtualItems={virtualItems}
                                    totalSize={virtualizer.getTotalSize()}
                                    measureElement={virtualizer.measureElement}
                                    loadingComponent={loadingComponent}
                                    hasMore={hasMore}
                                    virtualScrollRef={virtualScrollRef}
                                />
                            ) : (
                                <SingleSelectV2List
                                    filteredItems={filteredItems}
                                    selected={selected}
                                    onSelect={onSelect}
                                    singleSelectTokens={singleSelectTokens}
                                    size={size}
                                    variant={variant}
                                    enableSearch={enableSearch}
                                />
                            )}
                        </>
                    )}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

SingleSelectV2Menu.displayName = 'SingleSelectV2Menu'

export default SingleSelectV2Menu
