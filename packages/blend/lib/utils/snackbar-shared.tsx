import { toast as sonnerToast, useSonner } from 'sonner'
import type { ToastT, ToastToDismiss } from 'sonner'

/**
 * Behaviour shared by `Snackbar` (v1) and `SnackbarV2`.
 *
 * Sonner keeps a single toast store for the whole app, so both containers see
 * every toast regardless of which one created it. Anything that decides the
 * fate of a persistent toast therefore has to behave identically in both, or a
 * v1 container mounted anywhere in the app silently breaks v2's guarantees.
 */

/** Sonner's default visible-stack size (`VISIBLE_TOASTS_AMOUNT`). */
export const DEFAULT_VISIBLE_TOASTS = 3

/**
 * A toast created with `duration: Infinity` never auto-dismisses.
 *
 * `getToasts()` returns live toasts alongside dismissal records, and only the
 * former carry a duration.
 */
export const isPersistentToast = (toast: ToastT | ToastToDismiss) =>
    'duration' in toast && toast.duration === Infinity

/**
 * Dismiss every toast except those explicitly marked persistent with
 * `duration: Infinity`.
 *
 * Calling `sonnerToast.dismiss()` with no arguments dismisses *all* toasts,
 * which silently defeats persistent toasts. Dismissing by id instead keeps the
 * click-away behaviour for ordinary toasts while leaving persistent ones alone.
 */
export const dismissNonPersistentToasts = () => {
    sonnerToast.getToasts().forEach((toast) => {
        if (!isPersistentToast(toast)) {
            sonnerToast.dismiss(toast.id)
        }
    })
}

/**
 * How many toasts the container should keep visible.
 *
 * Persistent toasts must never be pushed out of the visible stack by newer
 * toasts. Once evicted a toast gets `pointer-events: none`, and because a
 * persistent one also has no timer and is exempt from click-away, eviction
 * would leave it impossible to dismiss by any means.
 *
 * Sonner decides visibility by stack position (`index + 1 <= visibleToasts`)
 * over a newest-first array, so a persistent toast is the *oldest* entry and
 * therefore carries the *highest* index. Adding the persistent *count* to the
 * base is not enough: one persistent toast behind four ordinary ones sits at
 * index 4 while a base of 3 only lifts the ceiling to 4, and it disappears.
 * The ceiling has to clear the deepest persistent toast's index instead.
 */
export const useVisibleToastCount = (base = DEFAULT_VISIBLE_TOASTS) => {
    const { toasts } = useSonner()

    // Guard the public `visibleToasts` prop: a negative, zero, or NaN base
    // makes every toast fail the visibility check, including persistent ones.
    const safeBase =
        Number.isFinite(base) && base >= 1
            ? Math.floor(base)
            : DEFAULT_VISIBLE_TOASTS

    let deepestPersistentIndex = -1
    toasts.forEach((toast, index) => {
        if (isPersistentToast(toast)) {
            deepestPersistentIndex = index
        }
    })

    return Math.max(safeBase, deepestPersistentIndex + 1)
}

/**
 * A toast pushed out of the visible stack gets `opacity: 0; pointer-events: none`
 * from sonner, but no `visibility: hidden` and no `aria-hidden`. That leaves it
 * invisible to sighted users while still focusable and still in the
 * accessibility tree, so a keyboard user can tab onto a button they cannot see
 * (WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured).
 *
 * `visibility: hidden` removes it from the tab order and the accessibility tree.
 *
 * The delayed transition matters: `visibility` is not in sonner's transition
 * list (`transform, opacity, height, box-shadow`), so flipping it outright
 * would make an evicted toast vanish in a single frame instead of fading over
 * sonner's 400ms opacity animation. Delaying the flip by that long lets the
 * fade play out first; becoming visible again is instant because the rule
 * simply stops matching.
 *
 * Rendered as a plain style element rather than `createGlobalStyle` so the rule
 * is present in the DOM and can be asserted in tests.
 */
const HIDDEN_TOAST_CSS = `[data-sonner-toast][data-visible='false']{visibility:hidden;transition:visibility 0s linear 400ms;}`

export const SnackbarHiddenToastStyles = () => (
    <style data-blend-snackbar-a11y="">{HIDDEN_TOAST_CSS}</style>
)
