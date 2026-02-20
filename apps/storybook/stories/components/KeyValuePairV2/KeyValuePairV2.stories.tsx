import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from '../../../../../packages/blend/lib/components/KeyValuePairV2/KeyValuePairV2.types.js'
import { KeyValuePairV2 } from '../../../../../packages/blend/lib/components/KeyValuePairV2/index.js'
import {
    Info,
    Star,
    CheckCircle,
    AlertCircle,
    Bell,
    ArrowRight,
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    DollarSign,
    TrendingUp,
    TrendingDown,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config.js'

const meta: Meta<typeof KeyValuePairV2> = {
    title: 'Components/KeyValuePairV2',
    component: KeyValuePairV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
KeyValuePairV2 — updated key/value component with improved tokenization and responsive behavior.

Features:
- Vertical and horizontal layouts
- Three sizes (Small, Medium, Large)
- Slots support (keySlot, valueLeftSlot, valueRightSlot)
- Text overflow modes with accessible tooltips
`,
            },
        },
    },
    argTypes: {
        keyString: { control: 'text', description: 'The key/label text' },
        value: { control: 'text', description: 'The value text' },
        size: {
            control: 'select',
            options: Object.values(KeyValuePairV2Size),
            description: 'Size of the value text',
        },
        keyValuePairState: {
            control: 'select',
            options: Object.values(KeyValuePairV2StateType),
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
type Story = StoryObj<typeof KeyValuePairV2>

export const Default: Story = {
    args: {
        keyString: 'Name',
        value: 'John Doe',
        size: KeyValuePairV2Size.MEDIUM,
        keyValuePairState: KeyValuePairV2StateType.vertical,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const VerticalLayout: Story = {
    args: {
        keyString: 'Email',
        value: 'john.doe@example.com',
        keyValuePairState: KeyValuePairV2StateType.vertical,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const HorizontalLayout: Story = {
    args: {
        keyString: 'Status',
        value: 'Active',
        keyValuePairState: KeyValuePairV2StateType.horizontal,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '300px',
            }}
        >
            <KeyValuePairV2
                keyString="Small Size"
                value="This is small text"
                size={KeyValuePairV2Size.SMALL}
            />
            <KeyValuePairV2
                keyString="Medium Size"
                value="This is medium text"
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Large Size"
                value="This is large text"
                size={KeyValuePairV2Size.LARGE}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

export const TextTruncation: Story = {
    args: {
        keyString: 'Long Description',
        value: 'This is a very long value that will be truncated with an ellipsis and show a tooltip on hover',
        textOverflow: 'truncate',
        maxWidth: '200px',
        showTooltipOnTruncate: true,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const TextWrapping: Story = {
    args: {
        keyString: 'Description',
        value: 'This is a long value that will wrap naturally across multiple lines without truncation',
        textOverflow: 'wrap',
        maxWidth: '200px',
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const TextWrapClamp: Story = {
    args: {
        keyString: 'Multi-line Description',
        value: 'This is a very long value that will wrap up to a maximum number of lines and then show an ellipsis. The text can span multiple lines but will be clamped at the specified limit.',
        textOverflow: 'wrap-clamp',
        maxLines: 3,
        maxWidth: '250px',
        showTooltipOnTruncate: true,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const WithSlots: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '300px',
            }}
        >
            <KeyValuePairV2
                keyString="Rating"
                value="4.8"
                keySlot={<Info size={16} />}
                valueLeftSlot={<Star size={16} color="#fbbf24" />}
            />
            <KeyValuePairV2
                keyString="Status"
                value="Active"
                valueLeftSlot={<CheckCircle size={16} color="#10b981" />}
                valueRightSlot={<ArrowRight size={16} />}
            />
            <KeyValuePairV2
                keyString="Notifications"
                value="Enabled"
                keySlot={<Bell size={16} />}
                valueRightSlot={<ArrowRight size={16} />}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

export const UserProfile: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
            }}
        >
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >
                Profile Information
            </h3>
            <KeyValuePairV2
                keyString="Full Name"
                value="John Doe"
                keySlot={<User size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Email"
                value="john.doe@example.com"
                keySlot={<Mail size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Phone"
                value="+1 (555) 123-4567"
                keySlot={<Phone size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Location"
                value="San Francisco, CA"
                keySlot={<MapPin size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

export const FinancialData: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
            }}
        >
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >
                Financial Summary
            </h3>
            <KeyValuePairV2
                keyString="Balance"
                value="$12,345.67"
                keySlot={<DollarSign size={16} />}
                size={KeyValuePairV2Size.LARGE}
            />
            <KeyValuePairV2
                keyString="Monthly Income"
                value="$5,000.00"
                keySlot={<TrendingUp size={16} color="#10b981" />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Monthly Expenses"
                value="$3,200.00"
                keySlot={<TrendingDown size={16} color="#ef4444" />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Payment Method"
                value="**** **** **** 1234"
                keySlot={<CreditCard size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

export const StatusIndicators: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '300px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
            }}
        >
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >
                System Status
            </h3>
            <KeyValuePairV2
                keyString="Server Status"
                value="Online"
                valueLeftSlot={<CheckCircle size={16} color="#10b981" />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Database"
                value="Connected"
                valueLeftSlot={<CheckCircle size={16} color="#10b981" />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="API Status"
                value="Warning"
                valueLeftSlot={<AlertCircle size={16} color="#f59e0b" />}
                size={KeyValuePairV2Size.MEDIUM}
            />
            <KeyValuePairV2
                keyString="Security"
                value="Locked"
                valueLeftSlot={<Info size={16} />}
                size={KeyValuePairV2Size.MEDIUM}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

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
                    Semantic Roles
                </h3>
                <div style={{ width: '300px' }}>
                    <KeyValuePairV2
                        keyString="Term"
                        value="Definition"
                        size={KeyValuePairV2Size.MEDIUM}
                    />
                    <p
                        style={{
                            marginTop: '12px',
                            fontSize: '14px',
                            color: '#64748b',
                        }}
                    >
                        Key has role="term", value has role="definition". Check
                        Accessibility panel to verify semantic structure.
                    </p>
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
                    ARIA Relationships
                </h3>
                <div style={{ width: '300px' }}>
                    <KeyValuePairV2
                        keyString="Label"
                        value="Value with aria-labelledby"
                        size={KeyValuePairV2Size.MEDIUM}
                    />
                    <p
                        style={{
                            marginTop: '12px',
                            fontSize: '14px',
                            color: '#64748b',
                        }}
                    >
                        Value has aria-labelledby linking to key, establishing
                        programmatic relationship.
                    </p>
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
                    Text Overflow with Tooltip
                </h3>
                <div style={{ width: '200px' }}>
                    <KeyValuePairV2
                        keyString="Long Text"
                        value="This is a very long value that will be truncated and show a tooltip"
                        textOverflow="truncate"
                        maxWidth="200px"
                        showTooltipOnTruncate={true}
                        size={KeyValuePairV2Size.MEDIUM}
                    />
                    <p
                        style={{
                            marginTop: '12px',
                            fontSize: '14px',
                            color: '#64748b',
                        }}
                    >
                        Truncated text shows accessible tooltip on hover.
                    </p>
                </div>
            </section>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('content'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
