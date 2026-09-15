import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
    FilterType,
} from '../../../lib/components/DataTable/types'

vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: () => ({ breakPointLabel: 'sm', innerWidth: 360 }),
}))

vi.mock('@tanstack/react-virtual', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@tanstack/react-virtual')>()

    return {
        ...actual,
        useVirtualizer: ({
            count,
            getItemKey,
        }: {
            count: number
            getItemKey?: (index: number) => string | number
        }) => ({
            getVirtualItems: () =>
                Array.from({ length: count }, (_, index) => ({
                    index,
                    key: getItemKey?.(index) ?? index,
                    start: index * 40,
                })),
            getTotalSize: () => count * 40,
            measureElement: vi.fn(),
        }),
    }
})

type Row = {
    id: number
    status: string
}

const data: Row[] = [
    { id: 1, status: 'active' },
    { id: 2, status: 'inactive' },
]

const createStatusColumn = (
    filterOptions: ColumnDefinition<Row>['filterOptions']
): ColumnDefinition<Row> => ({
    field: 'status',
    header: 'Status',
    type: ColumnType.TEXT,
    filterType: FilterType.MULTISELECT,
    filterOptions,
    isSortable: false,
})

// vaul's Drawer relies on real pointer events (setPointerCapture, etc.) that
// jsdom doesn't implement, so drawer triggers/rows are exercised with
// fireEvent.click rather than userEvent.click.
const openMobileFilterDrawer = async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Filter Status' }))
    fireEvent.click(await screen.findByText('Filter'))
}

const getCheckboxForLabel = async (label: string) => {
    const labelText = await screen.findByText(label)
    const row = labelText.closest('div') as HTMLElement
    return within(row).getByRole('checkbox')
}

describe('DataTable mobile column filtering', () => {
    it('honors filterType to render a multiselect filter in the mobile drawer', async () => {
        const onFilterChange = vi.fn()
        const column = createStatusColumn([
            { id: 'active', label: 'Active', value: 'active' },
            { id: 'inactive', label: 'Inactive', value: 'inactive' },
        ])

        render(
            <DataTable
                data={data}
                columns={[column]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        await openMobileFilterDrawer()

        const activeCheckbox = await getCheckboxForLabel('Active')
        const inactiveCheckbox = await getCheckboxForLabel('Inactive')

        expect(activeCheckbox).toHaveAttribute('aria-checked', 'false')
        expect(inactiveCheckbox).toHaveAttribute('aria-checked', 'false')

        fireEvent.click(activeCheckbox)

        expect(onFilterChange).toHaveBeenCalledWith([
            {
                field: 'status',
                type: FilterType.MULTISELECT,
                value: ['active'],
                operator: 'equals',
            },
        ])
    })

    it('offers Clear Filter in the mobile drawer once a value is selected', async () => {
        const onFilterChange = vi.fn()
        const column = createStatusColumn([
            { id: 'active', label: 'Active', value: 'active' },
        ])

        render(
            <DataTable
                data={data}
                columns={[column]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'Filter Status' }))
        // Nothing selected yet, so there is nothing to clear.
        expect(screen.queryByText('Clear Filter')).not.toBeInTheDocument()

        fireEvent.click(await screen.findByText('Filter'))
        fireEvent.click(await getCheckboxForLabel('Active'))
        onFilterChange.mockClear()

        const clear = await screen.findByText('Clear Filter')
        fireEvent.click(clear)

        expect(onFilterChange).toHaveBeenCalledWith([])
    })

    it('offers no mobile filter affordance when filtering is disabled', async () => {
        render(
            <DataTable
                data={data}
                columns={[
                    createStatusColumn([
                        { id: 'active', label: 'Active', value: 'active' },
                    ]),
                ]}
                idField="id"
            />
        )

        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: 'Filter Status' })
            ).not.toBeInTheDocument()
        })
    })

    it('reflects updated filterOptions in an already-open mobile drawer', async () => {
        const initialColumn = createStatusColumn([
            { id: 'active', label: 'Initially Active', value: 'active' },
        ])
        const updatedColumn = createStatusColumn([
            { id: 'inactive', label: 'Loaded Inactive', value: 'inactive' },
        ])

        const { rerender } = render(
            <DataTable
                data={data}
                columns={[initialColumn]}
                idField="id"
                enableFiltering
            />
        )

        await openMobileFilterDrawer()

        expect(await screen.findByText('Initially Active')).toBeInTheDocument()

        rerender(
            <DataTable
                data={data}
                columns={[updatedColumn]}
                idField="id"
                enableFiltering
            />
        )

        expect(await screen.findByText('Loaded Inactive')).toBeInTheDocument()
        expect(screen.queryByText('Initially Active')).not.toBeInTheDocument()
    })
})
