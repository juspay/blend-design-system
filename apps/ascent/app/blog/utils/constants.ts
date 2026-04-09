// Blog component constants
export const BLOG_CONSTANTS = {
    // Table of Contents
    TOC: {
        INTERSECTION_OBSERVER: {
            ROOT_MARGIN: '-20% 0% -35% 0%',
            THRESHOLD: 0,
        },
        SCROLL_BEHAVIOR: 'smooth' as const,
        SCROLL_BLOCK: 'start' as const,
        SCROLL_DELAY: 100,
        SIDEBAR_WIDTH: 240,
        LEVEL_INDENT: 16,
        BASE_PADDING: 8,
    },

    // Date formatting
    DATE_FORMAT: {
        LOCALE: 'en-US',
        OPTIONS: {
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const,
        },
    },

    // CSS Custom Properties
    CSS_VARS: {
        NAVBAR_HEIGHT: '--navbar-height',
        FOREGROUND: '--foreground',
        MUTED_FOREGROUND: '--muted-foreground',
        MUTED: '--muted',
        BORDER: '--border',
    },

    // Breakpoints
    BREAKPOINTS: {
        SM: 640,
        MD: 768,
        LG: 1024,
        XL: 1280,
    },
} as const
