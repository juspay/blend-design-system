import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    SelectV2Variant,
    SelectV2Size,
    MultiSelectV2SelectionTagType,
    getMultiSelectV2Tokens,
    type MultiSelectV2TokensType,
    type MultiSelectV2ItemType,
    type MultiSelectV2GroupType,
    getNextSelectionAfterToggle,
    isBlockedByMaxSelections,
    clampScopeToMaxSelections,
} from '@juspay/blend-design-system/node'
import {
    multiSelectItemAdapter,
    getValueLabelMap,
    getSelectAllState,
    getAllAvailableValues,
    handleSelectAll,
    getFilteredMenuItem,
    filterMultiSelectV2MenuGroups,
    flattenMenuGroups,
    getSelectionTagText,
    getTriggerState,
    getMultiSelectContentTokens,
    getMultiSelectItemTokens,
    flattenMultiSelectGroups,
} from '../src/components/MultiSelect/multiSelect.utils'

const tokens = getMultiSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as MultiSelectV2TokensType

describe('multiSelectItemAdapter', () => {
    const item: MultiSelectV2ItemType = {
        label: 'Apple',
        value: 'apple',
        subLabel: 'A fruit',
    }

    it('maps label to primaryText', () => {
        expect(multiSelectItemAdapter(item, 0, []).primaryText).toBe('Apple')
    })

    it('isSelected is true when value is in selectedValues', () => {
        expect(
            multiSelectItemAdapter(item, 0, ['apple', 'banana']).isSelected
        ).toBe(true)
    })

    it('isSelected is false when value is not in selectedValues', () => {
        expect(multiSelectItemAdapter(item, 0, ['banana']).isSelected).toBe(
            false
        )
    })

    it('detects hasSubMenu', () => {
        const itemWithSub = {
            ...item,
            subMenu: [{ label: 'Child', value: 'child' }],
        } as MultiSelectV2ItemType
        expect(multiSelectItemAdapter(itemWithSub, 0, []).hasSubMenu).toBe(true)
    })
})

describe('getValueLabelMap', () => {
    it('builds a value→label map traversing sub-menus', () => {
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
        const map = getValueLabelMap(groups)
        expect(map['parent']).toBe('Parent')
        expect(map['child']).toBe('Child')
    })
})

describe('getSelectAllState', () => {
    it('allSelected is true when all available values are selected', () => {
        const result = getSelectAllState(['a', 'b'], ['a', 'b'])
        expect(result.allSelected).toBe(true)
    })

    it('allSelected is false when not all are selected', () => {
        const result = getSelectAllState(['a'], ['a', 'b'])
        expect(result.allSelected).toBe(false)
    })

    it('allSelected is false when available is empty', () => {
        const result = getSelectAllState(['a'], [])
        expect(result.allSelected).toBe(false)
    })

    it('someSelected is true when any available value is selected', () => {
        const result = getSelectAllState(['a', 'c'], ['a', 'b'])
        expect(result.someSelected).toBe(true)
    })

    it('someSelected is false when none are selected', () => {
        const result = getSelectAllState(['c'], ['a', 'b'])
        expect(result.someSelected).toBe(false)
    })
})

describe('getAllAvailableValues', () => {
    it('collects non-disabled, non-alwaysSelected values', () => {
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

    it('traverses sub-menus', () => {
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
        expect(getAllAvailableValues(groups)).toEqual(['parent', 'child'])
    })
})

describe('handleSelectAll', () => {
    const groups: MultiSelectV2GroupType[] = [
        {
            items: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
            ],
        },
    ]

    it('selects all available values', () => {
        const changes: string[] = []
        const result = handleSelectAll(true, groups, [], (v) => changes.push(v))
        expect(result.sort()).toEqual(['a', 'b', 'c'])
        expect(changes.sort()).toEqual(['a', 'b', 'c'])
    })

    it('deselects all available values', () => {
        const changes: string[] = []
        const result = handleSelectAll(false, groups, ['a', 'b', 'c'], (v) =>
            changes.push(v)
        )
        expect(result).toEqual([])
        expect(changes.sort()).toEqual(['a', 'b', 'c'])
    })

    it('clamps to maxSelections on select', () => {
        const result = handleSelectAll(true, groups, [], undefined, 2)
        expect(result).toHaveLength(2)
    })
})

describe('maxSelections clamping (from shared selection math)', () => {
    it('isBlockedByMaxSelections blocks adding beyond cap', () => {
        expect(isBlockedByMaxSelections(['a', 'b'], 'c', 2)).toBe(true)
    })

    it('isBlockedByMaxSelections does not block deselecting', () => {
        expect(isBlockedByMaxSelections(['a', 'b'], 'a', 2)).toBe(false)
    })

    it('isBlockedByMaxSelections returns false when no cap', () => {
        expect(isBlockedByMaxSelections(['a'], 'b')).toBe(false)
    })

    it('clampScopeToMaxSelections narrows scope to capacity', () => {
        const result = clampScopeToMaxSelections(['a'], ['b', 'c', 'd'], 2)
        // capacity = 2 - 1 = 1, so only 1 more can be added
        expect(result).toEqual(['b'])
    })
})

describe('getNextSelectionAfterToggle', () => {
    it('adds a value not in the selection', () => {
        expect(getNextSelectionAfterToggle(['a'], 'b')).toEqual(['a', 'b'])
    })

    it('removes a value already in the selection', () => {
        expect(getNextSelectionAfterToggle(['a', 'b'], 'a')).toEqual(['b'])
    })
})

describe('getFilteredMenuItem', () => {
    it('matches on label', () => {
        const item = { label: 'Apple', value: 'apple' } as MultiSelectV2ItemType
        expect(getFilteredMenuItem(item, 'apple')).not.toBeNull()
    })

    it('matches on subLabel', () => {
        const item = {
            label: 'Apple',
            value: 'apple',
            subLabel: 'A fruit',
        } as MultiSelectV2ItemType
        expect(getFilteredMenuItem(item, 'fruit')).not.toBeNull()
    })

    it('returns null when no match', () => {
        const item = { label: 'Apple', value: 'apple' } as MultiSelectV2ItemType
        expect(getFilteredMenuItem(item, 'banana')).toBeNull()
    })

    it('preserves sub-menu children that match', () => {
        const item = {
            label: 'Parent',
            value: 'parent',
            subMenu: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
            ],
        } as MultiSelectV2ItemType
        const result = getFilteredMenuItem(item, 'apple')
        expect(result).not.toBeNull()
        expect(result!.subMenu).toHaveLength(1)
    })
})

