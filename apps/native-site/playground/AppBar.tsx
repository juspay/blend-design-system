import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Menu, Moon, Sun } from 'lucide-react-native'
import { useChrome } from './chrome'

/** Title, the drawer trigger, and the app-wide light/dark toggle. */
export default function AppBar({
    title,
    onOpenDrawer,
    isDark,
    onToggleTheme,
    showMenuButton,
}: {
    title: string
    onOpenDrawer: () => void
    isDark: boolean
    onToggleTheme: () => void
    /** Hidden when the drawer is permanent — there is nothing to open. */
    showMenuButton: boolean
}) {
    const chrome = useChrome()
    const insets = useSafeAreaInsets()

    return (
        <View
            style={[
                styles.bar,
                {
                    backgroundColor: chrome.bg,
                    borderBottomColor: chrome.border,
                    paddingTop: insets.top,
                },
            ]}
        >
            <View style={styles.row}>
                {showMenuButton ? (
                    <Pressable
                        onPress={onOpenDrawer}
                        accessibilityRole="button"
                        accessibilityLabel="Open the component list"
                        android_ripple={{
                            color: chrome.surfaceAlt,
                            borderless: true,
                        }}
                        style={styles.iconButton}
                    >
                        <Menu size={22} color={chrome.fg} />
                    </Pressable>
                ) : null}

                <Text
                    numberOfLines={1}
                    style={[styles.title, { color: chrome.fg }]}
                >
                    {title}
                </Text>

                <Pressable
                    onPress={onToggleTheme}
                    accessibilityRole="switch"
                    accessibilityState={{ checked: isDark }}
                    accessibilityLabel={
                        isDark
                            ? 'Switch to light theme'
                            : 'Switch to dark theme'
                    }
                    android_ripple={{
                        color: chrome.surfaceAlt,
                        borderless: true,
                    }}
                    style={styles.iconButton}
                >
                    {isDark ? (
                        <Moon size={20} color={chrome.fg} />
                    ) : (
                        <Sun size={20} color={chrome.fg} />
                    )}
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: { borderBottomWidth: StyleSheet.hairlineWidth },
    row: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        gap: 4,
    },
    iconButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: '700',
        paddingHorizontal: 6,
    },
})
