import { forwardRef, useMemo, useRef } from 'react'
import useTruncationDetection from '../../../hooks/useTruncationDetection'
import { TooltipV2 } from '../../TooltipV2/TooltipV2'
import {
    TooltipV2Align,
    TooltipV2Side,
    TooltipV2Size,
} from '../../TooltipV2/tooltipV2.types'
import { getEffectiveTooltipContent } from './utils'
import type { TruncatedTextWithTooltipV2Props } from './types'

export const TruncatedTextWithTooltipV2 = forwardRef<
    HTMLSpanElement,
    TruncatedTextWithTooltipV2Props
>(
    (
        {
            text,
            tooltipContent,
            className,
            style,
            side = TooltipV2Side.RIGHT,
            align = TooltipV2Align.CENTER,
            size = TooltipV2Size.SM,
            delayDuration = 500,
            offset = 8,
            disabled = false,
            'data-element': dataElement,
            'data-id': dataId,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLSpanElement>(null)

        const isTruncated = useTruncationDetection(containerRef, undefined, {
            disabled,
            deps: [text, style, className],
        })

        const content = useMemo(
            () => getEffectiveTooltipContent(text, tooltipContent),
            [text, tooltipContent]
        )

        const textNode = (
            <span
                ref={(node) => {
                    containerRef.current = node
                    if (typeof ref === 'function') ref(node)
                    else if (ref) ref.current = node
                }}
                className={className}
                data-element={dataElement}
                data-id={dataId}
                style={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ...style,
                }}
            >
                {text}
            </span>
        )

        if (!disabled && isTruncated && content) {
            return (
                <TooltipV2
                    content={content}
                    side={side}
                    align={align}
                    size={size}
                    delayDuration={delayDuration}
                    offset={offset}
                >
                    {textNode}
                </TooltipV2>
            )
        }

        return textNode
    }
)

TruncatedTextWithTooltipV2.displayName = 'TruncatedTextWithTooltipV2'
