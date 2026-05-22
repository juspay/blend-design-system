import React from 'react'
import path from 'path'
import { SharedLayout } from '@/components/layout'
import { Sidebar } from '@/components/docs'
import { scanDirectory, buildVersionPeerMap, DocItem } from './utils'
import { DocsVersionProvider } from './utils/DocsVersionContext'

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

const layout = ({ children }: { children: React.ReactNode }) => {
    // Scan the raw file tree — used as the source of truth for both
    const fileBasedItems = scanDirectory(
        path.join(process.cwd(), 'app', 'docs', 'content')
    )

    const sidebarItems = buildSidebarItemsWithCategories(fileBasedItems)

    // Build the peer map from the raw scan (before category grouping).
    const versionPeerMap = buildVersionPeerMap(fileBasedItems)

    const asideStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
    }

    return (
        <DocsVersionProvider value={versionPeerMap}>
            <SharedLayout
                baseRoute="/docs"
                contentPath="app/docs/content"
                sidebarItems={sidebarItems}
            >
                <div className="flex w-full">
                    <aside
                        className="hidden lg:block w-56 max-w-56 shrink-0 transition-none"
                        style={asideStyle}
                    >
                        <Sidebar items={sidebarItems} baseRoute="/docs" />
                    </aside>
                    {children}
                </div>
            </SharedLayout>
        </DocsVersionProvider>
    )
}

export default layout
