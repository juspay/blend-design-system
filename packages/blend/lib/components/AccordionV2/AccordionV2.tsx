'use client'

import * as React from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { forwardRef, useMemo, useRef } from 'react'
import { styled } from 'styled-components'
import { type AccordionV2Props, AccordionV2Type } from './accordionV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { AccordionV2TokensType } from './accordionV2.tokens'

const StyledAccordionRoot = styled(RadixAccordion.Root)<{
    $accordionType: AccordionV2Type
    $accordionToken: AccordionV2TokensType
    $width?: string | number
    $maxWidth?: string | number
    $minWidth?: string | number
}>((props) => ({
    width: props.$width || '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: props.$accordionToken.gap[props.$accordionType],
    borderRadius: props.$accordionToken.borderRadius[props.$accordionType],
    ...(props.$maxWidth && {
        maxWidth: props.$maxWidth,
    }),
    ...(props.$minWidth && {
        minWidth: props.$minWidth,
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
            width,
            maxWidth,
            minWidth,
        },
        ref
    ) => {
        const accordionTokens =
            useResponsiveTokens<AccordionV2TokensType>('ACCORDIONV2')

        const isControlledRef = useRef(value !== undefined)
        const isControlled = isControlledRef.current

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

        const styledProps = {
            ref,
            'data-accordion': 'accordion-v2',
            $accordionType: accordionType,
            $accordionToken: accordionTokens,
            $width: width,
            $maxWidth: maxWidth,
            $minWidth: minWidth,
        }

        if (isMultiple) {
            const valueProps = isControlled
                ? { value: (value as string[] | undefined) ?? [] }
                : { defaultValue: defaultValue as string[] | undefined }

            return (
                <StyledAccordionRoot
                    type="multiple"
                    onValueChange={
                        onValueChange as ((value: string[]) => void) | undefined
                    }
                    {...valueProps}
                    {...styledProps}
                >
                    {enhancedChildren}
                </StyledAccordionRoot>
            )
        }

        const valueProps = isControlled
            ? { value: (value as string | undefined) ?? '' }
            : { defaultValue: defaultValue as string | undefined }

        return (
            <StyledAccordionRoot
                type="single"
                collapsible
                onValueChange={
                    onValueChange as ((value: string) => void) | undefined
                }
                {...valueProps}
                {...styledProps}
            >
                {enhancedChildren}
            </StyledAccordionRoot>
        )
    }
)

AccordionV2.displayName = 'AccordionV2'

export default AccordionV2
export { AccordionV2Item } from './AccordionV2Item'
