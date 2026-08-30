import { View, StyleSheet, Text as RNText } from 'react-native'
import { Chart, ChartHeader } from 'blend-native'
import type { ChartSeries, ChartPieSlice } from 'blend-native'

/**
 * Visual parity harness for Chart — every chart type, multi-series,
 * single-series, with/without legend, with/without grid, axes on/off,
 * skeleton, no-data, donut center labels. Compare against Storybook's
 * ChartV2 stories.
 */

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <View style={styles.section}>
            <RNText style={styles.sectionTitle}>{title}</RNText>
            <View style={styles.column}>{children}</View>
        </View>
    )
}

// ---- Sample data ---------------------------------------------------------

const MONTHLY_REVENUE: ChartSeries[] = [
    {
        name: 'Revenue',
        data: [
            { x: 'Jan', y: 32 },
            { x: 'Feb', y: 45 },
            { x: 'Mar', y: 38 },
            { x: 'Apr', y: 52 },
            { x: 'May', y: 48 },
            { x: 'Jun', y: 61 },
            { x: 'Jul', y: 55 },
            { x: 'Aug', y: 67 },
        ],
    },
]

const REVENUE_VS_COSTS: ChartSeries[] = [
    {
        name: 'Revenue',
        data: [
            { x: 'Jan', y: 32 },
            { x: 'Feb', y: 45 },
            { x: 'Mar', y: 38 },
            { x: 'Apr', y: 52 },
            { x: 'May', y: 48 },
            { x: 'Jun', y: 61 },
        ],
    },
    {
        name: 'Costs',
        data: [
            { x: 'Jan', y: 22 },
            { x: 'Feb', y: 30 },
            { x: 'Mar', y: 28 },
            { x: 'Apr', y: 35 },
            { x: 'May', y: 33 },
            { x: 'Jun', y: 40 },
        ],
    },
]

const THREE_SERIES: ChartSeries[] = [
    {
        name: 'Online',
        data: [
            { x: 'Mon', y: 120 },
            { x: 'Tue', y: 145 },
            { x: 'Wed', y: 132 },
            { x: 'Thu', y: 168 },
            { x: 'Fri', y: 155 },
            { x: 'Sat', y: 98 },
            { x: 'Sun', y: 76 },
        ],
    },
    {
        name: 'In-store',
        data: [
            { x: 'Mon', y: 80 },
            { x: 'Tue', y: 95 },
            { x: 'Wed', y: 88 },
            { x: 'Thu', y: 110 },
            { x: 'Fri', y: 125 },
            { x: 'Sat', y: 140 },
            { x: 'Sun', y: 105 },
        ],
    },
    {
        name: 'Partner',
        data: [
            { x: 'Mon', y: 30 },
            { x: 'Tue', y: 42 },
            { x: 'Wed', y: 38 },
            { x: 'Thu', y: 45 },
            { x: 'Fri', y: 52 },
            { x: 'Sat', y: 48 },
            { x: 'Sun', y: 35 },
        ],
    },
]

const COLUMN_DATA: ChartSeries[] = [
    {
        name: 'Transactions',
        data: [
            { x: 'Jan', y: 420 },
            { x: 'Feb', y: 580 },
            { x: 'Mar', y: 490 },
            { x: 'Apr', y: 670 },
            { x: 'May', y: 610 },
            { x: 'Jun', y: 720 },
        ],
    },
]

const COLUMN_MULTI: ChartSeries[] = [
    {
        name: 'Approved',
        data: [
            { x: 'Q1', y: 320 },
            { x: 'Q2', y: 410 },
            { x: 'Q3', y: 380 },
            { x: 'Q4', y: 450 },
        ],
    },
    {
        name: 'Declined',
        data: [
            { x: 'Q1', y: 45 },
            { x: 'Q2', y: 38 },
            { x: 'Q3', y: 52 },
            { x: 'Q4', y: 41 },
        ],
    },
]

const SCATTER_DATA: ChartSeries[] = [
    {
        name: 'Cluster A',
        data: [
            { x: 1, y: 12 },
            { x: 2, y: 18 },
            { x: 3, y: 15 },
            { x: 4, y: 22 },
            { x: 5, y: 19 },
            { x: 6, y: 25 },
            { x: 7, y: 21 },
            { x: 8, y: 28 },
        ],
    },
    {
        name: 'Cluster B',
        data: [
            { x: 1, y: 5 },
            { x: 2, y: 8 },
            { x: 3, y: 6 },
            { x: 4, y: 10 },
            { x: 5, y: 7 },
            { x: 6, y: 12 },
            { x: 7, y: 9 },
            { x: 8, y: 14 },
        ],
    },
]

const DEVICE_SPLIT: ChartPieSlice[] = [
    { label: 'Mobile', value: 42 },
    { label: 'Desktop', value: 28 },
    { label: 'Tablet', value: 18 },
    { label: 'Other', value: 12 },
]

