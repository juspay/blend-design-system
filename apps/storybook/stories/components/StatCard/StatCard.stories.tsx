import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    StatCard,
    StatCardVariant,
    StatCardDirection,
    ChangeType,
    ChartDataPoint,
} from '@juspay/blend-design-system'
import {
    TrendingUp,
    Users,
    DollarSign,
    ShoppingCart,
    Activity,
    Package,
    BarChart3,
    Target,
    Zap,
    Eye,
    AlertCircle,
    Settings,
    Filter,
    MoreVertical,
    Download,
    RefreshCw,
    Cpu,
    HardDrive,
    ShoppingBag,
    HelpCircle,
} from 'lucide-react'

const meta: Meta<typeof StatCard> = {
    title: 'Components/StatCard',
    component: StatCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `

A versatile statistics card component for displaying key metrics, KPIs, and data visualizations. Supports multiple variants including numbers, line charts, bar charts, and progress bars.

## Features
- Multiple display variants (Number, Line Chart, Bar Chart, Progress Bar)
- Change indicators with increase/decrease arrows
- Support for icons (title and action icons)
- Help tooltips for additional context
- Animated charts with hover tooltips
- Responsive design
- Automatic trend detection for line charts
- Customizable colors based on trends
- Progress bar with percentage display

## Usage

\`\`\`tsx
import { StatCard, StatCardVariant, ChangeType } from '@juspay/blend-design-system';

<StatCard
  title="Total Revenue"
  value="$45,231"
  subtitle="Last 30 days"
  variant={StatCardVariant.LINE}
  change={{ value: 12.5, valueType: ChangeType.INCREASE }}
  chartData={revenueData}
  titleIcon={<DollarSign size={20} />}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the stat card',
        },
        value: {
            control: 'text',
            description: 'The main value to display',
        },
        subtitle: {
            control: 'text',
            description: 'Additional context or time period',
        },
        variant: {
            control: 'select',
            options: Object.values(StatCardVariant),
            description: 'The display variant of the stat card',
        },
        change: {
            control: 'object',
            description: 'Change indicator with value and type',
        },
        progressValue: {
            control: { type: 'number', min: 0, max: 100 },
            description: 'Progress percentage for progress bar variant',
        },
        helpIconText: {
            control: 'text',
            description: 'Tooltip text for the help icon',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof StatCard>

// Helper function to generate sample chart data
const generateChartData = (
    days: number,
    baseValue: number,
    variance: number
): ChartDataPoint[] => {
    const data: ChartDataPoint[] = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const value = baseValue + (Math.random() - 0.5) * variance

        data.push({
            value: Math.round(value),
            name: date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
        })
    }

    return data
}

// Default story
export const Default: Story = {
    args: {
        title: 'Total Revenue',
        value: '$45,231',
        subtitle: 'Last 30 days',
        variant: StatCardVariant.NUMBER,
        change: {
            value: 12.5,
            valueType: ChangeType.INCREASE,
        },
        titleIcon: <DollarSign size={20} color="#10b981" />,
    },
}

// Number variant
export const NumberVariant: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '16px',
            }}
        >
            <StatCard
                title="Total Users"
                value="8,549"
                subtitle="Active users"
                variant={StatCardVariant.NUMBER}
                change={{ value: 23.1, valueType: ChangeType.INCREASE }}
                titleIcon={<Users size={24} color="#3b82f6" />}
                helpIconText="Total number of active users in the last 30 days"
            />
            <StatCard
                title="Revenue"
                value="$124.5K"
                subtitle="This month"
                variant={StatCardVariant.NUMBER}
                change={{ value: 8.2, valueType: ChangeType.DECREASE }}
                titleIcon={<DollarSign size={24} color="#10b981" />}
            />
            <StatCard
                title="Orders"
                value="1,429"
                subtitle="Completed"
                variant={StatCardVariant.NUMBER}
                change={{ value: 15.3, valueType: ChangeType.INCREASE }}
                titleIcon={<ShoppingCart size={24} color="#8b5cf6" />}
                actionIcon={<MoreVertical size={16} color="#6b7280" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Number variant displays a single metric with optional change indicator and icons.',
            },
        },
    },
}

// Line chart variant
export const LineChartVariant: Story = {
    render: () => {
        const revenueData = generateChartData(30, 5000, 1000)
        const visitorData = generateChartData(30, 1000, 200)
        const conversionData = generateChartData(30, 50, 20)

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 300px)',
                    gap: '16px',
                }}
            >
                <StatCard
                    title="Revenue"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.LINE}
                    change={{ value: 12.5, valueType: ChangeType.INCREASE }}
                    chartData={revenueData}
                    titleIcon={<DollarSign size={16} color="#10b981" />}
                    helpIconText="Total revenue from all sources"
                />
                <StatCard
                    title="Visitors"
                    value="28.4K"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.LINE}
                    change={{ value: 5.2, valueType: ChangeType.DECREASE }}
                    chartData={visitorData}
                    titleIcon={<Eye size={16} color="#3b82f6" />}
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.24%"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.LINE}
                    change={{ value: 18.7, valueType: ChangeType.INCREASE }}
                    chartData={conversionData}
                    titleIcon={<Target size={16} color="#f59e0b" />}
                    actionIcon={<Filter size={16} color="#6b7280" />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Line chart variant shows trends over time with interactive tooltips.',
            },
        },
    },
}

// Bar chart variant
export const BarChartVariant: Story = {
    render: () => {
        const salesData = generateChartData(12, 3000, 500)
        const ordersData = generateChartData(12, 150, 30)
        const productsData = generateChartData(12, 80, 15)

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 300px)',
                    gap: '16px',
                }}
            >
                <StatCard
                    title="Monthly Sales"
                    value="$32,450"
                    subtitle="This month"
                    variant={StatCardVariant.BAR}
                    change={{ value: 8.3, valueType: ChangeType.INCREASE }}
                    chartData={salesData}
                    titleIcon={<BarChart3 size={16} color="#10b981" />}
                />
                <StatCard
                    title="Orders"
                    value="156"
                    subtitle="This month"
                    variant={StatCardVariant.BAR}
                    change={{ value: 12.1, valueType: ChangeType.DECREASE }}
                    chartData={ordersData}
                    titleIcon={<Package size={16} color="#8b5cf6" />}
                    helpIconText="Number of completed orders"
                />
                <StatCard
                    title="Products Sold"
                    value="892"
                    subtitle="This month"
                    variant={StatCardVariant.BAR}
                    change={{ value: 24.5, valueType: ChangeType.INCREASE }}
                    chartData={productsData}
                    titleIcon={<ShoppingBag size={16} color="#f59e0b" />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Bar chart variant displays data as vertical bars, ideal for comparing discrete values.',
            },
        },
    },
}

// Progress bar variant
export const ProgressBarVariant: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '16px',
            }}
        >
            <StatCard
                title="Storage Used"
                value="45.2 GB"
                subtitle="of 100 GB"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={45}
                titleIcon={<HardDrive size={16} color="#3b82f6" />}
                helpIconText="Total storage usage across all files"
            />
            <StatCard
                title="Project Progress"
                value="78%"
                subtitle="12 of 15 tasks completed"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={78}
                titleIcon={<Target size={16} color="#10b981" />}
                actionIcon={<Settings size={16} color="#6b7280" />}
            />
            <StatCard
                title="CPU Usage"
                value="32%"
                subtitle="4 cores active"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={32}
                titleIcon={<Cpu size={16} color="#f59e0b" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Progress bar variant shows completion percentage with a visual progress indicator.',
            },
        },
    },
}

// With action icons
export const WithActionIcons: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '16px',
            }}
        >
            <StatCard
                title="Active Sessions"
                value="1,234"
                subtitle="Current users online"
                variant={StatCardVariant.NUMBER}
                change={{ value: 5.2, valueType: ChangeType.INCREASE }}
                titleIcon={<Activity size={24} color="#10b981" />}
                actionIcon={
                    <RefreshCw
                        size={16}
                        color="#6b7280"
                        style={{ cursor: 'pointer' }}
                    />
                }
            />
            <StatCard
                title="API Calls"
                value="45.2K"
                subtitle="Last 24 hours"
                variant={StatCardVariant.NUMBER}
                change={{ value: 12.8, valueType: ChangeType.DECREASE }}
                titleIcon={<Zap size={24} color="#f59e0b" />}
                actionIcon={
                    <Download
                        size={16}
                        color="#6b7280"
                        style={{ cursor: 'pointer' }}
                    />
                }
            />
            <StatCard
                title="Error Rate"
                value="0.12%"
                subtitle="Last hour"
                variant={StatCardVariant.NUMBER}
                change={{ value: 23.5, valueType: ChangeType.DECREASE }}
                titleIcon={<AlertCircle size={24} color="#ef4444" />}
                actionIcon={
                    <MoreVertical
                        size={16}
                        color="#6b7280"
                        style={{ cursor: 'pointer' }}
                    />
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Action icons provide quick access to related actions or menus.',
            },
        },
    },
}

// Dashboard example
export const DashboardExample: Story = {
    render: () => {
        const revenueData = generateChartData(30, 5000, 1000)
        const visitorData = generateChartData(30, 1000, 200)
        const salesData = generateChartData(12, 3000, 500)

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 280px)',
                    gap: '16px',
                }}
            >
                {/* Row 1 - Key Metrics */}
                <StatCard
                    title="Total Revenue"
                    value="$845.2K"
                    subtitle="Year to date"
                    variant={StatCardVariant.NUMBER}
                    change={{ value: 22.5, valueType: ChangeType.INCREASE }}
                    titleIcon={<DollarSign size={24} color="#10b981" />}
                />
                <StatCard
                    title="Active Users"
                    value="12,543"
                    subtitle="Monthly active"
                    variant={StatCardVariant.NUMBER}
                    change={{ value: 8.3, valueType: ChangeType.INCREASE }}
                    titleIcon={<Users size={24} color="#3b82f6" />}
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.24%"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                    change={{ value: 5.1, valueType: ChangeType.DECREASE }}
                    titleIcon={<Target size={24} color="#8b5cf6" />}
                />
                <StatCard
                    title="Avg Order Value"
                    value="$156.50"
                    subtitle="Per transaction"
                    variant={StatCardVariant.NUMBER}
                    change={{ value: 12.8, valueType: ChangeType.INCREASE }}
                    titleIcon={<ShoppingCart size={24} color="#f59e0b" />}
                />

                {/* Row 2 - Charts */}
                <StatCard
                    title="Revenue Trend"
                    value="$45,231"
                    subtitle="Last 30 days"
                    variant={StatCardVariant.LINE}
                    change={{ value: 15.2, valueType: ChangeType.INCREASE }}
                    chartData={revenueData}
                    titleIcon={<TrendingUp size={16} color="#10b981" />}
                />
                <StatCard
                    title="Site Traffic"
                    value="28.4K"
                    subtitle="Unique visitors"
                    variant={StatCardVariant.LINE}
                    change={{ value: 3.7, valueType: ChangeType.INCREASE }}
                    chartData={visitorData}
                    titleIcon={<Eye size={16} color="#3b82f6" />}
                />
                <StatCard
                    title="Sales by Month"
                    value="$32,450"
                    subtitle="This month"
                    variant={StatCardVariant.BAR}
                    change={{ value: 18.9, valueType: ChangeType.INCREASE }}
                    chartData={salesData}
                    titleIcon={<BarChart3 size={16} color="#8b5cf6" />}
                />
                <StatCard
                    title="Goal Progress"
                    value="68%"
                    subtitle="$68K of $100K"
                    variant={StatCardVariant.PROGRESS_BAR}
                    progressValue={68}
                    titleIcon={<Target size={16} color="#f59e0b" />}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'A complete dashboard example showing various stat card configurations.',
            },
        },
    },
}

// Horizontal direction layout
export const HorizontalDirection: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '500px',
            }}
        >
            <StatCard
                title="Revenue Growth"
                value="$89,450"
                subtitle="Quarterly revenue"
                variant={StatCardVariant.LINE}
                direction={StatCardDirection.HORIZONTAL}
                change={{ value: 24.8, valueType: ChangeType.INCREASE }}
                chartData={generateChartData(30, 5000, 1000)}
                titleIcon={<TrendingUp size={16} color="#10b981" />}
                actionIcon={<MoreVertical size={16} color="#6b7280" />}
                helpIconText="Total revenue across all channels for the current quarter"
            />
            <StatCard
                title="Active Subscribers"
                value="12,847"
                subtitle="Monthly subscribers"
                variant={StatCardVariant.BAR}
                direction={StatCardDirection.HORIZONTAL}
                change={{ value: 8.3, valueType: ChangeType.INCREASE }}
                chartData={generateChartData(12, 1000, 200)}
                titleIcon={<Users size={16} color="#3b82f6" />}
                helpIconText="Number of active paying subscribers"
            />
            <StatCard
                title="Server Uptime"
                value="99.97%"
                subtitle="Last 30 days"
                variant={StatCardVariant.PROGRESS_BAR}
                direction={StatCardDirection.HORIZONTAL}
                progressValue={99.97}
                titleIcon={<Activity size={16} color="#10b981" />}
                actionIcon={<RefreshCw size={16} color="#6b7280" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Horizontal direction layout places title and chart side by side for better space utilization.',
            },
        },
    },
}

// With value tooltips and formatting
export const WithValueTooltips: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '16px',
            }}
        >
            <StatCard
                title="Total Revenue"
                value="$1,234,567.89"
                valueTooltip={
                    <div>
                        <strong>Revenue Breakdown:</strong>
                        <br />
                        • Subscriptions: $800,000
                        <br />
                        • One-time sales: $300,000
                        <br />
                        • Add-ons: $134,567.89
                        <br />
                        <em>Click for detailed report</em>
                    </div>
                }
                subtitle="This quarter"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 18.5,
                    valueType: ChangeType.INCREASE,
                    tooltip: '18.5% increase compared to last quarter',
                }}
                titleIcon={<DollarSign size={24} color="#10b981" />}
                helpIconText="Total revenue from all sources including subscriptions, sales, and add-ons"
            />
            <StatCard
                title="Conversion Rate"
                value="3.247%"
                valueTooltip={
                    <div>
                        <strong>Conversion Details:</strong>
                        <br />
                        • Visitors: 124,563
                        <br />
                        • Conversions: 4,047
                        <br />
                        • Rate: 3.247%
                        <br />
                        <em>Industry average: 2.8%</em>
                    </div>
                }
                subtitle="Last 30 days"
                variant={StatCardVariant.LINE}
                change={{
                    value: 12.3,
                    valueType: ChangeType.INCREASE,
                    tooltip: '12.3% improvement over previous month',
                }}
                chartData={generateChartData(30, 3.2, 0.5)}
                titleIcon={<Target size={16} color="#8b5cf6" />}
            />
            <StatCard
                title="System Performance"
                value="87.3%"
                valueTooltip={
                    <div>
                        <strong>Performance Metrics:</strong>
                        <br />
                        • CPU Usage: 45%
                        <br />
                        • Memory: 62%
                        <br />
                        • Network: 23%
                        <br />• Overall Score: 87.3%
                    </div>
                }
                subtitle="Current status"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={87.3}
                titleIcon={<Cpu size={16} color="#f59e0b" />}
                actionIcon={<Settings size={16} color="#6b7280" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Enhanced tooltips provide detailed context for values and changes when hovering.',
            },
        },
    },
}

// Maximum width and compact layouts
export const MaxWidthVariations: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'flex-start',
            }}
        >
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <StatCard
                    title="Compact Card"
                    value="$25.4K"
                    subtitle="Revenue"
                    variant={StatCardVariant.NUMBER}
                    change={{ value: 5.2, valueType: ChangeType.INCREASE }}
                    titleIcon={<DollarSign size={20} color="#10b981" />}
                    maxWidth="200px"
                />
                <StatCard
                    title="Medium Card"
                    value="1,247"
                    subtitle="Active users"
                    variant={StatCardVariant.LINE}
                    change={{ value: 8.7, valueType: ChangeType.INCREASE }}
                    chartData={generateChartData(15, 1200, 100)}
                    titleIcon={<Users size={16} color="#3b82f6" />}
                    maxWidth="250px"
                />
                <StatCard
                    title="Standard Card"
                    value="78.9%"
                    subtitle="Completion rate"
                    variant={StatCardVariant.PROGRESS_BAR}
                    progressValue={78.9}
                    titleIcon={<Target size={16} color="#8b5cf6" />}
                    actionIcon={<Filter size={16} color="#6b7280" />}
                    helpIconText="Project completion rate based on milestones"
                    maxWidth="320px"
                />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <StatCard
                    title="Full Width Dashboard Card"
                    value="$156,789.45"
                    subtitle="Total sales across all channels and regions"
                    variant={StatCardVariant.BAR}
                    change={{ value: 22.1, valueType: ChangeType.INCREASE }}
                    chartData={generateChartData(20, 7000, 1500)}
                    titleIcon={<BarChart3 size={16} color="#10b981" />}
                    actionIcon={<Download size={16} color="#6b7280" />}
                    helpIconText="Combined sales from online store, retail locations, and partner channels"
                    maxWidth="600px"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different maxWidth settings allow for flexible layouts from compact to full-width cards.',
            },
        },
    },
}

// Error and empty states
export const ErrorAndEmptyStates: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 300px)',
                gap: '16px',
            }}
        >
            <StatCard
                title="No Data Available"
                value=""
                subtitle="Waiting for data"
                variant={StatCardVariant.LINE}
                titleIcon={<AlertCircle size={16} color="#6b7280" />}
                helpIconText="Data collection is in progress"
            />
            <StatCard
                title="Connection Error"
                value=""
                subtitle="Unable to fetch data"
                variant={StatCardVariant.BAR}
                titleIcon={<AlertCircle size={16} color="#ef4444" />}
                actionIcon={<RefreshCw size={16} color="#6b7280" />}
                helpIconText="Click refresh to retry data loading"
            />
            <StatCard
                title="Incomplete Progress"
                value=""
                subtitle="Task not started"
                variant={StatCardVariant.PROGRESS_BAR}
                titleIcon={<Package size={16} color="#6b7280" />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Empty states and error handling for when data is unavailable or loading fails.',
            },
        },
    },
}

// Real-world business metrics
export const BusinessMetricsShowcase: Story = {
    render: () => {
        const revenueData = generateChartData(30, 5000, 1000)
        const userGrowthData = generateChartData(30, 1000, 200)
        const conversionData = generateChartData(30, 3.5, 0.8)
        const churnData = generateChartData(12, 5, 2)

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 320px)',
                    gap: '20px',
                }}
            >
                {/* Financial Metrics */}
                <StatCard
                    title="Monthly Recurring Revenue"
                    value="$847,521"
                    valueTooltip="MRR from all active subscriptions including upgrades and downgrades"
                    subtitle="Current month"
                    variant={StatCardVariant.LINE}
                    change={{
                        value: 15.8,
                        valueType: ChangeType.INCREASE,
                        tooltip: '15.8% growth compared to last month',
                    }}
                    chartData={revenueData}
                    titleIcon={<DollarSign size={16} color="#10b981" />}
                    actionIcon={<Download size={16} color="#6b7280" />}
                    helpIconText="Predictable revenue from subscription-based customers"
                />

                {/* Growth Metrics */}
                <StatCard
                    title="User Acquisition Cost"
                    value="$127.45"
                    valueTooltip={
                        <div>
                            <strong>CAC Breakdown:</strong>
                            <br />
                            • Marketing spend: $45,000
                            <br />
                            • Sales costs: $28,000
                            <br />
                            • New customers: 573
                            <br />• Cost per acquisition: $127.45
                        </div>
                    }
                    subtitle="Last 30 days"
                    variant={StatCardVariant.NUMBER}
                    change={{
                        value: 8.2,
                        valueType: ChangeType.DECREASE,
                        tooltip: '8.2% improvement in acquisition efficiency',
                    }}
                    titleIcon={<Users size={24} color="#3b82f6" />}
                    helpIconText="Average cost to acquire one new paying customer"
                />

                {/* Product Metrics */}
                <StatCard
                    title="Feature Adoption Rate"
                    value="67.3%"
                    valueTooltip="Percentage of active users who have used the new feature in the last 7 days"
                    subtitle="New dashboard feature"
                    variant={StatCardVariant.PROGRESS_BAR}
                    progressValue={67.3}
                    titleIcon={<Activity size={16} color="#8b5cf6" />}
                    actionIcon={<Filter size={16} color="#6b7280" />}
                    helpIconText="Measures how quickly users adopt new product features"
                />

                {/* Conversion Metrics */}
                <StatCard
                    title="Lead to Customer"
                    value="12.8%"
                    valueTooltip="Conversion rate from qualified leads to paying customers"
                    subtitle="Sales funnel"
                    variant={StatCardVariant.LINE}
                    change={{
                        value: 23.5,
                        valueType: ChangeType.INCREASE,
                        tooltip:
                            'Significant improvement in sales process efficiency',
                    }}
                    chartData={conversionData}
                    titleIcon={<Target size={16} color="#f59e0b" />}
                    helpIconText="Key metric for sales team performance"
                />

                {/* Retention Metrics */}
                <StatCard
                    title="Customer Churn Rate"
                    value="2.1%"
                    valueTooltip={
                        <div>
                            <strong>Churn Analysis:</strong>
                            <br />
                            • Voluntary churn: 1.4%
                            <br />
                            • Involuntary churn: 0.7%
                            <br />
                            • Industry average: 5.2%
                            <br />• Our performance: 59% better
                        </div>
                    }
                    subtitle="Monthly rate"
                    variant={StatCardVariant.BAR}
                    change={{
                        value: 15.3,
                        valueType: ChangeType.DECREASE,
                        tooltip: '15.3% reduction in customer churn',
                    }}
                    chartData={churnData}
                    titleIcon={<AlertCircle size={16} color="#ef4444" />}
                    actionIcon={<Settings size={16} color="#6b7280" />}
                    helpIconText="Percentage of customers who cancel their subscription each month"
                />

                {/* Operational Metrics */}
                <StatCard
                    title="Support Ticket Resolution"
                    value="94.2%"
                    valueTooltip="Percentage of support tickets resolved within SLA (24 hours)"
                    subtitle="Within SLA"
                    variant={StatCardVariant.PROGRESS_BAR}
                    progressValue={94.2}
                    titleIcon={<HelpCircle size={16} color="#10b981" />}
                    actionIcon={<RefreshCw size={16} color="#6b7280" />}
                    helpIconText="Customer support team performance indicator"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Real-world business metrics with detailed tooltips and contextual information for executive dashboards.',
            },
        },
    },
}
