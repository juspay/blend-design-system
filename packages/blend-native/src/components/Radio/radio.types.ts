import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { RadioBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `Radio` — the port of web's `RadioV2`.
 *
 * Derives from `RadioBaseProps`. Divergence: web types `onCheckedChange`
 * with a DOM `ChangeEvent`; native calls it with `true` (a radio can only
 * be selected — deselection happens by selecting a sibling). There is no
 * RadioGroup on either platform: the caller owns the selection state and
 * renders one `Radio` per option (web's unused `group.gap` token noted).
 *
 * `maxLength` truncation is omitted at the type level (needs Tooltip).
 */
export type RadioNativeProps = RadioBaseProps & {
    onCheckedChange?: (checked: true) => void
    disabled?: boolean
    slot?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}
