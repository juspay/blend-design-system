import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getSkeletonTokens,
    type SkeletonTokensType,
} from '@juspay/blend-design-system/node'
import { parseDuration } from '../src/adapters/cssStringAdapter'
import {
    SKELETON_FALLBACK_DURATION,
    resolveSkeletonDuration,
    resolveSkeletonRadius,
} from '../src/components/Skeleton/skeleton.utils'

const light = getSkeletonTokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as SkeletonTokensType
const dark = getSkeletonTokens(FOUNDATION_THEME, Theme.DARK)
    .sm as SkeletonTokensType

describe('parseDuration', () => {
    it.each([
        ['1.5s', 1500],
        ['200ms', 200],
        ['0s', 0],
        [800, 800],
    ] as const)('parses %s → %d', (input, expected) => {
        expect(parseDuration(input)).toBe(expected)
    })

    it('rejects unitless strings and junk', () => {
        expect(parseDuration('1500')).toBeUndefined()
        expect(parseDuration('fast')).toBeUndefined()
        expect(parseDuration(undefined)).toBeUndefined()
        expect(parseDuration(Number.NaN)).toBeUndefined()
    })
})

describe('resolveSkeletonDuration', () => {
    it('parses the token duration to milliseconds', () => {
        const duration = resolveSkeletonDuration(light)
        expect(duration).toBeGreaterThan(0)
        expect(Number.isFinite(duration)).toBe(true)
    })

    it('falls back when the token is unparseable', () => {
        const broken = {
            ...light,
            animation: { ...light.animation, duration: 'oops' },
        } as SkeletonTokensType
        expect(resolveSkeletonDuration(broken)).toBe(SKELETON_FALLBACK_DURATION)
    })
})

describe('resolveSkeletonRadius', () => {
    it('resolves numeric radii for rectangle and rounded', () => {
        for (const shape of ['rectangle', 'rounded'] as const) {
            const radius = resolveSkeletonRadius(shape, light)
            expect(Number.isFinite(radius)).toBe(true)
            expect(radius).toBeGreaterThanOrEqual(0)
        }
    })

    it('circle uses half the smaller numeric dimension', () => {
        expect(resolveSkeletonRadius('circle', light, 40, 40)).toBe(20)
        expect(resolveSkeletonRadius('circle', light, 60, 40)).toBe(20)
    })

    it('circle falls back to a pill radius for unknown sizes', () => {
        // The CSS token is "50%", which RN cannot express as a radius.
        expect(resolveSkeletonRadius('circle', light, '100%', 40)).toBe(9999)
        expect(resolveSkeletonRadius('circle', light)).toBe(9999)
    })
})

describe('skeleton theming', () => {
    it('light and dark base colours differ', () => {
        expect(String(light.colors.base)).not.toBe(String(dark.colors.base))
    })
})
