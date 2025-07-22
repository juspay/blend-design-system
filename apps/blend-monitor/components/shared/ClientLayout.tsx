'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import AppShell from '@/components/shared/AppShell'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

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

    return (
        <ProtectedRoute>
            <AppShell>{children}</AppShell>
        </ProtectedRoute>
    )
}
