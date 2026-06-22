import { useState } from 'react'
import { ScrollView, Text, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonV2Native from './components/button.native'
import {
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '../../blend/lib/components/ButtonV2/buttonV2.types'

export default function App() {
    const [lastPressed, setLastPressed] = useState<string | null>(null)

    const press = (label: string) => setLastPressed(label)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
            <ScrollView contentContainerStyle={{ padding: 24, gap: 20 }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#111827',
                    }}
                >
                    Blend UI
                </Text>
                <Text
                    style={{ fontSize: 13, color: '#6B7280', marginTop: -16 }}
                >
                    Button Native POC
                </Text>

                {lastPressed && (
                    <View
                        style={{
                            backgroundColor: '#D1FAE5',
                            borderRadius: 8,
                            padding: 12,
                            borderLeftWidth: 4,
                            borderLeftColor: '#10B981',
                        }}
                    >
                        <Text
                            style={{
                                color: '#065F46',
                                fontWeight: '600',
                                fontSize: 13,
                            }}
                        >
                            ✓ Pressed: {lastPressed}
                        </Text>
                    </View>
                )}

                <Section title="Primary">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        text="Pay Now"
                        onClick={() => press('Primary — Pay Now')}
                    />
                </Section>

                <Section title="Secondary">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.SECONDARY}
                        text="Cancel"
                        onClick={() => press('Secondary — Cancel')}
                    />
                </Section>

                <Section title="Danger">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.DANGER}
                        text="Delete"
                        onClick={() => press('Danger — Delete')}
                    />
                </Section>

                <Section title="Success">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.SUCCESS}
                        text="Confirm"
                        onClick={() => press('Success — Confirm')}
                    />
                </Section>

                <Section title="Sizes">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.SMALL}
                        text="Small"
                        onClick={() => press('Size — Small')}
                    />
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.MEDIUM}
                        text="Medium"
                        onClick={() => press('Size — Medium')}
                    />
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.LARGE}
                        text="Large"
                        onClick={() => press('Size — Large')}
                    />
                </Section>

                <Section title="Inline subtype">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        subType={ButtonV2SubType.INLINE}
                        text="Inline button"
                        onClick={() => press('Inline button')}
                    />
                </Section>

                <Section title="Loading">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        text="Submitting..."
                        loading
                    />
                </Section>

                <Section title="Disabled">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        text="Disabled"
                        disabled
                    />
                    <ButtonV2Native
                        buttonType={ButtonV2Type.SECONDARY}
                        text="Disabled"
                        disabled
                    />
                </Section>

                <Section title="Full width">
                    <ButtonV2Native
                        buttonType={ButtonV2Type.PRIMARY}
                        text="Full width"
                        width="100%"
                        onClick={() => press('Full width')}
                    />
                </Section>
            </ScrollView>
        </SafeAreaView>
    )
}

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <View style={{ gap: 8 }}>
            <Text
                style={{
                    fontSize: 11,
                    color: '#9CA3AF',
                    fontWeight: '600',
                    letterSpacing: 1,
                }}
            >
                {title.toUpperCase()}
            </Text>
            <View style={{ gap: 8 }}>{children}</View>
        </View>
    )
}
