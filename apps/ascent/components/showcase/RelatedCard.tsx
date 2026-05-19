import { useRouter } from 'next/navigation'
import { ShowcaseItem } from '@/lib/showcase-data'

interface RelatedCardProps {
    item: ShowcaseItem
}

export default function RelatedCard({ item }: RelatedCardProps) {
    const router = useRouter()

    return (
        <div>
            <div className="px-2 py-1.5 sm:px-3.25 sm:py-2.5 border-x border-t border-border rounded-t-xl w-fit">
                <p className="text-foreground/60 font-medium text-xs">
                    {item.title}
                </p>
            </div>
            <button
                onClick={() => router.push(`/showcase/${item.id}`)}
                className="group shrink-0 text-left px-7 py-8 border border-border rounded-[0_12.77px_12.773px_12.773px] bg-secondary/40 hover:bg-secondary/65 transition-colors duration-100"
            >
                <div className="relative w-[85vw] sm:w-[45vw] lg:w-[32vw] max-w-65 md:max-w-93 aspect-5/3 overflow-hidden border border-border/60">
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover dark:invert dark:hue-rotate-180 dark:saturate-150 dark:brightness-105"
                    />
                </div>
            </button>
        </div>
    )
}
