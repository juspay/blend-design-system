/**
 * Strings shared across component families.
 *
 * Keep this fragment small. A string belongs here only when more than one
 * family genuinely renders the same sentence — otherwise it belongs in that
 * family's own fragment, so a consumer who never renders the family never
 * ships its strings.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const COMMON_MESSAGES = {
    'common.action.cancel': 'Cancel',
    'common.action.apply': 'Apply',
    'common.action.clear': 'Clear',
    'common.empty.no-results': 'No results found',
    'common.empty.no-items': 'No items available',
} as const
