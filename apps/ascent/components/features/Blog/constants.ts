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

// ARIA labels and accessibility
export const ARIA_LABELS = {
    BREADCRUMB: 'Breadcrumb',
    TOC_NAVIGATION: 'Table of contents navigation',
    TOC_TITLE: 'On this page',
    BACK_TO_BLOG: 'Back to Blog',
    AUTHOR_AVATAR: 'Author avatar',
} as const

// Icon paths
export const ICON_PATHS = {
    CHEVRON_RIGHT:
        'M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z',
    CHEVRON_LEFT:
        'M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z',
    HOME: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    HOME_INTERIOR: '9,22 9,12 15,12 15,22',
} as const
