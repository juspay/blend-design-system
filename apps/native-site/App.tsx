import { useCallback, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    AlertCircle,
    BarChart2,
    Bell,
    Box,
    Briefcase,
    Circle,
    CircleDot,
    DecimalsArrowRightIcon,
    FileText,
    FormInput,
    Grid,
    HelpCircle,
    Layout,
    Lightbulb,
    List,
    ListFilter,
    Menu as MenuIcon,
    MessageCircle,
    Rocket,
    Search,
    Settings,
    Shield,
    Square,
    Tag as TagIconLucide,
    Upload as UploadIcon,
    Users,
} from 'lucide-react-native'
import { BlendNativeProvider, Menu, Sidebar, Theme } from 'blend-native'
import type { SidebarNavItem, SidebarSectionData } from 'blend-native'
import PlatformPreview from './components/PlatformPreview'
import AppBar, { APP_BAR_HEIGHT } from './playground/AppBar'
import Playground from './playground/Playground'
import { ChromeContext, DARK_CHROME, LIGHT_CHROME } from './playground/chrome'
import { COMPONENT_GROUPS, findSpec } from './playground/specs'
import { useHideOnScroll } from './playground/useHideOnScroll'
import interDisplayRegular from './assets/fonts/InterDisplay-Regular.ttf'

/**
 * The nav Sidebar picks the component; the playground is the whole screen.
 *
 * Blend's own components appear inside the stage, and in the two places the
 * control panel knowingly borrows from the library (the picker's sheet and
 * the JSX accordion). The nav itself is now `Sidebar` too — a deliberate
 * exception to "the harness must survive the library breaking" (see
 * `chrome.ts`'s docblock): this app is `Sidebar`'s own dogfooding ground,
 * and seeing it drive real navigation continuously, not just in its own
 * isolated demo entry, is the whole point of putting it here. If `Sidebar`
 * regresses badly enough to break navigation, revert this file to recover.
 *
 * The secondary rail, merchant picker, footer menu, per-item icons and
 * mobile bottom nav below mirror `apps/site`'s own `SidebarV2Demo` — the
 * web library's equivalent "dogfood the nav with the real component"
 * harness — prop for prop, so this reads as the same product's sidebar
 * rather than a bare-bones native stand-in. The workspace/team switchers
 * are cosmetic (local `useState`, no effect on the component grid below),
 * same as web's own demo.
 */

/** Past this the rail docks instead of hiding behind the hamburger. */
const PERMANENT_SIDEBAR_WIDTH = 1024

const ICON_SIZE = 16

/** One representative icon per component, mirroring every row on web's demo having a `leftSlot`. */
const COMPONENT_ICONS: Record<string, ReactElement> = {
    Accordion: <List size={ICON_SIZE} />,
    Alert: <AlertCircle size={ICON_SIZE} />,
    Avatar: <Users size={ICON_SIZE} />,
    Badge: <Circle size={ICON_SIZE} />,
    BottomSheet: <Layout size={ICON_SIZE} />,
    Breadcrumb: <Grid size={ICON_SIZE} />,
    Button: <Square size={ICON_SIZE} />,
    Card: <Square size={ICON_SIZE} />,
    Chart: <BarChart2 size={ICON_SIZE} />,
    Checkbox: <Square size={ICON_SIZE} />,
    KeyValuePair: <ListFilter size={ICON_SIZE} />,
    Menu: <MenuIcon size={ICON_SIZE} />,
    Modal: <Box size={ICON_SIZE} />,
    MultiSelect: <ListFilter size={ICON_SIZE} />,
    NumberInput: <DecimalsArrowRightIcon size={ICON_SIZE} />,
    OTPInput: <Shield size={ICON_SIZE} />,
    OutageChart: <BarChart2 size={ICON_SIZE} />,
    Popover: <MessageCircle size={ICON_SIZE} />,
    ProgressBar: <BarChart2 size={ICON_SIZE} />,
    Radio: <CircleDot size={ICON_SIZE} />,
    SankeyChart: <BarChart2 size={ICON_SIZE} />,
    SearchInput: <Search size={ICON_SIZE} />,
    Sidebar: <Layout size={ICON_SIZE} />,
    SingleSelect: <List size={ICON_SIZE} />,
    Skeleton: <Square size={ICON_SIZE} />,
    Snackbar: <Bell size={ICON_SIZE} />,
    Spinner: <Circle size={ICON_SIZE} />,
    StatCard: <FileText size={ICON_SIZE} />,
    Switch: <Square size={ICON_SIZE} />,
    Tabs: <Layout size={ICON_SIZE} />,
    Tag: <TagIconLucide size={ICON_SIZE} />,
    TextArea: <FileText size={ICON_SIZE} />,
    TextInput: <FormInput size={ICON_SIZE} />,
    Tooltip: <HelpCircle size={ICON_SIZE} />,
    Upload: <UploadIcon size={ICON_SIZE} />,
}

/** Quick-access row in the mobile bottom nav — a cross-section, not a ranking. */
const MOBILE_QUICK_ACCESS = new Set([
    'Button',
    'TextInput',
    'Alert',
    'Card',
    'Tabs',
    'Sidebar',
])

const WORKSPACES = [
    { label: 'Blend Native', value: 'native' },
    { label: 'Blend Web', value: 'web' },
]

