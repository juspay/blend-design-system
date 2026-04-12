import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionType,
    AccordionChevronPosition,
} from '@juspay/blend-design-system'
import type { AccordionProps } from '@juspay/blend-design-system'
import {
    User,
    Shield,
    Bell,
    CreditCard,
    HelpCircle,
    Lock,
    CheckCircle,
    AlertCircle,
    Database,
    Monitor,
    Smartphone,
    Tablet,
    Laptop,
    Check,
    X,
} from 'lucide-react'
import { Checkbox } from '@juspay/blend-design-system'
import { Switch } from '@juspay/blend-design-system'
import { getA11yConfig, CHROMATIC_CONFIG } from '../../.storybook/a11y.config'

// ============================================================================
// Wrapper type — combines Accordion props with AccordionItem controls
// so argTypes can reference title, subtext, etc. without TS errors
// ============================================================================

type AccordionStoryProps = AccordionProps & {
    title: string
    subtext?: string
    leftSlot?: string
    rightSlot?: string
    subtextSlot?: string
    isDisabled?: boolean
    chevronPosition?: AccordionChevronPosition
    children?: string
    triggerSlot?: 'none' | 'checkbox' | 'switch' | 'renderProp'
    triggerSlotWidth?: number
}

const AccordionStory = (props: AccordionStoryProps) => <Accordion {...props} />
AccordionStory.displayName = 'Accordion'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof AccordionStory> = {
    title: 'Components/Accordion',
    component: AccordionStory,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
An accordion component that allows users to show and hide sections of related content on a page. Built on top of Radix UI's Accordion primitive with custom styling and features.

## Features
- Single or multiple item expansion
- Two visual styles: Border and No Border
- Chevron position customization (left or right)
- Support for icons and custom content in headers
- Disabled state for individual items
- Subtext and additional slots for complex layouts
- Smooth animations and transitions
- Keyboard navigation support
- Controlled and uncontrolled modes

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA attributes (aria-expanded, aria-controls)
- Semantic HTML structure with Radix UI primitives
- Comprehensive keyboard navigation (Arrow keys, Enter, Space, Tab)
- Screen reader support (VoiceOver/NVDA)
- Chevron icons marked with aria-hidden="true"
- Decorative slots properly handled
- Visible focus indicators for keyboard navigation
- Proper state management and announcements

**Level AAA Compliance**: ⚠️ Partial (7 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 2.3.3 Animation from Interactions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Interactive elements (accordion triggers) may not meet 44x44px minimum
- ℹ️ **Not Applicable**: 3.3.6 Error Prevention (All) - application-dependent

**Touch Target Sizes**:
- Accordion triggers: ~40px height (meets AA 24px, may not meet AAA 44px depending on content)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Accordion.accessibility\` (40+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Accordion, AccordionItem, AccordionType } from '@juspay/blend-design-system';

<Accordion accordionType={AccordionType.BORDER}>
  <AccordionItem value="item-1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem value="item-2" title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        accordionType: {
            control: 'select',
            options: Object.values(AccordionType),
            description: 'Visual style of the accordion',
        },
        isMultiple: {
            control: 'boolean',
            description: 'Whether multiple items can be expanded at once',
        },
        defaultValue: {
            control: 'text',
            description: 'Default expanded item(s)',
        },
        value: {
            control: 'text',
            description: 'Controlled expanded item(s)',
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback when expanded items change',
        },
        // AccordionItem props exposed via the wrapper type
        title: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Title text for accordion item',
        },
        subtext: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Additional descriptive text below title',
        },
        leftSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: [
                'none',
                'user',
                'shield',
                'bell',
                'creditCard',
                'helpCircle',
                'lock',
            ],
            description: 'Icon to display on the left side',
        },
        rightSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'status', 'badge', 'button'],
            description: 'Content to display on the right side',
        },
        subtextSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'progressBar', 'chip', 'counter'],
            description: 'Custom content to display as subtext',
        },
        isDisabled: {
            table: { category: 'AccordionItem' },
            control: 'boolean',
            description: 'Whether the accordion item is disabled',
        },
        chevronPosition: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: Object.values(AccordionChevronPosition),
            description: 'Position of the chevron icon (left or right)',
        },
        children: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Content to display when expanded',
        },
        triggerSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'checkbox', 'switch', 'renderProp'],
            description:
                'Custom slot to replace the chevron (checkbox, switch, or render prop)',
        },
        triggerSlotWidth: {
            table: { category: 'AccordionItem' },
            control: 'number',
            description: 'Width of the trigger slot container in pixels',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AccordionStory>

// ============================================================================
// Helper Functions
// ============================================================================

const getLeftSlot = (slotType: string) => {
    switch (slotType) {
        case 'user':
            return <User size={20} color="#666" />
        case 'shield':
            return <Shield size={20} color="#666" />
        case 'bell':
            return <Bell size={20} color="#666" />
        case 'creditCard':
            return <CreditCard size={20} color="#666" />
        case 'helpCircle':
            return <HelpCircle size={20} color="#666" />
        case 'lock':
            return <Lock size={20} color="#666" />
        case 'none':
        default:
            return undefined
    }
}

const getRightSlot = (slotType: string) => {
    switch (slotType) {
        case 'status':
            return (
                <span style={{ fontSize: '12px', color: '#22c55e' }}>
                    Active
                </span>
            )
        case 'badge':
            return (
                <span
                    style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '4px',
                    }}
                >
                    NEW
                </span>
            )
        case 'button':
            return (
                <span
                    style={{
                        fontSize: '12px',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                >
                    Edit
                </span>
            )
        case 'none':
        default:
            return undefined
    }
}

const getSubtextSlot = (slotType: string) => {
    switch (slotType) {
        case 'progressBar':
            return (
                <div
                    style={{
                        width: '80px',
                        height: '4px',
                        backgroundColor: '#e5e5e5',
                        borderRadius: '2px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: '60%',
                            height: '100%',
                            backgroundColor: '#3b82f6',
                        }}
                    />
                </div>
            )
        case 'chip':
            return (
                <span
                    style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                    }}
                >
                    Premium
                </span>
            )
        case 'counter':
            return (
                <span
                    style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#ef4444',
                    }}
                >
                    3 items
                </span>
            )
        case 'none':
        default:
            return undefined
    }
}

const getTriggerSlot = (slotType: string) => {
    switch (slotType) {
        case 'renderProp':
            return ({
                isExpanded,
                toggle,
            }: {
                isExpanded: boolean
                toggle: () => void
            }) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        toggle()
                    }}
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '2px solid #3b82f6',
                        backgroundColor: isExpanded ? '#3b82f6' : 'transparent',
                        color: isExpanded ? 'white' : '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    {isExpanded ? <X size={14} /> : <Check size={14} />}
                </button>
            )
        case 'none':
        default:
            return undefined
    }
}

// ============================================================================
// Basic Variants
// ============================================================================

export const Default: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
        title: 'What is an accordion?',
        subtext: 'Click to learn more',
        leftSlot: 'user',
        rightSlot: 'status',
        subtextSlot: 'none',
        isDisabled: false,
        chevronPosition: AccordionChevronPosition.RIGHT,
        children:
            'An accordion is a vertically stacked list of interactive headings that each reveal an associated section of content.',
        triggerSlot: 'none',
        triggerSlotWidth: undefined,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                onValueChange={args.onValueChange}
            >
                <AccordionItem
                    value="item-1"
                    title={args.title}
                    subtext={args.subtext}
                    leftSlot={getLeftSlot(args.leftSlot ?? 'none')}
                    rightSlot={getRightSlot(args.rightSlot ?? 'none')}
                    subtextSlot={getSubtextSlot(args.subtextSlot ?? 'none')}
                    isDisabled={args.isDisabled}
                    chevronPosition={args.chevronPosition}
                    triggerSlot={getTriggerSlot(args.triggerSlot ?? 'none')}
                    triggerSlotWidth={args.triggerSlotWidth}
                >
                    <div style={{ padding: '16px' }}>{args.children}</div>
                </AccordionItem>
                <AccordionItem value="item-2" title="When should I use it?">
                    <div style={{ padding: '16px' }}>
                        Accordions are useful when you want to toggle between
                        hiding and showing large amounts of content, or when you
                        have limited space and need to organize content in a
                        compact way.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="How does it work?">
                    <div style={{ padding: '16px' }}>
                        Click on the accordion headers to expand or collapse the
                        content. By default, only one section can be open at a
                        time, but this can be configured to allow multiple
                        sections to be open simultaneously.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Default accordion with interactive controls. Use the controls panel to customize props.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Visual Styles
// ============================================================================

export const WithBorder: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem value="item-1" title="Account Settings">
                    <div style={{ padding: '16px' }}>
                        Manage your account preferences, security settings, and
                        personal information.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Privacy & Security">
                    <div style={{ padding: '16px' }}>
                        Control your privacy settings, manage data sharing
                        preferences, and configure security options.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Notifications">
                    <div style={{ padding: '16px' }}>
                        Customize how and when you receive notifications about
                        account activity and updates.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with border style for a more defined visual separation.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const MultipleExpansion: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: true,
        defaultValue: ['item-1', 'item-2'],
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue as string[]}
            >
                <AccordionItem value="item-1" title="First Section">
                    <div style={{ padding: '16px' }}>
                        This accordion allows multiple sections to be open at
                        the same time.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Section">
                    <div style={{ padding: '16px' }}>
                        Both this section and the first section can be expanded
                        simultaneously.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Section">
                    <div style={{ padding: '16px' }}>
                        Click any header to toggle its content without affecting
                        other sections.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion that allows multiple items to be expanded at once.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Content Variations
// ============================================================================

export const WithIcons: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="profile"
                    title="Profile Settings"
                    leftSlot={<User size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        Update your profile information, including name, email,
                        and avatar.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="security"
                    title="Security"
                    leftSlot={<Shield size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        Manage your password, two-factor authentication, and
                        login sessions.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="notifications"
                    title="Notifications"
                    leftSlot={<Bell size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        Configure email and push notification preferences.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="billing"
                    title="Billing"
                    leftSlot={<CreditCard size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        View and manage your subscription, payment methods, and
                        invoices.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with icons for better visual context.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const WithSubtext: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="basic"
                    title="Basic Plan"
                    subtext="$9/month • For individuals"
                    rightSlot={
                        <span style={{ fontSize: '14px', color: '#22c55e' }}>
                            Current Plan
                        </span>
                    }
                >
                    <div style={{ padding: '16px' }}>
                        • 5 GB storage
                        <br />• Basic support
                        <br />• Access to core features
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="pro"
                    title="Pro Plan"
                    subtext="$29/month • For professionals"
                    rightSlot={
                        <span style={{ fontSize: '14px', color: '#3b82f6' }}>
                            Upgrade
                        </span>
                    }
                >
                    <div style={{ padding: '16px' }}>
                        • 100 GB storage
                        <br />• Priority support
                        <br />• Advanced features
                        <br />• API access
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="enterprise"
                    title="Enterprise Plan"
                    subtext="Custom pricing • For teams"
                    rightSlot={
                        <span style={{ fontSize: '14px', color: '#666' }}>
                            Contact Sales
                        </span>
                    }
                >
                    <div style={{ padding: '16px' }}>
                        • Unlimited storage
                        <br />• Dedicated support
                        <br />• Custom integrations
                        <br />• SLA guarantee
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with subtext for additional context.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const ChevronLeft: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="item-1"
                    title="Documentation"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div style={{ padding: '16px', paddingLeft: '32px' }}>
                        Access comprehensive guides and API documentation.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Tutorials"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div style={{ padding: '16px', paddingLeft: '32px' }}>
                        Step-by-step tutorials to get you started quickly.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="item-3"
                    title="Examples"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div style={{ padding: '16px', paddingLeft: '32px' }}>
                        Real-world examples and best practices.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with chevron positioned on the left side.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// States
// ============================================================================

export const WithDisabledItems: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="available"
                    title="Available Feature"
                    leftSlot={<CheckCircle size={20} color="#22c55e" />}
                >
                    <div style={{ padding: '16px' }}>
                        This feature is available in your current plan.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="locked-1"
                    title="Premium Feature"
                    subtext="Requires Pro plan"
                    leftSlot={<Lock size={20} color="#999" />}
                    isDisabled
                >
                    <div style={{ padding: '16px' }}>
                        This content is locked.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="locked-2"
                    title="Enterprise Feature"
                    subtext="Requires Enterprise plan"
                    leftSlot={<Lock size={20} color="#999" />}
                    isDisabled
                >
                    <div style={{ padding: '16px' }}>
                        This content is locked.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with disabled items to show locked or unavailable content.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Real-World Examples
// ============================================================================

export const ComplexContent: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="storage"
                    title="Storage Usage"
                    subtext="45.2 GB of 100 GB used"
                    leftSlot={<Database size={20} color="#666" />}
                    subtextSlot={
                        <div
                            style={{
                                width: '100px',
                                height: '4px',
                                backgroundColor: '#e5e5e5',
                                borderRadius: '2px',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    width: '45%',
                                    height: '100%',
                                    backgroundColor: '#3b82f6',
                                }}
                            />
                        </div>
                    }
                >
                    <div style={{ padding: '16px' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            {[
                                { label: 'Documents', size: '12.3 GB' },
                                { label: 'Images', size: '23.7 GB' },
                                { label: 'Videos', size: '9.2 GB' },
                            ].map(({ label, size }) => (
                                <div
                                    key={label}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            color: '#666',
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {size}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="devices"
                    title="Connected Devices"
                    subtext="3 devices connected"
                    leftSlot={<Monitor size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            {[
                                {
                                    Icon: Laptop,
                                    name: 'MacBook Pro',
                                    last: '2 minutes ago',
                                    active: true,
                                },
                                {
                                    Icon: Smartphone,
                                    name: 'iPhone 14',
                                    last: '1 hour ago',
                                    active: false,
                                },
                                {
                                    Icon: Tablet,
                                    name: 'iPad Air',
                                    last: '3 days ago',
                                    active: false,
                                },
                            ].map(({ Icon, name, last, active }) => (
                                <div
                                    key={name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                >
                                    <Icon size={16} color="#666" />
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {name}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                color: '#999',
                                            }}
                                        >
                                            Last active: {last}
                                        </div>
                                    </div>
                                    {active && (
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: '#22c55e',
                                            }}
                                        >
                                            Active
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with complex content layouts and multiple data points.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const FAQExample: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>
                    Frequently Asked Questions
                </h3>
            </div>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="q1"
                    title="How do I reset my password?"
                    leftSlot={<HelpCircle size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        To reset your password:
                        <br />
                        1. Click on "Forgot Password" on the login page
                        <br />
                        2. Enter your email address
                        <br />
                        3. Check your email for a reset link
                        <br />
                        4. Follow the link and create a new password
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="q2"
                    title="What payment methods do you accept?"
                    leftSlot={<CreditCard size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        We accept the following payment methods:
                        <br />
                        • Credit cards (Visa, Mastercard, American Express)
                        <br />
                        • Debit cards
                        <br />
                        • PayPal
                        <br />• Bank transfers (for Enterprise plans)
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="q3"
                    title="Can I cancel my subscription anytime?"
                    leftSlot={<AlertCircle size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        Yes, you can cancel your subscription at any time. Your
                        access will continue until the end of your current
                        billing period. No refunds are provided for partial
                        months, but you won't be charged for the next billing
                        cycle.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="q4"
                    title="Is my data secure?"
                    leftSlot={<Shield size={20} color="#666" />}
                >
                    <div style={{ padding: '16px' }}>
                        Absolutely! We take security seriously:
                        <br />
                        • All data is encrypted at rest and in transit
                        <br />
                        • We use industry-standard security protocols
                        <br />
                        • Regular security audits are performed
                        <br />• GDPR and SOC 2 compliant
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A practical example of using accordions for FAQ sections.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const WithCustomStyling: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <style>
                {`
                .custom-accordion-item {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px !important;
                    margin-bottom: 8px;
                }
                .custom-accordion-item [data-state="open"] {
                    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                }
                .custom-content {
                    background: rgba(255, 255, 255, 0.95);
                    margin: 8px;
                    border-radius: 8px;
                    backdrop-filter: blur(10px);
                }
                `}
            </style>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="custom-1"
                    title="Custom Styled Item"
                    subtext="With gradient background"
                    data-testid="custom-accordion-item-1"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        This accordion item has custom CSS styling applied
                        through data attributes and parent container styles.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="custom-2"
                    title="Another Custom Item"
                    subtext="With hover effects"
                    data-testid="custom-accordion-item-2"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        You can pass data attributes to AccordionItem components
                        for enhanced functionality.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="custom-3"
                    title="Third Custom Item"
                    subtext="Fully customizable"
                    data-testid="custom-accordion-item-3"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        Custom CSS can be applied through parent containers and
                        data attributes while maintaining all accordion
                        functionality.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with custom CSS classes and additional HTML attributes.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Controlled
// ============================================================================

export const Controlled: Story = {
    render: function ControlledExample() {
        const [value, setValue] = React.useState<string>('item-2')

        return (
            <div style={{ width: '600px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <p>
                        Currently expanded: <strong>{value || 'none'}</strong>
                    </p>
                </div>
                <Accordion
                    accordionType={AccordionType.NO_BORDER}
                    value={value}
                    onValueChange={(newValue) => setValue(newValue as string)}
                >
                    <AccordionItem value="item-1" title="First Item">
                        <div style={{ padding: '16px' }}>
                            This is a controlled accordion. The expanded state
                            is managed externally.
                        </div>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Second Item">
                        <div style={{ padding: '16px' }}>
                            This item is expanded by default through the
                            controlled value prop.
                        </div>
                    </AccordionItem>
                    <AccordionItem value="item-3" title="Third Item">
                        <div style={{ padding: '16px' }}>
                            The parent component controls which item is
                            expanded.
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled accordion where the expanded state is managed externally.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

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
                    ARIA Attributes
                </h3>
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem value="aria-1" title="ARIA Expanded">
                            <div style={{ padding: '16px' }}>
                                Accordion triggers have aria-expanded attribute
                                that updates based on state (true/false).
                            </div>
                        </AccordionItem>
                        <AccordionItem value="aria-2" title="ARIA Controls">
                            <div style={{ padding: '16px' }}>
                                Each trigger has aria-controls linking to its
                                content panel, establishing proper
                                relationships.
                            </div>
                        </AccordionItem>
                    </Accordion>
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
                    Keyboard Navigation
                </h3>
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="keyboard-1"
                            title="Tab Navigation"
                        >
                            <div style={{ padding: '16px' }}>
                                Tab to focus accordion triggers.
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="keyboard-2"
                            title="Enter/Space to Toggle"
                        >
                            <div style={{ padding: '16px' }}>
                                Press Enter or Space to expand/collapse items.
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="keyboard-3"
                            title="Arrow Key Navigation"
                        >
                            <div style={{ padding: '16px' }}>
                                Use Arrow Up/Down to navigate between items.
                            </div>
                        </AccordionItem>
                    </Accordion>
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
                    Decorative Icons
                </h3>
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="icon-1"
                            title="Icon with aria-hidden"
                            leftSlot={<User size={20} color="#666" />}
                        >
                            <div style={{ padding: '16px' }}>
                                Decorative icons are marked with
                                aria-hidden="true".
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="icon-2"
                            title="Chevron Icon"
                            leftSlot={<Shield size={20} color="#666" />}
                        >
                            <div style={{ padding: '16px' }}>
                                Chevron icons are properly hidden from assistive
                                technologies.
                            </div>
                        </AccordionItem>
                    </Accordion>
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
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem value="focus-1" title="Focus Me">
                            <div style={{ padding: '16px' }}>
                                Tab to focus — you should see a visible focus
                                indicator.
                            </div>
                        </AccordionItem>
                        <AccordionItem value="focus-2" title="Focus Me Too">
                            <div style={{ padding: '16px' }}>
                                All triggers have visible focus indicators.
                            </div>
                        </AccordionItem>
                    </Accordion>
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
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem value="enabled-1" title="Enabled Item">
                            <div style={{ padding: '16px' }}>
                                This item is enabled and can be expanded.
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="disabled-1"
                            title="Disabled Item"
                            isDisabled
                        >
                            <div style={{ padding: '16px' }}>
                                This item is disabled and removed from tab
                                order.
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="enabled-2"
                            title="Another Enabled"
                        >
                            <div style={{ padding: '16px' }}>
                                Tab navigation skips disabled items.
                            </div>
                        </AccordionItem>
                    </Accordion>
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
                    Screen Reader Support
                </h3>
                <div style={{ width: '600px' }}>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="sr-1"
                            title="With Subtext"
                            subtext="Additional context for screen readers"
                        >
                            <div style={{ padding: '16px' }}>
                                Subtext provides additional context announced to
                                screen readers.
                            </div>
                        </AccordionItem>
                        <AccordionItem value="sr-2" title="State Announcements">
                            <div style={{ padding: '16px' }}>
                                Screen readers announce expanded/collapsed state
                                via aria-expanded changes.
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accessibility examples demonstrating ARIA attributes, keyboard navigation, focus indicators, disabled states, and screen reader support.',
            },
        },
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}

// ============================================================================
// Trigger Slot Patterns
// ============================================================================

export const TriggerSlotPatterns: Story = {
    render: function TriggerSlotPatternsExample() {
        // Pattern 1: Simple element state
        const [simpleChecked, setSimpleChecked] = React.useState<
            Record<string, boolean>
        >({
            'el-1': true,
            'el-2': false,
        })

        // Pattern 2: Independent selection state
        const [selectedTasks, setSelectedTasks] = React.useState<string[]>([])

        // Pattern 3: Feature toggle state
        const [features, setFeatures] = React.useState<string[]>([
            'feature-analytics',
        ])

        const toggleSelection = (id: string) => {
            setSelectedTasks((prev) =>
                prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            )
        }

        const toggleFeature = (id: string) => {
            setFeatures((prev) =>
                prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            )
        }

        return (
            <div
                style={{
                    width: '600px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '48px',
                }}
            >
                {/* Pattern 1: Simple Element */}
                <section>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Pattern 1: Simple React Element
                    </h4>
                    <p
                        style={{
                            marginBottom: '16px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Pass Checkbox or Switch as a simple element. State is
                        managed externally.
                    </p>
                    <Accordion accordionType={AccordionType.BORDER} isMultiple>
                        <AccordionItem
                            value="el-1"
                            title="Checkbox Item"
                            triggerSlot={
                                <Checkbox
                                    checked={simpleChecked['el-1']}
                                    onCheckedChange={(checked) => {
                                        if (typeof checked === 'boolean') {
                                            setSimpleChecked((prev) => ({
                                                ...prev,
                                                'el-1': checked,
                                            }))
                                        }
                                    }}
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                Simple checkbox as element
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="el-2"
                            title="Switch Item"
                            triggerSlot={
                                <Switch
                                    checked={simpleChecked['el-2']}
                                    onChange={() =>
                                        setSimpleChecked((prev) => ({
                                            ...prev,
                                            'el-2': !prev['el-2'],
                                        }))
                                    }
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                Simple switch as element
                            </div>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Pattern 2: Independent Selection + Expansion */}
                <section>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Pattern 2: Independent Selection State
                    </h4>
                    <p
                        style={{
                            marginBottom: '16px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Selected: [{selectedTasks.join(', ') || 'none'}]
                    </p>
                    <Accordion accordionType={AccordionType.BORDER} isMultiple>
                        <AccordionItem
                            value="task-1"
                            title="Task 1"
                            subtext="Deploy pipeline"
                            leftSlot={<Database size={20} color="#666" />}
                            triggerSlot={
                                <Checkbox
                                    checked={selectedTasks.includes('task-1')}
                                    onCheckedChange={() =>
                                        toggleSelection('task-1')
                                    }
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                CI/CD pipeline configuration
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="task-2"
                            title="Task 2"
                            subtext="Security review"
                            leftSlot={<Shield size={20} color="#666" />}
                            triggerSlot={
                                <Checkbox
                                    checked={selectedTasks.includes('task-2')}
                                    onCheckedChange={() =>
                                        toggleSelection('task-2')
                                    }
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                Security policy audit
                            </div>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Pattern 3: Feature Toggles */}
                <section>
                    <h4
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Pattern 3: Feature Toggles
                    </h4>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="feature-analytics"
                            title="Analytics Dashboard"
                            subtext={
                                features.includes('feature-analytics')
                                    ? 'Enabled'
                                    : 'Disabled'
                            }
                            leftSlot={<Monitor size={20} color="#666" />}
                            triggerSlot={
                                <Switch
                                    checked={features.includes(
                                        'feature-analytics'
                                    )}
                                    onChange={() =>
                                        toggleFeature('feature-analytics')
                                    }
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                <ul style={{ paddingLeft: '20px' }}>
                                    <li>Real-time metrics</li>
                                    <li>Custom reports</li>
                                </ul>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="feature-security"
                            title="Advanced Security"
                            subtext={
                                features.includes('feature-security')
                                    ? 'Enabled'
                                    : 'Disabled'
                            }
                            leftSlot={<Lock size={20} color="#666" />}
                            triggerSlot={
                                <Switch
                                    checked={features.includes(
                                        'feature-security'
                                    )}
                                    onChange={() =>
                                        toggleFeature('feature-security')
                                    }
                                />
                            }
                        >
                            <div style={{ padding: '16px' }}>
                                <ul style={{ paddingLeft: '20px' }}>
                                    <li>End-to-end encryption</li>
                                    <li>Audit logging</li>
                                </ul>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive examples of triggerSlot patterns: (1) Simple React elements with external state, (2) Independent selection state separate from expansion, (3) Feature toggles with Switch.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Default Value Story
// ============================================================================

export const DefaultValueMultiple: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: true,
        defaultValue: ['item-1', 'item-3'],
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <p
                style={{
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#666',
                }}
            >
                Items 1 and 3 are expanded by default using the defaultValue
                prop with an array.
            </p>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue as string[]}
            >
                <AccordionItem value="item-1" title="First Item (Default)">
                    <div style={{ padding: '16px' }}>
                        This item is expanded by default because defaultValue
                        includes &quot;item-1&quot;.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Item">
                    <div style={{ padding: '16px' }}>
                        This item is collapsed by default.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Item (Default)">
                    <div style={{ padding: '16px' }}>
                        This item is also expanded by default because
                        defaultValue includes &quot;item-3&quot;.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates defaultValue in multiple expansion mode. Pass an array of values to expand multiple items by default.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const DefaultValueSingle: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
        defaultValue: 'item-2',
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <p
                style={{
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#666',
                }}
            >
                Item 2 is expanded by default using the defaultValue prop.
            </p>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue}
            >
                <AccordionItem value="item-1" title="First Item">
                    <div style={{ padding: '16px' }}>
                        This is the first item, collapsed by default.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Item (Default)">
                    <div style={{ padding: '16px' }}>
                        This item is expanded by default because defaultValue is
                        set to &quot;item-2&quot;. Works in uncontrolled mode.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Item">
                    <div style={{ padding: '16px' }}>
                        This is the third item, collapsed by default.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates defaultValue in single expansion mode. The accordion starts with the specified item expanded.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}
