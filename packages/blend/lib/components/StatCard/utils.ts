import { ChangeType, StatCardChange, ChartDataPoint } from './types'

/**
 * Calculates whether the chart data is trending down (first value > last value)
 * @param chartData - Array of chart data points
 * @returns true if trending down, false otherwise
 */
export const calculateTrend = (chartData?: ChartDataPoint[]): boolean => {
    if (!chartData || chartData.length < 2) return false
    const firstItem = chartData[0]
    const lastItem = chartData[chartData.length - 1]
    return firstItem && lastItem && firstItem.value > lastItem.value
}

/**
 * Calculates delta change from chart data (first vs last value)
 * @param chartData - Array of chart data points
 * @returns Calculated change object with value and valueType, or null if calculation is not possible
 */
export const calculateChangeFromChartData = (
    chartData?: ChartDataPoint[]
): Pick<StatCardChange, 'value' | 'valueType'> | null => {
    if (!chartData || chartData.length < 2) return null

    const firstItem = chartData[0]
    const lastItem = chartData[chartData.length - 1]

    if (!firstItem || !lastItem) return null

    const firstValue = firstItem.value
    const lastValue = lastItem.value

    if (firstValue === 0) return null // Avoid division by zero

    const deltaPercent = ((lastValue - firstValue) / Math.abs(firstValue)) * 100
    const valueType =
        deltaPercent < 0 ? ChangeType.DECREASE : ChangeType.INCREASE

    return {
        value: Math.abs(deltaPercent),
        valueType,
    }
}

/**
 * Gets the effective change to use for display
 * Uses provided change prop if available, otherwise calculates from chartData
 * @param change - Optional change prop from component
 * @param chartData - Array of chart data points
 * @returns Effective change object or null
 */
export const getEffectiveChange = (
    change?: StatCardChange,
    chartData?: ChartDataPoint[]
): StatCardChange | Pick<StatCardChange, 'value' | 'valueType'> | null => {
    if (change) return change
    return calculateChangeFromChartData(chartData)
}

/**
 * Determines if decrease color should be shown
 * Uses effectiveChange valueType if available, otherwise falls back to trend calculation
 * @param effectiveChange - The effective change object (from prop or calculated)
 * @param isTrendingDown - Whether chart data is trending down
 * @returns true if decrease color should be shown, false for increase
 */
export const shouldShowDecreaseColor = (
    effectiveChange:
        | StatCardChange
        | Pick<StatCardChange, 'value' | 'valueType'>
        | null,
    isTrendingDown: boolean
): boolean => {
    if (effectiveChange) {
        return effectiveChange.valueType === ChangeType.DECREASE
    }
    return isTrendingDown
}
