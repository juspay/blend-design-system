import React, { useMemo, useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
    SearchConfig,
} from '../../../lib/components/DataTable/types'

type Row = { id: number; name: string }

const columns: ColumnDefinition<Record<string, unknown>>[] = [
    { field: 'name', header: 'Name', type: ColumnType.TEXT, isSortable: false },
]

const DataTableServerSearchHarness = () => {
    // Same length and same first/last ids, but the middle id/name differs.
    const initialData = useMemo<Row[]>(
        () => [
            { id: 1, name: 'Alpha' },
            { id: 2, name: 'Beta' },
            { id: 3, name: 'Gamma' },
        ],
        []
    )
    const searchedData = useMemo<Row[]>(
        () => [
            { id: 1, name: 'Alpha' },
            { id: 99, name: 'Zeta' },
            { id: 3, name: 'Gamma' },
        ],
        []
    )

    const [data, setData] = useState<Row[]>(initialData)

    return (
        <DataTable
            title="Users"
            enableSearch
            serverSideSearch
            idField="id"
            columns={columns as unknown as ColumnDefinition<Row>[]}
            data={data}
            onSearchChange={(cfg: SearchConfig) => {
                setData(cfg.query.trim() ? searchedData : initialData)
            }}
        />
    )
}

describe('DataTable (server-side search)', () => {
    it('updates rendered rows when same-length results swap middle IDs', async () => {
        const { user } = render(<DataTableServerSearchHarness />)

        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('Beta')).toBeInTheDocument()
        expect(screen.getByText('Gamma')).toBeInTheDocument()

        const searchInput = screen.getByPlaceholderText('Search...')
        await user.type(searchInput, 'z')

        await waitFor(() => {
            expect(screen.getByText('Zeta')).toBeInTheDocument()
        })
        expect(screen.queryByText('Beta')).not.toBeInTheDocument()
    })
})
