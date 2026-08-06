import React, { useState } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeProvider from '../../lib/context/ThemeProvider'
import { useTheme } from '../../lib/context/ThemeContext'
import { Theme } from '../../lib/context/theme.enum'

vi.mock('../../lib/context/initComponentTokens', () => ({
    default: vi.fn(() => ({ MOCK_TOKENS: true })),
}))

import initTokens from '../../lib/context/initComponentTokens'

const ThemeConsumer = () => {
    useTheme()
    return <div data-testid="consumer">consumer</div>
}

describe('ThemeProvider', () => {
    beforeEach(() => {
        vi.mocked(initTokens).mockClear()
    })

    it('keeps a stable context value when an unrelated parent re-renders', () => {
        const contextSnapshots: ReturnType<typeof useTheme>[] = []

        const ContextRecorder = () => {
            const theme = useTheme()
            contextSnapshots.push(theme)
            return <ThemeConsumer />
        }

        const Parent = () => {
            const [counter, setCounter] = useState(0)

            return (
                <div>
                    <button
                        type="button"
                        onClick={() => setCounter((c) => c + 1)}
                    >
                        Bump counter
                    </button>
                    <span data-testid="counter">{counter}</span>
                    <ThemeProvider>
                        <ContextRecorder />
                    </ThemeProvider>
                </div>
            )
        }

        render(<Parent />)

        const initCallsAfterMount = vi.mocked(initTokens).mock.calls.length
        const contextValueAfterMount = contextSnapshots.at(-1)

        expect(initCallsAfterMount).toBeGreaterThanOrEqual(1)
        expect(contextValueAfterMount).toBeDefined()

        fireEvent.click(screen.getByRole('button', { name: 'Bump counter' }))
        expect(screen.getByTestId('counter')).toHaveTextContent('1')
        expect(vi.mocked(initTokens).mock.calls.length).toBe(
            initCallsAfterMount
        )
        expect(contextSnapshots.at(-1)).toBe(contextValueAfterMount)

        fireEvent.click(screen.getByRole('button', { name: 'Bump counter' }))
        expect(screen.getByTestId('counter')).toHaveTextContent('2')
        expect(vi.mocked(initTokens).mock.calls.length).toBe(
            initCallsAfterMount
        )
        expect(contextSnapshots.at(-1)).toBe(contextValueAfterMount)
    })

    it('passes the dark theme to component token initialization', () => {
        render(
            <ThemeProvider theme={Theme.DARK}>
                <ThemeConsumer />
            </ThemeProvider>
        )

        const lastCall = vi.mocked(initTokens).mock.calls.at(-1)
        expect(lastCall?.[2]).toBe(Theme.DARK)
    })
})
