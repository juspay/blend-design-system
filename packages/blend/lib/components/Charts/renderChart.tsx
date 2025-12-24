import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    AreaChart,
    Area,
} from 'recharts'
import {
    ChartType,
    RenderChartProps,
    TickProps,
    AxisType,
    SankeyData,
} from './types'
import SankeyChartWrapper from './SankeyChartWrapper'
import {
    formatNumber,
    getAxisFormatter,
    lightenHexColor,
    transformScatterData,
    generateConsistentDateTimeTicks,
} from './ChartUtils'
import { parseTimestamp } from './DateTimeFormatter'
import { CustomTooltip } from './CustomTooltip'
import { FOUNDATION_THEME } from '../../tokens'
import Text from '../Text/Text'
import Block from '../Primitives/Block/Block'
import { Button, ButtonType } from '../Button'

export const renderChart = ({
    chartName,
    flattenedData,
    chartType,
    hoveredKey,
    lineKeys,
    colors,
    setHoveredKey,
    data: originalData,
    selectedKeys,
    isSmallScreen = false,
    barsize,
    xAxis,
    yAxis,
    tooltip,
    noData,
    height,
    CustomizedDot,
}: RenderChartProps) => {
    const finalXAxis = {
        label: xAxis?.label,
        showLabel: xAxis?.showLabel ?? false,
        interval: xAxis?.interval,
        show: xAxis?.show ?? true,
        ...xAxis,
    }

    const finalYAxis = {
        label: yAxis?.label,
        showLabel: yAxis?.showLabel ?? false,
        interval: yAxis?.interval,
        show: yAxis?.show ?? true,
        ...yAxis,
    }

    const isDateTimeAxis = finalXAxis.type === AxisType.DATE_TIME

    // Auto-generate consistent ticks for DATE_TIME axes (like Highcharts)
    if (
        isDateTimeAxis &&
        finalXAxis.autoConsistentTicks !== false &&
        !finalXAxis.ticks &&
        originalData.length > 0
    ) {
        // Only apply maxTicks if explicitly set, otherwise let the formatter decide
        const { ticks } = generateConsistentDateTimeTicks(originalData, {
            maxTicks: finalXAxis.maxTicks
                ? isSmallScreen
                    ? Math.max(3, Math.floor(finalXAxis.maxTicks / 2))
                    : finalXAxis.maxTicks
                : undefined, // Don't limit ticks when maxTicks is not explicitly set
            dateOnly: finalXAxis.dateOnly,
            timeOnly: finalXAxis.timeOnly,
            showYear: finalXAxis.showYear,
            useUTC: finalXAxis.useUTC,
            formatString: finalXAxis.formatString,
        })
        finalXAxis.ticks = isDateTimeAxis
            ? ticks.map((tick) => parseTimestamp(tick) ?? Number(tick))
            : ticks

        // Enable smart date/time format by default (alternates between date and time)
        // Only if user hasn't specified dateOnly, timeOnly, or formatString
        if (
            finalXAxis.smartDateTimeFormat === undefined &&
            !finalXAxis.dateOnly &&
            !finalXAxis.timeOnly &&
            !finalXAxis.formatString
        ) {
            finalXAxis.smartDateTimeFormat = true
        }
    }

    // When using custom ticks, set interval to 0 to show all ticks
    if (finalXAxis.ticks && finalXAxis.interval === undefined) {
        finalXAxis.interval = 0
    }

    const getColor = (key: string, chartType: ChartType) => {
        const originalIndex = lineKeys.indexOf(key)
        const baseColor = colors[originalIndex % colors.length]

        if (chartType === ChartType.BAR) {
            return hoveredKey === null
                ? baseColor
                : hoveredKey === key
                  ? baseColor
                  : lightenHexColor(baseColor, 0.3)
        }

        if (hoveredKey && hoveredKey !== key) {
            return lightenHexColor(baseColor, 0.3)
        }

        return baseColor
    }

    const chartConfig = {
        tickFill: FOUNDATION_THEME.colors.gray[400],
        tickFontSize: 14,
        tickFontWeight: FOUNDATION_THEME.font.weight[500],
        axisLine: false,
        tickLine: false,
        labelFill: FOUNDATION_THEME.colors.gray[400],
        labelFontSize: 14,
        labelFontWeight: FOUNDATION_THEME.font.weight[500],
        gridStroke: FOUNDATION_THEME.colors.gray[150],
    }

    const processedData = isDateTimeAxis
        ? flattenedData.map((item) => {
              const numericTimestamp =
                  typeof item.name === 'number'
                      ? item.name
                      : parseTimestamp(item.name)
              return {
                  ...item,
                  __blendTimestamp:
                      numericTimestamp ??
                      (typeof item.name === 'string'
                          ? Number(item.name)
                          : item.name),
              }
          })
        : flattenedData

    const xAxisDataKey = isDateTimeAxis ? '__blendTimestamp' : 'name'

    if (processedData.length === 0) {
        return (
            <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={28}
                data-chart="No-Data"
            >
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    gap={16}
                >
                    {noData?.slot && noData?.slot}
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text
                            variant="body.lg"
                            color={FOUNDATION_THEME.colors.gray[800]}
                            fontWeight={600}
                        >
                            {noData?.title || 'No data available'}
                        </Text>
                        <Text
                            variant="body.md"
                            color={FOUNDATION_THEME.colors.gray[600]}
                            fontWeight={500}
                        >
                            {noData?.subtitle ||
                                'Data will appear here once available'}
                        </Text>
                    </Block>
                </Block>
                {noData?.button && (
                    <Button
                        buttonType={
                            noData.button.buttonType || ButtonType.SECONDARY
                        }
                        text={noData.button.text}
                        onClick={noData.button.onClick}
                        disabled={noData.button.disabled}
                        subType={noData.button.subType}
                        size={noData.button.size}
                        leadingIcon={noData.button.leadingIcon}
                        trailingIcon={noData.button.trailingIcon}
                        loading={noData.button.loading}
                    />
                )}
            </Block>
        )
    }

    switch (chartType) {
        case ChartType.LINE:
            return (
                <LineChart
                    data-chart={chartName}
                    data={processedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: finalYAxis.label && finalYAxis.showLabel ? 20 : 0,
                        bottom:
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show
                                ? 40
                                : 20,
                    }}
                    onMouseLeave={() => setHoveredKey(null)}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke={chartConfig.gridStroke}
                    />
                    <XAxis
                        dataKey={xAxisDataKey}
                        type={isDateTimeAxis ? 'number' : 'category'}
                        scale={isDateTimeAxis ? 'time' : 'auto'}
                        domain={
                            isDateTimeAxis ? ['dataMin', 'dataMax'] : undefined
                        }
                        allowDuplicatedCategory={!isDateTimeAxis}
                        axisLine={false}
                        tickLine={false}
                        interval={finalXAxis.interval}
                        tickMargin={20}
                        ticks={
                            finalXAxis.ticks as (number | string)[] | undefined
                        }
                        tickFormatter={
                            finalXAxis.customTick
                                ? undefined
                                : finalXAxis.tickFormatter
                                  ? finalXAxis.tickFormatter
                                  : finalXAxis.type
                                    ? getAxisFormatter(finalXAxis)
                                    : (value) => formatNumber(value)
                        }
                        tick={
                            (!finalXAxis.show
                                ? false
                                : finalXAxis.customTick
                                  ? finalXAxis.customTick
                                  : {
                                        fill: FOUNDATION_THEME.colors.gray[400],
                                        fontSize: isSmallScreen ? 10 : 12,
                                        fontWeight:
                                            FOUNDATION_THEME.font.weight[500],
                                        // textAnchor: 'end',
                                    }) as TickProps
                        }
                        label={
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show &&
                            !isSmallScreen
                                ? {
                                      value: finalXAxis.label,
                                      position: 'bottom',
                                      offset: 25,
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }
                                : undefined
                        }
                    />

                    {!isSmallScreen && finalYAxis.show && (
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            interval={finalYAxis.interval}
                            tickFormatter={
                                finalYAxis.customTick
                                    ? undefined
                                    : finalYAxis.tickFormatter
                                      ? finalYAxis.tickFormatter
                                      : finalYAxis.type
                                        ? getAxisFormatter(finalYAxis)
                                        : (value) => formatNumber(value)
                            }
                            tick={
                                (finalYAxis.customTick
                                    ? finalYAxis.customTick
                                    : {
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }) as TickProps
                            }
                            label={
                                finalYAxis.label && finalYAxis.showLabel
                                    ? {
                                          value: finalYAxis.label,
                                          angle: -90,
                                          position: 'insideLeft',
                                          style: { textAnchor: 'middle' },
                                          offset: -15,
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }
                                    : undefined
                            }
                        />
                    )}
                    <Tooltip
                        position={tooltip?.position}
                        allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                        cursor={{
                            strokeDasharray: '6 5',
                            stroke: FOUNDATION_THEME.colors.gray[400],
                        }}
                        content={(props) =>
                            CustomTooltip({
                                ...props,
                                hoveredKey,
                                originalData,
                                setHoveredKey,
                                chartType,
                                selectedKeys,
                                xAxis: finalXAxis,
                                yAxis: finalYAxis,
                            })
                        }
                    />
                    {[...lineKeys]
                        .sort((a, b) => {
                            // Put hovered key last so it renders on top
                            if (a === hoveredKey) return 1
                            if (b === hoveredKey) return -1
                            return 0
                        })
                        .map((key) => (
                            <Line
                                key={key}
                                type="linear"
                                dataKey={key}
                                stroke={getColor(key, chartType)}
                                strokeWidth={2}
                                activeDot={{ r: hoveredKey === key ? 4 : 0 }}
                                animationDuration={350}
                                onMouseOver={() => setHoveredKey(key)}
                                dot={CustomizedDot || false}
                            />
                        ))}
                </LineChart>
            )
        case ChartType.BAR:
            return (
                <BarChart
                    data-chart={chartName}
                    data={processedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left:
                            finalYAxis.label && finalYAxis.showLabel ? 30 : 10,
                        bottom:
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show
                                ? 50
                                : 30,
                    }}
                    onMouseLeave={() => setHoveredKey(null)}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke={FOUNDATION_THEME.colors.gray[150]}
                    />
                    <XAxis
                        dataKey={xAxisDataKey}
                        type={isDateTimeAxis ? 'number' : 'category'}
                        scale={isDateTimeAxis ? 'time' : 'auto'}
                        domain={
                            isDateTimeAxis ? ['dataMin', 'dataMax'] : undefined
                        }
                        allowDuplicatedCategory={!isDateTimeAxis}
                        axisLine={false}
                        tickLine={false}
                        interval={finalXAxis.interval}
                        tickMargin={20}
                        ticks={
                            finalXAxis.ticks as (number | string)[] | undefined
                        }
                        tickFormatter={
                            finalXAxis.customTick
                                ? undefined
                                : finalXAxis.tickFormatter
                                  ? finalXAxis.tickFormatter
                                  : finalXAxis.type
                                    ? getAxisFormatter(finalXAxis)
                                    : (value) => formatNumber(value)
                        }
                        tick={
                            (!finalXAxis.show
                                ? false
                                : finalXAxis.customTick
                                  ? finalXAxis.customTick
                                  : {
                                        fill: FOUNDATION_THEME.colors.gray[400],
                                        fontSize: isSmallScreen ? 10 : 12,
                                        fontWeight:
                                            FOUNDATION_THEME.font.weight[500],
                                    }) as TickProps
                        }
                        label={
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show &&
                            !isSmallScreen
                                ? {
                                      value: finalXAxis.label,
                                      position: 'bottom',
                                      offset: 35,
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }
                                : undefined
                        }
                    />
                    {!isSmallScreen && finalYAxis.show && (
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            interval={finalYAxis.interval}
                            tickFormatter={
                                finalYAxis.customTick
                                    ? undefined
                                    : finalYAxis.tickFormatter
                                      ? finalYAxis.tickFormatter
                                      : finalYAxis.type
                                        ? getAxisFormatter(finalYAxis)
                                        : (value) => formatNumber(value)
                            }
                            tick={
                                (finalYAxis.customTick
                                    ? finalYAxis.customTick
                                    : {
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }) as TickProps
                            }
                            label={
                                finalYAxis.label && finalYAxis.showLabel
                                    ? {
                                          value: finalYAxis.label,
                                          angle: -90,
                                          position: 'insideLeft',
                                          style: { textAnchor: 'middle' },
                                          offset: -15,
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }
                                    : undefined
                            }
                        />
                    )}
                    <Tooltip
                        cursor={{ fill: FOUNDATION_THEME.colors.gray[150] }}
                        position={tooltip?.position}
                        allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                        content={(props) =>
                            CustomTooltip({
                                ...props,
                                hoveredKey,
                                originalData,
                                setHoveredKey,
                                chartType,
                                selectedKeys,
                            })
                        }
                    />
                    {lineKeys.map((key) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            fill={getColor(key, chartType)}
                            animationDuration={350}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={barsize}
                        />
                    ))}
                </BarChart>
            )

        case ChartType.PIE: {
            const keysToInclude =
                selectedKeys.length > 0
                    ? lineKeys.filter((key) => selectedKeys.includes(key))
                    : lineKeys

            const pieData = keysToInclude.map((key) => ({
                name: key,
                value: originalData[0].data[key]?.primary.val || 0,
            }))

            return (
                <PieChart
                    data-chart={chartName}
                    margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                >
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius="100%"
                        innerRadius="70%"
                        paddingAngle={0}
                        fill={colors[0]}
                        dataKey="value"
                        nameKey="name"
                        label={false}
                        animationDuration={350}
                        onMouseEnter={(_, index) =>
                            setHoveredKey(pieData[index].name)
                        }
                        onMouseLeave={() => setHoveredKey(null)}
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getColor(entry.name, chartType)}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        position={tooltip?.position}
                        allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                        content={(props) =>
                            CustomTooltip({
                                ...props,
                                hoveredKey,
                                originalData,
                                setHoveredKey,
                                chartType: ChartType.PIE,
                                selectedKeys,
                            })
                        }
                    />
                </PieChart>
            )
        }

        case ChartType.SCATTER: {
            const scatterData = transformScatterData(originalData, selectedKeys)

            // Group scatter points by series
            const seriesByKey: {
                [key: string]: Array<{ x: number; y: number; name: string }>
            } = {}
            scatterData.forEach((point) => {
                if (!seriesByKey[point.seriesKey]) {
                    seriesByKey[point.seriesKey] = []
                }
                seriesByKey[point.seriesKey].push({
                    x: point.x,
                    y: point.y,
                    name: point.name,
                })
            })

            return (
                <ScatterChart
                    data={scatterData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: isSmallScreen
                            ? 20
                            : finalYAxis.label && finalYAxis.showLabel
                              ? 30
                              : 10,
                        bottom: isSmallScreen
                            ? 40
                            : finalXAxis.label &&
                                finalXAxis.showLabel &&
                                finalXAxis.show
                              ? 50
                              : 30,
                    }}
                    onMouseLeave={() => setHoveredKey(null)}
                >
                    <XAxis
                        type="number"
                        dataKey="x"
                        axisLine={false}
                        tickLine={false}
                        interval={finalXAxis.interval}
                        tickMargin={20}
                        ticks={finalXAxis.ticks}
                        tickFormatter={
                            finalXAxis.customTick
                                ? undefined
                                : finalXAxis.tickFormatter
                                  ? finalXAxis.tickFormatter
                                  : finalXAxis.type
                                    ? getAxisFormatter(finalXAxis)
                                    : (value) => formatNumber(value)
                        }
                        tick={
                            (!finalXAxis.show
                                ? false
                                : finalXAxis.customTick
                                  ? finalXAxis.customTick
                                  : {
                                        fill: FOUNDATION_THEME.colors.gray[400],
                                        fontSize: isSmallScreen ? 10 : 12,
                                        fontWeight:
                                            FOUNDATION_THEME.font.weight[500],
                                    }) as TickProps
                        }
                        label={
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show &&
                            !isSmallScreen
                                ? {
                                      value: finalXAxis.label,
                                      position: 'bottom',
                                      offset: 35,
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }
                                : undefined
                        }
                    />
                    <CartesianGrid
                        vertical={false}
                        stroke={chartConfig.gridStroke}
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        axisLine={false}
                        tickLine={false}
                        interval={finalYAxis.interval}
                        hide={isSmallScreen}
                        tickFormatter={
                            finalYAxis.customTick
                                ? undefined
                                : finalYAxis.tickFormatter
                                  ? finalYAxis.tickFormatter
                                  : finalYAxis.type
                                    ? getAxisFormatter(finalYAxis)
                                    : (value) => formatNumber(value)
                        }
                        tick={
                            (finalYAxis.customTick
                                ? finalYAxis.customTick
                                : {
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }) as TickProps
                        }
                        label={
                            finalYAxis.label &&
                            finalYAxis.showLabel &&
                            !isSmallScreen
                                ? {
                                      value: finalYAxis.label,
                                      angle: -90,
                                      position: 'insideLeft',
                                      style: { textAnchor: 'middle' },
                                      offset: -15,
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }
                                : undefined
                        }
                    />
                    <Tooltip
                        position={tooltip?.position}
                        allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                        cursor={{
                            strokeDasharray: '6 5',
                            stroke: FOUNDATION_THEME.colors.gray[400],
                        }}
                        content={(props) =>
                            CustomTooltip({
                                ...props,
                                hoveredKey,
                                originalData,
                                setHoveredKey,
                                chartType: ChartType.SCATTER,
                                selectedKeys,
                                xAxis: finalXAxis,
                                yAxis: finalYAxis,
                            })
                        }
                    />
                    {Object.keys(seriesByKey).map((key) => (
                        <Scatter
                            key={key}
                            name={key}
                            data={seriesByKey[key]}
                            fill={getColor(key, chartType)}
                            animationDuration={350}
                            onMouseOver={() => setHoveredKey(key)}
                        />
                    ))}
                </ScatterChart>
            )
        }

        case ChartType.SANKEY: {
            const sankeyData = originalData[0]?.data?.sankeyData
                ?.primary as unknown as SankeyData

            if (!sankeyData || !sankeyData.nodes || !sankeyData.links) {
                return (
                    <Block
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        gap={28}
                        data-chart="No-Data"
                    >
                        <Text
                            variant="body.lg"
                            color={FOUNDATION_THEME.colors.gray[800]}
                            fontWeight={600}
                        >
                            Invalid Sankey data format
                        </Text>
                        <Text
                            variant="body.md"
                            color={FOUNDATION_THEME.colors.gray[600]}
                            fontWeight={500}
                        >
                            Please provide nodes and links
                        </Text>
                    </Block>
                )
            }

            // Transform data to handle both numeric indices and string IDs
            const nodeMap = new Map<string, number>()
            sankeyData.nodes.forEach((node, index) => {
                const nodeId = node.id || node.name || index.toString()
                nodeMap.set(nodeId, index)
            })

            // Extract node and link colors if provided
            const nodeColors = sankeyData.nodes
                .map((node) => node.color)
                .filter(Boolean) as string[]
            const linkColors = sankeyData.links
                .map((link) => link.color)
                .filter(Boolean) as string[]

            // Transform links to use numeric indices if they're strings
            const transformedData = {
                nodes: sankeyData.nodes.map((node) => ({
                    name: node.name,
                })),
                links: sankeyData.links.map((link) => {
                    const sourceIndex =
                        typeof link.source === 'number'
                            ? link.source
                            : (nodeMap.get(link.source as string) ?? 0)

                    const targetIndex =
                        typeof link.target === 'number'
                            ? link.target
                            : (nodeMap.get(link.target as string) ?? 0)

                    return {
                        source: sourceIndex,
                        target: targetIndex,
                        value: link.value,
                        color: link.color,
                        hoverColor: link.hoverColor,
                        // Add source and target names for tooltip
                        sourceName: sankeyData.nodes[sourceIndex]?.name,
                        targetName: sankeyData.nodes[targetIndex]?.name,
                    }
                }),
            }

            const sankeyWidth = isSmallScreen ? 800 : 1200
            const defaultHeight = isSmallScreen ? 400 : 600
            const sankeyHeight =
                typeof height === 'number' ? height : defaultHeight

            return (
                <SankeyChartWrapper
                    chartName={chartName}
                    transformedData={transformedData}
                    nodeColors={nodeColors}
                    linkColors={linkColors}
                    sankeyWidth={sankeyWidth}
                    sankeyHeight={sankeyHeight}
                    isSmallScreen={isSmallScreen}
                />
            )
        }

        case ChartType.AREA: {
            return (
                <AreaChart
                    data-chart={chartName}
                    data={processedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left:
                            finalYAxis.label && finalYAxis.showLabel ? 30 : 10,
                        bottom:
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show
                                ? 50
                                : 30,
                    }}
                    onMouseLeave={() => setHoveredKey(null)}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke={FOUNDATION_THEME.colors.gray[150]}
                    />
                    <XAxis
                        dataKey={xAxisDataKey}
                        type={isDateTimeAxis ? 'number' : 'category'}
                        scale={isDateTimeAxis ? 'time' : 'auto'}
                        domain={
                            isDateTimeAxis ? ['dataMin', 'dataMax'] : undefined
                        }
                        allowDuplicatedCategory={!isDateTimeAxis}
                        axisLine={false}
                        tickLine={false}
                        interval={finalXAxis.interval}
                        tickMargin={20}
                        ticks={
                            finalXAxis.ticks as (number | string)[] | undefined
                        }
                        tickFormatter={
                            finalXAxis.customTick
                                ? undefined
                                : finalXAxis.tickFormatter
                                  ? finalXAxis.tickFormatter
                                  : finalXAxis.type
                                    ? getAxisFormatter(finalXAxis)
                                    : (value) => formatNumber(value)
                        }
                        tick={
                            (!finalXAxis.show
                                ? false
                                : finalXAxis.customTick
                                  ? finalXAxis.customTick
                                  : {
                                        fill: FOUNDATION_THEME.colors.gray[400],
                                        fontSize: isSmallScreen ? 10 : 12,
                                        fontWeight:
                                            FOUNDATION_THEME.font.weight[500],
                                    }) as TickProps
                        }
                        label={
                            finalXAxis.label &&
                            finalXAxis.showLabel &&
                            finalXAxis.show &&
                            !isSmallScreen
                                ? {
                                      value: finalXAxis.label,
                                      position: 'bottom',
                                      offset: 35,
                                      fill: FOUNDATION_THEME.colors.gray[400],
                                      fontSize: 12,
                                      fontWeight:
                                          FOUNDATION_THEME.font.weight[500],
                                  }
                                : undefined
                        }
                    />
                    {!isSmallScreen && finalYAxis.show && (
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            interval={finalYAxis.interval}
                            tickFormatter={
                                finalYAxis.customTick
                                    ? undefined
                                    : finalYAxis.tickFormatter
                                      ? finalYAxis.tickFormatter
                                      : finalYAxis.type
                                        ? getAxisFormatter(finalYAxis)
                                        : (value) => formatNumber(value)
                            }
                            tick={
                                (finalYAxis.customTick
                                    ? finalYAxis.customTick
                                    : {
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }) as TickProps
                            }
                            label={
                                finalYAxis.label && finalYAxis.showLabel
                                    ? {
                                          value: finalYAxis.label,
                                          angle: -90,
                                          position: 'insideLeft',
                                          style: { textAnchor: 'middle' },
                                          offset: -15,
                                          fill: FOUNDATION_THEME.colors
                                              .gray[400],
                                          fontSize: 12,
                                          fontWeight:
                                              FOUNDATION_THEME.font.weight[500],
                                      }
                                    : undefined
                            }
                        />
                    )}
                    <Tooltip
                        cursor={{ fill: FOUNDATION_THEME.colors.gray[150] }}
                        position={tooltip?.position}
                        allowEscapeViewBox={tooltip?.allowEscapeViewBox}
                        content={(props) =>
                            CustomTooltip({
                                ...props,
                                hoveredKey,
                                originalData,
                                setHoveredKey,
                                chartType,
                                selectedKeys,
                            })
                        }
                    />
                    {lineKeys.map((key) => (
                        <Area
                            key={key}
                            dataKey={key}
                            fill={getColor(key, chartType)}
                            stroke={getColor(key, chartType)}
                            strokeWidth={2}
                            animationDuration={350}
                            type="linear"
                        />
                    ))}
                </AreaChart>
            )
        }

        default:
            return <div>Unsupported chart type</div>
    }
}
