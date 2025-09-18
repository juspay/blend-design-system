import { ReactNode } from 'react'

export enum StepState {
    COMPLETED = 'completed',
    CURRENT = 'current',
    PENDING = 'pending',
    DISABLED = 'disabled',
}

export enum StepperType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export type StepperProps = {
    steps: Step[]
    currentStep: number
    onStepChange?: (stepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperType
    currentSubsteps?: Record<string, number>
}

export type SubStep = {
    id: string
    title: string
    status?: StepState
    disabled?: boolean
}

export type Step = {
    id: string
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
    clickable?: boolean
    currentSubsteps?: Record<string, number>
}
