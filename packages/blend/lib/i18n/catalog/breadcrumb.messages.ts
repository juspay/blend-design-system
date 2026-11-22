/**
 * Strings for Breadcrumb and BreadcrumbV2.
 *
 * The `-unnamed` sentences are whole sentences rather than the named template
 * with a fallback noun substituted in: the fallback's case and article differ
 * between "Current page: Breadcrumb item" and "Navigate to breadcrumb item"
 * in English already, and differ further elsewhere.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const BREADCRUMB_MESSAGES = {
    'breadcrumb.a11y.navigation': 'Breadcrumb navigation',
    'breadcrumb.a11y.current-page': 'Current page: {label}',
    'breadcrumb.a11y.navigate-to': 'Navigate to {label}',
    'breadcrumb.a11y.current-page-unnamed': 'Current page: Breadcrumb item',
    'breadcrumb.a11y.navigate-to-unnamed': 'Navigate to breadcrumb item',
    'breadcrumb.label.item-fallback': 'Breadcrumb',
    'breadcrumb.a11y.show-more.one': 'Show {count} more breadcrumb item',
    'breadcrumb.a11y.show-more.other': 'Show {count} more breadcrumb items',
} as const
