'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
    ThemeProvider,
    FOUNDATION_THEME,
    ComponentTokenType,
} from '@juspay/blend-design-system'
import AppShell from './AppShell'
import ProtectedRoute from '../auth/ProtectedRoute'

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/login'

    if (isLoginPage) {
        return <>{children}</>
    }

    // Provide basic component tokens structure to prevent undefined errors
    const componentTokens: ComponentTokenType = {
        STAT_CARD: {} as any, // Provide empty StatCard tokens to prevent fontSize errors
    }

    return (
        <ThemeProvider
            foundationTokens={FOUNDATION_THEME}
            componentTokens={componentTokens}
        >
            <ProtectedRoute>
                <AppShell>{children}</AppShell>
            </ProtectedRoute>
        </ThemeProvider>
    )
}
