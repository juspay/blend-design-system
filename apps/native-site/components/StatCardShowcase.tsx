import { View, StyleSheet, Text as RNText } from 'react-native'
import {
    StatCard,
    StatCardVariant,
    StatCardChangeType,
    StatCardArrowDirection,
} from 'blend-native'
import type { SparklineDatum } from 'blend-native'

/**
 * Visual parity harness for StatCard — every variant, every change state,
 * skeleton, no-data, and borderless. Compare against Storybook's V2 stories.
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
            <View style={styles.row}>{children}</View>
        </View>
    )
}

const INCREASE = {
    value: '12.4%',
    changeType: StatCardChangeType.INCREASE,
    arrowDirection: StatCardArrowDirection.UP,
    leftSymbol: '+',
}

const DECREASE = {
    value: '3.1%',
    changeType: StatCardChangeType.DECREASE,
    arrowDirection: StatCardArrowDirection.DOWN,
    leftSymbol: '-',
}

const FLAT = {
    value: '0.0%',
    changeType: StatCardChangeType.INCREASE,
    arrowDirection: StatCardArrowDirection.UP,
}

const SPARK_AREA: SparklineDatum[] = [
    { value: 18 },
    { value: 24 },
    { value: 21 },
    { value: 32 },
    { value: 28 },
    { value: 41 },
    { value: 38 },
    { value: 55 },
    { value: 47 },
    { value: 62 },
    { value: 71 },
    { value: 68 },
]

const SPARK_LINE: SparklineDatum[] = [
    { value: 30 },
    { value: 28 },
    { value: 35 },
    { value: 32 },
    { value: 40 },
    { value: 38 },
    { value: 45 },
    { value: 42 },
    { value: 50 },
    { value: 48 },
]

const SPARK_BAR: SparklineDatum[] = [
    { value: 12 },
    { value: 19 },
    { value: 15 },
    { value: 22 },
    { value: 18 },
    { value: 25 },
    { value: 21 },
    { value: 28 },
]

export default function StatCardShowcase() {
    return (
        <View style={styles.container}>
            {/* --- NUMBER variant --- */}
            <Section title="NUMBER — with change indicators">
                <StatCard
                    title="Gross volume"
                    value="₹4,82,310"
                    subtitle="vs. previous 30 days"
                    change={INCREASE}
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
                <StatCard
                    title="Refunds"
                    value="₹12,450"
                    subtitle="vs. previous 30 days"
                    change={DECREASE}
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
                <StatCard
                    title="Net volume"
                    value="₹4,69,860"
                    subtitle="no change"
                    change={FLAT}
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
            </Section>

            <Section title="NUMBER — no change, no subtitle, no border">
                <StatCard
                    title="Active users"
                    value="8,421"
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
                <StatCard
                    title="Active users"
                    value="8,421"
                    subtitle="last 7 days"
                    showBorder={false}
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
            </Section>

            {/* --- PROGRESS_BAR variant --- */}
            <Section title="PROGRESS_BAR — various progress levels">
                <StatCard
                    title="Onboarding"
                    value="Step 3 of 5"
                    progressValue={60}
                    variant={StatCardVariant.PROGRESS_BAR}
                    maxWidth={280}
                />
                <StatCard
                    title="Storage"
                    value="48 GB / 100 GB"
                    progressValue={48}
                    subtitle="Upgrade for more space"
                    change={INCREASE}
                    variant={StatCardVariant.PROGRESS_BAR}
                    maxWidth={280}
                />
                <StatCard
                    title="Complete"
                    value="Done"
                    progressValue={100}
                    variant={StatCardVariant.PROGRESS_BAR}
                    maxWidth={280}
                />
                <StatCard
                    title="Empty"
                    progressValue={0}
                    variant={StatCardVariant.PROGRESS_BAR}
                    maxWidth={280}
                />
            </Section>

            {/* --- CHART variant --- */}
            <Section title="CHART — sparkline types (area / line / bar)">
                <StatCard
                    title="Revenue"
                    value="₹62.4L"
                    subtitle="last 12 months"
                    change={INCREASE}
                    chartData={SPARK_AREA}
                    chartType="area"
                    variant={StatCardVariant.CHART}
                    maxWidth={280}
                />
                <StatCard
                    title="Active users"
                    value="8,421"
                    subtitle="last 10 weeks"
                    change={INCREASE}
                    chartData={SPARK_LINE}
                    chartType="line"
                    variant={StatCardVariant.CHART}
                    maxWidth={280}
                />
                <StatCard
                    title="Weekly signups"
                    value="128"
                    subtitle="this week"
                    change={DECREASE}
                    chartData={SPARK_BAR}
                    chartType="bar"
                    variant={StatCardVariant.CHART}
                    maxWidth={280}
                />
            </Section>

            <Section title="CHART — no data / no change">
                <StatCard
                    title="Pending"
                    value="--"
                    chartData={[]}
                    variant={StatCardVariant.CHART}
                    maxWidth={280}
                />
                <StatCard
                    title="Revenue"
                    value="₹62.4L"
                    chartData={SPARK_AREA}
                    chartType="area"
                    variant={StatCardVariant.CHART}
                    maxWidth={280}
                />
            </Section>

            {/* --- No-data / Skeleton --- */}
            <Section title="No data & skeleton">
                <StatCard
                    title="No data card"
                    variant={StatCardVariant.NUMBER}
                    maxWidth={280}
                />
                <StatCard
                    title="Loading"
                    variant={StatCardVariant.NUMBER}
                    skeleton={{ show: true }}
                    maxWidth={280}
                />
                <StatCard
                    title="Loading chart"
                    variant={StatCardVariant.CHART}
                    skeleton={{ show: true }}
                    maxWidth={280}
                />
                <StatCard
                    title="Loading progress"
                    variant={StatCardVariant.PROGRESS_BAR}
                    skeleton={{ show: true }}
                    maxWidth={280}
                />
            </Section>

            {/* --- Mixed row --- */}
            <Section title="Mixed — all three variants side by side">
                <StatCard
                    title="Gross volume"
                    value="₹4,82,310"
                    change={INCREASE}
                    variant={StatCardVariant.NUMBER}
                    maxWidth={200}
                />
                <StatCard
                    title="Onboarding"
                    value="60%"
                    progressValue={60}
                    variant={StatCardVariant.PROGRESS_BAR}
                    maxWidth={200}
                />
                <StatCard
                    title="Revenue"
                    value="₹62.4L"
                    chartData={SPARK_AREA}
                    chartType="area"
                    variant={StatCardVariant.CHART}
                    maxWidth={200}
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'flex-start',
    },
})
