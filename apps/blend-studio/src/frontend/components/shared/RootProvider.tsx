'use client'

import React from 'react'
import { AuthProvider } from '@/frontend/contexts/AuthContext'
import ClientLayout from '@/frontend/components/shared/ClientLayout'

export function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
    )
}
