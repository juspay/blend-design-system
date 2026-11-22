import { beforeEach, describe, expect, it } from 'vitest'
import { resetFormatterCache } from '../../lib/i18n/format/formatterCache'
import { selectPluralCategory } from '../../lib/i18n/plural'

describe('selectPluralCategory', () => {
    beforeEach(() => {
        resetFormatterCache()
    })

    it('selects English categories', () => {
        expect(selectPluralCategory('en-US', 1)).toBe('one')
        expect(selectPluralCategory('en-US', 0)).toBe('other')
        expect(selectPluralCategory('en-US', 2)).toBe('other')
    })

    it('selects the richer Polish categories', () => {
        // Polish has one/few/many, which is why the resolver cannot assume the
        // English one/other split is sufficient for a translator's dictionary.
        expect(selectPluralCategory('pl-PL', 1)).toBe('one')
        expect(selectPluralCategory('pl-PL', 2)).toBe('few')
        expect(selectPluralCategory('pl-PL', 5)).toBe('many')
    })

    it('selects the single Japanese category', () => {
        expect(selectPluralCategory('ja-JP', 1)).toBe('other')
        expect(selectPluralCategory('ja-JP', 5)).toBe('other')
    })
})
