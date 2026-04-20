/**
 * Shared Accessibility Configuration for Storybook
 *
 * This file provides reusable accessibility testing configurations
 * that can be imported and used across all component stories.
 *
 * Testing Strategy:
 * - Storybook a11y addon: Component-level checks (contrast, labels, roles)
 * - Chromatic: Visual regression (focus rings, hover/active, disabled states)
 * - jest-axe: Unit test coverage (ARIA, roles, labels, contrast, WCAG rules)
 * - axe-playwright: E2E flows (multi-step, focus traps, tabbable elements, AAA rules)
 * - Screen readers: Manual verification (VoiceOver/NVDA for context, live announcements)
 *
 * All reports are visible in Storybook as the single source of truth.
 */

/**
 * Base accessibility rules for all components
 * These rules are enabled globally in preview.tsx
 *
 * Disabled rules (false positives):
 * - 'nested-interactive': False positive - buttons with decorative icons/SVGs are flagged incorrectly
 * - 'focus-order-semantics': False positive - buttons don't need focusable descendants
 * - 'tabindex': Handled at component level - buttons use tabIndex={-1} for disabled only
 */
export const BASE_A11Y_RULES = {
    'color-contrast': true,
    'keyboard-navigation': true,
    'aria-required-attributes': true,
    'aria-hidden-focus': true,
    'button-name': true,
    'link-name': true,
    'nested-interactive': false, // Disabled: false positive for buttons with decorative icons
    'focus-order-semantics': false, // Disabled: buttons don't need focusable descendants
    tabindex: false, // Disabled: handled at component level (tabIndex={-1} for disabled)
    'touch-target-size': true, // Enabled: WCAG 2.2 Level AA (24px) and AAA (44px) requirements
    'aria-valid-attr-value': true, // Ensure ARIA attribute values are valid
    'aria-hidden-body': true, // Ensure aria-hidden is not on body element
    'aria-allowed-attr': false, // Disabled: false positive for aria-live on VisuallyHidden elements
} as const

/**
 * Component-specific accessibility rule sets
 * Use these in individual story parameters
 */
export const A11Y_RULE_SETS = {
    /**
     * For interactive components (buttons, links, inputs)
     * Disabled rules:
     * - 'nested-interactive': False positive - buttons with icons/SVGs are flagged incorrectly
     * - 'focus-order-semantics': False positive - buttons don't need focusable descendants
     * - 'tabindex': Handled at component level - buttons use tabIndex={-1} for disabled only
     */
    interactive: {
        'button-name': true,
        'link-name': true,
        'keyboard-navigation': true,
        'aria-required-attributes': true,
        'color-contrast': true,
        'aria-allowed-attr': false, // Disabled: false positive for aria-live on VisuallyHidden elements (valid usage)
        'nested-interactive': false, // Disabled: false positive for buttons with icons
        'focus-order-semantics': false, // Disabled: buttons don't need focusable descendants
        tabindex: false, // Disabled: handled at component level
    },
    /**
     * For form components (inputs, selects, checkboxes)
     */
    form: {
        label: true,
        'keyboard-navigation': true,
        'aria-required-attributes': true,
        'color-contrast': true,
        'aria-hidden-focus': true,
    },
    /**
     * For navigation components (menus, tabs, breadcrumbs)
     */
    navigation: {
        'keyboard-navigation': true,
        'aria-required-attributes': true,
        'aria-hidden-focus': true,
        'color-contrast': true,
    },
    /**
     * For content components (cards, alerts, modals)
     */
    content: {
        'color-contrast': true,
        'aria-required-attributes': true,
        'heading-order': true,
    },
    /**
     * For icon-only components
     */
    iconOnly: {
        'button-name': true,
        'link-name': true,
        'keyboard-navigation': true,
        'color-contrast': true,
    },
} as const

/**
 * Base a11y configuration for Storybook addon
 */
