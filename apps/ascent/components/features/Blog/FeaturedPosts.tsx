import { BlogPost } from '@/blog/utils/getBlogPosts'
import { BlogPostCard } from '@/components/features/Blog/BlogPostCard'

interface FeaturedPostsProps {
    posts: BlogPost[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
    if (posts.length === 0) {
        return null
    }

    return (
        <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--accent)]"
                    >
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                        Featured Posts
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </section>
    )
}
