import { EllipsisVertical, TrendingUp, Users, Activity } from 'lucide-react'
import {
    Charts,
    ChartType,
    ChartLegendPosition,
    Menu,
    NewNestedDataPoint,
    SingleSelect,
    FOUNDATION_THEME,
} from '../../../../packages/blend/lib/main'
import { useState } from 'react'
import { SelectMenuVariant } from '../../../../packages/blend/lib/components/Select'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { LegendsChangeType } from '../../../../packages/blend/lib/components/Charts/types'

const ChartDemo = () => {
    const financialData: NewNestedDataPoint[] = [
        {
            name: 'Jan',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 4000 },
                    aux: [{ label: 'Growth', val: 12 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 2400 },
                    aux: [{ label: 'Margin', val: 24 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 15000 },
                    aux: [{ label: 'Change', val: 8 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.2 },
                    aux: [{ label: 'Change', val: 0.5 }],
                },
            },
        },
        {
            name: 'Feb',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3000 },
                    aux: [{ label: 'Growth', val: -25 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 1398 },
                    aux: [{ label: 'Margin', val: 19 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 13000 },
                    aux: [{ label: 'Change', val: -13 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 2.8 },
                    aux: [{ label: 'Change', val: -0.4 }],
                },
            },
        },
        {
            name: 'Mar',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 2000 },
                    aux: [{ label: 'Growth', val: -33 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 9800 },
                    aux: [{ label: 'Margin', val: 32 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 17000 },
                    aux: [{ label: 'Change', val: 30 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.5 },
                    aux: [{ label: 'Change', val: 0.7 }],
                },
            },
        },
        {
            name: 'Apr',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 2780 },
                    aux: [{ label: 'Growth', val: 39 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 3908 },
                    aux: [{ label: 'Margin', val: 28 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 19500 },
                    aux: [{ label: 'Change', val: 15 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 4.1 },
                    aux: [{ label: 'Change', val: 0.6 }],
                },
            },
        },
        {
            name: 'May',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3490 },
                    aux: [{ label: 'Growth', val: 25 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 4300 },
                    aux: [{ label: 'Margin', val: 31 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 21000 },
                    aux: [{ label: 'Change', val: 8 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 3.9 },
                    aux: [{ label: 'Change', val: -0.2 }],
                },
            },
        },
        {
            name: 'Jun',
            data: {
                revenue: {
                    primary: { label: 'Total Revenue', val: 3200 },
                    aux: [{ label: 'Growth', val: -8 }],
                },
                profit: {
                    primary: { label: 'Net Profit', val: 3800 },
                    aux: [{ label: 'Margin', val: 29 }],
                },
                traffic: {
                    primary: { label: 'Website Traffic', val: 18500 },
                    aux: [{ label: 'Change', val: -12 }],
                },
                conversions: {
                    primary: { label: 'Conversion Rate', val: 4.2 },
                    aux: [{ label: 'Change', val: 0.3 }],
                },
            },
        },
    ]

    // Performance dataset
    const performanceData: NewNestedDataPoint[] = [
        {
            name: 'Q1',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 186 },
                    aux: [{ label: 'Target', val: 200 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 305 },
                    aux: [{ label: 'Converted', val: 45 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 14.7 },
                    aux: [{ label: 'Goal', val: 15 }],
                },
            },
        },
        {
            name: 'Q2',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 305 },
                    aux: [{ label: 'Target', val: 250 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 400 },
                    aux: [{ label: 'Converted', val: 76 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 19.0 },
                    aux: [{ label: 'Goal', val: 18 }],
                },
            },
        },
        {
            name: 'Q3',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 237 },
                    aux: [{ label: 'Target', val: 280 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 375 },
                    aux: [{ label: 'Converted', val: 59 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 15.7 },
                    aux: [{ label: 'Goal', val: 16 }],
                },
            },
        },
        {
            name: 'Q4',
            data: {
                sales: {
                    primary: { label: 'Sales', val: 420 },
                    aux: [{ label: 'Target', val: 350 }],
                },
                leads: {
                    primary: { label: 'Leads', val: 520 },
                    aux: [{ label: 'Converted', val: 104 }],
                },
                conversion: {
                    primary: { label: 'Conversion Rate', val: 20.0 },
                    aux: [{ label: 'Goal', val: 20 }],
                },
            },
        },
    ]

    // User analytics dataset
    const analyticsData: NewNestedDataPoint[] = [
        {
            name: 'Desktop',
            data: {
                users: {
                    primary: { label: 'Users', val: 45 },
                    aux: [{ label: 'Sessions', val: 67 }],
                },
            },
        },
        {
            name: 'Mobile',
            data: {
                users: {
                    primary: { label: 'Users', val: 35 },
                    aux: [{ label: 'Sessions', val: 42 }],
                },
            },
        },
        {
            name: 'Tablet',
            data: {
                users: {
                    primary: { label: 'Users', val: 15 },
                    aux: [{ label: 'Sessions', val: 18 }],
                },
            },
        },
        {
            name: 'Other',
            data: {
                users: {
                    primary: { label: 'Users', val: 5 },
                    aux: [{ label: 'Sessions', val: 6 }],
                },
            },
        },
    ]

    const basicMenuItems = [
        {
            label: 'Export CSV',
            value: 'export_csv',
            items: [{ label: 'Export CSV', value: 'export_csv' }],
        },
        {
            label: 'Export PDF',
            value: 'export_pdf',
            items: [{ label: 'Export PDF', value: 'export_pdf' }],
        },
        {
            label: 'Share',
            value: 'share',
            items: [{ label: 'Share', value: 'share' }],
        },
        {
            label: 'Dataset',
            value: 'dataset',
            items: [
                {
                    label: 'Financial Data',
                    value: 'financial',
                    onClick: () => {
                        setSelectedDataset('financial')
                    },
                },
                {
                    label: 'Performance Metrics',
                    value: 'performance',
                    onClick: () => {
                        setSelectedDataset('performance')
                    },
                },
                {
                    label: 'User Analytics',
                    value: 'analytics',
                    onClick: () => {
                        setSelectedDataset('analytics')
                    },
                },
            ],
        },
        {
            label: 'Legend Position',
            value: 'legend_position',
            items: [
                {
                    label: 'Top Legend',
                    value: ChartLegendPosition.TOP,
                    onClick: () => {
                        setSelectedLegendPosition(ChartLegendPosition.TOP)
                    },
                },
                {
                    label: 'Right Legend',
                    value: ChartLegendPosition.RIGHT,
                    onClick: () => {
                        setSelectedLegendPosition(ChartLegendPosition.RIGHT)
                    },
                },
            ],
        },
    ]

    // State for playground controls
    const [selectedChartType, setSelectedChartType] = useState(ChartType.LINE)
    const [selectedDataset, setSelectedDataset] = useState('financial')
    const [selectedLegendPosition, setSelectedLegendPosition] = useState(
        ChartLegendPosition.TOP
    )
    const [selectedDateRange, setSelectedDateRange] = useState('last_6_months')
    const [selectedFilters, setSelectedFilters] = useState('all_metrics')
    const [showLimitedMetrics, setShowLimitedMetrics] = useState(false)

    // Helper functions
    const getCurrentData = () => {
        switch (selectedDataset) {
            case 'financial':
                return financialData
            case 'performance':
                return performanceData
            case 'analytics':
                return analyticsData
            default:
                return financialData
        }
    }

    const getColors = () => {
        switch (selectedChartType) {
            case ChartType.LINE:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
            case ChartType.BAR:
                return ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444']
            case ChartType.PIE:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
            default:
                return ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
        }
    }

    const stackedLegendsData = [
        { value: 50.21, delta: 20.1, changeType: LegendsChangeType.INCREASE },
        { value: 30.21, delta: 10.1, changeType: LegendsChangeType.DECREASE },
        { value: 20.21, delta: 5.1, changeType: LegendsChangeType.INCREASE },
        { value: 10.21, delta: 2.1, changeType: LegendsChangeType.DECREASE },
    ]

    return (
        <div className=" p-5 gap-8 flex flex-col">
            <h5 className="text-xl font-bold">
                Charts Playground - All Variations
            </h5>

            {/* Main Interactive Chart */}
            <div className="chart-example-container">
                <Charts
                    stackedLegends={true}
                    stackedLegendsData={stackedLegendsData}
                    data={getCurrentData()}
                    chartType={selectedChartType}
                    legendPosition={selectedLegendPosition}
                    colors={getColors()}
                    xAxisLabel={
                        selectedDataset === 'analytics'
                            ? 'Device Type'
                            : 'Period'
                    }
                    yAxisLabel={
                        selectedDataset === 'financial' ? 'Amount ($)' : 'Value'
                    }
                    chartHeaderSlot={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Chart Type"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Line Chart',
                                            value: ChartType.LINE,
                                        },
                                        {
                                            label: 'Bar Chart',
                                            value: ChartType.BAR,
                                        },
                                        {
                                            label: 'Pie Chart',
                                            value: ChartType.PIE,
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedChartType}
                            onSelect={(value) => {
                                setSelectedChartType(value as ChartType)
                            }}
                        />
                    }
                    slot1={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Dataset"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Financial Data',
                                            value: 'financial',
                                        },
                                        {
                                            label: 'Performance Metrics',
                                            value: 'performance',
                                        },
                                        {
                                            label: 'User Analytics',
                                            value: 'analytics',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedDataset}
                            onSelect={(value) => {
                                setSelectedDataset(value as string)
                            }}
                        />
                    }
                    slot2={
                        <SingleSelect
                            label=""
                            variant={SelectMenuVariant.NO_CONTAINER}
                            placeholder="Legend Position"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Top Legend',
                                            value: ChartLegendPosition.TOP,
                                        },
                                        {
                                            label: 'Right Legend',
                                            value: ChartLegendPosition.RIGHT,
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedLegendPosition}
                            onSelect={(value) => {
                                setSelectedLegendPosition(
                                    value as ChartLegendPosition
                                )
                            }}
                        />
                    }
                    slot3={
                        <Menu
                            trigger={
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width={FOUNDATION_THEME.unit[24]}
                                    cursor="pointer"
                                >
                                    <EllipsisVertical
                                        size={20}
                                        className="text-gray-500"
                                    />
                                </Block>
                            }
                            items={basicMenuItems}
                        />
                    }
                />
            </div>

            {/* Playground Controls */}
            <div className="chart-example-container">
                <h3 className="text-xl font-bold mb-4">Playground Controls</h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                    }}
                >
                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                            }}
                        >
                            Date Range
                        </label>
                        <SingleSelect
                            label=""
                            placeholder="Date Range"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Last 6 months',
                                            value: 'last_6_months',
                                        },
                                        {
                                            label: 'Last year',
                                            value: 'last_year',
                                        },
                                        {
                                            label: 'Last 2 years',
                                            value: 'last_2_years',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedDateRange}
                            onSelect={(value) => {
                                setSelectedDateRange(value as string)
                            }}
                        />
                    </div>

                    <div>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '600',
                            }}
                        >
                            Metrics Filter
                        </label>
                        <SingleSelect
                            label=""
                            placeholder="Metrics"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'All Metrics',
                                            value: 'all_metrics',
                                        },
                                        {
                                            label: 'Limited Metrics',
                                            value: 'limited_metrics',
                                        },
                                    ],
                                },
                            ]}
                            selected={selectedFilters}
                            onSelect={(value) => {
                                setSelectedFilters(value as string)
                                setShowLimitedMetrics(
                                    value === 'limited_metrics'
                                )
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Chart Variations Grid */}
            <div className="chart-example-container">
                <h3 className="text-xl font-bold mb-4">
                    Chart Type Variations
                </h3>
                <div className="flex flex-col gap-5">
                    {/* Line Chart Example */}

                    <Charts
                        data={financialData}
                        chartType={ChartType.LINE}
                        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <TrendingUp
                                    size={16}
                                    className="text-blue-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Line Chart
                                </h4>
                            </div>
                        }
                    />

                    {/* Bar Chart Example */}

                    <Charts
                        data={performanceData}
                        chartType={ChartType.BAR}
                        colors={['#8b5cf6', '#06b6d4', '#f59e0b']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Activity
                                    size={16}
                                    className="text-purple-600"
                                />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Bar Chart
                                </h4>
                            </div>
                        }
                    />

                    {/* Pie Chart Example */}

                    <Charts
                        data={analyticsData}
                        chartType={ChartType.PIE}
                        legendPosition={ChartLegendPosition.RIGHT}
                        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <Users size={16} className="text-green-600" />
                                <h4 style={{ margin: 0, fontSize: '14px' }}>
                                    Pie Chart
                                </h4>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Feature Showcase */}
            <div className="chart-example-container">
                <h3 className="text-xl font-bold mb-4">Feature Showcase</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                    {/* Limited Metrics Example */}

                    <Charts
                        data={financialData}
                        chartType={ChartType.LINE}
                        xAxisLabel="Month"
                        yAxisLabel="Amount ($)"
                        chartHeaderSlot={
                            <div className="chart-header">
                                <h4 style={{ margin: 0 }}>
                                    Limited Metrics (Revenue & Profit Only)
                                </h4>
                            </div>
                        }
                    />

                    {/* Custom Colors Example */}

                    <Charts
                        data={performanceData}
                        chartType={ChartType.BAR}
                        colors={['#dc2626', '#059669', '#7c3aed']}
                        chartHeaderSlot={
                            <div className="chart-header">
                                <h4 style={{ margin: 0 }}>
                                    Custom Color Scheme
                                </h4>
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Configuration Summary */}
            <div className="chart-example-container">
                <h3 className="chart-header-title mb-4">
                    Current Configuration
                </h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        fontSize: '14px',
                    }}
                >
                    <div>
                        <strong>Chart Type:</strong> {selectedChartType}
                    </div>
                    <div>
                        <strong>Dataset:</strong> {selectedDataset}
                    </div>
                    <div>
                        <strong>Legend Position:</strong>{' '}
                        {selectedLegendPosition}
                    </div>
                    <div>
                        <strong>Date Range:</strong> {selectedDateRange}
                    </div>
                    <div>
                        <strong>Metrics:</strong>{' '}
                        {showLimitedMetrics ? 'Limited' : 'All'}
                    </div>
                    <div>
                        <strong>Data Points:</strong> {getCurrentData().length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartDemo
