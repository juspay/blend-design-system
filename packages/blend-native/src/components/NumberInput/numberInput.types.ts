import type React from 'react'
import type {
    StyleProp,
    TextInput as RNTextInput,
    ViewStyle,
} from 'react-native'
import type { NumberInputBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `NumberInput` — the port of web's `NumberInputV2`.
 *
 * Derives from `NumberInputBaseProps` with two docblocked divergences:
 *
 * - **`onValueChange?: (value: number | null) => void`** — web fabricates
 *   synthetic DOM change events whose `target.value` is a string; native
 *   hands over the parsed number (null while the field is empty or
 *   mid-edit like `-`).
 * - Flat `label`/`subLabel` — web's `label: { text, subtext }` object is
 *   flattened for cross-input consistency.
 *
 * Omitted at the type level: `helpIconText` (needs Tooltip), web's
 * ReactNode `slot` pair (unit + steppers cover the common cases; slots can
 * layer on later).
 */
export type NumberInputNativeProps = Omit<
    NumberInputBaseProps,
    'label' | 'helpIconText'
> & {
    onValueChange?: (value: number | null) => void
    label?: string
    subLabel?: string
    required?: boolean
    disabled?: boolean
    placeholder?: string
    testID?: string
    accessibilityLabel?: string
    style?: StyleProp<ViewStyle>
    inputRef?: React.Ref<RNTextInput>
}
