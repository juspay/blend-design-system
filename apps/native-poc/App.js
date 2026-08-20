import { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
    ButtonV2Type,
    ButtonV2Size,
    ButtonV2SubType,
} from '@juspay/blend-design-system/lib/components/ButtonV2/buttonV2.types'
import ButtonV2 from '@juspay/blend-design-system/lib/components/ButtonV2/ButtonV2.native'

class ErrorBoundary extends Component {
    state = { error: null }
    static getDerivedStateFromError(error) {
        return { error }
    }
    render() {
        if (this.state.error) {
            return (
                <View style={styles.errorBox}>
                    <Text style={styles.errorTitle}>Render Error:</Text>
                    <Text style={styles.errorText}>
                        {String(this.state.error.message)}
                    </Text>
                    <Text style={styles.errorText}>
                        {String(this.state.error.stack)}
                    </Text>
                </View>
            )
        }
        return this.props.children
    }
}

const PlaceholderIcon = ({ color = '#666', size = 16 }) => (
    <View
        style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
        }}
    />
)

const Section = ({ title, desc, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {desc ? <Text style={styles.sectionDesc}>{desc}</Text> : null}
        </View>
        <View style={styles.sectionBody}>{children}</View>
    </View>
)

const Row = ({ label, children }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.rowContent}>{children}</View>
    </View>
)

