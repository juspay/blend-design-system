import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import StepperV2 from '../../../lib/components/StepperV2/StepperV2'
import {
    StepperV2Type,
    StepperV2StepStatus,
    type StepperV2Step,
} from '../../../lib/components/StepperV2/stepperV2.types'

const horizontalSteps: StepperV2Step[] = [
    { id: 1, title: 'Step 1', status: StepperV2StepStatus.COMPLETED },
    { id: 2, title: 'Step 2', status: StepperV2StepStatus.CURRENT },
    { id: 3, title: 'Step 3', status: StepperV2StepStatus.PENDING },
]

const verticalStepsWithSubsteps: StepperV2Step[] = [
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
                title: 'QA',
                status: StepperV2StepStatus.PENDING,
            },
        ],
    },
    { id: 3, title: 'Ship', status: StepperV2StepStatus.PENDING },
]

describe('StepperV2 Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.1 (axe-core)', () => {
        it('horizontal stepper has no detectable violations', async () => {
            const { container } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('horizontal clickable stepper has no detectable violations', async () => {
            const { container } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('vertical stepper has no detectable violations', async () => {
            const { container } = render(
                <StepperV2
                    steps={verticalStepsWithSubsteps}
                    stepperType={StepperV2Type.VERTICAL}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('vertical clickable stepper with substeps has no detectable violations', async () => {
            const { container } = render(
                <StepperV2
                    steps={verticalStepsWithSubsteps}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onStepClick={vi.fn()}
                    onSubstepClick={vi.fn()}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('horizontal stepper with disabled step has no detectable violations', async () => {
            const steps: StepperV2Step[] = [
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
                    title: 'Current',
                    status: StepperV2StepStatus.CURRENT,
                },
            ]
            const { container } = render(
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })

        it('horizontal step with description has no detectable violations', async () => {
            const steps: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'With help',
                    status: StepperV2StepStatus.CURRENT,
                    description: 'Extra context for assistive technologies.',
                },
            ]
            const { container } = render(
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('exposes the stepper landmark with an accessible name', () => {
            render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )
            expect(
                screen.getByRole('group', {
                    name: 'Progress indicator: step 2 of 3',
                })
            ).toHaveAttribute('aria-roledescription', 'stepper')
        })

        it('clickable horizontal steps are focusable and ArrowRight moves focus', async () => {
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )

            const buttons = screen.getAllByRole('button')
            expect(buttons).toHaveLength(3)

            buttons[0]!.focus()
            expect(document.activeElement).toBe(buttons[0])

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(buttons[1])
        })

        it('clickable horizontal step activates with Space', async () => {
            const onStepClick = vi.fn()
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )

            const lastStep = screen.getByRole('button', { name: 'Step 3' })
            lastStep.focus()
            await user.keyboard(' ')
            expect(onStepClick).toHaveBeenCalledWith(2)
        })
    })
})
