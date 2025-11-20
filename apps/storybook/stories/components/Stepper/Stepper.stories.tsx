import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import { Stepper, Button, ButtonType } from '@juspay/blend-design-system'
import {
    StepperType,
    StepState,
    Step,
} from '@juspay/blend-design-system/components/Stepper/types'
import {
    User,
    CreditCard,
    Package,
    CheckCircle,
    Settings,
    FileText,
} from 'lucide-react'

const meta: Meta<typeof Stepper> = {
    title: 'Components/Stepper',
    component: Stepper,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A versatile stepper component for multi-step processes, wizards, and progress tracking.

## Features
- Horizontal and vertical orientations
- Multiple step states (completed, current, pending, disabled, skipped)
- Sub-steps support for nested progress
- Clickable/non-clickable navigation
- Custom icons and descriptions
- Expandable/collapsible sub-steps
- Token-based styling system
- Full accessibility support

## Step States
- **COMPLETED**: Step has been finished
- **CURRENT**: Currently active step
- **PENDING**: Not yet started
- **DISABLED**: Cannot be accessed
- **SKIPPED**: Bypassed step

## Usage

\`\`\`tsx
import { Stepper, StepperType, StepState } from '@juspay/blend-design-system';

// Basic horizontal stepper
<Stepper
  stepperType={StepperType.HORIZONTAL}
  steps={[
    { id: 1, title: 'Account', status: StepState.COMPLETED },
    { id: 2, title: 'Details', status: StepState.CURRENT },
    { id: 3, title: 'Payment', status: StepState.PENDING },
    { id: 4, title: 'Confirm', status: StepState.PENDING }
  ]}
/>

// Clickable stepper with navigation
<Stepper
  clickable
  stepperType={StepperType.VERTICAL}
  steps={steps}
  onStepClick={(stepIndex) => handleStepChange(stepIndex)}
/>
\`\`\`

## Accessibility
- Keyboard navigation support
- ARIA labels for step states
- Screen reader announcements
- Focus management
- Semantic HTML structure
        `,
            },
        },
    },
    argTypes: {
        stepperType: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Orientation of the stepper',
            table: {
                type: { summary: 'StepperType' },
                defaultValue: { summary: 'horizontal' },
                category: 'Layout',
            },
        },
        clickable: {
            control: 'boolean',
            description: 'Whether steps can be clicked to navigate',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        steps: {
            control: 'object',
            description:
                'Array of step objects defining the stepper progression',
            table: {
                type: { summary: 'Step[]' },
                category: 'Content',
            },
        },
        onStepClick: {
            action: 'stepClicked',
            description: 'Callback when a step is clicked',
            table: {
                type: { summary: '(stepIndex: number) => void' },
                category: 'Events',
            },
        },
        onSubstepClick: {
            action: 'substepClicked',
            description: 'Callback when a sub-step is clicked',
            table: {
                type: {
                    summary: '(stepId: number, substepIndex: number) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

// Basic Horizontal Stepper
export const HorizontalStepper: Story = {
    args: {
        stepperType: StepperType.HORIZONTAL,
        steps: [
            { id: 1, title: 'Account', status: StepState.COMPLETED },
            { id: 2, title: 'Personal Info', status: StepState.CURRENT },
            { id: 3, title: 'Payment', status: StepState.PENDING },
            { id: 4, title: 'Review', status: StepState.PENDING },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Horizontal stepper showing a 4-step process. First step completed, second step is current, remaining are pending.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Vertical Stepper
export const VerticalStepper: Story = {
    args: {
        stepperType: StepperType.VERTICAL,
        steps: [
            { id: 1, title: 'Create Account', status: StepState.COMPLETED },
            { id: 2, title: 'Verify Email', status: StepState.COMPLETED },
            { id: 3, title: 'Add Payment', status: StepState.CURRENT },
            { id: 4, title: 'Start Using', status: StepState.PENDING },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical stepper with top-to-bottom flow. First two steps completed, third step is current.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Step States
export const StepStates: Story = {
    render: () => {
        const steps: Step[] = [
            { id: 1, title: 'Completed Step', status: StepState.COMPLETED },
            { id: 2, title: 'Current Step', status: StepState.CURRENT },
            { id: 3, title: 'Pending Step', status: StepState.PENDING },
            { id: 4, title: 'Skipped Step', status: StepState.SKIPPED },
            {
                id: 5,
                title: 'Disabled Step',
                status: StepState.DISABLED,
                disabled: true,
            },
        ]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                <div>
                    <h4
                        style={{
                            marginBottom: '16px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Horizontal
                    </h4>
                    <Stepper
                        stepperType={StepperType.HORIZONTAL}
                        steps={steps}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            marginBottom: '16px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Vertical
                    </h4>
                    <Stepper stepperType={StepperType.VERTICAL} steps={steps} />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'All available step states: completed, current, pending, skipped, and disabled.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Icons
export const WithIcons: Story = {
    render: () => {
        const steps: Step[] = [
            {
                id: 1,
                title: 'Account Info',
                status: StepState.COMPLETED,
                icon: <User size={20} />,
            },
            {
                id: 2,
                title: 'Payment Method',
                status: StepState.CURRENT,
                icon: <CreditCard size={20} />,
            },
            {
                id: 3,
                title: 'Shipping',
                status: StepState.PENDING,
                icon: <Package size={20} />,
            },
            {
                id: 4,
                title: 'Confirmation',
                status: StepState.PENDING,
                icon: <CheckCircle size={20} />,
            },
        ]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
            >
                <div>
                    <h4
                        style={{
                            marginBottom: '16px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Horizontal with Icons
                    </h4>
                    <Stepper
                        stepperType={StepperType.HORIZONTAL}
                        steps={steps}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            marginBottom: '16px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Vertical with Icons
                    </h4>
                    <Stepper stepperType={StepperType.VERTICAL} steps={steps} />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper with custom icons for each step. Icons provide visual context for each stage.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Descriptions
export const WithDescriptions: Story = {
    args: {
        stepperType: StepperType.VERTICAL,
        steps: [
            {
                id: 1,
                title: 'Account Setup',
                description: 'Create your account with email and password',
                status: StepState.COMPLETED,
                icon: <User size={20} />,
            },
            {
                id: 2,
                title: 'Profile Details',
                description: 'Add your personal information and preferences',
                status: StepState.CURRENT,
                icon: <FileText size={20} />,
            },
            {
                id: 3,
                title: 'Configuration',
                description: 'Configure your workspace settings',
                status: StepState.PENDING,
                icon: <Settings size={20} />,
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical stepper with descriptions providing additional context for each step. Best suited for vertical layout.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Substeps
export const WithSubsteps: Story = {
    render: () => {
        const steps: Step[] = [
            {
                id: 1,
                title: 'Personal Information',
                status: StepState.COMPLETED,
                substeps: [
                    {
                        id: 1,
                        title: 'Basic Details',
                        status: StepState.COMPLETED,
                    },
                    { id: 2, title: 'Address', status: StepState.COMPLETED },
                    { id: 3, title: 'Contact', status: StepState.COMPLETED },
                ],
                isExpandable: true,
                isExpanded: false,
            },
            {
                id: 2,
                title: 'Business Details',
                status: StepState.CURRENT,
                substeps: [
                    {
                        id: 1,
                        title: 'Company Info',
                        status: StepState.COMPLETED,
                    },
                    { id: 2, title: 'Tax Details', status: StepState.CURRENT },
                    { id: 3, title: 'Bank Account', status: StepState.PENDING },
                ],
                isExpandable: true,
                isExpanded: true,
            },
            {
                id: 3,
                title: 'Verification',
                status: StepState.PENDING,
                substeps: [
                    { id: 1, title: 'Documents', status: StepState.PENDING },
                    { id: 2, title: 'Review', status: StepState.PENDING },
                ],
                isExpandable: true,
                isExpanded: false,
            },
        ]

        return <Stepper stepperType={StepperType.VERTICAL} steps={steps} />
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper with nested sub-steps for complex multi-stage processes. Sub-steps can be expanded/collapsed.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Clickable Navigation
export const ClickableNavigation: Story = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(1)

        const steps: Step[] = [
            {
                id: 1,
                title: 'Select Product',
                description: 'Choose your desired product',
                status:
                    currentStep > 0 ? StepState.COMPLETED : StepState.PENDING,
                icon: <Package size={20} />,
            },
            {
                id: 2,
                title: 'Configure Options',
                description: 'Customize your selection',
                status:
                    currentStep === 1
                        ? StepState.CURRENT
                        : currentStep > 1
                          ? StepState.COMPLETED
                          : StepState.PENDING,
                icon: <Settings size={20} />,
            },
            {
                id: 3,
                title: 'Add to Cart',
                description: 'Review and add to cart',
                status:
                    currentStep === 2
                        ? StepState.CURRENT
                        : currentStep > 2
                          ? StepState.COMPLETED
                          : StepState.PENDING,
                icon: <CreditCard size={20} />,
            },
            {
                id: 4,
                title: 'Checkout',
                description: 'Complete your purchase',
                status:
                    currentStep === 3 ? StepState.CURRENT : StepState.PENDING,
                icon: <CheckCircle size={20} />,
            },
        ]

        const handleStepClick = (stepIndex: number) => {
            // Allow navigation to completed or current steps only
            if (stepIndex <= currentStep) {
                setCurrentStep(stepIndex)
            }
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div
                    style={{
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <p
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Current Step: {currentStep + 1} -{' '}
                        {steps[currentStep].title}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                            text="Previous"
                            buttonType={ButtonType.SECONDARY}
                            onClick={() =>
                                setCurrentStep(Math.max(0, currentStep - 1))
                            }
                            disabled={currentStep === 0}
                            size="sm"
                        />
                        <Button
                            text="Next"
                            buttonType={ButtonType.PRIMARY}
                            onClick={() =>
                                setCurrentStep(Math.min(3, currentStep + 1))
                            }
                            disabled={currentStep === 3}
                            size="sm"
                        />
                    </div>
                </div>

                <Stepper
                    clickable
                    stepperType={StepperType.VERTICAL}
                    steps={steps}
                    onStepClick={handleStepClick}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive stepper with clickable steps. Click on completed steps to navigate back. Use navigation buttons to move forward.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Checkout Process
export const CheckoutProcess: Story = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(0)

        const steps: Step[] = [
            {
                id: 1,
                title: 'Shopping Cart',
                description: 'Review items in your cart',
                status:
                    currentStep > 0 ? StepState.COMPLETED : StepState.CURRENT,
            },
            {
                id: 2,
                title: 'Shipping Info',
                description: 'Enter delivery address',
                status:
                    currentStep === 1
                        ? StepState.CURRENT
                        : currentStep > 1
                          ? StepState.COMPLETED
                          : StepState.PENDING,
            },
            {
                id: 3,
                title: 'Payment',
                description: 'Select payment method',
                status:
                    currentStep === 2
                        ? StepState.CURRENT
                        : currentStep > 2
                          ? StepState.COMPLETED
                          : StepState.PENDING,
            },
            {
                id: 4,
                title: 'Confirmation',
                description: 'Review and place order',
                status:
                    currentStep === 3 ? StepState.CURRENT : StepState.PENDING,
            },
        ]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <Stepper stepperType={StepperType.HORIZONTAL} steps={steps} />

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        minHeight: '200px',
                    }}
                >
                    <h3 style={{ marginTop: 0 }}>{steps[currentStep].title}</h3>
                    <p style={{ color: '#666' }}>
                        {steps[currentStep].description}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '24px',
                        }}
                    >
                        {currentStep > 0 && (
                            <Button
                                text="Back"
                                buttonType={ButtonType.SECONDARY}
                                onClick={() => setCurrentStep(currentStep - 1)}
                            />
                        )}
                        {currentStep < 3 && (
                            <Button
                                text="Continue"
                                buttonType={ButtonType.PRIMARY}
                                onClick={() => setCurrentStep(currentStep + 1)}
                            />
                        )}
                        {currentStep === 3 && (
                            <Button
                                text="Place Order"
                                buttonType={ButtonType.PRIMARY}
                                onClick={() => alert('Order placed!')}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complete checkout flow example with horizontal stepper and step content. Demonstrates real-world e-commerce use case.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Form Wizard
export const FormWizard: Story = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(0)
        const [formData, setFormData] = useState({
            email: '',
            name: '',
            company: '',
        })

        const steps: Step[] = [
            {
                id: 1,
                title: 'Email',
                status:
                    currentStep > 0 ? StepState.COMPLETED : StepState.CURRENT,
            },
            {
                id: 2,
                title: 'Name',
                status:
                    currentStep === 1
                        ? StepState.CURRENT
                        : currentStep > 1
                          ? StepState.COMPLETED
                          : StepState.PENDING,
            },
            {
                id: 3,
                title: 'Company',
                status:
                    currentStep === 2
                        ? StepState.CURRENT
                        : currentStep > 2
                          ? StepState.COMPLETED
                          : StepState.PENDING,
            },
            {
                id: 4,
                title: 'Complete',
                status:
                    currentStep === 3 ? StepState.CURRENT : StepState.PENDING,
            },
        ]

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    maxWidth: '600px',
                }}
            >
                <Stepper stepperType={StepperType.HORIZONTAL} steps={steps} />

                <div
                    style={{
                        padding: '24px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    {currentStep === 0 && (
                        <div>
                            <h3 style={{ marginTop: 0 }}>Enter your email</h3>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div>
                            <h3 style={{ marginTop: 0 }}>Enter your name</h3>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h3 style={{ marginTop: 0 }}>Enter your company</h3>
                            <input
                                type="text"
                                placeholder="Acme Inc."
                                value={formData.company}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        company: e.target.value,
                                    })
                                }
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                }}
                            />
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <h3 style={{ marginTop: 0 }}>
                                Registration Complete!
                            </h3>
                            <div
                                style={{
                                    padding: '16px',
                                    backgroundColor: '#f0fdf4',
                                    borderRadius: '8px',
                                    border: '1px solid #86efac',
                                }}
                            >
                                <p style={{ margin: '4px 0' }}>
                                    <strong>Email:</strong> {formData.email}
                                </p>
                                <p style={{ margin: '4px 0' }}>
                                    <strong>Name:</strong> {formData.name}
                                </p>
                                <p style={{ margin: '4px 0' }}>
                                    <strong>Company:</strong> {formData.company}
                                </p>
                            </div>
                        </div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '24px',
                        }}
                    >
                        {currentStep > 0 && (
                            <Button
                                text="Back"
                                buttonType={ButtonType.SECONDARY}
                                onClick={() => setCurrentStep(currentStep - 1)}
                            />
                        )}
                        {currentStep < 3 && (
                            <Button
                                text="Continue"
                                buttonType={ButtonType.PRIMARY}
                                onClick={() => setCurrentStep(currentStep + 1)}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Multi-step form wizard example. Each step collects different information and shows summary at the end.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    - <strong>Tab:</strong> Navigate between clickable steps
                    <br />- <strong>Enter/Space:</strong> Activate a clickable
                    step
                    <br />- Step states are announced to screen readers
                </p>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Labels
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Each step includes ARIA attributes to communicate state and
                    position:
                    <br />• Current step is marked with aria-current
                    <br />• Completed steps are indicated with aria-label
                    <br />• Disabled steps have aria-disabled attribute
                </p>

                <Stepper
                    clickable
                    stepperType={StepperType.HORIZONTAL}
                    steps={[
                        {
                            id: 1,
                            title: 'Completed',
                            status: StepState.COMPLETED,
                        },
                        { id: 2, title: 'Current', status: StepState.CURRENT },
                        { id: 3, title: 'Pending', status: StepState.PENDING },
                        {
                            id: 4,
                            title: 'Disabled',
                            status: StepState.DISABLED,
                            disabled: true,
                        },
                    ]}
                />
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Visual Indicators
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Color is not the only indicator of state. Icons, text
                    labels, and position all provide visual cues that don't rely
                    solely on color perception.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including keyboard navigation, ARIA labels, and semantic HTML. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'aria-required-attr', enabled: true },
                ],
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        stepperType: StepperType.HORIZONTAL,
        clickable: false,
        steps: [
            { id: 1, title: 'Step 1', status: StepState.COMPLETED },
            { id: 2, title: 'Step 2', status: StepState.CURRENT },
            { id: 3, title: 'Step 3', status: StepState.PENDING },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with Stepper props using the controls panel.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}
