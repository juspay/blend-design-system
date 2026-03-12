import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import VirtualList from '../VirtualList/VirtualList'
import type { VirtualListItem } from '../VirtualList/types'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import type {
    FlattenedMultiSelectV2Item,
    MultiSelectV2ItemType,
} from './multiSelectV2.types'
import MultiSelectV2MenuItem from './MultiSelectV2MenuItem'

export type MultiSelectV2MenuVirtualListProps = {
    flattenedItems: FlattenedMultiSelectV2Item[]
    itemIndexMap: Map<string, number>
    allItemsFlat: MultiSelectV2ItemType[]
    selected: string[]
    onSelect: (value: string) => void
    maxSelections?: number
    tokens: MultiSelectV2TokensType
    height: number
    itemHeight: number
    overscan?: number
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
}

const MultiSelectV2MenuVirtualList = ({
    flattenedItems,
    itemIndexMap,
    allItemsFlat,
    selected,
    onSelect,
    maxSelections,
    tokens,
    height,
    itemHeight,
    overscan = 5,
    onEndReached,
    endReachedThreshold,
    hasMore,
}: MultiSelectV2MenuVirtualListProps) => (
    <Block
        style={{
            paddingTop: tokens.menu.list?.paddingTop ?? tokens.menu.item.gap,
            paddingRight: tokens.menu.list?.paddingRight,
            paddingBottom: tokens.menu.list?.paddingBottom,
            paddingLeft: tokens.menu.list?.paddingLeft,
        }}
    >
        <VirtualList
            items={flattenedItems as VirtualListItem[]}
            height={height}
            itemHeight={itemHeight}
            overscan={overscan}
            onEndReached={onEndReached}
            endReachedThreshold={endReachedThreshold}
            hasMore={hasMore}
            renderItem={({ item: flatItem }) => {
                const typed = flatItem as FlattenedMultiSelectV2Item

                if (typed.type === 'label') {
                    return (
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
                                    margin: 0,
                                    width: '100%',
                                }}
                                userSelect="none"
                                textTransform="uppercase"
                                color={
                                    tokens.menu.item.optionsLabel.color.default
                                }
                            >
                                {typed.label}
                            </PrimitiveText>
                        </RadixMenu.Label>
                    )
                }

                if (typed.type === 'separator') {
                    return (
                        <RadixMenu.Separator asChild>
                            <Block
                                height={tokens.menu.item.seperator.height}
                                backgroundColor={
                                    tokens.menu.item.seperator.color
                                }
                                width="100%"
                            />
                        </RadixMenu.Separator>
                    )
                }

                if (typed.type === 'item' && typed.item) {
                    const itemIndex = itemIndexMap.get(typed.id) ?? 0
                    return (
                        <Block width="100%" style={{ minWidth: 0 }}>
                            <MultiSelectV2MenuItem
                                selected={selected}
                                item={typed.item}
                                onSelect={onSelect}
                                maxSelections={maxSelections}
                                allItems={allItemsFlat}
                                index={itemIndex}
                            />
                        </Block>
                    )
                }

                return null
            }}
        />
    </Block>
)

MultiSelectV2MenuVirtualList.displayName = 'MultiSelectV2MenuVirtualList'

export default MultiSelectV2MenuVirtualList
