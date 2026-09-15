import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Check } from 'lucide-react'
import { MenuItemActionType, type MenuItemType, MenuItemVariant } from './types'
// eslint-disable-next-line import-x/no-cycle -- intentional recursion: MenuItem renders SubMenu which renders MenuItem
import { SubMenu } from './SubMenu'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import {
    getMenuItemStateToken,
    type MenuItemSelectionStates,
    type MenuTokensType,
} from './menu.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { Tooltip } from '../Tooltip'
import {
    resolveMenuSelection,
    useMenuSelection,
    type MenuSelectionMode,
    type MenuSelectionStyle,
} from './selection'

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
        <Block data-element="icon" flexShrink={0} height="auto" contentCentered>
            {content}
        </Block>
    )
}

const CheckmarkIndicator = ({
    menuTokens,
    disabled,
}: {
    menuTokens: MenuTokensType
    disabled?: boolean
}) => {
    const checkmark = menuTokens.item.checkmark
    const position = checkmark?.position ?? 'trailing'
    const width = checkmark?.width ?? 16

    return (
        <Block
            data-element="menu-item-checkmark"
            data-position={position}
            flexShrink={0}
            display="flex"
            alignItems="center"
            contentCentered
            maxWidth={width}
            maxHeight={width}
            aria-hidden="true"
        >
            <Check
                size={typeof width === 'number' ? width : 16}
                color={checkmark?.color}
                data-state="selected"
                data-status={disabled ? 'disabled' : 'enabled'}
            />
        </Block>
    )
}

const getBgColor = (
    state: MenuItemSelectionStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.backgroundColor

    // check for variant
    if (item.variant === MenuItemVariant.DEFAULT) {
        if (!item.disabled) {
            return getMenuItemStateToken(bg.default.enabled, state)
        } else {
            return getMenuItemStateToken(bg.default.disabled, state)
        }
    } else {
        // check for action type
        if (item.actionType === undefined) {
            item.actionType = MenuItemActionType.PRIMARY
        }
        if (item.actionType === MenuItemActionType.PRIMARY) {
            if (!item.disabled) {
                return getMenuItemStateToken(bg.action.primary.enabled, state)
            } else {
                return getMenuItemStateToken(bg.action.primary.disabled, state)
            }
        } else {
            if (!item.disabled) {
                return getMenuItemStateToken(bg.action.danger.enabled, state)
            } else {
                return getMenuItemStateToken(bg.action.danger.disabled, state)
            }
        }
    }
}

const getColor = (
    state: MenuItemSelectionStates,
    menuTokens: MenuTokensType,
    item: MenuItemType
) => {
    const bg = menuTokens.item.option.color

    // check for variant
    if (item.variant === MenuItemVariant.DEFAULT) {
        if (!item.disabled) {
            return getMenuItemStateToken(bg.default.enabled, state)
        } else {
            return getMenuItemStateToken(bg.default.disabled, state)
        }
    } else {
        // check for action type
        if (item.actionType === undefined) {
            item.actionType = MenuItemActionType.PRIMARY
        }
        if (item.actionType === MenuItemActionType.PRIMARY) {
            if (!item.disabled) {
                return getMenuItemStateToken(bg.action.primary.enabled, state)
            } else {
                return getMenuItemStateToken(bg.action.primary.disabled, state)
            }
        } else {
            if (!item.disabled) {
                return getMenuItemStateToken(bg.action.danger.enabled, state)
            } else {
                return getMenuItemStateToken(bg.action.danger.disabled, state)
            }
        }
    }
}

