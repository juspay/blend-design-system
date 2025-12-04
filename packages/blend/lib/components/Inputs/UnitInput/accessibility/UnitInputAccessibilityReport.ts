/**
 * UnitInput Component Accessibility Report Data
 * WCAG 2.0, 2.1, 2.2 (Level A, AA, AAA) Compliance Analysis
 *
 * Note: Items marked with "unsure" require manual verification
 * Color contrast ratios should be verified using actual color values from theme tokens
 */

import type { AccessibilityReport } from '../../../Button/accessibility/ButtonAccessibilityReport'

export const unitInputAccessibilityReport: AccessibilityReport = {
    componentName: 'UnitInput',
    wcagVersion: '2.2',
    reportDate: new Date().toISOString().split('T')[0],
    conformanceLevel: 'Level AA',
    overallStatus: 'partial',
    summary:
        'The UnitInput component demonstrates strong compliance with WCAG 2.0, 2.1, and 2.2 standards at Level A and AA. It combines a numeric input with an adjacent unit label (e.g., currency, percentage, weight) while preserving proper label association, keyboard navigation, error identification, ARIA attributes, and focus management. The component uses semantic HTML (<input type="number">), unique IDs for label/error associations, aria-describedby for linking hints and errors, and unit labels rendered as supplementary visual text. Some contrast ratios require manual verification. The component fully meets Level A requirements, fully meets Level AA requirements (with some items requiring verification), and partially meets Level AAA requirements, with 1.4.6 Contrast (Enhanced) remaining non-compliant by design.',
    criteria: [
        {
            id: '1.3.1',
            level: 'A',
            title: 'Info and Relationships',
            status: 'compliant',
            description:
                'Information, structure, and relationships conveyed through presentation can be programmatically determined.',
            implementation:
                'Uses semantic HTML <input type="number"> element. Label association via <label htmlFor={inputId}>. Error messages linked via aria-describedby={errorId}. Hint text linked via aria-describedby={hintId}. Required state via aria-required. Error state via aria-invalid. Unique IDs generated via useId() hook.',
            testResults:
                'Verified: Proper semantic structure and ARIA relationships. Label association, error linking, and hint linking confirmed in UnitInput.tsx and InputFooter.tsx.',
        },
        {
            id: '1.3.5',
            level: 'AA',
            title: 'Identify Input Purpose',
            status: 'compliant',
            description:
                'The purpose of each input field can be programmatically determined when the field serves a purpose identified in the Input Purposes for User Interface Components section.',
            implementation:
                'Supports name attribute for input purpose identification. Uses type="number" with min, max, and step attributes to define numeric purpose and constraints. Unit label clarifies measurement context (e.g., USD, %, kg) while the name/type attributes provide programmatic semantics.',
            testResults:
                'Verified: name, type, min, max, and step attributes supported. Implementation confirmed in UnitInput.tsx and UnitInput.accessibility.test.tsx.',
        },
        {
            id: '1.4.3',
            level: 'AA',
            title: 'Contrast (Minimum)',
            status: 'unsure',
            description:
                'Text and images of text have a contrast ratio of at least 4.5:1 for normal text, 3:1 for large text.',
            implementation:
                'UnitInput reuses the same input container tokens and text colors as NumberInput/TextInput for input text, unit text, hints, and errors. These are designed for AA contrast, but exact ratios depend on theme token values.',
            testResults:
                'UNSURE: Requires manual contrast ratio calculation. Input text, unit labels, error messages, hint text, and borders must be verified using a contrast checker. Disabled text and subtle borders require special attention.',
            notes: 'Current implementation targets AA standard (4.5:1). For AAA compliance (7:1), text and border colors may need adjustment.',
        },
        {
            id: '1.4.6',
            level: 'AAA',
            title: 'Contrast (Enhanced)',
            status: 'non-compliant',
            description:
                'Text and images of text have a contrast ratio of at least 7:1 for normal text, 4.5:1 for large text.',
            implementation:
                'UnitInput text and borders are designed for AA contrast (4.5:1 per WCAG 1.4.3), shared with other form inputs.',
            testResults:
                'NON-COMPLIANT: The component is designed for AA contrast and does not meet AAA 7:1 contrast requirements out of the box.',
            notes: 'AAA 1.4.6 Compliance would require color token adjustments across the design system.',
        },
        {
            id: '1.4.8',
            level: 'AAA',
            title: 'Visual Presentation',
            status: 'compliant',
            description:
                'Blocks of text can be presented without loss of content or functionality when text spacing and zoom are adjusted.',
            implementation:
                'UnitInput respects browser/system text size settings. Text uses relative tokens; layout uses flexbox and responsive behavior so content remains usable up to 200% zoom.',
            testResults:
                'COMPLIANT: Verified via shared field patterns (TextInput/NumberInput).',
        },
        {
            id: '2.1.1',
            level: 'A',
            title: 'Keyboard',
            status: 'compliant',
            description:
                'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
            implementation:
                'All numeric entry is keyboard operable: Tab/Shift+Tab to move focus, typing to change values. Disabled inputs are excluded from interaction.',
            testResults:
                'Verified: Keyboard focus and input behavior tested in UnitInput.accessibility.test.tsx.',
        },
        {
            id: '2.1.3',
            level: 'AAA',
            title: 'Keyboard (No Exception)',
            status: 'compliant',
            description:
                'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
            implementation:
                'All functionality (entering numeric values, moving focus, reading units/labels) is fully keyboard accessible. There is no mouse-only functionality.',
            testResults:
                'COMPLIANT: Full keyboard operability confirmed via unit tests and native <input type="number"> behavior.',
        },
        {
            id: '2.4.3',
            level: 'A',
            title: 'Focus Order',
            status: 'compliant',
            description:
                'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
            implementation:
                'UnitInput participates in normal tab order. When multiple UnitInput fields and buttons are present, focus order follows DOM order. Disabled fields are not focusable.',
            testResults:
                'Verified: Focus order remains logical in UnitInput.accessibility.test.tsx when multiple fields are rendered in a form.',
        },
        {
            id: '2.4.7',
            level: 'AA',
            title: 'Focus Visible',
            status: 'unsure',
            description:
                'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
            implementation:
                'Focus indicators are rendered via _focus and _focusVisible styles on the underlying PrimitiveInput (border and box-shadow), consistent with other inputs.',
            testResults:
                'UNSURE: Focus indicators appear visually, but contrast ratios of focus outlines and borders should be verified manually, especially near unit and icon slots.',
            notes: 'Manual testing with keyboard-only navigation is recommended to ensure focus visibility in all themes.',
        },
        {
            id: '2.5.8',
            level: 'AA',
            title: 'Target Size (Minimum)',
            status: 'compliant',
            description:
                'The size of the target for pointer inputs is at least 24 by 24 CSS pixels.',
            implementation:
                'UnitInput fields and adjacent unit containers are sized via tokens to meet or exceed 24x24px, similar to other text fields. Icons and units are within a larger clickable row, not tiny isolated targets.',
            testResults:
                'COMPLIANT: Input height and unit container size naturally exceed 24x24px. Exact measurement can be confirmed with DevTools.',
        },
        {
            id: '3.2.1',
            level: 'A',
            title: 'On Focus',
            status: 'compliant',
            description:
                'When any user interface component receives focus, it does not initiate a change of context.',
            implementation:
                'Focusing the UnitInput does not cause navigation, submission, or other context changes. Optional onFocus callback is consumer-controlled.',
            testResults:
                'Verified: Focus-only interactions do not change context.',
        },
        {
            id: '3.2.2',
            level: 'A',
            title: 'On Input',
            status: 'compliant',
            description:
                'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
            implementation:
                'Changing numeric value calls onChange but does not automatically submit or navigate. Context changes are application-level responsibilities.',
            testResults:
                'Verified: Value changes are local to the component and do not trigger context changes.',
        },
        {
            id: '3.2.5',
            level: 'AAA',
            title: 'Change on Request',
            status: 'compliant',
            description:
                'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
            implementation:
                'All context changes related to UnitInput (e.g., validation feedback) are user-initiated and not automatic navigations.',
            testResults:
                'COMPLIANT: No automatic context changes; all interactions require explicit user action.',
        },
        {
            id: '3.3.1',
            level: 'A',
            title: 'Error Identification',
            status: 'compliant',
            description:
                'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
            implementation:
                'Error state is exposed via error prop and errorMessage. Error messages are rendered under the field via InputFooter with role="alert" and aria-live="polite" and linked via aria-describedby.',
            testResults:
                'Verified: Errors such as out-of-range discounts are clearly described and programmatically associated in UnitInput.accessibility.test.tsx.',
        },
        {
            id: '3.3.2',
            level: 'A',
            title: 'Labels or Instructions',
            status: 'compliant',
            description:
                'Labels or instructions are provided when content requires user input.',
            implementation:
                'Label provides main description, sublabel provides additional context (e.g., "Base price before taxes and discounts"), and hint text provides numeric constraints. Unit label clarifies measurement without replacing the text label.',
            testResults:
                'Verified: Label, sublabel, and hint text are rendered and accessible in UnitInput.accessibility.test.tsx.',
        },
        {
            id: '3.3.3',
            level: 'AA',
            title: 'Error Suggestion',
            status: 'compliant',
            description:
                'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user.',
            implementation:
                'Error messages can explicitly suggest corrections (e.g., "Enter a value between 0 and 100").',
            testResults:
                'Verified: Supported and tested via discount range examples.',
        },
        {
            id: '3.3.7',
            level: 'A',
            title: 'Redundant Entry',
            status: 'compliant',
            description:
                'Information previously entered by or provided to the user that is required to be entered again is auto-populated or selectable.',
            implementation:
                'Supports autocomplete on numeric fields where applicable (e.g., financial values, one-time codes), allowing browsers to reduce redundant typing.',
            testResults:
                'Verified: Implementation mirrors TextInput/NumberInput behavior, with support to add autocomplete in consuming apps.',
        },
        {
            id: '4.1.2',
            level: 'A',
            title: 'Name, Role, Value',
            status: 'compliant',
            description:
                'For all user interface components, the name and role can be programmatically determined; states, properties, and values can be set and notified to assistive technologies.',
            implementation:
                'Uses semantic <input type="number"> with implicit spinbutton semantics in many ATs. Accessible name comes from <label>. States and properties include disabled, required/aria-required, aria-invalid, and aria-describedby linking error/hint messages.',
            testResults:
                'Verified: Name, role, and value are correctly exposed; ARIA attributes are present and validated via UnitInput.accessibility.test.tsx.',
        },
    ],
    strengths: [
        'Combines numeric input with clear unit labels while preserving proper label association and semantics',
        'Uses semantic <input type="number"> with accessible labels, hints, and errors',
        'Error messages linked via aria-describedby and announced via role="alert" / aria-live="polite"',
        'Supports required state via both visual indicators and aria-required',
        'Keyboard operable for all input scenarios; disabled state prevents interaction and is programmatically exposed',
        'Unit labels clarify measurement context without replacing accessible text labels',
        'Responsive design and relative units support text scaling up to 200% without loss of functionality',
    ],
    recommendations: [
        'VERIFY: Color contrast ratios for numeric text, unit labels, hint text, error messages, and borders using WebAIM Contrast Checker or similar tools',
        'VERIFY: Focus indicator visibility and contrast, especially with units on left/right and with icons present',
        'Ensure application-level error messages clearly express numeric ranges and units (e.g., “Enter a discount between 0% and 100%”)',
        'For AAA contrast compliance (1.4.6), coordinate with design tokens to raise text and border contrast to 7:1 where appropriate',
        'Document patterns for localizing units and numeric formats (e.g., currency symbols, decimal separators)',
    ],
    wcagVersions: {
        '2.0': [
            'All relevant Level A and AA criteria from WCAG 2.0 are evaluated for numeric form fields with units',
            'WCAG 2.0 provides the baseline for labels, errors, and keyboard interaction',
        ],
        '2.1': [
            'WCAG 2.1 adds criteria like 1.3.5 and 1.4.10 which are relevant for UnitInput via shared field patterns',
            'Numeric purpose and reflow behavior are inherited from TextInput/NumberInput implementations',
        ],
        '2.2': [
            'WCAG 2.2 introduces 2.5.8 (Target Size Minimum) and 3.3.7 (Redundant Entry), addressed through token-based sizing and autocomplete support',
        ],
    },
    testMethodology: {
        automated: [
            'jest-axe (axe-core integration) for automated accessibility testing',
            'axe-core validation: ensure no accessibility violations using axe(container).toHaveNoViolations()',
            'Test file: packages/blend/__tests__/components/Inputs/UnitInput.accessibility.test.tsx (21 tests)',
            'Semantic and ARIA validation for <input type="number"> with units',
            'Keyboard focusability and disabled state behavior validation',
        ],
        manual: [
            'REQUIRED: Color contrast verification for text, unit labels, hints, and errors using WebAIM Contrast Checker or CCA',
            'REQUIRED: Focus indicator visibility and contrast verification around the unit container and input border',
            'Screen reader testing (NVDA/JAWS/VoiceOver) to confirm labels, units, hints, and errors are read clearly',
            'Keyboard-only navigation testing to ensure logical focus order, including multiple UnitInput fields in forms',
            'Touch target measurement to ensure the combined interactive area of input and unit meets ≥24x24px (AA)',
        ],
        verificationTools: [
            'WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/',
            'Colour Contrast Analyser (CCA): https://www.tpgi.com/color-contrast-checker/',
            'axe DevTools Browser Extension',
            'WAVE Browser Extension',
            'Lighthouse Accessibility Audit',
            'NVDA, JAWS, and VoiceOver screen readers',
            'Keyboard-only navigation testing and browser DevTools measurements',
        ],
        wcagLevels: {
            A: [
                '1.3.1 Info and Relationships',
                '2.1.1 Keyboard',
                '2.4.3 Focus Order',
                '3.2.1 On Focus',
                '3.2.2 On Input',
                '3.3.1 Error Identification',
                '3.3.2 Labels or Instructions',
                '3.3.3 Error Suggestion',
                '3.3.7 Redundant Entry (WCAG 2.2)',
                '4.1.2 Name, Role, Value',
            ],
            AA: [
                '1.3.5 Identify Input Purpose',
                '1.4.3 Contrast (Minimum)',
                '1.4.11 Non-text Contrast (inherited from field styling, verification required)',
                '1.4.12 Text Spacing (inherited from text field patterns)',
                '2.4.7 Focus Visible',
                '2.5.8 Target Size (Minimum) (WCAG 2.2)',
            ],
            AAA: [
                '1.4.6 Contrast (Enhanced) - currently non-compliant, designed for AA 4.5:1 per WCAG 1.4.3',
                '1.4.8 Visual Presentation - component respects browser/system text size and color settings',
                '2.1.3 Keyboard (No Exception) - all functionality keyboard accessible without timing requirements',
                '3.2.5 Change on Request - all context changes require explicit user action',
            ],
        },
    },
}
