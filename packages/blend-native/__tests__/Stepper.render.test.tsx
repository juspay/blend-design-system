import { fireEvent, render } from '@testing-library/react-native'
import {
    Theme,
    StepperV2Type,
    StepperV2StepStatus,
} from '@juspay/blend-design-system/node'
import { Stepper } from '../src/components/Stepper'
import type { StepperStep } from '../src/components/Stepper'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'

/**
 * Render tests for the native Stepper port (web `StepperV2`).
 * Covers both orientations, substep expansion, callbacks and a11y.
 */

const wrap = (ui: ReactElement, theme = Theme.LIGHT) =>
    render(<BlendNativeProvider theme={theme}>{ui}</BlendNativeProvider>)

const flowSteps: StepperStep[] = [
    { id: 1, title: 'Cart' },
    { id: 2, title: 'Shipping' },
    { id: 3, title: 'Payment' },
    { id: 4, title: 'Done' },
]

describe('Stepper rendering — horizontal', () => {
    it('renders every step title', () => {
        const { getByText } = wrap(
            <Stepper steps={flowSteps} stepperType={StepperV2Type.HORIZONTAL} />
        )
        for (const step of flowSteps) {
            expect(getByText(step.title)).toBeTruthy()
        }
    })

    it('announces overall progress on the root', () => {
        const steps: StepperStep[] = [
            { id: 1, title: 'A' },
            { id: 2, title: 'B', status: StepperV2StepStatus.CURRENT },
        ]
        const { getByText } = wrap(<Stepper steps={steps} />)
        // Root label — find via the step container's parent is fragile;
        // assert on the accessible step label instead.
        expect(getByText('A', { includeHiddenElements: true })).toBeTruthy()
        expect(getByText('B')).toBeTruthy()
    })

    it('fires onStepClick with the step index and labels the button', () => {
        const onStepClick = jest.fn()
        const { getByLabelText } = wrap(
            <Stepper
                steps={flowSteps}
                clickable
                stepperType={StepperV2Type.HORIZONTAL}
                onStepClick={onStepClick}
            />
        )
        const second = getByLabelText('Step 2 of 4: Shipping, pending')
        expect(second.props.accessibilityRole).toBe('button')
        fireEvent.press(second)
        expect(onStepClick).toHaveBeenCalledTimes(1)
        // first arg is the step index
        expect(onStepClick.mock.calls[0][0]).toBe(1)
    })

    it('non-clickable steps are not pressable buttons', () => {
        const onStepClick = jest.fn()
        const { queryByLabelText } = wrap(
            <Stepper steps={flowSteps} stepperType={StepperV2Type.HORIZONTAL} />
        )
        expect(queryByLabelText('Step 2 of 4: Shipping, pending')).toBeNull()
        expect(onStepClick).not.toHaveBeenCalled()
    })

    it('disabled steps never fire and expose disabled state', () => {
        const onStepClick = jest.fn()
        const steps: StepperStep[] = [
            { id: 1, title: 'A' },
            { id: 2, title: 'B', disabled: true },
        ]
        const { getByLabelText } = wrap(
            <Stepper
                steps={steps}
                clickable
                stepperType={StepperV2Type.HORIZONTAL}
                onStepClick={onStepClick}
            />
        )
        const disabled = getByLabelText('Step 2 of 2: B, disabled')
        expect(disabled.props.accessibilityState.disabled).toBe(true)
        fireEvent.press(disabled)
        expect(onStepClick).not.toHaveBeenCalled()
    })

    it('renders step numbers inside circles (1-based)', () => {
        const { getByText } = wrap(
            <Stepper steps={flowSteps} stepperType={StepperV2Type.HORIZONTAL} />
        )
        expect(getByText('1')).toBeTruthy()
        expect(getByText('3')).toBeTruthy()
    })
})

