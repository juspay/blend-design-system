import { Chart } from 'blend-native'
import type {
    ChartNativeProps,
    ChartSeries,
    ChartPieSlice,
    ChartType,
} from 'blend-native'
import { unionOptions } from '../types'
import type { ComponentSpec } from '../types'

type ChartPlaygroundProps = Omit<
    ChartNativeProps,
    'series' | 'data' | 'skeleton'
> & {
    skeleton?: boolean
    /** Playground-only: whether to populate series/pie data. */
    showData?: boolean
}

const LINE_SERIES: ChartSeries[] = [
    {
        name: 'Revenue',
        data: [
            { x: 'Jan', y: 32 },
            { x: 'Feb', y: 45 },
            { x: 'Mar', y: 38 },
            { x: 'Apr', y: 52 },
            { x: 'May', y: 48 },
            { x: 'Jun', y: 61 },
        ],
    },
    {
        name: 'Costs',
        data: [
            { x: 'Jan', y: 22 },
            { x: 'Feb', y: 30 },
            { x: 'Mar', y: 28 },
            { x: 'Apr', y: 35 },
            { x: 'May', y: 33 },
            { x: 'Jun', y: 40 },
        ],
    },
]

const PIE_DATA: ChartPieSlice[] = [
    { label: 'Mobile', value: 42 },
    { label: 'Desktop', value: 28 },
    { label: 'Tablet', value: 18 },
    { label: 'Other', value: 12 },
]

const spec: ComponentSpec<ChartPlaygroundProps> = {
    name: 'Chart',
    summary:
        'Full-featured charts — line, area, bar, column, scatter, pie, donut — with legend, skeleton, and no-data states.',
    mode: 'inline',
    defaults: {
        type: 'line',
        height: 300,
        showLegend: true,
        showGrid: true,
        showXAxis: true,
        showYAxis: true,
        showData: true,
        centerLabel: 'Total',
        centerValue: '100',
    },
    controls: [
        {
            kind: 'select',
            key: 'type',
            label: 'Type',
            options: unionOptions<ChartType>()([
                'line',
                'area',
                'bar',
                'column',
                'scatter',
                'pie',
                'donut',
            ]),
        },
        {
            kind: 'select',
            key: 'height',
            label: 'Height',
            group: 'Appearance',
            options: [
                { label: '200', value: 200 },
                { label: '300', value: 300 },
                { label: '400', value: 400 },
            ],
        },
        {
            kind: 'toggle',
            key: 'showGrid',
            label: 'Grid',
            group: 'Appearance',
        },
        {
            kind: 'toggle',
            key: 'showXAxis',
            label: 'X-axis',
            group: 'Appearance',
        },
        {
            kind: 'toggle',
            key: 'showYAxis',
            label: 'Y-axis',
            group: 'Appearance',
        },
        {
            kind: 'toggle',
            key: 'showLegend',
            label: 'Legend',
            group: 'Appearance',
        },
        {
            kind: 'toggle',
            key: 'showData',
            label: 'Data',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'skeleton',
            label: 'Skeleton',
            group: 'State',
        },
    ],
    render: (props) => {
        const { showData, skeleton, type, ...rest } = props
        const isPie = type === 'pie' || type === 'donut'

        return (
            <Chart
                {...rest}
                type={type}
                series={
                    !isPie && showData ? LINE_SERIES : isPie ? [] : undefined
                }
                data={isPie && showData ? PIE_DATA : undefined}
                skeleton={skeleton ? { show: true } : undefined}
                centerLabel={isPie ? props.centerLabel : undefined}
                centerValue={isPie ? props.centerValue : undefined}
            />
        )
    },
}

export default spec
