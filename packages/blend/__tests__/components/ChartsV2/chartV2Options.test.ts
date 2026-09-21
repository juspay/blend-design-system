import { describe, it, expect } from 'vitest'
import { mergeChartOptions } from '../../../lib/components/ChartsV2/chartV2Options'
import { getChartV2LightTokens } from '../../../lib/components/ChartsV2/chartV2.light.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import type Highcharts from 'highcharts'

// ChartV2.test.tsx mocks mergeChartOptions, so this file exercises the real
// implementation directly with real tokens.
const tokens = getChartV2LightTokens(FOUNDATION_THEME).lg

const makeSeriesData = (
    count: number
): Array<{ name: string; y: number } | number> =>
    Array.from({ length: count }, (_, i) => ({ name: `Cat ${i + 1}`, y: i }))

const getLabels = (options: Highcharts.Options) => {
    const merged = mergeChartOptions(options, tokens)
    const xAxis = merged.xAxis as Highcharts.XAxisOptions
    return xAxis.labels as Highcharts.XAxisLabelsOptions
}

describe('chartV2Options x-axis label thinning', () => {
    it('thins a dense column chart to step 3 (25 points)', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(25) }],
        })
        expect(labels.step).toBe(3)
    })

    it('leaves a sparse column chart unthinned (4 points)', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(4) }],
        })
        expect(labels.step).toBeUndefined()
    })

    it('preserves a consumer-provided labels.step', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(25) }],
            xAxis: { labels: { step: 5 } },
        })
        expect(labels.step).toBe(5)
    })

    it('does not inject step when consumer sets tickPixelInterval', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(25) }],
            xAxis: { tickPixelInterval: 50 },
        })
        expect(labels.step).toBeUndefined()
    })

    it('does not thin datetime axes', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [
                {
                    type: 'column',
                    data: makeSeriesData(25) as Highcharts.PointOptionsObject[],
                },
            ],
            xAxis: { type: 'datetime' },
        })
        expect(labels.step).toBeUndefined()
    })

    it('does not thin a line series with no category axis type', () => {
        const labels = getLabels({
            series: [{ type: 'line', data: makeSeriesData(25) }],
        })
        expect(labels.step).toBeUndefined()
    })

    it('thins a dense line chart with an explicit category axis', () => {
        const labels = getLabels({
            series: [
                {
                    type: 'line',
                    data: makeSeriesData(25) as Highcharts.PointOptionsObject[],
                },
            ],
            xAxis: { type: 'category' },
        })
        expect(labels.step).toBe(3)
    })

    it('computes the step from categories.length when series are shorter', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(5) }],
            xAxis: {
                type: 'category',
                categories: Array.from(
                    { length: 30 },
                    (_, i) => `Cat ${i + 1}`
                ),
            },
        })
        expect(labels.step).toBe(3)
    })

    it('still applies the default label offset and enabled flag (regression)', () => {
        const labels = getLabels({
            chart: { type: 'column' },
            series: [{ type: 'column', data: makeSeriesData(25) }],
        })
        expect(labels.y).toBe(40)
        expect(labels.enabled).toBe(true)
        expect(labels.style).toBeDefined()
    })
})
