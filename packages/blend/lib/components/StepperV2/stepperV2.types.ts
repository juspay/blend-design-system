import { ReactNode } from 'react'

export enum StepperV2StepStatus {
    COMPLETED = 'completed',
    CURRENT = 'current',
    PENDING = 'pending',
    DISABLED = 'disabled',
    SKIPPED = 'skipped',
}

export type StepperV2InteractionState =
    | 'default'
    | 'hover'
    | 'focus'
    | 'disabled'

export enum StepperV2Type {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export type StepperV2Props = {
    steps: StepperV2Step[]
    onStepClick?: (stepIndex: number) => void
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperV2Type
}

export type SubStep = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
}

export type StepperV2Step = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
    description?: string
    icon?: ReactNode
    substeps?: SubStep[]
    isExpandable?: boolean
    isExpanded?: boolean
}

export type StepperV2StepProps = {
    step: StepperV2Step
    stepIndex: number
    isCompleted: boolean
    isCurrent: boolean
    isLast: boolean
    isFirst: boolean
    onClick?: (stepIndex: number) => void
    onSubstepClick?: (stepIndex: number, substepIndex: number) => void
    clickable?: boolean
    currentSubsteps?: Record<string, number>
    onKeyDown?: (event: React.KeyboardEvent, stepIndex: number) => void
}
