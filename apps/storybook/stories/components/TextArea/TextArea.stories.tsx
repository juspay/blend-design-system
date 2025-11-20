import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { TextArea } from '@juspay/blend-design-system'

const meta: Meta<typeof TextArea> = {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A multi-line text input component for longer text content with support for labels, validation, resize controls, and error handling.

## Features
- Multi-line text input with configurable rows and columns
- Resize control options (none, both, horizontal, vertical, block, inline)
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Auto-focus support
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Usage

\`\`\`tsx
import { TextArea } from '@juspay/blend-design-system';

<TextArea
  label="Description"
  placeholder="Enter your description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  required
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current value of the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the textarea value changes',
            table: {
                type: {
                    summary:
                        '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when textarea is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        rows: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Number of visible text rows',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
                category: 'Layout',
            },
        },
        cols: {
            control: { type: 'number', min: 10, max: 100 },
            description: 'Number of visible character columns',
            table: {
                type: { summary: 'number' },
                category: 'Layout',
            },
        },
        resize: {
            control: { type: 'select' },
            options: [
                'none',
                'both',
                'horizontal',
                'vertical',
                'block',
                'inline',
            ],
            description: 'Resize behavior of the textarea',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'vertical' },
                category: 'Layout',
            },
        },
        wrap: {
            control: { type: 'select' },
            options: [
                'normal',
                'nowrap',
                'pre',
                'pre-wrap',
                'pre-line',
                'break-spaces',
            ],
            description: 'Text wrapping behavior',
            table: {
                type: { summary: 'string' },
                category: 'Layout',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label text displayed below the main label',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text displayed below the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is in error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Error message displayed when in error state',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is required (shows asterisk)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Whether the textarea should auto-focus on mount',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        onFocus: {
            action: 'focused',
            description: 'Callback fired when the textarea receives focus',
            table: {
                type: {
                    summary:
                        '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            description: 'Callback fired when the textarea loses focus',
            table: {
                type: {
                    summary:
                        '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextArea>

// Default story
export const Default: Story = {
    render: function DefaultTextArea(args) {
        const [value, setValue] = useState('')

        return (
            <TextArea
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    args: {
        label: 'Default Text Area',
        placeholder: 'Enter your text here...',
        rows: 4,
        disabled: false,
        required: false,
        error: false,
        resize: 'vertical',
    },
}

// Different sizes
export const DifferentSizes: Story = {
    render: () => {
        const [values, setValues] = useState({
            small: '',
            medium: '',
            large: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="Small (3 rows)"
                    placeholder="Small textarea..."
                    rows={3}
                    value={values.small}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            small: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Medium (5 rows)"
                    placeholder="Medium textarea..."
                    rows={5}
                    value={values.medium}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Large (8 rows)"
                    placeholder="Large textarea..."
                    rows={8}
                    value={values.large}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            large: e.target.value,
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with different row counts: 3, 5, and 8 rows.',
            },
        },
    },
}

// Resize options
export const ResizeOptions: Story = {
    render: () => {
        const [values, setValues] = useState({
            none: '',
            vertical: '',
            horizontal: '',
            both: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="No Resize"
                    placeholder="This textarea cannot be resized..."
                    rows={4}
                    resize="none"
                    value={values.none}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, none: e.target.value }))
                    }
                />
                <TextArea
                    label="Vertical Resize"
                    placeholder="This textarea can be resized vertically..."
                    rows={4}
                    resize="vertical"
                    value={values.vertical}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            vertical: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Horizontal Resize"
                    placeholder="This textarea can be resized horizontally..."
                    rows={4}
                    resize="horizontal"
                    value={values.horizontal}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            horizontal: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Both Directions"
                    placeholder="This textarea can be resized in both directions..."
                    rows={4}
                    resize="both"
                    value={values.both}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, both: e.target.value }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with different resize options: none, vertical, horizontal, and both.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: '',
            tooShort: 'Short',
            valid: 'This is a valid description that meets all the requirements for the form field.',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="Required Field"
                    placeholder="This field is required..."
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: e.target.value,
                        }))
                    }
                    required
                    error={values.required === ''}
                    errorMessage={
                        values.required === '' ? 'This field is required' : ''
                    }
                    rows={3}
                />
                <TextArea
                    label="Minimum Length"
                    placeholder="Enter at least 10 characters..."
                    value={values.tooShort}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            tooShort: e.target.value,
                        }))
                    }
                    error={
                        values.tooShort.length > 0 &&
                        values.tooShort.length < 10
                    }
                    errorMessage={
                        values.tooShort.length > 0 &&
                        values.tooShort.length < 10
                            ? 'Minimum 10 characters required'
                            : ''
                    }
                    hintText={`${values.tooShort.length}/10 characters`}
                    rows={3}
                />
                <TextArea
                    label="Valid Description"
                    placeholder="Enter description..."
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value,
                        }))
                    }
                    hintText="This description meets all requirements"
                    rows={3}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea showing different validation states: required, minimum length, and valid.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextArea
                label="Disabled Empty"
                placeholder="This textarea is disabled"
                value=""
                onChange={() => {}}
                rows={4}
                disabled
            />
            <TextArea
                label="Disabled With Content"
                value="This textarea is disabled and contains some content that cannot be edited."
                onChange={() => {}}
                rows={4}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'TextArea in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState('')
        const maxLength = 500

        return (
            <TextArea
                label="Project Description"
                sublabel="Detailed overview of your project"
                hintText={`${value.length}/${maxLength} characters`}
                helpIconHintText="Provide a comprehensive description that will help reviewers understand your project goals and methodology"
                placeholder="Describe your project in detail..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={6}
                maxLength={maxLength}
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with comprehensive labeling: main label, sublabel, hint text with character count, and help tooltip.',
            },
        },
    },
}

// Auto-focus example
export const AutoFocus: Story = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <TextArea
                label="Auto-focused TextArea"
                placeholder="This textarea will auto-focus when the story loads..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                autoFocus
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with auto-focus enabled - it will receive focus when the component mounts.',
            },
        },
    },
}
