import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import { SelectItemV2 } from '../SelectV2'
import type { SingleSelectV2ItemType } from './types'
import type { SingleSelectV2TokensType } from './singleSelectV2.tokens'
import {
    submenuContentAnimations,
    hoverTransition,
} from './singleSelectV2.animations'

const StyledSubMenu = styled(RadixMenu.Sub)<{
    $padding: string
    $margin: string
}>`
    padding: ${({ $padding }) => $padding};
    margin: ${({ $margin }) => $margin};
`

const SubTrigger = styled(RadixMenu.SubTrigger)<{
    $padding: string
    $margin: string
    $borderRadius: string
    $bgHover: string
    $bgFocus: string
}>`
    align-items: center;
    padding: ${({ $padding }) => $padding};
    margin: ${({ $margin }) => $margin};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    ${hoverTransition}
    &:hover {
        background-color: ${({ $bgHover }) => $bgHover};
    }
    &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &[data-highlighted] {
        border: none;
        outline: none;
        background-color: ${({ $bgFocus }) => $bgFocus};
    }
`

const SubContent = styled(RadixMenu.SubContent)<{
    $backgroundColor: string
    $border: string
    $borderRadius: string
    $padding: string
    $boxShadow: string
}>`
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border: ${({ $border }) => $border};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    padding: ${({ $padding }) => $padding};
    box-shadow: ${({ $boxShadow }) => $boxShadow};
    z-index: 1000;
    ${submenuContentAnimations}
`

export type SubMenuProps = {
    item: SingleSelectV2ItemType
    selected: string
    onSelect: (value: string) => void
    singleSelectTokens: SingleSelectV2TokensType
}

export const SubMenu = ({
    item,
    onSelect,
    selected,
    singleSelectTokens,
}: SubMenuProps) => {
    const sub = singleSelectTokens.menu.submenu
    const triggerPadding = String(sub.trigger.padding ?? '')
    const triggerMargin = String(sub.trigger.margin ?? '')
    const triggerRadius = String(sub.trigger.borderRadius ?? '')
    const bgHover = String(sub.trigger.backgroundColor.hover ?? '')
    const bgFocus = String(sub.trigger.backgroundColor.focus ?? '')
    const contentBg = String(sub.content.backgroundColor ?? '')
    const contentBorder = String(sub.content.border ?? '')
    const contentRadius = String(sub.content.borderRadius ?? '')
    const contentPadding = String(sub.content.padding ?? '')
    const contentShadow = String(sub.content.boxShadow ?? '')
    return (
        <StyledSubMenu $padding={triggerPadding} $margin={triggerMargin}>
            <SubTrigger
                asChild
                $padding={triggerPadding}
                $margin={triggerMargin}
                $borderRadius={triggerRadius}
                $bgHover={bgHover}
                $bgFocus={bgFocus}
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
                        {item.slot1 && (
                            <Block flexShrink={0} height="auto" contentCentered>
                                {item.slot1}
                            </Block>
                        )}
                        <Text
                            variant="body.md"
                            color={sub.optionText.color}
                            fontWeight={sub.optionText.fontWeight}
                            fontSize={sub.optionText.fontSize}
                            truncate
                        >
                            {item.label}
                        </Text>
                    </Block>
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
                    <Block flexShrink={0} size={20} contentCentered>
                        <ChevronRight size={16} color={sub.iconColor} />
                    </Block>
                </Block>
            </SubTrigger>
            <SubContent
                avoidCollisions
                sideOffset={8}
                $backgroundColor={contentBg}
                $border={contentBorder}
                $borderRadius={contentRadius}
                $padding={contentPadding}
                $boxShadow={contentShadow}
            >
                {item.subMenu?.map((subItem, subIdx) => (
                    <MenuItem
                        key={subIdx}
                        item={subItem}
                        onSelect={onSelect}
                        selected={selected}
                        singleSelectTokens={singleSelectTokens}
                    />
                ))}
            </SubContent>
        </StyledSubMenu>
    )
}

export type MenuItemProps = {
    item: SingleSelectV2ItemType
    selected: string
    onSelect: (value: string) => void
    singleSelectTokens?: SingleSelectV2TokensType
    index?: number
}

export const MenuItem = ({
    item,
    onSelect,
    selected,
    singleSelectTokens,
    index,
}: MenuItemProps) => {
    if (item.subMenu) {
        return (
            <SubMenu
                item={item}
                onSelect={onSelect}
                selected={selected}
                singleSelectTokens={singleSelectTokens!}
            />
        )
    }

    if (!singleSelectTokens) return null

    return (
        <SelectItemV2
            item={item}
            onSelect={onSelect}
            selected={selected}
            itemTokens={singleSelectTokens.menu.item}
            index={index}
            showCheckmark
        />
    )
}
