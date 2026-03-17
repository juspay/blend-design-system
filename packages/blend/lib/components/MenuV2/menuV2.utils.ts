import type { ReactNode } from 'react'
import type { MenuV2GroupType, MenuV2ItemType } from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'

import { MenuV2ItemActionType, MenuV2ItemVariant } from './menuV2.types'
import type { MenuV2ItemStates } from './menuV2.tokens'

type MenuV2ItemTokens = MenuV2TokensType['group']['item']

export const getItemSlots = (item: MenuV2ItemType): [ReactNode?] => {
    return [item.label.leftSlot]
}

export const filterMenuItem = (
    item: MenuV2ItemType,
    lower: string
): MenuV2ItemType | null => {
    const matches =
        (item.label.text && item.label.text.toLowerCase().includes(lower)) ||
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

export const getMenuItemBackgroundColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const bg = itemTokens.backgroundColor
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        const tokensForVariant = bg[MenuV2ItemVariant.DEFAULT]
        if (item.disabled) {
            return tokensForVariant.disabled
        }
        return tokensForVariant[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionBg = bg[MenuV2ItemVariant.ACTION][actionType]
    if (item.disabled) {
        return actionBg.disabled
    }
    return actionBg[state]
}

export const getMenuItemOptionColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const colors = itemTokens.text.color
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        const tokensForVariant = colors[MenuV2ItemVariant.DEFAULT]
        if (item.disabled) {
            return tokensForVariant.disabled
        }
        return tokensForVariant[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionColors = colors[MenuV2ItemVariant.ACTION][actionType]
    if (item.disabled) {
        return actionColors.disabled
    }
    return actionColors[state]
}

export const getMenuItemDescriptionColor = (
    state: MenuV2ItemStates,
    itemTokens: MenuV2ItemTokens,
    item: MenuV2ItemType
): string | undefined => {
    const colors = itemTokens.text.subText.color
    const variant = item.variant ?? MenuV2ItemVariant.DEFAULT
    if (variant === MenuV2ItemVariant.DEFAULT) {
        const tokensForVariant = colors[MenuV2ItemVariant.DEFAULT]
        if (item.disabled) {
            return tokensForVariant.disabled
        }
        return tokensForVariant[state]
    }
    const actionType = item.actionType ?? MenuV2ItemActionType.PRIMARY
    const actionColors = colors[MenuV2ItemVariant.ACTION][actionType]
    if (item.disabled) {
        return actionColors.disabled
    }
    return actionColors[state]
}

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
