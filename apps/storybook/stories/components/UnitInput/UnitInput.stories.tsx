import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import {
    UnitInput,
    UnitInputSize,
    UnitPosition,
} from '@juspay/blend-design-system'
import { DollarSign, Percent, Clock, Weight } from 'lucide-react'

const meta: Meta<typeof UnitInput> = {
    title: 'Components/Inputs/UnitInput',
    component: UnitInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A specialized numeric input component with unit display for values that require measurement units like currency, percentage, weight, etc.

## Features
- Two sizes (Medium, Large)
- Unit display with configurable position (left or right)
- Numeric validation with step controls
- Min/max value constraints
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Left and right slot content for icons and actions
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Usage

\`\`\`tsx
import { UnitInput, UnitInputSize, UnitPosition } from '@juspay/blend-design-system';

<UnitInput
  label="Price"
  unit="USD"
  unitPosition={UnitPosition.LEFT}
  value={price}
  onChange={(e) => setPrice(parseFloat(e.target.value))}
  min={0}
  step={0.01}
  size={UnitInputSize.MEDIUM}
  required
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'number' },
            description: 'Current numeric value of the input',
            table: {
                type: { summary: 'number | undefined' },
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
        unit: {
            control: { type: 'text' },
            description: 'Unit text to display (e.g., "USD", "%", "kg")',
            table: {
                type: { summary: 'string' },
                category: 'Unit',
            },
        },
        unitPosition: {
            control: { type: 'select' },
            options: Object.values(UnitPosition),
            description: 'Position of the unit relative to the input',
            table: {
                type: { summary: 'UnitPosition' },
                defaultValue: { summary: 'UnitPosition.RIGHT' },
                category: 'Unit',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(UnitInputSize),
            description: 'Size variant of the input',
            table: {
                type: { summary: 'UnitInputSize' },
                defaultValue: { summary: 'UnitInputSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        step: {
            control: { type: 'number', min: 0.01, step: 0.01 },
            description: 'Step value for increment/decrement',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
                category: 'Numeric',
            },
        },
        min: {
            control: { type: 'number' },
            description: 'Minimum allowed value',
            table: {
                type: { summary: 'number' },
                category: 'Numeric',
            },
        },
        max: {
            control: { type: 'number' },
            description: 'Maximum allowed value',
            table: {
                type: { summary: 'number' },
                category: 'Numeric',
            },
        },
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
        required: {
            control: { type: 'boolean' },
            description: 'Whether the input is required (shows asterisk)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
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
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when input is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
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
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UnitInput>

// Default story
export const Default: Story = {
    render: function DefaultUnitInput(args) {
        const [value, setValue] = useState<number | undefined>(undefined)

        return (
            <UnitInput
                {...args}
                value={value}
                onChange={(e) =>
                    setValue(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
            />
        )
    },
    args: {
        label: 'Default Unit Input',
        unit: 'USD',
        unitPosition: UnitPosition.RIGHT,
        placeholder: 'Enter amount',
        size: UnitInputSize.MEDIUM,
        disabled: false,
        required: false,
        error: false,
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [values, setValues] = useState({
            medium: undefined as number | undefined,
            large: undefined as number | undefined,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInput
                    label="Medium Size"
                    unit="kg"
                    size={UnitInputSize.MEDIUM}
                    value={values.medium}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="Enter weight"
                />
                <UnitInput
                    label="Large Size"
                    unit="kg"
                    size={UnitInputSize.LARGE}
                    value={values.large}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            large: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="Enter weight"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInput in different sizes: Medium and Large.',
            },
        },
    },
}

// Unit positions
export const UnitPositions: Story = {
    render: () => {
        const [values, setValues] = useState({
            left: undefined as number | undefined,
            right: undefined as number | undefined,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInput
                    label="Unit on Left"
                    unit="$"
                    unitPosition={UnitPosition.LEFT}
                    value={values.left}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            left: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0.00"
                    step={0.01}
                />
                <UnitInput
                    label="Unit on Right"
                    unit="USD"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.right}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            right: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0.00"
                    step={0.01}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInput with different unit positions: left and right.',
            },
        },
    },
}

// Different unit types
export const DifferentUnits: Story = {
    render: () => {
        const [values, setValues] = useState({
            currency: undefined as number | undefined,
            percentage: undefined as number | undefined,
            weight: undefined as number | undefined,
            time: undefined as number | undefined,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInput
                    label="Price"
                    unit="$"
                    unitPosition={UnitPosition.LEFT}
                    value={values.currency}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            currency: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0.00"
                    min={0}
                    step={0.01}
                    leftSlot={<DollarSign size={16} />}
                />
                <UnitInput
                    label="Discount"
                    unit="%"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.percentage}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            percentage: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0"
                    min={0}
                    max={100}
                    step={1}
                    leftSlot={<Percent size={16} />}
                />
                <UnitInput
                    label="Weight"
                    unit="kg"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.weight}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            weight: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0.0"
                    min={0}
                    step={0.1}
                    leftSlot={<Weight size={16} />}
                />
                <UnitInput
                    label="Duration"
                    unit="hours"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.time}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            time: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    placeholder="0"
                    min={0}
                    step={0.5}
                    leftSlot={<Clock size={16} />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInput with different types of units: currency, percentage, weight, and time.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: undefined as number | undefined,
            outOfRange: 150 as number | undefined,
            negative: -10 as number | undefined,
            valid: 50 as number | undefined,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <UnitInput
                    label="Required Price"
                    unit="$"
                    unitPosition={UnitPosition.LEFT}
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    required
                    error={values.required === undefined}
                    errorMessage={
                        values.required === undefined ? 'Price is required' : ''
                    }
                    placeholder="0.00"
                />
                <UnitInput
                    label="Discount (Out of Range)"
                    unit="%"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.outOfRange}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            outOfRange: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    min={0}
                    max={100}
                    error={
                        values.outOfRange !== undefined &&
                        (values.outOfRange < 0 || values.outOfRange > 100)
                    }
                    errorMessage="Discount must be between 0% and 100%"
                />
                <UnitInput
                    label="Weight (Negative)"
                    unit="kg"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.negative}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            negative: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    min={0}
                    error={values.negative !== undefined && values.negative < 0}
                    errorMessage="Weight cannot be negative"
                />
                <UnitInput
                    label="Valid Discount"
                    unit="%"
                    unitPosition={UnitPosition.RIGHT}
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                        }))
                    }
                    min={0}
                    max={100}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInput showing different validation states: required, out of range, negative value, and valid.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <UnitInput
                label="Disabled Empty"
                unit="USD"
                value={undefined}
                onChange={() => {}}
                placeholder="This input is disabled"
                disabled
            />
            <UnitInput
                label="Disabled With Value"
                unit="kg"
                value={42.5}
                onChange={() => {}}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'UnitInput in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState<number | undefined>(undefined)

        return (
            <UnitInput
                label="Product Price"
                sublabel="Base price before taxes and discounts"
                hintText="Enter the price in US dollars"
                helpIconHintText="This price will be used for tax calculations and inventory management"
                unit="$"
                unitPosition={UnitPosition.LEFT}
                value={value}
                onChange={(e) =>
                    setValue(
                        e.target.value ? parseFloat(e.target.value) : undefined
                    )
                }
                placeholder="0.00"
                min={0}
                step={0.01}
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'UnitInput with comprehensive labeling: main label, sublabel, hint text, and help tooltip.',
            },
        },
    },
}
