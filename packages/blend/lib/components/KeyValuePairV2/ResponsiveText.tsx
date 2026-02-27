import React, { useRef, useEffect, useState, useCallback } from 'react'
import type { CSSObject } from 'styled-components'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide } from '../Tooltip/types'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { checkIfTruncated } from '../Select/SelectItem/utils'
import {
    type TextOverflowMode,
    getTextStyles,
    getPrimitiveTextStyles,
} from './responsiveTextStyles'

export type ResponsiveTextProps = {
    children: string
    fontSize: CSSObject['fontSize']
    color: CSSObject['color']
    className?: string
    fontWeight?: CSSObject['fontWeight']
    textOverflow?: TextOverflowMode
    maxLines?: number
    showTooltipOnTruncate?: boolean
    as?: React.ElementType
    id?: string
    role?: string
    slotPresent: boolean
    'aria-label'?: string
    'aria-labelledby'?: string
}

export const ResponsiveText = ({
    children,
    fontSize,
    color,
    className,
    fontWeight,
    textOverflow = 'truncate',
    maxLines = 2,
    showTooltipOnTruncate = true,
    as: Component = 'div',
    id,
    role,
    slotPresent,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: ResponsiveTextProps) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    const checkTruncation = useCallback(() => {
        const element = textRef.current
        if (!element || textOverflow === 'wrap' || !showTooltipOnTruncate) {
            setIsTruncated(false)
            return
        }
        if (textOverflow === 'truncate') {
            const textElement = element.firstElementChild as HTMLElement | null
            setIsTruncated(checkIfTruncated(textElement))
        } else if (textOverflow === 'wrap-clamp') {
            setIsTruncated(element.scrollHeight > element.clientHeight)
        }
    }, [textOverflow, showTooltipOnTruncate])

    const handleResize = useCallback(() => {
        checkTruncation()
    }, [checkTruncation])

    useResizeObserver(textRef as React.RefObject<HTMLElement>, handleResize)

    useEffect(() => {
        if (textOverflow === 'wrap' || !showTooltipOnTruncate) {
            setIsTruncated(false)
            return
        }
        const timeoutId = setTimeout(checkTruncation, 0)
        return () => clearTimeout(timeoutId)
    }, [
        children,
        textOverflow,
        maxLines,
        showTooltipOnTruncate,
        checkTruncation,
    ])

    const textElement = (
        <Component
            ref={textRef}
            className={className}
            style={getTextStyles(textOverflow, maxLines, slotPresent)}
            id={id}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
        >
            <PrimitiveText
                fontSize={fontSize}
                color={color}
                fontWeight={fontWeight}
                style={
                    getPrimitiveTextStyles(textOverflow) as React.CSSProperties
                }
            >
                {children}
            </PrimitiveText>
        </Component>
    )

    if (showTooltipOnTruncate && isTruncated) {
        return (
            <Tooltip content={children} side={TooltipSide.TOP}>
                {textElement}
            </Tooltip>
        )
    }

    return textElement
}
