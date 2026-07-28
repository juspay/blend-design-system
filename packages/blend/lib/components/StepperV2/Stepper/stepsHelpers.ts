import type { StepperV2TokensType } from '../stepperV2.tokens'

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
