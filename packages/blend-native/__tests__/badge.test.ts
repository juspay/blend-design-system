import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    BadgeColor,
    BadgeSize,
    getBadgeTokens,
    type BadgeTokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../src/adapters/cssStringAdapter'
import {
    formatCount,
    getBadgeAccessibleLabel,
    resolvePositionInsets,
} from '../src/components/Badge/badge.utils'

const SIZES = [BadgeSize.SM, BadgeSize.MD, BadgeSize.LG] as const
const COLORS = [
    BadgeColor.ALERT,
    BadgeColor.NEUTRAL,
    BadgeColor.WARNING,
    BadgeColor.PRIMARY,
    BadgeColor.SUCCESS,
] as const

describe('Badge tokens', () => {
    describe.each([
        ['sm', Theme.LIGHT],
        ['lg', Theme.LIGHT],
        ['sm', Theme.DARK],
        ['lg', Theme.DARK],
    ])('%s / %s', (breakpoint, theme) => {
        const tokens = getBadgeTokens(FOUNDATION_THEME, theme)[
            breakpoint as 'sm' | 'lg'
        ] as BadgeTokensType

        it('parses every size-indexed dot dimension', () => {
            for (const size of SIZES) {
                expect(
                    parseDimension(tokens.dot.width[size] as string | number)
                ).toBeGreaterThan(0)
                expect(
                    parseDimension(tokens.dot.height[size] as string | number)
                ).toBeGreaterThan(0)
            }
        })

        it('parses every size-indexed pill dimension', () => {
            for (const size of SIZES) {
                for (const key of [
                    'minWidth',
                    'height',
                    'paddingLeft',
                    'paddingRight',
                ] as const) {
                    expect(
                        parseDimension(
                            tokens.pill[key][size] as string | number
                        )
                    ).toBeGreaterThanOrEqual(0)
                }
            }
        })

        it('parses text fontSize and lineHeight per size', () => {
            for (const size of SIZES) {
                expect(
                    parseDimension(
                        tokens.text.fontSize[size] as string | number
                    )
                ).toBeGreaterThan(0)
                expect(
                    parseDimension(
                        tokens.text.lineHeight[size] as string | number
                    )
                ).toBeGreaterThan(0)
            }
        })

        it('carries a non-empty background per color', () => {
            for (const color of COLORS) {
                expect(
                    String(tokens.backgroundColor[color]).length
                ).toBeGreaterThan(0)
            }
        })

        it('parses the position offset per size', () => {
            for (const size of SIZES) {
                expect(
                    parseDimension(
                        tokens.position.offset[size] as string | number
                    )
                ).toBeGreaterThanOrEqual(0)
            }
        })
    })
})

describe('formatCount', () => {
    it('returns the count unchanged at or below the max', () => {
        expect(formatCount(0)).toBe('0')
        expect(formatCount(42)).toBe('42')
        expect(formatCount(99)).toBe('99')
    })

    it('overflows to "{maxCount}+" above the max', () => {
        expect(formatCount(100)).toBe('99+')
        expect(formatCount(9999)).toBe('99+')
    })

    it('honours a custom max', () => {
        expect(formatCount(10, 9)).toBe('9+')
        expect(formatCount(9, 9)).toBe('9')
    })
})

describe('getBadgeAccessibleLabel', () => {
    it('returns undefined when the badge is hidden', () => {
        expect(getBadgeAccessibleLabel(5, undefined, 99, false)).toBeUndefined()
    })

    it('text wins over the count', () => {
        expect(getBadgeAccessibleLabel(5, 'New', 99, true)).toBe('New')
    })

    it('reads the count', () => {
        expect(getBadgeAccessibleLabel(5, undefined, 99, true)).toBe('5')
        expect(getBadgeAccessibleLabel(0, undefined, 99, true)).toBe('0')
    })

    it('reads "More than N" above the max', () => {
        expect(getBadgeAccessibleLabel(100, undefined, 99, true)).toBe(
            'More than 99'
        )
    })

    it('falls back to "Notification" with no count or text', () => {
        expect(getBadgeAccessibleLabel(undefined, undefined, 99, true)).toBe(
            'Notification'
        )
    })
})

