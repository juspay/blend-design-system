/**
 * Pure ports of web's `NumberInputV2/utils.ts` — sanitising, clamping,
 * display, stepper math and the auto range error. All total.
 */

/** Web's `NUMBER_INPUT_V2_UNIT_MAX_LENGTH`. */
export const UNIT_MAX_LENGTH = 7

/**
 * Web's `sanitizeNumberInput`: strip everything but digits, `.` and `-`,
 * keep a single leading minus and a single decimal point.
 */
export function sanitizeNumberInput(raw: string): string {
    let cleaned = raw.replace(/[^\d.-]/g, '')
    const negative = cleaned.startsWith('-')
    cleaned = cleaned.replace(/-/g, '')
    const [head, ...restParts] = cleaned.split('.')
    const rest = restParts.join('')
    cleaned = restParts.length > 0 ? `${head}.${rest}` : (head ?? '')
    return negative ? `-${cleaned}` : cleaned
}

/** Parse the sanitised text; incomplete input (`''`, `-`, `.`) is null. */
export function parseNumberInput(text: string): number | null {
    if (text === '' || text === '-' || text === '.' || text === '-.') {
        return null
    }
    const n = Number(text)
    return Number.isFinite(n) ? n : null
}

/** Web's `clampValueOnBlur`. */
export function clampValueOnBlur(
    value: number | null,
    min: number | undefined,
    max: number | undefined,
    preventNegative: boolean | undefined
): number | null {
    if (value === null) return null
    let next = value
    if (preventNegative && next < 0) next = 0
    if (min !== undefined && next < min) next = min
    if (max !== undefined && next > max) next = max
    return next
}

/** Displayed text: raw while typing, canonical number when blurred. */
export function getDisplayValue(
    internal: string,
    focused: boolean,
    value: number | null
): string {
    if (focused) return internal
    return value === null ? '' : String(value)
}

/** Web's stepper-disable math: disabled when the next step overshoots. */
export function isStepUpDisabled(
    value: number | null,
    step: number,
    max: number | undefined
): boolean {
    if (max === undefined) return false
    return (value ?? 0) + step > max
}

export function isStepDownDisabled(
    value: number | null,
    step: number,
    min: number | undefined,
    preventNegative: boolean | undefined
): boolean {
    const next = (value ?? 0) - step
    if (preventNegative && next < 0) return true
    if (min === undefined) return false
    return next < min
}

/** Web's `getRangeErrorMessage` — the auto footer error out of range. */
export function getRangeErrorMessage(
    value: number | null,
    min: number | undefined,
    max: number | undefined
): string | undefined {
    if (value === null) return undefined
    if (min !== undefined && value < min) {
        return `Value must be at least ${min}`
    }
    if (max !== undefined && value > max) {
        return `Value must be at most ${max}`
    }
    return undefined
}

/** Web hides units longer than 7 chars and shows a footer error instead. */
export function isUnitTooLong(unit: string | undefined): boolean {
    return Boolean(unit && unit.trim().length > UNIT_MAX_LENGTH)
}
