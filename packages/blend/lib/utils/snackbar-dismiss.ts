import { toast as sonnerToast } from 'sonner'
import type { ToastT, ToastToDismiss } from 'sonner'

/**
 * A toast created with `duration: Infinity` never auto-dismisses.
 *
 * `getToasts()` returns live toasts alongside dismissal records, and only the
 * former carry a duration.
 */
export const isPersistentToast = (toast: ToastT | ToastToDismiss) =>
    'duration' in toast && toast.duration === Infinity

/** Sonner's default visible-stack size (`VISIBLE_TOASTS_AMOUNT`). */
export const DEFAULT_VISIBLE_TOASTS = 3

/**
 * Dismiss every toast except those explicitly marked persistent with
 * `duration: Infinity`.
 *
 * Calling `sonnerToast.dismiss()` with no arguments dismisses *all* toasts,
 * which silently defeats persistent toasts. Dismissing by id instead keeps the
 * click-away behaviour for ordinary toasts while leaving persistent ones alone.
 *
 * Shared by `Snackbar` and `SnackbarV2` because sonner keeps a single toast
 * store for both, so a v1 container would otherwise dismiss v2's persistent
 * toasts.
 */
export const dismissNonPersistentToasts = () => {
    sonnerToast.getToasts().forEach((toast) => {
        if (!isPersistentToast(toast)) {
            sonnerToast.dismiss(toast.id)
        }
    })
}
