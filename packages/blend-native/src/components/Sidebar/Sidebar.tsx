import {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View as RNView,
} from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { PanelsTopLeft } from 'lucide-react-native'
import { SelectV2Size, SelectV2Variant } from '@juspay/blend-design-system/node'
import { useControllableState } from '../../hooks/useControllableState'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { BlendNativeThemeContext } from '../../theme/BlendNativeProvider'
import { Portal } from '../../overlay/portal'
import { SideDrawer } from '../../overlay/drawer/SideDrawer'
import Block from '../../primitives/Block'
import Pressable from '../../primitives/Pressable'
import { webDataSet } from '../../primitives/dataSet'
import SingleSelect from '../SingleSelect/SingleSelect'
import { SidebarContext } from './sidebar.context'
import type { SidebarContextValue } from './sidebar.context'
import SidebarSecondaryPanel from './SidebarSecondaryPanel'
import SidebarMobileBottomNav, {
    SidebarMobileMoreSheet,
} from './SidebarMobileBottomNav'
import { getSidebarPalette, SIDEBAR_METRICS } from './sidebar.theme'
import SidebarSection from './SidebarSection'
import {
    flattenMobileNavItems,
    getSidebarRootDataSet,
    getSidebarStatus,
    SIDEBAR_TOGGLE_DATA_SET,
} from './sidebar.utils'
import { X } from 'lucide-react-native'
import type { SidebarNativeProps } from './sidebar.types'

/**
 * Sidebar — a collapsible nav rail on wide screens, a slide-in drawer on
 * narrow ones, both driven by the same section/item data.
 *
 * Deliberately **not** built on Blend's token system
 * (`useNativeTokens`/`SIDEBARV2`/`DIRECTORY`) — those tokens describe web's
 * `SidebarV2`/`Directory`, a much larger system (tenant-switcher rail,
 * hover-preview state, hierarchy-line connectors, a floating adaptive
 * mobile dock) this component doesn't implement, and porting only a slice
 * of their token trees produced a result that read as generic rather than
 * as this product's actual sidebar. Instead, `sidebar.theme.ts` hardcodes a
 * small, self-contained set of constants and colours modelled on shadcn/ui's
 * `Sidebar` — a widely-used, well-designed reference implementation for
 * exactly this kind of component — and this file composes them directly.
 *
 * Presentation breakpoint is a plain 768px `useWindowDimensions` check (the
 * convention shadcn and React Navigation's drawer navigator both converge
 * on independently), not Blend's `sm`/`lg` (1024px) breakpoint system.
 *
 * Other deliberate divergences from web's `SidebarV2`:
 * - No hover-triggered "intermediate" preview state (desktop has no hover).
 *   A host that previews the rail on hover itself (react-native-web) passes
 *   `isPreviewing`, which is only reported, never drawn.
 * - Nested items expand in place rather than flying out on hover — shadcn's
 *   own `Sidebar` makes the same call for its icon-only mode (hides nested
 *   items rather than a flyout), avoiding a popover-positioning engine for
 *   what is fundamentally a nav tree. A collapsed-rail item with children is
 *   therefore unreachable until the rail re-expands — a known gap, not yet
 *   closed with web's icon-only flyout menu.
 * - Mobile's default presentation is a slide-in drawer with the full nav
 *   tree, not web's adaptive floating dock; `showMobileBottomNav` adds a
 *   floating bar alongside it (primary items + a "More" button opening a
 *   bottom sheet for the rest) rather than replacing the drawer outright —
 *   see `SidebarMobileBottomNav`'s docblock for why that one isn't a literal
 *   port of web's mechanics.
 * - No topbar or keyboard-shortcut toggle (`sidebarCollapseKey`) — both are
 *   app-shell concerns the host composes around `Sidebar`, not things this
 *   component owns on web either in spirit (web's topbar lives in
 *   `SidebarV2`'s own layout shell, which this component deliberately isn't
 *   — see above).
 * - Collapsed-rail tooltips use long-press (`Tooltip`'s own touch
 *   substitution for hover — see its docblock), not a hover delay.
 *
 * On react-native-web the root, toggle, sections and rows carry the same
 * `data-*` attributes as web's `Sidebar`/`Directory` (`data-sidebar`,
 * `data-status`, `data-element`, `data-id`, …), so selectors and automation
 * written against the web sidebar work unchanged; see `sidebar.utils.ts`.
 * Consumers can add their own per section/row via `dataSet`.
 */

