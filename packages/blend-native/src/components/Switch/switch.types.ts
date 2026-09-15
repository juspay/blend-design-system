import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { SwitchBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `Switch` — the port of web's `SwitchV2`.
 *
 * Derives from `SwitchBaseProps`; controlled-only like web (RN core's
 * `Switch` idiom). `maxLength` truncation is omitted at the type level
 * (needs Tooltip).
 */
export type SwitchNativeProps = SwitchBaseProps & {
    disabled?: boolean
    slot?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
