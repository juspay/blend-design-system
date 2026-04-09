/**
 * Shared MDX utilities for docs, changelog, and blog
 * Centralized MDX compilation and metadata handling
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/mdx-components'

interface MDXContent {
    content: React.ReactElement
    frontmatter: Record<string, any>
}

/**
 * Compiles MDX content from a file path
 * @param filePath - Full path to the MDX file
 * @returns Compiled MDX content and frontmatter
 */
async function compileMDXFromFile(
    filePath: string
): Promise<MDXContent | null> {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data: frontmatter, content: source } = matter(fileContent)

        const { content } = await compileMDX({
            source,
            components,
            options: {
                parseFrontmatter: false,
            },
        })

        return { content, frontmatter }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error compiling MDX file ${filePath}:`, error)
        return null
    }
}

/**
 * Compiles MDX content from a content directory and slug
 * @param contentDir - Directory containing MDX files
 * @param slug - File slug (without .mdx extension)
 * @returns Compiled MDX content and frontmatter
 */
export async function compileMDXFromSlug(
    contentDir: string,
    slug: string
): Promise<MDXContent | null> {
    const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`)
    return compileMDXFromFile(filePath)
}

/**
 * Gets all MDX file slugs from a directory
 * @param contentDir - Directory containing MDX files
 * @returns Array of file slugs (without .mdx extension)
 */
export function getAllMDXSlugs(contentDir: string): string[] {
    try {
        const fullPath = path.join(process.cwd(), contentDir)
        const files = fs.readdirSync(fullPath)
        return files
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => file.replace('.mdx', ''))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error reading MDX files from ${contentDir}:`, error)
        return []
    }
}
