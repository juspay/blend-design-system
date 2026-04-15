import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { NumberInput, NumberInputSize } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof NumberInput> = {
    title: 'Components/Inputs/NumberInput',
    component: NumberInput,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A specialized numeric input component with built-in validation for numbers, step controls, and min/max constraints.',
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { NumberInput, NumberInputSize } from '@juspay/blend-design-system';

<NumberInput
  label="Age"
  placeholder="Enter your age"
  value={age}
  onChange={(e) => setAge(parseInt(e.target.value))}
  min={0}
  max={120}
  size={NumberInputSize.MEDIUM}
  required
/>
\`\`\`
## Features
- Two sizes (Medium, Large)
- Numeric validation with step controls
- Min/max value constraints
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Accessibility

- Uses native \`<input type="number">\` for proper semantics
- Labels are associated via \`label\`, \`sublabel\`, and \`name\` props
- Required state is visually indicated and exposed via \`required\` / \`aria-required\` (via shared input utilities)
- Error state is exposed via error text and can be associated with inputs via \`InputFooter\`
- Focus styles and error shake patterns are keyboard-friendly
- Stepper buttons are standard buttons and should not trap focus
- Hint and help text provide additional instructions for users and assistive technologies

**WCAG Compliance Target**: 2.1 Level AA (designed to support 2.2 as the latest version of WCAG [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)])

**Intended coverage:**
- **Perceivable**: Labels, hints, and error messages are visible and can be programmatically associated
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, arrow keys and buttons for value changes)
- **Understandable**: Clear labels, inline help, and error messaging patterns
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA)
- **jest-axe tests**: Run \`pnpm test NumberInput.accessibility\` (mirroring TextInput/Button tests) to automate WCAG checks
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools

> Note: WCAG 2.2 builds on 2.1 and 2.0; content that conforms to 2.2 also conforms to earlier versions [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)].
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
        size: {
            control: { type: 'select' },
            options: Object.values(NumberInputSize),
            description: 'Size variant of the input',
            table: {
                type: { summary: 'NumberInputSize' },
                defaultValue: { summary: 'NumberInputSize.MEDIUM' },
                category: 'Appearance',
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
                category: 'Content',
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
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NumberInput>

// Default story
export const Default: Story = {
    render: function DefaultNumberInput(args) {
        const [value, setValue] = useState<number | null>(null)

        return (
            <NumberInput
                {...args}
                value={value}
                onChange={(e) =>
                    setValue(e.target.value ? parseFloat(e.target.value) : null)
                }
            />
        )
    },
    args: {
        label: 'Default Number Input',
        placeholder: 'Enter a number',
        size: NumberInputSize.MEDIUM,
        disabled: false,
        required: false,
        error: false,
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [values, setValues] = useState({
            medium: null as number | null,
            large: null as number | null,
        })

        return (
            <div className="flex flex-col gap-5">
                <NumberInput
                    label="Medium Size"
                    placeholder="Enter number"
                    size={NumberInputSize.MEDIUM}
                    value={values.medium}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: e.target.value
                                ? parseFloat(e.target.value)
                                : null,
                        }))
                    }
                />
                <NumberInput
                    label="Large Size"
                    placeholder="Enter number"
                    size={NumberInputSize.LARGE}
                    value={values.large}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            large: e.target.value
                                ? parseFloat(e.target.value)
                                : null,
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'NumberInput in different sizes: Medium and Large.',
            },
        },
    },
}

// With constraints
export const WithConstraints: Story = {
    render: () => {
        const [values, setValues] = useState({
            age: null as number | null,
            percentage: null as number | null,
            price: null as number | null,
        })

        return (
            <div className="flex flex-col gap-5">
                <NumberInput
                    label="Age"
                    placeholder="Enter your age"
                    min={0}
                    max={120}
                    step={1}
                    value={values.age}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            age: e.target.value
                                ? parseInt(e.target.value)
                                : null,
                        }))
                    }
                    hintText="Must be between 0 and 120"
                />
                <NumberInput
                    label="Percentage"
                    placeholder="Enter percentage"
                    min={0}
                    max={100}
                    step={0.1}
                    value={values.percentage}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            percentage: e.target.value
                                ? parseFloat(e.target.value)
                                : null,
                        }))
                    }
                    hintText="Between 0% and 100%"
                />
                <NumberInput
                    label="Price"
                    placeholder="Enter price"
                    min={0}
                    step={0.01}
                    value={values.price}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            price: e.target.value
                                ? parseFloat(e.target.value)
                                : null,
                        }))
                    }
                    hintText="Enter amount in dollars"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'NumberInput with different constraints: min/max values and step increments.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: null as number | null,
            outOfRange: 150 as number | null,
            valid: 25 as number | null,
        })

        return (
            <div className="flex flex-col gap-5">
                <NumberInput
                    label="Required Field"
                    placeholder="This field is required"
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: e.target.value
                                ? parseFloat(e.target.value)
                                : null,
                        }))
                    }
                    required
                    error={values.required === null}
                    errorMessage={
                        values.required === null ? 'This field is required' : ''
                    }
                />
                <NumberInput
                    label="Age (Out of Range)"
                    placeholder="Enter age between 0-120"
                    min={0}
                    max={120}
                    value={values.outOfRange}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            outOfRange: e.target.value
                                ? parseInt(e.target.value)
                                : null,
                        }))
                    }
                    error={
                        values.outOfRange !== null &&
                        (values.outOfRange < 0 || values.outOfRange > 120)
                    }
                    errorMessage="Age must be between 0 and 120"
                />
                <NumberInput
                    label="Valid Age"
                    placeholder="Enter valid age"
                    min={0}
                    max={120}
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value
                                ? parseInt(e.target.value)
                                : null,
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'NumberInput showing different validation states: required, out of range, and valid.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div className="flex flex-col gap-5">
            <NumberInput
                label="Disabled Empty"
                placeholder="This input is disabled"
                value={null}
                onChange={() => {}}
                disabled
            />
            <NumberInput
                label="Disabled With Value"
                value={42}
                onChange={() => {}}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'NumberInput in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState<number | null>(null)

        return (
            <NumberInput
                label="Monthly Income"
                sublabel="Before taxes and deductions"
                hintText="Enter your gross monthly income in USD"
                helpIconHintText="This information is used for loan eligibility calculation"
                placeholder="5000"
                min={0}
                step={100}
                value={value}
                onChange={(e) =>
                    setValue(e.target.value ? parseFloat(e.target.value) : null)
                }
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'NumberInput with comprehensive labeling: main label, sublabel, hint text, and help tooltip.',
            },
        },
    },
}
