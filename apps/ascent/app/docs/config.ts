/**
 * Docs configuration
 * Uses shared configuration with docs-specific overrides
 */

import {
    SHARED_ROUTES,
    SHARED_METADATA_DEFAULTS,
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

// SEO metadata using shared defaults
export const DOCS_METADATA = {
    title: 'Blend Design System Documentation',
    description:
        'Complete documentation for the Blend Design System components and utilities',
    ...SHARED_METADATA_DEFAULTS,
} as const

// Component card styling
export const COMPONENT_CARD_STYLES = {
    container:
        'group block p-6 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200',
    content: 'flex items-start gap-4',
    iconContainer:
        'flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center',
    iconColor: 'text-[var(--muted-foreground)]',
    textContainer: 'flex-1 min-w-0',
    title: 'text-lg font-medium text-[var(--foreground)] mb-2',
    description: 'text-[var(--muted-foreground)] text-sm leading-relaxed',
    arrow: 'flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200',
    arrowIcon: 'text-[var(--muted-foreground)]',
} as const

// Page layout classes
export const PAGE_LAYOUT = {
    wrapper: 'w-full flex-1 flex',
    content: 'flex-1 gap-2',
    article: 'prose py-10 max-w-[80ch] mx-auto overflow-x-hidden px-4 md:px-2',
    title: 'scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-[var(--primary)] mb-2',
    subtitle: 'mt-2 text-[var(--muted-foreground)] mb-8',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-4 not-prose',
    toc: ' max-w-[240px] w-full',
    tocSticky: 'sticky top-4',
} as const

// Arrow icon SVG path
export const ARROW_ICON_PATH = 'm9 18 6-6-6-6'

// Routes
export const DOCS_ROUTES = {
    HOME: '/docs',
    COMPONENTS: '/docs/components',
} as const
