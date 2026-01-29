import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    SnackbarV2,
    addSnackbarV2,
    StyledToast,
    SnackbarV2Variant,
    SnackbarV2Position,
} from '../../../../../packages/blend/lib/components/SnackbarV2'
import { Button } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Star } from 'lucide-react'

const meta: Meta<typeof SnackbarV2> = {
    title: 'Components/SnackbarV2',
    component: SnackbarV2,
    parameters: {
        layout: 'fullscreen',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Toast notification component for transient feedback.

## Features
- Multiple variants (info, success, warning, error)
- Optional action button with auto-dismiss control
- Custom slot icon support
- Multiple positions (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
- Keyboard accessible
- WCAG 2.1 AA compliant

## Usage

\`\`\`tsx
import { SnackbarV2, addSnackbarV2, SnackbarV2Variant } from '@juspay/blend-design-system';

<SnackbarV2 position={SnackbarV2Position.BOTTOM_RIGHT} />

addSnackbarV2({
  header: 'Saved',
  description: 'Changes have been saved successfully.',
  variant: SnackbarV2Variant.SUCCESS,
  actionButton: {
    label: 'Undo',
    onClick: () => {},
  },
})
\`\`\`
                `,
            },
        },
    },
    args: {
        position: SnackbarV2Position.BOTTOM_RIGHT,
        dismissOnClickAway: false,
    },
    argTypes: {
        position: {
            control: 'select',
            options: Object.values(SnackbarV2Position),
            description: 'Position of snackbars on screen',
        },
        dismissOnClickAway: {
            control: 'boolean',
            description: 'Dismiss all snackbars when clicking outside',
        },
    },
    decorators: [
        (Story, ctx) => (
            <>
                <SnackbarV2
                    position={ctx.args.position}
                    dismissOnClickAway={ctx.args.dismissOnClickAway}
                />
                <div style={{ padding: 24 }}>
                    <Story />
                </div>
            </>
        ),
    ],
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SnackbarV2>

export const Default: Story = {
    render: () => (
        <Button
            text="Show Snackbar"
            onClick={() =>
                addSnackbarV2({
                    header: 'Saved',
                    description: 'Changes have been saved successfully.',
                    variant: SnackbarV2Variant.SUCCESS,
                })
            }
        />
    ),
}

export const Variants: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
                maxWidth: 420,
            }}
        >
            {Object.values(SnackbarV2Variant).map((variant) => (
                <Button
                    key={variant}
                    text={variant}
                    onClick={() =>
                        addSnackbarV2({
                            header: variant,
                            description: `This is a ${variant} message`,
                            variant,
                        })
                    }
                />
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All SnackbarV2 variants with default icons.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StyledToast
                header="Info Snackbar"
                description="This is an informational message"
                variant={SnackbarV2Variant.INFO}
                onClose={() => {}}
            />
            <StyledToast
                header="Success Snackbar"
                description="Operation completed successfully"
                variant={SnackbarV2Variant.SUCCESS}
                onClose={() => {}}
            />
            <StyledToast
                header="Warning Snackbar"
                description="Please review this warning"
                variant={SnackbarV2Variant.WARNING}
                onClose={() => {}}
            />
            <StyledToast
                header="Error Snackbar"
                description="Something went wrong"
                variant={SnackbarV2Variant.ERROR}
                onClose={() => {}}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Visual examples of all variants for visual regression testing.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const WithAction: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StyledToast
                header="File deleted"
                description="The file has been permanently deleted"
                variant={SnackbarV2Variant.INFO}
                onClose={() => {}}
                actionButton={{
                    label: 'Undo',
                    onClick: () => {},
                    autoDismiss: true,
                }}
            />
            <StyledToast
                header="Changes saved"
                description="Your changes have been saved"
                variant={SnackbarV2Variant.SUCCESS}
                onClose={() => {}}
                actionButton={{
                    label: 'View',
                    onClick: () => {},
                    autoDismiss: false,
                }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Snackbars with action buttons. Use `autoDismiss` to control dismissal behavior.',
            },
        },
    },
}

