import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Text from '../Text/Text'
import { SearchInput } from '../Inputs'
import Button from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/types'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'
import MultiSelectSkeleton from '../MultiSelect/MultiSelectSkeleton'
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
    type FlattenedMultiSelectV2Item,
} from './types'
import {
    filterMenuGroups,
    flattenMenuGroups,
    getAllAvailableValues,
} from './utils'
import MultiSelectV2MenuItem from './MultiSelectV2MenuItem'
import MultiSelectV2SelectAllItem from './MultiSelectV2SelectAllItem'

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

const StickyHeader = styled(Block)<{ $backgroundColor: string }>(() => ({
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'var(--bg)',
}))

const ScrollableContent = styled(Block)(() => ({
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    flexGrow: 1,
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}))

const FixedActionButtons = styled(Block)(() => ({
    padding: 16,
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'var(--bg)',
    flexShrink: 0,
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
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const justOpenedRef = useRef(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
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
    usePreventParentScroll(open, contentRef, selectors)
    useScrollLock(open)

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

    useEffect(() => {
        if (open && enableSearch && searchInputRef.current) {
            const timer = setTimeout(() => {
                searchInputRef.current?.focus()
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [open, enableSearch])

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

    const handleOpenStateChange = useCallback(
        (nextOpen: boolean) => {
            if (disabled) return
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
            onOpenChange(nextOpen)
        },
        [disabled, enableSearch, onOpenChange]
    )

    const handleOutsideInteraction = useCallback((e: Event) => {
        if (justOpenedRef.current) {
            e.preventDefault()
            return
        }

        const target = e.target as HTMLElement
        const trigger = target?.closest('[data-radix-dropdown-menu-trigger]')
        if (trigger) e.preventDefault()
    }, [])

    const isTooltipWrapper =
        React.isValidElement(trigger) &&
        trigger.props !== null &&
        typeof trigger.props === 'object' &&
        'content' in trigger.props &&
        'children' in trigger.props

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

    return (
        <RadixMenu.Root
            modal={false}
            open={open && !disabled}
            onOpenChange={handleOpenStateChange}
        >
            {isTooltipWrapper ? (
                React.cloneElement(
                    trigger as React.ReactElement<Record<string, unknown>>,
                    {
                        children: (
                            <RadixMenu.Trigger asChild disabled={disabled}>
                                {
                                    (
                                        trigger as React.ReactElement<
                                            Record<string, unknown> & {
                                                children: React.ReactNode
                                            }
                                        >
                                    ).props.children
                                }
                            </RadixMenu.Trigger>
                        ),
                    }
                )
            ) : (
                <RadixMenu.Trigger asChild disabled={disabled}>
                    {trigger}
                </RadixMenu.Trigger>
            )}
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
                    role="listbox"
                    aria-multiselectable="true"
                    $backgroundColor={menuBackgroundColor}
                    $borderRadius={menuBorderRadius}
                    $boxShadow={menuShadow}
                    $borderColor={menuBorderColor}
                    style={{
                        minWidth: minMenuWidth || 250,
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
                            <StickyHeader
                                style={{
                                    ['--bg' as string]: menuBackgroundColor,
                                }}
                            >
                                {enableSearch && items.length > 0 && (
                                    <Block>
                                        <SearchInput
                                            ref={searchInputRef}
                                            placeholder={searchPlaceholder}
                                            value={searchText}
                                            onChange={(e) =>
                                                setSearchText(e.target.value)
                                            }
                                            autoFocus
                                            aria-label={
                                                searchPlaceholder ||
                                                'Search options'
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'ArrowDown' ||
                                                    e.key === 'ArrowUp'
                                                ) {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    const menuContent =
                                                        e.currentTarget.closest(
                                                            '[data-dropdown="dropdown"]'
                                                        )
                                                    if (menuContent) {
                                                        const firstMenuItem =
                                                            menuContent.querySelector<HTMLElement>(
                                                                '[role="option"]:not([data-disabled])'
                                                            )
                                                        firstMenuItem?.focus()
                                                    }
                                                }
                                            }}
                                        />
                                    </Block>
                                )}
                                {enableSelectAll &&
                                    onSelectAll &&
                                    availableValues.length > 0 && (
                                        <Block
                                            borderBottom={`1px solid ${menuBorderColor}`}
                                            padding={`0 ${multiSelectTokens.menu.item.gap}`}
                                        >
                                            <MultiSelectV2SelectAllItem
                                                selected={selected}
                                                availableValues={
                                                    availableValues
                                                }
                                                onSelectAll={(selectAll) =>
                                                    onSelectAll(
                                                        selectAll,
                                                        filteredItems
                                                    )
                                                }
                                                selectAllText={selectAllText}
                                                disabled={disabled}
                                            />
                                        </Block>
                                    )}
                            </StickyHeader>
                            <ScrollableContent
                                style={{
                                    maxHeight: maxMenuHeight
                                        ? `${maxMenuHeight - 80}px`
                                        : '320px',
                                }}
                            >
                                {items.length === 0 ||
                                (filteredItems.length === 0 &&
                                    searchText.length > 0) ? (
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
                                    <Block
                                        padding={6}
                                        style={{
                                            paddingTop: enableSearch ? 0 : 6,
                                        }}
                                    >
                                        <VirtualList
                                            items={
                                                flattenedItems as VirtualListItem[]
                                            }
                                            height={(maxMenuHeight || 400) - 80}
                                            itemHeight={virtualListItemHeight}
                                            overscan={virtualListOverscan}
                                            onEndReached={onEndReached}
                                            endReachedThreshold={
                                                endReachedThreshold
                                            }
                                            hasMore={hasMore}
                                            renderItem={({
                                                item: flatItem,
                                            }) => {
                                                const typed =
                                                    flatItem as FlattenedMultiSelectV2Item

                                                if (typed.type === 'label') {
                                                    return (
                                                        <RadixMenu.Label
                                                            asChild
                                                        >
                                                            <PrimitiveText
                                                                fontSize={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .fontSize
                                                                }
                                                                fontWeight={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .fontWeight
                                                                }
                                                                padding="6px 8px"
                                                                userSelect="none"
                                                                textTransform="uppercase"
                                                                color={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .color
                                                                        .default
                                                                }
                                                                style={{
                                                                    margin: 0,
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                {typed.label}
                                                            </PrimitiveText>
                                                        </RadixMenu.Label>
                                                    )
                                                }

                                                if (
                                                    typed.type === 'separator'
                                                ) {
                                                    return (
                                                        <RadixMenu.Separator
                                                            asChild
                                                        >
                                                            <Block
                                                                height={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .seperator
                                                                        .height
                                                                }
                                                                backgroundColor={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .seperator
                                                                        .color
                                                                }
                                                                width="100%"
                                                            />
                                                        </RadixMenu.Separator>
                                                    )
                                                }

                                                if (
                                                    typed.type === 'item' &&
                                                    typed.item
                                                ) {
                                                    const itemIndex =
                                                        flattenedItems
                                                            .filter(
                                                                (i) =>
                                                                    i.type ===
                                                                    'item'
                                                            )
                                                            .findIndex(
                                                                (i) =>
                                                                    i.id ===
                                                                    typed.id
                                                            )
                                                    return (
                                                        <Block
                                                            width="100%"
                                                            style={{
                                                                minWidth: 0,
                                                            }}
                                                        >
                                                            <MultiSelectV2MenuItem
                                                                selected={
                                                                    selected
                                                                }
                                                                item={
                                                                    typed.item
                                                                }
                                                                onSelect={
                                                                    onSelect
                                                                }
                                                                maxSelections={
                                                                    maxSelections
                                                                }
                                                                allItems={filteredItems.flatMap(
                                                                    (g) =>
                                                                        g.items
                                                                )}
                                                                index={
                                                                    itemIndex
                                                                }
                                                            />
                                                        </Block>
                                                    )
                                                }

                                                return null
                                            }}
                                        />
                                    </Block>
                                ) : (
                                    <Block
                                        paddingX={
                                            multiSelectTokens.menu.padding[
                                                size
                                            ][variant].x
                                        }
                                        paddingY={
                                            multiSelectTokens.menu.padding[
                                                size
                                            ][variant].y
                                        }
                                    >
                                        {filteredItems.map((group, groupId) => {
                                            const groupStartIndex =
                                                filteredItems
                                                    .slice(0, groupId)
                                                    .reduce(
                                                        (acc, g) =>
                                                            acc +
                                                            g.items.length,
                                                        0
                                                    )

                                            return (
                                                <React.Fragment key={groupId}>
                                                    {group.groupLabel && (
                                                        <RadixMenu.Label
                                                            asChild
                                                        >
                                                            <PrimitiveText
                                                                fontSize={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .fontSize
                                                                }
                                                                fontWeight={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .fontWeight
                                                                }
                                                                padding="6px 8px"
                                                                userSelect="none"
                                                                textTransform="uppercase"
                                                                color={
                                                                    multiSelectTokens
                                                                        .menu
                                                                        .item
                                                                        .optionsLabel
                                                                        .color
                                                                        .default
                                                                }
                                                            >
                                                                {
                                                                    group.groupLabel
                                                                }
                                                            </PrimitiveText>
                                                        </RadixMenu.Label>
                                                    )}
                                                    {group.items.map(
                                                        (item, itemIndex) => (
                                                            <MultiSelectV2MenuItem
                                                                key={`${groupId}-${itemIndex}`}
                                                                selected={
                                                                    selected
                                                                }
                                                                item={item}
                                                                onSelect={
                                                                    onSelect
                                                                }
                                                                maxSelections={
                                                                    maxSelections
                                                                }
                                                                allItems={filteredItems.flatMap(
                                                                    (g) =>
                                                                        g.items
                                                                )}
                                                                index={
                                                                    groupStartIndex +
                                                                    itemIndex
                                                                }
                                                            />
                                                        )
                                                    )}
                                                    {groupId !==
                                                        filteredItems.length -
                                                            1 &&
                                                        group.showSeparator && (
                                                            <RadixMenu.Separator
                                                                asChild
                                                            >
                                                                <Block
                                                                    height={
                                                                        multiSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .seperator
                                                                            .height
                                                                    }
                                                                    backgroundColor={
                                                                        multiSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .seperator
                                                                            .color
                                                                    }
                                                                    margin={
                                                                        multiSelectTokens
                                                                            .menu
                                                                            .item
                                                                            .seperator
                                                                            .margin
                                                                    }
                                                                />
                                                            </RadixMenu.Separator>
                                                        )}
                                                </React.Fragment>
                                            )
                                        })}
                                    </Block>
                                )}
                            </ScrollableContent>
                            {showActionButtons &&
                                (primaryAction || secondaryAction) &&
                                items.length > 0 &&
                                !(
                                    filteredItems.length === 0 &&
                                    searchText.length > 0
                                ) && (
                                    <FixedActionButtons
                                        style={{
                                            ['--bg' as string]:
                                                menuBackgroundColor,
                                        }}
                                        borderTop={`1px solid ${menuBorderColor}`}
                                    >
                                        {secondaryAction && (
                                            <Button
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                text={secondaryAction.text}
                                                onClick={() => {
                                                    secondaryAction.onClick()
                                                    requestAnimationFrame(() =>
                                                        onOpenChange(false)
                                                    )
                                                }}
                                                disabled={
                                                    secondaryAction.disabled
                                                }
                                                loading={
                                                    secondaryAction.loading
                                                }
                                            />
                                        )}
                                        {primaryAction && (
                                            <Button
                                                buttonType={ButtonType.PRIMARY}
                                                size={ButtonSize.SMALL}
                                                text={primaryAction.text}
                                                onClick={() => {
                                                    primaryAction.onClick(
                                                        selected
                                                    )
                                                    requestAnimationFrame(() =>
                                                        onOpenChange(false)
                                                    )
                                                }}
                                                disabled={
                                                    primaryAction.disabled
                                                }
                                                loading={primaryAction.loading}
                                            />
                                        )}
                                    </FixedActionButtons>
                                )}
                        </>
                    )}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

export default MultiSelectV2Menu
