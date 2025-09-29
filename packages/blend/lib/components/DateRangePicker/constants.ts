// =============================================================================
// DATE RANGE PICKER CONSTANTS
// =============================================================================

export const DATE_RANGE_PICKER_CONSTANTS = {
    // Date formats
    DEFAULT_DATE_FORMAT: 'dd/MM/yyyy',
    TIME_FORMAT: 'HH:mm',

    // Tolerances and thresholds
    PRESET_DETECTION_TOLERANCE_MS: 60 * 1000, // 1 minute tolerance for time-based presets
    TIMEZONE_TOLERANCE_HOURS: 25, // 25 hours to handle all possible timezone differences

    // Calendar dimensions
    CALENDAR_CONTAINER_HEIGHT: 340,
    CALENDAR_LOAD_THRESHOLD: 100,
    MONTH_BUFFER_SIZE: 2,

    // Mobile picker
    MOBILE_PICKER: {
        ITEM_HEIGHT: 44,
        VISIBLE_ITEMS: 3,
    },

    // Animation and feedback
    HAPTIC_PATTERNS: {
        SELECTION: [8],
        IMPACT: [15],
        NOTIFICATION: [25, 40, 25],
    } as const,

    // Date ranges
    MIN_YEAR: 2012,
    MAX_YEAR_OFFSET: 10, // Current year + 10

    // Time increments
    TIME_MINUTE_INCREMENT: 15,

    // Scroll behavior
    SCROLL_DEBOUNCE_MS: 80,
    HAPTIC_COOLDOWN_MS: 50,
} as const
