import * as RadixTooltip from '@radix-ui/react-tooltip'
import styled, { type CSSObject } from 'styled-components'
import { isValidElement, useState, type CSSProperties } from 'react'
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
import { formatTextWithLineBreaks } from '../../global-utils/GlobalUtils'

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
    fullWidth = false,
    disableInteractive = false,
}: TooltipProps) => {
    const tooltipTokens = useResponsiveTokens<TooltipTokensType>('TOOLTIP')
    const isControlled = open !== undefined
    const [isArmed, setIsArmed] = useState(false)
    // Radix TooltipTrigger composes a useState setter into an unstable ref.
    // React 19's ref cleanup then loops when many Roots mount at once (e.g.
    // truncated labels in a filter list). Arm Radix only for the active
    // tooltip.
    const shouldMountRadix = isControlled ? open === true : isArmed

    const arm = () => {
        if (!isControlled) setIsArmed(true)
    }
    const disarm = () => {
        if (!isControlled) setIsArmed(false)
    }

    const isNativeElement =
        isValidElement(trigger) && typeof trigger.type === 'string'
    const shouldWrapTrigger = !isNativeElement
    const triggerHostStyle: CSSProperties = {
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : 'auto',
    }

    const wrappedTrigger = shouldWrapTrigger ? (
        <span
            style={triggerHostStyle}
            onPointerEnter={arm}
            onPointerLeave={disarm}
            onFocus={arm}
            onBlur={disarm}
        >
            {trigger}
        </span>
    ) : (
        trigger
    )

    if (!shouldMountRadix) {
        if (shouldWrapTrigger) {
            return wrappedTrigger
        }
        return (
            <span style={triggerHostStyle} onPointerEnter={arm} onFocus={arm}>
                {trigger}
            </span>
        )
    }

    return (
        <RadixTooltip.Provider
            delayDuration={delayDuration}
            disableHoverableContent={disableInteractive}
        >
            <RadixTooltip.Root {...(isControlled ? { open } : {})}>
                <RadixTooltip.Trigger
                    asChild
                    onPointerLeave={disarm}
                    onBlur={disarm}
                >
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
                                borderRadius={tooltipTokens.borderRadius[size]}
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
                                        TooltipSlotDirection.LEFT && (
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
                                            tooltipTokens.text.fontSize[size]
                                        }
                                        fontWeight={
                                            tooltipTokens.text.fontWeight[size]
                                        }
                                        lineHeight={
                                            tooltipTokens.text.lineHeight[size]
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
