import { forwardRef } from 'react'
import { KeyValuePairPropTypes, KeyValuePairStateType } from './types'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { KeyValuePairTokensType } from './KeyValuePair.tokens'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'

const KeyValuePair = forwardRef<HTMLDivElement, KeyValuePairPropTypes>(
    (
        {
            keyString,
            value,
            keySlot,
            valueLeftSlot,
            valueRightSlot,
            keyValuePairState = KeyValuePairStateType.vertical,
        },
        ref
    ) => {
        const keyValuePairTokens =
            useResponsiveTokens<KeyValuePairTokensType>('KEYVALUEPAIR')
        return (
            <Block
                ref={ref}
                className={`flex ${keyValuePairState === KeyValuePairStateType.vertical ? `flex-col gap-2` : 'flex-row justify-between gap-2'}`}
                width={keyValuePairTokens.maxWidth}
                // maxWidth={keyValuePairTokens.maxWidth}
            >
                <div className="flex gap-2 items-center ">
                    <PrimitiveText
                        className="w-full"
                        fontSize={keyValuePairTokens.keyFontSize}
                        color={keyValuePairTokens.keyColor}
                    >
                        {keyString}
                    </PrimitiveText>
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
                    <div className="flex gap-2 items-center w-full">
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
                        <PrimitiveText
                            fontSize={keyValuePairTokens.valueFontSize}
                            color={keyValuePairTokens.valueColor}
                        >
                            {value}
                        </PrimitiveText>
                    </div>
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
