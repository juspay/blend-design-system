import {
    SelectV2Variant,
    SelectV2Size,
    type SingleSelectV2ItemType,
    type SingleSelectV2GroupType,
    type SingleSelectV2TokensType,
    type SelectV2ItemStates,
} from '@juspay/blend-design-system/node'
import type {
    DropdownItemAdapter,
    DropdownContentTokens,
    DropdownItemTokens,
    DropdownItemState,
    DropdownTriggerState,
} from '../shared/dropdown/dropdown.types'
import type { FilterableItem } from '../shared/dropdown/dropdownFilter'

/**
 * Adapt a `SingleSelectV2ItemType` to the common `DropdownItemAdapter`.
 *
 * SingleSelect items use `label` (string) directly, not the `{ text,
 * leftSlot }` shape Menu uses. The selected state is derived by comparing
 * `item.value` against the `selectedValue` prop.
 */
export function singleSelectItemAdapter(
    item: SingleSelectV2ItemType,
    index: number,
    selectedValue: string
): DropdownItemAdapter<SingleSelectV2ItemType> {
    return {
        id: `ss-item-${index}`,
        primaryText: item.label,
        secondaryText: item.subLabel,
        leadingSlot: item.slot1,
        trailingSlot: item.slot2,
        disabled: item.disabled,
        isSelected: item.value === selectedValue,
        hasSubMenu: Boolean(item.subMenu && item.subMenu.length > 0),
        variant: 'default',
        item,
    }
}

/** Build a value→label map for resolving the selected value's display text. */
export function getValueLabelMap(
    groups: SingleSelectV2GroupType[]
): Record<string, string> {
    const map: Record<string, string> = {}
    const traverse = (items: SingleSelectV2ItemType[]) => {
        for (const item of items) {
            map[item.value] = item.label
            if (item.subMenu) traverse(item.subMenu)
        }
    }
    for (const group of groups) traverse(group.items)
    return map
}

/** Resolve the trigger state for token lookup. */
export function getTriggerState(
    open: boolean,
    disabled: boolean,
    hasError: boolean
): DropdownTriggerState {
    if (disabled) return 'closed'
    if (hasError) return 'error'
    if (open) return 'open'
    return 'closed'
}

/** Convert a SingleSelect item to a filterable shape. */
export function toFilterableItem(
    item: SingleSelectV2ItemType
): FilterableItem<SingleSelectV2ItemType> {
    return {
        primaryText: item.label,
        secondaryText: item.subLabel,
        subItems: item.subMenu?.map(toFilterableItem),
    }
}

/**
 * Map SingleSelectV2 content tokens to the shared `DropdownContentTokens`.
 */
export function getSingleSelectContentTokens(
    tokens: SingleSelectV2TokensType,
    size: SelectV2Size,
    variant: SelectV2Variant
): DropdownContentTokens {
    const menu = tokens.menu
    return {
        backgroundColor: String(menu.content.backgroundColor),
        border: String(menu.content.border),
        borderRadius: menu.content.borderRadius,
        boxShadow: String(menu.content.boxShadow),
        paddingTop: menu.padding[size][variant].top,
        paddingRight: menu.padding[size][variant].right,
        paddingBottom: menu.padding[size][variant].bottom,
        paddingLeft: menu.padding[size][variant].left,
    }
}

/** Map SingleSelectV2 item tokens to the shared `DropdownItemTokens`. */
export function getSingleSelectItemTokens(
    tokens: SingleSelectV2TokensType
): DropdownItemTokens {
    const item = tokens.menu.item
    const states: DropdownItemState[] = [
        'default',
        'hover',
        'active',
        'focus',
        'focusVisible',
        'disabled',
        'selected',
    ]
    const bgRecord = {} as Record<DropdownItemState, string>
    const colorRecord = {} as Record<DropdownItemState, string>
    const subColorRecord = {} as Record<DropdownItemState, string>
    for (const s of states) {
        bgRecord[s] = String(item.backgroundColor[s as SelectV2ItemStates])
        colorRecord[s] = String(item.option.color[s as SelectV2ItemStates])
        subColorRecord[s] = String(
            item.description.color[s as SelectV2ItemStates]
        )
    }

    return {
        paddingTop: item.paddingTop,
        paddingRight: item.paddingRight,
        paddingBottom: item.paddingBottom,
        paddingLeft: item.paddingLeft,
        margin: item.margin,
        gap: item.gap,
        borderRadius: item.borderRadius,
        backgroundColor: bgRecord,
        text: {
            fontSize: item.option.fontSize,
            fontWeight: item.option.fontWeight,
            color: colorRecord,
            subText: {
                fontSize: item.description.fontSize,
                fontWeight: item.description.fontWeight,
                color: subColorRecord,
            },
            leftSlot: {
                maxWidth: 20,
                maxHeight: 20,
            },
            rightChevron: {
                color: '#6B7280',
                width: 16,
            },
        },
    }
}

/** Flatten groups into adapter-backed groups for the dropdown list. */
export function flattenSingleSelectGroups(
    groups: SingleSelectV2GroupType[],
    selectedValue: string
): Array<{
    label?: string
    items: DropdownItemAdapter<SingleSelectV2ItemType>[]
    showSeparator?: boolean
}> {
    let globalIndex = 0
    return groups.map((group) => ({
        label: group.groupLabel,
        items: group.items.map((item) =>
            singleSelectItemAdapter(item, globalIndex++, selectedValue)
        ),
        showSeparator: group.showSeparator,
    }))
}

/** Resolve trigger styles from tokens. */
export function getTriggerStyles(
    tokens: SingleSelectV2TokensType,
    size: SelectV2Size,
    variant: SelectV2Variant,
    state: DropdownTriggerState
) {
    const trigger = tokens.trigger
    return {
        height: trigger.height[size][variant],
        padding: trigger.padding[size][variant],
        borderRadius: trigger.borderRadius[size][variant],
        boxShadow: trigger.boxShadow[variant],
        backgroundColor: trigger.backgroundColor[variant][state],
        border: trigger.outline[variant][state],
    }
}
