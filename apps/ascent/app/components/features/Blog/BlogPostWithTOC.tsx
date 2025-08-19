'use client'

import { BlogTableOfContents } from './index'
import { BlogPostWithTOCProps } from './types'
import { formatDate } from './utils'
import Link from 'next/link'

// Simple constants for this component
const ARIA_LABELS = {
    BREADCRUMB: 'Breadcrumb navigation',
    BACK_TO_BLOG: 'Back to Blog',
} as const

const ICON_PATHS = {
    CHEVRON_RIGHT:
        'M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.49226 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z',
    CHEVRON_LEFT:
        'M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.50796 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.96669 8.84182 3.13514Z',
} as const

export default function BlogPostWithTOC({
    post,
    content,
    headings,
    className: _className = '',
}: BlogPostWithTOCProps) {
    return (
        <>
            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6" aria-label={ARIA_LABELS.BREADCRUMB}>
                    <ol className="flex items-center text-sm text-[var(--muted-foreground)]">
                        <li>
                            <Link
                                href="/blog"
                                className="hover:text-[var(--foreground)] transition-colors"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="mx-2" aria-hidden="true">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d={ICON_PATHS.CHEVRON_RIGHT}
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </li>
                        <li
                            className="text-[var(--foreground)] font-medium"
                            aria-current="page"
                        >
                            {post.title}
                        </li>
                    </ol>
                </nav>

                {/* Blog Post Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-4">
                        <time dateTime={post.publishDate}>
                            {formatDate(post.publishDate)}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span className="capitalize">{post.category}</span>
                    </div>

                    <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-[var(--muted-foreground)] mb-6 leading-relaxed">
                        {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                    {post.author.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="font-medium text-[var(--foreground)]">
                                    {post.author}
                                </div>
                                <div className="text-sm text-[var(--muted-foreground)]">
                                    Author
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)]"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Blog Post Content */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    {content}
                </div>

                {/* Blog Post Footer */}
                <footer className="mt-12 pt-8 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            aria-label={ARIA_LABELS.BACK_TO_BLOG}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d={ICON_PATHS.CHEVRON_LEFT}
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {ARIA_LABELS.BACK_TO_BLOG}
                        </Link>

                        <div className="text-sm text-[var(--muted-foreground)]">
                            {post.lastModified && (
                                <>
                                    Last updated:{' '}
                                    {formatDate(post.lastModified)}
                                </>
                            )}
                        </div>
                    </div>
                </footer>
            </article>

            {/* Sidebar Content - This will be positioned by the layout */}
            <div className="fixed top-[var(--navbar-height)] right-0 w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-y-auto p-4 space-y-6">
                {/* Table of Contents with Active Highlighting */}
                {headings.length > 0 && (
                    <BlogTableOfContents items={headings} />
                )}
            </div>
        </>
    )
}
