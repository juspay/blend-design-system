import React, { useCallback, useMemo, useRef, useState } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { usePreventParentScroll, useScrollLock } from '../../hooks'
import { dropdownContentAnimations } from '../MultiSelect/multiSelect.animations'
import {
    getFilteredItemsWithCustomValue,
    hasExactMatch as checkExactMatch,
} from '../Select/selectUtils'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import {
    MultiSelectV2Alignment,
    MultiSelectV2Side,
    type MultiSelectV2MenuProps,
    MultiSelectV2Size,
    MultiSelectV2Variant,
} from './multiSelectV2.types'
import {
    filterMenuGroups,
    flattenMenuGroups,
    getAllAvailableValues,
} from './utils'
import MultiSelectV2Skeleton from './MultiSelectV2Skeleton'
import MultiSelectV2MenuHeader from './MultiSelectV2MenuHeader'
import MultiSelectV2MenuVirtualList from './MultiSelectV2MenuVirtualList'
import MultiSelectV2MenuItems from './MultiSelectV2MenuItems'
import MultiSelectV2MenuActions from './MultiSelectV2MenuActions'
import { SELECT_V2_MENU_Z_INDEX } from '../SelectV2/selectV2.constants'
import { useSelectV2MenuBehavior } from '../SelectV2/useSelectV2MenuBehavior'

const JUST_OPENED_DEBOUNCE_MS = 150
const DEFAULT_MIN_MENU_WIDTH = 250
const DEFAULT_VIRTUAL_LIST_HEIGHT_FALLBACK = 400

const Content = styled(RadixMenu.Content)<{
    $backgroundColor: string
    $borderRadius: string
    $boxShadow: string
    $border: string
}>`
    position: relative;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    box-shadow: ${({ $boxShadow }) => $boxShadow};
    z-index: ${SELECT_V2_MENU_Z_INDEX};
    border: ${({ $border }) => $border};
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &[data-state='closed'] {
        pointer-events: none;
    }

    ${dropdownContentAnimations}
`

const ScrollableContent = styled(Block)(() => ({
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    flexGrow: 1,
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}))

