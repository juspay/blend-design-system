import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, act } from '../../test-utils'
import Snackbar from '../../../lib/components/Snackbar/Snackbar'
import SnackbarV2, {
    addSnackbarV2,
} from '../../../lib/components/SnackbarV2/SnackbarV2'
import { SnackbarV2Variant } from '../../../lib/components/SnackbarV2/snackbarV2.types'
import { toast as sonnerToast } from 'sonner'

/**
 * Unlike SnackbarV2.test.tsx, this file deliberately does NOT mock sonner.
 * Auto-dismissal is a timing behaviour owned by sonner, so a mocked toast
 * store cannot prove a toast stays on screen.
 *
 * Two jsdom caveats are worked around rather than fought:
 *
 * 1. Programmatic dismissal marks a toast as removed before exit cleanup
 *    completes. Those cases are asserted via sonner's `data-removed`
 *    attribute; timer-expiry cases can assert DOM absence after cleanup.
 * 2. `sonnerToast.dismiss(id)` defers publication to requestAnimationFrame,
 *    while the no-argument form is synchronous. rAF is faked so the deferred
 *    path flushes on `advanceTimersByTimeAsync`.
 */

const tick = async (ms: number) => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms)
    })
}

const useTimers = () =>
    vi.useFakeTimers({
        shouldAdvanceTime: true,
        toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame'],
    })

const toastEl = (header: string) =>
    screen.queryByText(header)?.closest('[data-sonner-toast]') ?? null

const isDismissed = (header: string) =>
    toastEl(header)?.getAttribute('data-removed') === 'true'

const isVisible = (header: string) =>
    toastEl(header)?.getAttribute('data-visible') === 'true'

const clickOutside = async () => {
    await act(async () => {
        document.body.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true })
        )
    })
}

