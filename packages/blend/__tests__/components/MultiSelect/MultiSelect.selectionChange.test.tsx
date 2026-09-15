import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { MultiSelect } from '../../../lib/components/MultiSelect'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const createItems = (count: number) => [
    {
        groupLabel: 'Options',
        items: Array.from({ length: count }, (_, index) => ({
            label: `Item ${index + 1}`,
            value: `item-${index + 1}`,
        })),
    },
]

describe.each([
    ['MultiSelect', MultiSelect],
    ['MultiSelectV2', MultiSelectV2],
] as const)('%s onSelectionChange', (_, Component) => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'lg',
            innerWidth: 1280,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
    })

    it('fires once with the complete selection for an individual toggle', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Individual selection"
                placeholder="Choose an option"
                items={createItems(2)}
                selectedValues={['item-1']}
                onSelectionChange={onSelectionChange}
            />
        )

        await user.click(screen.getByLabelText('Individual selection'))
        await user.click(await screen.findByText('Item 2'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    })

    it('fires once with 100 values for Select All while preserving legacy calls', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        const items = createItems(100)
        const { user } = render(
            <Component
                label="Bulk selection"
                placeholder="Choose options"
                items={items}
                selectedValues={[]}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        await user.click(screen.getByLabelText('Bulk selection'))
        await user.click(await screen.findByText('Select All'))

        expect(onChange).toHaveBeenCalledTimes(100)
        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(
            items[0].items.map((item) => item.value)
        )
    })

    it('fires once with an empty selection for Clear All', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Clear selection"
                placeholder="Choose options"
                items={createItems(2)}
                selectedValues={['item-1']}
                onSelectionChange={onSelectionChange}
            />
        )

        await user.click(
            screen.getByRole('button', {
                name: /clear selection for clear selection/i,
            })
        )

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    // onClearAllClick replaces the default clear, so the component cleared
    // nothing and must not announce an empty selection the consumer never made.
    it('defers entirely to onClearAllClick without emitting a snapshot', async () => {
        const onChange = vi.fn()
        const onClearAllClick = vi.fn()
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Custom clear"
                placeholder="Choose options"
                items={createItems(2)}
                selectedValues={['item-1']}
                onChange={onChange}
                onClearAllClick={onClearAllClick}
                onSelectionChange={onSelectionChange}
            />
        )

        await user.click(
            screen.getByRole('button', {
                name: /clear selection for custom clear/i,
            })
        )

        expect(onClearAllClick).toHaveBeenCalledTimes(1)
        expect(onChange).not.toHaveBeenCalled()
        expect(onSelectionChange).not.toHaveBeenCalled()
    })

    it('caps Select All at maxSelections for both callbacks', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Capped selection"
                placeholder="Choose options"
                items={createItems(5)}
                selectedValues={[]}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                maxSelections={2}
            />
        )

        await user.click(screen.getByLabelText('Capped selection'))
        await user.click(await screen.findByText('Select All'))

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    })

    // Consumers migrating fully to onSelectionChange may drop the legacy
    // onChange callback entirely; the bulk gesture must still clamp and emit
    // the aggregate snapshot without it.
    it('caps Select All at maxSelections without a legacy onChange callback', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Capped selection no legacy"
                placeholder="Choose options"
                items={createItems(5)}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                maxSelections={2}
            />
        )

        await user.click(screen.getByLabelText('Capped selection no legacy'))
        await user.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    })

    it('deselects everything when Select All is toggled off', async () => {
        const onChange = vi.fn()
        const onSelectionChange = vi.fn()
        const items = createItems(2)
        const { user } = render(
            <Component
                label="Bulk deselection"
                placeholder="Choose options"
                items={items}
                selectedValues={['item-1', 'item-2']}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        await user.click(screen.getByLabelText('Bulk deselection'))
        await user.click(await screen.findByText('Select All'))

        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('excludes disabled and alwaysSelected items from Select All', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Excluded items"
                placeholder="Choose options"
                items={[
                    {
                        groupLabel: 'Options',
                        items: [
                            { label: 'Item 1', value: 'item-1' },
                            {
                                label: 'Item 2',
                                value: 'item-2',
                                disabled: true,
                            },
                            {
                                label: 'Item 3',
                                value: 'item-3',
                                alwaysSelected: true,
                            },
                        ],
                    },
                ]}
                selectedValues={['item-3']}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        await user.click(screen.getByLabelText('Excluded items'))
        await user.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-3', 'item-1'])
    })

    it('preserves disabled and alwaysSelected items when Select All is toggled off', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Excluded deselect"
                placeholder="Choose options"
                items={[
                    {
                        groupLabel: 'Options',
                        items: [
                            { label: 'Item 1', value: 'item-1' },
                            {
                                label: 'Item 2',
                                value: 'item-2',
                                disabled: true,
                            },
                            {
                                label: 'Item 3',
                                value: 'item-3',
                                alwaysSelected: true,
                            },
                        ],
                    },
                ]}
                selectedValues={['item-1', 'item-2', 'item-3']}
                onSelectionChange={onSelectionChange}
                enableSelectAll
            />
        )

        await user.click(screen.getByLabelText('Excluded deselect'))
        await user.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['item-2', 'item-3'])
    })

    it('does not emit for a disabled item gesture', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Disabled item"
                placeholder="Choose options"
                items={[
                    {
                        groupLabel: 'Options',
                        items: [
                            { label: 'Item 1', value: 'item-1' },
                            {
                                label: 'Item 2',
                                value: 'item-2',
                                disabled: true,
                            },
                        ],
                    },
                ]}
                selectedValues={[]}
                onSelectionChange={onSelectionChange}
            />
        )

        await user.click(screen.getByLabelText('Disabled item'))
        await user.click(await screen.findByText('Item 2'))

        expect(onSelectionChange).not.toHaveBeenCalled()
    })

    it('scopes a filtered Select All to the visible items only', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Filtered bulk"
                placeholder="Choose options"
                items={[
                    {
                        groupLabel: 'Options',
                        items: [
                            { label: 'Apple', value: 'apple' },
                            { label: 'Apricot', value: 'apricot' },
                            { label: 'Banana', value: 'banana' },
                        ],
                    },
                ]}
                selectedValues={['banana']}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                enableSearch
                search={{ show: true }}
            />
        )

        await user.click(screen.getByLabelText('Filtered bulk'))
        await user.type(
            await screen.findByPlaceholderText('Search options...'),
            'ap'
        )
        await user.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith([
            'banana',
            'apple',
            'apricot',
        ])
    })

    it('preserves values outside the active filter when Select All is toggled off', async () => {
        const onSelectionChange = vi.fn()
        const { user } = render(
            <Component
                label="Filtered bulk deselect"
                placeholder="Choose options"
                items={[
                    {
                        groupLabel: 'Options',
                        items: [
                            { label: 'Apple', value: 'apple' },
                            { label: 'Apricot', value: 'apricot' },
                            { label: 'Banana', value: 'banana' },
                        ],
                    },
                ]}
                selectedValues={['apple', 'apricot', 'banana']}
                onSelectionChange={onSelectionChange}
                enableSelectAll
                enableSearch
                search={{ show: true }}
            />
        )

        await user.click(screen.getByLabelText('Filtered bulk deselect'))
        await user.type(
            await screen.findByPlaceholderText('Search options...'),
            'ap'
        )
        await user.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledTimes(1)
        expect(onSelectionChange).toHaveBeenCalledWith(['banana'])
    })
})
