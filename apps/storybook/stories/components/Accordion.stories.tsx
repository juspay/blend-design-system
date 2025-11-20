import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionType,
    AccordionChevronPosition,
} from '@juspay/blend-design-system'
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
} from 'lucide-react'

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
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
        // AccordionItem props for interactive story
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
        className: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Additional CSS class for custom styling',
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
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

// Helper functions to render slots based on control selection
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

// Default story with interactive controls
export const Default: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
        // AccordionItem props
        title: 'What is an accordion?',
        subtext: 'Click to learn more',
        leftSlot: 'user',
        rightSlot: 'status',
        subtextSlot: 'none',
        isDisabled: false,
        chevronPosition: AccordionChevronPosition.RIGHT,
        children:
            'An accordion is a vertically stacked list of interactive headings that each reveal an associated section of content.',
        className: '',
    },
    render: (args: any) => (
        <div style={{ width: '600px' }}>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.isMultiple ? [] : undefined}
                onValueChange={args.onValueChange}
            >
                <AccordionItem
                    value="item-1"
                    title={args.title}
                    subtext={args.subtext}
                    leftSlot={getLeftSlot(args.leftSlot)}
                    rightSlot={getRightSlot(args.rightSlot)}
                    subtextSlot={getSubtextSlot(args.subtextSlot)}
                    isDisabled={args.isDisabled}
                    chevronPosition={args.chevronPosition}
                    className={args.className}
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
}

// With border style
export const WithBorder: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// Multiple expansion
export const MultipleExpansion: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: true,
        defaultValue: ['item-1', 'item-2'],
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// With icons
export const WithIcons: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// With subtext
export const WithSubtext: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// Chevron on left
export const ChevronLeft: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// With disabled items
export const WithDisabledItems: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
    },
}

// Complex content
export const ComplexContent: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div style={{ width: '600px' }}>
            <Accordion {...args}>
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{ fontSize: '14px', color: '#666' }}
                                >
                                    Documents
                                </span>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    12.3 GB
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{ fontSize: '14px', color: '#666' }}
                                >
                                    Images
                                </span>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    23.7 GB
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span
                                    style={{ fontSize: '14px', color: '#666' }}
                                >
                                    Videos
                                </span>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                    }}
                                >
                                    9.2 GB
                                </span>
                            </div>
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <Laptop size={16} color="#666" />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        MacBook Pro
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#999',
                                        }}
                                    >
                                        Last active: 2 minutes ago
                                    </div>
                                </div>
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: '#22c55e',
                                    }}
                                >
                                    Active
                                </span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <Smartphone size={16} color="#666" />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        iPhone 14
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#999',
                                        }}
                                    >
                                        Last active: 1 hour ago
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <Tablet size={16} color="#666" />
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        iPad Air
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '12px',
                                            color: '#999',
                                        }}
                                    >
                                        Last active: 3 days ago
                                    </div>
                                </div>
                            </div>
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
    },
}

// FAQ example
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
            <Accordion {...args}>
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
    },
}

// With custom styling
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
                .custom-accordion-item .custom-title {
                    color: white;
                    font-weight: 600;
                }
                .custom-content {
                    background: rgba(255, 255, 255, 0.95);
                    margin: 8px;
                    border-radius: 8px;
                    backdrop-filter: blur(10px);
                }
                `}
            </style>
            <Accordion {...args}>
                <AccordionItem
                    value="custom-1"
                    title="Custom Styled Item"
                    subtext="With gradient background"
                    className="custom-accordion-item"
                    data-testid="custom-accordion-item-1"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        This accordion item has custom CSS styling applied
                        through the className prop and additional HTML
                        attributes.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="custom-2"
                    title="Another Custom Item"
                    subtext="With hover effects"
                    className="custom-accordion-item"
                    data-testid="custom-accordion-item-2"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        You can pass any valid HTML div attributes to
                        AccordionItem components for enhanced functionality and
                        styling.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="custom-3"
                    title="Third Custom Item"
                    subtext="Fully customizable"
                    className="custom-accordion-item"
                    data-testid="custom-accordion-item-3"
                >
                    <div className="custom-content" style={{ padding: '16px' }}>
                        The className prop allows for complete visual
                        customization while maintaining all accordion
                        functionality.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with custom CSS classes and additional HTML attributes like data-testid for testing purposes.',
            },
        },
    },
}

// Controlled example
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
    },
}
