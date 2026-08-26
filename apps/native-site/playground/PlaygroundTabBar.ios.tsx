import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect'
import { DARK_CHROME, useChrome } from './chrome'
import { TAB_ITEMS } from './tabBar.shared'
import type { TabBarProps } from './tabBar.shared'

/**
 * iOS tab bar, backed by a real `UIVisualEffectView` through
 * `expo-glass-effect` — the Liquid Glass material iOS 26 uses for its own
 * bars, so content scrolling underneath is refracted rather than merely
 * dimmed.
 *
 * The API only exists on iOS 26 and up, and some 26 builds ship without it,
 * so `isLiquidGlassAvailable()` decides at runtime. On a miss the bar paints
 * an opaque surface instead: a translucent bar with no material behind it
 * would leave the labels sitting unreadably on top of the scroll content.
 *
 * Do not animate this with `opacity` — at 0 the system stops rendering the
 * effect entirely rather than fading it.
 */
const GLASS = isLiquidGlassAvailable()

export default function PlaygroundTabBar({
    value,
    onChange,
    tabs,
}: TabBarProps) {
    const chrome = useChrome()
    const insets = useSafeAreaInsets()
    const isDark = chrome === DARK_CHROME

    const items = tabs.map((key) => {
        const item = TAB_ITEMS[key]
        const selected = key === value
        const color = selected ? chrome.accent : chrome.fgMuted
        return (
            <Pressable
                key={key}
                onPress={() => onChange(key)}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                accessibilityLabel={item.label}
                style={styles.item}
            >
                <item.icon size={22} color={color} />
                <Text style={[styles.label, { color }]}>{item.label}</Text>
            </Pressable>
        )
    })

    const layout = [styles.bar, { paddingBottom: 6 + insets.bottom }]

    if (!GLASS) {
        return (
            <View
                accessibilityRole="tablist"
                style={[
                    layout,
                    {
                        backgroundColor: chrome.surface,
                        borderTopColor: chrome.border,
                        borderTopWidth: StyleSheet.hairlineWidth,
                    },
                ]}
            >
                {items}
            </View>
        )
    }

    return (
        <GlassView
            accessibilityRole="tablist"
            glassEffectStyle="regular"
            // The app has its own light/dark toggle, so the material must not
            // follow the system appearance independently of it.
            colorScheme={isDark ? 'dark' : 'light'}
            style={layout}
        >
            {items}
        </GlassView>
    )
}

const styles = StyleSheet.create({
    bar: { flexDirection: 'row', paddingTop: 8 },
    item: { flex: 1, alignItems: 'center', gap: 3, minHeight: 44 },
    label: { fontSize: 10, fontWeight: '600' },
})
