/**
 * Strings shared by the Select family: SingleSelect, MultiSelect, their V2
 * generations and mobile drawers, SelectListV2 / MultiSelectListV2, and the
 * shared `Select/` internals.
 *
 * One fragment for the whole family, not one per component: the generations
 * render the same sentences, and separate copies are how translations drift.
 * Empty states reuse `common.empty.no-items` / `common.empty.no-results`.
 *
 * Values are transcribed verbatim so the migrated components render
 * byte-identical English.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const SELECT_MESSAGES = {
    'select.action.select-all': 'Select All',
    'select.action.clear-all': 'Clear all',

    'select.label.custom-value': 'Specify',
    // The option offered for a typed value that matches nothing. A template,
    // not concatenation: punctuation and quote marks differ by language.
    'select.label.custom-value-option': '{label}: "{value}"',
    'select.label.select-options': 'Select options',
    // MultiSelect V1's mobile drawer title. Title case differs from V2's, and
    // a shared key would change one generation's English output.
    'select.label.select-options-v1': 'Select Options',

    'select.placeholder.search': 'Search options...',
    'select.placeholder.search-short': 'Search',

    'select.status.searching': 'Searching…',

    'select.a11y.search': 'Search options',
    'select.a11y.searching': 'Searching',
    'select.a11y.results-updated': 'Search results updated',
    'select.a11y.clear-selection': 'Clear selection',
    'select.a11y.clear-selection-for': 'Clear selection for {label}',
} as const
