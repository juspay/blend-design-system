import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { FOUNDATION_THEME } from '../../tokens'
import { MenuItemActionType, type MenuItemType, MenuItemVariant } from './types'
import { SubMenu } from './SubMenu'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { type MenuItemStates, type MenuTokensType } from './menu.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tooltip } from '../Tooltip'

const MenuSlot = ({ slot }: { slot: React.ReactNode }) => {
    return (
        <Block flexShrink={0} height="auto" contentCentered>
            {slot}
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
    const bg = menuTokens.item.label.color

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
                display="flex"
                padding={menuTokens.item.padding}
                margin={menuTokens.item.margin}
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
                            color={getColor('default', menuTokens, item)}
                            fontWeight={500}
                            truncate
                        >
                            {item.label}
                        </Text>
                    </Block>
                    {item.slot2 && <MenuSlot slot={item.slot2} />}
                    {item.slot3 && <MenuSlot slot={item.slot3} />}
                    {item.slot4 && <MenuSlot slot={item.slot4} />}
                </Block>
                {item.subLabel && (
                    <Block display="flex" alignItems="center" width="100%">
                        <Text
                            variant="body.sm"
                            color={FOUNDATION_THEME.colors.gray[400]}
                            fontWeight={400}
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
