import * as RadixAccordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'
import { styled, css } from 'styled-components'
import Block from '../Primitives/Block/Block'
import {
    type AccordionV2ItemProps,
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from './accordionV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AccordionV2TokensType } from './accordionV2.tokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { FOUNDATION_THEME } from '../../tokens'
import { AccordionV2TriggerContent } from './AccordionV2TriggerContent'
import {
    accordionDown,
    accordionUp,
    ACCORDION_TRANSITION,
} from './accordionV2.animations'

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
    transition: ACCORDION_TRANSITION,
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
}>`
    overflow: visible;
    transition: ${ACCORDION_TRANSITION};

    &[data-state='open'] {
        animation: ${accordionDown} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        ${(props) =>
            props.$accordionType === AccordionV2Type.BORDER &&
            css`
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            `}
    }

    &[data-state='closed'] {
        animation: ${accordionUp} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
        animation: none;
    }
`

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
                        <AccordionV2TriggerContent
                            title={title}
                            subtext={subtext}
                            leftSlot={leftSlot}
                            rightSlot={rightSlot}
                            subtextSlot={subtextSlot}
                            isDisabled={isDisabled}
                            isExpanded={isExpanded}
                            chevronPosition={chevronPosition}
                            accordionTokens={accordionTokens}
                            isSmallScreen={isSmallScreen}
                        />
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
