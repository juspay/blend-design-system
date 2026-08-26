/**
 * Duration mapping for `addSnackbar`, mirroring web's sonner semantics:
 * `Infinity`/`null` → persistent (the host's `null`); `0` → NOT persistent
 * — web warns once in dev and lets the default apply; `undefined` →
 * default.
 */
let warnedZeroDuration = false

/** Test hook. */
export function resetSnackbarWarnings() {
    warnedZeroDuration = false
}

export function resolveSnackbarDuration(
    duration: number | null | undefined
): number | null | undefined {
    if (duration === null || duration === Infinity) return null
    if (duration === 0) {
        if (typeof __DEV__ !== 'undefined' && __DEV__ && !warnedZeroDuration) {
            warnedZeroDuration = true
            console.warn(
                '[blend-native] addSnackbar({ duration: 0 }) is not ' +
                    'persistent — pass Infinity (or null) to keep a ' +
                    'snackbar until dismissed. Falling back to the default ' +
                    'duration, matching web.'
            )
        }
        return undefined
    }
    return duration
}
