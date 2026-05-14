import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import React, { CSSProperties } from 'react'
import { PageMetadata } from '../utils/getFileContent'
import { extractHeadings } from '../utils/toc'
import { generateBreadcrumbItems } from '../utils/generateBreadcrumbs'
import { Metadata } from 'next'
import { SharedLayout } from '@/components/layout'
import { scanDirectory, buildVersionPeerMap, DocItem } from '../utils'
import TableOfContents from '@/components/Navigation/TableOfContents'
import { DocsPage, Sidebar } from '@/components/docs'
import { MobileSidebarTrigger } from './PageClient'
import { DocsVersionProvider } from '../utils/DocsVersionContext'

//Static Params

export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'app', 'docs', 'content')
    const paths: { slug: string[] }[] = []

    const scanDir = (dir: string, basePath: string[] = []) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                scanDir(fullPath, [...basePath, entry.name])
            } else if (entry.name.endsWith('.mdx')) {
                if (entry.name === 'page.mdx') {
                    paths.push({ slug: basePath })
                } else {
                    const fileName = entry.name.replace('.mdx', '')
                    paths.push({ slug: [...basePath, fileName] })
                }
            }
        }
    }

    scanDir(contentDir)
    return paths
}

// Metadata

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const resolvedParams = await params
    const slugArray = resolvedParams.slug || []
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    let filePath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'

    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, ...slugArray, 'page.mdx')
        if (!fs.existsSync(filePath)) {
            return {
                title: 'Page Not Found',
                description: 'The requested page could not be found.',
            }
        }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { frontmatter } = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
        },
        components: useMDXComponents(),
    })

    const metadata = frontmatter as PageMetadata
    return {
        title: metadata?.title || 'Untitled',
        description: metadata?.description || '',
    }
}

//Sidebar Builder

function buildSidebarItemsWithCategories(fileBasedItems: DocItem[]): DocItem[] {
    return fileBasedItems.map((item) => {
        if (item.slug === 'components' && item.children) {
            const componentsByCategory: Record<string, DocItem[]> = {}

            item.children.forEach((child) => {
                const category = child.category || 'Others'
                if (!componentsByCategory[category]) {
                    componentsByCategory[category] = []
                }
                componentsByCategory[category].push(child)
            })

            const categoryChildren: DocItem[] = Object.entries(
                componentsByCategory
            )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, children]) => ({
                    slug: category.toLowerCase().replace(/\s+/g, '-'),
                    name: category,
                    path: `${item.path}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
                    children: children.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    ),
                }))

            return { ...item, children: categoryChildren }
        }

        if (item.children) {
            return {
                ...item,
                children: buildSidebarItemsWithCategories(item.children),
            }
        }

        return item
    })
}

// Page

const page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const resolvedParams = await params
    const slugArray = resolvedParams.slug || []
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    let filePath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'

    if (!fs.existsSync(filePath)) {
        filePath = path.join(basePath, ...slugArray, 'page.mdx')
        if (!fs.existsSync(filePath)) {
            return <div>not found</div>
        }
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content, frontmatter } = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
        },
        components: useMDXComponents(),
    })

    const headings = extractHeadings(fileContent)

    // Scan the raw file tree — used as the source of truth for both
    const fileBasedItems = scanDirectory(
        path.join(process.cwd(), 'app', 'docs', 'content')
    )

    const sidebarItems = buildSidebarItemsWithCategories(fileBasedItems)

    // Build the peer map from the raw scan (before category grouping).
    const versionPeerMap = buildVersionPeerMap(fileBasedItems)

    const metadata: PageMetadata = {
        title: (frontmatter as PageMetadata)?.title || 'Untitled',
        description: (frontmatter as PageMetadata)?.description || '',
        category: (frontmatter as PageMetadata)?.category || '',
        tags: (frontmatter as PageMetadata)?.tags || [],
        ...(frontmatter as PageMetadata),
    }

    const breadcrumbItems = generateBreadcrumbItems(
        slugArray,
        metadata.title || 'Untitled'
    )

    const asideStyle: CSSProperties = {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
    }

    return (
        // DocsVersionProvider wraps SharedLayout so that Navbar and Sidebar both receive the same peer map via context
        <DocsVersionProvider value={versionPeerMap}>
            <SharedLayout
                baseRoute="/docs"
                contentPath="app/docs/content"
                sidebarItems={sidebarItems}
                headings={headings}
            >
                <div className="flex w-full">
                    <aside
                        className="hidden lg:block w-56 max-w-56 shrink-0 transition-none"
                        style={asideStyle}
                    >
                        <Sidebar items={sidebarItems} baseRoute="/docs" />
                    </aside>
                    <div className="flex-1 min-w-0">
                        <DocsPage
                            metadata={metadata}
                            content={content}
                            breadcrumbItems={breadcrumbItems}
                            rawMarkdown={fileContent}
                            mobileTrigger={
                                <MobileSidebarTrigger
                                    sidebarItems={sidebarItems}
                                />
                            }
                        />
                    </div>
                    <aside
                        className="w-56 max-w-56 shrink-0 hidden xl:block transition-none"
                        style={asideStyle}
                    >
                        <div className="px-5 py-3">
                            <span className="text-xs text-nav-section-text-foreground font-semibold uppercase tracking-wider">
                                On this page
                            </span>
                        </div>
                        <TableOfContents items={headings} className="py-4" />
                    </aside>
                </div>
            </SharedLayout>
        </DocsVersionProvider>
    )
}

export default page
