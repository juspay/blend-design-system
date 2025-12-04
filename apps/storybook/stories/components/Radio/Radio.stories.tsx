import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Radio, RadioGroup, RadioSize } from '@juspay/blend-design-system'
import {
    CreditCard,
    DollarSign,
    Smartphone,
    Shield,
    Star,
    Info,
    Settings,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

// Helper function for slot content rendering
// Accepts string selector from Storybook controls or ReactNode directly
const getSlotContent = (
    slotValue: string | React.ReactNode | undefined
): React.ReactNode => {
    // If already a ReactNode, return as-is
    if (typeof slotValue !== 'string') {
        return slotValue
    }

    // Handle string selectors from Storybook controls
    if (!slotValue || slotValue === 'none') {
        return undefined
    }

    switch (slotValue) {
        case 'star':
            return <Star size={16} color="#ffd700" />
        case 'info':
            return <Info size={16} color="#0ea5e9" />
        case 'settings':
            return <Settings size={16} color="#6b7280" />
        case 'creditCard':
            return <CreditCard size={16} color="#4f46e5" />
        case 'dollar':
            return <DollarSign size={16} color="#10b981" />
        default:
            return undefined
    }
}

const meta: Meta<typeof Radio> = {
    title: 'Components/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A radio button component for single selection within groups, with support for controlled and uncontrolled modes, multiple sizes, and comprehensive form integration.

## Features
- Single selection within radio groups
- Controlled and uncontrolled modes
- Two sizes (Small, Medium)
- Error state handling
- Required field indication
- Label and subtext support
- Custom slot for additional content
- Disabled state support
- Radio group functionality
- Accessible design with proper ARIA attributes

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Arrow keys, Space, Enter)
- Screen reader support (VoiceOver/NVDA)
- Proper label association via htmlFor/id
- RadioGroup provides radiogroup role with keyboard navigation
- Error state support with visual and programmatic indicators
- Required state indicated with asterisk and aria-required="true"
- Subtext support for additional context via aria-describedby
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (4 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Small/Medium radios need 44x44px minimum
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for critical actions
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- Small radios: 14-16px (meets AA 24px, does not meet AAA 44px)
- Medium radios: 16-20px (meets AA 24px, does not meet AAA 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Radio.accessibility\` (automated tests covering WCAG 2.1 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Radio, RadioGroup, RadioSize } from '@juspay/blend-design-system';

<RadioGroup name="plan" label="Select Plan">
  <Radio value="basic" size={RadioSize.MEDIUM}>
    Basic Plan
  </Radio>
  <Radio value="pro" size={RadioSize.MEDIUM}>
    Pro Plan
  </Radio>
</RadioGroup>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the radio input element',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled checked state of the radio',
        },
        defaultChecked: {
            control: 'boolean',
            description: 'Default checked state for uncontrolled mode',
        },
        size: {
            control: 'select',
            options: Object.values(RadioSize),
            description: 'Size variant of the radio',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the radio is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Whether the radio is required (shows asterisk)',
        },
        error: {
            control: 'boolean',
            description: 'Whether the radio is in error state',
        },
        children: {
            control: 'text',
            description: 'Label content for the radio',
        },
        subtext: {
            control: 'text',
            description: 'Additional descriptive text below the radio',
        },
        value: {
            control: 'text',
            description: 'Value of the radio option',
        },
        name: {
            control: 'text',
            description: 'Name attribute for grouping radios',
        },
        slot: {
            control: 'select',
            options: [
                'none',
                'star',
                'info',
                'settings',
                'creditCard',
                'dollar',
            ],
            description: 'Additional content slot displayed next to the label',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the radio state changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radio>

// Default story
export const Default: Story = {
    render: function DefaultRadio(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Radio
                {...args}
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChecked(e.target.checked)
                }
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        children: 'Default radio',
        value: 'default',
        name: 'default-group',
        size: RadioSize.MEDIUM,
        defaultChecked: false,
        disabled: false,
        required: false,
        error: false,
        id: '',
        slot: 'none',
    },
}

// Radio sizes
export const RadioSizes: Story = {
    render: () => {
        const RadioSizesComponent = () => {
            const [selectedSize, setSelectedSize] = useState('medium')

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Radio
                        name="size-demo"
                        value="small"
                        size={RadioSize.SMALL}
                        checked={selectedSize === 'small'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.checked && setSelectedSize('small')
                        }
                    >
                        Small radio
                    </Radio>
                    <Radio
                        name="size-demo"
                        value="medium"
                        size={RadioSize.MEDIUM}
                        checked={selectedSize === 'medium'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.checked && setSelectedSize('medium')
                        }
                    >
                        Medium radio
                    </Radio>
                </div>
            )
        }
        return <RadioSizesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Different radio sizes: Small and Medium. Click to select between the sizes.',
            },
        },
    },
}

// Radio states
export const RadioStates: Story = {
    render: () => {
        const RadioStatesComponent = () => {
            const [states, setStates] = useState({
                interactive: 'unchecked' as string,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Interactive States:
                    </div>
                    <Radio
                        name="interactive-states"
                        value="unchecked"
                        checked={states.interactive === 'unchecked'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.checked &&
                            setStates((prev) => ({
                                ...prev,
                                interactive: 'unchecked',
                            }))
                        }
                    >
                        Unchecked (Click to select)
                    </Radio>
                    <Radio
                        name="interactive-states"
                        value="checked"
                        checked={states.interactive === 'checked'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.checked &&
                            setStates((prev) => ({
                                ...prev,
                                interactive: 'checked',
                            }))
                        }
                    >
                        Checked (Click to select)
                    </Radio>

                    <div
                        style={{
                            marginTop: '16px',
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Disabled States:
                    </div>
                    <Radio
                        name="disabled-states"
                        value="disabled-unchecked"
                        disabled={true}
                        defaultChecked={false}
                    >
                        Disabled unchecked
                    </Radio>
                    <Radio
                        name="disabled-states"
                        value="disabled-checked"
                        disabled={true}
                        defaultChecked={true}
                    >
                        Disabled checked
                    </Radio>

                    <div
                        style={{
                            marginTop: '16px',
                            marginBottom: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        Other States:
                    </div>
                    <Radio
                        name="other-states"
                        value="error"
                        error={true}
                        defaultChecked={false}
                    >
                        Error state
                    </Radio>
                    <Radio
                        name="other-states"
                        value="required"
                        required={true}
                        defaultChecked={false}
                    >
                        Required field
                    </Radio>
                </div>
            )
        }
        return <RadioStatesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Different radio states: interactive options, disabled variants, error states, and required fields.',
            },
        },
    },
}

// Basic Radio Group
export const BasicRadioGroup: Story = {
    render: () => (
        <RadioGroup name="plan" label="Select Plan" defaultValue="pro">
            <Radio value="basic">Basic Plan</Radio>
            <Radio value="pro">Pro Plan</Radio>
            <Radio value="enterprise">Enterprise Plan</Radio>
        </RadioGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Basic radio group with multiple options. Click to select different options.',
            },
        },
    },
}

// Controlled Radio Group
export const ControlledRadioGroup: Story = {
    render: () => {
        const ControlledRadioGroupComponent = () => {
            const [selectedPlan, setSelectedPlan] = useState('pro')

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <RadioGroup
                        name="subscription"
                        value={selectedPlan}
                        onChange={setSelectedPlan}
                        label="Choose Subscription"
                    >
                        <Radio value="monthly" size={RadioSize.MEDIUM}>
                            Monthly Billing
                        </Radio>
                        <Radio value="yearly" size={RadioSize.MEDIUM}>
                            Yearly Billing
                        </Radio>
                    </RadioGroup>
                    <div
                        style={{
                            fontSize: '14px',
                            color: '#666',
                            marginTop: '8px',
                        }}
                    >
                        Selected: {selectedPlan}
                    </div>
                </div>
            )
        }
        return <ControlledRadioGroupComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled radio group with state management.',
            },
        },
    },
}

// Radio with subtext
export const WithSubtext: Story = {
    render: () => (
        <RadioGroup
            name="subscription-options"
            label="Subscription Options"
            defaultValue="pro"
        >
            <Radio
                value="basic"
                size={RadioSize.MEDIUM}
                subtext="Perfect for individuals getting started"
            >
                Basic Plan - $9/month
            </Radio>
            <Radio
                value="pro"
                size={RadioSize.MEDIUM}
                subtext="Great for small teams and growing businesses"
            >
                Pro Plan - $29/month
            </Radio>
            <Radio
                value="enterprise"
                size={RadioSize.MEDIUM}
                subtext="Advanced features for large organizations"
            >
                Enterprise Plan - $99/month
            </Radio>
        </RadioGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Radio buttons with descriptive subtext. Click to select different plans.',
            },
        },
    },
}

// Radio with custom slots
export const WithSlots: Story = {
    render: () => (
        <RadioGroup
            name="payment-method"
            label="Payment Method"
            defaultValue="card"
        >
            <Radio
                value="card"
                size={RadioSize.MEDIUM}
                slot={<CreditCard size={20} color="#4f46e5" />}
                subtext="Visa, Mastercard, American Express"
            >
                Credit Card
            </Radio>
            <Radio
                value="paypal"
                size={RadioSize.MEDIUM}
                slot={<DollarSign size={20} color="#00457c" />}
                subtext="Pay with your PayPal account"
            >
                PayPal
            </Radio>
            <Radio
                value="mobile"
                size={RadioSize.MEDIUM}
                slot={<Smartphone size={20} color="#10b981" />}
                subtext="Apple Pay, Google Pay"
            >
                Mobile Payment
            </Radio>
            <Radio
                value="bank"
                size={RadioSize.MEDIUM}
                slot={<Shield size={20} color="#6b7280" />}
                subtext="Direct bank transfer"
                disabled={true}
            >
                Bank Transfer
            </Radio>
        </RadioGroup>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Radio buttons with custom content slots (icons) for visual enhancement. Click to select different payment methods.',
            },
        },
    },
}

// Error and validation states
export const ErrorAndValidation: Story = {
    render: () => {
        const ErrorAndValidationComponent = () => {
            const [selectedOption, setSelectedOption] = useState('')
            const [showError, setShowError] = useState(false)

            const handleSubmit = () => {
                if (!selectedOption) {
                    setShowError(true)
                } else {
                    setShowError(false)
                    alert(`Form submitted with: ${selectedOption}`)
                }
            }

            return (
                <div style={{ maxWidth: '400px' }}>
                    <RadioGroup
                        name="agreement"
                        label="Terms Agreement"
                        value={selectedOption}
                        onChange={(value) => {
                            setSelectedOption(value)
                            setShowError(false)
                        }}
                    >
                        <Radio
                            value="accept"
                            required={true}
                            error={showError}
                            subtext={
                                showError
                                    ? 'You must accept the terms to continue'
                                    : 'Read our complete terms of service'
                            }
                        >
                            I accept the terms and conditions
                        </Radio>
                        <Radio
                            value="decline"
                            error={showError}
                            subtext="You will not be able to proceed without accepting"
                        >
                            I decline the terms and conditions
                        </Radio>
                    </RadioGroup>

                    <button
                        onClick={handleSubmit}
                        style={{
                            marginTop: '16px',
                            padding: '8px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>

                    {showError && (
                        <div
                            style={{
                                color: '#ef4444',
                                fontSize: '14px',
                                marginTop: '8px',
                            }}
                        >
                            Please select an option to continue.
                        </div>
                    )}
                </div>
            )
        }
        return <ErrorAndValidationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Radio group with error states and form validation.',
            },
        },
    },
}

// Different Radio Group configurations
export const RadioGroupVariations: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Small size group */}
            <RadioGroup
                name="size-small"
                label="Small Size Options"
                defaultValue="option2"
            >
                <Radio value="option1" size={RadioSize.SMALL}>
                    Option 1
                </Radio>
                <Radio value="option2" size={RadioSize.SMALL}>
                    Option 2
                </Radio>
                <Radio value="option3" size={RadioSize.SMALL}>
                    Option 3
                </Radio>
            </RadioGroup>

            {/* Medium size group */}
            <RadioGroup
                name="size-medium"
                label="Medium Size Options"
                defaultValue="option1"
            >
                <Radio value="option1" size={RadioSize.MEDIUM}>
                    Option 1
                </Radio>
                <Radio value="option2" size={RadioSize.MEDIUM}>
                    Option 2
                </Radio>
                <Radio value="option3" size={RadioSize.MEDIUM}>
                    Option 3
                </Radio>
            </RadioGroup>

            {/* Disabled group */}
            <RadioGroup
                name="disabled-group"
                label="Disabled Group"
                disabled={true}
                defaultValue="option2"
            >
                <Radio value="option1">Disabled Option 1</Radio>
                <Radio value="option2">Disabled Option 2</Radio>
                <Radio value="option3">Disabled Option 3</Radio>
            </RadioGroup>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different radio group configurations with various sizes and states. Interactive groups show different default selections.',
            },
        },
    },
}

// Uncontrolled Radio Group
export const UncontrolledRadioGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <RadioGroup name="uncontrolled-1" label="Uncontrolled (no default)">
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>

            <RadioGroup
                name="uncontrolled-2"
                label="Uncontrolled (with default)"
                defaultValue="option2"
            >
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2 (Default)</Radio>
                <Radio value="option3">Option 3</Radio>
            </RadioGroup>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Uncontrolled radio groups that manage their own state internally. Click to select options - the first group starts with no selection, the second has a default selection.',
            },
        },
    },
}

// Interactive playground
export const Interactive: Story = {
    render: function InteractiveRadio(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Radio
                {...args}
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChecked(e.target.checked)
                }
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        children: 'Interactive radio playground',
        value: 'interactive',
        name: 'interactive-group',
        size: RadioSize.MEDIUM,
        defaultChecked: false,
        disabled: false,
        required: false,
        error: false,
        subtext: 'Customize all props using controls',
        id: 'interactive-radio',
        slot: 'none',
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to test all radio props and combinations. Use the controls panel to modify any property.',
            },
        },
    },
}
