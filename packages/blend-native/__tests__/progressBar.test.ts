import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getProgressBarV2Tokens,
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    type ProgressBarV2TokenType,
} from '@juspay/blend-design-system/node'
import {
    calculateCircularProgressStroke,
    calculatePercentage,
    clampValue,
    getCircularDiameter,
    normalizeRange,
    parseCircularDashToken,
    parseSegmentedPattern,
    parseTransitionDuration,
} from '../src/components/ProgressBar/progressBar.utils'
import { parseDimension } from '../src/adapters/cssStringAdapter'

describe('progress math (web utils parity)', () => {
    it('normalizes reversed and non-finite ranges', () => {
        expect(normalizeRange(100, 0)).toEqual({ min: 0, max: 100 })
        expect(normalizeRange(NaN, NaN)).toEqual({ min: 0, max: 100 })
    })

    it('clamps values into range', () => {
        expect(clampValue(150, 0, 100)).toBe(100)
        expect(clampValue(-5, 0, 100)).toBe(0)
        expect(clampValue(NaN, 0, 100)).toBe(0)
    })

    it('computes percentages, guarding zero-width ranges', () => {
        expect(calculatePercentage(50, 0, 100)).toBe(50)
        expect(calculatePercentage(5, 5, 5)).toBe(0)
        expect(calculatePercentage(15, 10, 20)).toBe(50)
    })

    it('parses dash tokens with spaces or commas', () => {
        expect(parseCircularDashToken('4 2')).toEqual([4, 2])
        expect(parseCircularDashToken('4,2')).toEqual([4, 2])
        expect(parseCircularDashToken('')).toEqual([])
        expect(parseCircularDashToken(undefined)).toEqual([])
    })

    it('computes circular stroke geometry', () => {
        const s = calculateCircularProgressStroke(40, 4, 50)
        expect(s.radius).toBe(18)
        expect(s.dashOffset).toBeCloseTo(s.circumference / 2)
    })

    it('decodes the transition shorthand duration', () => {
        expect(parseTransitionDuration('width 0.3s ease-in-out')).toBe(300)
        expect(
            parseTransitionDuration('stroke-dashoffset 0.3s ease-in-out')
        ).toBe(300)
        expect(parseTransitionDuration(undefined)).toBe(300)
        expect(parseTransitionDuration('nonsense', 250)).toBe(250)
    })
})

describe('segmented pattern decoding', () => {
    const THEMES = [Theme.LIGHT, Theme.DARK]

    it.each(THEMES.map((t) => [t] as const))(
        '%s: decodes the real segmented tokens into ticks',
        (theme) => {
            const tokens = getProgressBarV2Tokens(FOUNDATION_THEME, theme)
                .sm as ProgressBarV2TokenType
            const pattern = parseSegmentedPattern(
                tokens.linear.empty.backgroundImage[
                    ProgressBarV2Appearance.SEGMENTED
                ] as string,
                tokens.linear.empty.backgroundSize[
                    ProgressBarV2Appearance.SEGMENTED
                ] as string
            )
            // The repeating gradient degrades to its first stop — the mark
            // color — and the geometry comes from the stops/backgroundSize.
            expect(pattern.markColor).toMatch(/^#|^rgb/)
            expect(pattern.markWidth).toBeGreaterThan(0)
            expect(pattern.period).toBeGreaterThan(pattern.markWidth)
        }
    )

    it('degrades to defaults on unparseable tokens', () => {
        const pattern = parseSegmentedPattern(undefined, undefined)
        expect(pattern.markColor).toBeNull()
        expect(pattern.markWidth).toBe(2)
        expect(pattern.period).toBe(10)
    })
})

describe('progress tokens resolve for every size', () => {
    const SIZES = Object.values(ProgressBarV2Size)
    const tokens = getProgressBarV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
        .sm as ProgressBarV2TokenType

    it.each(SIZES.map((s) => [s] as const))(
        '%s: linear height and circular geometry parse',
        (size) => {
            expect(
                parseDimension(tokens.linear.height[size] as string)
            ).toBeGreaterThan(0)
            // Via the healing helper — the web token file ships no
            // circular.size.md (flagged upstream), so md falls back to sm.
            expect(
                getCircularDiameter(
                    tokens.circular.size as Record<string, unknown>,
                    size,
                    parseDimension
                )
            ).toBeGreaterThan(0)
            expect(tokens.circular.strokeWidth[size]).toBeGreaterThan(0)
        }
    )

    it('documents the web md circular-size hole the helper heals', () => {
        expect(tokens.circular.size[ProgressBarV2Size.MD]).toBeUndefined()
    })
})
