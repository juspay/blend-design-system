import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { styled } from 'styled-components'
import type { AccordionItemProps } from './types'
import { AccordionType, AccordionChevronPosition } from './types'
import type { AccordionTokenType } from './accordion.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
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
    $accordionType: AccordionType
    $isDisabled: boolean
    $accordionToken: AccordionTokenType
    $isSmallScreen: boolean
}>((props) => ({
    border: props.$accordionToken.trigger.border[props.$accordionType].default,

    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    overflow:
        props.$accordionType === AccordionType.BORDER ? 'hidden' : 'visible',
    ...(props.$isDisabled &&
        props.$accordionType === AccordionType.BORDER && {
            backgroundColor:
                props.$accordionToken.trigger.backgroundColor[
                    props.$accordionType
                ].disabled,
        }),

    ...(props.$isSmallScreen &&
        props.$accordionType === AccordionType.BORDER && {
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
        props.$accordionType === AccordionType.NO_BORDER && {
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
    $accordionType: AccordionType
    $isDisabled: boolean
    $accordionToken: AccordionTokenType
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
            ...(props.$accordionType === AccordionType.BORDER && {
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

    ...(props.$accordionType === AccordionType.NO_BORDER &&
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
    $accordionType: AccordionType
    $accordionToken: AccordionTokenType
}>((props) => ({
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    '&[data-state="open"]': {
        animation: 'accordion-down 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        ...(props.$accordionType === AccordionType.BORDER && {
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
    $accordionType: AccordionType
    $accordionToken: AccordionTokenType
}>((props) => ({
    margin: 0,
    border: 'none',
    height: FOUNDATION_THEME.border.width[1],
    backgroundColor:
        props.$accordionToken.separator.color[props.$accordionType],
}))
const AccordionItem = forwardRef<
    HTMLDivElement,
    AccordionItemProps & {
        accordionType?: AccordionType
        chevronPosition?: AccordionChevronPosition
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
            chevronPosition = AccordionChevronPosition.RIGHT,
            accordionType = AccordionType.NO_BORDER,
            // Position props
            isFirst,
            isLast,
            isIntermediate,
            currentValue,
            ...props
        },
        ref
    ) => {
        const accordionToken =
            useResponsiveTokens<AccordionTokenType>('ACCORDION')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        // Determine if this item is expanded
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
                    isOpen={false} // This will be controlled by Radix UI's data-state
                    direction={
                        chevronPosition === AccordionChevronPosition.RIGHT
                            ? ChevronAnimationDirection.DOWN
                            : ChevronAnimationDirection.RIGHT
                    }
                    variant={
                        chevronPosition === AccordionChevronPosition.RIGHT
                            ? ChevronAnimationVariant.ROTATE_180
                            : ChevronAnimationVariant.ROTATE_90
                    }
                    size={ChevronAnimationSize.MEDIUM}
                    disabled={isDisabled}
                    color={iconColor}
                >
                    {chevronPosition === AccordionChevronPosition.RIGHT ? (
                        <ChevronDown
                            style={{
                                width: iconSize,
                                height: iconSize,
                                transform: isExpanded
                                    ? 'rotate(180deg)'
                                    : 'rotate(0deg)',
                            }}
                        />
                    ) : (
                        <ChevronRight
                            style={{
                                width: iconSize,
                                height: iconSize,
                                transform: isExpanded
                                    ? 'rotate(90deg)'
                                    : 'rotate(0deg)',
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
                $accordionToken={accordionToken}
                {...props}
            >
                <StyledAccordionHeader>
                    <StyledAccordionTrigger
                        $accordionType={accordionType}
                        $isDisabled={isDisabled}
                        $accordionToken={accordionToken}
                        disabled={isDisabled}
                        data-type={accordionType}
                        data-disabled={isDisabled || undefined}
                        data-accordion-expanded={isExpanded ? 'true' : 'false'}
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
                                    AccordionChevronPosition.LEFT && (
                                    <Block
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
                                        AccordionChevronPosition.LEFT && (
                                        <Block
                                            data-element="icon"
                                            flexShrink={0}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {leftSlot}
                                        </Block>
                                    )}

                                <Block
                                    flexGrow={
                                        chevronPosition ===
                                        AccordionChevronPosition.LEFT
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
                                                accordionToken.trigger.text
                                                    .title.fontSize
                                            }
                                            fontWeight={
                                                accordionToken.trigger.text
                                                    .title.fontWeight
                                            }
                                            color={
                                                isDisabled
                                                    ? accordionToken.trigger
                                                          .text.title.color
                                                          .disabled
                                                    : accordionToken.trigger
                                                          .text.title.color
                                                          .default
                                            }
                                            data-header-text={title}
                                        >
                                            {title}
                                        </PrimitiveText>

                                        {rightSlot && (
                                            <Block
                                                data-element="icon"
                                                flexShrink={0}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
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
                                                accordionToken.trigger.text
                                                    .subtext.gap
                                            }
                                        >
                                            {subtext && !isSmallScreen && (
                                                <PrimitiveText
                                                    data-element="accordion-item-subtext"
                                                    data-id={subtext}
                                                    fontSize={
                                                        accordionToken.trigger
                                                            .text.subtext
                                                            .fontSize
                                                    }
                                                    color={
                                                        isDisabled
                                                            ? accordionToken
                                                                  .trigger.text
                                                                  .subtext.color
                                                                  .disabled
                                                            : accordionToken
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
                                    AccordionChevronPosition.RIGHT && (
                                    <Block
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
                    $accordionToken={accordionToken}
                >
                    {accordionType === AccordionType.BORDER && (
                        <StyledSeparator
                            $accordionType={accordionType}
                            $accordionToken={accordionToken}
                        />
                    )}
                    <Block>{children}</Block>
                </StyledAccordionContent>
            </StyledAccordionItem>
        )
    }
)

AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
