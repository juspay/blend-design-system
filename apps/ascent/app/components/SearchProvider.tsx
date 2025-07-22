'use client'

import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { SearchResult } from '../docs/utils/searchContent'

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
                console.error('Error fetching search index:', err)
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
                data-slot="dialog-trigger"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-secondary/80 px-4 py-2 bg-zinc-100 relative h-8 w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64 cursor-pointer"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                data-state="closed"
            >
                <span className="hidden lg:inline-flex">
                    Search documentation...
                </span>
                <span className="inline-flex lg:hidden">Search...</span>
                <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
                    <kbd className="bg-[var(--background)] text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--code-border) ] px-1 font-sans text-[0.7rem] font-medium select-none">
                        ⌘
                    </kbd>
                    <kbd className="bg-[var(--background)] text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border border-[var(--code-border)] px-1 font-sans text-[0.7rem] font-medium select-none">
                        K
                    </kbd>
                </div>
            </button>
        )
    }

    if (error) {
        return (
            <div className="relative max-w-md">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search unavailable"
                        disabled
                        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-500"
                    />
                </div>
            </div>
        )
    }

    return <SearchBar searchIndex={searchIndex} />
}

export default SearchProvider
