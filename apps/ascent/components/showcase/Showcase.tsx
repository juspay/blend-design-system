'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMobile } from '@/hooks/useMobile'
import { showcaseCategories } from '@/lib/showcase-data'
import { MobileShowcase } from './MobileShowcase'
import { DesktopShowcase } from './DesktopShowcase'
import SearchBar from './SearchBar'

export default function Showcase() {
    const isMobile = useMobile()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const categories = useMemo(() => {
        const cat = searchParams.get('category')
        return cat ? cat.split(',').filter(Boolean) : []
    }, [searchParams])

    const updateFilters = useCallback(
        (nextQuery: string, nextCategories: string[]) => {
            const params = new URLSearchParams()
            if (nextQuery) params.set('q', nextQuery)
            if (nextCategories.length > 0)
                params.set('category', nextCategories.join(','))
            const qs = params.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname, {
                scroll: false,
            })
        },
        [router, pathname]
    )

    const setQuery = useCallback(
        (q: string) => updateFilters(q, categories),
        [updateFilters, categories]
    )
    const setCategories = useCallback(
        (cats: string[]) => updateFilters(query, cats),
        [updateFilters, query]
    )

    if (isMobile === undefined) return null
    return isMobile ? (
        <MobileShowcase
            query={query}
            categories={categories}
            onCategoryChange={setCategories}
            onSearch={setQuery}
        />
    ) : (
        <DesktopShowcase query={query} categories={categories}>
            <SearchBar
                onSearch={setQuery}
                categories={showcaseCategories}
                selectedCategories={categories}
                onCategoryChange={setCategories}
                initialQuery={query}
            />
        </DesktopShowcase>
    )
}
