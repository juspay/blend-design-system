import { getMDXComponents } from '@/components/mdx'
import { AscentToc } from '@/components/ascent-toc'
import { source } from '@/lib/source'
import { notFound } from 'next/navigation'
import { isValidElement, type ReactNode } from 'react'

function getTocTitle(title: ReactNode): string {
    if (typeof title === 'string' || typeof title === 'number') {
        return String(title)
    }

    if (Array.isArray(title)) {
        return title.map(getTocTitle).join('')
    }

    if (isValidElement<{ children?: ReactNode }>(title)) {
        return getTocTitle(title.props.children)
    }

    return ''
}

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug } = await params
    const page = source.getPage(slug)

    if (!page) notFound()

    const MDX = page.data.body

    return (
        <main className="ascent-docs-main">
            <div className="ascent-docs-article">
                <header className="ascent-docs-page-header">
                    <h1>{page.data.title}</h1>
                </header>
                <div className="ascent-docs-content">
                    <p className="ascent-docs-description">
                        {page.data.description}
                    </p>
                    <MDX components={getMDXComponents()} />
                </div>
            </div>
            <AscentToc
                items={page.data.toc.map((item) => ({
                    depth: item.depth,
                    title: getTocTitle(item.title),
                    url: item.url,
                }))}
            />
        </main>
    )
}

export function generateStaticParams() {
    return source.generateParams()
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string[] }>
}) {
    const { slug } = await params
    const page = source.getPage(slug)

    if (!page) notFound()

    return {
        title: page.data.title,
        description: page.data.description,
    }
}
