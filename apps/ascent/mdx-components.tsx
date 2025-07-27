import React, { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { highlight } from 'sugar-high'
import {
    CodeBlock,
    DocsTypeTable,
    Preview,
    PreviewWrapper,
} from './app/components'

// Create wrapper components for each preview
const ButtonPreview = () => <PreviewWrapper component="ButtonPreview" />
const AlertPreview = () => <PreviewWrapper component="AlertPreview" />
const TagPreview = () => <PreviewWrapper component="TagPreview" />
const ButtonGroupPreview = () => (
    <PreviewWrapper component="ButtonGroupV2Preview" />
)
const ButtonGroupV2Preview = () => (
    <PreviewWrapper component="ButtonGroupV2Preview" />
)
const TabsPreview = () => <PreviewWrapper component="TabsPreview" />
const SplitTagPreview = () => <PreviewWrapper component="SplitTagPreview" />
const ModalPreview = () => <PreviewWrapper component="ModalPreview" />
const TooltipPreview = () => <PreviewWrapper component="TooltipPreview" />
const AccordionPreview = () => <PreviewWrapper component="AccordionPreview" />
const SnackbarPreview = () => <PreviewWrapper component="SnackbarPreview" />
const PopoverPreview = () => <PreviewWrapper component="PopoverPreview" />
const CheckboxPreview = () => <PreviewWrapper component="CheckboxPreview" />
const RadioPreview = () => <PreviewWrapper component="RadioPreview" />
const SwitchPreview = () => <PreviewWrapper component="SwitchPreview" />
const SingleSelectPreview = () => (
    <PreviewWrapper component="SingleSelectPreview" />
)
const MenuPreview = () => <PreviewWrapper component="MenuPreview" />
const StatCardPreview = () => <PreviewWrapper component="StatCardPreview" />
const ChartPreview = () => <PreviewWrapper component="ChartPreview" />

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/^-+|-+$/g, '')
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
    h1: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h1 id={id} className="text-2xl pt-12 font-bold" {...props}>
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
                className="font-heading mt-12 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl"
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
                className="font-heading mt-8 scroll-m-32 text-xl font-medium tracking-tight"
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
            <h4 id={id} className="font-medium" {...props}>
                {children}
            </h4>
        )
    },
    h5: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h5 id={id} className="font-medium text-sm" {...props}>
                {children}
            </h5>
        )
    },
    h6: ({ children, ...props }: HeadingProps) => {
        const text = typeof children === 'string' ? children : ''
        const id = generateSlug(text)
        return (
            <h6 id={id} className="font-medium text-sm" {...props}>
                {children}
            </h6>
        )
    },
    p: (props: ParagraphProps) => (
        <p className="leading-relaxed [&:not(:first-child)]:mt-6" {...props} />
    ),
    ol: (props: ListProps) => (
        <ol className="list-decimal pl-5 space-y-2" {...props} />
    ),
    ul: (props: ListProps) => (
        <ul className="list-disc pl-5 space-y-1" {...props} />
    ),
    li: (props: ListItemProps) => <li className="pl-1" {...props} />,
    em: (props: ComponentPropsWithoutRef<'em'>) => (
        <em className="font-medium" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
        <strong className="font-medium" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className =
            'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800'
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
                    className="bg-[var(--code-background)] outline outline-[var(--code-border)] rounded-md text-sm px-1 py-0.5"
                />
            )
        }
    },
    table: (props: ComponentPropsWithoutRef<'table'>) => (
        <table
            className="w-full table-auto border-collapse border border-gray-300 dark:border-zinc-600 my-6"
            {...props}
        />
    ),
    thead: (props: ComponentPropsWithoutRef<'thead'>) => (
        <thead className="bg-gray-50 dark:bg-zinc-800" {...props} />
    ),
    tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
        <tbody
            className="divide-y divide-gray-200 dark:divide-zinc-700"
            {...props}
        />
    ),
    tr: (props: ComponentPropsWithoutRef<'tr'>) => (
        <tr
            className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700 last:border-b-0"
            {...props}
        />
    ),
    th: (props: ComponentPropsWithoutRef<'th'>) => (
        <th
            className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-zinc-100 border-b border-gray-300 dark:border-zinc-600 whitespace-nowrap bg-gray-50 dark:bg-zinc-800"
            {...props}
        />
    ),
    td: (props: ComponentPropsWithoutRef<'td'>) => (
        <td
            className="px-4 py-3 text-sm text-gray-800 dark:text-zinc-300 break-words align-top"
            {...props}
        />
    ),
    blockquote: (props: BlockquoteProps) => (
        <blockquote
            className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
            {...props}
        />
    ),
    DocsTypeTable,
    CodeBlock,
    Preview,
    ButtonPreview,
    AlertPreview,
    TagPreview,
    ButtonGroupPreview,
    ButtonGroupV2Preview,
    SplitTagPreview,
    TabsPreview,
    ModalPreview,
    TooltipPreview,
    AccordionPreview,
    SnackbarPreview,
    PopoverPreview,
    CheckboxPreview,
    RadioPreview,
    SwitchPreview,
    SingleSelectPreview,
    MenuPreview,
    StatCardPreview,
    ChartPreview,
}

declare global {
    type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
    return components
}
