'use client'

import React from 'react'
import { BackendAuthProvider } from '@/contexts/BackendAuthContext'

// Note: This file is NOT used by the app's root route.
// The root route (routes/__root.tsx) uses BackendAuthProvider directly.
// This file is kept as a convenience wrapper for future use.

export function RootProvider({ children }: { children: React.ReactNode }) {
    return <BackendAuthProvider>{children}</BackendAuthProvider>
}
