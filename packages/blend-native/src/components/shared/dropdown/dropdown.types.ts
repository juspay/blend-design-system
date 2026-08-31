import type { ReactNode } from 'react'
import type {
    SelectV2ItemStates,
    SelectV2TriggerStates,
} from '@juspay/blend-design-system/node'

/**
 * Shared dropdown layer — the reusable pieces behind Menu, SingleSelect,
 * and MultiSelect.
 *
 * Each component provides an *adapter* that maps its own item shape to
 * `DropdownItemAdapter`, so `DropdownItem` / `DropdownList` /
 * `DropdownContent` work for all three without knowing about their concrete
 * item types. Mirrors web's `components/shared/` convention.
 */

export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right'
export type DropdownAlignment = 'start' | 'center' | 'end'

/**
 * Normalized item shape — what every dropdown item looks like after the
 * component adapter has mapped its own `MenuV2ItemType` /
 * `SingleSelectV2ItemType` / `MultiSelectV2ItemType` to the common contract.
 */
export type DropdownItemAdapter<TItem = unknown> = {
    /** Stable key for list reconciliation. */
    id: string
    primaryText: string
    secondaryText?: string
    leadingSlot?: ReactNode
    trailingSlot?: ReactNode
    /**
     * Renders before `leadingSlot`, outside the slot container — for controls
     * like the Checkbox in MultiSelect that need their own interactivity.
     */
    leadingAccessory?: ReactNode
    disabled?: boolean
    isSelected?: boolean
    hasSubMenu?: boolean
    variant?: 'default' | 'primary' | 'danger'
    /** The original item, passed back when the row is pressed. */
    item: TItem
}

export type DropdownFlatRow<TItem = unknown> = {
    type: 'label' | 'separator' | 'item'
    id: string
    item?: DropdownItemAdapter<TItem>
    label?: string
    groupId: number
}

/**
 * Item state resolution for native. There is no hover/focus on touch, so the
 * states that matter are: `default`, `active` (pressed), `disabled`, and
 * `selected`. The `Pressable` primitive handles `active` via
 * `activeBackground`; `selected` and `disabled` are resolved from item data.
 */
export type DropdownItemState = SelectV2ItemStates
export type DropdownTriggerState = SelectV2TriggerStates

export type DropdownItemTokens = {
    paddingTop: string | number | undefined
    paddingRight: string | number | undefined
    paddingBottom: string | number | undefined
    paddingLeft: string | number | undefined
    margin: string | number | undefined
    gap: string | number | undefined
    borderRadius: string | number | undefined
    backgroundColor: Record<DropdownItemState, string>
    text: {
        fontSize: string | number | undefined
        fontWeight: string | number | undefined
        lineHeight?: string | number | undefined
        color: Record<DropdownItemState, string>
        subText: {
            fontSize: string | number | undefined
            fontWeight: string | number | undefined
            lineHeight?: string | number | undefined
            color: Record<DropdownItemState, string>
        }
        leftSlot: {
            maxWidth?: string | number | undefined
            maxHeight: string | number | undefined
        }
        checkmark?: {
            position: 'leading' | 'trailing'
            width: string | number
            color: string
        }
        rightChevron: {
            color: string
            width: string | number
        }
    }
}

export type DropdownContentTokens = {
    backgroundColor: string
    border: string
    borderRadius: string | number | undefined
    boxShadow?: string
    paddingTop: string | number | undefined
    paddingRight: string | number | undefined
    paddingBottom: string | number | undefined
    paddingLeft: string | number | undefined
    minWidth?: string | number | undefined
    maxWidth?: string | number | undefined
}
