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
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setIsNavigating(false)
    }, [pathname])

    const handleVersionChange = useCallback(
        (newVersion: Version) => {
            if (isNavigating || newVersion === version) return
            setVersion(newVersion)

            const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)/)
            if (!slugMatch) return

            const currentSlug = slugMatch[1]
            const targetSlug = peerMap.get(currentSlug)
            if (!targetSlug) return

            setIsNavigating(true)
            router.push(pathname.replace(currentSlug, targetSlug))
        },
        [pathname, peerMap, setVersion, router, version, isNavigating]
    )

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
            {/* Sliding indicator layer — sits behind buttons, animates via layoutId */}
            <div className="absolute inset-1 flex gap-0.5 pointer-events-none">
                {VERSIONS.map((v) =>
                    version === v ? (
                        <motion.div
                            key={v}
                            layoutId={`activeVersion-${layoutId}`}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                            className="flex-1 bg-primary/90 border-[0.25px] border-primary rounded-lg"
                        />
                    ) : (
                        <div key={v} className="flex-1" />
                    )
                )}
            </div>

            {VERSIONS.map((v) => (
                <button
                    key={v}
                    type="button"
                    disabled={isNavigating}
                    onClick={() => handleVersionChange(v)}
                    aria-pressed={version === v}
                    aria-label={`Switch to version ${v}`}
                    className={cn(
                        'relative flex-1 px-2.5 py-1 text-xs font-medium rounded-lg text-shadow-2xs/5 transition-colors z-20',
                        version === v
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    <span className="relative z-10">V{v}</span>
                </button>
            ))}
        </div>
    )
}
