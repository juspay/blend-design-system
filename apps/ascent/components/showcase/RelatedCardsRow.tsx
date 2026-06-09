import { ShowcaseItem } from '@/lib/showcase-data'
import RelatedCard from './RelatedCard'

interface RelatedCardsRowProps {
    currentItem: ShowcaseItem
    items: ShowcaseItem[]
}

function relevanceScore(
    current: ShowcaseItem,
    candidate: ShowcaseItem
): number {
    return current.components.filter((c) => candidate.components.includes(c))
        .length
}

export default function RelatedCardsRow({
    currentItem,
    items,
}: RelatedCardsRowProps) {
    const relatedItems = items
        .filter(
            (d) =>
                d.category === currentItem.category && d.id !== currentItem.id
        )
        .sort(
            (a, b) =>
                relevanceScore(currentItem, b) - relevanceScore(currentItem, a)
        )

    if (relatedItems.length === 0) return null

    return (
        <div className="border-t border-border/60 p-6 sm:px-10 py-8 flex flex-col gap-2.5">
            <h2 className="text-2xl font-medium text-primary mb-8 w-full flex items-center justify-center">
                Similar pages for you
            </h2>
            <div className="flex gap-8 overflow-x-auto pb-2">
                {relatedItems.map((item) => (
                    <RelatedCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
