/**
 * SingleSelectV2Popover Component
 *
 * Uses Radix Menu as the base (RadixMenu.Root, RadixMenu.Trigger, RadixMenu.Content)
 * Replaces custom VirtualList with TanStack Virtual for better performance
 * Uses V2 tokens and follows ButtonV2 patterns
 */

import React, { useState, useMemo, useRef, useEffect } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
    SingleSelectV2Alignment,
    SingleSelectV2Side,
    type SingleSelectV2ItemType,
    type SingleSelectV2GroupType,
} from './types'
import { FOUNDATION_THEME } from '../../tokens'
import styled from 'styled-components'
import Text from '../Text/Text'
import Block from '../Primitives/Block/Block'
import { ChevronRight } from 'lucide-react'
import { SearchInput } from '../Inputs'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { usePreventParentScroll, useScrollLock } from '../../hooks'
import { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import SelectItem, { SelectItemType } from '../Select/SelectItem'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    SingleSelectV2SkeletonProps,
} from './types'
import {
    popoverContentAnimations,
    submenuContentAnimations,
    hoverTransition,
} from './singleSelectV2.animations'
import SingleSelectV2Skeleton from './SingleSelectV2Skeleton'
import {
    hasExactMatch as checkExactMatch,
    getFilteredItemsWithCustomValue,
} from '../Select/selectUtils'

type SingleSelectV2PopoverProps = {
    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void
    trigger: React.ReactNode
    minPopoverWidth?: number
    maxPopoverWidth?: number
    maxPopoverHeight?: number
    enableSearch?: boolean
    searchPlaceholder?: string
    disabled?: boolean

    // alignment
    alignment?: SingleSelectV2Alignment
    side?: SingleSelectV2Side
    sideOffset?: number
    alignOffset?: number
    collisionBoundary?: Element | null | Array<Element | null>

    // open
    open: boolean
    onOpenChange: (open: boolean) => void

    // size
    size?: SingleSelectV2Size
    variant?: SingleSelectV2Variant

    // virtualization
    enableVirtualization?: boolean
    virtualListItemHeight?: number
    virtualListOverscan?: number

    // infinite scroll
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    loadingComponent?: React.ReactNode
    skeleton?: SingleSelectV2SkeletonProps
    allowCustomValue?: boolean
    customValueLabel?: string
    menuId?: string
}

type FlattenedItem = {
    id: string
    type: 'item' | 'label' | 'separator'
    item?: SingleSelectV2ItemType
    label?: string
    groupId?: number
}

const flattenGroups = (groups: SingleSelectV2GroupType[]): FlattenedItem[] => {
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

// Styled Radix Menu Content with animations
const Content = styled(RadixMenu.Content)`
    position: relative;
    background-color: white;
    border-radius: 8px;
    box-shadow: ${FOUNDATION_THEME.shadows.sm};
    z-index: 101;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    ${popoverContentAnimations}
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
    singleSelectTokens?: SingleSelectV2TokensType
}>`
    background-color: white;
    border-radius: 8px;
    padding: 8px 0px;
    box-shadow: ${FOUNDATION_THEME.shadows.lg};
    border: ${({ singleSelectTokens }) =>
        singleSelectTokens?.popover.border ||
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
    item: SingleSelectV2ItemType
    onSelect: (value: string) => void
    selected: string
    singleSelectTokens: SingleSelectV2TokensType
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
    item: SingleSelectV2ItemType
    onSelect: (value: string) => void
    selected: string
    singleSelectTokens?: SingleSelectV2TokensType
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
    groups: SingleSelectV2GroupType[],
    searchText: string
): SingleSelectV2GroupType[] {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group: SingleSelectV2GroupType) => {
            const filteredItems = group.items
                .map((item: SingleSelectV2ItemType) =>
                    filterMenuItem(item, lower)
                )
                .filter(Boolean) as SingleSelectV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as SingleSelectV2GroupType[]
}

function filterMenuItem(
    item: SingleSelectV2ItemType,
    lower: string
): SingleSelectV2ItemType | null {
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub: SingleSelectV2ItemType) => filterMenuItem(sub, lower))
            .filter(Boolean) as SingleSelectV2ItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

