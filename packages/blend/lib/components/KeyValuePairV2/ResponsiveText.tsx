import React, { useRef, useEffect, useState, useCallback } from 'react'
import type { CSSObject } from 'styled-components'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide } from '../Tooltip/types'
import { TruncatedTextWithTooltipV2 } from '../common/TruncatedTextWithTooltipV2'
import { TooltipV2Side } from '../TooltipV2/tooltipV2.types'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import {
    type KeyValuePairV2TextOverflowMode,
    getTextStyles,
    getPrimitiveTextStyles,
} from './responsiveTextStyles'

export type ResponsiveTextProps = {
    children: string
    fontSize: CSSObject['fontSize']
    color: CSSObject['color']
    className?: string
    fontWeight?: CSSObject['fontWeight']
    textOverflow?: KeyValuePairV2TextOverflowMode
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
        if (
            !element ||
            textOverflow !== 'wrap-clamp' ||
            !showTooltipOnTruncate
        ) {
            setIsTruncated(false)
            return
        }

        setIsTruncated(element.scrollHeight > element.clientHeight)
    }, [textOverflow, showTooltipOnTruncate])

    const handleResize = useCallback(() => {
        checkTruncation()
    }, [checkTruncation])

    useResizeObserver(textRef as React.RefObject<HTMLElement>, handleResize)

    useEffect(() => {
        if (textOverflow !== 'wrap-clamp' || !showTooltipOnTruncate) {
            setIsTruncated(false)
            return
        }
        const frameId = requestAnimationFrame(checkTruncation)
        return () => cancelAnimationFrame(frameId)
    }, [
        children,
        textOverflow,
        maxLines,
        showTooltipOnTruncate,
        checkTruncation,
    ])

    const wrapperProps = {
        className,
        style: getTextStyles(textOverflow, maxLines, slotPresent),
        id,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
    }

    if (textOverflow === 'truncate') {
        return (
            <Component {...wrapperProps}>
                <TruncatedTextWithTooltipV2
                    text={children}
                    side={TooltipV2Side.TOP}
                    disabled={!showTooltipOnTruncate}
                    style={{
                        fontSize,
                        color,
                        fontWeight,
                    }}
                />
            </Component>
        )
    }

    const textElement = (
        <Component ref={textRef} {...wrapperProps}>
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

    if (textOverflow === 'wrap-clamp' && showTooltipOnTruncate && isTruncated) {
        return (
            <Tooltip content={children} side={TooltipSide.TOP}>
                {textElement}
            </Tooltip>
        )
    }

    return textElement
}
