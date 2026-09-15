import { forwardRef, memo, useCallback } from 'react'
import { View, type View as RNView } from 'react-native'
import { Check, ChevronRight } from 'lucide-react-native'
import { Pressable } from '../../../primitives/Pressable'
import { Text } from '../../../primitives/Text'
import { Slot } from '../../../primitives/Slot'
import { parseDimension } from '../../../adapters/cssStringAdapter'
import type { DropdownItemAdapter, DropdownItemTokens } from './dropdown.types'

/**
 * A pressable row inside a dropdown list: leading slot + label + sublabel
 * + trailing checkmark/chevron. Generic over the item type so Menu,
 * SingleSelect, and MultiSelect all share it.
 *
 * Layout matches web mobile (`SingleSelectV2MobileItem` / `SelectItemV2`):
 * outer column with gap between the main row and the sub-label row.
 * The main row is horizontal: leading accessory + leading slot +
 * label (flex 1) + trailing slot/checkmark/chevron. The sub-label
 * renders as a full-width second row below.
 *
 * State resolution: native has no hover/focus. `active` (pressed) is
 * handled by `Pressable` via `activeBackground`; `selected` and `disabled`
 * are resolved from the item adapter data.
 */
export type DropdownItemProps = {
    adapter: DropdownItemAdapter
    tokens: DropdownItemTokens
    onPress: (item: DropdownItemAdapter['item']) => void
    testID?: string
}

function resolveItemState(
    disabled: boolean | undefined,
    selected: boolean | undefined
) {
    if (disabled) return 'disabled'
    if (selected) return 'selected'
    return 'default'
}

const DropdownItemImpl = forwardRef<RNView, DropdownItemProps>(
    function DropdownItem({ adapter, tokens, onPress, testID }, ref) {
        const {
            primaryText,
            secondaryText,
            leadingSlot,
            leadingAccessory,
            trailingSlot,
            disabled,
            isSelected,
            hasSubMenu,
            item,
        } = adapter

        const state = resolveItemState(disabled, isSelected)

        const handlePress = useCallback(() => {
            if (disabled) return
            onPress(item)
        }, [disabled, onPress, item])

        const checkmarkPosition = tokens.text.checkmark?.position ?? 'trailing'
        const showCheckmark = isSelected && tokens.text.checkmark
        const checkmarkOnLeading =
            showCheckmark && checkmarkPosition === 'leading'

        return (
            <Pressable
                ref={ref}
                background={tokens.backgroundColor[state]}
                activeBackground={tokens.backgroundColor.active}
                disabledBackground={tokens.backgroundColor.disabled}
                paddingTop={tokens.paddingTop}
                paddingRight={tokens.paddingRight}
                paddingBottom={tokens.paddingBottom}
                paddingLeft={tokens.paddingLeft}
                flexDirection="column"
                gap={tokens.gap}
                borderRadius={tokens.borderRadius}
                disabled={disabled}
                onPress={handlePress}
                style={
                    tokens.margin != null
                        ? {
                              margin: parseDimension(tokens.margin),
                          }
                        : undefined
                }
                accessibilityRole="menuitem"
                accessibilityState={{
                    disabled: Boolean(disabled),
                    selected: Boolean(isSelected),
                }}
                accessibilityLabel={primaryText}
                testID={testID}
            >
                {/* Main row: leading + label + trailing */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        gap: 8,
                    }}
                >
                    {checkmarkOnLeading && tokens.text.checkmark ? (
                        <Check
                            size={Number(tokens.text.checkmark.width) || 16}
                            color={tokens.text.checkmark.color}
                        />
                    ) : null}

                    {leadingAccessory}

                    {leadingSlot ? (
                        <Slot
                            maxHeight={tokens.text.leftSlot.maxHeight}
                            color={tokens.text.color[state]}
                            hidden
                        >
                            {leadingSlot}
                        </Slot>
                    ) : null}

                    <View style={{ flex: 1, flexShrink: 1 }}>
                        <Text
                            fontSize={tokens.text.fontSize}
                            fontWeight={tokens.text.fontWeight}
                            lineHeight={tokens.text.lineHeight}
                            color={tokens.text.color[state]}
                            numberOfLines={1}
                        >
                            {primaryText}
                        </Text>
                    </View>

                    {trailingSlot}

                    {showCheckmark &&
                    !checkmarkOnLeading &&
                    tokens.text.checkmark ? (
                        <Check
                            size={Number(tokens.text.checkmark.width) || 16}
                            color={tokens.text.checkmark.color}
                        />
                    ) : null}

                    {hasSubMenu ? (
                        <ChevronRight
                            size={Number(tokens.text.rightChevron.width) || 16}
                            color={tokens.text.rightChevron.color}
                        />
                    ) : null}
                </View>

                {/* Sub-label row */}
                {secondaryText ? (
                    <View style={{ width: '100%' }}>
                        <Text
                            fontSize={tokens.text.subText.fontSize}
                            fontWeight={tokens.text.subText.fontWeight}
                            lineHeight={tokens.text.subText.lineHeight}
                            color={tokens.text.subText.color[state]}
                            numberOfLines={1}
                        >
                            {secondaryText}
                        </Text>
                    </View>
                ) : null}
            </Pressable>
        )
    }
)

export const DropdownItem = memo(DropdownItemImpl)
DropdownItem.displayName = 'DropdownItem'
