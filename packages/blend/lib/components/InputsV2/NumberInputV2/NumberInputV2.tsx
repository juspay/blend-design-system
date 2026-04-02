import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import type { NumberInputV2Props } from './numberInputV2.types'
import { AnyRef, InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { NumberInputV2TokensType } from './numberInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import React, { forwardRef, useMemo, useState, useId } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import {
    sanitizeNumberInput,
    clampValueOnBlur,
    getEffectiveNumericValue,
    isValueOutsideRange,
    getRangeErrorMessage,
    incrementValue,
    decrementValue,
} from './utils'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import { setExternalRef } from '../TextInputV2/utils'
import NumberInputV2Stepper from './NumberInputV2Stepper'

const NumberInputV2 = forwardRef<HTMLInputElement, NumberInputV2Props>(
    (
        {
            value,
            onChange,
            min,
            max,
            step,
            error = { show: false, message: '' },
            required,
            disabled,
            size = InputSizeV2.MD,
            placeholder,
            label = { text: '', subtext: '' },
            helpIconText,
            hintText,
            name,
            preventNegative = false,
            onBlur,
            onFocus,
            id: providedId,
            ...rest
        },
        ref
    ) => {
        const numberInputTokens =
            useResponsiveTokens<NumberInputV2TokensType>('NUMBER_INPUT_V2')
        const inputContainerTokens = numberInputTokens.inputContainer
        const filteredRest = filterBlockedProps(rest)
        const generatedId = useId()
        const inputId = providedId ?? generatedId

        const setInputRef = (node: HTMLInputElement | null): void => {
            setExternalRef(ref as AnyRef<HTMLInputElement>, node)
        }
        const errorId = `${inputId}-error`
        const hintId = `${inputId}-hint`

        const [isFocused, setIsFocused] = useState(false)
        const [internalValue, setInternalValue] = useState('')
        const [internalError, setInternalError] = useState(false)
        const [internalErrorMessage, setInternalErrorMessage] =
            useState<string>()
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const inputFocusedOrWithValue = isFocused || value !== undefined
        const isSmallScreenWithLargeSize =
            isSmallScreen && size === InputSizeV2.LG

        const paddingX = inputContainerTokens.padding.x[size]
        const paddingY =
            toPixels(inputContainerTokens.padding.y[size]) +
            (isSmallScreenWithLargeSize ? 0.5 : 1)

        const hasError = internalError || Boolean(error?.show && error?.message)
        const displayErrorMessage =
            (error?.show && error?.message) || internalErrorMessage

        const ariaDescribedBy =
            [
                hintText && !hasError ? hintId : null,
                displayErrorMessage ? errorId : null,
            ]
                .filter(Boolean)
                .join(' ') || undefined

        const numericMin = min !== undefined ? Number(min) : undefined
        const numericMax = max !== undefined ? Number(max) : undefined
        const stepValue = step ?? 1

        const rawNumericValue =
            value !== null && value !== undefined ? Number(value) : null

        const effectiveNumericValue = useMemo(
            () =>
                getEffectiveNumericValue(
                    rawNumericValue,
                    preventNegative,
                    numericMin,
                    numericMax
                ),
            [rawNumericValue, preventNegative, numericMin, numericMax]
        )

        const labelState: InputStateV2 = disabled
            ? InputStateV2.DISABLED
            : hasError
              ? InputStateV2.ERROR
              : InputStateV2.DEFAULT

        const updateValue = (newValue: number, clearError = true): void => {
            if (rawNumericValue === newValue) return
            if (clearError) {
                setInternalError(false)
                setInternalErrorMessage(undefined)
            }
            const newValueString = String(newValue)
            setInternalValue(newValueString)
            onChange({
                target: { value: newValueString },
            } as React.ChangeEvent<HTMLInputElement>)
        }

        const isUpButtonDisabled =
            numericMax !== undefined &&
            (effectiveNumericValue === null
                ? (numericMin ?? 0) + stepValue > numericMax
                : effectiveNumericValue >= numericMax ||
                  effectiveNumericValue + stepValue > numericMax)

        const isDownButtonDisabled =
            effectiveNumericValue === null
                ? preventNegative ||
                  (numericMin !== undefined &&
                      (numericMin ?? 0) - stepValue < numericMin)
                : (numericMin !== undefined &&
                      (effectiveNumericValue <= numericMin ||
                          effectiveNumericValue - stepValue < numericMin)) ||
                  (preventNegative &&
                      (effectiveNumericValue <= 0 ||
                          effectiveNumericValue - stepValue < 0))

        const bump = (direction: 'up' | 'down'): void => {
            if (direction === 'up') {
                if (isUpButtonDisabled) return
                updateValue(
                    incrementValue(
                        effectiveNumericValue,
                        stepValue,
                        numericMin,
                        numericMax,
                        preventNegative
                    )
                )
            } else {
                if (isDownButtonDisabled) return
                updateValue(
                    decrementValue(
                        effectiveNumericValue,
                        stepValue,
                        numericMin,
                        numericMax,
                        preventNegative
                    )
                )
            }
        }

        const displayValue = isFocused
            ? internalValue
            : value == null
              ? ''
              : effectiveNumericValue !== null
                ? String(effectiveNumericValue)
                : ''

        const borderState = hasError ? 'error' : 'default'

        const syncRangeErrorFromParsedNumber = (
            numValue: number | null
        ): void => {
            if (numValue === null || isNaN(numValue)) {
                setInternalError(false)
                setInternalErrorMessage(undefined)
                return
            }
            if (isValueOutsideRange(numValue, numericMin, numericMax)) {
                setInternalError(true)
                setInternalErrorMessage(
                    getRangeErrorMessage(numericMin, numericMax)
                )
            } else {
                setInternalError(false)
                setInternalErrorMessage(undefined)
            }
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const sanitized = sanitizeNumberInput(
                e.target.value,
                !preventNegative
            )
            setInternalValue(sanitized)

            const numValue =
                sanitized === '' || sanitized === '-' ? null : Number(sanitized)
            const valueString =
                numValue !== null && !isNaN(numValue) ? String(numValue) : ''
            const currentValueString =
                rawNumericValue !== null && !isNaN(rawNumericValue)
                    ? String(rawNumericValue)
                    : ''
            if (valueString === currentValueString) return

            syncRangeErrorFromParsedNumber(numValue)

            onChange({
                ...e,
                target: {
                    ...e.target,
                    value: valueString,
                },
            } as React.ChangeEvent<HTMLInputElement>)
        }

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
            const clamped = clampValueOnBlur(
                internalValue,
                !preventNegative,
                numericMin,
                numericMax
            )
            setInternalValue(clamped)
            setInternalError(false)
            setInternalErrorMessage(undefined)

            const clampedNumValue = clamped === '' ? null : Number(clamped)
            if (
                clamped !== e.target.value &&
                clampedNumValue !== rawNumericValue
            ) {
                onChange({
                    ...e,
                    target: {
                        ...e.target,
                        value: clamped,
                    },
                } as React.ChangeEvent<HTMLInputElement>)
            }

            setIsFocused(false)
            onBlur?.(e)
        }

        const handleKeyDown = (
            e: React.KeyboardEvent<HTMLInputElement>
        ): void => {
            if (e.key === 'ArrowUp' && !isUpButtonDisabled) {
                e.preventDefault()
                bump('up')
            } else if (e.key === 'ArrowDown' && !isDownButtonDisabled) {
                e.preventDefault()
                bump('down')
            }
        }

        return (
            <Block
                data-numberinput={label.text || 'numberinput'}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={numberInputTokens.gap}
                width="100%"
            >
                {(!isSmallScreen || size !== InputSizeV2.LG) && (
                    <InputLabelsV2
                        tokens={numberInputTokens.topContainer}
                        label={label.text}
                        sublabel={label.subtext}
                        helpIconText={
                            helpIconText ? { text: helpIconText } : undefined
                        }
                        inputId={inputId}
                        name={name}
                        required={required}
                        size={size}
                        state={labelState}
                    />
                )}
                <Block
                    position="relative"
                    width="100%"
                    display="flex"
                    borderRadius={inputContainerTokens.borderRadius[size]}
                >
                    {label && isSmallScreenWithLargeSize && (
                        <FloatingLabelsV2
                            label={label.text}
                            required={required || false}
                            name={name || ''}
                            inputId={inputId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={paddingY}
                            leftPadding={toPixels(paddingX)}
                            tokens={{
                                placeholder: inputContainerTokens.placeholder,
                                required:
                                    numberInputTokens.topContainer.required,
                            }}
                            size={size}
                            state={labelState}
                        />
                    )}
                    <PrimitiveInput
                        ref={setInputRef}
                        id={inputId}
                        lineHeight={inputContainerTokens.lineHeight[size]}
                        placeholderColor={
                            inputContainerTokens.placeholder.color.default
                        }
                        name={name}
                        type="text"
                        inputMode="numeric"
                        placeholder={
                            isSmallScreenWithLargeSize ? '' : placeholder
                        }
                        value={displayValue}
                        onChange={handleChange}
                        step={step}
                        min={numericMin}
                        max={numericMax}
                        required={required}
                        role="spinbutton"
                        aria-valuenow={effectiveNumericValue ?? undefined}
                        aria-valuemin={numericMin}
                        aria-valuemax={numericMax}
                        aria-required={required ? 'true' : undefined}
                        aria-invalid={hasError ? 'true' : 'false'}
                        aria-describedby={ariaDescribedBy}
                        paddingX={paddingX}
                        paddingTop={
                            isSmallScreenWithLargeSize &&
                            inputFocusedOrWithValue
                                ? paddingY * 1.5
                                : paddingY
                        }
                        paddingBottom={
                            isSmallScreenWithLargeSize &&
                            inputFocusedOrWithValue
                                ? paddingY / 2
                                : paddingY
                        }
                        borderRadius={inputContainerTokens.borderRadius[size]}
                        border={inputContainerTokens.border[borderState]}
                        fontSize={inputContainerTokens.fontSize[size]}
                        fontWeight={inputContainerTokens.fontWeight[size]}
                        color={
                            inputContainerTokens.color[
                                disabled ? 'disabled' : 'default'
                            ]
                        }
                        outline="none"
                        width="100%"
                        backgroundColor={
                            inputContainerTokens.backgroundColor[borderState]
                        }
                        transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                        placeholderStyles={{
                            transition: 'opacity 150ms ease-out',
                            opacity: isFocused ? 0 : 1,
                        }}
                        _hover={{
                            border: inputContainerTokens.border[
                                hasError ? 'error' : 'hover'
                            ],
                            backgroundColor:
                                inputContainerTokens.backgroundColor[
                                    hasError ? 'error' : 'hover'
                                ],
                        }}
                        _focus={{
                            border: inputContainerTokens.border[
                                hasError ? 'error' : 'focus'
                            ],
                            boxShadow: '0 0 0 3px #EFF6FF',
                            backgroundColor: 'rgba(239, 246, 255, 0.15)',
                        }}
                        _focusVisible={{
                            placeholderColor: 'transparent',
                        }}
                        disabled={disabled}
                        _disabled={{
                            backgroundColor:
                                inputContainerTokens.backgroundColor.disabled,
                            border: inputContainerTokens.border.disabled,
                            cursor: 'not-allowed',
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => {
                            setIsFocused(true)
                            setInternalValue(
                                effectiveNumericValue !== null
                                    ? String(effectiveNumericValue)
                                    : ''
                            )
                            onFocus?.(e)
                        }}
                        onBlur={handleBlur}
                        {...filteredRest}
                    />
                    <NumberInputV2Stepper
                        labelText={label.text}
                        disabled={disabled}
                        borderState={borderState}
                        isUpButtonDisabled={isUpButtonDisabled}
                        isDownButtonDisabled={isDownButtonDisabled}
                        onStep={bump}
                        inputContainerTokens={inputContainerTokens}
                        size={size}
                    />
                </Block>
                <InputFooterV2
                    error={Boolean(error?.show)}
                    errorMessage={displayErrorMessage}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    tokens={numberInputTokens.bottomContainer}
                    size={size}
                />
            </Block>
        )
    }
)

NumberInputV2.displayName = 'NumberInputV2'

export default NumberInputV2
