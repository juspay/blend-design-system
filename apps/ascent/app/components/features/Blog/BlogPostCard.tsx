import Link from 'next/link'
import { BlogPost } from '../../../blog/utils/getBlogPosts'

interface BlogPostCardProps {
    post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    return (
        <article className="group relative bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-[var(--accent)] h-full flex flex-col">
            {post.featured && (
                <div className="absolute -top-2 -right-2">
                    <span className="bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                    </span>
                </div>
            )}

            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-3">
                    <time dateTime={post.publishDate}>
                        {formatDate(post.publishDate)}
                    </time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span className="capitalize">{post.category}</span>
                </div>

                <Link
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-[var(--accent)] transition-colors"
                >
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3 line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-[var(--muted-foreground)] mb-4 line-clamp-3">
                    {post.excerpt || post.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--muted)] rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                {post.author.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-sm text-[var(--muted-foreground)]">
                            {post.author}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="text-xs text-[var(--muted-foreground)]">
                            +{post.tags.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}