export const BASE_A11Y_CONFIG = {
    config: {
        rules: Object.entries(BASE_A11Y_RULES).map(([id, enabled]) => ({
            id,
            enabled,
        })),
    },
    options: {
        checks: {
            'color-contrast': {
                options: { noScroll: true },
            },
        },
        restoreScroll: true,
        // Run WCAG 2.2 rules (latest standard) - includes 2.0, 2.1, and 2.2 success criteria
        runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'wcag22aaa'],
        },
    },
}

/**
 * Get a11y config for a specific component type
 */
export function getA11yConfig(
    ruleSet: keyof typeof A11Y_RULE_SETS = 'interactive'
) {
    const rules = A11Y_RULE_SETS[ruleSet]
    return {
        config: {
            rules: Object.entries(rules).map(([id, enabled]) => ({
                id,
                enabled,
            })),
        },
        options: {
            checks: {
                'color-contrast': {
                    options: { noScroll: true },
                },
            },
            restoreScroll: true,
            // Run WCAG 2.2 rules (latest standard) - includes 2.0, 2.1, and 2.2 success criteria
            runOnly: {
                type: 'tag',
                values: [
                    'wcag2a',
                    'wcag2aa',
                    'wcag21aa',
                    'wcag22aa',
                    'wcag22aaa',
                ],
            },
        },
    }
}

/**
 * Chromatic configuration for visual regression testing
 * Tests: Focus rings, hover/active states, disabled states, state changes
 */
export const CHROMATIC_CONFIG = {
    viewports: [375, 768, 1200] as const,
    delay: 300,
} as const

/**
 * Accessibility testing documentation
 *
 * Where to find reports:
 *
 * 1. Storybook a11y addon (Accessibility panel):
 *    - Component-level checks
 *    - Color contrast violations
 *    - Missing labels/roles
 *    - Keyboard navigation issues
 *    - View in: Storybook UI → Accessibility panel
 *
 * 2. Chromatic (Visual regression):
 *    - Focus ring visibility
 *    - Hover/active state changes
 *    - Disabled state appearance
 *    - Responsive behavior
 *    - View in: Chromatic dashboard (link in Storybook toolbar)
 *
 * 3. jest-axe (Unit tests):
 *    - ARIA attribute validation
 *    - Role verification
 *    - Label completeness
 *    - WCAG rule compliance
 *    - View in: Test output (run `pnpm test`)
 *
 * 4. axe-playwright (E2E tests - optional):
 *    - Multi-step user flows
 *    - Focus trap validation
 *    - Tabbable element order
 *    - AAA rule compliance
 *    - View in: Test output (run `pnpm test:e2e`)
 *
 * 5. Screen readers (Manual):
 *    - Context announcements
 *    - Live region updates
 *    - Final verification
 *    - View in: Manual testing checklist
 */
export const A11Y_TESTING_INFO = {
    tools: {
        'storybook-a11y': {
            purpose: 'Component-level checks, contrast, labels, roles',
            location: 'Storybook UI → Accessibility panel',
            config: 'preview.tsx or story parameters',
        },
        chromatic: {
            purpose: 'Focus rings, hover/active, disabled, state changes',
            location: 'Chromatic dashboard',
            config: 'story parameters.chromatic',
        },
        'jest-axe': {
            purpose: 'ARIA, roles, labels, contrast, WCAG rules',
            location: 'Test output (pnpm test)',
            config: '__tests__/components/**/*.accessibility.test.tsx',
        },
        'axe-playwright': {
            purpose:
                'Multi-step flows, focus traps, tabbable elements, AAA rules',
            location: 'Test output (pnpm test:e2e)',
            config: '__tests__/e2e/**/*.spec.ts',
            optional: true,
        },
        'screen-readers': {
            purpose: 'Context, live announcements, final verification',
            location: 'Manual testing',
            tools: ['VoiceOver (macOS)', 'NVDA (Windows)'],
        },
    },
} as const
