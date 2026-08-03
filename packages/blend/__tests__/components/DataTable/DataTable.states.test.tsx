import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
} from '../../../lib/components/DataTable/types'
import { getDataTableBodyState } from '../../../lib/components/DataTable/utils'

type Row = { id: number; name: string }

const columns: ColumnDefinition<Row>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: false,
    },
]

const rows: Row[] = [{ id: 1, name: 'Ada' }]

const stateProps = {
    columns,
    idField: 'id' as const,
    showFooter: false,
    showEmptyState: true,
    renderEmptyState: () => <div>Custom empty state</div>,
    renderErrorState: () => <div>Custom error state</div>,
}

describe('getDataTableBodyState', () => {
    it.each([
        {
            isLoading: true,
            error: true,
            hasRows: false,
            expected: 'loading',
        },
        {
            isLoading: true,
            error: true,
            hasRows: true,
            expected: 'rows',
        },
        {
            isLoading: false,
            error: true,
            hasRows: false,
            expected: 'error',
        },
        {
            isLoading: false,
            error: false,
            hasRows: false,
            expected: 'empty',
        },
        {
            isLoading: false,
            error: false,
            hasRows: true,
            expected: 'rows',
        },
    ] as const)(
        'returns $expected for loading=$isLoading, error=$error, rows=$hasRows',
        ({ expected, ...state }) => {
            expect(getDataTableBodyState(state)).toBe(expected)
        }
    )
})

describe('DataTable body states', () => {
    it('applies loading > error > empty > rows precedence', () => {
        const { rerender } = render(
            <DataTable {...stateProps} data={[]} isLoading error />
        )

        expect(screen.getByText('Loading data...')).toBeInTheDocument()
        expect(screen.queryByText('Custom error state')).not.toBeInTheDocument()
        expect(screen.queryByText('Custom empty state')).not.toBeInTheDocument()

        rerender(<DataTable {...stateProps} data={rows} isLoading error />)

        expect(screen.getByText('Loading table data')).toBeInTheDocument()
        expect(screen.queryByText('Custom error state')).not.toBeInTheDocument()
        expect(screen.queryByText('Custom empty state')).not.toBeInTheDocument()
        expect(screen.queryByText('Ada')).not.toBeInTheDocument()

        rerender(<DataTable {...stateProps} data={[]} error />)

        expect(screen.getByText('Custom error state')).toBeInTheDocument()
        expect(screen.queryByText('Custom empty state')).not.toBeInTheDocument()

        rerender(<DataTable {...stateProps} data={rows} error />)

        expect(screen.getByText('Custom error state')).toBeInTheDocument()
        expect(screen.queryByText('Ada')).not.toBeInTheDocument()

        rerender(<DataTable {...stateProps} data={[]} />)

        expect(screen.getByText('Custom empty state')).toBeInTheDocument()

        rerender(<DataTable {...stateProps} data={rows} />)

        expect(screen.getByText('Ada')).toBeInTheDocument()
        expect(screen.queryByText('Custom empty state')).not.toBeInTheDocument()
        expect(screen.queryByText('Custom error state')).not.toBeInTheDocument()
    })

    it('preserves the legacy empty body unless the new state is enabled', () => {
        const { container } = render(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                showFooter={false}
            />
        )

        expect(
            container.querySelector('[data-table-body-state="empty"]')
        ).toHaveTextContent('No data available')
        expect(screen.queryByText('No data')).not.toBeInTheDocument()
    })

    it('renders the default empty state at tableBodyHeight', () => {
        const { container } = render(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                showEmptyState
                showFooter={false}
                tableBodyHeight={240}
            />
        )

        expect(screen.getByText('No data')).toBeInTheDocument()
        expect(
            container.querySelector('[data-table-body-state="empty"]')
        ).toHaveStyle({ height: '240px', minHeight: '240px' })
        expect(
            screen.getByRole('columnheader', { name: 'Name' })
        ).toBeInTheDocument()
    })

    it('keeps the header and footer around an error state', () => {
        const { container } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                error
                tableBodyHeight={240}
                pagination={{ currentPage: 1, pageSize: 10, totalRows: 1 }}
            />
        )

        expect(
            screen.getByRole('columnheader', { name: 'Name' })
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-table-body-state="error"]')
        ).toHaveStyle({ height: '240px', minHeight: '240px' })
        expect(
            screen.getByRole('button', { name: 'Previous page' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Next page' })
        ).toBeInTheDocument()
    })

    it('hides row-scoped controls while stale rows are replaced by an error', async () => {
        const { user, rerender } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableRowSelection
                showFooter={false}
            />
        )

        await user.click(screen.getAllByRole('checkbox')[1])
        expect(
            await screen.findByRole('region', { name: '1 row selected' })
        ).toBeInTheDocument()

        rerender(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableRowSelection
                error
                showFooter={false}
            />
        )

        expect(screen.getByText('Unable to load data')).toBeInTheDocument()
        expect(
            screen.queryByRole('columnheader', { name: 'Select all rows' })
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole('region', { name: '1 row selected' })
        ).not.toBeInTheDocument()
    })

    it('passes onRetry to custom errors and wires the default Retry button', async () => {
        const retry = vi.fn()
        const customError = vi.fn((retryCallback?: () => void) => (
            <button onClick={retryCallback}>Custom retry</button>
        ))
        const { container, user, rerender } = render(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                error
                onRetry={retry}
                renderErrorState={customError}
                showFooter={false}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Custom retry' }))
        expect(customError).toHaveBeenCalledWith(retry)
        expect(retry).toHaveBeenCalledTimes(1)

        rerender(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                error
                onRetry={retry}
                showFooter={false}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Retry' }))
        expect(retry).toHaveBeenCalledTimes(2)
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(container.querySelector('[id$="-status"]')).toHaveTextContent(
            'Failed to load table data'
        )
    })
})

describe('DataTable body states Accessibility', () => {
    it('hides decorative icons and exposes Retry by its accessible name', () => {
        const { container, rerender } = render(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                showEmptyState
                showFooter={false}
            />
        )

        expect(container.querySelector('.lucide-inbox')).toHaveAttribute(
            'aria-hidden',
            'true'
        )

        rerender(
            <DataTable
                data={[]}
                columns={columns}
                idField="id"
                error
                onRetry={() => undefined}
                showFooter={false}
            />
        )

        expect(container.querySelector('.lucide-circle-alert')).toHaveAttribute(
            'aria-hidden',
            'true'
        )
        expect(screen.getByRole('button', { name: 'Retry' })).toBeEnabled()
    })
})
