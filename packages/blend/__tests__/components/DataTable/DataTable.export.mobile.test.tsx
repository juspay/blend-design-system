import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
} from '../../../lib/components/DataTable/types'

vi.mock('../../../lib/hooks/useBreakPoints', () => ({
    useBreakpoints: () => ({ breakPointLabel: 'sm', innerWidth: 360 }),
}))

vi.mock('@tanstack/react-virtual', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@tanstack/react-virtual')>()

    return {
        ...actual,
        useVirtualizer: ({ count }: { count: number }) => ({
            getVirtualItems: () =>
                Array.from({ length: count }, (_, index) => ({
                    index,
                    key: index,
                    start: index * 40,
                })),
            getTotalSize: () => count * 40,
            measureElement: vi.fn(),
        }),
    }
})

type Row = { id: number; name: string }

const columns: ColumnDefinition<Row>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: false,
    },
]

describe('DataTable mobile export', () => {
    it('renders export directly in the mobile toolbar', () => {
        render(
            <DataTable
                data={[{ id: 1, name: 'Ada' }]}
                columns={columns}
                idField="id"
                title="Users"
                exportConfig={{ enabled: true }}
            />
        )

        expect(screen.getByRole('button', { name: 'Export CSV' })).toBeVisible()
        expect(
            screen.queryByRole('button', { name: 'Advanced filters' })
        ).not.toBeInTheDocument()
    })
})
