/**
 * Blog configuration
 * Uses shared configuration with blog-specific overrides
 */

import {
    SHARED_EXTERNAL_URLS,
    SHARED_ROUTES,
    SHARED_LAYOUT_CONFIG,
    SHARED_NAVIGATION_LABELS,
    SHARED_METADATA_DEFAULTS,
    SHARED_CONTENT_PATHS,
    SHARED_CONFIG_PATTERNS,
} from '@/lib/config'

// Core blog configuration
export const BLOG_CONFIG = {
    // Layout settings
    maxWidth: SHARED_CONFIG_PATTERNS.CONTAINER_WIDTHS.MEDIUM,
    containerPadding: SHARED_CONFIG_PATTERNS.CONTAINER_PADDING.STANDARD,

    // Content limits
    featuredPostsLimit: 3,
    relatedPostsLimit: 3,
    recentPostsLimit: 5,

    // Section titles
    featuredSectionTitle: 'Featured Posts',
    latestSectionTitle: 'Latest Posts',
    allSectionTitle: 'All Posts',
} as const

// SEO metadata using shared defaults
export const BLOG_METADATA = {
    title: 'Blend Design System Blog',
    description:
        'Latest updates, tutorials, and insights about the Blend Design System',
    ...SHARED_METADATA_DEFAULTS,
} as const

// Use shared external URLs
export const EXTERNAL_URLS = SHARED_EXTERNAL_URLS

// Use shared navigation labels with blog-specific additions
export const NAVIGATION_LABELS = {
    BLOG_TITLE: 'Blend Blog',
    ...SHARED_NAVIGATION_LABELS,
} as const

// Use shared routes
export const ROUTES = SHARED_ROUTES

// Use shared layout configuration
export const LAYOUT_CONFIG = SHARED_LAYOUT_CONFIG

// Content paths using shared configuration
export const CONTENT_PATHS = {
    BLOG_CONTENT: SHARED_CONTENT_PATHS.BLOG_CONTENT,
} as const

// Default frontmatter values
export const DEFAULT_FRONTMATTER = {
    author: SHARED_METADATA_DEFAULTS.author,
    category: 'general',
    tags: [],
    featured: false,
    readTime: '5 min read',
} as const
