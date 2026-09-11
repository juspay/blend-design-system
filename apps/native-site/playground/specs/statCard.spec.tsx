import {
    StatCard,
    StatCardArrowDirection,
    StatCardChangeType,
    StatCardVariant,
} from 'blend-native'
import type {
    SparklineDatum,
    SparklineType,
    StatCardChange,
    StatCardNativeProps,
} from 'blend-native'
import { enumOptions, numberOptions, unionOptions } from '../types'
import type { ComponentSpec } from '../types'

type StatCardPlaygroundProps = Omit<
    StatCardNativeProps,
    'change' | 'progressValue' | 'skeleton' | 'chartData' | 'chartType'
> & {
    /** Playground-only: whether to show a change indicator. */
    showChange?: boolean
    changeType?: StatCardChangeType
    arrowDirection?: StatCardArrowDirection
    progressValue?: number
    skeleton?: boolean
    chartType?: SparklineType
    /** Playground-only: whether to include sparkline data for CHART variant. */
    showChartData?: boolean
}

const INCREASE_CHANGE: StatCardChange = {
    value: '12.4%',
    changeType: StatCardChangeType.INCREASE,
    arrowDirection: StatCardArrowDirection.UP,
    leftSymbol: '+',
}

const DECREASE_CHANGE: StatCardChange = {
    value: '3.1%',
    changeType: StatCardChangeType.DECREASE,
    arrowDirection: StatCardArrowDirection.DOWN,
    leftSymbol: '-',
}

const SAMPLE_SERIES: SparklineDatum[] = [
    { value: 18 },
    { value: 24 },
    { value: 21 },
    { value: 32 },
    { value: 28 },
    { value: 41 },
    { value: 38 },
    { value: 55 },
    { value: 47 },
    { value: 62 },
    { value: 71 },
    { value: 68 },
]

const spec: ComponentSpec<StatCardPlaygroundProps> = {
    name: 'StatCard',
    summary:
        'Titled metric card with a value, delta indicator, progress bar, or sparkline chart.',
    mode: 'inline',
    defaults: {
        variant: StatCardVariant.NUMBER,
        title: 'Gross volume',
        value: '₹4,82,310',
        subtitle: 'vs. previous 30 days',
        showChange: true,
        changeType: StatCardChangeType.INCREASE,
        arrowDirection: StatCardArrowDirection.UP,
        progressValue: 64,
        chartType: 'area',
        showChartData: true,
        showBorder: true,
    },
    controls: [
        {
            kind: 'select',
            key: 'variant',
            label: 'Variant',
            options: enumOptions(StatCardVariant, 'StatCardVariant'),
        },
        {
            kind: 'text',
            key: 'title',
            label: 'Title',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'value',
            label: 'Value',
            group: 'Content',
        },
        {
            kind: 'text',
            key: 'subtitle',
            label: 'Subtitle',
            group: 'Content',
        },
        {
            kind: 'toggle',
            key: 'showChange',
            label: 'Change',
            group: 'Content',
            hidden: true,
        },
        {
            kind: 'select',
            key: 'changeType',
            label: 'Change type',
            group: 'Content',
            options: enumOptions(StatCardChangeType, 'StatCardChangeType'),
            hidden: true,
        },
        {
            kind: 'select',
            key: 'arrowDirection',
            label: 'Arrow',
            group: 'Content',
            options: enumOptions(
                StatCardArrowDirection,
                'StatCardArrowDirection'
            ),
            hidden: true,
        },
        {
            kind: 'select',
            key: 'progressValue',
            label: 'Progress',
            group: 'Content',
            options: numberOptions([0, 25, 50, 64, 80, 100], '%'),
            hidden: true,
        },
        {
            kind: 'select',
            key: 'chartType',
            label: 'Chart type',
            group: 'Content',
            options: unionOptions<SparklineType>()(['area', 'line', 'bar']),
            hidden: true,
        },
        {
            kind: 'toggle',
            key: 'showChartData',
            label: 'Chart data',
            group: 'Content',
            hidden: true,
        },
        {
            kind: 'toggle',
            key: 'showBorder',
            label: 'Border',
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
        const {
            showChange,
            changeType,
            arrowDirection,
            progressValue,
            skeleton,
            variant,
            chartType,
            showChartData,
            ...rest
        } = props

        const isProgress = variant === StatCardVariant.PROGRESS_BAR
        const isChart = variant === StatCardVariant.CHART

        const change: StatCardChange | undefined = showChange
            ? changeType === StatCardChangeType.DECREASE
                ? { ...DECREASE_CHANGE, arrowDirection }
                : { ...INCREASE_CHANGE, arrowDirection }
            : undefined

        return (
            <StatCard
                {...rest}
                variant={variant}
                change={change}
                progressValue={isProgress ? progressValue : undefined}
                chartData={isChart && showChartData ? SAMPLE_SERIES : undefined}
                chartType={chartType}
                skeleton={skeleton ? { show: true } : undefined}
                maxWidth={280}
            />
        )
    },
}

export default spec
