import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetI18nWarnings, resolveMessage } from '../../lib/i18n/resolve'

const FRAGMENT = {
    'upload-v2.action.browse-files': 'Browse Files',
    'upload-v2.a11y.remove-file': 'Remove {name}',
} as const

describe('resolveMessage', () => {
    beforeEach(() => {
        resetI18nWarnings()
        vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('returns the English default when no translate is supplied', () => {
        expect(resolveMessage(FRAGMENT, 'upload-v2.action.browse-files')).toBe(
            'Browse Files'
        )
    })

    it('prefers a usable translate result over the English default', () => {
        expect(
            resolveMessage(FRAGMENT, 'upload-v2.action.browse-files', {
                translate: () => 'Parcourir les fichiers',
            })
        ).toBe('Parcourir les fichiers')
    })

    describe('miss handling', () => {
        it.each([
            ['undefined', () => undefined],
            ['an empty string', () => ''],
            ['the key itself', (key: string) => key],
        ])('treats %s as a miss and falls back to English', (_label, t) => {
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.action.browse-files', {
                    translate: t as () => string | undefined,
                })
            ).toBe('Browse Files')
        })

        it('treats a throwing translate as a miss and warns once', () => {
            const translate = vi.fn(() => {
                throw new Error('dictionary not loaded')
            })

            // A throw here would otherwise white-screen the consumer's subtree,
            // because translate runs in the render phase.
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.action.browse-files', {
                    translate,
                })
            ).toBe('Browse Files')
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.action.browse-files', {
                    translate,
                })
            ).toBe('Browse Files')

            expect(translate).toHaveBeenCalledTimes(2)
            expect(console.warn).toHaveBeenCalledTimes(1)
        })
    })

    describe('interpolation', () => {
        it('interpolates the English default', () => {
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.a11y.remove-file', {
                    vars: { name: 'report.pdf' },
                })
            ).toBe('Remove report.pdf')
        })

        it('interpolates a translated string too', () => {
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.a11y.remove-file', {
                    vars: { name: 'report.pdf' },
                    translate: () => 'Supprimer {name}',
                })
            ).toBe('Supprimer report.pdf')
        })

        it('leaves an ICU-capable translate result untouched', () => {
            expect(
                resolveMessage(FRAGMENT, 'upload-v2.a11y.remove-file', {
                    vars: { name: 'report.pdf' },
                    translate: () => 'Supprimer report.pdf',
                })
            ).toBe('Supprimer report.pdf')
        })
    })

    it('returns the key and warns once when nothing resolves', () => {
        // A visible token degrades better than a blank button.
        expect(resolveMessage(FRAGMENT, 'upload-v2.action.missing')).toBe(
            'upload-v2.action.missing'
        )
        expect(resolveMessage(FRAGMENT, 'upload-v2.action.missing')).toBe(
            'upload-v2.action.missing'
        )
        expect(console.warn).toHaveBeenCalledTimes(1)
    })
})
