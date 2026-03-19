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

// ─── Font shorthands ─────────────────────────────────────────────────────────
const manrope = { fontFamily: 'var(--font-manrope), sans-serif' }
const geist = { fontFamily: 'var(--font-geist-sans), sans-serif' }
const mono = { fontFamily: 'var(--font-geist-mono), monospace' }

// ─── Components ──────────────────────────────────────────────────────────────
export const BlogMDXComponents = {
    // ── Headings ───────────────────────────────────────────────────────────
    h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
        <h1
            id={slug(getTextContent(children))}
            className="mb-6 mt-14 text-[30px] font-semibold leading-[1.2] tracking-[-0.6px] text-[#111827] first:mt-0"
            style={manrope}
            {...props}
        >
            {children}
        </h1>
    ),

    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
        <h2
            id={slug(getTextContent(children))}
            className="mb-5 mt-14 border-b border-[#e1e4ea] pb-3 text-[22px] font-semibold leading-[1.3] tracking-[-0.44px] text-[#111827] first:mt-0"
            style={manrope}
            {...props}
        >
            {children}
        </h2>
    ),

    h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
        <h3
            id={slug(getTextContent(children))}
            className="mb-3 mt-10 text-[18px] font-semibold leading-[1.4] tracking-[-0.36px] text-[#111827]"
            style={manrope}
            {...props}
        >
            {children}
        </h3>
    ),

    h4: ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => (
        <h4
            id={slug(getTextContent(children))}
            className="mb-3 mt-8 text-[16px] font-semibold leading-[1.5] tracking-[-0.32px] text-[#111827]"
            style={geist}
            {...props}
        >
            {children}
        </h4>
    ),

    // ── Body text ─────────────────────────────────────────────────────────
    p: (props: ComponentPropsWithoutRef<'p'>) => (
        <p
            className="my-5 text-[16px] leading-[1.875] tracking-[-0.16px] text-[#374151]"
            style={geist}
            {...props}
        />
    ),

    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-semibold text-[#111827]" {...props} />
    ),

    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="italic text-[#525866]" {...props} />
    ),

    // ── Lists ─────────────────────────────────────────────────────────────
    ul: (props: ComponentPropsWithoutRef<'ul'>) => (
        <ul
            className="my-5 list-disc space-y-2 pl-6 text-[16px] leading-[1.75] text-[#374151]"
            style={geist}
            {...props}
        />
    ),

    ol: (props: ComponentPropsWithoutRef<'ol'>) => (
        <ol
            className="my-5 list-decimal space-y-2 pl-6 text-[16px] leading-[1.75] text-[#374151]"
            style={geist}
            {...props}
        />
    ),

    li: (props: ComponentPropsWithoutRef<'li'>) => (
        <li
            className="pl-1 text-[16px] leading-[1.75] text-[#374151]"
            style={geist}
            {...props}
        />
    ),

    // ── Links ─────────────────────────────────────────────────────────────
    a: ({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) => {
        const cls =
            'text-[#111827] underline underline-offset-[3px] decoration-[#c8cdd6] hover:decoration-[#111827] transition-[text-decoration-color] duration-150'
        if (href?.startsWith('/'))
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
            className="my-8 border-l-2 border-[#202020] bg-[#fafafa] py-4 pl-6 pr-4 text-[16px] italic leading-[1.75] text-[#525866]"
            style={geist}
            {...props}
        />
    ),

    // ── Divider ───────────────────────────────────────────────────────────
    hr: () => <hr className="my-10 border-0 border-t border-[#e1e4ea]" />,

    // ── Tables ────────────────────────────────────────────────────────────
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <div className="my-8 w-full overflow-x-auto border border-[#e1e4ea]">
            <table className="w-full border-collapse text-[14px]" {...props} />
        </div>
    ),

    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
        <thead className="border-b-2 border-[#e1e4ea]" {...props} />
    ),

    // bg on th directly — beats the tr's bg-white
    th: (props: ComponentPropsWithoutRef<'th'>) => (
        <th
            className="bg-[#f4f5f7] px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#525866]"
            style={mono}
            {...props}
        />
    ),

    tbody: (props: ComponentPropsWithoutRef<'tbody'>) => <tbody {...props} />,

    tr: (props: ComponentPropsWithoutRef<'tr'>) => (
        <tr className="border-t border-[#e1e4ea]" {...props} />
    ),

    // bg on td directly — ensures body rows are always white
    td: (props: ComponentPropsWithoutRef<'td'>) => (
        <td
            className="bg-white px-5 py-[11px] text-[14px] leading-[1.6] text-[#374151] align-top"
            style={geist}
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
                className="rounded-[4px] border border-[#e5e7eb] bg-[#f3f4f6] px-[5px] py-[2px] text-[13px] text-[#111827] before:content-none after:content-none"
                style={mono}
            />
        )
    },
}
