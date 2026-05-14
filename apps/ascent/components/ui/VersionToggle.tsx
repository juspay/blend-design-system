'use client'

import { useCallback, useId, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'
import { useVersionPeerMap } from '@/app/docs/utils/DocsVersionContext'

const VERSIONS = ['1', '2'] as const satisfies readonly Version[]

interface VersionToggleProps {
    className?: string
}

//Skeleton
function VersionToggleSkeleton({ className }: { className?: string }) {
    return (
        <div
            aria-hidden
            className={cn(
                'h-8 w-18 border border-border rounded-xl',
                className
            )}
        />
    )
}

export default function VersionToggle({ className }: VersionToggleProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [version, setVersion] = useDocsVersion()
    const peerMap = useVersionPeerMap()
    const layoutId = useId()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleVersionChange = useCallback(
        (newVersion: Version) => {
            setVersion(newVersion)
            // Only attempt navigation if we're on a component page
            const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)/)
            if (!slugMatch) return

            const currentSlug = slugMatch[1]
            // Look up the peer slug from the map — works for any naming scheme
            const targetSlug = peerMap.get(currentSlug)
            if (!targetSlug) return // no peer exists for this component, stay put

            router.push(pathname.replace(currentSlug, targetSlug))
        },
        [pathname, peerMap, setVersion, router]
    )

    // Only show on docs pages
    if (!pathname?.startsWith('/docs')) return null

    if (!mounted) return <VersionToggleSkeleton className={className} />

    return (
        <div
            role="group"
            aria-label="Docs version"
            className={cn(
                'relative flex items-center gap-0.5 border border-border h-8 py-1 px-1 rounded-xl',
                className
            )}
        >
            {VERSIONS.map((v) => (
                <button
                    key={v}
                    type="button"
                    onClick={() => handleVersionChange(v)}
                    aria-pressed={version === v}
                    aria-label={`Switch to version ${v}`}
                    className={cn(
                        'relative px-2.5 py-1 text-xs font-medium rounded-lg text-shadow-2xs/5 transition-colors',
                        version === v
                            ? 'text-primary-foreground'
                            : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                >
                    {version === v && (
                        <motion.div
                            layoutId={`activeVersion-${layoutId}`}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                            className="absolute inset-0 bg-primary/90 border-[0.25px] border-primary rounded-lg z-10"
                        />
                    )}
                    <span className="relative z-10">V{v}</span>
                </button>
            ))}
        </div>
    )
}