describe('SnackbarV2 persistence', () => {
    afterEach(() => {
        // Dismiss by id rather than with the no-argument form: only the
        // by-id path records the toast as dismissed, so this actually drains
        // sonner's module-level store between tests.
        act(() => {
            sonnerToast
                .getToasts()
                .forEach((toast) => sonnerToast.dismiss(toast.id))
        })
        cleanup()
        vi.useRealTimers()
    })

    describe('auto-dismiss timing', () => {
        it('dismisses a default toast after the default duration', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Default' })
            })
            await tick(50)
            expect(screen.getByText('Default')).toBeInTheDocument()

            await tick(6000)

            expect(screen.queryByText('Default')).not.toBeInTheDocument()
        })

        it('keeps a duration: Infinity toast on screen indefinitely', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({
                    header: 'Persistent',
                    duration: Infinity,
                })
            })
            await tick(50)

            await tick(600_000)

            expect(screen.getByText('Persistent')).toBeInTheDocument()
            expect(isDismissed('Persistent')).toBe(false)
        })

        // Regression guard: `0` is falsy, so sonner falls through to the 4000ms
        // default.
        it('does not treat duration: 0 as persistent', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Zero', duration: 0 })
            })
            await tick(50)

            await tick(6000)

            expect(screen.queryByText('Zero')).not.toBeInTheDocument()
        })
    })

    describe('action button', () => {
        it('keeps a persistent toast open when its action has autoDismiss: false', async () => {
            useTimers()
            const onClick = vi.fn()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({
                    header: 'Upload failed',
                    variant: SnackbarV2Variant.ERROR,
                    duration: Infinity,
                    actionButton: {
                        label: 'Retry',
                        onClick,
                        autoDismiss: false,
                    },
                })
            })
            await tick(50)

            await act(async () => {
                screen.getByText('Retry').click()
            })
            await tick(60_000)

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.getByText('Upload failed')).toBeInTheDocument()
            expect(isDismissed('Upload failed')).toBe(false)
        })

        it('closes a persistent toast when its action has autoDismiss: true', async () => {
            useTimers()
            const onClick = vi.fn()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({
                    header: 'Acknowledge',
                    duration: Infinity,
                    actionButton: {
                        label: 'Got it',
                        onClick,
                        autoDismiss: true,
                    },
                })
            })
            await tick(50)

            await act(async () => {
                screen.getByText('Got it').click()
            })
            await tick(1000)

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(isDismissed('Acknowledge')).toBe(true)
        })
    })
    describe('dismissOnClickAway', () => {
        it('leaves a persistent toast alone but dismisses an ordinary one', async () => {
            useTimers()
            render(<SnackbarV2 dismissOnClickAway />)
            act(() => {
                addSnackbarV2({ header: 'Persistent', duration: Infinity })
            })
            act(() => {
                addSnackbarV2({ header: 'Ordinary' })
            })
            await tick(80)

            await clickOutside()
            await tick(1000)

            expect(isDismissed('Persistent')).toBe(false)
            expect(isDismissed('Ordinary')).toBe(true)
        })

        // v1 and v2 share a single sonner toast store, so a v1 container
        // mounted alongside v2 must not dismiss v2's persistent toasts either.
        it('is also exempt when a v1 Snackbar owns the click-away handler', async () => {
            useTimers()
            render(<Snackbar dismissOnClickAway />)
            act(() => {
                addSnackbarV2({ header: 'Persistent', duration: Infinity })
            })
            act(() => {
                addSnackbarV2({ header: 'Ordinary' })
            })
            await tick(80)

            await clickOutside()
            await tick(1000)

            expect(isDismissed('Persistent')).toBe(false)
            expect(isDismissed('Ordinary')).toBe(true)
        })

        // The handler used to be a single no-argument call that could not
        // fail. It now iterates, so guard the empty case.
        it('does not throw when there are no toasts to dismiss', async () => {
            useTimers()
            render(<SnackbarV2 dismissOnClickAway />)

            await expect(clickOutside()).resolves.not.toThrow()
            await tick(500)
        })

        it('still dismisses ordinary toasts when no persistent toast exists', async () => {
            useTimers()
            render(<SnackbarV2 dismissOnClickAway />)
            act(() => {
                addSnackbarV2({ header: 'Only ordinary' })
            })
            await tick(80)

            await clickOutside()
            await tick(1000)

            expect(isDismissed('Only ordinary')).toBe(true)
        })
    })
    // A toast pushed out of the visible stack is invisible but, without the
    // visibility override, still focusable. Persistent toasts must never be
    // evicted at all, since a hidden toast cannot be clicked to dismiss.
    describe('visible stack', () => {
        it('keeps a persistent toast visible behind newer toasts', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Persistent', duration: Infinity })
            })
            await tick(50)

            for (const n of [1, 2, 3]) {
                act(() => {
                    addSnackbarV2({ header: `Noise ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            expect(isVisible('Persistent')).toBe(true)
        })

        it('still evicts ordinary toasts beyond the visible limit', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Oldest' })
            })
            await tick(50)

            for (const n of [1, 2, 3]) {
                act(() => {
                    addSnackbarV2({ header: `Newer ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            expect(isVisible('Oldest')).toBe(false)
        })

        it('honours an explicit visibleToasts value', async () => {
            useTimers()
            render(<SnackbarV2 visibleToasts={1} />)
            act(() => {
                addSnackbarV2({ header: 'First' })
            })
            await tick(60)
            act(() => {
                addSnackbarV2({ header: 'Second' })
            })
            await tick(200)

            expect(isVisible('Second')).toBe(true)
            expect(isVisible('First')).toBe(false)
        })

        it('hides an evicted toast from the tab order and a11y tree', async () => {
            useTimers()
            render(<SnackbarV2 visibleToasts={1} />)
            act(() => {
                addSnackbarV2({
                    header: 'Evicted',
                    actionButton: { label: 'Act', onClick: () => {} },
                })
            })
            await tick(60)
            act(() => {
                addSnackbarV2({ header: 'On top' })
            })
            await tick(200)

            const evicted = toastEl('Evicted')
            expect(evicted?.getAttribute('data-visible')).toBe('false')
            // visibility: hidden is what removes it from the tab order; opacity
            // alone would leave the action button focusable while invisible.
            expect(getComputedStyle(evicted as Element).visibility).toBe(
                'hidden'
            )
        })
    })
})
