import { describe, it, expect } from 'vitest'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { Theme } from '../../../lib/context/theme.enum'
import { getCalendarToken } from '../../../lib/components/DateRangePicker/dateRangePicker.tokens'
import { getCalendarLightTokens } from '../../../lib/components/DateRangePicker/dateRangePicker.light.tokens'
import { getCalendarDarkTokens } from '../../../lib/components/DateRangePicker/dateRangePicker.dark.tokens'

/**
 * Flattens a token tree to `path -> value` so a missing key in one theme is a
 * key-set difference rather than a silently-undefined lookup at runtime.
 */
const flatten = (
    value: unknown,
    prefix = '',
    out: Record<string, unknown> = {}
): Record<string, unknown> => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        for (const [key, child] of Object.entries(
            value as Record<string, unknown>
        )) {
            flatten(child, prefix ? `${prefix}.${key}` : key, out)
        }
        return out
    }

    out[prefix] = value
    return out
}

describe('getCalendarToken theme dispatch', () => {
    const light = getCalendarLightTokens(FOUNDATION_THEME)
    const dark = getCalendarDarkTokens(FOUNDATION_THEME)

    it('returns the light tokens when no theme is passed', () => {
        expect(getCalendarToken(FOUNDATION_THEME)).toEqual(light)
    })

    it('returns the light tokens for Theme.LIGHT', () => {
        expect(getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)).toEqual(light)
    })

    it("returns the light tokens for the raw string 'light'", () => {
        expect(getCalendarToken(FOUNDATION_THEME, 'light')).toEqual(light)
    })

    it('returns the dark tokens for Theme.DARK', () => {
        expect(getCalendarToken(FOUNDATION_THEME, Theme.DARK)).toEqual(dark)
    })

    // ThemeProvider consumers pass a plain string, not the enum member.
    it("returns the dark tokens for the raw string 'dark'", () => {
        expect(getCalendarToken(FOUNDATION_THEME, 'dark')).toEqual(dark)
    })

    it('falls back to light for an unknown theme', () => {
        expect(getCalendarToken(FOUNDATION_THEME, 'sepia')).toEqual(light)
    })
})

describe('CALENDAR light/dark token parity', () => {
    const light = getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)
    const dark = getCalendarToken(FOUNDATION_THEME, Theme.DARK)

    it.each([
        ['light', () => getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)],
        ['dark', () => getCalendarToken(FOUNDATION_THEME, Theme.DARK)],
    ])('exposes both breakpoints for %s', (_theme, getTokens) => {
        const tokens = getTokens()

        expect(Object.keys(tokens).sort()).toEqual(['lg', 'sm'])
        expect(tokens.sm).toBeDefined()
        expect(tokens.lg).toBeDefined()
    })

    it.each([
        ['light', () => getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)],
        ['dark', () => getCalendarToken(FOUNDATION_THEME, Theme.DARK)],
    ])('supplies the %s error border token', (_theme, getTokens) => {
        const tokens = getTokens()

        // `PickerTrigger` reads this for `hasError`; when it is missing the
        // trigger silently renders the resting border instead.
        expect(tokens.sm.trigger.dateInput.border.error).toBeTruthy()
        expect(tokens.lg.trigger.dateInput.border.error).toBeTruthy()
    })

    it.each(['sm', 'lg'] as const)(
        'keeps identical %s key sets across themes',
        (breakpoint) => {
            const lightKeys = Object.keys(flatten(light[breakpoint])).sort()
            const darkKeys = Object.keys(flatten(dark[breakpoint])).sort()

            expect(darkKeys).toEqual(lightKeys)
        }
    )

    it.each(['sm', 'lg'] as const)(
        'actually recolours the %s breakpoint',
        (breakpoint) => {
            const lightFlat = flatten(light[breakpoint])
            const darkFlat = flatten(dark[breakpoint])

            const differing = Object.keys(lightFlat).filter(
                (key) => lightFlat[key] !== darkFlat[key]
            )

            expect(differing.length).toBeGreaterThan(0)
        }
    )

    it('gives the trigger and calendar surfaces different colours per theme', () => {
        expect(dark.lg.trigger.dateInput.backgroundColor).not.toBe(
            light.lg.trigger.dateInput.backgroundColor
        )
        expect(dark.lg.trigger.dateInput.text.color).not.toBe(
            light.lg.trigger.dateInput.text.color
        )
        expect(dark.lg.calendar.backgroundColor).not.toBe(
            light.lg.calendar.backgroundColor
        )
    })
})
