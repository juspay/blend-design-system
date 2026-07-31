import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, within } from '@testing-library/react'
import { render } from '../../test-utils'
import { MultiSelect } from '../../../lib/components/MultiSelect'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const items = [
    {
        groupLabel: 'Options',
        items: [
            { label: 'Item 1', value: 'item-1' },
            { label: 'Item 2', value: 'item-2' },
        ],
    },
]

// The Select All checkbox has no accessible name of its own, so scope the
// lookup to the row that owns the "Select All" label rather than indexing into
// every checkbox on screen.
const getSelectAllCheckbox = () => {
    const row = screen.getByText('Select All').parentElement
    if (!row) {
        throw new Error('Select All row not found')
    }
    return within(row).getByRole('checkbox')
}

describe('mobile MultiSelect onSelectionChange', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
    })

    it('fires once for a V1 item toggle without a legacy callback', async () => {
        const onSelectionChange = vi.fn()
        render(
            <MultiSelect
                label="Mobile V1"
                placeholder="Choose options"
                items={items}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: /choose options/i }))
        fireEvent.click(await screen.findByText('Item 1'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1'])
    })

    it('fires once for the V1 trigger Clear All gesture', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelect
                label="Mobile clear"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
            />
        )

        fireEvent.click(
            screen.getByRole('button', {
                name: /clear selection for mobile clear/i,
            })
        )

        expect(onChange).toHaveBeenCalledOnce()
        expect(onChange).toHaveBeenCalledWith('')
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    // Virtualized and non-virtualized V1 mobile render SelectAllItem from two
    // separate call sites, so both are exercised.
    it.each([
        ['non-virtualized', false],
        ['virtualized', true],
    ] as const)(
        'fires once for a V1 mobile Select All gesture (%s)',
        async (_, enableVirtualization) => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            render(
                <MultiSelect
                    label="Mobile V1 bulk"
                    placeholder="Choose options"
                    items={items}
                    selectedValues={[]}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    enableVirtualization={enableVirtualization}
                />
            )

            fireEvent.click(
                screen.getByRole('button', { name: /choose options/i })
            )
            fireEvent.click(getSelectAllCheckbox())

            expect(onChange).toHaveBeenCalledTimes(2)
            expect(onSelectionChange).toHaveBeenCalledOnce()
            expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
        }
    )

    it('deselects everything for a V1 mobile Select All toggle-off', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelect
                label="Mobile V1 deselect"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1', 'item-2']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        fireEvent.click(screen.getByRole('button', { name: /choose options/i }))
        fireEvent.click(getSelectAllCheckbox())

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('caps a V1 mobile Select All at maxSelections', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelect
                label="Mobile V1 capped"
                placeholder="Choose options"
                items={items}
                selectedValues={[]}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                maxSelections={1}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: /choose options/i }))
        fireEvent.click(getSelectAllCheckbox())

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1'])
    })

    it('fires once for a V2 mobile item toggle', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelectV2
                label="Mobile V2 item"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
            />
        )

        fireEvent.click(
            screen.getByRole('combobox', { name: /mobile v2 item/i })
        )
        fireEvent.click(await screen.findByText('Item 2'))

        expect(onChange).toHaveBeenCalledOnce()
        expect(onChange).toHaveBeenCalledWith('item-2')
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    })

    // MobileMultiSelectV2 renders SelectItemV2 with asMenuItem={false} since
    // it lives inside a Drawer rather than a Radix Menu.Root, so the item
    // relies on its own onKeyDown handler rather than RadixMenu.Item.
    it.each([['Enter'], [' ']])(
        'toggles a V2 mobile item via keyboard "%s"',
        async (key) => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            render(
                <MultiSelectV2
                    label="Mobile V2 keyboard"
                    placeholder="Choose options"
                    items={items}
                    selectedValues={['item-1']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                />
            )

            fireEvent.click(
                screen.getByRole('combobox', { name: /mobile v2 keyboard/i })
            )
            fireEvent.keyDown(
                await screen.findByRole('option', { name: 'Item 2' }),
                {
                    key,
                }
            )

            expect(onChange).toHaveBeenCalledOnce()
            expect(onChange).toHaveBeenCalledWith('item-2')
            expect(onSelectionChange).toHaveBeenCalledOnce()
            expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
        }
    )

    it('does not emit for a V2 mobile item toggle once maxSelections is reached', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelectV2
                label="Mobile V2 item capped"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                maxSelections={1}
            />
        )

        fireEvent.click(
            screen.getByRole('combobox', { name: /mobile v2 item capped/i })
        )
        fireEvent.click(await screen.findByText('Item 2'))

        expect(onChange).not.toHaveBeenCalled()
        expect(onSelectionChange).not.toHaveBeenCalled()
    })

    it('fires once for a bubbling V2 Select All checkbox gesture', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelectV2
                label="Mobile V2"
                placeholder="Choose options"
                items={items}
                selectedValues={[]}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        fireEvent.click(screen.getByRole('combobox', { name: /mobile v2/i }))
        fireEvent.click(getSelectAllCheckbox())

        // The checkbox handler and the bubbled row handler each emit the legacy
        // per-item callbacks, matching pre-existing V2 mobile behaviour.
        expect(onChange).toHaveBeenCalledTimes(4)
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    })

    it('fires once for a bubbling V2 Select All deselect gesture', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelectV2
                label="Mobile V2 deselect"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1', 'item-2']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        fireEvent.click(
            screen.getByRole('combobox', { name: /mobile v2 deselect/i })
        )
        fireEvent.click(getSelectAllCheckbox())

        // Same bubbling quirk as the select case: the checkbox handler and the
        // bubbled row handler each emit the legacy per-item callbacks.
        expect(onChange).toHaveBeenCalledTimes(4)
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('caps a V2 mobile Select All at maxSelections', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        render(
            <MultiSelectV2
                label="Mobile V2 capped"
                placeholder="Choose options"
                items={items}
                selectedValues={[]}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                maxSelections={1}
            />
        )

        fireEvent.click(
            screen.getByRole('combobox', { name: /mobile v2 capped/i })
        )
        fireEvent.click(getSelectAllCheckbox())

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onSelectionChange).toHaveBeenCalledOnce()
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1'])
    })
})
