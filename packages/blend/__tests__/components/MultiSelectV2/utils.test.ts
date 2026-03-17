import { describe, it, expect, vi } from 'vitest'
import {
    getSelectAllState,
    getValueLabelMap,
    getFilteredMenuItem,
    filterMenuGroups,
    getAllAvailableValues,
    handleSelectAll,
    flattenMenuGroups,
    getMultiSelectBorderRadius,
    getMultiSelectCrossBorderRadius,
} from '../../../lib/components/MultiSelectV2/utils'
import type {
    MultiSelectV2GroupType,
    MultiSelectV2ItemType,
} from '../../../lib/components/MultiSelectV2/multiSelectV2.types'
import {
    MultiSelectV2Size,
    MultiSelectV2Variant,
} from '../../../lib/components/MultiSelectV2/multiSelectV2.types'
import { getMultiSelectV2Tokens } from '../../../lib/components/MultiSelectV2/multiSelectV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'

const tokens = getMultiSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT).sm

describe('MultiSelectV2 utils', () => {
    describe('getSelectAllState', () => {
        it('returns allSelected true when all available values are selected', () => {
            const result = getSelectAllState(['a', 'b', 'c'], ['a', 'b', 'c'])
            expect(result.allSelected).toBe(true)
            expect(result.someSelected).toBe(true)
        })

        it('returns someSelected true when some values are selected', () => {
            const result = getSelectAllState(['a'], ['a', 'b', 'c'])
            expect(result.allSelected).toBe(false)
            expect(result.someSelected).toBe(true)
        })

        it('returns both false when none selected', () => {
            const result = getSelectAllState([], ['a', 'b'])
            expect(result.allSelected).toBe(false)
            expect(result.someSelected).toBe(false)
        })

        it('returns allSelected false when availableValues is empty', () => {
            const result = getSelectAllState(['a'], [])
            expect(result.allSelected).toBe(false)
            expect(result.someSelected).toBe(false)
        })
    })

    describe('getValueLabelMap', () => {
        it('builds map from flat groups', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        { label: 'Apple', value: 'apple' },
                        { label: 'Banana', value: 'banana' },
                    ],
                },
            ]
            expect(getValueLabelMap(groups)).toEqual({
                apple: 'Apple',
                banana: 'Banana',
            })
        })

        it('includes nested subMenu labels', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        {
                            label: 'Parent',
                            value: 'parent',
                            subMenu: [{ label: 'Child', value: 'child' }],
                        },
                    ],
                },
            ]
            expect(getValueLabelMap(groups)).toEqual({
                parent: 'Parent',
                child: 'Child',
            })
        })
    })

    describe('getFilteredMenuItem', () => {
        it('returns item when label matches', () => {
            const item: MultiSelectV2ItemType = {
                label: 'Mumbai',
                value: 'mumbai',
            }
            expect(getFilteredMenuItem(item, 'mum')).toEqual(item)
        })

        it('returns null when no match', () => {
            const item: MultiSelectV2ItemType = {
                label: 'Mumbai',
                value: 'mumbai',
            }
            expect(getFilteredMenuItem(item, 'xyz')).toBeNull()
        })

        it('filters subMenu and keeps parent when sub matches', () => {
            const item: MultiSelectV2ItemType = {
                label: 'Parent',
                value: 'parent',
                subMenu: [
                    { label: 'Child', value: 'child' },
                    { label: 'Other', value: 'other' },
                ],
            }
            const result = getFilteredMenuItem(item, 'child')
            expect(result).not.toBeNull()
            expect(result!.subMenu).toHaveLength(1)
            expect(result!.subMenu![0].value).toBe('child')
        })
    })

    describe('filterMenuGroups', () => {
        it('returns all groups when searchText is empty', () => {
            const groups: MultiSelectV2GroupType[] = [
                { items: [{ label: 'A', value: 'a' }] },
            ]
            expect(filterMenuGroups(groups, '')).toEqual(groups)
        })

        it('filters items by label', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        { label: 'Apple', value: 'apple' },
                        { label: 'Banana', value: 'banana' },
                        { label: 'Cherry', value: 'cherry' },
                    ],
                },
            ]
            const result = filterMenuGroups(groups, 'app')
            expect(result).toHaveLength(1)
            expect(result[0].items).toHaveLength(1)
            expect(result[0].items[0].value).toBe('apple')
        })
    })

    describe('getAllAvailableValues', () => {
        it('collects values from all groups excluding disabled and alwaysSelected', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b', disabled: true },
                        { label: 'C', value: 'c', alwaysSelected: true },
                    ],
                },
            ]
            expect(getAllAvailableValues(groups)).toEqual(['a'])
        })

        it('traverses subMenus', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        {
                            label: 'P',
                            value: 'p',
                            subMenu: [{ label: 'C', value: 'c' }],
                        },
                    ],
                },
            ]
            expect(getAllAvailableValues(groups)).toEqual(['p', 'c'])
        })
    })

    describe('handleSelectAll', () => {
        it('calls onChange for each unselected value when selectAll is true', () => {
            const onChange = vi.fn()
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b' },
                    ],
                },
            ]
            handleSelectAll(true, groups, ['a'], onChange)
            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith('b')
        })

        it('calls onChange for each selected value when selectAll is false', () => {
            const onChange = vi.fn()
            const groups: MultiSelectV2GroupType[] = [
                {
                    items: [
                        { label: 'A', value: 'a' },
                        { label: 'B', value: 'b' },
                    ],
                },
            ]
            handleSelectAll(false, groups, ['a', 'b'], onChange)
            expect(onChange).toHaveBeenCalledWith('a')
            expect(onChange).toHaveBeenCalledWith('b')
        })
    })

    describe('flattenMenuGroups', () => {
        it('produces label, item, separator entries in order', () => {
            const groups: MultiSelectV2GroupType[] = [
                {
                    groupLabel: 'Group A',
                    showSeparator: true,
                    items: [{ label: 'A1', value: 'a1' }],
                },
                {
                    groupLabel: 'Group B',
                    items: [{ label: 'B1', value: 'b1' }],
                },
            ]
            const flat = flattenMenuGroups(groups)
            expect(flat).toHaveLength(5)
            expect(flat[0].type).toBe('label')
            expect(flat[0].label).toBe('Group A')
            expect(flat[1].type).toBe('item')
            expect(flat[1].item?.value).toBe('a1')
            expect(flat[2].type).toBe('separator')
            expect(flat[3].type).toBe('label')
            expect(flat[3].label).toBe('Group B')
            expect(flat[4].type).toBe('item')
            expect(flat[4].item?.value).toBe('b1')
        })
    })

    describe('getMultiSelectBorderRadius', () => {
        it('returns left-only radius when showClearButton and no group position', () => {
            const result = getMultiSelectBorderRadius(
                MultiSelectV2Size.MD,
                MultiSelectV2Variant.CONTAINER,
                undefined,
                tokens,
                true
            )
            expect(result).toMatch(/^[\d.]+(px|rem)\s+0\s+0\s+[\d.]+(px|rem)$/)
        })

        it('returns full radius when no clear button and no group position', () => {
            const result = getMultiSelectBorderRadius(
                MultiSelectV2Size.MD,
                MultiSelectV2Variant.CONTAINER,
                undefined,
                tokens,
                false
            )
            expect(typeof result).toBe('string')
            expect(result.length).toBeGreaterThan(0)
        })
    })

    describe('getMultiSelectCrossBorderRadius', () => {
        it('returns right-only radius when no group position', () => {
            const result = getMultiSelectCrossBorderRadius(
                MultiSelectV2Size.MD,
                MultiSelectV2Variant.CONTAINER,
                undefined,
                tokens
            )
            expect(result).toHaveProperty('borderRadius')
            expect(result).toHaveProperty('borderRight')
        })
    })
})
