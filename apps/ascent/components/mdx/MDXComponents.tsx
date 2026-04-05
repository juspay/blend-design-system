import React, { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import { CodeBlock } from '@/components/ui'

// Utility function for generating slugs
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/^-+|-+$/g, '')
}

// Type definitions
type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

// Core MDX components for content rendering
export const MDXComponents = {
    h1: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h1 id={id} className="text-2xl pt-12 font-medium" {...props}>
                {children}
            </h1>
        )
    },
    h2: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h2
                id={id}
                className="font-heading scroll-m-28 text-2xl font-medium tracking-tight text-primary *:[code]:text-2xl mt-10 mb-2"
                {...props}
            >
                {children}
            </h2>
        )
    },
    h3: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h3
                id={id}
                className="font-heading scroll-m-32 text-xl font-medium tracking-tight text-primary mt-10"
                {...props}
            >
                {children}
            </h3>
        )
    },
    h4: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h4 id={id} className="font-medium text-primary mt-10" {...props}>
                {children}
            </h4>
        )
    },
    h5: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h5
                id={id}
                className="font-medium text-sm text-primary mt-10"
                {...props}
            >
                {children}
            </h5>
        )
    },
    h6: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h6
                id={id}
                className="font-medium text-sm text-primary mt-10"
                {...props}
            >
                {children}
            </h6>
        )
    },
    p: (props: ParagraphProps) => (
        <p
            className="pt-2 md:leading-9 tracking-[-0.32px] md:text-justify text-foreground"
            {...props}
        />
    ),

    ol: (props: ListProps) => (
        <ol
            className="list-decimal pl-5 space-y-2 md:leading-9 tracking-[-0.32px] text-foreground mt-3"
            {...props}
        />
    ),
    ul: (props: ListProps) => (
        <ul
            className="list-disc pl-5 space-y-1 md:leading-9 tracking-[-0.32px] text-foreground mt-3"
            {...props}
        />
    ),
    li: (props: ListItemProps) => (
        <li
            className="pl-1 md:leading-9 tracking-[-0.32px] text-foreground"
            {...props}
        />
    ),
    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="font-medium" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-medium" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className = 'text-blue-500 hover:text-blue-700'
        if (href?.startsWith('/')) {
            return (
                <Link
                    href={href}
                    className={className}
                    data-nav-content
                    {...props}
                >
                    {children}
                </Link>
            )
        }
        if (href?.startsWith('#')) {
            return (
                <a
                    href={href}
                    className={className}
                    data-nav-content
                    {...props}
                >
                    {children}
                </a>
            )
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                data-nav-content
                {...props}
            >
                {children}
            </a>
        )
    },
    pre: (props: ComponentPropsWithoutRef<'pre'>) => (
        <div className="overflow-x-auto w-full my-4">
            <pre className="min-w-full" {...props} />
        </div>
    ),
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
        const codeHTML = highlight(children as string)

        const isCodeBlock =
            props.className?.includes('language-') ||
            (typeof props.className === 'string' &&
                props.className.includes('hljs'))

        if (isCodeBlock) {
            return <CodeBlock code={children} props={props} />
        } else {
            return (
                <code
                    dangerouslySetInnerHTML={{ __html: codeHTML }}
                    {...props}
                    className="bg-code-background outline outline-code-border rounded-xl text-sm px-1.5 py-0.5"
                />
            )
        }
    },
    blockquote: (props: BlockquoteProps) => (
        <blockquote
            className="ml-[0.075em] text-secondary-foreground"
            {...props}
        />
    ),

    hr: (props: ComponentPropsWithoutRef<'hr'>) => (
        <hr className="my-6 border-t border-code-border" {...props} />
    ),
}
