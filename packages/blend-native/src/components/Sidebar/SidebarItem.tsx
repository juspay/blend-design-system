import { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { ChevronDown } from 'lucide-react-native'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import Text from '../../primitives/Text'
import Tooltip from '../Tooltip/Tooltip'
import { useSidebarContext } from './sidebar.context'
import { SIDEBAR_METRICS } from './sidebar.theme'
import { isActiveAncestorPath } from './sidebar.utils'
import type { SidebarNavItem } from './sidebar.types'

/** Opacity applied to a disabled row. */
const DISABLED_OPACITY = 0.5
/**
 * The label area's width target — exactly the width the rail itself gains
 * going from collapsed to expanded, so the two grow in step and the label
 * never outgrows the space the rail has actually made available.
 */
const LABEL_AREA_MAX_WIDTH =
    SIDEBAR_METRICS.expandedWidth - SIDEBAR_METRICS.collapsedWidth

/** Left offset of a nested row's connector line, from its own left edge. */
const connectorX = (depth: number) =>
    SIDEBAR_METRICS.itemPaddingX +
    SIDEBAR_METRICS.itemIconWidth / 2 +
    (depth - 1) * SIDEBAR_METRICS.nestedIndent

export type SidebarItemProps = {
    item: SidebarNavItem
    depth?: number
    testID?: string
    /**
     * This row's full path (`"parent/child"`), used for `activeItem`
     * matching and ancestor-chain highlighting. Root items default this to
     * their own id/label; nested items receive it from their parent.
     */
    itemPath?: string
    /** Last among its siblings — suppresses the connector's continuation. */
    isLast?: boolean
    /** This row sits above the selected descendant on the connector line. */
    pathVerticalActive?: boolean
    /** This row IS the selected item's immediate on-path ancestor here. */
    pathElbowActive?: boolean
}

/**
 * One nav row. Leaf rows are a plain pressable; rows with nested `items`
 * expand in place (measured-height animation) rather than flying out or
 * flying-out-on-hover — shadcn's `Sidebar` makes the same call (nested
 * `SidebarMenuSub` is just hidden in icon-only mode, no flyout), which
 * avoids needing a popover-positioning engine for a nav tree.
 */
export default function SidebarItem({
    item,
    depth = 0,
    testID,
    itemPath: itemPathProp,
    isLast = true,
    pathVerticalActive = false,
    pathElbowActive = false,
}: SidebarItemProps) {
    const {
        palette,
        iconOnlyMode,
        activeItem,
        setActiveItem,
        reduceMotion,
        expandProgress,
        highlightActivePath,
        showHierarchyLines,
    } = useSidebarContext('SidebarItem')

    const itemId = item.id ?? item.label
    const itemPath = itemPathProp ?? itemId
    const hasChildren = Boolean(item.items && item.items.length > 0)
    const isSelected = activeItem === itemPath
    const [expanded, setExpanded] = useState(false)

    const [contentHeight, setContentHeight] = useState(0)
    const progress = useSharedValue(0)
    useEffect(() => {
        if (reduceMotion) {
            progress.value = expanded ? 1 : 0
            return
        }
        progress.value = withTiming(expanded ? 1 : 0, {
            duration: SIDEBAR_METRICS.transitionDuration,
            easing: Easing.linear,
        })
    }, [progress, expanded, reduceMotion])

    const panelStyle = useAnimatedStyle(
        () => ({ height: progress.value * contentHeight }),
        [contentHeight]
    )
    const chevronStyle = useAnimatedStyle(
        () => ({
            transform: [{ rotate: `${progress.value * 180}deg` }],
        }),
        []
    )
    // Grows in lockstep with the rail's own width tween (same shared
    // value), so the label is never asked to lay out at full size inside a
    // still-narrow row — the mismatch that caused it to visibly wrap and
    // then snap straight as the rail caught up.
    // `marginLeft` substitutes for the row's `gap` here — the row disables
    // its own gap (see below) because a `gap` sibling still reserves space
    // when this wrapper is merely zero-width, nudging the icon off-centre
    // in icon-only mode. Animating the margin with the same progress value
    // collapses that space to nothing instead.
    const labelAreaStyle = useAnimatedStyle(
        () => ({
            width: expandProgress.value * LABEL_AREA_MAX_WIDTH,
            marginLeft: expandProgress.value * SIDEBAR_METRICS.itemGap,
            opacity: expandProgress.value,
        }),
        []
    )

    const onContentLayout = (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (height > 0 && height !== contentHeight) {
            setContentHeight(height)
        }
    }

    const handlePress = () => {
        if (item.disabled) return
        if (hasChildren) {
            setExpanded((current) => !current)
        }
        if (item.onPress) {
            setActiveItem(itemPath)
            item.onPress()
        } else if (!hasChildren) {
            setActiveItem(itemPath)
        }
    }

    // Mirrors web's `getItemVisualState`/`resolveItemColors`: `activePath`
    // and `muted` only come into play once `highlightActivePath` is on AND
    // something is selected, so the feature is off by default and degrades
    // to the plain two-state (selected/default) behaviour otherwise.
    const isOnActivePath =
        highlightActivePath && isActiveAncestorPath(itemPath, activeItem)
    const isMuted =
        highlightActivePath && !isSelected && !isOnActivePath && !!activeItem

    const textColor = isSelected
        ? palette.selectedForeground
        : isOnActivePath
          ? palette.activePathForeground
          : isMuted
            ? palette.mutedForeground
            : palette.foreground
    // A collapsed row with no icon has nothing to show, so highlighting it
    // "active" just reads as a bare coloured box — only highlight once
    // there's actually an icon in it (or the rail is expanded).
    const showActiveState =
        isSelected && (!iconOnlyMode || Boolean(item.leftSlot))

    const row = (
        <Pressable
            onPress={handlePress}
            disabled={item.disabled}
            flexDirection="row"
            alignItems="center"
            minHeight={SIDEBAR_METRICS.itemHeight}
            paddingLeft={
                SIDEBAR_METRICS.itemPaddingX +
                depth * SIDEBAR_METRICS.nestedIndent
            }
            paddingRight={SIDEBAR_METRICS.itemPaddingX}
            backgroundColor={
                showActiveState ? palette.selectedBackground : 'transparent'
            }
            borderRadius={SIDEBAR_METRICS.itemRadius}
            activeBackground={palette.hoverBackground}
            opacity={item.disabled ? DISABLED_OPACITY : 1}
            accessibilityRole="button"
            accessibilityState={{
                disabled: item.disabled,
                selected: isSelected,
            }}
            accessibilityLabel={item.label}
            testID={testID}
        >
            {item.leftSlot && (
                <Slot
                    hidden
                    color={textColor}
                    maxHeight={SIDEBAR_METRICS.itemIconWidth}
                >
                    {item.leftSlot}
                </Slot>
            )}
            {/* Always mounted (not gated on `iconOnlyMode`) — see
                `labelAreaStyle`'s comment for why. Hidden from assistive
                tech (not just visually) while icon-only, same as the
                nested-children panel below. */}
            <Animated.View
                style={[styles.labelArea, labelAreaStyle]}
                accessibilityElementsHidden={iconOnlyMode}
                importantForAccessibility={
                    iconOnlyMode ? 'no-hide-descendants' : 'auto'
                }
            >
                <View style={{ flexGrow: 1, flexShrink: 1 }}>
                    <Text
                        fontSize={SIDEBAR_METRICS.itemFontSize}
                        fontWeight={SIDEBAR_METRICS.itemFontWeight}
                        color={textColor}
                        numberOfLines={1}
                    >
                        {item.label}
                    </Text>
                </View>
                {item.rightSlot && !hasChildren && (
                    <Slot hidden color={textColor}>
                        {item.rightSlot}
                    </Slot>
                )}
                {hasChildren && (
                    <Animated.View style={chevronStyle}>
                        <ChevronDown size={16} color={palette.foreground} />
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )

    // Web shows the label in a hover tooltip for a collapsed icon-only row;
    // there's no hover on touch, so this long-presses instead (`Tooltip`'s
    // own substitution, documented on its own type).
    const rowWithTooltip =
        iconOnlyMode && item.leftSlot ? (
            <Tooltip content={item.label}>{row}</Tooltip>
        ) : (
            row
        )

    const isNested = depth > 0
    const drawConnector = showHierarchyLines && isNested
    const connectorColor =
        pathVerticalActive || pathElbowActive
            ? palette.connectorActive
            : palette.connector
    // Each row draws only its own segment — from the gap just above it down
    // to either the next row's top (tiling into one continuous line with the
    // next row's own segment) or, if it's the last child, down to its own
    // elbow. Same technique web's CSS `::before`/`::after` use per list item,
    // translated to plain positioned Views (RN has no pseudo-elements).
    const connector = drawConnector && (
        <>
            <View
                pointerEvents="none"
                testID={`${itemPath}-connector-line`}
                style={{
                    position: 'absolute',
                    left: connectorX(depth),
                    top: -SIDEBAR_METRICS.nestedGap,
                    width: SIDEBAR_METRICS.connectorWidth,
                    height: isLast
                        ? SIDEBAR_METRICS.nestedGap +
                          SIDEBAR_METRICS.itemHeight / 2
                        : SIDEBAR_METRICS.nestedGap +
                          SIDEBAR_METRICS.itemHeight,
                    backgroundColor: connectorColor,
                }}
            />
            <View
                pointerEvents="none"
                testID={`${itemPath}-connector-elbow`}
                style={{
                    position: 'absolute',
                    left: connectorX(depth),
                    top:
                        SIDEBAR_METRICS.itemHeight / 2 -
                        SIDEBAR_METRICS.connectorWidth / 2,
                    width: SIDEBAR_METRICS.connectorElbowWidth,
                    height: SIDEBAR_METRICS.connectorWidth,
                    backgroundColor: connectorColor,
                }}
            />
        </>
    )

    // Which child (if any) lies on the selected item's path — its vertical
    // segment runs highlighted down to that child, and that child's own
    // elbow highlights too. Mirrors web's `NavItem`'s `activeChildIndex`.
    const activeChildIndex = useMemo(() => {
        if (!highlightActivePath || !activeItem || !item.items) return -1
        return item.items.findIndex((child) => {
            const childPath = `${itemPath}/${child.id ?? child.label}`
            return (
                activeItem === childPath ||
                isActiveAncestorPath(childPath, activeItem)
            )
        })
    }, [highlightActivePath, activeItem, item.items, itemPath])

    if (!hasChildren || iconOnlyMode) {
        if (!drawConnector) return rowWithTooltip
        return (
            <View style={{ position: 'relative', alignSelf: 'stretch' }}>
                {connector}
                {rowWithTooltip}
            </View>
        )
    }

    return (
        <View style={{ position: 'relative', alignSelf: 'stretch' }}>
            {connector}
            {rowWithTooltip}
            <Animated.View
                style={[{ overflow: 'hidden' }, panelStyle]}
                accessibilityElementsHidden={!expanded}
                importantForAccessibility={
                    expanded ? 'auto' : 'no-hide-descendants'
                }
            >
                <View
                    onLayout={onContentLayout}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        gap: SIDEBAR_METRICS.nestedGap,
                        // paddingTop, not marginTop: onLayout's measured
                        // height must include this gap, or the panel's
                        // tweened height falls short and clips the last row.
                        paddingTop: 4,
                    }}
                >
                    {item.items?.map((child, index) => {
                        const childId = child.id ?? child.label
                        return (
                            <SidebarItem
                                key={childId}
                                item={child}
                                depth={depth + 1}
                                itemPath={`${itemPath}/${childId}`}
                                isLast={index === (item.items?.length ?? 0) - 1}
                                pathVerticalActive={
                                    activeChildIndex >= 0 &&
                                    index < activeChildIndex
                                }
                                pathElbowActive={index === activeChildIndex}
                            />
                        )
                    })}
                </View>
            </Animated.View>
        </View>
    )
}

SidebarItem.displayName = 'SidebarItem'

const styles = StyleSheet.create({
    labelArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIDEBAR_METRICS.itemGap,
        overflow: 'hidden',
    },
})
