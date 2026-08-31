import {
    MenuV2ItemVariant,
    MenuV2ItemActionType,
    type MenuV2ItemType,
    type MenuV2GroupType,
    type MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import type {
    DropdownItemAdapter,
    DropdownContentTokens,
    DropdownItemTokens,
    DropdownItemState,
} from '../shared/dropdown/dropdown.types'
import type { FilterableItem } from '../shared/dropdown/dropdownFilter'

/**
 * Adapt a `MenuV2ItemType` to the common `DropdownItemAdapter` shape.
 *
 * Menu's item label is `{ text, leftSlot }` — the adapter unwraps it into
 * `primaryText` + `leadingSlot`. `variant` and `actionType` are collapsed
 * into a simpler `'default' | 'primary' | 'danger'` union for the row
 * renderer.
 */
export function menuItemAdapter(
    item: MenuV2ItemType,
    index: number
): DropdownItemAdapter<MenuV2ItemType> {
    const variant: 'default' | 'primary' | 'danger' =
        item.variant === MenuV2ItemVariant.ACTION
            ? item.actionType === MenuV2ItemActionType.DANGER
                ? 'danger'
                : 'primary'
            : 'default'

    return {
        id: item.id ?? `menu-item-${index}`,
        primaryText: item.label.text,
        secondaryText: item.subLabel,
        leadingSlot: item.label.leftSlot,
        disabled: item.disabled,
        isSelected: item.selected,
        hasSubMenu: Boolean(item.subMenu && item.subMenu.length > 0),
        variant,
        item,
    }
}

/**
 * Build a `FilterableItem` view of a menu item for `filterGroups`.
 * The filter works on `primaryText` / `secondaryText` and recurses into
 * `subItems` (which maps to `item.subMenu`).
 */
export function toFilterableItem(
    item: MenuV2ItemType
): FilterableItem<MenuV2ItemType> {
    return {
        primaryText: item.label.text,
        secondaryText: item.subLabel,
        subItems: item.subMenu?.map(toFilterableItem),
    }
}

/** Searchable text extractor — the primary label text. */
export function getMenuSearchableText(item: MenuV2ItemType): string {
    return item.label.text
}

/**
 * Map MenuV2 tokens to the `DropdownContentTokens` shape the shared
 * `DropdownContent` expects.
 */
export function getMenuContentTokens(
    tokens: MenuV2TokensType
): DropdownContentTokens {
    return {
        backgroundColor: String(tokens.backgroundColor),
        border: String(tokens.border),
        borderRadius: tokens.borderRadius,
        boxShadow: String(tokens.boxShadow),
        paddingTop: tokens.paddingTop,
        paddingRight: tokens.paddingRight,
        paddingBottom: tokens.paddingBottom,
        paddingLeft: tokens.paddingLeft,
        minWidth: tokens.minWidth,
        maxWidth: tokens.maxWidth,
    }
}

/**
 * Resolve the background color for an item given its variant, actionType,
 * and state. The MenuV2 token tree nests:
 * `backgroundColor[variant][actionType?][state]`.
 */
function resolveBackgroundColor(
    tokens: MenuV2TokensType,
    variant: MenuV2ItemVariant,
    actionType: MenuV2ItemActionType,
    state: DropdownItemState
): string {
    const bg = tokens.group.item.backgroundColor
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return String(bg[variant][state])
    }
    return String(bg[variant][actionType][state])
}

function resolveTextColor(
    tokens: MenuV2TokensType,
    variant: MenuV2ItemVariant,
    actionType: MenuV2ItemActionType,
    state: DropdownItemState
): string {
    const color = tokens.group.item.text.color
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return String(color[variant][state])
    }
    return String(color[variant][actionType][state])
}

function resolveSubTextColor(
    tokens: MenuV2TokensType,
    variant: MenuV2ItemVariant,
    actionType: MenuV2ItemActionType,
    state: DropdownItemState
): string {
    const color = tokens.group.item.text.subText.color
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return String(color[variant][state])
    }
    return String(color[variant][actionType][state])
}

/**
 * Map MenuV2 item tokens to the `DropdownItemTokens` shape. For the default
 * variant; action variants resolve through the same state keys.
 */
export function getMenuItemTokens(
    tokens: MenuV2TokensType,
    variant: MenuV2ItemVariant = MenuV2ItemVariant.DEFAULT,
    actionType: MenuV2ItemActionType = MenuV2ItemActionType.PRIMARY
): DropdownItemTokens {
    const itemTokens = tokens.group.item
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
        bgRecord[s] = resolveBackgroundColor(tokens, variant, actionType, s)
        colorRecord[s] = resolveTextColor(tokens, variant, actionType, s)
        subColorRecord[s] = resolveSubTextColor(tokens, variant, actionType, s)
    }

    return {
        paddingTop: itemTokens.paddingTop,
        paddingRight: itemTokens.paddingRight,
        paddingBottom: itemTokens.paddingBottom,
        paddingLeft: itemTokens.paddingLeft,
        margin: itemTokens.marginTop,
        gap: itemTokens.gap,
        borderRadius: itemTokens.borderRadius,
        backgroundColor: bgRecord,
        text: {
            fontSize: itemTokens.text.fontSize,
            fontWeight: itemTokens.text.fontWeight,
            lineHeight: itemTokens.text.lineHeight,
            color: colorRecord,
            subText: {
                fontSize: itemTokens.text.subText.fontSize,
                fontWeight: itemTokens.text.subText.fontWeight,
                lineHeight: itemTokens.text.subText.lineHeight,
                color: subColorRecord,
            },
            leftSlot: itemTokens.text.leftSlot,
            checkmark: itemTokens.text.checkmark
                ? {
                      position: itemTokens.text.checkmark.position,
                      width: Number(itemTokens.text.checkmark.width) || 16,
                      color: String(itemTokens.text.checkmark.color),
                  }
                : undefined,
            rightChevron: {
                color: String(itemTokens.text.rightChevron.color),
                width: Number(itemTokens.text.rightChevron.width) || 16,
            },
        },
    }
}

/**
 * Flatten menu groups into adapter-backed groups for `DropdownList`.
 */
export function flattenMenuGroups(groups: MenuV2GroupType[]): Array<{
    label?: string
    items: DropdownItemAdapter<MenuV2ItemType>[]
    showSeparator?: boolean
}> {
    let globalIndex = 0
    return groups.map((group) => ({
        label: group.label,
        items: group.items.map((item) => menuItemAdapter(item, globalIndex++)),
        showSeparator: group.showSeparator,
    }))
}
