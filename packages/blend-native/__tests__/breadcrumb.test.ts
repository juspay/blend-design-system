import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getBreadcrumbV2Tokens,
    type BreadcrumbV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../src/adapters/cssStringAdapter'
import {
    computeBreadcrumbOverflowLayout,
    breadcrumbItemKey,
    isCurrentCrumb,
    overflowMenuLabel,
} from '../src/components/Breadcrumb/breadcrumb.utils'

const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const

describe('breadcrumb token matrix', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getBreadcrumbV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as BreadcrumbV2TokensType

            it(`${theme}/${breakpoint}: every state colour parses`, () => {
                for (const state of ['default', 'hover', 'active'] as const) {
                    expect(String(tokens.item.text.color[state])).toMatch(
                        /^#|^rgb/
                    )
                }
                expect(String(tokens.separator.color)).toMatch(/^#|^rgb/)
                expect(String(tokens.ellipsis.color)).toMatch(/^#|^rgb/)
            })

            it(`${theme}/${breakpoint}: item chrome parses`, () => {
                // Padding is "Py Px" — both halves must be parseable
                // dimensions (the component splits the string).
                const parts = String(tokens.item.padding).split(/\s+/)
                expect(parts).toHaveLength(2)
                for (const part of parts) {
                    expect(parseDimension(part)).toBeDefined()
                }
                expect(
                    parseDimension(tokens.item.gap as string | number)
                ).toBeDefined()
                expect(
                    parseDimension(tokens.item.text.fontSize as string | number)
                ).toBeGreaterThan(0)
                expect(
                    parseDimension(
                        tokens.item.text.fontWeight as string | number
                    )
                ).toBeDefined()
                expect(tokens.ellipsis.size).toBeGreaterThan(0)
                expect(
                    parseDimension(
                        tokens.ellipsis.borderRadius as string | number
                    )
                ).toBeGreaterThanOrEqual(0)
            })
        }
    }
})

describe('computeBreadcrumbOverflowLayout (default = web parity)', () => {
    const items = (n: number) =>
        Array.from({ length: n }, (_, i) => ({ label: `Page ${i + 1}` }))

    it('below the limit: all crumbs inline, no menu', () => {
        const layout = computeBreadcrumbOverflowLayout(items(4), 4)
        expect(layout.shouldShowMenu).toBe(false)
        expect(layout.base?.label).toBe('Page 1')
        expect(layout.rest).toHaveLength(3)
        expect(layout.menuItems).toHaveLength(0)
    })

    it('at the limit exactly: no overflow (strictly greater-than, like web)', () => {
        const layout = computeBreadcrumbOverflowLayout(items(4), 4)
        expect(layout.shouldShowMenu).toBe(false)
    })

    it('beyond the limit: first + ellipsis + up-to-3 tail (web parity)', () => {
        const layout = computeBreadcrumbOverflowLayout(items(8), 4)
        expect(layout.shouldShowMenu).toBe(true)
        expect(layout.base?.label).toBe('Page 1')
        expect(layout.rest.map((i) => i.label)).toEqual([
            'Page 6',
            'Page 7',
            'Page 8',
        ])
        expect(layout.menuItems.map((i) => i.label)).toEqual([
            'Page 2',
            'Page 3',
            'Page 4',
            'Page 5',
        ])
    })

    it('web parity: one past the limit collapses with a one-crumb menu', () => {
        const layout = computeBreadcrumbOverflowLayout(items(5), 4)
        expect(layout.shouldShowMenu).toBe(true)
        expect(layout.menuItems.map((i) => i.label)).toEqual(['Page 2'])
    })

    it('web parity: 2 items at maxItems 1 renders the menu trigger', () => {
        const layout = computeBreadcrumbOverflowLayout(items(2), 1)
        expect(layout.shouldShowMenu).toBe(true)
        expect(layout.menuItems).toHaveLength(0)
    })

    it('keeps at least one tail crumb when maxItems is 1', () => {
        const layout = computeBreadcrumbOverflowLayout(items(5), 1)
        expect(layout.shouldShowMenu).toBe(true)
        expect(layout.rest).toHaveLength(1)
        expect(layout.rest[0].label).toBe('Page 5')
        expect(layout.menuItems).toHaveLength(3)
    })

    it('non-finite or sub-1 maxItems disables overflow', () => {
        for (const max of [0, -1, Number.POSITIVE_INFINITY, Number.NaN]) {
            const layout = computeBreadcrumbOverflowLayout(items(10), max)
            expect(layout.shouldShowMenu).toBe(false)
            expect(layout.menuItems).toHaveLength(0)
            expect(layout.rest).toHaveLength(9)
        }
    })

    it('empty input yields an empty layout', () => {
        const layout = computeBreadcrumbOverflowLayout([], 4)
        expect(layout.shouldShowMenu).toBe(false)
        expect(layout.base).toBeUndefined()
        expect(layout.rest).toEqual([])
        expect(layout.menuItems).toEqual([])
    })

    it('fractional limits floor, like web', () => {
        const layout = computeBreadcrumbOverflowLayout(items(5), 4.9)
        expect(layout.shouldShowMenu).toBe(true)
    })
})

