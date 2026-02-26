import {
    last7daysHourlyData,
    last7daysHourlyData2,
    pieChartData,
} from './ChartV2Data'

// Column chart data
export const columnChartOverallData = last7daysHourlyData
export const columnChartGoIndigoData = last7daysHourlyData2

// Line chart data
export const lineChartOverallData = last7daysHourlyData
export const lineChartGoIndigoData = last7daysHourlyData2

// Area chart data
export const areaChartOverallData = last7daysHourlyData
export const areaChartGoIndigoData = last7daysHourlyData2

// Scatter chart data
export const scatterChartOverallData = last7daysHourlyData
export const scatterChartGoIndigoData = last7daysHourlyData2

// Line & column combo chart data
export const lineColumnOverallData = last7daysHourlyData
export const lineColumnGoIndigoData = last7daysHourlyData2
export const lineColumnOrangeData = last7daysHourlyData

// Line with outage marker base data
export const lineWithOutageBaseData = last7daysHourlyData

// Pie chart data
export const pieChartSeriesData = pieChartData

// Sankey chart data
export const sankeySeriesData: [string, string, number][] = [
    ['Start', 'Step 1', 5],
    ['Start', 'Step 2', 3],
    ['Step 1', 'End', 2],
    ['Step 2', 'End', 3],
]

// Dashboard chart data (8 line charts share the same volatile pattern)
function buildVolatilePercentageData(
    baseTime: number,
    points: number = 13
): Array<[number, number]> {
    const data: Array<[number, number]> = []
    for (let i = 0; i < points; i++) {
        const x = baseTime + i * 30 * 60 * 1000
        const y = i % 2 === 0 ? 0 : 100
        data.push([x, y])
    }
    return data
}

const dashboardBaseTime = new Date().setHours(0, 0, 0, 0)

export const dashboardSeriesData: Array<Array<[number, number]>> = Array.from(
    { length: 9 },
    () => buildVolatilePercentageData(dashboardBaseTime)
)

// No data chart data
export const noDataSeries: [] = []
