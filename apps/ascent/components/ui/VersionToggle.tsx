'use client'

import { useCallback, useId, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'
import {
    useDocVersionMap,
    useVersionPeerMap,
} from '@/app/docs/utils/DocsVersionContext'
import Tooltip from './Tooltip/Tooltip'

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
    const docVersionMap = useDocVersionMap()
    const layoutId = useId()
    const [mounted, setMounted] = useState(false)
    const [isNavigating, setIsNavigating] = useState(false)
    const currentSlug = pathname.match(/^\/docs\/components\/([^/]+)/)?.[1]
    const currentDocVersion = currentSlug
        ? docVersionMap.get(currentSlug)
        : undefined
    const activeVersion =
        currentDocVersion === 1 || currentDocVersion === 2
            ? (`${currentDocVersion}` as Version)
            : version
    const unavailableVersion =
        currentSlug && currentDocVersion && !peerMap.has(currentSlug)
            ? currentDocVersion === 1
                ? '2'
                : '1'
            : undefined

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setIsNavigating(false)
    }, [pathname])

    useEffect(() => {
        if (!currentDocVersion || version === activeVersion) return

        setVersion(activeVersion)
    }, [activeVersion, currentDocVersion, setVersion, version])

    const handleVersionChange = useCallback(
        (newVersion: Version) => {
            if (
                isNavigating ||
                newVersion === activeVersion ||
                newVersion === unavailableVersion
            ) {
                return
            }

            const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)/)
            if (!slugMatch) {
                setVersion(newVersion)
                return
            }

            const targetSlug = peerMap.get(slugMatch[1])
            if (!targetSlug) return

            setVersion(newVersion)
            setIsNavigating(true)
            router.push(pathname.replace(slugMatch[1], targetSlug))
        },
        [
            activeVersion,
            isNavigating,
            pathname,
            peerMap,
            router,
            setVersion,
            unavailableVersion,
        ]
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
                    activeVersion === v ? (
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

            {VERSIONS.map((v) => {
                const isUnavailable = v === unavailableVersion
                const isDisabled = isNavigating || isUnavailable
                const button = (
                    <button
                        key={v}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleVersionChange(v)}
                        aria-pressed={activeVersion === v}
                        aria-label={`Switch to version ${v}`}
                        className={cn(
                            'relative flex-1 px-2.5 py-1 text-xs font-medium rounded-lg text-shadow-2xs/5 transition-colors z-20',
                            activeVersion === v
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                            isUnavailable &&
                                'cursor-not-allowed opacity-45 hover:text-muted-foreground'
                        )}
                    >
                        <span className="relative z-10">V{v}</span>
                    </button>
                )

                if (!isUnavailable) return button

                return (
                    <Tooltip
                        key={v}
                        content={
                            <span className="block max-w-34 rounded-md bg-black px-2 py-1 text-center text-[11px] leading-4 text-white shadow-md dark:bg-white dark:text-black">
                                No V{v} version yet
                            </span>
                        }
                    >
                        <span className="relative z-20 flex flex-1">
                            {button}
                        </span>
                    </Tooltip>
                )
            })}
        </div>
    )
}
