import { View, StyleSheet, Text as RNText } from 'react-native'
import { SankeyChart } from 'blend-native'
import type { SankeyNode, SankeyLink } from 'blend-native'

/**
 * Visual parity harness for SankeyChart — payment flow visualization,
 * skeleton, and no-data states.
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

const PAYMENT_NODES: SankeyNode[] = [
    { id: 'initiated', label: 'Initiated' },
    { id: 'success', label: 'Success' },
    { id: 'failure', label: 'Failure' },
    { id: 'pending', label: 'Pending' },
    { id: 'settled', label: 'Settled' },
    { id: 'refunded', label: 'Refunded' },
    { id: 'closed', label: 'Closed' },
]

// Clean 3-column flow:
//   Col 0 = Initiated (1000)
//   Col 1 = Success / Failure / Pending
//   Col 2 = Settled / Refunded / Closed
const PAYMENT_LINKS: SankeyLink[] = [
    { source: 'initiated', target: 'success', value: 720 },
    { source: 'initiated', target: 'failure', value: 180 },
    { source: 'initiated', target: 'pending', value: 100 },
    // Success mostly settles, some refunds.
    { source: 'success', target: 'settled', value: 680 },
    { source: 'success', target: 'refunded', value: 40 },
    // Pending can settle later, or close out.
    { source: 'pending', target: 'settled', value: 80 },
    { source: 'pending', target: 'closed', value: 20 },
    // Failure always closes.
    { source: 'failure', target: 'closed', value: 180 },
]

const SIMPLE_NODES: SankeyNode[] = [
    { id: 'a', label: 'Source A' },
    { id: 'b', label: 'Source B' },
    { id: 'c', label: 'Target C' },
]

const SIMPLE_LINKS: SankeyLink[] = [
    { source: 'a', target: 'c', value: 60 },
    { source: 'b', target: 'c', value: 40 },
]

const COLUMN_NODES: SankeyNode[] = [
    { id: 'start', label: 'Start', column: 0 },
    { id: 'step1', label: 'Step 1', column: 1 },
    { id: 'step2', label: 'Step 2', column: 2 },
    { id: 'end', label: 'End', column: 3 },
]

const COLUMN_LINKS: SankeyLink[] = [
    { source: 'start', target: 'step1', value: 100 },
    { source: 'step1', target: 'step2', value: 80 },
    { source: 'step1', target: 'end', value: 20 },
    { source: 'step2', target: 'end', value: 80 },
]

export default function SankeyChartShowcase() {
    return (
        <View style={styles.container}>
            <Section title="Payment flow — 3 columns, 6 nodes">
                <SankeyChart
                    nodes={PAYMENT_NODES}
                    links={PAYMENT_LINKS}
                    height={360}
                />
            </Section>

            <Section title="Simple — 2 sources converging">
                <SankeyChart
                    nodes={SIMPLE_NODES}
                    links={SIMPLE_LINKS}
                    height={240}
                />
            </Section>

            <Section title="Explicit columns — 4-step pipeline">
                <SankeyChart
                    nodes={COLUMN_NODES}
                    links={COLUMN_LINKS}
                    height={300}
                />
            </Section>

            <Section title="Skeleton">
                <SankeyChart
                    nodes={PAYMENT_NODES}
                    links={PAYMENT_LINKS}
                    height={360}
                    skeleton={{ show: true }}
                />
            </Section>

            <Section title="No data">
                <SankeyChart nodes={[]} links={[]} height={300} />
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
