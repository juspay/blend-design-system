import React, { useState } from 'react'
import { ResponsiveContainer } from 'recharts'
import {
    ChartType,
    NewNestedDataPoint,
    XAxisConfig,
    YAxisConfig,
} from './types'
import { DEFAULT_COLORS } from './utils'
import { renderChart } from './renderChart'
import { transformNestedData } from './ChartUtils'

export interface CoreChartProps {
    chartType?: ChartType
    data: NewNestedDataPoint[]
    colors?: string[]
    barsize?: number
    xAxis?: XAxisConfig
    yAxis?: YAxisConfig
    height?: number | string
    width?: number | string
    isSmallScreen?: boolean

    hoveredKey?: string | null
    onHoveredKeyChange?: (key: string | null) => void
    selectedKeys?: string[]

    enableHover?: boolean
}

export const CoreChart: React.FC<CoreChartProps> = ({
    chartType = ChartType.LINE,
    data,
    colors = DEFAULT_COLORS,
    barsize,
    xAxis,
    yAxis,
    height = '100%',
    width = '100%',
    isSmallScreen = false,
    hoveredKey: externalHoveredKey,
    onHoveredKeyChange,
    selectedKeys = [],
    enableHover = false,
}) => {
    const [internalHoveredKey, setInternalHoveredKey] = useState<string | null>(
        null
    )

    const hoveredKey =
        externalHoveredKey !== undefined
            ? externalHoveredKey
            : internalHoveredKey

    const handleHoveredKeyChange = (key: string | null) => {
        if (onHoveredKeyChange) {
            onHoveredKeyChange(key)
        } else if (enableHover) {
            setInternalHoveredKey(key)
        }
    }

    const flattenedData = transformNestedData(data, selectedKeys)
    const lineKeys = data.length > 0 ? Object.keys(data[0].data) : []

    return (
        <ResponsiveContainer width={width} height={height}>
            {renderChart({
                flattenedData,
                chartType,
                hoveredKey:
                    enableHover || externalHoveredKey !== undefined
                        ? hoveredKey
                        : null,
                lineKeys,
                colors,
                setHoveredKey:
                    enableHover || onHoveredKeyChange
                        ? handleHoveredKeyChange
                        : () => {},
                data,
                selectedKeys,
                isSmallScreen,
                barsize,
                xAxis,
                yAxis,
            })}
        </ResponsiveContainer>
    )
}

export default CoreChart
