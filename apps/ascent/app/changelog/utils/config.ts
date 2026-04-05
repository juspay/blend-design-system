/**
 * Changelog configuration
 * Uses shared configuration with changelog-specific overrides
 */

import {
    SHARED_ROUTES,
    SHARED_LAYOUT_CONFIG,
    SHARED_NAVIGATION_LABELS,
    SHARED_METADATA_DEFAULTS,
    SHARED_CONTENT_PATHS,
    SHARED_CONFIG_PATTERNS,
} from '@/lib/config'

// Core changelog configuration
export const CHANGELOG_CONFIG = {
    // Layout settings
    title: 'Blend Changelog',
    baseRoute: SHARED_ROUTES.CHANGELOG,
    contentPath: SHARED_CONTENT_PATHS.CHANGELOG_CONTENT,
    maxWidth: SHARED_CONFIG_PATTERNS.CONTAINER_WIDTHS.NARROW,
    containerPadding: SHARED_CONFIG_PATTERNS.CONTAINER_PADDING.STANDARD,

    // Navigation
    sidebarWidth: SHARED_LAYOUT_CONFIG.SIDEBAR_WIDTH,

    // Content settings
    defaultDescription:
        'Welcome to the Blend Design System changelog - track all updates and improvements',
} as const

// Use shared navigation labels with changelog-specific additions
export const NAVIGATION_LABELS = {
    CHANGELOG_TITLE: 'Blend Changelog',
    ...SHARED_NAVIGATION_LABELS,
} as const

// Content paths using shared configuration
export const CONTENT_PATHS = {
    CHANGELOG_CONTENT: SHARED_CONTENT_PATHS.CHANGELOG_CONTENT,
} as const

// Default frontmatter values
export const DEFAULT_FRONTMATTER = {
    author: SHARED_METADATA_DEFAULTS.author,
    type: 'changelog',
} as const
