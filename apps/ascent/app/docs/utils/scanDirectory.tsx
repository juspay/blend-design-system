import fs from 'fs'
import path from 'path'

export interface DocItem {
    slug: string
    name: string
    path: string
    children?: DocItem[]
    showInSidebar?: boolean
}

interface DirectoryConfig {
    order?: string[]
}

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

const sortItemsByConfig = (
    items: DocItem[],
    config: DirectoryConfig | null
): DocItem[] => {
    if (!config?.order) {
        // Default sorting: directories first, then files, alphabetically
        return items.sort((a, b) => {
            const aIsDir = a.children !== undefined
            const bIsDir = b.children !== undefined
            if (aIsDir && !bIsDir) return -1
            if (!aIsDir && bIsDir) return 1
            return a.name.localeCompare(b.name)
        })
    }

    // Create a map for quick lookup
    const itemMap = new Map(items.map((item) => [item.name, item]))
    const orderedItems: DocItem[] = []
    const remainingItems: DocItem[] = []

    // Add items in the specified order
    for (const itemName of config.order) {
        const item = itemMap.get(itemName)
        if (item) {
            orderedItems.push(item)
            itemMap.delete(itemName)
        }
    }

    // Add remaining items that weren't in the order array
    for (const item of items) {
        if (itemMap.has(item.name)) {
            remainingItems.push(item)
        }
    }

    // Sort remaining items (directories first, then files, alphabetically)
    remainingItems.sort((a, b) => {
        const aIsDir = a.children !== undefined
        const bIsDir = b.children !== undefined
        if (aIsDir && !bIsDir) return -1
        if (!aIsDir && bIsDir) return 1
        return a.name.localeCompare(b.name)
    })

    return [...orderedItems, ...remainingItems]
}

const scanDirectory = (dirPath: string, basePath: string = ''): DocItem[] => {
    const items: DocItem[] = []
    const config = readConfig(dirPath)

    try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true })

        for (const entry of entries) {
            // Skip config.json files
            if (entry.name === 'config.json') continue

            // Skip files with names enclosed in brackets like (inputs).mdx
            if (entry.name.match(/^\(.*\)\.mdx$/)) continue

            const fullPath = path.join(dirPath, entry.name)
            const relativePath = path.join(basePath, entry.name)

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
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
                // Skip page.mdx files as they're handled by the catch-all route
                const slug = entry.name.replace(/\.mdx$/, '')
                items.push({
                    slug,
                    name: slug,
                    path: relativePath.replace(/\.mdx$/, ''),
                })
            }
        }
    } catch {
        // Error scanning directory - returning empty array
    }

    return sortItemsByConfig(items, config)
}

export default scanDirectory
