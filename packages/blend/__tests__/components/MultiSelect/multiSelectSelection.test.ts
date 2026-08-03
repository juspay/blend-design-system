import { describe, expect, it, vi } from 'vitest'
import {
    clampScopeToMaxSelections,
    emitLegacyScopeChanges,
    getNextSelectionAfterToggle,
    getNextSelectionForScope,
} from '../../../lib/components/shared/multiSelectSelection'

describe('multi-select selection helpers', () => {
    it('appends an unselected value without mutating the current selection', () => {
        const selectedValues = ['a']

        expect(getNextSelectionAfterToggle(selectedValues, 'b')).toEqual([
            'a',
            'b',
        ])
        expect(selectedValues).toEqual(['a'])
    })

    it('removes every occurrence of a toggled selected value', () => {
        expect(getNextSelectionAfterToggle(['a', 'b', 'a'], 'a')).toEqual(['b'])
    })

    it('selects a scope once while preserving deterministic order', () => {
        expect(
            getNextSelectionForScope(
                ['outside', 'a'],
                ['a', 'b', 'b', 'c'],
                true
            )
        ).toEqual(['outside', 'a', 'b', 'c'])
    })

    it('deselects only the current scope and removes duplicates', () => {
        expect(
            getNextSelectionForScope(
                ['outside', 'a', 'b', 'a'],
                ['a', 'b'],
                false
            )
        ).toEqual(['outside'])
    })

    it('returns a fresh unchanged selection for an empty scope', () => {
        const selectedValues = ['a']
        const nextSelection = getNextSelectionForScope(selectedValues, [], true)

        expect(nextSelection).toEqual(selectedValues)
        expect(nextSelection).not.toBe(selectedValues)
    })

    it('handles an empty starting selection', () => {
        expect(getNextSelectionAfterToggle([], 'a')).toEqual(['a'])
        expect(getNextSelectionForScope([], ['a', 'b'], true)).toEqual([
            'a',
            'b',
        ])
        expect(getNextSelectionForScope([], ['a'], false)).toEqual([])
    })
})

describe('clampScopeToMaxSelections', () => {
    it('returns the scope untouched when no limit is set', () => {
        const scopedValues = ['a', 'b']

        expect(clampScopeToMaxSelections([], scopedValues, undefined)).toBe(
            scopedValues
        )
    })

    it('admits only as many new values as the limit still allows', () => {
        expect(clampScopeToMaxSelections(['x'], ['a', 'b', 'c'], 3)).toEqual([
            'a',
            'b',
        ])
    })

    it('admits nothing new once the limit is already reached', () => {
        expect(clampScopeToMaxSelections(['x', 'y'], ['a', 'b'], 2)).toEqual([])
    })

    it('keeps already selected scope members so they are never dropped', () => {
        expect(clampScopeToMaxSelections(['a'], ['a', 'b', 'c'], 1)).toEqual([
            'a',
        ])
    })
})

describe('emitLegacyScopeChanges', () => {
    it('does no work when no legacy callback was supplied', () => {
        expect(() =>
            emitLegacyScopeChanges(true, ['a'], [], undefined)
        ).not.toThrow()
    })

    it('emits only the values a select gesture adds', () => {
        const onChange = vi.fn()

        emitLegacyScopeChanges(true, ['a', 'b'], ['a'], onChange)

        expect(onChange).toHaveBeenCalledOnce()
        expect(onChange).toHaveBeenCalledWith('b')
    })

    it('emits only the in-scope values a deselect gesture removes', () => {
        const onChange = vi.fn()

        emitLegacyScopeChanges(false, ['a'], ['outside', 'a'], onChange)

        expect(onChange).toHaveBeenCalledOnce()
        expect(onChange).toHaveBeenCalledWith('a')
    })
})
