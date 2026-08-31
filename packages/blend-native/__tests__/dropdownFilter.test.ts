import { describe, it, expect } from 'vitest'
import {
    filterGroups,
    filterItem,
    type FilterableItem,
} from '../src/components/shared/dropdown/dropdownFilter'

type TestItem = {
    primaryText: string
    secondaryText?: string
    subItems?: TestItem[]
} & FilterableItem

describe('filterItem', () => {
    const makeItem = (overrides: Partial<TestItem>): TestItem => ({
        primaryText: 'Apple',
        ...overrides,
    })

    it('matches on primaryText (case-insensitive)', () => {
        const item = makeItem({ primaryText: 'Apple Pie' })
        // filterItem expects an already-lowercased query (filterGroups
        // lowercases before delegating)
        expect(filterItem(item, 'apple')).not.toBeNull()
        expect(filterItem(item, 'pie')).not.toBeNull()
    })

    it('matches on secondaryText', () => {
        const item = makeItem({
            primaryText: 'Apple',
            secondaryText: 'A fruit',
        })
        expect(filterItem(item, 'fruit')).not.toBeNull()
    })

    it('returns null when no match', () => {
        const item = makeItem({ primaryText: 'Apple' })
        expect(filterItem(item, 'banana')).toBeNull()
    })

    it('returns null for empty query match against empty text', () => {
        const item = makeItem({ primaryText: 'Apple' })
        // empty query: queryLower is '', which matches everything
        expect(filterItem(item, '')).not.toBeNull()
    })

    it('preserves sub-menu children that match even when parent does not', () => {
        const item = makeItem({
            primaryText: 'Fruits',
            subItems: [{ primaryText: 'Apple' }, { primaryText: 'Banana' }],
        })
        const result = filterItem(item, 'apple')
        expect(result).not.toBeNull()
        expect(result!.subItems).toHaveLength(1)
        expect(result!.subItems![0].primaryText).toBe('Apple')
    })

    it('keeps parent when parent matches even if no children match', () => {
        const item = makeItem({
            primaryText: 'Apple',
            subItems: [{ primaryText: 'Carrot' }],
        })
        const result = filterItem(item, 'apple')
        expect(result).not.toBeNull()
        expect(result!.subItems).toHaveLength(0)
    })

    it('returns null when neither parent nor children match', () => {
        const item = makeItem({
            primaryText: 'Fruits',
            subItems: [{ primaryText: 'Apple' }],
        })
        expect(filterItem(item, 'carrot')).toBeNull()
    })

    it('recursively filters nested sub-menus', () => {
        const item: TestItem = {
            primaryText: 'Root',
            subItems: [
                {
                    primaryText: 'Child',
                    subItems: [{ primaryText: 'Deep Match' }],
                },
            ],
        }
        const result = filterItem(item, 'deep')
        expect(result).not.toBeNull()
        expect(result!.subItems).toHaveLength(1)
        expect(result!.subItems![0].subItems).toHaveLength(1)
        expect(result!.subItems![0].subItems![0].primaryText).toBe('Deep Match')
    })
})

describe('filterGroups', () => {
    const groups = [
        {
            label: 'Fruits',
            items: [
                { id: 'a', primaryText: 'Apple' },
                { id: 'b', primaryText: 'Banana' },
            ],
        },
        {
            label: 'Veggies',
            items: [{ id: 'c', primaryText: 'Carrot' }],
        },
    ]

    it('returns all groups when query is empty', () => {
        expect(filterGroups(groups, '')).toHaveLength(2)
    })

    it('filters items within groups', () => {
        const result = filterGroups(groups, 'apple')
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Fruits')
        expect(result[0].items).toHaveLength(1)
    })

    it('drops groups with no surviving items', () => {
        const result = filterGroups(groups, 'carrot')
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Veggies')
    })

    it('returns empty array when nothing matches', () => {
        const result = filterGroups(groups, 'pizza')
        expect(result).toHaveLength(0)
    })
})
