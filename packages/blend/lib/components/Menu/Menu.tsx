import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled, { type CSSObject } from 'styled-components'
import { FOUNDATION_THEME } from '../../tokens'
import {
    type MenuProps,
    MenuAlignment,
    MenuSide,
    type MenuItemType,
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
import { menuContentAnimations } from './menu.animations'
import { Skeleton, SkeletonVariant } from '../Skeleton'
import { useDropdownInteractionLock } from '../../hooks'
import useScrollLock from '../../hooks/useScrollLock'

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
    border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
}

const Content = styled(RadixMenu.Content)`
    background-color: white;
    box-shadow: ${FOUNDATION_THEME.shadows.sm};
    z-index: 99;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
    padding-bottom: 6px;
    border-radius: 8px;
    border: 1px solid ${FOUNDATION_THEME.colors.gray[200]};

    ${menuContentAnimations}
`

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
    virtualScrollThreshold = 20,
    skeleton = {
        count: 3,
        show: false,
        variant: 'pulse',
    },
}: MenuProps) => {
    const [searchText, setSearchText] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const justOpenedRef = useRef(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const filteredItems = filterMenuGroups(items, searchText)
    const menuTokens = useResponsiveTokens<MenuTokensType>('MENU')

    const menuIsOpen = open ?? isOpen
    useDropdownInteractionLock(menuIsOpen)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (newOpen) {
            justOpenedRef.current = true
            timeoutRef.current = setTimeout(() => {
                justOpenedRef.current = false
                timeoutRef.current = null
            }, 100)
        } else {
            justOpenedRef.current = false
            if (enableSearch) {
                setSearchText('')
            }
        }

        onOpenChange?.(newOpen)
    }

    const handleOutsideInteraction = useCallback((e: Event) => {
        if (justOpenedRef.current) {
            e.preventDefault()
            return
        }

        const target = e.target as HTMLElement
        if (target?.closest('[data-radix-dropdown-menu-trigger]')) {
            e.preventDefault()
        }
    }, [])

    const virtualListItems = useMemo(() => {
        const virtualItems: VirtualListItem[] = []

        filteredItems.forEach((group, groupId) => {
            if (group.label) {
                virtualItems.push({
                    id: `label-${groupId}`,
                    data: { type: 'label', label: group.label },
                })
            }

            group.items.forEach((item, itemIndex) => {
                virtualItems.push({
                    id: `item-${groupId}-${itemIndex}`,
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
                    data: { type: 'separator' },
                })
            }
        })

        return virtualItems
    }, [filteredItems])

    const totalItemCount = useMemo(() => {
        return filteredItems.reduce(
            (count, group) => count + group.items.length,
            0
        )
    }, [filteredItems])

    const shouldUseVirtualScrolling =
        enableVirtualScrolling && totalItemCount >= virtualScrollThreshold

    useScrollLock(menuIsOpen)

    const renderVirtualItem = useCallback(
        ({ item }: { item: VirtualListItem; index: number }) => {
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
                            aria-label={label}
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
                            as="div"
                            role="separator"
                            height={menuTokens.item.seperator.height}
                            backgroundColor={menuTokens.item.seperator.color}
                            margin={menuTokens.item.seperator.margin.x}
                            aria-hidden="true"
                        />
                    </RadixMenu.Separator>
                )
            }

            if (type === 'item' && originalItem) {
                return (
                    <MenuItem
                        key={`${groupId}-${itemIndex}`}
                        item={originalItem as MenuItemType}
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
            data-element="menu"
            modal={asModal}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
            <Content
                data-menu="menu"
                data-dropdown="dropdown"
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                side={side}
                align={alignment}
                collisionBoundary={collisonBoundaryRef}
                onInteractOutside={handleOutsideInteraction}
                onPointerDownOutside={handleOutsideInteraction}
                style={{
                    maxHeight: maxHeight
                        ? `${maxHeight}px`
                        : 'var(--radix-popper-available-height)',
                    minWidth: minWidth ? `${minWidth}px` : '200px',
                    maxWidth: maxWidth ? `${maxWidth}px` : '280px',
                    paddingTop: enableSearch ? 0 : menuTokens.padding.y,

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
                {skeleton.show ? (
                    <Block
                        display="flex"
                        paddingX={menuTokens.item.padding.x}
                        paddingY={menuTokens.item.padding.y}
                        marginY={menuTokens.item.margin.y}
                        marginX={menuTokens.item.margin.x}
                        borderRadius={menuTokens.item.borderRadius}
                        flexDirection="column"
                        gap={menuTokens.item.gap}
                    >
                        {Array.from({ length: skeleton.count || 3 }).map(
                            (_, index) => (
                                <Skeleton
                                    key={index}
                                    width="100%"
                                    height="33px"
                                    variant={
                                        (skeleton.variant as SkeletonVariant) ||
                                        'pulse'
                                    }
                                />
                            )
                        )}
                    </Block>
                ) : (
                    <>
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
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    }
                                    placeholder={searchPlaceholder}
                                    value={searchText}
                                    onChange={handleSearchChange}
                                    autoFocus
                                    aria-label={`Search menu items${searchPlaceholder ? `: ${searchPlaceholder}` : ''}`}
                                />
                            </Block>
                        )}

                        {shouldUseVirtualScrolling ? (
                            <Block
                                padding={FOUNDATION_THEME.unit[6]}
                                style={{
                                    paddingTop: enableSearch
                                        ? 0
                                        : FOUNDATION_THEME.unit[6],
                                }}
                            >
                                <VirtualList
                                    items={virtualListItems}
                                    height={
                                        (maxHeight || 400) -
                                        (enableSearch ? 80 : 20)
                                    }
                                    itemHeight={
                                        typeof virtualItemHeight === 'number'
                                            ? virtualItemHeight
                                            : 40
                                    }
                                    overscan={virtualOverscan}
                                    renderItem={renderVirtualItem}
                                />
                            </Block>
                        ) : (
                            <Block
                                style={{
                                    paddingTop: enableSearch
                                        ? FOUNDATION_THEME.unit[6]
                                        : 0,
                                }}
                            >
                                {filteredItems &&
                                    filteredItems.map((group, groupId) => (
                                        <React.Fragment key={groupId}>
                                            {group.label && (
                                                <RadixMenu.Label asChild>
                                                    <PrimitiveText
                                                        data-element="menu-group-label"
                                                        data-id={
                                                            group.label ||
                                                            'menu-group-label'
                                                        }
                                                        fontSize={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .fontSize
                                                        }
                                                        paddingY={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .padding.y
                                                        }
                                                        paddingX={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .padding.x
                                                        }
                                                        userSelect="none"
                                                        marginY={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .margin.y
                                                        }
                                                        marginX={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .margin.x
                                                        }
                                                        textTransform="uppercase"
                                                        color={
                                                            menuTokens.item
                                                                .optionsLabel
                                                                .color
                                                        }
                                                        aria-label={group.label}
                                                    >
                                                        {group.label}
                                                    </PrimitiveText>
                                                </RadixMenu.Label>
                                            )}
                                            {group.items.map(
                                                (item, itemIndex) => (
                                                    <MenuItem
                                                        key={`${groupId}-${itemIndex}`}
                                                        item={item}
                                                        idx={itemIndex}
                                                        maxHeight={maxHeight}
                                                    />
                                                )
                                            )}
                                            {groupId !==
                                                filteredItems.length - 1 &&
                                                group.showSeparator && (
                                                    <RadixMenu.Separator
                                                        asChild
                                                    >
                                                        <Block
                                                            as="div"
                                                            role="separator"
                                                            height={
                                                                menuTokens.item
                                                                    .seperator
                                                                    .height
                                                            }
                                                            backgroundColor={
                                                                menuTokens.item
                                                                    .seperator
                                                                    .color
                                                            }
                                                            marginY={
                                                                menuTokens.item
                                                                    .seperator
                                                                    .margin.y
                                                            }
                                                            marginX={
                                                                menuTokens.item
                                                                    .seperator
                                                                    .margin.x
                                                            }
                                                            aria-hidden="true"
                                                        ></Block>
                                                    </RadixMenu.Separator>
                                                )}
                                        </React.Fragment>
                                    ))}
                            </Block>
                        )}
                    </>
                )}
            </Content>
        </RadixMenu.Root>
    )
}

Menu.displayName = 'Menu'

export default Menu
