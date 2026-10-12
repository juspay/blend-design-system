import { useContext, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { MoreHorizontal } from 'lucide-react-native'
import { SafeAreaInsetsContext } from '../../overlay/safeAreaInsets'
import BottomSheet from '../../overlay/sheet/BottomSheet'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import Text from '../../primitives/Text'
import { SIDEBAR_METRICS } from './sidebar.theme'
import type { SidebarPalette } from './sidebar.theme'
import type { SidebarNavItem } from './sidebar.types'

/** How many items fit in the bar itself before the rest fold into "More". */
const VISIBLE_LIMIT = 4

export type SidebarMobileBottomNavProps = {
    items: SidebarNavItem[]
    activeItem: string | null
    onSelect: (id: string) => void
    palette: SidebarPalette
    /** Opens the "More" overflow sheet — see `SidebarMobileMoreSheet`. */
    onOpenMore: () => void
}

/**
 * A floating bottom nav bar, built from every item across `data` flagged
 * `showOnMobile` — the native counterpart to web's
 * `SidebarV2MobileNavigation`.
 *
 * Deliberately **not** a port of that component's exact mechanics: web
 * computes a viewport-height-driven snap-point layout, reflows items into
 * primary/secondary rows, and reorders a picked secondary item in place of
 * the last primary slot. None of that has a clean RN equivalent (no
 * `window.visualViewport`, and in-place reordering fights React Navigation's
 * usual "stable tab bar" expectation), so this keeps the two ideas that
 * matter — a handful of items always reachable in one tap, the rest one tap
 * behind "More" — and answers "More" with a plain `BottomSheet` listing the
 * overflow (`SidebarMobileMoreSheet`, below) instead of replicating web's
 * in-place expanding accordion panel.
 */
export default function SidebarMobileBottomNav({
    items,
    activeItem,
    onSelect,
    palette,
    onOpenMore,
}: SidebarMobileBottomNavProps) {
    const insets = useContext(SafeAreaInsetsContext)
    const visible = useMemo(() => items.slice(0, VISIBLE_LIMIT), [items])
    const hasMore = items.length > VISIBLE_LIMIT

    if (items.length === 0) return null

    return (
        <View
            pointerEvents="box-none"
            style={[
                styles.wrapper,
                { paddingBottom: Math.max(insets?.bottom ?? 0, 8) },
            ]}
        >
            <View
                style={[
                    styles.bar,
                    {
                        backgroundColor: palette.background,
                        borderColor: palette.border,
                    },
                ]}
                accessibilityRole="none"
                testID="sidebar-mobile-bottom-nav"
            >
                {visible.map((item) => {
                    const itemId = item.id ?? item.label
                    const isSelected = activeItem === itemId
                    const color = isSelected
                        ? palette.selectedForeground
                        : palette.foreground
                    return (
                        <Pressable
                            key={itemId}
                            onPress={() => onSelect(itemId)}
                            flexGrow={1}
                            minHeight={SIDEBAR_METRICS.mobileNavItemSize}
                            alignItems="center"
                            justifyContent="center"
                            gap={SIDEBAR_METRICS.mobileNavGap}
                            borderRadius={SIDEBAR_METRICS.mobileNavRadius}
                            activeBackground={palette.hoverBackground}
                            accessibilityRole="button"
                            accessibilityLabel={item.label}
                            accessibilityState={{ selected: isSelected }}
                        >
                            {item.leftSlot ? (
                                <Slot
                                    hidden
                                    color={color}
                                    maxHeight={
                                        SIDEBAR_METRICS.mobileNavIconSize
                                    }
                                >
                                    {item.leftSlot}
                                </Slot>
                            ) : null}
                            <Text
                                fontSize={SIDEBAR_METRICS.mobileNavFontSize}
                                fontWeight={SIDEBAR_METRICS.itemFontWeight}
                                color={color}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    )
                })}

                {hasMore && (
                    <Pressable
                        onPress={onOpenMore}
                        flexGrow={1}
                        minHeight={SIDEBAR_METRICS.mobileNavItemSize}
                        alignItems="center"
                        justifyContent="center"
                        gap={SIDEBAR_METRICS.mobileNavGap}
                        borderRadius={SIDEBAR_METRICS.mobileNavRadius}
                        activeBackground={palette.hoverBackground}
                        accessibilityRole="button"
                        accessibilityLabel="More navigation options"
                    >
                        <MoreHorizontal
                            size={SIDEBAR_METRICS.mobileNavIconSize}
                            color={palette.foreground}
                        />
                        <Text
                            fontSize={SIDEBAR_METRICS.mobileNavFontSize}
                            fontWeight={SIDEBAR_METRICS.itemFontWeight}
                            color={palette.foreground}
                        >
                            More
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}

SidebarMobileBottomNav.displayName = 'SidebarMobileBottomNav'

/**
 * The "More" overflow panel — a plain `BottomSheet` listing every item past
 * `VISIBLE_LIMIT`. Split out from the bar itself so `Sidebar` can mount it
 * only while open (it has its own `open` prop) rather than it always sitting
 * in the tree.
 */
export function SidebarMobileMoreSheet({
    items,
    activeItem,
    onSelect,
    palette,
    open,
    onClose,
}: {
    items: SidebarNavItem[]
    activeItem: string | null
    onSelect: (id: string) => void
    palette: SidebarPalette
    open: boolean
    onClose: () => void
}) {
    const overflow = useMemo(() => items.slice(VISIBLE_LIMIT), [items])

    return (
        <BottomSheet
            open={open}
            onClose={onClose}
            backgroundColor={palette.background}
        >
            <View style={{ paddingVertical: 8 }}>
                {overflow.map((item) => {
                    const itemId = item.id ?? item.label
                    const isSelected = activeItem === itemId
                    const color = isSelected
                        ? palette.selectedForeground
                        : palette.foreground
                    return (
                        <Pressable
                            key={itemId}
                            onPress={() => onSelect(itemId)}
                            flexDirection="row"
                            alignItems="center"
                            gap={SIDEBAR_METRICS.itemGap}
                            minHeight={44}
                            paddingLeft={SIDEBAR_METRICS.itemPaddingX}
                            paddingRight={SIDEBAR_METRICS.itemPaddingX}
                            backgroundColor={
                                isSelected
                                    ? palette.selectedBackground
                                    : 'transparent'
                            }
                            borderRadius={SIDEBAR_METRICS.itemRadius}
                            activeBackground={palette.hoverBackground}
                            accessibilityRole="button"
                            accessibilityLabel={item.label}
                            accessibilityState={{ selected: isSelected }}
                        >
                            {item.leftSlot ? (
                                <Slot
                                    hidden
                                    color={color}
                                    maxHeight={SIDEBAR_METRICS.itemIconWidth}
                                >
                                    {item.leftSlot}
                                </Slot>
                            ) : null}
                            <Text
                                fontSize={SIDEBAR_METRICS.itemFontSize}
                                fontWeight={SIDEBAR_METRICS.itemFontWeight}
                                color={color}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
        </BottomSheet>
    )
}

SidebarMobileMoreSheet.displayName = 'SidebarMobileMoreSheet'

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingHorizontal: SIDEBAR_METRICS.mobileNavPaddingX,
    },
    bar: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderRadius: SIDEBAR_METRICS.mobileNavRadius,
        paddingHorizontal: SIDEBAR_METRICS.mobileNavPaddingX,
        paddingVertical: SIDEBAR_METRICS.mobileNavPaddingY,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
})
