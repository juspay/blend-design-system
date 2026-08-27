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
 * Whether the sheet (rather than an inner scrollable) should consume a drag:
 * only when the scrollable is at (or bounced past) its top AND the finger is
 * moving downward. With no scrollable registered the offset stays 0, so a
 * plain-content sheet always consumes — today's behaviour.
 */
export function shouldSheetConsumeDrag(
    scrollOffsetY: number,
    translationY: number
): boolean {
    'worklet'
    return scrollOffsetY <= 0 && translationY > 0
}

/**
 * The sheet's effective drag once it starts consuming mid-gesture: the pan
 * captures the translation at the instant the inner list reaches its top, so
 * the sheet picks up from under the finger instead of jumping by however far
 * the list had already scrolled.
 */
export function resolveSheetDrag(
    translationY: number,
    capturedTranslationY: number
): number {
    'worklet'
    return Math.max(0, translationY - capturedTranslationY)
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
 * whatever top inset (status bar / notch) must stay visible above it, minus
 * the keyboard when the sheet translates up to avoid it — otherwise a tall
 * sheet pushed up by the keyboard would run past the notch.
 */
export function resolveSheetMaxHeight(
    windowHeight: number,
    topInset: number = 0,
    maxHeightFraction: number = SHEET_MAX_HEIGHT_FRACTION,
    keyboardHeight: number = 0
): number {
    const capped = windowHeight * maxHeightFraction
    return Math.max(
        0,
        Math.min(capped, windowHeight - topInset - keyboardHeight)
    )
}
