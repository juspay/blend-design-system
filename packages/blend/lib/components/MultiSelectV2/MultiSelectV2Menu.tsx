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
    hasRenderableSelectItems,
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
    filterMultiSelectV2MenuGroups,
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
import { VIRTUAL_MIN_VIEWPORT } from '../common/virtualViewport'
import { useSelectSearchController } from '../Select/useSelectSearchController'
import SelectSearchStatus, {
    SELECT_SEARCH_STATUS_HEIGHT,
} from '../Select/SelectSearchStatus'
import { useSelectSearchFocusRecovery } from '../Select/useSelectSearchFocusRecovery'

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

const MenuFooter = styled(Block)`
    flex-shrink: 0;
`

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
    menuFooter,
}: MultiSelectV2MenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')

    const searchPlaceholder = search?.placeholder ?? 'Search options...'
    const minMenuWidth = menuDimensions?.minWidth as number | undefined
    const maxMenuWidth = menuDimensions?.maxWidth as string | number | undefined
    const maxMenuHeight = menuDimensions?.maxHeight as number | undefined
    const alignment = menuPosition?.alignment ?? MultiSelectV2Alignment.START
    const side = menuPosition?.side ?? MultiSelectV2Side.BOTTOM
    const sideOffset = menuPosition?.sideOffset ?? 8
    const alignOffset = menuPosition?.alignOffset ?? 0

    const {
        value: searchText,
        isControlled: isSearchControlled,
        isSearchEnabled,
        shouldFilterInternally,
        valueForSearchBehavior,
        dispatchUserValue,
        resetUncontrolled,
    } = useSelectSearchController({
        controlledValue: search?.searchText,
        onValueChange: search?.onSearchChange,
        explicitShow: search?.show,
        existingSurfaceDefault: true,
    })
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const justOpenedRef = useRef(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = open !== undefined
    const isOpen = (isControlled ? open : internalOpen) && !disabled
    const handleSearchFocusRecovery = useSelectSearchFocusRecovery({
        enabled: isSearchControlled && isSearchEnabled,
        open: Boolean(isOpen),
        items,
        searchInputRef,
    })
    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (disabled) return
            if (!isControlled) setInternalOpen(nextOpen)
            if (nextOpen) {
                if (isSearchEnabled) resetUncontrolled()
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
        [
            disabled,
            isControlled,
            isSearchEnabled,
            onOpenChange,
            resetUncontrolled,
        ]
    )
    const hasMatch = useMemo(
        () => checkExactMatch(valueForSearchBehavior, items),
        [valueForSearchBehavior, items]
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
        const baseFilteredItems = shouldFilterInternally
            ? filterMultiSelectV2MenuGroups(items, searchText)
            : items
        return getFilteredItemsWithCustomValue(
            baseFilteredItems,
            searchText,
            hasMatch,
            allowCustomValue,
            isSearchEnabled && !search?.isSearchLoading,
            customValueLabel
        )
    }, [
        items,
        searchText,
        allowCustomValue,
        hasMatch,
        isSearchEnabled,
        search?.isSearchLoading,
        shouldFilterInternally,
        customValueLabel,
    ])
    const hasSourceItems = isSearchControlled
        ? hasRenderableSelectItems(items)
        : items.length > 0
    const hasRenderableItems = isSearchControlled
        ? hasRenderableSelectItems(filteredItems)
        : filteredItems.length > 0

    const selectAllItems = isSearchControlled ? items : filteredItems
    const availableValues = useMemo(
        () => getAllAvailableValues(selectAllItems),
        [selectAllItems]
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
        enableSearch: isSearchEnabled,
        searchText,
        searchInputRef,
        focusSearchOnOpen: true,
        focusSearchDelayMs: 50,
    })

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (
                isSearchEnabled &&
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
                    dispatchUserValue(nextValue)
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
                    dispatchUserValue(nextValue)
                    setTimeout(() => {
                        searchInputRef.current?.setSelectionRange(
                            nextValue.length,
                            nextValue.length
                        )
                    }, 0)
                }
            }
        },
        [dispatchUserValue, isSearchEnabled, searchText]
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

    const isEmpty = !hasRenderableItems
    const isActiveSearchLoading =
        isSearchEnabled && Boolean(search?.isSearchLoading)
    const headerFooterHeight = Number(
        multiSelectTokens.menu.scroll?.height ?? 80
    )
    const defaultContentMaxHeight = Number(
        multiSelectTokens.menu.scroll?.maxHeight ?? 320
    )
    const showActions =
        showActionButtons &&
        (primaryAction || secondaryAction) &&
        hasSourceItems &&
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
                    onFocusCapture={handleSearchFocusRecovery}
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
                                showSearch={isSearchEnabled}
                                showSearchWhenEmpty={isSearchControlled}
                                itemsCount={items.length}
                                searchValue={searchText}
                                searchPlaceholder={searchPlaceholder}
                                searchInputRef={searchInputRef}
                                onSearchChange={(e) =>
                                    dispatchUserValue(e.target.value)
                                }
                                onSearchArrowKeyToFirst={focusFirstMenuItem}
                                showSelectAll={enableSelectAll}
                                selected={selected}
                                availableValues={availableValues}
                                filteredItems={selectAllItems}
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
                                <SelectSearchStatus
                                    isControlled={
                                        isSearchControlled && isSearchEnabled
                                    }
                                    isLoading={isActiveSearchLoading}
                                    isEmpty={isEmpty}
                                    emptyStateText={
                                        search?.emptyStateText ||
                                        (!hasSourceItems
                                            ? 'No items available'
                                            : 'No results found')
                                    }
                                />
                                {isActiveSearchLoading &&
                                isEmpty ? null : isEmpty ? (
                                    <Block
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{
                                            paddingTop:
                                                multiSelectTokens.menu.item
                                                    .paddingTop,
                                            paddingRight:
                                                multiSelectTokens.menu.item
                                                    .paddingRight,
                                            paddingBottom:
                                                multiSelectTokens.menu.item
                                                    .paddingBottom,
                                            paddingLeft:
                                                multiSelectTokens.menu.item
                                                    .paddingLeft,
                                        }}
                                    >
                                        <Text
                                            variant="body.md"
                                            color={
                                                multiSelectTokens.menu.item
                                                    .optionsLabel.color.default
                                            }
                                            textAlign="center"
                                        >
                                            {search?.emptyStateText ||
                                                (!hasSourceItems
                                                    ? 'No items available'
                                                    : 'No results found')}
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
                                            isActiveSearchLoading &&
                                            hasRenderableItems
                                                ? Math.max(
                                                      (maxMenuHeight ??
                                                          DEFAULT_VIRTUAL_LIST_HEIGHT_FALLBACK) -
                                                          headerFooterHeight -
                                                          SELECT_SEARCH_STATUS_HEIGHT,
                                                      0
                                                  )
                                                : Math.max(
                                                      (maxMenuHeight ??
                                                          DEFAULT_VIRTUAL_LIST_HEIGHT_FALLBACK) -
                                                          headerFooterHeight,
                                                      VIRTUAL_MIN_VIEWPORT
                                                  )
                                        }
                                        itemHeight={virtualListItemHeight}
                                        overscan={virtualListOverscan}
                                        onEndReached={onEndReached}
                                        endReachedThreshold={
                                            endReachedThreshold
                                        }
                                        hasMore={hasMore}
                                        focusIdentityEnabled={
                                            isSearchControlled
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
                                        focusIdentityEnabled={
                                            isSearchControlled
                                        }
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
                            {menuFooter && (
                                <MenuFooter>{menuFooter}</MenuFooter>
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
