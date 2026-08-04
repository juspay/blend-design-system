import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react'
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { ChartV3TokensType } from './chartV3.tokens'
import ChartV3Skeleton from './ChartV3Skeleton'
import ChartV3NoData from './ChartV3NoData'
import { filterBlockedProps } from '../../utils/prop-helpers'
import {
    getChartV3Title,
    getChartV3Type,
    hasChartV3SeriesData,
    mergeChartV3Options,
} from './chartV3Options'
import type { ChartV3Props, ChartV3ReactRefObject } from './chartV3.types'

const DEFAULT_NO_DATA = {
    title: 'No data available',
    subtitle: 'Data will appear here once available',
    button: undefined,
}

const areChartValuesEqual = (a: unknown, b: unknown): boolean => {
    if (Object.is(a, b)) return true

    if (typeof a !== typeof b) return false
    if (typeof a === 'function' || typeof b === 'function') return false
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
        return false
    }

    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
            return false
        }

        return a.every((item, index) => areChartValuesEqual(item, b[index]))
    }

    const aObject = a as Record<string, unknown>
    const bObject = b as Record<string, unknown>
    const aKeys = Object.keys(aObject)
    const bKeys = Object.keys(bObject)

    if (aKeys.length !== bKeys.length) return false

    return aKeys.every(
        (key) =>
            Object.prototype.hasOwnProperty.call(bObject, key) &&
            areChartValuesEqual(aObject[key], bObject[key])
    )
}

const ChartV3 = forwardRef<ChartV3ReactRefObject, ChartV3Props>(
    (
        {
            options = {},
            theme,
            renderer = 'canvas',
            settings,
            skeleton,
            noData = DEFAULT_NO_DATA,
            height = 360,
            width = '100%',
            initialAnimationDelay = 0,
            containerProps,
            onChartReady,
            onEvents,
            ...restProps
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<ChartV3TokensType>('CHARTSV3')
        const elementRef = useRef<HTMLDivElement | null>(null)
        const chartRef = useRef<EChartsType | null>(null)
        const onChartReadyRef = useRef(onChartReady)
        const setOptionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
            null
        )
        const lastSetOptionRef = useRef<{
            options: ChartV3Props['options']
            settings: ChartV3Props['settings']
        } | null>(null)
        const [chartRevision, setChartRevision] = useState(0)
        const mergedOptions = useMemo(
            () => mergeChartV3Options(options, tokens),
            [options, tokens]
        )
        onChartReadyRef.current = onChartReady

        useImperativeHandle(
            ref,
            () => ({
                get chart() {
                    return chartRef.current
                },
                getChart: () => chartRef.current,
            }),
            []
        )

        useEffect(() => {
            const element = elementRef.current
            if (!element) return

            const chart = echarts.init(element, theme, { renderer })
            chartRef.current = chart
            lastSetOptionRef.current = null
            setChartRevision((revision) => revision + 1)
            onChartReadyRef.current?.(chart)

            return () => {
                if (setOptionTimerRef.current) {
                    clearTimeout(setOptionTimerRef.current)
                    setOptionTimerRef.current = null
                }
                chart.dispose()
                chartRef.current = null
                lastSetOptionRef.current = null
            }
        }, [renderer, theme])

        useEffect(() => {
            const chart = chartRef.current
            if (!chart) return

            const applyOptions = () => {
                const lastSetOption = lastSetOptionRef.current
                if (
                    lastSetOption &&
                    ((lastSetOption.options === mergedOptions &&
                        lastSetOption.settings === settings) ||
                        (areChartValuesEqual(
                            lastSetOption.options,
                            mergedOptions
                        ) &&
                            areChartValuesEqual(
                                lastSetOption.settings,
                                settings
                            )))
                ) {
                    return
                }

                lastSetOptionRef.current = {
                    options: mergedOptions,
                    settings,
                }
                chart.setOption(mergedOptions, settings)
            }

            if (setOptionTimerRef.current) {
                clearTimeout(setOptionTimerRef.current)
                setOptionTimerRef.current = null
            }

            if (!lastSetOptionRef.current && initialAnimationDelay > 0) {
                setOptionTimerRef.current = setTimeout(() => {
                    setOptionTimerRef.current = null
                    applyOptions()
                }, initialAnimationDelay)

                return () => {
                    if (setOptionTimerRef.current) {
                        clearTimeout(setOptionTimerRef.current)
                        setOptionTimerRef.current = null
                    }
                }
            }

            applyOptions()
        }, [chartRevision, initialAnimationDelay, mergedOptions, settings])

        useEffect(() => {
            const chart = chartRef.current
            if (!chart || !onEvents) return

            const entries = Object.entries(onEvents)
            const wrappedHandlers = entries.map(([eventName, handler]) => {
                const wrappedHandler = (params: unknown) =>
                    handler(params, chart)
                chart.on(eventName, wrappedHandler)
                return [eventName, wrappedHandler] as const
            })

            return () => {
                wrappedHandlers.forEach(([eventName, handler]) =>
                    chart.off(eventName, handler)
                )
            }
        }, [chartRevision, onEvents])

        useEffect(() => {
            const element = elementRef.current
            const chart = chartRef.current
            if (!element || !chart) return

            const resize = () => chart.resize()
            const observer =
                typeof ResizeObserver !== 'undefined'
                    ? new ResizeObserver(resize)
                    : null

            observer?.observe(element)
            window.addEventListener('resize', resize)

            return () => {
                observer?.disconnect()
                window.removeEventListener('resize', resize)
            }
        }, [chartRevision])

        if (skeleton?.show) {
            return (
                <ChartV3Skeleton
                    skeletonVariant={skeleton.variant}
                    height={skeleton.height}
                    isExpanded
                />
            )
        }

        if (noData && !hasChartV3SeriesData(options)) {
            return <ChartV3NoData {...noData} />
        }

        const filteredProps = filterBlockedProps(restProps)
        const dataChart = getChartV3Type(options)

        return (
            <div
                {...containerProps}
                {...filteredProps}
                ref={elementRef}
                data-chart={dataChart}
                role={containerProps?.role ?? 'img'}
                aria-label={
                    containerProps?.['aria-label'] ?? getChartV3Title(options)
                }
                style={{ width, height }}
            />
        )
    }
)

ChartV3.displayName = 'ChartV3'

export default ChartV3
