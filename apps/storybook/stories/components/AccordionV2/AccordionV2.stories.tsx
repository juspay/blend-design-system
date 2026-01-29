import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    AccordionV2,
    AccordionV2Item,
    AccordionV2Type,
    AccordionV2ChevronPosition,
} from '../../../../../packages/blend/lib/components/AccordionV2'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import {
    User,
    Shield,
    Bell,
    CreditCard,
    HelpCircle,
    Lock,
    CheckCircle,
    AlertCircle,
    Settings,
    Mail,
    Calendar,
} from 'lucide-react'

const meta: Meta<typeof AccordionV2> = {
    title: 'Components/AccordionV2',
    component: AccordionV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Accordion component for showing and hiding sections of related content.

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
import { AccordionV2, AccordionV2Item, AccordionV2Type } from '@juspay/blend-design-system';

<AccordionV2 accordionType={AccordionV2Type.BORDER}>
  <AccordionV2Item value="item-1" title="Section 1">
    Content for section 1
  </AccordionV2Item>
  <AccordionV2Item value="item-2" title="Section 2">
    Content for section 2
  </AccordionV2Item>
</AccordionV2>
\`\`\`
                `,
            },
        },
    },
    args: {
        accordionType: AccordionV2Type.NO_BORDER,
        isMultiple: false,
    },
    argTypes: {
        accordionType: {
            control: 'select',
            options: Object.values(AccordionV2Type),
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
        width: {
            control: 'text',
            description: 'Width of the accordion',
        },
        maxWidth: {
            control: 'text',
            description: 'Maximum width of the accordion',
        },
        minWidth: {
            control: 'text',
            description: 'Minimum width of the accordion',
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof AccordionV2>

export const Default: Story = {
    render: () => (
        <AccordionV2>
            <AccordionV2Item value="item-1" title="Account Settings">
                <div style={{ padding: '16px 0' }}>
                    <p>Manage your account preferences and settings here.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Privacy & Security">
                <div style={{ padding: '16px 0' }}>
                    <p>Configure your privacy and security settings.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Notifications">
                <div style={{ padding: '16px 0' }}>
                    <p>Control how and when you receive notifications.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
}

export const WithIcons: Story = {
    render: () => (
        <AccordionV2>
            <AccordionV2Item
                value="item-1"
                title="Account Settings"
                leftSlot={<User size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Manage your account preferences and settings here.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Privacy & Security"
                leftSlot={<Shield size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Configure your privacy and security settings.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-3"
                title="Notifications"
                leftSlot={<Bell size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Control how and when you receive notifications.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with left slot icons.',
            },
        },
    },
}

export const WithSubtext: Story = {
    render: () => (
        <AccordionV2>
            <AccordionV2Item
                value="item-1"
                title="Payment Methods"
                subtext="Manage your payment options"
                leftSlot={<CreditCard size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Add, remove, or update your payment methods.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Billing History"
                subtext="View past transactions"
                leftSlot={<Calendar size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Review your billing history and invoices.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-3"
                title="Support"
                subtext="Get help and contact us"
                leftSlot={<HelpCircle size={16} />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>Find answers to common questions or contact support.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with subtext for additional context.',
            },
        },
    },
}

export const BorderType: Story = {
    render: () => (
        <AccordionV2 accordionType={AccordionV2Type.BORDER}>
            <AccordionV2Item value="item-1" title="First Section">
                <div style={{ padding: '16px 0' }}>
                    <p>Content for the first section with border style.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Second Section">
                <div style={{ padding: '16px 0' }}>
                    <p>Content for the second section with border style.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Third Section">
                <div style={{ padding: '16px 0' }}>
                    <p>Content for the third section with border style.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with border type styling.',
            },
        },
    },
}

export const MultipleSelection: Story = {
    render: () => (
        <AccordionV2 isMultiple>
            <AccordionV2Item value="item-1" title="Section 1">
                <div style={{ padding: '16px 0' }}>
                    <p>Multiple items can be expanded simultaneously.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Section 2">
                <div style={{ padding: '16px 0' }}>
                    <p>This is the second section.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Section 3">
                <div style={{ padding: '16px 0' }}>
                    <p>This is the third section.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with multiple selection enabled.',
            },
        },
    },
}

export const ChevronPositions: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    Chevron on Right (Default)
                </h3>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Right Chevron"
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>Chevron icon appears on the right side.</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    Chevron on Left
                </h3>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-2"
                        title="Left Chevron"
                        chevronPosition={AccordionV2ChevronPosition.LEFT}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>Chevron icon appears on the left side.</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different chevron positions for accordion items.',
            },
        },
    },
}

export const DisabledItems: Story = {
    render: () => (
        <AccordionV2>
            <AccordionV2Item value="item-1" title="Enabled Item">
                <div style={{ padding: '16px 0' }}>
                    <p>This item is enabled and can be expanded.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Disabled Item" isDisabled>
                <div style={{ padding: '16px 0' }}>
                    <p>This item is disabled and cannot be expanded.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Another Enabled Item">
                <div style={{ padding: '16px 0' }}>
                    <p>This item is also enabled.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with disabled items.',
            },
        },
    },
}

