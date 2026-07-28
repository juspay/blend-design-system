'use client'
import {
    StepperV2,
    StepperV2StepStatus,
    StepperV2Type,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const StepperV2Preview = () => {
    const tsCode = `import {
    StepperV2,
    StepperV2StepStatus,
    StepperV2Type
} from '@juspay/blend-design-system'

function MyComponent() {
    const steps = [
        {
            id: 1,
            title: 'Personal Info',
            status: StepperV2StepStatus.COMPLETED,
        },
        {
            id: 2,
            title: 'Account',
            status: StepperV2StepStatus.CURRENT,
        },
        {
            id: 3,
            title: 'Review',
            status: StepperV2StepStatus.PENDING,
        },
    ]

    return (
        <StepperV2
            steps={steps}
            stepperType={StepperV2Type.HORIZONTAL}
            clickable={true}
        />
    )
}`

    const reCode = `type stepperV2StepStatus = [#default | #completed | #current | #pending | #disabled | #skipped]
type stepperV2Type = [#horizontal | #vertical]

@react.component
let make = () => {
  let steps = [
    {id: 1, title: "Personal Info", status: #completed},
    {id: 2, title: "Account", status: #current},
    {id: 3, title: "Review", status: #pending}
  ]

  <StepperV2Binding steps={steps} stepperType=#horizontal clickable={true} />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~steps: array<'a>,
  ~stepperType: [#horizontal | #vertical]=?,
  ~clickable: bool=?,
  ~onStepClick: int => unit=?,
) => React.element = "StepperV2"`

    const steps = [
        {
            id: 1,
            title: 'Personal Info',
            status: StepperV2StepStatus.COMPLETED,
        },
        {
            id: 2,
            title: 'Account',
            status: StepperV2StepStatus.CURRENT,
        },
        {
            id: 3,
            title: 'Review',
            status: StepperV2StepStatus.PENDING,
        },
    ]

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-lg">
                <StepperV2
                    steps={steps}
                    stepperType={StepperV2Type.HORIZONTAL}
                    clickable={true}
                />
            </div>
        </ComponentPreview>
    )
}

export default StepperV2Preview
