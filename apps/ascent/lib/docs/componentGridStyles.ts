/**
 * Docs configuration
 * Uses shared configuration with docs-specific overrides
 */

import {
    SHARED_ROUTES,
    SHARED_CONTENT_PATHS,
    SHARED_CONFIG_PATTERNS,
} from '@/lib/config'

// Core docs configuration
export const DOCS_CONFIG = {
    // Layout settings
    title: 'Blend Docs',
    baseRoute: SHARED_ROUTES.DOCS,
    contentPath: SHARED_CONTENT_PATHS.DOCS_CONTENT,
    maxWidth: SHARED_CONFIG_PATTERNS.CONTAINER_WIDTHS.WIDE,
    containerPadding: SHARED_CONFIG_PATTERNS.CONTAINER_PADDING.COMPACT,

    // Grid settings
    gridCols: SHARED_CONFIG_PATTERNS.GRID_LAYOUTS.TWO_COLUMN,
    gridGap: 'gap-4',

    // Content settings
    defaultDescription:
        'Here you can find all the components available in the library. We are working on adding more components.',
} as const

// Component card styling
export const COMPONENT_CARD_STYLES = {
    container:
        'group block p-6 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200',
    content: 'flex items-start gap-4',
    iconContainer:
        'flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center',
    iconColor: 'text-[var(--foreground)]',
    textContainer: 'flex-1 min-w-0',
    title: 'text-lg font-medium text-[var(--foreground)] mb-2',
    description: 'text-[var(--muted-foreground)] text-sm leading-relaxed',
    arrow: 'flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200',
    arrowIcon: 'text-[var(--muted-foreground)]',
} as const

// Page layout classes
export const PAGE_LAYOUT = {
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-4 not-prose',
} as const

// Arrow icon SVG path
export const ARROW_ICON_PATH = 'm9 18 6-6-6-6'
