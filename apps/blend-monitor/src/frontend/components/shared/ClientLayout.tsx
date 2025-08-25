'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
    ThemeProvider,
    TelemetryProvider,
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

    // Provide explicit component tokens to ensure proper initialization
    // This ensures all components have their tokens available
    const componentTokens: Partial<ComponentTokenType> = {
        STAT_CARD: undefined, // This will trigger default token generation
        CHARTS: undefined, // This will trigger default token generation
    }

    return (
        <TelemetryProvider config={{ debug: false }}>
            <ThemeProvider
                foundationTokens={FOUNDATION_THEME}
                componentTokens={componentTokens}
            >
                {isLoginPage ? (
                    <>{children}</>
                ) : (
                    <ProtectedRoute>
                        <AppShell>{children}</AppShell>
                    </ProtectedRoute>
                )}
            </ThemeProvider>
        </TelemetryProvider>
    )
}
