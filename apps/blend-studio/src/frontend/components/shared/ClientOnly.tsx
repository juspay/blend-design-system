'use client'

import React, { useEffect, useState } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
        )
    }

    return <>{children}</>
}
