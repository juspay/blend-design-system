import { View, Text as RNText, StyleSheet } from 'react-native'
import {
    Alert,
    AlertActionPosition,
    AlertSubType,
    AlertType,
} from 'blend-native'
import { Info, TriangleAlert } from 'lucide-react-native'

/**
 * Visual parity harness for the native `Alert`.
 *
 * Mirrors the sections in Storybook's `AlertV2` stories so the two can be
 * compared side by side.
 */

const TYPES = [
    AlertType.PRIMARY,
    AlertType.SUCCESS,
    AlertType.WARNING,
    AlertType.ERROR,
    AlertType.PURPLE,
    AlertType.ORANGE,
    AlertType.NEUTRAL,
]

const LONG_DESCRIPTION =
    'Your payment method expires soon. Update it before the next billing cycle to avoid any interruption to your subscription and ongoing payouts.'

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
            <View style={styles.stack}>{children}</View>
        </View>
    )
}

export default function AlertShowcase() {
    return (
        <View style={styles.container}>
            <Section title="Long description — must wrap, not clip">
                <Alert
                    type={AlertType.ERROR}
                    heading="Subscription at risk"
                    description={LONG_DESCRIPTION}
                    actions={{
                        primaryAction: {
                            text: 'Update now',
                            onPress: () => {},
                        },
                    }}
                    announce={false}
                />
            </Section>

            <Section title="Types (subtle)">
                {TYPES.map((type) => (
                    <Alert
                        key={type}
                        type={type}
                        heading={type}
                        description="A short supporting line of description."
                        announce={false}
                    />
                ))}
            </Section>

            <Section title="Types (noFill)">
                {TYPES.map((type) => (
                    <Alert
                        key={type}
                        type={type}
                        subType={AlertSubType.NO_FILL}
                        heading={type}
                        description="A short supporting line of description."
                        announce={false}
                    />
                ))}
            </Section>

            <Section title="Actions — bottom">
                <Alert
                    heading="Payment method expiring"
                    description="Update it before the next billing cycle."
                    actions={{
                        position: AlertActionPosition.BOTTOM,
                        primaryAction: { text: 'Update', onPress: () => {} },
                        secondaryAction: { text: 'Dismiss', onPress: () => {} },
                    }}
                    announce={false}
                />
            </Section>

            <Section title="Actions — right (separator before close)">
                <Alert
                    type={AlertType.WARNING}
                    heading="Verification pending"
                    actions={{
                        position: AlertActionPosition.RIGHT,
                        primaryAction: { text: 'Verify', onPress: () => {} },
                    }}
                    announce={false}
                />
            </Section>

            <Section title="Slot — icon must be tinted, not boxed">
                <Alert
                    type={AlertType.PRIMARY}
                    slot={{ slot: <Info /> }}
                    heading="With a leading icon"
                    description="The icon takes its colour from the alert type."
                    announce={false}
                />
                <Alert
                    type={AlertType.WARNING}
                    slot={{ slot: <TriangleAlert /> }}
                    heading="Warning with icon"
                    announce={false}
                />
            </Section>

            <Section title="Without close button">
                <Alert
                    type={AlertType.SUCCESS}
                    heading="Saved"
                    description="No close affordance on this one."
                    closeButton={{ show: false }}
                    announce={false}
                />
            </Section>

            <Section title="Heading only / description only">
                <Alert heading="Heading only" announce={false} />
                <Alert description="Description only." announce={false} />
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
    stack: { gap: 8 },
})
