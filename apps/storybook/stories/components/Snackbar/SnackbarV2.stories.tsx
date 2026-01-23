import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
    SnackbarV2,
    addSnackbarV2,
    SnackbarV2Variant,
    SnackbarV2Position,
} from '../../../../../packages/blend/lib/components/SnackbarV2'

import { Button } from '@juspay/blend-design-system'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

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

### Features
- Multiple variants
- Optional action button
- Auto dismiss support
- Keyboard accessible
- WCAG 2.1 AA compliant
- Stackable
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
            table: { category: 'Layout' },
        },

        dismissOnClickAway: {
            control: 'boolean',
            table: { category: 'Behavior' },
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
}

export const Interactive: Story = {
    render: () => {
        const [header, setHeader] = React.useState('Snackbar Title')
        const [description, setDescription] = React.useState(
            'Snackbar description'
        )
        const [variant, setVariant] = React.useState(SnackbarV2Variant.INFO)
        const [duration, setDuration] = React.useState<number>()
        const [withAction, setWithAction] = React.useState(false)

        return (
            <div style={{ maxWidth: 420 }}>
                <label>
                    Header
                    <input
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                    />
                </label>

                <label>
                    Description
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    Variant
                    <select
                        value={variant}
                        onChange={(e) =>
                            setVariant(e.target.value as SnackbarV2Variant)
                        }
                    >
                        {Object.values(SnackbarV2Variant).map((v) => (
                            <option key={v}>{v}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Duration (ms)
                    <input
                        type="number"
                        onChange={(e) =>
                            setDuration(
                                e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                            )
                        }
                    />
                </label>

                <label>
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
                            duration,
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
        )
    },

    parameters: {
        docs: {
            description: {
                story: 'Playground for experimenting with Snackbar configuration.',
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
            <section>
                <h3>ARIA Roles</h3>

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
            </section>

            <section>
                <h3>Keyboard Navigation</h3>

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
            </section>
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
Accessibility coverage for Snackbar.

- ARIA roles
- Keyboard focus
- Screen reader announcement
- Action button focus order

Validate using Storybook a11y panel and keyboard navigation.
`,
            },
        },
    },
}
