import { describe, expect, it } from 'vitest'
import { Theme } from '../../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import {
    getChartV3Tokens,
    hasChartV3SeriesData,
    mergeChartV3Options,
} from '../../../lib/components/ChartsV3'

const tokens = getChartV3Tokens(FOUNDATION_THEME, Theme.LIGHT).lg

describe('chartV3Options', () => {
    it('enables enter animation by default', () => {
        const options = mergeChartV3Options(
            {
                xAxis: { type: 'category', data: ['Jan'] },
                yAxis: { type: 'value' },
                series: [{ type: 'line', name: 'Revenue', data: [10] }],
            },
            tokens
        )

        expect(options).toMatchObject({
            animation: true,
            animationDuration: 2000,
            animationDurationUpdate: 700,
            animationEasing: 'quinticOut',
            animationEasingUpdate: 'cubicOut',
            animationThreshold: 5000,
        })
        expect(options.animationDelay).toEqual(expect.any(Function))
        expect(options.animationDelayUpdate).toEqual(expect.any(Function))
    })

    it('allows callers to override animation defaults', () => {
        const options = mergeChartV3Options(
            {
                animation: false,
                animationDuration: 0,
                xAxis: { type: 'category', data: ['Jan'] },
                yAxis: { type: 'value' },
                series: [{ type: 'line', name: 'Revenue', data: [10] }],
            },
            tokens
        )

        expect(options).toMatchObject({
            animation: false,
            animationDuration: 0,
        })
    })

    it('hides the native ECharts legend by default', () => {
        const options = mergeChartV3Options(
            {
                xAxis: { type: 'category', data: ['Jan'] },
                yAxis: { type: 'value' },
                series: [{ type: 'line', name: 'Revenue', data: [10] }],
            },
            tokens
        )

        expect(options.legend).toMatchObject({ show: false })
    })

    it('allows callers to opt into the native ECharts legend', () => {
        const options = mergeChartV3Options(
            {
                legend: { show: true, top: 24 },
                xAxis: { type: 'category', data: ['Jan'] },
                yAxis: { type: 'value' },
                series: [{ type: 'line', name: 'Revenue', data: [10] }],
            },
            tokens
        )

        expect(options.legend).toMatchObject({ show: true, top: 24 })
    })

    it('deep merges nested axis label options with token defaults', () => {
        const options = mergeChartV3Options(
            {
                xAxis: {
                    type: 'time',
                    axisLabel: {
                        formatter: (value: number) => String(value),
                        hideOverlap: true,
                    },
                },
                yAxis: { type: 'value' },
                series: [{ type: 'line', name: 'Revenue', data: [10] }],
            },
            tokens
        )

        expect(options.xAxis).toMatchObject({
            axisLabel: {
                color: tokens.chart.xAxis.labels.color,
                fontSize: tokens.chart.xAxis.labels.fontSize,
                hideOverlap: true,
                formatter: expect.any(Function),
            },
        })
    })

    it('treats dataset source as chart data', () => {
        expect(
            hasChartV3SeriesData({
                dataset: {
                    source: [
                        ['month', 'revenue'],
                        ['Jan', 10],
                    ],
                },
                xAxis: { type: 'category' },
                yAxis: { type: 'value' },
                series: [{ type: 'bar' }],
            })
        ).toBe(true)
    })
})
