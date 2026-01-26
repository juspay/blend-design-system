'use client'

import * as React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { styled } from 'styled-components'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import {
    type AccordionV2ItemProps,
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from './accordionV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AccordionV2TokensType } from './accordionV2.tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import {
    ChevronAnimation,
    ChevronAnimationDirection,
    ChevronAnimationVariant,
    ChevronAnimationSize,
} from '../animations/ChevronAnimation'
import { FOUNDATION_THEME } from '../../tokens'

const StyledAccordionItem = styled(RadixAccordion.Item)<{
    $accordionType: AccordionV2Type
    $isDisabled: boolean
    $accordionToken: AccordionV2TokensType
    $isSmallScreen: boolean
}>((props) => ({
    border: props.$accordionToken.trigger.border[props.$accordionType].default,
    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    overflow: 'visible',
    ...(props.$isDisabled &&
        props.$accordionType === AccordionV2Type.BORDER && {
            backgroundColor:
                props.$accordionToken.trigger.backgroundColor[
                    props.$accordionType
                ].disabled,
        }),

    ...(props.$isSmallScreen &&
        props.$accordionType === AccordionV2Type.BORDER && {
            '&:first-child': {
                borderBottomLeftRadius: 'unset',
                borderBottomRightRadius: 'unset',
            },

            '&:last-child': {
                borderTop: 'none',
                borderTopLeftRadius: 'unset',
                borderTopRightRadius: 'unset',
            },

            '&:not(:first-child):not(:last-child)': {
                borderTop: 'none',
                borderRadius: 'unset',
            },
        }),
    ...(props.$isSmallScreen &&
        props.$accordionType === AccordionV2Type.NO_BORDER && {
            '&': {
                border: 'none',
                borderRadius: 'unset',
                borderBottom:
                    props.$accordionToken.trigger.border[props.$accordionType]
                        .default,
            },
            '&:last-child': {
                ...(props.$isDisabled && {
                    borderBottom: 'none',
                }),
            },
        }),
}))

const StyledAccordionHeader = styled(RadixAccordion.Header)({
    display: 'flex',
})

const StyledAccordionTrigger = styled(RadixAccordion.Trigger)<{
    $accordionType: AccordionV2Type
    $isDisabled: boolean
    $accordionToken: AccordionV2TokensType
    $isSmallScreen: boolean
    $isFirst?: boolean
    $isLast?: boolean
    $isIntermediate?: boolean
}>((props) => ({
    display: 'flex',
    width: '100%',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    padding: props.$accordionToken.trigger.padding[props.$accordionType],
    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    backgroundColor:
        props.$accordionToken.trigger.backgroundColor[props.$accordionType]
            .default,
    ...(props.$isDisabled && {
        backgroundColor:
            props.$accordionToken.trigger.backgroundColor[props.$accordionType]
                .disabled,
        cursor: 'not-allowed',
    }),
    ...(!props.$isSmallScreen && {
        '&[data-state="open"]': {
            backgroundColor:
                props.$accordionToken.trigger.backgroundColor[
                    props.$accordionType
                ].open,
            ...(props.$accordionType === AccordionV2Type.BORDER && {
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
            }),
        },
    }),
    ...(!props.$isSmallScreen && {
        '&:hover:not(:disabled)': {
            backgroundColor:
                props.$accordionToken.trigger.backgroundColor[
                    props.$accordionType
                ].hover,
        },
    }),

    '&:focus-visible': {
        outline: `2px solid ${FOUNDATION_THEME.colors.primary[500]}`,
        outlineOffset: FOUNDATION_THEME.unit[2],
    },

    ...(props.$accordionType === AccordionV2Type.NO_BORDER &&
        props.$isSmallScreen &&
        props.$isDisabled && {
            ...(props.$isFirst && {
                borderRadius: 'unset',
                borderTopLeftRadius:
                    props.$accordionToken.borderRadius[props.$accordionType],
                borderTopRightRadius:
                    props.$accordionToken.borderRadius[props.$accordionType],
            }),

            ...(props.$isLast && {
                borderRadius: 'unset',
                borderBottomLeftRadius:
                    props.$accordionToken.borderRadius[props.$accordionType],
                borderBottomRightRadius:
                    props.$accordionToken.borderRadius[props.$accordionType],
            }),

            ...(props.$isIntermediate && {
                borderRadius: 'unset',
            }),
        }),
}))

const StyledAccordionContent = styled(RadixAccordion.Content)<{
    $accordionType: AccordionV2Type
    $accordionToken: AccordionV2TokensType
}>((props) => ({
    overflow: 'visible',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    '&[data-state="open"]': {
        animation: 'accordion-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        ...(props.$accordionType === AccordionV2Type.BORDER && {
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
        }),
    },

    '&[data-state="closed"]': {
        animation: 'accordion-up 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },

    '@keyframes accordion-down': {
        from: {
            height: 0,
            opacity: 0,
        },
        to: {
            height: 'var(--radix-accordion-content-height)',
            opacity: 1,
        },
    },

    '@keyframes accordion-up': {
        from: {
            height: 'var(--radix-accordion-content-height)',
            opacity: 1,
        },
        to: {
            height: 0,
            opacity: 0,
        },
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        animation: 'none',
    },
}))

