import { ReactNode } from 'react'

export enum StepState {
    COMPLETED = 'completed',
    CURRENT = 'current',
    PENDING = 'pending',
    DISABLED = 'disabled',
}

export type StepperProps = {
    steps: Step[]
    currentStep: number
    onStepChange?: (stepIndex: number) => void
    clickable?: boolean
}

export type Step = {
    id: string
    title: string
    status?: StepState
    disabled?: boolean
    tooltipContent?: string
    icon?: ReactNode
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
}
