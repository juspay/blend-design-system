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
import {
    getTextStyles,
    getPrimitiveTextStyles,
    getContainerStyles,
    getLayoutStyles,
    getSlotStyles,
} from './utils'

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

    useEffect(() => {
        const element = textRef.current
        if (!element || textOverflow === 'wrap' || !showTooltipOnTruncate) {
            setIsTruncated(false)
            return
        }

        const checkTruncation = () => {
            if (textOverflow === 'truncate') {
                const textElement = element.firstElementChild as HTMLElement
                if (textElement) {
                    const isOverflowing =
                        textElement.scrollWidth > textElement.clientWidth
                    setIsTruncated(isOverflowing)
                }
            } else if (textOverflow === 'wrap-clamp') {
                setIsTruncated(element.scrollHeight > element.clientHeight)
            }
        }

        const timeoutId = setTimeout(checkTruncation, 0)
        window.addEventListener('resize', checkTruncation)

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', checkTruncation)
        }
    }, [children, textOverflow, maxLines, showTooltipOnTruncate])

    const textElement = (
        <Block
            ref={textRef}
            className={className}
            style={getTextStyles(textOverflow, maxLines)}
        >
            <PrimitiveText
                fontSize={fontSize}
                color={color}
                fontWeight={fontWeight}
                style={getPrimitiveTextStyles(textOverflow)}
            >
                {children}
            </PrimitiveText>
        </Block>
    )

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

        const containerStyles = {
            ...getLayoutStyles(keyValuePairState, keyValuePairTokens),
            ...getContainerStyles(textOverflow, maxWidth),
        }

        const keyContainerStyles = {
            display: 'flex',
            gap: keyValuePairTokens.key.gap,
            alignItems: 'center',
        }

        const valueContainerStyles = {
            display: 'flex',
            gap: keyValuePairTokens.value.gap,
            alignItems: 'center',
        }

        return (
            <Block
                data-keyvaluepair={keyString || 'keyvaluepair'}
                ref={ref}
                style={containerStyles}
            >
                {/* Key Section */}
                <Block
                    data-element="key"
                    data-id={keyString || 'key'}
                    style={keyContainerStyles}
                >
                    <ResponsiveText
                        className="flex-1 min-w-0"
                        fontSize={keyValuePairTokens.key.fontSize}
                        color={keyValuePairTokens.key.color}
                        fontWeight={keyValuePairTokens.key.fontWeight}
                        textOverflow="wrap"
                        maxLines={maxLines}
                        showTooltipOnTruncate={false}
                    >
                        {keyString}
                    </ResponsiveText>
                    {keySlot && (
                        <Block data-element="key-slot" style={getSlotStyles()}>
                            {keySlot}
                        </Block>
                    )}
                </Block>

                {/* Value Section */}
                <Block
                    data-element="value"
                    data-id={value || 'value'}
                    style={valueContainerStyles}
                >
                    {valueLeftSlot && (
                        <Block
                            data-element="value-left-slot"
                            style={getSlotStyles()}
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
                            data-element="value-right-slot"
                            style={getSlotStyles()}
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
