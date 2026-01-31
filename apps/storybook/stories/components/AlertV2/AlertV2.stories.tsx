import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

import {
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from '../../../../../packages/blend/lib/components/AlertV2'

import {
    Info,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Bell,
    User,
} from 'lucide-react'

const meta: Meta<typeof AlertV2> = {
    title: 'Components/AlertV2',
    component: AlertV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A modern, accessible alert component (V2) for communicating status, warnings, errors, and contextual information.

## Features
- Multiple types (primary, success, warning, error, purple, orange, neutral)
- Two visual styles (subtle, noFill)
- Optional icon slot
- Primary and secondary action links
- Optional close button
- Accessible by default (role="alert", aria-live="assertive", aria-atomic="true")

## Usage
\`\`\`tsx
import {
  AlertV2,
  AlertV2Type,
  AlertV2SubType,
  AlertV2ActionPosition,
} from '@juspay/blend-design-system';

<AlertV2
  type={AlertV2Type.SUCCESS}
  subType={AlertV2SubType.SUBTLE}
  heading="Payment successful"
  description="Your payment has been processed."
  actions={{
    primaryAction: { text: 'View receipt', onClick: () => {} },
  }}
  closeButton={{ show: true, onClick: () => {} }}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        type: {
            control: 'select',
            options: Object.values(AlertV2Type),
            description: 'Visual type / color of the alert',
        },
        subType: {
            control: 'select',
            options: Object.values(AlertV2SubType),
            description: 'Visual style of the alert background',
        },
        heading: {
            control: 'text',
            description: 'Main title of the alert',
        },
        description: {
            control: 'text',
            description: 'Supporting description text',
        },
        slot: {
            control: false,
            description: 'Optional icon / custom slot rendered at the start',
        },
        actions: {
            control: false,
            description:
                'Optional actions object with primary/secondary action definitions',
        },
        closeButton: {
            control: false,
            description: 'Controls whether a close button is shown',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AlertV2>

export const Default: Story = {
    args: {
        type: AlertV2Type.PRIMARY,
        subType: AlertV2SubType.SUBTLE,
        heading: 'Default alert',
        description: 'This is a default AlertV2.',
        slot: <Info size={16} aria-hidden="true" />,
        closeButton: {
            show: true,
            onClick: () => {},
        },
    },
}

export const Types: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Subtle style
                </h3>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                    <AlertV2
                        type={AlertV2Type.PRIMARY}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Primary"
                        description="Subtle primary message."
                        slot={<Info size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.SUCCESS}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Success"
                        description="Subtle success message."
                        slot={<CheckCircle2 size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.WARNING}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Warning"
                        description="Subtle warning message."
                        slot={<AlertTriangle size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.ERROR}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Error"
                        description="Subtle error message."
                        slot={<XCircle size={16} aria-hidden="true" />}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    No fill style
                </h3>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                    <AlertV2
                        type={AlertV2Type.PRIMARY}
                        subType={AlertV2SubType.NO_FILL}
                        heading="Primary (no fill)"
                        description="Border-only primary message."
                        slot={<Info size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.SUCCESS}
                        subType={AlertV2SubType.NO_FILL}
                        heading="Success (no fill)"
                        description="Border-only success message."
                        slot={<CheckCircle2 size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.WARNING}
                        subType={AlertV2SubType.NO_FILL}
                        heading="Warning (no fill)"
                        description="Border-only warning message."
                        slot={<AlertTriangle size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.ERROR}
                        subType={AlertV2SubType.NO_FILL}
                        heading="Error (no fill)"
                        description="Border-only error message."
                        slot={<XCircle size={16} aria-hidden="true" />}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All AlertV2 types shown in both subtle and noFill styles.',
            },
        },
    },
}

export const WithActions: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AlertV2
                type={AlertV2Type.SUCCESS}
                subType={AlertV2SubType.SUBTLE}
                heading="Payment successful"
                description="Your payment has been processed successfully."
                slot={<CheckCircle2 size={16} aria-hidden="true" />}
                actions={{
                    primaryAction: {
                        text: 'View receipt',
                        onClick: () => {},
                    },
                    secondaryAction: {
                        text: 'Dismiss',
                        onClick: () => {},
                    },
                }}
                closeButton={{
                    show: true,
                    onClick: () => {},
                }}
            />

            <AlertV2
                type={AlertV2Type.WARNING}
                subType={AlertV2SubType.SUBTLE}
                heading="Unsaved changes"
                description="You have unsaved changes. Are you sure you want to leave?"
                slot={<AlertTriangle size={16} aria-hidden="true" />}
                actions={{
                    primaryAction: {
                        text: 'Save changes',
                        onClick: () => {},
                    },
                    secondaryAction: {
                        text: 'Discard',
                        onClick: () => {},
                    },
                }}
                closeButton={{
                    show: true,
                    onClick: () => {},
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'AlertV2 with primary and secondary actions plus a close button.',
            },
        },
    },
}

export const ActionPositions: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AlertV2
                type={AlertV2Type.PRIMARY}
                subType={AlertV2SubType.SUBTLE}
                heading="Bottom actions"
                description="Actions are stacked below the content."
                actions={{
                    position: AlertV2ActionPosition.BOTTOM,
                    primaryAction: {
                        text: 'Learn more',
                        onClick: () => {},
                    },
                    secondaryAction: {
                        text: 'Dismiss',
                        onClick: () => {},
                    },
                }}
                closeButton={{
                    show: true,
                    onClick: () => {},
                }}
            />

            <AlertV2
                type={AlertV2Type.PRIMARY}
                subType={AlertV2SubType.SUBTLE}
                heading="Right actions"
                description="Actions are aligned to the right with a separator."
                actions={{
                    position: AlertV2ActionPosition.RIGHT,
                    primaryAction: {
                        text: 'Retry',
                        onClick: () => {},
                    },
                    secondaryAction: {
                        text: 'Cancel',
                        onClick: () => {},
                    },
                }}
                closeButton={{
                    show: true,
                    onClick: () => {},
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates bottom and right action placements including the vertical separator.',
            },
        },
    },
}

export const WithIconOnly: Story = {
    args: {
        type: AlertV2Type.NEUTRAL,
        subType: AlertV2SubType.SUBTLE,
        heading: 'Profile updated',
        description: 'Your profile information has been saved.',
        slot: <User size={16} aria-hidden="true" />,
        closeButton: {
            show: true,
            onClick: () => {},
        },
    },
}

export const DismissibleOnly: Story = {
    args: {
        type: AlertV2Type.NEUTRAL,
        subType: AlertV2SubType.SUBTLE,
        heading: 'Heads up',
        description: 'This alert can only be dismissed, no actions.',
        slot: <Bell size={16} aria-hidden="true" />,
        closeButton: {
            show: true,
            onClick: () => {},
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
                maxWidth: 800,
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
                    Basic accessible alerts
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    These alerts use <code>role=&quot;alert&quot;</code>,{' '}
                    <code>aria-live=&quot;assertive&quot;</code>, and{' '}
                    <code>aria-atomic=&quot;true&quot;</code> to announce
                    important messages to assistive technologies.
                </p>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                    <AlertV2
                        type={AlertV2Type.PRIMARY}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Information"
                        description="This is an informational message."
                        slot={<Info size={16} aria-hidden="true" />}
                    />
                    <AlertV2
                        type={AlertV2Type.SUCCESS}
                        subType={AlertV2SubType.SUBTLE}
                        heading="Success"
                        description="Your changes have been saved."
                        slot={<CheckCircle2 size={16} aria-hidden="true" />}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Keyboard and screen reader friendly actions
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Action buttons have clear text labels and{' '}
                    <code>aria-label</code> descriptions. Use Tab to focus,
                    Enter or Space to activate.
                </p>
                <AlertV2
                    type={AlertV2Type.WARNING}
                    subType={AlertV2SubType.SUBTLE}
                    heading="Unsaved changes"
                    description="You have unsaved changes. Choose an action below."
                    slot={<AlertTriangle size={16} aria-hidden="true" />}
                    actions={{
                        position: AlertV2ActionPosition.BOTTOM,
                        primaryAction: {
                            text: 'Save changes',
                            onClick: () => {},
                        },
                        secondaryAction: {
                            text: 'Discard',
                            onClick: () => {},
                        },
                    }}
                    closeButton={{
                        show: true,
                        onClick: () => {},
                    }}
                />
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    Decorative icons
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Icons used in the slot are marked with{' '}
                    <code>aria-hidden=&quot;true&quot;</code> so the text
                    content remains the accessible name.
                </p>
                <AlertV2
                    type={AlertV2Type.ERROR}
                    subType={AlertV2SubType.SUBTLE}
                    heading="Error"
                    description="Something went wrong while saving your changes."
                    slot={<XCircle size={16} aria-hidden="true" />}
                    closeButton={{
                        show: true,
                        onClick: () => {},
                    }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples for AlertV2, demonstrating:

- \`role="alert"\`, \`aria-live="assertive"\`, \`aria-atomic="true"\` for important messages
- Proper relationships via \`aria-labelledby\` and \`aria-describedby\`
- Keyboard-accessible action buttons (Tab, Enter, Space)
- Decorative icons hidden from screen readers with \`aria-hidden="true"\`

Use this story together with the a11y panel and screen readers (e.g. VoiceOver, NVDA) to validate behavior.
                `,
            },
        },
        a11y: getA11yConfig('content'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
