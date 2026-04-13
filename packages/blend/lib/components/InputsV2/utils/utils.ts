import { AnyRef } from '../inputV2.types'

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
