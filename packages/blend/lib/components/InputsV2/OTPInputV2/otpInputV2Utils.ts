/** Pads or truncates character splits to a fixed-length OTP cell array. */
export function otpCharsToPaddedArray(value: string, length: number): string[] {
    const initial = (value || '').split('').slice(0, length)
    return [
        ...initial,
        ...new Array(Math.max(length - initial.length, 0)).fill(''),
    ]
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
