import React, { useState, useMemo } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import {
    SelectMenuAlignment,
    type SelectMenuItemType,
    SelectMenuSide,
} from '../Select'
import type { SelectMenuGroupType } from '../Select'
import { FOUNDATION_THEME } from '../../tokens'
import styled from 'styled-components'
import Text from '../Text/Text'
import Block from '../Primitives/Block/Block'
import { ChevronRight } from 'lucide-react'
import { SearchInput } from '../Inputs'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { SingleSelectTokensType } from './singleSelect.tokens'
import SelectItem, { SelectItemType } from '../Select/SelectItem'
import {
    SelectMenuSize,
    SelectMenuVariant,
    SingleSelectSkeletonProps,
} from './types'
import VirtualList from '../VirtualList/VirtualList'
import {
    dropdownContentAnimations,
    submenuContentAnimations,
    hoverTransition,
} from './singleSelect.animations'
import SingleSelectSkeleton from './SingleSelectSkeleton'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'

type SingleSelectMenuProps = {
    items: SelectMenuGroupType[]
    selected: string
    onSelect: (value: string) => void
    trigger: React.ReactNode
    minMenuWidth?: number
    maxMenuWidth?: number
    maxMenuHeight?: number
    enableSearch?: boolean
    searchPlaceholder?: string
    disabled?: boolean

    // alignment
    alignment?: SelectMenuAlignment
    side?: SelectMenuSide
    sideOffset?: number
    alignOffset?: number

    // open
    open: boolean
    onOpenChange: (open: boolean) => void

    // size
    size?: SelectMenuSize
    variant?: SelectMenuVariant

    // virtualization
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    // infinite scroll
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: React.ReactNode
    skeleton?: SingleSelectSkeletonProps
    allowCustomValue?: boolean
    customValueLabel?: string
    menuId?: string
}

type FlattenedItem = {
    id: string
    type: 'item' | 'label' | 'separator'
    item?: SelectMenuItemType
    label?: string
    groupId?: number
}

const flattenGroups = (groups: SelectMenuGroupType[]): FlattenedItem[] => {
    const flattened: FlattenedItem[] = []
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

const Content = styled(RadixMenu.Content)`
    position: relative;
    background-color: white;
    border-radius: 8px;
    box-shadow: ${FOUNDATION_THEME.shadows.sm};
    z-index: 99;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    ${dropdownContentAnimations}
`

const StyledSubMenu = styled(RadixMenu.Sub)(() => ({
    padding: '8px 6px',
    margin: '0px 8px',
}))

const SubTrigger = styled(RadixMenu.SubTrigger)`
    align-items: center;
    padding: 8px 6px;
    margin: 0px 8px;
    border-radius: 4px;

    ${hoverTransition}

    &:hover {
        background-color: ${FOUNDATION_THEME.colors.gray[50]};
    }

    &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &[data-highlighted] {
        border: none;
        outline: none;
        background-color: ${FOUNDATION_THEME.colors.gray[50]};
    }
`

const SubContent = styled(RadixMenu.SubContent)<{
    singleSelectTokens?: SingleSelectTokensType
}>`
    background-color: white;
    border-radius: 8px;
    padding: 8px 0px;
    box-shadow: ${FOUNDATION_THEME.shadows.lg};
    border: ${({ singleSelectTokens }) =>
        singleSelectTokens?.menu.border ||
        `1px solid ${FOUNDATION_THEME.colors.gray[200]}`};
    z-index: 1000;

    ${submenuContentAnimations}
`

const SubMenu = ({
    item,
    onSelect,
    selected,
    singleSelectTokens,
}: {
    item: SelectMenuItemType
    onSelect: (value: string) => void
    selected: string
    singleSelectTokens: SingleSelectTokensType
}) => {
    return (
        <StyledSubMenu>
            <SubTrigger asChild>
                <Block
                    display="flex"
                    alignItems="center"
                    gap={8}
                    justifyContent="space-between"
                >
                    <Block
                        as="span"
                        display="flex"
                        alignItems="center"
                        gap={8}
                        flexGrow={1}
                    >
                        {item.slot1 && (
                            <Block flexShrink={0} height="auto" contentCentered>
                                {item.slot1}
                            </Block>
                        )}

                        <Text
                            variant="body.md"
                            color={FOUNDATION_THEME.colors.gray[600]}
                            fontWeight={500}
                            truncate
                        >
                            {item.label}
                        </Text>
                    </Block>
                    {item.slot2 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot2}
                        </Block>
                    )}
                    {item.slot3 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot3}
                        </Block>
                    )}
                    {item.slot4 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot4}
                        </Block>
                    )}
                    <Block flexShrink={0} size={20} contentCentered>
                        <ChevronRight
                            size={16}
                            color={FOUNDATION_THEME.colors.gray[400]}
                        />
                    </Block>
                </Block>
            </SubTrigger>
            <SubContent
                avoidCollisions
                sideOffset={8}
                singleSelectTokens={singleSelectTokens}
            >
                {item.subMenu?.map((subItem, subIdx) => (
                    <Item
                        key={subIdx}
                        item={subItem}
                        onSelect={onSelect}
                        selected={selected}
                        singleSelectTokens={singleSelectTokens}
                    />
                ))}
            </SubContent>
        </StyledSubMenu>
    )
}

