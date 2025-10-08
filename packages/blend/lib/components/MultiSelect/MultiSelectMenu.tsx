import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../tokens'
import {
    MultiSelectMenuAlignment,
    type MultiSelectMenuGroupType,
    type MultiSelectMenuItemType,
    type MultiSelectMenuProps,
    MultiSelectMenuSide,
} from './types'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import MultiSelectMenuItem from './MultiSelectMenuItem'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { SearchInput } from '../Inputs'
import { filterMenuGroups, getAllAvailableValues } from './utils'
import SelectAllItem from './SelectAllItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'

const Content = styled(RadixMenu.Content)(() => ({
    position: 'relative',
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    borderRadius: FOUNDATION_THEME.border.radius[8],
    boxShadow: FOUNDATION_THEME.shadows.sm,
    zIndex: 49,
    border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
}))

const StickyHeader = styled(Block)(() => ({
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
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
    borderTop: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    padding: FOUNDATION_THEME.unit[16],
    display: 'flex',
    gap: FOUNDATION_THEME.unit[8],
    justifyContent: 'flex-end',
    margin: '0',
    backgroundColor: FOUNDATION_THEME.colors.gray[0],
    flexShrink: 0,
}))

type FlattenedMultiSelectItem = VirtualListItem & {
    type: 'item' | 'label' | 'separator'
    item?: MultiSelectMenuItemType
    label?: string
    groupId?: number
}

const flattenMultiSelectGroups = (
    groups: MultiSelectMenuGroupType[]
): FlattenedMultiSelectItem[] => {
    const flattened: FlattenedMultiSelectItem[] = []
    let idCounter = 0

    groups.forEach((group, groupId) => {
        if (group.groupLabel) {
            flattened.push({
                id: `label-${groupId}`,
                type: 'label',
                label: group.groupLabel,
                groupId,
            })
        }

        group.items.forEach((item) => {
            flattened.push({
                id: `item-${idCounter++}`,
                type: 'item',
                item,
                groupId,
            })
        })

        if (groupId !== groups.length - 1 && group.showSeparator) {
            flattened.push({
                id: `separator-${groupId}`,
                type: 'separator',
                groupId,
            })
        }
    })

    return flattened
}

