import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { MenuItem } from './SingleSelectV2MenuItems'
import type { MenuListProps } from './SingleSelectV2.types'
import { getMenuItemIndex } from './utils'

const GroupLabel = styled(RadixMenu.Label)`
    user-select: none;
    text-transform: uppercase;
    overflow: clip;
`

const SingleSelectV2List = ({
    filteredItems,
    selected,
    onSelect,
    singleSelectTokens,
    size,
    variant,
    enableSearch,
}: MenuListProps) => {
    const menuGroupLabel = singleSelectTokens.menu.groupLabel
    const menuItem = singleSelectTokens.menu.item
    const menuPadding = singleSelectTokens.menu.padding[size][variant]

    return (
        <Block
            data-element="menu-content"
            style={{
                paddingInline: menuPadding.paddingInline,
                paddingBlock: menuPadding.paddingBlock,
                paddingTop: enableSearch ? 0 : menuPadding.paddingBlock,
            }}
        >
            {filteredItems.map((group, groupId) => (
                <Block key={groupId}>
                    {group.groupLabel && (
                        <GroupLabel
                            data-element="menu-group-label"
                            style={{
                                margin: menuGroupLabel.margin,
                                padding: menuGroupLabel.padding,
                            }}
                        >
                            <Text
                                fontSize={menuItem.groupLabelText.fontSize}
                                color={menuItem.groupLabelText.color.default}
                                fontWeight={menuItem.groupLabelText.fontWeight}
                            >
                                {group.groupLabel}
                            </Text>
                        </GroupLabel>
                    )}
                    {group.items.map((item, itemIndex) => (
                        <MenuItem
                            key={`${groupId}-${itemIndex}`}
                            item={item}
                            selected={selected}
                            onSelect={onSelect}
                            singleSelectTokens={singleSelectTokens}
                            index={getMenuItemIndex(
                                filteredItems,
                                groupId,
                                itemIndex
                            )}
                        />
                    ))}
                    {groupId !== filteredItems.length - 1 &&
                        group.showSeparator && (
                            <RadixMenu.Separator asChild>
                                <Block
                                    height={menuItem.separator.height}
                                    backgroundColor={menuItem.separator.color}
                                    margin={menuItem.separator.margin}
                                />
                            </RadixMenu.Separator>
                        )}
                </Block>
            ))}
        </Block>
    )
}

export default SingleSelectV2List
