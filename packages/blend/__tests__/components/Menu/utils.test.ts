import { describe, it, expect } from 'vitest'
import {
    MenuMatchRank,
    getItemMatchRank,
    defaultSearchSortFn,
    filterMenuGroups,
    filterMenuItem,
} from '../../../lib/components/Menu/utils'
import type {
    MenuGroupType,
    MenuItemType,
} from '../../../lib/components/Menu/types'

const item = (label: string, subLabel?: string): MenuItemType =>
    ({ label, subLabel }) as MenuItemType

const group = (items: MenuItemType[]): MenuGroupType => ({ items })

describe('MenuMatchRank', () => {
    it('orders ranks from best to worst', () => {
        expect(MenuMatchRank.EXACT).toBeLessThan(MenuMatchRank.PREFIX)
        expect(MenuMatchRank.PREFIX).toBeLessThan(MenuMatchRank.SUBSTRING)
        expect(MenuMatchRank.SUBSTRING).toBeLessThan(MenuMatchRank.NONE)
    })
})

describe('getItemMatchRank', () => {
    it('returns EXACT when label exactly matches (case-insensitive)', () => {
        expect(getItemMatchRank(item('Search'), 'search')).toBe(
            MenuMatchRank.EXACT
        )
        expect(getItemMatchRank(item('SEARCH'), 'search')).toBe(
            MenuMatchRank.EXACT
        )
    })

    it('returns PREFIX when label starts with the search text', () => {
        expect(getItemMatchRank(item('Search Settings'), 'search')).toBe(
            MenuMatchRank.PREFIX
        )
    })

    it('returns SUBSTRING when label only contains the search text', () => {
        expect(getItemMatchRank(item('Advanced Search Tools'), 'search')).toBe(
            MenuMatchRank.SUBSTRING
        )
    })

    it('returns NONE when neither label nor subLabel match', () => {
        expect(getItemMatchRank(item('Create'), 'search')).toBe(
            MenuMatchRank.NONE
        )
    })

    it('uses the best rank across label and subLabel', () => {
        // label is substring, subLabel is exact -> should be EXACT
        expect(
            getItemMatchRank(item('Advanced Search', 'Search'), 'search')
        ).toBe(MenuMatchRank.EXACT)
        // label is none, subLabel is prefix -> should be PREFIX
        expect(getItemMatchRank(item('Create', 'Settings page'), 'set')).toBe(
            MenuMatchRank.PREFIX
        )
    })

    it('returns NONE when fields are missing', () => {
        expect(getItemMatchRank(item(''), 'search')).toBe(MenuMatchRank.NONE)
    })
})

describe('defaultSearchSortFn', () => {
    it('returns items unchanged when search text is empty or whitespace', () => {
        const items = [item('Search'), item('Create'), item('Sort')]
        expect(defaultSearchSortFn(items, '')).toBe(items)
        expect(defaultSearchSortFn(items, '   ')).toBe(items)
    })

    it('sorts exact match before prefix before substring (stable)', () => {
        const items = [
            item('Advanced Search Tools'), // substring
            item('Search'), // exact
            item('Search Settings'), // prefix
        ]
        const sorted = defaultSearchSortFn(items, 'search')
        expect(sorted.map((i) => i.label)).toEqual([
            'Search',
            'Search Settings',
            'Advanced Search Tools',
        ])
    })

    it('preserves original relative order within the same rank tier (stable sort)', () => {
        const items = [
            item('Sort Asc'),
            item('Search'),
            item('Sort Desc'),
            item('Search All'),
        ]
        const sorted = defaultSearchSortFn(items, 'sort')
        // "Sort Asc" and "Sort Desc" are both prefix matches -> keep order
        expect(sorted.map((i) => i.label)).toEqual([
            'Sort Asc',
            'Sort Desc',
            'Search', // prefix
            'Search All', // substring
        ])
    })

    it('does not mutate the input array', () => {
        const items = [item('Advanced Search'), item('Search'), item('Sort')]
        const original = [...items]
        defaultSearchSortFn(items, 'search')
        expect(items.map((i) => i.label)).toEqual(original.map((i) => i.label))
    })
})

describe('filterMenuItem', () => {
    it('returns the item when label matches', () => {
        expect(filterMenuItem(item('Search'), 'sea')).not.toBeNull()
    })

    it('returns null when nothing matches', () => {
        expect(filterMenuItem(item('Create'), 'search')).toBeNull()
    })

    it('keeps a parent when a submenu child matches', () => {
        const parent = {
            label: 'Commands',
            subMenu: [item('Create Project'), item('Delete File')],
        } as MenuItemType
        const result = filterMenuItem(parent, 'create')
        expect(result).not.toBeNull()
        expect(result?.subMenu?.length).toBe(1)
        expect(result?.subMenu?.[0].label).toBe('Create Project')
    })
})

describe('filterMenuGroups', () => {
    it('returns groups unchanged when search text is empty', () => {
        const groups = [group([item('Search'), item('Create')])]
        expect(filterMenuGroups(groups, '')).toBe(groups)
    })

    it('filters out groups with no matching items', () => {
        const groups = [group([item('Search')]), group([item('Create')])]
        const result = filterMenuGroups(groups, 'search')
        expect(result.length).toBe(1)
        expect(result[0].items[0].label).toBe('Search')
    })

    it('applies the default sort (exact → prefix → substring) to filtered items', () => {
        const groups = [
            group([
                item('Advanced Search Tools'),
                item('Search'),
                item('Search Settings'),
            ]),
        ]
        const result = filterMenuGroups(groups, 'search')
        expect(result[0].items.map((i) => i.label)).toEqual([
            'Search',
            'Search Settings',
            'Advanced Search Tools',
        ])
    })

    it('applies a custom searchSortFn when provided', () => {
        const groups = [group([item('Search'), item('Sort'), item('Create')])]
        // Reverse-alphabetical custom sort
        const customSort = (items: MenuItemType[]) =>
            [...items].sort((a, b) => (b.label! < a.label! ? -1 : 1))
        // Empty search short-circuits and returns groups unchanged, so test
        // with a matching query to exercise the custom sort path.
        const result = filterMenuGroups(groups, 's', customSort)
        // matches: Search, Sort. custom sort reverses -> Sort before Search
        expect(result[0].items.map((i) => i.label)).toEqual(['Sort', 'Search'])
    })
})