const MultiSelectMenu = ({
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
    alignment = MultiSelectMenuAlignment.CENTER,
    side = MultiSelectMenuSide.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    open,
    onOpenChange,
    showActionButtons = true,
    primaryAction,
    secondaryAction,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 5,
    itemsToRender,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
}: MultiSelectMenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const filteredItems = React.useMemo(
        () => filterMenuGroups(items, searchText),
        [items, searchText]
    )
    const availableValues = React.useMemo(
        () => getAllAvailableValues(filteredItems),
        [filteredItems]
    )

    const flattenedItems = useMemo(
        () => flattenMultiSelectGroups(filteredItems),
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
                    const newValue = searchText + e.key
                    setSearchText(newValue)
                    setTimeout(() => {
                        if (searchInputRef.current) {
                            searchInputRef.current.setSelectionRange(
                                newValue.length,
                                newValue.length
                            )
                        }
                    }, 0)
                    return
                }

                if (e.key === 'Backspace' && searchText.length > 0) {
                    e.preventDefault()
                    searchInputRef.current.focus()
                    const newValue = searchText.slice(0, -1)
                    setSearchText(newValue)
                    setTimeout(() => {
                        if (searchInputRef.current) {
                            searchInputRef.current.setSelectionRange(
                                newValue.length,
                                newValue.length
                            )
                        }
                    }, 0)
                    return
                }
            }
        },
        [enableSearch, searchText]
    )

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return

        if (!newOpen && enableSearch) {
            setSearchText('')
        }

        onOpenChange(newOpen)
    }

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value)
        },
        []
    )

    return (
        <RadixMenu.Root
            modal={false}
            open={open && !disabled}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <Content
                ref={contentRef}
                align={alignment}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                side={side}
                avoidCollisions={false}
                onKeyDown={handleKeyDown}
                style={{
                    minWidth: minMenuWidth || 250,
                    width: 'max(var(--radix-dropdown-menu-trigger-width))',
                    maxWidth:
                        maxMenuWidth ||
                        'var(--radix-dropdown-menu-trigger-width)',
                    maxHeight:
                        maxMenuHeight || 'var(--radix-popper-available-height)',
                }}
            >
                <StickyHeader>
                    {enableSearch && (
                        <Block>
                            <SearchInput
                                ref={searchInputRef}
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </Block>
                    )}
                    {enableSelectAll &&
                        onSelectAll &&
                        availableValues.length > 0 && (
                            <Block
                                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                padding={`0 ${multiSelectTokens.dropdown.item.gap}`}
                            >
                                <SelectAllItem
                                    selected={selected}
                                    availableValues={availableValues}
                                    onSelectAll={onSelectAll}
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
                        padding: enableVirtualization
                            ? 0
                            : FOUNDATION_THEME.unit[6],
                    }}
                >
                    {items.length === 0 ? (
                        <Block
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            padding={multiSelectTokens.dropdown.item.padding}
                        >
                            <PrimitiveText
                                fontSize={14}
                                color={
                                    multiSelectTokens.dropdown.item.label.color
                                        .disabled
                                }
                                textAlign="center"
                            >
                                No items available
                            </PrimitiveText>
                        </Block>
                    ) : filteredItems.length === 0 && searchText.length > 0 ? (
                        <Block
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            padding={FOUNDATION_THEME.unit[6]}
                        >
                            <PrimitiveText
                                fontSize={14}
                                color={FOUNDATION_THEME.colors.gray[400]}
                                textAlign="center"
                            >
                                No results found
                            </PrimitiveText>
                        </Block>
                    ) : enableVirtualization && flattenedItems.length > 0 ? (
                        <Block
                            padding={FOUNDATION_THEME.unit[6]}
                            style={{
                                paddingTop: enableSearch
                                    ? 0
                                    : FOUNDATION_THEME.unit[6],
                            }}
                        >
                            <VirtualList
                                items={flattenedItems}
                                itemHeight={virtualListItemHeight}
                                maxHeight={(maxMenuHeight || 400) - 80}
                                overscan={virtualListOverscan}
                                dynamicHeight={true}
                                estimatedItemHeight={virtualListItemHeight}
                                itemsToRender={itemsToRender}
                                onEndReached={onEndReached}
                                endReachedThreshold={endReachedThreshold}
                                hasMore={hasMore}
                                loadingComponent={loadingComponent}
                                style={{
                                    height: 'auto',
                                    maxHeight: (maxMenuHeight || 400) - 80,
                                }}
                                renderItem={({ item: flatItem }) => {
                                    const typed =
                                        flatItem as FlattenedMultiSelectItem

                                    if (typed.type === 'label') {
                                        return (
                                            <RadixMenu.Label asChild>
                                                <PrimitiveText
                                                    fontSize={12}
                                                    padding={`${multiSelectTokens.dropdown.item.gap} ${multiSelectTokens.dropdown.item.padding}`}
                                                    userSelect="none"
                                                    textTransform="uppercase"
                                                    color={
                                                        multiSelectTokens
                                                            .dropdown.item.label
                                                            .color.disabled
                                                    }
                                                >
                                                    {typed.label}
                                                </PrimitiveText>
                                            </RadixMenu.Label>
                                        )
                                    }

                                    if (typed.type === 'separator') {
                                        return (
                                            <RadixMenu.Separator asChild>
                                                <Block
                                                    height={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .height
                                                    }
                                                    backgroundColor={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .color
                                                    }
                                                    margin={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .margin
                                                    }
                                                />
                                            </RadixMenu.Separator>
                                        )
                                    }

                                    if (typed.type === 'item' && typed.item) {
                                        return (
                                            <MultiSelectMenuItem
                                                selected={selected}
                                                item={typed.item}
                                                onSelect={onSelect}
                                                maxSelections={maxSelections}
                                                allItems={filteredItems.flatMap(
                                                    (g) => g.items
                                                )}
                                            />
                                        )
                                    }

                                    return null
                                }}
                            />
                        </Block>
                    ) : (
                        filteredItems.map(
                            (
                                group: MultiSelectMenuGroupType,
                                groupId: number
                            ) => (
                                <React.Fragment key={groupId}>
                                    {group.groupLabel && (
                                        <RadixMenu.Label asChild>
                                            <PrimitiveText
                                                fontSize={12}
                                                padding={`${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`}
                                                userSelect="none"
                                                textTransform="uppercase"
                                                color={
                                                    FOUNDATION_THEME.colors
                                                        .gray[400]
                                                }
                                            >
                                                {group.groupLabel}
                                            </PrimitiveText>
                                        </RadixMenu.Label>
                                    )}
                                    {group.items.map(
                                        (
                                            item: MultiSelectMenuItemType,
                                            itemIndex: number
                                        ) => (
                                            <MultiSelectMenuItem
                                                key={`${groupId}-${itemIndex}`}
                                                selected={selected}
                                                item={item}
                                                onSelect={onSelect}
                                                maxSelections={maxSelections}
                                                allItems={filteredItems.flatMap(
                                                    (g) => g.items
                                                )}
                                            />
                                        )
                                    )}
                                    {groupId !== filteredItems.length - 1 &&
                                        group.showSeparator && (
                                            <RadixMenu.Separator asChild>
                                                <Block
                                                    height={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .height
                                                    }
                                                    backgroundColor={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .color
                                                    }
                                                    margin={
                                                        multiSelectTokens
                                                            .dropdown.seperator
                                                            .margin
                                                    }
                                                ></Block>
                                            </RadixMenu.Separator>
                                        )}
                                </React.Fragment>
                            )
                        )
                    )}
                </ScrollableContent>
                {showActionButtons && (primaryAction || secondaryAction) && (
                    <FixedActionButtons>
                        {secondaryAction && (
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                size={ButtonSize.SMALL}
                                text={secondaryAction.text}
                                onClick={() => {
                                    secondaryAction.onClick()
                                    onOpenChange(false)
                                }}
                                disabled={secondaryAction.disabled}
                                loading={secondaryAction.loading}
                            />
                        )}
                        {primaryAction && (
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                text={primaryAction.text}
                                onClick={() => {
                                    primaryAction.onClick(selected)
                                    onOpenChange(false)
                                }}
                                disabled={primaryAction.disabled}
                                loading={primaryAction.loading}
                            />
                        )}
                    </FixedActionButtons>
                )}
            </Content>
        </RadixMenu.Root>
    )
}

export default MultiSelectMenu
