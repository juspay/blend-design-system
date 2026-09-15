import { useCallback, useMemo, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Drawer } from 'react-native-drawer-layout'
import { BlendNativeProvider, Theme } from 'blend-native'
import PlatformPreview from './components/PlatformPreview'
import AppBar, { APP_BAR_HEIGHT } from './playground/AppBar'
import ComponentDrawer from './playground/ComponentDrawer'
import Playground from './playground/Playground'
import { ChromeContext, DARK_CHROME, LIGHT_CHROME } from './playground/chrome'
import { COMPONENT_GROUPS, findSpec } from './playground/specs'
import { useHideOnScroll } from './playground/useHideOnScroll'

/**
 * The drawer picks the component; the playground is the whole screen.
 *
 * Blend's own components appear inside the stage, and in the two places the
 * control panel knowingly borrows from the library (the picker's sheet and
 * the JSX accordion). Everything else here is plain React Native, so a
 * regression cannot take the instrument used to inspect it down with it.
 */

/** Past this the drawer stays open instead of hiding behind the hamburger. */
const PERMANENT_DRAWER_WIDTH = 1024

export default function App() {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [componentName, setComponentName] = useState(
        COMPONENT_GROUPS[0].specs[0].name
    )
    const [drawerOpen, setDrawerOpen] = useState(false)

    // Measured rather than read from `useWindowDimensions`: on the web target
    // the app renders inside a phone frame, and the window width says 1280
    // while the app has 390. Trusting the window there pins the drawer open
    // and squeezes the content into what is left.
    const [availableWidth, setAvailableWidth] = useState(0)
    const measure = useCallback((event: LayoutChangeEvent) => {
        setAvailableWidth(event.nativeEvent.layout.width)
    }, [])
    const permanent = availableWidth >= PERMANENT_DRAWER_WIDTH

    const isDark = theme === Theme.DARK
    const chrome = isDark ? DARK_CHROME : LIGHT_CHROME

    const spec = useMemo(() => findSpec(componentName), [componentName])

    const {
        onScroll,
        style: appBarRowStyle,
        reveal,
    } = useHideOnScroll(APP_BAR_HEIGHT)

    const selectComponent = useCallback(
        (name: string) => {
            setComponentName(name)
            setDrawerOpen(false)
            // A new component starts at the top, so the header comes back
            // with it.
            reveal()
        },
        [reveal]
    )

    return (
        <PlatformPreview>
            <SafeAreaProvider>
                {/* GestureHandlerRootView backs both the drawer's edge swipe
                    and BottomSheet's pan gesture. */}
                <GestureHandlerRootView style={styles.fill}>
                    <BlendNativeProvider theme={theme}>
                        <ChromeContext.Provider value={chrome}>
                            <StatusBar
                                barStyle={
                                    isDark ? 'light-content' : 'dark-content'
                                }
                            />
                            <View style={styles.fill} onLayout={measure}>
                                <Drawer
                                    open={drawerOpen}
                                    onOpen={() => setDrawerOpen(true)}
                                    onClose={() => setDrawerOpen(false)}
                                    drawerType={
                                        permanent ? 'permanent' : 'front'
                                    }
                                    drawerStyle={{
                                        width: 260,
                                        backgroundColor: chrome.bg,
                                        borderRightColor: chrome.border,
                                        borderRightWidth: permanent
                                            ? StyleSheet.hairlineWidth
                                            : 0,
                                    }}
                                    renderDrawerContent={() => (
                                        <ComponentDrawer
                                            groups={COMPONENT_GROUPS}
                                            value={componentName}
                                            onChange={selectComponent}
                                        />
                                    )}
                                >
                                    <View
                                        style={[
                                            styles.fill,
                                            { backgroundColor: chrome.bg },
                                        ]}
                                    >
                                        <AppBar
                                            title={spec.name}
                                            showMenuButton={!permanent}
                                            onOpenDrawer={() =>
                                                setDrawerOpen(true)
                                            }
                                            isDark={isDark}
                                            onToggleTheme={() =>
                                                setTheme(
                                                    isDark
                                                        ? Theme.LIGHT
                                                        : Theme.DARK
                                                )
                                            }
                                            rowStyle={appBarRowStyle}
                                        />

                                        {/* Keyed so switching component
                                            resets the props to that spec's
                                            defaults. */}
                                        <Playground
                                            key={spec.name}
                                            spec={spec}
                                            onScroll={onScroll}
                                        />
                                    </View>
                                </Drawer>
                            </View>
                        </ChromeContext.Provider>
                    </BlendNativeProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </PlatformPreview>
    )
}

const styles = StyleSheet.create({
    fill: { flex: 1 },
})
