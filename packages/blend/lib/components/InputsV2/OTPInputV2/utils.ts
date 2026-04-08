/** Pads or truncates character splits to a fixed-length OTP cell array. */
export function otpCharsToPaddedArray(value: string, length: number): string[] {
    const initial = (value || '').split('').slice(0, length)
    return [
        ...initial,
        ...new Array(Math.max(length - initial.length, 0)).fill(''),
    ]
}
