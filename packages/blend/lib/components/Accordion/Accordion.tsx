import * as React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { forwardRef, useCallback } from 'react'
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
            value,
            isMultiple = false,
            onValueChange,
        },
        ref
    ) => {
        const accordionToken =
            useResponsiveTokens<AccordionTokenType>('ACCORDION')

        const handleToggle = useCallback(
            (itemValue: string) => {
                if (!onValueChange) return

                if (isMultiple) {
                    const currentArray = (value as string[] | undefined) || []
                    const isCurrentlyOpen = currentArray.includes(itemValue)

                    if (isCurrentlyOpen) {
                        onValueChange(
                            currentArray.filter((v) => v !== itemValue)
                        )
                    } else {
                        onValueChange([...currentArray, itemValue])
                    }
                } else {
                    const currentValue = value as string | undefined
                    const isCurrentlyOpen = currentValue === itemValue

                    if (isCurrentlyOpen) {
                        onValueChange('')
                    } else {
                        onValueChange(itemValue)
                    }
                }
            },
            [value, isMultiple, onValueChange]
        )

        const renderChildren = () => {
            return React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child

                const childrenArray = React.Children.toArray(children).filter(
                    React.isValidElement
                )
                const totalItems = childrenArray.length
                const isFirst = index === 0
                const isLast = index === totalItems - 1
                const isIntermediate = !isFirst && !isLast

                const childProps = {
                    ...(child.props as object),
                    accordionType: accordionType,
                    isFirst,
                    isLast,
                    isIntermediate,
                    currentValue: value,
                    onToggle: handleToggle,
                }

                return React.cloneElement(child, childProps)
            })
        }

        const commonProps = {
            ref: ref,
            $accordionType: accordionType,
        }

        return isMultiple ? (
            <StyledAccordionRoot
                data-accordion="accordion"
                type="multiple"
                value={value as string[] | undefined}
                defaultValue={defaultValue as string[] | undefined}
                onValueChange={
                    onValueChange as ((value: string[]) => void) | undefined
                }
                $AccordionToken={accordionToken}
                {...commonProps}
            >
                {renderChildren()}
            </StyledAccordionRoot>
        ) : (
            <StyledAccordionRoot
                data-accordion="accordion"
                type="single"
                collapsible={true}
                value={value as string | undefined}
                defaultValue={defaultValue as string | undefined}
                onValueChange={
                    onValueChange as ((value: string) => void) | undefined
                }
                $AccordionToken={accordionToken}
                {...commonProps}
            >
                {renderChildren()}
            </StyledAccordionRoot>
        )
    }
)

Accordion.displayName = 'Accordion'

export default Accordion
