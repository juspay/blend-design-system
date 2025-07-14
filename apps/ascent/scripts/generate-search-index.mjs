import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to extract sections from MDX
const extractSections = (content) => {
    const { content: mdxContent } = matter(content)
    const sections = []

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

// Function to extract text content from MDX
const extractTextFromMDX = (content) => {
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
const createExcerpt = (content, maxLength = 150) => {
    const text = extractTextFromMDX(content)
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

// Function to scan and index all MDX files
const buildSearchIndex = (contentDir) => {
    const index = {}

    const scanDirectory = (dirPath, basePath = '') => {
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

                        const searchResult = {
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

// Generate search index
const contentDir = path.join(__dirname, '../app/docs/content')
const searchIndex = buildSearchIndex(contentDir)

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public')
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
}

// Write search index to public directory
const outputPath = path.join(publicDir, 'search-index.json')
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2))

console.log(`✅ Search index generated at ${outputPath}`)
console.log(`📚 Indexed ${Object.keys(searchIndex).length} documents`)
