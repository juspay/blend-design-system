import { forwardRef, useCallback } from 'react'
import type { StepperV2Props } from './stepperV2.types'
import { StepperV2Type } from './stepperV2.types'
import StepperComponent from './Stepper/StepperComponent'
import { filterBlockedProps } from '../../utils/prop-helpers'

const StepperV2 = forwardRef<HTMLDivElement, StepperV2Props>(
    (
        {
            steps,
            onStepClick,
            onSubstepClick,
            clickable = false,
            stepperType = StepperV2Type.HORIZONTAL,
            ...rest
        },
        ref
    ) => {
        const filteredRest = filterBlockedProps(rest)
        const handleStepClick = useCallback(
            (stepIndex: number) => {
                onStepClick?.(stepIndex)
            },
            [onStepClick]
        )
        const resolvedOnStepClick = onStepClick ? handleStepClick : undefined

        return (
            <StepperComponent
                ref={ref}
                steps={steps}
                onStepClick={resolvedOnStepClick}
                onSubstepClick={onSubstepClick}
                clickable={clickable}
                stepperType={stepperType}
                {...filteredRest}
            />
        )
    }
)

StepperV2.displayName = 'StepperV2'

export default StepperV2
