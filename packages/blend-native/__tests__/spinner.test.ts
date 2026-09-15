import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getSpinnerTokens,
    type SpinnerTokensType,
    type SpinnerSize,
} from '@juspay/blend-design-system/node'
import {
    DEFAULT_SPIN_DURATION,
    SPINNER_CENTER,
    getSpinDuration,
    getSpinnerGeometry,
} from '../src/components/Spinner/spinner.utils'

const SIZES: SpinnerSize[] = ['sm', 'md', 'lg']
const THEMES = [Theme.LIGHT, Theme.DARK]

describe('spinner geometry', () => {
    for (const theme of THEMES) {
        const tokens = getSpinnerTokens(FOUNDATION_THEME, theme)
            .sm as SpinnerTokensType

        it.each(SIZES.map((s) => [s] as const))(
            `${theme}: %s resolves web's arc geometry with no NaN`,
            (size) => {
                const g = getSpinnerGeometry(size, tokens)
                expect(Number.isFinite(g.size)).toBe(true)
                expect(g.size).toBeGreaterThan(0)
                expect(g.strokeWidth).toBeGreaterThan(0)
                // Radius insets by half the stroke, web parity.
                expect(g.radius).toBe(SPINNER_CENTER - g.strokeWidth / 2)
                // Quarter arc: dash is a fourth of the gap circumference.
                expect(g.dashArray[0]).toBeCloseTo(g.dashArray[1] / 4)
            }
        )

        it(`${theme}: colors and track resolve to non-empty strings`, () => {
            for (const key of ['default', 'primary', 'inverse'] as const) {
                expect(String(tokens.colors[key])).not.toBe('')
                expect(String(tokens.colors[key])).not.toBe('undefined')
            }
            expect(String(tokens.trackColor)).not.toBe('undefined')
        })
    }

    it("parses the '0.8s' duration token to 800ms", () => {
        const tokens = getSpinnerTokens(FOUNDATION_THEME, Theme.LIGHT)
            .sm as SpinnerTokensType
        expect(getSpinDuration(tokens)).toBe(800)
    })

    it('falls back when the duration token is unparseable', () => {
        const tokens = getSpinnerTokens(FOUNDATION_THEME, Theme.LIGHT)
            .sm as SpinnerTokensType
        const broken = {
            ...tokens,
            animation: { duration: 'fast' },
        } as SpinnerTokensType
        expect(getSpinDuration(broken)).toBe(DEFAULT_SPIN_DURATION)
    })
})
