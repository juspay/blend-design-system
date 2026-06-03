'use client'

import { useState } from 'react'
import { useMobile } from '@/hooks/useMobile'
import { showcaseCategories } from '@/lib/showcase-data'
import { MobileShowcase } from './MobileShowcase'
import { DesktopShowcase } from './DesktopShowcase'
import SearchBar from './SearchBar'

export default function Showcase() {
    const isMobile = useMobile()
    const [query, setQuery] = useState('')
    const [categories, setCategories] = useState<string[]>([])

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
            />
        </DesktopShowcase>
    )
}
