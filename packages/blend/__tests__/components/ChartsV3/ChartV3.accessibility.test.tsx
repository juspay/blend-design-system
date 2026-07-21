import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render } from '../../test-utils'
import { axe } from 'jest-axe'
import ChartV3 from '../../../lib/components/ChartsV3/ChartV3'

vi.mock('echarts', () => ({
    init: () => ({
        setOption: vi.fn(),
        resize: vi.fn(),
        dispose: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        dispatchAction: vi.fn(),
        getOption: vi.fn(),
    }),
}))

describe('ChartV3 Accessibility', () => {
    it('meets WCAG standards for a basic chart with data', async () => {
        const { container } = render(
            <ChartV3
                options={{
                    title: { text: 'Success Rate Over Time' },
                    series: [{ type: 'line', data: [1, 2, 3] }],
                }}
            />
        )

        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('exposes chart role and accessible name', () => {
        const { container } = render(
            <ChartV3
                options={{
                    title: { text: 'Transaction Success Rate' },
                    series: [{ type: 'bar', data: [10, 20, 30] }],
                }}
            />
        )

        const chart = container.querySelector('[data-chart="bar"]')
        expect(chart).toHaveAttribute('role', 'img')
        expect(chart).toHaveAttribute('aria-label', 'Transaction Success Rate')
    })

    it('announces no-data state via role=status', () => {
        const { container } = render(
            <ChartV3
                options={{ series: [] }}
                noData={{
                    title: 'No data available',
                    subtitle: 'Data will appear here once available',
                }}
            />
        )

        const status = container.querySelector('[data-chart="No-Data"]')
        expect(status).toHaveAttribute('role', 'status')
        expect(status).toHaveAttribute('aria-live', 'polite')
    })
})
