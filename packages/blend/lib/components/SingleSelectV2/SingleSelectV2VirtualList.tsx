import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { CSSProperties } from 'react'
import { MenuItem } from './SingleSelectV2MenuItems'
import type { VirtualListProps, FlattenedItem } from './types'
import { getItemOrdinalIndex } from './utils'

const GroupLabel = styled(RadixMenu.Label)`
    user-select: none;
    text-transform: uppercase;
    overflow: clip;
`

const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
}

const SingleSelectV2VirtualList = ({
    flattenedItems,
    selected,
    onSelect,
    singleSelectTokens,
    size,
    variant,
    virtualViewportHeight,
    virtualItems,
    totalSize,
    measureElement,
    loadingComponent,
    hasMore,
    virtualScrollRef,
}: VirtualListProps) => {
    const menuGroupLabel = singleSelectTokens.menu.groupLabel
    const menuItem = singleSelectTokens.menu.item

    const renderVirtualRow = (flatItem: FlattenedItem, flatIndex: number) => {
        if (flatItem.type === 'label') {
            return (
                <Block style={rowStyle}>
                    <GroupLabel
                        style={{
                            margin: menuGroupLabel.margin,
                            padding: menuGroupLabel.padding,
                            width: '100%',
                        }}
                    >
                        <Text
                            fontSize={menuItem.groupLabelText.fontSize}
                            color={menuItem.groupLabelText.color.default}
                            fontWeight={menuItem.groupLabelText.fontWeight}
                        >
                            {flatItem.label}
                        </Text>
                    </GroupLabel>
                </Block>
            )
        }

        if (flatItem.type === 'separator') {
            return (
                <Block style={rowStyle}>
                    <RadixMenu.Separator asChild>
                        <Block
                            height={menuItem.separator.height}
                            backgroundColor={menuItem.separator.color}
                            margin={menuItem.separator.margin}
                            width="100%"
                        />
                    </RadixMenu.Separator>
                </Block>
            )
        }

        if (flatItem.type === 'item' && flatItem.item) {
            const ordinalIndex = getItemOrdinalIndex(flattenedItems, flatIndex)
            return (
                <Block style={rowStyle}>
                    <Block width="100%" style={{ minWidth: 0 }}>
                        <MenuItem
                            item={flatItem.item}
                            selected={selected}
                            onSelect={onSelect}
                            singleSelectTokens={singleSelectTokens}
                            index={ordinalIndex}
                        />
                    </Block>
                </Block>
            )
        }

        return null
    }

    return (
        <Block
            ref={virtualScrollRef}
            data-element="virtual-list"
            style={{
                paddingBlock: 0,
                paddingInline:
                    singleSelectTokens.menu.padding[size][variant]
                        .paddingInline,
                height: virtualViewportHeight,
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    height: `${totalSize}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {virtualItems.map((virtualItem) => (
                    <div
                        key={String(virtualItem.key)}
                        data-index={virtualItem.index}
                        ref={measureElement}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        {renderVirtualRow(
                            flattenedItems[virtualItem.index],
                            virtualItem.index
                        )}
                    </div>
                ))}
            </div>
            {loadingComponent && hasMore && (
                <Block padding={menuItem.padding}>{loadingComponent}</Block>
            )}
        </Block>
    )
}

export default SingleSelectV2VirtualList
