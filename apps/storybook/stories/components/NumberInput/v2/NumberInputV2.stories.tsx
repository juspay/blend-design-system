import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { Ruler, Weight } from 'lucide-react'
import {
    NumberInputV2,
    NumberInputV2Direction,
} from '../../../../../../packages/blend/lib/components/InputsV2/NumberInputV2'
import { InputSizeV2 } from '../../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

/** Maps change events to `number | null` for controlled `value`. */
const parseNumberInputValue = (
    e: React.ChangeEvent<HTMLInputElement>
): number | null => {
    const { value } = e.target
    if (value === '') return null
    const n = Number(value)
    return Number.isNaN(n) ? null : n
}

const noop = (): void => {}

const stack = (maxWidth = 480) =>
    ({
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth,
    }) as const

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
Numeric input (V2) with responsive tokens, static or floating labels (small viewport + large size), min/max validation, stepper buttons, and \`forwardRef\` to the native \`<input>\`.

## Features
- **Value**: \`number | null\` (empty input → \`null\`)
- Sizes: \`sm\`, \`md\`, \`lg\` (\`InputSizeV2\`)
- Label with optional subtext; hint under field; optional help tooltip on label
- External error: \`error: { show, message? }\`; internal range messages when value is outside \`min\` / \`max\`
- \`min\`, \`max\`, \`step\`; \`preventNegative\` normalizes display and stepping
- Optional \`unit\` (e.g. \`kg\`, \`%\`) — unit strip; steppers show when \`unit\` is omitted or empty (whitespace-only counts as empty)
- \`unitDirection\`: \`left\` | \`right\` — where the unit strip sits (default \`right\`)
- \`slot={{ left, right }}\` — optional adornments (e.g. icons) beside the field **when a \`unit\` is set**; padding is measured so text does not overlap
- \`forwardRef\` → underlying \`<input>\` for focus and form libraries

## Accessibility

- Uses \`role="spinbutton"\` with \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`, \`aria-required\`, \`aria-invalid\` where applicable
- Label associated via \`id\`; hint and error linked through \`aria-describedby\`
- **Keyboard**: **Arrow Up** / **Arrow Down** adjust the value when the field is enabled and within stepper bounds (same as v1)
- **WCAG target**: 2.1 Level AA (supports 2.2)

**Verification**
- **Storybook a11y addon**: Accessibility panel — expect no A/AA violations for these stories
- **Manual**: Keyboard-only navigation; VoiceOver / NVDA for label, value, hints, and errors; verify stepper buttons have clear affordances

\`\`\`tsx
import { NumberInputV2, InputSizeV2 } from '…';

<NumberInputV2
  label={{ text: 'Quantity' }}
  value={qty}
  onChange={(e) => setQty(parseNumberInputValue(e))}
  min={0}
  max={99}
  unit="kg"
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
        unit: {
            control: { type: 'text' },
            description:
                'Unit label (e.g. kg, %). When set, steppers are hidden and the unit strip is shown. Required for `slot` adornments to render.',
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        unitDirection: {
            control: { type: 'select' },
            options: Object.values(NumberInputV2Direction),
            description:
                'Whether the unit strip is on the left or right of the value.',
            table: {
                type: { summary: 'NumberInputV2Direction' },
                defaultValue: { summary: 'right' },
                category: 'Content',
            },
        },
        slot: {
            control: false,
            description:
                '{ left?: ReactNode; right?: ReactNode } — optional icons/content; only shown when `unit` is non-empty.',
            table: { type: { summary: 'object' }, category: 'Content' },
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

// —— Core (controls) ——————————————————————————————————————————

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
        unit: '',
        unitDirection: NumberInputV2Direction.RIGHT,
    },
}

// —— Visual (Chromatic / static variants) ——————————————————————

/** Representative states for visual regression and design review. */
export const VisualStates: Story = {
    render: function VisualStatesStory() {
        return (
            <div className="grid gap-6 items-start grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                <NumberInputV2
                    label={{ text: 'Empty', subtext: '' }}
                    placeholder="0"
                    value={null}
                    onChange={noop}
                />
                <NumberInputV2
                    label={{ text: 'With value', subtext: '' }}
                    placeholder="0"
                    value={42}
                    onChange={noop}
                />
                <NumberInputV2
                    label={{ text: 'Required', subtext: '' }}
                    placeholder="0"
                    value={null}
                    onChange={noop}
                    required
                />
                <NumberInputV2
                    label={{ text: 'Error', subtext: '' }}
                    value={null}
                    onChange={noop}
                    error={{
                        show: true,
                        message: 'Please enter a number.',
                    }}
                />
                <NumberInputV2
                    label={{ text: 'Disabled', subtext: '' }}
                    value={7}
                    onChange={noop}
                    disabled
                />
                <NumberInputV2
                    label={{ text: 'With unit', subtext: '' }}
                    placeholder="0"
                    value={12}
                    onChange={noop}
                    unit="kg"
                />
            </div>
        )
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Static snapshot of common states (empty, filled, required, error, disabled, with unit suffix).',
            },
        },
        chromatic: { ...CHROMATIC_CONFIG, delay: 400 },
    },
}

// —— Variants ———————————————————————————————————————————————————

export const Sizes: Story = {
    render: function SizesStory() {
        const [values, setValues] = useState<{
            sm: number | null
            md: number | null
            lg: number | null
        }>({ sm: null, md: null, lg: null })
        return (
            <div className="flex flex-col gap-5 max-w-105">
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

export const WithUnit: Story = {
    render: function WithUnitStory() {
        const [value, setValue] = useState<number | null>(2.5)
        return (
            <NumberInputV2
                label={{ text: 'Weight', subtext: 'Shippable mass' }}
                placeholder="0"
                min={0}
                step={0.1}
                unit="kg"
                unitDirection={NumberInputV2Direction.RIGHT}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
                hintText="Unit strip on the right by default; steppers are hidden while a unit is shown."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Use `unit` for dimensions, currency symbols, or other short suffixes. Keyboard stepping (arrows) still applies when the input is focused.',
            },
        },
    },
}

/** Unit strip on the leading edge (`unitDirection="left"`). */
export const UnitOnLeft: Story = {
    render: function UnitOnLeftStory() {
        const [value, setValue] = useState<number | null>(100)
        return (
            <NumberInputV2
                label={{ text: 'Length', subtext: 'Metric' }}
                placeholder="0"
                min={0}
                step={1}
                unit="cm"
                unitDirection={NumberInputV2Direction.LEFT}
                value={value}
                onChange={(e) => setValue(parseNumberInputValue(e))}
                hintText="Unit chip is rendered before the value; input padding adjusts automatically."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Set `unitDirection` to `left` when the unit should lead the field (e.g. currency or fixed unit on the start edge).',
            },
        },
    },
}

/** `slot.left` / `slot.right` with a non-empty `unit` (adornments require `unit`). */
export const WithSlots: Story = {
    render: function WithSlotsStory() {
        const [value, setValue] = useState<number | null>(72)
        return (
            <div style={stack(480)}>
                <NumberInputV2
                    label={{ text: 'Measurement', subtext: 'Icons + unit' }}
                    placeholder="0"
                    min={0}
                    step={1}
                    unit="kg"
                    unitDirection={NumberInputV2Direction.RIGHT}
                    slot={{
                        left: <Weight size={16} aria-hidden />,
                        right: <Ruler size={16} aria-hidden />,
                    }}
                    value={value}
                    onChange={(e) => setValue(parseNumberInputValue(e))}
                    hintText="Slots sit at the inner edges of the field when a unit is present; they do not block typing."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`slot` accepts React nodes (often icons). Slots render only when `unit` is set. Use `aria-hidden` on decorative icons.',
            },
        },
    },
}

// —— Validation & hints ———————————————————————————————————————————

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
                unit="%"
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
                onChange={noop}
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

// —— Interactive (keyboard + stepper) ————————————————————————————

/** Live value + interaction test: Arrow Up/Down and stepper buttons. */
export const InteractiveKeyboard: Story = {
    render: function InteractiveKeyboardStory() {
        const [value, setValue] = useState<number | null>(10)
        return (
            <div className="flex flex-col gap-5 max-w-120">
                <p className="text-[13px] text-[#64748b] m-0">
                    Focus the field and use <strong>Arrow Up</strong> /{' '}
                    <strong>Arrow Down</strong>, or the stepper buttons. Current
                    value:{' '}
                    <output
                        htmlFor="interactive-number-input"
                        className="font-semibold text-inherit"
                    >
                        {value === null ? 'null' : value}
                    </output>
                </p>
                <NumberInputV2
                    id="interactive-number-input"
                    label={{ text: 'Adjustable', subtext: '0–100, step 1' }}
                    placeholder="0"
                    min={0}
                    max={100}
                    step={1}
                    value={value}
                    onChange={(e) => setValue(parseNumberInputValue(e))}
                    hintText="Stepper mirrors keyboard behavior."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Use keyboard arrows or the built-in steppers. The interaction test focuses the input and presses Arrow Up once.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('spinbutton')
        await userEvent.click(input)
        await userEvent.keyboard('{ArrowUp}')
        await expect(input).toHaveValue('11')
    },
}

export const WithForwardedRef: Story = {
    render: function WithForwardedRefStory() {
        const [value, setValue] = useState<number | null>(null)
        const inputRef = React.useRef<HTMLInputElement>(null)
        return (
            <div className="flex flex-col gap-3">
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

// —— Accessibility (reference) ——————————————————————————————————

export const Accessibility: Story = {
    render: function AccessibilityStory() {
        const [qty, setQty] = useState<number | null>(null)
        const [score, setScore] = useState<number | null>(null)
        const [rangeDemo, setRangeDemo] = useState<number | null>(150)
        return (
            <div className="flex flex-col gap-6 p-6 max-w-140">
                <section>
                    <h3 className="mb-3 text-base font-semibold">
                        Label, required, and hint
                    </h3>
                    <NumberInputV2
                        label={{ text: 'Quantity', subtext: 'Units to ship' }}
                        hintText="Whole numbers only."
                        placeholder="0"
                        value={qty}
                        onChange={(e) => setQty(parseNumberInputValue(e))}
                        required
                    />
                </section>

                <section>
                    <h3 className="mb-3 text-base font-semibold">
                        External error
                    </h3>
                    <NumberInputV2
                        label={{ text: 'Score', subtext: '' }}
                        value={score}
                        onChange={(e) => setScore(parseNumberInputValue(e))}
                        error={{
                            show: true,
                            message: 'Enter a score between 0 and 10.',
                        }}
                    />
                </section>

                <section>
                    <h3 className="mb-3 text-base font-semibold">
                        Range validation (built-in message)
                    </h3>
                    <NumberInputV2
                        label={{ text: 'Clamped range', subtext: '0–100' }}
                        min={0}
                        max={100}
                        value={rangeDemo}
                        onChange={(e) => setRangeDemo(parseNumberInputValue(e))}
                        hintText="Try a value outside 0–100 to hear the range message."
                    />
                </section>

                <section>
                    <h3 className="mb-3 text-base font-semibold">Disabled</h3>
                    <NumberInputV2
                        label={{ text: 'Locked field', subtext: '' }}
                        value={99}
                        onChange={noop}
                        disabled
                        hintText="Not focusable when disabled."
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Reference layout for accessibility review of NumberInputV2:

- **Labels**: Associated with the input via \`id\`; subtext and required asterisk where applicable
- **Hints & errors**: Linked with \`aria-describedby\`; invalid state uses \`aria-invalid\`
- **Spinbutton**: \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\` reflect numeric bounds when set
- **Keyboard**: Arrow Up/Down change the value when steppers are not disabled
- **Disabled**: Removed from tab order and not editable

**Verification**
1. Open the **Accessibility** addon — no violations for these examples.
2. Navigate with **Tab** only; confirm focus order and visible focus.
3. Use a screen reader to verify label, value, hint, and error announcements.
`,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}
