import { dismissToast, showToast } from '../../overlay/toast/toastStore'
import { buildAnnouncement } from '../../a11y/announcement'
import { SnackbarToast } from './SnackbarToast'
import { resolveSnackbarDuration } from './snackbar.utils'
import type { SnackbarOptions } from './snackbar.types'

/**
 * Imperative snackbar — the native port of web's `addSnackbarV2`, riding
 * the provider-mounted toast host (bottom stack, exit animation, paused
 * timers, topmost layering). Returns the id for `dismissSnackbar`.
 */
export function addSnackbar(options: SnackbarOptions): string {
    return showToast({
        id: options.id,
        duration: resolveSnackbarDuration(options.duration),
        announcement: buildAnnouncement(options.header, options.description),
        content: (dismiss) => (
            <SnackbarToast options={options} dismiss={dismiss} />
        ),
    })
}

/** Dismiss one snackbar by id, or every toast when called without one. */
export function dismissSnackbar(id?: string): void {
    dismissToast(id)
}
