import { forwardRef } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import { KeyValuePairV2Size } from '@juspay/blend-design-system/node'
import type { KeyValuePairV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseDimension, parseSize } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import Slot from '../../primitives/Slot'
import type { KeyValuePairNativeProps } from './keyValuePair.types'

/**
 * Key/value display — the native port of web's `KeyValuePairV2`.
 *
 * Pure layout: key text (with an optional slot) above or beside the value
 * row. Web's DOM truncation machinery (ResizeObserver + scrollHeight)
 * becomes RN's `numberOfLines`.
 */
const KeyValuePair = forwardRef<RNView, KeyValuePairNativeProps>(
    function KeyValuePair(
        {
            keyString,
            value,
            size = KeyValuePairV2Size.SM,
            orientation = 'vertical',
            slots,
            maxWidth,
            textOverflow = 'truncate',
            maxLines = 2,
            testID,
            style,
        },
        ref
    ) {
        const tokens =
            useNativeTokens<KeyValuePairV2TokensType>('KEYVALUEPAIRV2')

        const numberOfLines =
            textOverflow === 'truncate'
                ? 1
                : textOverflow === 'wrap-clamp'
                  ? maxLines
                  : undefined

        const horizontal = orientation === 'horizontal'

        return (
            <View
                ref={ref}
                testID={testID}
                style={[
                    {
                        flexDirection: horizontal ? 'row' : 'column',
                        alignItems: horizontal ? 'center' : 'flex-start',
                        gap:
                            parseDimension(
                                tokens.gap[orientation] as string | number
                            ) ?? 4,
                        maxWidth: parseSize(maxWidth) ?? 220,
                    },
                    style,
                ]}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap:
                            parseDimension(tokens.key.gap as string | number) ??
                            4,
                    }}
                >
                    <Text
                        fontSize={tokens.key.fontSize as string | number}
                        fontWeight={tokens.key.fontWeight as string | number}
                        color={String(tokens.key.color)}
                        numberOfLines={numberOfLines}
                        testID={testID ? `${testID}-key` : undefined}
                    >
                        {keyString}
                    </Text>
                    {slots?.key && <Slot>{slots.key}</Slot>}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexShrink: 1,
                        gap:
                            parseDimension(
                                tokens.value.gap as string | number
                            ) ?? 4,
                    }}
                >
                    {slots?.valueLeft && <Slot>{slots.valueLeft}</Slot>}
                    {value !== undefined && (
                        <Text
                            fontSize={
                                tokens.value.fontSize[size] as string | number
                            }
                            fontWeight={
                                tokens.value.fontWeight as string | number
                            }
                            color={String(tokens.value.color)}
                            numberOfLines={numberOfLines}
                            style={{ flexShrink: 1 }}
                            testID={testID ? `${testID}-value` : undefined}
                        >
                            {value}
                        </Text>
                    )}
                    {slots?.valueRight && <Slot>{slots.valueRight}</Slot>}
                </View>
            </View>
        )
    }
)

KeyValuePair.displayName = 'KeyValuePair'

export default KeyValuePair
