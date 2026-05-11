import { AnyRef, InputStateV2 } from '../inputV2.types'

export const setExternalRef = <T>(ref: AnyRef<T>, value: T | null): void => {
    if (!ref) return

    if (typeof ref === 'function') {
        ref(value)
    } else {
        ref.current = value
    }
}

/** Derives stable suffix ids from a non-empty base (typically `id` prop or `useId()`). */
export const generateAccessibilityIds = (baseId: string) => {
    return {
        errorId: `${baseId}-error`,
        hintId: `${baseId}-hint`,
        groupId: `${baseId}-group`,
        firstInputId: `${baseId}-0`,
    }
}

export const getInteractionState = (state: InputStateV2) => {
    switch (state) {
        case InputStateV2.DEFAULT:
            return 'default'
        case InputStateV2.HOVER:
            return 'hover'
        case InputStateV2.FOCUS:
            return 'focus'
        case InputStateV2.ERROR:
            return 'error'
        case InputStateV2.DISABLED:
            return 'disabled'
        default:
            return 'default'
    }
}
