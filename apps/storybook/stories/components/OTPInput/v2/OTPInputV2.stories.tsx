import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { OTPInputV2 } from '../../../../../../packages/blend/lib/components/InputsV2/OTPInputV2'

const noop = (): void => {}

const stack = (maxWidth = 480) =>
    ({
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth,
    }) as const

const visualGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24,
    alignItems: 'start',
} as const

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
- Native \`required\` on each cell when \`required\` is set (form validation)

## Accessibility
- Outer group uses \`role="group"\` with an \`aria-label\`; each cell has a descriptive \`aria-label\`
- \`aria-describedby\` links hint and error text when present
- \`required\`, \`aria-required\`, \`aria-invalid\`, and native \`required\` on inputs

## Story groups
- **Visual**: static states for Chromatic / design review
- **Interactive**: keyboard flow with an automated \`play\` test
- **Accessibility**: reference layout for manual and addon checks

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

// —— Core (controls) ————————————————————————————————————————————

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

// —— Visual (Chromatic / static variants) ————————————————————————

/** Representative states for visual regression and design review. */
export const VisualStates: Story = {
    render: function VisualStatesStory() {
        return (
            <div style={visualGrid}>
                <OTPInputV2 label="Empty" length={6} value="" onChange={noop} />
                <OTPInputV2
                    label="Partial"
                    length={6}
                    value="12"
                    onChange={noop}
                />
                <OTPInputV2
                    label="Complete"
                    length={6}
                    value="123456"
                    onChange={noop}
                />
                <OTPInputV2
                    label="Required"
                    length={6}
                    value=""
                    onChange={noop}
                    required
                    hintText="All digits required."
                />
                <OTPInputV2
                    label="Error"
                    length={6}
                    value="12"
                    onChange={noop}
                    error
                    errorMessage="Invalid code. Try again."
                    hintText="Codes expire after 10 minutes."
                />
                <OTPInputV2
                    label="Disabled"
                    length={6}
                    value="654321"
                    onChange={noop}
                    disabled
                    hintText="Read-only."
                />
            </div>
        )
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Static snapshot of common states: empty, partial, complete, required, error, disabled.',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

// —— Variants ————————————————————————————————————————————————————

export const LengthVariants: Story = {
    render: function LengthVariantsStory() {
        const [four, setFour] = useState('')
        const [six, setSix] = useState('')
        const [eight, setEight] = useState('')
        return (
            <div style={stack()}>
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
                story: 'Different `length` values (each row is independent).',
            },
        },
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

// —— Interactive ————————————————————————————————————————————————

/** Typing advances focus; play test types two digits and asserts values. */
export const InteractiveTyping: Story = {
    render: function InteractiveTypingStory() {
        const [value, setValue] = useState('')
        return (
            <div style={stack(480)}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 13,
                        color: 'var(--color-text-muted, #64748b)',
                    }}
                >
                    Type digits — focus moves to the next cell. Use{' '}
                    <strong>Backspace</strong> on an empty cell to move back.{' '}
                    <strong>Arrow Left</strong> / <strong>Arrow Right</strong>{' '}
                    move between cells.
                </p>
                <OTPInputV2
                    id="interactive-otp-typing"
                    label="Verification code"
                    length={4}
                    value={value}
                    onChange={setValue}
                    hintText="Joined value updates as you type."
                />
                <p
                    aria-live="polite"
                    style={{ margin: 0, fontSize: 13, fontWeight: 600 }}
                >
                    Value: &quot;{value}&quot;
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Manual try: type digits and use arrows / Backspace. The interaction test types `1` and `2` into the first two cells.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const cells = canvas.getAllByRole('textbox')
        await userEvent.click(cells[0]!)
        await userEvent.keyboard('1')
        await expect(cells[0]).toHaveValue('1')
        await userEvent.keyboard('2')
        await expect(cells[1]).toHaveValue('2')
    },
}

// —— Accessibility (reference) —————————————————————————————————————

export const Accessibility: Story = {
    render: function AccessibilityStory() {
        const [code, setCode] = useState('')
        const [err, setErr] = useState('')
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    padding: 24,
                    maxWidth: 560,
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Label, required, hint
                    </h3>
                    <OTPInputV2
                        label="Authenticator code"
                        sublabel="6 digits"
                        length={6}
                        value={code}
                        onChange={setCode}
                        required
                        hintText="From your app or SMS."
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Error
                    </h3>
                    <OTPInputV2
                        label="Recovery code"
                        length={6}
                        value={err}
                        onChange={setErr}
                        error
                        errorMessage="That code does not match our records."
                        hintText="You can request a new code."
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: 12,
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        Disabled
                    </h3>
                    <OTPInputV2
                        label="Verified"
                        length={6}
                        value="999888"
                        onChange={noop}
                        disabled
                        hintText="Not editable."
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Reference layout for accessibility review of OTPInputV2:

- **Group**: \`role="group"\` and \`aria-label\` combine label + sublabel + required
- **Cells**: each input has \`aria-label\` (digit index), \`aria-required\`, \`aria-invalid\`, native \`required\` when applicable
- **Hints & errors**: linked with \`aria-describedby\` on each cell
- **Keyboard**: digits, arrows, Backspace, paste

**Verification**
1. Open the **Accessibility** addon — no violations for these examples.
2. Navigate with **Tab** through cells; confirm focus order and visible focus ring.
3. Use a screen reader to verify group name, per-cell labels, hint, and error announcements.
`,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
