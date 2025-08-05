import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import { useRef, useState, useEffect } from 'react'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import { TextInputSize, type TextInputProps } from './types'
import type { TextInputTokensType } from './textInput.tokens'
import { toPixels } from '../../../global-utils/GlobalUtils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'

const TextInput = ({
    size = TextInputSize.MEDIUM,
    leftSlot,
    rightSlot,
    error = false,
    errorMessage,
    hintText,
    helpIconHintText,
    disabled = false,
    label,
    placeholder = 'Enter',
    sublabel,
    value,
    onChange,
    name,
    required = false,
    onBlur,
    onFocus,
    ...rest
}: TextInputProps) => {
    const textInputTokens =
        useResponsiveTokens<TextInputTokensType>('TEXT_INPUT')

    const [isFocused, setIsFocused] = useState(false)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === TextInputSize.LARGE

    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)

    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)

    const paddingX = toPixels(textInputTokens.input.paddingX[size])
    const paddingY =
        toPixels(textInputTokens.input.paddingY[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 0)
    const GAP = toPixels(textInputTokens.input.gap)

    const paddingInlineStart = leftSlot
        ? paddingX + leftSlotWidth + GAP
        : paddingX
    const paddingInlineEnd = rightSlot
        ? paddingX + rightSlotWidth + GAP
        : paddingX

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
    }, [leftSlot, rightSlot])

    return (
        <Block display="flex" flexDirection="column" gap={8} width={'100%'}>
            {(!isSmallScreen || size !== TextInputSize.LARGE) && (
                <InputLabels
                    label={label}
                    sublabel={sublabel}
                    helpIconHintText={helpIconHintText}
                    disabled={disabled}
                    name={name}
                    required={required}
                />
            )}
            <Block position="relative" width={'100%'}>
                {leftSlot && (
                    <Block
                        ref={leftSlotRef}
                        position="absolute"
                        top={paddingY}
                        left={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {leftSlot}
                    </Block>
                )}

                {label && isSmallScreenWithLargeSize && (
                    <Block
                        position="absolute"
                        top={inputFocusedOrWithValue ? paddingY : '50%'}
                        left={paddingInlineStart}
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
                    required={required}
                    value={value}
                    type="text"
                    name={name}
                    onChange={onChange}
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    width={'100%'}
                    disabled={disabled}
                    //styling props
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
                    borderRadius={textInputTokens.input.borderRadius}
                    boxShadow={textInputTokens.input.boxShadow.default}
                    border={
                        textInputTokens.input.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={'14px'}
                    fontWeight={500}
                    outline="none"
                    _hover={{
                        border: textInputTokens.input.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        textInputTokens.input.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focus={{
                        border: textInputTokens.input.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow:
                            textInputTokens.input.boxShadow[
                                error ? 'error' : 'focus'
                            ],
                    }}
                    _disabled={{
                        backgroundColor:
                            textInputTokens.input.backgroundColor.disabled,
                        border: textInputTokens.input.border.disabled,
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
                {rightSlot && (
                    <Block
                        ref={rightSlotRef}
                        position="absolute"
                        top={paddingY}
                        right={paddingX}
                        bottom={paddingY}
                        contentCentered
                    >
                        {rightSlot}
                    </Block>
                )}
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

export default TextInput
