import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Menu, Moon, Sun } from 'lucide-react-native'
import { useChrome } from './chrome'

/** Height of the title row, excluding the status-bar inset. */
export const APP_BAR_HEIGHT = 52

/**
 * Title, the drawer trigger, and the app-wide light/dark toggle.
 *
 * The row collapses to nothing as the user scrolls down (`useHideOnScroll`
 * supplies `rowStyle`). The safe-area inset above it does not collapse —
 * losing that would let the content slide under the status bar.
 */
export default function AppBar({
    title,
    onOpenDrawer,
    isDark,
    onToggleTheme,
    showMenuButton,
    rowStyle,
}: {
    title: string
    onOpenDrawer: () => void
    isDark: boolean
    onToggleTheme: () => void
    /** Hidden when the drawer is permanent — there is nothing to open. */
    showMenuButton: boolean
    /**
     * The collapsing height/opacity from `useHideOnScroll`. Typed as
     * Reanimated's own style rather than `StyleProp<ViewStyle>`, which does
     * not accept an animated style handle.
     */
    rowStyle?: AnimatedStyle<ViewStyle>
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
            <Animated.View style={[styles.row, rowStyle]}>
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
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: { borderBottomWidth: StyleSheet.hairlineWidth },
    row: {
        height: APP_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        gap: 4,
        // The row's height animates to zero; without this its children would
        // spill past the collapsing box on the way.
        overflow: 'hidden',
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
