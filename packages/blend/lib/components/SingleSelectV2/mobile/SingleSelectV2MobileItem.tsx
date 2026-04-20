import { Check } from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import type { SingleSelectV2TokensType } from '../singleSelectV2.tokens'
import type { SingleSelectV2ItemType } from '../singleSelectV2.types'

type SingleSelectV2MobileItemProps = {
    item: SingleSelectV2ItemType
    isSelected: boolean
    onSelect: (value: string) => void
    itemTokens: SingleSelectV2TokensType['menu']['item']
}

const SingleSelectV2MobileItem = ({
    item,
    isSelected,
    onSelect,
    itemTokens,
}: SingleSelectV2MobileItemProps) => {
    const colorState = isSelected ? 'selected' : 'default'

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={itemTokens.gap}
            style={{
                paddingTop: itemTokens.paddingTop,
                paddingRight: itemTokens.paddingRight,
                paddingBottom: itemTokens.paddingBottom,
                paddingLeft: itemTokens.paddingLeft,
                transition: 'background-color 0.15s ease-in-out',
            }}
            margin={itemTokens.margin}
            borderRadius={itemTokens.borderRadius}
            cursor={item.disabled ? 'not-allowed' : 'pointer'}
            backgroundColor={
                item.disabled
                    ? itemTokens.backgroundColor.disabled
                    : isSelected
                      ? itemTokens.backgroundColor.selected
                      : itemTokens.backgroundColor.default
            }
            _hover={{
                backgroundColor: itemTokens.backgroundColor.hover,
            }}
            onClick={() => {
                if (!item.disabled) {
                    onSelect(item.value)
                }
            }}
        >
            <Block
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={8}
            >
                <Block display="flex" alignItems="center" gap={8} flexGrow={1}>
                    {item.slot1 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot1}
                        </Block>
                    )}
                    <Text
                        variant="body.md"
                        fontSize={itemTokens.option.fontSize}
                        fontWeight={itemTokens.option.fontWeight}
                        color={
                            item.disabled
                                ? itemTokens.option.color.disabled
                                : itemTokens.option.color[colorState]
                        }
                        truncate
                    >
                        {item.label}
                    </Text>
                </Block>
                <Block
                    display="flex"
                    alignItems="center"
                    gap={4}
                    flexShrink={0}
                >
                    {item.slot2 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot2}
                        </Block>
                    )}
                    {item.slot3 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot3}
                        </Block>
                    )}
                    {item.slot4 && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            {item.slot4}
                        </Block>
                    )}
                    {isSelected && (
                        <Block flexShrink={0} height="auto" contentCentered>
                            <Check
                                size={16}
                                color={itemTokens.option.color.selected}
                            />
                        </Block>
                    )}
                </Block>
            </Block>
            {item.subLabel && (
                <Block display="flex" alignItems="center" width="100%">
                    <Text
                        variant="body.sm"
                        fontSize={itemTokens.description.fontSize}
                        fontWeight={itemTokens.description.fontWeight}
                        color={itemTokens.description.color[colorState]}
                    >
                        {item.subLabel}
                    </Text>
                </Block>
            )}
        </Block>
    )
}

export default SingleSelectV2MobileItem