const MenuItem = ({
    item,
    idx,
    maxHeight,
    selectionStyle: groupSelectionStyle,
    selectionMode: groupSelectionMode,
}: {
    item: MenuItemType
    idx: number
    maxHeight?: number
    selectionStyle?: MenuSelectionStyle
    selectionMode?: MenuSelectionMode
}) => {
    const menuTokens = useResponsiveTokens<MenuTokensType>('MENU')
    const {
        selectionStyle: menuSelectionStyle,
        selectionMode: menuSelectionMode,
        closeOnSelect,
    } = useMenuSelection()

    const isSubMenu =
        item.subMenu &&
        (item.subMenu.length > 0 || typeof item.selected !== 'boolean')

    if (isSubMenu) {
        return (
            <SubMenu
                item={item}
                idx={idx}
                maxHeight={maxHeight}
                selectionStyle={groupSelectionStyle}
                selectionMode={groupSelectionMode}
            />
        )
    }
    if (item.variant === undefined) {
        item.variant = MenuItemVariant.DEFAULT
    }

    const selection = resolveMenuSelection({
        selected: item.selected,
        groupSelectionStyle,
        groupSelectionMode,
        menuSelectionStyle,
        menuSelectionMode,
    })
    const useHighlight =
        selection.selectionStyle === 'highlight' && selection.isSelected
    const showCheckmark =
        selection.selectionStyle === 'checkmark' && selection.isSelected
    const checkmarkPosition = menuTokens.item.checkmark?.position ?? 'trailing'
    const showLeadingCheck = showCheckmark && checkmarkPosition === 'leading'
    const showTrailingCheck = showCheckmark && checkmarkPosition === 'trailing'
    const defaultState: MenuItemSelectionStates = useHighlight
        ? 'selected'
        : 'default'

    const handleSelect = (event: Event) => {
        if (item.disabled) return
        if (!closeOnSelect) {
            event.preventDefault()
        }
        item.onClick?.()
    }

    const menuItemContent = (
        <RadixMenu.Item
            asChild
            disabled={item.disabled}
            onSelect={item.disabled ? undefined : handleSelect}
            style={{ outline: 'none', border: 'none', userSelect: 'none' }}
        >
            <Block
                key={idx}
                {...(selection.selectionRole
                    ? { role: selection.selectionRole }
                    : {})}
                {...(selection.isSelectable
                    ? { 'aria-checked': selection.isSelected }
                    : {})}
                data-element="select-item"
                data-status={item.disabled ? 'disabled' : 'enabled'}
                data-numeric={idx + 1}
                data-id={item.label}
                {...(selection.isSelected ? { 'data-state': 'selected' } : {})}
                {...(selection.selectionStyle
                    ? { 'data-selection-style': selection.selectionStyle }
                    : {})}
                {...(selection.selectionMode
                    ? { 'data-selection-mode': selection.selectionMode }
                    : {})}
                display="flex"
                paddingX={menuTokens.item.padding.x}
                paddingY={menuTokens.item.padding.y}
                marginY={menuTokens.item.margin.y}
                marginX={menuTokens.item.margin.x}
                borderRadius={menuTokens.item.borderRadius}
                cursor={item.disabled ? 'not-allowed' : 'pointer'}
                flexDirection="column"
                gap={menuTokens.item.gap}
                backgroundColor={getBgColor(defaultState, menuTokens, item)}
                color={getColor(defaultState, menuTokens, item)}
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
                    {showLeadingCheck && (
                        <CheckmarkIndicator
                            menuTokens={menuTokens}
                            disabled={item.disabled}
                        />
                    )}
                    {item.slot1 && (
                        <Block data-element="slot-1">
                            <MenuSlot slot={item.slot1} isDecorative={true} />
                        </Block>
                    )}
                    <Block
                        data-element="select-item-label"
                        data-id={item.label || 'select-item-label'}
                        display="flex"
                        flexGrow={1}
                        alignItems="center"
                        maxWidth="100%"
                        overflow="hidden"
                    >
                        <Text
                            data-text={item.label}
                            color={getColor(defaultState, menuTokens, item)}
                            fontWeight={menuTokens.item.option.fontWeight}
                            fontSize={menuTokens.item.option.fontSize}
                            truncate
                        >
                            {item.label}
                        </Text>
                    </Block>
                    {item.slot2 && (
                        <Block data-element="slot-2">
                            <MenuSlot slot={item.slot2} isDecorative={true} />
                        </Block>
                    )}
                    {item.slot3 && (
                        <Block data-element="slot-3">
                            <MenuSlot slot={item.slot3} isDecorative={true} />
                        </Block>
                    )}
                    {item.slot4 && (
                        <Block data-element="slot-4">
                            <MenuSlot slot={item.slot4} isDecorative={true} />
                        </Block>
                    )}
                    {showTrailingCheck && (
                        <CheckmarkIndicator
                            menuTokens={menuTokens}
                            disabled={item.disabled}
                        />
                    )}
                </Block>
                {item.subLabel && (
                    <Block
                        data-element="select-item-sublabel"
                        data-id={item.subLabel || 'select-item-sublabel'}
                        display="flex"
                        alignItems="center"
                        width="100%"
                    >
                        <Text
                            color={getColor(defaultState, menuTokens, item)}
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
