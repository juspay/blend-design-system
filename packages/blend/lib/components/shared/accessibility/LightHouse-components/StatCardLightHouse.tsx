import {
    StatCard,
    StatCardVariant,
    StatCardDirection,
    ChangeType,
    type ChartDataPoint,
} from '../../../StatCard'
import {
    DollarSign,
    TrendingUp,
    Users,
    Activity,
    Target,
    ChevronRight,
} from 'lucide-react'

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

const StatCardLightHouse = () => {
    const revenueData = generateChartData(30, 5000, 1000)
    const conversionData = generateChartData(30, 3.5, 0.8)
    const userData = generateChartData(30, 10000, 2000)

    return (
        <div className="flex flex-col gap-4">
            {/* All Variants */}
            <StatCard
                title="Total Revenue"
                value="$45,231"
                subtitle="Last 30 days"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 12.5,
                    valueType: ChangeType.INCREASE,
                }}
            />
            <StatCard
                title="Revenue Trend"
                value="$45,231"
                subtitle="Last 30 days"
                variant={StatCardVariant.LINE}
                chartData={revenueData}
                change={{
                    value: 15.8,
                    valueType: ChangeType.INCREASE,
                }}
                actionIcon={
                    <button>
                        {' '}
                        <ChevronRight size={16} />{' '}
                    </button>
                }
            />
            <StatCard
                title="Monthly Sales"
                value="$32,450"
                subtitle="This month"
                variant={StatCardVariant.BAR}
                chartData={conversionData}
                change={{
                    value: 8.3,
                    valueType: ChangeType.INCREASE,
                }}
            />
            <StatCard
                title="Storage Used"
                value="45.2 GB"
                subtitle="of 100 GB"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={45}
            />

            {/* With Icons */}
            <StatCard
                title="Total Revenue"
                value="$1,234,567.89"
                subtitle="This quarter"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 18.5,
                    valueType: ChangeType.INCREASE,
                }}
                titleIcon={<DollarSign size={24} />}
                helpIconText="Total revenue from all sources"
            />
            <StatCard
                title="Active Users"
                value="12,543"
                subtitle="Monthly active"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 8.3,
                    valueType: ChangeType.INCREASE,
                }}
                titleIcon={<Users size={24} />}
            />
            <StatCard
                title="Revenue Trend"
                value="$45,231"
                subtitle="Last 30 days"
                variant={StatCardVariant.LINE}
                chartData={revenueData}
                change={{
                    value: 15.8,
                    valueType: ChangeType.INCREASE,
                }}
                titleIcon={<TrendingUp size={16} />}
            />
            <StatCard
                title="System Performance"
                value="87.3%"
                subtitle="Current status"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={87.3}
                titleIcon={<Activity size={16} />}
            />

            {/* With Tooltips */}
            <StatCard
                title="Total Revenue"
                value="$45,231"
                subtitle="Last 30 days"
                variant={StatCardVariant.NUMBER}
                valueTooltip="Total revenue from all sources including subscriptions, sales, and add-ons"
                change={{
                    value: 12.5,
                    valueType: ChangeType.INCREASE,
                    tooltip: '12.5% increase compared to last month',
                }}
            />
            <StatCard
                title="Conversion Rate"
                value="3.247%"
                subtitle="Last 30 days"
                variant={StatCardVariant.LINE}
                chartData={conversionData}
                valueTooltip="Conversion rate details: Visitors: 124,563, Conversions: 4,047"
                change={{
                    value: 12.3,
                    valueType: ChangeType.INCREASE,
                    tooltip: '12.3% improvement over previous month',
                }}
            />

            {/* With Decrease Change */}
            <StatCard
                title="Error Rate"
                value="0.12%"
                subtitle="Last hour"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 23.5,
                    valueType: ChangeType.DECREASE,
                }}
            />

            {/* Horizontal Direction */}
            <StatCard
                title="Revenue Growth"
                value="$89,450"
                subtitle="This month"
                variant={StatCardVariant.LINE}
                direction={StatCardDirection.HORIZONTAL}
                chartData={revenueData}
                change={{
                    value: 15.8,
                    valueType: ChangeType.INCREASE,
                }}
            />

            {/* All Variants with All Features */}
            <StatCard
                title="Total Revenue"
                value="$1,234,567.89"
                subtitle="This quarter"
                variant={StatCardVariant.NUMBER}
                change={{
                    value: 18.5,
                    valueType: ChangeType.INCREASE,
                    tooltip: '18.5% increase compared to last quarter',
                }}
                titleIcon={<DollarSign size={24} />}
                helpIconText="Total revenue from all sources including subscriptions, sales, and add-ons"
                valueTooltip="Revenue breakdown: Subscriptions: $800,000, One-time sales: $300,000, Add-ons: $134,567.89"
            />
            <StatCard
                title="Conversion Rate"
                value="3.247%"
                subtitle="Last 30 days"
                variant={StatCardVariant.LINE}
                chartData={conversionData}
                change={{
                    value: 12.3,
                    valueType: ChangeType.INCREASE,
                    tooltip: '12.3% improvement over previous month',
                }}
                titleIcon={<Target size={16} />}
                helpIconText="Conversion rate metrics and trends"
            />
            <StatCard
                title="Active Users"
                value="12,543"
                subtitle="Monthly active"
                variant={StatCardVariant.BAR}
                chartData={userData}
                change={{
                    value: 8.3,
                    valueType: ChangeType.INCREASE,
                }}
                titleIcon={<Users size={24} />}
            />
            <StatCard
                title="System Performance"
                value="87.3%"
                subtitle="Current status"
                variant={StatCardVariant.PROGRESS_BAR}
                progressValue={87.3}
                titleIcon={<Activity size={16} />}
                helpIconText="System performance metrics including CPU, memory, and network usage"
            />
        </div>
    )
}

export default StatCardLightHouse
