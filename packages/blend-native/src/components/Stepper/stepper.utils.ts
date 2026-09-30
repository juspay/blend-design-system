import {
    StepperV2StepStatus,
    type StepperV2TokensType,
} from '@juspay/blend-design-system/node'
import type { StepperStep, StepperSubStep } from './stepper.types'

/**
 * Pure style resolvers for the native Stepper.
 *
 * Mirrors web `packages/blend/lib/components/StepperV2/utils.ts` and
 * `Stepper/stepsHelpers.ts`. Web augments these with `_hover` and
 * `_focusVisible` pseudo-selectors — neither exists on native, so the
 * resolvers only pick between `default` and `disabled`.
 */

// ---- Status resolution ------------------------------------------------

/**
 * Resolves a step's visual status. Mirrors web `getStepState`:
 * explicit `disabled` prop wins, then the explicit `status`, then
 * derived from the step index relative to the current index.
 */
export function getStepState(
    step: StepperStep,
    isCompleted: boolean,
    isCurrent: boolean
): StepperV2StepStatus {
    if (step.disabled) return StepperV2StepStatus.DISABLED
    if (step.status) return step.status
    if (isCompleted) return StepperV2StepStatus.COMPLETED
    if (isCurrent) return StepperV2StepStatus.CURRENT
    return StepperV2StepStatus.PENDING
}

// ---- Substep helpers ---------------------------------------------------

export function getSubstepListLabelSuffix(
    isSubstepCompleted: boolean,
    isSubstepCurrent: boolean,
    isSubstepDisabled: boolean,
    isSubstepSkipped: boolean
): string {
    if (isSubstepCompleted) return ', completed'
    if (isSubstepCurrent) return ', current'
    if (isSubstepDisabled) return ', disabled'
    if (isSubstepSkipped) return ', skipped'
    return ', pending'
}

export function buildSubstepRowLabel(
    substepIndex0: number,
    title: string,
    isSubstepCompleted: boolean,
    isSubstepCurrent: boolean,
    isSubstepDisabled: boolean,
    isSubstepSkipped: boolean
): string {
    const suffix = getSubstepListLabelSuffix(
        isSubstepCompleted,
        isSubstepCurrent,
        isSubstepDisabled,
        isSubstepSkipped
    )
    return `Substep ${substepIndex0 + 1}: ${title}${suffix}`
}

/**
 * Resolves text color for a substep row. Disabled always wins;
 * remaining statuses follow the token map in order.
 * Mirrors web `getSubstepTextColor` in `stepsHelpers.ts`.
 */
export function getSubstepTextColor(
    tokens: StepperV2TokensType,
    {
        isSubstepDisabled,
        isSubstepCompleted,
        isSubstepCurrent,
        isSubstepPending,
        isSubstepSkipped,
    }: {
        isSubstepDisabled: boolean
        isSubstepCompleted: boolean
        isSubstepCurrent: boolean
        isSubstepPending: boolean
        isSubstepSkipped: boolean
    }
): string {
    const t = tokens.container.subConnector.text
    const defaultColor = t.default.color
    const s = (value: typeof defaultColor) =>
        String(value ?? defaultColor ?? '')
    if (isSubstepDisabled) return s(t.disabled.color)
    if (isSubstepCompleted) return s(t.completed.color)
    if (isSubstepCurrent) return s(t.current.color)
    if (isSubstepPending) return s(t.pending.color)
    if (isSubstepSkipped) return s(t.skipped.color)
    return s(defaultColor)
}

// ---- Derived layout + a11y helpers ------------------------------------

/**
 * Whether the substep rail is rendered for a step.
 * Substeps render only in vertical mode.
 */
export function hasVisibleSubsteps(step: StepperStep): boolean {
    return !!step.substeps && step.substeps.length > 0
}

/**
 * The label applied to a clickable step.
 * Mirrors the `aria-label` construction in web `Steps.tsx`.
 */
export function getStepAriaLabel(
    stepIndex: number,
    stepsLength: number,
    title: string,
    stepState: StepperV2StepStatus
): string {
    const statusSuffix = (status: StepperV2StepStatus): string => {
        switch (status) {
            case StepperV2StepStatus.COMPLETED:
                return ', completed'
            case StepperV2StepStatus.CURRENT:
                return ', current'
            case StepperV2StepStatus.DISABLED:
                return ', disabled'
            case StepperV2StepStatus.SKIPPED:
                return ', skipped'
            default:
                return ', pending'
        }
    }
    return `Step ${stepIndex + 1} of ${stepsLength}: ${title}${statusSuffix(stepState)}`
}

export function getStepStatus(
    stepState: StepperV2StepStatus
): 'completed' | 'current' | 'disabled' | 'skipped' | 'pending' {
    switch (stepState) {
        case StepperV2StepStatus.COMPLETED:
            return 'completed'
        case StepperV2StepStatus.CURRENT:
            return 'current'
        case StepperV2StepStatus.DISABLED:
            return 'disabled'
        case StepperV2StepStatus.SKIPPED:
            return 'skipped'
        default:
            return 'pending'
    }
}

/** Normalize substep resolved statuses to the flags web uses. */
export function resolveSubstepFlags(subStep: StepperSubStep): {
    isSubstepCurrent: boolean
    isSubstepCompleted: boolean
    isSubstepPending: boolean
    isSubstepSkipped: boolean
} {
    const status = subStep.status
    return {
        isSubstepCurrent: status === StepperV2StepStatus.CURRENT,
        isSubstepCompleted: status === StepperV2StepStatus.COMPLETED,
        isSubstepPending: status === StepperV2StepStatus.PENDING,
        isSubstepSkipped: status === StepperV2StepStatus.SKIPPED,
    }
}
