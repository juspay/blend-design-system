import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
    FilterType,
    SortDirection,
} from '../../../lib/components/DataTable/types'
import {
    downloadDataTableExport,
    generateDataTableCSV,
} from '../../../lib/components/DataTable/utils'

const renderToStaticMarkupSpy = vi.hoisted(() => vi.fn())

vi.mock('react-dom/server', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-dom/server')>()

    return {
        ...actual,
        renderToStaticMarkup: (
            node: React.ReactNode,
            options?: { identifierPrefix?: string }
        ) => {
            renderToStaticMarkupSpy()
            return actual.renderToStaticMarkup(node, options)
        },
    }
})

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

type ExportRow = {
    id: number
    name: string
    group: string
    notes: string
    secret: string
}

const columns: ColumnDefinition<ExportRow>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: true,
        renderCell: (value) => value.toUpperCase(),
    },
    {
        field: 'group',
        header: 'Group',
        type: ColumnType.TEXT,
        isSortable: true,
        filterType: FilterType.MULTISELECT,
        filterOptions: [
            { id: 'keep', label: 'Keep', value: 'keep' },
            { id: 'drop', label: 'Drop', value: 'drop' },
        ],
    },
    {
        field: 'notes',
        header: 'Notes',
        type: ColumnType.TEXT,
        isSortable: true,
        renderCell: (value) => <span>{value}</span>,
    },
    {
        field: 'secret',
        header: 'Secret',
        type: ColumnType.TEXT,
        isSortable: true,
        isVisible: false,
    },
]

const rows: ExportRow[] = [
    {
        id: 1,
        name: 'Zulu',
        group: 'keep',
        notes: 'line one\nline two, "quoted"',
        secret: 'hidden-zulu',
    },
    {
        id: 2,
        name: 'Alpha',
        group: 'keep',
        notes: 'plain',
        secret: 'hidden-alpha',
    },
    {
        id: 3,
        name: 'Middle',
        group: 'drop',
        notes: 'not exported',
        secret: 'hidden-middle',
    },
]

const readBlob = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(reader.error)
        reader.readAsText(blob)
    })

