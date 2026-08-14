import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
    Stepper,
    StepperType,
    StepState,
    type Step,
} from '@juspay/blend-design-system/deprecated/stepper'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { User, Mail, CreditCard, CheckCircle } from 'lucide-react'

const meta: Meta<typeof Stepper> = {
    title: 'Components/Stepper',
    component: Stepper,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for navigation components
        a11y: getA11yConfig('navigation'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A stepper component that displays a series of steps in a process, showing progress through horizontal or vertical layouts.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Stepper, StepperType, StepState } from '@juspay/blend-design-system/deprecated/stepper';

const steps = [
  { id: 1, title: 'Step 1', status: StepState.COMPLETED },
  { id: 2, title: 'Step 2', status: StepState.CURRENT },
  { id: 3, title: 'Step 3', status: StepState.PENDING },
];

<Stepper
  steps={steps}
  stepperType={StepperType.HORIZONTAL}
  clickable={true}
  onStepClick={(stepIndex) => console.log('Step clicked:', stepIndex)}
/>
\`\`\`

## Features
- **Horizontal and Vertical Layouts**: Support for both horizontal and vertical stepper orientations
- **Step States**: Completed, current, pending, disabled, and skipped states
- **Substeps**: Support for nested substeps within main steps
- **Interactive Navigation**: Clickable steps for navigation (when enabled)
- **Custom Icons**: Support for custom step icons
- **Keyboard Accessible**: Full keyboard navigation support
- **Accessible**: Proper ARIA attributes and semantic structure

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Arrow keys, Enter, Space)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes and semantic structure
- Visible focus indicators
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: 2.5.5 Target Size - interactive elements need 44x44px minimum for AAA

**Key Accessibility Features**:
- Keyboard navigation support (Tab, Arrow keys, Enter, Space)
- Proper ARIA attributes for step states
- Screen reader announcements for step changes
- Focus management and visible focus indicators
- Semantic HTML structure
- Logical tab order

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

                `,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

// ============================================================================
// Default Examples
// ============================================================================

export const Default: Story = {
    render: () => {
        const steps: Step[] = [
            { id: 1, title: 'Step 1', status: StepState.COMPLETED },
            { id: 2, title: 'Step 2', status: StepState.CURRENT },
            { id: 3, title: 'Step 3', status: StepState.PENDING },
            { id: 4, title: 'Step 4', status: StepState.PENDING },
        ]

        return (
            <div className="p-5">
                <Stepper steps={steps} stepperType={StepperType.HORIZONTAL} />
            </div>
        )
    },
}

export const Vertical: Story = {
    render: () => {
        const steps: Step[] = [
            { id: 1, title: 'Step 1', status: StepState.COMPLETED },
            { id: 2, title: 'Step 2', status: StepState.CURRENT },
            { id: 3, title: 'Step 3', status: StepState.PENDING },
            { id: 4, title: 'Step 4', status: StepState.PENDING },
        ]

        return (
            <div className="p-5 min-h-100">
                <Stepper steps={steps} stepperType={StepperType.VERTICAL} />
            </div>
        )
    },
}

export const Clickable: Story = {
    render: () => {
        const [steps, setSteps] = useState<Step[]>([
            { id: 1, title: 'Step 1', status: StepState.COMPLETED },
            { id: 2, title: 'Step 2', status: StepState.CURRENT },
            { id: 3, title: 'Step 3', status: StepState.PENDING },
            { id: 4, title: 'Step 4', status: StepState.PENDING },
        ])

        const handleStepClick = (stepIndex: number) => {
            const newSteps = steps.map((step, index) => {
                if (index < stepIndex) {
                    return { ...step, status: StepState.COMPLETED }
                } else if (index === stepIndex) {
                    return { ...step, status: StepState.CURRENT }
                } else {
                    return { ...step, status: StepState.PENDING }
                }
            })
            setSteps(newSteps)
        }

        return (
            <div className="p-5">
                <Stepper
                    steps={steps}
                    stepperType={StepperType.HORIZONTAL}
                    clickable={true}
                    onStepClick={handleStepClick}
                />
            </div>
        )
    },
}

export const WithSubsteps: Story = {
    render: () => {
        const steps: Step[] = [
            { id: 1, title: 'Step 1', status: StepState.COMPLETED },
            {
                id: 2,
                title: 'Step 2',
                status: StepState.CURRENT,
                substeps: [
                    {
                        id: 1,
                        title: 'Substep 2.1',
                        status: StepState.COMPLETED,
                    },
                    { id: 2, title: 'Substep 2.2', status: StepState.CURRENT },
                    { id: 3, title: 'Substep 2.3', status: StepState.PENDING },
                ],
                isExpandable: true,
                isExpanded: true,
            },
            { id: 3, title: 'Step 3', status: StepState.PENDING },
            { id: 4, title: 'Step 4', status: StepState.PENDING },
        ]

        return (
            <div className="p-5 min-h-100">
                <Stepper steps={steps} stepperType={StepperType.VERTICAL} />
            </div>
        )
    },
}

// ============================================================================
// Step States
// ============================================================================

/**
 * All step states in one view
 */
export const StepStates: Story = {
    render: () => {
        const stateSteps: Step[] = [
            { id: 1, title: 'Completed Step', status: StepState.COMPLETED },
            { id: 2, title: 'Current Step', status: StepState.CURRENT },
            { id: 3, title: 'Pending Step', status: StepState.PENDING },
            { id: 4, title: 'Skipped Step', status: StepState.SKIPPED },
            { id: 5, title: 'Disabled Step', status: StepState.DISABLED },
        ]

        return (
            <div className="p-5">
                <h3 className="text-base font-semibold mb-6">
                    All Step States
                </h3>
                <Stepper
                    steps={stateSteps}
                    stepperType={StepperType.HORIZONTAL}
                />
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
                    <strong>States shown:</strong>
                    <ul className="mt-2 pl-5 list-disc">
                        <li>
                            <strong>COMPLETED</strong> - Step finished with
                            checkmark
                        </li>
                        <li>
                            <strong>CURRENT</strong> - Active step being worked
                            on
                        </li>
                        <li>
                            <strong>PENDING</strong> - Step not yet reached
                        </li>
                        <li>
                            <strong>SKIPPED</strong> - Step was bypassed
                        </li>
                        <li>
                            <strong>DISABLED</strong> - Step is
                            locked/unavailable
                        </li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays all available step states (completed, current, pending, skipped, disabled) in a single view for reference.',
            },
        },
    },
}

