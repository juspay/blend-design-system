/**
 * Docs configuration
 * Uses shared configuration with docs-specific overrides
 */

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
