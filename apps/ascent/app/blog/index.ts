/**
 * Simplified blog module exports
 * Centralized exports for essential blog functionality
 */

// Core configuration and constants
export {
    BLOG_CONFIG,
    BLOG_METADATA,
    EXTERNAL_URLS,
    NAVIGATION_LABELS,
    ROUTES,
    CSS_CLASSES,
    LAYOUT_CONFIG,
    ICON_PATHS,
    CONTENT_PATHS,
    DEFAULT_FRONTMATTER,
} from './config'

// Essential types only
export type {
    BlogPost,
    BlogPostWithContent,
    TOCItem,
    BlogPostFrontmatter,
} from './types'

// Core utility functions
export {
    validateBlogPostFrontmatter,
    calculateReadingTime,
    generateSlug,
    extractExcerpt,
    formatDate,
    searchPosts,
    sortPosts,
} from './utils'

// Icon components
export * from './icons'

// Blog post utilities
export * from './utils/getBlogPosts'

// Re-export shared blog components for convenience
export {
    BlogHeader,
    BlogPostCard,
    BlogPostGrid,
    FeaturedPosts,
    BlogSidebar,
    BlogTableOfContents,
    BlogPostWithTOC,
} from '../components/features/Blog'
