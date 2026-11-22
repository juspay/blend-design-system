import { describe, expect, it } from 'vitest'
import { createTranslator } from '../../lib/i18n/createTranslator'
import { resolveMessage } from '../../lib/i18n/resolve'

describe('createTranslator', () => {
    it('looks up a key from a single override layer', () => {
        const t = createTranslator({
            'upload-v2.action.browse-files': 'Parcourir',
        })
        expect(t('upload-v2.action.browse-files')).toBe('Parcourir')
    })

    it('returns undefined for a key it does not carry', () => {
        // Tier 3 does the defaulting, so this must be a miss rather than a
        // lookup into BLEND_MESSAGES — which would pull the whole aggregate
        // catalog into every consumer that calls createTranslator.
        const t = createTranslator({})
        expect(t('upload-v2.action.browse-files')).toBeUndefined()
    })

    it('applies layers left to right', () => {
        const t = createTranslator(
            { 'common.action.cancel': 'first' },
            { 'common.action.cancel': 'second' }
        )
        expect(t('common.action.cancel')).toBe('second')
    })

    it('does not let an explicit undefined in a later layer erase a value', () => {
        // This is the whole reason createTranslator uses mergeTokenTree rather
        // than object spread: spread would copy the undefined over and lose
        // the earlier value.
        const t = createTranslator(
            { 'common.action.cancel': 'Annuler' },
            { 'common.action.cancel': undefined }
        )
        expect(t('common.action.cancel')).toBe('Annuler')
    })

    it('feeds the resolver so overrides beat the English default', () => {
        const fragment = { 'common.action.cancel': 'Cancel' } as const
        const translate = createTranslator({
            'common.action.cancel': 'Annuler',
        })

        expect(
            resolveMessage(fragment, 'common.action.cancel', { translate })
        ).toBe('Annuler')
    })
})
