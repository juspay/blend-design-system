import Block from '../../Primitives/Block/Block'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { useRef, useState, useEffect, useId, useCallback } from 'react'
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
import { Eye, EyeOff } from 'lucide-react'
import { getTextInputBorderRadius } from './utils'

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
    id: providedId,
    passwordToggle = false,
    type: providedType,
    textInputGroupPosition,
    ...rest
}: TextInputProps) => {
    const textInputTokens =
        useResponsiveTokens<TextInputTokensType>('TEXT_INPUT')
    const inputRef = useRef<HTMLInputElement>(null)
    const [isAutofilled, setIsAutofilled] = useState(false)

    const generatedId = useId()
    const inputId = providedId || generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`
    const toggleButtonId = `${inputId}-password-toggle`

    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const shouldShake = useErrorShake(error)
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const inputType = passwordToggle
        ? showPassword
            ? 'text'
            : 'password'
        : providedType || 'text'

    const inputFocusedOrWithValue =
        isFocused || value.length > 0 || isAutofilled

    const isSmallScreenWithLargeSize =
        isSmallScreen && size === TextInputSize.LARGE

    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)

    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)

    const ariaDescribedBy =
        [
            hintText && !error ? hintId : null,
            error && errorMessage ? errorId : null,
        ]
            .filter(Boolean)
            .join(' ') || undefined

    const paddingX = toPixels(textInputTokens.inputContainer.padding.x[size])
    const paddingY =
        toPixels(textInputTokens.inputContainer.padding.y[size]) +
        (isSmallScreenWithLargeSize ? 0.5 : 1)
    const GAP = toPixels(textInputTokens.gap)
    const handleTogglePassword = useCallback(() => {
        setShowPassword((prev) => !prev)
    }, [])

    const handleToggleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                handleTogglePassword()
            }
        },
        [handleTogglePassword]
    )

    const getToggleButtonColor = () => {
        if (disabled) return textInputTokens.inputContainer.color.disabled
        if (error) return textInputTokens.inputContainer.color.error
        return textInputTokens.inputContainer.color.default
    }

    const passwordToggleButton = passwordToggle ? (
        <PrimitiveButton
            id={toggleButtonId}
            type="button"
            role="button"
            aria-label={
                showPassword
                    ? 'Hide password. Currently showing password as plain text.'
                    : 'Show password. Currently hiding password.'
            }
            aria-pressed={showPassword}
            aria-controls={inputId}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleTogglePassword()
            }}
            onKeyDown={handleToggleKeyDown}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="transparent"
            border="none"
            cursor={disabled ? 'not-allowed' : 'pointer'}
            padding={0}
            color={getToggleButtonColor()}
            transition="color 200ms ease-in-out"
            _hover={{
                color: disabled
                    ? textInputTokens.inputContainer.color.disabled
                    : textInputTokens.inputContainer.color.hover,
            }}
            _focusVisible={{
                outline: `2px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                outlineOffset: '2px',
                borderRadius: textInputTokens.inputContainer.borderRadius[size],
            }}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
        >
            {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
            ) : (
                <Eye size={18} aria-hidden="true" />
            )}
        </PrimitiveButton>
    ) : null

    const combinedRightSlot =
        rightSlot && passwordToggleButton ? (
            <Block display="flex" alignItems="center" gap={GAP}>
                {rightSlot}
                {passwordToggleButton}
            </Block>
        ) : (
            passwordToggleButton || rightSlot
        )

    const paddingInlineStart = leftSlot
        ? paddingX + leftSlotWidth + GAP
        : paddingX
    const paddingInlineEnd = combinedRightSlot
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
    }, [leftSlot, combinedRightSlot])

    useEffect(() => {
        const input = inputRef.current
        if (!input) return

        if (input.value && input.value.length > 0) {
            setIsAutofilled(true)
        }

        const handleAnimationStart = (e: AnimationEvent) => {
            if (e.animationName === 'blend-autofill-start') {
                setIsAutofilled(true)
            }
            if (e.animationName === 'blend-autofill-cancel') {
                setIsAutofilled(false)
            }
        }

        input.addEventListener('animationstart', handleAnimationStart)

        return () => {
            input.removeEventListener('animationstart', handleAnimationStart)
        }
    }, [])

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
                    inputId={inputId}
                    required={required}
                />
            )}
            <Wrapper
                position="relative"
                width={'100%'}
                style={getErrorShakeStyle(shouldShake)}
                role={passwordToggle ? 'group' : undefined}
                aria-label={
                    passwordToggle
                        ? `${label || 'Password'} input with visibility toggle`
                        : undefined
                }
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
                    ref={inputRef}
                    id={inputId}
                    placeholderColor={textInputTokens.placeholder.color}
                    required={required}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={isSmallScreenWithLargeSize ? '' : placeholder}
                    width={'100%'}
                    disabled={disabled}
                    cursor={disabled ? 'not-allowed' : cursor}
                    aria-required={required ? 'true' : undefined}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={ariaDescribedBy}
                    autoComplete={
                        passwordToggle && providedType === 'password'
                            ? 'current-password'
                            : rest.autoComplete
                    }
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
                        getTextInputBorderRadius(
                            size,
                            textInputGroupPosition,
                            textInputTokens
                        ).borderRadius
                    }
                    borderRight={
                        getTextInputBorderRadius(
                            size,
                            textInputGroupPosition,
                            textInputTokens
                        ).borderRight
                    }
                    border={
                        textInputTokens.inputContainer.border[
                            error ? 'error' : 'default'
                        ]
                    }
                    fontSize={textInputTokens.inputContainer.fontSize[size]}
                    fontWeight={textInputTokens.inputContainer.fontWeight[size]}
                    lineHeight={FOUNDATION_THEME.unit[20]}
                    backgroundColor={
                        textInputTokens.inputContainer.backgroundColor[
                            error ? 'error' : 'default'
                        ]
                    }
                    transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                    _hover={{
                        border: textInputTokens.inputContainer.border[
                            error ? 'error' : 'hover'
                        ],
                        backgroundColor:
                            textInputTokens.inputContainer.backgroundColor[
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
                    type={
                        inputType as
                            | 'text'
                            | 'password'
                            | 'email'
                            | 'tel'
                            | 'url'
                            | 'search'
                    }
                />
                {combinedRightSlot && (
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
                            pointerEvents: 'none',
                        }}
                    >
                        <Block
                            style={{
                                pointerEvents: 'auto',
                            }}
                        >
                            {combinedRightSlot}
                        </Block>
                    </Block>
                )}
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

export default TextInput