const Item = ({
    item,
    onSelect,
    selected,
    singleSelectTokens,
    index,
}: {
    item: SelectMenuItemType
    onSelect: (value: string) => void
    selected: string
    singleSelectTokens?: SingleSelectTokensType
    index?: number
}) => {
    if (item.subMenu) {
        return (
            <SubMenu
                item={item}
                onSelect={onSelect}
                selected={selected}
                singleSelectTokens={singleSelectTokens!}
            />
        )
    }

    return (
        <SelectItem
            item={item}
            onSelect={onSelect}
            selected={selected}
            type={SelectItemType.SINGLE}
            showCheckmark={true}
            index={index}
        />
    )
}

const Label = styled(RadixMenu.Label)(() => ({
    margin: '0px 8px',
    padding: '8px 6px',
    userSelect: 'none',
    textTransform: 'uppercase',
    overflow: 'clip',
}))

// Utility: Recursively filter menu items and groups by search text
function filterMenuGroups(
    groups: SelectMenuGroupType[],
    searchText: string
): SelectMenuGroupType[] {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group: SelectMenuGroupType) => {
            const filteredItems = group.items
                .map((item: SelectMenuItemType) => filterMenuItem(item, lower))
                .filter(Boolean) as SelectMenuItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SelectMenuGroupType[]
}

