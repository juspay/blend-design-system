import type { FocusEvent, KeyboardEvent } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import { useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import SearchInput from '../Inputs/SearchInput/SearchInput'
import MenuV2Item from './MenuV2Item'
import MenuV2SubMenu from './MenuV2SubMenu'
import type { MenuV2GroupType, MenuV2ItemType } from './menuV2.types'
import type { MenuV2VirtualScrollingConfig } from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'
import { menuV2ContentAnimations } from './menuV2.animations'
import { flattenMenuV2Groups, type MenuV2FlatRow } from './menuV2.utils'
import { getBaseVirtualViewportHeight } from '../common/virtualViewport'
import { addPxToValue } from '../../global-utils/GlobalUtils'

type ContentStyledProps = { $zIndex?: number | string }

const Content = styled(RadixMenu.Content)<ContentStyledProps>`
    position: relative;
    z-index: ${(p) => p.$zIndex ?? 101};
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;

    &[data-state='closed'] {
        pointer-events: none;
    }

    ${menuV2ContentAnimations}
`

const DEFAULT_VIRTUAL_ITEM_HEIGHT = 40
const DEFAULT_VIRTUAL_OVERSCAN = 2
const DEFAULT_VIRTUAL_THRESHOLD = 30

function renderFlatRow(
    row: MenuV2FlatRow,
    itemTokens: MenuV2TokensType['item'],
    maxHeight?: number
) {
    if (row.type === 'label') {
        return (
            <RadixMenu.Label asChild>
                <PrimitiveText
                    data-element="menu-group-label"
                    fontSize={itemTokens.optionsLabel.fontSize}
                    fontWeight={itemTokens.optionsLabel.fontWeight}
                    color={itemTokens.optionsLabel.color}
                    lineHeight={addPxToValue(
                        itemTokens.optionsLabel.lineHeight
                    )}
                    padding={`${itemTokens.optionsLabel.paddingTop} ${itemTokens.optionsLabel.paddingRight} ${itemTokens.optionsLabel.paddingBottom} ${itemTokens.optionsLabel.paddingLeft}`}
                    userSelect="none"
                    textTransform="uppercase"
                    margin={`${itemTokens.optionsLabel.marginTop} ${itemTokens.optionsLabel.marginRight} ${itemTokens.optionsLabel.marginBottom} ${itemTokens.optionsLabel.marginLeft}`}
                >
                    {row.label}
                </PrimitiveText>
            </RadixMenu.Label>
        )
    }
    if (row.type === 'separator') {
        return (
            <RadixMenu.Separator asChild>
                <Block
                    as="div"
                    role="separator"
                    height={itemTokens.separator.height}
                    backgroundColor={itemTokens.separator.color}
                    marginTop={itemTokens.separator.marginTop}
                    marginRight={itemTokens.separator.marginRight}
                    marginBottom={itemTokens.separator.marginBottom}
                    marginLeft={itemTokens.separator.marginLeft}
                    aria-hidden="true"
                />
            </RadixMenu.Separator>
        )
    }
    const { item, itemIndex } = row
    return item.subMenu && item.subMenu.length > 0 ? (
        <MenuV2SubMenu
            key={row.id}
            item={item}
            index={itemIndex}
            maxHeight={maxHeight}
        />
    ) : (
        <MenuV2Item
            key={row.id}
            item={item}
            index={itemIndex}
            itemTokens={itemTokens}
        />
    )
}

export type MenuV2ContentProps = {
    filteredItems: MenuV2GroupType[]
    menuTokens: MenuV2TokensType
    enableSearch: boolean
    searchPlaceholder: string
    searchText: string
    onSearchTextChange: (value: string) => void
    maxHeight?: number
    minHeight?: number
    minWidth?: number
    maxWidth?: number
    enableVirtualScrolling?: boolean
    virtualScrolling?: MenuV2VirtualScrollingConfig
    alignment?: 'start' | 'center' | 'end'
    side?: 'top' | 'right' | 'bottom' | 'left'
    sideOffset?: number
    alignOffset?: number
    collisionBoundaryRef?: HTMLElement | null | (HTMLElement | null)[]
    onInteractOutside?: (e: unknown) => void
    onPointerDownOutside?: (e: unknown) => void
    onFocusCapture?: (e: FocusEvent<HTMLDivElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
}

const MenuV2Content = ({
    filteredItems,
    menuTokens,
    enableSearch,
    searchPlaceholder,
    searchText,
    onSearchTextChange,
    maxHeight,
    minHeight,
    minWidth: minWidthProp,
    maxWidth: maxWidthProp,
    enableVirtualScrolling = false,
    virtualScrolling,
    alignment = 'center',
    side = 'bottom',
    sideOffset = 8,
    alignOffset = 0,
    collisionBoundaryRef,
    onInteractOutside,
    onPointerDownOutside,
    onKeyDown,
}: MenuV2ContentProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const virtualScrollRef = useRef<HTMLDivElement>(null)
    const content = menuTokens.content
    const itemTokens = menuTokens.item

    const minWidth =
        minWidthProp ??
        (typeof content.minWidth === 'number' ? content.minWidth : 200)
    const maxWidth =
        maxWidthProp ??
        (typeof content.maxWidth === 'number' ? content.maxWidth : 280)

    const flatRows = useMemo(
        () => flattenMenuV2Groups(filteredItems),
        [filteredItems]
    )
    const itemHeight =
        virtualScrolling?.itemHeight ?? DEFAULT_VIRTUAL_ITEM_HEIGHT
    const overscan = virtualScrolling?.overscan ?? DEFAULT_VIRTUAL_OVERSCAN
    const threshold = virtualScrolling?.threshold ?? DEFAULT_VIRTUAL_THRESHOLD
    const useVirtual = enableVirtualScrolling && flatRows.length >= threshold

    const viewportHeight = getBaseVirtualViewportHeight(maxHeight)
    const virtualizer = useVirtualizer({
        count: flatRows.length,
        getScrollElement: () => virtualScrollRef.current,
        getItemKey: (index) => flatRows[index]?.id ?? index,
        estimateSize: (index) => {
            const row = flatRows[index]
            if (row?.type === 'label') return 28
            if (row?.type === 'separator') return 8
            return itemHeight
        },
        overscan,
        enabled: useVirtual,
        initialRect: { width: 0, height: viewportHeight },
    })

    return (
        <Content
            data-menu="menu"
            data-dropdown="dropdown"
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            side={side}
            align={alignment}
            collisionBoundary={collisionBoundaryRef ?? undefined}
            onInteractOutside={onInteractOutside}
            onPointerDownOutside={onPointerDownOutside}
            onKeyDown={onKeyDown}
            onFocusCapture={(e) => {
                if (enableSearch && searchInputRef.current) {
                    if (e.target === e.currentTarget) {
                        searchInputRef.current.focus()
                    }
                }
            }}
            onCloseAutoFocus={(e) => e.preventDefault()}
            $zIndex={content.zIndex}
            style={{
                maxHeight: maxHeight
                    ? `${maxHeight}px`
                    : 'var(--radix-popper-available-height)',
                minHeight: minHeight ? `${minHeight}px` : undefined,
                minWidth: `${minWidth}px`,
                maxWidth: `${maxWidth}px`,
                paddingTop: enableSearch ? 0 : content.paddingTop,
                paddingRight: content.paddingRight,
                paddingBottom: content.paddingBottom,
                paddingLeft: content.paddingLeft,
                backgroundColor: content.backgroundColor,
                border: content.border,
                borderRadius: content.borderRadius,
                boxShadow: content.boxShadow,
            }}
        >
            {enableSearch && (
                <Block
                    width="100%"
                    position="sticky"
                    top={0}
                    left={0}
                    right={0}
                    zIndex={content.zIndex}
                    backgroundColor={content.backgroundColor}
                    padding="0"
                >
                    <SearchInput
                        ref={searchInputRef}
                        leftSlot={
                            <Search
                                size={16}
                                color="currentColor"
                                aria-hidden
                            />
                        }
                        placeholder={searchPlaceholder}
                        value={searchText}
                        onChange={(e) => onSearchTextChange(e.target.value)}
                        onKeyDown={(e) => {
                            e.stopPropagation()
                        }}
                        aria-label={
                            searchPlaceholder
                                ? `Search menu items: ${searchPlaceholder}`
                                : 'Search menu items'
                        }
                    />
                </Block>
            )}
            {useVirtual ? (
                <Block
                    ref={virtualScrollRef}
                    style={{
                        paddingTop: enableSearch ? 0 : content.paddingTop,
                        maxHeight: maxHeight
                            ? `${maxHeight}px`
                            : 'var(--radix-popper-available-height)',
                        minHeight: minHeight ? `${minHeight}px` : undefined,
                        overflow: 'auto',
                    }}
                >
                    <Block
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        <RadixMenu.Group>
                            {virtualizer.getVirtualItems().map((virtualRow) => {
                                const row = flatRows[virtualRow.index] as
                                    | MenuV2FlatRow
                                    | undefined
                                if (!row) return null
                                return (
                                    <Block
                                        key={virtualRow.key}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        {renderFlatRow(
                                            row,
                                            itemTokens,
                                            maxHeight
                                        )}
                                    </Block>
                                )
                            })}
                        </RadixMenu.Group>
                    </Block>
                </Block>
            ) : (
                <Block
                    style={{
                        paddingTop: enableSearch ? 0 : content.paddingTop,
                        minHeight: minHeight ? `${minHeight}px` : undefined,
                    }}
                >
                    {filteredItems.map((group, groupId) => (
                        <RadixMenu.Group key={group.id ?? `group-${groupId}`}>
                            {group.label && (
                                <RadixMenu.Label asChild>
                                    <PrimitiveText
                                        data-element="menu-group-label"
                                        data-id={
                                            group.label
                                                ? `menu-group-${groupId}`
                                                : 'menu-group-label'
                                        }
                                        fontSize={
                                            itemTokens.optionsLabel.fontSize
                                        }
                                        fontWeight={
                                            itemTokens.optionsLabel.fontWeight
                                        }
                                        color={itemTokens.optionsLabel.color}
                                        style={{
                                            userSelect: 'none',
                                            textTransform: 'uppercase',
                                            paddingTop:
                                                itemTokens.optionsLabel
                                                    .paddingTop,
                                            paddingRight:
                                                itemTokens.optionsLabel
                                                    .paddingRight,
                                            paddingBottom:
                                                itemTokens.optionsLabel
                                                    .paddingBottom,
                                            paddingLeft:
                                                itemTokens.optionsLabel
                                                    .paddingLeft,
                                            marginTop:
                                                itemTokens.optionsLabel
                                                    .marginTop,
                                            marginRight:
                                                itemTokens.optionsLabel
                                                    .marginRight,
                                            marginBottom:
                                                itemTokens.optionsLabel
                                                    .marginBottom,
                                            marginLeft:
                                                itemTokens.optionsLabel
                                                    .marginLeft,
                                        }}
                                    >
                                        {group.label}
                                    </PrimitiveText>
                                </RadixMenu.Label>
                            )}
                            {group.items.map(
                                (item: MenuV2ItemType, itemIndex: number) =>
                                    item.subMenu && item.subMenu.length > 0 ? (
                                        <MenuV2SubMenu
                                            key={
                                                item.id ??
                                                `group-${groupId}-item-${itemIndex}`
                                            }
                                            item={item}
                                            index={itemIndex}
                                            maxHeight={maxHeight}
                                        />
                                    ) : (
                                        <MenuV2Item
                                            key={
                                                item.id ??
                                                `group-${groupId}-item-${itemIndex}`
                                            }
                                            item={item}
                                            index={itemIndex}
                                            itemTokens={itemTokens}
                                        />
                                    )
                            )}
                            {groupId !== filteredItems.length - 1 &&
                                group.showSeparator && (
                                    <RadixMenu.Separator asChild>
                                        <Block
                                            as="div"
                                            role="separator"
                                            height={itemTokens.separator.height}
                                            backgroundColor={
                                                itemTokens.separator.color
                                            }
                                            marginTop={
                                                itemTokens.separator.marginTop
                                            }
                                            marginRight={
                                                itemTokens.separator.marginRight
                                            }
                                            marginBottom={
                                                itemTokens.separator
                                                    .marginBottom
                                            }
                                            marginLeft={
                                                itemTokens.separator.marginLeft
                                            }
                                            aria-hidden="true"
                                        />
                                    </RadixMenu.Separator>
                                )}
                        </RadixMenu.Group>
                    ))}
                </Block>
            )}
        </Content>
    )
}

MenuV2Content.displayName = 'MenuV2Content'

export default MenuV2Content
