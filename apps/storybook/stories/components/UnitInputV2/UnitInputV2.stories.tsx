import type { Meta, StoryObj as StorybookStoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Weight,
    DollarSign,
    Search,
    Check,
    AlertCircle,
    X,
    Lock,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider, Theme } from '@juspay/blend-design-system'
import { UnitInputV2 } from '../../../../../packages/blend/lib/components/InputsV2/UnitInputV2'
import { UnitInputV2Position } from '../../../../../packages/blend/lib/components/InputsV2/UnitInputV2/UnitInputV2.types'
import { InputSizeV2 } from '../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

const parseOptionalNumber = (
    e: React.ChangeEvent<HTMLInputElement>
): number | undefined => {
    const raw = e.target.value.trim()
    if (raw === '' || raw === '-') return undefined
    const n = Number(raw)
    return Number.isNaN(n) ? undefined : n
}

const meta: Meta<typeof UnitInputV2> = {
    title: 'Components/Inputs/UnitInputV2',
    component: UnitInputV2,
    decorators: [
        (RenderStory) => (
            <ThemeProvider>
                <RenderStory />
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
A numeric input (V2) with a **unit** label on the left or right, responsive tokens, optional \`min\` / \`max\` / \`step\`, footer hint and error text, and optional **slots** (\`ReactNode\`).

## Features
- Three sizes: Small (\`sm\`), Medium (\`md\`), Large (\`lg\`)
- \`unit\` + \`unitPosition\` (\`left\` | \`right\`)
- Controlled \`value: number | undefined\` and \`onChange\`
- \`label\`, \`sublabel\`, \`hintText\`, \`helpIconHintText\`
- \`error\` + \`errorMessage\`; values outside \`min\`/\`max\` also surface a range message
- \`required\`, \`disabled\`
- Arrow keys adjust by \`step\` (when within bounds)
- Responsive: on small screens with large size, floating label behavior applies

## Accessibility
- Native \`<input>\` with labels linked via \`id\`; \`aria-invalid\` when invalid
- Error and hint text in the footer with appropriate roles / ids where implemented
- **WCAG target**: 2.1 Level AA

**Verification:** Storybook a11y panel; keyboard Tab / arrow keys; screen reader for labels and errors.

## Usage

\`\`\`tsx
import { UnitInputV2, UnitInputV2Position, InputSizeV2 } from '@juspay/blend-design-system/...';

const [kg, setKg] = useState<number | undefined>(72.5);

<UnitInputV2
  label="Weight"
  unit="kg"
  unitPosition={UnitInputV2Position.RIGHT}
  value={kg}
  onChange={(e) => {
    const v = e.target.value.trim();
    setKg(v === '' ? undefined : Number(v));
  }}
  min={0}
  max={500}
  step={0.1}
  size={InputSizeV2.MD}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        unit: {
            control: { type: 'text' },
            description: 'Unit label (e.g. kg, $, %)',
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        unitPosition: {
            control: { type: 'select' },
            options: Object.values(UnitInputV2Position),
            description: 'Whether the unit appears on the left or right',
            table: {
                type: { summary: 'UnitInputV2Position' },
                category: 'Appearance',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Primary label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label below the main label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder when empty',
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(InputSizeV2),
            description: 'Size variant',
            table: {
                type: { summary: 'InputSizeV2' },
                defaultValue: { summary: 'md' },
                category: 'Appearance',
            },
        },
        step: {
            control: { type: 'number' },
            description: 'Step for arrow keys and incremental edits',
            table: { type: { summary: 'number' }, category: 'Constraints' },
        },
        min: {
            control: { type: 'number' },
            description: 'Minimum allowed value',
            table: { type: { summary: 'number' }, category: 'Constraints' },
        },
        max: {
            control: { type: 'number' },
            description: 'Maximum allowed value',
            table: { type: { summary: 'number' }, category: 'Constraints' },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Required field indicator',
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
            control: { type: 'boolean' },
            description:
                'Shows error styling and message when combined with errorMessage',
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Error text in the footer when error is true',
            table: { type: { summary: 'string' }, category: 'Validation' },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint below the field',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Help content shown from the label help icon',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        leftSlot: {
            control: false,
            description: 'Optional ReactNode rendered in the left inset',
            table: { type: { summary: 'ReactNode' }, category: 'Slots' },
        },
        rightSlot: {
            control: false,
            description: 'Optional ReactNode rendered in the right inset',
            table: { type: { summary: 'ReactNode' }, category: 'Slots' },
        },
        onChange: {
            action: 'changed',
            description: 'Change event with string value in event.target',
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
type UnitInputV2Story = StorybookStoryObj<typeof UnitInputV2>

export const Default: UnitInputV2Story = {
    render: function DefaultUnitInputV2(args) {
        const { value: argsValue, onChange: argsOnChange, ...fieldArgs } = args
        void argsValue
        void argsOnChange
        const [value, setValue] = useState<number | undefined>(42)
        return (
            <div style={{ maxWidth: 400 }}>
                <UnitInputV2
                    {...fieldArgs}
                    value={value}
                    onChange={(e) => setValue(parseOptionalNumber(e))}
                />
            </div>
        )
    },
    args: {
        label: 'Default unit input',
        placeholder: 'Enter a number',
        unit: 'kg',
        unitPosition: UnitInputV2Position.RIGHT,
        size: InputSizeV2.SM,
        disabled: false,
        required: false,
        error: false,
        hintText: 'Use arrow keys to adjust when step is set.',
    },
}

export const Sizes: UnitInputV2Story = {
    render: function SizesStory() {
        const [values, setValues] = useState<{
            sm: number | undefined
            md: number | undefined
            lg: number | undefined
        }>({ sm: 10, md: 20, lg: 30 })
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInputV2
                    label="Small"
                    placeholder="Small"
                    unit="%"
                    size={InputSizeV2.SM}
                    value={values.sm}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            sm: parseOptionalNumber(e),
                        }))
                    }
                />
                <UnitInputV2
                    label="Medium"
                    placeholder="Medium"
                    unit="%"
                    size={InputSizeV2.MD}
                    value={values.md}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            md: parseOptionalNumber(e),
                        }))
                    }
                />
                <UnitInputV2
                    label="Large"
                    placeholder="Large"
                    unit="%"
                    size={InputSizeV2.LG}
                    value={values.lg}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            lg: parseOptionalNumber(e),
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInputV2 in Small, Medium, and Large sizes.',
            },
        },
    },
}

export const WithSlots: UnitInputV2Story = {
    render: function WithSlotsStory() {
        const [values, setValues] = useState({
            weight: 72.5 as number | undefined,
            price: 99 as number | undefined,
            qty: 0 as number | undefined,
        })
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInputV2
                    label="Weight"
                    placeholder="0.0"
                    unit="kg"
                    value={values.weight}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            weight: parseOptionalNumber(e),
                        }))
                    }
                    leftSlot={<Weight size={16} aria-hidden />}
                    size={InputSizeV2.MD}
                    step={0.1}
                />
                <UnitInputV2
                    label="Price"
                    placeholder="0.00"
                    unit="$"
                    unitPosition={UnitInputV2Position.LEFT}
                    value={values.price}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            price: parseOptionalNumber(e),
                        }))
                    }
                    leftSlot={<DollarSign size={16} aria-hidden />}
                    size={InputSizeV2.MD}
                    step={0.01}
                    min={0}
                />
                <UnitInputV2
                    label="Quantity"
                    placeholder="0"
                    unit="pcs"
                    value={values.qty}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            qty: parseOptionalNumber(e),
                        }))
                    }
                    leftSlot={<Search size={16} aria-hidden />}
                    rightSlot={
                        values.qty !== undefined && values.qty > 0 ? (
                            <Check
                                size={16}
                                aria-hidden
                                style={{ color: 'green' }}
                            />
                        ) : undefined
                    }
                    size={InputSizeV2.MD}
                    min={0}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInputV2 with left/right slots (icons and optional status icon).',
            },
        },
    },
}

export const ErrorStates: UnitInputV2Story = {
    render: function ErrorStatesStory() {
        const [values, setValues] = useState({
            required: undefined as number | undefined,
            overMax: 150,
            ok: 72,
        })
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInputV2
                    label="Required value"
                    placeholder="Enter amount"
                    unit="units"
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: parseOptionalNumber(e),
                        }))
                    }
                    required
                    error={values.required === undefined}
                    errorMessage={
                        values.required === undefined
                            ? 'A value is required'
                            : undefined
                    }
                />
                <UnitInputV2
                    label="Over maximum (component range hint)"
                    unit="bpm"
                    value={values.overMax}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            overMax: parseOptionalNumber(e) ?? prev.overMax,
                        }))
                    }
                    min={40}
                    max={120}
                    step={1}
                    rightSlot={
                        <AlertCircle
                            size={16}
                            style={{ color: 'var(--color-error, red)' }}
                            aria-hidden
                        />
                    }
                />
                <UnitInputV2
                    label="In range"
                    unit="kg"
                    value={values.ok}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            ok: parseOptionalNumber(e) ?? prev.ok,
                        }))
                    }
                    min={0}
                    max={200}
                    rightSlot={
                        <Check
                            size={16}
                            style={{ color: 'green' }}
                            aria-hidden
                        />
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Required empty, value outside min/max (range message), and valid in-range value.',
            },
        },
    },
}

export const DisabledState: UnitInputV2Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <UnitInputV2
                label="Disabled empty"
                placeholder="Not editable"
                unit="m"
                value={undefined}
                onChange={() => {}}
                disabled
            />
            <UnitInputV2
                label="Disabled with value"
                unit="V"
                value={12}
                onChange={() => {}}
                leftSlot={<Lock size={16} aria-hidden />}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'UnitInputV2 disabled: empty and with value.',
            },
        },
    },
}

export const WithLabelsAndHints: UnitInputV2Story = {
    render: function WithLabelsAndHintsStory() {
        const [value, setValue] = useState<number | undefined>(1000)
        return (
            <div style={{ maxWidth: 440 }}>
                <UnitInputV2
                    label="Daily budget"
                    sublabel="Before taxes"
                    hintText="Whole numbers only in this example"
                    helpIconHintText="Used to estimate spend limits for the project"
                    placeholder="0"
                    unit="$"
                    unitPosition={UnitInputV2Position.LEFT}
                    value={value}
                    onChange={(e) => setValue(parseOptionalNumber(e))}
                    leftSlot={<DollarSign size={16} aria-hidden />}
                    required
                    size={InputSizeV2.MD}
                    min={0}
                    step={1}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Label, sublabel, hint, and help icon text.',
            },
        },
    },
}

export const Accessibility: UnitInputV2Story = {
    render: function AccessibilityStory() {
        const [amount, setAmount] = useState<number | undefined>(50)
        const [discount, setDiscount] = useState<number | undefined>(110)
        const [pin, setPin] = useState<number | undefined>(undefined)
        const [searchQty, setSearchQty] = useState<number | undefined>(
            undefined
        )
        const discountError =
            discount !== undefined && discount > 100
                ? 'Discount cannot exceed 100%'
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
                        Labels, required, and hints
                    </h3>
                    <UnitInputV2
                        label="Order total"
                        sublabel="Including fees"
                        hintText="Enter a number between 0 and 100"
                        placeholder="0"
                        unit="$"
                        unitPosition={UnitInputV2Position.LEFT}
                        value={amount}
                        onChange={(e) => setAmount(parseOptionalNumber(e))}
                        required
                        min={0}
                        max={100}
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
                        Validation message
                    </h3>
                    <UnitInputV2
                        label="Discount %"
                        unit="%"
                        value={discount}
                        onChange={(e) => setDiscount(parseOptionalNumber(e))}
                        error={!!discountError}
                        errorMessage={discountError || undefined}
                        max={100}
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
                        Disabled
                    </h3>
                    <UnitInputV2
                        label="Read-only quantity"
                        unit="pcs"
                        value={42}
                        onChange={() => {}}
                        disabled
                        hintText="Disabled fields are not editable."
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
                        Keyboard (Tab and arrow keys)
                    </h3>
                    <UnitInputV2
                        label="PIN code (numeric)"
                        placeholder="••••"
                        unit="digits"
                        value={pin}
                        onChange={(e) => setPin(parseOptionalNumber(e))}
                        hintText="Use Tab to focus; ArrowUp/ArrowDown adjust by step"
                        required
                        min={0}
                        max={9999}
                        step={1}
                        leftSlot={<Lock size={16} aria-hidden />}
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
                    <UnitInputV2
                        label="Stock to reserve"
                        placeholder="0"
                        unit="units"
                        value={searchQty}
                        onChange={(e) => setSearchQty(parseOptionalNumber(e))}
                        rightSlot={
                            <button
                                type="button"
                                onClick={() => setSearchQty(undefined)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                }}
                                aria-label="Clear quantity"
                            >
                                <X size={16} />
                            </button>
                        }
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples for UnitInputV2:

- **Labels and required**: Associated via \`id\` and required indicator
- **Errors**: Range and \`errorMessage\` appear in the footer; \`aria-invalid\` when invalid
- **Disabled**: Not editable
- **Keyboard**: Tab to focus; arrow keys change value by \`step\` within bounds
- **Interactive slots**: Use \`aria-label\` on buttons in slots (e.g. clear)

**Verification:** Storybook a11y panel; VoiceOver / NVDA; keyboard-only navigation.
                `,
            },
        },
        a11y: getA11yConfig('form'),
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
    },
}

export const DarkTheme: UnitInputV2Story = {
    decorators: [
        (RenderStory) => (
            <ThemeProvider theme={Theme.DARK}>
                <div
                    style={{
                        padding: 24,
                        background: '#0e121b',
                        borderRadius: 12,
                    }}
                >
                    <RenderStory />
                </div>
            </ThemeProvider>
        ),
    ],
    render: function DarkStory() {
        const [value, setValue] = useState<number | undefined>(88)
        return (
            <div style={{ maxWidth: 400 }}>
                <UnitInputV2
                    label="Power draw"
                    unit="W"
                    hintText="Uses UNIT_INPUT_V2 dark tokens when theme is dark."
                    value={value}
                    onChange={(e) => setValue(parseOptionalNumber(e))}
                    size={InputSizeV2.MD}
                    min={0}
                    max={1000}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Preview with `ThemeProvider` set to dark (nested inside the default light provider).',
            },
        },
    },
}
