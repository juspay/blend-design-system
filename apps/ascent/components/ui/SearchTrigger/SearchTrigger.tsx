'use client'

import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { preloadCommandSearch } from '@/components/layout/DeferredCommandSearch'
import { useCommandSearch } from '../CommandSearch/SearchContext'
import { cn } from '@/lib/utils/cn'

/**
 * The command palette's only visible entry point. Sized and styled to match
 * ThemeToggle, which it sits beside in the navbar.
 */
export default function SearchTrigger({ className }: { className?: string }) {
    const { open, openSearch } = useCommandSearch()
    // Resolved after mount: the site is statically exported, so a
    // platform-specific hint in the prerendered HTML would mismatch on hydrate.
    const [shortcut, setShortcut] = useState<string | null>(null)

    useEffect(() => {
        const isApple = /Mac|iPhone|iPad|iPod/.test(
            navigator.platform || navigator.userAgent
        )
        setShortcut(isApple ? '⌘K' : 'Ctrl K')
    }, [])

    return (
        <button
            type="button"
            onClick={openSearch}
            onPointerEnter={preloadCommandSearch}
            onFocus={preloadCommandSearch}
            title={shortcut ? `Search (${shortcut})` : 'Search'}
            aria-label="Search documentation"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-keyshortcuts="Meta+K Control+K"
            className={cn(
                'p-2 border border-border text-muted-foreground transition-colors hover:text-foreground',
                className
            )}
        >
            <MagnifyingGlassIcon size={16} />
        </button>
    )
}
