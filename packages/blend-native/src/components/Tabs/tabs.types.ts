import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { TabsBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native compound `Tabs` — the port of web's `TabsV2`
 * (`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`), context-based instead of
 * Radix + cloneElement.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `closable`/`onClose` triggers, `stickyHeader`/`offsetTop`,
 *   `showSkeleton` — later pickups with their own scope calls.
 */
export type TabsNativeProps = TabsBaseProps & {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    children: React.ReactNode
    testID?: string
    style?: StyleProp<ViewStyle>
}

export type TabsListNativeProps = {
    children: React.ReactNode
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

export type TabsTriggerNativeProps = {
    value: string
    /** The label — web constrains trigger children the same way. */
    children: string | number
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
    disabled?: boolean
    testID?: string
}

export type TabsContentNativeProps = {
    value: string
    children: React.ReactNode
    testID?: string
    style?: StyleProp<ViewStyle>
}
