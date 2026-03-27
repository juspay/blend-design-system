import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import { axe } from 'jest-axe'
import StatCardV2 from '../../../lib/components/StatCardV2/StatCardV2'
import {
    StatCardV2ChangeType,
    StatCardV2Variant,
} from '../../../lib/components/StatCardV2/statcardV2.types'
import { ChartV2Options } from '../../../lib/components/ChartsV2'

vi.mock('../../../lib/components/ChartsV2', () => ({
    ChartV2: () => <div data-testid="chart-v2" />,
}))

describe('StatCardV2 Accessibility', () => {
    it('has no axe violations for number variant', async () => {
        const { container } = render(
            <StatCardV2
                title="Accessible Stat"
                subtitle="Last 24 hours"
                value="83.24%"
                change={{
                    value: '10.00',
                    changeType: StatCardV2ChangeType.INCREASE,
                    leftSymbol: '+',
                    rightSymbol: '%',
                }}
                variant={StatCardV2Variant.NUMBER}
            />
        )

        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has no axe violations for chart variant with data', async () => {
        const { container } = render(
            <StatCardV2
                title="GMV Trend"
                value="$8,234"
                subtitle="last 7 days"
                change={{
                    value: '8.2',
                    changeType: StatCardV2ChangeType.INCREASE,
                    leftSymbol: '+',
                    rightSymbol: '%',
                }}
                variant={StatCardV2Variant.CHART}
                options={
                    {
                        series: [{ data: [1, 2, 3] }],
                    } as ChartV2Options
                }
            />
        )

        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('exposes region and chart roles with accessible names', () => {
        const { container } = render(
            <StatCardV2
                title="Accessible Region"
                subtitle="Subtitle"
                value="10"
                change={{
                    value: '1',
                    changeType: StatCardV2ChangeType.INCREASE,
                }}
                variant={StatCardV2Variant.CHART}
                options={
                    {
                        series: [{ data: [1, 2] }],
                    } as ChartV2Options
                }
            />
        )

        const region = container.querySelector('[role="region"]')
        expect(region).toBeInTheDocument()
        expect(region).toHaveAttribute('aria-label')

        const chart = screen.getByTestId('chart-v2').parentElement
        expect(chart).toHaveAttribute('role', 'img')
        expect(chart).toHaveAttribute('aria-label')
    })
})
