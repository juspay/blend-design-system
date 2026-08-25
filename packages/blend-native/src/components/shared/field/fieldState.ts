import { InputStateV2 } from '@juspay/blend-design-system/node'

/**
 * Input state derivation, shared by every field component.
 *
 * Mirrors web's `getInputState` (`InputsV2/TextInputV2/utils.ts`) and the
 * per-variant resolution `TextInputV2.tsx` performs inline: error always
 * wins, then disabled, and focus applies only when nothing stronger does.
 * `HOVER` exists in the enum but has no touch counterpart.
 *
 * Pure and RN-free so the whole truth table unit-tests under vitest.
 */

export type FieldError = { show: boolean; message?: string } | undefined

/** The state driving label/footer colours — web's `getInputState`. */
export function getFieldState(
    error: FieldError,
    disabled?: boolean
): InputStateV2 {
    if (error?.show) return InputStateV2.ERROR
    if (disabled) return InputStateV2.DISABLED
    return InputStateV2.DEFAULT
}

/**
 * The state driving the input container's border/background/text, which
 * unlike the label state also reflects focus.
 */
export function getFieldVisualState(
    error: FieldError,
    disabled: boolean | undefined,
    focused: boolean
): InputStateV2 {
    if (error?.show) return InputStateV2.ERROR
    if (disabled) return InputStateV2.DISABLED
    if (focused) return InputStateV2.FOCUS
    return InputStateV2.DEFAULT
}
