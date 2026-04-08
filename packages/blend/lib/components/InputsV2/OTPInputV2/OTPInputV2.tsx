import {
    type ChangeEvent,
    type ClipboardEvent,
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    forwardRef,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import Block from '../../Primitives/Block/Block'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput'
import type { AnyRef } from '../inputV2.types'
import { FOCUS_RING_STYLES, TRANSITION } from '../TextInputV2/utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import type { OTPInputV2Props } from './OTPInputV2.types'
import type { OTPInputV2TokensType } from './OTPInputV2.tokens'
import { otpCharsToPaddedArray } from './utils'
import { setExternalRef } from '../utils/utils'

const OTPInputV2 = forwardRef<HTMLInputElement, OTPInputV2Props>(
    (
        {
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
            id: providedId,
            ...rest
        },
        ref
    ) => {
        const { onKeyDown: restOnKeyDown, ...restWithoutKeyDown } = rest
        const filteredRest = filterBlockedProps(restWithoutKeyDown)
        /** Avoid invalid or huge slot counts; caps DOM / state size. */
        const slotLength = Math.max(1, Math.min(length, 32))
        const otpInputTokens =
            useResponsiveTokens<OTPInputV2TokensType>('OTP_INPUTV2')
        const [otp, setOtp] = useState<string[]>(() =>
            otpCharsToPaddedArray(value, slotLength)
        )
        const inputRefs = useRef<Array<HTMLInputElement | undefined>>([])

        const generatedId = useId()
        const baseId = providedId || generatedId
        const errorId = `${baseId}-error`
        const hintId = `${baseId}-hint`
        const groupId = `${baseId}-group`
        const firstInputId = `${baseId}-0`

        const ariaDescribedBy =
            [
                hintText && !error ? hintId : null,
                error && errorMessage ? errorId : null,
            ]
                .filter(Boolean)
                .join(' ') || undefined

        // Disabled inputs mirror `value`; enabled inputs keep local state until remount / parent pattern.
        useEffect(() => {
            if (!disabled) return
            setOtp(otpCharsToPaddedArray(value || '', slotLength))
        }, [disabled, value, slotLength])

        useEffect(() => {
            setOtp((prevOtp) => {
                if (prevOtp.length === slotLength) return prevOtp
                const newOtp = prevOtp.slice(0, slotLength)
                return otpCharsToPaddedArray(newOtp.join(''), slotLength)
            })
        }, [slotLength])

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
                for (let i = index + 1; i < slotLength; i++) {
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

            if (newVal && index < slotLength - 1) {
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
                index < slotLength - 1
            ) {
                e.preventDefault()
                inputRefs.current[index + 1]?.focus()
            }
        }

        const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
            if (disabled) return

            e.preventDefault()
            const pastedData = e.clipboardData
                .getData('text')
                .replace(/\D/g, '')
                .slice(0, slotLength)
            const newOtp = otpCharsToPaddedArray(pastedData, slotLength)
            setOtp(newOtp)
            onChange?.(newOtp.join(''))

            const nextIndex = Math.min(pastedData.length, slotLength - 1)
            inputRefs.current[nextIndex]?.focus()
        }

        const moveCaretToEnd = (input: HTMLInputElement) => {
            const len = input.value.length
            input.setSelectionRange(len, len)
        }

        const inputTokens = otpInputTokens.inputContainer.input
        const borderState = error ? 'error' : 'default'
        const bgState = error ? 'error' : 'default'
        const colorState = disabled ? 'disabled' : 'default'
        const focusBorderState = error ? 'error' : 'focus'

        return (
            <Block
                data-otpinput={label ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={otpInputTokens.gap}
                width="100%"
            >
                <InputLabelsV2
                    label={label}
                    sublabel={sublabel}
                    helpIconText={helpIconHintText}
                    name={name}
                    inputId={firstInputId}
                    required={required}
                    tokens={otpInputTokens.topContainer}
                />
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
                    width="100%"
                    flexWrap="wrap"
                >
                    {otp.map((digit, index) => {
                        const inputId = `${baseId}-${index}`
                        const ariaLabel = label
                            ? `${label} digit ${index + 1} of ${slotLength}`
                            : `Digit ${index + 1} of ${slotLength}`

                        return (
                            <PrimitiveInput
                                {...(index === 0 ? filteredRest : {})}
                                ref={(el: HTMLInputElement | null) => {
                                    inputRefs.current[index] = el ?? undefined
                                    if (index === 0) {
                                        setExternalRef(
                                            ref as AnyRef<HTMLInputElement>,
                                            el
                                        )
                                    }
                                }}
                                key={index}
                                id={inputId}
                                value={digit}
                                maxLength={1}
                                disabled={disabled}
                                data-element={`otp-input-${index}`}
                                form={form}
                                name={name ? `${name}-${index}` : undefined}
                                width={inputTokens.width}
                                height={inputTokens.height}
                                borderRadius={inputTokens.borderRadius}
                                style={{ textAlign: 'center' }}
                                fontSize={inputTokens.fontSize}
                                fontWeight={inputTokens.fontWeight}
                                border={inputTokens.border[borderState]}
                                outline="none"
                                color={inputTokens.color[colorState]}
                                backgroundColor={
                                    inputTokens.backgroundColor[bgState]
                                }
                                transition={TRANSITION}
                                _hover={{
                                    border: inputTokens.border.hover,
                                    backgroundColor:
                                        inputTokens.backgroundColor.hover,
                                }}
                                _focus={{
                                    border: inputTokens.border[
                                        focusBorderState
                                    ],
                                    boxShadow: FOCUS_RING_STYLES.boxShadow,
                                    backgroundColor:
                                        FOCUS_RING_STYLES.backgroundColor,
                                }}
                                _disabled={{
                                    backgroundColor:
                                        inputTokens.backgroundColor.disabled,
                                    border: inputTokens.border.disabled,
                                    cursor: 'not-allowed',
                                }}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleChange(index, e.target.value)
                                }
                                onPaste={handlePaste}
                                onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>
                                ) => {
                                    handleKeyDown(index, e)
                                    restOnKeyDown?.(e)
                                }}
                                onFocus={(e: FocusEvent<HTMLInputElement>) => {
                                    moveCaretToEnd(e.target)
                                }}
                                onClick={(e: MouseEvent<HTMLInputElement>) => {
                                    moveCaretToEnd(e.currentTarget)
                                }}
                                aria-label={ariaLabel}
                                aria-required={required ? 'true' : undefined}
                                aria-invalid={error ? 'true' : 'false'}
                                aria-describedby={ariaDescribedBy}
                            />
                        )
                    })}
                </Block>
                <InputFooterV2
                    hintText={hintText}
                    error={error}
                    errorMessage={errorMessage}
                    errorId={errorId}
                    hintId={hintId}
                    tokens={otpInputTokens.bottomContainer}
                />
            </Block>
        )
    }
)

OTPInputV2.displayName = 'OTPInputV2'
export default OTPInputV2
