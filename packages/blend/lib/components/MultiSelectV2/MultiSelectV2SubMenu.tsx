import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import type { MultiSelectV2ItemType } from './types'
import MultiSelectV2MenuItem from './MultiSelectV2MenuItem'

const MenuItemSlot = ({ slot }: { slot: React.ReactNode }) => (
    <Block flexShrink={0} height="auto" contentCentered>
        {slot}
    </Block>
)

type MultiSelectV2SubMenuProps = {
    item: MultiSelectV2ItemType
    onSelect: (value: string) => void
    selected: string[]
    maxSelections?: number
}

const MultiSelectV2SubMenu = ({
    item,
    onSelect,
    selected,
    maxSelections,
}: MultiSelectV2SubMenuProps) => {
    const multiSelectTokens =
        useResponsiveTokens<MultiSelectV2TokensType>('MULTI_SELECT')

    return (
        <RadixMenu.Sub>
            <RadixMenu.SubTrigger asChild>
                <Block
                    alignItems="center"
                    padding="8px 6px"
                    margin="0px 6px"
                    borderRadius={4}
                    outline="none"
                    border="none"
                    backgroundColor={
                        multiSelectTokens.menu.item.backgroundColor.default
                    }
                    _hover={{
                        backgroundColor:
                            multiSelectTokens.menu.item.backgroundColor.hover,
                    }}
                    _active={{
                        backgroundColor:
                            multiSelectTokens.menu.item.backgroundColor.active,
                    }}
                    _focus={{
                        backgroundColor:
                            multiSelectTokens.menu.item.backgroundColor.focus,
                    }}
                    _focusVisible={{
                        backgroundColor:
                            multiSelectTokens.menu.item.backgroundColor
                                .focusVisible,
                    }}
                    style={{ userSelect: 'none' }}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={8}
                        justifyContent="space-between"
                    >
                        <Block
                            as="span"
                            display="flex"
                            alignItems="center"
                            gap={8}
                            flexGrow={1}
                        >
                            {item.slot1 && <MenuItemSlot slot={item.slot1} />}
                            <PrimitiveText
                                fontSize={
                                    multiSelectTokens.menu.item.option.fontSize
                                }
                                fontWeight={
                                    multiSelectTokens.menu.item.option
                                        .fontWeight
                                }
                                color={
                                    multiSelectTokens.menu.item.option.color
                                        .default
                                }
                                truncate
                            >
                                {item.label}
                            </PrimitiveText>
                        </Block>
                        {item.slot2 && <MenuItemSlot slot={item.slot2} />}
                        {item.slot3 && <MenuItemSlot slot={item.slot3} />}
                        {item.slot4 && <MenuItemSlot slot={item.slot4} />}
                        <Block flexShrink={0} size={20} contentCentered>
                            <ChevronRight
                                size={16}
                                color={multiSelectTokens.subLabel.color.default}
                            />
                        </Block>
                    </Block>
                </Block>
            </RadixMenu.SubTrigger>
            <RadixMenu.SubContent avoidCollisions sideOffset={8} asChild>
                <Block
                    backgroundColor={multiSelectTokens.menu.backgroundColor}
                    borderRadius={8}
                    padding="8px 0px"
                    boxShadow={multiSelectTokens.trigger.boxShadow.container}
                    border={`1px solid ${multiSelectTokens.menu.border as string}`}
                >
                    {item.subMenu?.map((subItem, subIdx) => (
                        <MultiSelectV2MenuItem
                            key={subIdx}
                            item={subItem}
                            onSelect={onSelect}
                            selected={selected}
                            maxSelections={maxSelections}
                        />
                    ))}
                </Block>
            </RadixMenu.SubContent>
        </RadixMenu.Sub>
    )
}

export default MultiSelectV2SubMenu
