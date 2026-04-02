import { TOCItem } from '../../../components/layout/Navigation/TableOfContents'

// Function to generate a slug from text
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .replace(/^-+|-+$/g, '')
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
    const headings: Array<{ level: number; text: string; id: string }> = []
    const usedIds = new Set<string>()

    // Split content into lines and track code block state
    const lines = content.split('\n')
    let inCodeBlock = false

    for (const line of lines) {
        const trimmedLine = line.trim()

        // Toggle code block state when encountering fence
        if (trimmedLine.startsWith('```')) {
            inCodeBlock = !inCodeBlock
            continue
        }

        // Skip if we're inside a code block
        if (inCodeBlock) {
            continue
        }

        // Check if line is a heading (1-6 # characters followed by space)
        const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/)
        if (!headingMatch) {
            continue
        }

        const level = headingMatch[1].length
        const text = headingMatch[2].trim()
        const id = generateSlug(text)

        // Ensure unique IDs by appending a number if duplicate
        let counter = 1
        let uniqueId = id
        while (usedIds.has(uniqueId)) {
            uniqueId = `${id}-${counter}`
            counter++
        }
        usedIds.add(uniqueId)

        // Only include h1 and h2
        if (level >= 1 && level <= 2) {
            headings.push({
                id: uniqueId,
                text,
                level,
            })
        }
    }

    return headings
}
