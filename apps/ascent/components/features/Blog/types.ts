import { ReactElement } from 'react'

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

/**
 * Blog header props
 */
export interface BlogHeaderProps {
    title?: string
    description?: string
    className?: string
}

/**
 * Blog sidebar props
 */
export interface BlogSidebarProps {
    categories: string[]
    tags: string[]
    recentPosts: BlogPost[]
    className?: string
}

/**
 * Blog table of contents props
 */
export interface BlogTableOfContentsProps {
    items: TOCItem[]
    activeId?: string
    onItemClick?: (id: string) => void
    className?: string
}

/**
 * Blog post with TOC props
 */
export interface BlogPostWithTOCProps {
    post: BlogPost
    content: ReactElement
    headings: TOCItem[]
    className?: string
}

/**
 * Blog post content props
 */
export interface BlogPostContentProps {
    content: ReactElement
    className?: string
}

/**
 * Blog layout props
 */
export interface BlogLayoutProps {
    children: React.ReactNode
    sidebar?: React.ReactNode
    className?: string
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
    label: string
    href?: string
    current?: boolean
}

/**
 * Breadcrumb props
 */
export interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

/**
 * Author info interface
 */
export interface AuthorInfo {
    name: string
    avatar?: string
    bio?: string
    social?: {
        twitter?: string
        github?: string
        linkedin?: string
    }
}

/**
 * Blog post author props
 */
export interface BlogPostAuthorProps {
    author: AuthorInfo | string
    publishDate: string
    readTime?: string
    className?: string
}

/**
 * Tag props
 */
export interface TagProps {
    tag: string
    count?: number
    active?: boolean
    onClick?: (tag: string) => void
    className?: string
}

/**
 * Category props
 */
export interface CategoryProps {
    category: string
    count?: number
    active?: boolean
    onClick?: (category: string) => void
    className?: string
}

/**
 * Search result interface
 */
export interface BlogSearchResult {
    post: BlogPost
    matches: {
        title?: boolean
        description?: boolean
        content?: boolean
        tags?: boolean
    }
    score: number
}

/**
 * Blog search props
 */
export interface BlogSearchProps {
    onSearch: (query: string) => void
    results?: BlogSearchResult[]
    loading?: boolean
    placeholder?: string
    className?: string
}

/**
 * Pagination props
 */
export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    showFirstLast?: boolean
    showPrevNext?: boolean
    className?: string
}

/**
 * Blog filter state
 */
export interface BlogFilterState {
    category?: string
    tags: string[]
    search?: string
    sortBy: 'date' | 'title' | 'readTime'
    sortOrder: 'asc' | 'desc'
}

/**
 * Blog filter props
 */
export interface BlogFilterProps {
    filters: BlogFilterState
    onFiltersChange: (filters: Partial<BlogFilterState>) => void
    categories: string[]
    tags: string[]
    className?: string
}

/**
 * Related posts props
 */
export interface RelatedPostsProps {
    currentPost: BlogPost
    relatedPosts: BlogPost[]
    title?: string
    limit?: number
    className?: string
}

/**
 * Blog navigation props (previous/next)
 */
export interface BlogNavigationProps {
    previousPost?: BlogPost
    nextPost?: BlogPost
    className?: string
}

/**
 * Blog stats interface
 */
export interface BlogStats {
    totalPosts: number
    totalCategories: number
    totalTags: number
    averageReadTime: number
    lastUpdated: string
}

/**
 * Blog archive props
 */
export interface BlogArchiveProps {
    posts: BlogPost[]
    groupBy: 'year' | 'month' | 'category'
    className?: string
}
