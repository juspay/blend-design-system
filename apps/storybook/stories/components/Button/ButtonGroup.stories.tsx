import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import {
    ButtonGroup,
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '@juspay/blend-design-system'
import {
    Plus,
    Download,
    Settings,
    Save,
    X,
    Edit,
    Trash2,
    Search,
    Copy,
} from 'lucide-react'

const meta: Meta<typeof ButtonGroup> = {
    title: 'Components/Button/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A modern container component for grouping Button components with automatic positioning and spacing.

## Features
- Automatic button group positioning (left, center, right)
- Stacked and non-stacked layouts
- Works seamlessly with Button components
- Automatic border radius adjustment for connected buttons
- Automatically applies buttonGroupPosition prop to Button children when stacked=true
- Simple and clean API

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
            description:
                'Whether buttons are stacked together (connected) or have spacing',
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

// Button group positioning demonstration
export const ButtonGroupPositioning: Story = {
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
                    Manual Position (Individual Buttons)
                </h4>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Using buttonGroupPosition prop manually on individual
                    buttons
                </p>
                <div style={{ display: 'flex' }}>
                    <Button
                        text="Left"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="left"
                    />
                    <Button
                        text="Center"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="center"
                    />
                    <Button
                        text="Right"
                        buttonType={ButtonType.SECONDARY}
                        buttonGroupPosition="right"
                    />
                </div>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Automatic Position (ButtonGroup stacked=true)
                </h4>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    ButtonGroup automatically applies buttonGroupPosition to
                    children
                </p>
                <ButtonGroup stacked={true}>
                    <Button text="Left" buttonType={ButtonType.SECONDARY} />
                    <Button text="Center" buttonType={ButtonType.SECONDARY} />
                    <Button text="Right" buttonType={ButtonType.SECONDARY} />
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
                    Two Button Group
                </h4>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    First button gets 'left', last button gets 'right' position
                </p>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
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
                    Five Button Group
                </h4>
                <p
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    First gets 'left', last gets 'right', middle buttons get
                    'center'
                </p>
                <ButtonGroup stacked={true}>
                    <Button text="1" buttonType={ButtonType.SECONDARY} />
                    <Button text="2" buttonType={ButtonType.SECONDARY} />
                    <Button text="3" buttonType={ButtonType.PRIMARY} />
                    <Button text="4" buttonType={ButtonType.SECONDARY} />
                    <Button text="5" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates how ButtonGroup automatically applies buttonGroupPosition prop to its children when stacked=true. This creates seamless connected buttons with proper border radius handling.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'button-name', enabled: true },
                ],
            },
        },
    },
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
                    Primary Actions
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
                    Mixed Types
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.SUCCESS} />
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
                    All Secondary
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Option 1" buttonType={ButtonType.SECONDARY} />
                    <Button text="Option 2" buttonType={ButtonType.SECONDARY} />
                    <Button text="Option 3" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button groups with different button types and combinations.',
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
                    Small
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
                    Medium
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
                    Large
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
                story: 'Button groups with different button sizes.',
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
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        text="Copy"
                        leadingIcon={<Copy size={16} />}
                        buttonType={ButtonType.SECONDARY}
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
                story: 'Button groups with icons for enhanced visual communication.',
            },
        },
    },
}

// Icon only buttons
export const IconOnlyButtons: Story = {
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
                    Toolbar Actions
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Plus size={16} />}
                        buttonType={ButtonType.PRIMARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Edit size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
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
                    Media Controls
                </h4>
                <ButtonGroup stacked={false}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Search size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Download size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
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
                story: 'Icon-only button groups for compact interfaces and toolbars.',
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
                    Navigation
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Previous" buttonType={ButtonType.SECONDARY} />
                    <Button text="Next" buttonType={ButtonType.PRIMARY} />
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
                    Filter Options
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="All" buttonType={ButtonType.PRIMARY} />
                    <Button text="Active" buttonType={ButtonType.SECONDARY} />
                    <Button text="Inactive" buttonType={ButtonType.SECONDARY} />
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

// Button states
export const ButtonStates: Story = {
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
                    Normal State
                </h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
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
                    With Loading
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Saving..."
                        buttonType={ButtonType.PRIMARY}
                        loading={true}
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
                    With Disabled
                </h4>
                <ButtonGroup stacked={true}>
                    <Button
                        text="Save"
                        buttonType={ButtonType.PRIMARY}
                        disabled={true}
                    />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button groups with different button states including loading and disabled.',
            },
        },
    },
}

// Two button groups
export const TwoButtonGroups: Story = {
    render: () => (
        <ButtonGroup stacked={true}>
            <Button text="Save" buttonType={ButtonType.PRIMARY} />
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Simple two-button group - the most common use case.',
            },
        },
    },
}

// Three button groups
export const ThreeButtonGroups: Story = {
    render: () => (
        <ButtonGroup stacked={true}>
            <Button text="Save" buttonType={ButtonType.PRIMARY} />
            <Button text="Save & Continue" buttonType={ButtonType.SECONDARY} />
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Three-button group with proper border radius handling.',
            },
        },
    },
}

// Many button groups
export const ManyButtonGroups: Story = {
    render: () => (
        <ButtonGroup stacked={true}>
            <Button text="1" buttonType={ButtonType.SECONDARY} />
            <Button text="2" buttonType={ButtonType.SECONDARY} />
            <Button text="3" buttonType={ButtonType.SECONDARY} />
            <Button text="4" buttonType={ButtonType.SECONDARY} />
            <Button text="5" buttonType={ButtonType.PRIMARY} />
        </ButtonGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Button group with many buttons, useful for pagination or tabs.',
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
                    Button Types
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
                            text="Primary"
                            buttonType={ButtonType.PRIMARY}
                        />
                        <Button
                            text="Secondary"
                            buttonType={ButtonType.SECONDARY}
                        />
                        <Button
                            text="Success"
                            buttonType={ButtonType.SUCCESS}
                        />
                        <Button text="Danger" buttonType={ButtonType.DANGER} />
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
                    Icon Only
                </h3>
                <ButtonGroup stacked={true}>
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Search size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Download size={16} />}
                        buttonType={ButtonType.SECONDARY}
                    />
                    <Button
                        subType={ButtonSubType.ICON_ONLY}
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
                story: 'A comprehensive showcase of ButtonGroup capabilities and variations.',
            },
        },
    },
}
