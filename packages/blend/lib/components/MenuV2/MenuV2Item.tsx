import { forwardRef, isValidElement } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { Check } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip'
import type { MenuV2ItemType, MenuV2SelectionStyle } from './menuV2.types'
import {
    getMenuItemBackgroundColor,
    getMenuItemOptionColor,
    getMenuItemDescriptionColor,
    getItemSlots,
} from './menuV2.utils'
import type { MenuV2TokensType } from './menuV2.tokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import {
    resolveSelectionStyle,
    useMenuV2Selection,
} from './MenuV2SelectionContext'

type MenuV2ItemProps = {
    item: MenuV2ItemType
    index: number
    itemTokens: MenuV2TokensType['group']['item']
    /** Group-level override for selection style. */
    selectionStyle?: MenuV2SelectionStyle
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

const CheckmarkIndicator = ({
    itemTokens,
    disabled,
}: {
    itemTokens: MenuV2TokensType['group']['item']
    disabled?: boolean
}) => {
    const size =
        typeof itemTokens.text.leftSlot.maxWidth === 'number'
            ? itemTokens.text.leftSlot.maxWidth
            : 16
    const checkmark = itemTokens.text.checkmark
    const position = checkmark?.position ?? 'trailing'
    const color = checkmark?.color
    const width = checkmark?.width ?? size

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
                color={color}
                data-state="selected"
                data-status={disabled ? 'disabled' : 'enabled'}
            />
        </Block>
    )
}

const MenuV2Item = forwardRef<HTMLDivElement, MenuV2ItemProps>(
    ({ item, index, itemTokens, selectionStyle: groupSelectionStyle }, ref) => {
        const { selectionStyle: menuSelectionStyle, closeOnSelect } =
            useMenuV2Selection()
        const selectionStyle = resolveSelectionStyle(
            groupSelectionStyle,
            menuSelectionStyle
        )

        const isSelectable = typeof item.selected === 'boolean'
        const isSelected = item.selected === true
        const effectiveSelectionStyle: MenuV2SelectionStyle | undefined =
            isSelectable ? (selectionStyle ?? 'checkmark') : undefined
        const useHighlight =
            effectiveSelectionStyle === 'highlight' && isSelected
        const showCheckmark =
            effectiveSelectionStyle === 'checkmark' && isSelected
        const checkmarkPosition =
            itemTokens.text.checkmark?.position ?? 'trailing'
        const showLeadingCheck =
            showCheckmark && checkmarkPosition === 'leading'
        const showTrailingCheck =
            showCheckmark && checkmarkPosition === 'trailing'

        const selectionRole =
            effectiveSelectionStyle === 'checkmark'
                ? 'menuitemradio'
                : effectiveSelectionStyle === 'highlight'
                  ? 'menuitemcheckbox'
                  : undefined

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
            useHighlight ? 'selected' : 'default',
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
        const colorDefault = getMenuItemOptionColor(
            useHighlight ? 'selected' : 'default',
            itemTokens,
            item
        )
        const descColor = getMenuItemDescriptionColor(
            useHighlight ? 'selected' : 'default',
            itemTokens,
            item
        )

        const handleSelect = (event: Event) => {
            if (item.disabled) return
            if (!closeOnSelect) {
                event.preventDefault()
            }
            item.onClick?.()
        }

        const content = (
            <RadixMenu.Item
                asChild
                disabled={item.disabled}
                onSelect={item.disabled ? undefined : handleSelect}
            >
                <Block
                    ref={ref}
                    as="div"
                    {...(selectionRole ? { role: selectionRole } : {})}
                    {...(isSelectable ? { 'aria-checked': isSelected } : {})}
                    data-element="menu-item"
                    data-id={item.id ?? `menu-item-${index}`}
                    data-status={item.disabled ? 'disabled' : 'enabled'}
                    {...(isSelected ? { 'data-state': 'selected' } : {})}
                    {...(effectiveSelectionStyle
                        ? { 'data-selection-style': effectiveSelectionStyle }
                        : {})}
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
                                itemTokens={itemTokens}
                                disabled={item.disabled}
                            />
                        )}
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
                                data-text={item.label.text}
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
                        {showTrailingCheck && (
                            <CheckmarkIndicator
                                itemTokens={itemTokens}
                                disabled={item.disabled}
                            />
                        )}
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
                                fontSize={itemTokens.text.subText.fontSize}
                                fontWeight={itemTokens.text.subText.fontWeight}
                                color={descColor}
                                lineHeight={addPxToValue(
                                    itemTokens.text.subText.lineHeight
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
