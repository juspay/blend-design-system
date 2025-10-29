import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { type CSSObject } from 'styled-components'
import {
    type TooltipProps,
    TooltipAlign,
    TooltipSide,
    TooltipSize,
    TooltipSlotDirection,
} from './types'
import type { TooltipTokensType } from './tooltip.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const Arrow = styled(RadixTooltip.Arrow)<{
    $color: CSSObject['backgroundColor']
}>`
    fill: ${({ $color }) => $color};
`

export const Tooltip = ({
    children: trigger,
    content,
    side = TooltipSide.TOP,
    align = TooltipAlign.CENTER,
    showArrow = true,
    size = TooltipSize.SMALL,
    slot,
    slotDirection = TooltipSlotDirection.LEFT,
    delayDuration = 300,
    offset = 5,
    open,
    maxWidth,
}: TooltipProps) => {
    const tooltipTokens = useResponsiveTokens<TooltipTokensType>('TOOLTIP')
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root open={open}>
                <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
                {content && (
                    <RadixTooltip.Portal>
                        <RadixTooltip.Content
                            side={side}
                            align={align}
                            sideOffset={offset}
                            style={{ zIndex: 9999 }}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                overflow="hidden"
                                backgroundColor={tooltipTokens.background}
                                padding={tooltipTokens.padding[size]}
                                borderRadius={tooltipTokens.borderRadius[size]}
                                maxWidth={
                                    maxWidth || tooltipTokens.maxWidth[size]
                                }
                                width="fit-content"
                                gap={tooltipTokens.gap[size]}
                            >
                                {slot &&
                                    slotDirection ===
                                        TooltipSlotDirection.LEFT && (
                                        <Block contentCentered flexShrink={0}>
                                            {slot}
                                        </Block>
                                    )}
                                <Block flexGrow={1} overflow="hidden">
                                    <PrimitiveText
                                        color={tooltipTokens.text.color}
                                        fontSize={
                                            tooltipTokens.text.fontSize[size]
                                        }
                                        fontWeight={
                                            tooltipTokens.text.fontWeight[size]
                                        }
                                        lineHeight={
                                            tooltipTokens.text.lineHeight[size]
                                        }
                                    >
                                        {content}
                                    </PrimitiveText>
                                </Block>

                                {slot &&
                                    slotDirection ===
                                        TooltipSlotDirection.RIGHT && (
                                        <Block contentCentered flexShrink={0}>
                                            {slot}
                                        </Block>
                                    )}
                            </Block>
                            {showArrow && (
                                <Arrow
                                    offset={8}
                                    $color={tooltipTokens.background}
                                />
                            )}
                        </RadixTooltip.Content>
                    </RadixTooltip.Portal>
                )}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip
