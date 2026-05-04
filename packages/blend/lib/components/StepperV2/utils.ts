import { StepperV2Step, StepperV2StepStatus } from './stepperV2.types'

export const getStepState = (
    step: StepperV2Step,
    isCompleted: boolean,
    isCurrent: boolean
): StepperV2StepStatus => {
    if (step.disabled) return StepperV2StepStatus.DISABLED
    if (step.status) return step.status
    if (isCompleted) return StepperV2StepStatus.COMPLETED
    if (isCurrent) return StepperV2StepStatus.CURRENT
    return StepperV2StepStatus.PENDING
}

/** Short-lived polite live region for keyboard step navigation. */
export function scheduleLiveRegionAnnouncement(message: string) {
    const el = document.createElement('div')
    el.setAttribute('role', 'status')
    el.setAttribute('aria-live', 'polite')
    el.setAttribute('aria-atomic', 'true')
    Object.assign(el.style, {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
    })
    el.textContent = message
    document.body.appendChild(el)
    const timer = setTimeout(() => {
        el.remove()
    }, 1000)
    return () => {
        clearTimeout(timer)
        el.remove()
    }
}
