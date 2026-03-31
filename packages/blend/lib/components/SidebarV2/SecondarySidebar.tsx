import { SidebarV2TokensType } from './sidebarV2.tokens'
import type { SecondarySidebarInfo } from './types'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { TooltipV2, TooltipV2Side, TooltipV2Size } from '../TooltipV2'

type Props = {
    id: string
    secondarySidebar?: SecondarySidebarInfo
    tokens: SidebarV2TokensType
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
            {items?.map((item) => (
                <TooltipV2
                    key={item.value}
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
                        borderRadius={tokens.secondarySidebar.item.borderRadius}
                        border={
                            isSelected(item.value)
                                ? tokens.secondarySidebar.item.border.active
                                : tokens.secondarySidebar.item.border.default
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

            {footerSlot && (
                <Block
                    marginTop="auto"
                    display="flex"
                    flexDirection="column"
                    gap={tokens.secondarySidebar.gap}
                    alignItems="center"
                >
                    {footerSlot}
                </Block>
            )}
        </Block>
    )
}
