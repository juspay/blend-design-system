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
import { useState } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { Triangle } from 'lucide-react'

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
    label = 'Number Input',
    hintText,
    name,
    onBlur,
    onFocus,
    ...rest
}: NumberInputProps) => {
    const numberInputTokens =
        useResponsiveTokens<NumberInputTokensType>('NUMBER_INPUT')

    const [isFocused, setIsFocused] = useState(false)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value !== undefined
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === NumberInputSize.LARGE

    const paddingX = numberInputTokens.inputContainer.padding.x[size]
    const paddingY =
        toPixels(numberInputTokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 0)

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={numberInputTokens.gap}
            width="100%"
        >
            {(!isSmallScreen || size !== NumberInputSize.LARGE) && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    required={required}
                    tokens={numberInputTokens}
                />
            )}
            <Block
                position="relative"
                width={'100%'}
                display="flex"
                borderRadius={
                    numberInputTokens.inputContainer.borderRadius[size]
                }
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
                    name={name}
                    type="number"
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    value={value}
                    onChange={onChange}
                    step={step}
                    min={min}
                    max={max}
                    required={required}
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
                    boxShadow={numberInputTokens.inputContainer.boxShadow}
                    border={
                        numberInputTokens.inputContainer.border[
                            error ? 'error' : 'default'
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
                    _hover={{
                        border: numberInputTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    _focus={{
                        border: numberInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow: numberInputTokens.inputContainer.boxShadow,
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
                <Block
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
                                      error ? 'error' : 'default'
                                  ]
                        }
                    ></Block>
                    <PrimitiveButton
                        onClick={() =>
                            onChange({
                                target: {
                                    value: String(
                                        value
                                            ? Number(value) + (step ?? 1)
                                            : 0 + (step ?? 1)
                                    ),
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        backgroundColor={
                            numberInputTokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        // flexGrow={1}
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
                        disabled={
                            disabled ||
                            (typeof max === 'number' &&
                                value !== undefined &&
                                value >= max)
                        }
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
                        onClick={() =>
                            onChange({
                                target: {
                                    value: String(
                                        value ? Number(value) - (step ?? 1) : 0
                                    ),
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        backgroundColor={
                            numberInputTokens.inputContainer.stepperButton
                                .backgroundColor.default
                        }
                        // flexGrow={1}
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
                        disabled={
                            disabled ||
                            (typeof min === 'number' &&
                                value !== undefined &&
                                value <= min)
                        }
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
            </Block>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
                tokens={numberInputTokens}
            />
        </Block>
    )
}

export default NumberInput
