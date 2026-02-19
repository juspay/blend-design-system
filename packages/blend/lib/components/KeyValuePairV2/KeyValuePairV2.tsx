import { forwardRef, useRef, useEffect, useState, useId } from 'react'
import type { CSSObject } from 'styled-components'
import React from 'react'
import {
    KeyValuePairV2PropTypes,
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
    TextOverflowMode,
} from './KeyValuePairV2.types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { KeyValuePairV2TokensType } from './KeyValuePairV2.tokens'
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
    as: Component = 'div',
    id,
    role,
    slotPresent,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: {
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
                <Block style={{ width: '100%' }}>{textElement}</Block>
            </Tooltip>
        )
    }

    return textElement
}

const KeyValuePairV2 = forwardRef<HTMLDivElement, KeyValuePairV2PropTypes>(
    (
        {
            keyString,
            size = KeyValuePairV2Size.SMALL,
            value,
            keySlot,
            valueLeftSlot,
            valueRightSlot,
            keyValuePairState = KeyValuePairV2StateType.vertical,
            maxWidth = '220px',
            textOverflow = 'truncate',
            maxLines = 2,
            showTooltipOnTruncate = true,
        },
        ref
    ) => {
        const keyValuePairTokens =
            useResponsiveTokens<KeyValuePairV2TokensType>('KEYVALUEPAIR')

        const containerStyles = {
            ...getLayoutStyles(keyValuePairState, keyValuePairTokens),
            ...getContainerStyles(textOverflow, maxWidth),
        }

        const keyContainerStyles = {
            display: 'flex',
            gap: keyValuePairTokens.key.gap,
            alignItems: textOverflow !== 'truncate' ? 'self-start' : 'center',
        }

        const valueContainerStyles = {
            display: 'flex',
            gap: keyValuePairTokens.value.gap,
            alignItems: textOverflow !== 'truncate' ? 'self-start' : 'center',
        }

        const baseId = useId()
        const keyId = `${baseId}-key`
        const valueId = `${baseId}-value`
        const keyFlexClass = keySlot ? '' : 'flex-1'
        const valueFlexClass = valueRightSlot ? '' : 'flex-1'

        return (
            <Block
                data-keyvaluepair={keyString || 'keyvaluepair'}
                ref={ref}
                style={containerStyles as React.CSSProperties}
                role="group"
                aria-label={`${keyString}: ${value || ''}`}
            >
                <Block
                    data-element="key"
                    data-id={keyString || 'key'}
                    style={keyContainerStyles}
                >
                    <ResponsiveText
                        as="div"
                        className={`${keyFlexClass} min-w-0`}
                        fontSize={keyValuePairTokens.key.fontSize}
                        color={keyValuePairTokens.key.color}
                        fontWeight={keyValuePairTokens.key.fontWeight}
                        textOverflow="truncate"
                        maxLines={maxLines}
                        showTooltipOnTruncate={false}
                        id={keyId}
                        role="term"
                        slotPresent={!!keySlot}
                        aria-label={keyString}
                    >
                        {keyString}
                    </ResponsiveText>
                    {keySlot && (
                        <Block
                            data-element="key-slot"
                            style={getSlotStyles() as React.CSSProperties}
                        >
                            {keySlot}
                        </Block>
                    )}
                </Block>

                <Block
                    data-element="value"
                    data-id={value || 'value'}
                    style={valueContainerStyles}
                >
                    {valueLeftSlot && (
                        <Block
                            data-element="value-left-slot"
                            style={getSlotStyles() as React.CSSProperties}
                        >
                            {valueLeftSlot}
                        </Block>
                    )}
                    <ResponsiveText
                        as="div"
                        className={`${valueFlexClass} min-w-0`}
                        fontSize={
                            keyValuePairTokens.value.fontSize[
                                size as KeyValuePairV2Size
                            ]
                        }
                        color={keyValuePairTokens.value.color}
                        fontWeight={keyValuePairTokens.value.fontWeight}
                        textOverflow={textOverflow}
                        maxLines={maxLines}
                        showTooltipOnTruncate={showTooltipOnTruncate}
                        id={valueId}
                        role="definition"
                        slotPresent={!!valueRightSlot}
                        aria-labelledby={keyId}
                    >
                        {value || ''}
                    </ResponsiveText>
                    {valueRightSlot && (
                        <Block
                            data-element="value-right-slot"
                            style={getSlotStyles() as React.CSSProperties}
                        >
                            {valueRightSlot}
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }
)

KeyValuePairV2.displayName = 'KeyValuePairV2'

export default KeyValuePairV2
