import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import {
    ChartType,
    FunnelConfig,
    NewNestedDataPoint,
    TooltipContentProps,
    TooltipConfig,
    XAxisConfig,
    YAxisConfig,
} from './types'
import { formatNumber } from './ChartUtils'
import { CustomTooltip } from './CustomTooltip'
import { DEFAULT_COLORS } from './utils'
import { FOUNDATION_THEME } from '../../tokens'

const FUNNEL_MARGIN = 10
const FUNNEL_LABEL_OFFSET = 8
const FUNNEL_LABEL_MARGIN = 180
const FUNNEL_COMPACT_LABEL_MARGIN = 136
const FUNNEL_NO_LABEL_MARGIN = 30
const FUNNEL_AXIS_WIDTH = 110
const FUNNEL_COMPACT_AXIS_WIDTH = 90

export type FunnelStage = {
    name: string
    value: number
    color: string
    dropOffPercentage: number
    seriesKey: string
}

export const calculateFunnelDropOff = (
    value: number,
    baseValue: number
): number => {
    if (
        !Number.isFinite(value) ||
        !Number.isFinite(baseValue) ||
        baseValue <= 0
    ) {
        return 0
    }

    return ((baseValue - value) / baseValue) * 100
}

export const getFunnelStages = (
    data: NewNestedDataPoint[],
    selectedKeys: string[],
    colors: { key: string; color: string }[],
    percentageBase: FunnelConfig['percentageBase'] = 'previous'
): FunnelStage[] => {
    const seriesKey =
        selectedKeys.find((key) =>
            data.some((dataPoint) => dataPoint.data[key])
        ) || Object.keys(data[0]?.data || {})[0]

    if (!seriesKey) return []

    const values = data.map((dataPoint) => {
        const value = dataPoint.data[seriesKey]?.primary.val
        return typeof value === 'number' && Number.isFinite(value) ? value : 0
    })
    const firstValue = values[0] ?? 0

    return data.map((dataPoint, index) => {
        const value = values[index]
        const baseValue =
            percentageBase === 'first'
                ? firstValue
                : index === 0
                  ? value
                  : values[index - 1]
        const stageColor =
            colors.find((color) => color.key === dataPoint.name)?.color ||
            colors[index % colors.length]?.color ||
            DEFAULT_COLORS[index % DEFAULT_COLORS.length].color

        return {
            name: dataPoint.name,
            value,
            color: stageColor,
            dropOffPercentage: calculateFunnelDropOff(value, baseValue),
            seriesKey,
        }
    })
}

const formatFunnelPercentage = (percentage: number): string => {
    const rounded = Math.round(percentage * 10) / 10
    return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}%`
}

type FunnelViewBox = {
    x?: number
    y?: number
    width?: number
    height?: number
}

const FunnelLabel = ({
    index,
    viewBox,
    stages,
    isSmallScreen,
}: {
    index?: number
    viewBox?: FunnelViewBox
    stages: FunnelStage[]
    isSmallScreen: boolean
}) => {
    const stage = index === undefined ? undefined : stages[index]
    if (!stage || !viewBox) return null

    const x = (viewBox.x || 0) + (viewBox.width || 0) + FUNNEL_LABEL_OFFSET
    const y = (viewBox.y || 0) + (viewBox.height || 0) / 2

    return (
        <text
            x={x}
            y={y}
            fill={FOUNDATION_THEME.colors.gray[700]}
            fontSize={
                isSmallScreen
                    ? FOUNDATION_THEME.font.size.body.xs.fontSize
                    : FOUNDATION_THEME.font.size.body.sm.fontSize
            }
            fontWeight={FOUNDATION_THEME.font.weight[500]}
            dominantBaseline="central"
        >
            {`${formatNumber(stage.value)} · ${formatFunnelPercentage(stage.dropOffPercentage)} drop-off`}
        </text>
    )
}

export type FunnelChartProps = {
    data: NewNestedDataPoint[]
    selectedKeys: string[]
    colors: { key: string; color: string }[]
    funnelConfig?: FunnelConfig
    barsize?: number
    tooltip?: TooltipConfig
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    isSmallScreen?: boolean
    hoveredKey: string | null
    setHoveredKey: (key: string | null) => void
}

export const FunnelChart = ({
    data,
    selectedKeys,
    colors,
    funnelConfig,
    barsize,
    tooltip,
    xAxis,
    yAxis,
    isSmallScreen = false,
    hoveredKey,
    setHoveredKey,
}: FunnelChartProps) => {
    const stages = getFunnelStages(
        data,
        selectedKeys,
        colors,
        funnelConfig?.percentageBase
    )
    const showLabels = funnelConfig?.showLabels ?? true

    if (stages.length === 0) return null

    return (
        <BarChart
            data-chart={ChartType.FUNNEL}
            data={stages}
            layout="vertical"
            margin={{
                top: FUNNEL_MARGIN,
                right: showLabels
                    ? isSmallScreen
                        ? FUNNEL_COMPACT_LABEL_MARGIN
                        : FUNNEL_LABEL_MARGIN
                    : FUNNEL_NO_LABEL_MARGIN,
                left: FUNNEL_MARGIN,
                bottom: FUNNEL_MARGIN,
            }}
            onMouseLeave={() => setHoveredKey(null)}
        >
            <CartesianGrid
                horizontal={false}
                stroke={FOUNDATION_THEME.colors.gray[150]}
            />
            <XAxis type="number" dataKey="value" domain={[0, 'dataMax']} hide />
            <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                width={
                    isSmallScreen
                        ? FUNNEL_COMPACT_AXIS_WIDTH
                        : FUNNEL_AXIS_WIDTH
                }
                tick={{
                    fill: FOUNDATION_THEME.colors.gray[400],
                    fontSize: 12,
                    fontWeight: FOUNDATION_THEME.font.weight[500],
                }}
            />
            <Tooltip
                position={tooltip?.position}
                allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                cursor={{ fill: FOUNDATION_THEME.colors.gray[150] }}
                content={(props) => {
                    const mergedProps: TooltipContentProps = {
                        ...props,
                        originalData: data,
                        chartType: ChartType.FUNNEL,
                        selectedKeys,
                        xAxis,
                        yAxis,
                    }

                    return tooltip?.content ? (
                        tooltip.content(mergedProps)
                    ) : (
                        <CustomTooltip
                            {...mergedProps}
                            hoveredKey={hoveredKey}
                            setHoveredKey={setHoveredKey}
                            formatter={tooltip?.formatter}
                            labelFormatter={tooltip?.labelFormatter}
                        />
                    )
                }}
            />
            <Bar
                dataKey="value"
                radius={[0, 4, 4, 0]}
                maxBarSize={barsize}
                animationDuration={350}
            >
                {stages.map((stage) => (
                    <Cell key={stage.name} fill={stage.color} />
                ))}
                {showLabels && (
                    <LabelList
                        dataKey="value"
                        content={(props) => {
                            const viewBox =
                                props.viewBox && 'x' in props.viewBox
                                    ? props.viewBox
                                    : undefined

                            return (
                                <FunnelLabel
                                    index={props.index}
                                    viewBox={viewBox}
                                    stages={stages}
                                    isSmallScreen={isSmallScreen}
                                />
                            )
                        }}
                    />
                )}
            </Bar>
        </BarChart>
    )
}

export default FunnelChart
