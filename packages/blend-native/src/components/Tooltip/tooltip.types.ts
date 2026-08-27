import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { TooltipBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native `Tooltip` — the port of web's `TooltipV2`.
 *
 * Derives from `TooltipBaseProps` with the pointer-era pieces swapped:
 *
 * - The trigger opens on **long-press** (there is no hover); web's
 *   `delayDuration` hover delay is repurposed as `delayLongPress`.
 * - `disableInteractive` is omitted — it exists to keep a *hovered* tooltip
 *   open while the pointer crosses onto it, a concept with no touch
 *   counterpart. Any outside tap dismisses.
 * - `maxWidth` is a number (web types it as a CSS string); the token
 *   per-size max width applies when unset.
 */
export type TooltipNativeProps = Omit<
    TooltipBaseProps,
    'disableInteractive'
> & {
    /** The anchor. Long-press shows the tooltip. */
    children: React.ReactNode
    content: React.ReactNode | string
    slot?: React.ReactNode
    maxWidth?: number
    testID?: string
    /** Styles the tooltip surface. */
    style?: StyleProp<ViewStyle>
}
