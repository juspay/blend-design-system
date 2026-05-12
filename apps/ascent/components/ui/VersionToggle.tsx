'use client'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils/cn'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'
import { useVersionedSlugs } from '@/app/docs/utils/DocsVersionContext'

const VERSIONS = ['1', '2'] as const satisfies readonly Version[]

export default function VersionToggle({ className }: { className?: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const [version, setVersion] = useDocsVersion()
    const allComponentSlugs = useVersionedSlugs()

    if (!pathname?.startsWith('/docs')) return null

    function handleVersionChange(newVersion: Version) {
        setVersion(newVersion)

        const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)/)
        if (!slugMatch) return

        const baseSlug = slugMatch[1].replace(/-v2$/i, '')
        const targetSlug = newVersion === '2' ? `${baseSlug}-v2` : baseSlug

        if (!allComponentSlugs.has(targetSlug)) return

        router.push(pathname.replace(slugMatch[1], targetSlug))
    }

    return (
        <div
            role="group"
            aria-label="Docs version"
            className={cn(
                'relative flex items-center gap-0.5 border border-border h-8 py-0.75 px-1 rounded-xl',
                className
            )}
        >
            {VERSIONS.map((v) => (
                <button
                    key={v}
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
                            layoutId="activeVersion"
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
