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

        it('uses horizontal layout when stepperType is omitted (default)', () => {
            render(<StepperV2 steps={horizontalSteps} />)

            expect(
                screen.getByRole('group', {
                    name: 'Progress indicator: step 2 of 3',
                })
            ).toBeInTheDocument()
            expect(screen.getByText('Beta')).toBeInTheDocument()
        })

        it('marks the current step with aria-current on the step control', () => {
            const { container } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                />
            )

            // Verify aria-current="step" exists somewhere in the rendered output
            const elementWithAriaCurrent = container.querySelector(
                '[aria-current="step"]'
            )
            expect(elementWithAriaCurrent).toBeInTheDocument()
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

            await user.click(screen.getByRole('button', { name: /Alpha/ }))
            expect(onStepClick).toHaveBeenCalledWith(0)
        })

        it('calls onStepClick when a clickable step is activated with Enter or Space', async () => {
            const onStepClick = vi.fn()
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={onStepClick}
                />
            )

            const beta = screen.getByRole('button', { name: /Beta/ })
            beta.focus()
            await user.keyboard('{Enter}')
            expect(onStepClick).toHaveBeenLastCalledWith(1)

            onStepClick.mockClear()
            const gamma = screen.getByRole('button', { name: /Gamma/ })
            gamma.focus()
            await user.keyboard(' ')
            expect(onStepClick).toHaveBeenLastCalledWith(2)
        })

        it('moves focus to first and last focusable step with Home and End', async () => {
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )

            const alpha = screen.getByRole('button', { name: /Alpha/ })
            const beta = screen.getByRole('button', { name: /Beta/ })
            const gamma = screen.getByRole('button', { name: /Gamma/ })

            beta.focus()
            await user.keyboard('{Home}')
            expect(document.activeElement).toBe(alpha)

            await user.keyboard('{End}')
            expect(document.activeElement).toBe(gamma)
        })

        it('moves focus between clickable steps with ArrowRight and ArrowLeft', async () => {
            const { user } = render(
                <StepperV2
                    steps={horizontalSteps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable
                    onStepClick={vi.fn()}
                />
            )

            const alpha = screen.getByRole('button', { name: /Alpha/ })
            const beta = screen.getByRole('button', { name: /Beta/ })
            const gamma = screen.getByRole('button', { name: /Gamma/ })

            alpha.focus()
            expect(document.activeElement).toBe(alpha)

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(beta)

            await user.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(gamma)

            await user.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(beta)
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

            // Disabled step has aria-disabled on its status element (unlabeled group)
            const disabledStep = screen.getByRole('group', { name: '' })
            expect(disabledStep).toHaveAttribute('aria-disabled', 'true')
            // Only 2 buttons (non-disabled steps)
            expect(screen.getAllByRole('button')).toHaveLength(2)

            await user.click(disabledStep)
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

        it('renders step description when provided', () => {
            const steps: StepperV2Step[] = [
                {
                    id: 1,
                    title: 'One',
                    status: StepperV2StepStatus.CURRENT,
                    description: 'Helper text under the title',
                },
                {
                    id: 2,
                    title: 'Two',
                    status: StepperV2StepStatus.PENDING,
                },
            ]
            render(
                <StepperV2 steps={steps} stepperType={StepperV2Type.VERTICAL} />
            )

            expect(
                screen.getByText('Helper text under the title')
            ).toBeInTheDocument()
        })

        it('moves focus to first and last focusable step with Home and End', async () => {
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

        it('calls onStepClick when a focused step is activated with Space', async () => {
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
            const two = screen.getByRole('button', { name: /Two/ })
            expect(document.activeElement).toBe(two)
            await user.keyboard(' ')
            expect(onStepClick).toHaveBeenCalledWith(1)
        })

        it('moves focus between clickable steps with ArrowDown and ArrowUp', async () => {
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

            first.focus()
            expect(document.activeElement).toBe(first)

            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(second)

            await user.keyboard('{ArrowDown}')
            expect(document.activeElement).toBe(third)

            await user.keyboard('{ArrowUp}')
            expect(document.activeElement).toBe(second)
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

            // Find the second substep button by searching for accessible name containing "QA"
            const substepButtons = screen.getAllByRole('button')
            const qaSubstep = substepButtons.find((btn) =>
                btn.getAttribute('aria-label')?.includes('QA')
            )
            expect(qaSubstep).toBeDefined()
            await user.click(qaSubstep!)
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

        it('forwards ref to the root for vertical stepper', () => {
            const ref = createRef<HTMLDivElement>()
            const steps: StepperV2Step[] = [
                { id: 1, title: 'A', status: StepperV2StepStatus.CURRENT },
            ]
            render(
                <StepperV2
                    ref={ref}
                    steps={steps}
                    stepperType={StepperV2Type.VERTICAL}
                />
            )

            expect(ref.current?.getAttribute('data-stepper')).toBe('stepper')
        })
    })
})
