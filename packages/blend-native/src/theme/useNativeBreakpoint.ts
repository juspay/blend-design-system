import { useWindowDimensions } from 'react-native'
import {
    BREAKPOINTS,
    type BreakpointType,
} from '@juspay/blend-design-system/node'
import { resolveBreakpoint, type NativeBreakpoint } from './breakpoint'

export { resolveBreakpoint }
export type { NativeBreakpoint }

/**
 * The active breakpoint for the current RN viewport.
 *
 * `useWindowDimensions` is RN's equivalent of web's resize listener — it
 * re-renders on rotation, split-screen, and foldable unfold. The previous
 * implementation hardcoded `'sm'` on the assumption that native is
 * phone-only, which silently gave tablets and landscape the wrong tokens.
 *
 * The width→label mapping itself lives in `./breakpoint`, which imports
 * nothing from `react-native` and is therefore unit-testable.
 */
export function useNativeBreakpoint(
    breakpoints: BreakpointType = BREAKPOINTS
): NativeBreakpoint {
    const { width } = useWindowDimensions()
    return resolveBreakpoint(width, breakpoints)
}
