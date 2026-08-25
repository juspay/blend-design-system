import { useState } from 'react'
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text as RNText,
    View,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BlendNativeProvider, Theme } from '@juspay/blend-native'
import ButtonShowcase from './components/ButtonShowcase'
import TagShowcase from './components/TagShowcase'
import AlertShowcase from './components/AlertShowcase'
import SheetShowcase from './components/SheetShowcase'
import InputShowcase from './components/InputShowcase'
import PlatformPreview from './components/PlatformPreview'

type Tab = 'alert' | 'tag' | 'button' | 'sheet' | 'input'

export default function App() {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [tab, setTab] = useState<Tab>('alert')

    const isDark = theme === Theme.DARK
    const palette = isDark
        ? { bg: '#0E0F11', fg: '#F5F6F7', muted: '#2A2D33' }
        : { bg: '#FFFFFF', fg: '#1A1C23', muted: '#F0F2F5' }

    return (
        <PlatformPreview>
            {/* GestureHandlerRootView is required for BottomSheet's pan
                gesture; apps on react-navigation already have one. */}
            <GestureHandlerRootView style={styles.container}>
                {/* A single provider themes every Blend component beneath it.
                    Before this existed each component took its own `theme`
                    prop, so an app-wide toggle was not expressible. */}
                <BlendNativeProvider theme={theme}>
                    <SafeAreaView
                        style={[
                            styles.container,
                            { backgroundColor: palette.bg },
                        ]}
                    >
                        <StatusBar
                            barStyle={isDark ? 'light-content' : 'dark-content'}
                        />
                        <ScrollView contentContainerStyle={styles.scroll}>
                            <RNText
                                style={[styles.header, { color: palette.fg }]}
                            >
                                Blend Native
                            </RNText>

                            <View style={styles.controls}>
                                {(
                                    [
                                        'alert',
                                        'tag',
                                        'button',
                                        'sheet',
                                        'input',
                                    ] as Tab[]
                                ).map((value) => (
                                    <Pressable
                                        key={value}
                                        onPress={() => setTab(value)}
                                        style={[
                                            styles.control,
                                            {
                                                backgroundColor:
                                                    tab === value
                                                        ? palette.muted
                                                        : 'transparent',
                                            },
                                        ]}
                                    >
                                        <RNText style={{ color: palette.fg }}>
                                            {value[0].toUpperCase() +
                                                value.slice(1)}
                                        </RNText>
                                    </Pressable>
                                ))}

                                <Pressable
                                    onPress={() =>
                                        setTheme(
                                            isDark ? Theme.LIGHT : Theme.DARK
                                        )
                                    }
                                    style={[
                                        styles.control,
                                        { backgroundColor: palette.muted },
                                    ]}
                                >
                                    <RNText style={{ color: palette.fg }}>
                                        {isDark ? '☾ Dark' : '☀ Light'}
                                    </RNText>
                                </Pressable>
                            </View>

                            {tab === 'alert' ? <AlertShowcase /> : null}
                            {tab === 'tag' ? <TagShowcase /> : null}
                            {tab === 'button' ? <ButtonShowcase /> : null}
                            {tab === 'sheet' ? <SheetShowcase /> : null}
                            {tab === 'input' ? <InputShowcase /> : null}
                        </ScrollView>
                    </SafeAreaView>
                </BlendNativeProvider>
            </GestureHandlerRootView>
        </PlatformPreview>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 16, gap: 8 },
    header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
    controls: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    control: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
})
