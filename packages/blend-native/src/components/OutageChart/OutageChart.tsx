import { forwardRef, useMemo, useState, useCallback } from 'react'
import { View, Pressable } from 'react-native'
import type { View as RNView, LayoutChangeEvent } from 'react-native'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native'
import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Text from '../../primitives/Text'
import { ChartContainer } from '../Chart'
import { ChartHeader } from '../Chart'
import { ChartNoData } from '../Chart'
import { ChartSkeleton } from '../Chart'
import {
    splitTrendByZones,
    computeLanes,
    computeXDomain,
    xToFraction,
} from './outageChart.utils'
import type { OutageChartNativeProps, OutageSegment } from './outageChart.types'

const DEFAULT_TREND_HEIGHT = 160
const DEFAULT_LANE_HEIGHT = 48
const DEFAULT_SEGMENT_HEIGHT = 8
const HIGHLIGHT_OPACITY = 0.15
const DIMMED_OPACITY = 0.25

const NO_AXIS_STYLE = {
    axis: { stroke: 'transparent' },
    ticks: { size: 0 },
    tickLabels: { fill: 'transparent' },
    grid: { stroke: 'transparent', strokeWidth: 0 },
}

/**
 * OutageChart — composite "outage trend + per-lane timeline" surface.
 *
 * Port of the web `OutageChartDemoV2` pattern: a zone-colored trend line on
 * top, and an xrange-style timeline beneath with one row per lane label.
 * Tapping a timeline segment highlights the same x-span on the trend chart
 * (the native stand-in for the web hover plot-band).
 */
