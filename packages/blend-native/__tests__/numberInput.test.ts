import { describe, it, expect } from 'vitest'
import {
    clampValueOnBlur,
    getDisplayValue,
    getRangeErrorMessage,
    isStepDownDisabled,
    isStepUpDisabled,
    isUnitTooLong,
    parseNumberInput,
    sanitizeNumberInput,
} from '../src/components/NumberInput/numberInput.utils'

describe('number input math (web utils parity)', () => {
    it('sanitizes keystrokes to a single signed decimal', () => {
        expect(sanitizeNumberInput('12a3')).toBe('123')
        expect(sanitizeNumberInput('--12')).toBe('-12')
        expect(sanitizeNumberInput('1.2.3')).toBe('1.23')
        expect(sanitizeNumberInput('-1.2-')).toBe('-1.2')
        expect(sanitizeNumberInput('₹1,200')).toBe('1200')
    })

    it('parses incomplete edits to null, never NaN', () => {
        expect(parseNumberInput('')).toBeNull()
        expect(parseNumberInput('-')).toBeNull()
        expect(parseNumberInput('.')).toBeNull()
        expect(parseNumberInput('1.5')).toBe(1.5)
        expect(parseNumberInput('-3')).toBe(-3)
    })

    it('clamps on blur, honouring preventNegative', () => {
        expect(clampValueOnBlur(150, 0, 100, false)).toBe(100)
        expect(clampValueOnBlur(-5, undefined, undefined, true)).toBe(0)
        expect(clampValueOnBlur(null, 0, 100, false)).toBeNull()
        expect(clampValueOnBlur(-5, -10, 100, false)).toBe(-5)
    })

    it('shows raw text while focused and canonical value when blurred', () => {
        expect(getDisplayValue('1.', true, 1)).toBe('1.')
        expect(getDisplayValue('1.', false, 1)).toBe('1')
        expect(getDisplayValue('', false, null)).toBe('')
    })

    it('disables steppers when the next step would overshoot', () => {
        expect(isStepUpDisabled(99, 1, 100)).toBe(false)
        expect(isStepUpDisabled(100, 1, 100)).toBe(true)
        expect(isStepDownDisabled(0, 1, undefined, true)).toBe(true)
        expect(isStepDownDisabled(5, 5, 0, false)).toBe(false)
        expect(isStepDownDisabled(4, 5, 0, false)).toBe(true)
    })

    it('auto-raises a range error out of bounds', () => {
        expect(getRangeErrorMessage(150, 0, 100)).toMatch(/at most 100/)
        expect(getRangeErrorMessage(-1, 0, 100)).toMatch(/at least 0/)
        expect(getRangeErrorMessage(50, 0, 100)).toBeUndefined()
        expect(getRangeErrorMessage(null, 0, 100)).toBeUndefined()
    })

    it('hides units longer than seven characters', () => {
        expect(isUnitTooLong('USD')).toBe(false)
        expect(isUnitTooLong('requests')).toBe(true)
        expect(isUnitTooLong(undefined)).toBe(false)
    })
})
