import { forwardRef, useCallback } from 'react'
import type { StepperProps } from './types'
import { StepperType } from './types'
import HorizontalStepper from './HorizontalStepper'
import VerticalStepper from './VerticalStepper'

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
    (
        {
            steps,
            currentStep,
            onStepChange,
            clickable = false,
            stepperType = StepperType.HORIZONTAL,
            ...htmlProps
        },
        ref
    ) => {
        const handleStepClick = useCallback(
            (stepIndex: number) => {
                if (onStepChange) {
                    onStepChange(stepIndex)
                }
            },
            [onStepChange]
        )

        if (stepperType === StepperType.VERTICAL) {
            return (
                <VerticalStepper
                    ref={ref}
                    steps={steps}
                    currentStep={currentStep}
                    onStepChange={handleStepClick}
                    clickable={clickable}
                    {...htmlProps}
                />
            )
        }

        return (
            <HorizontalStepper
                ref={ref}
                steps={steps}
                currentStep={currentStep}
                onStepChange={handleStepClick}
                clickable={clickable}
                {...htmlProps}
            />
        )
    }
)

Stepper.displayName = 'Stepper'

export default Stepper
