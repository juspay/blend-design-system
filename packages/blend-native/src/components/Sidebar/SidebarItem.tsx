import { useEffect, useState } from 'react'
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
import { useSidebarContext } from './sidebar.context'
import { SIDEBAR_METRICS } from './sidebar.theme'
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

export type SidebarItemProps = {
    item: SidebarNavItem
    depth?: number
    testID?: string
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
}: SidebarItemProps) {
    const {
        palette,
        iconOnlyMode,
        activeItem,
        setActiveItem,
        reduceMotion,
        expandProgress,
    } = useSidebarContext('SidebarItem')

    const itemId = item.id ?? item.label
    const hasChildren = Boolean(item.items && item.items.length > 0)
    const isSelected = activeItem === itemId
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
            setActiveItem(itemId)
            item.onPress()
        } else if (!hasChildren) {
            setActiveItem(itemId)
        }
    }

    const textColor = isSelected ? palette.accentForeground : palette.foreground
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
            backgroundColor={showActiveState ? palette.accent : 'transparent'}
            borderRadius={SIDEBAR_METRICS.itemRadius}
            activeBackground={palette.accent}
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
                <Slot hidden color={textColor} maxHeight={16}>
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
                        fontWeight={
                            isSelected
                                ? SIDEBAR_METRICS.itemActiveFontWeight
                                : SIDEBAR_METRICS.itemFontWeight
                        }
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
                        <ChevronDown
                            size={16}
                            color={palette.mutedForeground}
                        />
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )

    if (!hasChildren || iconOnlyMode) return row

    return (
        <View style={{ alignSelf: 'stretch' }}>
            {row}
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
                        // paddingTop, not marginTop: onLayout's measured
                        // height must include this gap, or the panel's
                        // tweened height falls short and clips the last row.
                        paddingTop: 4,
                    }}
                >
                    {item.items?.map((child, index) => (
                        <SidebarItem
                            key={child.id ?? `${itemId}-${index}`}
                            item={child}
                            depth={depth + 1}
                        />
                    ))}
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