// ============================================================================
// Custom Icons
// ============================================================================

/**
 * Stepper with custom icons
 */
export const CustomIcons: Story = {
    render: () => {
        const customSteps: Step[] = [
            {
                id: 1,
                title: 'Account Setup',
                status: StepState.COMPLETED,
                icon: <User size={14} color="#ffffff" />,
            },
            {
                id: 2,
                title: 'Verify Email',
                status: StepState.CURRENT,
                icon: <Mail size={14} color="#3b82f6" />,
            },
            {
                id: 3,
                title: 'Add Payment',
                status: StepState.PENDING,
                icon: <CreditCard size={14} color="#6b7280" />,
            },
            {
                id: 4,
                title: 'Complete',
                status: StepState.PENDING,
                icon: <CheckCircle size={14} color="#6b7280" />,
            },
        ]

        return (
            <div className="p-5">
                <h3 className="text-base font-semibold mb-6">
                    Custom Step Icons
                </h3>
                <Stepper
                    steps={customSteps}
                    stepperType={StepperType.HORIZONTAL}
                />
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
                    <strong>Note:</strong> Custom icons override the default
                    state icons. Pass any React node as the icon prop.
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Stepper with custom icons for each step, overriding the default numbered circles and checkmarks.',
            },
        },
    },
}

// ============================================================================
// Disabled Steps
// ============================================================================

/**
 * Stepper with disabled steps
 */
export const DisabledSteps: Story = {
    render: () => {
        const [disabledSteps, setDisabledSteps] = useState<Step[]>([
            { id: 1, title: 'Basic Info', status: StepState.COMPLETED },
            { id: 2, title: 'Contact Details', status: StepState.COMPLETED },
            {
                id: 3,
                title: 'Premium Features',
                status: StepState.DISABLED,
                description: 'Upgrade required',
            },
            {
                id: 4,
                title: 'Advanced Settings',
                status: StepState.DISABLED,
                description: 'Premium only',
            },
            { id: 5, title: 'Review', status: StepState.CURRENT },
        ])

        const toggleUpgrade = () => {
            setDisabledSteps((prev) =>
                prev.map((step) =>
                    step.id === 3 || step.id === 4
                        ? {
                              ...step,
                              status:
                                  step.status === StepState.DISABLED
                                      ? StepState.PENDING
                                      : StepState.DISABLED,
                          }
                        : step
                )
            )
        }

        return (
            <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-semibold m-0">
                        Disabled Steps (Gated Content)
                    </h3>
                    <button
                        onClick={toggleUpgrade}
                        className="px-4 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer text-sm"
                    >
                        Toggle Premium Access
                    </button>
                </div>
                <Stepper
                    steps={disabledSteps}
                    stepperType={StepperType.HORIZONTAL}
                    clickable={true}
                />
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
                    <strong>Disabled step behavior:</strong>
                    <ul className="mt-2 pl-5 list-disc">
                        <li>Steps show a lock icon</li>
                        <li>Cannot be clicked or navigated to</li>
                        <li>Screen readers announce &quot;disabled&quot;</li>
                        <li>Use for gated/premium content flows</li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates disabled steps for gated workflows or premium features. Disabled steps are locked and cannot be accessed until prerequisites are met.',
            },
        },
    },
}
