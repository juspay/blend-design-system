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
    MultiSelectMenuSize,
    MultiSelectVariant,
} from './types'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import MultiSelectMenuItem from './MultiSelectMenuItem'
import { type MultiSelectTokensType } from './multiSelect.tokens'
import { SearchInput } from '../Inputs'
import { filterMenuGroups, getAllAvailableValues } from './utils'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'
import SelectAllItem from './SelectAllItem'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Button from '../Button/Button'
import { ButtonType, ButtonSize } from '../Button/types'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'
import { dropdownContentAnimations } from './multiSelect.animations'
import MultiSelectSkeleton from './MultiSelectSkeleton'

const Content = styled(RadixMenu.Content)`
    position: relative;
    background-color: ${FOUNDATION_THEME.colors.gray[0]};
    border-radius: ${FOUNDATION_THEME.border.radius[8]};
    box-shadow: ${FOUNDATION_THEME.shadows.sm};
    z-index: 101;
    border: ${FOUNDATION_THEME.border.width[1]} solid
        ${FOUNDATION_THEME.colors.gray[200]};
    display: flex;
    flex-direction: column;
    overflow: hidden;

    ${dropdownContentAnimations}
`

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
    onEndReached,
    endReachedThreshold,
    hasMore,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    size = MultiSelectMenuSize.MEDIUM,
    variant = MultiSelectVariant.CONTAINER,
    allowCustomValue = false,
    customValueLabel = 'Specify',
    menuId,
}: MultiSelectMenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectTokensType>('MULTI_SELECT')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    const hasMatch = React.useMemo(
        () => checkExactMatch(searchText, items),
        [searchText, items]
    )

    const filteredItems = React.useMemo(() => {
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

    // RCA: When customTrigger is a Tooltip wrapping a Button, nested asChild props conflict
    // Solution: Detect Tooltip wrapper and restructure to: Tooltip > MenuTrigger > Button
    // This ensures tooltip shows on hover AND dropdown opens on click
    const isTooltipWrapper =
        React.isValidElement(trigger) &&
        trigger.props !== null &&
        typeof trigger.props === 'object' &&
        'content' in trigger.props &&
        'children' in trigger.props

    return (
        <RadixMenu.Root
            modal={false}
            open={open && !disabled}
            onOpenChange={handleOpenChange}
        >
            {isTooltipWrapper ? (
                React.cloneElement(trigger as React.ReactElement<any>, {
                    children: (
                        <RadixMenu.Trigger asChild disabled={disabled}>
                            {
                                (trigger as React.ReactElement<any>).props
                                    .children
                            }
                        </RadixMenu.Trigger>
                    ),
                })
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
                    onKeyDown={handleKeyDown}
                    role="listbox"
                    aria-multiselectable="true"
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
                            {' '}
                            <StickyHeader>
                                {enableSearch && (
                                    <Block>
                                        <SearchInput
                                            ref={searchInputRef}
                                            placeholder={searchPlaceholder}
                                            value={searchText}
                                            onChange={handleSearchChange}
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
                                                        if (firstMenuItem) {
                                                            firstMenuItem.focus()
                                                        }
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
                                            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                            padding={`0 ${multiSelectTokens.menu.item.gap}`}
                                        >
                                            <SelectAllItem
                                                selected={selected}
                                                availableValues={
                                                    availableValues
                                                }
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
                                }}
                            >
                                {items.length === 0 ? (
                                    <Block
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding={
                                            multiSelectTokens.menu.item.padding
                                        }
                                    >
                                        <PrimitiveText
                                            fontSize={14}
                                            color={
                                                multiSelectTokens.menu.item
                                                    .optionsLabel.color.default
                                            }
                                            textAlign="center"
                                        >
                                            No items available
                                        </PrimitiveText>
                                    </Block>
                                ) : filteredItems.length === 0 &&
                                  searchText.length > 0 ? (
                                    <Block
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding={
                                            multiSelectTokens.menu.item.padding
                                        }
                                    >
                                        <PrimitiveText
                                            fontSize={14}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            textAlign="center"
                                        >
                                            No results found
                                        </PrimitiveText>
                                    </Block>
                                ) : enableVirtualization &&
                                  flattenedItems.length > 0 ? (
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
                                                    flatItem as FlattenedMultiSelectItem

                                                const VirtualItemWrapper = ({
                                                    children,
                                                }: {
                                                    children: React.ReactNode
                                                }) => (
                                                    <Block
                                                        style={{
                                                            height: virtualListItemHeight,
                                                            minHeight:
                                                                virtualListItemHeight,
                                                            maxHeight:
                                                                virtualListItemHeight,
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        {children}
                                                    </Block>
                                                )

                                                if (typed.type === 'label') {
                                                    return (
                                                        <VirtualItemWrapper>
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
                                                                    padding={`${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`}
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
                                                                    {
                                                                        typed.label
                                                                    }
                                                                </PrimitiveText>
                                                            </RadixMenu.Label>
                                                        </VirtualItemWrapper>
                                                    )
                                                }

                                                if (
                                                    typed.type === 'separator'
                                                ) {
                                                    return (
                                                        <VirtualItemWrapper>
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
                                                        </VirtualItemWrapper>
                                                    )
                                                }

                                                if (
                                                    typed.type === 'item' &&
                                                    typed.item
                                                ) {
                                                    const itemIndex = (() => {
                                                        let idx = 0
                                                        for (const item of flattenedItems) {
                                                            if (
                                                                item.id ===
                                                                flatItem.id
                                                            ) {
                                                                break
                                                            }
                                                            if (
                                                                (
                                                                    item as FlattenedMultiSelectItem
                                                                ).type ===
                                                                'item'
                                                            ) {
                                                                idx++
                                                            }
                                                        }
                                                        return idx
                                                    })()
                                                    return (
                                                        <VirtualItemWrapper>
                                                            <Block
                                                                width="100%"
                                                                style={{
                                                                    minWidth: 0,
                                                                }}
                                                            >
                                                                <MultiSelectMenuItem
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
                                                        </VirtualItemWrapper>
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
                                                                padding={`${FOUNDATION_THEME.unit[6]} ${FOUNDATION_THEME.unit[8]}`}
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
                                                            <MultiSelectMenuItem
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
                                (primaryAction || secondaryAction) && (
                                    <FixedActionButtons>
                                        {secondaryAction && (
                                            <Button
                                                data-button-for={
                                                    secondaryAction.text
                                                }
                                                data-dynamic-button={
                                                    secondaryAction.text
                                                }
                                                data-batch-value={
                                                    secondaryAction.text
                                                }
                                                buttonType={
                                                    ButtonType.SECONDARY
                                                }
                                                size={ButtonSize.SMALL}
                                                text={secondaryAction.text}
                                                onClick={() => {
                                                    secondaryAction.onClick()
                                                    onOpenChange(false)
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
                                                data-button-for={
                                                    primaryAction.text
                                                }
                                                data-dynamic-button={
                                                    primaryAction.text
                                                }
                                                data-batch-value={
                                                    primaryAction.text
                                                }
                                                buttonType={ButtonType.PRIMARY}
                                                size={ButtonSize.SMALL}
                                                text={primaryAction.text}
                                                onClick={() => {
                                                    primaryAction.onClick(
                                                        selected
                                                    )
                                                    onOpenChange(false)
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

export default MultiSelectMenu
