import Link from 'next/link'
import { sanitizeSlug } from '@/app/blog/utils/utils'
import { BlogPostCardProps } from '@/app/blog/types'

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
            className="relative flex h-full flex-col overflow-hidden border-b border-r border-border px-5 pt-8"
        >
            {/* Content */}
            <div className="flex flex-1 flex-col items-start gap-3.5">
                {/* Title + Author */}
                <div className="flex w-full shrink-0 flex-col items-start gap-3.75">
                    <h2 className="text-primary font-manrope text-[24px] font-medium tracking-[-0.48px] line-clamp-1">
                        {post.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
                            <span className="text-[8px] font-medium text-blog-secondary">
                                {post.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <p className="whitespace-nowrap font-normal leading-7.5 tracking-[-0.32px] text-nav-section-text">
                            {post.author}
                        </p>
                    </div>
                </div>

                {/* Excerpt */}
                <p className="w-full text-justify text-[16px] font-normal leading-7.5 tracking-[-0.32px] text-nav-section-text">
                    {post.description}
                </p>
            </div>

            {/* Gradient fade overlay */}
            <div className="pointer-events-none absolute bottom-10.5 left-0 right-0 h-55 bg-linear-to-b from-transparent to-white dark:from-transparent dark:to-black" />

            {/* Date */}
            <div className="absolute bottom-7.5 left-0 right-0 flex justify-center">
                <p className="whitespace-nowrap text-[14px] font-normal leading-normal tracking-[-0.28px] text-foreground">
                    {formatDate(post.publishDate)}
                </p>
            </div>
        </Link>
    )
}
