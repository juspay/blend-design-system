import type { ReactElement, ReactNode } from 'react'
import type { View as RNView } from 'react-native'
import type {
    SelectV2Alignment,
    SelectV2Variant,
    SelectV2Size,
    SelectV2Side,
    SingleSelectV2ItemType,
    SingleSelectV2GroupType,
    SelectV2ErrorState,
    SelectV2SearchConfig,
} from '@juspay/blend-design-system/node'

/**
 * SingleSelect — React Native implementation of web's `SingleSelectV2`.
 *
 * A trigger button that opens a dropdown panel; selecting an item fires
 * `onSelect(value)` and closes the panel. Supports search, sub-menus,
 * custom triggers, error state, and mobile bottom-sheet mode.
 */
export type SingleSelectNativeProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean

    placeholder: string
    size?: SelectV2Size
    variant?: SelectV2Variant

    items: SingleSelectV2GroupType[]
    selected: string
    onSelect: (value: string) => void

    search?: SelectV2SearchConfig

    slot?: ReactNode
    customTrigger?: ReactElement

    open?: boolean
    onOpenChange?: (open: boolean) => void

    usePanelOnMobile?: boolean

    alignment?: SelectV2Alignment
    side?: SelectV2Side
    sideOffset?: number

    error?: SelectV2ErrorState
    disabled?: boolean

    enableVirtualization?: boolean

    allowCustomValue?: boolean
    customValueLabel?: string

    menuFooter?: ReactNode

    testID?: string
    accessibilityLabel?: string
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>
}

export type { SingleSelectV2ItemType }
export type { SingleSelectV2GroupType }
export type { SelectV2Alignment, SelectV2Variant, SelectV2Size, SelectV2Side }

export type SingleSelectRef = RNView
