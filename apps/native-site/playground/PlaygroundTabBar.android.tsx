import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DARK_CHROME, useChrome } from './chrome'
import { TAB_ITEMS } from './tabBar.shared'
import type { TabBarProps } from './tabBar.shared'

/**
 * Material 3 navigation bar: 80dp container, a 64x32dp pill indicator that
 * sits behind the active icon, and the label underneath.
 *
 * The colours are M3 roles rather than the harness palette — a navigation
 * bar is one of the few places where matching the platform matters more than
 * matching the app, and `surfaceContainer` / `secondaryContainer` have no
 * equivalent in the chrome palette.
 */
const M3 = {
    light: {
        container: '#F3F3FA',
        indicator: '#DCE1FF',
        activeIcon: '#151B2C',
        activeLabel: '#191C20',
        inactive: '#44474E',
    },
    dark: {
        container: '#1B1B1F',
        indicator: '#3F4759',
        activeIcon: '#DCE1FF',
        activeLabel: '#E2E2E9',
        inactive: '#C4C6CF',
    },
}

export default function PlaygroundTabBar({
    value,
    onChange,
    tabs,
}: TabBarProps) {
    const chrome = useChrome()
    const insets = useSafeAreaInsets()
    const colors = chrome === DARK_CHROME ? M3.dark : M3.light

    return (
        <View
            accessibilityRole="tablist"
            style={[
                styles.bar,
                {
                    backgroundColor: colors.container,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            {tabs.map((key) => {
                const item = TAB_ITEMS[key]
                const selected = key === value
                return (
                    <Pressable
                        key={key}
                        onPress={() => onChange(key)}
                        accessibilityRole="tab"
                        accessibilityState={{ selected }}
                        accessibilityLabel={item.label}
                        android_ripple={{
                            color: colors.indicator,
                            borderless: false,
                        }}
                        style={styles.item}
                    >
                        <View
                            style={[
                                styles.indicator,
                                selected
                                    ? { backgroundColor: colors.indicator }
                                    : null,
                            ]}
                        >
                            <item.icon
                                size={24}
                                color={
                                    selected
                                        ? colors.activeIcon
                                        : colors.inactive
                                }
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                {
                                    color: selected
                                        ? colors.activeLabel
                                        : colors.inactive,
                                    fontWeight: selected ? '700' : '500',
                                },
                            ]}
                        >
                            {item.label}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    bar: { flexDirection: 'row' },
    item: {
        flex: 1,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    indicator: {
        width: 64,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: { fontSize: 12, letterSpacing: 0.5 },
})
