import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
    ProgressBarType,
} from '@juspay/blend-design-system'

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible progress bar component for indicating completion of tasks or processes.

## Features
- Linear and circular variants
- Solid and segmented styles
- Three sizes (Small, Medium, Large)
- Optional percentage labels
- Smooth animations
- Token-based styling system
- Accessibility features built-in

## Usage

\`\`\`tsx
import { ProgressBar, ProgressBarVariant, ProgressBarSize } from '@juspay/blend-design-system';

<ProgressBar
  value={65}
  variant={ProgressBarVariant.SOLID}
  size={ProgressBarSize.MEDIUM}
  showLabel={true}
/>
\`\`\`

## Accessibility
- Progress value communicated via aria-valuenow
- Min/max values set via aria-valuemin and aria-valuemax
- Label provides screen reader context
- Role="progressbar" for semantic meaning
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description:
                'Current progress value as a percentage (0-100). Values are automatically clamped to this range.',
            table: {
                type: { summary: 'number' },
                category: 'Content',
            },
        },
        variant: {
            control: 'select',
            options: Object.values(ProgressBarVariant),
            description:
                'Visual variant: SOLID for continuous bar, SEGMENTED for divided segments, CIRCULAR for radial progress.',
            table: {
                type: { summary: 'ProgressBarVariant' },
                defaultValue: { summary: 'SOLID' },
                category: 'Appearance',
            },
        },
        type: {
            control: 'select',
            options: Object.values(ProgressBarType),
            description:
                'Type of progress indicator for circular variant. SOLID for continuous arc, SEGMENTED for divided arc.',
            table: {
                type: { summary: 'ProgressBarType' },
                defaultValue: { summary: 'SOLID' },
                category: 'Appearance',
            },
        },
        size: {
            control: 'select',
            options: Object.values(ProgressBarSize),
            description:
                'Size of the progress bar affecting height (linear) or diameter (circular).',
            table: {
                type: { summary: 'ProgressBarSize' },
                defaultValue: { summary: 'MEDIUM' },
                category: 'Appearance',
            },
        },
        showLabel: {
            control: 'boolean',
            description:
                'Show percentage label. Displays inside circular variant, to the right of linear variants.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Content',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

// Default story
export const Default: Story = {
    args: {
        value: 65,
        variant: ProgressBarVariant.SOLID,
        size: ProgressBarSize.MEDIUM,
        showLabel: false,
        type: ProgressBarType.SOLID,
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Linear variants
export const LinearVariants: Story = {
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
                    Solid (Continuous)
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Continuous progress bar with smooth fill
                </p>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
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
                    Segmented (Divided)
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Progress bar with visible segments
                </p>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Linear progress bars showing solid and segmented variants. Both support smooth animations and optional labels.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Circular variant
export const CircularVariant: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <ProgressBar
                    value={25}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SOLID}
                    showLabel={true}
                    size={ProgressBarSize.MEDIUM}
                />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Solid - 25%
                </p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <ProgressBar
                    value={50}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SOLID}
                    showLabel={true}
                    size={ProgressBarSize.MEDIUM}
                />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Solid - 50%
                </p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SOLID}
                    showLabel={true}
                    size={ProgressBarSize.MEDIUM}
                />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Solid - 75%
                </p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SEGMENTED}
                    showLabel={true}
                    size={ProgressBarSize.MEDIUM}
                />
                <p
                    style={{
                        marginTop: '8px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Segmented - 75%
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Circular progress indicators with both solid and segmented styles. Perfect for compact spaces or dashboard widgets.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Different sizes
export const Sizes: Story = {
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
                    Linear Sizes
                </h4>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                marginBottom: '8px',
                            }}
                        >
                            Small
                        </p>
                        <ProgressBar
                            value={65}
                            size={ProgressBarSize.SMALL}
                            variant={ProgressBarVariant.SOLID}
                            showLabel={true}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                marginBottom: '8px',
                            }}
                        >
                            Medium
                        </p>
                        <ProgressBar
                            value={65}
                            size={ProgressBarSize.MEDIUM}
                            variant={ProgressBarVariant.SOLID}
                            showLabel={true}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                marginBottom: '8px',
                            }}
                        >
                            Large
                        </p>
                        <ProgressBar
                            value={65}
                            size={ProgressBarSize.LARGE}
                            variant={ProgressBarVariant.SOLID}
                            showLabel={true}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Circular Sizes
                </h4>
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={65}
                            variant={ProgressBarVariant.CIRCULAR}
                            size={ProgressBarSize.SMALL}
                            showLabel={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Small
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={65}
                            variant={ProgressBarVariant.CIRCULAR}
                            size={ProgressBarSize.MEDIUM}
                            showLabel={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Medium
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={65}
                            variant={ProgressBarVariant.CIRCULAR}
                            size={ProgressBarSize.LARGE}
                            showLabel={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Large
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three size variants (Small, Medium, Large) available for both linear and circular progress bars.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With and without labels
export const Labels: Story = {
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
                    Without Label
                </h4>
                <ProgressBar value={65} showLabel={false} />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    With Label
                </h4>
                <ProgressBar value={65} showLabel={true} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bars can optionally display the current percentage value. For linear variants, the label appears to the right. For circular variants, it appears in the center.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Different progress values
export const ProgressValues: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ProgressBar value={0} showLabel={true} />
            <ProgressBar value={25} showLabel={true} />
            <ProgressBar value={50} showLabel={true} />
            <ProgressBar value={75} showLabel={true} />
            <ProgressBar value={100} showLabel={true} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bars smoothly animate between values from 0% to 100%. Values are automatically clamped to this range.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Use cases
export const UseCases: Story = {
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
                    File Upload
                </h4>
                <div style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                        document.pdf
                    </p>
                    <ProgressBar value={45} showLabel={true} />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Profile Completion
                </h4>
                <div style={{ textAlign: 'center' }}>
                    <ProgressBar
                        value={70}
                        variant={ProgressBarVariant.CIRCULAR}
                        showLabel={true}
                        size={ProgressBarSize.LARGE}
                    />
                    <p
                        style={{
                            marginTop: '12px',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        Complete your profile
                    </p>
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Multi-Step Process
                </h4>
                <div style={{ marginBottom: '8px' }}>
                    <p
                        style={{
                            fontSize: '14px',
                            marginBottom: '8px',
                            color: '#666',
                        }}
                    >
                        Step 3 of 4
                    </p>
                    <ProgressBar
                        value={75}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={false}
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Storage Usage
                </h4>
                <div style={{ marginBottom: '8px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '14px',
                            marginBottom: '8px',
                        }}
                    >
                        <span>4.5 GB used</span>
                        <span style={{ color: '#666' }}>10 GB total</span>
                    </div>
                    <ProgressBar value={45} showLabel={false} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common use cases demonstrating progress bars for file uploads, profile completion, multi-step processes, and storage usage.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Interactive playground
export const Interactive: Story = {
    args: {
        value: 65,
        variant: ProgressBarVariant.SOLID,
        type: ProgressBarType.SOLID,
        size: ProgressBarSize.MEDIUM,
        showLabel: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all ProgressBar props using the controls panel. Try changing the value, variant, size, and other properties.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility demonstration
export const Accessibility: Story = {
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
                    Screen Reader Support
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Progress bars include proper ARIA attributes for screen
                    readers. The role, min, max, and current values are
                    automatically communicated.
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div>
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                            Download progress: 35%
                        </p>
                        <ProgressBar value={35} showLabel={true} />
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                            Processing: 80%
                        </p>
                        <ProgressBar value={80} showLabel={true} />
                    </div>
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Color Contrast
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Progress indicators meet WCAG 2.1 Level AA color contrast
                    requirements for both filled and unfilled states.
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ProgressBar
                        value={45}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                    />
                    <ProgressBar
                        value={45}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={true}
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Visible Labels
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Optional visible percentage labels provide clear progress
                    information for all users, not just screen reader users.
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'center',
                    }}
                >
                    <ProgressBar
                        value={65}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                    />
                    <ProgressBar
                        value={65}
                        variant={ProgressBarVariant.CIRCULAR}
                        showLabel={true}
                        size={ProgressBarSize.MEDIUM}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility demonstration showing screen reader support, color contrast compliance, and visible labels. All features comply with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                ],
            },
        },
    },
}
