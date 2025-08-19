'use client'

import { TOCItem } from '@/components/layout/Navigation/TableOfContents'
import TableOfContents from '@/components/layout/Navigation/TableOfContents'
import { BlogPost } from '@/blog/utils/getBlogPosts'

interface BlogSidebarProps {
    headings: TOCItem[]
    recentPosts?: BlogPost[]
}

export function BlogSidebar({ headings, recentPosts = [] }: BlogSidebarProps) {
    return (
        <div className="sticky top-4 p-4 space-y-6">
            {/* Table of Contents */}
            {headings.length > 0 && (
                <div>
                    <TableOfContents items={headings} />
                </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        Recent Posts
                    </h3>
                    <div className="space-y-2">
                        {recentPosts.slice(0, 5).map((post) => (
                            <a
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block p-2 rounded-md hover:bg-[var(--sidebar-item-hover)] transition-colors group"
                                data-nav-content
                            >
                                <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                    {post.title}
                                </div>
                                <div className="text-xs text-[var(--muted-foreground)] mt-1">
                                    {new Date(
                                        post.publishDate
                                    ).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Fallback when no content */}
            {headings.length === 0 && recentPosts.length === 0 && (
                <div className="space-y-3">
                    <div className="text-sm text-[var(--muted-foreground)]">
                        No table of contents or recent posts available.
                    </div>
                </div>
            )}
        </div>
    )
}
