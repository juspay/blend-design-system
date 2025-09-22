import { forwardRef } from 'react'
import type { CSSObject } from 'styled-components'
import {
    KeyValuePairPropTypes,
    KeyValuePairSize,
    KeyValuePairStateType,
} from './types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { KeyValuePairTokensType } from './KeyValuePair.tokens'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Tooltip from '../Tooltip/Tooltip'
import { TooltipSide } from '../Tooltip/types'

// Helper component to handle text truncation with tooltips
const TruncatedText = ({
    children,
    fontSize,
    color,
    className,
    fontWeight,
}: {
    children: string
    fontSize: CSSObject['fontSize']
    color: CSSObject['color']
    className?: string
    fontWeight?: CSSObject['fontWeight']
}) => {
    // For now, show tooltip for any text longer than 15 characters to test
    const shouldShowTooltip = children.length > 15

    const textElement = (
        <Block
            className={`${className || ''}`}
            style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
            }}
        >
            <PrimitiveText
                fontSize={fontSize}
                color={color}
                fontWeight={fontWeight}
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                }}
            >
                {children}
            </PrimitiveText>
        </Block>
    )

    if (shouldShowTooltip) {
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
            maxWidth = '200px',
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
                    gap: keyValuePairTokens.gap,
                    width: maxWidth,
                }}
            >
                <Block
                    style={{
                        display: 'flex',
                        gap: keyValuePairTokens.gap,
                        alignItems: 'center',
                    }}
                >
                    <TruncatedText
                        className="flex-1 min-w-0"
                        fontSize={keyValuePairTokens.key.fontSize}
                        color={keyValuePairTokens.key.color}
                    >
                        {keyString}
                    </TruncatedText>
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
                        gap: keyValuePairTokens.gap,
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
                    <TruncatedText
                        className="flex-1 min-w-0"
                        fontSize={
                            keyValuePairTokens.value.fontSize[size][
                                keyValuePairState
                            ]
                        }
                        color={keyValuePairTokens.value.color}
                        fontWeight={keyValuePairTokens.value.fontWeight}
                    >
                        {value || ''}
                    </TruncatedText>
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
