import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getMultiSelectV2Tokens,
    type MultiSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../src/adapters/cssStringAdapter'
import {
    applySelectAll,
    resolveSelectAllState,
    toggleSelection,
} from '../src/components/MultiSelect/multiSelect.utils'

describe('multi select selection arithmetic', () => {
    it('toggles values in and out', () => {
        expect(toggleSelection(['a'], 'b')).toEqual(['a', 'b'])
        expect(toggleSelection(['a', 'b'], 'a')).toEqual(['b'])
    })

    it('respects maxSelections on add (same reference when rejected)', () => {
        const values = ['a', 'b']
        expect(toggleSelection(values, 'c', { maxSelections: 2 })).toBe(values)
        // Removal always allowed.
        expect(toggleSelection(values, 'a', { maxSelections: 2 })).toEqual([
            'b',
        ])
    })

    it('never removes alwaysSelected values', () => {
        const values = ['locked', 'b']
        expect(
            toggleSelection(values, 'locked', {
                alwaysSelected: new Set(['locked']),
            })
        ).toBe(values)
    })

    it('resolves the tri-state select-all', () => {
        const selectable = ['a', 'b', 'c']
        expect(resolveSelectAllState([], selectable)).toBe('unchecked')
        expect(resolveSelectAllState(['a'], selectable)).toBe('indeterminate')
        expect(resolveSelectAllState(['a', 'b', 'c'], selectable)).toBe(
            'checked'
        )
        expect(resolveSelectAllState(['a'], [])).toBe('unchecked')
    })

    it('applies select-all forward and clears backward', () => {
        const selectable = ['a', 'b', 'c']
        expect(applySelectAll(['a'], selectable)).toEqual(['a', 'b', 'c'])
        expect(applySelectAll(['a', 'b', 'c'], selectable)).toEqual([])
        // maxSelections caps the fill.
        expect(applySelectAll([], selectable, { maxSelections: 2 })).toEqual([
            'a',
            'b',
        ])
        // alwaysSelected values survive the clear.
        expect(
            applySelectAll(['a', 'b', 'c'], selectable, {
                alwaysSelected: new Set(['b']),
            })
        ).toEqual(['b'])
    })
})

describe('multi select token matrix', () => {
    for (const theme of [Theme.LIGHT, Theme.DARK]) {
        for (const breakpoint of ['sm', 'lg'] as const) {
            const tokens = getMultiSelectV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as MultiSelectV2TokensType

            it(`${theme}/${breakpoint}: drawer + tag chrome parses`, () => {
                const header = tokens.drawer?.header
                expect(
                    parseBorder(String(header?.borderBottom)).borderColor
                ).toBeDefined()
                expect(
                    parseDimension(header?.paddingBottom as string | number)
                ).toBeGreaterThanOrEqual(0)
                const count = tokens.trigger.selectionTag?.container?.count
                expect(String(count?.backgroundColor)).toMatch(/^#|^rgb/)
                expect(String(count?.color)).toMatch(/^#|^rgb/)
                expect(String(tokens.label?.color?.default)).toMatch(/^#|^rgb/)
            })
        }
    }
})
