import { describe, expect, it } from 'vitest'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { Theme } from '../../../lib/context/theme.enum'
import {
    getMobileDarkTokens,
    getMobileLightTokens,
    getMobileToken,
} from '../../../lib/components/DateRangePicker/components/mobile.tokens'

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

describe('getMobileToken theme dispatch', () => {
    it('keeps the no-theme call on the light token path', () => {
        expect(getMobileToken(FOUNDATION_THEME)).toEqual(
            getMobileLightTokens(FOUNDATION_THEME)
        )
    })

    it('dispatches dark tokens for enum and raw string themes', () => {
        const dark = getMobileDarkTokens(FOUNDATION_THEME)

        expect(getMobileToken(FOUNDATION_THEME, Theme.DARK)).toEqual(dark)
        expect(getMobileToken(FOUNDATION_THEME, 'dark')).toEqual(dark)
    })

    it('keeps the mobile token shape in parity across themes', () => {
        const light = getMobileLightTokens(FOUNDATION_THEME)
        const dark = getMobileDarkTokens(FOUNDATION_THEME)

        for (const breakpoint of ['sm', 'lg'] as const) {
            expect(Object.keys(flatten(dark[breakpoint])).sort()).toEqual(
                Object.keys(flatten(light[breakpoint])).sort()
            )
        }

        expect(dark.sm.drawer.backgroundColor).not.toBe(
            light.sm.drawer.backgroundColor
        )
        expect(dark.sm.presets.text.default).not.toBe(
            light.sm.presets.text.default
        )
    })

    it('derives dark fades from the configured foundation surface', () => {
        const customFoundation = {
            ...FOUNDATION_THEME,
            colors: {
                ...FOUNDATION_THEME.colors,
                gray: {
                    ...FOUNDATION_THEME.colors.gray,
                    900: '#0A0B0C',
                },
            },
        }

        expect(
            getMobileDarkTokens(customFoundation).sm.picker.title.fade.top
        ).toContain('#0A0B0C')
    })
})
