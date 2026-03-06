import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
} from './types'
import {
    filterMenuGroups,
    flattenMenuGroups,
    getAllAvailableValues,
} from './utils'
import MultiSelectSkeleton from '../MultiSelect/MultiSelectSkeleton'
import MultiSelectV2MenuHeader from './MultiSelectV2MenuHeader'
import MultiSelectV2MenuVirtualList from './MultiSelectV2MenuVirtualList'
import MultiSelectV2MenuItems from './MultiSelectV2MenuItems'
import MultiSelectV2MenuActions from './MultiSelectV2MenuActions'

const Content = styled(RadixMenu.Content)<{
    $backgroundColor: string
    $borderRadius: string
    $boxShadow: string
    $borderColor: string
}>`
    position: relative;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    box-shadow: ${({ $boxShadow }) => $boxShadow};
    z-index: 101;
    border: 1px solid ${({ $borderColor }) => $borderColor};
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
    minMenuWidth,
    maxMenuWidth,
    maxMenuHeight,
    disabled = false,
    enableSearch = true,
    searchPlaceholder = 'Search options...',
    enableSelectAll = false,
    selectAllText = 'Select All',
    maxSelections,
    onSelectAll,
    alignment = MultiSelectV2Alignment.START,
    side = MultiSelectV2Side.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
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
    size = MultiSelectV2Size.MEDIUM,
    variant = MultiSelectV2Variant.CONTAINER,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    menuId,
}: MultiSelectV2MenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')

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
                justOpenedRef.current = true
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(() => {
                    justOpenedRef.current = false
                    timeoutRef.current = null
                }, 150)
            } else {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = null
                justOpenedRef.current = false
                if (enableSearch) setSearchText('')
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

    useEffect(() => {
        if (isOpen && enableSearch && searchInputRef.current) {
            const timer = setTimeout(() => {
                searchInputRef.current?.focus()
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [isOpen, enableSearch])

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

    const menuBorderColor =
        typeof multiSelectTokens.menu.border === 'string'
            ? multiSelectTokens.menu.border
            : '#d0d5dd'

    const menuBackgroundColor =
        (multiSelectTokens.menu.backgroundColor as string) || 'white'
    const menuBorderRadius =
        (multiSelectTokens.menu.borderRadius as string) || '8px'
    const menuShadow =
        (multiSelectTokens.trigger.boxShadow.container as string) || 'none'

    const isEmpty = filteredItems.length === 0
    const headerFooterHeight = Number(
        multiSelectTokens.menu.scroll?.headerFooterHeight
    )
    const defaultContentMaxHeight = Number(
        multiSelectTokens.menu.scroll?.defaultContentMaxHeight
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
                    $boxShadow={menuShadow}
                    $borderColor={menuBorderColor}
                    style={{
                        minWidth:
                            minMenuWidth ?? multiSelectTokens.menu.minWidth,
                        width: 'max(var(--radix-dropdown-menu-trigger-width))',
                        maxWidth:
                            maxMenuWidth ||
                            'var(--radix-dropdown-menu-trigger-width)',
                        maxHeight:
                            maxMenuHeight ||
                            'var(--radix-popper-available-height)',
                    }}
                >
                    {skeleton.show ? (
                        <MultiSelectSkeleton
                            multiSelectTokens={multiSelectTokens}
                            skeleton={skeleton}
                        />
                    ) : (
                        <>
                            <MultiSelectV2MenuHeader
                                backgroundColor={menuBackgroundColor}
                                borderColor={menuBorderColor}
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
                                            (maxMenuHeight ?? 400) -
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
                                                : (multiSelectTokens.menu.list
                                                      ?.paddingTopWhenNoSearch as number)
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
                                    backgroundColor={menuBackgroundColor}
                                    borderColor={menuBorderColor}
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