describe('DataTable whole-table export', () => {
    const createObjectURL = vi.fn(() => 'blob:data-table-export')
    const revokeObjectURL = vi.fn()
    let clickedAnchor: HTMLAnchorElement | undefined

    beforeEach(() => {
        createObjectURL.mockClear()
        revokeObjectURL.mockClear()
        renderToStaticMarkupSpy.mockClear()
        clickedAnchor = undefined
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: createObjectURL,
        })
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: revokeObjectURL,
        })
        const recordClickedAnchor = (anchor: HTMLAnchorElement) => {
            clickedAnchor = anchor
        }
        vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
            function (this: HTMLAnchorElement) {
                recordClickedAnchor(this)
            }
        )
    })

    it('hides export when disabled and normalizes the multi-format menu', async () => {
        const { rerender, user } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                exportConfig={{ enabled: false }}
            />
        )

        expect(
            screen.queryByRole('button', { name: /Export/ })
        ).not.toBeInTheDocument()

        rerender(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                exportConfig={{
                    enabled: true,
                    formats: ['csv', 'csv', 'xlsx', 'pdf'] as (
                        | 'csv'
                        | 'xlsx'
                    )[],
                }}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Export table' }))
        expect(screen.getAllByRole('menuitem', { name: 'CSV' })).toHaveLength(1)
        expect(screen.getAllByRole('menuitem', { name: 'XLSX' })).toHaveLength(
            1
        )
        expect(screen.queryByRole('menuitem', { name: 'PDF' })).toBeNull()
    })

    it('exports only visible columns and respects the current filter and sort', async () => {
        const { user } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableFiltering
                defaultSort={{
                    field: 'name',
                    direction: SortDirection.ASCENDING,
                }}
                exportConfig={{ enabled: true, fileName: 'current-view' }}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Filter Group' }))
        await user.click(screen.getByRole('menuitem', { name: 'Filter' }))
        await user.click(
            await screen.findByRole('menuitemcheckbox', { name: /Keep/ })
        )
        await user.click(screen.getByRole('button', { name: 'Export CSV' }))

        await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce())
        const blob = createObjectURL.mock.calls[0][0] as Blob

        await expect(readBlob(blob)).resolves.toBe(
            [
                'Name,Group,Notes',
                'ALPHA,keep,plain',
                'ZULU,keep,"line one\nline two, ""quoted"""',
            ].join('\r\n')
        )
    })

    it('quotes commas, quotes, and newlines in CSV values', async () => {
        await expect(
            generateDataTableCSV([rows[0]], columns.slice(0, 3))
        ).resolves.toBe(
            'Name,Group,Notes\r\n' +
                'ZULU,keep,"line one\nline two, ""quoted"""'
        )
    })

    it('neutralizes values that spreadsheet apps can interpret as formulas', async () => {
        const formulaColumn: ColumnDefinition<{ value: string }> = {
            field: 'value',
            header: '=Formula',
            type: ColumnType.TEXT,
            isSortable: false,
        }

        await expect(
            generateDataTableCSV(
                [
                    { value: '=2+3' },
                    { value: '+cmd' },
                    { value: '-cmd' },
                    { value: '@SUM(A1:A2)' },
                    { value: '\t=2+3' },
                ],
                [formulaColumn]
            )
        ).resolves.toBe(
            [
                "'=Formula",
                "'=2+3",
                "'+cmd",
                "'-cmd",
                "'@SUM(A1:A2)",
                "'\t=2+3",
            ].join('\r\n')
        )
    })

    it('exports the formatted text shown by date and component renderers', async () => {
        type DisplayRow = {
            joinedAt: {
                date: Date
                format: 'YYYY/MM/DD'
                dateLabel: string
            }
            status: string
        }

        const StatusLabel = ({ value }: { value: string }) => (
            <span>{value === 'active' ? 'Active user' : 'Inactive user'}</span>
        )
        const displayColumns: ColumnDefinition<DisplayRow>[] = [
            {
                field: 'joinedAt',
                header: 'Joined',
                type: ColumnType.DATE,
                isSortable: false,
                dateFormat: 'DD MMM YYYY',
            },
            {
                field: 'status',
                header: 'Status',
                type: ColumnType.TEXT,
                isSortable: false,
                renderCell: (value) => (
                    <span>
                        Status: <StatusLabel value={value} />
                    </span>
                ),
            },
        ]

        await expect(
            generateDataTableCSV(
                [
                    {
                        joinedAt: {
                            date: new Date(2026, 5, 24),
                            format: 'YYYY/MM/DD',
                            dateLabel: '(IST)',
                        },
                        status: 'active',
                    },
                ],
                displayColumns
            )
        ).resolves.toBe('Joined,Status\r\n2026/06/24 (IST),Status: Active user')
    })

    it('batches component renderer text extraction for large exports', async () => {
        const componentColumn: ColumnDefinition<{ status: string }> = {
            field: 'status',
            header: 'Status',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: (value) => <span>{value}</span>,
        }
        const manyRows = Array.from({ length: 251 }, (_, index) => ({
            status: `Status ${index}`,
        }))

        await generateDataTableCSV(manyRows, [componentColumn])
        expect(renderToStaticMarkupSpy).not.toHaveBeenCalled()

        const ComponentLabel = ({ value }: { value: string }) => (
            <span>{value}</span>
        )
        componentColumn.renderCell = (value) => <ComponentLabel value={value} />

        await generateDataTableCSV(manyRows, [componentColumn])
        expect(renderToStaticMarkupSpy).toHaveBeenCalledTimes(2)
    })

    it('caps renderer fallback attempts when every cell renderer throws', async () => {
        const AlwaysThrows = (): React.ReactNode => {
            throw new Error('Cannot render this cell')
        }
        const fallibleColumn: ColumnDefinition<{ value: string }> = {
            field: 'value',
            header: 'Value',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: () => <AlwaysThrows />,
        }
        const manyRows = Array.from({ length: 250 }, (_, index) => ({
            value: `Raw ${index}`,
        }))

        const csv = await generateDataTableCSV(manyRows, [fallibleColumn])

        expect(renderToStaticMarkupSpy).toHaveBeenCalledTimes(32)
        expect(csv.split('\r\n')).toEqual([
            'Value',
            ...manyRows.map((row) => row.value),
        ])
    })

    it('keeps rendered cells isolated from correlation attributes in cell content', async () => {
        type AdversarialRow = { value: string; spoofNextCell: boolean }
        const CellLabel = ({ row }: { row: AdversarialRow }) => (
            <span
                data-blend-export-cell-index={
                    row.spoofNextCell ? '1' : undefined
                }
            >
                {row.value}
            </span>
        )
        const adversarialColumn: ColumnDefinition<AdversarialRow> = {
            field: 'value',
            header: 'Value',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: (_value, row) => <CellLabel row={row} />,
        }

        await expect(
            generateDataTableCSV(
                [
                    { value: 'spoofed', spoofNextCell: true },
                    { value: 'real', spoofNextCell: false },
                ],
                [adversarialColumn]
            )
        ).resolves.toBe('Value\r\nspoofed\r\nreal')
    })

    it('keeps dangerous renderer markup from changing another cell', async () => {
        type DangerousRow = { value: string; html?: string }
        const DangerousLabel = ({ row }: { row: DangerousRow }) =>
            row.html ? (
                <span dangerouslySetInnerHTML={{ __html: row.html }} />
            ) : (
                <span>Rendered {row.value}</span>
            )
        const dangerousColumn: ColumnDefinition<DangerousRow> = {
            field: 'value',
            header: 'Value',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: (_value, row) => <DangerousLabel row={row} />,
        }

        await expect(
            generateDataTableCSV(
                [
                    {
                        value: 'unsafe raw fallback',
                        html: '</div></div><div>spoofed-second</div><textarea>',
                    },
                    { value: 'valid' },
                ],
                [dangerousColumn]
            )
        ).resolves.toBe('Value\r\nunsafe raw fallback\r\nRendered valid')
    })

    it('rejects renderer markup that nests another cell boundary', async () => {
        type DangerousRow = { value: string; html?: string }
        const UnbalancedLabel = ({ row }: { row: DangerousRow }) =>
            row.html ? (
                <span dangerouslySetInnerHTML={{ __html: row.html }} />
            ) : (
                <span>Rendered {row.value}</span>
            )
        const dangerousColumn: ColumnDefinition<DangerousRow> = {
            field: 'value',
            header: 'Value',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: (_value, row) => <UnbalancedLabel row={row} />,
        }

        await expect(
            generateDataTableCSV(
                [
                    { value: 'unsafe raw fallback', html: '<div>' },
                    { value: 'valid' },
                ],
                [dangerousColumn]
            )
        ).resolves.toBe('Value\r\nunsafe raw fallback\r\nRendered valid')
    })

    it('keeps valid renderer text when another renderer cannot be serialized', async () => {
        type FallibleRow = { value: string; throws: boolean }
        const FallibleLabel = ({ row }: { row: FallibleRow }) => {
            if (row.throws) throw new Error('Cannot render this cell')
            return <span>Rendered {row.value}</span>
        }
        const fallibleColumn: ColumnDefinition<FallibleRow> = {
            field: 'value',
            header: 'Value',
            type: ColumnType.TEXT,
            isSortable: false,
            renderCell: (_value, row) => <FallibleLabel row={row} />,
        }

        await expect(
            generateDataTableCSV(
                [
                    { value: 'raw fallback', throws: true },
                    { value: 'valid', throws: false },
                ],
                [fallibleColumn]
            )
        ).resolves.toBe('Value\r\nraw fallback\r\nRendered valid')
    })

    it('honors column-manager changes made before export', async () => {
        const { user } = render(
            <DataTable
                data={rows}
                columns={columns.slice(0, 3)}
                idField="id"
                enableColumnManager
                exportConfig={{ enabled: true, fileName: 'managed-columns' }}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Manage columns' }))
        await user.click(await screen.findByRole('option', { name: /Notes/ }))
        await user.click(screen.getByRole('button', { name: 'Export CSV' }))

        await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce())
        const exportedContent = await readBlob(
            createObjectURL.mock.calls[0][0] as Blob
        )

        expect(exportedContent.split('\r\n')[0]).toBe('Name,Group')
    })

    it('creates a genuine XLSX workbook', async () => {
        await downloadDataTableExport(
            [rows[0]],
            columns.slice(0, 3),
            'xlsx',
            'users'
        )

        const blob = createObjectURL.mock.calls[0][0] as Blob
        const bytes = await new Promise<Uint8Array>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () =>
                resolve(new Uint8Array(reader.result as ArrayBuffer))
            reader.onerror = () => reject(reader.error)
            reader.readAsArrayBuffer(blob)
        })

        expect(Array.from(bytes.slice(0, 2))).toEqual([0x50, 0x4b])
    })

    it('serializes rows returned asynchronously by onExport', async () => {
        const onExport = vi.fn(async () => rows.slice(0, 2))
        const { user } = render(
            <DataTable
                data={rows.slice(0, 1)}
                columns={columns}
                idField="id"
                serverSidePagination
                pagination={{
                    currentPage: 1,
                    pageSize: 1,
                    totalRows: rows.length,
                    pageSizeOptions: [1],
                }}
                exportConfig={{
                    enabled: true,
                    scope: 'allLoaded',
                    onExport,
                }}
            />
        )

        await user.click(screen.getByRole('button', { name: 'Export CSV' }))

        await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce())
        expect(onExport).toHaveBeenCalledWith(
            expect.objectContaining({
                visibleColumns: columns.slice(0, 3),
                filters: [],
                sort: null,
                scope: 'allLoaded',
            })
        )

        const exportedContent = await readBlob(
            createObjectURL.mock.calls[0][0] as Blob
        )
        expect(exportedContent).toContain('ALPHA,keep,plain')
    })

    it('passes active search, filters, advanced filters, and sort to onExport', async () => {
        const advancedFilters = [
            { field: 'name', operator: 'contains', value: 'alp' },
        ]
        const onExport = vi.fn(async () => undefined)
        const { user } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                enableSearch
                enableFiltering
                advancedFilters={advancedFilters}
                defaultSort={{
                    field: 'name',
                    direction: SortDirection.ASCENDING,
                }}
                exportConfig={{ enabled: true, onExport }}
            />
        )

        await user.type(screen.getByPlaceholderText('Search...'), 'alp')
        await user.click(screen.getByRole('button', { name: 'Filter Group' }))
        await user.click(screen.getByRole('menuitem', { name: 'Filter' }))
        await user.click(
            await screen.findByRole('menuitemcheckbox', { name: /Keep/ })
        )
        await user.click(screen.getByRole('button', { name: 'Export CSV' }))

        await waitFor(() => expect(onExport).toHaveBeenCalledOnce())
        expect(onExport).toHaveBeenCalledWith({
            visibleColumns: columns.slice(0, 3),
            filters: [
                expect.objectContaining({ field: 'group', value: ['keep'] }),
            ],
            advancedFilters,
            search: expect.objectContaining({ query: 'alp' }),
            sort: {
                field: 'name',
                direction: SortDirection.ASCENDING,
            },
            scope: 'currentPage',
        })
        expect(createObjectURL).not.toHaveBeenCalled()
    })

    it('blocks repeat exports while pending and recovers after rejection', async () => {
        let rejectFirstExport: (reason: Error) => void = () => undefined
        const firstExport = new Promise<ExportRow[]>((_resolve, reject) => {
            rejectFirstExport = reject
        })
        const onExport = vi
            .fn()
            .mockReturnValueOnce(firstExport)
            .mockResolvedValueOnce([rows[0]])
        const alertSpy = vi
            .spyOn(window, 'alert')
            .mockImplementation(() => undefined)
        const { user } = render(
            <DataTable
                data={rows}
                columns={columns}
                idField="id"
                exportConfig={{ enabled: true, onExport }}
            />
        )
        const exportButton = screen.getByRole('button', { name: 'Export CSV' })

        await user.click(exportButton)
        await waitFor(() => expect(exportButton).toBeDisabled())
        await user.click(exportButton)
        expect(onExport).toHaveBeenCalledOnce()

        rejectFirstExport(new Error('Server export failed'))
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Server export failed')
            expect(exportButton).toBeEnabled()
        })

        await user.click(exportButton)
        await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce())
        expect(onExport).toHaveBeenCalledTimes(2)
    })

    it.each([
        ['currentPage', false],
        ['allLoaded', true],
    ] as const)(
        'honors the %s export scope',
        async (scope, includesSecondRow) => {
            const { user } = render(
                <DataTable
                    data={rows}
                    columns={columns}
                    idField="id"
                    pagination={{
                        currentPage: 1,
                        pageSize: 1,
                        totalRows: rows.length,
                        pageSizeOptions: [1],
                    }}
                    exportConfig={{ enabled: true, scope }}
                />
            )

            await user.click(screen.getByRole('button', { name: 'Export CSV' }))

            await waitFor(() => expect(createObjectURL).toHaveBeenCalledOnce())
            const exportedContent = await readBlob(
                createObjectURL.mock.calls[0][0] as Blob
            )

            expect(exportedContent).toContain('ZULU,keep')
            expect(exportedContent.includes('ALPHA,keep')).toBe(
                includesSecondRow
            )
        }
    )

    it('falls back to the raw field value for custom-element columns', async () => {
        const reactElementColumn: ColumnDefinition<ExportRow> = {
            field: 'name',
            header: 'Name',
            type: ColumnType.REACT_ELEMENT,
            isSortable: false,
            renderCell: () => <strong>Visual label</strong>,
        }

        await expect(
            generateDataTableCSV([rows[0]], [reactElementColumn])
        ).resolves.toBe('Name\r\nZulu')
    })

    it('rejects empty exports and normalizes filenames while cleaning up URLs', async () => {
        await expect(generateDataTableCSV([], columns)).rejects.toThrow(
            'No data available for export'
        )

        await downloadDataTableExport(
            [rows[0]],
            columns.slice(0, 3),
            'csv',
            'users.xlsx'
        )

        expect(clickedAnchor?.download).toBe('users.csv')
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:data-table-export')
    })
})
