import {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import type { LayoutChangeEvent, View as RNView } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'
import { useControllableState } from '../../hooks/useControllableState'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { BlendNativeThemeContext } from '../../theme/BlendNativeProvider'
import { SideDrawer } from '../../overlay/drawer/SideDrawer'
import Block from '../../primitives/Block'
import Pressable from '../../primitives/Pressable'
import { SidebarContext } from './sidebar.context'
import type { SidebarContextValue } from './sidebar.context'
import { getSidebarPalette, SIDEBAR_METRICS } from './sidebar.theme'
import SidebarSection from './SidebarSection'
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
 * - Nested items expand in place rather than flying out on hover — shadcn's
 *   own `Sidebar` makes the same call for its icon-only mode (hides nested
 *   items rather than a flyout), avoiding a popover-positioning engine for
 *   what is fundamentally a nav tree.
 * - Mobile presents as a slide-in drawer with the full nav tree, not an
 *   adaptive floating dock.
 * - No topbar, no tenant-switcher rail, no keyboard-shortcut toggle.
 * - No tooltip on collapsed-rail items yet (shadcn shows one on hover) —
 *   worth adding in a follow-up.
 */

/** How much wider the rail gets going from collapsed to expanded. */
const RAIL_GROWTH =
    SIDEBAR_METRICS.expandedWidth - SIDEBAR_METRICS.collapsedWidth

const Sidebar = forwardRef<RNView, SidebarNativeProps>(function Sidebar(
    {
        data,
        header,
        footer,
        isExpanded: isExpandedProp,
        onExpandedChange,
        defaultIsExpanded = true,
        hideToggleButton = false,
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

    const iconOnlyMode = !isSmallScreen && !isExpanded
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
        }),
        [
            palette,
            iconOnlyMode,
            activeItem,
            setActiveItem,
            reduceMotion,
            expandProgress,
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
            marginRight: expandProgress.value * SIDEBAR_METRICS.headerGap,
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

    const toggleButton = !hideToggleButton && (
        <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={6}
            paddingRight={6}
            borderRadius={SIDEBAR_METRICS.itemRadius}
            activeBackground={palette.accent}
            accessibilityRole="button"
            accessibilityLabel={
                isExpanded ? 'Collapse sidebar' : 'Expand sidebar'
            }
            accessibilityState={{ expanded: isExpanded }}
        >
            {isExpanded ? (
                <ChevronLeft size={16} color={palette.mutedForeground} />
            ) : (
                <ChevronRight size={16} color={palette.mutedForeground} />
            )}
        </Pressable>
    )

    const navContent = (
        <SidebarContext.Provider value={contextValue}>
            <Block
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingTop={SIDEBAR_METRICS.headerPadding}
                paddingBottom={SIDEBAR_METRICS.headerPadding}
                paddingLeft={SIDEBAR_METRICS.headerPadding}
                paddingRight={SIDEBAR_METRICS.headerPadding}
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
                    {header}
                </Animated.View>
                {!isSmallScreen && toggleButton}
            </Block>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    gap: SIDEBAR_METRICS.sectionGap,
                    paddingTop: 4,
                    paddingBottom: 4,
                    paddingLeft: 4,
                    paddingRight: 4,
                }}
            >
                {data.map((section, index) => (
                    <SidebarSection key={index} section={section} />
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
                                paddingLeft: SIDEBAR_METRICS.headerPadding,
                                paddingRight: SIDEBAR_METRICS.headerPadding,
                            },
                        ]}
                    >
                        {footer}
                    </View>
                </Animated.View>
            ) : null}
        </SidebarContext.Provider>
    )

    if (isSmallScreen) {
        return (
            <SideDrawer
                open={open}
                onClose={() => setOpen(false)}
                width={drawerWidth}
                backgroundColor={palette.background}
                accessibilityLabel={accessibilityLabel ?? 'Sidebar navigation'}
                testID={testID}
            >
                <View ref={ref} style={{ flex: 1 }}>
                    {navContent}
                </View>
            </SideDrawer>
        )
    }

    return (
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
            accessibilityRole="none"
            accessibilityLabel={
                accessibilityLabel ??
                `Sidebar navigation, ${isExpanded ? 'expanded' : 'collapsed'}`
            }
            testID={testID}
        >
            <View ref={ref} style={{ flex: 1 }}>
                {navContent}
            </View>
        </Animated.View>
    )
})

Sidebar.displayName = 'Sidebar'

const styles = StyleSheet.create({
    headerSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
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
})

export default Sidebar
