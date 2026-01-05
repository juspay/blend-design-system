import React, { useRef, useState, useCallback, useEffect } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide, TooltipSize } from '../Tooltip/types'
import { useResizeObserver } from '../../hooks/useResizeObserver'

type TruncatedTextWithTooltipProps = {
    text: string
    style?: React.CSSProperties
    tooltipSize?: TooltipSize
    delayDuration?: number
    'data-id'?: string
    'data-element'?: string
} & {
    [key: `data-${string}`]: string | undefined
}

export const TruncatedTextWithTooltip = ({
    text,
    style = {},
    tooltipSize = TooltipSize.SMALL,
    delayDuration = 500,
    'data-id': dataId,
    'data-element': dataElement,
    ...restProps
}: TruncatedTextWithTooltipProps) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)
    const rafRef = useRef<number | null>(null)

    const checkTruncation = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
            const element = textRef.current
            if (element) {
                const truncated =
                    element.scrollWidth > element.clientWidth &&
                    element.clientWidth > 0
                setIsTruncated(truncated)
            }
            rafRef.current = null
        })
    }, [])

    useResizeObserver(textRef as React.RefObject<HTMLElement>, checkTruncation)

    useEffect(() => {
        const timeoutId = setTimeout(checkTruncation, 0)
        window.addEventListener('resize', checkTruncation, { passive: true })

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', checkTruncation)
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [text, checkTruncation])

    const dataAttributes: Record<string, string> = {}
    if (dataId) dataAttributes['data-id'] = dataId
    if (dataElement) dataAttributes['data-element'] = dataElement

    Object.keys(restProps).forEach((key) => {
        if (key.startsWith('data-')) {
            dataAttributes[key] = restProps[
                key as keyof typeof restProps
            ] as string
        }
    })

    const truncatedContent = (
        <span
            ref={textRef}
            style={{
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: style.textAlign || 'left',
                ...style,
            }}
            {...dataAttributes}
        >
            {text}
        </span>
    )

    if (isTruncated && text) {
        return (
            <Tooltip
                content={text}
                size={tooltipSize}
                delayDuration={delayDuration}
                side={TooltipSide.RIGHT}
            >
                {truncatedContent}
            </Tooltip>
        )
    }

    return truncatedContent
}
