import type { StyleProp, ViewStyle } from 'react-native'
import type { OTPInputBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `OTPInput` — the port of web's `OTPInputV2`.
 *
 * Derives from `OTPInputBaseProps` (`onChange` already takes the joined
 * string, so it flows straight through). Web's lowercase `sublabel` is
 * normalized to `subLabel`; `helpIconHintText` is omitted (needs Tooltip).
 * The first cell carries the OS one-time-code autofill hooks; paste and
 * SMS autofill arrive as a multi-character change and spread across cells.
 */
export type OTPInputNativeProps = Omit<
    OTPInputBaseProps,
    'sublabel' | 'helpIconHintText'
> & {
    subLabel?: string
    required?: boolean
    disabled?: boolean
    testID?: string
    style?: StyleProp<ViewStyle>
}
