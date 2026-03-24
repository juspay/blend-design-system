import React, { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import CodeBlock from '@/components/ui/CodeBlock/CodeBlock'

// ─── Slug helper ─────────────────────────────────────────────────────────────
function slug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function getTextContent(children: React.ReactNode): string {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.map(getTextContent).join('')
    if (React.isValidElement(children)) {
        return getTextContent(
            (children.props as { children?: React.ReactNode }).children
        )
    }
    return ''
}

// ─── Components ──────────────────────────────────────────────────────────────
export const BlogMDXComponents = {
    // ── Headings ───────────────────────────────────────────────────────────
    h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
        <h1
            id={slug(getTextContent(children))}
            className="mb-6 mt-14 font-manrope text-[30px] font-semibold leading-[1.2] tracking-[-0.6px] text-blog-heading first:mt-0"
            {...props}
        >
            {children}
        </h1>
    ),

    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
        <h2
            id={slug(getTextContent(children))}
            className="mb-5 mt-14 border-b border-blog-border pb-3 font-manrope text-[22px] font-semibold leading-[1.3] tracking-[-0.44px] text-blog-heading first:mt-0"
            {...props}
        >
            {children}
        </h2>
    ),

    h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
        <h3
            id={slug(getTextContent(children))}
            className="mb-3 mt-10 font-manrope text-[18px] font-semibold leading-[1.4] tracking-[-0.36px] text-blog-heading"
            {...props}
        >
            {children}
        </h3>
    ),

    h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
        <h4
            id={slug(getTextContent(children))}
            className="mb-3 mt-8 text-[16px] font-semibold leading-[1.5] tracking-[-0.32px] text-blog-heading"
            {...props}
        >
            {children}
        </h4>
    ),

    // ── Body text ─────────────────────────────────────────────────────────
    p: (props: ComponentPropsWithoutRef<'p'>) => (
        <p
            className="my-5 text-[16px] leading-[1.875] tracking-[-0.16px] text-blog-body"
            {...props}
        />
    ),

    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-semibold text-blog-heading" {...props} />
    ),

    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="italic text-blog-secondary" {...props} />
    ),

    // ── Lists ─────────────────────────────────────────────────────────────
    ul: (props: ComponentPropsWithoutRef<'ul'>) => (
        <ul
            className="my-5 list-disc space-y-2 pl-6 text-[16px] leading-[1.75] text-blog-body"
            {...props}
        />
    ),

    ol: (props: ComponentPropsWithoutRef<'ol'>) => (
        <ol
            className="my-5 list-decimal space-y-2 pl-6 text-[16px] leading-[1.75] text-blog-body"
            {...props}
        />
    ),

    li: (props: ComponentPropsWithoutRef<'li'>) => (
        <li
            className="pl-1 text-[16px] leading-[1.75] text-blog-body"
            {...props}
        />
    ),

    // ── Links ─────────────────────────────────────────────────────────────
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
        const cls =
            'text-blog-heading underline underline-offset-[3px] decoration-blog-border-muted hover:decoration-blog-heading transition-[text-decoration-color] duration-150'
        // Internal page links (routes or in-page anchors)
        if (href?.startsWith('/') || href?.startsWith('#'))
            return (
                <Link href={href} className={cls} {...props}>
                    {children}
                </Link>
            )
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                {...props}
            >
                {children}
            </a>
        )
    },

    // ── Blockquote ────────────────────────────────────────────────────────
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
        <blockquote
            className="my-8 border-l-2 border-blog-ink bg-blog-surface-subtle py-4 pl-6 pr-4 text-[16px] italic leading-[1.75] text-blog-secondary"
            {...props}
        />
    ),

    // ── Divider ───────────────────────────────────────────────────────────
    hr: () => <hr className="my-10 border-0 border-t border-blog-border" />,

    // ── Tables ────────────────────────────────────────────────────────────
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <div className="my-8 w-full overflow-x-auto border border-blog-border">
            <table className="w-full border-collapse text-[14px]" {...props} />
        </div>
    ),

    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
        <thead className="border-b-2 border-blog-border" {...props} />
    ),

    th: (props: ComponentPropsWithoutRef<'th'>) => (
        <th
            className="bg-blog-surface-raised px-5 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blog-secondary"
            {...props}
        />
    ),

    tbody: (props: ComponentPropsWithoutRef<'tbody'>) => <tbody {...props} />,

    tr: (props: ComponentPropsWithoutRef<'tr'>) => (
        <tr className="border-t border-blog-border" {...props} />
    ),

    td: (props: ComponentPropsWithoutRef<'td'>) => (
        <td
            className="bg-white px-5 py-[11px] text-[14px] leading-[1.6] text-blog-body align-top"
            {...props}
        />
    ),

    // ── Code ──────────────────────────────────────────────────────────────
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
        const isBlock = props.className?.includes('language-')
        if (isBlock) {
            return <CodeBlock code={children} props={props} />
        }
        const codeHTML = highlight(children as string)
        return (
            <code
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                className="rounded-[4px] border border-blog-separator bg-blog-code px-[5px] py-[2px] font-mono text-[13px] text-blog-heading before:content-none after:content-none"
            />
        )
    },
}
