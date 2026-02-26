/**
 * Module-specific configurations
 * Consolidated from app/shared/config/common.ts
 */

// External URLs - used across all modules
export const SHARED_EXTERNAL_URLS = {
    GITHUB: 'https://github.com/juspay/blend-design-system',
    STORYBOOK: 'https://juspay.design/storybook',
} as const

// Route paths - consistent across all modules
export const SHARED_ROUTES = {
    HOME: '/',
    DOCS: '/docs',
    BLOG: '/blog',
    CHANGELOG: '/changelog',
} as const

// Layout configuration - shared layout constants
export const SHARED_LAYOUT_CONFIG = {
    NAVBAR_HEIGHT: 'var(--navbar-height)',
    MAX_SEARCH_WIDTH: 'max-w-sm',
    ICON_SIZE: 18,
    SIDEBAR_WIDTH: 'w-[240px]',
} as const

// Navigation labels - consistent across all modules
export const SHARED_NAVIGATION_LABELS = {
    VIEW_DOCS: 'View Documentation',
    VIEW_BLOG: 'View Blog',
    VIEW_CHANGELOG: 'View Changelog',
    VIEW_STORYBOOK: 'View Storybook',
    VIEW_GITHUB: 'View on GitHub',
} as const

// Common metadata structure
export const SHARED_METADATA_DEFAULTS = {
    author: 'Blend Team',
    siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    language: 'en-US',
} as const

// Content paths pattern
export const SHARED_CONTENT_PATHS = {
    BLOG_CONTENT: 'app/blog/content',
    DOCS_CONTENT: 'app/docs/content',
    CHANGELOG_CONTENT: 'app/changelog/content',
} as const

// Common configuration patterns
export const SHARED_CONFIG_PATTERNS = {
    // Standard container widths
    CONTAINER_WIDTHS: {
        NARROW: 'max-w-4xl',
        MEDIUM: 'max-w-6xl',
        WIDE: 'max-w-[80ch]',
    },

    // Standard padding patterns
    CONTAINER_PADDING: {
        STANDARD: 'px-6 py-8',
        COMPACT: 'py-10 px-4 md:px-2',
        MINIMAL: 'px-4 py-6',
    },

    // Grid configurations
    GRID_LAYOUTS: {
        TWO_COLUMN: 'grid-cols-1 lg:grid-cols-2',
        THREE_COLUMN: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        FOUR_COLUMN: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
} as const
