import { BlogPost } from '@/blog/utils/getBlogPosts'
import { BlogPostCard } from '@/components/features/Blog/BlogPostCard'

interface BlogPostGridProps {
    posts: BlogPost[]
}

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

    return (
        <div className="flex flex-1 flex-col border-b border-l border-r border-[#e1e4ea] bg-white">
            <div className="grid h-full grid-cols-4">
                {posts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
