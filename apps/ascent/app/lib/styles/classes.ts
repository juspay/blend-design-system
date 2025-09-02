/**
 * Shared CSS classes across all modules
 * Consistent styling patterns for better maintainability
 * Consolidated from app/shared/styles/classes.ts
 */

// Navigation styling - used in all module layouts
export const SHARED_NAV_CLASSES = {
    BUTTON: 'p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2',
    LINK: 'flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors',
    BRAND_LINK:
        'flex items-center font-semibold text-lg text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors',
} as const

// Layout classes - consistent layout patterns
export const SHARED_LAYOUT_CLASSES = {
    MAIN_CONTAINER: 'min-h-screen w-screen bg-[var(--background)]',
    NAVBAR: 'h-[var(--navbar-height)] flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--sidebar-background)] backdrop-blur-sm sticky top-0 z-50',
    CONTENT_AREA: 'w-screen h-[calc(100vh-var(--navbar-height))] flex',
    SIDEBAR:
        'doc-sidebar w-[240px] h-[calc(100vh-var(--navbar-height))] overflow-hidden',
    MAIN_CONTENT:
        'main-content-area flex-1 h-[calc(100vh-var(--navbar-height))] overflow-y-auto',
    NAVBAR_LEFT: 'flex items-center gap-4',
    NAVBAR_RIGHT: 'flex items-center gap-3',
} as const

// Content styling - consistent content presentation
export const SHARED_CONTENT_CLASSES = {
    ARTICLE: 'prose prose-gray dark:prose-invert max-w-none',
    ARTICLE_CONTAINER:
        'prose py-10 max-w-[80ch] mx-auto overflow-x-hidden px-4 md:px-2',
    PAGE_TITLE:
        'scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-[var(--primary)] mb-2',
    PAGE_SUBTITLE: 'mt-2 text-[var(--muted-foreground)] mb-8',
    SECTION_TITLE: 'text-2xl font-semibold text-[var(--foreground)] mb-4',
} as const

// Card styling - consistent card patterns
export const SHARED_CARD_CLASSES = {
    CONTAINER:
        'group block p-6 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200',
    CONTENT: 'flex items-start gap-4',
    ICON_CONTAINER:
        'flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center',
    ICON_COLOR: 'text-[var(--muted-foreground)]',
    TEXT_CONTAINER: 'flex-1 min-w-0',
    TITLE: 'text-lg font-medium text-[var(--foreground)] mb-2',
    DESCRIPTION: 'text-[var(--muted-foreground)] text-sm leading-relaxed',
    ARROW: 'flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200',
    ARROW_ICON: 'text-[var(--muted-foreground)]',
} as const

// Grid styling - consistent grid layouts
export const SHARED_GRID_CLASSES = {
    TWO_COLUMN: 'grid grid-cols-1 lg:grid-cols-2 gap-4',
    THREE_COLUMN: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    FOUR_COLUMN: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
    NOT_PROSE: 'not-prose',
} as const

// Table of Contents styling
export const SHARED_TOC_CLASSES = {
    CONTAINER: ' max-w-[240px] w-full',
    STICKY: 'sticky top-4',
} as const

// Utility classes for common patterns
export const SHARED_UTILITY_CLASSES = {
    FLEX_CENTER: 'flex items-center justify-center',
    FLEX_BETWEEN: 'flex items-center justify-between',
    FLEX_START: 'flex items-center justify-start',
    FLEX_END: 'flex items-center justify-end',
    FULL_WIDTH: 'w-full',
    FULL_HEIGHT: 'h-full',
    SCREEN_WIDTH: 'w-screen',
    SCREEN_HEIGHT: 'h-screen',
} as const

// All shared classes combined for easy importing
export const SHARED_CSS_CLASSES = {
    ...SHARED_NAV_CLASSES,
    ...SHARED_LAYOUT_CLASSES,
    ...SHARED_CONTENT_CLASSES,
    ...SHARED_CARD_CLASSES,
    ...SHARED_GRID_CLASSES,
    ...SHARED_TOC_CLASSES,
    ...SHARED_UTILITY_CLASSES,
} as const
