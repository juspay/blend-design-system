import {
    BREAKPOINTS,
    type BreakpointType,
} from '@juspay/blend-design-system/node'

/**
 * Pure breakpoint resolution.
 *
 * Kept in its own leaf module — importing nothing from `react-native` — so it
 * stays testable and reusable outside a React render. `useNativeBreakpoint`
 * layers the `useWindowDimensions` subscription on top.
 *
 * (React Native's entrypoint ships Flow syntax that non-Metro bundlers cannot
 * parse, so any module that value-imports it is unusable from a plain Node
 * test runner. Splitting the logic out is the same pattern the web package
 * uses for `shared/datetime/timeCore.ts`.)
 */

export type NativeBreakpoint = keyof BreakpointType

/**
 * Resolve a viewport width to a Blend breakpoint label.
 *
 * Mirrors web's `useBreakPoints` exactly, including its quirk: **only**
 * 320–1023 maps to `'sm'`; everything else — including widths below 320 —
 * returns `'lg'`. Reproduced deliberately so a given width resolves to the
 * same tokens on both platforms.
 *
 * Thresholds come from `BREAKPOINTS` in the web package rather than being
 * duplicated, so retuning them stays a one-line change in one place.
 */
export function resolveBreakpoint(
    width: number,
    breakpoints: BreakpointType = BREAKPOINTS
): NativeBreakpoint {
    if (width >= breakpoints.sm && width < breakpoints.lg) return 'sm'
    return 'lg'
}
