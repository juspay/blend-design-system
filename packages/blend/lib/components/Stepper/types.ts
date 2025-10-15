import { ReactNode } from 'react'

export enum StepState {
    COMPLETED = 'completed',
    CURRENT = 'current',
    PENDING = 'pending',
    DISABLED = 'disabled',
    SKIPPED = 'skipped',
}

export enum StepperType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export type StepperProps = {
    steps: Step[]
    onStepClick?: (stepIndex: number) => void
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperType
}

export type SubStep = {
    id: number
    title: string
    status?: StepState
    disabled?: boolean
}

export type Step = {
    id: number
    title: string
    status?: StepState
    disabled?: boolean
    description?: string
    icon?: ReactNode
    substeps?: SubStep[]
    isExpandable?: boolean
    isExpanded?: boolean
}

export type StepProps = {
    step: Step
    stepIndex: number
    isCompleted: boolean
    isCurrent: boolean
    isLast: boolean
    isFirst: boolean
    onClick?: (stepIndex: number) => void
    onSubstepClick?: (stepIndex: number, substepIndex: number) => void
    clickable?: boolean
    currentSubsteps?: Record<string, number>
}