const StyledSeparator = styled.hr<{
    $accordionType: AccordionV2Type
    $accordionToken: AccordionV2TokensType
}>((props) => ({
    margin: 0,
    border: 'none',
    height: FOUNDATION_THEME.border.width[1],
    backgroundColor:
        props.$accordionToken.separator.color[props.$accordionType],
}))

const AccordionV2Item = forwardRef<
    HTMLDivElement,
    AccordionV2ItemProps & {
        accordionType?: AccordionV2Type
        chevronPosition?: AccordionV2ChevronPosition
        isFirst?: boolean
        isLast?: boolean
        isIntermediate?: boolean
        currentValue?: string | string[]
    }
>(
    (
        {
            value,
            title,
            children,
            subtext,
            leftSlot,
            rightSlot,
            subtextSlot,
            isDisabled = false,
            chevronPosition = AccordionV2ChevronPosition.RIGHT,
            accordionType = AccordionV2Type.NO_BORDER,
            isFirst,
            isLast,
            isIntermediate,
            currentValue,
            ...props
        },
        ref
    ) => {
        const accordionTokens =
            useResponsiveTokens<AccordionV2TokensType>('ACCORDIONV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const isExpanded = Array.isArray(currentValue)
            ? currentValue.includes(value)
            : currentValue === value

        const getChevronIcon = () => {
            const iconColor = isDisabled
                ? FOUNDATION_THEME.colors.gray[300]
                : FOUNDATION_THEME.colors.gray[500]
            const iconSize = FOUNDATION_THEME.unit[16]

            return (
                <ChevronAnimation
                    data-element="accordion-item-chevron"
                    isOpen={isExpanded}
                    direction={
                        chevronPosition === AccordionV2ChevronPosition.RIGHT
                            ? ChevronAnimationDirection.DOWN
                            : ChevronAnimationDirection.RIGHT
                    }
                    variant={
                        chevronPosition === AccordionV2ChevronPosition.RIGHT
                            ? ChevronAnimationVariant.ROTATE_180
                            : ChevronAnimationVariant.ROTATE_90
                    }
                    size={ChevronAnimationSize.MEDIUM}
                    disabled={isDisabled}
                    color={iconColor}
                >
                    {chevronPosition === AccordionV2ChevronPosition.RIGHT ? (
                        <ChevronDown
                            style={{
                                width: iconSize,
                                height: iconSize,
                            }}
                        />
                    ) : (
                        <ChevronRight
                            style={{
                                width: iconSize,
                                height: iconSize,
                            }}
                        />
                    )}
                </ChevronAnimation>
            )
        }

        return (
            <StyledAccordionItem
                data-element="accordion-item"
                data-id={title}
                data-status={isDisabled ? 'disabled' : 'enabled'}
                value={value}
                disabled={isDisabled}
                ref={ref}
                data-disabled={isDisabled || undefined}
                $isSmallScreen={isSmallScreen}
                $accordionType={accordionType}
                $isDisabled={isDisabled}
                $accordionToken={accordionTokens}
                {...props}
            >
                <StyledAccordionHeader>
                    <StyledAccordionTrigger
                        $accordionType={accordionType}
                        $isDisabled={isDisabled}
                        $accordionToken={accordionTokens}
                        disabled={isDisabled}
                        data-type={accordionType}
                        data-disabled={isDisabled || undefined}
                        $isSmallScreen={isSmallScreen}
                        $isFirst={isFirst}
                        $isLast={isLast}
                        $isIntermediate={isIntermediate}
                    >
                        <Block width="100%" position="relative">
                            <Block
                                display="flex"
                                alignItems="flex-start"
                                width="100%"
                                position="relative"
                                gap={FOUNDATION_THEME.unit[8]}
                            >
                                {chevronPosition ===
                                    AccordionV2ChevronPosition.LEFT && (
                                    <Block
                                        data-element="chevron-icon"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                        aria-hidden="true"
                                    >
                                        {getChevronIcon()}
                                    </Block>
                                )}

                                {leftSlot &&
                                    chevronPosition !==
                                        AccordionV2ChevronPosition.LEFT && (
                                        <Block
                                            data-element="leading-icon"
                                            flexShrink={0}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            aria-hidden={
                                                React.isValidElement(
                                                    leftSlot
                                                ) &&
                                                (
                                                    leftSlot.props as Record<
                                                        string,
                                                        unknown
                                                    >
                                                )?.['aria-label']
                                                    ? undefined
                                                    : 'true'
                                            }
                                        >
                                            {leftSlot}
                                        </Block>
                                    )}

                                <Block
                                    flexGrow={
                                        chevronPosition ===
                                        AccordionV2ChevronPosition.LEFT
                                            ? 1
                                            : 0
                                    }
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                    >
                                        <PrimitiveText
                                            fontSize={
                                                accordionTokens.trigger.text
                                                    .title.fontSize
                                            }
                                            fontWeight={
                                                accordionTokens.trigger.text
                                                    .title.fontWeight
                                            }
                                            color={
                                                isDisabled
                                                    ? accordionTokens.trigger
                                                          .text.title.color
                                                          .disabled
                                                    : accordionTokens.trigger
                                                          .text.title.color
                                                          .default
                                            }
                                            data-element="accordion-item-header"
                                            data-id={
                                                title || 'accordion-item-header'
                                            }
                                        >
                                            {title}
                                        </PrimitiveText>

                                        {rightSlot && (
                                            <Block
                                                data-element="trailing-icon"
                                                flexShrink={0}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                aria-hidden={
                                                    React.isValidElement(
                                                        rightSlot
                                                    ) &&
                                                    (
                                                        rightSlot.props as Record<
                                                            string,
                                                            unknown
                                                        >
                                                    )?.['aria-label']
                                                        ? undefined
                                                        : 'true'
                                                }
                                            >
                                                {rightSlot}
                                            </Block>
                                        )}
                                    </Block>

                                    {(subtext || subtextSlot) && (
                                        <Block
                                            display="flex"
                                            alignItems="center"
                                            gap={
                                                accordionTokens.trigger.text
                                                    .subtext.gap
                                            }
                                        >
                                            {subtext && !isSmallScreen && (
                                                <PrimitiveText
                                                    data-element="accordion-item-subtext"
                                                    data-id={subtext}
                                                    fontSize={
                                                        accordionTokens.trigger
                                                            .text.subtext
                                                            .fontSize
                                                    }
                                                    color={
                                                        isDisabled
                                                            ? accordionTokens
                                                                  .trigger.text
                                                                  .subtext.color
                                                                  .disabled
                                                            : accordionTokens
                                                                  .trigger.text
                                                                  .subtext.color
                                                                  .default
                                                    }
                                                >
                                                    {subtext}
                                                </PrimitiveText>
                                            )}
                                            {subtextSlot && (
                                                <Block flexShrink={0}>
                                                    {subtextSlot}
                                                </Block>
                                            )}
                                        </Block>
                                    )}
                                </Block>

                                {chevronPosition ===
                                    AccordionV2ChevronPosition.RIGHT && (
                                    <Block
                                        data-element="chevron-icon"
                                        position="absolute"
                                        right={0}
                                        top={0}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        height="100%"
                                        aria-hidden="true"
                                    >
                                        {getChevronIcon()}
                                    </Block>
                                )}
                            </Block>
                        </Block>
                    </StyledAccordionTrigger>
                </StyledAccordionHeader>

                <StyledAccordionContent
                    $accordionType={accordionType}
                    $accordionToken={accordionTokens}
                >
                    {accordionType === AccordionV2Type.BORDER && (
                        <StyledSeparator
                            $accordionType={accordionType}
                            $accordionToken={accordionTokens}
                        />
                    )}
                    <Block>{children}</Block>
                </StyledAccordionContent>
            </StyledAccordionItem>
        )
    }
)

AccordionV2Item.displayName = 'AccordionV2Item'

export { AccordionV2Item }
