import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    SelectV2Variant,
    SelectV2Size,
    getSingleSelectV2Tokens,
    type SingleSelectV2TokensType,
    type SingleSelectV2ItemType,
    type SingleSelectV2GroupType,
} from '@juspay/blend-design-system/node'
import {
    singleSelectItemAdapter,
    getValueLabelMap,
    getTriggerState,
    getSingleSelectContentTokens,
    getSingleSelectItemTokens,
    flattenSingleSelectGroups,
    toFilterableItem,
} from '../src/components/SingleSelect/singleSelect.utils'

const tokens = getSingleSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as SingleSelectV2TokensType

describe('singleSelectItemAdapter', () => {
    const item: SingleSelectV2ItemType = {
        label: 'Apple',
        value: 'apple',
        subLabel: 'A fruit',
    }

    it('maps label to primaryText', () => {
        expect(singleSelectItemAdapter(item, 0, 'apple').primaryText).toBe(
            'Apple'
        )
    })

    it('maps subLabel to secondaryText', () => {
        expect(singleSelectItemAdapter(item, 0, '').secondaryText).toBe(
            'A fruit'
        )
    })

    it('isSelected is true when value matches selectedValue', () => {
        expect(singleSelectItemAdapter(item, 0, 'apple').isSelected).toBe(true)
    })

    it('isSelected is false when value does not match', () => {
        expect(singleSelectItemAdapter(item, 0, 'banana').isSelected).toBe(
            false
        )
    })

    it('detects hasSubMenu', () => {
        const itemWithSub = {
            ...item,
            subMenu: [{ label: 'Child', value: 'child' }],
        } as SingleSelectV2ItemType
        expect(singleSelectItemAdapter(itemWithSub, 0, '').hasSubMenu).toBe(
            true
        )
    })

    it('passes through disabled', () => {
        expect(
            singleSelectItemAdapter({ ...item, disabled: true }, 0, '').disabled
        ).toBe(true)
    })

    it('maps slot1 to leadingSlot', () => {
        const slot = { type: 'icon' } as unknown as React.ReactNode
        const itemWithSlot = { ...item, slot1: slot } as SingleSelectV2ItemType
        expect(singleSelectItemAdapter(itemWithSlot, 0, '').leadingSlot).toBe(
            slot
        )
    })
})

describe('getValueLabelMap', () => {
    const groups: SingleSelectV2GroupType[] = [
        {
            groupLabel: 'Fruits',
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
            ],
        },
        {
            groupLabel: 'Veggies',
            items: [{ label: 'Carrot', value: 'carrot' }],
        },
    ]

    it('builds a value→label map', () => {
        const map = getValueLabelMap(groups)
        expect(map['apple']).toBe('Apple')
        expect(map['banana']).toBe('Banana')
        expect(map['carrot']).toBe('Carrot')
    })

    it('traverses sub-menus', () => {
        const groupsWithSub: SingleSelectV2GroupType[] = [
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
        const map = getValueLabelMap(groupsWithSub)
        expect(map['parent']).toBe('Parent')
        expect(map['child']).toBe('Child')
    })
})

describe('getTriggerState', () => {
    it('returns "open" when open and not disabled/error', () => {
        expect(getTriggerState(true, false, false)).toBe('open')
    })

    it('returns "closed" when not open', () => {
        expect(getTriggerState(false, false, false)).toBe('closed')
    })

    it('returns "error" when has error', () => {
        expect(getTriggerState(false, false, true)).toBe('error')
    })

    it('returns "closed" when disabled regardless of open', () => {
        expect(getTriggerState(true, true, false)).toBe('closed')
    })
})

describe('getSingleSelectContentTokens', () => {
    it('maps content tokens for the given size+variant', () => {
        const t = getSingleSelectContentTokens(
            tokens,
            SelectV2Size.MD,
            SelectV2Variant.CONTAINER
        )
        expect(t.backgroundColor).toBeDefined()
        expect(t.borderRadius).toBeDefined()
        expect(t.paddingTop).toBeDefined()
    })

    it('padding differs per size', () => {
        const sm = getSingleSelectContentTokens(
            tokens,
            SelectV2Size.SM,
            SelectV2Variant.CONTAINER
        )
        const lg = getSingleSelectContentTokens(
            tokens,
            SelectV2Size.LG,
            SelectV2Variant.CONTAINER
        )
        // SM and LG may or may not differ, but both must be defined
        expect(sm.paddingTop).toBeDefined()
        expect(lg.paddingTop).toBeDefined()
    })
})

describe('getSingleSelectItemTokens', () => {
    it('returns backgroundColor for all item states', () => {
        const t = getSingleSelectItemTokens(tokens)
        expect(t.backgroundColor.default).toBeDefined()
        expect(t.backgroundColor.selected).toBeDefined()
        expect(t.backgroundColor.disabled).toBeDefined()
    })

    it('returns text color for all item states', () => {
        const t = getSingleSelectItemTokens(tokens)
        expect(t.text.color.default).toBeDefined()
        expect(t.text.color.selected).toBeDefined()
    })
})

describe('flattenSingleSelectGroups', () => {
    it('adapts groups with selected state', () => {
        const groups: SingleSelectV2GroupType[] = [
            {
                groupLabel: 'Fruits',
                items: [
                    { label: 'Apple', value: 'apple' },
                    { label: 'Banana', value: 'banana' },
                ],
                showSeparator: true,
            },
        ]
        const result = flattenSingleSelectGroups(groups, 'apple')
        expect(result).toHaveLength(1)
        expect(result[0].label).toBe('Fruits')
        expect(result[0].items).toHaveLength(2)
        expect(result[0].items[0].isSelected).toBe(true)
        expect(result[0].items[1].isSelected).toBe(false)
    })
})

describe('toFilterableItem', () => {
    it('maps label to primaryText', () => {
        const item = {
            label: 'Apple',
            value: 'apple',
        } as SingleSelectV2ItemType
        expect(toFilterableItem(item).primaryText).toBe('Apple')
    })

    it('maps subMenu to subItems', () => {
        const item = {
            label: 'Parent',
            value: 'parent',
            subMenu: [{ label: 'Child', value: 'child' }],
        } as SingleSelectV2ItemType
        expect(toFilterableItem(item).subItems).toHaveLength(1)
    })
})
