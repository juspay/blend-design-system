import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    ButtonGroup,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import { Plus, Download, Settings, Save, X, Edit, Trash2 } from 'lucide-react'

const meta: Meta<typeof ButtonGroup> = {
    title: 'Components/Button/ButtonGroup (v1)',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A container component for grouping multiple buttons with consistent spacing and styling.

## Features
- Stacked and non-stacked layouts
- Consistent spacing between buttons
- Support for all button variants

## Usage

\`\`\`tsx
import { ButtonGroup, Button, ButtonType } from '@juspay/blend-design-system';

<ButtonGroup stacked={true}>
  <Button text="Save" buttonType={ButtonType.PRIMARY} />
  <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
</ButtonGroup>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        stacked: {
            control: 'boolean',
            description: 'Whether buttons are stacked together or have spacing',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

// Default story
export const Default: Story = {
    args: {
        stacked: true,
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button text="Save" buttonType={ButtonType.PRIMARY} />
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
    ),
}

// Stacked vs Non-stacked
export const StackedVsNonStacked: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Stacked (Connected)
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button
                        text="Save & Continue"
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Non-Stacked (Spaced)
                </h4>
                <ButtonGroup stacked={false}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button
                        text="Save & Continue"
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comparison between stacked (connected) and non-stacked (spaced) button groups.',
            },
        },
    },
}

// Different button types
export const ButtonTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Mixed Button Types
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button text="Delete" buttonType={ButtonType.DANGER} />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    All Primary
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Option 1" buttonType={ButtonType.PRIMARY} />
                    <Button text="Option 2" buttonType={ButtonType.PRIMARY} />
                    <Button text="Option 3" buttonType={ButtonType.PRIMARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    All Secondary
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Edit" buttonType={ButtonType.SECONDARY} />
                    <Button
                        text="Duplicate"
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button text="Archive" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different combinations of button types within a group.',
            },
        },
    },
}

// With icons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Action Buttons
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Save"
                        leadingIcon={<Save size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Cancel"
                        leadingIcon={<X size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    CRUD Operations
                </h4>
                <ButtonGroup stacked={false}>
                    <Button
                        text="Add"
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Edit"
                        leadingIcon={<Edit size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        text="Delete"
                        leadingIcon={<Trash2 size={16} />}
                        buttonType={ButtonType.DANGER}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    File Operations
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Download"
                        leadingIcon={<Download size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Settings"
                        leadingIcon={<Settings size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button groups with icons for enhanced visual communication and context.',
            },
        },
    },
}

// Common use cases
export const CommonUseCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Form Actions
                </h4>
                <ButtonGroup stacked={false}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button
                        text="Save as Draft"
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Modal Actions
                </h4>
                <ButtonGroup stacked={false}>
                    <Button text="Confirm" buttonType={ButtonType.DANGER} />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Toolbar Actions
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Bold" buttonType={ButtonType.SECONDARY} />
                    <Button text="Italic" buttonType={ButtonType.SECONDARY} />
                    <Button
                        text="Underline"
                        buttonType={ButtonType.SECONDARY}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Navigation
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Previous" buttonType={ButtonType.SECONDARY} />
                    <Button text="Next" buttonType={ButtonType.PRIMARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Common use cases for button groups in different contexts and layouts.',
            },
        },
    },
}

// Different sizes
export const ButtonSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Small Buttons
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                    />
                    <Button
                        text="Cancel"
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Medium Buttons (Default)
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                    />
                    <Button
                        text="Cancel"
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Large Buttons
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.LARGE}
                    />
                    <Button
                        text="Cancel"
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.LARGE}
                    />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button groups with different button sizes. Note: Size should be set on individual buttons.',
            },
        },
    },
}

// Comprehensive showcase
export const Showcase: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                padding: '16px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Layout Options
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ButtonGroup stacked={true}>
                        <Button
                            text="Stacked"
                            buttonType={ButtonType.PRIMARY}
                        />
                        <Button
                            text="Connected"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </ButtonGroup>

                    <ButtonGroup stacked={false}>
                        <Button text="Spaced" buttonType={ButtonType.PRIMARY} />
                        <Button
                            text="Separated"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </ButtonGroup>
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    With Icons
                </h3>
                <ButtonGroup stacked={false}>
                    <Button
                        text="Add"
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        text="Edit"
                        leadingIcon={<Edit size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        text="Delete"
                        leadingIcon={<Trash2 size={16} />}
                        buttonType={ButtonType.DANGER}
                    />
                </ButtonGroup>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Common Patterns
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ButtonGroup stacked={false}>
                        <Button text="Save" buttonType={ButtonType.PRIMARY} />
                        <Button
                            text="Cancel"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </ButtonGroup>

                    <ButtonGroup stacked={true}>
                        <Button
                            text="Previous"
                            buttonType={ButtonType.SECONDARY}
                        />
                        <Button text="Next" buttonType={ButtonType.PRIMARY} />
                    </ButtonGroup>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive showcase of ButtonGroup capabilities and variations.',
            },
        },
    },
}