describe('filterMultiSelectV2MenuGroups', () => {
    const groups: MultiSelectV2GroupType[] = [
        {
            groupLabel: 'Fruits',
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
            ],
        },
    ]

    it('returns all groups when search is empty', () => {
        expect(filterMultiSelectV2MenuGroups(groups, '')).toHaveLength(1)
    })

    it('filters items within groups', () => {
        const result = filterMultiSelectV2MenuGroups(groups, 'apple')
        expect(result).toHaveLength(1)
        expect(result[0].items).toHaveLength(1)
    })

    it('drops groups with no surviving items', () => {
        const result = filterMultiSelectV2MenuGroups(groups, 'carrot')
        expect(result).toHaveLength(0)
    })
})

describe('flattenMenuGroups', () => {
    it('adapts groups into adapter-backed groups', () => {
        const groups: MultiSelectV2GroupType[] = [
            {
                groupLabel: 'Fruits',
                items: [
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana' },
                ],
                showSeparator: true,
            },
        ]
        const result = flattenMenuGroups(groups)
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Fruits')
        expect(result[0].items).toHaveLength(2)
    })
})

describe('getSelectionTagText', () => {
    it('returns null when no selection', () => {
        expect(
            getSelectionTagText(MultiSelectV2SelectionTagType.COUNT, [], {})
        ).toBeNull()
    })

    it('returns count for COUNT type', () => {
        expect(
            getSelectionTagText(
                MultiSelectV2SelectionTagType.COUNT,
                ['a', 'b'],
                { a: 'Apple', b: 'Banana' }
            )
        ).toBe('2')
    })

    it('returns comma-separated labels for TEXT type', () => {
        expect(
            getSelectionTagText(
                MultiSelectV2SelectionTagType.TEXT,
                ['a', 'b'],
                { a: 'Apple', b: 'Banana' }
            )
        ).toBe('Apple, Banana')
    })
})

describe('getTriggerState', () => {
    it('returns "open" when open', () => {
        expect(getTriggerState(true, false, false)).toBe('open')
    })

    it('returns "error" when has error', () => {
        expect(getTriggerState(false, false, true)).toBe('error')
    })

    it('returns "closed" when disabled', () => {
        expect(getTriggerState(true, true, false)).toBe('closed')
    })
})

describe('token mappers', () => {
    it('getMultiSelectContentTokens maps content-level tokens', () => {
        const t = getMultiSelectContentTokens(
            tokens,
            SelectV2Size.MD,
            SelectV2Variant.CONTAINER
        )
        expect(t.backgroundColor).toBeDefined()
        expect(t.borderRadius).toBeDefined()
    })

    it('getMultiSelectItemTokens returns state-keyed tokens', () => {
        const t = getMultiSelectItemTokens(tokens)
        expect(t.backgroundColor.default).toBeDefined()
        expect(t.backgroundColor.selected).toBeDefined()
        expect(t.text.color.default).toBeDefined()
    })
})

describe('flattenMultiSelectGroups', () => {
    it('adapts groups with selected state', () => {
        const groups: MultiSelectV2GroupType[] = [
            {
                groupLabel: 'Fruits',
                items: [
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana' },
                ],
            },
        ]
        const result = flattenMultiSelectGroups(groups, ['apple'])
        expect(result[0].items[0].isSelected).toBe(true)
        expect(result[0].items[1].isSelected).toBe(false)
    })
})
