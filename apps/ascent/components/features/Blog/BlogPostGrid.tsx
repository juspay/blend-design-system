import { BlogPost } from '@/blog/utils/getBlogPosts'
import { BlogPostCard } from '@/components/features/Blog/BlogPostCard'

interface BlogPostGridProps {
    posts: BlogPost[]
}

const COLS = 4

export function BlogPostGrid({ posts }: BlogPostGridProps) {
    if (posts.length === 0) {
        return (
            <div className="border-b border-l border-r border-blog-border py-12 text-center">
                <p className="text-[16px] text-blog-tertiary">
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
            className={[
                'flex flex-1 flex-col',
                'border-b border-l border-r border-blog-border bg-white',
                isMultiRow ? 'overflow-y-auto' : 'overflow-hidden',
            ].join(' ')}
        >
            <ul
                role="list"
                className={[
                    'grid grid-cols-4',
                    isMultiRow ? '' : 'h-full',
                ].join(' ')}
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
