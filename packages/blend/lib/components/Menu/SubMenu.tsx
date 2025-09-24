import styled from 'styled-components'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { MenuItemActionType, type MenuItemType, MenuItemVariant } from './types'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { contentBaseStyle } from './Menu'
import MenuItem from './MenuItem'
import { ChevronRightIcon, Search } from 'lucide-react'
import { type MenuItemStates, type MenuTokensType } from './menu.tokens'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import SearchInput from '../Inputs/SearchInput/SearchInput'
import { FOUNDATION_THEME } from '../../tokens'
import { filterMenuItem } from './utils'
import React, { useState, useRef } from 'react'

const MenuSlot = ({ slot }: { slot: React.ReactNode }) => {
    return (
        <Block flexShrink={0} height="auto" contentCentered>
            {slot}
        </Block>
    )
}

const SubContent = styled(RadixMenu.SubContent)(() => ({
    ...contentBaseStyle,
}))

const getBgColor = (
    state: MenuItemStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.backgroundColor

    // check for variant
    if (
        item.variant === MenuItemVariant.DEFAULT ||
        (item.subMenu && item.subMenu.length > 0)
    ) {
        if (!item.disabled) {
            return bg.default.enabled[state]
        } else {
            return bg.default.disabled[state]
        }
    } else {
        // check for action type
        if (item.actionType === undefined) {
            item.actionType = MenuItemActionType.PRIMARY
        }
        if (item.actionType === MenuItemActionType.PRIMARY) {
            if (!item.disabled) {
                return bg.action.primary.enabled[state]
            } else {
                return bg.action.primary.disabled[state]
            }
        } else {
            if (!item.disabled) {
                return bg.action.danger.enabled[state]
            } else {
                return bg.action.danger.disabled[state]
            }
        }
    }
}

const getLabelColor = (
    state: MenuItemStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.label.color

    // check for variant
    if (
        item.variant === MenuItemVariant.DEFAULT ||
        (item.subMenu && item.subMenu.length > 0)
    ) {
        if (!item.disabled) {
            return bg.default.enabled[state]
        } else {
            return bg.default.disabled[state]
        }
    } else {
        // check for action type
        if (item.actionType === undefined) {
            item.actionType = MenuItemActionType.PRIMARY
        }
        if (item.actionType === MenuItemActionType.PRIMARY) {
            if (!item.disabled) {
                return bg.action.primary.enabled[state]
            } else {
                return bg.action.primary.disabled[state]
            }
        } else {
            if (!item.disabled) {
                return bg.action.danger.enabled[state]
            } else {
                return bg.action.danger.disabled[state]
            }
        }
    }
}

const getSubLabelColor = (
    state: MenuItemStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.subLabel.color

    // check for variant
    if (
        item.variant === MenuItemVariant.DEFAULT ||
        (item.subMenu && item.subMenu.length > 0)
    ) {
        if (!item.disabled) {
            return bg.default.enabled[state]
        } else {
            return bg.default.disabled[state]
        }
    } else {
        // check for action type
        if (item.actionType === undefined) {
            item.actionType = MenuItemActionType.PRIMARY
        }
        if (item.actionType === MenuItemActionType.PRIMARY) {
            if (!item.disabled) {
                return bg.action.primary.enabled[state]
            } else {
                return bg.action.primary.disabled[state]
            }
        } else {
            if (!item.disabled) {
                return bg.action.danger.enabled[state]
            } else {
                return bg.action.danger.disabled[state]
            }
        }
    }
}

