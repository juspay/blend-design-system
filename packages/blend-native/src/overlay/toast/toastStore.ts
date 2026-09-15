import type React from 'react'

/**
 * Toast queue — the sonner role, minus the styling.
 *
 * A module-level store with an imperative `showToast`/`dismissToast` API,
 * so any code (not just components) can raise a toast; the outlet the
 * provider mounts subscribes and renders. SnackbarV2 will layer its token
 * styling on top of this host; the host itself owns only queueing,
 * stacking, timing, and announcements.
 *
 * RN-free (a `React.ReactNode` type is the only React surface) so queue
 * semantics unit-test under vitest.
 */

export type ToastOptions = {
    /** Reusing an id replaces that toast's content in place. */
    id?: string
    /** The rendered toast; a function receives its own dismiss. */
    content: React.ReactNode | ((dismiss: () => void) => React.ReactNode)
    /** Auto-dismiss delay in ms; `null` keeps the toast until dismissed. */
    duration?: number | null
    /** Spoken to assistive tech when the toast appears. */
    announcement?: string
}

export type ToastEntry = Required<Pick<ToastOptions, 'content'>> & {
    id: string
    duration: number | null
    announcement?: string
}

/** How many toasts render at once; older ones wait in the queue. */
export const MAX_VISIBLE_TOASTS = 3

/** Default auto-dismiss delay, matching sonner's. */
export const DEFAULT_TOAST_DURATION = 4000

type Listener = (toasts: readonly ToastEntry[]) => void

let toasts: ToastEntry[] = []
const listeners = new Set<Listener>()
let counter = 0

function emit() {
    for (const listener of listeners) listener(toasts)
}

/** Raise a toast; returns its id. */
export function showToast(options: ToastOptions): string {
    const id = options.id ?? `blend-toast-${++counter}`
    const entry: ToastEntry = {
        id,
        content: options.content,
        duration:
            options.duration === null
                ? null
                : (options.duration ?? DEFAULT_TOAST_DURATION),
        announcement: options.announcement,
    }
    const existing = toasts.findIndex((t) => t.id === id)
    toasts =
        existing === -1
            ? [...toasts, entry]
            : toasts.map((t, i) => (i === existing ? entry : t))
    emit()
    return id
}

/** Dismiss one toast, or every toast when no id is given. */
export function dismissToast(id?: string): void {
    toasts = id === undefined ? [] : toasts.filter((t) => t.id !== id)
    emit()
}

export function getToasts(): readonly ToastEntry[] {
    return toasts
}

/** The slice the outlet renders: the newest MAX_VISIBLE. */
export function getVisibleToasts(
    all: readonly ToastEntry[] = toasts
): readonly ToastEntry[] {
    return all.slice(-MAX_VISIBLE_TOASTS)
}

export function subscribeToasts(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

/** Test hook — clears the queue without notifying. */
export function resetToasts(): void {
    toasts = []
    counter = 0
}
