import { StepState } from './types'

/** The status segment of the `stepper.a11y.step-*` / `substep-*` keys. */
export type StepperStatusKey =
    | 'completed'
    | 'current'
    | 'disabled'
    | 'skipped'
    | 'pending'

/** Same precedence as the English suffix chain it replaces. */
export const getStepStatusKey = (state: StepState): StepperStatusKey =>
    state === StepState.COMPLETED
        ? 'completed'
        : state === StepState.CURRENT
          ? 'current'
          : state === StepState.DISABLED
            ? 'disabled'
            : state === StepState.SKIPPED
              ? 'skipped'
              : 'pending'

export const getSubstepStatusKey = (
    isCompleted: boolean | undefined,
    isCurrent: boolean | undefined,
    isDisabled: boolean | undefined,
    isSkipped: boolean | undefined
): StepperStatusKey =>
    isCompleted
        ? 'completed'
        : isCurrent
          ? 'current'
          : isDisabled
            ? 'disabled'
            : isSkipped
              ? 'skipped'
              : 'pending'
