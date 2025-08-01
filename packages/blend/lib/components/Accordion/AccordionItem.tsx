import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { styled } from 'styled-components'
import type { AccordionItemProps } from './types'
import { AccordionType, AccordionChevronPosition } from './types'
import type { AccordionTokenType } from './accordion.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { foundationToken } from '../../foundationToken'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'

const StyledAccordionItem = styled(RadixAccordion.Item)<{
    $accordionType: AccordionType
    $isDisabled: boolean
    $accordionToken: AccordionTokenType
    $isSmallScreen: boolean
}>((props) => ({
    border: props.$accordionToken.item.trigger.border[props.$accordionType]
        .default,

    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    overflow:
        props.$accordionType === AccordionType.BORDER ? 'hidden' : 'visible',
    ...(props.$isDisabled &&
        props.$accordionType === AccordionType.BORDER && {
            backgroundColor:
                props.$accordionToken.item.trigger.backgroundColor[
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
                    props.$accordionToken.item.trigger.border[
                        props.$accordionType
                    ].default,
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
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    padding: props.$accordionToken.item.trigger.padding[props.$accordionType],
    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    backgroundColor:
        props.$accordionToken.item.trigger.backgroundColor[props.$accordionType]
            .default,
    ...(props.$isDisabled && {
        backgroundColor:
            props.$accordionToken.item.trigger.backgroundColor[
                props.$accordionType
            ].disabled,
        cursor: 'not-allowed',
    }),
    ...(!props.$isSmallScreen && {
        '&[data-state="open"]': {
            backgroundColor:
                props.$accordionToken.item.trigger.backgroundColor[
                    props.$accordionType
                ].open,
        },
    }),
    ...(!props.$isSmallScreen && {
        '&:hover:not(:disabled)': {
            backgroundColor:
                props.$accordionToken.item.trigger.backgroundColor[
                    props.$accordionType
                ].hover,
        },
    }),

    '&:focus-visible': {
        outline: `2px solid ${foundationToken.colors.primary[500]}`,
        outlineOffset: foundationToken.spacing[2],
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
}>(() => ({
    overflow: 'hidden',
    transition: 'all 0.2s ease',
}))

const StyledSeparator = styled.hr<{
    $accordionType: AccordionType
    $accordionToken: AccordionTokenType
}>((props) => ({
    margin: 0,
    border: 'none',
    height: foundationToken.borderWidth[1],
    backgroundColor:
        props.$accordionToken.item.separator.color[props.$accordionType],
}))

const ChevronIcon = styled(Block)<{
    $chevronPosition: AccordionChevronPosition
}>((props) => ({
    transition: 'transform 200ms ease',
    transformOrigin: 'center',

    ...(props.$chevronPosition === AccordionChevronPosition.RIGHT && {
        '[data-state="open"] &': {
            transform: 'rotate(180deg)',
        },
    }),

    ...(props.$chevronPosition === AccordionChevronPosition.LEFT && {
        '[data-state="open"] &': {
            transform: 'rotate(90deg)',
        },
    }),
}))

const AccordionItem = forwardRef<
    HTMLDivElement,
    AccordionItemProps & {
        accordionType?: AccordionType
        chevronPosition?: AccordionChevronPosition
        isFirst?: boolean
        isLast?: boolean
        isIntermediate?: boolean
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
            className,
            accordionType = AccordionType.NO_BORDER,
            // Position props
            isFirst,
            isLast,
            isIntermediate,
        },
        ref
    ) => {
        const accordionToken =
            useResponsiveTokens<AccordionTokenType>('ACCORDION')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const getChevronIcon = () => {
            const iconStyles = {
                width: foundationToken.spacing[16],
                height: foundationToken.spacing[16],
                color: isDisabled
                    ? foundationToken.colors.gray[300]
                    : foundationToken.colors.gray[500],
            }

            return (
                <ChevronIcon
                    $chevronPosition={chevronPosition}
                    style={iconStyles}
                >
                    {chevronPosition === AccordionChevronPosition.RIGHT ? (
                        <ChevronDown
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <ChevronRight
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                </ChevronIcon>
            )
        }

        return (
            <StyledAccordionItem
                value={value}
                disabled={isDisabled}
                className={className}
                ref={ref}
                data-disabled={isDisabled || undefined}
                $isSmallScreen={isSmallScreen}
                $accordionType={accordionType}
                $isDisabled={isDisabled}
                $accordionToken={accordionToken}
            >
                <StyledAccordionHeader>
                    <StyledAccordionTrigger
                        $accordionType={accordionType}
                        $isDisabled={isDisabled}
                        $accordionToken={accordionToken}
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
                                gap={foundationToken.spacing[8]}
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
                                        gap={foundationToken.spacing[8]}
                                    >
                                        <PrimitiveText
                                            fontSize={
                                                accordionToken.item.trigger
                                                    .title.fontSize
                                            }
                                            fontWeight={
                                                accordionToken.item.trigger
                                                    .title.fontWeight
                                            }
                                            color={
                                                isDisabled
                                                    ? accordionToken.item
                                                          .trigger.title.color
                                                          .disabled
                                                    : accordionToken.item
                                                          .trigger.title.color
                                                          .default
                                            }
                                        >
                                            {title}
                                        </PrimitiveText>

                                        {rightSlot && (
                                            <Block
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
                                                accordionToken.item.trigger
                                                    .subtext.gap
                                            }
                                        >
                                            {subtext && !isSmallScreen && (
                                                <PrimitiveText
                                                    fontSize={
                                                        accordionToken.item
                                                            .trigger.subtext
                                                            .fontSize
                                                    }
                                                    color={
                                                        isDisabled
                                                            ? accordionToken
                                                                  .item.trigger
                                                                  .subtext.color
                                                                  .disabled
                                                            : accordionToken
                                                                  .item.trigger
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
