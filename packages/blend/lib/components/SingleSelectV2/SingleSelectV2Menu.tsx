import {
    useState,
    useMemo,
    useRef,
    useEffect,
    type ReactElement,
    type ReactNode,
} from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
    SingleSelectV2Alignment,
    SingleSelectV2Side,
    SingleSelectV2Size,
    SingleSelectV2Variant,
    SingleSelectV2SkeletonProps,
    type SingleSelectV2GroupType,
} from './types'
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
import SingleSelectV2Popover from './SingleSelectV2Popover'
import SingleSelectV2Search from './SingleSelectV2Search'
import SingleSelectV2List from './SingleSelectV2List'
import SingleSelectV2VirtualList from './SingleSelectV2VirtualList'

export type SingleSelectV2MenuProps = {
    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void
    trigger: ReactElement
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number
    enableSearch?: boolean
    searchPlaceholder?: string
    disabled?: boolean

    alignment?: SingleSelectV2Alignment
    side?: SingleSelectV2Side
    sideOffset?: number
    alignOffset?: number
    collisionBoundary?: DropdownMenuContentProps['collisionBoundary']

    open: boolean
    onOpenChange: (open: boolean) => void

    size?: SingleSelectV2Size
    variant?: SingleSelectV2Variant

    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: ReactNode
    skeleton?: SingleSelectV2SkeletonProps
    allowCustomValue?: boolean
    customValueLabel?: string
    menuId?: string
}

const SingleSelectV2Menu = ({
    items,
    selected,
    onSelect,
    trigger,
    minMenuWidth,
    maxMenuWidth,
    maxMenuHeight = 400,
    enableSearch,
    searchPlaceholder = 'Search options...',
    disabled,
    alignment = SingleSelectV2Alignment.START,
    side = SingleSelectV2Side.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    collisionBoundary,
    open,
    onOpenChange,
    size = SingleSelectV2Size.MEDIUM,
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

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const virtualScrollRef = useRef<HTMLDivElement>(null)
    const [searchHeight, setSearchHeight] = useState(0)

    useEffect(() => {
        if (!searchContainerRef.current) return
        const measure = () => {
            setSearchHeight(searchContainerRef.current?.offsetHeight ?? 0)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(searchContainerRef.current)
        return () => observer.disconnect()
    }, [enableSearch, open])

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
        ? Math.max(maxMenuHeight - (enableSearch ? searchHeight : 0), 120)
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

    useEffect(() => {
        if (!open || !enableVirtualization) return
        virtualizer.scrollToIndex(0)
    }, [searchText])

    useEffect(() => {
        if (!open || !enableSearch) return
        const id = requestAnimationFrame(() => {
            searchInputRef.current?.focus()
        })
        return () => cancelAnimationFrame(id)
    }, [open, enableSearch])

    // Keep focus stable in the searchbox while results update.
    useEffect(() => {
        if (!open || !enableSearch || !searchInputRef.current) return

        const menuElement = searchInputRef.current.closest(
            '[data-dropdown="dropdown"]'
        )
        const activeElement = document.activeElement
        if (
            menuElement &&
            activeElement &&
            menuElement.contains(activeElement) &&
            activeElement !== searchInputRef.current
        ) {
            const id = requestAnimationFrame(() => {
                searchInputRef.current?.focus()
            })
            return () => cancelAnimationFrame(id)
        }
    }, [searchText, open, enableSearch])

    useEffect(() => {
        if (!enableVirtualization || !onEndReached || !hasMore) return

        const scrollElement = virtualScrollRef.current
        if (!scrollElement) return

        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = scrollElement
            if (scrollHeight - scrollTop - clientHeight < endReachedThreshold) {
                onEndReached()
            }
        }

        scrollElement.addEventListener('scroll', handleScroll)
        return () => scrollElement.removeEventListener('scroll', handleScroll)
    }, [enableVirtualization, onEndReached, hasMore, endReachedThreshold])

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled && newOpen) return
        if (!newOpen && enableSearch) setSearchText('')
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
        <SingleSelectV2Popover
            open={open}
            onOpenChange={handleOpenChange}
            disabled={disabled}
            trigger={trigger}
            menuId={menuId}
            alignment={alignment}
            side={side}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            collisionBoundary={collisionBoundary}
            contentRef={contentRef}
            contentStyle={{
                backgroundColor: menuContent.backgroundColor,
                border: menuContent.border,
                borderRadius: menuContent.borderRadius,
                boxShadow: menuContent.boxShadow,
                maxHeight: maxMenuHeight,
                minWidth: minMenuWidth ?? '250px',
                width: 'max(var(--radix-dropdown-menu-trigger-width))',
                maxWidth:
                    maxMenuWidth ?? 'var(--radix-dropdown-menu-trigger-width)',
            }}
            onContentKeyDown={(e) => {
                if (!enableSearch || !searchInputRef.current) return
                const targetIsSearch =
                    e.target === searchInputRef.current ||
                    searchInputRef.current.contains(e.target as Node)
                if (targetIsSearch) return

                const isTypingKey =
                    e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey

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
                        backgroundColor={menuContent.backgroundColor as string}
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
                                fontSize={menuItem.groupLabelText.fontSize}
                                fontWeight={menuItem.groupLabelText.fontWeight}
                                color={menuItem.groupLabelText.color.default}
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
                            virtualViewportHeight={virtualViewportHeight}
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
        </SingleSelectV2Popover>
    )
}

SingleSelectV2Menu.displayName = 'SingleSelectV2Menu'

export default SingleSelectV2Menu
