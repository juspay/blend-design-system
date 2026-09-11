/**
 * Pure ports of web's `otpInputV2Utils.ts`. On RN there is no separate
 * paste event — a paste or SMS autofill arrives as a multi-character
 * change on one cell, which `mergeDigitRunIntoOtp` already handles.
 */

/** Web's `clampOtpSlotLength` — 1..32 slots. */
export function clampOtpSlotLength(length: number | undefined): number {
    if (!Number.isFinite(length ?? NaN)) return 6
    return Math.min(32, Math.max(1, Math.trunc(length as number)))
}

/** Value → per-cell digits, padded to the slot count. */
export function otpToCells(value: string, slots: number): string[] {
    const digits = value.replace(/\D/g, '').slice(0, slots).split('')
    return Array.from({ length: slots }, (_, i) => digits[i] ?? '')
}

export type OtpCellChange = {
    cells: string[]
    /** Cell to focus after the change, when any. */
    focusIndex: number | null
}

/**
 * Web's `processOtpCellValueChange`/`mergeDigitRunIntoOtp`: a change on one
 * cell may carry several characters (paste, SMS autofill, IME) — the digit
 * run spreads across the following cells; an emptied cell clears itself.
 */
export function processCellChange(
    cells: readonly string[],
    index: number,
    raw: string
): OtpCellChange {
    const digits = raw.replace(/\D/g, '')
    const next = [...cells]

    if (digits.length === 0) {
        next[index] = ''
        return { cells: next, focusIndex: null }
    }

    let cursor = index
    for (const digit of digits) {
        if (cursor >= next.length) break
        next[cursor] = digit
        cursor += 1
    }
    return {
        cells: next,
        focusIndex: Math.min(cursor, next.length - 1),
    }
}

/** Web's `buildOtpCellAriaLabel`. */
export function buildCellLabel(
    label: string | undefined,
    index: number,
    total: number
): string {
    const base = label?.trim() || 'One-time code'
    return `${base}, digit ${index + 1} of ${total}`
}
