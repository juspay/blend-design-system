import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { KeyValuePair } from '@juspay/blend-design-system'
import {
    KeyValuePairSize,
    KeyValuePairStateType,
} from '@juspay/blend-design-system/components/KeyValuePair/types'
import {
    Info,
    CheckCircle,
    AlertCircle,
    Copy,
    ExternalLink,
    Star,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
} from 'lucide-react'

const meta: Meta<typeof KeyValuePair> = {
    title: 'Components/KeyValuePair',
    component: KeyValuePair,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible key-value pair component for displaying labeled data with support for icons, tooltips, and text overflow handling.

## Features
- Vertical and horizontal layouts
- Three size variants (small, medium, large)
- Multiple text overflow modes (truncate, wrap, wrap-clamp)
- Icon/slot support for key and value sections
- Automatic tooltip on text truncation
- Customizable max width
- Token-based styling system
- Responsive text handling

## Text Overflow Modes
- **truncate**: Single line with ellipsis (default, all browsers)
- **wrap**: Allow natural text wrapping (all browsers)
- **wrap-clamp**: Wrap with line limit and ellipsis (modern browsers)

## Usage

\`\`\`tsx
import { KeyValuePair, KeyValuePairSize, KeyValuePairStateType } from '@juspay/blend-design-system';

// Basic usage
<KeyValuePair
  keyString="Name"
  value="John Doe"
  size={KeyValuePairSize.MEDIUM}
/>

// With icon slots
<KeyValuePair
  keyString="Email"
  value="john.doe@example.com"
  valueLeftSlot={<Mail size={16} />}
  size={KeyValuePairSize.MEDIUM}
/>

// Horizontal layout
<KeyValuePair
  keyString="Status"
  value="Active"
  keyValuePairState={KeyValuePairStateType.horizontal}
  valueLeftSlot={<CheckCircle size={16} color="green" />}
/>
\`\`\`

## Accessibility
- Semantic HTML structure
- Tooltip support for truncated text
- Keyboard accessible
- Screen reader friendly
        `,
            },
        },
    },
    argTypes: {
        keyString: {
            control: 'text',
            description: 'The label/key text to display',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        value: {
            control: 'text',
            description: 'The value text to display',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size variant for the value text',
            table: {
                type: { summary: 'KeyValuePairSize' },
                defaultValue: { summary: 'sm' },
                category: 'Appearance',
            },
        },
        keyValuePairState: {
            control: 'select',
            options: [
                KeyValuePairStateType.vertical,
                KeyValuePairStateType.horizontal,
            ],
            description:
                'Layout orientation - vertical (stacked) or horizontal (inline)',
            table: {
                type: { summary: 'KeyValuePairStateType' },
                defaultValue: { summary: 'vertical' },
                category: 'Layout',
            },
        },
        textOverflow: {
            control: 'select',
            options: ['truncate', 'wrap', 'wrap-clamp'],
            description: 'How to handle text overflow',
            table: {
                type: { summary: "'truncate' | 'wrap' | 'wrap-clamp'" },
                defaultValue: { summary: 'truncate' },
                category: 'Behavior',
            },
        },
        maxLines: {
            control: 'number',
            description: 'Maximum number of lines when using wrap-clamp',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '2' },
                category: 'Behavior',
            },
        },
        maxWidth: {
            control: 'text',
            description: 'Maximum width of the component',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '220px' },
                category: 'Layout',
            },
        },
        showTooltipOnTruncate: {
            control: 'boolean',
            description: 'Show tooltip when text is truncated',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        keySlot: {
            description: 'Icon or element to display next to the key',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
        valueLeftSlot: {
            description: 'Icon or element to display before the value',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
        valueRightSlot: {
            description: 'Icon or element to display after the value',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyValuePair>

// Default
export const Default: Story = {
    args: {
        keyString: 'Name',
        value: 'John Doe',
        size: KeyValuePairSize.MEDIUM,
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#666',
                    }}
                >
                    Small
                </h4>
                <KeyValuePair
                    keyString="Email Address"
                    value="john.doe@example.com"
                    size={KeyValuePairSize.SMALL}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#666',
                    }}
                >
                    Medium
                </h4>
                <KeyValuePair
                    keyString="Email Address"
                    value="john.doe@example.com"
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#666',
                    }}
                >
                    Large
                </h4>
                <KeyValuePair
                    keyString="Email Address"
                    value="john.doe@example.com"
                    size={KeyValuePairSize.LARGE}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three size variants: small, medium, and large. Size affects the value text size.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Layouts