describe('resolvePositionInsets', () => {
    const tokens = getBadgeTokens(FOUNDATION_THEME, Theme.LIGHT)
        .sm as BadgeTokensType
    // md dot = 8px, md pill height = 20px, md offset = 4px.
    const dotHalf = 4
    const pillHalf = 10
    const offset = 4

    it('applies each corner to the two matching edges only', () => {
        const positions = [
            'top-right',
            'top-left',
            'bottom-right',
            'bottom-left',
        ] as const
        for (const position of positions) {
            const insets = resolvePositionInsets(
                position,
                BadgeSize.MD,
                tokens,
                { hasContent: false }
            )
            const keys = Object.keys(insets)
            expect(keys).toHaveLength(2)
            const [vertical, horizontal] = position.split('-')
            expect(keys).toContain(vertical)
            expect(keys).toContain(horizontal)
        }
    })

    it('a dot centers on the corner: offset 0 minus half size', () => {
        const insets = resolvePositionInsets(
            'top-right',
            BadgeSize.MD,
            tokens,
            {
                hasContent: false,
            }
        )
        expect(insets).toEqual({ top: -dotHalf, right: -dotHalf })
    })

    it('a pill uses the token offset minus half height', () => {
        const insets = resolvePositionInsets(
            'bottom-left',
            BadgeSize.MD,
            tokens,
            {
                hasContent: true,
            }
        )
        expect(insets).toEqual({
            bottom: offset - pillHalf,
            left: offset - pillHalf,
        })
    })

    it('a custom offset replaces the token offset on both axes', () => {
        const insets = resolvePositionInsets('top-left', BadgeSize.MD, tokens, {
            customOffset: [10, 20],
            hasContent: true,
        })
        expect(insets).toEqual({ top: 20 - pillHalf, left: 10 - pillHalf })
    })

    it('a custom offset applies to a dot too', () => {
        const insets = resolvePositionInsets(
            'top-right',
            BadgeSize.MD,
            tokens,
            {
                customOffset: [6, 2],
                hasContent: false,
            }
        )
        expect(insets).toEqual({ top: 2 - dotHalf, right: 6 - dotHalf })
    })

    it('isCircular insets 14% of the parent minus the half extent', () => {
        const insets = resolvePositionInsets(
            'top-right',
            BadgeSize.MD,
            tokens,
            {
                hasContent: false,
                isCircular: true,
                parentSize: { width: 100, height: 100 },
            }
        )
        // 100 * 0.14 carries float error; compare approximately.
        expect(insets.top).toBeCloseTo(14 - dotHalf)
        expect(insets.right).toBeCloseTo(14 - dotHalf)
        expect(insets.bottom).toBeUndefined()
        expect(insets.left).toBeUndefined()
    })

    it('isCircular shifts outward with a custom offset, web parity', () => {
        const insets = resolvePositionInsets(
            'top-right',
            BadgeSize.MD,
            tokens,
            {
                customOffset: [3, 5],
                hasContent: false,
                isCircular: true,
                parentSize: { width: 100, height: 100 },
            }
        )
        expect(insets.top).toBeCloseTo(14 - 5 - dotHalf)
        expect(insets.right).toBeCloseTo(14 - 3 - dotHalf)
    })

    it('sizes the half-extent from the size tokens', () => {
        // sm dot = 6px → half 3; lg dot = 10px → half 5.
        expect(
            resolvePositionInsets('top-right', BadgeSize.SM, tokens, {
                hasContent: false,
            })
        ).toEqual({ top: -3, right: -3 })
        expect(
            resolvePositionInsets('top-right', BadgeSize.LG, tokens, {
                hasContent: false,
            })
        ).toEqual({ top: -5, right: -5 })
    })
})
