import React, { createRef } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import StepperV2 from '../../../lib/components/StepperV2/StepperV2'
import {
    StepperV2Type,
    StepperV2StepStatus,
    type StepperV2Step,
} from '../../../lib/components/StepperV2/stepperV2.types'

const horizontalSteps: StepperV2Step[] = [
    { id: 1, title: 'Alpha', status: StepperV2StepStatus.COMPLETED },
    { id: 2, title: 'Beta', status: StepperV2StepStatus.CURRENT },
    { id: 3, title: 'Gamma', status: StepperV2StepStatus.PENDING },
]

describe('StepperV2', () => {
    describe('horizontal', () => {
        it('renders step titles and progress group label', () => {
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
            ).toBeInTheDocument()
            expect(screen.getByText('Alpha')).toBeInTheDocument()
            expect(screen.getByText('Beta')).toBeInTheDocument()
            expect(screen.getByText('Gamma')).toBeInTheDocument()
        })

        it('marks the current step with aria-current on the step control', () => {
            render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )

            const current = screen.getByRole('group', { name: /Beta/ })
            expect(current).toHaveAttribute('aria-current', 'step')
        })

        it('uses role button for steps when clickable', () => {
            render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )

            expect(screen.getAllByRole('button')).toHaveLength(3)
        })

        it('calls onStepClick with index when a clickable step is activated', async () => {
            const onStepClick = vi.fn()
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )

            await user.click(screen.getByRole('button', { name: 'Alpha' }))
            expect(onStepClick).toHaveBeenCalledWith(0)
        })

        it('does not call onStepClick when the step is disabled', async () => {
            const onStepClick = vi.fn()
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

            const { user } = render(
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )

            await user.click(screen.getByText('Locked'))
            expect(onStepClick).not.toHaveBeenCalled()
        })
    })

    describe('vertical', () => {
        const verticalSteps: StepperV2Step[] = [
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

        it('renders vertical layout with substeps when provided', () => {
            render(
                <StepperV2
                    steps={verticalSteps}
                    stepperType={StepperV2Type.VERTICAL}
                />
            )

            expect(
                screen.getByRole('group', {
                    name: 'Progress indicator: step 2 of 3',
                })
            ).toBeInTheDocument()
            expect(screen.getByText('Peer review')).toBeInTheDocument()
            expect(screen.getByText('QA')).toBeInTheDocument()
        })

        it('calls onSubstepClick with step id and 1-based substep index', async () => {
            const onSubstepClick = vi.fn()
            const { user } = render(
                <StepperV2
                    steps={verticalSteps}
                    stepperType={StepperV2Type.VERTICAL}
                    clickable
                    onSubstepClick={onSubstepClick}
                />
            )

            await user.click(
                screen.getByRole('button', { name: /Substep 2: QA, pending/ })
            )
            expect(onSubstepClick).toHaveBeenCalledWith(2, 2)
        })
    })

    describe('ref', () => {
        it('forwards ref to the root stepper element', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <StepperV2
                    ref={ref}
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )

            expect(ref.current).toBeInstanceOf(HTMLDivElement)
            expect(ref.current?.getAttribute('data-stepper')).toBe('stepper')
        })
    })
})
