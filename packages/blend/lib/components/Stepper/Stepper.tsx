import { forwardRef, useCallback } from 'react'
import type { StepperProps } from './types'
import { StepperType } from './types'
import HorizontalStepper from './HorizontalStepper'
import VerticalStepper from './VerticalStepper'

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
    (
        {
            steps,
            onStepClick,
            onSubstepClick,
            clickable = false,
            stepperType = StepperType.HORIZONTAL,
            ...htmlProps
        },
        ref
    ) => {
        const handleStepClick = useCallback(
            (stepIndex: number) => {
                if (onStepClick) {
                    onStepClick(stepIndex)
                }
            },
            [onStepClick]
        )

        if (stepperType === StepperType.VERTICAL) {
            return (
                <VerticalStepper
                    ref={ref}
                    steps={steps}
                    onStepClick={handleStepClick}
                    onSubstepClick={onSubstepClick}
                    clickable={clickable}
                    {...htmlProps}
                />
            )
        }

        return (
            <HorizontalStepper
                ref={ref}
                steps={steps}
                onStepClick={handleStepClick}
                onSubstepClick={onSubstepClick}
                clickable={clickable}
                {...htmlProps}
            />
        )
    }
)

Stepper.displayName = 'Stepper'

export default Stepper
