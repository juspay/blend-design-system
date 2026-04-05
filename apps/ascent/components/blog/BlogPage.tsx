import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { BlogPost } from '@/lib/types'
import { PageBreadcrumb } from '@/components/Navigation'
import { formatDate, getCoverGradient } from '@/app/blog/utils'
import { Undo2 } from 'lucide-react'
import SidebarTocHeader from './SidebarTocHeader'
import { AsideStyle } from '../layout'
import { MobileBlogSidebarTrigger } from './MobileBlogSidebar'

interface BlogPageProps {
    post: BlogPost
    headings: Array<{ id: string; text: string; level: number }>
    children: ReactNode
}

function splitTitleIntoTwoLines(text: string) {
    if (!text) return { first: '', second: '' }

    const words = text.trim().split(/\s+/)

    if (words.length <= 2) {
        return { first: text, second: '' }
    }

    let bestIndex = 1
    let smallestDiff = Infinity

    for (let i = 1; i < words.length; i++) {
        const firstPart = words.slice(0, i).join(' ')
        const secondPart = words.slice(i).join(' ')

        const diff = Math.abs(firstPart.length - secondPart.length)

        if (diff < smallestDiff) {
            smallestDiff = diff
            bestIndex = i
        }
    }

    return {
        first: words.slice(0, bestIndex).join(' '),
        second: words.slice(bestIndex).join(' '),
    }
}

export default function BlogPostWithTOC({
    post,
    headings,
    children,
}: BlogPageProps) {
    const coverGradient = getCoverGradient(post.slug)

    const breadcrumbItems = [
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` },
    ]

    const { first, second } = splitTitleIntoTwoLines(post.title)

    return (
        <div className="mx-auto flex min-h-screen items-start">
            {/* Main content */}
            <div className="flex-1 min-w-0">
                <PageBreadcrumb
                    items={breadcrumbItems}
                    className="px-4 sm:px-8"
                    style={AsideStyle}
                    mobileTrigger={
                        <div className="lg:hidden">
                            <MobileBlogSidebarTrigger
                                post={post}
                                headings={headings}
                            />
                        </div>
                    }
                />
                <article className="flex flex-1 flex-col overflow-x-hidden">
                    <div
                        id="sidebar-meta"
                        className="border-b border-border pt-4 pb-5.25"
                    >
                        <h1 className="text-primary font-manrope text-4xl sm:text-5xl md:text-6xl lg:text-[86px] font-medium leading-[110%] tracking-[-0.04em] lg:tracking-[-3.44px] px-4 sm:px-8 text-balance">
                            {first}
                            {second && (
                                <>
                                    <br className="hidden sm:block" />
                                    <span className="sm:hidden"> </span>
                                    {second}
                                </>
                            )}
                        </h1>
                    </div>

                    <div className="py-6 sm:py-8">
                        {/* Content */}
                        <div className="flex flex-col gap-8 px-4 sm:px-8">
                            {/* Cover */}
                            <div className="relative h-48 sm:h-60 w-full overflow-hidden">
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
                                        className="h-full w-full"
                                        style={{ background: coverGradient }}
                                    />
                                )}
                            </div>
                            <div className="w-full min-w-0 prose prose-sm sm:prose-base max-w-none">
                                {children}
                            </div>

                            {/* Back link */}
                            <div className="flex items-center justify-center py-4">
                                <Link
                                    href="/blog"
                                    className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <Undo2 className="w-4 h-4" />
                                    <span>Done, go back</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* Sidebar - Desktop only */}
            <aside className="hidden lg:flex border-l border-border w-52 shrink-0 self-stretch flex-col">
                {/* Meta info */}
                <div className="py-6 border-b border-border">
                    <div className="flex flex-col gap-6 px-8 py-4">
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

                <SidebarTocHeader title={post.title} headings={headings} />
            </aside>
        </div>
    )
}
