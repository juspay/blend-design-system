import type { ReactElement, ReactNode } from 'react'
import type { View as RNView } from 'react-native'
import type {
    SelectV2Alignment,
    SelectV2Variant,
    SelectV2Size,
    SelectV2Side,
    MultiSelectV2ItemType,
    MultiSelectV2GroupType,
    MultiSelectV2SelectionTagType,
    SelectV2ErrorState,
    SelectV2SearchConfig,
} from '@juspay/blend-design-system/node'

/**
 * MultiSelect — React Native implementation of web's `MultiSelectV2`.
 *
 * A trigger button that opens a dropdown panel with multi-select items.
 * Supports select-all, action buttons, maxSelections, clear button,
 * search, and mobile bottom-sheet mode.
 */
export type MultiSelectAction = {
    text: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
}

export type MultiSelectNativeProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean

    placeholder: string
    size?: SelectV2Size
    variant?: SelectV2Variant
    selectionTagType?: MultiSelectV2SelectionTagType

    items?: MultiSelectV2GroupType[]
    selectedValues: string[]
    /** Legacy per-item toggle callback. */
    onChange?: (value: string) => void
    /** Recommended: fires with the complete resulting selection. */
    onSelectionChange?: (selectedValues: string[]) => void

    search?: SelectV2SearchConfig
    enableSelectAll?: boolean
    selectAllText?: string
    maxSelections?: number

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

    showActionButtons?: boolean
    primaryAction?: MultiSelectAction & {
        onClick: (selectedValues: string[]) => void
    }
    secondaryAction?: MultiSelectAction

    showItemDividers?: boolean
    showClearButton?: boolean
    onClearAllClick?: () => void

    enableVirtualization?: boolean

    menuFooter?: ReactNode

    testID?: string
    accessibilityLabel?: string
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>
}

export type { MultiSelectV2ItemType }
export type { MultiSelectV2GroupType }
export type {
    SelectV2Alignment,
    SelectV2Variant,
    SelectV2Size,
    SelectV2Side,
    MultiSelectV2SelectionTagType,
}

export type MultiSelectRef = RNView
