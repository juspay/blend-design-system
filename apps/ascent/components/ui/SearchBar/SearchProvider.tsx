'use client'

import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { SearchResult } from '@/docs/utils'

const SearchProvider: React.FC = () => {
    const [searchIndex, setSearchIndex] = useState<{
        [key: string]: SearchResult
    }>({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSearchIndex = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/search-index.json')

                if (!response.ok) {
                    throw new Error('Failed to fetch search index')
                }

                const data = await response.json()
                setSearchIndex(data)
            } catch (err) {
                // Error fetching search index - handled by error state
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSearchIndex()
    }, [])

    if (isLoading) {
        return (
            <button
                className="inline-flex items-center gap-3 w-full h-9 px-3 py-2 bg-[var(--sidebar-background)] border border-[var(--border)] rounded-lg text-sm text-[var(--muted-foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 cursor-pointer"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
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
                <span className="flex-1 text-left sm:block hidden">
                    Search documentation
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
        )
    }

    if (error) {
        return (
            <div className="relative w-full">
                <div className="relative">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)]"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search unavailable"
                        disabled
                        className="w-full h-9 pl-10 pr-4 py-2 bg-[var(--sidebar-background)] border border-[var(--border)] rounded-lg text-sm text-[var(--muted-foreground)] opacity-50"
                    />
                </div>
            </div>
        )
    }

    return <SearchBar searchIndex={searchIndex} />
}

export default SearchProvider
