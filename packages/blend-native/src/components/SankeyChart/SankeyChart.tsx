import { forwardRef, useContext, useMemo, useState, useCallback } from 'react'
import { View } from 'react-native'
import type { View as RNView, LayoutChangeEvent } from 'react-native'
import Svg, { Path, Rect, Text as SvgText, G } from 'react-native-svg'
import type { ChartV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { BlendNativeThemeContext } from '../../theme/BlendNativeProvider'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { ChartContainer } from '../Chart'
import { ChartNoData } from '../Chart'
import { ChartSkeleton } from '../Chart'
import {
    computeSankeyLayout,
    buildRibbonPath,
    getFocusSet,
} from './sankeyChart.utils'
import type { SankeyChartProps } from './sankeyChart.types'

const DEFAULT_HEIGHT = 400
const DEFAULT_NODE_WIDTH = 16
const DEFAULT_NODE_GAP = 12
const DEFAULT_CURVE_FACTOR = 0.5
const MIN_NODE_HEIGHT = 4
const LABEL_MAX_CHARS = 12

/**
 * SankeyChart — a flow visualization where ribbon width is proportional to
 * `value`.
 *
 * Nodes are arranged in columns (explicit or topologically computed), and
 * ribbons connect the right edge of a source node to the left edge of a target
 * node. Tapping a node highlights its flow (in + out ribbons).
 *
 * Uses `react-native-svg` (a transitive dep of victory-native) for rendering.
 * Styled from `CHARTSV2` tokens.
 */
const SankeyChart = forwardRef<RNView, SankeyChartProps>(function SankeyChart(
    {
        nodes,
        links,
        height = DEFAULT_HEIGHT,
        nodeWidth = DEFAULT_NODE_WIDTH,
        nodeGap = DEFAULT_NODE_GAP,
        curveFactor = DEFAULT_CURVE_FACTOR,
        focusBehavior = 'flow',
        onPress,
        selectedId: controlledSelectedId,
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
    // SvgText does not inherit the RN font context — resolve the body role
    // explicitly, like Chart.tsx does for Victory labels.
    const { fontFamily: familyMap } = useContext(BlendNativeThemeContext)
    const labelFontFamily = familyMap.body ?? undefined

    const [measuredWidth, setMeasuredWidth] = useState<number | undefined>()
    const onLayout = (event: LayoutChangeEvent) => {
        const w = event.nativeEvent.layout.width
        if (w > 0 && w !== measuredWidth) setMeasuredWidth(w)
    }

    // --- Selected node (controlled or uncontrolled) ----------------------
    const isControlled = controlledSelectedId !== undefined
    const [internalSelected, setInternalSelected] = useState<
        string | undefined
    >(undefined)
    const selectedId = isControlled ? controlledSelectedId : internalSelected

    const handleNodePress = useCallback(
        (nodeId: string) => {
            if (!isControlled) {
                setInternalSelected((prev) =>
                    prev === nodeId ? undefined : nodeId
                )
            }
            onPress?.({ kind: 'node', id: nodeId })
        },
        [isControlled, onPress]
    )

    const handleLinkPress = useCallback(
        (linkId: string) => {
            onPress?.({ kind: 'link', id: linkId })
        },
        [onPress]
    )

    // --- Layout -----------------------------------------------------------
    const layout = useMemo(
        () =>
            computeSankeyLayout(nodes, links, {
                canvasHeight: height,
                nodeWidth,
                nodeGap,
            }),
        [nodes, links, height, nodeWidth, nodeGap]
    )

    const { positionedNodes, positionedLinks } = layout

    // --- Focus set --------------------------------------------------------
    const focusSet = useMemo(() => {
        if (focusBehavior === 'none' || !selectedId) return null
        return getFocusSet(selectedId, links, focusBehavior)
    }, [selectedId, focusBehavior, links])

    const isDimmed = (id: string, linkKey?: string): boolean => {
        if (!focusSet) return false
        if (linkKey) return !focusSet.has(linkKey)
        return !focusSet.has(id)
    }

    // --- Column X positions -----------------------------------------------
    const columnCount = useMemo(() => {
        if (positionedNodes.length === 0) return 0
        return Math.max(...positionedNodes.map((n) => n.columnIndex)) + 1
    }, [positionedNodes])

    // --- Skeleton ---------------------------------------------------------
    if (skeleton?.show) {
        return (
            <ChartContainer ref={ref} style={style}>
                <ChartSkeleton height={height} />
            </ChartContainer>
        )
    }

    // --- No-data ----------------------------------------------------------
    if (nodes.length === 0 || links.length === 0) {
        return (
            <ChartContainer ref={ref} style={style}>
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

    if (!measuredWidth) {
        return (
            <ChartContainer ref={ref} style={style}>
                <View onLayout={onLayout} style={{ width: '100%', height }} />
            </ChartContainer>
        )
    }

    // Compute X position for each column. Spread columns evenly across the
    // canvas width, leaving room for labels on the left and right.
    // Rightmost column gets less label room because its labels go right
    // (away from the canvas), not left — but we keep it symmetric for now.
    const labelPadding = 96 // px reserved for labels on each side
    const drawableWidth = Math.max(0, measuredWidth - labelPadding * 2)
    const columnSpacing =
        columnCount > 1 ? drawableWidth / (columnCount - 1) : 0

    const nodeX = (columnIndex: number) =>
        labelPadding + columnIndex * columnSpacing

    const labelColor = String(ct.xAxis.labels.color)
    const titleColor = String(ct.xAxis.title.color)

    return (
        <ChartContainer ref={ref} style={style}>
            <View
                onLayout={onLayout}
                style={{
                    backgroundColor: String(ct.backgroundColor),
                }}
                accessibilityLabel={
                    accessibilityLabel ??
                    `Sankey chart with ${nodes.length} nodes and ${links.length} links`
                }
                accessibilityRole="summary"
                testID={testID}
            >
                <Svg width={measuredWidth} height={height}>
                    {/* --- Ribbons --- */}
                    {positionedLinks.map((link, i) => {
                        const srcNode = positionedNodes[link.sourceIndex]
                        const tgtNode = positionedNodes[link.targetIndex]
                        if (!srcNode || !tgtNode) return null

                        const sx = nodeX(srcNode.columnIndex) + nodeWidth
                        const tx = nodeX(tgtNode.columnIndex)
                        const linkKey = `${link.source}→${link.target}`
                        const dimmed = isDimmed(link.source, linkKey)

                        const path = buildRibbonPath(
                            sx,
                            link.sourceY0,
                            link.sourceY1,
                            tx,
                            link.targetY0,
                            link.targetY1,
                            curveFactor
                        )

                        return (
                            <Path
                                key={`link-${i}`}
                                d={path}
                                fill={link.resolvedColor}
                                opacity={dimmed ? 0.12 : 0.5}
                                onPress={
                                    focusBehavior !== 'none'
                                        ? () => handleLinkPress(linkKey)
                                        : undefined
                                }
                            />
                        )
                    })}

                    {/* --- Nodes --- */}
                    {positionedNodes.map((node, i) => {
                        const x = nodeX(node.columnIndex)
                        const dimmed = isDimmed(node.id)
                        const isSelected = selectedId === node.id

                        return (
                            <G key={`node-${i}`}>
                                <Rect
                                    x={x}
                                    y={node.y}
                                    width={nodeWidth}
                                    height={Math.max(
                                        node.height,
                                        MIN_NODE_HEIGHT
                                    )}
                                    rx={2}
                                    fill={node.color ?? '#2B7FFF'}
                                    opacity={dimmed ? 0.3 : 1}
                                    stroke={
                                        isSelected
                                            ? (node.color ?? '#2B7FFF')
                                            : 'none'
                                    }
                                    strokeWidth={isSelected ? 2 : 0}
                                    onPress={
                                        focusBehavior !== 'none'
                                            ? () => handleNodePress(node.id)
                                            : undefined
                                    }
                                />
                                {/* Node label */}
                                {node.label ? (
                                    <SvgText
                                        x={
                                            node.columnIndex === 0
                                                ? x - 8
                                                : x + nodeWidth + 8
                                        }
                                        y={
                                            node.y +
                                            Math.max(
                                                node.height,
                                                MIN_NODE_HEIGHT
                                            ) /
                                                2 +
                                            4
                                        }
                                        fontSize={
                                            parseDimension(
                                                ct.xAxis.labels.fontSize as
                                                    | string
                                                    | number
                                            ) ?? 11
                                        }
                                        fontFamily={labelFontFamily}
                                        fontWeight={500}
                                        fill={dimmed ? labelColor : titleColor}
                                        textAnchor={
                                            node.columnIndex === 0
                                                ? 'end'
                                                : 'start'
                                        }
                                    >
                                        {node.label.length > LABEL_MAX_CHARS
                                            ? `${node.label.slice(0, LABEL_MAX_CHARS)}…`
                                            : node.label}
                                    </SvgText>
                                ) : null}
                            </G>
                        )
                    })}
                </Svg>
            </View>
        </ChartContainer>
    )
})

SankeyChart.displayName = 'SankeyChart'
export default SankeyChart
