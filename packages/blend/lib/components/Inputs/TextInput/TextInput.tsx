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
import { FOUNDATION_THEME } from '../../../tokens'
import { useErrorShake } from '../../common/useErrorShake'
import {
    getErrorShakeStyle,
    errorShakeAnimation,
} from '../../common/error.animations'
import styled from 'styled-components'

const Wrapper = styled(Block)`
    ${errorShakeAnimation}
`

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
    cursor = 'text',
    ...rest
}: TextInputProps) => {
    const textInputTokens =
        useResponsiveTokens<TextInputTokensType>('TEXT_INPUT')

    const [isFocused, setIsFocused] = useState(false)
    const shouldShake = useErrorShake(error)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value.length > 0
    const isSmallScreenWithLargeSize =
        isSmallScreen && size === TextInputSize.LARGE

    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)

    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)

    const paddingX = toPixels(textInputTokens.inputContainer.padding.x[size])
    const paddingY =
        toPixels(textInputTokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 1)
    const GAP = toPixels(textInputTokens.gap)

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
        <Block
            display="flex"
            flexDirection="column"
            gap={8}
            width={'100%'}
            data-textinput={label ?? ''}
            data-status={disabled ? 'disabled' : 'enabled'}
        >
            {(!isSmallScreen || size !== TextInputSize.LARGE) && (
                <InputLabels
                    tokens={textInputTokens}
                    label={label}
                    sublabel={sublabel}
                    helpIconHintText={helpIconHintText}
                    disabled={disabled}
                    name={name}
                    required={required}
                />
            )}
            <Wrapper
                position="relative"
                width={'100%'}
                style={getErrorShakeStyle(shouldShake)}
            >
                {leftSlot && (
                    <Block
                        data-element="left-slot"
                        ref={leftSlotRef}
                        position="absolute"
                        top={paddingY}
                        left={paddingX}
                        bottom={paddingY}
                        contentCentered
                        style={{
                            transition:
                                'transform 200ms ease-in-out, opacity 200ms ease-in-out',
                            transform: isFocused ? 'scale(1.05)' : 'scale(1)',
                            opacity: isFocused ? 1 : 0.7,
                        }}
                    >
                        {leftSlot}
                    </Block>
                )}

                {label && isSmallScreenWithLargeSize && (
                    <Block
                        data-element="label"
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
                    placeholderColor={FOUNDATION_THEME.colors.gray[400]}
                    required={required}
                    value={value}
                    type="text"
                    name={name}
                    onChange={onChange}
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    width={'100%'}
                    disabled={disabled}
                    cursor={disabled ? 'not-allowed' : cursor}
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
                    borderRadius={
                        textInputTokens.inputContainer.borderRadius[size]
                    }
                    border={
                        textInputTokens.inputContainer.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={textInputTokens.inputContainer.fontSize[size]}
                    fontWeight={textInputTokens.inputContainer.fontWeight[size]}
                    lineHeight={FOUNDATION_THEME.unit[20]}
                    backgroundColor="transparent"
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    _hover={{
                        border: textInputTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        textInputTokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focus={{
                        border: textInputTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow: '0 0 0 3px #EFF6FF',
                        backgroundColor: 'rgba(239, 246, 255, 0.15)',
                    }}
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _disabled={{
                        backgroundColor:
                            textInputTokens.inputContainer.backgroundColor
                                .disabled,
                        border: textInputTokens.inputContainer.border.disabled,
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
                        data-element="right-slot"
                        ref={rightSlotRef}
                        position="absolute"
                        top={paddingY}
                        right={paddingX}
                        bottom={paddingY}
                        contentCentered
                        style={{
                            transition:
                                'transform 200ms ease-in-out, opacity 200ms ease-in-out',
                            transform: isFocused ? 'scale(1.05)' : 'scale(1)',
                            opacity: isFocused ? 1 : 0.7,
                        }}
                    >
                        {rightSlot}
                    </Block>
                )}
            </Wrapper>
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
