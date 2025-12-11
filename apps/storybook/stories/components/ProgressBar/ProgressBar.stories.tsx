import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
    ProgressBarType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
ProgressBar component for displaying progress indicators.

## Features
- Variants: Solid, Segmented, Circular
- Types: Solid, Segmented (for circular variant)
- Sizes: Small, Medium, Large
- Custom min/max ranges
- Optional percentage labels
- Linear and circular progress bars

## Accessibility

**WCAG Compliance**: 2.0, 2.1, 2.2 Level A, AA Compliant

**Level A Compliance**: ✅ Fully Compliant
- Proper \`role="progressbar"\` attribute
- \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\` attributes
- Accessible name via \`aria-label\` or \`aria-labelledby\`
- Default aria-label generated when not provided
- Screen reader announcements for progress values

**Level AA Compliance**: ✅ Fully Compliant
- Color contrast meets WCAG AA standards (4.5:1)
- Focus indicators visible
- Semantic HTML structure

**Key Accessibility Features**:
- \`role="progressbar"\` for screen reader recognition
- \`aria-valuenow\` reflects current progress value
- \`aria-valuemin\` and \`aria-valuemax\` define range (default 0-100)
- \`aria-label\` or \`aria-labelledby\` for accessible names
- Default aria-label: "Progress: X%" when not provided
- Decorative SVG elements marked with \`aria-hidden="true"\`
- Percentage labels marked with \`aria-hidden="true"\` (value announced via ARIA)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected)
- **jest-axe**: Run \`pnpm test ProgressBar.accessibility\` (34+ tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify progress announcements
- **Full Report**: See Accessibility Dashboard for detailed WCAG compliance report

## Usage

\`\`\`tsx
import { ProgressBar, ProgressBarVariant, ProgressBarSize } from '@juspay/blend-design-system';

// Basic usage
<ProgressBar value={50} />

// With custom range
<ProgressBar value={50} min={0} max={200} aria-label="File upload: 50 of 200 MB" />

// Circular progress bar
<ProgressBar 
  value={75} 
  variant={ProgressBarVariant.CIRCULAR}
  type={ProgressBarType.SOLID}
  showLabel={true}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'number', min: 0, max: 100 },
            description: 'Current progress value',
        },
        size: {
            control: 'select',
            options: Object.values(ProgressBarSize),
            description: 'Size of the progress bar',
        },
        variant: {
            control: 'select',
            options: Object.values(ProgressBarVariant),
            description: 'Visual variant of the progress bar',
        },
        type: {
            control: 'select',
            options: Object.values(ProgressBarType),
            description: 'Type of progress bar (for circular variant)',
        },
        showLabel: {
            control: 'boolean',
            description: 'Show percentage label',
        },
        min: {
            control: { type: 'number' },
            description: 'Minimum value (default: 0)',
        },
        max: {
            control: { type: 'number' },
            description: 'Maximum value (default: 100)',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

// ============================================================================
// Story Categories
// ============================================================================
// Organize stories into logical groups:
// 1. Basic Variants (variants, sizes, types)
// 2. States & Labels
// 3. Custom Ranges
// 4. Real-world Examples
// 5. Interactive & Showcase
// 6. Accessibility Testing
// ============================================================================

// ============================================================================
// Basic Variants
// ============================================================================

/**
 * Default progress bar
 */
export const Default: Story = {
    args: {
        value: 50,
        size: ProgressBarSize.MEDIUM,
        variant: ProgressBarVariant.SOLID,
        type: ProgressBarType.SOLID,
        showLabel: false,
        min: 0,
        max: 100,
    },
}

/**
 * Progress bar variants
 */
export const Variants: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '400px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Solid
                </h4>
                <ProgressBar
                    value={65}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Segmented
                </h4>
                <ProgressBar
                    value={65}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Circular Solid
                </h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressBar
                        value={65}
                        variant={ProgressBarVariant.CIRCULAR}
                        type={ProgressBarType.SOLID}
                        showLabel={true}
                    />
                </div>
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Circular Segmented
                </h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressBar
                        value={65}
                        variant={ProgressBarVariant.CIRCULAR}
                        type={ProgressBarType.SEGMENTED}
                        showLabel={true}
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Solid, Segmented, and Circular variants.',
            },
        },
    },
}

/**
 * Progress bar sizes
 */
export const Sizes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '400px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Small
                </h4>
                <ProgressBar
                    value={50}
                    size={ProgressBarSize.SMALL}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Medium
                </h4>
                <ProgressBar
                    value={50}
                    size={ProgressBarSize.MEDIUM}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Large
                </h4>
                <ProgressBar
                    value={50}
                    size={ProgressBarSize.LARGE}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Small, Medium, and Large sizes.',
            },
        },
    },
}

/**
 * Circular progress bar types
 */
export const CircularTypes: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Solid
                </h4>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SOLID}
                    size={ProgressBarSize.MEDIUM}
                    showLabel={true}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Segmented
                </h4>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SEGMENTED}
                    size={ProgressBarSize.MEDIUM}
                    showLabel={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Solid and Segmented types for circular progress bars.',
            },
        },
    },
}

// ============================================================================
// States & Labels
// ============================================================================

/**
 * With and without labels
 */
export const LabelOptions: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '400px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    With Label
                </h4>
                <ProgressBar
                    value={60}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Without Label
                </h4>
                <ProgressBar
                    value={60}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={false}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bars with and without percentage labels.',
            },
        },
    },
}

/**
 * Different progress values
 */
export const ProgressValues: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '400px',
            }}
        >
            <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>0%</p>
                <ProgressBar
                    value={0}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>25%</p>
                <ProgressBar
                    value={25}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>50%</p>
                <ProgressBar
                    value={50}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>75%</p>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p style={{ marginBottom: '8px', fontSize: '14px' }}>100%</p>
                <ProgressBar
                    value={100}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bars showing different completion percentages.',
            },
        },
    },
}

// ============================================================================
// Custom Ranges
// ============================================================================

/**
 * Custom min/max ranges
 */
export const CustomRanges: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                width: '400px',
            }}
        >
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    File Upload (0-200 MB)
                </h4>
                <p
                    style={{
                        marginBottom: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    50 MB of 200 MB
                </p>
                <ProgressBar
                    value={50}
                    min={0}
                    max={200}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                    aria-label="File upload: 50 of 200 MB"
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Task Completion (0-10 tasks)
                </h4>
                <p
                    style={{
                        marginBottom: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    3 of 10 tasks completed
                </p>
                <ProgressBar
                    value={3}
                    min={0}
                    max={10}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                    aria-label="Task progress: 3 of 10 completed"
                />
            </div>
            <div>
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Storage Usage (0-1000 GB)
                </h4>
                <p
                    style={{
                        marginBottom: '8px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    250 GB of 1000 GB used
                </p>
                <ProgressBar
                    value={250}
                    min={0}
                    max={1000}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                    aria-label="Storage: 250 of 1000 GB used"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bars with custom min/max ranges for non-percentage values.',
            },
        },
    },
}

// ============================================================================
// Real-world Examples
// ============================================================================

/**
 * Real-world use cases
 */
export const UseCases: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '500px',
            }}
        >
            <div
                style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                }}
            >
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    File Upload
                </h4>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Uploading document.pdf
                </p>
                <ProgressBar
                    value={67}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                    aria-label="File upload progress: 67%"
                />
            </div>

            <div
                style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                }}
            >
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Task Completion
                </h4>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    4 of 7 tasks completed
                </p>
                <ProgressBar
                    value={57}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                    aria-label="Task completion: 4 of 7 tasks"
                />
            </div>

            <div
                style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                }}
            >
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Profile Setup
                </h4>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Complete your profile
                </p>
                <ProgressBar
                    value={80}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                    aria-label="Profile completion: 80%"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Real-world examples of progress bar usage.',
            },
        },
    },
}

/**
 * Animated progress example
 */
export const AnimatedProgress: Story = {
    render: () => {
        const AnimatedExample = () => {
            const [progress, setProgress] = useState(0)
            const [isAnimating, setIsAnimating] = useState(false)

            const startAnimation = () => {
                if (isAnimating) return
                setIsAnimating(true)
                setProgress(0)

                const interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= 100) {
                            clearInterval(interval)
                            setIsAnimating(false)
                            return 100
                        }
                        return prev + 2
                    })
                }, 100)
            }

            const resetProgress = () => {
                setProgress(0)
                setIsAnimating(false)
            }

            return (
                <div style={{ width: '400px' }}>
                    <div
                        style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '24px',
                        }}
                    >
                        <button
                            onClick={startAnimation}
                            disabled={isAnimating}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isAnimating ? 'not-allowed' : 'pointer',
                                opacity: isAnimating ? 0.5 : 1,
                            }}
                        >
                            {isAnimating ? 'Animating...' : 'Start Animation'}
                        </button>
                        <button
                            onClick={resetProgress}
                            disabled={isAnimating}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#6b7280',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isAnimating ? 'not-allowed' : 'pointer',
                                opacity: isAnimating ? 0.5 : 1,
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}
                    >
                        <ProgressBar
                            value={progress}
                            variant={ProgressBarVariant.SOLID}
                            showLabel={true}
                            aria-label={`Progress: ${progress}%`}
                        />
                        <ProgressBar
                            value={progress}
                            variant={ProgressBarVariant.SEGMENTED}
                            showLabel={true}
                            aria-label={`Progress: ${progress}%`}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ProgressBar
                                value={progress}
                                variant={ProgressBarVariant.CIRCULAR}
                                type={ProgressBarType.SOLID}
                                showLabel={true}
                                aria-label={`Progress: ${progress}%`}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return <AnimatedExample />
    },
    parameters: {
        docs: {
            description: {
                story: 'Animated progress bars demonstrating smooth transitions.',
            },
        },
    },
}

// ============================================================================
// Interactive & Showcase
// ============================================================================

/**
 * Interactive playground
 */
export const Interactive: Story = {
    args: {
        value: 50,
        size: ProgressBarSize.MEDIUM,
        variant: ProgressBarVariant.SOLID,
        type: ProgressBarType.SOLID,
        showLabel: true,
        min: 0,
        max: 100,
    },
    parameters: {
        docs: {
            description: {
                story: 'Use controls to experiment with progress bar props.',
            },
        },
    },
}

/**
 * Showcase
 */
export const Showcase: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                padding: '24px',
                maxWidth: '600px',
            }}
        >
            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Linear Progress Bars
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ProgressBar
                        value={25}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                    />
                    <ProgressBar
                        value={50}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={true}
                    />
                    <ProgressBar
                        value={75}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                    />
                </div>
            </div>

            <div>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Circular Progress Bars
                </h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '32px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={25}
                            variant={ProgressBarVariant.CIRCULAR}
                            type={ProgressBarType.SOLID}
                            size={ProgressBarSize.SMALL}
                            showLabel={true}
                        />
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                            Small
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={50}
                            variant={ProgressBarVariant.CIRCULAR}
                            type={ProgressBarType.SEGMENTED}
                            size={ProgressBarSize.MEDIUM}
                            showLabel={true}
                        />
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                            Medium
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={75}
                            variant={ProgressBarVariant.CIRCULAR}
                            type={ProgressBarType.SOLID}
                            size={ProgressBarSize.LARGE}
                            showLabel={true}
                        />
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                            Large
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bar variations showcase.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                padding: '24px',
                maxWidth: '600px',
            }}
        >
            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Attributes
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Progress bars have proper ARIA attributes for screen
                    readers:
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ProgressBar
                        value={50}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                        aria-label="Upload progress"
                    />
                    <ProgressBar
                        value={75}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={true}
                        aria-label="Download progress"
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Custom Ranges with Accessible Names
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Progress bars with custom ranges include descriptive
                    aria-labels:
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ProgressBar
                        value={50}
                        min={0}
                        max={200}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                        aria-label="File upload: 50 of 200 MB"
                    />
                    <ProgressBar
                        value={3}
                        min={0}
                        max={10}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={true}
                        aria-label="Task progress: 3 of 10 completed"
                    />
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Circular Progress Bars
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    Circular progress bars maintain accessibility:
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '32px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={60}
                            variant={ProgressBarVariant.CIRCULAR}
                            type={ProgressBarType.SOLID}
                            showLabel={true}
                            aria-label="Processing: 60%"
                        />
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                            Solid
                        </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ProgressBar
                            value={85}
                            variant={ProgressBarVariant.CIRCULAR}
                            type={ProgressBarType.SEGMENTED}
                            showLabel={true}
                            aria-label="Processing: 85%"
                        />
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>
                            Segmented
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Default aria-label Generation
                </h3>
                <p
                    style={{
                        marginBottom: '16px',
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    When aria-label is not provided, a default is generated:
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <ProgressBar
                        value={45}
                        variant={ProgressBarVariant.SOLID}
                        showLabel={true}
                    />
                    <ProgressBar
                        value={90}
                        variant={ProgressBarVariant.SEGMENTED}
                        showLabel={true}
                    />
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating ARIA attributes, accessible names, custom ranges, and screen reader support.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0)
   - Review passing tests
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test ProgressBar.accessibility
   \`\`\`
   - 34+ automated tests
   - WCAG 2.0, 2.1, 2.2 compliance verification
   - ARIA attribute validation

3. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Verify progress announcements
   - Check aria-valuenow updates

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.0, 2.1, 2.2 Level A**: Fully Compliant
- ✅ **WCAG 2.0, 2.1, 2.2 Level AA**: Fully Compliant

**Key Features**:
- \`role="progressbar"\` for proper semantic meaning
- \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\` attributes
- Accessible names via \`aria-label\` or \`aria-labelledby\`
- Default aria-label generation when not provided
- Decorative elements marked with \`aria-hidden="true"\`
- Screen reader announcements for progress values

📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis
                `,
            },
        },
        a11y: getA11yConfig('interactive'),
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
