import { forwardRef, useCallback } from 'react'
import type { StepperV2Props } from './stepperV2.types'
import { StepperV2Type } from './stepperV2.types'
import Block from '../Primitives/Block/Block'
import HorizontalStepperV2 from './HorizontalStepperV2'

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
        const handleStepClick = useCallback(
            (stepIndex: number) => {
                if (onStepClick) {
                    onStepClick(stepIndex)
                }
            },
            [onStepClick]
        )

        if (stepperType === StepperV2Type.VERTICAL) {
            return <Block>Vertical Stepper</Block>
        }

        return (
            <HorizontalStepperV2
                ref={ref}
                steps={steps}
                onStepClick={handleStepClick}
                onSubstepClick={onSubstepClick}
                clickable={clickable}
                {...rest}
            />
        )
    }
)

StepperV2.displayName = 'StepperV2'

export default StepperV2
