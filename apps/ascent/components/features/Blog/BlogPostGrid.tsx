import { BlogPost } from '@/blog/utils/getBlogPosts'
import { BlogPostCard } from '@/components/features/Blog/BlogPostCard'

interface BlogPostGridProps {
    posts: BlogPost[]
}

const COLS = 4

export function BlogPostGrid({ posts }: BlogPostGridProps) {
    if (posts.length === 0) {
        return (
            <div className="border-b border-l border-r border-[#e1e4ea] py-12 text-center">
                <p
                    className="text-[16px] text-[#717784]"
                    style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                    No posts published yet. Check back soon!
                </p>
            </div>
        )
    }

    // Single row → fill the remaining viewport height, no scroll.
    // Multi row  → scroll within the bounded container.
    const isMultiRow = posts.length > COLS

    return (
        <div
            className={[
                'flex flex-1 flex-col',
                'border-b border-l border-r border-[#e1e4ea] bg-white',
                isMultiRow ? 'overflow-y-auto' : 'overflow-hidden',
            ].join(' ')}
        >
            <div
                className={[
                    'grid grid-cols-4',
                    isMultiRow ? '' : 'h-full',
                ].join(' ')}
            >
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
