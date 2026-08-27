import { describe, it, expect } from 'vitest'
import {
    buildCellLabel,
    clampOtpSlotLength,
    otpToCells,
    processCellChange,
} from '../src/components/OTPInput/otpInput.utils'

describe('otp input utils (web parity)', () => {
    it('clamps the slot count to 1..32 with a default of 6', () => {
        expect(clampOtpSlotLength(undefined)).toBe(6)
        expect(clampOtpSlotLength(NaN)).toBe(6)
        expect(clampOtpSlotLength(0)).toBe(1)
        expect(clampOtpSlotLength(-3)).toBe(1)
        expect(clampOtpSlotLength(4)).toBe(4)
        expect(clampOtpSlotLength(4.9)).toBe(4)
        expect(clampOtpSlotLength(99)).toBe(32)
    })

    it('splits a value into padded cells, dropping non-digits', () => {
        expect(otpToCells('12', 4)).toEqual(['1', '2', '', ''])
        expect(otpToCells('1a2b3', 4)).toEqual(['1', '2', '3', ''])
        expect(otpToCells('123456789', 4)).toEqual(['1', '2', '3', '4'])
        expect(otpToCells('', 3)).toEqual(['', '', ''])
    })

    it('writes a single digit and moves focus forward', () => {
        expect(processCellChange(['', '', '', ''], 0, '7')).toEqual({
            cells: ['7', '', '', ''],
            focusIndex: 1,
        })
    })

    it('spreads a multi-character run across cells (paste / SMS autofill)', () => {
        expect(processCellChange(['', '', '', ''], 0, '1234')).toEqual({
            cells: ['1', '2', '3', '4'],
            focusIndex: 3,
        })
        // Overflow past the last cell is dropped; focus stays on the last.
        expect(processCellChange(['', '', '', ''], 2, '987')).toEqual({
            cells: ['', '', '9', '8'],
            focusIndex: 3,
        })
    })

    it('ignores non-digit noise inside a run', () => {
        expect(processCellChange(['', '', ''], 0, '1-2')).toEqual({
            cells: ['1', '2', ''],
            focusIndex: 2,
        })
    })

    it('clears the cell when the change empties it', () => {
        expect(processCellChange(['1', '2', '3'], 1, '')).toEqual({
            cells: ['1', '', '3'],
            focusIndex: null,
        })
        expect(processCellChange(['1', '2', '3'], 1, 'x')).toEqual({
            cells: ['1', '', '3'],
            focusIndex: null,
        })
    })

    it('builds per-cell accessibility labels', () => {
        expect(buildCellLabel('OTP', 0, 6)).toBe('OTP, digit 1 of 6')
        expect(buildCellLabel(undefined, 2, 4)).toBe(
            'One-time code, digit 3 of 4'
        )
        expect(buildCellLabel('  ', 0, 4)).toBe('One-time code, digit 1 of 4')
    })
})
