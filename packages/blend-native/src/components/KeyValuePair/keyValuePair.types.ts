import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { KeyValuePairV2Size } from '@juspay/blend-design-system/node'

/**
 * Props for the native `KeyValuePair` — the port of web's `KeyValuePairV2`.
 *
 * Web's numeric `KeyValuePairV2StateType` enum (vertical = 0) is
 * deliberately not mirrored — orientation is the `'vertical' |
 * 'horizontal'` string union the gap tokens already key on. Truncation maps
 * to RN's `numberOfLines` (`truncate` → 1, `wrap-clamp` → `maxLines`,
 * `wrap` → unlimited).
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `showTooltipOnTruncate` — needs the native Tooltip (Wave C).
 */
export type KeyValuePairOrientation = 'vertical' | 'horizontal'

export type KeyValuePairTextOverflow = 'truncate' | 'wrap' | 'wrap-clamp'

export type KeyValuePairNativeProps = {
    keyString: string
    value?: string
    /** Affects the value's font size only, like web. */
    size?: KeyValuePairV2Size
    orientation?: KeyValuePairOrientation
    slots?: {
        key?: React.ReactNode
        valueLeft?: React.ReactNode
        valueRight?: React.ReactNode
    }
    maxWidth?: string | number
    textOverflow?: KeyValuePairTextOverflow
    /** Line cap for `wrap-clamp`. Web default: 2. */
    maxLines?: number
    testID?: string
    style?: StyleProp<ViewStyle>
}
