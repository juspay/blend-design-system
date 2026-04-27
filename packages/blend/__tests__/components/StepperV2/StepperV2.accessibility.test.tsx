import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

        it('vertical step with description has no detectable violations', async () => {
            const steps: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'With help',
                    status: StepperV2StepStatus.CURRENT,
                    description: 'Extra context for assistive technologies.',
                },
            ]
            const { container } = render(
                <StepperV2 steps={steps} stepperType={StepperV2Type.VERTICAL} />
            )
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('WCAG 4.1.2 Name, role, and value (Level A)', () => {
        it('marks the current step with aria-current="step"', () => {
            render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )
            const current = screen.getByRole('group', { name: /Step 2/ })
            expect(current).toHaveAttribute('aria-current', 'step')
        })

        it('exposes a disabled step as a group with aria-disabled, not a button', () => {
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
            render(
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )
            const locked = screen.getByRole('group', { name: /Locked/ })
            expect(locked).toHaveAttribute('aria-disabled', 'true')
            expect(screen.getAllByRole('button')).toHaveLength(2)
        })

        it('gives substep rows an accessible name that includes substep number and state', () => {
            render(
                <StepperV2
                    steps={verticalStepsWithSubsteps}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onSubstepClick={vi.fn()}
                />
            )
            expect(
                screen.getByRole('button', {
                    name: /Substep 1: Peer review, current/,
                })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /Substep 2: QA, pending/ })
            ).toBeInTheDocument()
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

        it('clickable horizontal steps are focusable; ArrowRight and ArrowLeft move focus', async () => {
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

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(buttons[2])

            await user.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(buttons[1])
        })

        it('moves focus to the first and last focusable step with Home and End (horizontal)', async () => {
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )
            const first = screen.getByRole('button', { name: /Step 1/ })
            const mid = screen.getByRole('button', { name: /Step 2/ })
            const last = screen.getByRole('button', { name: /Step 3/ })
            mid.focus()
            await user.keyboard('{Home}')
            expect(document.activeElement).toBe(first)
            await user.keyboard('{End}')
            expect(document.activeElement).toBe(last)
        })

        it('clickable vertical steps move focus with ArrowDown and ArrowUp', async () => {
            const simpleVertical: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'First',
                    status: StepperV2StepStatus.CURRENT,
                },
                { id: 2, title: 'Second', status: StepperV2StepStatus.PENDING },
            ]
            const { user } = render(
                <StepperV2
                    steps={simpleVertical}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )

            const first = screen.getByRole('button', { name: /First/ })
            const second = screen.getByRole('button', { name: /Second/ })
            first.focus()
            expect(document.activeElement).toBe(first)
            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(second)
            await user.keyboard('{ArrowUp}')
            expect(document.activeElement).toBe(first)
        })

        it('moves focus to the first and last focusable step with Home and End (vertical)', async () => {
            const simpleVertical: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'First',
                    status: StepperV2StepStatus.CURRENT,
                },
                { id: 2, title: 'Second', status: StepperV2StepStatus.PENDING },
                { id: 3, title: 'Third', status: StepperV2StepStatus.PENDING },
            ]
            const { user } = render(
                <StepperV2
                    steps={simpleVertical}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )
            const first = screen.getByRole('button', { name: /First/ })
            const second = screen.getByRole('button', { name: /Second/ })
            const third = screen.getByRole('button', { name: /Third/ })
            second.focus()
            await user.keyboard('{Home}')
            expect(document.activeElement).toBe(first)
            await user.keyboard('{End}')
            expect(document.activeElement).toBe(third)
        })

        it('clickable horizontal step activates with Space or Enter', async () => {
            const onStepClick = vi.fn()
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )

            const lastStep = screen.getByRole('button', { name: /Step 3/ })
            lastStep.focus()
            await user.keyboard(' ')
            expect(onStepClick).toHaveBeenLastCalledWith(2)

            onStepClick.mockClear()
            const second = screen.getByRole('button', { name: /Step 2/ })
            second.focus()
            await user.keyboard('{Enter}')
            expect(onStepClick).toHaveBeenLastCalledWith(1)
        })

        it('clickable vertical step activates with Space after ArrowDown (second step)', async () => {
            const onStepClick = vi.fn()
            const simpleVertical: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'One',
                    status: StepperV2StepStatus.CURRENT,
                },
                { id: 2, title: 'Two', status: StepperV2StepStatus.PENDING },
            ]
            const { user } = render(
                <StepperV2
                    steps={simpleVertical}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )
            const one = screen.getByRole('button', { name: /One/ })
            one.focus()
            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(
                screen.getByRole('button', { name: /Two/ })
            )
            await user.keyboard(' ')
            expect(onStepClick).toHaveBeenCalledWith(1)
        })
    })
})
