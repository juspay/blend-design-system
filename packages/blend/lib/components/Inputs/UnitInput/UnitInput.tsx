import { Weight } from 'lucide-react'
import { useEffect, useRef, useState, useId } from 'react'
import { UnitInputSize, type UnitInputProps, UnitPosition } from './types'
import { FOUNDATION_THEME } from '../../../tokens'
import Text from '../../Text/Text'
import Block from '../../Primitives/Block/Block'
import InputLabels from '../utils/InputLabels/InputLabels'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import InputFooter from '../utils/InputFooter/InputFooter'
import type { UnitInputTokensType } from './unitInput.tokens'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import styled from 'styled-components'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

const UnitInput = ({
    value,
    onChange,
    min,
    max,
    step,
    error = false,
    errorMessage,
    required,
    disabled,
    size = UnitInputSize.MEDIUM,
    placeholder,
    sublabel,
    helpIconHintText,
    label = 'Number Input',
    hintText,
    leftSlot,
    rightSlot = <Weight size={16} color={FOUNDATION_THEME.colors.gray[400]} />,
    unit,
    unitPosition = UnitPosition.RIGHT,
    name,
    onFocus,
    onBlur,
    ...rest
}: UnitInputProps) => {
    const unitInputTokens =
        useResponsiveTokens<UnitInputTokensType>('UNIT_INPUT')

    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)
    const [unitWidth, setUnitWidth] = useState(0)
    const [isFocused, setIsFocused] = useState(false)
    const shouldShake = useErrorShake(error)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value !== undefined
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === UnitInputSize.LARGE

    const paddingX = toPixels(unitInputTokens.inputContainer.padding.x[size])
    const paddingY =
        toPixels(unitInputTokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 1)

    const generatedId = useId()
    const inputId = rest.id || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)
    const unitRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (leftSlotRef.current) {
            setLeftSlotWidth(leftSlotRef.current.offsetWidth)
        } else {
            setLeftSlotWidth(0)
        }
        if (rightSlotRef.current) {
            setRightSlotWidth(rightSlotRef.current.offsetWidth)
        } else {
            setRightSlotWidth(0)
        }
        if (unitRef.current) {
            setUnitWidth(unitRef.current.offsetWidth)
        } else {
            setUnitWidth(0)
        }
    }, [leftSlot, rightSlot, unit])

    const paddingInlineStart =
        (!leftSlot && unitPosition !== UnitPosition.LEFT
            ? paddingY
            : (unitPosition === UnitPosition.LEFT ? unitWidth + 8 : 8) +
              (leftSlot ? leftSlotWidth + 8 : 0)) + 4

    const paddingInlineEnd =
        !rightSlot && unitPosition !== UnitPosition.RIGHT
            ? paddingY
            : (unitPosition === UnitPosition.RIGHT ? unitWidth + 8 : 0) +
              (rightSlot ? rightSlotWidth + 8 : 0)

    const RightUnitSlot = () => {
        return (
            <Block
                data-element="unit"
                data-id={unit || 'unit'}
                ref={unitRef}
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                paddingX={unitInputTokens.inputContainer.unit.padding[size]}
                margin={1}
                contentCentered
                backgroundColor={
                    unitInputTokens.inputContainer.unit.backgroundColor.default
                }
                borderLeft={unitInputTokens.inputContainer.border.default}
                borderRadius={`0px ${unitInputTokens.inputContainer.borderRadius[size]} ${unitInputTokens.inputContainer.borderRadius[size]} 0px`}
            >
                <Text
                    fontSize={
                        unitInputTokens.inputContainer.unit.fontSize[size]
                    }
                    fontWeight={
                        unitInputTokens.inputContainer.unit.fontWeight[size]
                    }
                    color={
                        unitInputTokens.inputContainer.unit.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                >
                    {unit}
                </Text>
            </Block>
        )
    }

    const LeftUnitSlot = () => {
        return (
            <Block
                ref={unitRef}
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                paddingX={unitInputTokens.inputContainer.unit.padding[size]}
                margin={1}
                contentCentered
                backgroundColor={
                    unitInputTokens.inputContainer.unit.backgroundColor.default
                }
                borderRight={unitInputTokens.inputContainer.border.default}
                borderRadius={`${unitInputTokens.inputContainer.borderRadius[size]} 0px 0px ${unitInputTokens.inputContainer.borderRadius[size]}`}
            >
                <Text
                    fontSize={
                        unitInputTokens.inputContainer.unit.fontSize[size]
                    }
                    fontWeight={
                        unitInputTokens.inputContainer.unit.fontWeight[size]
                    }
                    color={
                        unitInputTokens.inputContainer.unit.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                >
                    {unit}
                </Text>
            </Block>
        )
    }

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
            {(!isSmallScreen || size !== UnitInputSize.LARGE) && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    inputId={inputId}
                    required={required}
                />
            )}
            <Wrapper
                position="relative"
                width={'100%'}
                display="flex"
                borderRadius={8}
                style={getErrorShakeStyle(shouldShake)}
            >
                {leftSlot && (
                    <Block
                        data-element="left-slot"
                        ref={leftSlotRef}
                        position="absolute"
                        top={paddingY}
                        left={
                            unitPosition === UnitPosition.LEFT
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
                            unitPosition === UnitPosition.RIGHT
                                ? unitWidth + 8
                                : paddingX
                        }
                        bottom={paddingY}
                        contentCentered
                    >
                        {rightSlot}
                    </Block>
                )}

                {unitPosition === UnitPosition.RIGHT && <RightUnitSlot />}
                {unitPosition === UnitPosition.LEFT && <LeftUnitSlot />}
                {label && isSmallScreenWithLargeSize && (
                    <Block
                        position="absolute"
                        top={inputFocusedOrWithValue ? paddingY : '50%'}
                        left={toPixels(paddingInlineStart)}
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
                    placeholderColor={FOUNDATION_THEME.colors.gray[400]}
                    type="number"
                    lineHeight={FOUNDATION_THEME.unit[20]}
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    value={value}
                    onChange={onChange}
                    step={step}
                    min={min}
                    max={max}
                    name={name}
                    paddingInlineStart={paddingInlineStart}
                    paddingInlineEnd={paddingInlineEnd}
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
                    required={required}
                    aria-required={required ? 'true' : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                    borderRadius={
                        unitInputTokens.inputContainer.borderRadius[size]
                    }
                    border={
                        unitInputTokens.inputContainer.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={unitInputTokens.inputContainer.fontSize[size]}
                    fontWeight={unitInputTokens.inputContainer.fontWeight[size]}
                    outline="none"
                    width={'100%'}
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _hover={{
                        border: unitInputTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        unitInputTokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focusVisible={{
                        border: unitInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        outline: 'none !important',
                        boxShadow: '0 0 0 3px #EFF6FF',
                        backgroundColor: 'rgba(239, 246, 255, 0.15)',
                    }}
                    _focus={{
                        border: unitInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        outline: 'none !important',
                        boxShadow: '0 0 0 3px #EFF6FF',
                        backgroundColor: 'rgba(239, 246, 255, 0.15)',
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor:
                            unitInputTokens.inputContainer.backgroundColor
                                .disabled,
                        border: unitInputTokens.inputContainer.border.disabled,
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
                    {...rest}
                />
            </Wrapper>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                errorId={errorId}
                hintId={hintId}
            />
        </Block>
    )
}

export default UnitInput
