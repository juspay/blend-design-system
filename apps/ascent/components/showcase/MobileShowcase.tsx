'use client'
import { useRouter } from 'next/navigation'
import { showcaseData, showcaseCategories } from '@/lib/showcase-data'
import SearchBar from './SearchBar'
import { WelcomeCard } from './WelcomeCard'
import { CardTile } from './CardTile'

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

    return (
        <main className="w-full min-h-screen bg-background overflow-y-auto">
            <WelcomeCard
                className="py-12 border-b border-border/40 bg-background"
                logoSize={52}
                logoPriority
            />

            <div className="flex flex-col gap-6 px-4 pt-4">
                {items.map((item) => (
                    // CardTile is position:absolute, so it needs a relative container
                    // that defines the actual dimensions in the flow
                    <div
                        key={item.id}
                        className="relative w-full"
                        style={{ height: 220 }}
                    >
                        <CardTile
                            image={item.image}
                            title={item.title}
                            variant="filtered"
                            style={{ inset: 0 }}
                            onClick={() =>
                                router.push(
                                    `/showcase/${encodeURIComponent(item.id)}`
                                )
                            }
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
