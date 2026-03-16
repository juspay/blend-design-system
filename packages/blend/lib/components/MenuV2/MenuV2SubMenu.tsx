import { useEffect, useMemo, useRef, useState } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import { ChevronRightIcon, Search } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import SearchInput from '../Inputs/SearchInput/SearchInput'
import MenuV2Item from './MenuV2Item'
import type { MenuV2ItemType } from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'
import {
    getMenuItemBackgroundColor,
    getMenuItemOptionColor,
    getMenuItemDescriptionColor,
    filterMenuItem,
    getItemSlots,
} from './menuV2.utils'
import { menuV2SubmenuContentAnimations } from './menuV2.animations'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'

type SubContentStyledProps = { $zIndex: number | string }

const SubContent = styled(RadixMenu.SubContent)<SubContentStyledProps>`
    z-index: ${(p) => p.$zIndex};
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
    ${menuV2SubmenuContentAnimations}
`

type MenuV2SubMenuProps = {
    item: MenuV2ItemType
    index: number
    maxHeight?: number
}

const SlotWrapper = ({ slot }: { slot: React.ReactNode }) => (
    <Block
        data-element="left-slot"
        aria-hidden
        flexShrink={0}
        height="auto"
        contentCentered
        maxWidth={24}
        maxHeight={24}
        overflow="hidden"
    >
        {slot}
    </Block>
)

