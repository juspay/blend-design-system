'use client'

import { useRouter } from 'next/navigation'
import { showcaseData, showcaseCategories } from '@/lib/showcase-data'
import SearchBar from './SearchBar'
import { WelcomeCard } from './WelcomeCard'

interface MobileShowcaseProps {
    query?: string
    category?: string | null
    onCategoryChange?: (category: string | null) => void
    onSearch?: (query: string) => void
}

export function MobileShowcase({
    query,
    category,
    onCategoryChange,
    onSearch,
}: MobileShowcaseProps) {
    const router = useRouter()
    const q = query?.toLowerCase() ?? ''
    const items = showcaseData.filter((d) => {
        const matchesCategory = !category || d.category === category
        const matchesQuery =
            !q ||
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        return matchesCategory && matchesQuery
    })

    const handleClick = (item: (typeof showcaseData)[0]) => {
        router.push(`/showcase/${encodeURIComponent(item.id)}`)
    }

    return (
        <main className="w-full min-h-screen bg-background overflow-y-auto">
            <WelcomeCard
                className="py-12 border-b border-border/40 bg-background"
                logoSize={52}
                logoPriority
            />

            <div className="flex flex-col gap-6 px-4 pt-4">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(item)}
                        className="relative w-full overflow-hidden active:opacity-80 transition-opacity border border-border/60"
                        style={{ height: 220 }}
                    >
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                        <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover dark:invert dark:hue-rotate-180 dark:saturate-150 dark:brightness-105"
                            onError={(e) => {
                                ;(e.target as HTMLImageElement).style.display =
                                    'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)]">
                <SearchBar
                    onSearch={onSearch}
                    categories={showcaseCategories}
                    selectedCategory={category}
                    onCategoryChange={onCategoryChange}
                />
            </div>

            <div className="h-24" />
        </main>
    )
}
