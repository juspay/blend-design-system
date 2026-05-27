import type { ButtonHTMLAttributes } from 'react'
import { SidebarV2TokensType } from './sidebarV2.tokens'
import type { SecondarySidebarInfo, SecondarySidebarItem } from './types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { TooltipV2, TooltipV2Side, TooltipV2Size } from '../TooltipV2'
import { Badge, BadgeColor, BadgeSize } from '../Badge'
import styled from 'styled-components'

const ScrollableContainer = styled(Block)`
    &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
`

type Props = {
    id: string
    secondarySidebar?: SecondarySidebarInfo
    tokens: SidebarV2TokensType
}

type SecondarySidebarItemButtonProps = {
    item: SecondarySidebarItem
    isSelected: boolean
    onSelect: (value: string) => void
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
    tokens: SidebarV2TokensType
}

function SecondarySidebarItemButton({
    item,
    isSelected,
    onSelect,
    buttonProps,
    tokens,
}: SecondarySidebarItemButtonProps) {
    const itemButton = (
        <PrimitiveButton
            {...buttonProps}
            type="button"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={tokens.secondarySidebar.item.width}
            height={tokens.secondarySidebar.item.height}
            borderRadius={tokens.secondarySidebar.item.borderRadius}
            border={
                isSelected
                    ? tokens.secondarySidebar.item.border.active
                    : tokens.secondarySidebar.item.border.default
            }
            _hover={{
                backgroundColor:
                    tokens.secondarySidebar.item.backgroundColor.hover,
                outline: 'none',
                border: isSelected
                    ? tokens.secondarySidebar.item.border.active
                    : tokens.secondarySidebar.item.border.hover,
            }}
            onClick={(e) => {
                onSelect(item.value)
                buttonProps?.onClick?.(e)
            }}
            aria-label={`Select tenant: ${item.label}`}
            aria-pressed={isSelected}
        >
            <span aria-hidden="true">{item.icon}</span>
        </PrimitiveButton>
    )

    const trigger = item.badge ? (
        <Badge
            text={item.badge.text}
            size={item.badge.size || BadgeSize.SM}
            color={item.badge.color || BadgeColor.PRIMARY}
            position={item.badge.position || 'bottom-right'}
            isCircular
        >
            {itemButton}
        </Badge>
    ) : (
        itemButton
    )

    return (
        <TooltipV2
            content={item.label}
            side={TooltipV2Side.RIGHT}
            delayDuration={500}
            size={TooltipV2Size.SM}
        >
            {trigger}
        </TooltipV2>
    )
}

export function SecondarySidebar({ id, secondarySidebar, tokens }: Props) {
    if (!secondarySidebar || (secondarySidebar?.items?.length ?? 0) === 0) {
        return null
    }

    const { items, footerSlot, selected, onSelect, buttonProps } =
        secondarySidebar
    const isSelected = (value: string) => value === selected

    return (
        <Block
            id={id}
            data-element="secondary-sidebar"
            width={tokens.secondarySidebar.width}
            height="100%"
            borderRight={tokens.secondarySidebar.borderRight}
            backgroundColor={tokens.secondarySidebar.backgroundColor}
            display="flex"
            flexDirection="column"
            gap={tokens.secondarySidebar.gap}
            alignItems="center"
            paddingTop={tokens.secondarySidebar.paddingTop}
            paddingBottom={tokens.secondarySidebar.paddingBottom}
            paddingLeft={tokens.secondarySidebar.paddingLeft}
            paddingRight={tokens.secondarySidebar.paddingRight}
        >
            <ScrollableContainer
                data-element="secondary-sidebar-items"
                display="flex"
                flexDirection="column"
                gap={tokens.secondarySidebar.gap}
                alignItems="center"
                flexGrow={1}
                overflowY="auto"
                style={{ minHeight: 0 }}
            >
                {items?.map((item) => (
                    <SecondarySidebarItemButton
                        key={item.value}
                        item={item}
                        isSelected={isSelected(item.value)}
                        onSelect={onSelect}
                        buttonProps={buttonProps}
                        tokens={tokens}
                    />
                ))}
            </ScrollableContainer>

            {footerSlot && (
                <Block
                    marginTop="auto"
                    display="flex"
                    flexDirection="column"
                    gap={tokens.secondarySidebar.gap}
                    alignItems="center"
                    flexShrink={0}
                >
                    {footerSlot}
                </Block>
            )}
        </Block>
    )
}
