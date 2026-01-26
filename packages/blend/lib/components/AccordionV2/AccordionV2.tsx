'use client'

import * as React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { forwardRef, useMemo } from 'react'
import { styled } from 'styled-components'
import { type AccordionV2Props, AccordionV2Type } from './accordionV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AccordionV2TokensType } from './accordionV2.tokens'

const StyledAccordionRoot = styled(RadixAccordion.Root)<{
    $accordionType: AccordionV2Type
    $accordionToken: AccordionV2TokensType
    $maxWidth?: string | number
}>((props) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: props.$accordionToken.gap[props.$accordionType],
    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    ...(props.$maxWidth && {
        maxWidth: props.$maxWidth,
    }),
}))

const AccordionV2 = forwardRef<HTMLDivElement, AccordionV2Props>(
    (
        {
            children,
            accordionType = AccordionV2Type.NO_BORDER,
            defaultValue,
            value,
            isMultiple = false,
            onValueChange,
            maxWidth,
        },
        ref
    ) => {
        const accordionTokens =
            useResponsiveTokens<AccordionV2TokensType>('ACCORDIONV2')

        const enhancedChildren = useMemo(() => {
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
                    accordionType,
                    isFirst,
                    isLast,
                    isIntermediate,
                    currentValue: value,
                }

                return React.cloneElement(child, childProps)
            })
        }, [children, accordionType, value])

        const commonProps = {
            ref: ref,
            $accordionType: accordionType,
            $accordionToken: accordionTokens,
            $maxWidth: maxWidth,
        }

        return isMultiple ? (
            <StyledAccordionRoot
                data-accordion="accordion-v2"
                type="multiple"
                value={value as string[] | undefined}
                defaultValue={defaultValue as string[] | undefined}
                onValueChange={
                    onValueChange as ((value: string[]) => void) | undefined
                }
                {...commonProps}
            >
                {enhancedChildren}
            </StyledAccordionRoot>
        ) : (
            <StyledAccordionRoot
                data-accordion="accordion-v2"
                type="single"
                collapsible={true}
                value={value as string | undefined}
                defaultValue={defaultValue as string | undefined}
                onValueChange={
                    onValueChange as ((value: string) => void) | undefined
                }
                {...commonProps}
            >
                {enhancedChildren}
            </StyledAccordionRoot>
        )
    }
)

AccordionV2.displayName = 'AccordionV2'

export default AccordionV2
export { AccordionV2Item } from './AccordionV2Item'
