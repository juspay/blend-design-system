import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
} from '../../../lib/components/DataTable/types'
import {
    DataTableExportError,
    formatDateString,
    generateDataTableCSV,
} from '../../../lib/components/DataTable/utils'

type Row = { id: number; name: string; joined: Date }

const columns: ColumnDefinition<Row>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: false,
    },
    {
        field: 'joined',
        header: 'Joined',
        type: ColumnType.DATE,
        isSortable: false,
    },
] as ColumnDefinition<Row>[]

// Mid-month, mid-day: no timezone can move it to another month or day period.
const rows: Row[] = [{ id: 1, name: 'Ada', joined: new Date(2025, 5, 15, 12) }]

const tableProps = {
    columns,
    data: rows,
    idField: 'id' as const,
    pagination: { currentPage: 1, pageSize: 10, totalRows: 1 },
}

const FRENCH: Record<string, string> = {
    'data-table.label.rows': 'Lignes',
    'data-table.label.range': '{start} à {end} sur {total}',
    'data-table.a11y.pagination': 'Pagination du tableau',
    'data-table.a11y.table': 'Tableau de données',
    'data-table.placeholder.search-table': 'Rechercher...',
}
const t = (key: string) => FRENCH[key]

describe('DataTable localization', () => {
    it('renders byte-identical English with no provider configuration', () => {
        render(<DataTable {...tableProps} />)

        // jsdom has no layout, so the footer takes its narrow form ("Rows").
        const pagination = screen.getByRole('navigation', {
            name: 'Pagination',
        })
        expect(pagination).toHaveTextContent('Rows')
        expect(pagination).toHaveTextContent('1-1 of 1')
        expect(
            screen.getByRole('grid', { name: 'Data table' })
        ).toBeInTheDocument()
    })

    it('resolves visible text and accessible names through the translator', () => {
        render(<DataTable {...tableProps} />, {
            providerProps: { locale: 'fr-FR', t },
        })

        const pagination = screen.getByRole('navigation', {
            name: 'Pagination du tableau',
        })
        expect(pagination).toHaveTextContent('Lignes')
        expect(pagination).toHaveTextContent('1 à 1 sur 1')
        expect(
            screen.getByRole('grid', { name: 'Tableau de données' })
        ).toBeInTheDocument()
        expect(pagination).not.toHaveTextContent('Rows')
    })

    it('lets an explicit title beat the translated accessible name', () => {
        render(<DataTable {...tableProps} title="Users" />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(screen.getByRole('grid', { name: 'Users' })).toBeInTheDocument()
    })

    it('localizes the date column month but keeps data-date in en-US', () => {
        // `data-*` cell attributes are only emitted for a titled table.
        const { container } = render(<DataTable {...tableProps} title="T" />, {
            providerProps: { locale: 'fr-FR', t },
        })

        expect(screen.getByText(/juin/i)).toBeInTheDocument()

        // A DOM identifier consumers select on: locale-stable by design.
        const dated = container.querySelector('[data-date]')
        expect(dated?.getAttribute('data-date')).toMatch(/^Jun 15, 2025/)
    })
})

describe('formatDateString', () => {
    const date = new Date(2025, 0, 15, 15, 5, 9)

    it('keeps its historical English output when called without options', () => {
        expect(formatDateString(date, 'DD MMM YYYY, hh:mm A')).toBe(
            '15 Jan 2025, 03:05 PM'
        )
        expect(formatDateString(date, 'hh a')).toBe('03 pm')
    })

    it('localizes only the month name and day-period markers', () => {
        const out = formatDateString(date, 'DD MMM YYYY, HH:mm A', {
            locale: 'fr-FR',
            am: 'matin',
            pm: 'soir',
        })

        expect(out).toMatch(/^15 janv\.? 2025, 15:05 soir$/)
    })
})

describe('DataTable export errors', () => {
    it('throw a coded error whose message stays English', async () => {
        const error = await generateDataTableCSV([], columns).catch(
            (e: unknown) => e
        )

        expect(error).toBeInstanceOf(DataTableExportError)
        expect((error as DataTableExportError).code).toBe('no-data')
        expect((error as Error).message).toBe('No data available for export')
    })
})
