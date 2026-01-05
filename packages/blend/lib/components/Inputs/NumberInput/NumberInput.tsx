import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import type { NumberInputProps } from './types'
import { NumberInputSize } from './types'
import type { NumberInputTokensType } from './numberInput.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import React, { useState, useId } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { Triangle } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../tokens'
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import styled from 'styled-components'
import {
    sanitizeNumberInput,
    clampValueOnBlur,
    isValueOutsideRange,
    getRangeErrorMessage,
    incrementValue,
    decrementValue,
} from './utils'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

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
    size = NumberInputSize.MEDIUM,
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
}: NumberInputProps) => {
    const numberInputTokens =
        useResponsiveTokens<NumberInputTokensType>('NUMBER_INPUT')

    const generatedId = useId()
    const inputId = rest.id || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState('')
    const [internalError, setInternalError] = useState(false)
    const [internalErrorMessage, setInternalErrorMessage] = useState<string>()
    const shouldShake = useErrorShake(error || internalError)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value !== undefined
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === NumberInputSize.LARGE

    const paddingX = numberInputTokens.inputContainer.padding.x[size]
    const paddingY =
        toPixels(numberInputTokens.inputContainer.padding.y[size]) +
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
        disabled ||
        (numericMax !== undefined &&
            (currentNumericValue === null
                ? (numericMin ?? 0) + stepValue > numericMax
                : currentNumericValue >= numericMax ||
                  currentNumericValue + stepValue > numericMax))

    const isDownButtonDisabled =
        disabled ||
        (currentNumericValue === null
            ? preventNegative ||
              (numericMin !== undefined &&
                  (numericMin ?? 0) - stepValue < numericMin)
            : (numericMin !== undefined &&
                  (currentNumericValue <= numericMin ||
                      currentNumericValue - stepValue < numericMin)) ||
              (preventNegative &&
                  (currentNumericValue <= 0 ||
                      currentNumericValue - stepValue < 0)))

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
            gap={numberInputTokens.gap}
            width="100%"
        >
            {(!isSmallScreen || size !== NumberInputSize.LARGE) && (
                <InputLabels
                    tokens={numberInputTokens}
                    label={label}
                    sublabel={sublabel}
                    helpIconHintText={helpIconHintText}
                    inputId={inputId}
                    name={name}
                    required={required}
                />
            )}
            <Wrapper
                position="relative"
                width={'100%'}
                display="flex"
                borderRadius={
                    numberInputTokens.inputContainer.borderRadius[size]
                }
                style={getErrorShakeStyle(shouldShake)}
            >
                {label && isSmallScreenWithLargeSize && (
                    <Block
                        position="absolute"
                        top={inputFocusedOrWithValue ? paddingY : '50%'}
                        left={paddingX}
                        height={'max-content'}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            transform: 'translateY(-50%)',
                            transformOrigin: 'left center',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    >
                        <FloatingLabels
                            label={label}
                            required={required || false}
                            name={name || ''}
                            isFocused={inputFocusedOrWithValue}
                        />
                    </Block>
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
                        numberInputTokens.inputContainer.borderRadius[size]
                    }
                    border={
                        numberInputTokens.inputContainer.border[
                            hasError ? 'error' : 'default'
                        ]
                    }
                    fontSize={numberInputTokens.inputContainer.fontSize[size]}
                    fontWeight={
                        numberInputTokens.inputContainer.fontWeight[size]
                    }
                    color={
                        numberInputTokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    outline="none"
                    width={'100%'}
                    backgroundColor={
                        numberInputTokens.inputContainer.backgroundColor[
                            hasError ? 'error' : 'default'
                        ]
                    }
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _hover={{
                        border: numberInputTokens.inputContainer.border[
                            hasError ? 'error' : 'hover'
                        ],
                        backgroundColor:
                            numberInputTokens.inputContainer.backgroundColor[
                                hasError ? 'error' : 'hover'
                            ],
                    }}
                    _focus={{
                        border: numberInputTokens.inputContainer.border[
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
                            numberInputTokens.inputContainer.backgroundColor
                                .disabled,
                        border: numberInputTokens.inputContainer.border
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
                                ? numberInputTokens.inputContainer.border
                                      .disabled
                                : numberInputTokens.inputContainer.border[
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
                            numberInputTokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        width={
                            numberInputTokens.inputContainer.stepperButton
                                .width[size]
                        }
                        height={
                            numberInputTokens.inputContainer.stepperButton
                                .width[size]
                        }
                        contentCentered
                        borderRadius={`0 ${numberInputTokens.inputContainer.borderRadius[size]} 0 0`}
                        disabled={isUpButtonDisabled}
                        _focus={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.focus,
                        }}
                        _hover={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.hover,
                        }}
                        _disabled={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.disabled,
                        }}
                    >
                        {/* <TriangleSVG direction="up" /> */}
                        <Triangle
                            direction="up"
                            color={
                                disabled
                                    ? numberInputTokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputTokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            fill={
                                disabled
                                    ? numberInputTokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputTokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            size={
                                numberInputTokens.inputContainer.stepperButton
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
                            numberInputTokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        width={
                            numberInputTokens.inputContainer.stepperButton
                                .width[size]
                        }
                        height={
                            numberInputTokens.inputContainer.stepperButton
                                .width[size]
                        }
                        contentCentered
                        borderRadius={`0 0px ${numberInputTokens.inputContainer.borderRadius[size]} 0`}
                        _focus={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.focus,
                        }}
                        _hover={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.hover,
                        }}
                        _disabled={{
                            backgroundColor:
                                numberInputTokens.inputContainer.stepperButton
                                    .backgroundColor.disabled,
                        }}
                        disabled={isDownButtonDisabled}
                    >
                        <Triangle
                            style={{
                                transform: 'rotate(180deg)',
                            }}
                            color={
                                disabled
                                    ? numberInputTokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputTokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            fill={
                                disabled
                                    ? numberInputTokens.inputContainer
                                          .stepperButton.icon.color.disabled
                                    : numberInputTokens.inputContainer
                                          .stepperButton.icon.color.default
                            }
                            size={
                                numberInputTokens.inputContainer.stepperButton
                                    .icon.width[size]
                            }
                        />
                    </PrimitiveButton>
                </Block>
            </Wrapper>
            <InputFooter
                error={hasError}
                errorMessage={displayErrorMessage}
                hintText={hintText}
                errorId={errorId}
                hintId={hintId}
                tokens={numberInputTokens}
            />
        </Block>
    )
}

export default NumberInput
