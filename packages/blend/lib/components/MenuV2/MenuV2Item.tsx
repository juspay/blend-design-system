import { forwardRef, isValidElement } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip'
import type { MenuV2ItemType } from './menuV2.types'
import {
    getMenuItemBackgroundColor,
    getMenuItemOptionColor,
    getMenuItemDescriptionColor,
    getItemSlots,
} from './menuV2.utils'
import type { MenuV2TokensType } from './menuV2.tokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'

type MenuV2ItemProps = {
    item: MenuV2ItemType
    index: number
    itemTokens: MenuV2TokensType['group']['item']
}

const SlotWrapper = ({
    slot,
    itemTokens,
    decorative = true,
}: {
    slot: React.ReactNode
    decorative?: boolean
    itemTokens: MenuV2TokensType['group']['item']
}) => {
    const content =
        decorative && isValidElement(slot) ? (
            slot
        ) : decorative ? (
            <span aria-hidden="true">{slot}</span>
        ) : (
            slot
        )
    return (
        <Block
            data-element="icon"
            flexShrink={0}
            height="auto"
            contentCentered
            maxWidth={itemTokens.text.leftSlot.maxWidth}
            maxHeight={itemTokens.text.leftSlot.maxHeight}
            overflow="hidden"
        >
            {content}
        </Block>
    )
}

const MenuV2Item = forwardRef<HTMLDivElement, MenuV2ItemProps>(
    ({ item, index, itemTokens }, ref) => {
        const [slot] = getItemSlots(item)
        const itemStyle = {
            paddingTop: itemTokens.paddingTop,
            paddingRight: itemTokens.paddingRight,
            paddingBottom: itemTokens.paddingBottom,
            paddingLeft: itemTokens.paddingLeft,
            marginTop: itemTokens.marginTop,
            marginRight: itemTokens.marginRight,
            marginBottom: itemTokens.marginBottom,
            marginLeft: itemTokens.marginLeft,
            border: 'none',
            outline: 'none',
        }
        const bgDefault = getMenuItemBackgroundColor(
            'default',
            itemTokens,
            item
        )
        const bgHover = getMenuItemBackgroundColor('hover', itemTokens, item)
        const bgFocus = getMenuItemBackgroundColor('focus', itemTokens, item)
        const bgActive = getMenuItemBackgroundColor('active', itemTokens, item)
        const bgFocusVisible = getMenuItemBackgroundColor(
            'focusVisible',
            itemTokens,
            item
        )
        const colorDefault = getMenuItemOptionColor('default', itemTokens, item)
        const descColor = getMenuItemDescriptionColor(
            'default',
            itemTokens,
            item
        )

        const content = (
            <RadixMenu.Item
                asChild
                disabled={item.disabled}
                onSelect={item.disabled ? undefined : item.onClick}
            >
                <Block
                    ref={ref}
                    as="div"
                    data-element="menu-item"
                    data-id={item.id ?? `menu-item-${index}`}
                    data-status={item.disabled ? 'disabled' : 'enabled'}
                    data-numeric={index + 1}
                    display="flex"
                    flexDirection="column"
                    gap={itemTokens.gap}
                    borderRadius={itemTokens.borderRadius}
                    backgroundColor={bgDefault}
                    color={colorDefault}
                    cursor={item.disabled ? 'not-allowed' : 'pointer'}
                    style={{
                        ...itemStyle,
                    }}
                    _hover={{ backgroundColor: bgHover }}
                    _focus={{ backgroundColor: bgFocus }}
                    _active={{ backgroundColor: bgActive }}
                    _focusVisible={{ backgroundColor: bgFocusVisible }}
                    onClick={item.disabled ? undefined : item.onClick}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={4}
                        width="100%"
                        overflow="hidden"
                    >
                        {slot != null && (
                            <SlotWrapper slot={slot} itemTokens={itemTokens} />
                        )}
                        <Block
                            data-element="select-item-label"
                            data-id={
                                item.id ?? `menu-item-${index}-select-label`
                            }
                            display="flex"
                            flexGrow={1}
                            alignItems="center"
                            maxWidth="100%"
                            overflow="hidden"
                        >
                            <PrimitiveText
                                data-text={item.label}
                                fontSize={itemTokens.text.fontSize}
                                fontWeight={itemTokens.text.fontWeight}
                                lineHeight={addPxToValue(
                                    itemTokens.text.lineHeight
                                )}
                                color={colorDefault}
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {item.label.text}
                            </PrimitiveText>
                        </Block>
                    </Block>
                    {item.subLabel && (
                        <Block
                            data-element="select-item-sublabel"
                            data-id={item.subLabel ?? 'select-item-sublabel'}
                            display="flex"
                            alignItems="center"
                            width="100%"
                        >
                            <PrimitiveText
                                fontSize={itemTokens.text.subtText.fontSize}
                                fontWeight={itemTokens.text.subtText.fontWeight}
                                color={descColor}
                                lineHeight={addPxToValue(
                                    itemTokens.text.subtText.lineHeight
                                )}
                            >
                                {item.subLabel}
                            </PrimitiveText>
                        </Block>
                    )}
                </Block>
            </RadixMenu.Item>
        )

        if (item.tooltip) {
            return (
                <Tooltip content={item.tooltip} {...item.tooltipProps}>
                    {content}
                </Tooltip>
            )
        }
        return content
    }
)

MenuV2Item.displayName = 'MenuV2Item'

export default MenuV2Item
