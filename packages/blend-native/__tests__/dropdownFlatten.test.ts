import { describe, it, expect } from 'vitest'
import { flattenGroups } from '../src/components/shared/dropdown/dropdownFlatten'
import type { DropdownItemAdapter } from '../src/components/shared/dropdown/dropdown.types'

type TestItem = { value: string }

const makeAdapter = (
    id: string,
    primaryText: string
): DropdownItemAdapter<TestItem> => ({
    id,
    primaryText,
    item: { value: id },
})

describe('flattenGroups', () => {
    it('flattens items into rows', () => {
        const groups = [
            {
                items: [makeAdapter('a', 'Apple'), makeAdapter('b', 'Banana')],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows).toHaveLength(2)
        expect(rows[0].type).toBe('item')
        expect(rows[0].item?.primaryText).toBe('Apple')
    })

    it('emits label rows for group labels', () => {
        const groups = [
            {
                label: 'Fruits',
                items: [makeAdapter('a', 'Apple')],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows).toHaveLength(2)
        expect(rows[0].type).toBe('label')
        expect(rows[0].label).toBe('Fruits')
        expect(rows[1].type).toBe('item')
    })

    it('does not emit a separator after the last group', () => {
        const groups = [
            {
                items: [makeAdapter('a', 'Apple')],
            },
            {
                items: [makeAdapter('b', 'Banana')],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows).toHaveLength(2)
        expect(rows.every((r) => r.type !== 'separator')).toBe(true)
    })

    it('emits separator rows between groups with showSeparator', () => {
        const groups = [
            {
                items: [makeAdapter('a', 'Apple')],
                showSeparator: true,
            },
            {
                items: [makeAdapter('b', 'Banana')],
                showSeparator: true,
            },
            {
                items: [makeAdapter('c', 'Carrot')],
            },
        ]
        const rows = flattenGroups(groups)
        // group0 item, separator, group1 item, separator, group2 item = 5
        expect(rows).toHaveLength(5)
        expect(rows[1].type).toBe('separator')
        expect(rows[3].type).toBe('separator')
    })

    it('does not emit separator when showSeparator is false/undefined', () => {
        const groups = [
            {
                items: [makeAdapter('a', 'Apple')],
                showSeparator: false,
            },
            {
                items: [makeAdapter('b', 'Banana')],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows).toHaveLength(2)
        expect(rows.every((r) => r.type !== 'separator')).toBe(true)
    })

    it('preserves groupId on rows', () => {
        const groups = [
            {
                items: [makeAdapter('a', 'Apple')],
            },
            {
                items: [makeAdapter('b', 'Banana')],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows[0].groupId).toBe(0)
        expect(rows[1].groupId).toBe(1)
    })

    it('handles empty groups', () => {
        const rows = flattenGroups([])
        expect(rows).toHaveLength(0)
    })

    it('uses item.id when present, generates when absent', () => {
        const groups = [
            {
                items: [
                    makeAdapter('custom-id', 'Apple'),
                    { ...makeAdapter('', 'Banana'), id: '' },
                ],
            },
        ]
        const rows = flattenGroups(groups)
        expect(rows[0].id).toBe('custom-id')
        expect(rows[1].id).toBe('item-0')
    })
})
