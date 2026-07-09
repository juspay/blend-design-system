import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import { cache } from 'react'
import React from 'react'
import { PageMetadata } from '../utils/getFileContent'
import { extractHeadings } from '../utils/toc'
import { generateBreadcrumbItems } from '../utils/generateBreadcrumbs'
import { Metadata } from 'next'
import TableOfContents from '@/components/Navigation/TableOfContents'
import { DocsPage } from '@/components/docs'
import { MobileSidebarTrigger } from './PageClient'
import { scanDirectory, buildSidebarItemsWithCategories } from '../utils'

const sidebarItems = buildSidebarItemsWithCategories(
    scanDirectory(path.join(process.cwd(), 'app', 'docs', 'content'))
)

const getCompiledMDX = cache(async (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { content, frontmatter } = await compileMDX({
        source: fileContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: { remarkPlugins: [], rehypePlugins: [] },
        },
        components: useMDXComponents(),
    })
    return { content, frontmatter, fileContent }
})

function resolveFilePath(slugArray: string[]): string | null {
    const basePath = path.join(process.cwd(), 'app', 'docs', 'content')

    const directPath =
        path.join(
            basePath,
            Array.isArray(slugArray) ? slugArray.join('/') : slugArray
        ) + '.mdx'

    if (fs.existsSync(directPath)) return directPath

    const indexPath = path.join(basePath, ...slugArray, 'page.mdx')
    if (fs.existsSync(indexPath)) return indexPath

    return null
}

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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
    const { slug } = await params
    const filePath = resolveFilePath(slug || [])

    if (!filePath) {
        return {
            title: 'Page Not Found',
            description: 'The requested page could not be found.',
        }
    }

    const { frontmatter } = await getCompiledMDX(filePath)
    const metadata = frontmatter as PageMetadata

    return {
        title: metadata?.title || 'Untitled',
        description: metadata?.description || '',
    }
}

const page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { slug } = await params
    const slugArray = slug || []
    const filePath = resolveFilePath(slugArray)

    if (!filePath) {
        return <div>not found</div>
    }

    const { content, frontmatter, fileContent } = await getCompiledMDX(filePath)

    const headings = extractHeadings(fileContent)

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
                    content={content}
                    breadcrumbItems={breadcrumbItems}
                    rawMarkdown={fileContent}
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
