'use client'

import { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import {
    HouseSimpleIcon,
    MagnifyingGlassIcon,
    FileIcon,
    GitDiffIcon,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils/cn'
import searchIndex from '@/public/search-index.json'

interface SearchItem {
    title: string
    description?: string
    path: string
    slug: string
    category?: string
}

// Static data - computed once at module load
const items: SearchItem[] = Object.values(searchIndex)
const seenTitles = new Set<string>()
const components = items
    .filter((item) => item.path.startsWith('components/'))
    .sort((a, b) => a.title.localeCompare(b.title))
    .filter((item) => {
        if (seenTitles.has(item.title)) return false
        seenTitles.add(item.title)
        return true
    })
const blogs = items.filter((item) => item.path.includes('blog'))

export function CommandSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setOpen((o) => !o)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const filteredComponents = query
        ? components.filter(
              (item) =>
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.description?.toLowerCase().includes(query.toLowerCase())
          )
        : components

    const filteredBlogs = query
        ? blogs.filter(
              (item) =>
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.description?.toLowerCase().includes(query.toLowerCase())
          )
        : blogs

    const go = (path: string) => {
        router.push(path)
        setOpen(false)
        setQuery('')
    }

    if (!open) return null

    return (
        <div
            data-cmd-open
            className="fixed inset-0 z-150"
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setOpen(false)}
            />
            <Command className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-1/2 bg-background border border-border shadow-2xl overflow-hidden rounded-xl">
                <div className="flex items-center border-b border-border px-4">
                    <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground mr-3" />
                    <Command.Input
                        value={query}
                        onValueChange={setQuery}
                        placeholder="Search..."
                        className="flex-1 bg-transparent h-12 outline-none text-sm font-manrope"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs font-mono text-muted-foreground rounded border border-border">
                        ESC
                    </kbd>
                </div>

                <Command.List className="max-h-[40vh] overflow-y-auto py-2">
                    <div className="text-[11px] uppercase text-nav-section-text-foreground px-3 py-3 tracking-wider font-medium">
                        Components
                    </div>
                    {filteredComponents.length > 0 ? (
                        filteredComponents.map((item) => (
                            <Command.Item
                                key={item.slug}
                                onSelect={() =>
                                    go(
                                        item.path.startsWith('/')
                                            ? item.path
                                            : `/docs/${item.path}`
                                    )
                                }
                                className={cn(
                                    'flex items-center py-2.5 px-3 text-sm cursor-pointer font-manrope tracking-tight',
                                    'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
                                    'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
                                )}
                            >
                                {item.title}
                            </Command.Item>
                        ))
                    ) : (
                        <div className="py-2 px-3 text-sm text-muted-foreground">
                            No components found
                        </div>
                    )}

                    <div className="text-[11px] uppercase text-nav-section-text-foreground px-3 py-3 tracking-wider font-medium">
                        Pages
                    </div>
                    <Command.Item
                        onSelect={() => go('/')}
                        className={cn(
                            'flex items-center gap-3 py-2 px-3 text-sm cursor-pointer font-manrope',
                            'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
                            'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
                        )}
                    >
                        <HouseSimpleIcon className="w-4 h-4 text-muted-foreground" />
                        Home
                    </Command.Item>
                    <Command.Item
                        onSelect={() => go('/blog')}
                        className={cn(
                            'flex items-center gap-3 py-2 px-3 text-sm cursor-pointer font-manrope',
                            'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
                            'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
                        )}
                    >
                        <FileIcon className="w-4 h-4 text-muted-foreground" />
                        Blog
                    </Command.Item>
                    <Command.Item
                        onSelect={() => go('/changelog')}
                        className={cn(
                            'flex items-center gap-3 py-2 px-3 text-sm cursor-pointer font-manrope',
                            'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
                            'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
                        )}
                    >
                        <GitDiffIcon className="w-4 h-4 text-muted-foreground" />
                        Changelog
                    </Command.Item>
                </Command.List>

                <div className="border-t border-border px-4 py-3 bg-surface font-manrope">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            {filteredComponents.length} components ·{' '}
                            {filteredBlogs.length} blog posts
                        </span>
                        <div className="flex items-center gap-3">
                            <span>↑ ↓ navigate</span>
                            <span>↵ select</span>
                        </div>
                    </div>
                </div>
            </Command>
        </div>
    )
}

export default CommandSearch
