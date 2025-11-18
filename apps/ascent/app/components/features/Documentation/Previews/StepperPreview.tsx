'use client'
import { Stepper, StepperType, StepState } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const StepperPreview = () => {
    const tsCode = `import { Stepper, StepperType, StepState } from 'blend-v1'

function MyComponent() {
    const steps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            description: 'First step completed',
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
            description: 'Current step',
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
            description: 'Pending step',
        },
    ]

    return (
        <Stepper
            steps={steps}
            stepperType={StepperType.HORIZONTAL}
            clickable={true}
            onStepClick={(stepIndex) => console.log('Step clicked:', stepIndex)}
        />
    )
}`

    const steps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            description: 'First step completed',
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
            description: 'Current step',
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
            description: 'Pending step',
        },
    ]

    return (
        <ComponentPreview ts={tsCode}>
            <Stepper
                steps={steps}
                stepperType={StepperType.HORIZONTAL}
                clickable={true}
            />
        </ComponentPreview>
    )
}

export default StepperPreview