export const WithRightSlot: Story = {
    render: () => (
        <AccordionV2>
            <AccordionV2Item
                value="item-1"
                title="Notifications"
                subtext="Manage notification preferences"
                leftSlot={<Bell size={16} />}
                rightSlot={
                    <span
                        style={{
                            fontSize: 12,
                            padding: '2px 8px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            borderRadius: '12px',
                        }}
                    >
                        3
                    </span>
                }
            >
                <div style={{ padding: '16px 0' }}>
                    <p>You have 3 unread notifications.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Messages"
                subtext="View your messages"
                leftSlot={<Mail size={16} />}
                rightSlot={<CheckCircle size={16} color="#10b981" />}
            >
                <div style={{ padding: '16px 0' }}>
                    <p>All messages have been read.</p>
                </div>
            </AccordionV2Item>
        </AccordionV2>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with right slot content.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    NO_BORDER Type
                </h3>
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <div style={{ padding: '16px 0' }}>
                            <p>Content for first item</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <div style={{ padding: '16px 0' }}>
                            <p>Content for second item</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    BORDER Type
                </h3>
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-3" title="First Item">
                        <div style={{ padding: '16px 0' }}>
                            <p>Content for first item</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-4" title="Second Item">
                        <div style={{ padding: '16px 0' }}>
                            <p>Content for second item</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual examples of both accordion types for visual regression testing.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const Interactive: Story = {
    render: () => {
        const [value, setValue] = React.useState<string | string[] | undefined>(
            undefined
        )
        const [isMultiple, setIsMultiple] = React.useState(false)
        const [accordionType, setAccordionType] = React.useState(
            AccordionV2Type.NO_BORDER
        )

        return (
            <div style={{ maxWidth: 600 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        marginBottom: 24,
                        padding: 16,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 8,
                    }}
                >
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isMultiple}
                            onChange={(e) => {
                                setIsMultiple(e.target.checked)
                                setValue(undefined)
                            }}
                        />
                        Multiple Selection
                    </label>
                    <label>
                        Accordion Type
                        <select
                            value={accordionType}
                            onChange={(e) =>
                                setAccordionType(
                                    e.target.value as AccordionV2Type
                                )
                            }
                            style={{
                                width: '100%',
                                marginTop: 4,
                                padding: 8,
                            }}
                        >
                            {Object.values(AccordionV2Type).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div style={{ fontSize: 12, color: '#666' }}>
                        Current value:{' '}
                        {value
                            ? Array.isArray(value)
                                ? value.join(', ')
                                : value
                            : 'none'}
                    </div>
                </div>
                <AccordionV2
                    accordionType={accordionType}
                    isMultiple={isMultiple}
                    value={value}
                    onValueChange={setValue}
                >
                    <AccordionV2Item
                        value="item-1"
                        title="Account Settings"
                        leftSlot={<Settings size={16} />}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>Manage your account preferences and settings.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Privacy & Security"
                        leftSlot={<Shield size={16} />}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>Configure your privacy and security settings.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-3"
                        title="Notifications"
                        leftSlot={<Bell size={16} />}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>
                                Control how and when you receive notifications.
                            </p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground for experimenting with AccordionV2 configuration.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                maxWidth: 600,
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Use Tab to navigate between accordion items. Press Enter or
                    Space to expand/collapse items. Arrow keys can be used to
                    navigate between items in single selection mode.
                </p>
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Keyboard Accessible">
                        <div style={{ padding: '16px 0' }}>
                            <p>
                                This accordion item is fully keyboard
                                accessible.
                            </p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Try Tab + Enter">
                        <div style={{ padding: '16px 0' }}>
                            <p>
                                Press Tab to focus, then Enter or Space to
                                expand.
                            </p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    ARIA Attributes
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Accordion items have proper ARIA attributes including
                    aria-expanded and aria-controls for screen reader support.
                </p>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-3"
                        title="Screen Reader Friendly"
                        leftSlot={<AlertCircle size={16} />}
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>
                                This accordion item has proper ARIA attributes
                                for screen readers.
                            </p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Disabled State
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Disabled items are properly marked and cannot be interacted
                    with via keyboard or mouse.
                </p>
                <AccordionV2>
                    <AccordionV2Item value="item-4" title="Enabled Item">
                        <div style={{ padding: '16px 0' }}>
                            <p>This item can be expanded.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-5"
                        title="Disabled Item"
                        isDisabled
                    >
                        <div style={{ padding: '16px 0' }}>
                            <p>This item is disabled and cannot be expanded.</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docs: {
            description: {
                story: `
Accessibility examples demonstrating:

- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ARIA attributes (aria-expanded, aria-controls)
- Screen reader support
- Disabled state handling

Use with Storybook a11y panel and screen readers (VoiceOver, NVDA) to validate behavior.
                `,
            },
        },
    },
}
