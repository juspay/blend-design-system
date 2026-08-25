import React, { createContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import {
    BREAKPOINTS,
    FOUNDATION_THEME,
    Theme,
    type BreakpointType,
} from '@juspay/blend-design-system/node'
import type { NativeComponentTokenOverrides } from './nativeTokenRegistry'
import { PortalArea } from '../overlay/portal'
import {
    resolveFontFamilies,
    type NativeFontFamilies,
    type NativeFontFamilyOption,
} from './fonts'
import {
    resolveThemeSetting,
    SYSTEM_THEME,
    type NativeThemeSetting,
} from './systemTheme'

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
 *
 * Two native-only additions:
 *
 * - `theme="system"` follows the OS appearance via `useColorScheme`,
 *   re-rendering when the user flips light/dark. The sentinel is resolved
 *   *before* the value enters context, so consumers only ever see a concrete
 *   theme.
 * - `fontFamily` resolves one font family per role (see `theme/fonts.ts`) —
 *   RN's replacement for web's CSS font inheritance.
 */

export type BlendNativeThemeValue = {
    theme: Theme | string
    componentTokens: NativeComponentTokenOverrides
    foundationTokens: typeof FOUNDATION_THEME
    breakpoints: BreakpointType
    /** Resolved family per role; `null` leaves the platform font. */
    fontFamily: NativeFontFamilies
}

const EMPTY_OVERRIDES: NativeComponentTokenOverrides = {}

export const DEFAULT_NATIVE_THEME: BlendNativeThemeValue = {
    theme: Theme.LIGHT,
    componentTokens: EMPTY_OVERRIDES,
    foundationTokens: FOUNDATION_THEME,
    breakpoints: BREAKPOINTS,
    fontFamily: resolveFontFamilies(FOUNDATION_THEME),
}

export const BlendNativeThemeContext =
    createContext<BlendNativeThemeValue>(DEFAULT_NATIVE_THEME)

export type BlendNativeProviderProps = {
    children?: React.ReactNode
    /**
     * `'light' | 'dark' | 'system'`. Defaults to light. `'system'` follows
     * the OS appearance setting.
     */
    theme?: NativeThemeSetting
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
    /**
     * Font families per role. Defaults to the foundation `font.family`
     * tokens; pass `'system'` for platform fonts, or a partial map to
     * override/disable individual roles. See `theme/fonts.ts`.
     */
    fontFamily?: NativeFontFamilyOption
}

export function BlendNativeProvider({
    children,
    theme = Theme.LIGHT,
    componentTokens = EMPTY_OVERRIDES,
    foundationTokens = FOUNDATION_THEME,
    breakpoints = BREAKPOINTS,
    fontFamily,
}: BlendNativeProviderProps) {
    // Subscribed unconditionally (hooks must be), but only `theme="system"`
    // reads it — an explicit theme is unaffected by OS appearance changes.
    const colorScheme = useColorScheme()
    const resolvedTheme = resolveThemeSetting(theme, colorScheme)

    // Memoised on the same keys web's `initTokens` uses: objects by
    // reference (they are module-scope singletons in practice), theme by
    // value. Keeps the context value stable so a re-render of the provider's
    // parent does not invalidate every consumer's token memo.
    const value = useMemo<BlendNativeThemeValue>(
        () => ({
            theme: resolvedTheme,
            componentTokens,
            foundationTokens,
            breakpoints,
            fontFamily: resolveFontFamilies(foundationTokens, fontFamily),
        }),
        [
            resolvedTheme,
            componentTokens,
            foundationTokens,
            breakpoints,
            fontFamily,
        ]
    )

    return (
        <BlendNativeThemeContext.Provider value={value}>
            {/* Portal layers render after (above) the app's children — mount
                the provider at a screen-filling root so overlays cover the
                screen. See overlay/portal.tsx. */}
            <PortalArea>{children}</PortalArea>
        </BlendNativeThemeContext.Provider>
    )
}

BlendNativeProvider.displayName = 'BlendNativeProvider'

export { SYSTEM_THEME }

export default BlendNativeProvider
