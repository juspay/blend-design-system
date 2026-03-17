/**
 * Essential blog types
 * Simplified to include only actively used types
 */

// Import and re-export shared types for convenience
import type {
    BlogPost,
    BlogPostWithContent,
    TOCItem,
} from '@/components/features/Blog/types'

export type { BlogPost, BlogPostWithContent, TOCItem }

// Blog post validation schema
export interface BlogPostFrontmatter {
    title: string
    description: string
    author: string
    publishDate: string
    lastModified?: string
    tags: string[]
    category: string
    featured?: boolean
    coverImage?: string
    excerpt?: string
    readTime?: string
    draft?: boolean
}

// Blog configuration type
export interface BlogConfig {
    maxWidth: string
    containerPadding: string
    featuredPostsLimit: number
    relatedPostsLimit: number
    recentPostsLimit: number
    featuredSectionTitle: string
    latestSectionTitle: string
    allSectionTitle: string
}

// Blog metadata for SEO
export interface BlogMetadata {
    title: string
    description: string
    author: string
    siteUrl: string
    language: string
}
