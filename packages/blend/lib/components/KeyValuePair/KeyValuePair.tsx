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
                setIsTruncated(element.scrollWidth > element.clientWidth)
            } else if (textOverflow === 'wrap-clamp') {
                setIsTruncated(element.scrollHeight > element.clientHeight)
            }
        }

        checkTruncation()
        window.addEventListener('resize', checkTruncation)
        return () => window.removeEventListener('resize', checkTruncation)
    }, [children, textOverflow, maxLines])

    // Get styles based on overflow mode
    const getTextStyles = (): CSSObject => {
        const baseStyles: CSSObject = {
            width: '100%',
        }

        switch (textOverflow) {
            case 'truncate':
                return {
                    ...baseStyles,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }
            case 'wrap':
                return {
                    ...baseStyles,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }
            case 'wrap-clamp':
                // Note: line clamping is not supported in all browsers (notably older Firefox).
                // This style provides both standard and WebKit-prefixed properties for best compatibility.
                // Consider documenting browser requirements if full support is needed.
                return {
                    ...baseStyles,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    WebkitLineClamp: maxLines,
                    lineClamp: maxLines,
                    WebkitBoxOrient: 'vertical',
                    boxOrient: 'vertical',
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
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
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
