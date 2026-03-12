import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import ChartV2Fullscreen from '../../../lib/components/ChartsV2/ChartV2Fullscreen'

// Stub tokens so fullscreen background is deterministic
vi.mock('../../../lib/hooks/useResponsiveTokens', () => ({
    useResponsiveTokens: vi.fn(() => ({
        backgroundColor: '#111827',
    })),
}))

// Prevent real scroll locking in tests
vi.mock('../../../lib/hooks/useScrollLock', () => ({
    __esModule: true,
    default: vi.fn(),
}))

afterEach(() => {
    vi.clearAllMocks()
})

const FullscreenHarness = () => (
    <ChartV2Fullscreen>
        {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
            <div>
                <div data-testid="state">
                    {isFullscreen ? 'fullscreen' : 'normal'}
                </div>
                <button
                    type="button"
                    onClick={() => {
                        void enterFullscreen()
                    }}
                >
                    enter
                </button>
                <button
                    type="button"
                    onClick={() => {
                        void exitFullscreen()
                    }}
                >
                    exit
                </button>
            </div>
        )}
    </ChartV2Fullscreen>
)

describe('ChartV2Fullscreen', () => {
    it('toggles fullscreen state on large screens without using DOM fullscreen API', async () => {
        const originalInnerWidth = window.innerWidth
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1200,
        })

        const { user } = render(<FullscreenHarness />)

        expect(screen.getByTestId('state')).toHaveTextContent('normal')

        await user.click(screen.getByText('enter'))
        expect(screen.getByTestId('state')).toHaveTextContent('fullscreen')

        await user.click(screen.getByText('exit'))
        expect(screen.getByTestId('state')).toHaveTextContent('normal')

        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: originalInnerWidth,
        })
    })

    it('uses document fullscreen API and orientation lock on small screens', async () => {
        const originalInnerWidth = window.innerWidth
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 375,
        })

        const requestFullscreen = vi.fn().mockResolvedValue(undefined)
        ;(
            document.documentElement as unknown as {
                requestFullscreen?: () => Promise<void>
            }
        ).requestFullscreen = requestFullscreen

        const lock = vi.fn().mockResolvedValue(undefined)
        const unlock = vi.fn()
        ;(
            window as unknown as {
                screen: {
                    orientation: { lock: typeof lock; unlock: typeof unlock }
                }
            }
        ).screen = {
            orientation: { lock, unlock },
        }

        Object.defineProperty(document, 'fullscreenElement', {
            configurable: true,
            get: () => null,
        })

        const { user } = render(<FullscreenHarness />)

        await user.click(screen.getByText('enter'))

        await waitFor(() =>
            expect(screen.getByTestId('state')).toHaveTextContent('fullscreen')
        )

        expect(requestFullscreen).toHaveBeenCalled()
        expect(lock).toHaveBeenCalledWith('landscape')

        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: originalInnerWidth,
        })
    })

    // Note: additional error-handling branches are intentionally left
    // untested due to jsdom and user-event environment limitations.

    it('responds to fullscreenchange events by resetting state and unlocking orientation', async () => {
        const unlock = vi.fn()
        ;(
            window as unknown as {
                screen: { orientation: { unlock: typeof unlock } }
            }
        ).screen = {
            orientation: { unlock },
        }

        Object.defineProperty(document, 'fullscreenElement', {
            configurable: true,
            writable: true,
            value: {} as Element | null,
        })

        render(<FullscreenHarness />)

        // Simulate leaving fullscreen
        Object.defineProperty(document, 'fullscreenElement', {
            configurable: true,
            writable: true,
            value: null,
        })

        const event = new Event('fullscreenchange')
        document.dispatchEvent(event)

        await waitFor(() =>
            expect(screen.getByTestId('state')).toHaveTextContent('normal')
        )
        expect(unlock).toHaveBeenCalled()
    })

    it('calls document.exitFullscreen and unlocks orientation when exiting from DOM fullscreen', async () => {
        const exitFullscreen = vi.fn().mockResolvedValue(undefined)
        ;(
            document as unknown as {
                fullscreenElement: Element | null
            }
        ).fullscreenElement = {} as Element
        ;(
            document as unknown as {
                exitFullscreen?: () => Promise<void>
            }
        ).exitFullscreen = exitFullscreen

        const unlock = vi.fn()
        ;(
            window as unknown as {
                screen: { orientation: { unlock: typeof unlock } }
            }
        ).screen = {
            orientation: { unlock },
        }

        const { user } = render(<FullscreenHarness />)

        await user.click(screen.getByText('exit'))

        await waitFor(() => {
            expect(exitFullscreen).toHaveBeenCalled()
            expect(unlock).toHaveBeenCalled()
        })
    })
})
