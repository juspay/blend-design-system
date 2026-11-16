import { describe, expect, it } from 'vitest'
import { stripNumberFormatting } from '../../../lib/components/DataTable/utils'

describe('stripNumberFormatting', () => {
    it.each([
        ['$1,234.56', '1234.56'],
        ['1,234,567', '1234567'],
        ['45%', '45'],
        ['₹ 12,34,567.5', '1234567.5'],
        ['not a number', 'not a number'],
        [null, ''],
    ])('keeps the historical en-US result for %s', (input, expected) => {
        expect(stripNumberFormatting(input)).toBe(expected)
        expect(stripNumberFormatting(input, 'en-US')).toBe(expected)
    })

    it('reads a comma as the decimal mark where the locale does', () => {
        // The old code removed every comma: 1.234,56 -> "1.23456".
        expect(stripNumberFormatting('1.234,56 €', 'de-DE')).toBe('1234.56')
        expect(stripNumberFormatting('12,5 %', 'de-DE')).toBe('12.5')
    })

    it('handles space-like group separators, typed or locale-produced', () => {
        expect(stripNumberFormatting('1 234,56', 'fr-FR')).toBe('1234.56')
        expect(stripNumberFormatting('1 234,56', 'fr-FR')).toBe('1234.56')
    })

    it('handles an apostrophe group separator', () => {
        expect(stripNumberFormatting("1'234.5", 'de-CH')).toBe('1234.5')
        expect(stripNumberFormatting('1\u2019234.5', 'de-CH')).toBe('1234.5')
    })

    it('is stable across repeated calls (no stateful regex)', () => {
        const results = Array.from({ length: 4 }, () =>
            stripNumberFormatting('1 234,56', 'fr-FR')
        )
        expect(results).toEqual(Array(4).fill('1234.56'))
    })

    it('falls back to en-US separators for an unusable locale tag', () => {
        expect(stripNumberFormatting('1,234.5', 'en_US')).toBe('1234.5')
    })
})