describe('computeBreadcrumbOverflowLayout (minVisibleItems floor)', () => {
    const items = (n: number) =>
        Array.from({ length: n }, (_, i) => ({ label: `Page ${i + 1}` }))

    it('floor 2 at maxItems 2: the collapsed trail shows 2, so it collapses', () => {
        // The collapsed shape at maxItems 2 is first + one tail crumb —
        // 2 visible — which meets a floor of 2.
        const layout = computeBreadcrumbOverflowLayout(items(6), 2, 2)
        expect(layout.shouldShowMenu).toBe(true)
        expect(layout.rest.map((i) => i.label)).toEqual(['Page 6'])
        expect(layout.menuItems).toHaveLength(4)
    })

    it('floor 3 at maxItems 2: stays inline (collapse would show only 2)', () => {
        const layout = computeBreadcrumbOverflowLayout(items(6), 2, 3)
        expect(layout.shouldShowMenu).toBe(false)
        expect(layout.rest).toHaveLength(5)
        expect(layout.menuItems).toHaveLength(0)
    })

    it('floors at or below the collapsed size never suppress', () => {
        // The collapsed trail at maxItems 4 shows 4 crumbs (1 + tail of 3).
        for (const floor of [1, 2, 3, 4]) {
            expect(
                computeBreadcrumbOverflowLayout(items(6), 4, floor)
                    .shouldShowMenu
            ).toBe(true)
        }
    })

    it('floor above the collapsed size stays inline', () => {
        expect(
            computeBreadcrumbOverflowLayout(items(8), 4, 5).shouldShowMenu
        ).toBe(false)
    })

    it('floor 3 suppresses the dead-ellipsis case (2 items at maxItems 1)', () => {
        // The collapsed shape is Page 1 … Page 2 — 2 visible crumbs and an
        // ellipsis hiding zero. A floor of 3 refuses that shape.
        const layout = computeBreadcrumbOverflowLayout(items(2), 1, 3)
        expect(layout.shouldShowMenu).toBe(false)
    })

    it('fractional floors floor, like maxItems', () => {
        expect(
            computeBreadcrumbOverflowLayout(items(6), 2, 2.9).shouldShowMenu
        ).toBe(true)
        expect(
            computeBreadcrumbOverflowLayout(items(6), 2, 3.1).shouldShowMenu
        ).toBe(false)
    })

    it('floor > items disables overflow entirely', () => {
        const layout = computeBreadcrumbOverflowLayout(items(10), 4, 100)
        expect(layout.shouldShowMenu).toBe(false)
    })
})

describe('breadcrumbItemKey', () => {
    it('prefers a stable id', () => {
        expect(breadcrumbItemKey({ label: 'A', id: 'home' }, 0)).toBe('home')
        expect(breadcrumbItemKey({ label: 'A', id: 7 }, 0)).toBe('7')
    })

    it('falls back to position', () => {
        expect(breadcrumbItemKey({ label: 'A' }, 3)).toBe('breadcrumb-item-3')
    })
})

describe('isCurrentCrumb', () => {
    it('defaults to the last entry', () => {
        expect(isCurrentCrumb(2, 3)).toBe(true)
        expect(isCurrentCrumb(1, 3)).toBe(false)
    })

    it('an explicit isActive wins over position', () => {
        expect(isCurrentCrumb(0, 3, true)).toBe(true)
        expect(isCurrentCrumb(2, 3, false)).toBe(false)
    })
})

describe('overflowMenuLabel (web parity)', () => {
    it('pluralises at one exactly', () => {
        expect(overflowMenuLabel(1)).toBe('Show 1 more breadcrumb item')
        expect(overflowMenuLabel(4)).toBe('Show 4 more breadcrumb items')
    })
})
