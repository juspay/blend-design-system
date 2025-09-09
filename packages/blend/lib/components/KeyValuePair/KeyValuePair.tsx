import { forwardRef } from 'react'
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
}: {
    children: string
    fontSize: any
    color: any
    className?: string
}) => {
    // For now, show tooltip for any text longer than 15 characters to test
    const shouldShowTooltip = children.length > 15

    const textElement = (
        <div
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
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                }}
            >
                {children}
            </PrimitiveText>
        </div>
    )

    if (shouldShowTooltip) {
        return (
            <Tooltip content={children} side={TooltipSide.TOP}>
                <div style={{ width: '100%' }}>{textElement}</div>
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
                className={`flex ${keyValuePairState === KeyValuePairStateType.vertical ? `flex-col gap-2` : 'flex-row justify-between gap-1'}`}
                width={maxWidth}
                // maxWidth={keyValuePairTokens.maxWidth}
            >
                <div className="flex gap-2 items-center">
                    <TruncatedText
                        className="flex-1 min-w-0"
                        fontSize={keyValuePairTokens.keyFontSize}
                        color={keyValuePairTokens.keyColor}
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
                </div>
                <div className="flex gap-2 items-center">
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
                            keyValuePairTokens.valueFontSize[size][
                                keyValuePairState
                            ]
                        }
                        color={keyValuePairTokens.valueColor}
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
                </div>
            </Block>
        )
    }
)

KeyValuePair.displayName = 'KeyValuePair'

export default KeyValuePair
