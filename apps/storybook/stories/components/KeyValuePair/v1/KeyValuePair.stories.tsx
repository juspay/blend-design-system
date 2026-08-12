import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    KeyValuePair,
    KeyValuePairSize,
    KeyValuePairStateType,
} from '@juspay/blend-design-system/deprecated/key-value-pair'
import { Info, Star, CheckCircle, ArrowRight, Eye, Bell } from 'lucide-react'
import {
    CHROMATIC_CONFIG,
    getA11yConfig,
} from '../../../../.storybook/a11y.config'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof KeyValuePair> = {
    title: 'Components/KeyValuePair',
    component: KeyValuePair,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for content components
        a11y: getA11yConfig('content'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A semantic component for displaying key-value pairs with proper accessibility attributes and flexible layout options.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { KeyValuePair, KeyValuePairSize, KeyValuePairStateType } from '@juspay/blend-design-system/deprecated/key-value-pair';

<KeyValuePair
  keyString="Name"
  value="John Doe"
  size={KeyValuePairSize.MEDIUM}
  keyValuePairState={KeyValuePairStateType.vertical}
/>
\`\`\`

## Features
- Vertical and horizontal layouts
- Three sizes (Small, Medium, Large)
- Support for slots (keySlot, valueLeftSlot, valueRightSlot)
- Text overflow handling (truncate, wrap, wrap-clamp)
- Accessible tooltips for truncated text
- Semantic HTML with role="term" and role="definition"
- Proper ARIA relationships

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Semantic HTML structure with role="group", role="term", and role="definition"
- Proper ARIA attributes (aria-label, aria-labelledby) for programmatic relationships
- Text overflow handling with accessible tooltips
- Logical reading order maintained
- Sufficient color contrast (4.5:1 for text)
- Text resizable up to 200% without loss of functionality

**Level AAA Compliance**: ⚠️ Partial (7 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Interactive elements in slots (buttons, links) may not meet 44x44px minimum
- ℹ️ **Not Applicable**: 3.3.6 Error Prevention (All) - application-dependent

**Touch Target Sizes**:
- Interactive elements in slots: Depends on implementation (should meet AA 24px, AAA requires 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test KeyValuePair.accessibility\` (40+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for text overflow and tooltips
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

        `,
            },
        },
    },
    argTypes: {
        keyString: {
            control: 'text',
            description: 'The key/label text',
        },
        value: {
            control: 'text',
            description: 'The value text',
        },
        size: {
            control: 'select',
            options: Object.values(KeyValuePairSize),
            description: 'Size of the value text',
        },
        keyValuePairState: {
            control: 'select',
            options: Object.values(KeyValuePairStateType),
            description: 'Layout orientation (vertical or horizontal)',
        },
        maxWidth: {
            control: 'text',
            description: 'Maximum width of the component',
        },
        textOverflow: {
            control: 'select',
            options: ['truncate', 'wrap', 'wrap-clamp'],
            description: 'How to handle text overflow',
        },
        maxLines: {
            control: 'number',
            description: 'Maximum lines when using wrap-clamp',
        },
        showTooltipOnTruncate: {
            control: 'boolean',
            description: 'Show tooltip when text is truncated',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyValuePair>

// ============================================================================
// Story Categories
// ============================================================================
// Organize stories into logical groups:
// 1. Basic Usage
// 2. Layouts
// 3. Sizes
// 4. Text Overflow Handling
// 5. With Slots
// 6. Real-World Examples
// 7. Accessibility Testing
// ============================================================================

// ============================================================================
// Basic Usage
// ============================================================================

/**
 * Default key-value pair
 */
export const Default: Story = {
    args: {
        keyString: 'Name',
        value: 'John Doe',
        size: KeyValuePairSize.MEDIUM,
        keyValuePairState: KeyValuePairStateType.vertical,
    },
    parameters: {
        docs: {
            description: {
                story: 'Default key-value pair with vertical layout. Uses semantic HTML with role="term" and role="definition".',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

// ============================================================================
// Layouts
// ============================================================================

/**
 * Vertical layout (default)
 */
export const VerticalLayout: Story = {
    args: {
        keyString: 'Email',
        value: 'john.doe@example.com',
        keyValuePairState: KeyValuePairStateType.vertical,
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical layout stacks the key above the value. Maintains proper semantic structure and ARIA relationships.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

/**
 * Horizontal layout
 */
export const HorizontalLayout: Story = {
    args: {
        keyString: 'Status',
        value: 'Active',
        keyValuePairState: KeyValuePairStateType.horizontal,
    },
    parameters: {
        docs: {
            description: {
                story: 'Horizontal layout displays key and value side by side. Maintains proper reading order and accessibility.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

// ============================================================================
// Sizes
// ============================================================================

/**
 * Different sizes
 */
export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-75">
            <KeyValuePair
                keyString="Small Size"
                value="This is small text"
                size={KeyValuePairSize.SMALL}
            />
            <KeyValuePair
                keyString="Medium Size"
                value="This is medium text"
                size={KeyValuePairSize.MEDIUM}
            />
            <KeyValuePair
                keyString="Large Size"
                value="This is large text"
                size={KeyValuePairSize.LARGE}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different sizes for the value text. All sizes maintain proper contrast ratios and accessibility.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

// ============================================================================
// Text Overflow Handling
// ============================================================================

/**
 * Text truncation with tooltip
 */
export const TextTruncation: Story = {
    args: {
        keyString: 'Long Description',
        value: 'This is a very long value that will be truncated with an ellipsis and show a tooltip on hover',
        textOverflow: 'truncate',
        maxWidth: '200px',
        showTooltipOnTruncate: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Text truncation with ellipsis and accessible tooltip. Tooltip provides full text for screen readers.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

/**
 * Text wrapping
 */
export const TextWrapping: Story = {
    args: {
        keyString: 'Description',
        value: 'This is a long value that will wrap naturally across multiple lines without truncation',
        textOverflow: 'wrap',
        maxWidth: '200px',
    },
    parameters: {
        docs: {
            description: {
                story: 'Text wrapping allows content to flow naturally. Maintains readability and accessibility.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

/**
 * Text wrap with clamp
 */
export const TextWrapClamp: Story = {
    args: {
        keyString: 'Multi-line Description',
        value: 'This is a very long value that will wrap up to a maximum number of lines and then show an ellipsis. The text can span multiple lines but will be clamped at the specified limit.',
        textOverflow: 'wrap-clamp',
        maxLines: 3,
        maxWidth: '250px',
        showTooltipOnTruncate: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Text wrapping with line clamp limits the number of lines and shows ellipsis. Accessible tooltip provides full content.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}

// ============================================================================
// With Slots
// ============================================================================

/**
 * Key-value pair with slots
 */
export const WithSlots: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-75">
            <KeyValuePair
                keyString="Rating"
                value="4.8"
                keySlot={<Info size={16} />}
                valueLeftSlot={<Star size={16} color="#fbbf24" />}
            />
            <KeyValuePair
                keyString="Status"
                value="Active"
                valueLeftSlot={<CheckCircle size={16} color="#10b981" />}
                valueRightSlot={<ArrowRight size={16} />}
            />
            <KeyValuePair
                keyString="Notifications"
                value="Enabled"
                keySlot={<Bell size={16} />}
                valueRightSlot={<Eye size={16} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Key-value pairs with decorative slots. Icons should be marked with aria-hidden="true" when decorative.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}
