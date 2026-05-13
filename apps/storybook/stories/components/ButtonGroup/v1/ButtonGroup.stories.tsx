import type { Meta, StoryObj } from '@storybook/react'
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
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
        docsSubtitle:
            'A modern container component for grouping Button components with automatic positioning and spacing.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { ButtonGroup, Button, ButtonType } from '@juspay/blend-design-system';

<ButtonGroup stacked={true}>
  <Button text="Save" buttonType={ButtonType.PRIMARY} />
  <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
</ButtonGroup>
\`\`\`

## Features
- Automatic button group positioning (left, center, right)
- Stacked and non-stacked layouts
- Works seamlessly with Button components
- Automatic border radius adjustment for connected buttons
- Automatically applies buttonGroupPosition prop to Button children when stacked=true
- Simple and clean API

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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">
                    Manual Position (Individual Buttons)
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                    Using buttonGroupPosition prop manually on individual
                    buttons
                </p>
                <div className="flex">
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
                <h4 className="mb-2 text-sm font-semibold">
                    Automatic Position (ButtonGroup stacked=true)
                </h4>
                <p className="text-xs text-gray-500 mb-3">
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
                <h4 className="mb-2 text-sm font-semibold">Two Button Group</h4>
                <p className="text-xs text-gray-500 mb-3">
                    First button gets 'left', last button gets 'right' position
                </p>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4 className="mb-2 text-sm font-semibold">
                    Five Button Group
                </h4>
                <p className="text-xs text-gray-500 mb-3">
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
    },
}

// Stacked vs Non-stacked
export const StackedVsNonStacked: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">
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
                <h4 className="mb-2 text-sm font-semibold">
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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Primary Actions</h4>
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
                <h4 className="mb-2 text-sm font-semibold">Mixed Types</h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.SUCCESS} />
                    <Button text="Delete" buttonType={ButtonType.DANGER} />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4 className="mb-2 text-sm font-semibold">All Secondary</h4>
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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Small</h4>
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
                <h4 className="mb-2 text-sm font-semibold">Medium</h4>
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
                <h4 className="mb-2 text-sm font-semibold">Large</h4>
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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Action Buttons</h4>
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
                <h4 className="mb-2 text-sm font-semibold">CRUD Operations</h4>
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
                <h4 className="mb-2 text-sm font-semibold">File Operations</h4>
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
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Toolbar Actions</h4>
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
                <h4 className="mb-2 text-sm font-semibold">Media Controls</h4>
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

// Button states
export const ButtonStates: Story = {
    render: () => (
        <div className="flex flex-col gap-6">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Normal State</h4>
                <ButtonGroup stacked={true}>
                    <Button text="Save" buttonType={ButtonType.PRIMARY} />
                    <Button text="Cancel" buttonType={ButtonType.SECONDARY} />
                </ButtonGroup>
            </div>

            <div>
                <h4 className="mb-2 text-sm font-semibold">With Loading</h4>
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
                <h4 className="mb-2 text-sm font-semibold">With Disabled</h4>
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
