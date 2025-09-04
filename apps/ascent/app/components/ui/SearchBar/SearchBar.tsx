'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Drawer } from 'vaul'
import { SearchResult } from '@/docs/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to save recent search:', error)
    }
}

const removeRecentSearch = (pathToRemove: string): RecentSearch[] => {
    if (typeof window === 'undefined') return []
    try {
        const recent = getRecentSearches()
        const updated = recent.filter(
            (item) => item.result.path !== pathToRemove
        )
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
        return updated
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to remove recent search:', error)
        return getRecentSearches()
    }
}

const SearchBar: React.FC<SearchBarProps> = ({ searchIndex }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [, setIsSearching] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])

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

    const performSearch = useCallback(
        async (searchQuery: string) => {
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
                        result.tags?.some((tag) =>
                            tag.toLowerCase().includes(term)
                        )
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
        },
        [searchIndex]
    )

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(query)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query, performSearch])

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
            const recent = getRecentSearches()
            setRecentSearches(recent)
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
                        setRecentSearches={setRecentSearches}
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
    setRecentSearches,
}: {
    query: string
    setQuery: (query: string) => void
    results: SearchResult[]
    setIsOpen: (isOpen: boolean) => void
    handleResultClick: (result?: SearchResult) => void
    recentSearches: RecentSearch[]
    setRecentSearches: (searches: RecentSearch[]) => void
}) => {
    const [mounted, setMounted] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [activeTab, setActiveTab] = useState<'recent' | 'quick'>('recent')
    const [isDarkMode, setIsDarkMode] = useState(false)
    const router = useRouter()

    const handleRemoveRecentSearch = (
        e: React.MouseEvent,
        pathToRemove: string
    ) => {
        e.stopPropagation() // Prevent triggering the navigation
        const updatedSearches = removeRecentSearch(pathToRemove)
        setRecentSearches(updatedSearches)
    }

    // Detect theme changes
    useEffect(() => {
        const detectTheme = () => {
            const isDark =
                document.documentElement.classList.contains('dark') ||
                document.body.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches
            setIsDarkMode(isDark)
        }

        detectTheme()

        // Listen for theme changes
        const observer = new MutationObserver(detectTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        })

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', detectTheme)

        return () => {
            observer.disconnect()
            mediaQuery.removeEventListener('change', detectTheme)
        }
    }, [])

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
                        ? activeTab === 'recent'
                            ? recentSearches.length - 1
                            : 5
                        : 5
                    : results.length - 1
                setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                const maxIndex = !query.trim()
                    ? recentSearches.length > 0
                        ? activeTab === 'recent'
                            ? recentSearches.length - 1
                            : 5
                        : 5
                    : results.length - 1
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault()
                if (!query.trim()) {
                    if (recentSearches.length > 0) {
                        if (activeTab === 'recent') {
                            // Recent searches tab
                            router.push(
                                `/docs/${recentSearches[selectedIndex].result.path}`
                            )
                            setIsOpen(false)
                        } else {
                            // Quick access tab
                            const quickAccessItems = [
                                'components/button',
                                'components/alert',
                                'components/modal',
                                'components/input',
                                'components/avatar',
                                'components/card',
                            ]
                            router.push(
                                `/docs/${quickAccessItems[selectedIndex]}`
                            )
                            setIsOpen(false)
                        }
                    } else {
                        // No recent searches - quick access only
                        const quickAccessItems = [
                            'components/button',
                            'components/alert',
                            'components/modal',
                            'components/input',
                            'components/avatar',
                            'components/card',
                        ]
                        router.push(`/docs/${quickAccessItems[selectedIndex]}`)
                        setIsOpen(false)
                    }
                } else if (results[selectedIndex]) {
                    // Search results
                    handleResultClick(results[selectedIndex])
                    router.push(`/docs/${results[selectedIndex].path}`)
                    setIsOpen(false)
                }
            } else if (
                e.key === 'ArrowLeft' &&
                !query.trim() &&
                recentSearches.length > 0
            ) {
                e.preventDefault()
                setActiveTab('recent')
                setSelectedIndex(-1)
            } else if (
                e.key === 'ArrowRight' &&
                !query.trim() &&
                recentSearches.length > 0
            ) {
                e.preventDefault()
                setActiveTab('quick')
                setSelectedIndex(-1)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [
        selectedIndex,
        query,
        results,
        handleResultClick,
        recentSearches,
        activeTab,
        router,
        setIsOpen,
    ])

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
                        // Default state - Tabbed interface when recent searches exist, otherwise Quick Access
                        <div>
                            {recentSearches.length > 0 ? (
                                // Tabbed interface when recent searches exist
                                <div>
                                    {/* Tab Headers */}
                                    <div className="relative flex bg-[var(--sidebar-background)] border-b border-[var(--border)]">
                                        <button
                                            onClick={() =>
                                                setActiveTab('recent')
                                            }
                                            className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                                                activeTab === 'recent'
                                                    ? `text-[var(--foreground)] bg-[var(--background)] border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`
                                                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={`transition-all duration-200 ${
                                                        activeTab === 'recent'
                                                            ? isDarkMode
                                                                ? 'text-white'
                                                                : 'text-black'
                                                            : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'
                                                    }`}
                                                >
                                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                                    <path d="M3 3v5h5" />
                                                    <path d="M12 7v5l4 2" />
                                                </svg>
                                                <span>Recent</span>
                                                {recentSearches.length > 0 && (
                                                    <span
                                                        className={`ml-1 px-1.5 py-0.5 text-xs rounded-full transition-all duration-200 ${
                                                            activeTab ===
                                                            'recent'
                                                                ? isDarkMode
                                                                    ? 'bg-white text-black'
                                                                    : 'bg-black text-white'
                                                                : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                                                        }`}
                                                    >
                                                        {recentSearches.length}
                                                    </span>
                                                )}
                                            </div>
                                        </button>

                                        <button
                                            onClick={() =>
                                                setActiveTab('quick')
                                            }
                                            className={`relative flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                                                activeTab === 'quick'
                                                    ? `text-[var(--foreground)] bg-[var(--background)] border-b-2 ${isDarkMode ? 'border-white' : 'border-black'}`
                                                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={`transition-all duration-200 ${
                                                        activeTab === 'quick'
                                                            ? isDarkMode
                                                                ? 'text-white'
                                                                : 'text-black'
                                                            : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'
                                                    }`}
                                                >
                                                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                                                </svg>
                                                <span>Quick Access</span>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="p-4">
                                        <div className="space-y-1 min-h-[280px]">
                                            {activeTab === 'recent'
                                                ? // Recent Searches Tab
                                                  recentSearches.map(
                                                      (recent, index) => (
                                                          <div
                                                              key={`${recent.result.path}-${recent.timestamp}`}
                                                              onClick={() => {
                                                                  router.push(
                                                                      `/docs/${recent.result.path}`
                                                                  )
                                                                  handleResultClick()
                                                              }}
                                                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                                                  selectedIndex ===
                                                                  index
                                                                      ? 'bg-[var(--sidebar-item-hover)]'
                                                                      : 'hover:bg-[var(--sidebar-item-hover)]'
                                                              }`}
                                                          >
                                                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--sidebar-background)] flex items-center justify-center">
                                                                  <svg
                                                                      width="14"
                                                                      height="14"
                                                                      viewBox="0 0 24 24"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      strokeWidth="2"
                                                                      className="text-[var(--muted-foreground)]"
                                                                  >
                                                                      <circle
                                                                          cx="12"
                                                                          cy="12"
                                                                          r="3"
                                                                      />
                                                                      <path d="M12 1v6m0 6v6" />
                                                                      <path d="m21 12-6-6-6 6" />
                                                                  </svg>
                                                              </div>
                                                              <div className="flex-1 min-w-0">
                                                                  <div className="font-semibold text-sm text-[var(--foreground)]">
                                                                      {
                                                                          recent
                                                                              .result
                                                                              .title
                                                                      }
                                                                  </div>
                                                                  <div className="text-xs truncate text-[var(--muted-foreground)]">
                                                                      Searched
                                                                      for "
                                                                      {
                                                                          recent.query
                                                                      }
                                                                      "
                                                                  </div>
                                                              </div>
                                                              <div className="flex items-center gap-1">
                                                                  <button
                                                                      onClick={(
                                                                          e
                                                                      ) =>
                                                                          handleRemoveRecentSearch(
                                                                              e,
                                                                              recent
                                                                                  .result
                                                                                  .path
                                                                          )
                                                                      }
                                                                      className="p-1 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] opacity-0 group-hover:opacity-100 transition-all duration-200"
                                                                      aria-label="Remove from recent searches"
                                                                  >
                                                                      <svg
                                                                          width="12"
                                                                          height="12"
                                                                          viewBox="0 0 24 24"
                                                                          fill="none"
                                                                          stroke="currentColor"
                                                                          strokeWidth="2"
                                                                      >
                                                                          <path d="m18 6-12 12" />
                                                                          <path d="m6 6 12 12" />
                                                                      </svg>
                                                                  </button>
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
                                                          </div>
                                                      )
                                                  )
                                                : // Quick Access Tab
                                                  [
                                                      {
                                                          title: 'Button',
                                                          description:
                                                              'Interactive button component',
                                                          path: 'components/button',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <rect
                                                                      x="3"
                                                                      y="8"
                                                                      width="18"
                                                                      height="8"
                                                                      rx="2"
                                                                  />
                                                              </svg>
                                                          ),
                                                      },
                                                      {
                                                          title: 'Alert',
                                                          description:
                                                              'Display important messages',
                                                          path: 'components/alert',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                                                  <path d="M12 9v4" />
                                                                  <path d="m12 17 .01 0" />
                                                              </svg>
                                                          ),
                                                      },
                                                      {
                                                          title: 'Modal',
                                                          description:
                                                              'Overlay dialog component',
                                                          path: 'components/modal',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <rect
                                                                      x="3"
                                                                      y="3"
                                                                      width="18"
                                                                      height="18"
                                                                      rx="2"
                                                                  />
                                                                  <rect
                                                                      x="7"
                                                                      y="7"
                                                                      width="10"
                                                                      height="10"
                                                                      rx="1"
                                                                  />
                                                              </svg>
                                                          ),
                                                      },
                                                      {
                                                          title: 'Input',
                                                          description:
                                                              'Text input field component',
                                                          path: 'components/input',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <rect
                                                                      x="2"
                                                                      y="6"
                                                                      width="20"
                                                                      height="12"
                                                                      rx="2"
                                                                  />
                                                                  <circle
                                                                      cx="8"
                                                                      cy="12"
                                                                      r="2"
                                                                  />
                                                                  <path d="m16 10-2 2 2 2" />
                                                              </svg>
                                                          ),
                                                      },
                                                      {
                                                          title: 'Avatar',
                                                          description:
                                                              'User profile image component',
                                                          path: 'components/avatar',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                                  <circle
                                                                      cx="12"
                                                                      cy="7"
                                                                      r="4"
                                                                  />
                                                              </svg>
                                                          ),
                                                      },
                                                      {
                                                          title: 'Card',
                                                          description:
                                                              'Content container component',
                                                          path: 'components/card',
                                                          icon: (
                                                              <svg
                                                                  width="14"
                                                                  height="14"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                              >
                                                                  <rect
                                                                      x="2"
                                                                      y="4"
                                                                      width="20"
                                                                      height="16"
                                                                      rx="2"
                                                                  />
                                                                  <path d="M7 15h0M7 11h0M7 7h7" />
                                                              </svg>
                                                          ),
                                                      },
                                                  ].map((item, index) => (
                                                      <div
                                                          key={index}
                                                          onClick={() => {
                                                              router.push(
                                                                  `/docs/${item.path}`
                                                              )
                                                              handleResultClick()
                                                          }}
                                                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                                              selectedIndex ===
                                                              index
                                                                  ? 'bg-[var(--sidebar-item-hover)]'
                                                                  : 'hover:bg-[var(--sidebar-item-hover)]'
                                                          }`}
                                                      >
                                                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--sidebar-background)] flex items-center justify-center text-[var(--muted-foreground)]">
                                                              {item.icon}
                                                          </div>
                                                          <div className="flex-1 min-w-0">
                                                              <div className="font-semibold text-sm text-[var(--foreground)]">
                                                                  {item.title}
                                                              </div>
                                                              <div className="text-xs truncate text-[var(--muted-foreground)]">
                                                                  {
                                                                      item.description
                                                                  }
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
                                </div>
                            ) : (
                                // No recent searches - show Quick Access only
                                <div className="p-4">
                                    <div className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-3 px-1">
                                        Quick Access
                                    </div>
                                    <div className="space-y-1">
                                        {[
                                            {
                                                title: 'Button',
                                                description:
                                                    'Interactive button component',
                                                path: 'components/button',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <rect
                                                            x="3"
                                                            y="8"
                                                            width="18"
                                                            height="8"
                                                            rx="2"
                                                        />
                                                    </svg>
                                                ),
                                            },
                                            {
                                                title: 'Alert',
                                                description:
                                                    'Display important messages',
                                                path: 'components/alert',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                                        <path d="M12 9v4" />
                                                        <path d="m12 17 .01 0" />
                                                    </svg>
                                                ),
                                            },
                                            {
                                                title: 'Modal',
                                                description:
                                                    'Overlay dialog component',
                                                path: 'components/modal',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <rect
                                                            x="3"
                                                            y="3"
                                                            width="18"
                                                            height="18"
                                                            rx="2"
                                                        />
                                                        <rect
                                                            x="7"
                                                            y="7"
                                                            width="10"
                                                            height="10"
                                                            rx="1"
                                                        />
                                                    </svg>
                                                ),
                                            },
                                            {
                                                title: 'Input',
                                                description:
                                                    'Text input field component',
                                                path: 'components/input',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="6"
                                                            width="20"
                                                            height="12"
                                                            rx="2"
                                                        />
                                                        <circle
                                                            cx="8"
                                                            cy="12"
                                                            r="2"
                                                        />
                                                        <path d="m16 10-2 2 2 2" />
                                                    </svg>
                                                ),
                                            },
                                            {
                                                title: 'Avatar',
                                                description:
                                                    'User profile image component',
                                                path: 'components/avatar',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle
                                                            cx="12"
                                                            cy="7"
                                                            r="4"
                                                        />
                                                    </svg>
                                                ),
                                            },
                                            {
                                                title: 'Card',
                                                description:
                                                    'Content container component',
                                                path: 'components/card',
                                                icon: (
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="4"
                                                            width="20"
                                                            height="16"
                                                            rx="2"
                                                        />
                                                        <path d="M7 15h0M7 11h0M7 7h7" />
                                                    </svg>
                                                ),
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    router.push(
                                                        `/docs/${item.path}`
                                                    )
                                                    handleResultClick()
                                                }}
                                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${
                                                    selectedIndex === index
                                                        ? 'bg-[var(--sidebar-item-hover)]'
                                                        : 'hover:bg-[var(--sidebar-item-hover)]'
                                                }`}
                                            >
                                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--sidebar-background)] flex items-center justify-center text-[var(--muted-foreground)]">
                                                    {item.icon}
                                                </div>
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
                            )}
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
                                            // eslint-disable-next-line no-console
                                            console.log(
                                                'Search result clicked:',
                                                result
                                            )
                                            handleResultClick(result)
                                            router.push(`/docs/${result.path}`)
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

export default SearchBar
