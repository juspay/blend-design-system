/**
 * Essential blog utility functions
 * Simplified to include only actively used utilities
 */

import { BlogPost, BlogPostFrontmatter } from './types'

/**
 * Validates blog post frontmatter
 * @param frontmatter - Raw frontmatter object
 * @returns Validation result with errors
 */
export function validateBlogPostFrontmatter(frontmatter: any): {
    isValid: boolean
    errors: string[]
    data?: BlogPostFrontmatter
} {
    const errors: string[] = []

    // Required fields validation
    if (!frontmatter.title || typeof frontmatter.title !== 'string') {
        errors.push('Title is required and must be a string')
    }

    if (
        !frontmatter.description ||
        typeof frontmatter.description !== 'string'
    ) {
        errors.push('Description is required and must be a string')
    }

    if (!frontmatter.author || typeof frontmatter.author !== 'string') {
        errors.push('Author is required and must be a string')
    }

    if (
        !frontmatter.publishDate ||
        typeof frontmatter.publishDate !== 'string'
    ) {
        errors.push('Publish date is required and must be a string')
    }

    if (!frontmatter.category || typeof frontmatter.category !== 'string') {
        errors.push('Category is required and must be a string')
    }

    // Optional fields validation
    if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
        errors.push('Tags must be an array')
    }

    if (frontmatter.featured && typeof frontmatter.featured !== 'boolean') {
        errors.push('Featured must be a boolean')
    }

    if (frontmatter.draft && typeof frontmatter.draft !== 'boolean') {
        errors.push('Draft must be a boolean')
    }

    // Date validation
    if (frontmatter.publishDate && isNaN(Date.parse(frontmatter.publishDate))) {
        errors.push('Publish date must be a valid date')
    }

    if (
        frontmatter.lastModified &&
        isNaN(Date.parse(frontmatter.lastModified))
    ) {
        errors.push('Last modified date must be a valid date')
    }

    return {
        isValid: errors.length === 0,
        errors,
        data:
            errors.length === 0
                ? (frontmatter as BlogPostFrontmatter)
                : undefined,
    }
}

/**
 * Calculates estimated reading time for content
 * @param content - Blog post content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time string
 */
export function calculateReadingTime(
    content: string,
    wordsPerMinute: number = 200
): string {
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
}

/**
 * Generates SEO-friendly slug from title
 * @param title - Blog post title
 * @returns URL-safe slug
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Extracts excerpt from content
 * @param content - Full blog post content
 * @param maxLength - Maximum excerpt length (default: 160)
 * @returns Excerpt string
 */
export function extractExcerpt(
    content: string,
    maxLength: number = 160
): string {
    // Remove markdown syntax and HTML tags
    const cleanContent = content
        .replace(/#{1,6}\s/g, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove markdown links
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim()

    if (cleanContent.length <= maxLength) {
        return cleanContent
    }

    // Find the last complete word within the limit
    const truncated = cleanContent.substring(0, maxLength)
    const lastSpaceIndex = truncated.lastIndexOf(' ')

    return lastSpaceIndex > 0
        ? truncated.substring(0, lastSpaceIndex) + '...'
        : truncated + '...'
}

/**
 * Sorts posts by various criteria
 * @param posts - Array of blog posts
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted posts
 */
export function sortPosts(
    posts: BlogPost[],
    sortBy: 'date' | 'title' | 'author' | 'category' = 'date',
    order: 'asc' | 'desc' = 'desc'
): BlogPost[] {
    const sorted = [...posts].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case 'date':
                comparison =
                    new Date(a.publishDate).getTime() -
                    new Date(b.publishDate).getTime()
                break
            case 'title':
                comparison = a.title.localeCompare(b.title)
                break
            case 'author':
                comparison = a.author.localeCompare(b.author)
                break
            case 'category':
                comparison = a.category.localeCompare(b.category)
                break
        }

        return order === 'asc' ? comparison : -comparison
    })

    return sorted
}

/**
 * Searches posts by query
 * @param posts - Array of blog posts
 * @param query - Search query
 * @returns Filtered posts matching the query
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
    if (!query.trim()) {
        return posts
    }

    const searchTerm = query.toLowerCase().trim()

    return posts.filter((post) => {
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        )
    })
}

/**
 * Formats date for display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting
 * @returns Formatted date string
 */
export function formatDate(
    dateString: string,
    locale: string = 'en-US'
): string {
    try {
        return new Date(dateString).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error formatting date:', error)
        return dateString
    }
}
