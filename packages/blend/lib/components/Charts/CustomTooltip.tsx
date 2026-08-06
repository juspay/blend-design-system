import {
    AxisType,
    ChartType,
    CustomTooltipProps,
    NewNestedDataPoint,
    TooltipFormatter,
    XAxisConfig,
    YAxisConfig,
} from './types'
import {
    formatNumber,
    getAxisFormatter,
    createDateTimeFormatter,
} from './ChartUtils'
import { parseTimestamp } from './DateTimeFormatter'
import Block from '../../components/Primitives/Block/Block'
import Text from '../../components/Text/Text'
import { ReactNode, useEffect, useRef } from 'react'

import {
    Payload,
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent'
import { FOUNDATION_THEME } from '../../tokens'

interface AuxItem {
    label: string
    val: string | number
    type?: AxisType
    dateOnly?: boolean
    smart?: boolean
    timeZone?: string
    hour12?: boolean
    key?: string
}

const formatTooltipLabel = (
    label: string | number,
    xAxis?: XAxisConfig
): string => {
    if (!xAxis) return String(label)

    if (xAxis.tickFormatter) {
        return xAxis.tickFormatter(label)
    }

    if (xAxis.type === AxisType.DATE_TIME) {
        const tooltipFormatter = createDateTimeFormatter({
            useUTC: xAxis.useUTC ?? true,
            smartDateTimeFormat: false,
            showYear: true,
            dateOnly: false,
            timeOnly: false,
            formatString: xAxis.formatString,
        })
        return tooltipFormatter(label)
    }

    if (xAxis.type) {
        return getAxisFormatter(xAxis)(label)
    }

    return String(label)
}

const formatTooltipValue = (
    value: string | number,
    yAxis?: YAxisConfig
): string => {
    if (!yAxis) {
        return typeof value === 'number' ? formatNumber(value) : String(value)
    }

    if (yAxis.tickFormatter) {
        return yAxis.tickFormatter(value)
    }

    if (yAxis.type) {
        return getAxisFormatter(yAxis)(value)
    }

    return typeof value === 'number' ? formatNumber(value) : String(value)
}

const formatAuxTooltipValue = (
    value: string | number,
    auxItem: AuxItem
): string => {
    if (auxItem.type) {
        return getAxisFormatter(auxItem)(value)
    }

    return typeof value === 'number' ? formatNumber(value) : String(value)
}

export const findDataPointByLabel = (
    originalData: NewNestedDataPoint[],
    label: string | number
) => {
    const labelAsString = String(label)
    const directMatch = originalData.find((item) => item.name === labelAsString)
    if (directMatch) {
        return directMatch
    }

    const labelTimestamp =
        typeof label === 'number' ? label : parseTimestamp(label)

    if (labelTimestamp == null) {
        return undefined
    }

    return originalData.find((item) => {
        const itemTimestamp = parseTimestamp(item.name)
        return itemTimestamp !== null && itemTimestamp === labelTimestamp
    })
}

const getDataIndex = (
    originalData: NewNestedDataPoint[],
    label: string | number
): number => {
    const dataPoint = findDataPointByLabel(originalData, label)
    return dataPoint ? originalData.indexOf(dataPoint) : -1
}

const formatTooltipHeader = (
    label: string | number,
    xAxis: XAxisConfig | undefined,
    labelFormatter: CustomTooltipProps['labelFormatter']
): ReactNode => {
    return labelFormatter
        ? labelFormatter(label)
        : formatTooltipLabel(label, xAxis)
}

const formatPrimaryTooltipValue = ({
    value,
    seriesName,
    dataIndex,
    color,
    payload,
    yAxis,
    formatter,
}: {
    value: string | number
    seriesName: string | number
    dataIndex: number
    color: string | undefined
    payload: unknown
    yAxis?: YAxisConfig
    formatter?: TooltipFormatter
}): ReactNode => {
    if (!formatter) return formatTooltipValue(value, yAxis)

    return formatter({
        seriesName,
        value,
        dataIndex,
        color: color || '#AD46FF',
        payload,
    })
}

export const getRelevantData = (
    originalData: NewNestedDataPoint[],
    label: string | number,
    hoveredKey: string
) => {
    const currentDataPoint = findDataPointByLabel(originalData, label)

    if (
        !currentDataPoint ||
        !currentDataPoint.data ||
        !currentDataPoint.data[hoveredKey]
    ) {
        return null
    }

    return currentDataPoint.data[hoveredKey]
}

export const CustomTooltip = ({
    active,
    payload,
    label,
    hoveredKey,
    originalData,
    setHoveredKey,
    chartType,
    selectedKeys,
    xAxis,
    yAxis,
    formatter,
    labelFormatter,
}: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) {
        return null
    }

    const getColor = (key: string) => {
        const payloadItem = payload.find(
            (item) =>
                String(item.dataKey) === key || item.payload?.seriesKey === key
        )
        return payloadItem?.color || payloadItem?.payload?.color || '#AD46FF'
    }

    return (
        <Block
            backgroundColor={FOUNDATION_THEME.colors.gray[0]}
            boxShadow={FOUNDATION_THEME.shadows.lg}
            display="flex"
            flexDirection="column"
            gap={12}
            borderRadius={FOUNDATION_THEME.border.radius[8]}
            padding={12}
            paddingLeft={10}
            border={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
            minWidth={220}
            maxWidth={300}
            // className="debug"
        >
            {chartType == ChartType.LINE && (
                <LineChartTooltip
                    active={active}
                    payload={payload}
                    selectedKeys={selectedKeys}
                    setHoveredKey={setHoveredKey}
                    originalData={originalData}
                    hoveredKey={hoveredKey}
                    label={label}
                    getColor={getColor}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    formatter={formatter}
                    labelFormatter={labelFormatter}
                />
            )}
            {(chartType === ChartType.BAR ||
                chartType === ChartType.AREA ||
                chartType === ChartType.LINE_BAR ||
                chartType === ChartType.FUNNEL) && (
                <BarChartTooltip
                    originalData={originalData}
                    label={label}
                    payload={payload}
                    getColor={getColor}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    formatter={formatter}
                    labelFormatter={labelFormatter}
                />
            )}
            {chartType === ChartType.PIE && (
                <PieChartTooltip
                    active={active}
                    payload={payload}
                    selectedKeys={selectedKeys}
                    setHoveredKey={setHoveredKey}
                    originalData={originalData}
                    hoveredKey={hoveredKey}
                    label={label}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    formatter={formatter}
                    labelFormatter={labelFormatter}
                />
            )}
            {chartType === ChartType.SCATTER && (
                <ScatterChartTooltip
                    active={active}
                    payload={payload}
                    selectedKeys={selectedKeys}
                    originalData={originalData}
                    hoveredKey={hoveredKey}
                    xAxis={xAxis}
                    yAxis={yAxis}
                    formatter={formatter}
                    labelFormatter={labelFormatter}
                />
            )}
        </Block>
    )
}

const BarChartTooltip = ({
    originalData,
    label,
    payload,
    getColor,
    xAxis,
    yAxis,
    formatter,
    labelFormatter,
}: {
    originalData: NewNestedDataPoint[]
    label: string | number
    payload: Payload<ValueType, NameType>[]
    getColor: (key: string) => string | undefined
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    formatter?: TooltipFormatter
    labelFormatter?: CustomTooltipProps['labelFormatter']
}) => {
    const relevantData = findDataPointByLabel(originalData, label)?.data
    const dataIndex = getDataIndex(originalData, label)

    // Collect all aux data from all DataPoints in relevantData, attaching the key to each aux item
    const auxData = relevantData
        ? Object.entries(relevantData).flatMap(([key, dataPoint]) =>
              Array.isArray(dataPoint?.aux) && dataPoint.aux.length > 0
                  ? dataPoint.aux.map((auxItem: AuxItem) => ({
                        ...auxItem,
                        key,
                    }))
                  : []
          )
        : undefined

    return (
        <>
            <Block display="flex" flexDirection="column">
                <Text
                    fontSize={
                        FOUNDATION_THEME.font.size.body.md.fontSize as number
                    }
                    fontWeight={FOUNDATION_THEME.font.weight[600]}
                    color={FOUNDATION_THEME.colors.gray[900]}
                >
                    {formatTooltipHeader(label, xAxis, labelFormatter)}
                </Text>
            </Block>

            <Block
                display="flex"
                flexDirection="column"
                marginTop={FOUNDATION_THEME.unit[12]}
                gap={FOUNDATION_THEME.unit[12]}
            >
                {relevantData &&
                    Object.keys(relevantData)
                        .filter((key) => key !== 'name')
                        .map((key, index) => {
                            const payloadItem = payload.find(
                                (item) =>
                                    String(item.dataKey) === key ||
                                    item.payload?.seriesKey === key
                            )

                            return (
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    key={`bar-${index}`}
                                    width="100%"
                                >
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[8]}
                                    >
                                        <Block
                                            backgroundColor={
                                                getColor(key) || '#AD46FF'
                                            }
                                            width={FOUNDATION_THEME.unit[4]}
                                            height={FOUNDATION_THEME.unit[16]}
                                            borderRadius={
                                                FOUNDATION_THEME.border
                                                    .radius[8]
                                            }
                                        />
                                        <Text
                                            fontSize={
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize as number
                                            }
                                            fontWeight={
                                                FOUNDATION_THEME.font
                                                    .weight[500]
                                            }
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                        >
                                            {key}
                                        </Text>
                                    </Block>
                                    <Block>
                                        <Text
                                            fontSize={
                                                FOUNDATION_THEME.font.size.body
                                                    .sm.fontSize as number
                                            }
                                            fontWeight={
                                                FOUNDATION_THEME.font
                                                    .weight[600]
                                            }
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[900]
                                            }
                                            truncate={!formatter}
                                        >
                                            {formatPrimaryTooltipValue({
                                                value: relevantData[key].primary
                                                    .val,
                                                seriesName:
                                                    payloadItem?.payload
                                                        ?.seriesKey ||
                                                    payloadItem?.name ||
                                                    key,
                                                dataIndex,
                                                color:
                                                    payloadItem?.color ||
                                                    getColor(key),
                                                payload:
                                                    payloadItem?.payload ||
                                                    relevantData[key],
                                                yAxis,
                                                formatter,
                                            })}
                                        </Text>
                                    </Block>
                                </Block>
                            )
                        })}
            </Block>
            {auxData && auxData.length > 0 && (
                <Block
                    gap={FOUNDATION_THEME.unit[4]}
                    paddingTop={FOUNDATION_THEME.unit[12]}
                    paddingLeft={FOUNDATION_THEME.unit[8]}
                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                    display="flex"
                    flexDirection="column"
                >
                    {auxData.map((auxItem: AuxItem, index: number) => (
                        <Block
                            key={`aux-${index}`}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <Text
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.sm
                                        .fontSize as number
                                }
                                color={FOUNDATION_THEME.colors.gray[500]}
                                truncate={true}
                            >
                                {auxData.length > 1
                                    ? `${auxItem.label} (${auxItem.key})`
                                    : auxItem.label}
                            </Text>
                            <Text
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.sm
                                        .fontSize as number
                                }
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                {formatAuxTooltipValue(auxItem.val, auxItem)}
                            </Text>
                        </Block>
                    ))}
                </Block>
            )}
        </>
    )
}

