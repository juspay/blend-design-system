import { memo, useState } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
    VictoryLine,
    VictoryArea,
    VictoryBar,
    VictoryChart,
    VictoryAxis,
} from 'victory-native'
import { FOUNDATION_THEME } from '@juspay/blend-design-system/node'
import type { SparklineNativeProps } from './sparkline.types'

const DEFAULT_HEIGHT = 50
const DEFAULT_STROKE = 2

/** A sparkline has no axes — suppress the default VictoryChart axis line,
 * ticks, and labels so only the data shape shows. */
const NO_AXIS = (
    <>
        <VictoryAxis
            style={{
                axis: { stroke: 'transparent' },
                ticks: { size: 0 },
                tickLabels: { fill: 'transparent' },
            }}
        />
        <VictoryAxis
            dependentAxis
            style={{
                axis: { stroke: 'transparent' },
                ticks: { size: 0 },
                tickLabels: { fill: 'transparent' },
            }}
        />
    </>
)

/**
 * Minimal sparkline used inside `StatCard`.
 *
 * The series colour defaults to the brand primary — the same default web's
 * `StatCard` uses when no custom `series.color` is passed.
 * Victory needs a concrete numeric width to lay out points; we measure the
 * wrapping View with `onLayout` instead of asking the consumer for one.
 */
const SparklineImpl = ({
    data,
    type = 'area',
    height = DEFAULT_HEIGHT,
    color,
    width,
    strokeWidth = DEFAULT_STROKE,
    style,
    testID,
}: SparklineNativeProps) => {
    const stroke = color ?? String(FOUNDATION_THEME.colors.primary[500])
    // `width` is an explicit override; the measured state only fills in when
    // the consumer lets us auto-size. Initializing it from `width` would
    // freeze a stale value if the prop later becomes `undefined`.
    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>(
        undefined
    )
    const resolvedWidth = typeof width === 'number' ? width : measuredWidth
    const onLayout = (event: LayoutChangeEvent) => {
        const w = event.nativeEvent.layout.width
        if (w > 0 && w !== measuredWidth) setMeasuredWidth(w)
    }

    if (data.length === 0) {
        return (
            <View
                onLayout={onLayout}
                testID={testID}
                style={[{ height }, style]}
            />
        )
    }

    if (!resolvedWidth) {
        return (
            <View
                onLayout={onLayout}
                testID={testID}
                style={[{ height, width: '100%' }, style]}
            />
        )
    }

    const victoryData = data.map((d, i) => ({ x: i, y: d.value }))

    const chartContent =
        type === 'bar' ? (
            <VictoryChart
                width={resolvedWidth}
                height={height}
                padding={0}
                domainPadding={{ x: 2 }}
            >
                {NO_AXIS}
                <VictoryBar
                    data={victoryData}
                    style={{
                        data: { fill: stroke },
                    }}
                    barRatio={0.6}
                    cornerRadius={2}
                />
            </VictoryChart>
        ) : (
            <VictoryChart width={resolvedWidth} height={height} padding={0}>
                {NO_AXIS}
                {/* VictoryChart cannot traverse plain Fragments for domain
                    computation — array children with explicit keys are the
                    equivalent but traverse correctly. VictoryArea's `stroke`
                    styles the closed path (including baseline), so it stays
                    stroke-less and the top edge is redrawn with VictoryLine. */}
                {type === 'area'
                    ? [
                          <VictoryArea
                              key="area-fill"
                              data={victoryData}
                              interpolation="monotoneX"
                              style={{
                                  data: {
                                      fill: stroke,
                                      fillOpacity: 0.15,
                                      // VictoryArea strokes the entire
                                      // closed path (including baseline) by
                                      // default — suppress it so only the
                                      // fill shows; the top edge is redrawn
                                      // by VictoryLine below.
                                      stroke: 'transparent',
                                  },
                              }}
                          />,
                          <VictoryLine
                              key="area-edge"
                              data={victoryData}
                              interpolation="monotoneX"
                              style={{
                                  data: { stroke, strokeWidth },
                              }}
                          />,
                      ]
                    : null}
                {type === 'line' && (
                    <VictoryLine
                        data={victoryData}
                        interpolation="monotoneX"
                        style={{
                            data: {
                                stroke,
                                strokeWidth,
                            },
                        }}
                    />
                )}
            </VictoryChart>
        )

    return (
        <View
            onLayout={onLayout}
            testID={testID}
            style={[{ height, width: '100%', overflow: 'hidden' }, style]}
        >
            {chartContent}
        </View>
    )
}

export const Sparkline = memo(SparklineImpl)
Sparkline.displayName = 'Sparkline'
export default Sparkline
