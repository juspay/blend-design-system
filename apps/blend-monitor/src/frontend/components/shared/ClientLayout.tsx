'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import AppShell from './AppShell'
import ProtectedRoute from '../auth/ProtectedRoute'

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/login'
    const isApiTestPage = pathname === '/api-test'
    const isTokenizerPage = pathname.startsWith('/tokenizer')

    if (isLoginPage || isApiTestPage) {
        return <>{children}</>
    }

    if (isTokenizerPage) {
        // Tokenizer pages bypass auth but use AppShell for sidebar
        return <AppShell>{children}</AppShell>
    }

    return (
        <ProtectedRoute>
            <AppShell>{children}</AppShell>
        </ProtectedRoute>
    )
}
