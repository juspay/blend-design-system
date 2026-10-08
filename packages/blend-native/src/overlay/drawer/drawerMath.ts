/**
 * Side-drawer gesture arithmetic — the `sheetMath.ts` pattern with the axis
 * swapped from Y to X and a `side` sign correction, since a left-anchored
 * drawer closes on a leftward (negative) drag and a right-anchored one
 * closes on a rightward (positive) drag.
 *
 * Pure and RN-free so the dismiss decision is unit-testable under vitest;
 * `SideDrawer` wires these into the pan gesture, and they also run as
 * Reanimated worklets, so nothing here may close over module state.
 */

export type DrawerSide = 'left' | 'right'

/** Dragging past this fraction of the drawer's width dismisses on release. */
export const DRAWER_DISMISS_FRACTION = 0.3

/** A closing-direction fling at or above this velocity (pt/s) dismisses regardless. */
export const DRAWER_DISMISS_VELOCITY = 800

/** Travel (pt) in the closing direction before the drawer pan may activate. */
export const DRAWER_PAN_ACTIVATION_DISTANCE = 8

/**
 * The drawer follows the finger only in its closing direction — dragging the
 * other way is pinned at 0 so the drawer feels anchored at its open resting
 * position instead of overshooting past it.
 */
export function clampDrawerDrag(
    translationX: number,
    side: DrawerSide
): number {
    'worklet'
    return side === 'left'
        ? Math.min(0, translationX)
        : Math.max(0, translationX)
}

/**
 * Translation and velocity re-expressed as "closing travel": positive means
 * moving toward dismissal, regardless of which edge the drawer is anchored
 * to. Keeps the dismiss/activation math below side-agnostic.
 */
function closingTravel(value: number, side: DrawerSide): number {
    'worklet'
    return side === 'left' ? -value : value
}

/**
 * The manual-activation decision for the drawer pan: activate only once the
 * finger has travelled the activation distance in the closing direction.
 * Mirrors `shouldActivateSheetPan`, minus the scroll-cooperation term — a
 * nav drawer has no inner scrollable fighting for the same gesture axis.
 */
export function shouldActivateDrawerPan(
    touchTravelX: number,
    side: DrawerSide
): boolean {
    'worklet'
    return closingTravel(touchTravelX, side) > DRAWER_PAN_ACTIVATION_DISTANCE
}

/**
 * Whether a released drag should dismiss the drawer: past the distance
 * threshold, or a genuine closing-direction fling. A fling back toward the
 * open position never dismisses, whatever distance was covered first.
 */
export function shouldDismissDrawer(
    translationX: number,
    velocityX: number,
    drawerWidth: number,
    side: DrawerSide
): boolean {
    'worklet'
    const travel = closingTravel(translationX, side)
    const velocity = closingTravel(velocityX, side)
    if (velocity <= -DRAWER_DISMISS_VELOCITY) return false
    if (velocity >= DRAWER_DISMISS_VELOCITY) return travel > 0
    return drawerWidth > 0 && travel >= drawerWidth * DRAWER_DISMISS_FRACTION
}

/**
 * The drawer's resting transform offset while fully closed: off-screen past
 * its own edge. Left-anchored drawers sit at `-width`, right-anchored ones
 * at `+width`.
 */
export function closedOffset(width: number, side: DrawerSide): number {
    'worklet'
    return side === 'left' ? -width : width
}