const SingleSelectV2Popover = ({
    items,
    selected,
    onSelect,
    trigger,
    minPopoverWidth,
    maxPopoverWidth,
    maxPopoverHeight = 400,
    enableSearch,
    searchPlaceholder = 'Search options...',
    disabled,
    alignment = SingleSelectV2Alignment.START,
    side = SingleSelectV2Side.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    collisionBoundary,
    open,
    onOpenChange,
    size = SingleSelectV2Size.MEDIUM,
    variant = SingleSelectV2Variant.CONTAINER,
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
}: SingleSelectV2PopoverProps) => {
    const singleSelectTokens =
        useResponsiveTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')

    const [searchText, setSearchText] = useState('')
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const virtualScrollRef = useRef<HTMLDivElement>(null)
    let itemCounter = 0

    const selectors = [
        '[data-popover="popover"]',
        '[role="listbox"]',
        '[role="menu"]',
        '[data-radix-popper-content-wrapper]',
        '[data-radix-dropdown-menu-content]',
    ]
    usePreventParentScroll(open, contentRef, selectors)
    useScrollLock(open)

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

    // TanStack Virtual integration
    const virtualizer = useVirtualizer({
        count: flattenedItems.length,
        getScrollElement: () => virtualScrollRef.current,
        estimateSize: () => virtualListItemHeight,
        overscan: virtualListOverscan,
        enabled: enableVirtualization && flattenedItems.length > 0,
    })

    // Handle infinite scroll with TanStack Virtual
    useEffect(() => {
        if (!enableVirtualization || !onEndReached || !hasMore) return

        const virtualItems = virtualizer.getVirtualItems()
        if (virtualItems.length === 0) return

        const lastItem = virtualItems[virtualItems.length - 1]
        const threshold = endReachedThreshold || 200

        if (
            lastItem &&
            lastItem.index >= flattenedItems.length - 1 &&
            virtualScrollRef.current
        ) {
            const scrollHeight = virtualScrollRef.current.scrollHeight
            const scrollTop = virtualScrollRef.current.scrollTop
            const clientHeight = virtualScrollRef.current.clientHeight

            if (scrollHeight - scrollTop - clientHeight < threshold) {
                onEndReached()
            }
        }
    }, [
        virtualizer,
        enableVirtualization,
        onEndReached,
        hasMore,
        endReachedThreshold,
        flattenedItems.length,
    ])

    const handleOpenChange = (newOpen: boolean) => {
        if (disabled) return
        if (!newOpen && enableSearch) {
            setSearchText('')
        }
        onOpenChange(newOpen)
    }

    const renderVirtualItem = (flatItem: FlattenedItem, index: number) => {
        if (flatItem.type === 'label') {
            return (
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
                    <Label style={{ margin: 0, width: '100%' }}>
                        <Text
                            fontSize={
                                singleSelectTokens.popover.item.optionsLabel
                                    .fontSize
                            }
                            color={
                                singleSelectTokens.popover.item.optionsLabel
                                    .color.default
                            }
                            fontWeight={
                                singleSelectTokens.popover.item.optionsLabel
                                    .fontWeight
                            }
                        >
                            {flatItem.label}
                        </Text>
                    </Label>
                </Block>
            )
        }

        if (flatItem.type === 'separator') {
            return (
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
                    <RadixMenu.Separator asChild>
                        <Block
                            height={
                                singleSelectTokens.popover.item.separator.height
                            }
                            backgroundColor={
                                singleSelectTokens.popover.item.separator.color
                            }
                            width="100%"
                        />
                    </RadixMenu.Separator>
                </Block>
            )
        }

        if (flatItem.type === 'item' && flatItem.item) {
            const currentIndex = itemCounter
            itemCounter++
            return (
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
                    <Block width="100%" style={{ minWidth: 0 }}>
                        <Item
                            selected={selected}
                            item={flatItem.item}
                            onSelect={onSelect}
                            singleSelectTokens={singleSelectTokens}
                            index={currentIndex}
                        />
                    </Block>
                </Block>
            )
        }

        return null
    }

    // RCA: When customTrigger is a Tooltip wrapping a Button, nested asChild props conflict
    // Solution: Detect Tooltip wrapper and restructure to: Tooltip > MenuTrigger > Button
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
                    ref={contentRef}
                    data-popover="popover"
                    align={alignment}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    side={side}
                    avoidCollisions
                    collisionBoundary={collisionBoundary}
                    style={{
                        maxHeight: maxPopoverHeight,
                        minWidth: minPopoverWidth || '250px',
                        width: 'max(var(--radix-dropdown-menu-trigger-width))',
                        maxWidth:
                            maxPopoverWidth ||
                            'var(--radix-dropdown-menu-trigger-width)',
                        border: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                    }}
                    onKeyDown={(e) => {
                        if (enableSearch && searchInputRef.current) {
                            if (
                                e.target !== searchInputRef.current &&
                                !searchInputRef.current.contains(
                                    e.target as Node
                                ) &&
                                e.key.length === 1 &&
                                !e.ctrlKey &&
                                !e.metaKey &&
                                !e.altKey
                            ) {
                                searchInputRef.current.focus()
                            }
                        }
                    }}
                >
                    {skeleton.show ? (
                        <SingleSelectV2Skeleton
                            singleSelectTokens={singleSelectTokens}
                            skeleton={skeleton}
                        />
                    ) : (
                        <>
                            {enableSearch && items.length > 0 && (
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
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'ArrowDown' ||
                                                e.key === 'ArrowUp'
                                            ) {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                const menuContent =
                                                    e.currentTarget.closest(
                                                        '[data-popover="popover"]'
                                                    )
                                                if (menuContent) {
                                                    const firstMenuItem =
                                                        menuContent.querySelector<HTMLElement>(
                                                            '[role="menuitem"]:not([data-disabled])'
                                                        )
                                                    if (firstMenuItem) {
                                                        firstMenuItem.focus()
                                                    }
                                                }
                                            }
                                            if (e.key === 'Tab') {
                                                return
                                            }
                                        }}
                                        autoFocus
                                        aria-label={
                                            searchPlaceholder ||
                                            'Search options'
                                        }
                                    />
                                </Block>
                            )}
                            {items.length === 0 ||
                            (filteredItems.length === 0 &&
                                searchText.length > 0) ? (
                                <Block
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    padding={
                                        singleSelectTokens.popover.item.padding
                                    }
                                >
                                    <Text
                                        variant="body.md"
                                        color={
                                            singleSelectTokens.popover.item
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
                                    ref={virtualScrollRef}
                                    data-element="virtual-list"
                                    padding={FOUNDATION_THEME.unit[6]}
                                    style={{
                                        height: maxPopoverHeight - 60,
                                        overflow: 'auto',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: `${virtualizer.getTotalSize()}px`,
                                            width: '100%',
                                            position: 'relative',
                                        }}
                                    >
                                        {virtualizer
                                            .getVirtualItems()
                                            .map((virtualItem) => (
                                                <div
                                                    key={virtualItem.key}
                                                    data-index={
                                                        virtualItem.index
                                                    }
                                                    ref={
                                                        virtualizer.measureElement
                                                    }
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        transform: `translateY(${virtualItem.start}px)`,
                                                    }}
                                                >
                                                    {renderVirtualItem(
                                                        flattenedItems[
                                                            virtualItem.index
                                                        ],
                                                        virtualItem.index
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    {loadingComponent && hasMore && (
                                        <Block
                                            padding={FOUNDATION_THEME.unit[4]}
                                        >
                                            {loadingComponent}
                                        </Block>
                                    )}
                                </Block>
                            ) : (
                                <Block
                                    data-element="popover-content"
                                    paddingX={
                                        singleSelectTokens.popover.padding[
                                            size
                                        ][variant].x
                                    }
                                    paddingY={
                                        singleSelectTokens.popover.padding[
                                            size
                                        ][variant].y
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
                                                <Label data-element="popover-group-label">
                                                    <Text
                                                        fontSize={
                                                            singleSelectTokens
                                                                .popover.item
                                                                .optionsLabel
                                                                .fontSize
                                                        }
                                                        color={
                                                            singleSelectTokens
                                                                .popover.item
                                                                .optionsLabel
                                                                .color.default
                                                        }
                                                        fontWeight={
                                                            singleSelectTokens
                                                                .popover.item
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
                                                                    .popover
                                                                    .item
                                                                    .separator
                                                                    .height
                                                            }
                                                            backgroundColor={
                                                                singleSelectTokens
                                                                    .popover
                                                                    .item
                                                                    .separator
                                                                    .color
                                                            }
                                                            margin={
                                                                singleSelectTokens
                                                                    .popover
                                                                    .item
                                                                    .separator
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

export default SingleSelectV2Popover
