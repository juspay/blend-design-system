/**
 * Shared MDX utilities for docs, changelog, and blog
 * Centralized MDX compilation and metadata handling
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/mdx-components'

export interface MDXContent {
    content: React.ReactElement
    frontmatter: Record<string, any>
}

export interface MDXMetadata {
    title: string
    description?: string
    [key: string]: any
}

/**
 * Compiles MDX content from a file path
 * @param filePath - Full path to the MDX file
 * @returns Compiled MDX content and frontmatter
 */
export async function compileMDXFromFile(
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
 * Generates metadata for Next.js from frontmatter
 * @param frontmatter - MDX frontmatter object
 * @param slug - Page slug for fallback title
 * @param defaultTitle - Default title if not in frontmatter
 * @returns Next.js metadata object
 */
export function generateMetadataFromFrontmatter(
    frontmatter: Record<string, any>,
    slug: string,
    defaultTitle?: string
): MDXMetadata {
    return {
        title: frontmatter.title || defaultTitle || slug,
        description: frontmatter.description || `Content for ${slug}`,
        ...frontmatter,
    }
}

/**
 * Generates static params for all MDX files in a directory
 * @param contentDir - Directory containing MDX files (relative to process.cwd())
 * @returns Array of static params for Next.js
 */
export function generateStaticParamsFromMDX(
    contentDir: string
): Array<{ slug: string[] }> {
    try {
        const fullPath = path.join(process.cwd(), contentDir)
        const files = fs.readdirSync(fullPath)
        const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

        return mdxFiles.map((file) => ({
            slug: [file.replace('.mdx', '')],
        }))
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            `Error generating static params from ${contentDir}:`,
            error
        )
        return []
    }
}

/**
 * Checks if an MDX file exists in the content directory
 * @param contentDir - Directory containing MDX files
 * @param slug - File slug to check
 * @returns Whether the file exists
 */
export function mdxFileExists(contentDir: string, slug: string): boolean {
    try {
        const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`)
        return fs.existsSync(filePath)
    } catch {
        return false
    }
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
