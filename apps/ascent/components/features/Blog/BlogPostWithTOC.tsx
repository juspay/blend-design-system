import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { BlogPost } from '@/components/features/Blog/types'
import { formatDate } from '@/components/features/Blog/utils'
import BlogTableOfContents from './BlogTableOfContents'
import { PageBreadcrumb } from '@/components/layout/Navigation'

interface BlogPostWithTOCProps {
    post: BlogPost
    headings: Array<{ id: string; text: string; level: number }>
    children: ReactNode
}

const COVER_GRADIENTS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #fd7043 0%, #ff8a65 100%)',
    'linear-gradient(135deg, #26c6da 0%, #00838f 100%)',
]

function getCoverGradient(slug: string): string {
    let hash = 0
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash)
    }
    return COVER_GRADIENTS[Math.abs(hash) % COVER_GRADIENTS.length]
}

export default function BlogPostWithTOC({
    post,
    headings,
    children,
}: BlogPostWithTOCProps) {
    const coverGradient = getCoverGradient(post.slug)

    const breadcrumbItems = [
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` },
    ]

    return (
        <div className="mx-auto flex min-h-screen items-start">
            {/* Main content */}
            <div>
                <PageBreadcrumb items={breadcrumbItems} className='px-8' />
                <article className="flex flex-1 flex-col px-8 pb-20 pt-8">
                {/* Cover */}
                <div className="relative mb-8 h-52 w-full overflow-hidden">
                    {post.coverImage ? (
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div
                            className="absolute inset-0"
                            style={{ background: coverGradient }}
                        />
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-8">
                    <div className="w-full min-w-0">{children}</div>

                    {/* Back link */}
                    <div className="flex items-center justify-center py-6">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M10 13L5 8l5-5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Done, go back
                        </Link>
                    </div>
                </div>
            </article>
            </div>

            {/* Sidebar */}
            <aside className="sticky top-0 flex h-screen w-52 shrink-0 flex-col border-l border-border">
                {/* Title */}
                <div className="shrink-0 px-4 pb-2 pt-4">
                    <p className="font-manrope text-2xl font-medium leading-tight tracking-tight text-foreground line-clamp-1">
                        {post.title}
                    </p>
                </div>

                {/* General Info */}
                <div className="py-6 border-y border-border">
                    <div className="flex shrink-0 flex-col gap-6 px-8 py-4">
                        <div className="flex flex-col gap-1.5">
                            <p className="font-mono text-sm uppercase tracking-tight text-nav-section-text">
                                Author
                            </p>
                            <p className="text-sm tracking-tight text-foreground">
                                {post.author}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="font-mono text-sm uppercase tracking-tight text-muted-foreground">
                                Date
                            </p>
                            <p className="text-sm tracking-tight text-foreground">
                                {formatDate(post.publishDate)}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <p className="font-mono text-sm uppercase tracking-tight text-muted-foreground">
                                Category
                            </p>
                            <p className="text-sm tracking-tight text-foreground">
                                {post.category}
                            </p>
                        </div>
                    </div>
                </div>

                {/* TOC */}
                <BlogTableOfContents className="py-6" items={headings} />
            </aside>
        </div>
    )
}
