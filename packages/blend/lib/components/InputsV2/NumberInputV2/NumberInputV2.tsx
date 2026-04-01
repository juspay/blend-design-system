import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import type { NumberInputV2Props } from './numberInputV2.types'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import type { NumberInputV2TokensType } from './numberInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import React, { useMemo, useState, useId } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import { Triangle } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../tokens'
import {
    sanitizeNumberInput,
    clampValueOnBlur,
    isValueOutsideRange,
    getRangeErrorMessage,
    incrementValue,
    decrementValue,
} from './utils'

const NumberInput = ({
    value,
    onChange,
    min,
    max,
    step,
    error = false,
    errorMessage,
    required,
    disabled,
    size = InputSizeV2.MD,
    placeholder,
    sublabel,
    helpIconHintText,
    label,
    hintText,
    name,
    preventNegative = false,
    onBlur,
    onFocus,
    ...rest
}: NumberInputV2Props) => {
    const numberInputV2Tokens =
        useResponsiveTokens<NumberInputV2TokensType>('NUMBER_INPUT_V2')

    const generatedId = useId()
    const inputId = rest.id || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState('')
    const [internalError, setInternalError] = useState(false)
    const [internalErrorMessage, setInternalErrorMessage] = useState<string>()
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value !== undefined
    const isSmallScreenWithLargeSize = isSmallScreen && size === InputSizeV2.LG

    const paddingX = numberInputV2Tokens.inputContainer.padding.x[size]
    const paddingY =
        toPixels(numberInputV2Tokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 1)

    const ariaDescribedBy =
        [
            hintText && !error ? hintId : null,
            error && errorMessage ? errorId : null,
        ]
            .filter(Boolean)
            .join(' ') || undefined

    const numericMin = min !== undefined ? Number(min) : undefined
    const numericMax = max !== undefined ? Number(max) : undefined
    const stepValue = step ?? 1

    const currentNumericValue =
        value !== null && value !== undefined ? Number(value) : null

    const hasError = error || internalError
    const displayErrorMessage = errorMessage || internalErrorMessage

    const labelState = useMemo((): InputStateV2 => {
        if (disabled) return InputStateV2.DISABLED
        if (hasError) return InputStateV2.ERROR
        return InputStateV2.DEFAULT
    }, [disabled, hasError])

    const updateValue = (
        newValue: number,
        clearError: boolean = true
    ): void => {
        const newValueString = String(newValue)

        if (currentNumericValue === newValue) return

        if (clearError) {
            setInternalError(false)
            setInternalErrorMessage(undefined)
        }
        setInternalValue(newValueString)
        onChange({
            target: {
                value: newValueString,
            },
        } as React.ChangeEvent<HTMLInputElement>)
    }

    const isUpButtonDisabled =
        numericMax !== undefined &&
        (currentNumericValue === null
            ? (numericMin ?? 0) + stepValue > numericMax
            : currentNumericValue >= numericMax ||
              currentNumericValue + stepValue > numericMax)

    const isDownButtonDisabled =
        currentNumericValue === null
            ? preventNegative ||
              (numericMin !== undefined &&
                  (numericMin ?? 0) - stepValue < numericMin)
            : (numericMin !== undefined &&
                  (currentNumericValue <= numericMin ||
                      currentNumericValue - stepValue < numericMin)) ||
              (preventNegative &&
                  (currentNumericValue <= 0 ||
                      currentNumericValue - stepValue < 0))

    const displayValue = isFocused
        ? internalValue
        : value !== null && value !== undefined
          ? String(value)
          : ''

    return (
        <Block
            data-numberinput={label || 'numberinput'}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={numberInputV2Tokens.gap}
            width="100%"
        >
            {(!isSmallScreen || size !== InputSizeV2.LG) && (
                <InputLabelsV2
                    tokens={numberInputV2Tokens.topContainer}
                    label={label}
                    sublabel={sublabel}
                    helpIconText={
                        helpIconHintText
                            ? { text: helpIconHintText }
                            : undefined
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
                width={'100%'}
                display="flex"
                borderRadius={
                    numberInputV2Tokens.inputContainer.borderRadius[size]
                }
            >
                {label && isSmallScreenWithLargeSize && (
                    <FloatingLabelsV2
                        label={label}
                        required={required || false}
                        name={name || ''}
                        inputId={inputId}
                        isInputFocusedOrWithValue={inputFocusedOrWithValue}
                        topPadding={paddingY}
                        leftPadding={toPixels(paddingX)}
                        tokens={{
                            placeholder:
                                numberInputV2Tokens.inputContainer.placeholder,
                            required: numberInputV2Tokens.topContainer.required,
                        }}
                        size={size}
                        state={labelState}
                    />
                )}
                <PrimitiveInput
                    id={inputId}
                    lineHeight={FOUNDATION_THEME.unit[20]}
                    placeholderColor={FOUNDATION_THEME.colors.gray[400]}
                    name={name}
                    type="text"
                    inputMode="numeric"
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    value={displayValue}
                    onChange={(e) => {
                        const inputValue = e.target.value
                        const sanitized = sanitizeNumberInput(
                            inputValue,
                            !preventNegative
                        )

                        setInternalValue(sanitized)

                        const numValue =
                            sanitized === '' || sanitized === '-'
                                ? null
                                : Number(sanitized)

                        const valueString =
                            numValue !== null && !isNaN(numValue)
                                ? String(numValue)
                                : ''

                        const currentValueString =
                            currentNumericValue !== null
                                ? String(currentNumericValue)
                                : ''
                        if (valueString === currentValueString) return

                        if (numValue !== null && !isNaN(numValue)) {
                            if (
                                isValueOutsideRange(
                                    numValue,
                                    numericMin,
                                    numericMax
                                )
                            ) {
                                setInternalError(true)
                                setInternalErrorMessage(
                                    getRangeErrorMessage(numericMin, numericMax)
                                )
                            } else {
                                setInternalError(false)
                                setInternalErrorMessage(undefined)
                            }
                        } else {
                            setInternalError(false)
                            setInternalErrorMessage(undefined)
                        }

                        onChange({
                            ...e,
                            target: {
                                ...e.target,
                                value: valueString,
                            },
                        } as React.ChangeEvent<HTMLInputElement>)
                    }}
                    step={step}
                    min={numericMin}
                    max={numericMax}
                    required={required}
                    role="spinbutton"
                    aria-valuenow={
                        value !== null &&
                        value !== undefined &&
                        !isNaN(Number(value))
                            ? Number(value)
                            : undefined
                    }
                    aria-valuemin={numericMin}
                    aria-valuemax={numericMax}
                    aria-required={required ? 'true' : undefined}
                    aria-invalid={hasError ? 'true' : 'false'}
                    aria-describedby={ariaDescribedBy}
                    paddingX={paddingX}
                    paddingTop={
                        isSmallScreenWithLargeSize && inputFocusedOrWithValue
                            ? paddingY * 1.5
                            : paddingY
                    }
                    paddingBottom={
                        isSmallScreenWithLargeSize && inputFocusedOrWithValue
                            ? paddingY / 2
                            : paddingY
                    }
                    borderRadius={
                        numberInputV2Tokens.inputContainer.borderRadius[size]
                    }
                    border={
                        numberInputV2Tokens.inputContainer.border[
                            hasError ? 'error' : 'default'
                        ]
                    }
                    fontSize={numberInputV2Tokens.inputContainer.fontSize[size]}
                    fontWeight={
                        numberInputV2Tokens.inputContainer.fontWeight[size]
                    }
                    color={
                        numberInputV2Tokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    outline="none"
                    width={'100%'}
                    backgroundColor={
                        numberInputV2Tokens.inputContainer.backgroundColor[
                            hasError ? 'error' : 'default'
                        ]
                    }
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _hover={{
                        border: numberInputV2Tokens.inputContainer.border[
                            hasError ? 'error' : 'hover'
                        ],
                        backgroundColor:
                            numberInputV2Tokens.inputContainer.backgroundColor[
                                hasError ? 'error' : 'hover'
                            ],
                    }}
                    _focus={{
                        border: numberInputV2Tokens.inputContainer.border[
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
                            numberInputV2Tokens.inputContainer.backgroundColor
                                .disabled,
                        border: numberInputV2Tokens.inputContainer.border
                            .disabled,
                        cursor: 'not-allowed',
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowUp' && !isUpButtonDisabled) {
                            e.preventDefault()
                            const newValue = incrementValue(
                                currentNumericValue,
                                stepValue,
                                numericMin,
                                numericMax,
                                preventNegative
                            )
                            updateValue(newValue)
                        } else if (
                            e.key === 'ArrowDown' &&
                            !isDownButtonDisabled
                        ) {
                            e.preventDefault()
                            const newValue = decrementValue(
                                currentNumericValue,
                                stepValue,
                                numericMin,
                                numericMax,
                                preventNegative
                            )
                            updateValue(newValue)
                        }
                    }}
                    onFocus={(e) => {
                        setIsFocused(true)
                        setInternalValue(
                            value !== null && value !== undefined
                                ? String(value)
                                : ''
                        )
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        const clamped = clampValueOnBlur(
                            internalValue,
                            !preventNegative,
                            numericMin,
                            numericMax
                        )

                        setInternalValue(clamped)
                        setInternalError(false)
                        setInternalErrorMessage(undefined)

                        const clampedNumValue =
                            clamped === '' ? null : Number(clamped)
                        if (
                            clamped !== e.target.value &&
                            clampedNumValue !== currentNumericValue
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
                    }}
                    {...rest}
                />
                <Block
                    data-element="stepper"
                    display="flex"
                    flexDirection="column"
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    margin={1}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={1}
                        as="span"
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        zIndex={1}
                        borderLeft={
                            disabled
                                ? numberInputV2Tokens.inputContainer.border
                                      .disabled
                                : numberInputV2Tokens.inputContainer.border[
                                      hasError ? 'error' : 'default'
                                  ]
                        }
                    ></Block>
                    <PrimitiveButton
                        type="button"
                        aria-label={
                            label ? `Increase ${label}` : 'Increase value'
                        }
                        onClick={() => {
                            if (isUpButtonDisabled) return
                            const newValue = incrementValue(
                                currentNumericValue,
                                stepValue,
                                numericMin,
                                numericMax,
                                preventNegative
                            )
                            updateValue(newValue)
                        }}
                        backgroundColor={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        width={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .width[size]
                        }
                        height={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .width[size]
                        }
                        contentCentered
                        borderRadius={`0 ${numberInputV2Tokens.inputContainer.borderRadius[size]} 0 0`}
                        disabled={disabled || isUpButtonDisabled}
                        _focus={{
                            backgroundColor:
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .backgroundColor.focus,
                        }}
                        _hover={{
                            backgroundColor:
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .backgroundColor.hover,
                        }}
                        _disabled={{
                            backgroundColor: disabled
                                ? numberInputV2Tokens.inputContainer
                                      .stepperButton.backgroundColor.disabled
                                : numberInputV2Tokens.inputContainer
                                      .stepperButton.backgroundColor.default,
                            cursor: 'not-allowed',
                        }}
                    >
                        {/* <TriangleSVG direction="up" /> */}
                        <Triangle
                            style={{
                                opacity: disabled
                                    ? 1
                                    : isUpButtonDisabled
                                      ? 0.3
                                      : 1,
                            }}
                            direction="up"
                            color={
                                disabled
                                    ? numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            fill={
                                disabled
                                    ? numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            size={
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .icon.width[size]
                            }
                        />
                    </PrimitiveButton>
                    <PrimitiveButton
                        type="button"
                        aria-label={
                            label ? `Decrease ${label}` : 'Decrease value'
                        }
                        onClick={() => {
                            if (isDownButtonDisabled) return
                            const newValue = decrementValue(
                                currentNumericValue,
                                stepValue,
                                numericMin,
                                numericMax,
                                preventNegative
                            )
                            updateValue(newValue)
                        }}
                        backgroundColor={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        width={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .width[size]
                        }
                        height={
                            numberInputV2Tokens.inputContainer.stepperButton
                                .width[size]
                        }
                        contentCentered
                        borderRadius={`0 0px ${numberInputV2Tokens.inputContainer.borderRadius[size]} 0`}
                        _focus={{
                            backgroundColor:
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .backgroundColor.focus,
                        }}
                        _hover={{
                            backgroundColor:
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .backgroundColor.hover,
                            borderTop:
                                numberInputV2Tokens.inputContainer.border
                                    .disabled,
                        }}
                        _disabled={{
                            backgroundColor: disabled
                                ? numberInputV2Tokens.inputContainer
                                      .stepperButton.backgroundColor.disabled
                                : numberInputV2Tokens.inputContainer
                                      .stepperButton.backgroundColor.default,
                            borderTop:
                                numberInputV2Tokens.inputContainer.border
                                    .disabled,
                            cursor: 'not-allowed',
                        }}
                        borderTop={
                            numberInputV2Tokens.inputContainer.border.disabled
                        }
                        disabled={disabled || isDownButtonDisabled}
                    >
                        <Triangle
                            style={{
                                transform: 'rotate(180deg)',
                                opacity: disabled
                                    ? 1
                                    : isDownButtonDisabled
                                      ? 0.3
                                      : 1,
                            }}
                            color={
                                disabled
                                    ? numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            fill={
                                disabled
                                    ? numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputV2Tokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            size={
                                numberInputV2Tokens.inputContainer.stepperButton
                                    .icon.width[size]
                            }
                        />
                    </PrimitiveButton>
                </Block>
            </Block>
            <InputFooterV2
                error={hasError}
                errorMessage={displayErrorMessage}
                hintText={hintText}
                errorId={errorId}
                hintId={hintId}
                tokens={numberInputV2Tokens.bottomContainer}
                size={size}
            />
        </Block>
    )
}

export default NumberInput
