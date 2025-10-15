import React, {
    type ChangeEvent,
    type KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import Block from '../../Primitives/Block/Block'
import InputLabels from '../utils/InputLabels/InputLabels'
import InputFooter from '../utils/InputFooter/InputFooter'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'

import type { OTPProps } from './types'
import type { OTPInputTokensType } from './otpInput.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'

const OTPInput = ({
    label,
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
    ...rest
}: OTPProps) => {
    const otpInputTokens = useResponsiveTokens<OTPInputTokensType>('OTP_INPUT')
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
    const [, setActiveIndex] = useState<number>(-1)
    const inputRefs = useRef<HTMLInputElement[]>([])

    useEffect(() => {
        if (value) {
            const otpArray = value.split('').slice(0, length)
            const paddedOtp = [
                ...otpArray,
                ...new Array(length - otpArray.length).fill(''),
            ]
            setOtp(paddedOtp)
        } else {
            setOtp(new Array(length).fill(''))
        }
    }, [value, length])

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

            if (index > 0) {
                setTimeout(() => {
                    inputRefs.current[index - 1]?.focus()
                }, 50)
            }
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

        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus()
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault()
            inputRefs.current[index - 1]?.focus()
        } else if (e.key === 'ArrowRight' && index < length - 1) {
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
            display="flex"
            flexDirection="column"
            gap={otpInputTokens.gap}
            width={'100%'}
        >
            <InputLabels
                label={label}
                sublabel={sublabel}
                helpIconHintText={helpIconHintText}
                disabled={disabled}
                name={name}
                required={required}
                tokens={otpInputTokens}
            />
            <Block
                display="flex"
                gap={otpInputTokens.inputContainer.gap}
                width={'100%'}
            >
                {otp.map((digit, index) => (
                    <PrimitiveInput
                        form={form}
                        width={otpInputTokens.inputContainer.input.width}
                        height={otpInputTokens.inputContainer.input.height}
                        borderRadius={
                            otpInputTokens.inputContainer.input.borderRadius
                        }
                        style={{
                            textAlign: 'center',
                        }}
                        fontSize={otpInputTokens.inputContainer.input.fontSize}
                        fontWeight={
                            otpInputTokens.inputContainer.input.fontWeight
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
                        _hover={{
                            border: otpInputTokens.inputContainer.input.border
                                .hover,
                        }}
                        color={
                            otpInputTokens.inputContainer.input.color[
                                disabled ? 'disabled' : 'default'
                            ]
                        }
                        _focus={{
                            border: otpInputTokens.inputContainer.input.border[
                                error ? 'error' : 'focus'
                            ],
                            boxShadow:
                                otpInputTokens.inputContainer.input.boxShadow,
                        }}
                        disabled={disabled}
                        _disabled={{
                            backgroundColor:
                                otpInputTokens.inputContainer.input
                                    .backgroundColor.disabled,
                            border: otpInputTokens.inputContainer.input.border
                                .disabled,
                            cursor: 'not-allowed',
                        }}
                        value={digit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange(index, e.target.value)
                        }
                        maxLength={1}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                            handleKeyDown(index, e)
                        }
                        onFocus={(e) => {
                            e.target.select()
                            setActiveIndex(index)
                        }}
                        onBlur={() => setActiveIndex(-1)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        {...rest}
                    />
                ))}
            </Block>
            <InputFooter
                hintText={hintText}
                error={error}
                errorMessage={errorMessage}
                tokens={otpInputTokens}
            />
        </Block>
    )
}

export default OTPInput
