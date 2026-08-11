import path from 'path'
import { useMDXComponents } from '@/mdx-components'
import React from 'react'
import { PageMetadata } from '../utils/getFileContent'
import { generateBreadcrumbItems } from '../utils/generateBreadcrumbs'
import { Metadata } from 'next'
import TableOfContents from '@/components/Navigation/TableOfContents'
import { DocsPage } from '@/components/docs'
import { MobileSidebarTrigger } from './PageClient'
import { docsSource, getDoc } from '@/lib/docs-source'
import {
    scanDirectory,
    buildSidebarItemsWithCategories,
    buildVersionPeerMap,
    type DocItem,
} from '../utils'

const fileBasedItems = scanDirectory(
    path.join(process.cwd(), 'app', 'docs', 'content')
)
const sidebarItems = buildSidebarItemsWithCategories(fileBasedItems)
const versionPeerMap = buildVersionPeerMap(fileBasedItems)

const findDocItemBySlug = (
    items: DocItem[],
    slug: string
): DocItem | undefined => {
    for (const item of items) {
        if (item.slug === slug) return item

        if (item.children) {
            const childMatch = findDocItemBySlug(item.children, slug)
            if (childMatch) return childMatch
        }
    }
}

export async function generateStaticParams() {
    return docsSource.generateParams('slug').map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const { slug } = await params
    const page = getDoc(slug || [])

    if (!page) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found.',
        }
    }

    const metadata = page.data as PageMetadata

    return {
        title: metadata?.title || 'Untitled',
        description: metadata?.description || '',
    }
}

const page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = await params
    const slugArray = slug || []
    const doc = getDoc(slugArray)

    if (!doc) {
        return <div>not found</div>
    }

    const metadata: PageMetadata = {
        title: (doc.data as PageMetadata)?.title || 'Untitled',
        description: (doc.data as PageMetadata)?.description || '',
        category: (doc.data as PageMetadata)?.category || '',
        tags: (doc.data as PageMetadata)?.tags || [],
        ...(doc.data as PageMetadata),
    }
    const rawMarkdown = await doc.data.getText('raw')
    const headings = doc.data.toc
        .filter((item) => item.depth <= 2 && typeof item.title === 'string')
        .map((item) => ({
            id: item.url.replace(/^#/, ''),
            text: String(item.title),
            level: item.depth,
        }))
    const MDX = doc.data.body

    const breadcrumbItems = generateBreadcrumbItems(
        slugArray,
        metadata.title || 'Untitled'
    )
    const currentSlug = slugArray.at(-1)
    const v2PeerSlug = currentSlug ? versionPeerMap.get(currentSlug) : null
    const v2Peer = v2PeerSlug
        ? findDocItemBySlug(fileBasedItems, v2PeerSlug)
        : null
    const v1Warning =
        slugArray[0] === 'components' && metadata.version === 1
            ? {
                  replacementHref: v2PeerSlug
                      ? `/docs/components/${v2PeerSlug}`
                      : undefined,
                  replacementLabel: v2Peer?.name
                      ? `${v2Peer.name} V2`
                      : undefined,
              }
            : undefined

    const asideStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
    }

    return (
        <>
            <div className="flex-1 min-w-0">
                <DocsPage
                    metadata={metadata}
                    content={<MDX components={useMDXComponents()} />}
                    breadcrumbItems={breadcrumbItems}
                    rawMarkdown={rawMarkdown}
                    v1Warning={v1Warning}
                    mobileTrigger={
                        <MobileSidebarTrigger sidebarItems={sidebarItems} />
                    }
                />
            </div>
            <aside
                className="w-56 max-w-56 shrink-0 hidden xl:block transition-none border-l border-border"
                style={asideStyle}
            >
                <div className="px-5 py-3">
                    <span className="text-xs text-nav-section-text-foreground font-semibold uppercase tracking-wider">
                        On this page
                    </span>
                </div>
                <TableOfContents items={headings} className="py-4" />
            </aside>
        </>
    )
}

export default page