const OutageChart = forwardRef<RNView, OutageChartNativeProps>(
    function OutageChart(
        {
            trendData,
            zones = [],
            segments = [],
            trendColor,
            trendHeight = DEFAULT_TREND_HEIGHT,
            laneHeight = DEFAULT_LANE_HEIGHT,
            segmentHeight = DEFAULT_SEGMENT_HEIGHT,
            title,
            header,
            selectedSegmentId: controlledSelected,
            onSegmentSelect,
            noData,
            skeleton,
            accessibilityLabel,
            testID,
            style,
        },
        ref
    ) {
        const tokens = useNativeTokens<ChartV2TokensType>('CHARTSV2')
        const ct = tokens.chart

        const [measuredWidth, setMeasuredWidth] = useState<number | undefined>()
        const onLayout = (event: LayoutChangeEvent) => {
            const w = event.nativeEvent.layout.width
            if (w > 0 && w !== measuredWidth) setMeasuredWidth(w)
        }

        // --- Selection (controlled or uncontrolled) ---------------------
        const isControlled = controlledSelected !== undefined
        const [internalSelected, setInternalSelected] = useState<number | null>(
            null
        )
        const selectedSegmentId = isControlled
            ? controlledSelected
            : internalSelected

        const handleSegmentPress = useCallback(
            (index: number, segment: OutageSegment) => {
                const next = selectedSegmentId === index ? null : index
                if (!isControlled) setInternalSelected(next)
                onSegmentSelect?.(next === null ? null : { index, segment })
            },
            [isControlled, selectedSegmentId, onSegmentSelect]
        )

        const selectedSegment =
            selectedSegmentId != null ? segments[selectedSegmentId] : undefined

        // --- Derived data --------------------------------------------------
        const domain = useMemo(
            () => computeXDomain(trendData, segments),
            [trendData, segments]
        )
        const lanes = useMemo(() => computeLanes(segments), [segments])
        const trendParts = useMemo(() => {
            const parts = splitTrendByZones(trendData, zones)
            // zoneColor fallback when no zones: single color for the line.
            if (parts.length === 1 && zones.length === 0 && trendColor) {
                return [{ color: trendColor, data: parts[0].data }]
            }
            return parts
        }, [trendData, zones, trendColor])

        // --- Skeleton -------------------------------------------------------
        if (skeleton?.show) {
            return (
                <ChartContainer ref={ref} style={style}>
                    {header ? <ChartHeader>{header}</ChartHeader> : null}
                    <ChartSkeleton
                        height={trendHeight + lanes.length * laneHeight}
                    />
                </ChartContainer>
            )
        }

        // --- No-data ----------------------------------------------------------
        if (trendData.length === 0 && segments.length === 0) {
            return (
                <ChartContainer ref={ref} style={style}>
                    {header ? <ChartHeader>{header}</ChartHeader> : null}
                    <ChartNoData
                        title={noData?.title ?? 'No data available'}
                        subtitle={
                            noData?.subtitle ??
                            'Data will appear here once available'
                        }
                    />
                </ChartContainer>
            )
        }

        // VictoryChart insets the plot area by 8px on each side. The
        // highlight band is positioned in pixels relative to the chart
        // container so it aligns with the trend data, not the full View.
        const CHART_PADDING = 8
        const plotWidth = Math.max(0, (measuredWidth ?? 0) - CHART_PADDING * 2)
        const highlightBand = selectedSegment
            ? {
                  left:
                      CHART_PADDING +
                      xToFraction(selectedSegment.start, domain) * plotWidth,
                  width:
                      (xToFraction(selectedSegment.end, domain) -
                          xToFraction(selectedSegment.start, domain)) *
                      plotWidth,
                  color: selectedSegment.color,
              }
            : null

        const subtitleColor = String(ct.xAxis.labels.color)
        const tagBorderColor = String(FOUNDATION_THEME.colors.gray[200])
        const tagBg = String(FOUNDATION_THEME.colors.gray[50])
        const tagTextColor = String(FOUNDATION_THEME.colors.gray[700])

        return (
            <ChartContainer ref={ref} style={style}>
                {header ? <ChartHeader>{header}</ChartHeader> : null}
                <View
                    style={{
                        padding: 16,
                        gap: 12,
                        backgroundColor: String(ct.backgroundColor),
                    }}
                    accessibilityLabel={
                        accessibilityLabel ??
                        `Outage chart with ${trendData.length} trend points and ${segments.length} timeline segments`
                    }
                    accessibilityRole="summary"
                    testID={testID}
                >
                    {title ? (
                        <Text
                            fontSize={14}
                            fontWeight={500}
                            color={subtitleColor}
                        >
                            {title}
                        </Text>
                    ) : null}

                    {/* --- Trend chart (zone-colored line) --- */}
                    <View onLayout={onLayout} style={{ width: '100%' }}>
                        {measuredWidth ? (
                            <View>
                                <VictoryChart
                                    width={measuredWidth}
                                    height={trendHeight}
                                    padding={{
                                        top: 8,
                                        bottom: 8,
                                        left: 8,
                                        right: 8,
                                    }}
                                    domain={{ x: [domain.min, domain.max] }}
                                >
                                    <VictoryAxis style={NO_AXIS_STYLE} />
                                    <VictoryAxis
                                        dependentAxis
                                        style={NO_AXIS_STYLE}
                                    />
                                    {trendParts.map((part, i) => (
                                        <VictoryLine
                                            key={`trend-${i}`}
                                            data={part.data}
                                            interpolation="monotoneX"
                                            style={{
                                                data: {
                                                    stroke: part.color,
                                                    strokeWidth: 2,
                                                },
                                            }}
                                        />
                                    ))}
                                </VictoryChart>
                                {/* Selection band over the trend chart */}
                                {highlightBand ? (
                                    <View
                                        pointerEvents="none"
                                        style={{
                                            position: 'absolute',
                                            top: CHART_PADDING,
                                            bottom: CHART_PADDING,
                                            left: highlightBand.left,
                                            width: highlightBand.width,
                                            backgroundColor:
                                                highlightBand.color,
                                            opacity: HIGHLIGHT_OPACITY,
                                            borderRadius: 2,
                                        }}
                                        testID={
                                            testID
                                                ? `${testID}-highlight`
                                                : undefined
                                        }
                                    />
                                ) : null}
                            </View>
                        ) : (
                            <View style={{ height: trendHeight }} />
                        )}
                    </View>

                    {/* --- Timeline (per-lane segments) --- */}
                    <View
                        style={{ gap: 8 }}
                        testID={testID ? `${testID}-timeline` : undefined}
                    >
                        {lanes.map((lane) => (
                            <View
                                key={lane}
                                style={{
                                    minHeight: laneHeight,
                                    gap: 6,
                                    justifyContent: 'center',
                                }}
                            >
                                {/* Lane label — tag-style pill, echoing the
                                    web's rendered <Tag> on the y-axis. */}
                                <View
                                    style={{
                                        alignSelf: 'flex-start',
                                        borderWidth: 1,
                                        borderColor: tagBorderColor,
                                        backgroundColor: tagBg,
                                        borderRadius: 4,
                                        paddingHorizontal: 8,
                                        paddingVertical: 2,
                                    }}
                                >
                                    <Text
                                        fontSize={11}
                                        fontWeight={500}
                                        color={tagTextColor}
                                    >
                                        {lane}
                                    </Text>
                                </View>
                                {/* Segment bars for this lane */}
                                <View
                                    style={{
                                        height: segmentHeight + 8,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {segments.map((segment, i) => {
                                        if (segment.laneLabel !== lane) {
                                            return null
                                        }
                                        const left =
                                            xToFraction(segment.start, domain) *
                                            100
                                        const width =
                                            (xToFraction(segment.end, domain) -
                                                xToFraction(
                                                    segment.start,
                                                    domain
                                                )) *
                                            100
                                        const isSelected =
                                            selectedSegmentId === i
                                        const dimmed =
                                            selectedSegmentId != null &&
                                            !isSelected
                                        return (
                                            <Pressable
                                                key={`${lane}-${i}`}
                                                onPress={() =>
                                                    handleSegmentPress(
                                                        i,
                                                        segment
                                                    )
                                                }
                                                testID={
                                                    testID
                                                        ? `${testID}-segment-${i}`
                                                        : undefined
                                                }
                                                accessibilityRole="button"
                                                accessibilityLabel={`${lane} segment from ${segment.start} to ${segment.end}`}
                                                style={{
                                                    position: 'absolute',
                                                    left: `${left}%`,
                                                    width: `${width}%`,
                                                    height: segmentHeight,
                                                    borderRadius:
                                                        segmentHeight / 2,
                                                    backgroundColor:
                                                        segment.color,
                                                    opacity: dimmed
                                                        ? DIMMED_OPACITY
                                                        : 1,
                                                }}
                                            />
                                        )
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ChartContainer>
        )
    }
)

OutageChart.displayName = 'OutageChart'
export default OutageChart
