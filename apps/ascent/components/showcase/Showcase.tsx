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
    const [category, setCategory] = useState<string | null>(null)

    if (isMobile === undefined) return null
    return isMobile ? (
        <MobileShowcase
            query={query}
            category={category}
            onCategoryChange={setCategory}
            onSearch={setQuery}
        />
    ) : (
        <DesktopShowcase query={query} category={category}>
            <SearchBar
                onSearch={setQuery}
                categories={showcaseCategories}
                selectedCategory={category}
                onCategoryChange={setCategory}
            />
        </DesktopShowcase>
    )
}
