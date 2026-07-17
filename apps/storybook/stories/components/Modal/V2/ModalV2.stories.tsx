import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { fn } from '@storybook/test'

import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

import {
    ModalV2,
    ModalV2ButtonAction,
} from '../../../../../../packages/blend/lib/components/ModalV2'

import {
    ButtonV2,
    ButtonV2Type,
    ButtonV2SubType,
} from '../../../../../../packages/blend/lib/components/ButtonV2'

const meta: Meta<typeof ModalV2> = {
    title: 'Components/ModalV2',
    component: ModalV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Token-driven modal dialog with desktop and mobile variants, supporting animations, skeleton loading states, and accessible keyboard navigation.

## Features
- **Responsive**: Switches to drawer on mobile (< 1024px)
- **Animated**: Smooth enter/exit animations with 300ms duration
- **Accessible**: Proper ARIA attributes, focus management, Escape key handling
- **Skeleton Loading**: Supports loading states for header, body, and footer
- **Customizable**: Custom header, footer slots, dividers, dimensions

## Usage

\`\`\`tsx
import { ModalV2, ButtonV2, ButtonV2Type } from '@juspay/blend-design-system';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<ModalV2
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  subtitle="Optional subtitle description"
  primaryAction={{
    text: 'Confirm',
    onClick: () => setIsOpen(false),
    buttonType: ButtonV2Type.PRIMARY,
  }}
  secondaryAction={{
    text: 'Cancel',
    onClick: () => setIsOpen(false),
    buttonType: ButtonV2Type.SECONDARY,
  }}
>
  <p>Modal content goes here</p>
</ModalV2>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'Controls whether the modal is visible',
        },
        title: {
            control: 'text',
            description: 'Modal title displayed in the header',
        },
        subtitle: {
            control: 'text',
            description: 'Optional subtitle displayed below the title',
        },
        showCloseButton: {
            control: 'boolean',
            description: 'Show or hide the close button in the header',
        },
        closeOnBackdropClick: {
            control: 'boolean',
            description: 'Close modal when clicking on the backdrop',
        },
        showDivider: {
            control: 'boolean',
            description: 'Show dividers between header, body, and footer',
        },
        isCustom: {
            control: 'boolean',
            description: 'Remove default body padding for custom layouts',
        },
        useDrawerOnMobile: {
            control: 'boolean',
            description: 'Use drawer instead of modal on mobile devices',
        },
        minWidth: {
            control: 'text',
            description: 'Minimum width of the modal',
        },
        maxWidth: {
            control: 'text',
            description: 'Maximum width of the modal',
        },
        minHeight: {
            control: 'text',
            description: 'Minimum height of the modal',
        },
        maxHeight: {
            control: 'text',
            description: 'Maximum height of the modal',
        },
        onClose: {
            description: 'Callback when modal is closed',
        },
    },
    args: {
        onClose: fn(),
    },
}

export default meta

type Story = StoryObj<typeof ModalV2>

// Demo wrapper to control modal state
const ModalDemo = (props: React.ComponentProps<typeof ModalV2>) => {
    const [isOpen, setIsOpen] = useState(props.isOpen)

    return (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <ButtonV2
                buttonType={ButtonV2Type.PRIMARY}
                text="Open Modal"
                onClick={() => setIsOpen(true)}
            />
            <ModalV2
                {...props}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                    props.onClose?.()
                }}
                primaryAction={
                    props.primaryAction
                        ? {
                              ...props.primaryAction,
                              onClick: () => {
                                  setIsOpen(false)
                              },
                          }
                        : undefined
                }
                secondaryAction={
                    props.secondaryAction
                        ? {
                              ...props.secondaryAction,
                              onClick: () => {
                                  setIsOpen(false)
                              },
                          }
                        : undefined
                }
            >
                {props.children}
            </ModalV2>
        </div>
    )
}

/**
 * Basic modal with title, subtitle, and action buttons
 */
export const Default: Story = {
    args: {
        title: 'Confirm Action',
        subtitle: 'Are you sure you want to proceed with this action?',
        children: (
            <p style={{ margin: 0, color: '#666' }}>
                This action cannot be undone. Please review your decision
                carefully before proceeding.
            </p>
        ),
        primaryAction: {
            text: 'Confirm',
            buttonType: ButtonV2Type.PRIMARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        secondaryAction: {
            text: 'Cancel',
            buttonType: ButtonV2Type.SECONDARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        showCloseButton: true,
        showDivider: true,
        closeOnBackdropClick: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Standard modal dialog with primary and secondary actions.',
            },
        },
    },
}

/**
 * Modal without subtitle
 */
export const TitleOnly: Story = {
    args: {
        title: 'Simple Modal',
        subtitle: undefined,
        children: (
            <div style={{ color: '#666' }}>
                <p>Modal content without subtitle</p>
            </div>
        ),
        primaryAction: {
            text: 'OK',
            buttonType: ButtonV2Type.PRIMARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        showCloseButton: true,
        showDivider: false,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal with only title, no subtitle.',
            },
        },
    },
}

/**
 * Modal without footer actions
 */
export const NoActions: Story = {
    args: {
        title: 'Information',
        subtitle: 'This modal has no action buttons',
        children: (
            <div style={{ color: '#666' }}>
                <p>
                    This modal only displays information and must be closed
                    using the X button or by clicking outside.
                </p>
            </div>
        ),
        primaryAction: undefined,
        secondaryAction: undefined,
        showCloseButton: true,
        showDivider: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal without footer action buttons.',
            },
        },
    },
}

/**
 * Modal with danger action styling
 */
export const DangerAction: Story = {
    args: {
        title: 'Delete Item',
        subtitle: 'This action cannot be undone',
        children: (
            <div style={{ color: '#666' }}>
                <p>
                    Are you sure you want to delete this item? All associated
                    data will be permanently removed.
                </p>
            </div>
        ),
        primaryAction: {
            text: 'Delete',
            buttonType: ButtonV2Type.DANGER,
            onClick: fn(),
        } as ModalV2ButtonAction,
        secondaryAction: {
            text: 'Cancel',
            buttonType: ButtonV2Type.SECONDARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        showCloseButton: true,
        showDivider: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal with danger action for destructive operations.',
            },
        },
    },
}

/**
 * Modal with long content (scrollable)
 */
export const LongContent: Story = {
    args: {
        title: 'Terms and Conditions',
        subtitle: 'Please read our terms and conditions carefully',
        children: (
            <div style={{ color: '#666' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <p key={i} style={{ marginBottom: '12px' }}>
                        Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris.
                    </p>
                ))}
            </div>
        ),
        primaryAction: {
            text: 'Accept',
            buttonType: ButtonV2Type.PRIMARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        secondaryAction: {
            text: 'Decline',
            buttonType: ButtonV2Type.SECONDARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        maxHeight: '70vh',
        showCloseButton: true,
        showDivider: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal with scrollable long content.',
            },
        },
    },
}

/**
 * Custom size modal
 */
export const CustomSize: Story = {
    args: {
        title: 'Custom Size Modal',
        subtitle: 'With specific min and max dimensions',
        children: (
            <div style={{ color: '#666' }}>
                <p>
                    This modal has custom minimum and maximum dimensions
                    applied.
                </p>
            </div>
        ),
        primaryAction: {
            text: 'Done',
            buttonType: ButtonV2Type.PRIMARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        minWidth: '400px',
        maxWidth: '500px',
        minHeight: '200px',
        showCloseButton: true,
        showDivider: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal with custom dimensions.',
            },
        },
    },
}

/**
 * Modal with disabled primary action
 */
export const DisabledPrimary: Story = {
    args: {
        title: 'Form Validation',
        subtitle: 'Submit button is disabled until form is valid',
        children: (
            <div style={{ color: '#666' }}>
                <p style={{ marginBottom: '12px' }}>
                    This demonstrates a modal with a disabled primary action
                    button.
                </p>
                <div
                    style={{
                        padding: '12px',
                        background: '#f3f4f6',
                        borderRadius: '6px',
                    }}
                >
                    <span>Form validation required...</span>
                </div>
            </div>
        ),
        primaryAction: {
            text: 'Submit',
            buttonType: ButtonV2Type.PRIMARY,
            disabled: true,
            onClick: fn(),
        } as ModalV2ButtonAction,
        secondaryAction: {
            text: 'Cancel',
            buttonType: ButtonV2Type.SECONDARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        showCloseButton: true,
        showDivider: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Modal with disabled primary action.',
            },
        },
    },
}

/**
 * Visual Regression: All variants stacked
 */
export const VisualRegression: Story = {
    render: () => {
        const [openModal, setOpenModal] = useState<string | null>(null)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                }}
            >
                <h3>Modal Variants</h3>

                <ButtonV2
                    buttonType={ButtonV2Type.PRIMARY}
                    text="1. Default Modal"
                    onClick={() => setOpenModal('default')}
                />
                <ButtonV2
                    buttonType={ButtonV2Type.PRIMARY}
                    text="2. Title Only"
                    onClick={() => setOpenModal('titleOnly')}
                />
                <ButtonV2
                    buttonType={ButtonV2Type.PRIMARY}
                    text="3. No Actions"
                    onClick={() => setOpenModal('noActions')}
                />
                <ButtonV2
                    buttonType={ButtonV2Type.DANGER}
                    text="4. Danger Action"
                    onClick={() => setOpenModal('danger')}
                />
                <ButtonV2
                    buttonType={ButtonV2Type.PRIMARY}
                    text="5. Long Content"
                    onClick={() => setOpenModal('long')}
                />
                <ButtonV2
                    buttonType={ButtonV2Type.SECONDARY}
                    text="6. Disabled Primary"
                    onClick={() => setOpenModal('disabled')}
                />

                {/* Default Modal */}
                <ModalV2
                    isOpen={openModal === 'default'}
                    onClose={() => setOpenModal(null)}
                    title="Confirm Action"
                    subtitle="Are you sure you want to proceed?"
                    primaryAction={{
                        text: 'Confirm',
                        buttonType: ButtonV2Type.PRIMARY,
                        onClick: () => setOpenModal(null),
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        buttonType: ButtonV2Type.SECONDARY,
                        onClick: () => setOpenModal(null),
                    }}
                >
                    <p>Default modal with all features enabled.</p>
                </ModalV2>

                {/* Title Only */}
                <ModalV2
                    isOpen={openModal === 'titleOnly'}
                    onClose={() => setOpenModal(null)}
                    title="Simple Modal"
                    primaryAction={{
                        text: 'OK',
                        buttonType: ButtonV2Type.PRIMARY,
                        onClick: () => setOpenModal(null),
                    }}
                    showDivider={false}
                >
                    <p>Modal with title only, no subtitle.</p>
                </ModalV2>

                {/* No Actions */}
                <ModalV2
                    isOpen={openModal === 'noActions'}
                    onClose={() => setOpenModal(null)}
                    title="Information"
                    subtitle="Read-only content"
                >
                    <p>Modal with no action buttons.</p>
                </ModalV2>

                {/* Danger Action */}
                <ModalV2
                    isOpen={openModal === 'danger'}
                    onClose={() => setOpenModal(null)}
                    title="Delete Item"
                    subtitle="This action cannot be undone"
                    primaryAction={{
                        text: 'Delete',
                        buttonType: ButtonV2Type.DANGER,
                        onClick: () => setOpenModal(null),
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        buttonType: ButtonV2Type.SECONDARY,
                        onClick: () => setOpenModal(null),
                    }}
                >
                    <p>Dangerous action requiring confirmation.</p>
                </ModalV2>

                {/* Long Content */}
                <ModalV2
                    isOpen={openModal === 'long'}
                    onClose={() => setOpenModal(null)}
                    title="Terms and Conditions"
                    subtitle="Scroll to read"
                    maxHeight="60vh"
                    primaryAction={{
                        text: 'Accept',
                        buttonType: ButtonV2Type.PRIMARY,
                        onClick: () => setOpenModal(null),
                    }}
                    secondaryAction={{
                        text: 'Decline',
                        buttonType: ButtonV2Type.SECONDARY,
                        onClick: () => setOpenModal(null),
                    }}
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <p key={i} style={{ marginBottom: '12px' }}>
                            Section {i + 1}: Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                    ))}
                </ModalV2>

                {/* Disabled Primary */}
                <ModalV2
                    isOpen={openModal === 'disabled'}
                    onClose={() => setOpenModal(null)}
                    title="Form Validation"
                    subtitle="Primary action disabled"
                    primaryAction={{
                        text: 'Submit',
                        buttonType: ButtonV2Type.PRIMARY,
                        disabled: true,
                        onClick: () => {},
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        buttonType: ButtonV2Type.SECONDARY,
                        onClick: () => setOpenModal(null),
                    }}
                >
                    <p>Submit button is disabled until validation passes.</p>
                </ModalV2>
            </div>
        )
    },
    parameters: {
        chromatic: {
            delay: 500,
            viewports: [375, 768, 1200],
        },
        docs: {
            description: {
                story: 'Visual regression test with all modal variants.',
            },
        },
    },
}

/**
 * Accessibility Test: Comprehensive a11y check
 */
export const AccessibilityCheck: Story = {
    args: {
        title: 'Accessibility Demo',
        subtitle: 'Testing ARIA attributes and focus management',
        children: (
            <div>
                <p style={{ marginBottom: '16px' }}>
                    This modal demonstrates proper accessibility features:
                </p>
                <ul
                    style={{
                        listStyle: 'disc',
                        paddingLeft: '20px',
                        color: '#666',
                    }}
                >
                    <li>aria-modal=&quot;true&quot; on dialog</li>
                    <li>aria-labelledby pointing to title</li>
                    <li>aria-describedby pointing to subtitle</li>
                    <li>role=&quot;dialog&quot; for semantic meaning</li>
                    <li>Escape key to close</li>
                    <li>Focus trap within modal</li>
                </ul>
            </div>
        ),
        primaryAction: {
            text: 'Accept',
            buttonType: ButtonV2Type.PRIMARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        secondaryAction: {
            text: 'Cancel',
            buttonType: ButtonV2Type.SECONDARY,
            onClick: fn(),
        } as ModalV2ButtonAction,
        showCloseButton: true,
    },
    render: (args) => <ModalDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility test with ARIA attribute verification.',
            },
        },
    },
}
