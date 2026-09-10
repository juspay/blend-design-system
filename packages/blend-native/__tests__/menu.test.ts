import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    MenuV2ItemVariant,
    MenuV2ItemActionType,
    getMenuV2Tokens,
    type MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    menuItemAdapter,
    getMenuItemTokens,
    getMenuContentTokens,
    flattenMenuGroups,
    toFilterableItem,
} from '../src/components/Menu/menu.utils'
import type { MenuV2ItemType } from '@juspay/blend-design-system/node'

const tokens = getMenuV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as MenuV2TokensType

describe('menuItemAdapter', () => {
    const baseItem: MenuV2ItemType = {
        id: 'item-1',
        label: { text: 'Apple' },
        subLabel: 'A fruit',
    }

    it('unwraps label.text into primaryText', () => {
        const adapter = menuItemAdapter(baseItem, 0)
        expect(adapter.primaryText).toBe('Apple')
    })

    it('maps subLabel to secondaryText', () => {
        const adapter = menuItemAdapter(baseItem, 0)
        expect(adapter.secondaryText).toBe('A fruit')
    })

    it('maps label.leftSlot to leadingSlot', () => {
        const slot = { type: 'icon' } as unknown as React.ReactElement
        const item = { ...baseItem, label: { text: 'Apple', leftSlot: slot } }
        const adapter = menuItemAdapter(item, 0)
        expect(adapter.leadingSlot).toBe(slot)
    })

    it('detects hasSubMenu when subMenu is non-empty', () => {
        const item = {
            ...baseItem,
            subMenu: [{ label: { text: 'Child' } }],
        } as MenuV2ItemType
        expect(menuItemAdapter(item, 0).hasSubMenu).toBe(true)
    })

    it('hasSubMenu is false when subMenu is empty', () => {
        const item = { ...baseItem, subMenu: [] } as MenuV2ItemType
        expect(menuItemAdapter(item, 0).hasSubMenu).toBe(false)
    })

    it('passes through disabled and selected', () => {
        const item = { ...baseItem, disabled: true, selected: true }
        const adapter = menuItemAdapter(item, 0)
        expect(adapter.disabled).toBe(true)
        expect(adapter.isSelected).toBe(true)
    })

    it('resolves variant=default', () => {
        const adapter = menuItemAdapter(baseItem, 0)
        expect(adapter.variant).toBe('default')
    })

    it('resolves variant=action/primary', () => {
        const item = {
            ...baseItem,
            variant: MenuV2ItemVariant.ACTION,
            actionType: MenuV2ItemActionType.PRIMARY,
        } as MenuV2ItemType
        expect(menuItemAdapter(item, 0).variant).toBe('primary')
    })

    it('resolves variant=action/danger', () => {
        const item = {
            ...baseItem,
            variant: MenuV2ItemVariant.ACTION,
            actionType: MenuV2ItemActionType.DANGER,
        } as MenuV2ItemType
        expect(menuItemAdapter(item, 0).variant).toBe('danger')
    })

    it('generates an id when absent', () => {
        const item = { label: { text: 'NoId' } } as MenuV2ItemType
        expect(menuItemAdapter(item, 3).id).toBe('menu-item-3')
    })
})

describe('getMenuItemTokens', () => {
    it('returns a backgroundColor record for all states', () => {
        const t = getMenuItemTokens(tokens)
        expect(t.backgroundColor.default).toBeDefined()
        expect(t.backgroundColor.hover).toBeDefined()
        expect(t.backgroundColor.active).toBeDefined()
        expect(t.backgroundColor.disabled).toBeDefined()
        expect(t.backgroundColor.selected).toBeDefined()
    })

    it('returns a text color record for all states', () => {
        const t = getMenuItemTokens(tokens)
        expect(t.text.color.default).toBeDefined()
        expect(t.text.color.disabled).toBeDefined()
    })

    it('preserves checkmark config', () => {
        const t = getMenuItemTokens(tokens)
        expect(t.text.checkmark).toBeDefined()
        expect(t.text.checkmark?.position).toBe('trailing')
    })

    it('resolves action/primary variant tokens', () => {
        const actionTokens = getMenuItemTokens(
            tokens,
            MenuV2ItemVariant.ACTION,
            MenuV2ItemActionType.PRIMARY
        )
        const regularTokens = getMenuItemTokens(tokens)
        // Action variant should differ from default variant
        expect(actionTokens.backgroundColor.default).not.toBe(
            regularTokens.backgroundColor.default
        )
    })
})

describe('getMenuContentTokens', () => {
    it('maps content-level token fields', () => {
        const t = getMenuContentTokens(tokens)
        expect(t.backgroundColor).toBeDefined()
        expect(t.borderRadius).toBeDefined()
        expect(t.paddingTop).toBeDefined()
    })
})

describe('flattenMenuGroups', () => {
    it('adapts groups with labels and items', () => {
        const groups = [
            {
                label: 'Fruits',
                items: [
                    { id: 'a', label: { text: 'Apple' } },
                    { id: 'b', label: { text: 'Banana' } },
                ] as MenuV2ItemType[],
                showSeparator: true,
            },
        ]
        const result = flattenMenuGroups(groups)
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Fruits')
        expect(result[0].items).toHaveLength(2)
        expect(result[0].items[0].primaryText).toBe('Apple')
        expect(result[0].showSeparator).toBe(true)
    })
})

describe('toFilterableItem', () => {
    it('maps label.text to primaryText', () => {
        const item = { label: { text: 'Apple' } } as MenuV2ItemType
        expect(toFilterableItem(item).primaryText).toBe('Apple')
    })

    it('maps subMenu to subItems recursively', () => {
        const item = {
            label: { text: 'Parent' },
            subMenu: [{ label: { text: 'Child' } }],
        } as MenuV2ItemType
        const result = toFilterableItem(item)
        expect(result.subItems).toHaveLength(1)
        expect(result.subItems![0].primaryText).toBe('Child')
    })
})
