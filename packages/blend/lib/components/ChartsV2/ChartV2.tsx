import { forwardRef, useMemo } from 'react'
import {
    ChartV2ReactRefObject,
    ChartV2Props,
    ChartV2SeriesOptionsType,
} from './chartV2.types'
import Highcharts from 'highcharts'
import {
    HighchartsReact,
    type HighchartsReactProps,
} from 'highcharts-react-official'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ChartV2TokensType } from './chartV2.tokens'
import ChartV2Skeleton from './ChartV2Skeleton'
import ChartV2NoData from './ChartV2NoData'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { mergeChartOptions } from './chartV2Options'
import { ensureSankeyRegistered } from './chartV2.sankey'
import { useMessages } from '../../i18n/useMessages'
import { CHART_MESSAGES } from '../../i18n/catalog/chart.messages'
import { DEFAULT_LOCALE } from '../../i18n/constants'

const ChartV2 = forwardRef<ChartV2ReactRefObject, ChartV2Props>(
    (
        { highcharts = Highcharts, skeleton, noData: noDataProp, ...props },
        ref
    ) => {
        const { m, locale } = useMessages(CHART_MESSAGES)
        // Same semantics as the old destructuring default: only an omitted
        // prop gets the built-in empty state.
        const noData =
            noDataProp === undefined
                ? {
                      title: m('chart.empty.no-data'),
                      subtitle: m('chart.empty.no-data-subtitle'),
                      button: undefined,
                  }
                : noDataProp
        const tokens = useResponsiveTokens<ChartV2TokensType>('CHARTSV2')
        const { options: optionsProp = {}, ...restProps } = props
        // Highcharts 12 resolves its own locale from `lang.locale`, then the
        // page's `<html lang>`, then the browser. Only an app that set a
        // Blend locale gets it forwarded, so charts in apps that rely on
        // `<html lang>` today render exactly as before; an explicit
        // `lang.locale` in the consumer's options always wins.
        const options = useMemo(
            () =>
                locale === DEFAULT_LOCALE || optionsProp.lang?.locale
                    ? optionsProp
                    : {
                          ...optionsProp,
                          lang: { ...optionsProp.lang, locale },
                      },
            [optionsProp, locale]
        )

        const sankeyInstance = useMemo(
            () => ensureSankeyRegistered(highcharts),
            [highcharts]
        )

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

        const filtered = filterBlockedProps(restProps) as HighchartsReactProps
        const { containerProps: userContainerProps, ...highchartsProps } =
            filtered

        const dataChart =
            ((
                options.series?.[0] as {
                    type?: string
                }
            )?.type as string | undefined) || 'Chart'

        const containerProps: HighchartsReactProps['containerProps'] = {
            ...(userContainerProps ?? {}),
            'data-chart': dataChart,
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
                    highcharts={sankeyInstance}
                    {...highchartsProps}
                    containerProps={containerProps}
                    options={mergeChartOptions(options, tokens)}
                />
            </>
        )
    }
)

export default ChartV2
ChartV2.displayName = 'ChartV2'