export const CustomSlot: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StyledToast
                header="Custom Icon"
                description="Using a custom slot icon instead of default"
                variant={SnackbarV2Variant.INFO}
                slot={<Star size={16} color="#fbbf24" aria-hidden="true" />}
                onClose={() => {}}
            />
            <Button
                text="Show with Custom Icon"
                onClick={() =>
                    addSnackbarV2({
                        header: 'Custom Icon',
                        description: 'Using a custom slot icon',
                        variant: SnackbarV2Variant.INFO,
                        slot: (
                            <Star
                                size={16}
                                color="#fbbf24"
                                aria-hidden="true"
                            />
                        ),
                    })
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Custom slot icon support. If not provided, default variant-specific icons are used.',
            },
        },
    },
}

export const Interactive: Story = {
    render: () => {
        const [header, setHeader] = React.useState('Snackbar Title')
        const [description, setDescription] = React.useState(
            'Snackbar description'
        )
        const [variant, setVariant] = React.useState(SnackbarV2Variant.INFO)
        const [withAction, setWithAction] = React.useState(false)

        return (
            <div style={{ maxWidth: 420 }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                    }}
                >
                    <label>
                        Header
                        <input
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            style={{ width: '100%', marginTop: 4, padding: 8 }}
                        />
                    </label>
                    <label>
                        Description
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ width: '100%', marginTop: 4, padding: 8 }}
                        />
                    </label>
                    <label>
                        Variant
                        <select
                            value={variant}
                            onChange={(e) =>
                                setVariant(e.target.value as SnackbarV2Variant)
                            }
                            style={{ width: '100%', marginTop: 4, padding: 8 }}
                        >
                            {Object.values(SnackbarV2Variant).map((v) => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={withAction}
                            onChange={(e) => setWithAction(e.target.checked)}
                        />
                        With Action Button
                    </label>
                    <Button
                        text="Trigger Snackbar"
                        onClick={() =>
                            addSnackbarV2({
                                header,
                                description,
                                variant,
                                actionButton: withAction
                                    ? {
                                          label: 'Undo',
                                          onClick: () => console.log('Undo'),
                                      }
                                    : undefined,
                            })
                        }
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground for experimenting with Snackbar configuration.',
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
                maxWidth: 520,
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
                    ARIA Roles
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Info and success variants use{' '}
                    <code>role=&quot;status&quot;</code> for polite
                    announcements. Error and warning variants use{' '}
                    <code>role=&quot;alert&quot;</code> for immediate attention.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button
                        text="Info (status)"
                        onClick={() =>
                            addSnackbarV2({
                                header: 'Info',
                                description: 'role="status"',
                                variant: SnackbarV2Variant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Error (alert)"
                        onClick={() =>
                            addSnackbarV2({
                                header: 'Error',
                                description: 'role="alert"',
                                variant: SnackbarV2Variant.ERROR,
                            })
                        }
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
                    Keyboard Navigation
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    All interactive elements are keyboard accessible. Use Tab to
                    focus, Enter or Space to activate.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button
                        text="Test Close Button"
                        onClick={() =>
                            addSnackbarV2({
                                header: 'Focusable Close',
                                description: 'Tab to focus, Enter to dismiss',
                                variant: SnackbarV2Variant.INFO,
                            })
                        }
                    />
                    <Button
                        text="Test Action Button"
                        onClick={() =>
                            addSnackbarV2({
                                header: 'Action',
                                description: 'Tab to focus action button',
                                variant: SnackbarV2Variant.SUCCESS,
                                actionButton: {
                                    label: 'Retry',
                                    onClick: () => console.log('Retry'),
                                },
                            })
                        }
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
                    Screen Reader Support
                </h3>
                <p
                    style={{
                        marginBottom: 12,
                        fontSize: 14,
                        color: '#666',
                    }}
                >
                    Icons are marked with{' '}
                    <code>aria-hidden=&quot;true&quot;</code>. Text content is
                    properly associated via <code>aria-labelledby</code> and{' '}
                    <code>aria-describedby</code>.
                </p>
                <StyledToast
                    header="Accessible Snackbar"
                    description="This snackbar has proper ARIA relationships"
                    variant={SnackbarV2Variant.SUCCESS}
                    onClose={() => {}}
                    actionButton={{
                        label: 'Learn More',
                        onClick: () => {},
                    }}
                />
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

- ARIA roles (status for info/success, alert for error/warning)
- Keyboard navigation (Tab, Enter, Space)
- Screen reader support (aria-labelledby, aria-describedby)
- Decorative icons hidden from assistive technologies

Use with Storybook a11y panel and screen readers (VoiceOver, NVDA) to validate behavior.
                `,
            },
        },
    },
}
