/**
 * Simplified blog configuration
 * Consolidated from constants.ts and config.ts
 */

// Core blog configuration
export const BLOG_CONFIG = {
    // Layout settings
    maxWidth: 'max-w-6xl',
    containerPadding: 'px-6 py-8',

    // Content limits
    featuredPostsLimit: 3,
    relatedPostsLimit: 3,
    recentPostsLimit: 5,

    // Section titles
    featuredSectionTitle: 'Featured Posts',
    latestSectionTitle: 'Latest Posts',
    allSectionTitle: 'All Posts',
} as const

// SEO metadata
export const BLOG_METADATA = {
    title: 'Blend Design System Blog',
    description:
        'Latest updates, tutorials, and insights about the Blend Design System',
    author: 'Blend Team',
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    language: 'en-US',
} as const

// External URLs
export const EXTERNAL_URLS = {
    GITHUB: 'https://github.com/juspay/blend-design-system',
    STORYBOOK: 'https://juspay.design/storybook',
} as const

// Navigation labels
export const NAVIGATION_LABELS = {
    BLOG_TITLE: 'Blend Blog',
    VIEW_DOCS: 'View Documentation',
    VIEW_CHANGELOG: 'View Changelog',
    VIEW_STORYBOOK: 'View Storybook',
    VIEW_GITHUB: 'View on GitHub',
} as const

// Route paths
export const ROUTES = {
    BLOG: '/blog',
    DOCS: '/docs',
    CHANGELOG: '/changelog',
} as const

// CSS classes for consistent styling
export const CSS_CLASSES = {
    NAV_BUTTON:
        'p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2',
    NAV_LINK:
        'flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors',
} as const

// Layout configuration
export const LAYOUT_CONFIG = {
    NAVBAR_HEIGHT: 'var(--navbar-height)',
    MAX_SEARCH_WIDTH: 'max-w-sm',
    ICON_SIZE: 18,
} as const

// Icon SVG paths (simplified - only what's used)
export const ICON_PATHS = {
    DOCUMENT: {
        PATH_1: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
        PATH_2: '14,2 14,8 20,8',
        LINE_1: { x1: '16', y1: '13', x2: '8', y2: '13' },
        LINE_2: { x1: '16', y1: '17', x2: '8', y2: '17' },
        POLYLINE: '10,9 9,9 8,9',
    },
    CHANGELOG: {
        PATH_1: 'M3 3v18h18',
        PATH_2: 'M7 12l3 3 7-7',
    },
    STORYBOOK: {
        PATH_1: 'M12 2L2 7l10 5 10-5-10-5z',
        PATH_2: 'M2 17l10 5 10-5',
        PATH_3: 'M2 12l10 5 10-5',
    },
} as const

// Content paths
export const CONTENT_PATHS = {
    BLOG_CONTENT: 'app/blog/content',
} as const

// Default frontmatter values
export const DEFAULT_FRONTMATTER = {
    author: 'Blend Team',
    category: 'general',
    tags: [],
    featured: false,
    readTime: '5 min read',
} as const
