import { describe, it, expect } from 'vitest'
import { getSplitTagLabel } from '../src/components/SplitTag/splitTag.utils'

describe('getSplitTagLabel', () => {
    it('joins both texts', () => {
        expect(getSplitTagLabel('Status', 'Settled')).toBe('Status: Settled')
    })

    it('uses whichever text exists', () => {
        expect(getSplitTagLabel('Status')).toBe('Status')
        expect(getSplitTagLabel(undefined, 'Settled')).toBe('Settled')
    })

    it('falls back when both are empty', () => {
        expect(getSplitTagLabel()).toBe('Split tag')
        expect(getSplitTagLabel('', '')).toBe('Split tag')
    })
})
