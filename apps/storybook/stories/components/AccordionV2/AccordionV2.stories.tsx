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
        docsSubtitle:
            'Accordion component for showing and hiding sections of related content.',
        docs: {
            description: {
                component: `
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
                <div className="py-4">
                    <p>Manage your account preferences and settings here.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Privacy & Security">
                <div className="py-4">
                    <p>Configure your privacy and security settings.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Notifications">
                <div className="py-4">
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
                <div className="py-4">
                    <p>Manage your account preferences and settings here.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Privacy & Security"
                leftSlot={<Shield size={16} />}
            >
                <div className="py-4">
                    <p>Configure your privacy and security settings.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-3"
                title="Notifications"
                leftSlot={<Bell size={16} />}
            >
                <div className="py-4">
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
                <div className="py-4">
                    <p>Add, remove, or update your payment methods.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Billing History"
                subtext="View past transactions"
                leftSlot={<Calendar size={16} />}
            >
                <div className="py-4">
                    <p>Review your billing history and invoices.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-3"
                title="Support"
                subtext="Get help and contact us"
                leftSlot={<HelpCircle size={16} />}
            >
                <div className="py-4">
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
                <div className="py-4">
                    <p>Content for the first section with border style.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Second Section">
                <div className="py-4">
                    <p>Content for the second section with border style.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Third Section">
                <div className="py-4">
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
                <div className="py-4">
                    <p>Multiple items can be expanded simultaneously.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Section 2">
                <div className="py-4">
                    <p>This is the second section.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Section 3">
                <div className="py-4">
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
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="mb-3 text-sm font-semibold">
                    Chevron on Right (Default)
                </h3>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-1"
                        title="Right Chevron"
                        chevronPosition={AccordionV2ChevronPosition.RIGHT}
                    >
                        <div className="py-4">
                            <p>Chevron icon appears on the right side.</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-semibold">Chevron on Left</h3>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-2"
                        title="Left Chevron"
                        chevronPosition={AccordionV2ChevronPosition.LEFT}
                    >
                        <div className="py-4">
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
                <div className="py-4">
                    <p>This item is enabled and can be expanded.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-2" title="Disabled Item" isDisabled>
                <div className="py-4">
                    <p>This item is disabled and cannot be expanded.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item value="item-3" title="Another Enabled Item">
                <div className="py-4">
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
                    <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-xl">
                        3
                    </span>
                }
            >
                <div className="py-4">
                    <p>You have 3 unread notifications.</p>
                </div>
            </AccordionV2Item>
            <AccordionV2Item
                value="item-2"
                title="Messages"
                subtext="View your messages"
                leftSlot={<Mail size={16} />}
                rightSlot={<CheckCircle size={16} className="text-green-500" />}
            >
                <div className="py-4">
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
        <div className="flex flex-col gap-6">
            <div>
                <h3 className="mb-3 text-sm font-semibold">NO_BORDER Type</h3>
                <AccordionV2 accordionType={AccordionV2Type.NO_BORDER}>
                    <AccordionV2Item value="item-1" title="First Item">
                        <div className="py-4">
                            <p>Content for first item</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Second Item">
                        <div className="py-4">
                            <p>Content for second item</p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-semibold">BORDER Type</h3>
                <AccordionV2 accordionType={AccordionV2Type.BORDER}>
                    <AccordionV2Item value="item-3" title="First Item">
                        <div className="py-4">
                            <p>Content for first item</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-4" title="Second Item">
                        <div className="py-4">
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
            <div className="max-w-[600px]">
                <div className="flex flex-col gap-3 mb-6 p-4 bg-gray-100 rounded-lg">
                    <label className="flex items-center gap-2">
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
                            className="w-full mt-1 p-2"
                        >
                            {Object.values(AccordionV2Type).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="text-xs text-gray-500">
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
                        <div className="py-4">
                            <p>Manage your account preferences and settings.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-2"
                        title="Privacy & Security"
                        leftSlot={<Shield size={16} />}
                    >
                        <div className="py-4">
                            <p>Configure your privacy and security settings.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-3"
                        title="Notifications"
                        leftSlot={<Bell size={16} />}
                    >
                        <div className="py-4">
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
        <div className="flex flex-col gap-6 max-w-[600px]">
            <div>
                <h3 className="mb-2 text-base font-bold">
                    Keyboard Navigation
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                    Use Tab to navigate between accordion items. Press Enter or
                    Space to expand/collapse items. Arrow keys can be used to
                    navigate between items in single selection mode.
                </p>
                <AccordionV2>
                    <AccordionV2Item value="item-1" title="Keyboard Accessible">
                        <div className="py-4">
                            <p>
                                This accordion item is fully keyboard
                                accessible.
                            </p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item value="item-2" title="Try Tab + Enter">
                        <div className="py-4">
                            <p>
                                Press Tab to focus, then Enter or Space to
                                expand.
                            </p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>

            <div>
                <h3 className="mb-2 text-base font-bold">ARIA Attributes</h3>
                <p className="mb-3 text-sm text-gray-500">
                    Accordion items have proper ARIA attributes including
                    aria-expanded and aria-controls for screen reader support.
                </p>
                <AccordionV2>
                    <AccordionV2Item
                        value="item-3"
                        title="Screen Reader Friendly"
                        leftSlot={<AlertCircle size={16} />}
                    >
                        <div className="py-4">
                            <p>
                                This accordion item has proper ARIA attributes
                                for screen readers.
                            </p>
                        </div>
                    </AccordionV2Item>
                </AccordionV2>
            </div>

            <div>
                <h3 className="mb-2 text-base font-bold">Disabled State</h3>
                <p className="mb-3 text-sm text-gray-500">
                    Disabled items are properly marked and cannot be interacted
                    with via keyboard or mouse.
                </p>
                <AccordionV2>
                    <AccordionV2Item value="item-4" title="Enabled Item">
                        <div className="py-4">
                            <p>This item can be expanded.</p>
                        </div>
                    </AccordionV2Item>
                    <AccordionV2Item
                        value="item-5"
                        title="Disabled Item"
                        isDisabled
                    >
                        <div className="py-4">
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
