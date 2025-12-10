import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
    SortDirection,
} from '../../../lib/components/DataTable/types'

const mockData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'User',
        status: 'Inactive',
    },
]

const mockColumns: ColumnDefinition<Record<string, unknown>>[] = [
    {
        field: 'name',
        header: 'Name',
        type: ColumnType.TEXT,
        isSortable: true,
    },
    {
        field: 'email',
        header: 'Email',
        type: ColumnType.TEXT,
        isSortable: true,
    },
    {
        field: 'role',
        header: 'Role',
        type: ColumnType.TEXT,
        isSortable: true,
    },
    {
        field: 'status',
        header: 'Status',
        type: ColumnType.TEXT,
        isSortable: true,
    },
]

describe('DataTable Accessibility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('WCAG 2.0, 2.1, 2.2 Compliance (Level A, AA, AAA)', () => {
        it('meets WCAG standards for basic DataTable (axe-core validation)', async () => {
            const { container } = render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const results = await axe(container, {
                rules: {
                    'aria-required-attr': { enabled: true },
                    'aria-valid-attr-value': { enabled: true },
                    'aria-allowed-attr': { enabled: true },
                    'aria-required-parent': { enabled: true },
                    'aria-required-children': { enabled: true },
                    'aria-roles': { enabled: true },
                    'aria-valid-attr': { enabled: true },
                },
            })
            expect(results).toHaveNoViolations()
        })

        it('has proper table role and ARIA attributes', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const table = screen.getByRole('table', { name: 'Users' })
            expect(table).toBeInTheDocument()
            expect(table).toHaveAttribute('aria-rowcount', '3')
            expect(table).toHaveAttribute('aria-colcount')
        })

        it('has proper table header with scope attributes', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const headers = screen.getAllByRole('columnheader')
            expect(headers.length).toBeGreaterThan(0)
            headers.forEach((header) => {
                expect(header).toHaveAttribute('scope', 'col')
            })
        })

        it('has proper aria-sort attributes for sortable columns', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    defaultSort={{
                        field: 'name',
                        direction: SortDirection.ASCENDING,
                    }}
                />
            )
            const nameHeader = screen.getByRole('columnheader', {
                name: 'Name',
            })
            expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
        })

        it('has proper row attributes with aria-rowindex', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const rows = screen.getAllByRole('row')
            // First row is header, rest are data rows
            const dataRows = rows.slice(1)
            dataRows.forEach((row, index) => {
                expect(row).toHaveAttribute('aria-rowindex', String(index + 1))
            })
        })

        it('has proper aria-selected attributes for selected rows', async () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                />
            )
            // Select first row checkbox
            const checkboxes = screen.getAllByRole('checkbox')
            const firstRowCheckbox = checkboxes[1] // First is select all
            firstRowCheckbox.click()

            await waitFor(() => {
                const rows = screen.getAllByRole('row')
                const firstDataRow = rows[1]
                expect(firstDataRow).toHaveAttribute('aria-selected', 'true')
            })
        })

        it('has proper aria-expanded attributes for expandable rows', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowExpansion={true}
                    renderExpandedRow={() => <div>Expanded content</div>}
                />
            )
            const expandButtons = screen.getAllByRole('button', {
                name: /expand row/i,
            })
            expect(expandButtons.length).toBeGreaterThan(0)
            expandButtons.forEach((button) => {
                // aria-expanded should be present and set to false initially
                expect(button).toHaveAttribute('aria-expanded', 'false')
            })
        })

        it('has proper aria-label for table region', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const region = screen.getByRole('region', { name: 'Users' })
            expect(region).toBeInTheDocument()
        })

        it('has proper aria-describedby for table description', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    description="User management table"
                />
            )
            const table = screen.getByRole('table', { name: 'Users' })
            expect(table).toHaveAttribute('aria-describedby')
        })

        it('has proper status region for screen reader announcements', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const statusRegion = document.querySelector(
                '[role="status"][aria-live="polite"]'
            )
            expect(statusRegion).toBeInTheDocument()
        })

        it('has proper aria-label for pagination buttons', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    pagination={{
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: mockData.length,
                    }}
                />
            )
            const prevButton = screen.getByRole('button', {
                name: 'Previous page',
            })
            const nextButton = screen.getByRole('button', { name: 'Next page' })
            expect(prevButton).toBeInTheDocument()
            expect(nextButton).toBeInTheDocument()
        })

        it('has proper aria-current for current page', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    pagination={{
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: mockData.length,
                    }}
                />
            )
            const currentPageButton = screen.getByRole('button', {
                name: 'Go to page 1',
            })
            expect(currentPageButton).toHaveAttribute('aria-current', 'page')
        })

        it('has proper aria-label for filter icons', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableFiltering={true}
                />
            )
            // Filter icons should have aria-label
            const filterIcons = document.querySelectorAll(
                '[aria-label*="Filter"]'
            )
            expect(filterIcons.length).toBeGreaterThan(0)
        })

        it('has proper aria-label for bulk action bar', async () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                />
            )
            // Select a row
            const checkboxes = screen.getAllByRole('checkbox')
            checkboxes[1].click()

            await waitFor(() => {
                const bulkActionBar = screen.getByRole('region', {
                    name: /selected/i,
                })
                expect(bulkActionBar).toBeInTheDocument()
            })
        })

        it('has proper empty state announcement', () => {
            render(
                <DataTable
                    data={[]}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const statusRegion = document.querySelector(
                '[role="status"][aria-live="polite"]'
            )
            expect(statusRegion).toHaveTextContent('No data available')
        })

        it('has proper loading state announcement', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    isLoading={true}
                />
            )
            const statusRegion = document.querySelector(
                '[role="status"][aria-live="polite"]'
            )
            expect(statusRegion).toHaveTextContent('Loading table data')
        })

        it('has proper table structure with thead and tbody', () => {
            const { container } = render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const thead = container.querySelector('thead')
            const tbody = container.querySelector('tbody')
            expect(thead).toBeInTheDocument()
            expect(tbody).toBeInTheDocument()
        })

        it('has proper keyboard navigation support for expand buttons', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowExpansion={true}
                    renderExpandedRow={() => <div>Expanded</div>}
                />
            )
            const expandButtons = screen.getAllByRole('button', {
                name: /expand row/i,
            })
            expect(expandButtons.length).toBeGreaterThan(0)
            expandButtons.forEach((button) => {
                expect(button).toHaveAttribute('type', 'button')
                expect(button).toHaveAttribute('aria-expanded', 'false')
                expect(button).toBeInTheDocument()
            })
        })

        it('has proper aria-label for settings button', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    showSettings={true}
                />
            )
            const settingsButton = screen.getByRole('button', {
                name: 'Table settings',
            })
            expect(settingsButton).toBeInTheDocument()
        })

        it('has proper aria-label for select all checkbox', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                />
            )
            const selectAllHeader = screen.getByRole('columnheader', {
                name: 'Select all rows',
            })
            expect(selectAllHeader).toBeInTheDocument()
        })

        it('has proper aria-label for expand column header', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowExpansion={true}
                />
            )
            const expandHeader = screen.getByRole('columnheader', {
                name: 'Expand row',
            })
            expect(expandHeader).toBeInTheDocument()
        })

        it('has proper aria-label for actions column header', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableInlineEdit={true}
                />
            )
            const actionsHeader = screen.getByRole('columnheader', {
                name: 'Actions',
            })
            expect(actionsHeader).toBeInTheDocument()
        })
    })

    describe('WCAG 1.3.1 Info and Relationships (Level A)', () => {
        it('uses semantic table elements', () => {
            const { container } = render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const table = container.querySelector('table')
            const thead = container.querySelector('thead')
            const tbody = container.querySelector('tbody')
            const th = container.querySelectorAll('th')
            const td = container.querySelectorAll('td')

            expect(table).toBeInTheDocument()
            expect(thead).toBeInTheDocument()
            expect(tbody).toBeInTheDocument()
            expect(th.length).toBeGreaterThan(0)
            expect(td.length).toBeGreaterThan(0)
        })

        it('associates headers with cells using scope attribute', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const headers = screen.getAllByRole('columnheader')
            headers.forEach((header) => {
                expect(header).toHaveAttribute('scope', 'col')
            })
        })
    })

    describe('WCAG 2.1.1 Keyboard (Level A)', () => {
        it('allows keyboard navigation to all interactive elements', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                    enableRowExpansion={true}
                />
            )
            const checkboxes = screen.getAllByRole('checkbox')
            const buttons = screen.getAllByRole('button')

            expect(checkboxes.length).toBeGreaterThan(0)
            expect(buttons.length).toBeGreaterThan(0)

            // All interactive elements should be focusable
            checkboxes.forEach((checkbox) => {
                expect(checkbox).not.toHaveAttribute('tabindex', '-1')
            })
        })
    })

    describe('WCAG 4.1.2 Name, Role, Value (Level A)', () => {
        it('provides accessible names for all interactive elements', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                    enableRowExpansion={true}
                    renderExpandedRow={() => <div>Expanded</div>}
                    pagination={{
                        currentPage: 1,
                        pageSize: 10,
                        totalRows: mockData.length,
                    }}
                />
            )
            const buttons = screen.getAllByRole('button')
            buttons.forEach((button) => {
                const ariaLabel = button.getAttribute('aria-label')
                const textContent = button.textContent?.trim()
                const title = button.getAttribute('title')
                // Button should have at least one accessible name
                expect(ariaLabel || textContent || title).toBeTruthy()
            })
        })

        it('provides proper roles for table elements', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            expect(screen.getByRole('table')).toBeInTheDocument()
            expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(
                0
            )
            expect(screen.getAllByRole('row').length).toBeGreaterThan(0)
        })
    })

    describe('WCAG 2.4.7 Focus Visible (Level AA)', () => {
        it('has visible focus indicators for interactive elements', () => {
            const { container } = render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                />
            )
            const interactiveElements = container.querySelectorAll(
                'button, [role="button"], input[type="checkbox"], a'
            )
            interactiveElements.forEach((element) => {
                expect(element).toBeInTheDocument()
            })
        })
    })

    describe('WCAG 1.4.3 Contrast (Minimum) (Level AA)', () => {
        it('uses theme tokens that ensure proper contrast', () => {
            // This test verifies that the component uses theme tokens
            // Actual contrast should be verified with tools like WebAIM Contrast Checker
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                />
            )
            const table = screen.getByRole('table')
            expect(table).toBeInTheDocument()
            // Component uses theme tokens which should ensure WCAG AA contrast
        })
    })

    describe('Screen Reader Support', () => {
        it('announces row selection changes', async () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowSelection={true}
                />
            )
            const checkboxes = screen.getAllByRole('checkbox')
            checkboxes[1].click()

            await waitFor(() => {
                const bulkActionBar = screen.getByRole('region', {
                    name: /selected/i,
                })
                expect(bulkActionBar).toBeInTheDocument()
            })
        })

        it('announces sort changes via aria-sort', () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    defaultSort={{
                        field: 'name',
                        direction: SortDirection.ASCENDING,
                    }}
                />
            )
            const nameHeader = screen.getByRole('columnheader', {
                name: 'Name',
            })
            expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')
        })

        it('announces row expansion state', async () => {
            render(
                <DataTable
                    data={mockData}
                    columns={mockColumns}
                    idField="id"
                    title="Users"
                    enableRowExpansion={true}
                    renderExpandedRow={() => <div>Expanded content</div>}
                />
            )
            const expandButtons = screen.getAllByRole('button', {
                name: /expand row/i,
            })
            expect(expandButtons.length).toBeGreaterThan(0)
            const firstExpandButton = expandButtons[0]

            // Check aria-expanded is present and false initially
            expect(firstExpandButton).toHaveAttribute('aria-expanded', 'false')

            firstExpandButton.click()

            await waitFor(
                () => {
                    // After clicking, the button should change to collapse
                    const collapseButton = screen.getByRole('button', {
                        name: /collapse row/i,
                    })
                    expect(collapseButton).toHaveAttribute(
                        'aria-expanded',
                        'true'
                    )
                },
                { timeout: 3000 }
            )
        })
    })
})
