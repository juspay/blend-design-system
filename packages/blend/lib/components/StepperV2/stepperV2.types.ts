import type { HTMLAttributes } from 'react'
import type { StepperV2Step, StepperV2Type } from './stepperV2.base.types'

export type { StepperV2Step, StepperV2SubStep } from './stepperV2.base.types'
export { StepperV2StepStatus, StepperV2Type } from './stepperV2.base.types'
export type { StepperV2InteractionState } from './stepperV2.base.types'

export type StepperV2Props = {
    steps: StepperV2Step[]
    onStepClick?: (stepIndex: number) => void
    /**
     * Called when a substep is clicked. The substepIndex is **1-based** (starts at 1).
     * @param stepId - The id of the parent step
     * @param substepIndex - The 1-based index of the substep (e.g., 1 for first substep)
     */
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperV2Type
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'id'>

export type StepperV2StepProps = {
    step: StepperV2Step
    stepIndex: number
    isCompleted: boolean
    isCurrent: boolean
    isLast: boolean
    isFirst: boolean
    onClick?: (stepIndex: number) => void
    /**
     * Called when a substep is clicked. The substepIndex is **1-based** (starts at 1).
     * @param stepIndex - The index of the parent step
     * @param substepIndex - The 1-based index of the substep (e.g., 1 for first substep)
     */
    onSubstepClick?: (stepIndex: number, substepIndex: number) => void
    clickable?: boolean
    currentSubsteps?: Record<string, number>
    onKeyDown?: (event: React.KeyboardEvent, stepIndex: number) => void
}
