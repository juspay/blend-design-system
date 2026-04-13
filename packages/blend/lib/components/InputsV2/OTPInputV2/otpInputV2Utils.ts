/** Pads or truncates character splits to a fixed-length OTP cell array. */
export function otpCharsToPaddedArray(value: string, length: number): string[] {
    const initial = (value || '').split('').slice(0, length)
    return [
        ...initial,
        ...new Array(Math.max(length - initial.length, 0)).fill(''),
    ]
}

export const OTP_SLOT_MIN = 1
export const OTP_SLOT_MAX = 32

export function clampOtpSlotLength(
    length: number | undefined,
    fallback = 6
): number {
    return Math.max(OTP_SLOT_MIN, Math.min(length ?? fallback, OTP_SLOT_MAX))
}

/**
 * Applies a run of digits from `raw` into consecutive OTP cells starting at
 * `startIndex` (SMS autofill / IME). Non-digits are stripped; overflow past
 * the last slot is truncated.
 */
export function mergeDigitRunIntoOtp(
    otp: string[],
    startIndex: number,
    raw: string,
    slotLength: number
): { newOtp: string[]; digitCount: number } {
    const maxDigits = Math.max(0, slotLength - startIndex)
    const digits = raw.replace(/\D/g, '').slice(0, maxDigits)
    const newOtp = [...otp]
    for (let i = 0; i < digits.length; i++) {
        newOtp[startIndex + i] = digits[i]!
    }
    return { newOtp, digitCount: digits.length }
}

export function buildOtpAriaDescribedBy(options: {
    hintText?: string
    error: boolean
    errorMessage?: string
    hintId: string
    errorId: string
}): string | undefined {
    const { hintText, error, errorMessage, hintId, errorId } = options
    const ids = [
        hintText && !error ? hintId : null,
        error && errorMessage ? errorId : null,
    ]
        .filter(Boolean)
        .join(' ')
    return ids || undefined
}

export function buildOtpGroupAriaLabel(
    label: string | undefined,
    sublabel: string | undefined,
    required: boolean | undefined
): string | undefined {
    if (!label) return undefined
    return `${label}${sublabel ? ` ${sublabel}` : ''}${
        required ? ' (required)' : ''
    }`
}

export function buildOtpCellAriaLabel(
    label: string | undefined,
    index: number,
    slotLength: number
): string {
    return label
        ? `${label} digit ${index + 1} of ${slotLength}`
        : `Digit ${index + 1} of ${slotLength}`
}

export function parsePastedOtpText(raw: string, slotLength: number): string {
    return raw.replace(/\D/g, '').slice(0, slotLength)
}

export function getOtpPasteFocusIndex(
    pastedDigitCount: number,
    slotLength: number
): number {
    return Math.min(pastedDigitCount, slotLength - 1)
}

export function moveCaretToEnd(input: HTMLInputElement): void {
    const len = input.value.length
    input.setSelectionRange(len, len)
}

export type OtpCellChangeResult =
    | { kind: 'noop' }
    | {
          kind: 'update'
          newOtp: string[]
          /** Focus this cell after update, if defined */
          focusIndex?: number
      }

/**
 * Pure counterpart to the per-cell `onChange` path: clear, multi-digit merge,
 * or single digit with optional advance to the next cell.
 */
export function processOtpCellValueChange(
    otp: string[],
    index: number,
    val: string,
    slotLength: number
): OtpCellChangeResult {
    if (val.length === 0) {
        const newOtp = [...otp]
        newOtp[index] = ''
        return { kind: 'update', newOtp }
    }

    if (val.length > 1) {
        const { newOtp, digitCount } = mergeDigitRunIntoOtp(
            otp,
            index,
            val,
            slotLength
        )
        if (digitCount === 0) return { kind: 'noop' }
        const focusIndex = Math.min(index + digitCount - 1, slotLength - 1)
        return { kind: 'update', newOtp, focusIndex }
    }

    const newVal = val.slice(-1)
    if (newVal && !/^\d$/.test(newVal)) return { kind: 'noop' }

    const newOtp = [...otp]
    newOtp[index] = newVal

    const focusIndex = newVal && index < slotLength - 1 ? index + 1 : undefined

    return { kind: 'update', newOtp, focusIndex }
}

export type OtpKeyNavigation =
    | { action: 'none' }
    | {
          action: 'focus'
          targetIndex: number
          preventDefault?: boolean
      }

export function getOtpKeyNavigation(
    key: string,
    index: number,
    cellValue: string,
    slotLength: number
): OtpKeyNavigation {
    if (key === 'Backspace') {
        if (!cellValue && index > 0) {
            return { action: 'focus', targetIndex: index - 1 }
        }
        return { action: 'none' }
    }
    if ((key === 'ArrowLeft' || key === 'Left') && index > 0) {
        return {
            action: 'focus',
            targetIndex: index - 1,
            preventDefault: true,
        }
    }
    if ((key === 'ArrowRight' || key === 'Right') && index < slotLength - 1) {
        return {
            action: 'focus',
            targetIndex: index + 1,
            preventDefault: true,
        }
    }
    return { action: 'none' }
}
