'use client'

import React from 'react'
import { ThemeProvider, Theme } from '@juspay/blend-design-system'
import { useSiteTheme } from '@/hooks/useSiteTheme'
import { darkOverrides } from '@/lib/blend-theme'

/**
 * Bridges the site's light/dark class to Blend's ThemeProvider.
 *
 * Blend resolves component tokens from the `theme` prop alone — it holds no
 * theme state of its own — so without this the previews render on Blend's
 * default context, which is hardcoded light.
 *
 * The overrides fill in the slots whose library tokens have no dark variant.
 * ThemeProvider deep-merges them over the theme-resolved defaults, so slots
 * that DO have dark tokens keep their library values untouched.
 */
export default function BlendThemeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const theme = useSiteTheme()
    const isDark = theme === 'dark'

    return (
        <ThemeProvider
            theme={isDark ? Theme.DARK : Theme.LIGHT}
            componentTokens={isDark ? darkOverrides : undefined}
        >
            {children}
        </ThemeProvider>
    )
}
