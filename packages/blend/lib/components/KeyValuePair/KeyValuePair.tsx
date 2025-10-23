import { forwardRef, useRef, useEffect, useState } from 'react'
import type { CSSObject } from 'styled-components'
import {
    KeyValuePairPropTypes,
    KeyValuePairSize,
    KeyValuePairStateType,
    TextOverflowMode,
} from './types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { KeyValuePairTokensType } from './KeyValuePair.tokens'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide } from '../Tooltip/types'

// Helper component to handle responsive text display with different overflow modes
const ResponsiveText = ({
    children,
    fontSize,
    color,
    className,
    fontWeight,
    textOverflow = 'truncate',
    maxLines = 2,
    showTooltipOnTruncate = true,
}: {
    children: string
    fontSize: CSSObject['fontSize']
    color: CSSObject['color']
    className?: string
    fontWeight?: CSSObject['fontWeight']
    textOverflow?: TextOverflowMode
    maxLines?: number
    showTooltipOnTruncate?: boolean
}) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    // Check if text is actually truncated
    useEffect(() => {
        const element = textRef.current
        if (!element || textOverflow === 'wrap') {
            setIsTruncated(false)
            return
        }

        const checkTruncation = () => {
            if (textOverflow === 'truncate') {
                // For truncate mode, check if scrollWidth exceeds clientWidth
                // We need to check the first child (PrimitiveText) as that's where text lives
                const textElement = element.firstElementChild as HTMLElement
                if (textElement) {
                    const isOverflowing =
                        textElement.scrollWidth > textElement.clientWidth
                    setIsTruncated(isOverflowing)
                }
            } else if (textOverflow === 'wrap-clamp') {
                // For wrap-clamp, check scrollHeight vs clientHeight
                setIsTruncated(element.scrollHeight > element.clientHeight)
            }
        }

        // Use setTimeout to ensure DOM is fully rendered
        const timeoutId = setTimeout(checkTruncation, 0)

        window.addEventListener('resize', checkTruncation)
        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', checkTruncation)
        }
    }, [children, textOverflow, maxLines])

    // Shared ellipsis styles for truncate mode
    const ellipsisStyles: CSSObject = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    // Get styles based on overflow mode
    const getTextStyles = (): CSSObject => {
        const baseStyles: CSSObject = {
            width: '100%',
        }

        switch (textOverflow) {
            case 'truncate':
                return {
                    ...baseStyles,
                    ...ellipsisStyles,
                }
            case 'wrap':
                return {
                    ...baseStyles,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }
            case 'wrap-clamp':
                // Multi-line text clamping with ellipsis
                // Browser Support Notes:
                // - Chrome/Edge/Safari: Full support via -webkit-line-clamp
                // - Firefox 68+: Supports -webkit-line-clamp
                // - Older browsers: Falls back to wrapping without line limit
                // The overflow/word-break properties ensure graceful degradation
                return {
                    ...baseStyles,
                    display: '-webkit-box',
                    WebkitLineClamp: maxLines,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    // Fallback for browsers without -webkit-line-clamp support
                    // Text will wrap naturally without line limit but still be contained
                }
            default:
                return baseStyles
        }
    }

    const getPrimitiveTextStyles = (): CSSObject => {
        const baseStyles: CSSObject = {
            display: 'block',
        }

        // Apply ellipsis styles to PrimitiveText for truncate mode
        if (textOverflow === 'truncate') {
            return {
                ...baseStyles,
                ...ellipsisStyles,
            }
        }

        return baseStyles
    }

    const textElement = (
        <Block ref={textRef} className={className} style={getTextStyles()}>
            <PrimitiveText
                fontSize={fontSize}
                color={color}
                fontWeight={fontWeight}
                style={getPrimitiveTextStyles()}
            >
                {children}
            </PrimitiveText>
        </Block>
    )

    // Show tooltip only if text is truncated and tooltip is enabled
    if (showTooltipOnTruncate && isTruncated) {
        return (
            <Tooltip content={children} side={TooltipSide.TOP}>
                <Block style={{ width: '100%' }}>{textElement}</Block>
            </Tooltip>
        )
    }

    return textElement
}

const KeyValuePair = forwardRef<HTMLDivElement, KeyValuePairPropTypes>(
    (
        {
            keyString,
            size = KeyValuePairSize.SMALL,
            value,
            keySlot,
            valueLeftSlot,
            valueRightSlot,
            keyValuePairState = KeyValuePairStateType.vertical,
            maxWidth = '220px',
            textOverflow = 'truncate',
            maxLines = 2,
            showTooltipOnTruncate = true,
        },
        ref
    ) => {
        const keyValuePairTokens =
            useResponsiveTokens<KeyValuePairTokensType>('KEYVALUEPAIR')

        return (
            <Block
                ref={ref}
                style={{
                    display: 'flex',
                    flexDirection:
                        keyValuePairState === KeyValuePairStateType.vertical
                            ? 'column'
                            : 'row',
                    justifyContent:
                        keyValuePairState === KeyValuePairStateType.horizontal
                            ? 'space-between'
                            : 'flex-start',
                    gap:
                        keyValuePairState === KeyValuePairStateType.vertical
                            ? keyValuePairTokens.gap.vertical
                            : keyValuePairTokens.gap.horizontal,
                    // Width strategy differs based on overflow mode:
                    // - 'wrap' mode: Use width: 100% with maxWidth constraint
                    //   This allows the component to be responsive and fill parent container
                    //   while still respecting maxWidth limit. Essential for grid layouts.
                    // - 'truncate'/'wrap-clamp': Use fixed width for consistent sizing
                    //   This ensures predictable layout and proper ellipsis truncation.
                    width: textOverflow === 'wrap' ? '100%' : maxWidth,
                    maxWidth: textOverflow === 'wrap' ? maxWidth : undefined,
                }}
            >
                <Block
                    style={{
                        display: 'flex',
                        gap: keyValuePairTokens.key.gap,
                        alignItems: 'center',
                    }}
                >
                    <ResponsiveText
                        className="flex-1 min-w-0"
                        fontSize={keyValuePairTokens.key.fontSize}
                        color={keyValuePairTokens.key.color}
                        fontWeight={keyValuePairTokens.key.fontWeight}
                        textOverflow={textOverflow}
                        maxLines={maxLines}
                        showTooltipOnTruncate={showTooltipOnTruncate}
                    >
                        {keyString}
                    </ResponsiveText>
                    {keySlot && (
                        <Block
                            flexShrink={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {keySlot}
                        </Block>
                    )}
                </Block>
                <Block
                    style={{
                        display: 'flex',
                        gap: keyValuePairTokens.value.gap,
                        alignItems: 'center',
                    }}
                >
                    {valueLeftSlot && (
                        <Block
                            flexShrink={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {valueLeftSlot}
                        </Block>
                    )}
                    <ResponsiveText
                        className="flex-1 min-w-0"
                        fontSize={keyValuePairTokens.value.fontSize[size]}
                        color={keyValuePairTokens.value.color}
                        fontWeight={keyValuePairTokens.value.fontWeight}
                        textOverflow={textOverflow}
                        maxLines={maxLines}
                        showTooltipOnTruncate={showTooltipOnTruncate}
                    >
                        {value || ''}
                    </ResponsiveText>
                    {valueRightSlot && (
                        <Block
                            flexShrink={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {valueRightSlot}
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }
)

KeyValuePair.displayName = 'KeyValuePair'

export default KeyValuePair
