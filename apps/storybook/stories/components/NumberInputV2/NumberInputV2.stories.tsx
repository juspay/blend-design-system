import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { NumberInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/NumberInputV2'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

/** Maps change events to `number | null` for controlled `value`. */
const parseNumberInputValue = (
    e: React.ChangeEvent<HTMLInputElement>
): number | null => {
    const { value } = e.target
    if (value === '') return null
    const n = Number(value)
    return Number.isNaN(n) ? null : n
}

const meta: Meta<typeof NumberInputV2> = {
    title: 'Components/Inputs/NumberInputV2',
    component: NumberInputV2,
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
Numeric input (V2) with responsive tokens, static or floating labels, min/max validation, stepper buttons, and \`forwardRef\` to the native \`<input>\`.

## Features
- **Value**: \`number | null\` (empty input → \`null\`)
- Sizes: \`sm\`, \`md\`, \`lg\` (\`InputSizeV2\`)
- Label with optional subtext; hint under field; optional help tooltip on label
- External error: \`error: { show, message? }\`; internal range errors while typing
- \`min\`, \`max\`, \`step\`; \`preventNegative\` clamps display and stepping
- \`forwardRef\` → underlying \`<input>\` for focus and form libraries

## Accessibility
- Native text input with \`role="spinbutton"\` and value-related ARIA attributes
- Labels associated via \`inputId\`; error/hint via \`aria-describedby\`
- Keyboard: Arrow Up/Down adjust value when steppers are enabled

\`\`\`tsx
import { NumberInputV2, InputSizeV2 } from '…';

<NumberInputV2
  label={{ text: 'Quantity' }}
  value={qty}
  onChange={(e) => setQty(parseNumberInputValue(e))}
  min={0}
  max={99}
  size={InputSizeV2.MD}
/>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        value: {
            control: false,
            description: 'Controlled numeric value (`null` when empty)',
            table: { type: { summary: 'number | null' }, category: 'Core' },
        },
        onChange: {
            action: 'changed',
            table: {
                type: {
                    summary: '(e: React.ChangeEvent<HTMLInputElement>) => void',
                },
                category: 'Events',
            },
        },
        min: {
            control: { type: 'number' },
            table: { type: { summary: 'number' }, category: 'Numeric' },
        },
        max: {
            control: { type: 'number' },
            table: { type: { summary: 'number' }, category: 'Numeric' },
        },
        step: {
            control: { type: 'number', min: 0.0001, step: 0.1 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
                category: 'Numeric',
            },
        },
        preventNegative: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Numeric' },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(InputSizeV2),
            table: {
                type: { summary: 'InputSizeV2' },
                defaultValue: { summary: 'md' },
                category: 'Appearance',
            },
        },
        label: {
            control: { type: 'object' },
            description: '{ text: string; subtext?: string }',
            table: { type: { summary: 'object' }, category: 'Labels' },
        },
        helpIconText: {
            control: { type: 'text' },
            description: 'Tooltip string for the label help icon',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        hintText: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        error: {
            control: { type: 'object' },
            description: '{ show: boolean; message?: string }',
            table: { type: { summary: 'object' }, category: 'Validation' },
        },
        required: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        disabled: {
            control: { type: 'boolean' },
            table: { type: { summary: 'boolean' }, category: 'State' },
        },
        placeholder: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        name: {
            control: { type: 'text' },
            table: { type: { summary: 'string' }, category: 'Core' },
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
type Story = StoryObj<typeof NumberInputV2>

export const Default: Story = {
    render: function DefaultNumberInputV2(args) {
        const [value, setValue] = useState<number | null>(null)
        return (
            <NumberInputV2
                {...args}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
            />
        )
    },
    args: {
        label: { text: 'Amount', subtext: '' },
        placeholder: '0',
        size: InputSizeV2.MD,
        disabled: false,
        required: false,
        error: { show: false, message: '' },
        step: 1,
    },
}

export const Sizes: Story = {
    render: function SizesStory() {
        const [values, setValues] = useState<{
            sm: number | null
            md: number | null
            lg: number | null
        }>({ sm: null, md: null, lg: null })
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    maxWidth: 400,
                }}
            >
                <NumberInputV2
                    label={{ text: 'Small', subtext: '' }}
                    placeholder="0"
                    size={InputSizeV2.SM}
                    value={values.sm}
                    onChange={(e) =>
                        setValues((p) => ({
                            ...p,
                            sm: parseNumberInputValue(e),
                        }))
                    }
                />
                <NumberInputV2
                    label={{ text: 'Medium', subtext: '' }}
                    placeholder="0"
                    size={InputSizeV2.MD}
                    value={values.md}
                    onChange={(e) =>
                        setValues((p) => ({
                            ...p,
                            md: parseNumberInputValue(e),
                        }))
                    }
                />
                <NumberInputV2
                    label={{ text: 'Large', subtext: '' }}
                    placeholder="0"
                    size={InputSizeV2.LG}
                    value={values.lg}
                    onChange={(e) =>
                        setValues((p) => ({
                            ...p,
                            lg: parseNumberInputValue(e),
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'All three `InputSizeV2` sizes.',
            },
        },
    },
}

export const WithMinMax: Story = {
    render: function WithMinMaxStory() {
        const [value, setValue] = useState<number | null>(25)
        return (
            <NumberInputV2
                label={{ text: 'Percentage', subtext: '0–100' }}
                placeholder="0"
                min={0}
                max={100}
                step={5}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
                hintText="Enter a value between 0 and 100."
            />
        )
    },
}

export const WithError: Story = {
    render: function WithErrorStory() {
        const [value, setValue] = useState<number | null>(null)
        return (
            <NumberInputV2
                label={{ text: 'Score', subtext: '' }}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
                error={{
                    show: true,
                    message: 'Please enter a valid score.',
                }}
            />
        )
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        const [value] = useState<number | null>(42)
        return (
            <NumberInputV2
                label={{ text: 'Read-only value', subtext: '' }}
                value={value}
                onChange={() => {}}
                disabled
            />
        )
    },
}

export const PreventNegative: Story = {
    render: function PreventNegativeStory() {
        const [value, setValue] = useState<number | null>(0)
        return (
            <NumberInputV2
                label={{ text: 'Credits', subtext: 'Non-negative only' }}
                placeholder="0"
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
                preventNegative
                hintText="Negative values are not allowed."
            />
        )
    },
}

export const WithHintAndHelp: Story = {
    render: function WithHintAndHelpStory() {
        const [value, setValue] = useState<number | null>(null)
        return (
            <NumberInputV2
                label={{
                    text: 'Tax rate',
                    subtext: 'Annual',
                }}
                helpIconText="Applied to taxable income for this period."
                hintText="Use a decimal between 0 and 1 (e.g. 0.25 for 25%)."
                placeholder="0"
                min={0}
                max={1}
                step={0.01}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
            />
        )
    },
}

export const WithForwardedRef: Story = {
    render: function WithForwardedRefStory() {
        const [value, setValue] = useState<number | null>(null)
        const inputRef = React.useRef<HTMLInputElement>(null)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <NumberInputV2
                    ref={inputRef}
                    label={{ text: 'Focus target', subtext: '' }}
                    value={value}
                    onChange={(e) => setValue(parseNumberInputValue(e))}
                />
                <button type="button" onClick={() => inputRef.current?.focus()}>
                    Focus input
                </button>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`ref` is attached to the underlying `<input>` element.',
            },
        },
    },
}
