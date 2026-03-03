import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from '../../../../../packages/blend/lib/components/KeyValuePairV2/keyValuePairV2.types'
import { KeyValuePairV2 } from '../../../../../packages/blend/lib/components/KeyValuePairV2'
import { Info, Star, CheckCircle, Bell, ArrowRight } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config.js'

const stack = (gap: number) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    gap: `${gap}px`,
})
const sectionTitle = {
    marginBottom: '12px',
    fontSize: '14px',
    fontWeight: 600 as const,
}
const caption = { marginBottom: '16px', fontSize: '14px', color: '#64748b' }

const meta: Meta<typeof KeyValuePairV2> = {
    title: 'Components/KeyValuePairV2',
    component: KeyValuePairV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `KeyValuePairV2 — key/value component with tokenization and responsive behavior.
- Vertical and horizontal layouts | Sizes: sm, md, lg
- Slots: slots.key, slots.value.left, slots.value.right
- Text overflow: truncate, wrap, wrap-clamp with optional tooltip`,
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
        maxWidth: '220px',
        textOverflow: 'truncate',
        maxLines: 2,
        showTooltipOnTruncate: true,
    },
    parameters: { a11y: getA11yConfig('content') },
}

export const WithSlots: Story = {
    render: () => (
        <div style={{ ...stack(24), width: '300px' }}>
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

export const Visual: Story = {
    render: () => (
        <div style={{ ...stack(32), maxWidth: '360px' }}>
            <div>
                <h3 style={sectionTitle}>Layouts</h3>
                <div style={stack(12)}>
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
                <h3 style={sectionTitle}>Sizes</h3>
                <div style={stack(12)}>
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
                <h3 style={sectionTitle}>Text overflow</h3>
                <div style={stack(12)}>
                    <KeyValuePairV2
                        keyString="Truncate"
                        value="Short"
                        textOverflow="truncate"
                        maxWidth="180px"
                        showTooltipOnTruncate
                    />
                    <KeyValuePairV2
                        keyString="Wrap"
                        value="This value wraps naturally across multiple lines when space is limited."
                        textOverflow="wrap"
                        maxWidth="180px"
                    />
                    <KeyValuePairV2
                        keyString="Wrap clamp"
                        value="This value wraps up to a max number of lines then shows ellipsis."
                        textOverflow="wrap-clamp"
                        maxLines={2}
                        maxWidth="180px"
                        showTooltipOnTruncate
                    />
                </div>
            </div>
            <div>
                <h3 style={sectionTitle}>With slots</h3>
                <div style={stack(12)}>
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
            description: { story: 'Visual variants for Chromatic regression.' },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 300 },
    },
}

export const Interaction: Story = {
    render: () => (
        <div style={{ ...stack(24), padding: '24px', maxWidth: '400px' }}>
            <div>
                <h3 style={{ ...sectionTitle, fontSize: '16px' }}>
                    Truncated value with tooltip
                </h3>
                <p style={caption}>
                    Hover or focus the truncated value to see the full text in a
                    tooltip.
                </p>
                <KeyValuePairV2
                    keyString="Description"
                    value="This is a long value that will be truncated with an ellipsis. Hover over it to see the full content in a tooltip."
                    textOverflow="truncate"
                    maxWidth="200px"
                    showTooltipOnTruncate
                    size={KeyValuePairV2Size.MD}
                />
            </div>
            <div>
                <h3 style={{ ...sectionTitle, fontSize: '16px' }}>
                    Wrap-clamp with tooltip
                </h3>
                <p style={caption}>
                    Multi-line clamp: hover the value to see the full text.
                </p>
                <KeyValuePairV2
                    keyString="Summary"
                    value="First line of content. Second line here. Third line that gets clamped. Fourth line is only visible in the tooltip when you hover."
                    textOverflow="wrap-clamp"
                    maxLines={2}
                    maxWidth="220px"
                    showTooltipOnTruncate
                    size={KeyValuePairV2Size.MD}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Hover or focus truncated values to see full content in a tooltip. Use Tab + focus for keyboard.',
            },
        },
        a11y: getA11yConfig('content'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
