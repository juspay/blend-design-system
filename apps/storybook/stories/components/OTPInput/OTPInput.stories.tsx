import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { OTPInput } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof OTPInput> = {
    title: 'Components/Inputs/OTPInput',
    component: OTPInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A specialized input component for One-Time Password (OTP) entry with individual character input fields and validation support.

## Features
- Individual input fields for each OTP digit
- Configurable length (typically 4-8 digits)
- Auto-focus progression between fields
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Paste support for complete OTP codes
- Form integration ready
- Accessible design with proper labeling

## Accessibility

- Uses native \`<input>\` elements for each OTP digit with proper semantics
- Labels are associated via \`label\`, \`sublabel\`, and \`name\` props
- Required state is visually indicated and exposed via \`required\` / \`aria-required\`
- Error state is exposed via error text and can be associated with inputs via \`InputFooter\`
- Keyboard navigation: Tab/Shift+Tab to move between fields, Arrow keys for navigation, Backspace for deletion
- Auto-focus progression ensures efficient keyboard entry
- Paste support allows users to paste complete OTP codes
- Focus styles and error shake patterns are keyboard-friendly
- Hint and help text provide additional instructions for users and assistive technologies

**WCAG Compliance Target**: 2.0, 2.1, 2.2 Level A, AA, AAA (designed to support 2.2 as the latest version of WCAG [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)])

**Intended coverage:**
- **Perceivable**: Labels, hints, and error messages are visible and can be programmatically associated
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, Arrow keys for navigation, Backspace for deletion, Paste support)
- **Understandable**: Clear labels, inline help, and error messaging patterns
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA/AAA)
- **jest-axe tests**: Run \`pnpm test OTPInput.accessibility\` to automate WCAG checks
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools

> Note: WCAG 2.2 builds on 2.1 and 2.0; content that conforms to 2.2 also conforms to earlier versions [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)].

## Usage

\`\`\`tsx
import { OTPInput } from '@juspay/blend-design-system';

<OTPInput
  label="Verification Code"
  length={6}
  value={otp}
  onChange={(value) => setOtp(value)}
  placeholder="0"
  autoFocus
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current OTP value as a string',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'otp-changed',
            description: 'Callback fired when the OTP value changes',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Core',
            },
        },
        length: {
            control: { type: 'number', min: 3, max: 8 },
            description: 'Number of OTP digits/characters',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
                category: 'Configuration',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder character for empty fields',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '0' },
                category: 'Content',
            },
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Whether the first input should auto-focus on mount',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the OTP input',
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
            description: 'Hint text displayed below the OTP input',
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
            description: 'Whether the OTP input is in error state',
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
            description: 'Whether the OTP input is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        form: {
            control: { type: 'text' },
            description: 'Form ID that this input belongs to',
            table: {
                type: { summary: 'string' },
                category: 'Form',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OTPInput>

// Default story
export const Default: Story = {
    render: function DefaultOTPInput(args) {
        const [value, setValue] = useState('')

        return (
            <OTPInput
                {...args}
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />
        )
    },
    args: {
        label: 'Verification Code',
        length: 4,
        placeholder: '0',
        autoFocus: false,
        disabled: false,
        error: false,
    },
}

// Different lengths
export const DifferentLengths: Story = {
    render: () => {
        const [values, setValues] = useState({
            four: '',
            six: '',
            eight: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <OTPInput
                    label="4-Digit Code"
                    length={4}
                    value={values.four}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, four: value }))
                    }
                    hintText="Enter 4-digit verification code"
                />
                <OTPInput
                    label="6-Digit Code"
                    length={6}
                    value={values.six}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, six: value }))
                    }
                    hintText="Enter 6-digit verification code"
                />
                <OTPInput
                    label="8-Digit Code"
                    length={8}
                    value={values.eight}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, eight: value }))
                    }
                    hintText="Enter 8-digit verification code"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'OTPInput with different lengths: 4, 6, and 8 digits.',
            },
        },
    },
}

// Auto-focus example
export const WithAutoFocus: Story = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <OTPInput
                label="Auto-focused OTP"
                sublabel="The first field will be automatically focused"
                length={6}
                value={value}
                onChange={setValue}
                autoFocus
                hintText="Focus will automatically move to next field as you type"
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'OTPInput with auto-focus enabled - the first field receives focus automatically.',
            },
        },
    },
}

// Error states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            empty: '',
            invalid: '12',
            incorrect: '1234',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <OTPInput
                    label="Required OTP"
                    length={4}
                    value={values.empty}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, empty: value }))
                    }
                    error={values.empty === ''}
                    errorMessage={
                        values.empty === ''
                            ? 'Verification code is required'
                            : ''
                    }
                />
                <OTPInput
                    label="Incomplete OTP"
                    length={6}
                    value={values.invalid}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, invalid: value }))
                    }
                    error={
                        values.invalid.length > 0 && values.invalid.length < 6
                    }
                    errorMessage={
                        values.invalid.length > 0 && values.invalid.length < 6
                            ? 'Please enter all 6 digits'
                            : ''
                    }
                />
                <OTPInput
                    label="Incorrect OTP"
                    length={4}
                    value={values.incorrect}
                    onChange={(value) =>
                        setValues((prev) => ({ ...prev, incorrect: value }))
                    }
                    error={values.incorrect === '1234'}
                    errorMessage={
                        values.incorrect === '1234'
                            ? 'Invalid verification code. Please try again.'
                            : ''
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'OTPInput showing different error states: required, incomplete, and incorrect code.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <OTPInput
                label="Disabled Empty"
                length={4}
                value=""
                onChange={() => {}}
                disabled
            />
            <OTPInput
                label="Disabled With Value"
                length={6}
                value="123456"
                onChange={() => {}}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'OTPInput in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState('')
        const [timeLeft, setTimeLeft] = useState(60)

        // Simulate countdown timer
        React.useEffect(() => {
            if (timeLeft > 0) {
                const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
                return () => clearTimeout(timer)
            }
        }, [timeLeft])

        return (
            <OTPInput
                label="Two-Factor Authentication"
                sublabel="Enter the 6-digit code from your authenticator app"
                hintText={`Code expires in ${timeLeft} seconds`}
                helpIconHintText="If you don't receive a code, check your authenticator app or contact support"
                length={6}
                value={value}
                onChange={setValue}
                autoFocus
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'OTPInput with comprehensive labeling: main label, sublabel, dynamic hint text, and help tooltip.',
            },
        },
    },
}

// Verification flow simulation
export const VerificationFlow: Story = {
    render: () => {
        const [value, setValue] = useState('')
        const [isVerifying, setIsVerifying] = useState(false)
        const [isVerified, setIsVerified] = useState(false)
        const [error, setError] = useState('')

        const handleVerify = () => {
            if (value.length === 6) {
                setIsVerifying(true)
                setError('')

                // Simulate verification
                setTimeout(() => {
                    setIsVerifying(false)
                    if (value === '123456') {
                        setIsVerified(true)
                    } else {
                        setError('Invalid verification code. Please try again.')
                        setValue('')
                    }
                }, 2000)
            }
        }

        React.useEffect(() => {
            if (value.length === 6 && !isVerifying && !isVerified) {
                handleVerify()
            }
        }, [value])

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <OTPInput
                    label="Email Verification"
                    sublabel="Enter the code sent to your email address"
                    length={6}
                    value={value}
                    onChange={setValue}
                    error={!!error}
                    errorMessage={error}
                    disabled={isVerifying || isVerified}
                    autoFocus
                />

                {isVerifying && (
                    <div style={{ color: '#0066cc', fontSize: '14px' }}>
                        Verifying code...
                    </div>
                )}

                {isVerified && (
                    <div style={{ color: '#00aa00', fontSize: '14px' }}>
                        ✓ Email verified successfully!
                    </div>
                )}

                <div style={{ fontSize: '12px', color: '#666' }}>
                    Hint: Try entering "123456" to see successful verification
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'OTPInput with simulated verification flow - automatically verifies when 6 digits are entered.',
            },
        },
    },
}

// Accessibility-focused examples
export const Accessibility: Story = {
    render: () => {
        const [basicOtp, setBasicOtp] = useState('')
        const [requiredOtp, setRequiredOtp] = useState('')
        const [errorOtp, setErrorOtp] = useState('123')
        const [disabledOtp, setDisabledOtp] = useState('123456')
        const [keyboardOtp, setKeyboardOtp] = useState('')

        const errorMessage =
            errorOtp.length > 0 && errorOtp.length < 6
                ? 'Please enter all 6 digits'
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
                    <OTPInput
                        label="Verification Code"
                        sublabel="Enter the 6-digit code sent to your email"
                        hintText="Check your email for the verification code"
                        length={6}
                        value={basicOtp}
                        onChange={setBasicOtp}
                        required
                        autoFocus
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
                    <OTPInput
                        label="Two-Factor Authentication Code"
                        sublabel="Enter the code from your authenticator app"
                        length={6}
                        value={errorOtp}
                        onChange={setErrorOtp}
                        error={!!errorMessage}
                        errorMessage={errorMessage}
                        hintText="Code must be 6 digits"
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
                        Disabled State
                    </h3>
                    <OTPInput
                        label="Disabled OTP Input"
                        sublabel="This field is disabled and cannot be edited"
                        length={6}
                        value={disabledOtp}
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
                    <OTPInput
                        label="Security Code"
                        sublabel="Use Tab to navigate, Arrow keys to move between fields, Backspace to delete"
                        hintText="You can also paste a complete code to fill all fields at once"
                        length={6}
                        value={keyboardOtp}
                        onChange={setKeyboardOtp}
                        required
                        helpIconHintText="Keyboard shortcuts: Tab/Shift+Tab to navigate, Arrow keys to move, Backspace to delete, Paste to fill all fields"
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
                        Different OTP Lengths
                    </h3>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <OTPInput
                            label="4-Digit PIN"
                            length={4}
                            value=""
                            onChange={() => {}}
                            hintText="Enter 4-digit PIN"
                        />
                        <OTPInput
                            label="6-Digit Code"
                            length={6}
                            value=""
                            onChange={() => {}}
                            hintText="Enter 6-digit verification code"
                        />
                        <OTPInput
                            label="8-Digit Code"
                            length={8}
                            value=""
                            onChange={() => {}}
                            hintText="Enter 8-digit security code"
                        />
                    </div>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating labeling, required indicators, error messaging, disabled state, keyboard navigation, and different OTP lengths.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to label / control associations, error messaging, and keyboard navigation.

2. **jest-axe tests**:
   - Add \`OTPInput.accessibility.test.tsx\` mirroring TextInput's tests and run:
   \`\`\`bash
   pnpm test:a11y:file __tests__/components/Inputs/OTPInput.accessibility.test.tsx
   \`\`\`
   - Validate WCAG 2.0, 2.1, 2.2 A, AA, and AAA success criteria for form fields (labels, errors, keyboard support, focus management).

3. **Manual testing**:
   - Navigate using keyboard only (Tab / Shift+Tab, Arrow keys, Backspace, Paste).
   - Use a screen reader (VoiceOver/NVDA) to confirm labels, hints, and errors are announced.
   - Verify color contrast of text, borders, and focus styles using contrast tools.
   - Test paste functionality with complete OTP codes.
                `,
            },
        },
        a11y: {
            ...getA11yConfig('form'),
        },
    },
}
