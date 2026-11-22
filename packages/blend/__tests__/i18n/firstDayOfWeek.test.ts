import { afterEach, describe, expect, it, vi } from 'vitest'
import { resolveFirstDayOfWeek } from '../../lib/i18n/firstDayOfWeek'

/**
 * Stubs `Intl.Locale` so the CLDR conversion can be tested on any runtime.
 * Real `getWeekInfo()` support is absent in Firefox and older Safari, which is
 * exactly why Blend does not derive this by default.
 */
const stubLocale = (shape: object | null) => {
    vi.stubGlobal(
        'Intl',
        Object.assign(Object.create(Object.getPrototypeOf(Intl)), Intl, {
            Locale: function MockLocale() {
                if (shape === null) throw new RangeError('bad tag')
                return shape
            },
        })
    )
}

describe('resolveFirstDayOfWeek', () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('converts CLDR Sunday (7) to Blend Sunday (0)', () => {
        // CLDR is 1..7 with 7 = Sunday; Blend is 0..6 with 0 = Sunday. Skipping
        // this conversion renders every Sunday-first locale as Saturday-first.
        stubLocale({ getWeekInfo: () => ({ firstDay: 7 }) })
        expect(resolveFirstDayOfWeek('en-US')).toBe(0)
    })

    it('passes CLDR Monday (1) through unchanged', () => {
        stubLocale({ getWeekInfo: () => ({ firstDay: 1 }) })
        expect(resolveFirstDayOfWeek('en-GB')).toBe(1)
    })

    it('honours the weekInfo accessor form', () => {
        // Some engines shipped the accessor before the method was standardised.
        stubLocale({ weekInfo: { firstDay: 6 } })
        expect(resolveFirstDayOfWeek('ar-EG')).toBe(6)
    })

    it('falls back to Monday when the runtime exposes no week data', () => {
        stubLocale({})
        expect(resolveFirstDayOfWeek('en-US')).toBe(1)
    })

    it('falls back to Monday when the constructor throws', () => {
        stubLocale(null)
        expect(resolveFirstDayOfWeek('not a locale')).toBe(1)
    })

    it('falls back to Monday on an out-of-range value', () => {
        stubLocale({ getWeekInfo: () => ({ firstDay: 0 }) })
        expect(resolveFirstDayOfWeek('en-US')).toBe(1)
    })
})
