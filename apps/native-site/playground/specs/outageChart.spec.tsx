import { OutageChart } from 'blend-native'
import type {
    OutageChartNativeProps,
    OutageTrendDatum,
    OutageZone,
    OutageSegment,
} from 'blend-native'
import { numberOptions } from '../types'
import type { ComponentSpec } from '../types'
import OutageChartShowcase from '../../components/OutageChartShowcase'

type OutageChartPlaygroundProps = Omit<
    OutageChartNativeProps,
    'trendData' | 'zones' | 'segments' | 'skeleton'
> & {
    skeleton?: boolean
    showData?: boolean
    showZones?: boolean
    showTimeline?: boolean
}

const T0 = 1766980800000
const T1 = 1766983387000
const T2 = 1766983828000
const T3 = 1766984400000

const TREND_DATA: OutageTrendDatum[] = [
    { x: 1766980800000, y: 9.3 },
    { x: 1766981100000, y: 6.45 },
    { x: 1766981400000, y: 6.32 },
    { x: 1766981700000, y: 6.25 },
    { x: 1766982000000, y: 7.19 },
    { x: 1766982300000, y: 8.65 },
    { x: 1766982600000, y: 9.01 },
    { x: 1766982900000, y: 8.17 },
    { x: 1766983200000, y: 8.66 },
    { x: 1766983500000, y: 8.45 },
    { x: 1766983800000, y: 7.41 },
    { x: 1766984100000, y: 6.26 },
    { x: 1766984400000, y: 6.75 },
]

const ZONES: OutageZone[] = [
    { from: T0, color: '#FB2C36' },
    { from: T1, color: '#FFC560' },
    { from: T2, color: '#A855F7' },
]

const SEGMENTS: OutageSegment[] = [
    {
        start: T0,
        end: T1,
        laneLabel: 'Central Bank of India',
        color: '#FB2C36',
        meta: { downTime: '2m 3s' },
    },
    {
        start: T1,
        end: T2,
        laneLabel: 'Central Bank of India',
        color: '#FFC560',
        meta: { fluctuation: '1.2%' },
    },
    {
        start: T2,
        end: T3,
        laneLabel: 'Central Bank of India',
        color: '#00C950',
    },
    {
        start: T0,
        end: T1,
        laneLabel: 'Bank of America',
        color: '#FB2C36',
    },
    {
        start: T1,
        end: T2,
        laneLabel: 'Bank of America',
        color: '#FFC560',
    },
    {
        start: T2,
        end: T3,
        laneLabel: 'Bank of America',
        color: '#00C950',
    },
]

const spec: ComponentSpec<OutageChartPlaygroundProps> = {
    name: 'OutageChart',
    summary:
        'Zone-colored trend line over a per-lane outage timeline. Tap a segment to highlight its x-span on the trend chart.',
    mode: 'inline',
    gallery: OutageChartShowcase,
    defaults: {
        title: 'UPI Outage Trend',
        trendHeight: 160,
        laneHeight: 48,
        showData: true,
        showZones: true,
        showTimeline: true,
    },
    controls: [
        {
            kind: 'segmented',
            key: 'trendHeight',
            label: 'Trend height',
            group: 'Appearance',
            options: numberOptions([120, 160, 200, 240]),
        },
        {
            kind: 'toggle',
            key: 'showZones',
            label: 'Zones',
            group: 'Appearance',
        },
        {
            kind: 'toggle',
            key: 'showTimeline',
            label: 'Timeline',
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
        const { showData, showZones, showTimeline, skeleton, ...rest } = props
        return (
            <OutageChart
                {...rest}
                trendData={showData ? TREND_DATA : []}
                zones={showData && showZones ? ZONES : []}
                segments={showData && showTimeline ? SEGMENTS : []}
                skeleton={skeleton ? { show: true } : undefined}
            />
        )
    },
}

export default spec
