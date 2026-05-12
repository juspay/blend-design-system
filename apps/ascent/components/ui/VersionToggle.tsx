'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'

const VERSIONS = ['1', '2'] as const satisfies readonly Version[]

interface VersionToggleProps {
    className?: string
}

// Skeleton
function VersionToggleSkeleton({ className }: { className?: string }) {
    return (
        <div
            aria-hidden
            className={cn('h-8 w-16 border border-border', className)}
        />
    )
}

// Component
export default function VersionToggle({ className }: VersionToggleProps) {
    const pathname = usePathname()
    const [version, setVersion] = useDocsVersion()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Only show on docs pages
    if (!pathname?.startsWith('/docs')) {
        return null
    }

    if (!mounted) {
        return <VersionToggleSkeleton className={className} />
    }

    return (
        <div
            role="group"
            aria-label="Docs version"
            className={cn(
                'flex items-center border border-border overflow-hidden h-8 py-0.5 px-1',
                className
            )}
        >
            {VERSIONS.map((v) => (
                <button
                    key={v}
                    onClick={() => setVersion(v)}
                    aria-label={`Switch to version ${v}`}
                    aria-pressed={version === v}
                    className={cn(
                        'px-2.5 py-1 text-xs font-medium transition-colors',
                        version === v
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                >
                    V{v}
                </button>
            ))}
        </div>
    )
}
