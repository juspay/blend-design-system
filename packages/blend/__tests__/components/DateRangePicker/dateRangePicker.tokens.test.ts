import { describe, it, expect } from 'vitest'
import crypto from 'node:crypto'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { Theme } from '../../../lib/context/theme.enum'
import { getCalendarToken } from '../../../lib/components/DateRangePicker/dateRangePicker.tokens'
import { getCalendarLightTokens } from '../../../lib/components/DateRangePicker/dateRangePicker.light.tokens'
import { getCalendarDarkTokens } from '../../../lib/components/DateRangePicker/dateRangePicker.dark.tokens'

// SHA-256 of JSON.stringify(getCalendarToken(FOUNDATION_THEME)) from bb4b366d^
// before the CALENDAR light/dark split. Keep this independent from the light
// factory so a future accidental light-token edit cannot self-consistently
// update the regression.
const PRE_RETROFIT_LIGHT_TOKEN_SHA256 =
    '460d6f0275219a7d573bd39cfe1c7536494d4333a6f92c4942cb1234e8d4e012'

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

    it('preserves the pre-retrofit no-theme token output', () => {
        const serialized = JSON.stringify(getCalendarToken(FOUNDATION_THEME))
        const hash = crypto
            .createHash('sha256')
            .update(serialized)
            .digest('hex')

        expect(hash).toBe(PRE_RETROFIT_LIGHT_TOKEN_SHA256)
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

    it('supplies the dark error border token', () => {
        const tokens = getCalendarToken(FOUNDATION_THEME, Theme.DARK)

        expect(tokens.sm.trigger.dateInput.border.error).toBeTruthy()
        expect(tokens.lg.trigger.dateInput.border.error).toBeTruthy()
    })

    it('preserves the legacy light error-border fallback', () => {
        const tokens = getCalendarToken(FOUNDATION_THEME, Theme.LIGHT)

        // PickerTrigger supplies the legacy red fallback when this optional
        // key is absent, preserving the original light token shape.
        expect(tokens.sm.trigger.dateInput.border.error).toBeUndefined()
        expect(tokens.lg.trigger.dateInput.border.error).toBeUndefined()
    })

    it.each(['sm', 'lg'] as const)(
        'keeps shared %s key sets and scopes the dark-only error token',
        (breakpoint) => {
            const lightKeys = Object.keys(flatten(light[breakpoint])).sort()
            const darkKeys = Object.keys(flatten(dark[breakpoint])).sort()

            expect(lightKeys.filter((key) => !darkKeys.includes(key))).toEqual(
                []
            )
            expect(darkKeys.filter((key) => !lightKeys.includes(key))).toEqual([
                'trigger.dateInput.border.error',
            ])
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
