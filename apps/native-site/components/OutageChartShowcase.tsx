import { View, StyleSheet, Text as RNText } from 'react-native'
import { OutageChart } from 'blend-native'
import type { OutageTrendDatum, OutageZone, OutageSegment } from 'blend-native'

/**
 * OutageChart parity harness — mirrors OutageChartDemoV2.tsx from apps/site:
 * zone-colored trend line over an xrange-style per-bank timeline.
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
            {children}
        </View>
    )
}

const T0 = 1766980800000
const T1 = 1766983387000
const T2 = 1766983828000
const T3 = 1766984400000

const TREND_DATA: OutageTrendDatum[] = [
    { x: 1766980800000, y: 9.3 },
    { x: 1766981100000, y: 6.45 },
    { x: 1766981400000, y: 6.32 },
    { x: 1766981700000, y: 6.25 },
    { x: 1766982000000, y: 7.19 },
    { x: 1766982300000, y: 8.65 },
    { x: 1766982600000, y: 9.01 },
    { x: 1766982900000, y: 8.17 },
    { x: 1766983200000, y: 8.66 },
    { x: 1766983500000, y: 8.45 },
    { x: 1766983800000, y: 7.41 },
    { x: 1766984100000, y: 6.26 },
    { x: 1766984400000, y: 6.75 },
]

const ZONES: OutageZone[] = [
    { from: T0, color: '#FB2C36' },
    { from: T1, color: '#FFC560' },
    { from: T2, color: '#A855F7' },
]

const SEGMENTS: OutageSegment[] = [
    {
        start: T0,
        end: T1,
        laneLabel: 'Central Bank of India',
        color: '#FB2C36',
        meta: { downTime: '2m 3s' },
    },
    {
        start: T1,
        end: T2,
        laneLabel: 'Central Bank of India',
        color: '#FFC560',
        meta: { fluctuation: '1.2%' },
    },
    {
        start: T2,
        end: T3,
        laneLabel: 'Central Bank of India',
        color: '#00C950',
    },
    {
        start: T0,
        end: T1,
        laneLabel: 'Bank of America',
        color: '#FB2C36',
    },
    {
        start: T1,
        end: T2,
        laneLabel: 'Bank of America',
        color: '#FFC560',
    },
    {
        start: T2,
        end: T3,
        laneLabel: 'Bank of America',
        color: '#00C950',
    },
]

export default function OutageChartShowcase() {
    return (
        <View style={styles.container}>
            <Section title="Outage trend + timeline (web parity)">
                <OutageChart
                    trendData={TREND_DATA}
                    zones={ZONES}
                    segments={SEGMENTS}
                    title="UPI Outage Trend"
                />
            </Section>

            <Section title="Single zone color (no zones passed)">
                <OutageChart
                    trendData={TREND_DATA}
                    segments={SEGMENTS}
                    title="Single color"
                    trendColor="#2B7FFF"
                />
            </Section>

            <Section title="Trend only (no timeline)">
                <OutageChart
                    trendData={TREND_DATA}
                    zones={ZONES}
                    title="Trend only"
                />
            </Section>

            <Section title="Timeline only (no trend)">
                <OutageChart trendData={[]} segments={SEGMENTS} />
            </Section>

            <Section title="Skeleton">
                <OutageChart
                    trendData={TREND_DATA}
                    zones={ZONES}
                    segments={SEGMENTS}
                    skeleton={{ show: true }}
                />
            </Section>

            <Section title="No data">
                <OutageChart trendData={[]} segments={[]} />
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
})
