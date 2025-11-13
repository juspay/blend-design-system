import Block from '../../Primitives/Block/Block'
import PrimitiveTextarea from '../../Primitives/PrimitiveTextArea'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import type { TextAreaProps } from './types'
import type { TextAreaTokensType } from './textarea.token'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { useState, useEffect } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import FloatingLabels from '../utils/FloatingLabels/FloatingLabels'
import { toPixels } from '../../../global-utils/GlobalUtils'

const TextArea = ({
    value,
    placeholder,
    disabled,
    autoFocus,
    onChange,
    onFocus,
    onBlur,
    rows = 3,
    cols,
    label,
    sublabel,
    hintText,
    helpIconHintText,
    required,
    error,
    errorMessage,
    wrap,
    resize = 'none',
    ...rest
}: TextAreaProps) => {
    const textAreaTokens = useResponsiveTokens<TextAreaTokensType>('TEXT_AREA')
    const [isFocused, setIsFocused] = useState(false)
    const [shouldShake, setShouldShake] = useState(false)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputFocusedOrWithValue = isFocused || value.length > 0

    const paddingX = toPixels(textAreaTokens.inputContainer.padding.x)
    const paddingY = toPixels(textAreaTokens.inputContainer.padding.y)

    // Trigger shake animation on error
    useEffect(() => {
        if (error) {
            setShouldShake(true)
            const timer = setTimeout(() => setShouldShake(false), 400)
            return () => clearTimeout(timer)
        }
    }, [error])

    return (
        <Block
            data-component-field-wrapper={`field-textarea`}
            display="flex"
            flexDirection="column"
            gap={textAreaTokens.gap}
            width="100%"
            position="relative"
        >
            {!isSmallScreen && (
                <InputLabels
                    tokens={textAreaTokens}
                    label={label}
                    sublabel={sublabel}
                    disabled={disabled}
                    helpIconHintText={helpIconHintText}
                    required={required}
                />
            )}
            <Block
                position="relative"
                width="100%"
                style={{
                    animation: shouldShake
                        ? 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
                        : undefined,
                }}
            >
                <style>
                    {`
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                            20%, 40%, 60%, 80% { transform: translateX(4px); }
                        }
                    `}
                </style>
                {label && isSmallScreen && (
                    <Block
                        position="absolute"
                        top={5}
                        left={paddingX}
                        height={'max-content'}
                        style={{
                            transition: 'all 0.2s ease-in-out',
                            transform: inputFocusedOrWithValue
                                ? 'scale(0.95)'
                                : ' scale(1)',
                            transformOrigin: 'left center',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    >
                        <FloatingLabels
                            label={label}
                            required={required || false}
                            name={''}
                            isFocused={inputFocusedOrWithValue}
                        />
                    </Block>
                )}
                <PrimitiveTextarea
                    width={'100%'}
                    autoFocus={autoFocus}
                    value={value}
                    placeholder={isSmallScreen ? '' : placeholder}
                    onChange={onChange}
                    onFocus={(e) => {
                        setIsFocused(true)
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        onBlur?.(e)
                    }}
                    rows={rows}
                    required={required}
                    cols={cols}
                    wrap={wrap}
                    borderRadius={textAreaTokens.inputContainer.borderRadius}
                    resize={resize}
                    paddingX={paddingX}
                    paddingTop={
                        isSmallScreen && inputFocusedOrWithValue
                            ? paddingY + 14
                            : paddingY
                    }
                    paddingBottom={
                        isSmallScreen && inputFocusedOrWithValue ? 0 : paddingY
                    }
                    border={
                        textAreaTokens.inputContainer.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={textAreaTokens.inputContainer.fontSize}
                    fontWeight={textAreaTokens.inputContainer.fontWeight}
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    placeholderStyles={{
                        transition: 'opacity 150ms ease-out',
                        opacity: isFocused ? 0 : 1,
                    }}
                    _hover={{
                        border: textAreaTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                    }}
                    color={
                        textAreaTokens.inputContainer.color[
                            disabled ? 'disabled' : 'default'
                        ]
                    }
                    _focus={{
                        border: textAreaTokens.inputContainer.border[
                            error ? 'error' : 'focus'
                        ],
                        boxShadow: '0 0 0 3px #EFF6FF',
                        backgroundColor: 'rgba(239, 246, 255, 0.15)',
                    }}
                    disabled={disabled}
                    _disabled={{
                        backgroundColor:
                            textAreaTokens.inputContainer.backgroundColor
                                .disabled,
                        border: textAreaTokens.inputContainer.border.disabled,
                        cursor: 'not-allowed',
                    }}
                    {...rest}
                />
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

export default TextArea
