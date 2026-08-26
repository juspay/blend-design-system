import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useChrome } from './chrome'
import { TAB_ITEMS } from './tabBar.shared'
import type { TabBarProps } from './tabBar.shared'

/**
 * Default bar — what the browser target gets. iOS and Android resolve their
 * own files (`.ios` / `.android`) with the platform's real navigation
 * chrome; there is nothing native to reach for here.
 */
export default function PlaygroundTabBar({
    value,
    onChange,
    tabs,
}: TabBarProps) {
    const chrome = useChrome()
    const insets = useSafeAreaInsets()

    return (
        <View
            accessibilityRole="tablist"
            style={[
                styles.bar,
                {
                    backgroundColor: chrome.surface,
                    borderTopColor: chrome.border,
                    paddingBottom: 10 + insets.bottom,
                },
            ]}
        >
            {tabs.map((key) => {
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
                        <item.icon size={20} color={color} />
                        <Text style={[styles.label, { color }]}>
                            {item.label}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingTop: 10,
    },
    item: { flex: 1, alignItems: 'center', gap: 4, minHeight: 44 },
    label: { fontSize: 11, fontWeight: '600' },
})
