/**
 * Table of Contents item interface
 */
export interface TOCItem {
    id: string
    text: string
    level: number
}

/**
 * Blog post metadata interface
 */
export interface BlogPost {
    slug: string
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
}

/**
 * Blog post with content interface
 */
export interface BlogPostWithContent extends BlogPost {
    content: string
}

/**
 * Blog post card props
 */
export interface BlogPostCardProps {
    post: BlogPost
    featured?: boolean
    className?: string
}

/**
 * Blog post grid props
 */
export interface BlogPostGridProps {
    posts: BlogPost[]
    title?: string
    showFeatured?: boolean
    limit?: number
    className?: string
}

/**
 * Featured posts props
 */
export interface FeaturedPostsProps {
    posts: BlogPost[]
    title?: string
    limit?: number
    className?: string
}
