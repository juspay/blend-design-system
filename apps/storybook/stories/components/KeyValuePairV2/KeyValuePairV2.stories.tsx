import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from '../../../../../packages/blend/lib/components/KeyValuePairV2/keyValuePairV2.types'
import { KeyValuePairV2 } from '../../../../../packages/blend/lib/components/KeyValuePairV2'
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
- Slots support (slots.key, slots.value.left, slots.value.right)
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
        size: KeyValuePairV2Size.MD,
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
                size={KeyValuePairV2Size.SM}
            />
            <KeyValuePairV2
                keyString="Medium Size"
                value="This is medium text"
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Large Size"
                value="This is large text"
                size={KeyValuePairV2Size.LG}
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
                slots={{
                    key: <Info size={16} />,
                    value: { left: <Star size={16} color="#fbbf24" /> },
                }}
            />
            <KeyValuePairV2
                keyString="Status"
                value="Active"
                slots={{
                    value: {
                        left: <CheckCircle size={16} color="#10b981" />,
                        right: <ArrowRight size={16} />,
                    },
                }}
            />
            <KeyValuePairV2
                keyString="Notifications"
                value="Enabled"
                slots={{
                    key: <Bell size={16} />,
                    value: { right: <ArrowRight size={16} /> },
                }}
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
                slots={{ key: <User size={16} /> }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Email"
                value="john.doe@example.com"
                slots={{ key: <Mail size={16} /> }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Phone"
                value="+1 (555) 123-4567"
                slots={{ key: <Phone size={16} /> }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Location"
                value="San Francisco, CA"
                slots={{ key: <MapPin size={16} /> }}
                size={KeyValuePairV2Size.MD}
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
                slots={{ key: <DollarSign size={16} /> }}
                size={KeyValuePairV2Size.LG}
            />
            <KeyValuePairV2
                keyString="Monthly Income"
                value="$5,000.00"
                slots={{ key: <TrendingUp size={16} color="#10b981" /> }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Monthly Expenses"
                value="$3,200.00"
                slots={{ key: <TrendingDown size={16} color="#ef4444" /> }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Payment Method"
                value="**** **** **** 1234"
                slots={{ key: <CreditCard size={16} /> }}
                size={KeyValuePairV2Size.MD}
            />
        </div>
    ),
    parameters: { a11y: getA11yConfig('content') },
}

// ============================================================================
// Visual (Chromatic regression)
// ============================================================================

export const Visual: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                maxWidth: '360px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    Layouts
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <KeyValuePairV2
                        keyString="Vertical"
                        value="Label above value"
                        keyValuePairState={KeyValuePairV2StateType.vertical}
                        size={KeyValuePairV2Size.MD}
                    />
                    <KeyValuePairV2
                        keyString="Horizontal"
                        value="Label beside value"
                        keyValuePairState={KeyValuePairV2StateType.horizontal}
                        size={KeyValuePairV2Size.MD}
                    />
                </div>
            </div>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    Sizes
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <KeyValuePairV2
                        keyString="Small"
                        value="SM size"
                        size={KeyValuePairV2Size.SM}
                    />
                    <KeyValuePairV2
                        keyString="Medium"
                        value="MD size"
                        size={KeyValuePairV2Size.MD}
                    />
                    <KeyValuePairV2
                        keyString="Large"
                        value="LG size"
                        size={KeyValuePairV2Size.LG}
                    />
                </div>
            </div>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    Text overflow
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <KeyValuePairV2
                        keyString="Truncate"
                        value="Short"
                        textOverflow="truncate"
                        maxWidth="180px"
                        showTooltipOnTruncate={true}
                    />
                    <KeyValuePairV2
                        keyString="Wrap"
                        value="This value wraps naturally across multiple lines when space is limited."
                        textOverflow="wrap"
                        maxWidth="180px"
                    />
                    <KeyValuePairV2
                        keyString="Wrap clamp"
                        value="This value wraps up to a max number of lines then shows ellipsis. Extra content is hidden."
                        textOverflow="wrap-clamp"
                        maxLines={2}
                        maxWidth="180px"
                        showTooltipOnTruncate={true}
                    />
                </div>
            </div>
            <div>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    With slots
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    <KeyValuePairV2
                        keyString="Key slot"
                        value="Icon on key"
                        slots={{ key: <Info size={16} /> }}
                        size={KeyValuePairV2Size.MD}
                    />
                    <KeyValuePairV2
                        keyString="Value slots"
                        value="Active"
                        slots={{
                            value: {
                                left: <CheckCircle size={16} color="#10b981" />,
                                right: <ArrowRight size={16} />,
                            },
                        }}
                        size={KeyValuePairV2Size.MD}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual variants for Chromatic regression: layouts, sizes, text overflow modes, and slots.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 300 },
    },
}

// ============================================================================
// Interaction (tooltip on truncated value)
// ============================================================================

export const Interaction: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '24px',
                maxWidth: '400px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                >
                    Truncated value with tooltip
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#64748b',
                    }}
                >
                    Hover or focus the truncated value to see the full text in a
                    tooltip.
                </p>
                <KeyValuePairV2
                    keyString="Description"
                    value="This is a long value that will be truncated with an ellipsis. Hover over it to see the full content in a tooltip."
                    textOverflow="truncate"
                    maxWidth="200px"
                    showTooltipOnTruncate={true}
                    size={KeyValuePairV2Size.MD}
                />
            </div>
            <div>
                <h3
                    style={{
                        marginBottom: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                >
                    Wrap-clamp with tooltip
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#64748b',
                    }}
                >
                    Multi-line clamp: hover the value to see the full text.
                </p>
                <KeyValuePairV2
                    keyString="Summary"
                    value="First line of content. Second line here. Third line that gets clamped. Fourth line is only visible in the tooltip when you hover."
                    textOverflow="wrap-clamp"
                    maxLines={2}
                    maxWidth="220px"
                    showTooltipOnTruncate={true}
                    size={KeyValuePairV2Size.MD}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Interaction: hover or focus truncated values to reveal full content in an accessible tooltip. Use keyboard (Tab + focus) to open the tooltip without a mouse.',
            },
        },
        a11y: getA11yConfig('content'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
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
                slots={{
                    value: {
                        left: <CheckCircle size={16} color="#10b981" />,
                    },
                }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Database"
                value="Connected"
                slots={{
                    value: {
                        left: <CheckCircle size={16} color="#10b981" />,
                    },
                }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="API Status"
                value="Warning"
                slots={{
                    value: {
                        left: <AlertCircle size={16} color="#f59e0b" />,
                    },
                }}
                size={KeyValuePairV2Size.MD}
            />
            <KeyValuePairV2
                keyString="Security"
                value="Locked"
                slots={{
                    value: { left: <Info size={16} /> },
                }}
                size={KeyValuePairV2Size.MD}
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
                        size={KeyValuePairV2Size.MD}
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
                        size={KeyValuePairV2Size.MD}
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
                        size={KeyValuePairV2Size.MD}
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
