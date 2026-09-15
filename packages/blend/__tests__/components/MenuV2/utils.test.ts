import { describe, it, expect } from 'vitest'
import {
    filterMenuV2Groups,
    filterMenuV2Item,
    getItemSlots,
    flattenMenuV2Groups,
    getItemMatchRank,
    defaultSearchSortFn,
    MenuV2MatchRank,
} from '../../../lib/components/MenuV2/menuV2.utils'
import type {
    MenuV2GroupType,
    MenuV2ItemType,
} from '../../../lib/components/MenuV2/menuV2.types'

describe('MenuV2 utils', () => {
    const createItem = (
        overrides: Partial<MenuV2ItemType> = {}
    ): MenuV2ItemType => ({
        label: { text: 'Item' },
        ...overrides,
    })

    describe('getItemSlots', () => {
        it('returns undefined for all when slot is not set', () => {
            const item = createItem({ label: { text: 'Only' } })
            const [s] = getItemSlots(item)
            expect(s).toBeUndefined()
        })
    })

    describe('flattenMenuV2Groups', () => {
        it('flattens groups into label, item, and separator rows', () => {
            const groups: MenuV2GroupType[] = [
                {
                    id: 'g1',
                    label: 'Group A',
                    items: [createItem({ id: 'i1', label: { text: 'One' } })],
                    showSeparator: true,
                },
                {
                    id: 'g2',
                    label: 'Group B',
                    items: [createItem({ label: { text: 'Two' } })],
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
                { items: [createItem({ label: { text: 'Only' } })] },
            ]
            const rows = flattenMenuV2Groups(groups)
            expect(rows).toHaveLength(1)
            expect(rows[0].type).toBe('item')
        })

        it('adds separator only between groups when showSeparator is true', () => {
            const groups: MenuV2GroupType[] = [
                {
                    label: 'A',
                    items: [createItem({ label: { text: 'a' } })],
                    showSeparator: true,
                },
                {
                    label: 'B',
                    items: [createItem({ label: { text: 'b' } })],
                    showSeparator: false,
                },
            ]
            const rows = flattenMenuV2Groups(groups)
            const separators = rows.filter((r) => r.type === 'separator')
            expect(separators).toHaveLength(1)
        })

        it('preserves group selection configuration for virtual rows', () => {
            const rows = flattenMenuV2Groups([
                {
                    selectionStyle: 'highlight',
                    selectionMode: 'multiple',
                    items: [createItem({ selected: true })],
                },
            ])

            expect(rows[0]).toMatchObject({
                type: 'item',
                selectionStyle: 'highlight',
                selectionMode: 'multiple',
            })
        })
    })

    it('filterMenuV2Item returns item when label matches search', () => {
        const item = createItem({ label: { text: 'Profile' } })
        const result = filterMenuV2Item(item, 'pro')
        expect(result).not.toBeNull()
        expect(result?.label.text).toBe('Profile')
    })

    it('filterMenuV2Item returns null when no match and no submenu', () => {
        const item = createItem({ label: { text: 'Settings' } })
        const result = filterMenuV2Item(item, 'xyz')
        expect(result).toBeNull()
    })

    it('filterMenuV2Item filters nested submenu items and preserves parent when any child matches', () => {
        const item: MenuV2ItemType = {
            label: { text: 'Parent' },
            subMenu: [
                { label: { text: 'California' } },
                { label: { text: 'New York' } },
                { label: { text: 'Texas' } },
            ],
        }

        const result = filterMenuV2Item(item, 'york')
        expect(result).not.toBeNull()
        expect(result?.subMenu).toHaveLength(1)
        expect(result?.subMenu?.[0].label.text).toBe('New York')
    })

    it('filterMenuV2Groups returns original groups when search text is empty', () => {
        const groups: MenuV2GroupType[] = [
            { label: 'Group', items: [createItem({ label: { text: 'A' } })] },
        ]

        const result = filterMenuV2Groups(groups, '')
        expect(result).toEqual(groups)
    })

    it('filterMenuV2Groups filters out groups with no matching items', () => {
        const groups: MenuV2GroupType[] = [
            {
                label: 'First',
                items: [createItem({ label: { text: 'Alpha' } })],
            },
            {
                label: 'Second',
                items: [createItem({ label: { text: 'Beta' } })],
            },
        ]

        const result = filterMenuV2Groups(groups, 'beta')
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Second')
        expect(result[0].items[0].label.text).toBe('Beta')
    })

    describe('getItemMatchRank', () => {
        it('returns EXACT when label.text equals the query (case-insensitive)', () => {
            const item = createItem({ label: { text: 'Search' } })
            // getItemMatchRank expects a pre-lowercased query (internal helper)
            expect(getItemMatchRank(item, 'search')).toBe(MenuV2MatchRank.EXACT)
        })

        it('returns EXACT for label.text that matches ignoring case (caller lowercases)', () => {
            const item = createItem({ label: { text: 'SEARCH' } })
            expect(getItemMatchRank(item, 'search')).toBe(MenuV2MatchRank.EXACT)
        })

        it('returns PREFIX when label.text starts with the query', () => {
            const item = createItem({ label: { text: 'Settings' } })
            expect(getItemMatchRank(item, 'set')).toBe(MenuV2MatchRank.PREFIX)
        })

        it('returns SUBSTRING when the query appears mid-string', () => {
            const item = createItem({
                label: { text: 'Advanced Search Tools' },
            })
            expect(getItemMatchRank(item, 'search')).toBe(
                MenuV2MatchRank.SUBSTRING
            )
        })

        it('returns NONE when neither label nor subLabel matches', () => {
            const item = createItem({
                label: { text: 'Profile' },
                subLabel: 'Account info',
            })
            expect(getItemMatchRank(item, 'xyz')).toBe(MenuV2MatchRank.NONE)
        })

        it('uses the better rank across label.text and subLabel', () => {
            const item = createItem({
                label: { text: 'Advanced Search Tools' },
                subLabel: 'Search',
            })
            // label is SUBSTRING, subLabel is EXACT -> best rank is EXACT
            expect(getItemMatchRank(item, 'search')).toBe(MenuV2MatchRank.EXACT)
        })

        it('matches via subLabel only when label.text does not match', () => {
            const item = createItem({
                label: { text: 'Enterprise' },
                subLabel: 'Full feature set',
            })
            expect(getItemMatchRank(item, 'full')).toBe(MenuV2MatchRank.PREFIX)
        })
    })

    describe('defaultSearchSortFn', () => {
        it('returns items unchanged when search text is empty', () => {
            const items = [
                createItem({ id: 'a', label: { text: 'Apple' } }),
                createItem({ id: 'b', label: { text: 'Banana' } }),
            ]
            expect(defaultSearchSortFn(items, '')).toEqual(items)
        })

        it('returns items unchanged when search text is whitespace', () => {
            const items = [
                createItem({ id: 'a', label: { text: 'Apple' } }),
                createItem({ id: 'b', label: { text: 'Banana' } }),
            ]
            expect(defaultSearchSortFn(items, '   ')).toEqual(items)
        })

        it('ranks exact match before prefix before substring', () => {
            // Deliberately declare substring match first to verify reordering
            const items = [
                createItem({
                    id: 'sub',
                    label: { text: 'Advanced Search Tools' },
                }),
                createItem({ id: 'pre', label: { text: 'Search Settings' } }),
                createItem({ id: 'exact', label: { text: 'Search' } }),
            ]
            const sorted = defaultSearchSortFn(items, 'search')
            expect(sorted.map((i) => i.id)).toEqual(['exact', 'pre', 'sub'])
        })

        it('preserves original relative order for items at the same rank (stable)', () => {
            const items = [
                createItem({ id: 'first', label: { text: 'Search One' } }),
                createItem({ id: 'second', label: { text: 'Search Two' } }),
                createItem({ id: 'third', label: { text: 'Search Three' } }),
            ]
            const sorted = defaultSearchSortFn(items, 'search')
            // All three are prefix matches -> order must be preserved
            expect(sorted.map((i) => i.id)).toEqual([
                'first',
                'second',
                'third',
            ])
        })

        it('does not mutate the input array', () => {
            const items = [
                createItem({ id: 'sub', label: { text: 'Advanced Search' } }),
                createItem({ id: 'exact', label: { text: 'Search' } }),
            ]
            const inputCopy = [...items]
            defaultSearchSortFn(items, 'search')
            expect(items.map((i) => i.id)).toEqual(inputCopy.map((i) => i.id))
        })
    })

    describe('filterMenuV2Groups ranking integration', () => {
        it('applies default ranking so exact matches come first within a group', () => {
            const groups: MenuV2GroupType[] = [
                {
                    label: 'Results',
                    items: [
                        createItem({
                            id: 'sub',
                            label: { text: 'Advanced Search Tools' },
                        }),
                        createItem({
                            id: 'exact',
                            label: { text: 'Search' },
                        }),
                        createItem({
                            id: 'pre',
                            label: { text: 'Search Settings' },
                        }),
                    ],
                },
            ]

            const result = filterMenuV2Groups(groups, 'search')
            expect(result[0].items.map((i) => i.id)).toEqual([
                'exact',
                'pre',
                'sub',
            ])
        })

        it('honors a custom searchSortFn and overrides the default ranking', () => {
            const groups: MenuV2GroupType[] = [
                {
                    label: 'Results',
                    items: [
                        createItem({ id: 'a', label: { text: 'Alpha' } }),
                        createItem({ id: 'b', label: { text: 'Beta' } }),
                    ],
                },
            ]

            // Reverse alphabetical sort
            const reverseSort = (items: MenuV2ItemType[]): MenuV2ItemType[] =>
                [...items].sort().reverse()

            const result = filterMenuV2Groups(groups, 'a', reverseSort)
            const ids = result[0].items.map((i) => i.id)
            expect(ids).toEqual(['b', 'a'])
        })
    })
})
