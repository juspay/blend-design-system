import {
    forwardRef,
    useRef,
    useEffect,
    useState,
    useId,
    useCallback,
} from 'react'
import type { CSSObject } from 'styled-components'
import React from 'react'
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
import { TruncatedTextWithTooltipV2 } from '../common/TruncatedTextWithTooltipV2'
import { TooltipV2Side } from '../TooltipV2/tooltipV2.types'
import {
    getTextStyles,
    getPrimitiveTextStyles,
    getContainerStyles,
    getLayoutStyles,
    getSlotStyles,
} from './utils'
import { useResizeObserver } from '../../hooks/useResizeObserver'

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

    useResizeObserver(textRef, handleResize)

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
                        showTooltipOnTruncate={showTooltipOnTruncate}
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
                        fontSize={keyValuePairTokens.value.fontSize[size]}
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

KeyValuePair.displayName = 'KeyValuePair'

export default KeyValuePair
