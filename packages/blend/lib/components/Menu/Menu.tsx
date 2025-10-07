import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled, { type CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import {
    type MenuV2Props,
    MenuAlignment,
    MenuSide,
    type MenuItemV2Type,
} from './types'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import { filterMenuGroups } from './utils'
import MenuItem from './MenuItem'
import Block from '../Primitives/Block/Block'
import SearchInput from '../Inputs/SearchInput/SearchInput'
import { Search } from 'lucide-react'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { type MenuTokensType } from './menu.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { VirtualList, type VirtualListItem } from '../VirtualList'

export const contentBaseStyle: CSSObject = {
    backgroundColor: 'white',
    boxShadow: FOUNDATION_THEME.shadows.sm,
    zIndex: 99,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    scrollbarColor: 'transparent transparent',
    paddingBottom: 6,
    borderRadius: 8,
}

const Content = styled(RadixMenu.Content)(() => ({
    ...contentBaseStyle,
}))

const Menu = ({
    trigger,
    items = [],
    asModal = false,
    alignment = MenuAlignment.CENTER,
    side = MenuSide.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    collisonBoundaryRef,
    maxHeight,
    enableSearch = false,
    searchPlaceholder = 'Search',
    minWidth,
    maxWidth,
    open,
    onOpenChange,
    enableVirtualScrolling = false,
    virtualItemHeight = 40,
    virtualOverscan = 5,
    virtualScrollThreshold = 50,
}: MenuV2Props) => {
    const [searchText, setSearchText] = useState<string>('')
    const searchInputRef = useRef<HTMLInputElement>(null)
    const filteredItems = filterMenuGroups(items, searchText)
    const menuTokens = useResponsiveTokens<MenuTokensType>('MENU')

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && enableSearch) {
            setSearchText('')
        }
        onOpenChange?.(newOpen)
    }

    const virtualListItems = useMemo(() => {
        const virtualItems: VirtualListItem[] = []

        filteredItems.forEach((group, groupId) => {
            if (group.label) {
                virtualItems.push({
                    id: `label-${groupId}`,
                    height: 28,
                    data: { type: 'label', label: group.label },
                })
            }

            group.items.forEach((item, itemIndex) => {
                virtualItems.push({
                    id: `item-${groupId}-${itemIndex}`,
                    height:
                        typeof virtualItemHeight === 'function'
                            ? virtualItemHeight(item, itemIndex)
                            : virtualItemHeight,
                    data: {
                        type: 'item',
                        originalItem: item,
                        groupId,
                        itemIndex,
                    },
                })
            })

            if (groupId !== filteredItems.length - 1 && group.showSeparator) {
                virtualItems.push({
                    id: `separator-${groupId}`,
                    height: 20,
                    data: { type: 'separator' },
                })
            }
        })

        return virtualItems
    }, [filteredItems, virtualItemHeight])

    const totalItemCount = useMemo(() => {
        return filteredItems.reduce(
            (count, group) => count + group.items.length,
            0
        )
    }, [filteredItems])

    const shouldUseVirtualScrolling =
        enableVirtualScrolling && totalItemCount >= virtualScrollThreshold

    const renderVirtualItem = useCallback(
        ({
            item,
        }: {
            item: VirtualListItem
            index: number
            style: React.CSSProperties
        }) => {
            const data = item.data || {}
            const { type, label, originalItem, groupId, itemIndex } = data as {
                type?: string
                label?: string
                originalItem?: unknown
                groupId?: number
                itemIndex?: number
            }

            if (type === 'label') {
                return (
                    <RadixMenu.Label asChild>
                        <PrimitiveText
                            fontSize={12}
                            padding="6px 8px"
                            userSelect="none"
                            margin="0px 6px"
                            textTransform="uppercase"
                            color={FOUNDATION_THEME.colors.gray[400]}
                        >
                            {label}
                        </PrimitiveText>
                    </RadixMenu.Label>
                )
            }

            if (type === 'separator') {
                return (
                    <RadixMenu.Separator asChild>
                        <Block
                            height={menuTokens.seperator.height}
                            backgroundColor={menuTokens.seperator.color}
                            margin={menuTokens.seperator.margin}
                        />
                    </RadixMenu.Separator>
                )
            }

            if (type === 'item' && originalItem) {
                return (
                    <MenuItem
                        key={`${groupId}-${itemIndex}`}
                        item={originalItem as MenuItemV2Type}
                        idx={itemIndex || 0}
                        maxHeight={maxHeight}
                    />
                )
            }

            return null
        },
        [menuTokens, maxHeight]
    )

    return (
        <RadixMenu.Root
            modal={asModal}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
            <Content
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                side={side}
                align={alignment}
                collisionBoundary={collisonBoundaryRef}
                style={{
                    maxHeight: maxHeight
                        ? `${maxHeight}px`
                        : 'var(--radix-popper-available-height)',
                    minWidth: minWidth ? `${minWidth}px` : '200px',
                    maxWidth: maxWidth ? `${maxWidth}px` : '280px',
                    paddingTop: enableSearch ? 0 : menuTokens.paddingTop,
                    border: menuTokens.border,
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
                        width="100%"
                        position="sticky"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={100}
                        backgroundColor="white"
                        padding="0px"
                        // paddingBottom="0px"
                    >
                        <SearchInput
                            ref={searchInputRef}
                            leftSlot={
                                <Search
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                    size={16}
                                />
                            }
                            placeholder={searchPlaceholder}
                            value={searchText}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                    </Block>
                )}
                {shouldUseVirtualScrolling ? (
                    <VirtualList
                        items={virtualListItems}
                        containerHeight={maxHeight || 400}
                        itemHeight={
                            typeof virtualItemHeight === 'number'
                                ? virtualItemHeight
                                : undefined
                        }
                        overscan={virtualOverscan}
                        renderItem={renderVirtualItem}
                        getItemHeight={(item) =>
                            item.height ||
                            (typeof virtualItemHeight === 'number'
                                ? virtualItemHeight
                                : 40)
                        }
                    />
                ) : (
                    filteredItems &&
                    filteredItems.map((group, groupId) => (
                        <React.Fragment key={groupId}>
                            {group.label && (
                                <RadixMenu.Label asChild>
                                    <PrimitiveText
                                        fontSize={12}
                                        padding="6px 8px"
                                        userSelect="none"
                                        margin="0px 6px"
                                        textTransform="uppercase"
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                    >
                                        {group.label}
                                    </PrimitiveText>
                                </RadixMenu.Label>
                            )}
                            {group.items.map((item, itemIndex) => (
                                <MenuItem
                                    key={`${groupId}-${itemIndex}`}
                                    item={item}
                                    idx={itemIndex}
                                    maxHeight={maxHeight}
                                />
                            ))}
                            {groupId !== filteredItems.length - 1 &&
                                group.showSeparator && (
                                    <RadixMenu.Separator asChild>
                                        <Block
                                            height={menuTokens.seperator.height}
                                            backgroundColor={
                                                menuTokens.seperator.color
                                            }
                                            margin={menuTokens.seperator.margin}
                                        ></Block>
                                    </RadixMenu.Separator>
                                )}
                        </React.Fragment>
                    ))
                )}
            </Content>
        </RadixMenu.Root>
    )
}

Menu.displayName = 'Menu'

export default Menu
