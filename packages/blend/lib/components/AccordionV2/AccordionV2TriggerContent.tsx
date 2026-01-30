import * as React from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { AccordionV2Chevron } from './AccordionV2Chevron'
import { AccordionV2ChevronPosition } from './accordionV2.types'
import { AccordionV2TokensType } from './accordionV2.tokens'
import { addPxToValue } from '../../global-utils/GlobalUtils'

type AccordionV2TriggerContentProps = {
    title: string
    subtext?: string
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    subtextSlot?: React.ReactNode
    isDisabled: boolean
    isExpanded: boolean
    chevronPosition: AccordionV2ChevronPosition
    accordionTokens: AccordionV2TokensType
    isSmallScreen: boolean
}

const getAriaHidden = (slot: React.ReactNode): boolean | undefined => {
    if (!React.isValidElement(slot)) return true
    const props = slot.props as Record<string, unknown>
    return props['aria-label'] ? undefined : true
}

const ChevronContainer: React.FC<{
    position: 'left' | 'right'
    isExpanded: boolean
    isDisabled: boolean
    chevronPosition: AccordionV2ChevronPosition
    accordionTokens: AccordionV2TokensType
}> = ({
    position,
    isExpanded,
    isDisabled,
    chevronPosition,
    accordionTokens,
}) => {
    const isLeft = position === 'left'
    const isRight = position === 'right'
    const shouldShow =
        (isLeft && chevronPosition === AccordionV2ChevronPosition.LEFT) ||
        (isRight && chevronPosition === AccordionV2ChevronPosition.RIGHT)

    if (!shouldShow) return null

    return (
        <Block
            data-element="chevron-icon"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            aria-hidden="true"
            {...(isRight && {
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
            })}
        >
            <AccordionV2Chevron
                isExpanded={isExpanded}
                isDisabled={isDisabled}
                position={chevronPosition}
                accordionTokens={accordionTokens}
            />
        </Block>
    )
}

const SlotContainer: React.FC<{
    slot: React.ReactNode
    dataElement: string
    accordionTokens: AccordionV2TokensType
}> = ({ slot, dataElement, accordionTokens }) => {
    if (!slot) return null

    return (
        <Block
            data-element={dataElement}
            flexShrink={0}
            display="flex"
            height={accordionTokens.trigger.slot.height}
            width={accordionTokens.trigger.slot.height}
            aria-hidden={getAriaHidden(slot)}
        >
            {slot}
        </Block>
    )
}

export const AccordionV2TriggerContent: React.FC<
    AccordionV2TriggerContentProps
> = ({
    title,
    subtext,
    leftSlot,
    rightSlot,
    subtextSlot,
    isDisabled,
    isExpanded,
    chevronPosition,
    accordionTokens,
    isSmallScreen,
}) => {
    const isChevronLeft = chevronPosition === AccordionV2ChevronPosition.LEFT
    const showLeftSlot = leftSlot && !isChevronLeft

    return (
        <Block width="100%" position="relative">
            <Block
                display="flex"
                alignItems="flex-start"
                width="100%"
                gap={accordionTokens.trigger.content.gap}
            >
                <ChevronContainer
                    position="left"
                    isExpanded={isExpanded}
                    isDisabled={isDisabled}
                    chevronPosition={chevronPosition}
                    accordionTokens={accordionTokens}
                />

                <Block
                    flexGrow={isChevronLeft ? 1 : 0}
                    display="flex"
                    flexDirection="column"
                    gap={accordionTokens.trigger.text.gap}
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap={accordionTokens.trigger.content.gap}
                    >
                        {showLeftSlot && (
                            <SlotContainer
                                slot={leftSlot}
                                dataElement="leading-icon"
                                accordionTokens={accordionTokens}
                            />
                        )}

                        <PrimitiveText
                            fontSize={
                                accordionTokens.trigger.text.title.fontSize
                            }
                            fontWeight={
                                accordionTokens.trigger.text.title.fontWeight
                            }
                            lineHeight={addPxToValue(
                                accordionTokens.trigger.text.title.lineHeight
                            )}
                            color={
                                isDisabled
                                    ? accordionTokens.trigger.text.title.color
                                          .disabled
                                    : accordionTokens.trigger.text.title.color
                                          .default
                            }
                            data-element="accordion-item-header"
                            data-id={title || 'accordion-item-header'}
                        >
                            {title}
                        </PrimitiveText>

                        {rightSlot && (
                            <SlotContainer
                                slot={rightSlot}
                                dataElement="trailing-icon"
                                accordionTokens={accordionTokens}
                            />
                        )}
                    </Block>

                    {(subtext || subtextSlot) && (
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={accordionTokens.trigger.text.subtext.gap}
                        >
                            {subtext && !isSmallScreen && (
                                <PrimitiveText
                                    data-element="accordion-item-subtext"
                                    data-id={subtext}
                                    fontSize={
                                        accordionTokens.trigger.text.subtext
                                            .fontSize
                                    }
                                    color={
                                        isDisabled
                                            ? accordionTokens.trigger.text
                                                  .subtext.color.disabled
                                            : accordionTokens.trigger.text
                                                  .subtext.color.default
                                    }
                                >
                                    {subtext}
                                </PrimitiveText>
                            )}
                            {subtextSlot && (
                                <Block
                                    flexShrink={0}
                                    height={accordionTokens.trigger.slot.height}
                                    width={accordionTokens.trigger.slot.height}
                                >
                                    {subtextSlot}
                                </Block>
                            )}
                        </Block>
                    )}
                </Block>

                <ChevronContainer
                    position="right"
                    isExpanded={isExpanded}
                    isDisabled={isDisabled}
                    chevronPosition={chevronPosition}
                    accordionTokens={accordionTokens}
                />
            </Block>
        </Block>
    )
}
