import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeProvider from '../../lib/context/ThemeProvider'
import { useTheme } from '../../lib/context/ThemeContext'
import { useI18n } from '../../lib/i18n/I18nContext'
import type { BlendFirstDayOfWeek } from '../../lib/i18n/types'

vi.mock('../../lib/context/initComponentTokens', () => ({
    default: vi.fn(() => ({ MOCK_TOKENS: true })),
}))

import initTokens from '../../lib/context/initComponentTokens'

/**
 * A separate file from `ThemeProvider.test.tsx` on purpose, so that file's
 * stability assertions stay an untouched baseline.
 */
describe('ThemeProvider i18n', () => {
    beforeEach(() => {
        vi.mocked(initTokens).mockClear()
    })

    const I18nRecorder = ({ onRender }: { onRender: (v: unknown) => void }) => {
        onRender(useI18n())
        return <div data-testid="consumer">consumer</div>
    }

    describe('defaults', () => {
        it('materialises en-US, no translate and Monday with no props', () => {
            const seen: ReturnType<typeof useI18n>[] = []
            render(
                <ThemeProvider>
                    <I18nRecorder
                        onRender={(v) =>
                            seen.push(v as ReturnType<typeof useI18n>)
                        }
                    />
                </ThemeProvider>
            )

            expect(seen.at(-1)).toEqual({
                locale: 'en-US',
                translate: undefined,
                firstDayOfWeek: 1,
            })
        })

        it('materialises the same defaults with no provider at all', () => {
            const seen: ReturnType<typeof useI18n>[] = []
            render(
                <I18nRecorder
                    onRender={(v) => seen.push(v as ReturnType<typeof useI18n>)}
                />
            )

            expect(seen.at(-1)).toEqual({
                locale: 'en-US',
                translate: undefined,
                firstDayOfWeek: 1,
            })
        })
    })

    it('forwards t as translate', () => {
        const t = () => 'translated'
        const seen: ReturnType<typeof useI18n>[] = []

        render(
            <ThemeProvider locale="fr-FR" t={t} firstDayOfWeek={0}>
                <I18nRecorder
                    onRender={(v) => seen.push(v as ReturnType<typeof useI18n>)}
                />
            </ThemeProvider>
        )

        expect(seen.at(-1)).toEqual({
            locale: 'fr-FR',
            translate: t,
            firstDayOfWeek: 0,
        })
    })

    it('clamps an out-of-range firstDayOfWeek to Monday', () => {
        // The ReScript binding generator may widen the 0|…|6 union to a plain
        // int, and an out-of-range value would otherwise mis-rotate the
        // weekday array silently.
        const seen: ReturnType<typeof useI18n>[] = []

        render(
            <ThemeProvider firstDayOfWeek={9 as BlendFirstDayOfWeek}>
                <I18nRecorder
                    onRender={(v) => seen.push(v as ReturnType<typeof useI18n>)}
                />
            </ThemeProvider>
        )

        expect(seen.at(-1)?.firstDayOfWeek).toBe(1)
    })

    it('keeps a stable i18n context value when an unrelated parent re-renders', () => {
        const seen: ReturnType<typeof useI18n>[] = []

        const Parent = () => {
            const [, setTick] = useState(0)
            return (
                <ThemeProvider>
                    <button onClick={() => setTick((n) => n + 1)}>bump</button>
                    <I18nRecorder
                        onRender={(v) =>
                            seen.push(v as ReturnType<typeof useI18n>)
                        }
                    />
                </ThemeProvider>
            )
        }

        render(<Parent />)
        const afterMount = seen.at(-1)

        fireEvent.click(screen.getByText('bump'))

        expect(seen.length).toBeGreaterThan(1)
        expect(seen.at(-1)).toBe(afterMount)
    })

    /**
     * The justification for keeping i18n in its own context rather than in
     * `themeContextValue`.
     *
     * The load-bearing assertion is that `themeContextValue`'s identity does
     * not change: React context has no selector, so if `t` lived in that value
     * every one of the ~85 token slots would re-render on each parent render,
     * because consumers rebuild `t` inline.
     *
     * The `initTokens` call count is asserted as a cheap regression guard, not
     * as evidence for the split — `resolvedComponentTokens` has its own memo
     * that `t` is not a dependency of, so that count would hold in the merged
     * design too.
     */
    it('keeps the theme context value stable when only t changes', () => {
        const themeSnapshots: ReturnType<typeof useTheme>[] = []

        const ThemeRecorder = () => {
            themeSnapshots.push(useTheme())
            return null
        }

        const Parent = () => {
            const [tick, setTick] = useState(0)
            return (
                // Rebuilt inline on every render, so a new identity each time.
                <ThemeProvider t={() => `translated-${tick}`}>
                    <button onClick={() => setTick((n) => n + 1)}>bump</button>
                    <ThemeRecorder />
                </ThemeProvider>
            )
        }

        render(<Parent />)
        const themeAfterMount = themeSnapshots.at(-1)
        const initCallsAfterMount = vi.mocked(initTokens).mock.calls.length

        fireEvent.click(screen.getByText('bump'))
        fireEvent.click(screen.getByText('bump'))

        expect(vi.mocked(initTokens).mock.calls.length).toBe(
            initCallsAfterMount
        )
        expect(themeSnapshots.at(-1)).toBe(themeAfterMount)
    })

    it('propagates a changed t to i18n consumers', () => {
        // The flip side: the split must not make i18n updates stale.
        const seen: (string | undefined)[] = []

        const Reader = () => {
            const { translate } = useI18n()
            seen.push(translate?.('any.key'))
            return null
        }

        const Parent = () => {
            const [tick, setTick] = useState(0)
            return (
                <ThemeProvider t={() => `translated-${tick}`}>
                    <button onClick={() => setTick((n) => n + 1)}>bump</button>
                    <Reader />
                </ThemeProvider>
            )
        }

        render(<Parent />)
        fireEvent.click(screen.getByText('bump'))

        expect(seen.at(-1)).toBe('translated-1')
    })
})
