import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
    getDateTimeFormat,
    getNumberFormat,
    getPluralRules,
    resetFormatterCache,
} from '../../../lib/i18n/format/formatterCache'

describe('formatterCache', () => {
    beforeEach(() => {
        resetFormatterCache()
        vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('instance reuse', () => {
        it('returns the same date-time formatter for the same locale and preset', () => {
            // Constructing an Intl.DateTimeFormat costs roughly 15x what
            // formatting with one does, so identity here is the point.
            expect(getDateTimeFormat('en-US', 'month-long')).toBe(
                getDateTimeFormat('en-US', 'month-long')
            )
        })

        it('does not share a slot between distinct presets', () => {
            expect(getDateTimeFormat('en-US', 'month-long')).not.toBe(
                getDateTimeFormat('en-US', 'month-short')
            )
        })

        it('does not share a slot between distinct locales', () => {
            expect(getDateTimeFormat('en-US', 'month-long')).not.toBe(
                getDateTimeFormat('fr-FR', 'month-long')
            )
        })

        it('keys the number and plural caches the same way', () => {
            expect(getNumberFormat('en-US', 'integer')).toBe(
                getNumberFormat('en-US', 'integer')
            )
            expect(getNumberFormat('en-US', 'integer')).not.toBe(
                getNumberFormat('en-US', 'compact')
            )
            expect(getPluralRules('en-US')).toBe(getPluralRules('en-US'))
        })

        it('clears on reset', () => {
            const before = getDateTimeFormat('en-US', 'month-long')
            resetFormatterCache()
            expect(getDateTimeFormat('en-US', 'month-long')).not.toBe(before)
        })
    })

    describe('bad locale tags', () => {
        it('falls back rather than throwing, and warns once', () => {
            // locale arrives from a public prop typed string, and every caller
            // runs in the render phase, so a throw would white-screen the
            // consumer's subtree.
            expect(() =>
                getNumberFormat('not a locale', 'integer')
            ).not.toThrow()
            getNumberFormat('not a locale', 'integer')

            const fallbackWarnings = vi
                .mocked(console.warn)
                .mock.calls.filter(([message]) =>
                    String(message).includes('falling back')
                )
            expect(fallbackWarnings).toHaveLength(1)
        })

        it('still produces a usable formatter after falling back', () => {
            expect(
                getNumberFormat('not a locale', 'integer').format(1000)
            ).toBe('1,000')
        })
    })

    describe('presets', () => {
        it('pins month and weekday formatters to UTC', () => {
            // Asserted on resolvedOptions rather than behaviourally: CI runners
            // are UTC, so a behavioural timezone test would pass vacuously
            // while this holds everywhere.
            expect(
                getDateTimeFormat('en-US', 'month-long').resolvedOptions()
                    .timeZone
            ).toBe('UTC')
            expect(
                getDateTimeFormat('en-US', 'weekday-short').resolvedOptions()
                    .timeZone
            ).toBe('UTC')
        })

        it('formats numbers structurally as expected', () => {
            expect(getNumberFormat('en-US', 'integer').format(1234)).toBe(
                '1,234'
            )
            expect(getNumberFormat('de-DE', 'decimal-2').format(1.5)).toMatch(
                /1,50/
            )
            expect(getNumberFormat('en-US', 'compact').format(1500)).toMatch(
                /1\.5K/
            )
        })
    })
})
