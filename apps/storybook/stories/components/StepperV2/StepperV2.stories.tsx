import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, fn, userEvent, within, waitFor } from '@storybook/test'

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
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 400,
        },
        docsSubtitle:
            'Token-driven stepper (horizontal/vertical) with step states, optional vertical substeps, and full keyboard support when clickable.',
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

## Testing in Storybook
- **Accessibility**: Use the **Accessibility** add-on (WCAG 2.2 rules from \`a11y.config\` navigation preset). The root exposes \`role="group"\`, \`aria-label\` progress text, and \`aria-roledescription="stepper"\`.
- **Visual / Chromatic**: \`parameters.chromatic\` uses shared viewports; \`Visual / regression\` story stacks variants for a single snapshot. Adjust \`delay\` if your CI capture runs before layout is stable.
- **Interactions**: Stories marked with **play functions** assert focus, arrow navigation, and callback args (\`@storybook/test\`). Run from the **Interactions** panel or the play icon in the toolbar.

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
        steps: {
            control: 'object',
            description:
                'Array of steps (id, title, status, optional description, icon, substeps, …)',
        },
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

const horizontalThreeSteps: StepperV2Step[] = [
    { id: 1, title: 'Account', status: StepperV2StepStatus.COMPLETED },
    { id: 2, title: 'Shipping', status: StepperV2StepStatus.CURRENT },
    { id: 3, title: 'Payment', status: StepperV2StepStatus.PENDING },
]

const verticalTwoSteps: StepperV2Step[] = [
    { id: 1, title: 'One', status: StepperV2StepStatus.CURRENT },
    { id: 2, title: 'Two', status: StepperV2StepStatus.PENDING },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        expect(
            canvas.getByRole('group', {
                name: /Progress indicator: step 2 of 4/,
            })
        ).toBeInTheDocument()
        expect(canvas.getByText('Account')).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: 'Read-only: progress group, titles, and current step (Shipping).',
            },
        },
    },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const first = canvas.getByRole('button', { name: /Account/ })
        first.focus()
        await expect(first).toHaveFocus()
        await userEvent.keyboard('{ArrowRight}')
        const second = canvas.getByRole('button', { name: /Shipping/ })
        await waitFor(() => expect(second).toHaveFocus())
        await userEvent.keyboard('{ArrowLeft}')
        await waitFor(() => expect(first).toHaveFocus())
    },
    parameters: {
        docs: {
            description: {
                story: 'Stateful selection demo. Interaction test: Left/Right arrows move roving focus between step buttons; Space/Enter would activate the focused step (try manually).',
            },
        },
    },
}

/** Args-driven horizontal stepper for Actions + interaction tests */
export const InteractionHorizontal: Story = {
    name: 'Interaction (horizontal keyboard)',
    args: {
        steps: horizontalThreeSteps,
        stepperType: StepperV2Type.HORIZONTAL,
        clickable: true,
        onStepClick: fn(),
    },
    render: (args) => (
        <div style={{ maxWidth: 640 }}>
            <StepperV2 {...args} />
        </div>
    ),
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const onStepClick = args.onStepClick

        const first = canvas.getByRole('button', { name: /Account/ })
        first.focus()
        await userEvent.keyboard('{ArrowRight}')
        const second = canvas.getByRole('button', { name: /Shipping/ })
        await waitFor(() => expect(second).toHaveFocus())
        await userEvent.keyboard(' ')
        await expect(onStepClick).toHaveBeenCalledWith(1)
    },
    parameters: {
        docs: {
            description: {
                story: 'Uses **play** to verify focus with ArrowRight, then Space to fire `onStepClick(1)` on the second step. Open the **Interactions** tab to re-run.',
            },
        },
    },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        expect(
            canvas.getByText(
                'Optional copy shown under the title in this layout.'
            )
        ).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical **description** text below titles; check **Accessibility** for label/description wiring.',
            },
        },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        expect(
            canvas.getByRole('group', {
                name: /Progress indicator: step 2 of 3/,
            })
        ).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: 'Substeps visible in the right column when the Review step is expanded (default for substeps).',
            },
        },
    },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const sub = canvas.getByRole('button', {
            name: /Substep 2: QA sign-off, pending/,
        })
        await userEvent.click(sub)
        expect(
            canvas.getByRole('group', { name: /Progress indicator/ })
        ).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: 'State machine for steps/substeps. Interaction test: clicks a substep button; full callback assertions live in `Interaction (substep click)`.',
            },
        },
    },
}

export const InteractionVertical: Story = {
    name: 'Interaction (vertical keyboard)',
    args: {
        steps: verticalTwoSteps,
        stepperType: StepperV2Type.VERTICAL,
        clickable: true,
        onStepClick: fn(),
    },
    render: (args) => (
        <div style={{ maxWidth: 400 }}>
            <StepperV2 {...args} />
        </div>
    ),
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const onStepClick = args.onStepClick
        const one = canvas.getByRole('button', { name: /One/ })
        one.focus()
        await userEvent.keyboard('{ArrowDown}')
        const two = canvas.getByRole('button', { name: /Two/ })
        await waitFor(() => expect(two).toHaveFocus())
        await userEvent.keyboard(' ')
        await expect(onStepClick).toHaveBeenCalledWith(1)
    },
    parameters: {
        docs: {
            description: {
                story: 'Verifies **ArrowDown** to move focus, **Space** to call `onStepClick` on the second step.',
            },
        },
    },
}

export const InteractionSubstep: Story = {
    name: 'Interaction (substep click callback)',
    args: {
        steps: verticalStepsStatic,
        stepperType: StepperV2Type.VERTICAL,
        clickable: true,
        onStepClick: fn(),
        onSubstepClick: fn(),
    },
    render: (args) => (
        <div style={{ minHeight: 420, maxWidth: 480 }}>
            <StepperV2 {...args} />
        </div>
    ),
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const onSubstepClick = args.onSubstepClick
        const btn = canvas.getByRole('button', {
            name: /Substep 2: QA sign-off, pending/,
        })
        await userEvent.click(btn)
        await expect(onSubstepClick).toHaveBeenCalledWith(2, 2)
    },
    parameters: {
        docs: {
            description: {
                story: 'Clicks a substep; expects `onSubstepClick(stepId, 1-based index)` — here **(2, 2)** for Review (id 2) and second substep.',
            },
        },
    },
}

/**
 * Stacked grid for visual regression: horizontal, vertical, disabled.
 * Chromatic captures each viewport; increase delay if flaking.
 */
export const VisualRegressions: Story = {
    name: 'Visual / regression',
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 48,
                maxWidth: 800,
            }}
        >
            <section>
                <h3
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        margin: '0 0 12px',
                        color: 'var(--bs-gray-11, #525866)',
                    }}
                >
                    Horizontal (static)
                </h3>
                <div style={{ maxWidth: 720 }}>
                    <StepperV2
                        steps={horizontalThreeSteps}
                        stepperType={StepperV2Type.HORIZONTAL}
                    />
                </div>
            </section>
            <section>
                <h3
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        margin: '0 0 12px',
                        color: 'var(--bs-gray-11, #525866)',
                    }}
                >
                    Vertical (substeps)
                </h3>
                <div style={{ minHeight: 360, maxWidth: 480 }}>
                    <StepperV2
                        steps={verticalStepsStatic}
                        stepperType={StepperV2Type.VERTICAL}
                    />
                </div>
            </section>
            <section>
                <h3
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        margin: '0 0 12px',
                        color: 'var(--bs-gray-11, #525866)',
                    }}
                >
                    Horizontal (disabled step)
                </h3>
                <div style={{ maxWidth: 720 }}>
                    <StepperV2
                        steps={[
                            {
                                id: 1,
                                title: 'Done',
                                status: StepperV2StepStatus.COMPLETED,
                            },
                            {
                                id: 2,
                                title: 'Locked',
                                status: StepperV2StepStatus.PENDING,
                                disabled: true,
                            },
                            {
                                id: 3,
                                title: 'Next',
                                status: StepperV2StepStatus.CURRENT,
                            },
                        ]}
                        stepperType={StepperV2Type.HORIZONTAL}
                    />
                </div>
            </section>
        </div>
    ),
    parameters: {
        chromatic: { ...CHROMATIC_CONFIG, delay: 500 },
        docs: {
            description: {
                story: '**Chromatic** / visual regression: one canvas with three representative states. Tweak `parameters.chromatic.delay` if shots capture before paint.',
            },
        },
    },
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
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        expect(canvas.getByText('Locked')).toBeInTheDocument()
        const buttons = canvas.getAllByRole('button')
        expect(buttons).toHaveLength(2)
    },
    parameters: {
        docs: {
            description: {
                story: 'Locked middle step is not an interactive **button** (two tab stops). Use **A11y** to confirm disabled state semantics.',
            },
        },
    },
}
