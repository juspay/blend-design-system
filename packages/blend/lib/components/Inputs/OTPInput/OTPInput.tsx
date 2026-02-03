import React, {
    type ChangeEvent,
    type KeyboardEvent,
    useEffect,
    useRef,
    useState,
    useId,
} from 'react'
import Block from '../../Primitives/Block/Block'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'

import type { OTPProps } from './types'
import type { OTPInputTokensType } from './otpInput.tokens'
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

const OTPInput = ({
    label,
    placeholder,
    sublabel,
    disabled,
    helpIconHintText,
    name,
    required,
    error,
    errorMessage,
    hintText,
    value = '',
    length = 6,
    autoFocus = false,
    onChange,
    form,
    id: providedId,
    ...rest
}: OTPProps) => {
    const otpInputTokens = useResponsiveTokens<OTPInputTokensType>('OTP_INPUT')
    const [otp, setOtp] = useState<string[]>(() => {
        const initial = (value || '').split('').slice(0, length)
        return [
            ...initial,
            ...new Array(Math.max(length - initial.length, 0)).fill(''),
        ]
    })
    const [, setActiveIndex] = useState<number>(-1)
    const shouldShake = useErrorShake(error || false)
    const inputRefs = useRef<HTMLInputElement[]>([])

    // Generate unique IDs for accessibility
    const generatedId = useId()
    const baseId = providedId || generatedId
    const errorId = `${baseId}-error`
    const hintId = `${baseId}-hint`
    const groupId = `${baseId}-group`
    const firstInputId = `${baseId}-0`

    // Construct aria-describedby to link hint and error messages
    const ariaDescribedBy =
        [
            hintText && !error ? hintId : null,
            error && errorMessage ? errorId : null,
        ]
            .filter(Boolean)
            .join(' ') || undefined

    useEffect(() => {
        const val = value || ''
        const otpArray = val.split('').slice(0, length)
        const paddedOtp = [
            ...otpArray,
            ...new Array(Math.max(length - otpArray.length, 0)).fill(''),
        ]
        setOtp(paddedOtp)
    }, [disabled, value, length])

    useEffect(() => {
        if (autoFocus && inputRefs.current[0] && !disabled) {
            inputRefs.current[0].focus()
        }
    }, [autoFocus, disabled])

    const handleChange = (index: number, val: string) => {
        if (disabled) return

        if (val.length === 0) {
            const newOtp = [...otp]
            newOtp[index] = ''
            setOtp(newOtp)
            onChange?.(newOtp.join(''))
            return
        }

        const newVal = val.slice(-1)

        if (newVal && !/^\d$/.test(newVal)) return

        if (otp[index] && newVal !== otp[index]) {
            for (let i = index + 1; i < length; i++) {
                if (!otp[i]) {
                    const newOtp = [...otp]
                    newOtp[i] = newVal
                    setOtp(newOtp)
                    onChange?.(newOtp.join(''))
                    inputRefs.current[i]?.focus()
                    return
                }
            }
            return
        }

        const newOtp = [...otp]
        newOtp[index] = newVal
        setOtp(newOtp)

        onChange?.(newOtp.join(''))

        if (newVal && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (disabled) return

        const key = e.key

        if (key === 'Backspace') {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus()
            }
        } else if ((key === 'ArrowLeft' || key === 'Left') && index > 0) {
            e.preventDefault()
            inputRefs.current[index - 1]?.focus()
        } else if (
            (key === 'ArrowRight' || key === 'Right') &&
            index < length - 1
        ) {
            e.preventDefault()
            inputRefs.current[index + 1]?.focus()
        }
    }

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        if (disabled) return

        e.preventDefault()
        const pastedData = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, length)
        const otpArray = pastedData.split('')
        const newOtp = [
            ...otpArray,
            ...new Array(length - otpArray.length).fill(''),
        ]
        setOtp(newOtp)
        onChange?.(newOtp.join(''))

        // Focus the next empty input or last input
        const nextIndex = Math.min(otpArray.length, length - 1)
        inputRefs.current[nextIndex]?.focus()
    }

    return (
        <Block
            data-otpinput={label ?? ''}
            data-status={disabled ? 'disabled' : 'enabled'}
            display="flex"
            flexDirection="column"
            gap={otpInputTokens.gap}
            width={'100%'}
        >
            <InputLabels
                label={label}
                sublabel={sublabel}
                helpIconHintText={helpIconHintText}
                name={name}
                inputId={firstInputId}
                required={required}
                tokens={otpInputTokens}
            />
            <Wrapper style={getErrorShakeStyle(shouldShake)}>
                <Block
                    id={groupId}
                    role="group"
                    aria-label={
                        label
                            ? `${label}${sublabel ? ` ${sublabel}` : ''}${
                                  required ? ' (required)' : ''
                              }`
                            : undefined
                    }
                    aria-describedby={ariaDescribedBy}
                    data-element="otp-input-container"
                    display="flex"
                    gap={otpInputTokens.inputContainer.gap}
                    width={'100%'}
                >
                    {otp.map((digit, index) => {
                        const inputId = `${baseId}-${index}`
                        const ariaLabel = label
                            ? `${label} digit ${index + 1} of ${length}`
                            : `Digit ${index + 1} of ${length}`

                        return (
                            <PrimitiveInput
                                id={inputId}
                                data-element={`otp-input-${index}`}
                                placeholder={placeholder}
                                placeholderColor={'transparent'}
                                form={form}
                                name={name ? `${name}-${index}` : undefined}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]"
                                autoComplete="one-time-code"
                                width={
                                    otpInputTokens.inputContainer.input.width
                                }
                                height={
                                    otpInputTokens.inputContainer.input.height
                                }
                                borderRadius={
                                    otpInputTokens.inputContainer.input
                                        .borderRadius
                                }
                                style={{
                                    textAlign: 'center',
                                }}
                                fontSize={
                                    otpInputTokens.inputContainer.input.fontSize
                                }
                                fontWeight={
                                    otpInputTokens.inputContainer.input
                                        .fontWeight
                                }
                                ref={(el: HTMLInputElement) => {
                                    inputRefs.current[index] = el
                                }}
                                key={index}
                                border={
                                    otpInputTokens.inputContainer.input.border[
                                        error ? 'error' : 'default'
                                    ]
                                }
                                outline="none"
                                backgroundColor={
                                    otpInputTokens.inputContainer.input
                                        .backgroundColor[
                                        error ? 'error' : 'default'
                                    ]
                                }
                                transition="border 200ms ease-in-out, box-shadow 200ms ease-in-out, background-color 200ms ease-in-out"
                                _hover={{
                                    border: otpInputTokens.inputContainer.input
                                        .border.hover,
                                    backgroundColor:
                                        otpInputTokens.inputContainer.input
                                            .backgroundColor.hover,
                                }}
                                color={
                                    otpInputTokens.inputContainer.input.color[
                                        disabled ? 'disabled' : 'default'
                                    ]
                                }
                                _focus={{
                                    border: otpInputTokens.inputContainer.input
                                        .border[error ? 'error' : 'focus'],
                                    boxShadow: '0 0 0 3px #EFF6FF',
                                    backgroundColor:
                                        'rgba(239, 246, 255, 0.15)',
                                }}
                                disabled={disabled}
                                _disabled={{
                                    backgroundColor:
                                        otpInputTokens.inputContainer.input
                                            .backgroundColor.disabled,
                                    border: otpInputTokens.inputContainer.input
                                        .border.disabled,
                                    cursor: 'not-allowed',
                                }}
                                value={digit}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, e.target.value)
                                }
                                maxLength={1}
                                onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>
                                ) => handleKeyDown(index, e)}
                                onFocus={(
                                    e: React.FocusEvent<HTMLInputElement>
                                ) => {
                                    const input = e.target
                                    const len = input.value.length
                                    input.setSelectionRange(len, len)
                                    setActiveIndex(index)
                                }}
                                onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                ) => {
                                    const input = e.currentTarget
                                    const len = input.value.length
                                    input.setSelectionRange(len, len)
                                }}
                                onBlur={() => setActiveIndex(-1)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                aria-label={ariaLabel}
                                aria-required={required ? 'true' : undefined}
                                aria-invalid={error ? 'true' : 'false'}
                                aria-describedby={ariaDescribedBy}
                                {...rest}
                            />
                        )
                    })}
                </Block>
            </Wrapper>
            <InputFooter
                hintText={hintText}
                error={error}
                errorMessage={errorMessage}
                errorId={errorId}
                hintId={hintId}
                tokens={otpInputTokens}
            />
        </Block>
    )
}

export default OTPInput
