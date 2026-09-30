import { Stepper, StepperType, StepperStepStatus } from 'blend-native'
import type { StepperStep } from 'blend-native'
import type { ComponentSpec } from '../types'

type StepperPlaygroundProps = {
    stepperType: StepperType
    clickable: boolean
}

const HORIZONTAL_STEPS: StepperStep[] = [
    { id: 1, title: 'Cart' },
    { id: 2, title: 'Shipping' },
    {
        id: 3,
        title: 'Payment',
        status: StepperStepStatus.CURRENT,
    },
    { id: 4, title: 'Done' },
]

const VERTICAL_STEPS: StepperStep[] = [
    {
        id: 1,
        title: 'Cart',
        description: 'Review the items in your cart',
        status: StepperStepStatus.COMPLETED,
    },
    {
        id: 2,
        title: 'Shipping',
        description: 'Choose a delivery address',
        status: StepperStepStatus.CURRENT,
        substeps: [
            { id: 21, title: 'Address', status: StepperStepStatus.COMPLETED },
            {
                id: 22,
                title: 'Delivery speed',
                status: StepperStepStatus.CURRENT,
            },
            { id: 23, title: 'Instructions' },
        ],
    },
    {
        id: 3,
        title: 'Payment',
        description: 'Pick a payment method',
        substeps: [
            { id: 31, title: 'Card' },
            { id: 32, title: 'UPI' },
            { id: 33, title: 'Netbanking' },
        ],
    },
    { id: 4, title: 'Confirmation' },
]

const spec: ComponentSpec<StepperPlaygroundProps> = {
    name: 'Stepper',
    summary:
        'Step-status indicator ported from web StepperV2. Horizontal lays steps out with connector lines between circles; vertical stacks them with a rail, optional descriptions and expandable substeps (chevron toggles). Completed steps show a check, disabled steps a lock. Press a step or substep to fire onStepClick / onSubstepClick.',
    mode: 'inline',
    defaults: {
        stepperType: StepperType.VERTICAL,
        clickable: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'stepperType',
            label: 'Orientation',
            options: [
                { label: 'Vertical (substeps)', value: StepperType.VERTICAL },
                { label: 'Horizontal', value: StepperType.HORIZONTAL },
            ],
        },
        {
            kind: 'toggle',
            key: 'clickable',
            label: 'Clickable steps',
        },
    ],
    render: (props) => (
        <Stepper
            steps={
                props.stepperType === StepperType.VERTICAL
                    ? VERTICAL_STEPS
                    : HORIZONTAL_STEPS
            }
            stepperType={props.stepperType}
            clickable={props.clickable}
            onStepClick={(stepIndex) =>
                console.log(`[Stepper] step ${stepIndex + 1} pressed`)
            }
            onSubstepClick={(stepId, substepIndex) =>
                console.log(
                    `[Stepper] step ${stepId} substep ${substepIndex} pressed`
                )
            }
        />
    ),
}

export default spec
