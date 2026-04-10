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
import { InputStateV2, type AnyRef } from '../inputV2.types'
import { FOCUS_RING_STYLES, TRANSITION } from '../TextInputV2/utils'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../../utils/prop-helpers'
import type { OTPInputV2Props } from './OTPInputV2.types'
import type { OTPInputV2TokensType } from './OTPInputV2.tokens'
import { mergeDigitRunIntoOtp, otpCharsToPaddedArray } from './otpInputV2Utils'
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
        const {
            onKeyDown: restOnKeyDown,
            onFocus: restOnFocus,
            onClick: restOnClick,
            ...restWithoutForwardedHandlers
        } = rest
        const filteredRest = filterBlockedProps(restWithoutForwardedHandlers)
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
            const nextOtp = otpCharsToPaddedArray(value || '', slotLength)
            setOtp((prevOtp) => {
                if (prevOtp.join('') === nextOtp.join('')) return prevOtp
                return nextOtp
            })
        }, [value, slotLength])

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

            if (val.length > 1) {
                const { newOtp, digitCount } = mergeDigitRunIntoOtp(
                    otp,
                    index,
                    val,
                    slotLength
                )
                if (digitCount === 0) return
                setOtp(newOtp)
                onChange?.(newOtp.join(''))
                const nextIndex = Math.min(
                    index + digitCount - 1,
                    slotLength - 1
                )
                inputRefs.current[nextIndex]?.focus()
                return
            }

            const newVal = val.slice(-1)

            if (newVal && !/^\d$/.test(newVal)) return

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
        const labelState: InputStateV2 = disabled
            ? InputStateV2.DISABLED
            : error
              ? InputStateV2.ERROR
              : InputStateV2.DEFAULT

        const inputState = disabled ? 'disabled' : error ? 'error' : 'default'
        const borderState = inputState
        const bgState = inputState
        const colorState = inputState
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
                    state={labelState}
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
                                required={required}
                                data-element={`otp-input-${index}`}
                                form={form}
                                name={name ? `${name}-${index}` : undefined}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]"
                                autoComplete={
                                    index === 0 ? 'one-time-code' : undefined
                                }
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
                                    border: error
                                        ? inputTokens.border.error
                                        : inputTokens.border.hover,
                                    backgroundColor: error
                                        ? inputTokens.backgroundColor.error
                                        : inputTokens.backgroundColor.hover,
                                }}
                                _focus={{
                                    border: error
                                        ? inputTokens.border.error
                                        : inputTokens.border[focusBorderState],
                                    boxShadow: FOCUS_RING_STYLES.boxShadow,
                                    backgroundColor: error
                                        ? inputTokens.backgroundColor.error
                                        : FOCUS_RING_STYLES.backgroundColor,
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
                                onPaste={(
                                    e: ClipboardEvent<HTMLInputElement>
                                ) => {
                                    handlePaste(e)
                                    rest.onPaste?.(e)
                                }}
                                onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>
                                ) => {
                                    handleKeyDown(index, e)
                                    restOnKeyDown?.(e)
                                }}
                                onFocus={(e: FocusEvent<HTMLInputElement>) => {
                                    moveCaretToEnd(e.target)
                                    if (index === 0) restOnFocus?.(e)
                                }}
                                onClick={(e: MouseEvent<HTMLInputElement>) => {
                                    moveCaretToEnd(e.currentTarget)
                                    if (index === 0) restOnClick?.(e)
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
