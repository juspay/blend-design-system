import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { MenuItemActionType, type MenuItemType, MenuItemVariant } from './types'
import { SubMenu } from './SubMenu'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { type MenuItemStates, type MenuTokensType } from './menu.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tooltip } from '../Tooltip'

const MenuSlot = ({
    slot,
    isDecorative = true,
}: {
    slot: React.ReactNode
    isDecorative?: boolean
}) => {
    const content =
        isDecorative && React.isValidElement(slot) ? (
            React.cloneElement(slot, {
                'aria-hidden': 'true',
            } as React.HTMLAttributes<HTMLElement>)
        ) : isDecorative ? (
            <span aria-hidden="true">{slot}</span>
        ) : (
            slot
        )

    return (
        <Block flexShrink={0} height="auto" contentCentered>
            {content}
        </Block>
    )
}

const getBgColor = (
    state: MenuItemStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.backgroundColor

    // check for variant
    if (item.variant === MenuItemVariant.DEFAULT) {
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

const getColor = (
    state: MenuItemStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.option.color

    // check for variant
    if (item.variant === MenuItemVariant.DEFAULT) {
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

const MenuItem = ({
    item,
    idx,
    maxHeight,
}: {
    item: MenuItemType
    idx: number
    maxHeight?: number
}) => {
    const menuTokens = useResponsiveTokens<MenuTokensType>('MENU')
    if (item.subMenu) {
        return <SubMenu item={item} idx={idx} maxHeight={maxHeight} />
    }
    if (item.variant === undefined) {
        item.variant = MenuItemVariant.DEFAULT
    }

    const menuItemContent = (
        <RadixMenu.Item
            asChild
            disabled={item.disabled}
            style={{ outline: 'none', border: 'none', userSelect: 'none' }}
        >
            <Block
                key={idx}
                data-dropdown-numeric={idx + 1}
                data-dropdown-value={item.label}
                display="flex"
                paddingX={menuTokens.item.padding.x}
                paddingY={menuTokens.item.padding.y}
                marginY={menuTokens.item.margin.y}
                marginX={menuTokens.item.margin.x}
                borderRadius={menuTokens.item.borderRadius}
                onClick={item.disabled ? undefined : item.onClick}
                cursor={item.disabled ? 'not-allowed' : 'pointer'}
                flexDirection="column"
                gap={menuTokens.item.gap}
                backgroundColor={getBgColor('default', menuTokens, item)}
                color={getColor('default', menuTokens, item)}
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
            >
                <Block
                    display="flex"
                    alignItems="center"
                    gap={4}
                    width="100%"
                    overflow="hidden"
                >
                    {item.slot1 && (
                        <MenuSlot slot={item.slot1} isDecorative={true} />
                    )}
                    <Block
                        display="flex"
                        flexGrow={1}
                        alignItems="center"
                        maxWidth="100%"
                        overflow="hidden"
                    >
                        <Text
                            data-text={item.label}
                            color={getColor('default', menuTokens, item)}
                            fontWeight={menuTokens.item.option.fontWeight}
                            fontSize={menuTokens.item.option.fontSize}
                            truncate
                        >
                            {item.label}
                        </Text>
                    </Block>
                    {item.slot2 && (
                        <MenuSlot slot={item.slot2} isDecorative={true} />
                    )}
                    {item.slot3 && (
                        <MenuSlot slot={item.slot3} isDecorative={true} />
                    )}
                    {item.slot4 && (
                        <MenuSlot slot={item.slot4} isDecorative={true} />
                    )}
                </Block>
                {item.subLabel && (
                    <Block display="flex" alignItems="center" width="100%">
                        <Text
                            color={getColor('default', menuTokens, item)}
                            fontWeight={menuTokens.item.description.fontWeight}
                            fontSize={menuTokens.item.description.fontSize}
                        >
                            {item.subLabel}
                        </Text>
                    </Block>
                )}
            </Block>
        </RadixMenu.Item>
    )

    // Wrap with tooltip if tooltip content is provided
    if (item.tooltip) {
        return (
            <Tooltip content={item.tooltip} {...item.tooltipProps}>
                {menuItemContent}
            </Tooltip>
        )
    }

    return menuItemContent
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
