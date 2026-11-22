import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import DataTable from '../../../lib/components/DataTable/DataTable'
import {
    ColumnDefinition,
    ColumnType,
} from '../../../lib/components/DataTable/types'

type OuterRow = { id: number; merchant: string; volume: string }
type InnerRow = { id: string; currency: string; amount: string }

const outerColumns: ColumnDefinition<OuterRow>[] = [
    { field: 'merchant', header: 'Merchant', type: ColumnType.TEXT },
    { field: 'volume', header: 'Volume', type: ColumnType.TEXT },
]

const outerRows: OuterRow[] = [
    { id: 1, merchant: 'Acme Corp', volume: '$12,400' },
    { id: 2, merchant: 'Globex', volume: '$8,100' },
]

const innerColumns: ColumnDefinition<InnerRow>[] = [
    { field: 'currency', header: 'Currency', type: ColumnType.TEXT },
    { field: 'amount', header: 'Amount', type: ColumnType.TEXT },
]

const innerRows: InnerRow[] = [
    { id: '1-usd', currency: 'USD', amount: '$8,200' },
    { id: '1-inr', currency: 'INR', amount: '₹3,10,000' },
    { id: '1-eur', currency: 'EUR', amount: '€1,500' },
]

const NestedTable = () => (
    <DataTable
        data={innerRows}
        columns={innerColumns}
        idField="id"
        title="Currency breakdown"
        showFooter={false}
    />
)

const collectSelectors = (): string[] => {
    const selectors: string[] = []
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            for (const rule of Array.from(sheet.cssRules)) {
                if (rule instanceof CSSStyleRule) {
                    selectors.push(rule.selectorText)
                }
            }
        } catch {
            // inaccessible sheets (media queries) are irrelevant here
        }
    }
    return selectors
}

describe('DataTable nested table hover scoping (#1788)', () => {
    it('scopes row hover cell styling to direct td children only', () => {
        render(
            <DataTable
                data={outerRows}
                columns={outerColumns}
                idField="id"
                title="Merchants"
                showFooter={false}
            />
        )

        const selectors = collectSelectors()

        // The row hover rule must target direct children (`> td`) so it does
        // not cascade into tables nested inside expanded rows.
        expect(
            selectors.filter((s) => /:hover\s*>\s*td\b/.test(s))
        ).not.toHaveLength(0)
        expect(
            selectors.filter((s) =>
                /\[data-focused-row=['"]true['"]\]\s*>\s*td\b/.test(s)
            )
        ).not.toHaveLength(0)

        // The descendant variants that used to leak into nested tables must
        // be gone.
        expect(selectors.filter((s) => /:hover\s+td\b/.test(s))).toHaveLength(0)
        expect(
            selectors.filter((s) =>
                /\[data-focused-row=['"]true['"]\]\s+td\b/.test(s)
            )
        ).toHaveLength(0)
    })

    it('scopes cell hover styling to the directly hovered row only', () => {
        render(
            <DataTable
                data={outerRows}
                columns={outerColumns}
                idField="id"
                title="Merchants"
                showFooter={false}
            />
        )

        const selectors = collectSelectors()

        // A body cell must only repaint when its own <tr> (the direct
        // parent) is hovered.
        expect(
            selectors.filter((s) => /tr:hover\s*>\s*\./.test(s))
        ).not.toHaveLength(0)
        expect(selectors.filter((s) => /tr:hover\s+\./.test(s))).toHaveLength(0)
    })

    it('renders a nested table inside an expanded row without inheriting hover selectors', async () => {
        render(
            <DataTable
                data={outerRows}
                columns={outerColumns}
                idField="id"
                title="Merchants"
                showFooter={false}
                enableRowExpansion
                renderExpandedRow={() => <NestedTable />}
            />
        )

        const expandButtons = screen.getAllByRole('button', {
            name: /expand row/i,
        })
        expect(expandButtons.length).toBeGreaterThan(0)
        expandButtons[0].click()

        await waitFor(
            () => {
                expect(
                    screen.getAllByText('Currency breakdown').length
                ).toBeGreaterThan(0)
            },
            { timeout: 3000 }
        )

        // Nested rows render inside the expanded band
        expect(screen.getByText('USD')).toBeInTheDocument()
        expect(screen.getByText('INR')).toBeInTheDocument()
        expect(screen.getByText('EUR')).toBeInTheDocument()

        // The expanded band's <td> (ExpandedCell) is a direct child of the
        // expanded <tr>; nested cells must sit deeper in the DOM so the
        // scoped hover rule can never reach them.
        const nestedCell = screen.getByText('USD').closest('td')
        const nestedRow = nestedCell?.closest('tr')
        const expandedCell = nestedRow?.closest('td')
        const expandedRow = expandedCell?.closest('tr')

        expect(nestedRow).not.toBeNull()
        expect(expandedCell).not.toBeNull()
        expect(expandedRow).not.toBeNull()
        expect(nestedRow?.parentElement?.closest('tr')).toBe(expandedRow)
        expect(Array.from(expandedRow?.children ?? [])).not.toContain(
            nestedCell
        )
    })
})
