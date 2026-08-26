import { View, StyleSheet, Text as RNText } from 'react-native'
import {
    Avatar,
    KeyValuePair,
    AvatarShape,
    AvatarSize,
    AvatarStatusType,
} from 'blend-native'

/**
 * Visual parity harness for the display components (Avatar, KeyValuePair,
 * Card). Compare against Storybook's V2 stories.
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

const SIZES = [
    AvatarSize.SM,
    AvatarSize.REGULAR,
    AvatarSize.MD,
    AvatarSize.LG,
    AvatarSize.XL,
]

export default function DisplayShowcase() {
    return (
        <View style={styles.container}>
            <Section title="Avatar — sizes (initials fallback)">
                {SIZES.map((size) => (
                    <Avatar key={size} alt="Jane Doe" size={size} />
                ))}
            </Section>

            <Section title="Avatar — image, rounded, custom fallback">
                <Avatar
                    src="https://i.pravatar.cc/128?img=5"
                    alt="Ana Cortez"
                    size={AvatarSize.LG}
                />
                <Avatar
                    alt="Ravi Kumar"
                    shape={AvatarShape.ROUNDED}
                    size={AvatarSize.LG}
                />
                <Avatar alt="Zed" fallbackText="zz" size={AvatarSize.LG} />
                <Avatar
                    src="https://invalid.example/broken.png"
                    alt="Broken Image"
                    size={AvatarSize.LG}
                />
            </Section>

            <Section title="Avatar — status dots">
                <Avatar
                    alt="Online"
                    size={AvatarSize.LG}
                    status={{ type: AvatarStatusType.ONLINE }}
                />
                <Avatar
                    alt="Away"
                    size={AvatarSize.LG}
                    status={{ type: AvatarStatusType.AWAY }}
                />
                <Avatar
                    alt="Busy"
                    size={AvatarSize.LG}
                    status={{ type: AvatarStatusType.BUSY }}
                />
                <Avatar
                    alt="Offline"
                    shape={AvatarShape.ROUNDED}
                    size={AvatarSize.LG}
                    status={{ type: AvatarStatusType.OFFLINE }}
                />
            </Section>

            <Section title="KeyValuePair — vertical / horizontal / truncation">
                <KeyValuePair keyString="Merchant" value="Acme Payments Ltd" />
                <KeyValuePair
                    keyString="Status"
                    value="Active"
                    orientation="horizontal"
                />
                <KeyValuePair
                    keyString="Very long value"
                    value="This value is far too long to fit and must truncate to a single line"
                />
                <KeyValuePair
                    keyString="Wrapped"
                    value="This value wraps onto two lines at most before clamping"
                    textOverflow="wrap-clamp"
                />
            </Section>

            <Section title="Avatar — skeleton">
                <Avatar
                    alt="Loading"
                    size={AvatarSize.LG}
                    skeleton={{ show: true }}
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
        alignItems: 'center',
    },
})
