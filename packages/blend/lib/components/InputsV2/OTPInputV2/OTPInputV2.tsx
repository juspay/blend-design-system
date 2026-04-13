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
import {
    buildOtpAriaDescribedBy,
    buildOtpCellAriaLabel,
    buildOtpGroupAriaLabel,
    clampOtpSlotLength,
    getOtpKeyNavigation,
    getOtpPasteFocusIndex,
    moveCaretToEnd,
    otpCharsToPaddedArray,
    parsePastedOtpText,
    processOtpCellValueChange,
} from './otpInputV2Utils'
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'

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
        const slotLength = clampOtpSlotLength(length)
        const otpInputTokens =
            useResponsiveTokens<OTPInputV2TokensType>('OTP_INPUTV2')
        const [otp, setOtp] = useState<string[]>(() =>
            otpCharsToPaddedArray(value, slotLength)
        )
        const inputRefs = useRef<Array<HTMLInputElement | undefined>>([])

        const generatedId = useId()
        const baseId = providedId || generatedId

        const { errorId, hintId, groupId, firstInputId } =
            generateAccessibilityIds(baseId)

        const ariaDescribedBy = buildOtpAriaDescribedBy({
            hintText,
            error: Boolean(error),
            errorMessage,
            hintId,
            errorId,
        })

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

            const result = processOtpCellValueChange(
                otp,
                index,
                val,
                slotLength
            )
            if (result.kind === 'noop') return

            setOtp(result.newOtp)
            onChange?.(result.newOtp.join(''))
            if (result.focusIndex !== undefined) {
                inputRefs.current[result.focusIndex]?.focus()
            }
        }

        const handleKeyDown = (
            index: number,
            e: KeyboardEvent<HTMLInputElement>
        ) => {
            if (disabled) return

            const nav = getOtpKeyNavigation(
                e.key,
                index,
                otp[index] ?? '',
                slotLength
            )
            if (nav.action === 'none') return
            if (nav.preventDefault) e.preventDefault()
            inputRefs.current[nav.targetIndex]?.focus()
        }

        const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
            if (disabled) return

            e.preventDefault()
            const pastedData = parsePastedOtpText(
                e.clipboardData.getData('text'),
                slotLength
            )
            const newOtp = otpCharsToPaddedArray(pastedData, slotLength)
            setOtp(newOtp)
            onChange?.(newOtp.join(''))

            const nextIndex = getOtpPasteFocusIndex(
                pastedData.length,
                slotLength
            )
            inputRefs.current[nextIndex]?.focus()
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
                    aria-label={buildOtpGroupAriaLabel(
                        label,
                        sublabel,
                        required
                    )}
                    aria-describedby={ariaDescribedBy}
                    data-element="otp-input-container"
                    display="flex"
                    gap={otpInputTokens.inputContainer.gap}
                    width="100%"
                    flexWrap="wrap"
                >
                    {otp.map((digit, index) => {
                        const inputId = `${baseId}-${index}`
                        const ariaLabel = buildOtpCellAriaLabel(
                            label,
                            index,
                            slotLength
                        )

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