const LineChartTooltip = ({
    originalData,
    hoveredKey,
    label,
    getColor,
    active,
    payload,
    selectedKeys,
    setHoveredKey,
    xAxis,
    yAxis,
    formatter,
    labelFormatter,
}: {
    originalData: NewNestedDataPoint[]
    hoveredKey: string | null
    label: string
    getColor: (key: string) => string | undefined
    active: boolean
    payload: Payload<ValueType, NameType>[]
    selectedKeys: string[]
    setHoveredKey: (key: string) => void
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    formatter?: TooltipFormatter
    labelFormatter?: CustomTooltipProps['labelFormatter']
}) => {
    const updateScheduledRef = useRef(false)

    useEffect(() => {
        if (active && hoveredKey == null && !updateScheduledRef.current) {
            updateScheduledRef.current = true
            queueMicrotask(() => {
                updateScheduledRef.current = false
                if (selectedKeys.length > 0) {
                    setHoveredKey(selectedKeys[0])
                } else if (originalData.length > 0 && originalData[0].data) {
                    setHoveredKey(Object.keys(originalData[0].data)[0])
                }
            })
        } else if (!active) {
            updateScheduledRef.current = false
        }
    }, [active, hoveredKey, selectedKeys, setHoveredKey])

    if (!active || !payload || !payload.length || !hoveredKey || !label) {
        return null
    }

    const relevantData = getRelevantData(originalData, label, hoveredKey)
    if (!relevantData) {
        return null
    }
    return (
        <>
            <Block position="relative" paddingLeft={8}>
                <Block
                    backgroundColor={getColor(hoveredKey) || '#AD46FF'}
                    position="absolute"
                    top={FOUNDATION_THEME.unit[2]}
                    left={0}
                    width={FOUNDATION_THEME.unit[4]}
                    height={FOUNDATION_THEME.unit[16]}
                    borderRadius={FOUNDATION_THEME.border.radius[8]}
                    transition="all 75ms"
                />
                <Block
                    display="flex"
                    flexDirection="column"
                    style={{ wordBreak: 'break-word' }}
                >
                    <Text
                        fontSize={14}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    >
                        {hoveredKey}
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[500]}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    >
                        {formatTooltipHeader(label, xAxis, labelFormatter)}
                    </Text>
                </Block>
            </Block>

            <Block display="flex" flexDirection="column" paddingLeft={8}>
                <Text
                    fontSize={12}
                    fontWeight={FOUNDATION_THEME.font.weight[500]}
                    color={FOUNDATION_THEME.colors.gray[400]}
                >
                    {relevantData.primary.label}
                </Text>
                <Text
                    fontSize={12}
                    fontWeight={FOUNDATION_THEME.font.weight[600]}
                    color={FOUNDATION_THEME.colors.gray[900]}
                    truncate={!formatter}
                >
                    {formatPrimaryTooltipValue({
                        value: relevantData.primary.val,
                        seriesName: hoveredKey,
                        dataIndex: getDataIndex(originalData, label),
                        color: getColor(hoveredKey),
                        payload:
                            payload.find(
                                (item) => String(item.dataKey) === hoveredKey
                            )?.payload || relevantData,
                        yAxis,
                        formatter,
                    })}
                </Text>
            </Block>

            {relevantData.aux && relevantData.aux.length > 0 && (
                <Block
                    gap={FOUNDATION_THEME.unit[4]}
                    paddingTop={FOUNDATION_THEME.unit[12]}
                    paddingLeft={FOUNDATION_THEME.unit[8]}
                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                    display="flex"
                    flexDirection="column"
                >
                    {relevantData.aux.map((auxItem: AuxItem, index: number) => (
                        <Block
                            key={`aux-${index}`}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <Text
                                fontSize={12}
                                color={FOUNDATION_THEME.colors.gray[500]}
                                truncate={true}
                            >
                                {auxItem.label}
                            </Text>
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                {formatAuxTooltipValue(auxItem.val, auxItem)}
                            </Text>
                        </Block>
                    ))}
                </Block>
            )}
            {relevantData.error && (
                <Block
                    display="flex"
                    flexDirection="column"
                    gap={FOUNDATION_THEME.unit[8]}
                    padding={FOUNDATION_THEME.unit[12]}
                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                >
                    <Text
                        fontSize={12}
                        color={FOUNDATION_THEME.colors.gray[500]}
                        fontWeight={FOUNDATION_THEME.font.weight[400]}
                    >
                        {relevantData.error.title}
                    </Text>
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={FOUNDATION_THEME.unit[8]}
                    >
                        {relevantData.error.errorData?.map(
                            (
                                errorItem: { label: string; value: string },
                                index: number
                            ) => (
                                <Block
                                    key={`error-${index}`}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Block
                                        display="flex"
                                        alignItems="center"
                                        gap={FOUNDATION_THEME.unit[6]}
                                    >
                                        <Block
                                            backgroundColor={
                                                index === 0
                                                    ? FOUNDATION_THEME.colors
                                                          .red[500]
                                                    : FOUNDATION_THEME.colors
                                                          .orange[400]
                                            }
                                            width={FOUNDATION_THEME.unit[4]}
                                            height={FOUNDATION_THEME.unit[16]}
                                            borderRadius={
                                                FOUNDATION_THEME.border
                                                    .radius[8]
                                            }
                                            transition="all 75ms"
                                        />
                                        <Text
                                            fontSize={12}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[500]
                                            }
                                            fontWeight={
                                                FOUNDATION_THEME.font
                                                    .weight[400]
                                            }
                                        >
                                            {errorItem.label}
                                        </Text>
                                    </Block>

                                    <Text
                                        fontSize={16}
                                        color={
                                            FOUNDATION_THEME.colors.gray[900]
                                        }
                                        fontWeight={
                                            FOUNDATION_THEME.font.weight[600]
                                        }
                                    >
                                        {errorItem.value}
                                    </Text>
                                </Block>
                            )
                        )}
                    </Block>
                </Block>
            )}
        </>
    )
}

