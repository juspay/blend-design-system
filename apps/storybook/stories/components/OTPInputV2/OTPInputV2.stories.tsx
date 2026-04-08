import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { OTPInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/OTPInputV2'

const meta: Meta<typeof OTPInputV2> = {
    title: 'Components/Inputs/OTPInputV2',
    component: OTPInputV2,
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
One-time password input (V2) with one digit per field, responsive tokens, and the same label/footer patterns as other Inputs V2.

## Features
- Configurable \`length\` (implementation caps at 32); digits-only entry
- \`onChange\` emits the full OTP string
- \`autoFocus\` focuses the first cell on mount
- Paste fills from the first digit; arrow keys and Backspace move between cells
- \`error\` / \`errorMessage\`, \`hintText\`, optional \`label\`, \`sublabel\`, \`helpIconHintText\`
- The forwarded ref points at the **first** input cell

## Accessibility
- Outer group uses \`role="group"\` with an \`aria-label\`; each cell has a descriptive \`aria-label\`
- \`aria-describedby\` links hint and error text when present
- \`required\`, \`aria-required\`, and \`aria-invalid\` are supported

## Usage

\`\`\`tsx
import { OTPInputV2 } from '@juspay/blend-design-system/...';

const [otp, setOtp] = useState('');

<OTPInputV2
  label="Verification code"
  length={6}
  value={otp}
  onChange={setOtp}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current OTP as a single string',
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        length: {
            control: { type: 'number', min: 1, max: 32 },
            description: 'Number of digit cells',
            table: { type: { summary: 'number' }, category: 'Core' },
        },
        label: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        sublabel: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        hintText: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconHintText: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        required: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        disabled: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'State' },
        },
        error: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        errorMessage: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Validation' },
        },
        autoFocus: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Behavior' },
        },
        name: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        form: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        onChange: {
            action: 'change',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OTPInputV2>

export const Default: Story = {
    render: function DefaultOTPInputV2(args) {
        const [value, setValue] = useState('')
        return (
            <OTPInputV2
                {...args}
                value={value}
                onChange={(v) => {
                    setValue(v)
                    args.onChange?.(v)
                }}
            />
        )
    },
    args: {
        label: 'Verification code',
        length: 6,
        hintText: 'Enter the 6-digit code sent to your device.',
    },
}

export const WithError: Story = {
    render: function WithErrorStory() {
        const [value, setValue] = useState('12')
        return (
            <OTPInputV2
                label="Verification code"
                length={6}
                value={value}
                onChange={setValue}
                error
                errorMessage="The code you entered is incorrect. Please try again."
                hintText="Codes expire after 10 minutes."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Error state with `error`, `errorMessage`, and hint.',
            },
        },
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        const [value] = useState('123456')
        return (
            <OTPInputV2
                label="Verification code"
                length={6}
                value={value}
                onChange={() => {}}
                disabled
                hintText="This field is disabled."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled OTP; value is mirrored from props while disabled.',
            },
        },
    },
}

export const LengthVariants: Story = {
    render: function LengthVariantsStory() {
        const [four, setFour] = useState('')
        const [six, setSix] = useState('')
        const [eight, setEight] = useState('')
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    maxWidth: 480,
                }}
            >
                <OTPInputV2
                    label="4 digits"
                    length={4}
                    value={four}
                    onChange={setFour}
                />
                <OTPInputV2
                    label="6 digits (default)"
                    length={6}
                    value={six}
                    onChange={setSix}
                />
                <OTPInputV2
                    label="8 digits"
                    length={8}
                    value={eight}
                    onChange={setEight}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Different `length` values (each group is an independent example).',
            },
        },
    },
}

export const Required: Story = {
    render: function RequiredStory() {
        const [value, setValue] = useState('')
        return (
            <OTPInputV2
                label="Security code"
                sublabel="Required to continue"
                length={6}
                value={value}
                onChange={setValue}
                required
                helpIconHintText="Use the code from your authenticator app."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Required field with sublabel and help hint on the label.',
            },
        },
    },
}

export const AutoFocus: Story = {
    render: function AutoFocusStory() {
        const [value, setValue] = useState('')
        return (
            <OTPInputV2
                label="Auto-focused first cell"
                length={6}
                value={value}
                onChange={setValue}
                autoFocus
                hintText="The first digit field receives focus on load."
            />
        )
    },
    parameters: {
        chromatic: {
            ...CHROMATIC_CONFIG,
            disableSnapshot: true,
        },
        docs: {
            description: {
                story: 'First cell focuses on mount (`autoFocus`). Chromatic snapshot disabled to avoid focus flake.',
            },
        },
    },
}