const MenuV2SubMenu = ({ item, index, maxHeight }: MenuV2SubMenuProps) => {
    const menuTokens = useResponsiveTokens<MenuV2TokensType>('MENU_V2')
    const itemTokens = menuTokens.group.item
    const [slot1] = getItemSlots(item)
    const [searchText, setSearchText] = useState('')
    const searchInputRef = useRef<HTMLInputElement | null>(null)

    const filteredSubMenuItems = useMemo(() => {
        if (!item.subMenu) return []
        if (!searchText.trim()) return item.subMenu

        const lower = searchText.toLowerCase()

        return item.subMenu.reduce<MenuV2ItemType[]>((acc, sub) => {
            const result = filterMenuItem(sub, lower)
            if (result) acc.push(result)
            return acc
        }, [])
    }, [item.subMenu, searchText])

    const {
        bgDefault,
        bgHover,
        bgFocus,
        bgActive,
        bgFocusVisible,
        labelColor,
        subLabelColor,
    } = useMemo(() => {
        const defaultBg = getMenuItemBackgroundColor(
            'default',
            itemTokens,
            item
        )
        const hoverBg = getMenuItemBackgroundColor('hover', itemTokens, item)
        const focusBg = getMenuItemBackgroundColor('focus', itemTokens, item)
        const activeBg = getMenuItemBackgroundColor('active', itemTokens, item)
        const focusVisibleBg = getMenuItemBackgroundColor(
            'focusVisible',
            itemTokens,
            item
        )
        const defaultLabelColor = getMenuItemOptionColor(
            'default',
            itemTokens,
            item
        )
        const defaultSubLabelColor = getMenuItemDescriptionColor(
            'default',
            itemTokens,
            item
        )

        return {
            bgDefault: defaultBg,
            bgHover: hoverBg,
            bgFocus: focusBg,
            bgActive: activeBg,
            bgFocusVisible: focusVisibleBg,
            labelColor: defaultLabelColor,
            subLabelColor: defaultSubLabelColor,
        }
    }, [itemTokens, item])

    const contentPadding = menuTokens
    const borderStyle = contentPadding.border
    const borderRadius = contentPadding.borderRadius

    useEffect(() => {
        if (item.enableSubMenuSearch) {
            searchInputRef.current?.focus()
        }
    }, [item.enableSubMenuSearch])

    return (
        <RadixMenu.Sub>
            <RadixMenu.SubTrigger asChild>
                <Block
                    data-element="menu-item"
                    data-id={item.id ?? `menu-item-${index}`}
                    data-status={item.disabled ? 'disabled' : 'enabled'}
                    data-numeric={index + 1}
                    display="flex"
                    flexDirection="column"
                    gap={itemTokens.gap}
                    paddingTop={itemTokens.paddingTop}
                    paddingRight={itemTokens.paddingRight}
                    paddingBottom={itemTokens.paddingBottom}
                    paddingLeft={itemTokens.paddingLeft}
                    marginTop={itemTokens.marginTop}
                    marginRight={itemTokens.marginRight}
                    marginBottom={itemTokens.marginBottom}
                    marginLeft={itemTokens.marginLeft}
                    borderRadius={itemTokens.borderRadius}
                    backgroundColor={bgDefault}
                    color={labelColor}
                    _hover={{ backgroundColor: bgHover }}
                    _focus={{ backgroundColor: bgFocus }}
                    _active={{ backgroundColor: bgActive }}
                    _focusVisible={{ backgroundColor: bgFocusVisible }}
                    style={{
                        border: 'none',
                        outline: 'none',
                        userSelect: 'none',
                    }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={4}
                        width="100%"
                    >
                        {slot1 != null && <SlotWrapper slot={slot1} />}
                        <Block
                            display="flex"
                            flexGrow={1}
                            alignItems="center"
                            maxWidth="100%"
                            overflow="hidden"
                        >
                            <PrimitiveText
                                fontSize={itemTokens.text.fontSize}
                                fontWeight={itemTokens.text.fontWeight}
                                lineHeight={addPxToValue(
                                    itemTokens.text.lineHeight
                                )}
                                color={labelColor}
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.label.text}
                            </PrimitiveText>
                        </Block>
                        <Block
                            data-element="chevron-icon"
                            flexShrink={0}
                            contentCentered
                        >
                            <ChevronRightIcon size={16} aria-hidden />
                        </Block>
                    </Block>
                    {item.subLabel && (
                        <Block display="flex" alignItems="center" width="100%">
                            <PrimitiveText
                                color={subLabelColor}
                                fontWeight={
                                    itemTokens.text.subtText.fontWeight
                                }
                                fontSize={itemTokens.text.subtText.fontSize}
                                lineHeight={addPxToValue(
                                    itemTokens.text.subtText.lineHeight
                                )}
                            >
                                {item.subLabel}
                            </PrimitiveText>
                        </Block>
                    )}
                </Block>
            </RadixMenu.SubTrigger>
            <RadixMenu.Portal>
                <SubContent
                    $zIndex={contentPadding.zIndex ?? 101}
                    style={{
                        paddingTop: item.enableSubMenuSearch
                            ? 0
                            : contentPadding.paddingTop,
                        paddingBottom: contentPadding.paddingBottom,
                        paddingRight: contentPadding.paddingRight,
                        paddingLeft: contentPadding.paddingLeft,
                        borderRadius,
                        border: borderStyle,
                        minWidth:
                            typeof contentPadding.minWidth === 'number'
                                ? `${contentPadding.minWidth}px`
                                : contentPadding.minWidth,
                        maxWidth:
                            typeof contentPadding.maxWidth === 'number'
                                ? `${contentPadding.maxWidth}px`
                                : contentPadding.maxWidth,
                        maxHeight: maxHeight
                            ? `${maxHeight}px`
                            : 'var(--radix-popper-available-height)',
                        overflowY: 'auto',
                        backgroundColor: contentPadding.backgroundColor,
                        boxShadow: contentPadding.boxShadow,
                    }}
                    avoidCollisions
                >
                    {item.enableSubMenuSearch && (
                        <Block
                            width="100%"
                            position="sticky"
                            top={0}
                            left={0}
                            right={0}
                            zIndex={contentPadding.zIndex ?? 101}
                            backgroundColor={contentPadding.backgroundColor}
                        >
                            <SearchInput
                                ref={searchInputRef}
                                leftSlot={<Search size={16} aria-hidden />}
                                placeholder={
                                    item.subMenuSearchPlaceholder ?? 'Search...'
                                }
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                aria-label="Search submenu"
                            />
                        </Block>
                    )}
                    {filteredSubMenuItems.map((subItem, subIdx) => (
                        <MenuV2Item
                            key={
                                subItem.id ??
                                `${item.id ?? 'submenu-item'}-${subIdx}`
                            }
                            item={subItem}
                            index={subIdx}
                            itemTokens={itemTokens}
                        />
                    ))}
                </SubContent>
            </RadixMenu.Portal>
        </RadixMenu.Sub>
    )
}

MenuV2SubMenu.displayName = 'MenuV2SubMenu'

export default MenuV2SubMenu
