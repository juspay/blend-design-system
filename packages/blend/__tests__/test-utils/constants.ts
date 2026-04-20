/**
 * Shared constants for testing
 * Centralizes test configuration and thresholds
 */

// Performance thresholds (in milliseconds)
export const PERFORMANCE_THRESHOLDS = {
    // Initial render thresholds
    render: {
        simple: 50, // Simple component render
        complex: 50, // Complex component with multiple props
        batch: 1, // Per-component in batch rendering
    },

    // Re-render thresholds
    reRender: {
        sameProps: 10, // Re-render with same props
        propChange: 10, // Re-render with prop changes
        stateChange: 16, // State change (60fps threshold)
    },

    // Animation thresholds
    animation: {
        transition: 10, // State transitions
        hover: 50, // Hover interactions
        consistency: 10, // Standard deviation for consistency
    },

    // Memory thresholds
    memory: {
        leak: 1000000, // 1MB threshold for memory leaks
    },
} as const

// Common test IDs and selectors
export const TEST_IDS = {
    button: {
        default: 'button-test',
        icon: 'mock-icon',
        text: 'button-text',
        leftSlot: 'button-left-slot',
        rightSlot: 'button-right-slot',
    },
} as const

// Accessibility requirements
export const A11Y_REQUIREMENTS = {
    minTouchTarget: 44, // Minimum touch target size in pixels
    contrastRatios: {
        normal: 4.5, // WCAG AA for normal text
        large: 3, // WCAG AA for large text
    },
    focusIndicator: {
        minWidth: 2, // Minimum focus indicator width
    },
} as const

// Test data sets
export const TEST_DATA = {
    // Common text values for testing
    text: {
        short: 'OK',
        medium: 'Click me',
        long: 'This is a very long button text that might wrap',
        empty: '',
        special: 'Button with special chars: @#$%',
    },

    // Common aria labels
    ariaLabels: {
        save: 'Save document',
        delete: 'Delete item',
        close: 'Close dialog',
        menu: 'Open menu',
        toggle: 'Toggle setting',
    },

    // Test URLs and IDs
    ids: {
        form: 'test-form',
        describedBy: 'help-text',
        controls: 'panel-1',
    },
} as const

// Keyboard keys for testing
export const KEYBOARD_KEYS = {
    enter: '{Enter}',
    space: ' ',
    tab: '{Tab}',
    escape: '{Escape}',
    arrowDown: '{ArrowDown}',
    arrowUp: '{ArrowUp}',
} as const

// Breakpoint configurations for responsive testing
export const TEST_BREAKPOINTS = {
    mobile: {
        width: 375,
        height: 667,
        query: '(max-width: 640px)',
    },
    tablet: {
        width: 768,
        height: 1024,
        query: '(min-width: 641px) and (max-width: 1024px)',
    },
    desktop: {
        width: 1440,
        height: 900,
        query: '(min-width: 1025px)',
    },
} as const

// Error messages for assertions
export const ERROR_MESSAGES = {
    performance: {
        renderTime: (actual: number, expected: number) =>
            `Render time ${actual}ms exceeds threshold ${expected}ms`,
        memory: (diff: number) =>
            `Memory leak detected: ${diff} bytes increase`,
    },
    accessibility: {
        noViolations: 'Component has accessibility violations',
        missingLabel: 'Component missing accessible label',
        lowContrast: 'Component has insufficient color contrast',
    },
    functionality: {
        notRendered: 'Component did not render',
        wrongRole: (expected: string, actual: string) =>
            `Expected role "${expected}" but got "${actual}"`,
    },
} as const

// Test environment detection
export const TEST_ENV = {
    isCI: process.env.CI === 'true',
    isDebug: process.env.DEBUG === 'true',
    browser: process.env.TEST_BROWSER || 'jsdom',
} as const

// Utility function to get environment-specific thresholds
export const getThreshold = (
    category: keyof typeof PERFORMANCE_THRESHOLDS,
    type: string
): number => {
    const categoryThresholds = PERFORMANCE_THRESHOLDS[category] as Record<
        string,
        number
    >
    const baseThreshold = categoryThresholds[type]

    // Adjust thresholds for CI environment (usually slower)
    if (TEST_ENV.isCI) {
        return baseThreshold * 1.5
    }

    return baseThreshold
}
