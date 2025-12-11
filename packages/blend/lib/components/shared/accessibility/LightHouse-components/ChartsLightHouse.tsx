import Charts from '../../../Charts/Charts'
import {
    ChartType,
    ChartLegendPosition,
    NewNestedDataPoint,
    AxisType,
    LegendsChangeType,
} from '../../../Charts/types'
import {
    TrendingUp,
    DollarSign,
    Activity,
    BarChart3,
    PieChart,
} from 'lucide-react'

// Helper function to generate sample chart data
const generateChartData = (): NewNestedDataPoint[] => [
    {
        name: 'Jan',
        data: {
            revenue: { primary: { label: 'Revenue', val: 4000 } },
            profit: { primary: { label: 'Profit', val: 2400 } },
            expenses: { primary: { label: 'Expenses', val: 1600 } },
        },
    },
    {
        name: 'Feb',
        data: {
            revenue: { primary: { label: 'Revenue', val: 3000 } },
            profit: { primary: { label: 'Profit', val: 1398 } },
            expenses: { primary: { label: 'Expenses', val: 1602 } },
        },
    },
    {
        name: 'Mar',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2000 } },
            profit: { primary: { label: 'Profit', val: 800 } },
            expenses: { primary: { label: 'Expenses', val: 1200 } },
        },
    },
    {
        name: 'Apr',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2780 } },
            profit: { primary: { label: 'Profit', val: 1908 } },
            expenses: { primary: { label: 'Expenses', val: 872 } },
        },
    },
    {
        name: 'May',
        data: {
            revenue: { primary: { label: 'Revenue', val: 1890 } },
            profit: { primary: { label: 'Profit', val: 800 } },
            expenses: { primary: { label: 'Expenses', val: 1090 } },
        },
    },
    {
        name: 'Jun',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2390 } },
            profit: { primary: { label: 'Profit', val: 1200 } },
            expenses: { primary: { label: 'Expenses', val: 1190 } },
        },
    },
]

const ChartsLightHouse = () => {
    const chartData = generateChartData()

    return (
        <div className="flex flex-col gap-4">
            {/* All Chart Types */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Monthly Financial Overview</h3>}
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            <Charts
                chartType={ChartType.BAR}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Sales Performance by Month</h3>}
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Sales Volume',
                    showLabel: true,
                    show: true,
                    type: AxisType.NUMBER,
                }}
            />

            <Charts
                chartType={ChartType.PIE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Sales Distribution</h3>}
                legendPosition={ChartLegendPosition.RIGHT}
                xAxis={{ show: false }}
                yAxis={{ show: false }}
            />

            {/* With Icons */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Revenue Trend</h3>}
                slot1={
                    <TrendingUp size={20} color="#10b981" aria-hidden="true" />
                }
                slot2={
                    <span style={{ color: '#10b981', fontSize: '14px' }}>
                        +12.5%
                    </span>
                }
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            <Charts
                chartType={ChartType.BAR}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Sales Performance</h3>}
                slot1={
                    <BarChart3 size={20} color="#3b82f6" aria-hidden="true" />
                }
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Sales',
                    showLabel: true,
                    show: true,
                    type: AxisType.NUMBER,
                }}
            />

            <Charts
                chartType={ChartType.PIE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Category Distribution</h3>}
                slot1={
                    <PieChart size={20} color="#8b5cf6" aria-hidden="true" />
                }
                legendPosition={ChartLegendPosition.RIGHT}
                xAxis={{ show: false }}
                yAxis={{ show: false }}
            />

            {/* With Stacked Legends */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Revenue Trends</h3>}
                slot1={
                    <DollarSign size={20} color="#10b981" aria-hidden="true" />
                }
                slot2={
                    <span style={{ color: '#10b981', fontSize: '14px' }}>
                        +12.5%
                    </span>
                }
                legendPosition={ChartLegendPosition.TOP}
                stackedLegends={true}
                stackedLegendsData={[
                    {
                        value: 12000,
                        delta: 12.5,
                        changeType: LegendsChangeType.INCREASE,
                    },
                    {
                        value: 8000,
                        delta: 8.3,
                        changeType: LegendsChangeType.INCREASE,
                    },
                    {
                        value: 6000,
                        delta: 5.2,
                        changeType: LegendsChangeType.INCREASE,
                    },
                ]}
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Revenue ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            {/* With Collapse Icon */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                chartHeaderSlot={<h3>Expandable Chart</h3>}
                slot1={
                    <Activity size={20} color="#3b82f6" aria-hidden="true" />
                }
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            {/* Collapsed State */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                isExpanded={false}
                chartHeaderSlot={<h3>Collapsed Chart</h3>}
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            {/* Legend Position Right */}
            <Charts
                chartType={ChartType.PIE}
                data={chartData}
                height={400}
                chartHeaderSlot={<h3>Sales by Category</h3>}
                legendPosition={ChartLegendPosition.RIGHT}
                xAxis={{ show: false }}
                yAxis={{ show: false }}
            />

            {/* All Chart Types with All Features */}
            <Charts
                chartType={ChartType.LINE}
                data={chartData}
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                chartHeaderSlot={<h3>Comprehensive Line Chart</h3>}
                slot1={
                    <TrendingUp size={20} color="#10b981" aria-hidden="true" />
                }
                slot2={
                    <span style={{ color: '#10b981', fontSize: '14px' }}>
                        +12.5%
                    </span>
                }
                slot3={
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>
                        Last 6 months
                    </span>
                }
                legendPosition={ChartLegendPosition.TOP}
                stackedLegends={true}
                stackedLegendsData={[
                    {
                        value: 12000,
                        delta: 12.5,
                        changeType: LegendsChangeType.INCREASE,
                    },
                    {
                        value: 8000,
                        delta: 8.3,
                        changeType: LegendsChangeType.INCREASE,
                    },
                    {
                        value: 6000,
                        delta: 5.2,
                        changeType: LegendsChangeType.INCREASE,
                    },
                ]}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                    type: AxisType.DATE_TIME,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
            />

            <Charts
                chartType={ChartType.BAR}
                data={chartData}
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                chartHeaderSlot={<h3>Comprehensive Bar Chart</h3>}
                slot1={
                    <BarChart3 size={20} color="#3b82f6" aria-hidden="true" />
                }
                legendPosition={ChartLegendPosition.TOP}
                xAxis={{ label: 'Month', showLabel: true, show: true }}
                yAxis={{
                    label: 'Sales',
                    showLabel: true,
                    show: true,
                    type: AxisType.NUMBER,
                }}
            />

            <Charts
                chartType={ChartType.PIE}
                data={chartData}
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                chartHeaderSlot={<h3>Comprehensive Pie Chart</h3>}
                slot1={
                    <PieChart size={20} color="#8b5cf6" aria-hidden="true" />
                }
                legendPosition={ChartLegendPosition.RIGHT}
                xAxis={{ show: false }}
                yAxis={{ show: false }}
            />
        </div>
    )
}

export default ChartsLightHouse
