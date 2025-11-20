import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { TextInput, TextInputSize } from '@juspay/blend-design-system'
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Check,
    X,
} from 'lucide-react'

const meta: Meta<typeof TextInput> = {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible text input component with support for labels, validation, error handling, and customizable slots for icons and actions.

## Features
- Three sizes (Small, Medium, Large)
- Label, sublabel, and hint text support
- Error state handling with custom messages
- Required field indication
- Left and right slot content for icons and actions
- Help tooltips with additional information
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Usage

\`\`\`tsx
import { TextInput, TextInputSize } from '@juspay/blend-design-system';

<TextInput
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  size={TextInputSize.MEDIUM}
  leftSlot={<Mail size={16} />}
  required
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the input',
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
            description: 'Hint text displayed below the input',
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
        value: {
            control: { type: 'text' },
            description: 'Current value of the input',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the input value changes',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Core',
            },
        },
        onBlur: {
            action: 'blurred',
            description: 'Callback fired when the input loses focus',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onFocus: {
            action: 'focused',
            description: 'Callback fired when the input receives focus',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(TextInputSize),
            description: 'Size variant of the input',
            table: {
                type: { summary: 'TextInputSize' },
                defaultValue: { summary: 'TextInputSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the input is in error state',
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
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the input is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the input is required (shows asterisk)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when input is empty',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Enter' },
                category: 'Content',
            },
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for form submission',
            table: {
                type: { summary: 'string' },
                category: 'Form',
            },
        },
        cursor: {
            control: { type: 'select' },
            options: ['text', 'pointer', 'default', 'not-allowed'],
            description: 'CSS cursor style for the input',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' },
                category: 'Appearance',
            },
        },
        leftSlot: {
            control: false,
            description: 'Content displayed on the left side of the input',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
        rightSlot: {
            control: false,
            description: 'Content displayed on the right side of the input',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Slots',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInput>

// Default story
export const Default: Story = {
    render: function DefaultTextInput(args) {
        const [value, setValue] = useState('')

        return (
            <TextInput
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    args: {
        label: 'Default Text Input',
        placeholder: 'Enter text',
        size: TextInputSize.MEDIUM,
        disabled: false,
        required: false,
        error: false,
    },
}

// Different sizes
export const Sizes: Story = {
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
                <TextInput
                    label="Small Size"
                    placeholder="Small input"
                    size={TextInputSize.SMALL}
                    value={values.small}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            small: e.target.value,
                        }))
                    }
                />
                <TextInput
                    label="Medium Size"
                    placeholder="Medium input"
                    size={TextInputSize.MEDIUM}
                    value={values.medium}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: e.target.value,
                        }))
                    }
                />
                <TextInput
                    label="Large Size"
                    placeholder="Large input"
                    size={TextInputSize.LARGE}
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
                story: 'TextInput in different sizes: Small, Medium, and Large.',
            },
        },
    },
}

// With slots
export const WithSlots: Story = {
    render: () => {
        const [values, setValues] = useState({
            email: '',
            password: '',
            search: '',
        })
        const [showPassword, setShowPassword] = useState(false)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={values.email}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    leftSlot={<Mail size={16} />}
                    required
                />
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                    leftSlot={<Lock size={16} />}
                    rightSlot={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {showPassword ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    }
                    required
                />
                <TextInput
                    label="Username"
                    placeholder="Enter username"
                    value={values.search}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    leftSlot={<User size={16} />}
                    rightSlot={
                        values.search ? <Check size={16} color="green" /> : null
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextInput with left and right slots for icons and interactive elements.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: '',
            invalid: 'invalid-email',
            valid: 'user@example.com',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextInput
                    label="Required Field"
                    placeholder="This field is required"
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
                />
                <TextInput
                    label="Invalid Email"
                    placeholder="Enter valid email"
                    type="email"
                    value={values.invalid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            invalid: e.target.value,
                        }))
                    }
                    leftSlot={<Mail size={16} />}
                    rightSlot={<AlertCircle size={16} color="red" />}
                    error
                    errorMessage="Please enter a valid email address"
                />
                <TextInput
                    label="Valid Email"
                    placeholder="Enter valid email"
                    type="email"
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value,
                        }))
                    }
                    leftSlot={<Mail size={16} />}
                    rightSlot={<Check size={16} color="green" />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextInput showing different validation states: required, error, and valid.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextInput
                label="Disabled Empty"
                placeholder="This input is disabled"
                value=""
                onChange={() => {}}
                disabled
            />
            <TextInput
                label="Disabled With Value"
                value="This input is disabled with content"
                onChange={() => {}}
                leftSlot={<User size={16} />}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'TextInput in disabled state, both empty and with content.',
            },
        },
    },
}

// With labels and hints
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextInput
                    label="Full Name"
                    sublabel="As it appears on your ID"
                    hintText="Enter your first and last name"
                    helpIconHintText="This will be used for official documentation"
                    placeholder="John Doe"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    leftSlot={<User size={16} />}
                    required
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextInput with comprehensive labeling: main label, sublabel, hint text, and help tooltip.',
            },
        },
    },
}
