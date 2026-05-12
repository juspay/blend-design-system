'use client'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { useDocsVersion, type Version } from '@/lib/hooks/useDocsVersion'
import { useVersionedSlugs } from '@/app/docs/utils/DocsVersionContext'

const VERSIONS = ['1', '2'] as const satisfies readonly Version[]

export default function VersionToggle({ className }: { className?: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const [version, setVersion] = useDocsVersion()
    const versionedSlugs = useVersionedSlugs()

    if (!pathname?.startsWith('/docs')) return null

    function handleVersionChange(newVersion: Version) {
        setVersion(newVersion)

        const slugMatch = pathname.match(/^\/docs\/components\/([^/]+)/)
        if (!slugMatch) return

        const baseSlug = slugMatch[1].replace(/-v2$/i, '')
        if (newVersion === '2' && !versionedSlugs.has(baseSlug)) return

        const targetSlug = newVersion === '2' ? `${baseSlug}-v2` : baseSlug
        router.push(pathname.replace(slugMatch[1], targetSlug))
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
                    onClick={() => handleVersionChange(v)}
                    aria-pressed={version === v}
                    aria-label={`Switch to version ${v}`}
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
