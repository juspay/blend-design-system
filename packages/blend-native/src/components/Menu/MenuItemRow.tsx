import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Check, ChevronRight } from 'lucide-react-native'
import { MenuV2ItemVariant } from '@juspay/blend-design-system/node'
import type {
    MenuV2ItemActionType,
    MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import Slot from '../../primitives/Slot'
import type { MenuItemType } from './menu.types'

type ItemTokens = MenuV2TokensType['group']['item']
type ItemState =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
    | 'selected'

/** Walk the variant axis (`default` vs `action.primary|danger`). */
function variantMap<T extends Record<string, unknown>>(
    map: {
        default: T
        action: Record<string, T>
    },
    item: MenuItemType
): T {
    if (item.variant === MenuV2ItemVariant.ACTION) {
        const actionType = (item.actionType ??
            'primary') as MenuV2ItemActionType
        return map.action[actionType] ?? map.default
    }
    return map.default
}

/**
 * One menu row: leftSlot + label/subLabel + selection checkmark or
 * sub-menu chevron. Selection semantics ride `accessibilityState` — RN has
 * no menuitemradio/menuitemcheckbox roles, so single/multiple cardinality
 * is expressed through `selected` state (docblocked divergence).
 */
export function MenuItemRow({
    item,
    selectionStyle,
    onPress,
    tokens,
    testID,
}: {
    item: MenuItemType
    selectionStyle?: 'checkmark' | 'highlight'
    onPress: () => void
    tokens: MenuV2TokensType
    testID?: string
}) {
    const [pressed, setPressed] = useState(false)
    const itemTokens: ItemTokens = tokens.group.item
    const state: ItemState = item.disabled
        ? 'disabled'
        : item.selected && selectionStyle === 'highlight'
          ? 'selected'
          : pressed
            ? 'active'
            : 'default'

    const backgroundColor = String(
        variantMap(itemTokens.backgroundColor as never, item)?.[
            state as never
        ] ?? 'transparent'
    )
    const textColor = String(
        variantMap(itemTokens.text.color as never, item)?.[state as never] ??
            '#525866'
    )
    const subTextColor = String(
        variantMap(itemTokens.text.subText.color as never, item)?.[
            state as never
        ] ?? '#99A0AE'
    )

    const slotMax =
        parseDimension(itemTokens.text.leftSlot.maxWidth as string | number) ??
        16
    const showCheck =
        item.selected === true &&
        (selectionStyle ?? 'checkmark') === 'checkmark'

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            disabled={item.disabled}
            accessibilityRole="menuitem"
            accessibilityState={{
                disabled: item.disabled,
                selected: item.selected,
            }}
            accessibilityLabel={item.label.text}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(itemTokens.gap as string | number) ?? 4,
                backgroundColor,
                borderRadius:
                    parseDimension(
                        itemTokens.borderRadius as string | number
                    ) ?? 4,
                paddingTop: parseDimension(
                    itemTokens.paddingTop as string | number
                ),
                paddingBottom: parseDimension(
                    itemTokens.paddingBottom as string | number
                ),
                paddingLeft: parseDimension(
                    itemTokens.paddingLeft as string | number
                ),
                paddingRight: parseDimension(
                    itemTokens.paddingRight as string | number
                ),
                marginLeft: parseDimension(
                    itemTokens.marginLeft as string | number
                ),
                marginRight: parseDimension(
                    itemTokens.marginRight as string | number
                ),
            }}
            testID={testID}
        >
            {item.label.leftSlot ? (
                <Slot maxHeight={slotMax} color={textColor}>
                    {item.label.leftSlot}
                </Slot>
            ) : null}
            <View style={{ flex: 1 }}>
                <Text
                    color={textColor}
                    fontSize={itemTokens.text.fontSize as string | number}
                    fontWeight={itemTokens.text.fontWeight as string | number}
                    lineHeight={itemTokens.text.lineHeight as string | number}
                    numberOfLines={1}
                >
                    {item.label.text}
                </Text>
                {item.subLabel ? (
                    <Text
                        color={subTextColor}
                        fontSize={
                            itemTokens.text.subText.fontSize as string | number
                        }
                        fontWeight={
                            itemTokens.text.subText.fontWeight as
                                | string
                                | number
                        }
                        lineHeight={
                            itemTokens.text.subText.lineHeight as
                                | string
                                | number
                        }
                        numberOfLines={1}
                    >
                        {item.subLabel}
                    </Text>
                ) : null}
            </View>
            {showCheck ? (
                <Check
                    size={
                        parseDimension(
                            itemTokens.text.checkmark?.width as string | number
                        ) ?? 16
                    }
                    color={String(
                        itemTokens.text.checkmark?.color ?? textColor
                    )}
                    testID={testID ? `${testID}-check` : undefined}
                />
            ) : null}
            {item.subMenu?.length ? (
                <ChevronRight
                    size={
                        parseDimension(
                            itemTokens.text.rightChevron.width as
                                | string
                                | number
                        ) ?? 16
                    }
                    color={String(
                        itemTokens.text.rightChevron.color ?? '#717784'
                    )}
                    testID={testID ? `${testID}-chevron` : undefined}
                />
            ) : null}
        </Pressable>
    )
}

export default MenuItemRow
