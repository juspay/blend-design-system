/**
 * Bottom-sheet gesture arithmetic.
 *
 * Pure and RN-free (the `theme/breakpoint.ts` pattern) so the dismiss
 * decision — the part of a sheet that feels wrong when it is wrong — is
 * unit-testable under vitest. `BottomSheet` wires these into the pan
 * gesture; they also run as Reanimated worklets, so nothing here may close
 * over module state.
 */

/** Dragging past this fraction of the sheet's height dismisses on release. */
export const SHEET_DISMISS_FRACTION = 0.25

/** A downward fling at or above this velocity (pt/s) dismisses regardless. */
export const SHEET_DISMISS_VELOCITY = 800

/** Default cap: a sheet covers at most this fraction of the window. */
export const SHEET_MAX_HEIGHT_FRACTION = 0.9

/**
 * The sheet follows the finger downward only — upward drag is pinned so the
 * sheet feels anchored rather than lifting off its resting position.
 */
export function clampSheetDrag(translationY: number): number {
    'worklet'
    return Math.max(0, translationY)
}

/**
 * Whether a released drag should dismiss the sheet: past the distance
 * threshold, or a genuine downward fling. An upward fling never dismisses,
 * whatever distance was covered first.
 */
export function shouldDismissSheet(
    translationY: number,
    velocityY: number,
    sheetHeight: number
): boolean {
    'worklet'
    if (velocityY <= -SHEET_DISMISS_VELOCITY) return false
    if (velocityY >= SHEET_DISMISS_VELOCITY) return translationY > 0
    return (
        sheetHeight > 0 && translationY >= sheetHeight * SHEET_DISMISS_FRACTION
    )
}

/**
 * The tallest a sheet may grow: the capped fraction of the window, minus
 * whatever top inset (status bar / notch) must stay visible above it.
 */
export function resolveSheetMaxHeight(
    windowHeight: number,
    topInset: number = 0,
    maxHeightFraction: number = SHEET_MAX_HEIGHT_FRACTION
): number {
    const capped = windowHeight * maxHeightFraction
    return Math.max(0, Math.min(capped, windowHeight - topInset))
}
