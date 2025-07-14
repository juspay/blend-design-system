import { TOCItem } from '@/app/components/TableOfContents'

// Function to generate a slug from text
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// Function to normalize heading levels based on actual hierarchy
function normalizeHeadingLevels(
    headings: Array<{ level: number; text: string; id: string }>
): TOCItem[] {
    if (headings.length === 0) return []

    // Find the minimum heading level to normalize from
    const minLevel = Math.min(...headings.map((h) => h.level))

    return headings.map((heading) => ({
        ...heading,
        level: heading.level - minLevel + 1, // Normalize so the lowest level becomes 1
    }))
}

// Function to extract headings from MDX content
export function extractHeadings(content: string): TOCItem[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings: Array<{ level: number; text: string; id: string }> = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length // Number of # symbols
        const text = match[2].trim()
        const id = generateSlug(text)

        // Include h1 through h6 headings
        if (level >= 1 && level <= 6) {
            headings.push({
                id,
                text,
                level,
            })
        }
    }

    // Normalize the heading levels based on the actual hierarchy
    return normalizeHeadingLevels(headings)
}
