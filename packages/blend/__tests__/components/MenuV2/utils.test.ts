import { describe, it, expect } from 'vitest'
import {
    filterMenuGroups,
    filterMenuItem,
    getItemSlots,
    flattenMenuV2Groups,
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

    describe('getItemSlots', () => {
        it('returns [slot, slot2, slot3, slot4] when slot is set', () => {
            const item = createItem({
                slot: 'Lead',
                slot2: 'S2',
                slot3: 'S3',
                slot4: 'S4',
            })
            const [s1, s2, s3, s4] = getItemSlots(item)
            expect(s1).toBe('Lead')
            expect(s2).toBe('S2')
            expect(s3).toBe('S3')
            expect(s4).toBe('S4')
        })

        it('uses slot1 when slot is not set (backward compat)', () => {
            const item = createItem({ slot1: 'Legacy' })
            const [s1] = getItemSlots(item)
            expect(s1).toBe('Legacy')
        })

        it('slot takes priority over slot1 when both set', () => {
            const item = createItem({ slot: 'New', slot1: 'Old' })
            const [s1] = getItemSlots(item)
            expect(s1).toBe('New')
        })

        it('returns undefined for missing slots', () => {
            const item = createItem({ label: 'Only' })
            const [s1, s2, s3, s4] = getItemSlots(item)
            expect(s1).toBeUndefined()
            expect(s2).toBeUndefined()
            expect(s3).toBeUndefined()
            expect(s4).toBeUndefined()
        })
    })

    describe('flattenMenuV2Groups', () => {
        it('flattens groups into label, item, and separator rows', () => {
            const groups: MenuV2GroupType[] = [
                {
                    id: 'g1',
                    label: 'Group A',
                    items: [createItem({ id: 'i1', label: 'One' })],
                    showSeparator: true,
                },
                {
                    id: 'g2',
                    label: 'Group B',
                    items: [createItem({ label: 'Two' })],
                    showSeparator: false,
                },
            ]
            const rows = flattenMenuV2Groups(groups)
            expect(rows).toHaveLength(5)
            expect(rows[0]).toMatchObject({
                type: 'label',
                id: 'g1',
                label: 'Group A',
            })
            expect(rows[1]).toMatchObject({
                type: 'item',
                id: 'i1',
                groupId: 0,
                itemIndex: 0,
            })
            expect(rows[2]).toMatchObject({
                type: 'separator',
                id: 'separator-0',
            })
            expect(rows[3]).toMatchObject({
                type: 'label',
                id: 'g2',
                label: 'Group B',
            })
            expect(rows[4]).toMatchObject({
                type: 'item',
                groupId: 1,
                itemIndex: 0,
            })
        })

        it('omits group label when not provided', () => {
            const groups: MenuV2GroupType[] = [
                { items: [createItem({ label: 'Only' })] },
            ]
            const rows = flattenMenuV2Groups(groups)
            expect(rows).toHaveLength(1)
            expect(rows[0].type).toBe('item')
        })

        it('adds separator only between groups when showSeparator is true', () => {
            const groups: MenuV2GroupType[] = [
                {
                    label: 'A',
                    items: [createItem({ label: 'a' })],
                    showSeparator: true,
                },
                {
                    label: 'B',
                    items: [createItem({ label: 'b' })],
                    showSeparator: false,
                },
            ]
            const rows = flattenMenuV2Groups(groups)
            const separators = rows.filter((r) => r.type === 'separator')
            expect(separators).toHaveLength(1)
        })
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
