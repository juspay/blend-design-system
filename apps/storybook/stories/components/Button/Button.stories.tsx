import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
    ButtonState,
} from '@juspay/blend-design-system'
import {
    Plus,
    Download,
    Settings,
    Heart,
    Star,
    Search,
    Edit,
    Trash2,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof Button> = {
    title: 'Components/Button/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Button component with multiple types, sizes, and states.

## Features
- Types: Primary, Secondary, Danger, Success
- Sizes: Small, Medium, Large
- Sub-types: Default, Icon Only, Inline
- Icons: Leading and trailing
- States: Loading, disabled
- Full width support
- Button group positioning

## Accessibility
- Keyboard accessible (Tab, Enter, Space)
- Loading state announced via \`aria-busy\` and visually hidden text
- Disabled buttons removed from tab order (\`tabIndex={-1}\`)
- Focus indicators with outlineOffset
- Icon-only buttons require \`aria-label\`

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space)
- Screen reader support (VoiceOver/NVDA)
- Loading state announced via \`aria-busy\` and aria-live
- Disabled buttons removed from tab order
- Focus indicators with outlineOffset
- Icon-only buttons require \`aria-label\`
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (4 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Small/Medium buttons need 44x44px minimum
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for destructive actions
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- Small buttons: ~34px (meets AA 24px, does not meet AAA 44px)
- Medium buttons: ~36px (meets AA 24px, does not meet AAA 44px)
- Large buttons: 48px at sm breakpoint (meets AAA 44px), ~40px at lg breakpoint (does not meet AAA)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Button.accessibility\` (42+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report


## Usage

\`\`\`tsx
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system';

<Button
  buttonType={ButtonType.PRIMARY}
  size={ButtonSize.MEDIUM}
  text="Click me"
  onClick={() => console.log('Button clicked!')}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        buttonType: {
            control: 'select',
            options: Object.values(ButtonType),
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: Object.values(ButtonSize),
            description: 'The size of the button',
        },
        subType: {
            control: 'select',
            options: Object.values(ButtonSubType),
            description: 'Button subtype for special variants',
        },
        text: {
            control: 'text',
            description: 'The text content of the button',
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Makes the button take full width',
        },
        buttonGroupPosition: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description:
                'Position in button group for border radius adjustment',
        },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between'],
            description: 'Content alignment within the button',
        },
        state: {
            control: 'select',
            options: Object.values(ButtonState),
            description: 'Visual state of the button',
        },
        leadingIcon: {
            control: 'select',
            options: [
                'none',
                'plus',
                'download',
                'settings',
                'heart',
                'star',
                'search',
                'edit',
            ],
            description: 'Icon to display before the button text',
        },
        trailingIcon: {
            control: 'select',
            options: [
                'none',
                'plus',
                'download',
                'settings',
                'heart',
                'star',
                'search',
                'edit',
            ],
            description: 'Icon to display after the button text',
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler function',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// ============================================================================
// Helper Functions
// ============================================================================
// Extract reusable helpers here for consistency across stories

/**
 * Helper function to render icons based on control selection
 * Returns null instead of undefined for better React compatibility
 */
const getIcon = (iconType: string): React.ReactNode => {
    switch (iconType) {
        case 'plus':
            return <Plus size={16} />
        case 'download':
            return <Download size={16} />
        case 'settings':
            return <Settings size={16} />
        case 'heart':
            return <Heart size={16} />
        case 'star':
            return <Star size={16} />
        case 'search':
            return <Search size={16} />
        case 'edit':
            return <Edit size={16} />
        case 'none':
        default:
            return null
    }
}

// ============================================================================
// Story Categories
// ============================================================================
// Organize stories into logical groups:
// 1. Basic Variants (types, sizes, sub-types)
// 2. Icons
// 3. States (loading, disabled)
// 4. Layout & Positioning
// 5. Interactive & Showcase
// 6. Accessibility Testing
// ============================================================================

// ============================================================================
// Basic Variants
// ============================================================================

/**
 * Default button
 */
export const Default: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        subType: ButtonSubType.DEFAULT,
        text: 'Button',
        loading: false,
        disabled: false,
        fullWidth: false,
        state: ButtonState.DEFAULT,
        leadingIcon: 'none',
        trailingIcon: 'none',
    },
    render: (args: any) => {
        const { leadingIcon, trailingIcon, ...restArgs } = args
        return (
            <Button
                {...restArgs}
                leadingIcon={getIcon(leadingIcon)}
                trailingIcon={getIcon(trailingIcon)}
            />
        )
    },
}

/**
 * Button types
 */
export const ButtonTypes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Primary, Secondary, Danger, and Success variants.',
            },
        },
    },
}

/**
 * Button sizes
 */
export const ButtonSizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button size={ButtonSize.SMALL} text="Small" />
            <Button size={ButtonSize.MEDIUM} text="Medium" />
            <Button size={ButtonSize.LARGE} text="Large" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Small, Medium, and Large sizes.',
            },
        },
    },
}

/**
 * Button sub-types
 */
export const ButtonSubTypes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button subType={ButtonSubType.DEFAULT} text="Default" />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Settings size={16} />}
                aria-label="Settings"
            />
            <Button subType={ButtonSubType.INLINE} text="Inline" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Default, icon-only, and inline variants.',
            },
        },
    },
}

// ============================================================================
// Icons
// ============================================================================

/**
 * Buttons with icons
 */
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button
                text="Add Item"
                leadingIcon={<Plus size={16} />}
                buttonType={ButtonType.PRIMARY}
            />
            <Button
                text="Download"
                leadingIcon={<Download size={16} />}
                buttonType={ButtonType.SECONDARY}
            />
            <Button
                text="Settings"
                trailingIcon={<Settings size={16} />}
                buttonType={ButtonType.SECONDARY}
            />
            <Button
                text="Favorite"
                leadingIcon={<Heart size={16} />}
                trailingIcon={<Star size={16} />}
                buttonType={ButtonType.SUCCESS}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Buttons with leading and trailing icons.',
            },
        },
    },
}

/**
 * Icon-only buttons require aria-label
 */
export const IconOnly: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Plus size={16} />}
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                aria-label="Add item"
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Search size={16} />}
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                aria-label="Search"
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Edit size={16} />}
                buttonType={ButtonType.SUCCESS}
                size={ButtonSize.LARGE}
                aria-label="Edit"
            />
            <Button
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={<Trash2 size={16} />}
                buttonType={ButtonType.DANGER}
                size={ButtonSize.MEDIUM}
                aria-label="Delete"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Icon-only buttons require aria-label for accessibility. Check Accessibility panel for button-name violations.',
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                ],
            },
        },
    },
}

/**
 * Inline buttons
 */
export const InlineButtons: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <span>This is some text with </span>
            <Button
                subType={ButtonSubType.INLINE}
                text="inline button"
                buttonType={ButtonType.PRIMARY}
            />
            <span> and </span>
            <Button
                subType={ButtonSubType.INLINE}
                text="another one"
                buttonType={ButtonType.SECONDARY}
            />
            <span> in the flow.</span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Inline buttons blend with text content.',
            },
        },
    },
}

// ============================================================================
// States
// ============================================================================

/**
 * Button states: normal, loading, disabled
 */
export const ButtonStates: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button text="Normal" buttonType={ButtonType.PRIMARY} />
            <Button
                text="Loading"
                buttonType={ButtonType.PRIMARY}
                loading={true}
            />
            <Button
                text="Disabled"
                buttonType={ButtonType.PRIMARY}
                disabled={true}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different button states.',
            },
        },
    },
}

/**
 * Loading state with spinner and screen reader announcement
 */
export const Loading: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        text: 'Loading Button',
        loading: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Loading state shows spinner and announces "Loading, please wait" to screen readers. Check Accessibility panel for aria-busy validation.',
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'aria-required-attributes',
                        enabled: true,
                    },
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                ],
            },
        },
    },
}

/**
 * Disabled state - removed from tab order
 */
export const Disabled: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        text: 'Disabled Button',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled buttons are removed from tab order (tabIndex={-1}). Check Accessibility panel and Chromatic for disabled state appearance.',
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                ],
            },
        },
    },
}

// ============================================================================
// Layout & Positioning
// ============================================================================

/**
 * Full-width buttons
 */
export const FullWidth: Story = {
    render: () => (
        <div
            style={{
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Button
                text="Full Width Primary"
                buttonType={ButtonType.PRIMARY}
                fullWidth={true}
            />
            <Button
                text="Full Width Secondary"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
            />
            <Button
                text="Full Width with Icon"
                buttonType={ButtonType.SUCCESS}
                leadingIcon={<Plus size={16} />}
                fullWidth={true}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Buttons that span full container width.',
            },
        },
    },
}

/**
 * Content alignment
 */
export const ContentAlignment: Story = {
    render: () => (
        <div
            style={{
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <Button
                text="Left Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="flex-start"
            />
            <Button
                text="Center Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="center"
            />
            <Button
                text="Right Aligned"
                buttonType={ButtonType.SECONDARY}
                fullWidth={true}
                justifyContent="flex-end"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Content alignment within buttons.',
            },
        },
    },
}

/**
 * Button group positioning
 */
export const ButtonGroupPositioning: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Button Group
                </h4>
                <div style={{ display: 'flex' }}>
                    <Button
                        text="Left"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="left"
                    />
                    <Button
                        text="Center"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="center"
                    />
                    <Button
                        text="Right"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="right"
                    />
                </div>
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Primary Group
                </h4>
                <div style={{ display: 'flex' }}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        buttonGroupPosition="left"
                    />
                    <Button
                        text="Save & Continue"
                        buttonType={ButtonType.PRIMARY}
                        buttonGroupPosition="right"
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button group positioning for border radius adjustment.',
            },
        },
    },
}

// ============================================================================
// Interactive & Showcase
// ============================================================================

/**
 * Interactive playground
 */
export const Interactive: Story = {
    args: {
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
        subType: ButtonSubType.DEFAULT,
        text: 'Interactive Button',
        loading: false,
        disabled: false,
        fullWidth: false,
        state: ButtonState.DEFAULT,
        leadingIcon: 'plus',
        trailingIcon: 'none',
        justifyContent: 'center',
    },
    render: (args: any) => {
        const { leadingIcon, trailingIcon, ...restArgs } = args
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Button
                    {...restArgs}
                    leadingIcon={getIcon(leadingIcon)}
                    trailingIcon={getIcon(trailingIcon)}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Use controls to experiment with button props.',
            },
        },
    },
}

/**
 * Showcase
 */
export const Showcase: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '16px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Button Types
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button buttonType={ButtonType.PRIMARY} text="Primary" />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Secondary"
                    />
                    <Button buttonType={ButtonType.DANGER} text="Danger" />
                    <Button buttonType={ButtonType.SUCCESS} text="Success" />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    With Icons
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Add"
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Download"
                        trailingIcon={<Download size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        aria-label="Settings"
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    States
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button text="Normal" buttonType={ButtonType.PRIMARY} />
                    <Button
                        text="Loading"
                        buttonType={ButtonType.PRIMARY}
                        loading={true}
                    />
                    <Button
                        text="Disabled"
                        buttonType={ButtonType.PRIMARY}
                        disabled={true}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button variations showcase.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '24px',
                maxWidth: '800px',
            }}
        >
            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Tab to focus"
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Press Enter"
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        text="Press Space"
                        buttonType={ButtonType.SUCCESS}
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Icon-Only Buttons
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.PRIMARY}
                        aria-label="Settings"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Search size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        aria-label="Search"
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Edit size={16} />}
                        buttonType={ButtonType.SUCCESS}
                        aria-label="Edit"
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Loading State
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Loading"
                        buttonType={ButtonType.PRIMARY}
                        loading={true}
                    />
                    <Button
                        text="Saving"
                        buttonType={ButtonType.SUCCESS}
                        loading={true}
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Disabled State
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                        text="Disabled"
                        buttonType={ButtonType.PRIMARY}
                        disabled={true}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.PRIMARY}
                        aria-label="Settings"
                        disabled={true}
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button text="Focus me" buttonType={ButtonType.PRIMARY} />
                    <Button text="Focus me" buttonType={ButtonType.SECONDARY} />
                    <Button text="Focus me" buttonType={ButtonType.DANGER} />
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating keyboard navigation, ARIA labels, loading states, disabled states, and focus indicators.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0)
   - Review passing tests (12+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test Button.accessibility
   \`\`\`
   - 42+ automated tests
   - WCAG compliance verification
   - ARIA attribute validation

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Enter, Space)
   - Color contrast verification

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.1 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.1 Level AAA**: Partial Compliance (4/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio, Target Size (2.5.5) - Small/Medium buttons need 44x44px
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: {
            ...getA11yConfig('interactive'),
            options: {
                ...getA11yConfig('interactive').options,
                // Ensure all tests complete
                iframes: true,
                elementRef: true,
            },
        },
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
