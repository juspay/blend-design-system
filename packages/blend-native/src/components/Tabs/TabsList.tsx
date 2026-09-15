import { forwardRef, useEffect, useRef } from 'react'
import { ScrollView, View, useWindowDimensions } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { TabsV2Variant } from '@juspay/blend-design-system/node'
import type { TabsV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import {
    parseBorder,
    parseBorderRadius,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import { useTabsContext } from './tabs.context'
import type { TabsListNativeProps } from './tabs.types'

/**
 * The scrollable tab bar with the animated indicator.
 *
 * Triggers report their layout into the Tabs context; one Animated.View
 * follows the active trigger with `withTiming` — replacing web's CSS-vars +
 * ResizeObserver (underline) and framer-motion `layoutId` (boxed/floating/
 * pills, where the indicator paints the active background behind triggers).
 * The active trigger auto-centers via `scrollTo`.
 */
const TabsList = forwardRef<View, TabsListNativeProps>(function TabsList(
    { children, accessibilityLabel, testID, style },
    ref
) {
    const context = useTabsContext('TabsList')
    const tokens = useNativeTokens<TabsV2TokensType>('TABSV2')
    const reduceMotion = useReduceMotion()
    const scrollRef = useRef<ScrollView>(null)
    const { width: windowWidth } = useWindowDimensions()

    const { variant, size, value, layouts, layoutsVersion } = context
    const list = tokens.tabList
    const underline = variant === TabsV2Variant.UNDERLINE

    const indicatorX = useSharedValue(0)
    const indicatorWidth = useSharedValue(0)
    const indicatorOpacity = useSharedValue(0)

    useEffect(() => {
        const layout = value ? layouts.current.get(value) : undefined
        if (!layout || layout.width === 0) {
            indicatorOpacity.value = 0
            return
        }
        const timing = {
            duration: reduceMotion ? 0 : MOTION_DURATION.normal,
            easing: Easing.bezier(...MOTION_EASING.standard),
        }
        // First placement snaps into position instead of sliding from 0.
        if (indicatorOpacity.value === 0) {
            indicatorX.value = layout.x
            indicatorWidth.value = layout.width
        } else {
            indicatorX.value = withTiming(layout.x, timing)
            indicatorWidth.value = withTiming(layout.width, timing)
        }
        indicatorOpacity.value = 1

        // Keep the active trigger visible, roughly centred.
        scrollRef.current?.scrollTo({
            x: Math.max(0, layout.x - windowWidth / 2 + layout.width / 2),
            animated: !reduceMotion,
        })
    }, [
        value,
        layoutsVersion,
        reduceMotion,
        windowWidth,
        layouts,
        indicatorX,
        indicatorWidth,
        indicatorOpacity,
    ])

    const indicatorStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateX: indicatorX.value }],
            width: indicatorWidth.value,
            opacity: indicatorOpacity.value,
        }),
        []
    )

    const listRadius =
        parseBorderRadius(
            list.borderRadius[size]?.[variant] as string | number
        ) ?? 0
    const pad = list.padding[size]?.[variant]
    const bottomBorder = parseBorder(String(list.borderBottom[variant]))
    const triggerRadius =
        parseBorderRadius(
            list.trigger.borderRadius[size]?.[variant] as string | number
        ) ?? 0

    const indicatorChrome = underline
        ? {
              bottom:
                  parseDimension(
                      list.activeIndicator.position.bottom as string | number
                  ) ?? 0,
              height:
                  parseDimension(
                      list.activeIndicator.height as string | number
                  ) ?? 2,
              backgroundColor: String(list.activeIndicator.color),
          }
        : {
              top: 0,
              bottom: 0,
              backgroundColor: String(
                  list.trigger.backgroundColor[variant]?.active ?? 'transparent'
              ),
              ...(typeof triggerRadius === 'number'
                  ? { borderRadius: triggerRadius }
                  : triggerRadius),
          }

    return (
        <View
            ref={ref}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            style={[
                {
                    backgroundColor: String(
                        list.backgroundColor[variant] ?? 'transparent'
                    ),
                    ...(typeof listRadius === 'number'
                        ? { borderRadius: listRadius }
                        : listRadius),
                    borderBottomWidth: bottomBorder.borderWidth,
                    borderBottomColor: bottomBorder.borderColor,
                },
                style,
            ]}
        >
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View
                    accessibilityRole="tablist"
                    style={{
                        flexDirection: 'row',
                        gap: parseDimension(list.gap as string | number) ?? 8,
                        paddingTop: parseDimension(pad?.top as string | number),
                        paddingRight: parseDimension(
                            pad?.right as string | number
                        ),
                        paddingBottom: parseDimension(
                            pad?.bottom as string | number
                        ),
                        paddingLeft: parseDimension(
                            pad?.left as string | number
                        ),
                        minWidth: '100%',
                    }}
                >
                    <Animated.View
                        pointerEvents="none"
                        testID={testID ? `${testID}-indicator` : undefined}
                        style={[
                            { position: 'absolute', left: 0 },
                            indicatorChrome,
                            indicatorStyle,
                        ]}
                    />
                    {children}
                </View>
            </ScrollView>
        </View>
    )
})

TabsList.displayName = 'TabsList'

export default TabsList