export const SubMenu = ({
    item,
    idx,
    maxHeight,
}: {
    item: MenuItemType
    idx: number
    maxHeight?: number
}) => {
    const menuTokens = useResponsiveTokens<MenuTokensType>('MENU')
    const [searchText, setSearchText] = useState<string>('')
    const searchInputRef = useRef<HTMLInputElement>(null)

    const filteredSubMenuItems = React.useMemo(() => {
        if (!item.subMenu) return []
        if (!searchText || !item.enableSubMenuSearch) return item.subMenu

        const lower = searchText.toLowerCase()
        return item.subMenu
            .map((subItem) => filterMenuItem(subItem, lower))
            .filter(Boolean) as MenuItemType[]
    }, [item.subMenu, searchText, item.enableSubMenuSearch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    return (
        <RadixMenu.Sub key={idx}>
            <RadixMenu.SubTrigger
                asChild
                style={{ outline: 'none', border: 'none' }}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={menuTokens.item.gap}
                    width="calc(100% - 12px)"
                    padding={menuTokens.item.padding}
                    margin={menuTokens.item.margin}
                    borderRadius={menuTokens.item.borderRadius}
                    color={getLabelColor('default', menuTokens, item)}
                    _hover={{
                        backgroundColor: getBgColor('hover', menuTokens, item),
                    }}
                    _focus={{
                        backgroundColor: getBgColor('focus', menuTokens, item),
                    }}
                    _active={{
                        backgroundColor: getBgColor('active', menuTokens, item),
                    }}
                    _focusVisible={{
                        backgroundColor: getBgColor(
                            'focusVisible',
                            menuTokens,
                            item
                        ),
                    }}
                    style={{ userSelect: 'none' }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={4}
                        width="100%"
                    >
                        {item.slot1 && <MenuSlot slot={item.slot1} />}
                        <Block
                            display="flex"
                            flexGrow={1}
                            alignItems="center"
                            maxWidth="100%"
                            overflow="hidden"
                        >
                            <Text
                                variant="body.md"
                                fontWeight={menuTokens.item.label.fontWeight}
                                fontSize={menuTokens.item.label.fontSize}
                                truncate
                                color={getLabelColor(
                                    'default',
                                    menuTokens,
                                    item
                                )}
                            >
                                {item.label}
                            </Text>
                        </Block>
                        {item.slot2 && <MenuSlot slot={item.slot2} />}
                        {item.slot3 && <MenuSlot slot={item.slot3} />}
                        {item.slot4 && <MenuSlot slot={item.slot4} />}

                        <Block flexShrink={0} size="auto" contentCentered>
                            <ChevronRightIcon size={16} />
                        </Block>
                    </Block>
                    {item.subLabel && (
                        <Block display="flex" alignItems="center" width="100%">
                            <PrimitiveText
                                color={getSubLabelColor(
                                    'default',
                                    menuTokens,
                                    item
                                )}
                                fontWeight={menuTokens.item.subLabel.fontWeight}
                                fontSize={menuTokens.item.subLabel.fontSize}
                            >
                                {item.subLabel}
                            </PrimitiveText>
                        </Block>
                    )}
                </Block>
            </RadixMenu.SubTrigger>
            <RadixMenu.Portal>
                <SubContent
                    style={{
                        paddingTop: item.enableSubMenuSearch
                            ? 0
                            : menuTokens.paddingTop,
                        paddingBottom: menuTokens.paddingBottom,
                        borderRadius: menuTokens.borderRadius,
                        minWidth: '200px',
                        maxWidth: '280px',
                        maxHeight: maxHeight
                            ? `${maxHeight}px`
                            : 'var(--radix-popper-available-height)',
                        overflowY: 'auto',
                    }}
                    avoidCollisions
                    onFocusCapture={(e) => {
                        if (
                            item.enableSubMenuSearch &&
                            searchText &&
                            searchInputRef.current
                        ) {
                            if (e.target !== searchInputRef.current) {
                                e.preventDefault()
                                searchInputRef.current.focus()
                            }
                        }
                    }}
                >
                    {item.enableSubMenuSearch && (
                        <Block
                            width="100%"
                            position="sticky"
                            top={0}
                            left={0}
                            right={0}
                            zIndex={1000}
                            backgroundColor="white"
                        >
                            <SearchInput
                                ref={searchInputRef}
                                leftSlot={
                                    <Search
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        size={16}
                                    />
                                }
                                placeholder={
                                    item.subMenuSearchPlaceholder || 'Search...'
                                }
                                value={searchText}
                                onChange={handleSearchChange}
                                autoFocus
                            />
                        </Block>
                    )}
                    {filteredSubMenuItems.map((subItem, subIdx) => (
                        <MenuItem key={subIdx} item={subItem} idx={subIdx} />
                    ))}
                </SubContent>
            </RadixMenu.Portal>
        </RadixMenu.Sub>
    )
}
