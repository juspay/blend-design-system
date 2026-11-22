/**
 * Strings for Directory and VirtualizedDirectory.
 *
 * `{label}` is the consumer's own section or item label, interpolated as
 * given.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const DIRECTORY_MESSAGES = {
    'directory.a11y.navigation': 'Directory navigation',
    'directory.a11y.submenu': '{label} submenu',
    'directory.a11y.section': '{label} navigation',
} as const
