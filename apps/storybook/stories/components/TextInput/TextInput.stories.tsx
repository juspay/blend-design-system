import type { Meta, StoryObj } from '@storybook/react'
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
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof TextInput> = {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
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

## Accessibility

- Uses native \`<input type="text">\` for proper semantics
- Labels are associated via \`label\`, \`sublabel\`, and \`name\` props
- Required state is visually indicated and exposed via \`required\` / \`aria-required\`
- Error state is exposed via error text and can be associated with inputs via \`InputFooter\`
- Focus styles and error shake patterns are keyboard-friendly
- Left/right slot icons are decorative by default and should not replace accessible labels
- Hint and help text provide additional instructions for users and assistive technologies

**WCAG Compliance Target**: 2.1 Level AA (designed to support 2.2 as the latest version of WCAG [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)])

**Intended coverage:**
- **Perceivable**: Labels, hints, and error messages are visible and can be programmatically associated
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, Enter for form submission)
- **Understandable**: Clear labels, inline help, and error messaging patterns
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA)
- **jest-axe tests**: Run \`pnpm test TextInput.accessibility\` (mirroring Button’s tests) to automate WCAG checks
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools

> Note: WCAG 2.2 builds on 2.1 and 2.0; content that conforms to 2.2 also conforms to earlier versions [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)].

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

// Accessibility-focused examples
export const Accessibility: Story = {
    render: () => {
        const [email, setEmail] = useState('')
        const [name, setName] = useState('')
        const [password, setPassword] = useState('')

        const emailError =
            email.length > 0 && !email.includes('@')
                ? 'Please enter a valid email address'
                : ''

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    maxWidth: '800px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Labels, Required Fields, and Hints
                    </h3>
                    <TextInput
                        label="Full Name"
                        sublabel="As it appears on your ID"
                        hintText="Enter your first and last name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Error Messaging and Validation
                    </h3>
                    <TextInput
                        label="Email Address"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        error={!!emailError}
                        errorMessage={emailError}
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Disabled and Read-Only Contexts
                    </h3>
                    <TextInput
                        label="Disabled Input"
                        value="This field is disabled"
                        onChange={() => {}}
                        disabled
                        hintText="Disabled fields are not focusable and do not submit values"
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Keyboard and Screen Reader Friendly Layout
                    </h3>
                    <TextInput
                        label="Password"
                        placeholder="Enter a strong password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        hintText="Use at least 12 characters, including letters and numbers"
                        required
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating labeling, required indicators, error messaging, disabled state, and keyboard-friendly focus behavior.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to label / control associations and error messaging.

2. **jest-axe tests**:
   - Add \`TextInput.accessibility.test.tsx\` mirroring Button's tests and run:
   \`\`\`bash
   pnpm test TextInput.accessibility
   \`\`\`
   - Validate WCAG 2.1/2.2 A and AA success criteria for form fields (labels, errors, keyboard support).

3. **Manual testing**:
   - Navigate using keyboard only (Tab / Shift+Tab, Enter).
   - Use a screen reader (VoiceOver/NVDA) to confirm labels, hints, and errors are announced.
   - Verify color contrast of text, borders, and focus styles using contrast tools.
                `,
            },
        },
        a11y: {
            ...getA11yConfig('form'),
        },
    },
}
