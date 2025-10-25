import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { OTPInput } from '@juspay/blend-design-system'

const meta: Meta<typeof OTPInput> = {
    title: 'Components/Inputs/OTPInput',
    component: OTPInput,
    parameters: {
        layout: 'padded',
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
