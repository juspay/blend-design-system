import { forwardRef, useState } from 'react'
import { Pressable as RNPressable, View } from 'react-native'
import type { AccessibilityActionEvent, View as RNView } from 'react-native'
import { ChevronDown, ChevronUp } from 'lucide-react-native'
import {
    InputSizeV2,
    NumberInputV2Direction,
} from '@juspay/blend-design-system/node'
import type { NumberInputV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Block from '../../primitives/Block'
import PrimitiveInput from '../../primitives/PrimitiveInput'
import Text from '../../primitives/Text'
import { FieldLabels } from '../shared/field/FieldLabels'
import { FieldFooter } from '../shared/field/FieldFooter'
import { getFieldState, getFieldVisualState } from '../shared/field/fieldState'
import { parseDimension } from '../../adapters/cssStringAdapter'
import type { NumberInputNativeProps } from './numberInput.types'
import {
    clampValueOnBlur,
    getDisplayValue,
    getRangeErrorMessage,
    isStepDownDisabled,
    isStepUpDisabled,
    isUnitTooLong,
    parseNumberInput,
    sanitizeNumberInput,
} from './numberInput.utils'

/**
 * Numeric field — the native port of web's `NumberInputV2`.
 *
 * Typing stays raw and sanitized; clamping happens on blur (web parity).
 * Stepper buttons render when there is no unit, exactly web's rule
 * (chevrons instead of web's Phosphor triangles — icon divergence). Out of
 * range auto-raises the footer error. Announced as an adjustable with
 * increment/decrement accessibility actions — more idiomatic than web's
 * ARIA spinbutton.
 */
const NumberInput = forwardRef<RNView, NumberInputNativeProps>(
    function NumberInput(
        {
            value,
            onValueChange,
            min,
            max,
            step = 1,
            preventNegative = false,
            unit,
            unitDirection = NumberInputV2Direction.RIGHT,
            label,
            subLabel,
            size = InputSizeV2.MD,
            error,
            hintText,
            required = false,
            disabled = false,
            placeholder,
            name: _name,
            testID,
            accessibilityLabel,
            style,
            inputRef,
        },
        ref
    ) {
        const tokens =
            useNativeTokens<NumberInputV2TokensType>('NUMBER_INPUT_V2')
        const [focused, setFocused] = useState(false)
        const [internal, setInternal] = useState(
            value === null ? '' : String(value)
        )

        const unitTooLong = isUnitTooLong(unit)
        const showUnit = Boolean(unit) && !unitTooLong
        const rangeMessage = getRangeErrorMessage(value, min, max)
        const fieldError =
            error?.show || rangeMessage || unitTooLong
                ? {
                      show: true,
                      message:
                          error?.message ??
                          rangeMessage ??
                          (unitTooLong
                              ? `Unit must be at most 7 characters`
                              : undefined),
                  }
                : undefined

        const fieldState = getFieldState(fieldError, disabled)
        const visualState = getFieldVisualState(fieldError, disabled, focused)
        const container = tokens.inputContainer

        const commit = (next: number | null) => {
            onValueChange?.(next)
        }

        const handleChangeText = (raw: string) => {
            const sanitized = sanitizeNumberInput(raw)
            setInternal(sanitized)
            commit(parseNumberInput(sanitized))
        }

        const handleFocus = () => {
            setInternal(value === null ? '' : String(value))
            setFocused(true)
        }

        const handleBlur = () => {
            setFocused(false)
            const clamped = clampValueOnBlur(
                parseNumberInput(internal),
                min,
                max,
                preventNegative
            )
            setInternal(clamped === null ? '' : String(clamped))
            commit(clamped)
        }

        const stepBy = (direction: 1 | -1) => {
            const next = clampValueOnBlur(
                (value ?? 0) + direction * step,
                min,
                max,
                preventNegative
            )
            setInternal(next === null ? '' : String(next))
            commit(next)
        }

        const upDisabled = disabled || isStepUpDisabled(value, step, max)
        const downDisabled =
            disabled || isStepDownDisabled(value, step, min, preventNegative)

        const onAccessibilityAction = (event: AccessibilityActionEvent) => {
            if (event.nativeEvent.actionName === 'increment' && !upDisabled) {
                stepBy(1)
            }
            if (event.nativeEvent.actionName === 'decrement' && !downDisabled) {
                stepBy(-1)
            }
        }

        const unitBox = showUnit && (
            <View
                style={{
                    justifyContent: 'center',
                    paddingHorizontal:
                        parseDimension(
                            tokens.unit.paddingRight[size] as string | number
                        ) ?? 12,
                }}
                testID={testID ? `${testID}-unit` : undefined}
            >
                <Text
                    fontSize={tokens.unit.fontSize[size] as string | number}
                    fontWeight={tokens.unit.fontWeight[size] as string | number}
                    aria-hidden
                >
                    {unit?.trim()}
                </Text>
            </View>
        )

        const stepper = !showUnit && (
            <View
                style={{
                    justifyContent: 'center',
                    width:
                        parseDimension(
                            container.stepperButton.width[size] as
                                | string
                                | number
                        ) ?? 32,
                    alignItems: 'center',
                }}
            >
                <RNPressable
                    onPress={() => stepBy(1)}
                    disabled={upDisabled}
                    accessibilityRole="button"
                    accessibilityLabel={`Increase ${label ?? 'value'}`}
                    hitSlop={4}
                    testID={testID ? `${testID}-step-up` : undefined}
                >
                    <ChevronUp
                        size={14}
                        color={String(
                            container.stepperButton.icon.color[
                                upDisabled ? 'disabled' : 'default'
                            ] ?? '#99A0AE'
                        )}
                    />
                </RNPressable>
                <RNPressable
                    onPress={() => stepBy(-1)}
                    disabled={downDisabled}
                    accessibilityRole="button"
                    accessibilityLabel={`Decrease ${label ?? 'value'}`}
                    hitSlop={4}
                    testID={testID ? `${testID}-step-down` : undefined}
                >
                    <ChevronDown
                        size={14}
                        color={String(
                            container.stepperButton.icon.color[
                                downDisabled ? 'disabled' : 'default'
                            ] ?? '#99A0AE'
                        )}
                    />
                </RNPressable>
            </View>
        )

        return (
            <Block
                ref={ref}
                gap={tokens.gap as string | number}
                style={style}
                testID={testID}
            >
                <FieldLabels
                    label={label}
                    sublabel={subLabel}
                    required={required}
                    size={size}
                    state={fieldState}
                    tokens={tokens.topContainer}
                    testID={testID ? `${testID}-labels` : undefined}
                />
                <Block
                    flexDirection="row"
                    alignItems="stretch"
                    border={String(container.border[visualState] ?? 'none')}
                    backgroundColor={String(
                        container.backgroundColor[visualState] ?? 'transparent'
                    )}
                    borderRadius={
                        container.borderRadius[size] as string | number
                    }
                    overflow="hidden"
                    testID={testID ? `${testID}-container` : undefined}
                >
                    {unitDirection === NumberInputV2Direction.LEFT && unitBox}
                    <Block
                        flexGrow={1}
                        flexShrink={1}
                        flexDirection="row"
                        alignItems="center"
                        paddingTop={
                            container.paddingTop[size] as string | number
                        }
                        paddingBottom={
                            container.paddingBottom[size] as string | number
                        }
                        paddingLeft={
                            container.paddingLeft[size] as string | number
                        }
                        paddingRight={
                            container.paddingRight[size] as string | number
                        }
                    >
                        <PrimitiveInput
                            ref={inputRef}
                            value={getDisplayValue(internal, focused, value)}
                            onChangeText={handleChangeText}
                            keyboardType={
                                preventNegative ? 'number-pad' : 'numeric'
                            }
                            placeholder={placeholder}
                            placeholderColor={String(
                                container.placeholder.color[visualState] ??
                                    undefined
                            )}
                            fontSize={
                                container.fontSize[size] as string | number
                            }
                            fontWeight={
                                container.fontWeight[size] as string | number
                            }
                            lineHeight={
                                container.lineHeight[size] as string | number
                            }
                            color={String(
                                container.color[visualState] ?? '#000000'
                            )}
                            editable={!disabled}
                            accessibilityLabel={accessibilityLabel ?? label}
                            accessibilityRole="adjustable"
                            accessibilityValue={{
                                min,
                                max,
                                now: value ?? undefined,
                            }}
                            accessibilityActions={[
                                { name: 'increment' },
                                { name: 'decrement' },
                            ]}
                            onAccessibilityAction={onAccessibilityAction}
                            accessibilityState={{ disabled }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            testID={testID ? `${testID}-input` : undefined}
                        />
                    </Block>
                    {unitDirection === NumberInputV2Direction.RIGHT && unitBox}
                    {stepper}
                </Block>
                <FieldFooter
                    error={fieldError}
                    hintText={hintText}
                    size={size}
                    tokens={tokens.bottomContainer}
                    testID={testID ? `${testID}-footer` : undefined}
                />
            </Block>
        )
    }
)

NumberInput.displayName = 'NumberInput'

export default NumberInput