const PAYMENT_SPLIT: ChartPieSlice[] = [
    { label: 'UPI', value: 52 },
    { label: 'Cards', value: 23 },
    { label: 'Net banking', value: 15 },
    { label: 'Wallets', value: 10 },
]

export default function ChartShowcase() {
    return (
        <View style={styles.container}>
            {/* --- Line charts --- */}
            <Section title="Line — single series">
                <Chart
                    type="line"
                    series={MONTHLY_REVENUE}
                    height={250}
                    showLegend={false}
                />
            </Section>

            <Section title="Line — multi-series with legend">
                <Chart
                    type="line"
                    series={REVENUE_VS_COSTS}
                    height={250}
                    showLegend
                />
            </Section>

            <Section title="Line — three series, grid off">
                <Chart
                    type="line"
                    series={THREE_SERIES}
                    height={250}
                    showLegend
                    showGrid={false}
                />
            </Section>

            <Section title="Line — axes off">
                <Chart
                    type="line"
                    series={REVENUE_VS_COSTS}
                    height={250}
                    showLegend
                    showXAxis={false}
                    showYAxis={false}
                />
            </Section>

            {/* --- Area charts --- */}
            <Section title="Area — single series">
                <Chart
                    type="area"
                    series={MONTHLY_REVENUE}
                    height={250}
                    showLegend={false}
                />
            </Section>

            <Section title="Area — multi-series with legend">
                <Chart
                    type="area"
                    series={REVENUE_VS_COSTS}
                    height={250}
                    showLegend
                />
            </Section>

            {/* --- Column / Bar charts --- */}
            <Section title="Column — single series">
                <Chart
                    type="column"
                    series={COLUMN_DATA}
                    height={250}
                    showLegend={false}
                />
            </Section>

            <Section title="Column — grouped with legend">
                <Chart
                    type="column"
                    series={COLUMN_MULTI}
                    height={250}
                    showLegend
                />
            </Section>

            <Section title="Bar — horizontal (single series)">
                <Chart
                    type="bar"
                    series={COLUMN_DATA}
                    height={250}
                    showLegend={false}
                />
            </Section>

            <Section title="Bar — horizontal grouped with legend">
                <Chart
                    type="bar"
                    series={COLUMN_MULTI}
                    height={250}
                    showLegend
                />
            </Section>

            {/* --- Scatter --- */}
            <Section title="Scatter — two clusters">
                <Chart
                    type="scatter"
                    series={SCATTER_DATA}
                    height={250}
                    showLegend
                />
            </Section>

            <Section title="Scatter — single series, grid off">
                <Chart
                    type="scatter"
                    series={[SCATTER_DATA[0]]}
                    height={250}
                    showLegend={false}
                    showGrid={false}
                />
            </Section>

            {/* --- Pie / Donut --- */}
            <Section title="Pie — device split">
                <Chart type="pie" data={DEVICE_SPLIT} height={300} showLegend />
            </Section>

            <Section title="Donut — with center label">
                <Chart
                    type="donut"
                    data={PAYMENT_SPLIT}
                    height={300}
                    showLegend
                    centerLabel="Total"
                    centerValue="100%"
                />
            </Section>

            <Section title="Pie — no legend, no axes">
                <Chart
                    type="pie"
                    data={DEVICE_SPLIT}
                    height={250}
                    showLegend={false}
                />
            </Section>

            {/* --- With header --- */}
            <Section title="With header — Revenue overview">
                <Chart
                    type="line"
                    series={REVENUE_VS_COSTS}
                    height={250}
                    showLegend
                    header={
                        <ChartHeader>
                            <RNText style={styles.headerTitle}>
                                Revenue vs Costs
                            </RNText>
                        </ChartHeader>
                    }
                />
            </Section>

            {/* --- States --- */}
            <Section title="Skeleton — loading state">
                <Chart type="line" height={250} skeleton={{ show: true }} />
            </Section>

            <Section title="No data — default message">
                <Chart type="line" series={[]} height={250} />
            </Section>

            <Section title="No data — custom message">
                <Chart
                    type="donut"
                    height={250}
                    noData={{
                        title: 'No transactions yet',
                        subtitle: 'Connect a payment gateway to see analytics',
                    }}
                />
            </Section>

            {/* --- Compact heights --- */}
            <Section title="Compact — height 200">
                <Chart
                    type="area"
                    series={REVENUE_VS_COSTS}
                    height={200}
                    showLegend
                />
            </Section>

            <Section title="Compact — height 150, minimal chrome">
                <Chart
                    type="line"
                    series={MONTHLY_REVENUE}
                    height={150}
                    showLegend={false}
                    showGrid={false}
                />
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { gap: 20 },
    section: { gap: 8 },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#717784',
        textTransform: 'uppercase',
    },
    column: {
        flexDirection: 'column',
        gap: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1F2E',
    },
})
