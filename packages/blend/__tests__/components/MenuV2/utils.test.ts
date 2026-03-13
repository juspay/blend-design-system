import { describe, it, expect } from 'vitest'
import {
    filterMenuGroups,
    filterMenuItem,
} from '../../../lib/components/MenuV2/menuV2.utils'
import type {
    MenuV2GroupType,
    MenuV2ItemType,
} from '../../../lib/components/MenuV2/menuV2.types'

describe('MenuV2 utils', () => {
    const createItem = (
        overrides: Partial<MenuV2ItemType> = {}
    ): MenuV2ItemType => ({
        label: 'Item',
        ...overrides,
    })

    it('filterMenuItem returns item when label matches search', () => {
        const item = createItem({ label: 'Profile' })
        const result = filterMenuItem(item, 'pro')
        expect(result).not.toBeNull()
        expect(result?.label).toBe('Profile')
    })

    it('filterMenuItem returns null when no match and no submenu', () => {
        const item = createItem({ label: 'Settings' })
        const result = filterMenuItem(item, 'xyz')
        expect(result).toBeNull()
    })

    it('filterMenuItem filters nested submenu items and preserves parent when any child matches', () => {
        const item: MenuV2ItemType = {
            label: 'Parent',
            subMenu: [
                { label: 'California' },
                { label: 'New York' },
                { label: 'Texas' },
            ],
        }

        const result = filterMenuItem(item, 'york')
        expect(result).not.toBeNull()
        expect(result?.subMenu).toHaveLength(1)
        expect(result?.subMenu?.[0].label).toBe('New York')
    })

    it('filterMenuGroups returns original groups when search text is empty', () => {
        const groups: MenuV2GroupType[] = [
            { label: 'Group', items: [createItem({ label: 'A' })] },
        ]

        const result = filterMenuGroups(groups, '')
        expect(result).toEqual(groups)
    })

    it('filterMenuGroups filters out groups with no matching items', () => {
        const groups: MenuV2GroupType[] = [
            {
                label: 'First',
                items: [createItem({ label: 'Alpha' })],
            },
            {
                label: 'Second',
                items: [createItem({ label: 'Beta' })],
            },
        ]

        const result = filterMenuGroups(groups, 'beta')
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Second')
        expect(result[0].items[0].label).toBe('Beta')
    })
})
