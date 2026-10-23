import { ScrollView, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { BadgeColor, BadgeSize } from '@juspay/blend-design-system/node'
import Badge from '../Badge/Badge'
import Pressable from '../../primitives/Pressable'
import Tooltip from '../Tooltip/Tooltip'
import { SIDEBAR_METRICS } from './sidebar.theme'
import type { SidebarPalette } from './sidebar.theme'
import type { SidebarSecondaryInfo } from './sidebar.types'

export type SidebarSecondaryPanelProps = {
    info: SidebarSecondaryInfo
    palette: SidebarPalette
    /**
     * Same shared value the main rail's own width tween reads — web
     * collapses `SecondarySidebar` to 0 width in lockstep with the primary
     * panel going icon-only (`SecondarySidebar`'s own `isExpanded` prop is
     * literally the same flag), rather than leaving the tenant/workspace
     * rail docked while everything beside it collapses.
     */
    expandProgress: SharedValue<number>
    iconOnlyMode: boolean
    testID?: string
}

/**
 * The narrow tenant/workspace-switcher icon rail docked left of the main
 * panel — the native port of web's `SecondarySidebar`. Desktop/tablet only;
 * `Sidebar` doesn't render this in the mobile drawer, matching web (the
 * whole `nav` block, secondary rail included, is hidden on web's small
 * breakpoint too).
 *
 * Web shows each item's label in a hover tooltip; there's no hover on
 * touch, so this long-presses instead, same substitution `SidebarItem`
 * makes for icon-only rows.
 */
export default function SidebarSecondaryPanel({
    info,
    palette,
    expandProgress,
    iconOnlyMode,
}: SidebarSecondaryPanelProps) {
    const { items, selected, onSelect, footerSlot } = info

    const panelStyle = useAnimatedStyle(
        () => ({
            width: expandProgress.value * SIDEBAR_METRICS.secondaryWidth,
            opacity: expandProgress.value,
        }),
        []
    )

    if (items.length === 0) return null

    return (
        <Animated.View
            style={[
                {
                    borderRightWidth: 1,
                    borderRightColor: palette.border,
                    backgroundColor: palette.background,
                    alignItems: 'center',
                    overflow: 'hidden',
                    paddingTop: SIDEBAR_METRICS.secondaryPaddingY,
                    paddingBottom: SIDEBAR_METRICS.secondaryPaddingY,
                },
                panelStyle,
            ]}
            accessibilityRole="none"
            accessibilityElementsHidden={iconOnlyMode}
            importantForAccessibility={
                iconOnlyMode ? 'no-hide-descendants' : 'auto'
            }
            testID="sidebar-secondary-panel"
        >
            <ScrollView
                style={{ flexGrow: 0, width: SIDEBAR_METRICS.secondaryWidth }}
                contentContainerStyle={{
                    alignItems: 'center',
                    gap: SIDEBAR_METRICS.secondaryGap,
                    paddingLeft: SIDEBAR_METRICS.secondaryPaddingX,
                    paddingRight: SIDEBAR_METRICS.secondaryPaddingX,
                }}
                showsVerticalScrollIndicator={false}
            >
                {items.map((item) => {
                    const isSelected = item.value === selected
                    const button = (
                        <Pressable
                            onPress={() => onSelect(item.value)}
                            width={SIDEBAR_METRICS.secondaryItemSize}
                            height={SIDEBAR_METRICS.secondaryItemSize}
                            borderRadius={SIDEBAR_METRICS.secondaryItemRadius}
                            border={
                                isSelected
                                    ? `1px solid ${palette.accent}`
                                    : `1px solid ${palette.border}`
                            }
                            alignItems="center"
                            justifyContent="center"
                            activeBackground={palette.hoverBackground}
                            accessibilityRole="button"
                            accessibilityLabel={`Select ${item.label}`}
                            accessibilityState={{ selected: isSelected }}
                        >
                            {item.icon}
                        </Pressable>
                    )

                    return (
                        <Tooltip key={item.value} content={item.label}>
                            {item.badge ? (
                                <Badge
                                    text={item.badge.text.slice(0, 2)}
                                    color={
                                        item.badge.color ?? BadgeColor.NEUTRAL
                                    }
                                    size={BadgeSize.SM}
                                    position="bottom-right"
                                    isCircular
                                >
                                    {button}
                                </Badge>
                            ) : (
                                button
                            )}
                        </Tooltip>
                    )
                })}
            </ScrollView>

            {footerSlot ? (
                <View
                    style={{
                        width: SIDEBAR_METRICS.secondaryWidth,
                        marginTop: 'auto',
                        alignItems: 'center',
                        gap: SIDEBAR_METRICS.secondaryGap,
                        paddingTop: SIDEBAR_METRICS.secondaryGap,
                    }}
                >
                    {footerSlot}
                </View>
            ) : null}
        </Animated.View>
    )
}

SidebarSecondaryPanel.displayName = 'SidebarSecondaryPanel'