const TEAMS = [
    {
        label: 'Design System',
        value: 'design-system',
        icon: <Briefcase size={ICON_SIZE} />,
    },
    {
        label: 'Playground',
        value: 'playground',
        icon: <Rocket size={ICON_SIZE} />,
    },
]

export default function App() {
    // Blend's `Text` asks for the family by name (`fonts.ts`'s docblock) —
    // it never loads the file itself. Without this, every weight falls back
    // to whatever the platform substitutes for an unmatched font name.
    //
    // `expo-font`'s `useFonts` maps one literal family name to one file —
    // there is no per-weight sub-map (unlike the web apps' CSS `@font-face`,
    // which declares several weights under one family name and lets the
    // browser pick). Loading just the Regular face under the exact name
    // Blend requests means heavier `fontWeight`s synthesize (faux-bold)
    // rather than rendering their true face — a real gap, but a far smaller
    // one than the wrong-family fallback this replaces. Giving every role
    // its correct face would mean teaching `blend-native`'s `Text`/`fonts.ts`
    // to pick a family name per weight, which is out of scope here.
    const [fontsLoaded] = useFonts({
        InterDisplay: interDisplayRegular,
    })

    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [componentName, setComponentName] = useState(
        COMPONENT_GROUPS[0].specs[0].name
    )
    const [drawerOpen, setDrawerOpen] = useState(false)

    // Cosmetic — mirrors web's `activeTenant`/`activeMerchant`, which also
    // exist only to drive the switchers' own `selected` highlight.
    const [activeTeam, setActiveTeam] = useState('design-system')
    const [activeWorkspace, setActiveWorkspace] = useState('native')

    // Measured rather than read from `useWindowDimensions`: on the web target
    // the app renders inside a phone frame, and the window width says 1280
    // while the app has 390. Trusting the window there pins the rail open
    // and squeezes the content into what is left — the same mismatch
    // `Sidebar`'s own `isSmallScreen` override exists to let a host correct.
    const [availableWidth, setAvailableWidth] = useState(0)
    const measure = useCallback((event: LayoutChangeEvent) => {
        setAvailableWidth(event.nativeEvent.layout.width)
    }, [])
    const permanent = availableWidth >= PERMANENT_SIDEBAR_WIDTH

    const isDark = theme === Theme.DARK
    const chrome = isDark ? DARK_CHROME : LIGHT_CHROME

    const spec = useMemo(() => findSpec(componentName), [componentName])

    const sidebarData = useMemo<SidebarSectionData[]>(
        () =>
            COMPONENT_GROUPS.map((group) => ({
                label: group.title,
                items: group.specs.map(
                    (s): SidebarNavItem => ({
                        id: s.name,
                        label: s.name,
                        leftSlot: COMPONENT_ICONS[s.name],
                        showOnMobile: MOBILE_QUICK_ACCESS.has(s.name),
                    })
                ),
            })),
        []
    )

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

    // Renders blank for one frame rather than flashing the wrong font —
    // fonts.ts's substitution for an unmatched family happens here otherwise.
    if (!fontsLoaded) return null

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
                            <View
                                style={[styles.fill, styles.row]}
                                onLayout={measure}
                            >
                                <Sidebar
                                    data={sidebarData}
                                    merchantInfo={{
                                        items: WORKSPACES,
                                        selected: activeWorkspace,
                                        onSelect: setActiveWorkspace,
                                    }}
                                    secondarySidebar={{
                                        items: TEAMS,
                                        selected: activeTeam,
                                        onSelect: setActiveTeam,
                                        footerSlot: (
                                            <View
                                                style={styles.secondaryFooter}
                                            >
                                                <Lightbulb
                                                    size={20}
                                                    color={chrome.fgMuted}
                                                />
                                                <HelpCircle
                                                    size={20}
                                                    color={chrome.fgMuted}
                                                />
                                            </View>
                                        ),
                                    }}
                                    footer={
                                        <Menu
                                            trigger={
                                                <Settings
                                                    size={20}
                                                    color={chrome.fgMuted}
                                                />
                                            }
                                            items={[
                                                {
                                                    items: [
                                                        {
                                                            label: {
                                                                text: 'Preferences',
                                                                leftSlot: (
                                                                    <Settings
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ),
                                                            },
                                                        },
                                                        {
                                                            label: {
                                                                text: 'Help & support',
                                                                leftSlot: (
                                                                    <HelpCircle
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                ),
                                                            },
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    }
                                    activeItem={componentName}
                                    onActiveItemChange={(name) => {
                                        if (name) selectComponent(name)
                                    }}
                                    open={drawerOpen}
                                    onOpenChange={setDrawerOpen}
                                    isSmallScreen={!permanent}
                                    accessibilityLabel="Component navigation"
                                    testID="app-sidebar"
                                />
                                <View
                                    style={[
                                        styles.fill,
                                        { backgroundColor: chrome.bg },
                                    ]}
                                >
                                    <AppBar
                                        title={spec.name}
                                        showMenuButton={!permanent}
                                        onOpenDrawer={() => setDrawerOpen(true)}
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
    row: { flexDirection: 'row' },
    secondaryFooter: { alignItems: 'center', gap: 16 },
})