export default function App() {
    return (
        <ErrorBoundary>
            <ScrollView
                style={styles.viewport}
                contentContainerStyle={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>ButtonV2 — Native</Text>
                    <Text style={styles.headerSubtitle}>
                        Cross-platform rendering of ButtonV2 using the live
                        BUTTONV2 token set. Same tokens, same API, RN renderer.
                    </Text>
                </View>

                <Section
                    title="Types"
                    desc="The four button types. All driven by the same token matrix."
                >
                    <Row label="Primary">
                        <ButtonV2
                            text="Primary"
                            buttonType={ButtonV2Type.PRIMARY}
                            onClick={() => console.log('Primary')}
                        />
                    </Row>
                    <Row label="Secondary">
                        <ButtonV2
                            text="Secondary"
                            buttonType={ButtonV2Type.SECONDARY}
                            onClick={() => console.log('Secondary')}
                        />
                    </Row>
                    <Row label="Danger">
                        <ButtonV2
                            text="Danger"
                            buttonType={ButtonV2Type.DANGER}
                            onClick={() => console.log('Danger')}
                        />
                    </Row>
                    <Row label="Success">
                        <ButtonV2
                            text="Success"
                            buttonType={ButtonV2Type.SUCCESS}
                            onClick={() => console.log('Success')}
                        />
                    </Row>
                </Section>

                <Section
                    title="Sizes"
                    desc="Small, medium, large — driven by token.padding[*][size] and tokens.text.fontSize[size]."
                >
                    <Row label="Small">
                        <ButtonV2
                            text="Small"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.SMALL}
                        />
                    </Row>
                    <Row label="Medium">
                        <ButtonV2
                            text="Medium"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.MEDIUM}
                        />
                    </Row>
                    <Row label="Large">
                        <ButtonV2
                            text="Large"
                            buttonType={ButtonV2Type.PRIMARY}
                            size={ButtonV2Size.LARGE}
                        />
                    </Row>
                </Section>

                <Section
                    title="Subtypes"
                    desc="default | iconOnly | inline — subtype controls padding, border-radius, and background."
                >
                    <Row label="Default">
                        <ButtonV2
                            text="Default"
                            buttonType={ButtonV2Type.PRIMARY}
                            subType={ButtonV2SubType.DEFAULT}
                        />
                    </Row>
                    <Row label="Icon only">
                        <ButtonV2
                            buttonType={ButtonV2Type.PRIMARY}
                            subType={ButtonV2SubType.ICON_ONLY}
                            leftSlot={{
                                slot: (
                                    <PlaceholderIcon color="#fff" size={14} />
                                ),
                            }}
                        />
                    </Row>
                    <Row label="Inline">
                        <ButtonV2
                            text="Inline button"
                            buttonType={ButtonV2Type.PRIMARY}
                            subType={ButtonV2SubType.INLINE}
                        />
                    </Row>
                </Section>

                <Section
                    title="Icons"
                    desc="leftSlot and rightSlot accept any React node."
                >
                    <Row label="Leading">
                        <ButtonV2
                            text="Settings"
                            buttonType={ButtonV2Type.SECONDARY}
                            leftSlot={{
                                slot: (
                                    <PlaceholderIcon color="#444" size={14} />
                                ),
                            }}
                        />
                    </Row>
                    <Row label="Trailing">
                        <ButtonV2
                            text="Next"
                            buttonType={ButtonV2Type.PRIMARY}
                            rightSlot={{
                                slot: (
                                    <PlaceholderIcon color="#fff" size={10} />
                                ),
                            }}
                        />
                    </Row>
                    <Row label="Both">
                        <ButtonV2
                            text="Both"
                            buttonType={ButtonV2Type.SECONDARY}
                            leftSlot={{
                                slot: (
                                    <PlaceholderIcon color="#444" size={10} />
                                ),
                            }}
                            rightSlot={{
                                slot: (
                                    <PlaceholderIcon color="#444" size={10} />
                                ),
                            }}
                        />
                    </Row>
                </Section>

                <Section
                    title="States"
                    desc="Disabled and loading — interactive states handled by Pressable."
                >
                    <Row label="Default">
                        <ButtonV2
                            text="Default"
                            buttonType={ButtonV2Type.PRIMARY}
                        />
                    </Row>
                    <Row label="Pressed (tap and hold)">
                        <ButtonV2
                            text="Press me"
                            buttonType={ButtonV2Type.PRIMARY}
                        />
                    </Row>
                    <Row label="Disabled">
                        <ButtonV2
                            text="Disabled"
                            buttonType={ButtonV2Type.PRIMARY}
                            disabled
                            onClick={() => console.log('Should not fire')}
                        />
                    </Row>
                    <Row label="Loading">
                        <ButtonV2
                            text="Loading"
                            buttonType={ButtonV2Type.PRIMARY}
                            loading
                        />
                    </Row>
                </Section>

                <Section
                    title="Type × Subtype matrix"
                    desc="Every combination of buttonType × subType. Useful for spotting which token paths are well-formed."
                >
                    {[
                        ButtonV2Type.PRIMARY,
                        ButtonV2Type.SECONDARY,
                        ButtonV2Type.DANGER,
                        ButtonV2Type.SUCCESS,
                    ].map((type) => (
                        <Row
                            key={type}
                            label={type.charAt(0).toUpperCase() + type.slice(1)}
                        >
                            <View style={styles.matrixRow}>
                                <ButtonV2
                                    text="Default"
                                    buttonType={type}
                                    subType={ButtonV2SubType.DEFAULT}
                                />
                                <ButtonV2
                                    buttonType={type}
                                    subType={ButtonV2SubType.ICON_ONLY}
                                    leftSlot={{
                                        slot: (
                                            <PlaceholderIcon
                                                color="#fff"
                                                size={14}
                                            />
                                        ),
                                    }}
                                />
                                <ButtonV2
                                    text="Inline"
                                    buttonType={type}
                                    subType={ButtonV2SubType.INLINE}
                                />
                            </View>
                        </Row>
                    ))}
                </Section>

                <Section
                    title="Width"
                    desc="width prop accepts numbers ('100%' is not supported in RN; use a number)."
                >
                    <Row label="Auto">
                        <ButtonV2
                            text="Auto width"
                            buttonType={ButtonV2Type.PRIMARY}
                        />
                    </Row>
                    <Row label="Fixed (280px)">
                        <ButtonV2
                            text="Fixed width"
                            buttonType={ButtonV2Type.SUCCESS}
                            width={280}
                        />
                    </Row>
                </Section>

                <Footer />
            </ScrollView>
            <StatusBar style="auto" />
        </ErrorBoundary>
    )
}

const Footer = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>
            Renderer: react-native (via .native.tsx) · Tokens: live BUTTONV2 via
            useResponsiveTokens
        </Text>
    </View>
)

const styles = StyleSheet.create({
    viewport: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    container: {
        paddingTop: 40,
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0a0a0a',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#737373',
        lineHeight: 18,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0a0a0a',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    sectionDesc: {
        fontSize: 12,
        color: '#737373',
        lineHeight: 16,
    },
    sectionBody: {
        gap: 12,
    },
    row: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: '#ececec',
    },
    rowLabel: {
        fontSize: 11,
        color: '#a3a3a3',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    matrixRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
    },
    footer: {
        marginTop: 16,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
    },
    footerText: {
        fontSize: 11,
        color: '#a3a3a3',
        textAlign: 'center',
    },
    errorBox: {
        flex: 1,
        backgroundColor: '#ffebee',
        padding: 20,
        marginTop: 60,
        borderRadius: 8,
    },
    errorTitle: {
        color: '#c62828',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    errorText: {
        color: '#c62828',
        fontSize: 12,
        marginBottom: 8,
    },
})
