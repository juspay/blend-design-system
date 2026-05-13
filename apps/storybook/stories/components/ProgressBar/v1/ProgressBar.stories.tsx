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
} from '../../../../.storybook/a11y.config'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'ProgressBar component for displaying progress indicators.',
        docs: {
            description: {
                component: `
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
    render: (args) => (
        <div className="w-100">
            <ProgressBar {...args} />
        </div>
    ),
}

/**
 * Progress bar variants
 */
export const Variants: Story = {
    render: () => (
        <div className="flex flex-col gap-6 w-100">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Solid</h4>
                <ProgressBar
                    value={65}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">Segmented</h4>
                <ProgressBar
                    value={65}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                />
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">Circular Solid</h4>
                <div className="flex justify-center">
                    <ProgressBar
                        value={65}
                        variant={ProgressBarVariant.CIRCULAR}
                        type={ProgressBarType.SOLID}
                        showLabel={true}
                    />
                </div>
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">
                    Circular Segmented
                </h4>
                <div className="flex justify-center">
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
        <div className="flex flex-col gap-6 w-100">
            <div>
                <h4 className="mb-2 text-sm font-semibold">Small</h4>
                <ProgressBar
                    value={50}
                    size={ProgressBarSize.SMALL}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">Medium</h4>
                <ProgressBar
                    value={50}
                    size={ProgressBarSize.MEDIUM}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">Large</h4>
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
        <div className="flex gap-8 items-center justify-center flex-wrap">
            <div className="text-center">
                <h4 className="mb-3 text-sm font-semibold">Solid</h4>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.CIRCULAR}
                    type={ProgressBarType.SOLID}
                    size={ProgressBarSize.MEDIUM}
                    showLabel={true}
                />
            </div>
            <div className="text-center">
                <h4 className="mb-3 text-sm font-semibold">Segmented</h4>
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
        <div className="flex flex-col gap-6 w-100">
            <div>
                <h4 className="mb-2 text-sm font-semibold">With Label</h4>
                <ProgressBar
                    value={60}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <h4 className="mb-2 text-sm font-semibold">Without Label</h4>
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
        <div className="flex flex-col gap-6 w-100">
            <div>
                <p className="mb-2 text-sm">0%</p>
                <ProgressBar
                    value={0}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p className="mb-2 text-sm">25%</p>
                <ProgressBar
                    value={25}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p className="mb-2 text-sm">50%</p>
                <ProgressBar
                    value={50}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p className="mb-2 text-sm">75%</p>
                <ProgressBar
                    value={75}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                />
            </div>
            <div>
                <p className="mb-2 text-sm">100%</p>
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
        <div className="flex flex-col gap-8 w-100">
            <div>
                <h4 className="mb-2 text-sm font-semibold">
                    File Upload (0-200 MB)
                </h4>
                <p className="mb-2 text-xs text-gray-600">50 MB of 200 MB</p>
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
                <h4 className="mb-2 text-sm font-semibold">
                    Task Completion (0-10 tasks)
                </h4>
                <p className="mb-2 text-xs text-gray-600">
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
                <h4 className="mb-2 text-sm font-semibold">
                    Storage Usage (0-1000 GB)
                </h4>
                <p className="mb-2 text-xs text-gray-600">
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
        <div className="flex flex-col gap-6 w-100">
            <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="mb-2 text-sm font-semibold">File Upload</h4>
                <p className="mb-3 text-xs text-gray-600">
                    Uploading document.pdf
                </p>
                <ProgressBar
                    value={67}
                    variant={ProgressBarVariant.SOLID}
                    showLabel={true}
                    aria-label="File upload progress: 67%"
                />
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="mb-2 text-sm font-semibold">Task Completion</h4>
                <p className="mb-3 text-xs text-gray-600">
                    4 of 7 tasks completed
                </p>
                <ProgressBar
                    value={57}
                    variant={ProgressBarVariant.SEGMENTED}
                    showLabel={true}
                    aria-label="Task completion: 4 of 7 tasks"
                />
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="mb-2 text-sm font-semibold">Profile Setup</h4>
                <p className="mb-3 text-xs text-gray-600">
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
                <div className="w-100">
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={startAnimation}
                            disabled={isAnimating}
                            className={`px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAnimating ? 'Animating...' : 'Start Animation'}
                        </button>
                        <button
                            onClick={resetProgress}
                            disabled={isAnimating}
                            className={`px-4 py-2 bg-gray-500 text-white border-none rounded cursor-pointer ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
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
                        <div className="flex justify-center">
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
