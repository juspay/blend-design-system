import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface SearchResult {
    title: string
    description?: string
    path: string
    slug: string
    category?: string
    tags?: string[]
    content: string
    excerpt: string
    sections?: Array<{
        title: string
        level: number
        id: string
    }>
}

export interface SearchIndex {
    [key: string]: SearchResult
}

// Function to extract section headers from MDX
const extractSections = (
    content: string
): Array<{ title: string; level: number; id: string }> => {
    const { content: mdxContent } = matter(content)
    const sections: Array<{ title: string; level: number; id: string }> = []

    // Match markdown headers (# ## ### etc.)
    const headerRegex = /^(#{1,6})\s+(.+)$/gm
    let match

    while ((match = headerRegex.exec(mdxContent)) !== null) {
        const level = match[1].length
        const title = match[2].trim()

        // Create a URL-friendly ID
        const id = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')

        sections.push({ title, level, id })
    }

    return sections
}

// Function to extract text content from MDX (basic implementation)
const extractTextFromMDX = (content: string): string => {
    // Remove frontmatter
    const { content: mdxContent } = matter(content)

    // Remove code blocks
    const withoutCodeBlocks = mdxContent.replace(/```[\s\S]*?```/g, '')

    // Remove HTML tags
    const withoutHtml = withoutCodeBlocks.replace(/<[^>]*>/g, '')

    // Remove markdown syntax
    const withoutMarkdown = withoutHtml
        .replace(/#{1,6}\s+/g, '') // Headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*(.*?)\*/g, '$1') // Italic
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
        .replace(/`([^`]+)`/g, '$1') // Inline code

    return withoutMarkdown.trim()
}

// Function to create excerpt from content
const createExcerpt = (content: string, maxLength: number = 150): string => {
    const text = extractTextFromMDX(content)
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

// Function to scan and index all MDX files
export const buildSearchIndex = (contentDir: string): SearchIndex => {
    const index: SearchIndex = {}

    const scanDirectory = (dirPath: string, basePath: string = ''): void => {
        try {
            const entries = fs.readdirSync(dirPath, { withFileTypes: true })

            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name)
                const relativePath = path.join(basePath, entry.name)

                if (entry.isDirectory()) {
                    // Recursively scan subdirectories
                    scanDirectory(fullPath, relativePath)
                } else if (
                    entry.name.endsWith('.mdx') &&
                    entry.name !== 'page.mdx'
                ) {
                    try {
                        const fileContent = fs.readFileSync(fullPath, 'utf-8')
                        const { data, content } = matter(fileContent)

                        const slug = entry.name.replace(/\.mdx$/, '')
                        const docPath = relativePath.replace(/\.mdx$/, '')

                        const searchResult: SearchResult = {
                            title: data.title || slug,
                            description: data.description,
                            path: docPath,
                            slug,
                            category: data.category,
                            tags: data.tags,
                            content: extractTextFromMDX(content),
                            excerpt: createExcerpt(content),
                            sections: extractSections(content),
                        }

                        index[slug] = searchResult
                    } catch (error) {
                        console.error(`Error reading file ${fullPath}:`, error)
                    }
                }
            }
        } catch (error) {
            console.error(`Error scanning directory ${dirPath}:`, error)
        }
    }

    scanDirectory(contentDir)
    return index
}

// Function to search through the index
export const searchContent = (
    query: string,
    index: SearchIndex,
    maxResults: number = 10
): SearchResult[] => {
    if (!query.trim()) return []

    const searchTerms = query.toLowerCase().split(/\s+/)
    const results: Array<SearchResult & { score: number }> = []

    for (const [slug, result] of Object.entries(index)) {
        let score = 0
        const searchableText = [
            result.title,
            result.description,
            result.content,
            ...(result.tags || []),
            ...(result.sections?.map((s) => s.title) || []),
        ]
            .join(' ')
            .toLowerCase()

        for (const term of searchTerms) {
            // Title matches get highest score
            if (result.title.toLowerCase().includes(term)) {
                score += 10
            }

            // Description matches get high score
            if (result.description?.toLowerCase().includes(term)) {
                score += 8
            }

            // Section header matches get high score
            if (
                result.sections?.some((section) =>
                    section.title.toLowerCase().includes(term)
                )
            ) {
                score += 7
            }

            // Tag matches get medium score
            if (result.tags?.some((tag) => tag.toLowerCase().includes(term))) {
                score += 6
            }

            // Content matches get lower score
            if (searchableText.includes(term)) {
                score += 2
            }
        }

        if (score > 0) {
            results.push({ ...result, score })
        }
    }

    // Sort by score (highest first) and limit results
    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults)
        .map(({ score, ...result }) => result)
}
