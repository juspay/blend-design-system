'use client'

import React, { useState, useEffect } from 'react'
import { Drawer } from 'vaul'
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
} from 'cmdk'
import { SearchResult } from '../docs/utils/searchContent'
import Link from 'next/link'

interface SearchBarProps {
    searchIndex: { [key: string]: SearchResult }
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIndex }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [, setIsSearching] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.innerWidth)

        let timeoutId: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                setWindowWidth(window.innerWidth)
            }, 100) // Debounce resize events
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(timeoutId)
        }
    }, [])

    useEffect(() => {
        const closeSearchOnEscape = () => {
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault()
                    setIsOpen(false)
                }
            })
        }

        closeSearchOnEscape()

        return () => {
            window.removeEventListener('keydown', closeSearchOnEscape)
        }
    }, [])

    const performSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([])
            return
        }

        setIsSearching(true)

        const searchTerms = searchQuery.toLowerCase().split(/\s+/)
        const searchResults: Array<SearchResult & { score: number }> = []

        for (const [, result] of Object.entries(searchIndex)) {
            if (result.category !== 'components') {
                continue
            }

            let score = 0
            const searchableText = [
                result.title,
                result.description,
                ...(result.tags || []),
            ]
                .join(' ')
                .toLowerCase()

            for (const term of searchTerms) {
                if (result.title.toLowerCase().includes(term)) {
                    score += 10
                }
                if (result.description?.toLowerCase().includes(term)) {
                    score += 8
                }
                if (
                    result.tags?.some((tag) => tag.toLowerCase().includes(term))
                ) {
                    score += 6
                }
                if (searchableText.includes(term)) {
                    score += 2
                }
            }

            if (score > 0) {
                searchResults.push({ ...result, score })
            }
        }

        const sortedResults = searchResults
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(({ ...result }) => result)

        setResults(sortedResults)
        setIsSearching(false)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(query)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            const modal = document.querySelector('[cmdk-dialog]')
            if (modal && !modal.contains(target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const handleResultClick = () => {
        setIsOpen(false)
        setQuery('')
    }
    return (
        <div className="relative">
            <button
                data-slot="dialog-trigger"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-secondary/80 px-4 py-2 bg-[var(--surface)] relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64 cursor-pointer"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
                onClick={() => setIsOpen(true)}
            >
                <span className="hidden lg:inline-flex">
                    Search documentation...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
                    <kbd className="bg-[var(--background)] text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--code-border)] px-1 font-sans text-[0.7rem] font-medium select-none">
                        ⌘
                    </kbd>
                    <kbd className="bg-[var(--background)] text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--code-border)] px-1 font-sans text-[0.7rem] font-medium select-none">
                        K
                    </kbd>
                </div>
            </button>

            {isOpen &&
                (windowWidth > 850 ? (
                    <DesktopSearch
                        query={query}
                        setQuery={setQuery}
                        results={results}
                        setIsOpen={setIsOpen}
                        handleResultClick={handleResultClick}
                    />
                ) : (
                    <MobileSearch
                        open={isOpen}
                        setOpen={setIsOpen}
                        query={query}
                        setQuery={setQuery}
                        results={results}
                    />
                ))}
        </div>
    )
}

const MobileSearch = ({
    open,
    setOpen,
    query,
    setQuery,
    results,
}: {
    open: boolean
    setOpen: (open: boolean) => void
    query: string
    setQuery: (query: string) => void
    results: SearchResult[]
}) => {
    return (
        <>
            <Drawer.Root open={open} onOpenChange={setOpen}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="h-[70vh] bg-[var(--code-background)] fixed bottom-0 left-0 right-0 outline-none flex flex-col rounded-t-2xl">
                        <Drawer.Title className="text-sm font-medium text-[var(--code-foreground)] hidden">
                            Search
                        </Drawer.Title>
                        <Drawer.Description className="text-sm font-medium text-[var(--code-foreground)] hidden">
                            Search
                        </Drawer.Description>
                        <div className="sticky top-0 left-0 right-0">
                            <Drawer.Handle className="h-10 w-full bg-gray-400 dark:bg-gray-600 my-4 rounded-t-xl cursor-grab" />
                            <input
                                type="text"
                                placeholder="Search components, styles, tokens..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="bg-transparent focus:outline-none w-full text-base px-4 py-2 text-[var(--code-foreground)] border-b border-[var(--code-border)]"
                            />
                        </div>
                        <div className="overflow-y-auto flex-1 p-4 space-y-6 text-[var(--code-foreground)]">
                            {results.map((result) => (
                                <div key={result.slug}>
                                    <Link
                                        onClick={() => {
                                            setOpen(false)
                                            setQuery('')
                                        }}
                                        href={`/docs/${result.path}`}
                                        className="flex flex-col items-start gap-2 rounded-xl p-4 bg-[var(--surface)] outline outline-[var(--code-border)] w-full text-left"
                                    >
                                        <span className="text-sm font-medium">
                                            {result.title}
                                        </span>
                                        <span className="text-xs text-[var(--muted-foreground)]">
                                            {result.description}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </>
    )
}

const DesktopSearch = ({
    query,
    setQuery,
    results,
    setIsOpen,
    handleResultClick,
}: {
    query: string
    setQuery: (query: string) => void
    results: SearchResult[]
    setIsOpen: (isOpen: boolean) => void
    handleResultClick: () => void
}) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/40"
            onClick={() => setIsOpen(false)}
        >
            <Command
                loop
                className="fixed min-w-110 w-[800px] min-h-120 mt-1 bg-zinc-50 border flex flex-col gap-4 border-gray-200  shadow-lg max-h-96 overflow-y-auto p-4 rounded-2xl"
            >
                <CommandInput
                    placeholder="Search components, styles, tokens..."
                    value={query}
                    onValueChange={(value) => setQuery(value)}
                    className="bg-transparent focus:outline-none w-full text-base rounded-md px-2 py-1"
                />

                <CommandList className="h-full flex-1 overflow-y-auto">
                    {results.length === 0 && (
                        <CommandEmpty className="h-full flex-1">
                            <SearchSuggestion />
                        </CommandEmpty>
                    )}
                    {results.map((result) => (
                        <CommandItem
                            key={result.slug}
                            value={`${result.title} ${result.description || ''} ${result.path}`}
                            onSelect={() => {
                                window.location.href = `/docs/${result.path}`
                                handleResultClick()
                            }}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-md"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 truncate">
                                        {result.title}
                                    </div>
                                    {result.description && (
                                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            {result.description}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-400 mt-1">
                                        {result.path}
                                    </div>
                                </div>
                            </div>
                        </CommandItem>
                    ))}
                </CommandList>
            </Command>
        </div>
    )
}

const SearchSuggestion = () => {
    const suggestions = [
        {
            title: 'Button',
            description: 'A button component',
            link: '/docs/components/button',
        },
        {
            title: 'Input',
            description: 'A input component',
            link: '/docs/components/input',
        },
        {
            title: 'Alert',
            description: 'A alert component',
            link: '/docs/components/alert',
        },
        {
            title: 'Modal',
            description: 'A modal component',
            link: '/docs/components/modal',
        },
        {
            title: 'Avatar',
            description: 'A avatar component',
            link: '/docs/components/avatar',
        },
        {
            title: 'Card',
            description: 'A card component',
            link: '/docs/components/card',
        },
        {
            title: 'Card',
            description: 'A card component',
            link: '/docs/components/card',
        },
        {
            title: 'Card',
            description: 'A card component',
            link: '/docs/components/card',
        },
    ]
    return (
        <div className="flex flex-col items-start  rounded-xl cursor-pointer gap-2">
            {suggestions.map((suggestion, index) => (
                <Link
                    key={`${suggestion.link}-${index}`}
                    href={suggestion.link}
                    className="flex flex-col items-start font-medium gap-2 hover:bg-zinc-100 rounded-xl p-4 cursor-pointer w-full text-left"
                >
                    {suggestion.title}
                </Link>
            ))}
        </div>
    )
}

export default SearchBar
