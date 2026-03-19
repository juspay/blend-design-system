'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { BlogPostWithTOCProps } from '@/components/features/Blog/types'
import { formatDate } from '@/components/features/Blog/utils'

// ─── Gradient cover fallback (deterministic per slug) ────────────────────────
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

// ─── Component ───────────────────────────────────────────────────────────────
export default function BlogPostWithTOC({
    post,
    content,
    headings,
}: BlogPostWithTOCProps) {
    const coverGradient = getCoverGradient(post.slug)
    const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
    const observerRef = useRef<IntersectionObserver | null>(null)
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const [pillStyle, setPillStyle] = useState<{ top: number; height: number }>(
        { top: 0, height: 21 }
    )

    const updatePill = useCallback(() => {
        const activeIndex = headings.findIndex(
            (h, i) => h.id === activeId || (i === 0 && !activeId)
        )
        const el = itemRefs.current[activeIndex]
        if (el) {
            setPillStyle({ top: el.offsetTop, height: el.offsetHeight })
        }
    }, [activeId, headings])

    useEffect(() => {
        if (headings.length === 0) return
        observerRef.current?.disconnect()
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) setActiveId(visible[0].target.id)
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0 }
        )
        headings.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observerRef.current?.observe(el)
        })
        return () => observerRef.current?.disconnect()
    }, [headings])

    useEffect(() => {
        updatePill()
    }, [updatePill])

    return (
        <div
            className="mx-auto flex min-h-screen max-w-[1172px] items-start border-l border-r border-[#e1e4ea] bg-white"
            style={{ colorScheme: 'light' }}
        >
            {/* ── Left: main content ─────────────────────────────────────── */}
            <div className="flex flex-1 flex-col border-r border-[#e1e4ea] px-8 pb-[84px] pt-8">
                {/* Cover — no text overlay */}
                <div className="relative mb-8 h-[206px] w-full overflow-hidden">
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

                {/* Content with forced light-theme prose */}
                <div className="flex flex-col gap-8">
                    <div
                        className="
                            prose max-w-none
                            text-[16px] leading-[36px] tracking-[-0.32px]
                            [color-scheme:light]
                            [&_*]:color-scheme-light
                            text-[#2b303b]
                            [&_p]:text-[#2b303b] [&_p]:text-justify
                            [&_h1]:text-[#202020] [&_h1]:font-semibold
                            [&_h2]:text-[#202020] [&_h2]:font-medium [&_h2]:tracking-[-0.5px] [&_h2]:mt-8
                            [&_h3]:text-[#202020] [&_h3]:font-medium [&_h3]:mt-6
                            [&_h4]:text-[#202020] [&_h4]:font-medium
                            [&_strong]:text-[#202020] [&_strong]:font-semibold
                            [&_em]:text-[#2b303b]
                            [&_li]:text-[#2b303b]
                            [&_ul]:text-[#2b303b]
                            [&_ol]:text-[#2b303b]
                            [&_blockquote]:border-l-[#e1e4ea] [&_blockquote]:text-[#525866] [&_blockquote]:not-italic
                            [&_a]:text-[#525866] [&_a:hover]:text-[#202020] [&_a]:no-underline [&_a:hover]:underline
                            [&_hr]:border-[#e1e4ea]
                            [&_table]:border-[#e1e4ea]
                            [&_thead]:bg-[#f9fafb] [&_thead_th]:text-[#202020] [&_thead_th]:border-[#e1e4ea]
                            [&_td]:text-[#2b303b] [&_td]:border-[#e1e4ea]
                            [&_code]:rounded [&_code]:bg-[#f5f5f5] [&_code]:px-1.5 [&_code]:py-0.5
                            [&_code]:text-[14px] [&_code]:text-[#525866] [&_code]:font-normal
                            [&_code]:before:content-none [&_code]:after:content-none
                            [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[#e1e4ea]
                            [&_pre]:bg-[#f8f8f8] [&_pre]:text-[#2b303b]
                            [&_pre_code]:bg-transparent [&_pre_code]:text-[#2b303b] [&_pre_code]:p-0
                        "
                        style={{
                            fontFamily: 'var(--font-geist-sans), sans-serif',
                            ['--sh-class' as string]: '#144f9e',
                            ['--sh-identifier' as string]: '#b01b1b',
                            ['--sh-sign' as string]: '#465462',
                            ['--sh-property' as string]: '#0550ae',
                            ['--sh-entity' as string]: '#1a6e6b',
                            ['--sh-jsxliterals' as string]: '#3438b4',
                            ['--sh-string' as string]: '#00766c',
                            ['--sh-keyword' as string]: '#f53527',
                            ['--sh-comment' as string]: '#a19595',
                            ['--sh-background' as string]: '#f6f8fa',
                            ['--code-background' as string]: '#fefefe',
                            ['--code-border' as string]: '#e0e0e0',
                        }}
                    >
                        {content}
                    </div>

                    {/* Done, go back */}
                    <div className="flex items-center justify-center py-6">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-[16px] tracking-[-0.32px] text-[#7d7d7d] transition-colors hover:text-[#202020]"
                            style={{
                                fontFamily:
                                    'var(--font-geist-sans), sans-serif',
                            }}
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
            </div>

            {/* ── Right: sticky sidebar — always full viewport height ──── */}
            {/* Fix 2 & 3: sidebar uses 100vh, TOC scrolls, author/date pinned at bottom */}
            <div className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col">
                {/* Title — fixed at top */}
                <div className="shrink-0 px-4 pb-2 pt-4">
                    <p
                        className="text-[24px] font-medium leading-[1.1] tracking-[-0.96px] text-[#202020]"
                        style={{
                            fontFamily: 'var(--font-manrope), sans-serif',
                        }}
                    >
                        {post.title}
                    </p>
                </div>

                {/* TOC — scrollable, fills remaining space between title and author */}
                {headings.length > 0 && (
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                        <div className="relative flex gap-3">
                            {/* Vertical rail */}
                            <div className="w-px self-stretch rounded-md bg-[#e1e4ea]" />
                            {/* Active indicator pill — height matches active item text */}
                            <div
                                className="pointer-events-none absolute -left-px w-[3px] rounded-[7px] bg-black transition-all duration-200"
                                style={{
                                    top: pillStyle.top,
                                    height: pillStyle.height,
                                }}
                            />
                            {/* Items */}
                            <div className="flex flex-1 flex-col gap-3">
                                {headings.map((heading, i) => {
                                    const isActive =
                                        heading.id === activeId ||
                                        (i === 0 && !activeId)
                                    return (
                                        <a
                                            key={heading.id}
                                            ref={(el) => {
                                                itemRefs.current[i] = el
                                            }}
                                            href={`#${heading.id}`}
                                            className={`text-[14px] uppercase leading-normal tracking-[-0.28px] transition-colors ${
                                                isActive
                                                    ? 'text-black'
                                                    : 'text-[#adadad] hover:text-[#525866]'
                                            }`}
                                            style={{
                                                fontFamily:
                                                    'var(--font-geist-mono), monospace',
                                            }}
                                        >
                                            {heading.text}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Author + Date — always pinned at bottom */}
                <div className="shrink-0 border-t border-[#e1e4ea] p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <p
                            className="text-[14px] uppercase tracking-[-0.28px] text-[#99a0ae]"
                            style={{
                                fontFamily: 'var(--font-geist-mono), monospace',
                            }}
                        >
                            Author
                        </p>
                        <p
                            className="text-[14px] tracking-[-0.28px] text-[#525866]"
                            style={{
                                fontFamily:
                                    'var(--font-geist-sans), sans-serif',
                            }}
                        >
                            {post.author}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p
                            className="text-[14px] uppercase tracking-[-0.28px] text-[#99a0ae]"
                            style={{
                                fontFamily: 'var(--font-geist-mono), monospace',
                            }}
                        >
                            Date
                        </p>
                        <p
                            className="text-[14px] tracking-[-0.28px] text-[#525866]"
                            style={{
                                fontFamily:
                                    'var(--font-geist-sans), sans-serif',
                            }}
                        >
                            {formatDate(post.publishDate)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