const PieChartTooltip = ({
    originalData,
    hoveredKey,
    active,
    payload,
    selectedKeys,
    setHoveredKey,
    xAxis,
    yAxis,
    label,
    formatter,
    labelFormatter,
}: {
    originalData: NewNestedDataPoint[]
    hoveredKey: string | null
    active: boolean
    payload: Payload<ValueType, NameType>[]
    selectedKeys: string[]
    setHoveredKey: (key: string) => void
    label: string | number
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    formatter?: TooltipFormatter
    labelFormatter?: CustomTooltipProps['labelFormatter']
}) => {
    const updateScheduledRef = useRef(false)

    useEffect(() => {
        if (active && hoveredKey == null && !updateScheduledRef.current) {
            updateScheduledRef.current = true
            queueMicrotask(() => {
                updateScheduledRef.current = false
                if (selectedKeys.length > 0) {
                    setHoveredKey(selectedKeys[0])
                } else if (originalData.length > 0 && originalData[0].data) {
                    setHoveredKey(Object.keys(originalData[0].data)[0])
                }
            })
        } else if (!active) {
            updateScheduledRef.current = false
        }
    }, [active, hoveredKey, selectedKeys, setHoveredKey])

    if (!active || !payload || !payload.length || !hoveredKey) {
        return null
    }

    let name = payload[0].name as string
    if (!name) name = Object.keys(originalData[0].data)[0]

    const data = originalData[0].data[name]

    return (
        <>
            <Block position="relative" paddingLeft={8}>
                <Block
                    backgroundColor={payload[0].payload.fill}
                    position="absolute"
                    top={FOUNDATION_THEME.unit[2]}
                    left={0}
                    width={FOUNDATION_THEME.unit[4]}
                    height={FOUNDATION_THEME.unit[16]}
                    borderRadius={FOUNDATION_THEME.border.radius[8]}
                    transition="all 75ms"
                />
                <Block
                    display="flex"
                    flexDirection="column"
                    style={{ wordBreak: 'break-word' }}
                >
                    <Text
                        fontSize={14}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    >
                        {name}
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[500]}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    >
                        {formatTooltipHeader(
                            label || originalData[0].name,
                            xAxis,
                            labelFormatter
                        )}
                    </Text>
                </Block>
            </Block>

            <Block display="flex" flexDirection="column" paddingLeft={8}>
                <Text
                    fontSize={12}
                    fontWeight={FOUNDATION_THEME.font.weight[500]}
                    color={FOUNDATION_THEME.colors.gray[400]}
                >
                    {data.primary.label}
                </Text>
                <Text
                    fontSize={12}
                    fontWeight={FOUNDATION_THEME.font.weight[600]}
                    color={FOUNDATION_THEME.colors.gray[900]}
                    truncate={!formatter}
                >
                    {formatPrimaryTooltipValue({
                        value: data.primary.val,
                        seriesName: name,
                        dataIndex: getDataIndex(
                            originalData,
                            originalData[0].name
                        ),
                        color: payload[0].color || payload[0].payload.fill,
                        payload: payload[0].payload,
                        yAxis,
                        formatter,
                    })}
                </Text>
            </Block>

            {data.aux && data.aux.length > 0 && (
                <Block
                    gap={FOUNDATION_THEME.unit[4]}
                    paddingTop={FOUNDATION_THEME.unit[12]}
                    paddingLeft={FOUNDATION_THEME.unit[8]}
                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                    display="flex"
                    flexDirection="column"
                >
                    {data.aux.map((auxItem: AuxItem, index: number) => (
                        <Block
                            key={`aux-${index}`}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <Text
                                fontSize={12}
                                color={FOUNDATION_THEME.colors.gray[500]}
                                truncate={true}
                            >
                                {auxItem.label}
                            </Text>
                            <Text
                                fontSize={12}
                                fontWeight={FOUNDATION_THEME.font.weight[600]}
                                color={FOUNDATION_THEME.colors.gray[700]}
                            >
                                {formatAuxTooltipValue(auxItem.val, auxItem)}
                            </Text>
                        </Block>
                    ))}
                </Block>
            )}
        </>
    )
}

