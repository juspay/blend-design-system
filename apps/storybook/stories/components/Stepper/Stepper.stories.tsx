import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Stepper,
    StepperType,
    StepState,
    type Step,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
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
        docs: {
            description: {
                component: `
A stepper component that displays a series of steps in a process, showing progress through horizontal or vertical layouts with support for substeps, custom icons, and interactive step navigation.

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

## Usage

\`\`\`tsx
import { Stepper, StepperType, StepState } from '@juspay/blend-design-system';

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
            <div style={{ padding: '20px' }}>
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
            <div style={{ padding: '20px', minHeight: '400px' }}>
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
            <div style={{ padding: '20px' }}>
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
            <div style={{ padding: '20px', minHeight: '400px' }}>
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
            <div style={{ padding: '20px' }}>
                <h3
                    style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '24px',
                    }}
                >
                    All Step States
                </h3>
                <Stepper
                    steps={stateSteps}
                    stepperType={StepperType.HORIZONTAL}
                />
                <div
                    style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '14px',
                    }}
                >
                    <strong>States shown:</strong>
                    <ul
                        style={{
                            margin: '8px 0 0 0',
                            paddingLeft: '20px',
                        }}
                    >
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
            <div style={{ padding: '20px' }}>
                <h3
                    style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '24px',
                    }}
                >
                    Custom Step Icons
                </h3>
                <Stepper
                    steps={customSteps}
                    stepperType={StepperType.HORIZONTAL}
                />
                <div
                    style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '14px',
                    }}
                >
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
            <div style={{ padding: '20px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '24px',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            margin: 0,
                        }}
                    >
                        Disabled Steps (Gated Content)
                    </h3>
                    <button
                        onClick={toggleUpgrade}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Toggle Premium Access
                    </button>
                </div>
                <Stepper
                    steps={disabledSteps}
                    stepperType={StepperType.HORIZONTAL}
                    clickable={true}
                />
                <div
                    style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '14px',
                    }}
                >
                    <strong>Disabled step behavior:</strong>
                    <ul
                        style={{
                            margin: '8px 0 0 0',
                            paddingLeft: '20px',
                        }}
                    >
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

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating keyboard navigation, screen reader support,
 * proper ARIA attributes, and focus management across various stepper configurations.
 */
export const Accessibility: Story = {
    render: () => {
        const AccessibilityComponent = () => {
            const [horizontalSteps, setHorizontalSteps] = useState<Step[]>([
                { id: 1, title: 'Step 1', status: StepState.COMPLETED },
                { id: 2, title: 'Step 2', status: StepState.CURRENT },
                { id: 3, title: 'Step 3', status: StepState.PENDING },
                { id: 4, title: 'Step 4', status: StepState.PENDING },
            ])

            const [verticalSteps, setVerticalSteps] = useState<Step[]>([
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
                        {
                            id: 2,
                            title: 'Substep 2.2',
                            status: StepState.CURRENT,
                        },
                        {
                            id: 3,
                            title: 'Substep 2.3',
                            status: StepState.PENDING,
                        },
                    ],
                    isExpandable: true,
                    isExpanded: true,
                },
                { id: 3, title: 'Step 3', status: StepState.PENDING },
                { id: 4, title: 'Step 4', status: StepState.PENDING },
            ])

            const handleHorizontalStepClick = (stepIndex: number) => {
                const newSteps = horizontalSteps.map((step, index) => {
                    if (index < stepIndex) {
                        return { ...step, status: StepState.COMPLETED }
                    } else if (index === stepIndex) {
                        return { ...step, status: StepState.CURRENT }
                    } else {
                        return { ...step, status: StepState.PENDING }
                    }
                })
                setHorizontalSteps(newSteps)
            }

            const handleVerticalStepClick = (stepIndex: number) => {
                const newSteps = verticalSteps.map((step, index) => {
                    if (index < stepIndex) {
                        return { ...step, status: StepState.COMPLETED }
                    } else if (index === stepIndex) {
                        return { ...step, status: StepState.CURRENT }
                    } else {
                        return { ...step, status: StepState.PENDING }
                    }
                })
                setVerticalSteps(newSteps)
            }

            return (
                <div style={{ padding: '32px', maxWidth: '1200px' }}>
                    <h1
                        style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: '#1e293b',
                            marginBottom: '24px',
                        }}
                    >
                        Stepper Component Accessibility Showcase
                    </h1>
                    <p
                        style={{
                            fontSize: '16px',
                            color: '#475569',
                            lineHeight: '1.6',
                            marginBottom: '32px',
                        }}
                    >
                        Interactive examples demonstrating the Stepper
                        component's accessibility features including keyboard
                        navigation, screen reader support, proper ARIA
                        attributes, and focus management across various
                        configurations.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '24px',
                            marginBottom: '32px',
                        }}
                    >
                        {/* Example 1: Horizontal Stepper */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Horizontal Stepper
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates horizontal stepper with clickable
                                steps for keyboard navigation testing.
                            </p>
                            <Stepper
                                steps={horizontalSteps}
                                stepperType={StepperType.HORIZONTAL}
                                clickable={true}
                                onStepClick={handleHorizontalStepClick}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        marginTop: '12px',
                                    }}
                                >
                                    <strong>Keyboard Navigation:</strong>
                                </p>
                                <ul
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        marginLeft: '20px',
                                        marginTop: '8px',
                                    }}
                                >
                                    <li>
                                        <strong>Tab</strong>: Navigate between
                                        clickable steps
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        step
                                    </li>
                                    <li>
                                        <strong>Arrow Keys</strong>: Navigate
                                        between steps (when supported)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Example 2: Vertical Stepper */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                minHeight: '400px',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Vertical Stepper with Substeps
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates vertical stepper with expandable
                                substeps for complex workflows.
                            </p>
                            <Stepper
                                steps={verticalSteps}
                                stepperType={StepperType.VERTICAL}
                                clickable={true}
                                onStepClick={handleVerticalStepClick}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        marginTop: '12px',
                                    }}
                                >
                                    <strong>Accessibility Features:</strong>
                                </p>
                                <ul
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        marginLeft: '20px',
                                        marginTop: '8px',
                                    }}
                                >
                                    <li>
                                        Proper ARIA attributes for step states
                                    </li>
                                    <li>Screen reader announcements</li>
                                    <li>Keyboard accessible substeps</li>
                                    <li>Focus management</li>
                                </ul>
                            </div>
                        </div>

                        {/* Example 3: Non-Clickable Stepper */}
                        <div
                            style={{
                                padding: '20px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    marginBottom: '12px',
                                }}
                            >
                                Non-Clickable Stepper
                            </h2>
                            <p
                                style={{
                                    fontSize: '14px',
                                    color: '#475569',
                                    marginBottom: '16px',
                                }}
                            >
                                Demonstrates read-only stepper for display
                                purposes only.
                            </p>
                            <Stepper
                                steps={[
                                    {
                                        id: 1,
                                        title: 'Step 1',
                                        status: StepState.COMPLETED,
                                    },
                                    {
                                        id: 2,
                                        title: 'Step 2',
                                        status: StepState.CURRENT,
                                    },
                                    {
                                        id: 3,
                                        title: 'Step 3',
                                        status: StepState.PENDING,
                                    },
                                ]}
                                stepperType={StepperType.HORIZONTAL}
                                clickable={false}
                            />
                            <div style={{ marginTop: '16px' }}>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        color: '#64748b',
                                        marginTop: '12px',
                                    }}
                                >
                                    This stepper is read-only and not
                                    interactive. Steps are still accessible to
                                    screen readers with proper semantic
                                    structure.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Accessibility Features Documentation */}
                    <section
                        style={{
                            marginTop: '48px',
                            padding: '24px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#f9fafb',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                marginBottom: '20px',
                                color: '#1e293b',
                            }}
                        >
                            Accessibility Features
                        </h2>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '24px',
                            }}
                        >
                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Keyboard Navigation
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>2.1.1 Keyboard (Level A)</strong>:
                                    All functionality is keyboard accessible.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        <strong>Tab</strong>: Navigate between
                                        clickable steps
                                    </li>
                                    <li>
                                        <strong>Enter/Space</strong>: Activate
                                        clickable step
                                    </li>
                                    <li>
                                        <strong>Arrow Keys</strong>: Navigate
                                        between steps (when supported)
                                    </li>
                                    <li>
                                        Focus indicators visible on all
                                        interactive elements
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Focus Management
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        2.4.7 Focus Visible (Level AA)
                                    </strong>
                                    : Focus indicators are visible and properly
                                    managed.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Visible focus rings on all interactive
                                        elements
                                    </li>
                                    <li>Logical tab order maintained</li>
                                    <li>
                                        Focus state clearly indicates current
                                        step
                                    </li>
                                    <li>
                                        Focus management for expandable substeps
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Screen Reader Support
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        4.1.2 Name, Role, Value (Level A)
                                    </strong>
                                    : All elements have programmatically
                                    determinable names, roles, and values.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>
                                        Step states announced to screen readers
                                    </li>
                                    <li>
                                        Step titles and descriptions accessible
                                    </li>
                                    <li>
                                        Proper ARIA attributes for step states
                                    </li>
                                    <li>
                                        Decorative icons marked with
                                        aria-hidden="true"
                                    </li>
                                    <li>
                                        Substeps properly announced when
                                        expanded
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        marginBottom: '12px',
                                    }}
                                >
                                    Semantic Structure
                                </h3>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: '#475569',
                                        marginBottom: '8px',
                                    }}
                                >
                                    <strong>
                                        1.3.1 Info and Relationships (Level A)
                                    </strong>
                                    : Information structure is programmatically
                                    determinable.
                                </p>
                                <ul
                                    style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#475569',
                                        fontSize: '14px',
                                    }}
                                >
                                    <li>Semantic HTML structure for steps</li>
                                    <li>
                                        Proper heading hierarchy for step titles
                                    </li>
                                    <li>
                                        Logical content structure maintained
                                    </li>
                                    <li>
                                        Clear visual and programmatic
                                        relationships between steps
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Verification Steps */}
                    <section
                        style={{
                            marginTop: '32px',
                            padding: '24px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                marginBottom: '16px',
                                color: '#1e293b',
                            }}
                        >
                            Accessibility Verification
                        </h2>
                        <p
                            style={{
                                color: '#6b7280',
                                fontSize: '14px',
                                marginBottom: '16px',
                            }}
                        >
                            To verify the accessibility of the Stepper
                            component, follow these steps:
                        </p>
                        <ol
                            style={{
                                margin: 0,
                                paddingLeft: '20px',
                                color: '#475569',
                                fontSize: '14px',
                            }}
                        >
                            <li style={{ marginBottom: '12px' }}>
                                <strong>Storybook a11y addon</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Open the Accessibility panel in
                                        Storybook and verify there are no
                                        violations for these scenarios.
                                    </li>
                                    <li>
                                        Pay special attention to keyboard
                                        accessibility, ARIA attributes, and
                                        focus indicators.
                                    </li>
                                </ul>
                            </li>
                            <li style={{ marginBottom: '12px' }}>
                                <strong>Chromatic visual tests</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Run Chromatic visual tests to ensure
                                        focus ring visibility on interactive
                                        elements.
                                    </li>
                                    <li>
                                        Verify hover/active states and
                                        responsive behavior.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Manual testing</strong>:
                                <ul
                                    style={{
                                        margin: '4px 0 0 0',
                                        paddingLeft: '20px',
                                        listStyleType: 'disc',
                                    }}
                                >
                                    <li>
                                        Navigate using keyboard only (
                                        <code>Tab</code> to focus,{' '}
                                        <code>Enter</code> or <code>Space</code>{' '}
                                        to activate)
                                    </li>
                                    <li>
                                        Test with screen reader (VoiceOver on
                                        macOS or NVDA on Windows)
                                    </li>
                                    <li>
                                        Verify step states are announced
                                        correctly
                                    </li>
                                    <li>
                                        Verify focus indicators are visible on
                                        all interactive elements
                                    </li>
                                    <li>
                                        Check color contrast ratios using WebAIM
                                        Contrast Checker
                                    </li>
                                    <li>
                                        Test expandable substeps with keyboard
                                        navigation
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </section>
                </div>
            )
        }

        return <AccessibilityComponent />
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive examples demonstrating the Stepper component's accessibility features including keyboard navigation, screen reader support, proper ARIA attributes, and focus management across various configurations.
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('navigation'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
