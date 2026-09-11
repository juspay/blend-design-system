import { SankeyChart } from 'blend-native'
import type { SankeyChartProps, SankeyNode, SankeyLink } from 'blend-native'
import { numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

type SankeyChartPlaygroundProps = Omit<
    SankeyChartProps,
    'nodes' | 'links' | 'skeleton'
> & {
    skeleton?: boolean
    showData?: boolean
    dataSet: 'payment' | 'simple' | 'pipeline'
}

const PAYMENT_NODES: SankeyNode[] = [
    { id: 'initiated', label: 'Initiated' },
    { id: 'success', label: 'Success' },
    { id: 'failure', label: 'Failure' },
    { id: 'pending', label: 'Pending' },
    { id: 'settled', label: 'Settled' },
    { id: 'refunded', label: 'Refunded' },
    { id: 'closed', label: 'Closed' },
]

const PAYMENT_LINKS: SankeyLink[] = [
    { source: 'initiated', target: 'success', value: 720 },
    { source: 'initiated', target: 'failure', value: 180 },
    { source: 'initiated', target: 'pending', value: 100 },
    { source: 'success', target: 'settled', value: 680 },
    { source: 'success', target: 'refunded', value: 40 },
    { source: 'pending', target: 'settled', value: 80 },
    { source: 'pending', target: 'closed', value: 20 },
    { source: 'failure', target: 'closed', value: 180 },
]

const SIMPLE_NODES: SankeyNode[] = [
    { id: 'a', label: 'Source A' },
    { id: 'b', label: 'Source B' },
    { id: 'c', label: 'Target C' },
]

const SIMPLE_LINKS: SankeyLink[] = [
    { source: 'a', target: 'c', value: 60 },
    { source: 'b', target: 'c', value: 40 },
]

const PIPELINE_NODES: SankeyNode[] = [
    { id: 'start', label: 'Start', column: 0 },
    { id: 'step1', label: 'Step 1', column: 1 },
    { id: 'step2', label: 'Step 2', column: 2 },
    { id: 'end', label: 'End', column: 3 },
]

const PIPELINE_LINKS: SankeyLink[] = [
    { source: 'start', target: 'step1', value: 100 },
    { source: 'step1', target: 'step2', value: 80 },
    { source: 'step1', target: 'end', value: 20 },
    { source: 'step2', target: 'end', value: 80 },
]

const DATA_SETS = {
    payment: { nodes: PAYMENT_NODES, links: PAYMENT_LINKS },
    simple: { nodes: SIMPLE_NODES, links: SIMPLE_LINKS },
    pipeline: { nodes: PIPELINE_NODES, links: PIPELINE_LINKS },
}

const spec: ComponentSpec<SankeyChartPlaygroundProps> = {
    name: 'SankeyChart',
    summary:
        'Flow visualization where ribbon width is proportional to value. Tap a node to highlight its flow.',
    mode: 'inline',
    defaults: {
        height: 360,
        curveFactor: 0.5,
        focusBehavior: 'flow',
        showData: true,
        dataSet: 'payment',
    },
    controls: [
        {
            kind: 'select',
            key: 'dataSet',
            label: 'Dataset',
            options: unionOptions<SankeyChartPlaygroundProps['dataSet']>()([
                'payment',
                'simple',
                'pipeline',
            ]),
        },
        {
            kind: 'select',
            key: 'height',
            label: 'Height',
            group: 'Appearance',
            options: numberOptions([240, 300, 360, 440]),
        },
        {
            kind: 'select',
            key: 'curveFactor',
            label: 'Curve',
            group: 'Appearance',
            options: [
                { label: '0', value: 0 },
                { label: '0.3', value: 0.3 },
                { label: '0.5', value: 0.5 },
                { label: '0.8', value: 0.8 },
                { label: '1', value: 1 },
            ],
        },
        {
            kind: 'select',
            key: 'focusBehavior',
            label: 'Focus',
            group: 'Appearance',
            options: unionOptions<
                NonNullable<SankeyChartProps['focusBehavior']>
            >()(['flow', 'in', 'out', 'none']),
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
        const { showData, skeleton, dataSet, ...rest } = props
        const data = DATA_SETS[dataSet]
        return (
            <SankeyChart
                {...rest}
                nodes={showData ? data.nodes : []}
                links={showData ? data.links : []}
                skeleton={skeleton ? { show: true } : undefined}
            />
        )
    },
}

export default spec
