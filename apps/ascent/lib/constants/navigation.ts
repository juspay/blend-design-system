// Navigation-related constants
export const NAVIGATION_ZONES = {
    TOPBAR: 'topbar',
    SIDEBAR: 'sidebar',
    MAIN_CONTENT: 'main_content',
    TABLE_OF_CONTENTS: 'table_of_contents',
} as const

export const ZONE_SELECTORS = {
    [NAVIGATION_ZONES.TOPBAR]: 'nav',
    [NAVIGATION_ZONES.SIDEBAR]: '.doc-sidebar',
    [NAVIGATION_ZONES.MAIN_CONTENT]: '.main-content-area',
    [NAVIGATION_ZONES.TABLE_OF_CONTENTS]: '.doc-toc-ctr',
} as const

export const KEYBOARD_SHORTCUTS = {
    SEARCH: ['cmd+k', 'ctrl+k'],
    ZONE_TOPBAR: '1',
    ZONE_SIDEBAR: '2',
    ZONE_MAIN_CONTENT: '3',
    ZONE_TOC: '4',
} as const
