import type { ReactNode } from 'react'
import type { MenuV2GroupType, MenuV2ItemType } from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'

type MenuV2ItemTokens = MenuV2TokensType['item']
import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'
import type { MenuV2ItemStates } from './menuV2.tokens'

/** Resolve [slot1, slot2, slot3, slot4] from item.slots or legacy slot1–slot4. */
export const getItemSlots = (
    item: MenuV2ItemType
): [ReactNode?, ReactNode?, ReactNode?, ReactNode?] => {
    if (item.slots) {
        const t = item.slots.trailing ?? []
        return [item.slots.leading, t[0], t[1], t[2]]
    }
    return [item.slot1, item.slot2, item.slot3, item.slot4]
}

/**
 * Filter a single menu item (and its submenu) by search text.
 */
export const filterMenuItem = (
    item: MenuV2ItemType,
    lower: string
): MenuV2ItemType | null => {
    const matches =
        (item.label && item.label.toLowerCase().includes(lower)) ||
        (item.subLabel && item.subLabel.toLowerCase().includes(lower))
    if (item.subMenu) {
        const filteredSub = item.subMenu
            .map((sub) => filterMenuItem(sub, lower))
            .filter(Boolean) as MenuV2ItemType[]
        if (filteredSub.length > 0 || matches) {
            return { ...item, subMenu: filteredSub }
        }
        return null
    }
    return matches ? item : null
}

/**
 * Resolve item background color from tokens by variant, actionType and state.
 */
export const getMenuItemBackgroundColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const bg = itemTokens.backgroundColor
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return item.disabled
            ? bg.default.disabled[state]
            : bg.default.enabled[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionBg = bg.action[actionType]
    return item.disabled ? actionBg.disabled[state] : actionBg.enabled[state]
}

/**
 * Resolve item label/option color from tokens by variant, actionType and state.
 */
export const getMenuItemOptionColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const colors = itemTokens.option.color
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return item.disabled
            ? colors.default.disabled[state]
            : colors.default.enabled[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionColors = colors.action[actionType]
    return item.disabled
        ? actionColors.disabled[state]
        : actionColors.enabled[state]
}

/**
 * Resolve item description/sublabel color from tokens.
 */
export const getMenuItemDescriptionColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const colors = itemTokens.description.color
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        return item.disabled
            ? colors.default.disabled[state]
            : colors.default.enabled[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionColors = colors.action[actionType]
    return item.disabled
        ? actionColors.disabled[state]
        : actionColors.enabled[state]
}

/**
 * Flatten menu groups into a list of rows for virtual scrolling: label, separator, or item.
 */
export type MenuV2FlatRow =
    | { type: 'label'; id: string; label: string }
    | { type: 'separator'; id: string }
    | {
          type: 'item'
          id: string
          item: MenuV2ItemType
          groupId: number
          itemIndex: number
      }

export const flattenMenuV2Groups = (
    groups: MenuV2GroupType[]
): MenuV2FlatRow[] => {
    const rows: MenuV2FlatRow[] = []
    groups.forEach((group, groupId) => {
        if (group.label) {
            rows.push({
                type: 'label',
                id: group.id ?? `group-label-${groupId}`,
                label: group.label,
            })
        }
        group.items.forEach((item, itemIndex) => {
            rows.push({
                type: 'item',
                id: item.id ?? `group-${groupId}-item-${itemIndex}`,
                item,
                groupId,
                itemIndex,
            })
        })
        if (groupId < groups.length - 1 && group.showSeparator) {
            rows.push({
                type: 'separator',
                id: `separator-${groupId}`,
            })
        }
    })
    return rows
}

/**
 * Filter menu groups by search text.
 */
export const filterMenuGroups = (
    groups: MenuV2GroupType[],
    searchText: string
): MenuV2GroupType[] => {
    if (!searchText) return groups
    const lower = searchText.toLowerCase()
    return groups
        .map((group) => {
            const filteredItems = group.items
                .map((item) => filterMenuItem(item, lower))
                .filter(Boolean) as MenuV2ItemType[]
            if (filteredItems.length === 0) return null
            return { ...group, items: filteredItems }
        })
        .filter(Boolean) as MenuV2GroupType[]
}
