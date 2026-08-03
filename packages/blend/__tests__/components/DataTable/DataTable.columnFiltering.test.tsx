import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
    FilterOption,
    FilterType,
} from '../../../lib/components/DataTable/types'
import { getColumnTypeConfigForColumn } from '../../../lib/components/DataTable/TableHeader/utils'
import { haveSameFilterOptions } from '../../../lib/components/DataTable/utils'

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

const openStatusFilter = async (user: ReturnType<typeof render>['user']) => {
    await user.click(screen.getByRole('button', { name: 'Filter Status' }))
    await user.click(screen.getByRole('menuitem', { name: 'Filter' }))
}

describe('DataTable column filtering', () => {
    it('uses filterType to render a multiselect filter for a text column', async () => {
        const columns = createStatusColumn([
            { id: 'active', label: 'Active', value: 'active' },
            { id: 'inactive', label: 'Inactive', value: 'inactive' },
        ])

        const { user } = render(
            <DataTable
                data={data}
                columns={[columns]}
                idField="id"
                enableFiltering
            />
        )

        await openStatusFilter(user)

        expect(
            await screen.findByRole('menuitemcheckbox', { name: /Active/ })
        ).toBeInTheDocument()
    })

    it('updates an open filter when filterOptions change', async () => {
        const onFilterChange = vi.fn()
        const initialColumn = createStatusColumn([
            { id: 'active', label: 'Initially Active', value: 'active' },
        ])
        const updatedColumn = createStatusColumn([
            { id: 'inactive', label: 'Loaded Inactive', value: 'inactive' },
        ])

        const { rerender, user } = render(
            <DataTable
                data={data}
                columns={[initialColumn]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        await openStatusFilter(user)
        expect(
            await screen.findByRole('menuitemcheckbox', {
                name: /Initially Active/,
            })
        ).toBeInTheDocument()

        rerender(
            <DataTable
                data={data}
                columns={[updatedColumn]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        await waitFor(() => {
            expect(
                screen.queryByRole('menuitemcheckbox', {
                    name: /Initially Active/,
                })
            ).not.toBeInTheDocument()
        })

        const loadedOption = await screen.findByRole('menuitemcheckbox', {
            name: /Loaded Inactive/,
        })
        await user.click(loadedOption)

        expect(onFilterChange).toHaveBeenCalled()
    })

    it.each([
        [FilterType.SELECT, 'select'],
        [FilterType.MULTISELECT, 'multiselect'],
        [FilterType.DATE, 'dateRange'],
        [FilterType.SLIDER, 'slider'],
    ] as const)(
        'maps explicit %s filter configuration',
        (filterType, filterComponent) => {
            const config = getColumnTypeConfigForColumn({
                field: 'status',
                header: 'Status',
                type: ColumnType.TEXT,
                filterType,
            })

            expect(config).toMatchObject({
                filterType,
                supportsFiltering: true,
                filterComponent,
            })
        }
    )

    it.each([FilterType.TEXT, FilterType.NUMBER, FilterType.BOOLEAN] as const)(
        'keeps the type-derived filter when %s has no filter component',
        (filterType) => {
            const config = getColumnTypeConfigForColumn({
                field: 'status',
                header: 'Status',
                type: ColumnType.SELECT,
                filterType,
            })

            expect(config).toMatchObject({
                filterType: FilterType.SELECT,
                supportsFiltering: true,
                filterComponent: 'select',
            })
        }
    )

    it('leaves a non-filterable column type non-filterable', () => {
        const config = getColumnTypeConfigForColumn({
            field: 'status',
            header: 'Status',
            type: ColumnType.TEXT,
            filterType: FilterType.TEXT,
        })

        expect(config.supportsFiltering).toBe(false)
        expect(config.filterComponent).toBeUndefined()
    })

    it('offers no filter affordance when filtering is disabled', async () => {
        // Without enableFiltering, DataTable never applies columnFilters, so a
        // filter UI here would store and report values that never change rows.
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

    it('offers a filter affordance when only serverSideFiltering is set', async () => {
        // Server-side consumers filter through onFilterChange and never need
        // enableFiltering, so the affordance must survive for them.
        render(
            <DataTable
                data={data}
                columns={[
                    createStatusColumn([
                        { id: 'active', label: 'Active', value: 'active' },
                    ]),
                ]}
                idField="id"
                serverSideFiltering
                onFilterChange={vi.fn()}
            />
        )

        expect(
            await screen.findByRole('button', { name: 'Filter Status' })
        ).toBeInTheDocument()
    })

    it('reverts to type-based inference when filterType is removed', async () => {
        const withFilter = createStatusColumn([
            { id: 'active', label: 'Active', value: 'active' },
        ])
        const withoutFilter: ColumnDefinition<Row> = {
            field: 'status',
            header: 'Status',
            type: ColumnType.TEXT,
            isSortable: false,
        }

        const { rerender } = render(
            <DataTable
                data={data}
                columns={[withFilter]}
                idField="id"
                enableFiltering
            />
        )

        expect(
            screen.getByRole('button', { name: 'Filter Status' })
        ).toBeInTheDocument()

        rerender(
            <DataTable
                data={data}
                columns={[withoutFilter]}
                idField="id"
                enableFiltering
            />
        )

        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: 'Filter Status' })
            ).not.toBeInTheDocument()
        })
    })

    it('clears a selection that is no longer in the option list', async () => {
        const onFilterChange = vi.fn()
        const initialColumn = createStatusColumn([
            { id: 'active', label: 'Active', value: 'active' },
        ])
        const reloadedColumn = createStatusColumn([
            { id: 'inactive', label: 'Inactive', value: 'inactive' },
        ])

        const { rerender, user } = render(
            <DataTable
                data={data}
                columns={[initialColumn]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        await openStatusFilter(user)
        await user.click(
            await screen.findByRole('menuitemcheckbox', { name: /Active/ })
        )

        rerender(
            <DataTable
                data={data}
                columns={[reloadedColumn]}
                idField="id"
                enableFiltering
                onFilterChange={onFilterChange}
            />
        )

        // 'active' is gone from the option list, so the only way out is the
        // Clear Filter entry on the column menu.
        expect(
            screen.queryByRole('menuitemcheckbox', { name: /Active/ })
        ).not.toBeInTheDocument()
        const clearFilter = await screen.findByRole('menuitem', {
            name: 'Clear Filter',
        })
        onFilterChange.mockClear()
        await user.click(clearFilter)

        expect(onFilterChange).toHaveBeenCalledWith([])
    })

    it('ignores a filterType that is not a real FilterType value', () => {
        const config = getColumnTypeConfigForColumn({
            field: 'status',
            header: 'Status',
            type: ColumnType.SELECT,
            // JS consumers are not bound by the enum; 'constructor' resolves
            // through the prototype chain if the lookup is unguarded.
            filterType: 'constructor' as FilterType,
        })

        expect(config).toMatchObject({
            filterType: FilterType.SELECT,
            supportsFiltering: true,
            filterComponent: 'select',
        })
    })

    it('does not resync columns when filterOptions content is unchanged', async () => {
        const buildOptions = () => [
            { id: 'active', label: 'Active', value: 'active' },
        ]

        // Counts React commits caused by a single rerender. An equal-content
        // filterOptions array must cost fewer commits than a changed one,
        // otherwise every parent render resyncs column state.
        const countCommitsForRerender = async (
            nextOptions: ColumnDefinition<Row>['filterOptions']
        ) => {
            const phases: string[] = []
            const Harness = ({ cols }: { cols: ColumnDefinition<Row>[] }) => (
                <React.Profiler
                    id="dt"
                    onRender={(_id, phase) => phases.push(phase)}
                >
                    <DataTable
                        data={data}
                        columns={cols}
                        idField="id"
                        enableFiltering
                    />
                </React.Profiler>
            )

            const { rerender, unmount } = render(
                <Harness cols={[createStatusColumn(buildOptions())]} />
            )
            phases.length = 0

            rerender(<Harness cols={[createStatusColumn(nextOptions)]} />)
            await waitFor(() => expect(phases.length).toBeGreaterThan(0))

            unmount()
            return phases.length
        }

        const unchanged = await countCommitsForRerender(buildOptions())
        const changed = await countCommitsForRerender([
            { id: 'inactive', label: 'Inactive', value: 'inactive' },
        ])

        expect(unchanged).toBeLessThan(changed)
    })

    describe('haveSameFilterOptions', () => {
        const options = [{ id: 'active', label: 'Active', value: 'active' }]

        it('treats an equal-content copy as unchanged', () => {
            expect(haveSameFilterOptions(options, [{ ...options[0] }])).toBe(
                true
            )
        })

        it.each([
            ['a differing label', [{ ...options[0], label: 'Enabled' }]],
            ['a longer list', [...options, ...options]],
            ['an empty list', []],
            ['undefined', undefined],
        ])('treats %s as changed', (_label, other) => {
            expect(
                haveSameFilterOptions(
                    options,
                    other as FilterOption[] | undefined
                )
            ).toBe(false)
        })

        // getFilterOptions falls back to row-derived values for all of these,
        // so they render identically and must not trigger a resync.
        it.each([
            ['empty vs undefined', [], undefined],
            ['undefined vs empty', undefined, []],
            ['empty vs empty', [], []],
            ['malformed vs empty', { length: 2 }, []],
        ])('treats %s as unchanged', (_label, a, b) => {
            expect(
                haveSameFilterOptions(
                    a as unknown as FilterOption[] | undefined,
                    b as unknown as FilterOption[] | undefined
                )
            ).toBe(true)
        })

        it('treats a reordered list as changed', () => {
            const inactive = {
                id: 'inactive',
                label: 'Inactive',
                value: 'inactive',
            }
            expect(
                haveSameFilterOptions(
                    [options[0], inactive],
                    [inactive, options[0]]
                )
            ).toBe(false)
        })

        // The comparator runs inside the column-sync effect, where a throw takes
        // the whole table down. JS consumers and server-driven column configs
        // are not bound by the FilterOption type.
        it.each([
            ['an array-like object', { length: 1 }],
            ['a string', 'x'],
            ['an array of nulls', [null]],
            ['an array hole', new Array(1)],
            ['a number', 1],
        ])('returns false instead of throwing for %s', (_label, malformed) => {
            let result: boolean | undefined
            expect(() => {
                result = haveSameFilterOptions(
                    malformed as unknown as FilterOption[],
                    options
                )
            }).not.toThrow()
            expect(result).toBe(false)
        })

        // An array-like object whose indexed element happens to match would
        // otherwise compare EQUAL, silently swallowing a real config change.
        it('treats a matching array-like object as changed, not equal', () => {
            expect(
                haveSameFilterOptions(
                    { length: 1, 0: { ...options[0] } } as unknown as
                        | FilterOption[]
                        | undefined,
                    options
                )
            ).toBe(false)
        })
    })

    it('retains type-based inference when filterType is absent', () => {
        const config = getColumnTypeConfigForColumn({
            field: 'status',
            header: 'Status',
            type: ColumnType.MULTISELECT,
        })

        expect(config).toMatchObject({
            filterType: FilterType.MULTISELECT,
            supportsFiltering: true,
            filterComponent: 'multiselect',
        })
    })
})
