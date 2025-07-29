import { FOUNDATION_THEME } from '../../../tokens'
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

    const paddingX = numberInputTokens.input.paddingX[size]
    const paddingY =
        toPixels(numberInputTokens.input.paddingY[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 0)

    return (
        <Block display="flex" flexDirection="column" gap={8} width="100%">
            {(!isSmallScreen || size !== NumberInputSize.LARGE) && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    name={name}
                    required={required}
                />
            )}
            <Block
                position="relative"
                width={'100%'}
                display="flex"
                borderRadius={8}
            >
                {label && isSmallScreenWithLargeSize && (
                    <Block
                        position="absolute"
                        top={
                            inputFocusedOrWithValue
                                ? toPixels(paddingY - paddingY / 1.3) +
                                  (!required ? 3 : 0)
                                : '50%'
                        }
                        left={toPixels(paddingX)}
                        height={'max-content'}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            transform: inputFocusedOrWithValue
                                ? 'scale(0.95)'
                                : 'translateY(-50%) scale(1)',
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
                    borderRadius={numberInputTokens.input.borderRadius}
                    boxShadow={numberInputTokens.input.boxShadow.default}
                    border={
                        numberInputTokens.input.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={'14px'}
                    fontWeight={500}
                    outline="none"
                    width={'100%'}
                    _hover={{
                        border: numberInputTokens.input.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        numberInputTokens.input.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focus={{
                        border: numberInputTokens.input.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow:
                            numberInputTokens.input.boxShadow[
                                error ? 'error' : 'focus'
                            ],
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor:
                            numberInputTokens.input.backgroundColor.disabled,
                        border: numberInputTokens.input.border.disabled,
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
                        borderLeft={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                    ></Block>
                    <PrimitiveButton
                        onClick={() =>
                            onChange({
                                target: {
                                    value: String(
                                        value ? value + (step ?? 1) : 0
                                    ),
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        flexGrow={1}
                        width={'24px'}
                        height={'50%'}
                        contentCentered
                        borderRadius={`0 ${numberInputTokens.input.borderRadius} 0 0`}
                        disabled={
                            disabled ||
                            (typeof max === 'number' &&
                                value !== undefined &&
                                value >= max)
                        }
                        _focus={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[100],
                        }}
                        _hover={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[100],
                        }}
                    >
                        <TriangleSVG direction="up" />
                    </PrimitiveButton>
                    <PrimitiveButton
                        onClick={() =>
                            onChange({
                                target: {
                                    value: String(
                                        value ? value - (step ?? 1) : 0
                                    ),
                                },
                            } as React.ChangeEvent<HTMLInputElement>)
                        }
                        backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                        flexGrow={1}
                        width={'24px'}
                        height={'50%'}
                        contentCentered
                        borderRadius={`0 0px ${numberInputTokens.input.borderRadius} 0`}
                        _focus={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[100],
                        }}
                        _hover={{
                            backgroundColor: FOUNDATION_THEME.colors.gray[100],
                        }}
                        disabled={
                            disabled ||
                            (typeof min === 'number' &&
                                value !== undefined &&
                                value <= min)
                        }
                    >
                        <TriangleSVG direction="down" />
                    </PrimitiveButton>
                </Block>
            </Block>
            <InputFooter
                error={error}
                errorMessage={errorMessage}
                hintText={hintText}
                disabled={disabled}
            />
        </Block>
    )
}

const TriangleSVG = ({ direction }: { direction: 'up' | 'down' }) => {
    return (
        <svg
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: direction === 'up' ? 'rotate(180deg)' : 'none',
            }}
        >
            <path
                d="M5.19369 4.25489C6.29087 3.37174 7.26951 2.34261 8.10412 1.19449C8.20686 1.05498 8.26202 0.879398 8.24784 0.693089C8.21641 0.28007 7.85611 -0.0292686 7.4431 0.00216258C5.48387 0.151262 3.51614 0.151262 1.55692 0.00216222C1.1439 -0.029269 0.783599 0.280069 0.752168 0.693089C0.737989 0.879395 0.793151 1.05498 0.895889 1.19448C1.7305 2.34261 2.70914 3.37174 3.80632 4.25489C4.21232 4.5817 4.78769 4.5817 5.19369 4.25489Z"
                fill="#222530"
            />
        </svg>
    )
}

export default NumberInput
