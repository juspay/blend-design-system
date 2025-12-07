import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Checkbox, CheckboxSize } from '@juspay/blend-design-system'
import { Star, Info, Settings } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

type CheckboxChangeValue = boolean | 'indeterminate'

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
        default:
            return undefined
    }
}

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A versatile checkbox component with support for controlled and uncontrolled states, indeterminate state, multiple sizes, and comprehensive form integration capabilities.

## Features
- Controlled and uncontrolled modes
- Indeterminate state support
- Two sizes (Small, Medium)
- Error state handling
- Required field indication
- Label and subtext support
- Custom slot for additional content
- Disabled state support
- Accessible design with proper ARIA attributes

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Space)
- Screen reader support (VoiceOver/NVDA)
- Proper label association via htmlFor/id
- Indeterminate state communicated via aria-checked="mixed"
- Error state support with visual and programmatic indicators
- Required state indicated with asterisk and required attribute
- Subtext support for additional context via aria-describedby
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (4 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Small/Medium checkboxes need 44x44px minimum
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for critical actions
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- Small checkboxes: 16px × 16px (meets AA 24px, does not meet AAA 44px)
- Medium checkboxes: 20px × 20px (meets AA 24px, does not meet AAA 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Checkbox.accessibility\` (automated tests covering WCAG 2.1 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Checkbox, CheckboxSize } from '@juspay/blend-design-system';

<Checkbox 
  size={CheckboxSize.MEDIUM}
  checked={isChecked}
  onCheckedChange={setIsChecked}
  required={true}
>
  Accept terms and conditions
</Checkbox>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the checkbox input element',
        },
        checked: {
            control: { type: 'select' },
            options: [undefined, true, false, 'indeterminate'],
            description: 'Controlled checked state of the checkbox',
        },
        defaultChecked: {
            control: 'boolean',
            description: 'Default checked state for uncontrolled mode',
        },
        size: {
            control: 'select',
            options: Object.values(CheckboxSize),
            description: 'Size variant of the checkbox',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Whether the checkbox is required (shows asterisk)',
        },
        error: {
            control: 'boolean',
            description: 'Whether the checkbox is in error state',
        },
        children: {
            control: 'text',
            description: 'Label content for the checkbox',
        },
        subtext: {
            control: 'text',
            description: 'Additional descriptive text below the checkbox',
        },
        slot: {
            control: 'select',
            options: ['none', 'star', 'info', 'settings'],
            description: 'Additional content slot displayed next to the label',
        },
        onCheckedChange: {
            action: 'checked changed',
            description: 'Callback fired when the checked state changes',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

// Default story
export const Default: Story = {
    render: function DefaultCheckbox(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Checkbox
                {...args}
                checked={checked}
                onCheckedChange={(newChecked: CheckboxChangeValue) =>
                    setChecked(newChecked === true)
                }
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        children: 'Default checkbox',
        size: CheckboxSize.MEDIUM,
        disabled: false,
        required: false,
        error: false,
        id: '',
        slot: 'none',
    },
}

// Checkbox sizes
export const CheckboxSizes: Story = {
    render: () => {
        const [sizes, setSizes] = useState({
            small: false,
            medium: false,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Checkbox
                    size={CheckboxSize.SMALL}
                    checked={sizes.small}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSizes((prev) => ({
                            ...prev,
                            small: checked === true,
                        }))
                    }
                >
                    Small checkbox
                </Checkbox>
                <Checkbox
                    size={CheckboxSize.MEDIUM}
                    checked={sizes.medium}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSizes((prev) => ({
                            ...prev,
                            medium: checked === true,
                        }))
                    }
                >
                    Medium checkbox
                </Checkbox>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Different checkbox sizes: Small and Medium. Click to toggle each checkbox.',
            },
        },
    },
}

// Checkbox states
export const CheckboxStates: Story = {
    render: () => {
        const [states, setStates] = useState({
            unchecked: false,
            checked: true,
            indeterminate: 'indeterminate' as boolean | 'indeterminate',
            disabledUnchecked: false,
            disabledChecked: true,
            disabledIndeterminate: 'indeterminate' as boolean | 'indeterminate',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Checkbox
                    checked={states.unchecked}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setStates((prev) => ({
                            ...prev,
                            unchecked: checked === true,
                        }))
                    }
                >
                    Unchecked
                </Checkbox>
                <Checkbox
                    checked={states.checked}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setStates((prev) => ({
                            ...prev,
                            checked: checked === true,
                        }))
                    }
                >
                    Checked
                </Checkbox>
                <Checkbox
                    checked={states.indeterminate}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setStates((prev) => ({
                            ...prev,
                            indeterminate: checked,
                        }))
                    }
                >
                    Indeterminate
                </Checkbox>
                <Checkbox disabled={true} defaultChecked={false}>
                    Disabled unchecked
                </Checkbox>
                <Checkbox disabled={true} defaultChecked={true}>
                    Disabled checked
                </Checkbox>
                <Checkbox disabled={true} checked="indeterminate">
                    Disabled indeterminate
                </Checkbox>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Different checkbox states: unchecked, checked, indeterminate, and their disabled variants.',
            },
        },
    },
}

// Controlled checkbox
export const ControlledCheckbox: Story = {
    render: () => {
        const [isChecked, setIsChecked] = useState(false)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setIsChecked(checked === true)
                    }
                    size={CheckboxSize.MEDIUM}
                >
                    Subscribe to newsletter
                </Checkbox>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    Status: {isChecked ? 'Subscribed' : 'Not subscribed'}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled checkbox with state management.',
            },
        },
    },
}

// Indeterminate state example
export const IndeterminateState: Story = {
    render: () => {
        const [items, setItems] = useState([
            { id: 1, name: 'Item 1', checked: true },
            { id: 2, name: 'Item 2', checked: false },
            { id: 3, name: 'Item 3', checked: true },
        ])

        const checkedCount = items.filter((item) => item.checked).length
        const allChecked = checkedCount === items.length
        const someChecked = checkedCount > 0 && checkedCount < items.length

        const handleSelectAll = (checked: CheckboxChangeValue) => {
            setItems(
                items.map((item) => ({ ...item, checked: checked === true }))
            )
        }

        const handleItemChange = (id: number, checked: boolean) => {
            setItems(
                items.map((item) =>
                    item.id === id ? { ...item, checked } : item
                )
            )
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <Checkbox
                    checked={
                        allChecked
                            ? true
                            : someChecked
                              ? 'indeterminate'
                              : false
                    }
                    onCheckedChange={handleSelectAll}
                    size={CheckboxSize.MEDIUM}
                >
                    Select all items ({checkedCount}/{items.length})
                </Checkbox>
                <div
                    style={{
                        marginLeft: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {items.map((item) => (
                        <Checkbox
                            key={item.id}
                            checked={item.checked}
                            onCheckedChange={(checked: CheckboxChangeValue) =>
                                handleItemChange(item.id, checked === true)
                            }
                            size={CheckboxSize.SMALL}
                        >
                            {item.name}
                        </Checkbox>
                    ))}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Indeterminate state example with select all functionality.',
            },
        },
    },
}

// Error and required states
export const ErrorAndRequired: Story = {
    render: () => {
        const [errorStates, setErrorStates] = useState({
            required: false,
            error: false,
            requiredError: false,
            terms: false,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Checkbox
                    required={true}
                    checked={errorStates.required}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setErrorStates((prev) => ({
                            ...prev,
                            required: checked === true,
                        }))
                    }
                >
                    Required field
                </Checkbox>
                <Checkbox
                    error={true}
                    checked={errorStates.error}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setErrorStates((prev) => ({
                            ...prev,
                            error: checked === true,
                        }))
                    }
                >
                    Error state
                </Checkbox>
                <Checkbox
                    required={true}
                    error={true}
                    checked={errorStates.requiredError}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setErrorStates((prev) => ({
                            ...prev,
                            requiredError: checked === true,
                        }))
                    }
                >
                    Required with error
                </Checkbox>
                <Checkbox
                    required={true}
                    error={true}
                    subtext="This field is required and has an error"
                    checked={errorStates.terms}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setErrorStates((prev) => ({
                            ...prev,
                            terms: checked === true,
                        }))
                    }
                >
                    I agree to the terms and conditions
                </Checkbox>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes with required indicators and error states.',
            },
        },
    },
}

// With subtext
export const WithSubtext: Story = {
    render: () => {
        const [subtextStates, setSubtextStates] = useState({
            newsletter: false,
            terms: false,
            verify: false,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Checkbox
                    size={CheckboxSize.MEDIUM}
                    subtext="We'll send you updates about new features and releases"
                    checked={subtextStates.newsletter}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSubtextStates((prev) => ({
                            ...prev,
                            newsletter: checked === true,
                        }))
                    }
                >
                    Subscribe to newsletter
                </Checkbox>
                <Checkbox
                    size={CheckboxSize.SMALL}
                    subtext="By checking this, you agree to our terms of service"
                    required={true}
                    checked={subtextStates.terms}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSubtextStates((prev) => ({
                            ...prev,
                            terms: checked === true,
                        }))
                    }
                >
                    Accept terms and conditions
                </Checkbox>
                <Checkbox
                    error={true}
                    subtext="This field is required for account verification"
                    checked={subtextStates.verify}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSubtextStates((prev) => ({
                            ...prev,
                            verify: checked === true,
                        }))
                    }
                >
                    Verify email address
                </Checkbox>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes with additional descriptive subtext. Click to toggle each checkbox.',
            },
        },
    },
}

// With custom slots
export const WithSlots: Story = {
    render: () => {
        const [slotStates, setSlotStates] = useState({
            favorite: false,
            premium: false,
            settings: false,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Checkbox
                    size={CheckboxSize.MEDIUM}
                    slot={<Star size={16} color="#ffd700" />}
                    checked={slotStates.favorite}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSlotStates((prev) => ({
                            ...prev,
                            favorite: checked === true,
                        }))
                    }
                >
                    Mark as favorite
                </Checkbox>
                <Checkbox
                    size={CheckboxSize.MEDIUM}
                    slot={<Info size={16} color="#0ea5e9" />}
                    subtext="This will enable advanced features"
                    checked={slotStates.premium}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSlotStates((prev) => ({
                            ...prev,
                            premium: checked === true,
                        }))
                    }
                >
                    Enable premium mode
                </Checkbox>
                <Checkbox
                    size={CheckboxSize.MEDIUM}
                    slot={<Settings size={16} color="#6b7280" />}
                    checked={slotStates.settings}
                    onCheckedChange={(checked: CheckboxChangeValue) =>
                        setSlotStates((prev) => ({
                            ...prev,
                            settings: checked === true,
                        }))
                    }
                >
                    Configure settings
                </Checkbox>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes with custom content slots for additional context. Click to toggle each checkbox.',
            },
        },
    },
}

// Uncontrolled checkbox
export const UncontrolledCheckbox: Story = {
    render: () => {
        const [uncontrolledStates, setUncontrolledStates] = useState({
            defaultUnchecked: false,
            defaultChecked: true,
            selfManaged: false,
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <div>
                    <Checkbox
                        checked={uncontrolledStates.defaultUnchecked}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setUncontrolledStates((prev) => ({
                                ...prev,
                                defaultUnchecked: checked === true,
                            }))
                        }
                        size={CheckboxSize.MEDIUM}
                    >
                        Started unchecked (now{' '}
                        {uncontrolledStates.defaultUnchecked
                            ? 'checked'
                            : 'unchecked'}
                        )
                    </Checkbox>
                </div>
                <div>
                    <Checkbox
                        checked={uncontrolledStates.defaultChecked}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setUncontrolledStates((prev) => ({
                                ...prev,
                                defaultChecked: checked === true,
                            }))
                        }
                        size={CheckboxSize.MEDIUM}
                    >
                        Started checked (now{' '}
                        {uncontrolledStates.defaultChecked
                            ? 'checked'
                            : 'unchecked'}
                        )
                    </Checkbox>
                </div>
                <div>
                    <Checkbox
                        checked={uncontrolledStates.selfManaged}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setUncontrolledStates((prev) => ({
                                ...prev,
                                selfManaged: checked === true,
                            }))
                        }
                        size={CheckboxSize.SMALL}
                        subtext={`Current state: ${uncontrolledStates.selfManaged ? 'enabled' : 'disabled'}`}
                    >
                        Self-managed checkbox
                    </Checkbox>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates checkboxes with different initial states but full interactivity. Click to toggle - the labels show current state values.',
            },
        },
    },
}

// Checkbox without label (aria-label only)
export const WithoutLabel: Story = {
    render: () => {
        const WithoutLabelComponent = () => {
            const [noLabelStates, setNoLabelStates] = useState({
                ariaLabel: false,
                ariaLabelWithSubtext: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Checkbox
                        checked={noLabelStates.ariaLabel}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setNoLabelStates((prev) => ({
                                ...prev,
                                ariaLabel: checked === true,
                            }))
                        }
                        aria-label="Enable dark mode"
                    />
                    <Checkbox
                        checked={noLabelStates.ariaLabelWithSubtext}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setNoLabelStates((prev) => ({
                                ...prev,
                                ariaLabelWithSubtext: checked === true,
                            }))
                        }
                        subtext="This checkbox has no visible label but has subtext"
                        aria-label="Dark mode toggle"
                    />
                </div>
            )
        }
        return <WithoutLabelComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes without visible labels, using aria-label for accessibility. Useful for compact UIs where space is limited.',
            },
        },
    },
}

// Text truncation with maxLength
export const TextTruncation: Story = {
    render: () => {
        const TextTruncationComponent = () => {
            const [truncationStates, setTruncationStates] = useState({
                longLabel: false,
                longSubtext: false,
                both: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        maxWidth: '300px',
                    }}
                >
                    <Checkbox
                        checked={truncationStates.longLabel}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                longLabel: checked === true,
                            }))
                        }
                        maxLength={{ label: 30 }}
                    >
                        This is a very long label that will be truncated when it
                        exceeds the maximum length
                    </Checkbox>
                    <Checkbox
                        checked={truncationStates.longSubtext}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                longSubtext: checked === true,
                            }))
                        }
                        subtext="This is a very long subtext description that will be truncated when it exceeds the maximum length specified in the maxLength prop"
                        maxLength={{ subtext: 50 }}
                    >
                        Checkbox with long subtext
                    </Checkbox>
                    <Checkbox
                        checked={truncationStates.both}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setTruncationStates((prev) => ({
                                ...prev,
                                both: checked === true,
                            }))
                        }
                        subtext="This subtext will also be truncated along with the label above"
                        maxLength={{ label: 25, subtext: 40 }}
                    >
                        Both label and subtext truncated
                    </Checkbox>
                </div>
            )
        }
        return <TextTruncationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes with text truncation using maxLength prop. Hover over truncated text to see full content in tooltip.',
            },
        },
    },
}

// Combined states
export const CombinedStates: Story = {
    render: () => {
        const CombinedStatesComponent = () => {
            const [combinedStates, setCombinedStates] = useState({
                disabledError: false,
                disabledRequired: false,
                errorRequired: false,
            })

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <Checkbox
                        disabled={true}
                        error={true}
                        checked={combinedStates.disabledError}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                disabledError: checked === true,
                            }))
                        }
                        subtext="This checkbox is disabled and has an error state"
                    >
                        Disabled with error
                    </Checkbox>
                    <Checkbox
                        disabled={true}
                        required={true}
                        checked={combinedStates.disabledRequired}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                disabledRequired: checked === true,
                            }))
                        }
                        subtext="This checkbox is disabled but still marked as required"
                    >
                        Disabled and required
                    </Checkbox>
                    <Checkbox
                        error={true}
                        required={true}
                        checked={combinedStates.errorRequired}
                        onCheckedChange={(checked: CheckboxChangeValue) =>
                            setCombinedStates((prev) => ({
                                ...prev,
                                errorRequired: checked === true,
                            }))
                        }
                        subtext="This checkbox has both error and required states"
                    >
                        Error and required
                    </Checkbox>
                </div>
            )
        }
        return <CombinedStatesComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes with combined states: disabled + error, disabled + required, and error + required.',
            },
        },
    },
}

// Form integration
export const FormIntegration: Story = {
    render: () => {
        const FormIntegrationComponent = () => {
            const [formData, setFormData] = useState({
                newsletter: false,
                terms: false,
                marketing: false,
            })

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const formDataObj = new FormData(form)
                const values: Record<string, string> = {}
                formDataObj.forEach((value, key) => {
                    values[key] = value as string
                })
                alert(
                    `Form submitted with values: ${JSON.stringify(values, null, 2)}`
                )
            }

            return (
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            padding: '20px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            maxWidth: '400px',
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: '600',
                            }}
                        >
                            Registration Preferences
                        </h3>

                        <Checkbox
                            name="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked: CheckboxChangeValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    newsletter: checked === true,
                                }))
                            }
                            subtext="Receive weekly updates and news"
                        >
                            Subscribe to newsletter
                        </Checkbox>

                        <Checkbox
                            name="terms"
                            checked={formData.terms}
                            onCheckedChange={(checked: CheckboxChangeValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    terms: checked === true,
                                }))
                            }
                            required={true}
                            subtext="You must accept the terms to continue"
                        >
                            I accept the terms and conditions
                        </Checkbox>

                        <Checkbox
                            name="marketing"
                            checked={formData.marketing}
                            onCheckedChange={(checked: CheckboxChangeValue) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    marketing: checked === true,
                                }))
                            }
                            subtext="Receive promotional emails and offers"
                        >
                            Enable marketing communications
                        </Checkbox>

                        <button
                            type="submit"
                            style={{
                                marginTop: '16px',
                                padding: '10px 20px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                            }}
                        >
                            Submit Preferences
                        </button>
                    </div>
                </form>
            )
        }
        return <FormIntegrationComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkboxes integrated into a form with name and value attributes for form submission.',
            },
        },
    },
}

// Interactive playground
export const Interactive: Story = {
    render: function InteractiveCheckbox(args: Story['args']) {
        const [checked, setChecked] = useState(args?.defaultChecked || false)

        return (
            <Checkbox
                {...args}
                checked={checked}
                onCheckedChange={(newChecked: CheckboxChangeValue) =>
                    setChecked(newChecked === true)
                }
                slot={getSlotContent(args?.slot)}
            />
        )
    },
    args: {
        children: 'Interactive checkbox playground',
        size: CheckboxSize.MEDIUM,
        disabled: false,
        required: false,
        error: false,
        subtext: 'Customize all props using controls',
        id: 'interactive-checkbox',
        slot: 'none',
    },
    parameters: {
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
        docs: {
            description: {
                story: 'Interactive playground to test all checkbox props and combinations. Use the controls panel to modify any property.',
            },
        },
    },
}
