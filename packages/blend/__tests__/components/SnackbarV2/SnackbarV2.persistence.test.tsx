import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, act } from '../../test-utils'
import Snackbar, {
    addSnackbar,
} from '../../../lib/components/Snackbar/Snackbar'
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
        // default. `0` is valid TypeScript, so a runtime warning is the only
        // guardrail. Asserted here rather than in its own test because the
        // warning dedupes in module state that outlives a single test.
        it('does not treat duration: 0 as persistent, and warns once', async () => {
            useTimers()
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Zero', duration: 0 })
            })
            act(() => {
                addSnackbarV2({ header: 'Zero again', duration: 0 })
            })
            await tick(50)

            await tick(6000)

            expect(screen.queryByText('Zero')).not.toBeInTheDocument()

            const zeroWarnings = warn.mock.calls.filter((call) =>
                String(call[0]).includes('duration: 0')
            )
            expect(zeroWarnings).toHaveLength(1)
            expect(zeroWarnings[0][0]).toContain('duration: Infinity')
            warn.mockRestore()
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
    describe('close button', () => {
        // "Persistent" only means immune to auto-dismiss, click-away, and
        // stack eviction. The explicit close button must still work, or a
        // persistent toast would be permanently stuck on screen.
        it('dismisses a persistent toast when its close button is clicked', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Persistent', duration: Infinity })
            })
            await tick(50)

            await act(async () => {
                screen.getByLabelText('Close notification').click()
            })
            await tick(1000)

            expect(isDismissed('Persistent')).toBe(true)
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

            const onError = vi.fn()
            window.addEventListener('error', onError)

            await clickOutside()
            await tick(500)

            // jsdom swallows listener exceptions and reports them via an
            // 'error' event, so asserting "did not throw" around dispatchEvent
            // would pass even if the handler blew up.
            expect(onError).not.toHaveBeenCalled()
            window.removeEventListener('error', onError)
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

        // Mirrors the v2-created-toast case above, but for a persistent toast
        // created through v1's own addSnackbar and dismissed by v1's own
        // click-away handler: the changed line in Snackbar.tsx is
        // `dismissNonPersistentToasts()`, and it must behave the same way for
        // toasts it created itself, not only for ones v2 created.
        it('leaves a v1-created persistent toast alone under v1s own click-away', async () => {
            useTimers()
            render(<Snackbar dismissOnClickAway />)
            act(() => {
                addSnackbar({ header: 'Persistent v1', duration: Infinity })
            })
            act(() => {
                addSnackbar({ header: 'Ordinary v1' })
            })
            await tick(80)

            await clickOutside()
            await tick(1000)

            expect(isDismissed('Persistent v1')).toBe(false)
            expect(isDismissed('Ordinary v1')).toBe(true)
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

            // Deliberately past the base ceiling of 3. An earlier version of
            // this test used exactly 3 and passed with a slot to spare, hiding
            // the fact that the ceiling was computed from the persistent
            // *count* rather than the persistent toast's stack *index*.
            for (const n of [1, 2, 3, 4, 5]) {
                act(() => {
                    addSnackbarV2({ header: `Noise ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            expect(isVisible('Persistent')).toBe(true)
        })

        // The ceiling is raised by `persistentToastCount`, a count, not a fixed
        // +1 for "any persistent toast exists". With two persistent toasts and
        // enough ordinary noise to fill the base visible slots, both must stay
        // visible or the count-based math has regressed to a boolean.
        it('keeps multiple persistent toasts visible behind newer toasts', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Persistent A', duration: Infinity })
            })
            await tick(60)
            act(() => {
                addSnackbarV2({ header: 'Persistent B', duration: Infinity })
            })
            await tick(60)

            for (const n of [1, 2, 3]) {
                act(() => {
                    addSnackbarV2({ header: `Noise ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            expect(isVisible('Persistent A')).toBe(true)
            expect(isVisible('Persistent B')).toBe(true)
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
    // Sonner exposes a focus hotkey and an accessible region label, but both
    // default to English-only strings. Persistent toasts are exactly the case
    // where a user needs a route back to the action after the announcement.
    describe('toast region accessibility', () => {
        const region = () =>
            document.querySelector('[data-sonner-toaster]')?.parentElement ??
            document.querySelector('section[aria-label]')

        it('exposes a default region label and hotkey', async () => {
            useTimers()
            render(<SnackbarV2 />)
            act(() => {
                addSnackbarV2({ header: 'Default region' })
            })
            await tick(80)

            expect(region()?.getAttribute('aria-label')).toBe(
                'Notifications alt+T'
            )
        })

        it('honours a custom containerAriaLabel', async () => {
            useTimers()
            render(<SnackbarV2 containerAriaLabel="Benachrichtigungen" />)
            act(() => {
                addSnackbarV2({ header: 'Custom label' })
            })
            await tick(80)

            expect(region()?.getAttribute('aria-label')).toContain(
                'Benachrichtigungen'
            )
        })

        it('honours a custom hotkey', async () => {
            useTimers()
            render(<SnackbarV2 hotkey={['altKey', 'KeyN']} />)
            act(() => {
                addSnackbarV2({ header: 'Custom hotkey' })
            })
            await tick(80)

            expect(region()?.getAttribute('aria-label')).toBe(
                'Notifications alt+N'
            )
        })
    })
    // v1 and v2 share one sonner store, so an app mounting only the v1
    // container must give persistent toasts the same protections. Without
    // them an evicted persistent toast has no timer, pointer-events: none and
    // click-away exemption at once, leaving it impossible to dismiss.
    describe('v1 container parity', () => {
        it('keeps a v1 persistent toast visible behind newer toasts', async () => {
            useTimers()
            render(<Snackbar />)
            act(() => {
                addSnackbar({ header: 'Persistent v1', duration: Infinity })
            })
            await tick(60)

            for (const n of [1, 2, 3]) {
                act(() => {
                    addSnackbar({ header: `Noise v1 ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            expect(isVisible('Persistent v1')).toBe(true)
        })

        it('hides an evicted toast from the tab order under the v1 container', async () => {
            useTimers()
            render(<Snackbar />)
            act(() => {
                addSnackbar({ header: 'Evicted v1' })
            })
            await tick(60)
            for (const n of [1, 2, 3]) {
                act(() => {
                    addSnackbar({ header: `Filler v1 ${n}` })
                })
                await tick(60)
            }
            await tick(200)

            const evicted = toastEl('Evicted v1')
            expect(evicted?.getAttribute('data-visible')).toBe('false')
            expect(getComputedStyle(evicted as Element).visibility).toBe(
                'hidden'
            )
        })
    })
    // The visible ceiling is a public prop, so it has to survive values a
    // consumer can plausibly pass. Any of these previously produced a
    // permanently invisible, unclickable, timer-less, click-away-exempt toast.
    describe('visibleToasts input guards', () => {
        it.each([
            ['negative', -1],
            ['zero', 0],
            ['NaN', Number.NaN],
        ])(
            'keeps a persistent toast visible with a %s ceiling',
            async (_label, value) => {
                useTimers()
                render(<SnackbarV2 visibleToasts={value} />)
                act(() => {
                    addSnackbarV2({ header: 'Guarded', duration: Infinity })
                })
                await tick(200)

                expect(isVisible('Guarded')).toBe(true)
            }
        )
    })
})
