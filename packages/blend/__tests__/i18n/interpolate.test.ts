import { describe, expect, it } from 'vitest'
import { interpolate } from '../../lib/i18n/interpolate'

describe('interpolate', () => {
    it('returns the template unchanged when no vars are supplied', () => {
        expect(interpolate('{count} files selected')).toBe(
            '{count} files selected'
        )
    })

    it('substitutes a named placeholder', () => {
        expect(interpolate('Remove {name}', { name: 'report.pdf' })).toBe(
            'Remove report.pdf'
        )
    })

    it('substitutes every occurrence of a repeated placeholder', () => {
        expect(interpolate('{a} and {a}', { a: 'x' })).toBe('x and x')
    })

    it('leaves an unknown placeholder literal rather than blanking it', () => {
        // A missing var should be visible in development, not silently render
        // as an empty label.
        expect(interpolate('{count} of {total}', { count: '3' })).toBe(
            '3 of {total}'
        )
    })

    it('is idempotent, so a t that already substituted is left alone', () => {
        const alreadySubstituted = '3 fichiers'
        expect(interpolate(alreadySubstituted, { count: '3' })).toBe(
            alreadySubstituted
        )
    })

    it('ignores braces that are not well-formed placeholders', () => {
        expect(interpolate('{ "a": 1 }', { a: 'x' })).toBe('{ "a": 1 }')
        expect(interpolate('{file name}', { 'file name': 'x' })).toBe(
            '{file name}'
        )
    })
})
