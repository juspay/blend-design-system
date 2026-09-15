'use client'

import { useState, useEffect, useRef } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import {
    HouseSimpleIcon,
    MagnifyingGlassIcon,
    FileIcon,
    GitDiffIcon,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils/cn'
import { useCommandSearch } from './SearchContext'
import { HEADER_NAV_LINKS, ROUTES } from '@/lib/constants'
import { showcaseData } from '@/lib/showcase-data'
import searchIndex from '@/public/search-index.json'

interface SearchItem {
    title: string
    description?: string
    path: string
    slug: string
    category?: string
    tags?: string[]
    content?: string
    excerpt?: string
    keywords?: string[]
}

// Static data - computed once at module load
const items: SearchItem[] = Object.values(searchIndex)
const SEARCH_PAGE_DESCRIPTIONS: Record<string, string> = {
    [ROUTES.home]: 'Blend Design System home page',
    [ROUTES.docs]: 'Blend docs overview',
    '/docs/components': 'Browse Blend component documentation',
    [ROUTES.blog]: 'Blend blog posts and articles',
    [ROUTES.changelog]: 'Blend release notes and changes',
    [ROUTES.showcase]: 'Blend examples and showcases',
}

const getSlugFromPath = (path: string) =>
    path === '/' ? 'home' : path.replace(/^\//, '').replaceAll('/', '-')

const staticPageLinks = [
    { label: 'Home', href: ROUTES.home },
    ...HEADER_NAV_LINKS.filter((link) => !link.external),
    { label: 'Components', href: '/docs/components' },
]

const staticPages: SearchItem[] = Array.from(
    new Map(staticPageLinks.map((link) => [link.href, link])).values()
).map((link) => ({
    title: link.label === 'Docs' ? 'Documentation' : link.label,
    description: SEARCH_PAGE_DESCRIPTIONS[link.href],
    path: link.href,
    slug: getSlugFromPath(link.href),
}))
const components = items
    .filter((item) => item.path.startsWith('components/'))
    .sort((a, b) => a.title.localeCompare(b.title))
const blogs = items
    .filter((item) => item.path.startsWith('blog/'))
    .sort((a, b) => a.title.localeCompare(b.title))
const changelogEntries = items
    .filter((item) => item.path.startsWith('changelog/'))
    .sort((a, b) => b.title.localeCompare(a.title))
const showcaseItems: SearchItem[] = showcaseData
    .map((item) => ({
        title: item.title,
        description: item.description,
        path: `/showcase/${encodeURIComponent(item.id)}`,
        slug: `showcase-${item.id}`,
        category: item.category,
        keywords: [item.id, item.category, ...item.components],
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
const docsPages = items
    .filter(
        (item) =>
            !item.path.startsWith('components/') &&
            !item.path.startsWith('blog/') &&
            !item.path.startsWith('changelog/')
    )
    .concat(staticPages)
    .sort((a, b) => a.title.localeCompare(b.title))
const getComponentBaseSlug = (slug: string) =>
    slug.replace(/-v2$/, '').replaceAll('-', '')

const v1ComponentBaseSlugs = new Set(
    components
        .filter((item) => !item.slug.endsWith('-v2'))
        .map((item) => getComponentBaseSlug(item.slug))
)

const getComponentTitle = (item: SearchItem) =>
    item.slug.endsWith('-v2') &&
    v1ComponentBaseSlugs.has(getComponentBaseSlug(item.slug))
        ? `${item.title} V2`
        : item.title

const matchesSearch = (item: SearchItem, query: string, title = item.title) => {
    const normalizedQuery = query.toLowerCase()

    return (
        title.toLowerCase().includes(normalizedQuery) ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.path.toLowerCase().includes(normalizedQuery) ||
        item.description?.toLowerCase().includes(normalizedQuery) ||
        item.category?.toLowerCase().includes(normalizedQuery) ||
        item.excerpt?.toLowerCase().includes(normalizedQuery) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        item.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(normalizedQuery)
        )
    )
}

const getSearchRank = (item: SearchItem, query: string, title = item.title) => {
    const normalizedQuery = query.toLowerCase()
    const normalizedTitle = title.toLowerCase()
    const normalizedItemTitle = item.title.toLowerCase()
    const normalizedSlug = item.slug.toLowerCase()
    const normalizedPath = item.path.toLowerCase()

    if (normalizedTitle === normalizedQuery) {
        return 0
    }

    if (normalizedTitle.startsWith(normalizedQuery)) {
        return 1
    }

    if (normalizedItemTitle === normalizedQuery) {
        return 2
    }

    if (normalizedItemTitle.startsWith(normalizedQuery)) {
        return 3
    }

    if (normalizedTitle.includes(normalizedQuery)) {
        return 4
    }

    if (normalizedItemTitle.includes(normalizedQuery)) {
        return 5
    }

    if (
        normalizedSlug === normalizedQuery ||
        normalizedPath.endsWith(`/${normalizedQuery}`) ||
        normalizedPath === normalizedQuery
    ) {
        return 6
    }

    if (
        normalizedSlug.includes(normalizedQuery) ||
        normalizedPath.includes(normalizedQuery)
    ) {
        return 7
    }

    if (item.category?.toLowerCase().includes(normalizedQuery)) {
        return 8
    }

    if (
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        item.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(normalizedQuery)
        )
    ) {
        return 9
    }

    return 10
}

const getRankedSearchResults = (
    sourceItems: SearchItem[],
    query: string,
    getTitle: (item: SearchItem) => string = (item) => item.title
) =>
    sourceItems
        .map((item, index) => ({ item, index, title: getTitle(item) }))
        .filter(({ item, title }) => matchesSearch(item, query, title))
        .sort((a, b) => {
            const rankDiff =
                getSearchRank(a.item, query, a.title) -
                getSearchRank(b.item, query, b.title)

            if (rankDiff !== 0) return rankDiff

            return a.index - b.index
        })
        .map(({ item }) => item)

const sectionHeadingClassName =
    'text-[11px] uppercase text-nav-section-text-foreground px-3 py-3 tracking-wider font-medium'

const commandItemClassName = cn(
    'flex items-center gap-3 py-2 px-3 text-sm cursor-pointer font-manrope',
    'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
    'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
)

const componentItemClassName = cn(
    'flex items-center py-2.5 px-3 text-sm cursor-pointer font-manrope tracking-tight',
    'text-nav-section-text hover:text-foreground hover:bg-sidebar-item-hover',
    'data-[selected=true]:bg-sidebar-item-active data-[selected=true]:text-foreground'
)

export function CommandSearch() {
    const { closeSearch } = useCommandSearch()
    const [query, setQuery] = useState('')
    const listRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const normalizedQuery = query.trim()

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                closeSearch()
                return
            }

            // The command input is the only focusable element in the dialog, so
            // trapping focus is just keeping Tab from moving it back out.
            if (e.key === 'Tab') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [closeSearch])

    useEffect(() => {
        requestAnimationFrame(() => {
            listRef.current?.scrollTo({ top: 0 })
        })
    }, [normalizedQuery])

    const go = (path: string) => {
        router.push(path)
        closeSearch()
    }

    const filteredComponents = normalizedQuery
        ? getRankedSearchResults(components, normalizedQuery, getComponentTitle)
        : components

    const filteredDocsPages = normalizedQuery
        ? getRankedSearchResults(docsPages, normalizedQuery)
        : docsPages

    const filteredBlogs = normalizedQuery
        ? getRankedSearchResults(blogs, normalizedQuery)
        : blogs

    const filteredChangelogEntries = normalizedQuery
        ? getRankedSearchResults(changelogEntries, normalizedQuery)
        : changelogEntries

    const filteredShowcaseItems = normalizedQuery
        ? getRankedSearchResults(showcaseItems, normalizedQuery)
        : showcaseItems

    const hasResults =
        filteredComponents.length > 0 ||
        filteredDocsPages.length > 0 ||
        filteredBlogs.length > 0 ||
        filteredChangelogEntries.length > 0 ||
        filteredShowcaseItems.length > 0

    return (
        <div data-cmd-open className="fixed inset-0 z-150">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/50"
                onClick={closeSearch}
            />
            <Command
                role="dialog"
                aria-modal="true"
                aria-label="Search documentation"
                shouldFilter={false}
                className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-1/2 bg-background border border-border shadow-2xl overflow-hidden rounded-xl"
            >
                <div className="flex items-center border-b border-border px-4">
                    <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground mr-3" />
                    <Command.Input
                        ref={inputRef}
                        value={query}
                        onValueChange={setQuery}
                        placeholder="Search..."
                        className="flex-1 bg-transparent h-12 outline-none text-sm font-manrope"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs font-mono text-muted-foreground rounded border border-border">
                        Esc
                    </kbd>
                </div>

                <Command.List
                    ref={listRef}
                    className="max-h-[40vh] overflow-y-auto py-2"
                >
                    {!hasResults && (
                        <div className="py-4 px-3 text-sm text-muted-foreground">
                            No results found
                        </div>
                    )}

                    {filteredComponents.length > 0 && (
                        <>
                            <div className={sectionHeadingClassName}>
                                Components
                            </div>
                            {filteredComponents.map((item) => {
                                const title = getComponentTitle(item)
                                return (
                                    <Command.Item
                                        key={item.slug}
                                        value={`component-${item.slug}`}
                                        onSelect={() =>
                                            go(
                                                item.path.startsWith('/')
                                                    ? item.path
                                                    : `/docs/${item.path}`
                                            )
                                        }
                                        className={componentItemClassName}
                                    >
                                        {title}
                                    </Command.Item>
                                )
                            })}
                        </>
                    )}

                    {filteredDocsPages.length > 0 && (
                        <>
                            <div className={sectionHeadingClassName}>Pages</div>
                            {filteredDocsPages.map((item) => (
                                <Command.Item
                                    key={item.slug}
                                    value={`page-${item.slug}`}
                                    onSelect={() =>
                                        go(
                                            item.path.startsWith('/')
                                                ? item.path
                                                : `/docs/${item.path}`
                                        )
                                    }
                                    className={commandItemClassName}
                                >
                                    {item.slug === 'home' ? (
                                        <HouseSimpleIcon className="w-4 h-4 text-muted-foreground" />
                                    ) : item.slug === 'changelog' ? (
                                        <GitDiffIcon className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                        <FileIcon className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    {item.title}
                                </Command.Item>
                            ))}
                        </>
                    )}

                    {filteredBlogs.length > 0 && (
                        <>
                            <div className={sectionHeadingClassName}>
                                Blog Posts
                            </div>
                            {filteredBlogs.map((item) => (
                                <Command.Item
                                    key={item.slug}
                                    value={`blog-${item.slug}`}
                                    onSelect={() => go(`/${item.path}`)}
                                    className={commandItemClassName}
                                >
                                    <FileIcon className="w-4 h-4 text-muted-foreground" />
                                    {item.title}
                                </Command.Item>
                            ))}
                        </>
                    )}

                    {filteredChangelogEntries.length > 0 && (
                        <>
                            <div className={sectionHeadingClassName}>
                                Changelog
                            </div>
                            {filteredChangelogEntries.map((item) => (
                                <Command.Item
                                    key={item.slug}
                                    value={`changelog-${item.slug}`}
                                    onSelect={() => go('/changelog')}
                                    className={commandItemClassName}
                                >
                                    <GitDiffIcon className="w-4 h-4 text-muted-foreground" />
                                    {item.title}
                                </Command.Item>
                            ))}
                        </>
                    )}

                    {filteredShowcaseItems.length > 0 && (
                        <>
                            <div className={sectionHeadingClassName}>
                                Showcase
                            </div>
                            {filteredShowcaseItems.map((item) => (
                                <Command.Item
                                    key={item.slug}
                                    value={`showcase-${item.slug}`}
                                    onSelect={() => go(item.path)}
                                    className={commandItemClassName}
                                >
                                    <FileIcon className="w-4 h-4 text-muted-foreground" />
                                    {item.title}
                                </Command.Item>
                            ))}
                        </>
                    )}
                </Command.List>

                <div className="border-t border-border px-4 py-3 bg-surface font-manrope">
                    <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground">
                        <span>↑ ↓ navigate</span>
                        <span>↵ select</span>
                    </div>
                </div>
            </Command>
        </div>
    )
}

export default CommandSearch
