'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
import { useNavigation } from './GlobalKeyboardNavigation'

interface SearchBarProps {
    searchIndex: { [key: string]: SearchResult }
}

interface RecentSearch {
    query: string
    result: SearchResult
    timestamp: number
}

// Recent searches utilities
const RECENT_SEARCHES_KEY = 'blend-docs-recent-searches'
const MAX_RECENT_SEARCHES = 6

const getRecentSearches = (): RecentSearch[] => {
    if (typeof window === 'undefined') return []
    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const saveRecentSearch = (query: string, result: SearchResult) => {
    if (typeof window === 'undefined') return
    try {
        const recent = getRecentSearches()
        const newSearch: RecentSearch = {
            query: query.trim(),
            result,
            timestamp: Date.now(),
        }

        // Remove duplicates (same result path)
        const filtered = recent.filter(
            (item) => item.result.path !== result.path
        )

        // Add new search at the beginning
        const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)

        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
    } catch {
        // Silently fail if localStorage is not available
    }
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIndex }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [, setIsSearching] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])

    // Get navigation context if available (for global keyboard navigation)
    let navigation: any = null
    try {
        navigation = useNavigation()
    } catch {
        // Navigation context not available, continue without it
    }

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
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                setIsOpen(false)
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

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

    // Load recent searches when modal opens
    useEffect(() => {
        if (isOpen) {
            setRecentSearches(getRecentSearches())
        }
    }, [isOpen])

    const handleResultClick = (result?: SearchResult) => {
        // Save to recent searches if it's a search result
        if (result && query.trim()) {
            saveRecentSearch(query, result)
            setRecentSearches(getRecentSearches()) // Update the state
        }
        setIsOpen(false)
        setQuery('')
    }

    const handleSearchTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
        }
    }

    return (
        <div className="relative">
            <button
                data-slot="dialog-trigger"
                className="inline-flex items-center gap-3 w-full h-9 px-3 py-2 bg-[var(--sidebar-background)] border border-[var(--border)] rounded-lg text-sm text-[var(--muted-foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 cursor-pointer"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
                onClick={() => setIsOpen(true)}
                onKeyDown={handleSearchTriggerKeyDown}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--muted-foreground)]"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="flex-1 text-left">
                    Search documentation...
                </span>
                <div className="hidden sm:flex gap-1">
                    <kbd className="bg-[var(--background)] text-[var(--muted-foreground)] pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--border)] px-1.5 font-sans text-[0.7rem] font-medium select-none">
                        ⌘
                    </kbd>
                    <kbd className="bg-[var(--background)] text-[var(--muted-foreground)] pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--border)] px-1.5 font-sans text-[0.7rem] font-medium select-none">
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
                        recentSearches={recentSearches}
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
                    <Drawer.Content className="h-[70vh] bg-[var(--background)] fixed bottom-0 left-0 right-0 outline-none flex flex-col rounded-t-2xl border-t border-[var(--border)]">
                        <Drawer.Title className="text-sm font-medium text-[var(--foreground)] hidden">
                            Search
                        </Drawer.Title>
                        <Drawer.Description className="text-sm font-medium text-[var(--foreground)] hidden">
                            Search
                        </Drawer.Description>
                        <div className="sticky top-0 left-0 right-0">
                            <Drawer.Handle className="h-10 w-full bg-gray-400 dark:bg-gray-600 my-4 rounded-t-xl cursor-grab" />
                            <input
                                type="text"
                                placeholder="Search components, styles, tokens..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="bg-transparent focus:outline-none w-full text-base px-4 py-2 text-[var(--foreground)] border-b border-[var(--border)]"
                            />
                        </div>
                        <div className="overflow-y-auto flex-1 p-4 space-y-6 text-[var(--foreground)]">
                            {results.map((result) => (
                                <div key={result.slug}>
                                    <Link
                                        onClick={() => {
                                            setOpen(false)
                                            setQuery('')
                                        }}
                                        href={`/docs/${result.path}`}
                                        className="flex flex-col items-start gap-2 rounded-xl p-4 bg-[var(--sidebar-background)] border border-[var(--border)] w-full text-left hover:bg-[var(--sidebar-item-hover)] transition-colors"
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
    recentSearches,
}: {
    query: string
    setQuery: (query: string) => void
    results: SearchResult[]
    setIsOpen: (isOpen: boolean) => void
    handleResultClick: (result?: SearchResult) => void
    recentSearches: RecentSearch[]
}) => {
    const [mounted, setMounted] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        setMounted(true)
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    useEffect(() => {
        if (query.trim()) {
            setIsSearching(true)
            const timer = setTimeout(() => setIsSearching(false), 300)
            return () => clearTimeout(timer)
        } else {
            setIsSearching(false)
        }
    }, [query])

    // Reset selected index when results change
    useEffect(() => {
        setSelectedIndex(-1)
    }, [results])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                const maxIndex = !query.trim()
                    ? recentSearches.length > 0
                        ? recentSearches.length - 1
                        : 5
                    : results.length - 1
                setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                const maxIndex = !query.trim()
                    ? recentSearches.length > 0
                        ? recentSearches.length - 1
                        : 5
                    : results.length - 1
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault()
                if (!query.trim()) {
                    if (recentSearches.length > 0) {
                        // Recent searches
                        window.location.href = `/docs/${recentSearches[selectedIndex].result.path}`
                    } else {
                        // Quick access items
                        const quickAccessItems = [
                            'components/button',
                            'components/alert',
                            'components/modal',
                            'components/input',
                            'components/avatar',
                            'components/card',
                        ]
                        window.location.href = `/docs/${quickAccessItems[selectedIndex]}`
                    }
                } else if (results[selectedIndex]) {
                    // Search results
                    window.location.href = `/docs/${results[selectedIndex].path}`
                }
                handleResultClick()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedIndex, query, results, handleResultClick, recentSearches])

    if (!mounted) return null

    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsOpen(false)
                }
            }}
        >
            <div
                className="w-[600px] max-w-[90vw] bg-[var(--background)] border border-[var(--border)] shadow-2xl max-h-[70vh] rounded-2xl overflow-hidden mx-4"
                onClick={(e) => e.stopPropagation()}
                style={{
                    transform: 'translateY(0)',
                    animation: 'fadeIn 0.2s ease-out',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Header */}
                <div className="border-b border-[var(--border)] px-4 py-3">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {isSearching ? (
                                <div className="animate-spin h-4 w-4 border-2 border-[var(--muted-foreground)] border-t-[var(--accent)] rounded-full"></div>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[var(--muted-foreground)]"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-14 py-2 text-sm bg-transparent border-none outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] placeholder:font-normal font-medium"
                            autoFocus
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-[var(--muted-foreground)] bg-[var(--background)] border border-[var(--border)] rounded">
                                ESC
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-h-[50vh] overflow-y-auto">
                    {!query.trim() ? (
                        // Default state - Recent Searches or Quick Access
                        <div className="p-4">
                            <div className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-1">
                                {recentSearches.length > 0
                                    ? 'Recent Searches'
                                    : 'Quick Access'}
                            </div>
                            <div className="space-y-1">
                                {recentSearches.length > 0
                                    ? // Show recent searches
                                      recentSearches.map((recent, index) => (
                                          <div
                                              key={`${recent.result.path}-${recent.timestamp}`}
                                              onClick={() => {
                                                  window.location.href = `/docs/${recent.result.path}`
                                                  handleResultClick()
                                              }}
                                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                                  selectedIndex === index
                                                      ? 'bg-[var(--sidebar-item-hover)]'
                                                      : 'hover:bg-[var(--sidebar-item-hover)]'
                                              }`}
                                          >
                                              <div className="flex-1 min-w-0">
                                                  <div className="font-semibold text-sm text-[var(--foreground)]">
                                                      {recent.result.title}
                                                  </div>
                                                  <div className="text-xs truncate text-[var(--muted-foreground)]">
                                                      Searched for "
                                                      {recent.query}"
                                                  </div>
                                              </div>
                                              <svg
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  className="text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
                                              >
                                                  <path d="m9 18 6-6-6-6" />
                                              </svg>
                                          </div>
                                      ))
                                    : // Fallback to quick access when no recent searches
                                      [
                                          {
                                              title: 'Button',
                                              description:
                                                  'Interactive button component',
                                              path: 'components/button',
                                          },
                                          {
                                              title: 'Alert',
                                              description:
                                                  'Display important messages',
                                              path: 'components/alert',
                                          },
                                          {
                                              title: 'Modal',
                                              description:
                                                  'Overlay dialog component',
                                              path: 'components/modal',
                                          },
                                          {
                                              title: 'Input',
                                              description:
                                                  'Text input field component',
                                              path: 'components/input',
                                          },
                                          {
                                              title: 'Avatar',
                                              description:
                                                  'User profile image component',
                                              path: 'components/avatar',
                                          },
                                          {
                                              title: 'Card',
                                              description:
                                                  'Content container component',
                                              path: 'components/card',
                                          },
                                      ].map((item, index) => (
                                          <div
                                              key={index}
                                              onClick={() => {
                                                  window.location.href = `/docs/${item.path}`
                                                  handleResultClick()
                                              }}
                                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                                  selectedIndex === index
                                                      ? 'bg-[var(--sidebar-item-hover)]'
                                                      : 'hover:bg-[var(--sidebar-item-hover)]'
                                              }`}
                                          >
                                              <div className="flex-1 min-w-0">
                                                  <div className="font-semibold text-sm text-[var(--foreground)]">
                                                      {item.title}
                                                  </div>
                                                  <div className="text-xs truncate text-[var(--muted-foreground)]">
                                                      {item.description}
                                                  </div>
                                              </div>
                                              <svg
                                                  width="14"
                                                  height="14"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  className="text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
                                              >
                                                  <path d="m9 18 6-6-6-6" />
                                              </svg>
                                          </div>
                                      ))}
                            </div>
                        </div>
                    ) : results.length === 0 ? (
                        // No results state
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--sidebar-background)] flex items-center justify-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-[var(--muted-foreground)]"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                                No results found
                            </h3>
                            <p className="text-xs text-[var(--muted-foreground)]">
                                Try searching for components, guides, or tokens
                            </p>
                        </div>
                    ) : (
                        // Results state
                        <div className="p-3">
                            <div className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-1">
                                {results.length} result
                                {results.length !== 1 ? 's' : ''}
                            </div>
                            <div className="space-y-1">
                                {results.map((result, index) => (
                                    <div
                                        key={result.slug}
                                        onClick={() => {
                                            window.location.href = `/docs/${result.path}`
                                            handleResultClick(result)
                                        }}
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                            selectedIndex === index
                                                ? 'bg-[var(--sidebar-item-hover)]'
                                                : 'hover:bg-[var(--sidebar-item-hover)]'
                                        }`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm text-[var(--foreground)]">
                                                {result.title}
                                            </div>
                                            {result.description && (
                                                <div className="text-xs truncate text-[var(--muted-foreground)]">
                                                    {result.description}
                                                </div>
                                            )}
                                            <div className="text-xs mt-0.5 text-[var(--muted-foreground)] opacity-70">
                                                {result.path}
                                            </div>
                                        </div>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--border)] px-4 py-3 bg-[var(--sidebar-background)]">
                    <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-1.5 py-0.5 text-xs font-medium bg-[var(--background)] border border-[var(--border)] rounded">
                                    ↑
                                </kbd>
                                <kbd className="px-1.5 py-0.5 text-xs font-medium bg-[var(--background)] border border-[var(--border)] rounded">
                                    ↓
                                </kbd>
                                <span>navigate</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-1.5 py-0.5 text-xs font-medium bg-[var(--background)] border border-[var(--border)] rounded">
                                    ↵
                                </kbd>
                                <span>select</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-1.5 py-0.5 text-xs font-medium bg-[var(--background)] border border-[var(--border)] rounded">
                                ESC
                            </kbd>
                            <span>close</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
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
    ]
    return (
        <div className="flex flex-col items-start rounded-xl cursor-pointer gap-2">
            {suggestions.map((suggestion, index) => (
                <Link
                    key={`${suggestion.link}-${index}`}
                    href={suggestion.link}
                    className="flex flex-col items-start font-medium gap-2 hover:bg-[var(--sidebar-item-hover)] rounded-xl p-4 cursor-pointer w-full text-left text-[var(--foreground)]"
                >
                    {suggestion.title}
                </Link>
            ))}
        </div>
    )
}

export default SearchBar
