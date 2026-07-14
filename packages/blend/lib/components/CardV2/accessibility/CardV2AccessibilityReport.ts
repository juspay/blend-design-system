import type { AccessibilityReport } from '../../StatCard/accessibility/StatCardAccessibilityReport'

export const cardV2AccessibilityReport: AccessibilityReport = {
    componentName: 'CardV2',
    wcagVersion: '2.1',
    reportDate: new Date().toISOString().split('T')[0],
    conformanceLevel: 'Level AA',
    overallStatus: 'partial',
    summary:
        'CardV2 is a composable grouping surface with prop-based and compound APIs. The component supports semantic regions, generated accessible names and descriptions, keyboard-focusable interactive cards, selected/pressed state semantics, accessible action buttons through ButtonV2, and consumer-owned media alternatives. Automated axe tests cover default, media/action, compound, and interactive selected cards. Manual verification is still required for token contrast across light/dark themes and for consumer-provided media content.',
    criteria: [
        {
            id: '1.1.1',
            level: 'A',
            title: 'Non-text Content',
            status: 'compliant',
            description:
                'All non-text content that is part of the component must have a text alternative or be hidden when decorative.',
            implementation:
                'CardV2 media, leadingSlot, and trailingSlot are consumer-owned React nodes. The component preserves supplied image alt text and supports decorative icons via aria-hidden on consumer content. Action icons are rendered through ButtonV2 and can receive aria-label.',
            testResults:
                'Automated tests verify CardV2 with accessible image media and icon-only actions has no axe violations.',
            notes: 'Consumers must provide alt text for informative media or empty alt text/aria-hidden for decorative media.',
        },
        {
            id: '1.3.1',
            level: 'A',
            title: 'Info and Relationships',
            status: 'compliant',
            description:
                'Information, structure, and relationships conveyed visually can be programmatically determined.',
            implementation:
                'The root uses role="region" by default. Title, subtitle, and description receive generated IDs. Root aria-labelledby points to the title when present, and aria-describedby points to description or subtitle. Header and body sections use role="group" where appropriate.',
            testResults:
                'Automated tests verify aria-labelledby and aria-describedby are wired to generated IDs.',
        },
        {
            id: '1.3.2',
            level: 'A',
            title: 'Meaningful Sequence',
            status: 'compliant',
            description:
                'Content is presented in a meaningful DOM and reading sequence.',
            implementation:
                'Prop composition renders media, header, body, and footer in visual reading order. Compound composition preserves consumer-provided DOM order while sharing context and tokens.',
            testResults: 'Verified by render tests for prop and compound APIs.',
        },
        {
            id: '1.3.4',
            level: 'AA',
            title: 'Orientation',
            status: 'compliant',
            description:
                'Content does not restrict its view and operation to a single display orientation.',
            implementation:
                'CardV2 supports vertical and horizontal orientations and responsive sm/lg token sets.',
            testResults:
                'Automated tests cover horizontal cards with accessible media.',
        },
        {
            id: '1.4.3',
            level: 'AA',
            title: 'Contrast (Minimum)',
            status: 'unsure',
            description:
                'Text and images of text have sufficient contrast against their backgrounds.',
            implementation:
                'CardV2 typography and surfaces use theme tokens for light and dark modes.',
            testResults:
                'UNSURE: Requires manual contrast verification across all variants, states, and themes.',
            notes: 'Verify title, subtitle, description, borders, focus rings, and selected states in light and dark themes.',
        },
        {
            id: '1.4.4',
            level: 'AA',
            title: 'Resize Text',
            status: 'compliant',
            description:
                'Text can be resized up to 200 percent without loss of content or functionality.',
            implementation:
                'The layout uses flex containers, minWidth=0 where text can shrink, and optional truncateTitle for constrained titles.',
            testResults:
                'Automated render tests cover long wrapping titles and truncateTitle behavior.',
        },
        {
            id: '1.4.10',
            level: 'AA',
            title: 'Reflow',
            status: 'compliant',
            description:
                'Content can reflow without requiring two-dimensional scrolling at common viewport sizes.',
            implementation:
                'Cards support width constraints, horizontal/vertical orientation, wrapping action rows, and responsive token compaction.',
            testResults:
                'Demo and tests cover narrow cards, horizontal cards, and long content.',
        },
        {
            id: '1.4.11',
            level: 'AA',
            title: 'Non-text Contrast',
            status: 'unsure',
            description:
                'UI component boundaries, focus indicators, and graphical states have sufficient contrast.',
            implementation:
                'Borders, selected state, hover state, and focus-visible outline use theme tokens.',
            testResults:
                'UNSURE: Requires manual token contrast verification across variants and themes.',
        },
        {
            id: '2.1.1',
            level: 'A',
            title: 'Keyboard',
            status: 'compliant',
            description:
                'All functionality is operable through a keyboard interface.',
            implementation:
                'Interactive cards receive role="button" and tabIndex=0 by default. Actions are rendered through ButtonV2 and remain keyboard reachable.',
            testResults:
                'Automated tests verify interactive role, tabIndex, and reachable footer/body actions.',
        },
        {
            id: '2.4.3',
            level: 'A',
            title: 'Focus Order',
            status: 'compliant',
            description:
                'Focusable components receive focus in an order that preserves meaning and operability.',
            implementation:
                'DOM order follows media, header, body, actions, and footer order for prop composition. Compound composition preserves consumer-defined order.',
            testResults:
                'Verified structurally through render tests and ButtonV2 keyboard behavior.',
        },
        {
            id: '2.4.6',
            level: 'AA',
            title: 'Headings and Labels',
            status: 'compliant',
            description: 'Headings and labels describe topic or purpose.',
            implementation:
                'Title renders as h2 by default through CardV2Meta. aria-labelledby points to title when available; aria-label is used only when no title is present.',
            testResults:
                'Automated tests verify aria-label and aria-labelledby are not set together for titled cards.',
        },
        {
            id: '2.4.7',
            level: 'AA',
            title: 'Focus Visible',
            status: 'compliant',
            description: 'Keyboard-operable UI has a visible focus indicator.',
            implementation:
                'The root applies tokenized focus-visible outline. ButtonV2 actions provide their own focus treatment.',
            testResults:
                'Axe tests pass for interactive selected cards. Manual visual verification recommended for theme contrast.',
        },
        {
            id: '2.5.8',
            level: 'AA',
            title: 'Target Size (Minimum)',
            status: 'compliant',
            description:
                'Pointer targets are at least 24 by 24 CSS pixels or have equivalent spacing.',
            implementation:
                'Action controls are rendered through ButtonV2 sizing. Interactive root cards are large surfaces by design.',
            testResults:
                'Verified by component composition and ButtonV2 target sizing.',
        },
        {
            id: '3.2.1',
            level: 'A',
            title: 'On Focus',
            status: 'compliant',
            description:
                'Receiving focus does not initiate a change of context.',
            implementation:
                'CardV2 focus styles are visual only; no behavior is triggered by focus.',
            testResults: 'Verified by implementation review.',
        },
        {
            id: '4.1.2',
            level: 'A',
            title: 'Name, Role, Value',
            status: 'compliant',
            description:
                'UI components expose appropriate name, role, and state.',
            implementation:
                'Root cards expose region or button roles. Titled cards use aria-labelledby. Interactive selected cards use aria-pressed. aria-selected is only emitted for roles that support it.',
            testResults:
                'Automated tests and axe checks cover root roles, labels, descriptions, pressed state, and selected-state constraints.',
        },
    ],
    strengths: [
        'Clear generated ID relationships for title, subtitle, and description.',
        'No conflicting aria-label when aria-labelledby is available.',
        'Interactive selected cards use aria-pressed for button semantics.',
        'Selected aria state is limited to roles that support aria-selected.',
        'Compound API preserves consumer DOM order and semantic control.',
        'Axe coverage exists for default, media/action, compound, and interactive cards.',
    ],
    recommendations: [
        'Manually verify light and dark token contrast for every variant and state.',
        'Require consumers to provide accessible names for informative custom media and icon-only slots.',
        'Use CardV2 as a region only when the grouped content is meaningful enough to appear as a landmark-like region.',
        'Prefer explicit role overrides when rendering CardV2 inside list, grid, tab, or option collections.',
        'Keep nested interactive controls out of cards with root-level click handlers unless event behavior is intentionally managed.',
    ],
    wcagVersions: {
        '2.0': [
            '1.1.1',
            '1.3.1',
            '1.3.2',
            '1.4.3',
            '2.1.1',
            '2.4.3',
            '2.4.6',
            '2.4.7',
            '3.2.1',
            '4.1.2',
        ],
        '2.1': ['1.3.4', '1.4.10', '1.4.11'],
        '2.2': ['2.5.8'],
    },
    testMethodology: {
        automated: [
            'Vitest and React Testing Library render tests.',
            'jest-axe checks for default, media/action, compound, and interactive selected examples.',
            'ARIA relationship assertions for root, title, subtitle, and description.',
        ],
        manual: [
            'Keyboard navigation through interactive card roots and nested actions.',
            'Screen reader review of titled, untitled, compound, and media-rich cards.',
            'Light/dark contrast verification for text, borders, focus, selected, and hover states.',
            'Responsive visual review across narrow and wide viewports.',
        ],
        verificationTools: [
            'jest-axe',
            'React Testing Library',
            'Storybook accessibility addon',
            'WebAIM Contrast Checker',
            'VoiceOver, NVDA, or equivalent screen reader',
        ],
        wcagLevels: {
            A: ['1.1.1', '1.3.1', '1.3.2', '2.1.1', '2.4.3', '3.2.1', '4.1.2'],
            AA: [
                '1.3.4',
                '1.4.3',
                '1.4.4',
                '1.4.10',
                '1.4.11',
                '2.4.6',
                '2.4.7',
                '2.5.8',
            ],
            AAA: [],
        },
    },
    accessibilityBestPractices: {
        semanticGrouping: {
            status: 'compliant',
            implementation:
                'Root role defaults to region and can be overridden for list/grid/tab/option contexts.',
            verification: 'Render tests verify default and custom root roles.',
        },
        accessibleNaming: {
            status: 'compliant',
            implementation:
                'Title-driven cards use aria-labelledby; custom aria-label is reserved for cards without titles.',
            verification:
                'Accessibility tests verify aria-label and aria-labelledby behavior.',
        },
        stateSemantics: {
            status: 'compliant',
            implementation:
                'Interactive selected cards use aria-pressed; aria-selected is limited to supported roles.',
            verification: 'Axe checks pass for interactive selected cards.',
        },
        consumerMedia: {
            status: 'unsure',
            implementation:
                'Media is consumer-owned and can be accessible or decorative depending on supplied markup.',
            verification:
                'Consumers must verify alt text or aria-hidden on media content.',
        },
    },
}
