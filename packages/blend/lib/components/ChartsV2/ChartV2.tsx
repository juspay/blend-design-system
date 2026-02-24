import { forwardRef } from 'react'
import {
    ChartV2ReactRefObject,
    ChartV2Props,
    ChartV2SeriesOptionsType,
} from './chartV2.types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import ChartV2Skeleton from './ChartV2Skeleton'
import ChartV2NoData from './ChartV2NoData'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { mergeChartOptions } from './chartV2Options'
import './chartV2.sankey'

const ChartV2 = forwardRef<ChartV2ReactRefObject, ChartV2Props>(
    (
        {
            highcharts = Highcharts,
            skeleton,
            noData = {
                title: 'No data available',
                subtitle: 'Data will appear here once available',
                button: undefined,
            },
            ...props
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
        const { options } = props

        const hasSeriesData =
            (options.series as ChartV2SeriesOptionsType[] | undefined)?.some(
                (s) => ((s as { data?: unknown[] }).data?.length ?? 0) > 0
            ) ?? false

        if (skeleton?.show) {
            return (
                <ChartV2Skeleton
                    skeletonVariant={skeleton.variant}
                    height={skeleton.height}
                    isExpanded
                />
            )
        }

        if (noData && !hasSeriesData) {
            return <ChartV2NoData {...noData} />
        }

        return (
            <>
                {/*DO NOT REMOVE: This is to hide the credits from the chart */}
                <style>
                    {`
        .highcharts-credits {
            display: none !important;
        }
        `}
                </style>
                <HighchartsReact
                    ref={ref}
                    highcharts={highcharts}
                    {...filterBlockedProps(props)}
                    options={mergeChartOptions(options, tokens)}
                />
            </>
        )
    }
)

export default ChartV2
ChartV2.displayName = 'ChartV2'
