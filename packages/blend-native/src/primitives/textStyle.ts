import type { TextStyle } from 'react-native'

/**
 * Shared text-style resolution for `Text` and `PrimitiveInput`.
 *
 * Leaf module with only a type import from `react-native`, so it stays
 * vitest-testable — the `theme/breakpoint.ts` pattern.
 */

/**
 * Resolve a CSS font-weight value to a RN-compatible `TextStyle['fontWeight']`.
 * RN accepts `'normal' | 'bold' | '100'..'900'` (as string or number).
 */
export function resolveFontWeight(
    w: string | number | undefined
): TextStyle['fontWeight'] {
    if (w === undefined) return undefined
    if (typeof w === 'number') return String(w) as TextStyle['fontWeight']
    // Token values are numeric strings like `"500"`.
    if (/^\d+$/.test(w)) return w as TextStyle['fontWeight']
    const lower = w.toLowerCase()
    if (lower === 'normal' || lower === 'bold') return lower
    return undefined
}
