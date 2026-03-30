import { SidebarV2TokensType } from './sidebarV2.tokens'
import { SecondarySidebarProps as SecondarySidebarConfig } from './sidebarV2.types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { TooltipV2, TooltipV2Side, TooltipV2Size } from '../TooltipV2'

type Props = {
    id: string
    secondarySidebar?: SecondarySidebarConfig
    tokens: SidebarV2TokensType
}

export function SecondarySidebar({ id, secondarySidebar, tokens }: Props) {
    if (!secondarySidebar || secondarySidebar?.items?.length === 0) return null

    const { items, selected, onSelect, buttonProps } = secondarySidebar
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
            paddingTop={tokens.secondarySidebar.padding.top}
            paddingBottom={tokens.secondarySidebar.padding.bottom}
            paddingLeft={tokens.secondarySidebar.padding.left}
            paddingRight={tokens.secondarySidebar.padding.right}
        >
            {items &&
                items?.map((item) => (
                    <TooltipV2
                        key={item.label}
                        content={item.label}
                        side={TooltipV2Side.RIGHT}
                        delayDuration={500}
                        size={TooltipV2Size.SM}
                    >
                        <PrimitiveButton
                            {...buttonProps}
                            cursor="pointer"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={tokens.secondarySidebar.item.width}
                            height={tokens.secondarySidebar.item.height}
                            borderRadius={
                                tokens.secondarySidebar.item.borderRadius
                            }
                            border={
                                isSelected(item.value)
                                    ? tokens.secondarySidebar.item.border.active
                                    : tokens.secondarySidebar.item.border
                                          .default
                            }
                            _hover={{
                                backgroundColor:
                                    tokens.secondarySidebar.item.backgroundColor
                                        .hover,
                                outline: isSelected(item.value)
                                    ? tokens.secondarySidebar.item.border.active
                                    : tokens.secondarySidebar.item.border.hover,
                            }}
                            onClick={(e) => {
                                onSelect?.(item.value)
                                buttonProps?.onClick?.(e)
                            }}
                        >
                            <span aria-hidden="true">{item.icon}</span>
                        </PrimitiveButton>
                    </TooltipV2>
                ))}
        </Block>
    )
}
