import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { type CSSObject } from 'styled-components'
import { cloneElement, forwardRef, isValidElement } from 'react'
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

const TOOLTIP_Z_INDEX = 9999
const TOOLTIP_ARROW_OFFSET = 8

const textOverflowStyle: React.CSSProperties = {
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
}

const Arrow = styled(RadixTooltip.Arrow)<{
    $color: CSSObject['backgroundColor']
}>`
    fill: ${({ $color }) => $color};
`

const AnimatedTooltipContent = styled(RadixTooltip.Content)`
    ${tooltipV2ContentAnimations}
`

const TooltipSlotBlock = ({
    'data-element': dataElement,
    children,
}: {
    'data-element': string
    children: React.ReactNode
}) => (
    <Block
        data-element={dataElement}
        contentCentered
        flexShrink={0}
        role="presentation"
        aria-hidden="true"
    >
        {children}
    </Block>
)

export const TooltipV2 = forwardRef<
    HTMLButtonElement | HTMLDivElement,
    TooltipV2Props
>(
    (
        {
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
        },
        ref
    ) => {
        const tooltipTokens =
            useResponsiveTokens<TooltipV2TokensType>('TOOLTIPV2')

        const isNativeElement =
            isValidElement(trigger) && typeof trigger.type === 'string'
        const shouldWrapTrigger = !isNativeElement

        const triggerStyle = {
            display: fullWidth ? 'flex' : 'inline-flex',
            width: fullWidth ? '100%' : 'auto',
        } as const

        const wrappedTrigger = shouldWrapTrigger ? (
            <span ref={ref} style={triggerStyle}>
                {trigger}
            </span>
        ) : isValidElement(trigger) && ref ? (
            cloneElement(trigger, { ref } as {
                ref: React.Ref<HTMLButtonElement | HTMLDivElement>
            })
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
                                data-tooltip="tooltip"
                                side={side}
                                align={align}
                                sideOffset={offset}
                                style={{ zIndex: TOOLTIP_Z_INDEX }}
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
                                        ...textOverflowStyle,
                                        hyphens: 'auto',
                                        minWidth: 0,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {slot &&
                                        slotDirection ===
                                            TooltipV2SlotDirection.LEFT && (
                                            <TooltipSlotBlock data-element="leading-icon">
                                                {slot}
                                            </TooltipSlotBlock>
                                        )}
                                    <Block
                                        flexGrow={1}
                                        minWidth={0}
                                        style={{ maxWidth: '100%' }}
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
                                                ...textOverflowStyle,
                                                whiteSpace: 'normal',
                                            }}
                                        >
                                            {formatTextWithLineBreaks(content)}
                                        </PrimitiveText>
                                    </Block>

                                    {slot &&
                                        slotDirection ===
                                            TooltipV2SlotDirection.RIGHT && (
                                            <TooltipSlotBlock data-element="trailing-icon">
                                                {slot}
                                            </TooltipSlotBlock>
                                        )}
                                </Block>
                                {showArrow && (
                                    <Arrow
                                        offset={TOOLTIP_ARROW_OFFSET}
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