function filterMenuItem(
    item: SelectMenuItemType,
    lower: string
): SelectMenuItemType | null {
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: SelectMenuItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as SelectMenuItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

const SingleSelectMenu = ({
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
    alignment = SelectMenuAlignment.CENTER,
    side = SelectMenuSide.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    open,
    onOpenChange,
    size = SelectMenuSize.MEDIUM,
    variant = SelectMenuVariant.CONTAINER,
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 2,
    onEndReached,
    endReachedThreshold,
    hasMore,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
    allowCustomValue = false,
    customValueLabel = 'Specify',
}: SingleSelectMenuProps) => {
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    let itemCounter = 0

    const hasMatch = useMemo(
        () => checkExactMatch(searchText, items),
        [searchText, items]
    )

    const filteredItems = useMemo(() => {
        const baseFilteredItems = searchText
            ? filterMenuGroups(items, searchText)
            : items

        return getFilteredItemsWithCustomValue(
            baseFilteredItems,
            searchText,
            hasMatch,
            allowCustomValue || false,
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

    const flattenedItems = useMemo(
        () =>
            enableVirtualization || searchText
                ? flattenGroups(filteredItems)
                : [],
        [filteredItems, enableVirtualization, searchText]
    )

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return
        if (!newOpen && enableSearch) {
            setSearchText('')
        }
        onOpenChange(newOpen)
    }

    const renderVirtualItem = ({
        item: flatItem,
    }: {
        item: FlattenedItem
        index: number
    }) => {
        const VirtualItemWrapper = ({
            children,
        }: {
            children: React.ReactNode
        }) => (
            <Block
                style={{
                    height: virtualListItemHeight,
                    minHeight: virtualListItemHeight,
                    maxHeight: virtualListItemHeight,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {children}
            </Block>
        )

        if (flatItem.type === 'label') {
            return (
                <VirtualItemWrapper>
                    <Label style={{ margin: 0, width: '100%' }}>
                        <Text
                            fontSize={
                                singleSelectTokens.menu.item.optionsLabel
                                    .fontSize
                            }
                            color={
                                singleSelectTokens.menu.item.optionsLabel.color
                                    .default
                            }
                            fontWeight={
                                singleSelectTokens.menu.item.optionsLabel
                                    .fontWeight
                            }
                        >
                            {flatItem.label}
                        </Text>
                    </Label>
                </VirtualItemWrapper>
            )
        }

        if (flatItem.type === 'separator') {
            return (
                <VirtualItemWrapper>
                    <RadixMenu.Separator asChild>
                        <Block
                            height={
                                singleSelectTokens.menu.item.seperator.height
                            }
                            backgroundColor={
                                singleSelectTokens.menu.item.seperator.color
                            }
                            width="100%"
                        />
                    </RadixMenu.Separator>
                </VirtualItemWrapper>
            )
        }

        if (flatItem.type === 'item' && flatItem.item) {
            const currentIndex = itemCounter
            itemCounter++
            return (
                <VirtualItemWrapper>
                    <Block width="100%" style={{ minWidth: 0 }}>
                        <Item
                            selected={selected}
                            item={flatItem.item}
                            onSelect={onSelect}
                            singleSelectTokens={singleSelectTokens}
                            index={currentIndex}
                        />
                    </Block>
                </VirtualItemWrapper>
            )
        }

        return null
    }

    return (
        <RadixMenu.Root
            modal={false}
            open={open && !disabled}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild disabled={disabled}>
                {trigger}
            </RadixMenu.Trigger>
            <RadixMenu.Portal>
                <Content
                    data-dropdown="dropdown"
                    align={alignment}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    side={side}
                    style={{
                        maxHeight: maxMenuHeight,
                        minWidth: minMenuWidth || '250px',
                        width: 'max(var(--radix-dropdown-menu-trigger-width))',
                        maxWidth:
                            maxMenuWidth ||
                            'var(--radix-dropdown-menu-trigger-width)',
                        border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                    }}
                    onFocusCapture={(e) => {
                        if (enableSearch && searchInputRef.current) {
                            if (
                                e.target !== searchInputRef.current &&
                                !searchInputRef.current.contains(
                                    e.target as Node
                                )
                            ) {
                                e.preventDefault()
                                searchInputRef.current.focus()
                            }
                        }
                    }}
                    onKeyDown={(e) => {
                        if (enableSearch && searchInputRef.current) {
                            if (
                                e.target !== searchInputRef.current &&
                                !searchInputRef.current.contains(
                                    e.target as Node
                                ) &&
                                e.key.length === 1
                            ) {
                                searchInputRef.current.focus()
                            }
                        }
                    }}
                >
                    {skeleton.show ? (
                        <SingleSelectSkeleton
                            singleSelectTokens={singleSelectTokens}
                            skeleton={skeleton}
                        />
                    ) : (
                        <>
                            {enableSearch && (
                                <Block
                                    position="sticky"
                                    top={0}
                                    left={0}
                                    right={0}
                                    zIndex={50}
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[0]
                                    }
                                >
                                    <Block
                                        marginBottom={FOUNDATION_THEME.unit[6]}
                                    >
                                        <SearchInput
                                            ref={searchInputRef}
                                            placeholder={searchPlaceholder}
                                            value={searchText}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                setSearchText(e.target.value)
                                            }}
                                            autoFocus
                                            aria-label={
                                                searchPlaceholder ||
                                                'Search options'
                                            }
                                        />
                                    </Block>
                                </Block>
                            )}
                            {items.length === 0 ? (
                                <Block
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    padding={
                                        singleSelectTokens.menu.item.padding
                                    }
                                    paddingTop={0}
                                >
                                    <Text
                                        variant="body.md"
                                        color={
                                            singleSelectTokens.menu.item
                                                .optionsLabel.color.default
                                        }
                                        textAlign="center"
                                    >
                                        No items available
                                    </Text>
                                </Block>
                            ) : filteredItems.length === 0 &&
                              searchText.length > 0 ? (
                                <Block
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    padding={
                                        singleSelectTokens.menu.item.padding
                                    }
                                >
                                    <Text
                                        variant="body.md"
                                        color={
                                            singleSelectTokens.menu.item
                                                .optionsLabel.color.default
                                        }
                                        textAlign="center"
                                    >
                                        No results found
                                    </Text>
                                </Block>
                            ) : enableVirtualization &&
                              filteredItems.length > 0 ? (
                                <Block padding={FOUNDATION_THEME.unit[6]}>
                                    <VirtualList
                                        items={flattenedItems}
                                        renderItem={renderVirtualItem}
                                        height={maxMenuHeight - 60}
                                        itemHeight={virtualListItemHeight}
                                        overscan={virtualListOverscan}
                                        onEndReached={onEndReached}
                                        endReachedThreshold={
                                            endReachedThreshold
                                        }
                                        hasMore={hasMore}
                                        isLoading={false}
                                    />
                                </Block>
                            ) : (
                                <Block
                                    paddingX={
                                        singleSelectTokens.menu.padding[size][
                                            variant
                                        ].x
                                    }
                                    paddingY={
                                        singleSelectTokens.menu.padding[size][
                                            variant
                                        ].y
                                    }
                                    style={{
                                        paddingTop: enableSearch
                                            ? 0
                                            : FOUNDATION_THEME.unit[6],
                                    }}
                                >
                                    {filteredItems.map((group, groupId) => (
                                        <React.Fragment key={groupId}>
                                            {group.groupLabel && (
                                                <Label>
                                                    <Text
                                                        fontSize={
                                                            singleSelectTokens
                                                                .menu.item
                                                                .optionsLabel
                                                                .fontSize
                                                        }
                                                        color={
                                                            singleSelectTokens
                                                                .menu.item
                                                                .optionsLabel
                                                                .color.default
                                                        }
                                                        fontWeight={
                                                            singleSelectTokens
                                                                .menu.item
                                                                .optionsLabel
                                                                .fontWeight
                                                        }
                                                    >
                                                        {group.groupLabel}
                                                    </Text>
                                                </Label>
                                            )}
                                            {group.items.map(
                                                (item, itemIndex) => {
                                                    let itemIdx = 0
                                                    for (
                                                        let i = 0;
                                                        i < groupId;
                                                        i++
                                                    ) {
                                                        itemIdx +=
                                                            filteredItems[i]
                                                                .items.length
                                                    }
                                                    itemIdx += itemIndex
                                                    return (
                                                        <Item
                                                            key={`${groupId}-${itemIndex}`}
                                                            selected={selected}
                                                            item={item}
                                                            onSelect={onSelect}
                                                            singleSelectTokens={
                                                                singleSelectTokens
                                                            }
                                                            index={itemIdx}
                                                        />
                                                    )
                                                }
                                            )}
                                            {groupId !==
                                                filteredItems.length - 1 &&
                                                group.showSeparator && (
                                                    <RadixMenu.Separator
                                                        asChild
                                                    >
                                                        <Block
                                                            height={
                                                                singleSelectTokens
                                                                    .menu.item
                                                                    .seperator
                                                                    .height
                                                            }
                                                            backgroundColor={
                                                                singleSelectTokens
                                                                    .menu.item
                                                                    .seperator
                                                                    .color
                                                            }
                                                            margin={
                                                                singleSelectTokens
                                                                    .menu.item
                                                                    .seperator
                                                                    .margin
                                                            }
                                                        />
                                                    </RadixMenu.Separator>
                                                )}
                                        </React.Fragment>
                                    ))}
                                </Block>
                            )}
                        </>
                    )}
                </Content>
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

export default SingleSelectMenu
