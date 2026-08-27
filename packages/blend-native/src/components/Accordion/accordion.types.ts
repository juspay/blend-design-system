import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
    AccordionBaseProps,
    AccordionItemBaseProps,
} from '@juspay/blend-design-system/node'

/**
 * Props for the native compound `Accordion` — the port of web's
 * `AccordionV2`/`AccordionV2Item`, context-based instead of Radix.
 *
 * Divergences, docblocked here:
 * - Controlled-ness follows the current render — web latches it at mount.
 * - `collapsible` is always true, matching web's hardcoded value.
 * - Web's CSS-typed `width`/`maxWidth`/`minWidth` dimensions are covered by
 *   `style`.
 */
export type AccordionNativeProps = AccordionBaseProps & {
    children: React.ReactNode
    testID?: string
    style?: StyleProp<ViewStyle>
}

export type AccordionItemNativeProps = AccordionItemBaseProps & {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    subtextSlot?: React.ReactNode
    children: React.ReactNode
    testID?: string
}
