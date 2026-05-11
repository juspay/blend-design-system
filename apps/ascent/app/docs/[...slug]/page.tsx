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
import { scanDirectory, DocItem } from '../utils'
import TableOfContents from '@/components/Navigation/TableOfContents'
import { DocsPage, Sidebar } from '@/components/docs'
import { MobileSidebarTrigger } from './PageClient'
import {
    COMPONENT_REGISTRY,
    CATEGORY_ORDER,
    ComponentCategory,
} from '@/lib/docs/componentRegistry'

// Generate static params for all MDX files
export async function generateStaticParams() {
    const contentDir = path.join(process.cwd(), 'app', 'docs', 'content')
    const paths: { slug: string[] }[] = []

    const scanDirectory = (dir: string, basePath: string[] = []) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                scanDirectory(fullPath, [...basePath, entry.name])
            } else if (entry.name.endsWith('.mdx')) {
                if (entry.name === 'page.mdx') {
                    // For page.mdx files, use the directory path
                    paths.push({ slug: basePath })
                } else {
                    // For other MDX files, add the filename without extension
                    const fileName = entry.name.replace('.mdx', '')
                    paths.push({ slug: [...basePath, fileName] })
                }
            }
        }
    }

    scanDirectory(contentDir)

    return paths
}

// Generate metadata for the page
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
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
            },
        },
        components: useMDXComponents(),
    })

    const metadata = frontmatter as PageMetadata

    return {
        title: metadata?.title || 'Untitled',
        description: metadata?.description || '',
    }
}

// Build sidebar items with component categories
function buildSidebarItemsWithCategories(fileBasedItems: DocItem[]): DocItem[] {
    return fileBasedItems.map((item) => {
        // If this is the components folder, organize by category
        if (item.slug === 'components' && item.children) {
            // Group component files by category from registry
            const componentsByCategory: Record<ComponentCategory, DocItem[]> = {
                'Form Input': [],
                Selection: [],
                Actions: [],
                Navigation: [],
                Feedback: [],
                Layout: [],
                Data: [],
                Display: [],
                Others: [],
            }

            // Map each component file to its category
            item.children.forEach((child) => {
                const registryEntry = COMPONENT_REGISTRY.find(
                    (c) => c.slug === child.slug
                )
                if (registryEntry) {
                    const category = registryEntry.category
                    componentsByCategory[category].push({
                        ...child,
                        name: registryEntry.title, // Use title from registry
                    })
                } else {
                    // Component not in registry goes to Others
                    componentsByCategory['Others'].push(child)
                }
            })

            // Build category sections
            const categoryChildren: DocItem[] = CATEGORY_ORDER.filter(
                (cat) => componentsByCategory[cat].length > 0
            ).map((category) => ({
                slug: category.toLowerCase().replace(/\s+/g, '-'),
                name: category,
                path: `${item.path}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
                children: componentsByCategory[category].sort((a, b) =>
                    a.name.localeCompare(b.name)
                ),
            }))

            return {
                ...item,
                children: categoryChildren,
            }
        }

        // Recursively process children
        if (item.children) {
            return {
                ...item,
                children: buildSidebarItemsWithCategories(item.children),
            }
        }

        return item
    })
}

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
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
            },
        },
        components: useMDXComponents(),
    })

    const headings = extractHeadings(fileContent)
    const fileBasedItems = scanDirectory(
        path.join(process.cwd(), 'app', 'docs', 'content')
    )
    const sidebarItems = buildSidebarItemsWithCategories(fileBasedItems)

    const metadata: PageMetadata = {
        title: (frontmatter as PageMetadata)?.title || 'Untitled',
        description: (frontmatter as PageMetadata)?.description || '',
        category: (frontmatter as PageMetadata)?.category || '',
        tags: (frontmatter as PageMetadata)?.tags || [],
        ...(frontmatter as PageMetadata),
    }

    // Generate breadcrumb items based on the current path
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
                            <MobileSidebarTrigger sidebarItems={sidebarItems} />
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
    )
}

export default page