/** How much wider the rail gets going from collapsed to expanded. */
const RAIL_GROWTH =
    SIDEBAR_METRICS.expandedWidth - SIDEBAR_METRICS.collapsedWidth

const Sidebar = forwardRef<RNView, SidebarNativeProps>(function Sidebar(
    {
        data,
        header,
        merchantInfo,
        footer,
        secondarySidebar,
        highlightActivePath = false,
        showHierarchyLines = false,
        showMobileBottomNav = false,
        isExpanded: isExpandedProp,
        onExpandedChange,
        defaultIsExpanded = true,
        hideToggleButton = false,
        isPreviewing = false,
        activeItem: activeItemProp,
        onActiveItemChange,
        defaultActiveItem = null,
        open: openProp,
        onOpenChange,
        defaultOpen = false,
        drawerWidth = SIDEBAR_METRICS.drawerWidth,
        isSmallScreen: isSmallScreenProp,
        accessibilityLabel,
        testID,
    },
    ref
) {
    const { theme } = useContext(BlendNativeThemeContext)
    const palette = useMemo(() => getSidebarPalette(theme), [theme])
    const { width: windowWidth } = useWindowDimensions()
    const isSmallScreen =
        isSmallScreenProp ?? windowWidth < SIDEBAR_METRICS.mobileBreakpoint
    const reduceMotion = useReduceMotion()

    const [isExpanded, setIsExpanded] = useControllableState<boolean>(
        isExpandedProp,
        defaultIsExpanded,
        onExpandedChange
    )
    const [activeItem, setActiveItem] = useControllableState<string | null>(
        activeItemProp,
        defaultActiveItem,
        onActiveItemChange
    )
    const [open, setOpen] = useControllableState<boolean>(
        openProp,
        defaultOpen,
        onOpenChange
    )

    // Footer content is arbitrary height — measured once, the same pattern
    // `SidebarItem`'s nested-children panel uses, rather than a guessed
    // constant.
    const [footerHeight, setFooterHeight] = useState(0)
    const onFooterLayout = useCallback((event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (height > 0) setFooterHeight((current) => Math.max(current, height))
    }, [])

    // Mirrors web's `isScrolled` — a hairline under the header once the nav
    // list has scrolled past its top, so a long tree doesn't look like it
    // bleeds straight into the header with no boundary.
    const [isScrolled, setIsScrolled] = useState(false)
    const onNavScroll = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setIsScrolled(event.nativeEvent.contentOffset.y > 0)
        },
        []
    )

    const mobileBottomNavItems = useMemo(
        () => (showMobileBottomNav ? flattenMobileNavItems(data) : []),
        [showMobileBottomNav, data]
    )
    const [moreSheetOpen, setMoreSheetOpen] = useState(false)

    const iconOnlyMode = !isSmallScreen && !isExpanded
    // The drawer is either open or not; only the rail has a preview state.
    const status = isSmallScreen
        ? getSidebarStatus(open, false)
        : getSidebarStatus(isExpanded, isPreviewing)
    // Applied to the view that wraps `navContent`, which both layouts (rail
    // and drawer) render, so every section and row sits inside it.
    const rootDataSet = useMemo(() => getSidebarRootDataSet(status), [status])
    // Rows read this for label opacity/width, so its target must track
    // "content should be visible" (`!iconOnlyMode`), not `isExpanded` on its
    // own — in the mobile drawer `iconOnlyMode` is always false regardless
    // of `isExpanded`, and the two only coincide on the desktop rail.
    const contentVisible = !iconOnlyMode

    const expandProgress = useSharedValue(contentVisible ? 1 : 0)
    useEffect(() => {
        if (reduceMotion) {
            expandProgress.value = contentVisible ? 1 : 0
            return
        }
        expandProgress.value = withTiming(contentVisible ? 1 : 0, {
            duration: SIDEBAR_METRICS.transitionDuration,
            easing: Easing.linear,
        })
    }, [expandProgress, contentVisible, reduceMotion])

    const contextValue = useMemo<SidebarContextValue>(
        () => ({
            palette,
            iconOnlyMode,
            activeItem,
            setActiveItem,
            reduceMotion,
            expandProgress,
            highlightActivePath,
            showHierarchyLines,
        }),
        [
            palette,
            iconOnlyMode,
            activeItem,
            setActiveItem,
            reduceMotion,
            expandProgress,
            highlightActivePath,
            showHierarchyLines,
        ]
    )

    const railStyle = useAnimatedStyle(
        () => ({
            width:
                SIDEBAR_METRICS.collapsedWidth +
                expandProgress.value *
                    (SIDEBAR_METRICS.expandedWidth -
                        SIDEBAR_METRICS.collapsedWidth),
        }),
        []
    )
    // Same technique as `SidebarItem`'s `labelAreaStyle`: width/opacity grow
    // with the rail's own tween instead of popping in at an instant
    // `iconOnlyMode` boolean flip, which let header/footer content wrap
    // before the rail had actually made room for it.
    const headerSlotStyle = useAnimatedStyle(
        () => ({
            width: expandProgress.value * RAIL_GROWTH,
            opacity: expandProgress.value,
        }),
        []
    )
    const footerSlotStyle = useAnimatedStyle(
        () => ({
            height: expandProgress.value * footerHeight,
            opacity: expandProgress.value,
        }),
        [footerHeight]
    )

    const closeButton = (
        <Pressable
            onPress={() => setOpen(false)}
            paddingTop={SIDEBAR_METRICS.toggleButtonPadding}
            paddingBottom={SIDEBAR_METRICS.toggleButtonPadding}
            paddingLeft={SIDEBAR_METRICS.toggleButtonPadding}
            paddingRight={SIDEBAR_METRICS.toggleButtonPadding}
            borderRadius={SIDEBAR_METRICS.toggleButtonRadius}
            activeBackground={palette.controlHoverBackground}
            accessibilityRole="button"
            accessibilityLabel="Close sidebar"
        >
            <X size={16} color={palette.controlForeground} />
        </Pressable>
    )

    const toggleButton = !hideToggleButton && (
        <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            paddingTop={SIDEBAR_METRICS.toggleButtonPadding}
            paddingBottom={SIDEBAR_METRICS.toggleButtonPadding}
            paddingLeft={SIDEBAR_METRICS.toggleButtonPadding}
            paddingRight={SIDEBAR_METRICS.toggleButtonPadding}
            borderRadius={SIDEBAR_METRICS.toggleButtonRadius}
            activeBackground={palette.controlHoverBackground}
            accessibilityRole="button"
            accessibilityLabel={
                isExpanded ? 'Collapse sidebar' : 'Expand sidebar'
            }
            accessibilityState={{ expanded: isExpanded }}
            {...webDataSet(SIDEBAR_TOGGLE_DATA_SET)}
        >
            <PanelsTopLeft size={16} color={palette.controlForeground} />
        </Pressable>
    )

    const headerContent =
        header ??
        (merchantInfo ? (
            <SingleSelect
                placeholder="Select workspace"
                variant={SelectV2Variant.NO_CONTAINER}
                size={SelectV2Size.SM}
                items={[
                    {
                        items: merchantInfo.items.map((item) => ({
                            label: item.label,
                            value: item.value,
                            slot1: item.icon,
                        })),
                    },
                ]}
                selected={merchantInfo.selected}
                onSelect={merchantInfo.onSelect}
            />
        ) : null)

    const navContent = (
        <SidebarContext.Provider value={contextValue}>
            <Block
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={SIDEBAR_METRICS.headerPaddingY}
                paddingBottom={SIDEBAR_METRICS.headerPaddingY}
                paddingLeft={SIDEBAR_METRICS.headerPaddingX}
                paddingRight={SIDEBAR_METRICS.headerPaddingX}
                style={{ position: 'relative' }}
            >
                {/* Always mounted, width/opacity synced to the rail's own
                    tween — see `SidebarItem`'s `labelAreaStyle` for why an
                    instant `iconOnlyMode` mount here caused the header to
                    visibly wrap before the rail caught up. */}
                <Animated.View
                    style={[styles.headerSlot, headerSlotStyle]}
                    accessibilityElementsHidden={iconOnlyMode}
                    importantForAccessibility={
                        iconOnlyMode ? 'no-hide-descendants' : 'auto'
                    }
                >
                    <View style={{ flex: 1, minWidth: 0, marginLeft: -10 }}>
                        {headerContent}
                    </View>
                </Animated.View>
                {isSmallScreen ? closeButton : toggleButton}
                {/* Scroll shadow — a hairline that only appears once the nav
                    list below has scrolled past its top (`isScrolled`).
                    Absolute + opacity so toggling it never reflows the
                    header, unlike a conditional `borderBottomWidth`. */}
                <View
                    pointerEvents="none"
                    testID="sidebar-scroll-shadow"
                    style={[
                        styles.scrollShadow,
                        {
                            backgroundColor: palette.border,
                            opacity: isScrolled ? 1 : 0,
                        },
                    ]}
                />
            </Block>
            <ScrollView
                testID="sidebar-nav-scroll"
                style={{ flex: 1 }}
                contentContainerStyle={{
                    gap: SIDEBAR_METRICS.sectionGap,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 4,
                    paddingRight: 4,
                }}
                onScroll={onNavScroll}
                scrollEventThrottle={16}
            >
                {data.map((section, index) => (
                    <SidebarSection
                        key={index}
                        section={section}
                        index={index}
                    />
                ))}
            </ScrollView>
            {footer ? (
                <Animated.View
                    style={[styles.footerSlot, footerSlotStyle]}
                    accessibilityElementsHidden={iconOnlyMode}
                    importantForAccessibility={
                        iconOnlyMode ? 'no-hide-descendants' : 'auto'
                    }
                >
                    <View
                        onLayout={onFooterLayout}
                        style={[
                            styles.footerContent,
                            {
                                paddingLeft: SIDEBAR_METRICS.footerPaddingX,
                                paddingRight: SIDEBAR_METRICS.footerPaddingX,
                                paddingTop: SIDEBAR_METRICS.footerPaddingY,
                                paddingBottom: SIDEBAR_METRICS.footerPaddingY,
                            },
                        ]}
                    >
                        {footer}
                    </View>
                </Animated.View>
            ) : null}
        </SidebarContext.Provider>
    )

    const mobileBottomNav = showMobileBottomNav && isSmallScreen && (
        <Portal>
            <SidebarMobileBottomNav
                items={mobileBottomNavItems}
                activeItem={activeItem}
                onSelect={(id) => {
                    setActiveItem(id)
                    setOpen(false)
                }}
                palette={palette}
                onOpenMore={() => setMoreSheetOpen(true)}
            />
            <SidebarMobileMoreSheet
                items={mobileBottomNavItems}
                activeItem={activeItem}
                onSelect={(id) => {
                    setActiveItem(id)
                    setMoreSheetOpen(false)
                }}
                palette={palette}
                open={moreSheetOpen}
                onClose={() => setMoreSheetOpen(false)}
            />
        </Portal>
    )

    if (isSmallScreen) {
        return (
            <>
                <SideDrawer
                    open={open}
                    onClose={() => setOpen(false)}
                    width={drawerWidth}
                    backgroundColor={palette.background}
                    accessibilityLabel={
                        accessibilityLabel ?? 'Sidebar navigation'
                    }
                    testID={testID}
                >
                    <View
                        ref={ref}
                        style={{ flex: 1 }}
                        {...webDataSet(rootDataSet)}
                    >
                        {navContent}
                    </View>
                </SideDrawer>
                {mobileBottomNav}
            </>
        )
    }

    // Web renders the secondary rail as a flex sibling of the main panel
    // inside one row (not nested inside it) — but it still collapses in
    // lockstep with the primary panel (`SecondarySidebar`'s own
    // `isExpanded` prop is literally the same flag the primary panel's
    // icon-only mode comes from), so `expandProgress` is threaded into it
    // below rather than treating it as width-fixed.
    return (
        <View style={{ flexDirection: 'row', height: '100%' }}>
            {secondarySidebar && (
                <SidebarSecondaryPanel
                    info={secondarySidebar}
                    palette={palette}
                    expandProgress={expandProgress}
                    iconOnlyMode={iconOnlyMode}
                />
            )}
            <Animated.View
                style={[
                    {
                        backgroundColor: palette.background,
                        borderRightWidth: 1,
                        borderRightColor: palette.border,
                        overflow: 'hidden',
                    },
                    railStyle,
                ]}
                // Renders <nav> on web, like web Sidebar.
                role="navigation"
                accessibilityLabel={
                    accessibilityLabel ??
                    `Sidebar navigation, ${isExpanded ? 'expanded' : 'collapsed'}`
                }
                testID={testID}
            >
                <View
                    ref={ref}
                    style={{ flex: 1 }}
                    {...webDataSet(rootDataSet)}
                >
                    {navContent}
                </View>
            </Animated.View>
        </View>
    )
})

Sidebar.displayName = 'Sidebar'

const styles = StyleSheet.create({
    headerSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        flex: 1,
    },
    footerSlot: {
        overflow: 'hidden',
    },
    footerContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    scrollShadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
    },
})

export default Sidebar