const MultiSelectV2Menu = ({
    items,
    selected,
    onSelect,
    trigger,
    menuDimensions,
    disabled = false,
    search,
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    onSelectAll,
    menuPosition,
    collisionBoundary,
    open,
    onOpenChange,
    showActionButtons = true,
    primaryAction,
    secondaryAction,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    size = MultiSelectV2Size.MD,
    variant = MultiSelectV2Variant.CONTAINER,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    menuId,
}: MultiSelectV2MenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')

    const enableSearch = search?.show ?? true
    const searchPlaceholder = search?.placeholder ?? 'Search options...'
    const minMenuWidth = menuDimensions?.minWidth as number | undefined
    const maxMenuWidth = menuDimensions?.maxWidth as string | number | undefined
    const maxMenuHeight = menuDimensions?.maxHeight as number | undefined
    const alignment = menuPosition?.alignment ?? MultiSelectV2Alignment.START
    const side = menuPosition?.side ?? MultiSelectV2Side.BOTTOM
    const sideOffset = menuPosition?.sideOffset ?? 8
    const alignOffset = menuPosition?.alignOffset ?? 0

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const justOpenedRef = useRef(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = open !== undefined
    const isOpen = (isControlled ? open : internalOpen) && !disabled
    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (disabled) return
            if (!isControlled) setInternalOpen(nextOpen)
            if (nextOpen) {
                if (enableSearch) setSearchText('')
                justOpenedRef.current = true
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(() => {
                    justOpenedRef.current = false
                    timeoutRef.current = null
                }, JUST_OPENED_DEBOUNCE_MS)
            } else {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = null
                justOpenedRef.current = false
            }
            onOpenChange?.(nextOpen)
        },
        [disabled, isControlled, enableSearch, onOpenChange]
    )
    const hasMatch = useMemo(
        () => checkExactMatch(searchText, items),
        [searchText, items]
    )

    const selectors = [
        '[data-dropdown="dropdown"]',
        '[role="listbox"]',
        '[role="menu"]',
        '[data-radix-popper-content-wrapper]',
        '[data-radix-dropdown-menu-content]',
    ]
    usePreventParentScroll(isOpen, contentRef, selectors)
    useScrollLock(isOpen)

    const filteredItems = useMemo(() => {
        const baseFilteredItems = filterMenuGroups(items, searchText)
        return getFilteredItemsWithCustomValue(
            baseFilteredItems,
            searchText,
            hasMatch,
            allowCustomValue,
            enableSearch || false,
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

    const availableValues = useMemo(
        () => getAllAvailableValues(filteredItems),
        [filteredItems]
    )
    const flattenedItems = useMemo(
        () => flattenMenuGroups(filteredItems),
        [filteredItems]
    )

    const itemIndexMap = useMemo(() => {
        const map = new Map<string, number>()
        flattenedItems
            .filter((i) => i.type === 'item')
            .forEach((item, idx) => {
                if (item.id) map.set(item.id, idx)
            })
        return map
    }, [flattenedItems])

    const allItemsFlat = useMemo(
        () => filteredItems.flatMap((g) => g.items),
        [filteredItems]
    )

    useSelectV2MenuBehavior({
        open: isOpen,
        enableSearch,
        searchText,
        searchInputRef,
        focusSearchOnOpen: true,
        focusSearchDelayMs: 50,
    })

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (
                enableSearch &&
                searchInputRef.current &&
                e.target !== searchInputRef.current
            ) {
                if (
                    e.key.length === 1 &&
                    !e.ctrlKey &&
                    !e.metaKey &&
                    !e.altKey
                ) {
                    e.preventDefault()
                    searchInputRef.current.focus()
                    const nextValue = searchText + e.key
                    setSearchText(nextValue)
                    setTimeout(() => {
                        searchInputRef.current?.setSelectionRange(
                            nextValue.length,
                            nextValue.length
                        )
                    }, 0)
                    return
                }

                if (e.key === 'Backspace' && searchText.length > 0) {
                    e.preventDefault()
                    searchInputRef.current.focus()
                    const nextValue = searchText.slice(0, -1)
                    setSearchText(nextValue)
                    setTimeout(() => {
                        searchInputRef.current?.setSelectionRange(
                            nextValue.length,
                            nextValue.length
                        )
                    }, 0)
                }
            }
        },
        [enableSearch, searchText]
    )

    const handleOutsideInteraction = useCallback((e: Event) => {
        if (justOpenedRef.current) {
            e.preventDefault()
            return
        }

        const target = e.target as HTMLElement
        const triggerEl = target?.closest('[data-radix-dropdown-menu-trigger]')
        if (triggerEl) e.preventDefault()
    }, [])

    const focusFirstMenuItem = useCallback(() => {
        const menuContent = contentRef.current?.closest(
            '[data-dropdown="dropdown"]'
        )
        if (menuContent) {
            const firstMenuItem = menuContent.querySelector<HTMLElement>(
                '[role="option"]:not([data-disabled])'
            )
            firstMenuItem?.focus()
        }
    }, [])

    const menuBorder = String(multiSelectTokens.menu.border ?? '')
    const menuBackgroundColor = String(
        multiSelectTokens.menu.backgroundColor ?? ''
    )
    const menuBorderRadius = String(multiSelectTokens.menu.borderRadius ?? '')
    const menuBoxShadow = String(
        multiSelectTokens.trigger.boxShadow?.[MultiSelectV2Variant.CONTAINER] ??
            'none'
    )

    const isEmpty = filteredItems.length === 0
    const headerFooterHeight = Number(
        multiSelectTokens.menu.scroll?.height ?? 80
    )
    const defaultContentMaxHeight = Number(
        multiSelectTokens.menu.scroll?.maxHeight ?? 320
    )
    const showActions =
        showActionButtons &&
        (primaryAction || secondaryAction) &&
        items.length > 0 &&
        !(isEmpty && searchText.length > 0)

    return (
        <RadixMenu.Root
            modal={false}
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <RadixMenu.Portal>
                <Content
                    id={menuId}
                    data-dropdown="dropdown"
                    ref={contentRef}
                    role="listbox"
                    aria-multiselectable="true"
                    align={alignment}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    side={side}
                    avoidCollisions
                    collisionBoundary={collisionBoundary}
                    onKeyDown={handleKeyDown}
                    onInteractOutside={handleOutsideInteraction}
                    onPointerDownOutside={handleOutsideInteraction}
                    $backgroundColor={menuBackgroundColor}
                    $borderRadius={menuBorderRadius}
                    $boxShadow={menuBoxShadow}
                    $border={menuBorder}
                    style={{
                        minWidth:
                            minMenuWidth ??
                            multiSelectTokens.menu.minWidth ??
                            DEFAULT_MIN_MENU_WIDTH,
                        width: 'max(var(--radix-dropdown-menu-trigger-width))',
                        maxWidth:
                            maxMenuWidth ??
                            'var(--radix-dropdown-menu-trigger-width)',
                        maxHeight:
                            maxMenuHeight ??
                            'var(--radix-popper-available-height)',
                    }}
                >
                    {skeleton.show ? (
                        <MultiSelectV2Skeleton
                            multiSelectTokens={multiSelectTokens}
                            skeleton={skeleton}
                        />
                    ) : (
                        <>
                            <MultiSelectV2MenuHeader
                                tokens={multiSelectTokens}
                                showSearch={enableSearch}
                                itemsCount={items.length}
                                searchValue={searchText}
                                searchPlaceholder={searchPlaceholder}
                                searchInputRef={searchInputRef}
                                onSearchChange={(e) =>
                                    setSearchText(e.target.value)
                                }
                                onSearchArrowKeyToFirst={focusFirstMenuItem}
                                showSelectAll={enableSelectAll}
                                selected={selected}
                                availableValues={availableValues}
                                filteredItems={filteredItems}
                                onSelectAll={
                                    onSelectAll
                                        ? (selectAll, filtered) =>
                                              onSelectAll(selectAll, filtered)
                                        : undefined
                                }
                                selectAllText={selectAllText}
                                disabled={disabled}
                            />
                            <ScrollableContent
                                style={{
                                    maxHeight: maxMenuHeight
                                        ? `${Number(maxMenuHeight) - headerFooterHeight}px`
                                        : `${defaultContentMaxHeight}px`,
                                }}
                            >
                                {isEmpty ? (
                                    <Block
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding={
                                            multiSelectTokens.menu.item.padding
                                        }
                                    >
                                        <Text
                                            variant="body.md"
                                            color={
                                                multiSelectTokens.menu.item
                                                    .optionsLabel.color.default
                                            }
                                            textAlign="center"
                                        >
                                            {items.length === 0
                                                ? 'No items available'
                                                : 'No results found'}
                                        </Text>
                                    </Block>
                                ) : enableVirtualization &&
                                  flattenedItems.length > 0 ? (
                                    <MultiSelectV2MenuVirtualList
                                        flattenedItems={flattenedItems}
                                        itemIndexMap={itemIndexMap}
                                        allItemsFlat={allItemsFlat}
                                        selected={selected}
                                        onSelect={onSelect}
                                        maxSelections={maxSelections}
                                        tokens={multiSelectTokens}
                                        height={
                                            (maxMenuHeight ??
                                                DEFAULT_VIRTUAL_LIST_HEIGHT_FALLBACK) -
                                            headerFooterHeight
                                        }
                                        itemHeight={virtualListItemHeight}
                                        overscan={virtualListOverscan}
                                        onEndReached={onEndReached}
                                        endReachedThreshold={
                                            endReachedThreshold
                                        }
                                        hasMore={hasMore}
                                        paddingTop={
                                            enableSearch
                                                ? 0
                                                : multiSelectTokens.menu.list
                                                      ?.paddingTop
                                        }
                                    />
                                ) : (
                                    <MultiSelectV2MenuItems
                                        filteredItems={filteredItems}
                                        allItemsFlat={allItemsFlat}
                                        selected={selected}
                                        onSelect={onSelect}
                                        maxSelections={maxSelections}
                                        tokens={multiSelectTokens}
                                        size={size}
                                        variant={variant}
                                    />
                                )}
                            </ScrollableContent>
                            {showActions && (
                                <MultiSelectV2MenuActions
                                    tokens={multiSelectTokens}
                                    primaryAction={primaryAction}
                                    secondaryAction={secondaryAction}
                                    selected={selected}
                                    onClose={() => handleOpenChange(false)}
                                />
                            )}
                        </>
                    )}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

MultiSelectV2Menu.displayName = 'MultiSelectV2Menu'

export default MultiSelectV2Menu
