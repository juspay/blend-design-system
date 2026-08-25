import type React from 'react'
import type { ViewStyle } from 'react-native'

/**
 * Optional `expo-linear-gradient` probe, shared by every surface that can
 * render a gradient (Pressable's gradient buttons, Skeleton's wave sweep).
 *
 * The probe must survive every build target this package ships:
 *
 * - **Metro (`react-native` condition, raw `src/`)** and the **CJS build**
 *   (`require`/`default` conditions): `require` exists, the module loads
 *   when installed, and the `catch` absorbs its absence.
 * - **The ESM build** (`import` condition): there is no `require` in module
 *   scope. The `typeof` guard makes the degradation explicit — gradient
 *   surfaces fall back to a flat fill — instead of relying on a caught
 *   `ReferenceError`. Bundlers that polyfill `require` in ESM (webpack)
 *   still resolve the real module.
 */

export type GradientComponent = React.ComponentType<{
    colors: readonly string[]
    locations?: readonly number[]
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    style?: ViewStyle
}>

export let LinearGradient: GradientComponent | null = null
try {
    if (typeof require === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        LinearGradient = (
            require('expo-linear-gradient') as {
                LinearGradient: GradientComponent
            }
        ).LinearGradient
    }
} catch {
    LinearGradient = null
}
