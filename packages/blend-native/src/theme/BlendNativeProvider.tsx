import React, { createContext, useMemo } from 'react'
import {
    BREAKPOINTS,
    FOUNDATION_THEME,
    Theme,
    type BreakpointType,
} from '@juspay/blend-design-system/node'
import type { NativeComponentTokenOverrides } from './nativeTokenRegistry'

/**
 * Theme context for `@juspay/blend-native`.
 *
 * Replaces the per-component `theme` prop the package shipped with. A prop
 * meant no app-wide dark mode (every call site had to thread it), no nested
 * theme scopes, and — most importantly — no `componentTokens` overrides,
 * which is a first-class feature of web Blend that native consumers simply
 * did not have.
 *
 * Mirrors web's `ThemeProvider` API (`{ theme, componentTokens,
 * foundationTokens }`) so the two platforms are configured the same way, and
 * like web it is optional: components fall back to these defaults when no
 * provider is mounted.
 */

export type BlendNativeThemeValue = {
    theme: Theme | string
    componentTokens: NativeComponentTokenOverrides
    foundationTokens: typeof FOUNDATION_THEME
    breakpoints: BreakpointType
}

const EMPTY_OVERRIDES: NativeComponentTokenOverrides = {}

export const DEFAULT_NATIVE_THEME: BlendNativeThemeValue = {
    theme: Theme.LIGHT,
    componentTokens: EMPTY_OVERRIDES,
    foundationTokens: FOUNDATION_THEME,
    breakpoints: BREAKPOINTS,
}

export const BlendNativeThemeContext =
    createContext<BlendNativeThemeValue>(DEFAULT_NATIVE_THEME)

export type BlendNativeProviderProps = {
    children?: React.ReactNode
    /** `'light' | 'dark'`. Defaults to light. */
    theme?: Theme | string
    /**
     * Partial per-slot token overrides, deep-merged onto the active theme's
     * defaults. Supply only the paths you want to change — every untouched
     * path keeps its light/dark value.
     */
    componentTokens?: NativeComponentTokenOverrides
    /** Override foundation tokens (colours, spacing, radii, ...). */
    foundationTokens?: typeof FOUNDATION_THEME
    /** Override breakpoint thresholds. */
    breakpoints?: BreakpointType
}

export function BlendNativeProvider({
    children,
    theme = Theme.LIGHT,
    componentTokens = EMPTY_OVERRIDES,
    foundationTokens = FOUNDATION_THEME,
    breakpoints = BREAKPOINTS,
}: BlendNativeProviderProps) {
    // Memoised on the same keys web's `initTokens` uses: objects by
    // reference (they are module-scope singletons in practice), theme by
    // value. Keeps the context value stable so a re-render of the provider's
    // parent does not invalidate every consumer's token memo.
    const value = useMemo<BlendNativeThemeValue>(
        () => ({ theme, componentTokens, foundationTokens, breakpoints }),
        [theme, componentTokens, foundationTokens, breakpoints]
    )

    return (
        <BlendNativeThemeContext.Provider value={value}>
            {children}
        </BlendNativeThemeContext.Provider>
    )
}

BlendNativeProvider.displayName = 'BlendNativeProvider'

export default BlendNativeProvider
