import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { type CSSObject } from 'styled-components'
import { isValidElement } from 'react'
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
import { tooltipContentAnimations } from './tooltip.animations'

const Arrow = styled(RadixTooltip.Arrow)<{
    $color: CSSObject['backgroundColor']
}>`
    fill: ${({ $color }) => $color};
`

const AnimatedTooltipContent = styled(RadixTooltip.Content)`
    ${tooltipContentAnimations}
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

    const isNativeElement =
        isValidElement(trigger) && typeof trigger.type === 'string'
    const shouldWrapTrigger = !isNativeElement

    const wrappedTrigger = shouldWrapTrigger ? (
        <span style={{ display: 'inline-flex' }}>{trigger}</span>
    ) : (
        trigger
    )
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root open={open}>
                <RadixTooltip.Trigger asChild>
                    {wrappedTrigger}
                </RadixTooltip.Trigger>
                {content && (
                    <RadixTooltip.Portal>
                        <AnimatedTooltipContent
                            data-tooltip={'tooltip'}
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
                                        <Block
                                            contentCentered
                                            flexShrink={0}
                                            role="presentation"
                                            aria-hidden="true"
                                        >
                                            {slot}
                                        </Block>
                                    )}
                                <Block flexGrow={1} overflow="hidden">
                                    <PrimitiveText
                                        data-element="tooltip-text"
                                        data-id={content || 'tooltip-text'}
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
                                        {typeof content === 'string' &&
                                        content.includes('\n')
                                            ? content
                                                  .split('\n')
                                                  .map((line, index, array) => (
                                                      <span key={index}>
                                                          {line}
                                                          {index <
                                                              array.length -
                                                                  1 && <br />}
                                                      </span>
                                                  ))
                                            : content}
                                    </PrimitiveText>
                                </Block>

                                {slot &&
                                    slotDirection ===
                                        TooltipSlotDirection.RIGHT && (
                                        <Block
                                            data-element="trailing-icon"
                                            contentCentered
                                            flexShrink={0}
                                            role="presentation"
                                            aria-hidden="true"
                                        >
                                            {slot}
                                        </Block>
                                    )}
                            </Block>
                            {showArrow && (
                                <Arrow
                                    offset={8}
                                    $color={tooltipTokens.background}
                                    aria-hidden="true"
                                />
                            )}
                        </AnimatedTooltipContent>
                    </RadixTooltip.Portal>
                )}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip
