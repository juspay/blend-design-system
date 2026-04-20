import React from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import {
    MultiSelectV2Size,
    MultiSelectV2Variant,
    type MultiSelectV2GroupType,
    type MultiSelectV2ItemType,
} from './multiSelectV2.types'
import MultiSelectV2MenuItem from './MultiSelectV2MenuItem'

export type MultiSelectV2MenuItemsProps = {
    filteredItems: MultiSelectV2GroupType[]
    allItemsFlat: MultiSelectV2ItemType[]
    selected: string[]
    onSelect: (value: string) => void
    maxSelections?: number
    tokens: MultiSelectV2TokensType
    size: MultiSelectV2Size
    variant: MultiSelectV2Variant
}

const MultiSelectV2MenuItems = ({
    filteredItems,
    allItemsFlat,
    selected,
    onSelect,
    maxSelections,
    tokens,
    size,
    variant,
}: MultiSelectV2MenuItemsProps) => (
    <Block
        style={{
            paddingTop: tokens.menu.padding[size][variant].top,
            paddingRight: tokens.menu.padding[size][variant].right,
            paddingBottom: tokens.menu.padding[size][variant].bottom,
            paddingLeft: tokens.menu.padding[size][variant].left,
        }}
    >
        {filteredItems.map((group, groupId) => {
            const groupStartIndex = filteredItems
                .slice(0, groupId)
                .reduce((acc, g) => acc + g.items.length, 0)

            return (
                <React.Fragment key={groupId}>
                    {group.groupLabel && (
                        <RadixMenu.Label asChild>
                            <PrimitiveText
                                fontSize={
                                    tokens.menu.item.optionsLabel.fontSize
                                }
                                fontWeight={
                                    tokens.menu.item.optionsLabel.fontWeight
                                }
                                style={{
                                    paddingTop:
                                        tokens.menu.item.optionsLabel
                                            .paddingTop,
                                    paddingRight:
                                        tokens.menu.item.optionsLabel
                                            .paddingRight,
                                    paddingBottom:
                                        tokens.menu.item.optionsLabel
                                            .paddingBottom,
                                    paddingLeft:
                                        tokens.menu.item.optionsLabel
                                            .paddingLeft,
                                }}
                                userSelect="none"
                                textTransform="uppercase"
                                color={
                                    tokens.menu.item.optionsLabel.color.default
                                }
                            >
                                {group.groupLabel}
                            </PrimitiveText>
                        </RadixMenu.Label>
                    )}
                    {group.items.map((item, itemIndex) => (
                        <MultiSelectV2MenuItem
                            key={`${groupId}-${itemIndex}`}
                            selected={selected}
                            item={item}
                            onSelect={onSelect}
                            maxSelections={maxSelections}
                            allItems={allItemsFlat}
                            index={groupStartIndex + itemIndex}
                        />
                    ))}
                    {groupId !== filteredItems.length - 1 &&
                        group.showSeparator && (
                            <RadixMenu.Separator asChild>
                                <Block
                                    height={tokens.menu.item.seperator.height}
                                    backgroundColor={
                                        tokens.menu.item.seperator.color
                                    }
                                    margin={tokens.menu.item.seperator.margin}
                                />
                            </RadixMenu.Separator>
                        )}
                </React.Fragment>
            )
        })}
    </Block>
)

MultiSelectV2MenuItems.displayName = 'MultiSelectV2MenuItems'

export default MultiSelectV2MenuItems