export const Layouts: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Vertical Layout (Default)
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Key and value are stacked vertically
                </p>
                <KeyValuePair
                    keyString="Customer Name"
                    value="Jane Smith"
                    keyValuePairState={KeyValuePairStateType.vertical}
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Horizontal Layout
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Key and value are displayed inline
                </p>
                <KeyValuePair
                    keyString="Customer Name"
                    value="Jane Smith"
                    keyValuePairState={KeyValuePairStateType.horizontal}
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Two layout options: vertical (stacked) and horizontal (inline). Choose based on your UI needs and available space.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Text Overflow
export const TextOverflow: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Truncate (Default)
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Single line with ellipsis. Hover to see tooltip with full
                    text.
                </p>
                <KeyValuePair
                    keyString="Description"
                    value="This is a very long description that will be truncated with an ellipsis when it exceeds the maximum width"
                    textOverflow="truncate"
                    maxWidth="300px"
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Wrap
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Text wraps naturally to multiple lines
                </p>
                <KeyValuePair
                    keyString="Description"
                    value="This is a very long description that will wrap naturally to multiple lines when it exceeds the maximum width"
                    textOverflow="wrap"
                    maxWidth="300px"
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Wrap with Line Clamp
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Wraps to max 2 lines, then shows ellipsis. Hover to see
                    tooltip.
                </p>
                <KeyValuePair
                    keyString="Description"
                    value="This is a very long description that will wrap to a maximum of two lines and then be truncated with an ellipsis when it exceeds the line limit"
                    textOverflow="wrap-clamp"
                    maxLines={2}
                    maxWidth="300px"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three text overflow modes: truncate (single line with ellipsis), wrap (natural wrapping), and wrap-clamp (limited lines with ellipsis).',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Icons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <KeyValuePair
                keyString="Email"
                value="john.doe@example.com"
                valueLeftSlot={<Mail size={16} color="#6B7280" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Phone"
                value="+1 (555) 123-4567"
                valueLeftSlot={<Phone size={16} color="#6B7280" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Location"
                value="San Francisco, CA"
                valueLeftSlot={<MapPin size={16} color="#6B7280" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Status"
                value="Active"
                valueLeftSlot={<CheckCircle size={16} color="#10B981" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Documentation"
                value="View docs"
                valueRightSlot={
                    <ExternalLink
                        size={16}
                        color="#3B82F6"
                        style={{ cursor: 'pointer' }}
                    />
                }
                size={KeyValuePairSize.MEDIUM}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'KeyValuePair with icon slots. Icons can be placed before (valueLeftSlot) or after (valueRightSlot) the value.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Key Icons
export const WithKeyIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <KeyValuePair
                keyString="Important Note"
                value="This requires your attention"
                keySlot={<Info size={14} color="#3B82F6" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Warning"
                value="Please review before proceeding"
                keySlot={<AlertCircle size={14} color="#F59E0B" />}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Featured"
                value="Premium content"
                keySlot={<Star size={14} color="#FBBF24" />}
                size={KeyValuePairSize.MEDIUM}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Icons can also be added to the key using keySlot for additional context or emphasis.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Profile Card Example
export const ProfileCard: Story = {
    render: () => (
        <div
            style={{
                maxWidth: '400px',
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            }}
        >
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
                Contact Information
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <KeyValuePair
                    keyString="Full Name"
                    value="Sarah Johnson"
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Email Address"
                    value="sarah.johnson@company.com"
                    valueLeftSlot={<Mail size={16} color="#6B7280" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Phone Number"
                    value="+1 (555) 987-6543"
                    valueLeftSlot={<Phone size={16} color="#6B7280" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Location"
                    value="New York, United States"
                    valueLeftSlot={<MapPin size={16} color="#6B7280" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Member Since"
                    value="January 15, 2024"
                    valueLeftSlot={<Calendar size={16} color="#6B7280" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Account Status"
                    value="Active"
                    valueLeftSlot={<CheckCircle size={16} color="#10B981" />}
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Profile card example using KeyValuePair components to display user information in a clean, organized layout.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Product Details Example
export const ProductDetails: Story = {
    render: () => (
        <div
            style={{
                maxWidth: '400px',
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
            }}
        >
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
                Product Specifications
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <KeyValuePair
                    keyString="Product Name"
                    value="Wireless Noise-Cancelling Headphones"
                    size={KeyValuePairSize.LARGE}
                    textOverflow="wrap"
                />

                <KeyValuePair
                    keyString="SKU"
                    value="WH-1000XM5-B"
                    size={KeyValuePairSize.MEDIUM}
                    valueRightSlot={
                        <Copy
                            size={14}
                            color="#6B7280"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                />

                <KeyValuePair
                    keyString="Price"
                    value="$399.99"
                    valueLeftSlot={<DollarSign size={16} color="#10B981" />}
                    size={KeyValuePairSize.LARGE}
                />

                <KeyValuePair
                    keyString="Availability"
                    value="In Stock"
                    valueLeftSlot={<CheckCircle size={16} color="#10B981" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Rating"
                    value="4.8 out of 5 stars"
                    valueLeftSlot={<Star size={16} color="#FBBF24" />}
                    size={KeyValuePairSize.MEDIUM}
                />

                <KeyValuePair
                    keyString="Description"
                    value="Premium wireless headphones with industry-leading noise cancellation technology, exceptional sound quality, and 30-hour battery life"
                    textOverflow="wrap-clamp"
                    maxLines={3}
                    size={KeyValuePairSize.SMALL}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Product details card demonstrating how KeyValuePair can be used for e-commerce product information.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Horizontal List
export const HorizontalList: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                padding: '24px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
            }}
        >
            <KeyValuePair
                keyString="Status:"
                value="Active"
                keyValuePairState={KeyValuePairStateType.horizontal}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Type:"
                value="Premium"
                keyValuePairState={KeyValuePairStateType.horizontal}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Region:"
                value="US-West"
                keyValuePairState={KeyValuePairStateType.horizontal}
                size={KeyValuePairSize.MEDIUM}
            />

            <KeyValuePair
                keyString="Created:"
                value="2024-01-15"
                keyValuePairState={KeyValuePairStateType.horizontal}
                size={KeyValuePairSize.MEDIUM}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Horizontal layout is useful for displaying metadata or attributes in a compact, inline format.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Grid Layout
export const GridLayout: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                padding: '24px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
            }}
        >
            <KeyValuePair
                keyString="Total Users"
                value="12,345"
                size={KeyValuePairSize.LARGE}
            />

            <KeyValuePair
                keyString="Active Sessions"
                value="1,234"
                size={KeyValuePairSize.LARGE}
            />

            <KeyValuePair
                keyString="Revenue"
                value="$45,678"
                valueLeftSlot={<DollarSign size={16} color="#10B981" />}
                size={KeyValuePairSize.LARGE}
            />

            <KeyValuePair
                keyString="Growth Rate"
                value="+23.5%"
                size={KeyValuePairSize.LARGE}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'KeyValuePair components in a responsive grid layout for dashboard metrics or statistics.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Semantic Structure
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    KeyValuePair uses semantic HTML to properly structure
                    label-value relationships, making it easy for screen readers
                    to announce the information.
                </p>

                <KeyValuePair
                    keyString="Accessible Label"
                    value="Properly structured value"
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Tooltip on Truncation
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    When text is truncated, a tooltip automatically appears on
                    hover/focus to reveal the full content, ensuring no
                    information is lost.
                </p>

                <KeyValuePair
                    keyString="Long Value Example"
                    value="This is a very long value that will be truncated but can be read in full via tooltip"
                    textOverflow="truncate"
                    maxWidth="250px"
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Accessible
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Interactive elements within slots (like copy buttons or
                    links) are fully keyboard accessible and can be reached via
                    Tab navigation.
                </p>

                <KeyValuePair
                    keyString="API Key"
                    value="sk-1234567890abcdef"
                    valueRightSlot={
                        <button
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                            onClick={() => alert('Copied!')}
                            aria-label="Copy API key"
                        >
                            <Copy size={14} color="#6B7280" />
                        </button>
                    }
                    size={KeyValuePairSize.MEDIUM}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accessibility features including semantic structure, tooltips for truncated text, and keyboard navigation support. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                ],
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        keyString: 'Label',
        value: 'Value text here',
        size: KeyValuePairSize.MEDIUM,
        keyValuePairState: KeyValuePairStateType.vertical,
        textOverflow: 'truncate',
        maxLines: 2,
        maxWidth: '220px',
        showTooltipOnTruncate: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with KeyValuePair props using the controls panel.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}
