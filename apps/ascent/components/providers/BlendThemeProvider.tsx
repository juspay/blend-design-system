'use client'

import React from 'react'
import { ThemeProvider, Theme } from '@juspay/blend-design-system'
import { useSiteTheme } from '@/hooks/useSiteTheme'

/**
 * Bridges the site's light/dark class to Blend's ThemeProvider.
 *
 * Blend resolves component tokens from the `theme` prop alone — it holds no
 * theme state of its own — so without this the previews render on Blend's
 * default context, which is hardcoded light.
 */
export default function BlendThemeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const theme = useSiteTheme()

    return (
        <ThemeProvider theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}>
            {children}
        </ThemeProvider>
    )
}
