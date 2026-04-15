import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import type { NumberInputV2Props } from './numberInputV2.types'
import { AnyRef, InputSizeV2 } from '../inputV2.types'
import type { NumberInputV2TokensType } from './numberInputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { addPxToValue, toPixels } from '../../../global-utils/GlobalUtils'
import React, {
    forwardRef,
    useMemo,
    useState,
    useId,
    useRef,
    useLayoutEffect,
} from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import {
    sanitizeNumberInput,
    clampValueOnBlur,
    getEffectiveNumericValue,
    incrementValue,
    decrementValue,
    getSteppingBaseValue,
    getNumberInputDisplayValue,
    getInputFocusedOrWithValue,
    isSmallScreenWithLargeSize,
    getRangeErrorMessageIfOutside,
    getNumberInputHasError,
    getNumberInputDisplayErrorMessage,
    buildNumberInputAriaDescribedBy,
    getNumberInputLabelState,
    computeIsUpButtonDisabled,
    computeIsDownButtonDisabled,
    sanitizedToCommittedValueString,
    rawNumericToComparableString,
    shouldSkipControlledChange,
    shouldEmitBlurChange,
    subscribeElementOffsetWidth,
    getNumberInputV2PaddingLeft,
    getNumberInputV2PaddingRight,
} from './utils'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'
import NumberInputV2Stepper from './NumberInputV2Stepper'
import NumberInputV2Unit from './NumberInputV2Unit'
import { NumberInputV2Direction } from '.'

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
            unitDirection = NumberInputV2Direction.RIGHT,
            unit = '',
            slot = {
                left: null,
                right: null,
            },
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
        const unitRef = useRef<HTMLDivElement>(null)
        const leftSlotRef = useRef<HTMLDivElement>(null)
        const rightSlotRef = useRef<HTMLDivElement>(null)
        const [measuredUnitWidth, setMeasuredUnitWidth] = useState(0)
        const [measuredLeftSlotWidth, setMeasuredLeftSlotWidth] = useState(0)
        const [measuredRightSlotWidth, setMeasuredRightSlotWidth] = useState(0)

        const setInputRef = (node: HTMLInputElement | null): void => {
            setExternalRef(ref as AnyRef<HTMLInputElement>, node)
        }

        const { errorId, hintId } = generateAccessibilityIds(inputId)

        const [isFocused, setIsFocused] = useState(false)
        const [internalValue, setInternalValue] = useState('')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const numericMin = min !== undefined ? Number(min) : undefined
        const numericMax = max !== undefined ? Number(max) : undefined
        const stepValue = step ?? 1
        const rawNumericValue =
            value !== null && value !== undefined ? Number(value) : null
        /** Whitespace-only `unit` is treated as empty: show steppers, not an empty strip. */
        const unitText = unit?.trim() ?? ''
        const showUnit = Boolean(unitText)
        const steppingBaseValue = useMemo(
            () => getSteppingBaseValue(rawNumericValue, preventNegative),
            [rawNumericValue, preventNegative]
        )

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

        const displayValue = getNumberInputDisplayValue(
            isFocused,
            internalValue,
            value,
            effectiveNumericValue
        )

        const inputFocusedOrWithValue = getInputFocusedOrWithValue(
            isFocused,
            displayValue
        )

        const smallScreenLarge = isSmallScreenWithLargeSize(isSmallScreen, size)

        const paddingX = inputContainerTokens.paddingLeft[size]
        const paddingY =
            toPixels(inputContainerTokens.paddingTop[size]) +
            (smallScreenLarge ? 0.5 : 1)

        const rangeErrorMessage = useMemo(
            () =>
                getRangeErrorMessageIfOutside(
                    rawNumericValue,
                    numericMin,
                    numericMax
                ),
            [rawNumericValue, numericMin, numericMax]
        )

        const hasError = getNumberInputHasError(
            error?.show,
            error?.message,
            rangeErrorMessage
        )

        const displayErrorMessage = getNumberInputDisplayErrorMessage(
            error?.show,
            error?.message,
            rangeErrorMessage
        )

        const ariaDescribedBy = buildNumberInputAriaDescribedBy(
            hintText,
            hasError,
            hintId,
            errorId,
            displayErrorMessage
        )

        const labelState = getNumberInputLabelState(
            disabled,
            hasError,
            isFocused
        )

        useLayoutEffect(() => {
            if (!showUnit) {
                setMeasuredUnitWidth(0)
                return
            }
            const el = unitRef.current
            if (!el) {
                setMeasuredUnitWidth(0)
                return
            }
            return subscribeElementOffsetWidth(el, setMeasuredUnitWidth)
        }, [showUnit, unitDirection, unitText, size, labelState, disabled])

        useLayoutEffect(() => {
            if (!slot.left) {
                setMeasuredLeftSlotWidth(0)
                return
            }
            const el = leftSlotRef.current
            if (!el) {
                setMeasuredLeftSlotWidth(0)
                return
            }
            return subscribeElementOffsetWidth(el, setMeasuredLeftSlotWidth)
        }, [slot.left, size, labelState, disabled])

        useLayoutEffect(() => {
            if (!slot.right) {
                setMeasuredRightSlotWidth(0)
                return
            }
            const el = rightSlotRef.current
            if (!el) {
                setMeasuredRightSlotWidth(0)
                return
            }
            return subscribeElementOffsetWidth(el, setMeasuredRightSlotWidth)
        }, [slot.right, size, labelState, disabled])

        const updateValue = (newValue: number): void => {
            if (rawNumericValue === newValue) return
            const newValueString = String(newValue)
            const eventTarget = {
                value: newValueString,
                name,
                id: providedId,
            }
            setInternalValue(newValueString)
            onChange({
                target: eventTarget,
                currentTarget: eventTarget,
            } as React.ChangeEvent<HTMLInputElement>)
        }

        const isUpButtonDisabled = computeIsUpButtonDisabled(
            numericMax,
            steppingBaseValue,
            numericMin,
            stepValue
        )

        const isDownButtonDisabled = computeIsDownButtonDisabled(
            steppingBaseValue,
            preventNegative,
            numericMin,
            stepValue
        )

        const bump = (direction: 'up' | 'down'): void => {
            if (direction === 'up') {
                if (isUpButtonDisabled) return
                updateValue(
                    incrementValue(
                        steppingBaseValue,
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
                        steppingBaseValue,
                        stepValue,
                        numericMin,
                        numericMax,
                        preventNegative
                    )
                )
            }
        }

        const borderState = hasError ? 'error' : 'default'

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const sanitized = sanitizeNumberInput(
                e.target.value,
                !preventNegative
            )
            setInternalValue(sanitized)

            const valueString = sanitizedToCommittedValueString(sanitized)
            const currentValueString =
                rawNumericToComparableString(rawNumericValue)
            if (shouldSkipControlledChange(valueString, currentValueString))
                return

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

            const clampedNumValue = clamped === '' ? null : Number(clamped)
            if (
                shouldEmitBlurChange(
                    clamped,
                    e.target.value,
                    clampedNumValue,
                    rawNumericValue
                )
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
        const inputPaddingLeft = useMemo(
            () =>
                getNumberInputV2PaddingLeft(
                    inputContainerTokens,
                    size,
                    showUnit,
                    unitDirection,
                    measuredUnitWidth,
                    measuredLeftSlotWidth,
                    measuredRightSlotWidth
                ),
            [
                showUnit,
                unitDirection,
                size,
                measuredUnitWidth,
                measuredLeftSlotWidth,
                measuredRightSlotWidth,
                inputContainerTokens,
            ]
        )

        const inputPaddingRight = useMemo(
            () =>
                getNumberInputV2PaddingRight(
                    inputContainerTokens,
                    size,
                    showUnit,
                    unitDirection,
                    measuredUnitWidth,
                    measuredLeftSlotWidth,
                    measuredRightSlotWidth
                ),
            [
                showUnit,
                unitDirection,
                size,
                measuredUnitWidth,
                measuredLeftSlotWidth,
                measuredRightSlotWidth,
                inputContainerTokens,
            ]
        )

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
                        helpIconText={helpIconText}
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
                    {Boolean(label.text?.trim()) && smallScreenLarge && (
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
                    {showUnit &&
                        unitDirection === NumberInputV2Direction.LEFT && (
                            <NumberInputV2Unit
                                ref={unitRef}
                                unit={unit}
                                inputState={labelState}
                                inputContainerTokens={numberInputTokens}
                                size={size}
                                disabled={disabled}
                                unitDirection={unitDirection}
                            />
                        )}
                    {slot.left &&
                        showUnit &&
                        unitDirection === NumberInputV2Direction.LEFT && (
                            <Block
                                ref={leftSlotRef}
                                position="absolute"
                                top={0}
                                left={0}
                                bottom={0}
                                contentCentered
                                marginLeft={`${
                                    measuredUnitWidth +
                                    toPixels(
                                        inputContainerTokens.slot.left.margin[
                                            size
                                        ] ?? 0
                                    )
                                }px`}
                            >
                                {slot.left}
                            </Block>
                        )}
                    {slot.left &&
                        showUnit &&
                        unitDirection === NumberInputV2Direction.RIGHT && (
                            <Block
                                ref={leftSlotRef}
                                position="absolute"
                                top={0}
                                left={0}
                                bottom={0}
                                contentCentered
                                marginLeft={toPixels(
                                    inputContainerTokens.slot.left.margin[
                                        size
                                    ] ?? 0
                                )}
                            >
                                {slot.left}
                            </Block>
                        )}
                    <PrimitiveInput
                        ref={setInputRef}
                        id={inputId}
                        lineHeight={addPxToValue(
                            inputContainerTokens.lineHeight[size]
                        )}
                        placeholderColor={
                            inputContainerTokens.placeholder.color.default
                        }
                        name={name}
                        type="text"
                        inputMode="decimal"
                        placeholder={smallScreenLarge ? '' : placeholder}
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
                        paddingLeft={inputPaddingLeft}
                        paddingRight={inputPaddingRight}
                        paddingTop={
                            smallScreenLarge && inputFocusedOrWithValue
                                ? paddingY * 1.5
                                : inputContainerTokens.paddingTop[size]
                        }
                        paddingBottom={
                            smallScreenLarge && inputFocusedOrWithValue
                                ? paddingY / 2
                                : inputContainerTokens.paddingBottom[size]
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
                    {slot.right &&
                        showUnit &&
                        unitDirection === NumberInputV2Direction.RIGHT && (
                            <Block
                                ref={rightSlotRef}
                                position="absolute"
                                top={0}
                                right={0}
                                bottom={0}
                                contentCentered
                                marginRight={`${
                                    measuredUnitWidth +
                                    toPixels(
                                        inputContainerTokens.paddingRight[size]
                                    )
                                }px`}
                            >
                                {slot.right}
                            </Block>
                        )}
                    {slot.right &&
                        showUnit &&
                        unitDirection === NumberInputV2Direction.LEFT && (
                            <Block
                                ref={rightSlotRef}
                                position="absolute"
                                top={0}
                                right={0}
                                bottom={0}
                                contentCentered
                                marginRight={toPixels(
                                    inputContainerTokens.slot.right.margin[
                                        size
                                    ] ?? 0
                                )}
                            >
                                {slot.right}
                            </Block>
                        )}
                    {showUnit &&
                        unitDirection === NumberInputV2Direction.RIGHT && (
                            <NumberInputV2Unit
                                ref={unitRef}
                                unit={unit}
                                inputState={labelState}
                                inputContainerTokens={numberInputTokens}
                                size={size}
                                disabled={disabled}
                                unitDirection={unitDirection}
                            />
                        )}
                    {!showUnit && (
                        <NumberInputV2Stepper
                            labelText={label.text}
                            disabled={disabled}
                            borderState={borderState}
                            isUpButtonDisabled={isUpButtonDisabled}
                            isDownButtonDisabled={isDownButtonDisabled}
                            onStep={bump}
                            inputContainerTokens={numberInputTokens}
                            size={size}
                        />
                    )}
                </Block>
                <InputFooterV2
                    error={Boolean(displayErrorMessage)}
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
