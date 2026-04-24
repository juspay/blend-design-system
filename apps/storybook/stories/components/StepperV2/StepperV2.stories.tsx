import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { fn } from '@storybook/test'

import { StepperV2 } from '../../../../../packages/blend/lib/components/StepperV2'
import {
    StepperV2Type,
    StepperV2StepStatus,
    type StepperV2Step,
} from '../../../../../packages/blend/lib/components/StepperV2/stepperV2.types'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof StepperV2> = {
    title: 'Components/StepperV2',
    component: StepperV2,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Token-driven stepper with horizontal and vertical layouts, optional substeps (vertical only), and accessible keyboard navigation when \`clickable\` is enabled.

## Features
- **Layouts**: \`stepperType\` — \`horizontal\` (default) or \`vertical\`
- **States**: completed, current, pending, disabled, skipped via \`StepperV2StepStatus\`
- **Descriptions**: \`description\` on a step is shown in the **vertical** layout (below the title). Horizontal shows the title row only.
- **Vertical substeps**: \`substeps\` array; \`onSubstepClick(stepId, substepIndex)\` uses **1-based** \`substepIndex\`
- **Interactive**: \`clickable\` with \`onStepClick(stepIndex)\` — **horizontal**: \`ArrowLeft\` / \`ArrowRight\`, **vertical**: \`ArrowUp\` / \`ArrowDown\`; \`Home\` / \`End\` jump to first / last step when applicable

## Usage

\`\`\`tsx
import { StepperV2, StepperV2Type, StepperV2StepStatus } from '@juspay/blend-design-system';

const steps = [
  { id: 1, title: 'Account', status: StepperV2StepStatus.COMPLETED },
  { id: 2, title: 'Shipping', status: StepperV2StepStatus.CURRENT },
  { id: 3, title: 'Review', status: StepperV2StepStatus.PENDING },
];

<StepperV2
  steps={steps}
  clickable
  onStepClick={(i) => {}}
  stepperType={StepperV2Type.HORIZONTAL}
/>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        clickable: {
            control: 'boolean',
            description:
                'When true, steps are focusable, emit onStepClick, and support keyboard navigation between steps',
        },
        stepperType: {
            control: 'select',
            options: Object.values(StepperV2Type),
            description:
                'Horizontal: Left/Right between steps. Vertical: Up/Down between steps',
        },
        onStepClick: { description: 'Called with the step index (0-based)' },
        onSubstepClick: {
            description:
                'Vertical only. (stepId, substepIndex) where substepIndex is 1-based',
        },
    },
    args: {
        onStepClick: fn(),
        onSubstepClick: fn(),
    },
}

export default meta

type Story = StoryObj<typeof StepperV2>

const horizontalStepsStatic: StepperV2Step[] = [
    { id: 1, title: 'Account', status: StepperV2StepStatus.COMPLETED },
    { id: 2, title: 'Shipping', status: StepperV2StepStatus.CURRENT },
    { id: 3, title: 'Payment', status: StepperV2StepStatus.PENDING },
    { id: 4, title: 'Review', status: StepperV2StepStatus.PENDING },
]

export const Horizontal: Story = {
    args: {
        steps: horizontalStepsStatic,
        stepperType: StepperV2Type.HORIZONTAL,
        clickable: false,
    },
    render: (args) => (
        <div style={{ maxWidth: 720 }}>
            <StepperV2 {...args} />
        </div>
    ),
}

function HorizontalClickableDemo() {
    const [steps, setSteps] = useState<StepperV2Step[]>([
        { id: 1, title: 'Account', status: StepperV2StepStatus.COMPLETED },
        { id: 2, title: 'Shipping', status: StepperV2StepStatus.CURRENT },
        { id: 3, title: 'Payment', status: StepperV2StepStatus.PENDING },
        { id: 4, title: 'Review', status: StepperV2StepStatus.PENDING },
    ])

    const handleStepClick = (index: number) => {
        setSteps((prev) =>
            prev.map((step, i) => {
                if (i < index) {
                    return {
                        ...step,
                        status:
                            step.status === StepperV2StepStatus.COMPLETED
                                ? StepperV2StepStatus.COMPLETED
                                : StepperV2StepStatus.SKIPPED,
                    }
                }
                if (i > index) {
                    return {
                        ...step,
                        status:
                            step.status === StepperV2StepStatus.COMPLETED
                                ? StepperV2StepStatus.COMPLETED
                                : StepperV2StepStatus.PENDING,
                    }
                }
                return { ...step, status: StepperV2StepStatus.CURRENT }
            })
        )
    }

    return (
        <div style={{ maxWidth: 720 }}>
            <StepperV2
                steps={steps}
                stepperType={StepperV2Type.HORIZONTAL}
                clickable
                onStepClick={handleStepClick}
            />
        </div>
    )
}

export const HorizontalClickable: Story = {
    name: 'Horizontal (clickable)',
    render: () => <HorizontalClickableDemo />,
}

export const VerticalWithDescriptions: Story = {
    name: 'Vertical (with descriptions)',
    render: () => {
        const steps: StepperV2Step[] = [
            {
                id: 1,
                title: 'Draft',
                status: StepperV2StepStatus.COMPLETED,
                description: 'Content is saved automatically.',
            },
            {
                id: 2,
                title: 'Review',
                status: StepperV2StepStatus.CURRENT,
                description:
                    'Optional copy shown under the title in this layout.',
            },
            {
                id: 3,
                title: 'Publish',
                status: StepperV2StepStatus.PENDING,
            },
        ]
        return (
            <div style={{ minHeight: 320, maxWidth: 480 }}>
                <StepperV2 steps={steps} stepperType={StepperV2Type.VERTICAL} />
            </div>
        )
    },
}

const verticalStepsStatic: StepperV2Step[] = [
    { id: 1, title: 'Draft', status: StepperV2StepStatus.COMPLETED },
    {
        id: 2,
        title: 'Review',
        status: StepperV2StepStatus.CURRENT,
        substeps: [
            {
                id: 1,
                title: 'Peer review',
                status: StepperV2StepStatus.CURRENT,
            },
            {
                id: 2,
                title: 'QA sign-off',
                status: StepperV2StepStatus.PENDING,
            },
        ],
    },
    { id: 3, title: 'Publish', status: StepperV2StepStatus.PENDING },
]

export const Vertical: Story = {
    args: {
        steps: verticalStepsStatic,
        stepperType: StepperV2Type.VERTICAL,
        clickable: false,
    },
    render: (args) => (
        <div style={{ minHeight: 420, maxWidth: 480 }}>
            <StepperV2 {...args} />
        </div>
    ),
}

function VerticalClickableDemo() {
    const substepsAllPending = (step: StepperV2Step) =>
        step.substeps?.map((ss) => ({
            ...ss,
            status: StepperV2StepStatus.PENDING,
        }))

    const [steps, setSteps] = useState<StepperV2Step[]>([
        { id: 1, title: 'Draft', status: StepperV2StepStatus.COMPLETED },
        {
            id: 2,
            title: 'Review',
            status: StepperV2StepStatus.CURRENT,
            substeps: [
                {
                    id: 1,
                    title: 'Peer review',
                    status: StepperV2StepStatus.CURRENT,
                },
                {
                    id: 2,
                    title: 'QA sign-off',
                    status: StepperV2StepStatus.PENDING,
                },
            ],
        },
        { id: 3, title: 'Publish', status: StepperV2StepStatus.PENDING },
    ])

    const handleStepClick = (stepIndex: number) => {
        setSteps((prev) =>
            prev.map((step, i) => {
                if (i < stepIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.SKIPPED
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                if (i > stepIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.PENDING
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                return {
                    ...step,
                    status: StepperV2StepStatus.CURRENT,
                    substeps: substepsAllPending(step),
                }
            })
        )
    }

    const handleSubstepClick = (
        stepId: number,
        substepOrdinal1Based: number
    ) => {
        const subArrayIndex = substepOrdinal1Based - 1
        setSteps((prev) => {
            const stepArrayIndex = prev.findIndex((s) => s.id === stepId)
            if (stepArrayIndex < 0) return prev
            const target = prev[stepArrayIndex]
            if (
                !target.substeps ||
                subArrayIndex < 0 ||
                subArrayIndex >= target.substeps.length
            ) {
                return prev
            }
            return prev.map((step, i) => {
                if (i < stepArrayIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.SKIPPED
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                if (i > stepArrayIndex) {
                    const nextStatus =
                        step.status === StepperV2StepStatus.COMPLETED
                            ? StepperV2StepStatus.COMPLETED
                            : StepperV2StepStatus.PENDING
                    return {
                        ...step,
                        status: nextStatus,
                        substeps:
                            nextStatus === StepperV2StepStatus.COMPLETED
                                ? step.substeps
                                : substepsAllPending(step),
                    }
                }
                return {
                    ...step,
                    status: StepperV2StepStatus.CURRENT,
                    substeps: step.substeps!.map((ss, j) => ({
                        ...ss,
                        status:
                            j < subArrayIndex
                                ? StepperV2StepStatus.COMPLETED
                                : j === subArrayIndex
                                  ? StepperV2StepStatus.CURRENT
                                  : StepperV2StepStatus.PENDING,
                    })),
                }
            })
        })
    }

    return (
        <div style={{ minHeight: 420, maxWidth: 480 }}>
            <StepperV2
                steps={steps}
                stepperType={StepperV2Type.VERTICAL}
                clickable
                onStepClick={handleStepClick}
                onSubstepClick={handleSubstepClick}
            />
        </div>
    )
}

export const VerticalClickable: Story = {
    name: 'Vertical (clickable + substeps)',
    render: () => <VerticalClickableDemo />,
}

export const WithDisabledStep: Story = {
    name: 'Horizontal (with disabled step)',
    render: () => {
        const steps: StepperV2Step[] = [
            { id: 1, title: 'Done', status: StepperV2StepStatus.COMPLETED },
            {
                id: 2,
                title: 'Locked',
                status: StepperV2StepStatus.PENDING,
                disabled: true,
            },
            { id: 3, title: 'Next', status: StepperV2StepStatus.CURRENT },
        ]
        return (
            <div style={{ maxWidth: 720 }}>
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={fn()}
                />
            </div>
        )
    },
}
