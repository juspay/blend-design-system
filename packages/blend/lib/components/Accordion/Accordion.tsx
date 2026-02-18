import * as React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { forwardRef, useCallback, useState } from 'react'
import { styled } from 'styled-components'
import { type AccordionProps, AccordionType } from './types'
import type { AccordionTokenType } from './accordion.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const StyledAccordionRoot = styled(RadixAccordion.Root)<{
    $accordionType: AccordionType
    $AccordionToken: AccordionTokenType
}>((props) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: props.$AccordionToken.gap[props.$accordionType],
    borderRadius: props.$AccordionToken.borderRadius[props.$accordionType],
}))

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            children,
            accordionType = AccordionType.NO_BORDER,
            defaultValue,
            value: controlledValue,
            isMultiple = false,
            onValueChange,
        },
        ref
    ) => {
        const accordionToken =
            useResponsiveTokens<AccordionTokenType>('ACCORDION')

        const isControlled = controlledValue !== undefined
        const [internalValue, setInternalValue] = useState<
            string | string[] | undefined
        >(defaultValue)

        const currentValue = isControlled ? controlledValue : internalValue

        const handleValueChange = useCallback(
            (newValue: string | string[]) => {
                if (!isControlled) setInternalValue(newValue)
                onValueChange?.(newValue)
            },
            [isControlled, onValueChange]
        )

        const renderChildren = () =>
            React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child

                const total = React.Children.toArray(children).filter(
                    React.isValidElement
                ).length

                const childProps = {
                    ...(child.props as object),
                    accordionType,
                    isFirst: index === 0,
                    isLast: index === total - 1,
                    isIntermediate: index > 0 && index < total - 1,
                    currentValue,
                }

                return React.cloneElement(child, childProps)
            })

        const commonProps = {
            ref,
            $accordionType: accordionType,
            $AccordionToken: accordionToken,
        }

        return isMultiple ? (
            <StyledAccordionRoot
                data-accordion="accordion"
                type="multiple"
                {...(isControlled
                    ? { value: (controlledValue ?? []) as string[] }
                    : { defaultValue: defaultValue as string[] | undefined })}
                onValueChange={handleValueChange as (value: string[]) => void}
                {...commonProps}
            >
                {renderChildren()}
            </StyledAccordionRoot>
        ) : (
            <StyledAccordionRoot
                data-accordion="accordion"
                type="single"
                collapsible
                {...(isControlled
                    ? { value: (controlledValue ?? '') as string }
                    : {
                          defaultValue: defaultValue as string | undefined,
                      })}
                onValueChange={handleValueChange as (value: string) => void}
                {...commonProps}
            >
                {renderChildren()}
            </StyledAccordionRoot>
        )
    }
)

Accordion.displayName = 'Accordion'

export default Accordion
