import React, { useRef, useState, useCallback, useEffect } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide, TooltipSize } from '../Tooltip/types'
import { useResizeObserver } from '../../hooks/useResizeObserver'

export type TruncatedTextWithTooltipProps = {
    text: string
    style?: React.CSSProperties
    tooltipSize?: TooltipSize
    delayDuration?: number
    side?: TooltipSide
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
    side = TooltipSide.RIGHT,
    ...restProps
}: TruncatedTextWithTooltipProps) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)
    const rafRef = useRef<number | null>(null)
    const isMeasuringRef = useRef(false)

    const checkTruncation = useCallback(() => {
        if (isMeasuringRef.current) return

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
            const el = textRef.current
            if (!el) return

            const next = el.scrollWidth > el.clientWidth && el.clientWidth > 0

            setIsTruncated((prev) => (prev !== next ? next : prev))

            rafRef.current = null
        })
    }, [])

    useResizeObserver(textRef as React.RefObject<HTMLElement>, () => {
        if (isMeasuringRef.current) return

        isMeasuringRef.current = true
        checkTruncation()

        requestAnimationFrame(() => {
            isMeasuringRef.current = false
        })
    })

    useEffect(() => {
        checkTruncation()

        const onResize = () => checkTruncation()
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
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

    const content = (
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
                side={side}
            >
                {content}
            </Tooltip>
        )
    }

    return content
}
