import React, { useState } from 'react'
import { ResponsiveContainer } from 'recharts'
import { ChartType, CoreChartProps } from './types'
import { DEFAULT_COLORS } from './utils'
import { renderChart } from './renderChart'
import { transformNestedData } from './ChartUtils'

export const CoreChart: React.FC<CoreChartProps> = ({
    chartType = ChartType.LINE,
    data,
    colors = DEFAULT_COLORS,
    barsize,
    xAxis,
    yAxis,
    tooltip,
    height = '100%',
    width = '100%',
    isSmallScreen = false,
    hoveredKey: externalHoveredKey,
    onHoveredKeyChange,
    selectedKeys = [],
    enableHover = false,
    lineSeriesKeys,
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
                tooltip,
                lineSeriesKeys,
            })}
        </ResponsiveContainer>
    )
}

export default CoreChart
