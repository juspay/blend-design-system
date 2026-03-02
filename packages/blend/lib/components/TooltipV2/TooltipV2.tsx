import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { type CSSObject } from 'styled-components'
import { forwardRef, isValidElement } from 'react'
import {
    type TooltipV2Props,
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
    TooltipV2SlotDirection,
} from './tooltipV2.types'
import type { TooltipV2TokensType } from './tooltipV2.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { tooltipV2ContentAnimations } from './tooltipV2.animation'
import { formatTextWithLineBreaks } from '../../global-utils/GlobalUtils'

const Arrow = styled(RadixTooltip.Arrow)<{
    $color: CSSObject['backgroundColor']
}>`
    fill: ${({ $color }) => $color};
`

const AnimatedTooltipContent = styled(RadixTooltip.Content)`
    ${tooltipV2ContentAnimations}
`

export const TooltipV2 = forwardRef<
    HTMLButtonElement | HTMLDivElement,
    TooltipV2Props
>(
    ({
        children: trigger,
        content,
        side = TooltipV2Side.TOP,
        align = TooltipV2Align.CENTER,
        showArrow = true,
        size = TooltipV2Size.SM,
        slot,
        slotDirection = TooltipV2SlotDirection.LEFT,
        delayDuration = 300,
        offset = 5,
        open,
        maxWidth,
        fullWidth = false,
        disableInteractive = false,
    }) => {
        const tooltipTokens =
            useResponsiveTokens<TooltipV2TokensType>('TOOLTIPV2')

        const isNativeElement =
            isValidElement(trigger) && typeof trigger.type === 'string'
        const shouldWrapTrigger = !isNativeElement

        const wrappedTrigger = shouldWrapTrigger ? (
            <span
                style={{
                    display: fullWidth ? 'flex' : 'inline-flex',
                    width: fullWidth ? '100%' : 'auto',
                }}
            >
                {trigger}
            </span>
        ) : (
            trigger
        )
        return (
            <RadixTooltip.Provider
                delayDuration={delayDuration}
                disableHoverableContent={disableInteractive}
            >
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
                                    backgroundColor={tooltipTokens.background}
                                    padding={tooltipTokens.padding[size]}
                                    borderRadius={
                                        tooltipTokens.borderRadius[size]
                                    }
                                    maxWidth={
                                        maxWidth || tooltipTokens.maxWidth[size]
                                    }
                                    gap={tooltipTokens.gap[size]}
                                    style={{
                                        wordBreak: 'break-word',
                                        overflowWrap: 'anywhere',
                                        hyphens: 'auto',
                                        minWidth: 0,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {slot &&
                                        slotDirection ===
                                            TooltipV2SlotDirection.LEFT && (
                                            <Block
                                                data-element="leading-icon"
                                                contentCentered
                                                flexShrink={0}
                                                role="presentation"
                                                aria-hidden="true"
                                            >
                                                {slot}
                                            </Block>
                                        )}
                                    <Block
                                        flexGrow={1}
                                        minWidth={0}
                                        style={{
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <PrimitiveText
                                            data-element="tooltip-text"
                                            data-id={content || 'tooltip-text'}
                                            color={tooltipTokens.text.color}
                                            fontSize={
                                                tooltipTokens.text.fontSize[
                                                    size
                                                ]
                                            }
                                            fontWeight={
                                                tooltipTokens.text.fontWeight[
                                                    size
                                                ]
                                            }
                                            lineHeight={
                                                tooltipTokens.text.lineHeight[
                                                    size
                                                ]
                                            }
                                            style={{
                                                wordBreak: 'break-word',
                                                overflowWrap: 'anywhere',
                                                whiteSpace: 'normal',
                                            }}
                                        >
                                            {formatTextWithLineBreaks(content)}
                                        </PrimitiveText>
                                    </Block>

                                    {slot &&
                                        slotDirection ===
                                            TooltipV2SlotDirection.RIGHT && (
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
)

TooltipV2.displayName = 'TooltipV2'
export default TooltipV2
