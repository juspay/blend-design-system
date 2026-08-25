import React, { createContext } from 'react'

/**
 * Optional `react-native-safe-area-context` integration, shared by every
 * overlay that must respect the home indicator or notch (BottomSheet, the
 * toast outlet).
 *
 * `useContext` needs *a* context unconditionally, so when the optional peer
 * is absent — or its provider is not mounted — a null-valued fallback
 * stands in and insets resolve to zero. Same probe pattern as
 * expo-linear-gradient.
 */

export type EdgeInsets = {
    top: number
    bottom: number
    left: number
    right: number
}

const FallbackInsetsContext = createContext<EdgeInsets | null>(null)

export let SafeAreaInsetsContext: React.Context<EdgeInsets | null> =
    FallbackInsetsContext
try {
    if (typeof require === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const safeArea = require('react-native-safe-area-context') as {
            SafeAreaInsetsContext?: React.Context<EdgeInsets | null>
        }
        SafeAreaInsetsContext =
            safeArea.SafeAreaInsetsContext ?? FallbackInsetsContext
    }
} catch {
    SafeAreaInsetsContext = FallbackInsetsContext
}
