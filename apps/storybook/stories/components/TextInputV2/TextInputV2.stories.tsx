import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Search,
    Check,
    AlertCircle,
    X,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { TextInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/TextInputV2'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

const meta: Meta<typeof TextInputV2> = {
    title: 'Components/Inputs/TextInputV2',
    component: TextInputV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A flexible text input component (V2) with responsive tokens, floating/static labels, validation, and left/right slots.

## Features
- Three sizes: Small (\`sm\`), Medium (\`md\`), Large (\`lg\`)
- Label, subLabel, hint text, and help tooltip
- Error state with \`{ show, message }\`
- Required field indication
- Left and right slot content (e.g. icons) with \`{ slot, maxHeight? }\`
- Disabled state
- Autofill detection for floating label behavior
- Responsive: on small screens with large size, labels can float

## Accessibility

- Uses native \`<input>\` for semantics; labels associated via \`label\` and \`htmlFor\` / \`id\`
- Required state: \`required\` and \`aria-required\`
- Error and hint text linked via \`aria-describedby\` (\`id\`-based)
- Focus styles and keyboard navigation (Tab, Shift+Tab)
- Slot icons are decorative by default; use \`aria-label\` on interactive slot content
- **WCAG target**: 2.1 Level AA (supports 2.2)

**Verification:**
- **Storybook a11y addon**: Accessibility panel — expect 0 violations for A/AA
- **Manual**: Screen readers (VoiceOver/NVDA), keyboard-only navigation, contrast tools

## Usage

\`\`\`tsx
import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system/...';

<TextInputV2
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  size={InputSizeV2.MD}
  leftSlot={{ slot: <Mail size={16} /> }}
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
            description: 'Current value of the input',
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text above the input',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        subLabel: {
            control: { type: 'text' },
            description: 'Secondary label below the main label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder when empty',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Enter' },
                category: 'Content',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(InputSizeV2),
            description: 'Size variant',
            table: {
                type: { summary: 'InputSizeV2' },
                defaultValue: { summary: 'sm' },
                category: 'Appearance',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Shows asterisk and sets aria-required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the input',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        error: {
            control: { type: 'object' },
            description: 'Error state: { show: boolean, message?: string }',
            table: { type: { summary: 'object' }, category: 'Validation' },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text below the input',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconText: {
            control: { type: 'object' },
            description: 'Help tooltip: { text: string, onClick?: () => void }',
            table: { type: { summary: 'object' }, category: 'Labels' },
        },
        leftSlot: {
            control: false,
            description:
                'Left slot: { slot: ReactElement, maxHeight?: CSSObject["maxHeight"] }',
            table: { type: { summary: 'object' }, category: 'Slots' },
        },
        rightSlot: {
            control: false,
            description:
                'Right slot: { slot: ReactElement, maxHeight?: CSSObject["maxHeight"] }',
            table: { type: { summary: 'object' }, category: 'Slots' },
        },
        onChange: {
            action: 'changed',
            description: 'Fired when the value changes',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onFocus: {
            action: 'focused',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            table: {
                type: {
                    summary: '(e: React.FocusEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInputV2>

export const Default: Story = {
    render: function DefaultTextInputV2(args) {
        const [value, setValue] = useState('')
        return (
            <TextInputV2
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    args: {
        label: 'Default Text Input',
        placeholder: 'Enter text',
        size: InputSizeV2.SM,
        disabled: false,
        required: false,
        error: { show: false, message: '' },
    },
}

export const Sizes: Story = {
    render: function SizesStory() {
        const [values, setValues] = useState({ sm: '', md: '', lg: '' })
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextInputV2
                    label="Small"
                    placeholder="Small input"
                    size={InputSizeV2.SM}
                    value={values.sm}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, sm: e.target.value }))
                    }
                />
                <TextInputV2
                    label="Medium"
                    placeholder="Medium input"
                    size={InputSizeV2.MD}
                    value={values.md}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, md: e.target.value }))
                    }
                />
                <TextInputV2
                    label="Large"
                    placeholder="Large input"
                    size={InputSizeV2.LG}
                    value={values.lg}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, lg: e.target.value }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextInputV2 in Small, Medium, and Large sizes.',
            },
        },
    },
}

export const WithSlots: Story = {
    render: function WithSlotsStory() {
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
                <TextInputV2
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
                    leftSlot={{ slot: <Mail size={16} /> }}
                    required
                />
                <TextInputV2
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
                    leftSlot={{ slot: <Lock size={16} /> }}
                    rightSlot={{
                        slot: (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                aria-label={
                                    showPassword
                                        ? 'Hide password'
                                        : 'Show password'
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        ),
                        maxHeight: 16,
                    }}
                    required
                />
                <TextInputV2
                    label="Search"
                    placeholder="Search"
                    value={values.search}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                    leftSlot={{ slot: <Search size={16} /> }}
                    rightSlot={
                        values.search
                            ? {
                                  slot: (
                                      <Check
                                          size={16}
                                          style={{ color: 'green' }}
                                      />
                                  ),
                                  maxHeight: 16,
                              }
                            : undefined
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextInputV2 with left and right slots (icons and interactive button).',
            },
        },
    },
}

export const ErrorStates: Story = {
    render: function ErrorStatesStory() {
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
                <TextInputV2
                    label="Required field"
                    placeholder="This field is required"
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: e.target.value,
                        }))
                    }
                    required
                    error={{
                        show: values.required === '',
                        message:
                            values.required === ''
                                ? 'This field is required'
                                : undefined,
                    }}
                />
                <TextInputV2
                    label="Invalid email"
                    placeholder="Enter valid email"
                    type="email"
                    value={values.invalid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            invalid: e.target.value,
                        }))
                    }
                    leftSlot={{ slot: <Mail size={16} /> }}
                    rightSlot={{
                        slot: (
                            <AlertCircle
                                size={16}
                                style={{ color: 'var(--color-error, red)' }}
                            />
                        ),
                        maxHeight: 16,
                    }}
                    error={{
                        show: true,
                        message: 'Please enter a valid email address',
                    }}
                />
                <TextInputV2
                    label="Valid email"
                    placeholder="Enter valid email"
                    type="email"
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value,
                        }))
                    }
                    leftSlot={{ slot: <Mail size={16} /> }}
                    rightSlot={{
                        slot: <Check size={16} style={{ color: 'green' }} />,
                        maxHeight: 16,
                    }}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Validation states: required empty, error, and valid.',
            },
        },
    },
}

export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextInputV2
                label="Disabled empty"
                placeholder="This input is disabled"
                value=""
                onChange={() => {}}
                disabled
            />
            <TextInputV2
                label="Disabled with value"
                value="Disabled content"
                onChange={() => {}}
                leftSlot={{ slot: <Search size={16} /> }}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'TextInputV2 disabled, empty and with value.',
            },
        },
    },
}

export const WithLabelsAndHints: Story = {
    render: function WithLabelsAndHintsStory() {
        const [value, setValue] = useState('')
        return (
            <TextInputV2
                label="Full name"
                subLabel="As it appears on your ID"
                hintText="Enter your first and last name"
                helpIconText={{
                    text: 'This will be used for official documentation',
                    onClick: () => {},
                }}
                placeholder="John Doe"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                leftSlot={{ slot: <Mail size={16} /> }}
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Label, subLabel, hint text, and help tooltip.',
            },
        },
    },
}

export const Accessibility: Story = {
    render: function AccessibilityStory() {
        const [email, setEmail] = useState('')
        const [name, setName] = useState('')
        const [password, setPassword] = useState('')
        const [searchValue, setSearchValue] = useState('')
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
                        Labels, required fields, and hints
                    </h3>
                    <TextInputV2
                        label="Full name"
                        subLabel="As it appears on your ID"
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
                        Error messaging and validation
                    </h3>
                    <TextInputV2
                        label="Email address"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        error={{
                            show: !!emailError,
                            message: emailError || undefined,
                        }}
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
                        Disabled context
                    </h3>
                    <TextInputV2
                        label="Disabled input"
                        value="This field is disabled"
                        onChange={() => {}}
                        disabled
                        hintText="Disabled fields are not focusable and do not submit."
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
                        Keyboard and screen reader friendly
                    </h3>
                    <TextInputV2
                        label="Password"
                        placeholder="Enter a strong password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        hintText="Use at least 12 characters, including letters and numbers"
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
                        Interactive slot with accessible name
                    </h3>
                    <TextInputV2
                        label="Search with clear"
                        placeholder="Type to search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        rightSlot={{
                            slot: <X size={16} aria-label="Clear" />,
                            maxHeight: 16,
                        }}
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples for TextInputV2:

- **Labels and required**: Associated via \`id\` / \`htmlFor\` and \`aria-required\`
- **Error and hints**: Exposed via \`aria-describedby\` so screen readers announce them
- **Disabled**: Not focusable; clearly indicated to assistive tech
- **Keyboard**: Tab / Shift+Tab to focus; type to edit
- **Interactive slots**: Use \`aria-label\` on icon buttons (e.g. show/hide password, clear)

**Verification:**
1. **Storybook a11y addon**: Open Accessibility panel — no violations for these examples.
2. **Manual**: Navigate with keyboard only; use VoiceOver/NVDA to confirm labels, hints, and errors are announced.
3. **Contrast**: Check text, borders, and focus styles with a contrast tool.
                `,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
