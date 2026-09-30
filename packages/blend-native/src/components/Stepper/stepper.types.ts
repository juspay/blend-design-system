import type { ReactNode } from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type {
    StepperV2StepStatus,
    StepperV2Type,
} from '@juspay/blend-design-system/node'

// Re-exported so consumers spelling a step object don't need the web package's
// module path.
export type { StepperV2StepStatus, StepperV2Type }

export type StepperSubStep = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
}

export type StepperStep = {
    id: number
    title: string
    status?: StepperV2StepStatus
    disabled?: boolean
    description?: string
    icon?: ReactNode
    substeps?: StepperSubStep[]
    /**
     * Defaults to `true` when the step has substeps.
     */
    isExpandable?: boolean
    /**
     * When defined, expands/collapses the substep rail; `undefined` derives
     * from `hasSubsteps`.
     */
    isExpanded?: boolean
}

export type StepperNativeProps = {
    steps: StepperStep[]
    onStepClick?: (stepIndex: number, event: GestureResponderEvent) => void
    /**
     * Called when a substep is pressed. `substepIndex` is **1-based**,
     * matching web.
     * @param stepId — the `id` field of the parent step
     */
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    clickable?: boolean
    stepperType?: StepperV2Type
    testID?: string
    accessibilityLabel?: string
    style?: StyleProp<ViewStyle>
}
