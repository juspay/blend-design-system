import { describe, it, expect } from 'vitest'
import React from 'react'
import {
    getVirtualRowEstimate,
    getMenuItemIndex,
    getItemOrdinalIndex,
    isTooltipWrappingTrigger,
    VIRTUAL_ROW_ESTIMATES,
} from '../../../lib/components/SingleSelectV2/utils'
import type { FlattenedItem } from '../../../lib/components/SingleSelectV2/SingleSelectV2.types'
import type { SingleSelectV2GroupType } from '../../../lib/components/SingleSelectV2/SingleSelectV2.types'

describe('SingleSelectV2 utils', () => {
    it('getVirtualRowEstimate returns label height for label type', () => {
        const flat: FlattenedItem[] = [{ id: '1', type: 'label', label: 'A' }]
        expect(getVirtualRowEstimate(flat, 0)).toBe(VIRTUAL_ROW_ESTIMATES.label)
    })

    it('getVirtualRowEstimate returns separator height for separator type', () => {
        const flat: FlattenedItem[] = [{ id: '1', type: 'separator' }]
        expect(getVirtualRowEstimate(flat, 0)).toBe(
            VIRTUAL_ROW_ESTIMATES.separator
        )
    })

    it('getVirtualRowEstimate returns itemWithSubLabel when item has subLabel', () => {
        const flat: FlattenedItem[] = [
            {
                id: '1',
                type: 'item',
                item: { label: 'X', value: 'x', subLabel: 'Y' },
            },
        ]
        expect(getVirtualRowEstimate(flat, 0)).toBe(
            VIRTUAL_ROW_ESTIMATES.itemWithSubLabel
        )
    })

    it('getVirtualRowEstimate returns default item for out-of-range index', () => {
        const flat: FlattenedItem[] = [
            { id: '1', type: 'item', item: { label: 'A', value: 'a' } },
        ]
        expect(getVirtualRowEstimate(flat, -1)).toBe(VIRTUAL_ROW_ESTIMATES.item)
        expect(getVirtualRowEstimate(flat, 5)).toBe(VIRTUAL_ROW_ESTIMATES.item)
    })

    it('getMenuItemIndex returns correct ordinal for multi-group list', () => {
        const groups: SingleSelectV2GroupType[] = [
            {
                items: [
                    { label: 'A1', value: 'a1' },
                    { label: 'A2', value: 'a2' },
                ],
            },
            { items: [{ label: 'B1', value: 'b1' }] },
        ]
        expect(getMenuItemIndex(groups, 0, 0)).toBe(0)
        expect(getMenuItemIndex(groups, 0, 1)).toBe(1)
        expect(getMenuItemIndex(groups, 1, 0)).toBe(2)
    })

    it('getItemOrdinalIndex counts item rows before flatIndex', () => {
        const flat: FlattenedItem[] = [
            { id: '1', type: 'label', label: 'X' },
            { id: '2', type: 'item', item: { label: 'A', value: 'a' } },
            { id: '3', type: 'separator' },
            { id: '4', type: 'item', item: { label: 'B', value: 'b' } },
        ]
        expect(getItemOrdinalIndex(flat, 0)).toBe(0)
        expect(getItemOrdinalIndex(flat, 1)).toBe(0)
        expect(getItemOrdinalIndex(flat, 2)).toBe(1)
        expect(getItemOrdinalIndex(flat, 4)).toBe(2)
    })

    it('isTooltipWrappingTrigger returns true for element with content and children props', () => {
        const tooltipLike = React.createElement('div', {
            content: 'tip',
            children: React.createElement('button'),
        })
        expect(isTooltipWrappingTrigger(tooltipLike)).toBe(true)
    })

    it('isTooltipWrappingTrigger returns false for plain element or non-element', () => {
        expect(isTooltipWrappingTrigger(React.createElement('button'))).toBe(
            false
        )
        expect(isTooltipWrappingTrigger(null)).toBe(false)
        expect(isTooltipWrappingTrigger('string')).toBe(false)
    })
})