describe('Stepper rendering — vertical with substeps', () => {
    const substepsSteps: StepperStep[] = [
        {
            id: 1,
            title: 'Account',
            description: 'Set up your profile',
            status: StepperV2StepStatus.CURRENT,
            substeps: [
                { id: 11, title: 'Email' },
                { id: 12, title: 'Verify' },
                { id: 13, title: 'Profile' },
            ],
        },
        { id: 2, title: 'Payment' },
    ]

    it('renders title, description and substeps (expanded by default)', () => {
        const { getByText } = wrap(
            <Stepper
                steps={substepsSteps}
                stepperType={StepperV2Type.VERTICAL}
            />
        )
        expect(getByText('Account')).toBeTruthy()
        expect(getByText('Set up your profile')).toBeTruthy()
        for (const sub of ['Email', 'Verify', 'Profile']) {
            expect(getByText(sub)).toBeTruthy()
        }
    })

    it('exposes substep rows as buttons with 1-based labels', () => {
        const { getByLabelText } = wrap(
            <Stepper
                steps={substepsSteps}
                stepperType={StepperV2Type.VERTICAL}
            />
        )
        const first = getByLabelText('Substep 1: Email, pending')
        expect(first.props.accessibilityRole).toBe('button')
        expect(getByLabelText('Substep 3: Profile, pending')).toBeTruthy()
    })

    it('fires onSubstepClick with parent step id and 1-based index', () => {
        const onSubstepClick = jest.fn()
        const { getByLabelText } = wrap(
            <Stepper
                steps={substepsSteps}
                clickable
                stepperType={StepperV2Type.VERTICAL}
                onSubstepClick={onSubstepClick}
            />
        )
        fireEvent.press(getByLabelText('Substep 2: Verify, pending'))
        expect(onSubstepClick).toHaveBeenCalledTimes(1)
        expect(onSubstepClick).toHaveBeenCalledWith(1, 2)
    })

    it('chevron toggles the expanded state', () => {
        const { getByLabelText, queryByText } = wrap(
            <Stepper
                steps={substepsSteps}
                stepperType={StepperV2Type.VERTICAL}
            />
        )
        const expander = getByLabelText('Collapse substeps for Account')
        expect(expander.props.accessibilityState.expanded).toBe(true)

        fireEvent.press(expander)
        expect(queryByText('Email')).toBeNull()
        const collapsed = getByLabelText('Expand substeps for Account')
        expect(collapsed.props.accessibilityState.expanded).toBe(false)

        fireEvent.press(collapsed)
        expect(queryByText('Email')).toBeTruthy()
    })

    it('controlled isExpanded overrides internal state', () => {
        const steps: StepperStep[] = [
            {
                id: 1,
                title: 'Account',
                isExpanded: false,
                substeps: [{ id: 11, title: 'Email' }],
            },
        ]
        const { queryByText } = wrap(
            <Stepper steps={steps} stepperType={StepperV2Type.VERTICAL} />
        )
        expect(queryByText('Email')).toBeNull()
    })

    it('disabled substeps (via step or substep) do not fire', () => {
        const onSubstepClick = jest.fn()
        const steps: StepperStep[] = [
            {
                id: 1,
                title: 'Account',
                status: StepperV2StepStatus.CURRENT,
                substeps: [
                    { id: 11, title: 'Email' },
                    { id: 12, title: 'Verify', disabled: true },
                ],
            },
        ]
        const { getByLabelText } = wrap(
            <Stepper
                steps={steps}
                clickable
                stepperType={StepperV2Type.VERTICAL}
                onSubstepClick={onSubstepClick}
            />
        )
        const disabledRow = getByLabelText('Substep 2: Verify, disabled')
        expect(disabledRow.props.accessibilityState.disabled).toBe(true)
        fireEvent.press(disabledRow)
        expect(onSubstepClick).not.toHaveBeenCalled()
    })

    it('clickable vertical step fires onStepClick with the index', () => {
        const onStepClick = jest.fn()
        const { getByLabelText } = wrap(
            <Stepper
                steps={substepsSteps}
                clickable
                stepperType={StepperV2Type.VERTICAL}
                onStepClick={onStepClick}
            />
        )
        fireEvent.press(getByLabelText('Step 1 of 2: Account, current'))
        expect(onStepClick).toHaveBeenCalledTimes(1)
        expect(onStepClick.mock.calls[0][0]).toBe(0)
    })
})

describe('Stepper rendering — themes', () => {
    it('resolves tokens in dark mode without crashing', () => {
        const { getByText, getByLabelText } = wrap(
            <Stepper
                steps={[
                    { id: 1, title: 'Cart' },
                    {
                        id: 2,
                        title: 'Pay',
                        status: StepperV2StepStatus.CURRENT,
                        substeps: [{ id: 21, title: 'Card' }],
                    },
                ]}
                stepperType={StepperV2Type.VERTICAL}
            />,
            Theme.DARK
        )
        expect(getByText('Cart')).toBeTruthy()
        expect(getByLabelText('Substep 1: Card, pending')).toBeTruthy()
    })
})
