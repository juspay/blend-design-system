import { forwardRef, useContext, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { View as RNView } from 'react-native'
import { BadgeSize } from '@juspay/blend-design-system/node'
import { useControllableState } from '../../hooks/useControllableState'
import { SafeAreaInsetsContext } from '../../overlay/safeAreaInsets'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import Text from '../../primitives/Text'
import { BlendNativeThemeContext } from '../../theme/BlendNativeProvider'
import { Badge } from '../Badge'
import {
    BOTTOM_NAVIGATION_METRICS as M,
    getBottomNavigationPalette,
} from './bottomNavigation.theme'
import type { BottomNavigationPalette } from './bottomNavigation.theme'
import type {
    BottomNavigationItem,
    BottomNavigationNativeProps,
} from './bottomNavigation.types'

/**
 * BottomNavigation — a full-width tab bar docked to the bottom edge,
 * padded by the safe-area bottom inset, with an optional raised centre
 * action.
 *
 * Sits in normal layout (place it last in a full-height column), like a
 * native tab bar, so hosts need no padding bookkeeping. Unlike `Sidebar`'s
 * floating mobile nav this is a plain docked bar — no overflow "More"
 * sheet; make an item `selectable: false` and answer it in `onItemPress`
 * instead.
 */
const BottomNavigation = forwardRef<RNView, BottomNavigationNativeProps>(
    function BottomNavigation(
        {
            items,
            activeItem: activeItemProp,
            defaultActiveItem = null,
            onActiveItemChange,
            onItemPress,
            centerAction,
            centerGap,
            background,
            tokens,
            accessibilityLabel,
            testID,
        },
        ref
    ) {
        const { theme } = useContext(BlendNativeThemeContext)
        const palette = useMemo(
            () => ({ ...getBottomNavigationPalette(theme), ...tokens }),
            [theme, tokens]
        )
        const metrics = useMemo(() => ({ ...M, ...tokens }), [tokens])
        const insets = useContext(SafeAreaInsetsContext)

        // `onActiveItemChange` is called directly below rather than handed
        // to the hook: the hook's `onChange` is typed for `string | null`.
        const [activeItem, setActiveItem] = useControllableState<string | null>(
            activeItemProp,
            defaultActiveItem
        )

        const handlePress = (item: BottomNavigationItem) => {
            if (item.disabled) return
            onItemPress?.(item.id)
            if (item.selectable === false) return
            setActiveItem(item.id)
            onActiveItemChange?.(item.id)
        }

        const renderItem = (item: BottomNavigationItem) => (
            <NavItem
                key={item.id}
                item={item}
                selected={activeItem === item.id}
                palette={palette}
                metrics={metrics}
                onPress={() => handlePress(item)}
            />
        )
        const half = Math.ceil(items.length / 2)
        const split = centerAction !== undefined || centerGap !== undefined

        return (
            <View
                ref={ref}
                style={[
                    styles.bar,
                    {
                        backgroundColor: background
                            ? 'transparent'
                            : palette.background,
                        borderTopWidth: background
                            ? 0
                            : StyleSheet.hairlineWidth,
                        borderTopColor: palette.border,
                        paddingHorizontal: metrics.paddingX,
                        paddingTop: metrics.paddingY,
                        paddingBottom: metrics.paddingY + (insets?.bottom ?? 0),
                    },
                ]}
                accessibilityRole="tabbar"
                accessibilityLabel={accessibilityLabel}
                testID={testID}
            >
                {background ? (
                    <View pointerEvents="none" style={styles.background}>
                        {background}
                    </View>
                ) : null}
                {split ? (
                    <>
                        <View style={styles.half}>
                            {items.slice(0, half).map(renderItem)}
                        </View>
                        <View
                            style={[
                                styles.centerSlot,
                                {
                                    width: centerGap ?? M.centerActionSize,
                                },
                            ]}
                        >
                            {centerAction ? (
                                <Pressable
                                    onPress={centerAction.onPress}
                                    width={M.centerActionSize}
                                    height={M.centerActionSize}
                                    borderRadius={M.centerActionSize / 2}
                                    alignItems="center"
                                    justifyContent="center"
                                    backgroundColor={
                                        palette.centerActionBackground
                                    }
                                    activeBackground={
                                        palette.centerActionPressedBackground
                                    }
                                    boxShadow={palette.centerActionShadow}
                                    style={styles.centerAction}
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        centerAction.accessibilityLabel
                                    }
                                >
                                    <Slot
                                        hidden
                                        color={palette.centerActionForeground}
                                        maxHeight={M.centerActionIconSize}
                                    >
                                        {centerAction.icon}
                                    </Slot>
                                </Pressable>
                            ) : null}
                        </View>
                        <View style={styles.half}>
                            {items.slice(half).map(renderItem)}
                        </View>
                    </>
                ) : (
                    items.map(renderItem)
                )}
            </View>
        )
    }
)

BottomNavigation.displayName = 'BottomNavigation'

function NavItem({
    item,
    selected,
    palette,
    metrics,
    onPress,
}: {
    item: BottomNavigationItem
    selected: boolean
    palette: BottomNavigationPalette
    metrics: typeof M
    onPress: () => void
}) {
    const color = selected ? palette.activeForeground : palette.foreground
    const icon = (
        <Slot hidden color={color} maxHeight={metrics.iconSize}>
            {selected && item.activeIcon ? item.activeIcon : item.icon}
        </Slot>
    )

    return (
        <Pressable
            onPress={onPress}
            disabled={item.disabled}
            style={styles.equalWidth}
            minHeight={metrics.itemMinHeight}
            alignItems="center"
            justifyContent="center"
            gap={metrics.itemGap}
            activeBackground={palette.pressedBackground}
            opacity={item.disabled ? M.disabledOpacity : 1}
            accessibilityRole="tab"
            accessibilityLabel={item.accessibilityLabel ?? item.label}
            accessibilityState={{ selected, disabled: !!item.disabled }}
        >
            {item.badge !== undefined ? (
                <Badge
                    size={BadgeSize.SM}
                    {...(typeof item.badge === 'number'
                        ? { count: item.badge }
                        : { text: item.badge })}
                >
                    {icon}
                </Badge>
            ) : (
                icon
            )}
            <Text
                fontSize={metrics.labelFontSize}
                lineHeight={metrics.labelLineHeight}
                fontWeight={metrics.labelFontWeight}
                color={color}
                numberOfLines={1}
            >
                {item.label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    half: {
        flex: 1,
        flexDirection: 'row',
    },
    equalWidth: {
        flexGrow: 1,
        flexBasis: 0,
    },
    centerSlot: {
        alignItems: 'center',
    },
    centerAction: {
        marginTop: -M.centerActionLift,
    },
})

export default BottomNavigation
