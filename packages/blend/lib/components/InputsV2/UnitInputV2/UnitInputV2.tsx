import {
    forwardRef,
    useCallback,
    useId,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from 'react'
import {
    UnitInputV2Position,
    type UnitInputV2PropsType,
} from './UnitInputV2.types'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import Block from '../../Primitives/Block/Block'
import InputLabels from '../utils/InputLabels/InputLabelsV2'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import InputFooter from '../utils/InputFooter/InputFooterV2'
import type { UnitInputV2TokensType } from './UnitInputV2.token'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabelsV2 from '../utils/FloatingLabelsV2/FloatingLabelsV2'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import UnitSideSlot from './UnitSideSlot'
import { getUnitInputV2NumericDerived, handleUnitInputKeyDown } from './utils'
import { useUnitInputV2AdornmentLayout } from './useUnitInputV2AdornmentLayout'

const UnitInput = forwardRef<HTMLInputElement, UnitInputV2PropsType>(
    (
        {
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
            label = 'Number Input',
            hintText,
            leftSlot,
            rightSlot,
            unit,
            unitPosition = UnitInputV2Position.RIGHT,
            name,
            onFocus,
            onBlur,
            id,
            ...rest
        },
        ref
    ) => {
        const {
            onKeyDown: restOnKeyDown,
            onKeyUp: restOnKeyUp,
            ...restForInput
        } = rest
        const filteredRest = filterBlockedProps(restForInput)

        const unitInputTokens =
            useResponsiveTokens<UnitInputV2TokensType>('UNIT_INPUT_V2')
        const ic = unitInputTokens.inputContainer

        const [isFocused, setIsFocused] = useState(false)
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const {
            numericMin,
            numericMax,
            stepValue,
            currentNumericValue,
            clampPreventNegative,
            isUpButtonDisabled,
            isDownButtonDisabled,
            hasError,
            displayErrorMessage,
        } = getUnitInputV2NumericDerived(
            value,
            min,
            max,
            step,
            error,
            errorMessage
        )

        const inputFocusedOrWithValue = isFocused || value !== undefined
        const isSmallScreenWithLargeSize =
            isSmallScreen && size === InputSizeV2.LG

        const paddingX = toPixels(ic.padding.x[size])
        const paddingY =
            toPixels(ic.padding.y[size]) +
            (isSmallScreenWithLargeSize ? 0.5 : 1)

        const generatedId = useId()
        const inputId = id ?? generatedId
        const errorId = `${inputId}-error`
        const hintId = `${inputId}-hint`

        const {
            leftSlotRef,
            rightSlotRef,
            unitRef,
            unitWidth,
            paddingInlineStart,
            paddingInlineEnd,
        } = useUnitInputV2AdornmentLayout({
            leftSlot,
            rightSlot,
            unit,
            unitPosition,
            paddingY,
        })

        const focusStyle = {
            border: ic.border[hasError ? 'error' : 'focus'],
            outline: 'none !important' as const,
            boxShadow: '0 0 0 3px #EFF6FF',
            backgroundColor: 'rgba(239, 246, 255, 0.15)',
        }

        const emitNumericChange = useCallback(
            (newValue: number) => {
                if (currentNumericValue === newValue) return
                onChange({
                    target: { value: String(newValue) },
                } as ChangeEvent<HTMLInputElement>)
            },
            [currentNumericValue, onChange]
        )

        const onKeyDownInternal = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                handleUnitInputKeyDown(e, {
                    disabled,
                    clampPreventNegative,
                    isUpButtonDisabled,
                    isDownButtonDisabled,
                    currentNumericValue,
                    stepValue,
                    numericMin,
                    numericMax,
                    emitNumericChange,
                })
            },
            [
                disabled,
                clampPreventNegative,
                isUpButtonDisabled,
                isDownButtonDisabled,
                currentNumericValue,
                stepValue,
                numericMin,
                numericMax,
                emitNumericChange,
            ]
        )

        return (
            <Block
                data-unitinput={label || 'unitinput'}
                data-status={disabled ? 'disabled' : 'enabled'}
                data-component-field-wrapper={`field-${name}`}
                display="flex"
                flexDirection="column"
                gap={8}
                width="100%"
            >
                {(!isSmallScreen || size !== InputSizeV2.LG) && (
                    <InputLabels
                        label={label}
                        sublabel={sublabel}
                        helpIconText={helpIconHintText}
                        name={name}
                        inputId={inputId}
                        required={required}
                        tokens={unitInputTokens.topContainer}
                        size={size}
                    />
                )}
                <Block
                    position="relative"
                    width={'100%'}
                    display="flex"
                    borderRadius={ic.borderRadius[size]}
                >
                    {leftSlot && (
                        <Block
                            data-element="left-slot"
                            ref={leftSlotRef}
                            position="absolute"
                            top={paddingY}
                            left={
                                unitPosition === UnitInputV2Position.LEFT
                                    ? unitWidth + 8
                                    : paddingX
                            }
                            bottom={paddingY}
                            contentCentered
                        >
                            {leftSlot}
                        </Block>
                    )}
                    {rightSlot && (
                        <Block
                            data-element="right-slot"
                            ref={rightSlotRef}
                            position="absolute"
                            top={paddingY}
                            right={
                                unitPosition === UnitInputV2Position.RIGHT
                                    ? unitWidth + 8
                                    : paddingX
                            }
                            bottom={paddingY}
                            contentCentered
                        >
                            {rightSlot}
                        </Block>
                    )}

                    <UnitSideSlot
                        side={unitPosition}
                        unitLabel={unit}
                        size={size}
                        disabled={!!disabled}
                        unitRef={unitRef}
                        ic={ic}
                    />
                    {label && isSmallScreenWithLargeSize && (
                        <FloatingLabelsV2
                            label={label ?? 'label'}
                            required={required ?? false}
                            name={name ?? 'label'}
                            inputId={inputId}
                            isInputFocusedOrWithValue={inputFocusedOrWithValue}
                            topPadding={paddingY}
                            leftPadding={paddingInlineStart}
                            tokens={unitInputTokens.floatingLabels}
                            size={size}
                            state={
                                hasError
                                    ? InputStateV2.ERROR
                                    : InputStateV2.DEFAULT
                            }
                        />
                    )}
                    <PrimitiveInput
                        {...filteredRest}
                        ref={ref}
                        id={inputId}
                        placeholderColor={ic.placeholderColor}
                        type="text"
                        inputMode="numeric"
                        lineHeight={ic.lineHeight}
                        placeholder={
                            isSmallScreenWithLargeSize ? '' : placeholder
                        }
                        value={value === undefined ? '' : value}
                        onChange={onChange}
                        step={step}
                        min={numericMin}
                        max={numericMax}
                        name={name}
                        paddingInlineStart={paddingInlineStart}
                        paddingInlineEnd={paddingInlineEnd}
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
                        required={required}
                        aria-invalid={hasError ? 'true' : 'false'}
                        borderRadius={ic.borderRadius[size]}
                        border={ic.border[hasError ? 'error' : 'default']}
                        fontSize={ic.fontSize[size]}
                        fontWeight={ic.fontWeight[size]}
                        outline="none"
                        width="100%"
                        height="100%"
                        backgroundColor={
                            ic.backgroundColor[hasError ? 'error' : 'default']
                        }
                        placeholderStyles={{
                            opacity: isFocused ? 0 : 1,
                        }}
                        _hover={{
                            border: ic.border[hasError ? 'error' : 'hover'],
                            backgroundColor:
                                ic.backgroundColor[
                                    hasError ? 'error' : 'hover'
                                ],
                        }}
                        color={ic.color[disabled ? 'disabled' : 'default']}
                        _focusVisible={focusStyle}
                        _focus={focusStyle}
                        disabled={disabled}
                        _disabled={{
                            backgroundColor: ic.backgroundColor.disabled,
                            border: ic.border.disabled,
                            cursor: 'not-allowed',
                        }}
                        onFocus={(e) => {
                            setIsFocused(true)
                            onFocus?.(e)
                        }}
                        onBlur={(e) => {
                            setIsFocused(false)
                            onBlur?.(e)
                        }}
                        onKeyDown={(e) => {
                            restOnKeyDown?.(e)
                            if (e.defaultPrevented) return
                            onKeyDownInternal(e)
                        }}
                        onKeyUp={restOnKeyUp}
                    />
                </Block>
                <InputFooter
                    tokens={unitInputTokens.bottomContainer}
                    size={size}
                    error={hasError}
                    errorMessage={displayErrorMessage}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                />
            </Block>
        )
    }
)

UnitInput.displayName = 'UnitInputV2'

export default UnitInput
