import { BlogPost } from '@/blog/utils/getBlogPosts'
import { BlogPostCard } from '@/components/features/Blog/BlogPostCard'

interface BlogPostGridProps {
    posts: BlogPost[]
    title?: string
}

export function BlogPostGrid({
    posts,
    title = 'All Posts',
}: BlogPostGridProps) {
    if (posts.length === 0) {
        return (
            <section className="text-center py-12">
                <div className="max-w-md mx-auto">
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-4 text-[var(--muted-foreground)]"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                    </svg>
                    <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                        No posts found
                    </h3>
                    <p className="text-[var(--muted-foreground)]">
                        We haven't published any blog posts yet. Check back soon
                        for updates!
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                    {title}
                </h2>
                <span className="text-sm text-[var(--muted-foreground)]">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </section>
    )
}
