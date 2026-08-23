/**
 * Minimum tap-target policy.
 *
 * Kept in its own leaf module — importing nothing from `react-native` — so it
 * stays unit-testable outside a renderer. (RN's entrypoint ships Flow syntax
 * that non-Metro bundlers cannot parse, so any module that value-imports it is
 * unusable from a plain Node test runner. Same split as `theme/breakpoint.ts`.)
 */

/** Inset applied to each edge of the touch region. */
export type HitSlop = {
    top: number
    bottom: number
    left: number
    right: number
}

/**
 * Apple's Human Interface Guidelines minimum tappable size, in points. Also
 * clears Material's 48dp target once RN's density conversion is applied.
 */
export const MIN_TOUCH_TARGET = 44

/**
 * Slop needed to bring a rendered control up to the minimum tap target.
 *
 * Design-system controls are frequently smaller than the guideline by intent —
 * an `xs` Tag is 20pt tall — so the fix is to widen the *touch* region rather
 * than the control. Returns `undefined` when the control already complies (or
 * when the minimum is disabled with `0`), so no `hitSlop` prop is emitted.
 *
 * ```
 * resolveHitSlop(120, 48) -> undefined          // already compliant
 * resolveHitSlop(60, 20)  -> { top: 12, bottom: 12, left: 0, right: 0 }
 * resolveHitSlop(24, 24)  -> { top: 10, bottom: 10, left: 10, right: 10 }
 * ```
 */
export function resolveHitSlop(
    width: number,
    height: number,
    minTouchTarget: number = MIN_TOUCH_TARGET
): HitSlop | undefined {
    if (!minTouchTarget) return undefined

    const horizontal = Math.max(0, (minTouchTarget - width) / 2)
    const vertical = Math.max(0, (minTouchTarget - height) / 2)
    if (horizontal === 0 && vertical === 0) return undefined

    return {
        top: vertical,
        bottom: vertical,
        left: horizontal,
        right: horizontal,
    }
}
