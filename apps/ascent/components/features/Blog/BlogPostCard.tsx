import Link from 'next/link'
import { BlogPost } from '@/blog/utils/getBlogPosts'
import { sanitizeSlug } from '@/blog/utils'

interface BlogPostCardProps {
    post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <Link
            href={`/blog/${sanitizeSlug(post.slug)}`}
            className="relative flex h-full flex-col overflow-hidden border-b border-r border-blog-border bg-white px-6 pt-8"
        >
            {/* Content */}
            <div className="flex min-h-0 flex-1 flex-col items-start gap-[42px]">
                {/* Title + Author */}
                <div className="flex w-full shrink-0 flex-col items-start gap-[15px]">
                    <h2 className="font-manrope text-[24px] font-medium leading-[1.1] tracking-[-0.48px] text-blog-ink">
                        {post.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blog-border">
                            <span className="text-[8px] font-medium text-blog-secondary">
                                {post.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <p className="whitespace-nowrap text-[16px] font-normal leading-[30px] tracking-[-0.32px] text-blog-tertiary">
                            {post.author}
                        </p>
                    </div>
                </div>

                {/* Excerpt */}
                <p className="w-full text-justify text-[16px] font-normal leading-[30px] tracking-[-0.32px] text-blog-tertiary">
                    {post.excerpt || post.description}
                </p>
            </div>

            {/* Gradient fade overlay */}
            <div className="pointer-events-none absolute bottom-[42px] left-0 right-0 h-[218px] bg-gradient-to-b from-transparent to-white" />

            {/* Date */}
            <div className="absolute bottom-[30px] left-0 right-0 flex justify-center">
                <p className="whitespace-nowrap text-[14px] font-normal leading-normal tracking-[-0.28px] text-blog-secondary">
                    {formatDate(post.publishDate)}
                </p>
            </div>
        </Link>
    )
}
