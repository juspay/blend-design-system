import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled from 'styled-components'
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
import {
    formatTextWithLineBreaks,
    composeRefs,
} from '../../global-utils/GlobalUtils'
const TOOLTIP_Z_INDEX = 9999

const textOverflowStyle: React.CSSProperties = {
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
}

const Arrow = styled(RadixTooltip.Arrow)<{
    $color: React.CSSProperties['backgroundColor']
}>`
    fill: ${({ $color }) => $color};
`

const AnimatedTooltipContent = styled(RadixTooltip.Content)`
    ${tooltipV2ContentAnimations}
`

const tooltipSlotBlockStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
}

const TooltipSlotBlock = forwardRef<
    HTMLElement,
    { 'data-element': string; children: React.ReactNode }
>(({ 'data-element': dataElement, children }, ref) => (
    <div
        ref={ref as React.Ref<HTMLDivElement>}
        data-element={dataElement}
        role="presentation"
        aria-hidden="true"
        style={tooltipSlotBlockStyle}
    >
        {children}
    </div>
))

TooltipSlotBlock.displayName = 'TooltipSlotBlock'

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
            onOpenChange,
            maxWidth,
            disableInteractive = false,
        },
        ref
    ) => {
        const tooltipTokens =
            useResponsiveTokens<TooltipV2TokensType>('TOOLTIPV2')

        const triggerNode =
            ref != null && isValidElement(trigger)
                ? cloneElement(trigger, {
                      ref: composeRefs<HTMLButtonElement | HTMLDivElement>(
                          ref,
                          (
                              trigger as React.ReactElement & {
                                  ref?: React.Ref<
                                      HTMLButtonElement | HTMLDivElement
                                  >
                              }
                          ).ref
                      ),
                  } as React.Attributes & {
                      ref: React.Ref<HTMLButtonElement | HTMLDivElement>
                  })
                : trigger

        return (
            <RadixTooltip.Provider
                delayDuration={delayDuration}
                disableHoverableContent={disableInteractive}
            >
                <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
                    <RadixTooltip.Trigger asChild>
                        {triggerNode}
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
                                        offset={offset}
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
