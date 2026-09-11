import { forwardRef, useRef, useState } from 'react'
import { Platform, View } from 'react-native'
import type {
    TextInput as RNTextInput,
    TextInputKeyPressEventData,
    NativeSyntheticEvent,
    View as RNView,
} from 'react-native'
import { InputSizeV2 } from '@juspay/blend-design-system/node'
import type { OTPInputV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useControllableState } from '../../hooks/useControllableState'
import Block from '../../primitives/Block'
import PrimitiveInput from '../../primitives/PrimitiveInput'
import { FieldLabels } from '../shared/field/FieldLabels'
import { FieldFooter } from '../shared/field/FieldFooter'
import { getFieldState, getFieldVisualState } from '../shared/field/fieldState'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import type { OTPInputNativeProps } from './otpInput.types'
import {
    buildCellLabel,
    clampOtpSlotLength,
    otpToCells,
    processCellChange,
} from './otpInput.utils'

/**
 * One-time-code input — the native port of web's `OTPInputV2`.
 *
 * N single-character cells (no hidden master input, like web). The first
 * cell carries `textContentType="oneTimeCode"` (iOS) and
 * `autoComplete="sms-otp"` (Android) so OS autofill lands there and
 * spreads across the cells as a digit run; Backspace on an empty cell
 * moves back.
 */
const OTPInput = forwardRef<RNView, OTPInputNativeProps>(function OTPInput(
    {
        value,
        onChange,
        length,
        label,
        subLabel,
        error = false,
        errorMessage,
        hintText,
        autoFocus = false,
        required = false,
        disabled = false,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<OTPInputV2TokensType>('OTP_INPUTV2')
    const slots = clampOtpSlotLength(length)
    const [currentValue, setCurrentValue] = useControllableState<string>(
        value,
        '',
        onChange
    )
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
    const cellRefs = useRef<Array<RNTextInput | null>>([])

    const cells = otpToCells(currentValue, slots)
    const fieldError = error ? { show: true, message: errorMessage } : undefined
    const fieldState = getFieldState(fieldError, disabled)

    const input = tokens.inputContainer.input
    const cellWidth = parseDimension(input.width as string | number) ?? 42
    const cellHeight = parseDimension(input.height as string | number) ?? 48
    const cellRadius =
        parseDimension(input.borderRadius as string | number) ?? 12

    const commitCells = (nextCells: string[], focusIndex: number | null) => {
        setCurrentValue(nextCells.join(''))
        if (focusIndex !== null) {
            cellRefs.current[focusIndex]?.focus()
        }
    }

    const handleCellChange = (index: number, raw: string) => {
        const change = processCellChange(cells, index, raw)
        commitCells(change.cells, change.focusIndex)
    }

    const handleKeyPress = (
        index: number,
        event: NativeSyntheticEvent<TextInputKeyPressEventData>
    ) => {
        if (
            event.nativeEvent.key === 'Backspace' &&
            cells[index] === '' &&
            index > 0
        ) {
            const next = [...cells]
            next[index - 1] = ''
            commitCells(next, index - 1)
        }
    }

    const cellState = (index: number) =>
        getFieldVisualState(fieldError, disabled, focusedIndex === index)

    return (
        <Block
            ref={ref}
            gap={tokens.gap as string | number}
            style={style}
            testID={testID}
            accessibilityLabel={label ?? 'One-time code'}
        >
            <FieldLabels
                label={label}
                sublabel={subLabel}
                required={required}
                size={InputSizeV2.MD}
                state={fieldState}
                tokens={tokens.topContainer}
                testID={testID ? `${testID}-labels` : undefined}
            />
            <View
                style={{
                    flexDirection: 'row',
                    gap:
                        parseDimension(
                            tokens.inputContainer.gap as string | number
                        ) ?? 8,
                }}
            >
                {cells.map((cell, index) => {
                    const state = cellState(index)
                    return (
                        <View
                            key={index}
                            style={{
                                width: cellWidth,
                                height: cellHeight,
                                borderRadius: cellRadius,
                                backgroundColor: String(
                                    input.backgroundColor[state] ??
                                        'transparent'
                                ),
                                ...parseBorder(
                                    String(input.border[state] ?? 'none')
                                ),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <PrimitiveInput
                                ref={(node) => {
                                    cellRefs.current[index] = node
                                }}
                                value={cell}
                                onChangeText={(raw) =>
                                    handleCellChange(index, raw)
                                }
                                onKeyPress={(event) =>
                                    handleKeyPress(index, event)
                                }
                                keyboardType="number-pad"
                                autoFocus={autoFocus && index === 0}
                                editable={!disabled}
                                fontSize={input.fontSize as string | number}
                                fontWeight={input.fontWeight as string | number}
                                color={String(
                                    input.color?.[state] ?? '#000000'
                                )}
                                textAlign="center"
                                accessibilityLabel={buildCellLabel(
                                    label,
                                    index,
                                    slots
                                )}
                                accessibilityState={{ disabled }}
                                onFocus={() => setFocusedIndex(index)}
                                onBlur={() =>
                                    setFocusedIndex((current) =>
                                        current === index ? null : current
                                    )
                                }
                                // OS one-time-code autofill lands on the
                                // first cell and spreads as a digit run.
                                textContentType={
                                    index === 0 && Platform.OS === 'ios'
                                        ? 'oneTimeCode'
                                        : undefined
                                }
                                autoComplete={
                                    index === 0 && Platform.OS === 'android'
                                        ? 'sms-otp'
                                        : undefined
                                }
                                testID={
                                    testID
                                        ? `${testID}-cell-${index}`
                                        : undefined
                                }
                                style={{
                                    flex: 0,
                                    width: cellWidth,
                                    height: cellHeight,
                                }}
                            />
                        </View>
                    )
                })}
            </View>
            <FieldFooter
                error={fieldError}
                hintText={hintText}
                size={InputSizeV2.MD}
                tokens={tokens.bottomContainer}
                testID={testID ? `${testID}-footer` : undefined}
            />
        </Block>
    )
})

OTPInput.displayName = 'OTPInput'

export default OTPInput
