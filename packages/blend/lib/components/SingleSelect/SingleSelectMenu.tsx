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
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'

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

    // virtualization
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number
    itemsToRender?: number

    // infinite scroll
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: React.ReactNode
}

type FlattenedItem = VirtualListItem & {
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

const Content = styled(RadixMenu.Content)(() => ({
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 8,
    // width: "var(--radix-dropdown-menu-trigger-width)",
    // maxWidth: "var(--radix-dropdown-menu-trigger-width)",
    boxShadow: FOUNDATION_THEME.shadows.sm,
    zIndex: 49,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    scrollbarColor: 'transparent transparent',
}))

const StyledSubMenu = styled(RadixMenu.Sub)(() => ({
    padding: '8px 6px',
    margin: '0px 8px',
}))

const SubTrigger = styled(RadixMenu.SubTrigger)(() => ({
    alignItems: 'center',
    padding: '8px 6px',
    margin: '0px 8px',
    borderRadius: 4,
    // hover effects
    '&:hover': {
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
    },

    '&[data-disabled]': {
        opacity: 0.5,
        cursor: 'not-allowed',
    },

    '&[data-highlighted]': {
        border: 'none',
        outline: 'none',
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
    },
}))

const SubContent = styled(RadixMenu.SubContent)<{
    singleSelectTokens?: SingleSelectTokensType
}>(({ singleSelectTokens }) => ({
    backgroundColor: 'white',
    borderRadius: 8,
    padding: '8px 0px',
    boxShadow: FOUNDATION_THEME.shadows.lg,
    border:
        singleSelectTokens?.dropdown.border ||
        `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
    zIndex: 49,
}))

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
}: {
    item: SelectMenuItemType
    onSelect: (value: string) => void
    selected: string
    singleSelectTokens?: SingleSelectTokensType
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
            // TODO: Should we include the whole group if the label matches?
            // if (group.label && group.label.toLowerCase().includes(lower)) {
            //   return group;
            // }
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
    // Check if this item matches
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    // If it has a submenu, filter recursively
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
    enableVirtualization = false,
    virtualListItemHeight = 48,
    virtualListOverscan = 5,
    itemsToRender,
    onEndReached,
    endReachedThreshold,
    hasMore,
    loadingComponent,
}: SingleSelectMenuProps) => {
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const filteredItems = filterMenuGroups(items, searchText)

    const flattenedItems = useMemo(
        () => flattenGroups(filteredItems),
        [filteredItems]
    )

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return
        if (!newOpen && enableSearch) {
            setSearchText('')
        }
        onOpenChange(newOpen)
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
            <Content
                align={alignment}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                side={side}
                style={{
                    maxHeight: maxMenuHeight,
                    minWidth: minMenuWidth,
                    width: 'max(var(--radix-dropdown-menu-trigger-width))',
                    maxWidth: maxMenuWidth,
                    border: singleSelectTokens.dropdown.border,
                }}
                onFocusCapture={(e) => {
                    if (enableSearch && searchInputRef.current) {
                        if (
                            e.target !== searchInputRef.current &&
                            !searchInputRef.current.contains(e.target as Node)
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
                {enableSearch && (
                    <Block
                        position="sticky"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={50}
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    >
                        <Block marginBottom={FOUNDATION_THEME.unit[6]}>
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
                            />
                        </Block>
                    </Block>
                )}
                {items.length === 0 ? (
                    <Block
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding={singleSelectTokens.dropdown.item.padding}
                    >
                        <Text
                            variant="body.md"
                            color={
                                singleSelectTokens.dropdown.item.label.color
                                    .disabled
                            }
                            textAlign="center"
                        >
                            No items available
                        </Text>
                    </Block>
                ) : filteredItems &&
                  filteredItems.length === 0 &&
                  searchText.length > 0 ? (
                    <Block
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding={`${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[8]}`}
                    >
                        <Text
                            variant="body.md"
                            color={
                                singleSelectTokens.dropdown.item.label.color
                                    .disabled
                            }
                            textAlign="center"
                        >
                            No results found
                        </Text>
                    </Block>
                ) : enableVirtualization && flattenedItems.length > 0 ? (
                    <Block
                        padding={singleSelectTokens.dropdown.paddingTop}
                        style={{
                            paddingTop: enableSearch
                                ? 0
                                : singleSelectTokens.dropdown.paddingTop,
                        }}
                    >
                        <VirtualList
                            items={flattenedItems}
                            itemHeight={virtualListItemHeight}
                            containerHeight={Math.min(
                                maxMenuHeight -
                                    (enableSearch
                                        ? parseInt(
                                              String(
                                                  singleSelectTokens.dropdown
                                                      .paddingTop || '16'
                                              )
                                          ) * 4
                                        : parseInt(
                                              String(
                                                  singleSelectTokens.dropdown
                                                      .paddingBottom || '16'
                                              )
                                          ) * 2),
                                flattenedItems.length * virtualListItemHeight
                            )}
                            overscan={virtualListOverscan}
                            itemsToRender={itemsToRender}
                            onEndReached={onEndReached}
                            endReachedThreshold={endReachedThreshold}
                            hasMore={hasMore}
                            loadingComponent={loadingComponent}
                            renderItem={({ item: flatItem }) => {
                                const typed = flatItem as FlattenedItem

                                if (typed.type === 'label') {
                                    return (
                                        <Label>
                                            <Text
                                                variant="body.sm"
                                                color={
                                                    singleSelectTokens.dropdown
                                                        .item.label.color
                                                        .disabled
                                                }
                                            >
                                                {typed.label}
                                            </Text>
                                        </Label>
                                    )
                                }

                                if (typed.type === 'separator') {
                                    return (
                                        <RadixMenu.Separator asChild>
                                            <Block
                                                height={
                                                    singleSelectTokens.dropdown
                                                        .seperator.height
                                                }
                                                backgroundColor={
                                                    singleSelectTokens.dropdown
                                                        .seperator.color
                                                }
                                                margin={
                                                    singleSelectTokens.dropdown
                                                        .seperator.margin
                                                }
                                            />
                                        </RadixMenu.Separator>
                                    )
                                }

                                if (typed.type === 'item' && typed.item) {
                                    return (
                                        <Item
                                            selected={selected}
                                            item={typed.item}
                                            onSelect={onSelect}
                                            singleSelectTokens={
                                                singleSelectTokens
                                            }
                                        />
                                    )
                                }

                                return null
                            }}
                        />
                    </Block>
                ) : (
                    <Block
                        padding={FOUNDATION_THEME.unit[6]}
                        style={{
                            paddingTop: enableSearch
                                ? 0
                                : FOUNDATION_THEME.unit[6],
                        }}
                    >
                        {filteredItems &&
                            filteredItems.map((group, groupId) => (
                                <React.Fragment key={groupId}>
                                    {group.groupLabel && (
                                        <Label>
                                            <Text
                                                variant="body.sm"
                                                color={
                                                    singleSelectTokens.dropdown
                                                        .item.label.color
                                                        .disabled
                                                }
                                            >
                                                {group.groupLabel}
                                            </Text>
                                        </Label>
                                    )}
                                    {group.items.map((item, itemIndex) => (
                                        <Item
                                            key={`${groupId}-${itemIndex}`}
                                            selected={selected}
                                            item={item}
                                            onSelect={onSelect}
                                            singleSelectTokens={
                                                singleSelectTokens
                                            }
                                        />
                                    ))}
                                    {groupId !== items.length - 1 &&
                                        group.showSeparator && (
                                            <RadixMenu.Separator asChild>
                                                <Block
                                                    height={
                                                        singleSelectTokens
                                                            .dropdown.seperator
                                                            .height
                                                    }
                                                    backgroundColor={
                                                        singleSelectTokens
                                                            .dropdown.seperator
                                                            .color
                                                    }
                                                    margin={
                                                        singleSelectTokens
                                                            .dropdown.seperator
                                                            .margin
                                                    }
                                                />
                                            </RadixMenu.Separator>
                                        )}
                                </React.Fragment>
                            ))}
                    </Block>
                )}
            </Content>
        </RadixMenu.Root>
    )
}

export default SingleSelectMenu