const ScatterChartTooltip = ({
    originalData,
    hoveredKey,
    active,
    payload,
    selectedKeys,
    xAxis,
    yAxis,
    formatter,
    labelFormatter,
}: {
    originalData: NewNestedDataPoint[]
    hoveredKey: string | null
    active: boolean
    payload: Payload<ValueType, NameType>[]
    selectedKeys: string[]
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    formatter?: TooltipFormatter
    labelFormatter?: CustomTooltipProps['labelFormatter']
}) => {
    if (!active || !payload || !payload.length) {
        return null
    }

    // Get the scatter point data from payload
    const point = payload[0]?.payload
    if (
        !point ||
        typeof point.x === 'undefined' ||
        typeof point.y === 'undefined'
    ) {
        return null
    }

    // Find the series key from the payload or use first available key
    const seriesKey =
        hoveredKey ||
        (selectedKeys.length > 0
            ? selectedKeys[0]
            : Object.keys(originalData[0]?.data || {})[0])

    if (!seriesKey) {
        return null
    }

    return (
        <>
            <Block position="relative" paddingLeft={8}>
                <Block
                    backgroundColor={point.fill || '#AD46FF'}
                    position="absolute"
                    top={FOUNDATION_THEME.unit[2]}
                    left={0}
                    width={FOUNDATION_THEME.unit[4]}
                    height={FOUNDATION_THEME.unit[16]}
                    borderRadius={FOUNDATION_THEME.border.radius[8]}
                    transition="all 75ms"
                />
                <Block
                    display="flex"
                    flexDirection="column"
                    style={{ wordBreak: 'break-word' }}
                >
                    <Text
                        fontSize={14}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                    >
                        {seriesKey}
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[500]}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    >
                        {formatTooltipHeader(
                            point.name || 'Data Point',
                            xAxis,
                            labelFormatter
                        )}
                    </Text>
                </Block>
            </Block>

            <Block
                display="flex"
                flexDirection="column"
                paddingLeft={8}
                gap={4}
            >
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[500]}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    >
                        X:
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                        truncate={true}
                    >
                        {formatTooltipValue(point.x, xAxis)}
                    </Text>
                </Block>
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[500]}
                        color={FOUNDATION_THEME.colors.gray[400]}
                    >
                        Y:
                    </Text>
                    <Text
                        fontSize={12}
                        fontWeight={FOUNDATION_THEME.font.weight[600]}
                        color={FOUNDATION_THEME.colors.gray[900]}
                        truncate={!formatter}
                    >
                        {formatPrimaryTooltipValue({
                            value: point.y,
                            seriesName: seriesKey,
                            dataIndex: getDataIndex(
                                originalData,
                                point.name || ''
                            ),
                            color: point.fill,
                            payload: point,
                            yAxis,
                            formatter,
                        })}
                    </Text>
                </Block>
            </Block>
        </>
    )
}
