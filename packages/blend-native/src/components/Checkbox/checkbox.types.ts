import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { CheckboxBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `Checkbox` — the port of web's `CheckboxV2`.
 *
 * Derives from `CheckboxBaseProps` (checked / onCheckedChange incl.
 * `'indeterminate'`, required, error, label, subLabel, size), so a web-side
 * rename or addition reaches this type. Controlled-only, matching web —
 * there is no `defaultChecked` on either platform.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `maxLength` label truncation — needs the native Tooltip (Wave C);
 *   RN text can wrap instead.
 * - The error shake animation — a decorative web-ism.
 */
export type CheckboxNativeProps = CheckboxBaseProps & {
    disabled?: boolean
    /** Extra content after the label, tinted like web's selector slot. */
    slot?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
