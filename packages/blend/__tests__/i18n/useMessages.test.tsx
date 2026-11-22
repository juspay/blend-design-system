import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ThemeProvider from '../../lib/context/ThemeProvider'
import { useMessages } from '../../lib/i18n/useMessages'
import type { BlendTranslate } from '../../lib/i18n/types'

const FRAGMENT = {
    'upload-v2.action.browse-files': 'Browse Files',
    'upload-v2.a11y.remove-file': 'Remove {name}',
    'upload-v2.a11y.show-more-files.one': 'Show {count} more file',
    'upload-v2.a11y.show-more-files.other': 'Show {count} more files',
} as const

const Probe = ({ override }: { override?: string }) => {
    const { m, mp, pick } = useMessages(FRAGMENT)

    return (
        <div>
            <span data-testid="plain">
                {m('upload-v2.action.browse-files')}
            </span>
            <span data-testid="vars">
                {m('upload-v2.a11y.remove-file', { name: 'report.pdf' })}
            </span>
            <span data-testid="plural-one">
                {mp('upload-v2.a11y.show-more-files', 1)}
            </span>
            <span data-testid="plural-other">
                {mp('upload-v2.a11y.show-more-files', 4)}
            </span>
            <span data-testid="picked">
                {pick(override, 'upload-v2.action.browse-files')}
            </span>
        </div>
    )
}

describe('useMessages', () => {
    it('renders English defaults with no provider mounted', () => {
        // Working without a ThemeProvider is the contract, exactly as it is for
        // tokens today.
        render(<Probe />)
        expect(screen.getByTestId('plain')).toHaveTextContent('Browse Files')
    })

    it('interpolates vars into a default', () => {
        render(<Probe />)
        expect(screen.getByTestId('vars')).toHaveTextContent(
            'Remove report.pdf'
        )
    })

    it('resolves a provider translation', () => {
        const t: BlendTranslate = (key) =>
            key === 'upload-v2.action.browse-files'
                ? 'Parcourir les fichiers'
                : undefined

        render(
            <ThemeProvider locale="fr-FR" t={t}>
                <Probe />
            </ThemeProvider>
        )
        expect(screen.getByTestId('plain')).toHaveTextContent(
            'Parcourir les fichiers'
        )
    })

    it('falls back when the provider translation returns an empty string', () => {
        render(
            <ThemeProvider t={() => ''}>
                <Probe />
            </ThemeProvider>
        )
        expect(screen.getByTestId('plain')).toHaveTextContent('Browse Files')
    })

    describe('pick', () => {
        it('prefers an explicit prop over the catalog', () => {
            render(<Probe override="Pick a file" />)
            expect(screen.getByTestId('picked')).toHaveTextContent(
                'Pick a file'
            )
        })

        it('resolves the key when no prop was passed', () => {
            render(<Probe />)
            expect(screen.getByTestId('picked')).toHaveTextContent(
                'Browse Files'
            )
        })

        it('honours an intentional empty string rather than falling through', () => {
            // This is why pick exists: `override ?? m(key)` is fine, but `||`
            // would discard a deliberate "render no label here".
            render(<Probe override="" />)
            expect(screen.getByTestId('picked')).toBeEmptyDOMElement()
        })
    })

    describe('plurals', () => {
        it('selects the one and other forms and formats count', () => {
            render(<Probe />)
            expect(screen.getByTestId('plural-one')).toHaveTextContent(
                'Show 1 more file'
            )
            expect(screen.getByTestId('plural-other')).toHaveTextContent(
                'Show 4 more files'
            )
        })

        it('falls back to .other for a category the fragment does not declare', () => {
            // Polish asks for `few` at 4; the English catalog has no `.few`.
            render(
                <ThemeProvider locale="pl-PL">
                    <Probe />
                </ThemeProvider>
            )
            expect(screen.getByTestId('plural-other')).toHaveTextContent(
                'Show 4 more files'
            )
        })
    })

    it('keeps m stable when an unrelated parent re-renders', () => {
        const identities: unknown[] = []

        const Tracker = () => {
            const { m } = useMessages(FRAGMENT)
            identities.push(m)
            return null
        }

        const Parent = () => {
            const [, setTick] = useState(0)
            return (
                <ThemeProvider>
                    <button onClick={() => setTick((n) => n + 1)}>bump</button>
                    <Tracker />
                </ThemeProvider>
            )
        }

        render(<Parent />)
        const afterMount = identities.at(-1)

        return userEvent.click(screen.getByText('bump')).then(() => {
            expect(identities.length).toBeGreaterThan(1)
            expect(identities.at(-1)).toBe(afterMount)
        })
    })

    it('constrains keys at compile time', () => {
        const Typo = () => {
            const { m, mp } = useMessages(FRAGMENT)
            // @ts-expect-error a key outside the fragment is not assignable
            m('upload-v2.action.brwose-files')
            // @ts-expect-error a key with no `.other` sibling is not pluralizable
            mp('upload-v2.action.browse-files', 1)
            return null
        }
        expect(Typo).toBeTypeOf('function')
    })
})
