import { BlogPostCard } from './BlogPostCard'
import { cn } from '@/lib/utils/cn'
import { BlogPostGridProps } from '../types'

const COLS = 4

export function BlogPostGrid({ posts }: BlogPostGridProps) {
    if (posts.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-[16px] text-foreground">
                    No posts published yet. Check back soon!
                </p>
            </div>
        )
    }

    // Single row → fill the remaining viewport height, no scroll.
    // Multi row  → scroll within the bounded container.
    const isMultiRow = posts.length > COLS

    return (
        <section
            aria-label="Blog posts"
            className={cn(
                'flex flex-1 flex-col',
                isMultiRow && 'overflow-y-auto',
                !isMultiRow && 'overflow-hidden'
            )}
        >
            <ul
                role="list"
                className={cn('grid grid-cols-4', !isMultiRow && 'h-full')}
            >
                {posts.map((post) => (
                    <li key={post.slug} className="contents">
                        <BlogPostCard post={post} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
