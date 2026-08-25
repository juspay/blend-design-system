import { FOUNDATION_THEME, Theme } from '@juspay/blend-design-system/node'
import type { BreakpointType } from '@juspay/blend-design-system/node'

/**
 * Token resolver for React Native.
 *
 * On web, components call `useResponsiveTokens('BUTTONV2')` which goes through
 * `ThemeProvider` → `useBreakpoints` → `window.addEventListener('resize')`.
 * That hook chain crashes on RN (no DOM `window.addEventListener`).
 *
 * Instead, native components call `resolveTokens` here — a plain function that:
 *   1. Calls the token factory directly with `FOUNDATION_THEME` (pure, no React).
 *   2. Picks the `sm` breakpoint (RN is always mobile; `useBreakPoints` maps
 *      320–1023px → 'sm' and RN viewports are always in that range).
 *
 * No React hooks, no context, no DOM. This is the single bridge between
 * Blend's token system and the native runtime.
 */

/**
 * The breakpoint key to resolve on native.
 *
 * `useBreakPoints` maps only 320–1023px to `'sm'`; everything else (including
 * below 320) returns `'lg'`. RN phone viewports are always ≥ 320 in practice,
 * so `'sm'` is correct for all phone form factors. Tablets would be `'lg'`,
 * but native components are currently phone-only.
 */
export const NATIVE_BREAKPOINT: keyof BreakpointType = 'sm'

/**
 * Resolve a token factory to the flat token object for the native breakpoint.
 *
 * @param getTokens — a token factory like `getButtonV2Tokens`
 * @param theme — `'light' | 'dark'`, defaults to `Theme.LIGHT`
 * @param breakpoint — `'sm' | 'lg'`, defaults to `'sm'` (see NATIVE_BREAKPOINT)
 *
 * @example
 * const tokens = resolveTokens(getButtonV2Tokens, Theme.LIGHT)
 * // tokens === { gap: '6px', backgroundColor: {...}, ... }
 */
export function resolveTokens<T>(
    getTokens: (
        foundation: typeof FOUNDATION_THEME,
        theme?: Theme | string
    ) => Record<keyof BreakpointType, T>,
    theme: Theme | string = Theme.LIGHT,
    breakpoint: keyof BreakpointType = NATIVE_BREAKPOINT
): T {
    const responsive = getTokens(FOUNDATION_THEME, theme)
    return responsive[breakpoint]
}

export { FOUNDATION_THEME, Theme }
