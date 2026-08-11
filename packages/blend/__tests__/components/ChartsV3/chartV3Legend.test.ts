import { describe, expect, it, vi } from 'vitest'
import {
    getChartV3LegendItems,
    setChartV3LegendHover,
    toggleChartV3LegendItem,
} from '../../../lib/components/ChartsV3/chartV3LegendUtils'
import type { ChartV3 } from '../../../lib/components/ChartsV3/chartV3.types'

const createChart = (): ChartV3 =>
    ({
        getOption: () => ({
            legend: { selected: { Revenue: true, Profit: false } },
            series: [
                {
                    type: 'line',
                    name: 'Revenue',
                    color: '#2563eb',
                    data: [1, 2, 3],
                },
                {
                    type: 'line',
                    name: 'Profit',
                    color: '#16a34a',
                    data: [2, 3, 4],
                },
            ],
        }),
        dispatchAction: vi.fn(),
    }) as unknown as ChartV3

describe('chartV3Legend utilities', () => {
    it('returns no legend items when chart options are not applied yet', () => {
        const chart = {
            getOption: () => undefined,
            dispatchAction: vi.fn(),
        } as unknown as ChartV3

        expect(getChartV3LegendItems(chart)).toEqual([])
    })

    it('extracts legend items from ECharts series', () => {
        const items = getChartV3LegendItems(createChart())

        expect(items).toEqual([
            {
                key: 'Revenue',
                name: 'Revenue',
                color: '#2563eb',
                selected: true,
                seriesIndex: 0,
            },
            {
                key: 'Profit',
                name: 'Profit',
                color: '#16a34a',
                selected: false,
                seriesIndex: 1,
            },
        ])
    })

    it('dispatches ECharts hover actions', () => {
        const chart = createChart()
        const item = getChartV3LegendItems(chart)[0]

        setChartV3LegendHover(chart, item)

        expect(chart.dispatchAction).toHaveBeenCalledWith({ type: 'downplay' })
        expect(chart.dispatchAction).toHaveBeenCalledWith({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: undefined,
        })
    })

    it('dispatches ECharts legend toggle action', () => {
        const chart = createChart()
        const item = getChartV3LegendItems(chart)[0]

        toggleChartV3LegendItem(chart, item)

        expect(chart.dispatchAction).toHaveBeenCalledWith({
            type: 'legendToggleSelect',
            name: 'Revenue',
        })
    })
})
