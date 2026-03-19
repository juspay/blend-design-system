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
            className="relative flex h-full flex-col overflow-hidden border-b border-r border-[#e1e4ea] bg-white px-6 pt-8"
        >
            {/* Content */}
            <div className="flex min-h-0 flex-1 flex-col gap-[42px] items-start w-full">
                {/* Title + Author */}
                <div className="flex flex-col gap-[15px] items-start w-full shrink-0">
                    <p
                        className="text-[24px] font-medium leading-[1.1] tracking-[-0.48px] text-[#202020]"
                        style={{
                            fontFamily: 'var(--font-manrope), sans-serif',
                        }}
                    >
                        {post.title}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e1e4ea] overflow-hidden">
                            <span className="text-[8px] font-medium text-[#525866]">
                                {post.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <p
                            className="whitespace-nowrap text-[16px] font-normal leading-[30px] tracking-[-0.32px] text-[#717784]"
                            style={{
                                fontFamily:
                                    'var(--font-geist-sans), sans-serif',
                            }}
                        >
                            {post.author}
                        </p>
                    </div>
                </div>

                {/* Excerpt */}
                <p
                    className="text-[16px] font-normal leading-[30px] tracking-[-0.32px] text-[#717784] text-justify w-full"
                    style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                    {post.excerpt || post.description}
                </p>
            </div>

            {/* Gradient fade overlay */}
            <div className="pointer-events-none absolute bottom-[42px] left-0 right-0 h-[218px] bg-gradient-to-b from-transparent to-white" />

            {/* Date */}
            <div className="absolute bottom-[30px] left-0 right-0 flex justify-center">
                <p
                    className="whitespace-nowrap text-[14px] font-normal leading-normal tracking-[-0.28px] text-[#525866]"
                    style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                    {formatDate(post.publishDate)}
                </p>
            </div>
        </Link>
    )
}
