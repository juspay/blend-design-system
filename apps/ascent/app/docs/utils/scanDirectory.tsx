import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface DocItem {
    slug: string
    name: string
    path: string
    children?: DocItem[]
    showInSidebar?: boolean
    version?: number
    category?: string
}

interface FrontmatterData {
    title?: string
    version?: number
    category?: string
}

interface DirectoryConfig {
    order?: string[]
}

//Frontmatter

function extractFrontmatter(filePath: string): FrontmatterData {
    try {
        const content = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(content)
        return {
            title: typeof data.title === 'string' ? data.title : undefined,
            version: typeof data.version === 'number' ? data.version : 1,
            category:
                typeof data.category === 'string' ? data.category : 'Others',
        }
    } catch (err) {
        console.warn(`Could not read frontmatter from ${filePath}:`, err)
        return { version: 1, category: 'Others' }
    }
}

// Config

const readConfig = (dirPath: string): DirectoryConfig | null => {
    const configPath = path.join(dirPath, 'config.json')
    try {
        if (fs.existsSync(configPath)) {
            const configContent = fs.readFileSync(configPath, 'utf-8')
            return JSON.parse(configContent)
        }
    } catch {
        // Error reading config.json - using default sorting
    }
    return null
}

// Sorting

const sortItemsByConfig = (
    items: DocItem[],
    config: DirectoryConfig | null
): DocItem[] => {
    if (!config?.order) {
        return items.sort((a, b) => {
            const aIsDir = a.children !== undefined
            const bIsDir = b.children !== undefined
            if (aIsDir && !bIsDir) return -1
            if (!aIsDir && bIsDir) return 1
            return a.name.localeCompare(b.name)
        })
    }

    const itemMap = new Map(items.map((item) => [item.slug, item]))
    const orderedItems: DocItem[] = []
    const remainingItems: DocItem[] = []

    for (const slug of config.order) {
        const item = itemMap.get(slug)
        if (item) {
            orderedItems.push(item)
            itemMap.delete(slug)
        }
    }

    for (const item of items) {
        if (itemMap.has(item.slug)) {
            remainingItems.push(item)
        }
    }

    remainingItems.sort((a, b) => {
        const aIsDir = a.children !== undefined
        const bIsDir = b.children !== undefined
        if (aIsDir && !bIsDir) return -1
        if (!aIsDir && bIsDir) return 1
        return a.name.localeCompare(b.name)
    })

    return [...orderedItems, ...remainingItems]
}

// Scanner

const scanDirectory = (dirPath: string, basePath: string = ''): DocItem[] => {
    const items: DocItem[] = []
    const config = readConfig(dirPath)

    try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true })

        for (const entry of entries) {
            if (entry.name === 'config.json') continue
            if (entry.name.match(/^\(.*\)\.mdx$/)) continue

            const fullPath = path.join(dirPath, entry.name)
            const relativePath = path.join(basePath, entry.name)

            if (entry.isDirectory()) {
                const children = scanDirectory(fullPath, relativePath)
                items.push({
                    slug: entry.name,
                    name: entry.name,
                    path: relativePath,
                    children,
                })
            } else if (
                entry.name.endsWith('.mdx') &&
                entry.name !== 'page.mdx'
            ) {
                const slug = entry.name.replace(/\.mdx$/, '')
                const { title, version, category } =
                    extractFrontmatter(fullPath)
                // Strip "V2" suffix from title so v1/v2 peers share the same name
                const cleanTitle = title?.replace(/\s*[Vv]2\s*$/, '') ?? slug
                items.push({
                    slug,
                    name: cleanTitle,
                    path: relativePath.replace(/\.mdx$/, ''),
                    version,
                    category,
                })
            }
        }
    } catch {
        // Error scanning directory - returning empty array
    }

    return sortItemsByConfig(items, config)
}

//  Version Peer Map

export function buildVersionPeerMap(items: DocItem[]): Map<string, string> {
    const map = new Map<string, string>()

    function walk(children: DocItem[]): void {
        const byName = new Map<string, DocItem[]>()

        for (const item of children) {
            if (item.children?.length) {
                walk(item.children)
            }

            // Normalize
            const normalizedName = item.name.toLowerCase().replace(/\s+/g, '')
            const group = byName.get(normalizedName) ?? []
            group.push(item)
            byName.set(normalizedName, group)
        }

        for (const [, peers] of byName) {
            if (peers.length === 2) {
                const [a, b] = peers
                map.set(a.slug, b.slug)
                map.set(b.slug, a.slug)
            }
        }
    }
    walk(items)
    return map
}

// Category builder for sidebar

export function buildSidebarItemsWithCategories(items: DocItem[]): DocItem[] {
    return items.map((item) => {
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

export default scanDirectory
