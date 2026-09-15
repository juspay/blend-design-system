import { Theme } from '@juspay/blend-design-system/node'

/**
 * `theme="system"` resolution.
 *
 * The provider accepts the sentinel and resolves it against the OS appearance
 * (`useColorScheme`) before the value enters context, so token resolution and
 * every consumer below only ever see a concrete theme.
 *
 * Kept as a leaf module with no `react-native` value import so the mapping is
 * testable under plain vitest; the provider owns the `useColorScheme`
 * subscription.
 */

/** Pass as `theme` to follow the OS light/dark setting. */
export const SYSTEM_THEME = 'system' as const

export type NativeThemeSetting = Theme | string | typeof SYSTEM_THEME

/**
 * Resolve a theme setting to a concrete theme.
 *
 * `colorScheme` is `useColorScheme()`'s value. Typed as `string` rather than
 * a literal union because RN's `ColorSchemeName` has grown values across
 * versions (`'unspecified'` on some platforms) — anything that is not
 * `'dark'` resolves light, matching the provider's default.
 */
export function resolveThemeSetting(
    theme: NativeThemeSetting,
    colorScheme: string | null | undefined
): Theme | string {
    if (theme !== SYSTEM_THEME) return theme
    return colorScheme === 'dark' ? Theme.DARK : Theme.LIGHT
}
