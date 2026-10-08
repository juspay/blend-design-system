import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
    BackHandler,
    Platform,
    Pressable,
    StyleSheet,
    type LayoutChangeEvent,
    type StyleProp,
    type ViewStyle,
} from 'react-native'
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal } from '../portal'
import { SafeAreaInsetsContext } from '../safeAreaInsets'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'
import {
    clampDrawerDrag,
    closedOffset,
    shouldActivateDrawerPan,
    shouldDismissDrawer,
    type DrawerSide,
} from './drawerMath'

/**
 * SideDrawer — a drawer anchored to the left or right edge, sliding in over
 * the app content.
 *
 * The horizontal counterpart of `BottomSheet`: same controlled-`open`,
 * portal-mounted, gesture-driven shape, with the drag axis and offscreen
 * offset flipped per `side`. Built for navigation drawers (`Sidebar`'s
 * mobile presentation) rather than as a general BottomSheet replacement — it
 * has no scroll-cooperation layer (`BottomSheetScrollable`'s counterpart),
 * since drawer content is typically a nav list without competing gestures
 * along the same axis.
 *
 * Requirements: `react-native-reanimated` and `react-native-gesture-handler`
 * (required peers), a `GestureHandlerRootView` at the app root.
 * `react-native-safe-area-context` is optional: with it mounted, the drawer
 * pads itself past the notch/home indicator on the open edge.
 *
 * Reduce-motion: the slide collapses to a fade (`useReduceMotion`).
 */

export type SideDrawerProps = {
    /** Whether the drawer is presented. */
    open: boolean
    /** Called whenever the drawer asks to close; the owner flips `open`. */
    onClose: () => void
    children?: React.ReactNode
    /** Which edge the drawer slides in from. Default `'left'`. */
    side?: DrawerSide
    /** Drawer width in points. Default 280. */
    width?: number
    /** Backdrop fill. Defaults to 50% black. */
    backdropColor?: string
    /** Drawer surface colour. Component layers pass their token value. */
    backgroundColor?: string
    /** Allow drag-toward-the-edge to dismiss. Default true. */
    dragToDismiss?: boolean
    /** Dismiss when the backdrop is pressed. Default true. */
    dismissOnBackdropPress?: boolean
    accessibilityLabel?: string
    testID?: string
    /** Style escape hatch for the drawer surface. */
    style?: StyleProp<ViewStyle>
}

const ENTER = {
    duration: MOTION_DURATION.slow,
    easing: Easing.bezier(...MOTION_EASING.decelerate),
}
const EXIT = {
    duration: MOTION_DURATION.normal,
    easing: Easing.bezier(...MOTION_EASING.accelerate),
}

export function SideDrawer({
    open,
    onClose,
    children,
    side = 'left',
    width = 280,
    backdropColor = 'rgba(0, 0, 0, 0.5)',
    backgroundColor = '#FFFFFF',
    dragToDismiss = true,
    dismissOnBackdropPress = true,
    accessibilityLabel,
    testID,
    style,
}: SideDrawerProps) {
    // Mounted outlives `open` by one exit animation.
    const [mounted, setMounted] = useState(open)
    const progress = useSharedValue(0)
    const dragX = useSharedValue(0)
    const drawerWidth = useSharedValue(width)
    const insets = useContext(SafeAreaInsetsContext)
    const reduceMotion = useReduceMotion()

    const unmount = useCallback(() => setMounted(false), [])

    useEffect(() => {
        drawerWidth.value = width
    }, [width, drawerWidth])

    useEffect(() => {
        if (open) {
            setMounted(true)
            progress.value = withTiming(1, ENTER)
        } else {
            dragX.value = withTiming(0, EXIT)
            progress.value = withTiming(0, EXIT, (finished) => {
                if (finished) runOnJS(unmount)()
            })
        }
    }, [open, progress, dragX, unmount])

    // Android hardware back closes the drawer instead of the screen.
    // BackHandler is a no-op stub on web that logs a warning if touched.
    useEffect(() => {
        if (!open || Platform.OS === 'web') return
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                onClose()
                return true
            }
        )
        return () => subscription.remove()
    }, [open, onClose])

    const onDrawerLayout = useCallback(
        (event: LayoutChangeEvent) => {
            drawerWidth.value = event.nativeEvent.layout.width
        },
        [drawerWidth]
    )

    // Manual activation: only once the finger has travelled the activation
    // distance in the closing direction does the pan take over, so taps and
    // vertical scrolling inside the drawer's content stay live.
    const touchStartX = useSharedValue(0)
    const pan = Gesture.Pan()
        .enabled(dragToDismiss)
        .manualActivation(true)
        .failOffsetY([-16, 16])
        .onTouchesDown((event) => {
            touchStartX.value = event.changedTouches[0]?.x ?? 0
        })
        .onTouchesMove((event, stateManager) => {
            const travel = (event.changedTouches[0]?.x ?? 0) - touchStartX.value
            if (shouldActivateDrawerPan(travel, side)) {
                stateManager.activate()
            }
        })
        .onChange((event) => {
            dragX.value = clampDrawerDrag(event.translationX, side)
        })
        .onEnd((event) => {
            if (
                shouldDismissDrawer(
                    event.translationX,
                    event.velocityX,
                    drawerWidth.value,
                    side
                )
            ) {
                runOnJS(onClose)()
            } else {
                dragX.value = withSpring(0, { damping: 22, stiffness: 320 })
            }
        })

    const drawerStyle = useAnimatedStyle(() => {
        if (reduceMotion) {
            return {
                opacity: progress.value,
                transform: [{ translateX: dragX.value }],
            }
        }
        const offscreen = closedOffset(drawerWidth.value || width, side)
        return {
            opacity: 1,
            transform: [
                { translateX: (1 - progress.value) * offscreen + dragX.value },
            ],
        }
    }, [reduceMotion, side, width])

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
    }))

    if (!mounted) return null

    return (
        <Portal modal>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: backdropColor },
                    backdropStyle,
                ]}
                testID={testID ? `${testID}-backdrop` : undefined}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
            >
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={dismissOnBackdropPress ? onClose : undefined}
                />
            </Animated.View>

            <GestureDetector gesture={pan}>
                <Animated.View
                    onLayout={onDrawerLayout}
                    accessibilityViewIsModal
                    onAccessibilityEscape={onClose}
                    accessibilityLabel={accessibilityLabel}
                    testID={testID}
                    style={[
                        side === 'left' ? styles.sheetLeft : styles.sheetRight,
                        {
                            width,
                            backgroundColor,
                            paddingTop: insets?.top ?? 0,
                            paddingBottom: insets?.bottom ?? 0,
                        },
                        drawerStyle,
                        style,
                    ]}
                >
                    {children}
                </Animated.View>
            </GestureDetector>
        </Portal>
    )
}

SideDrawer.displayName = 'SideDrawer'

const styles = StyleSheet.create({
    sheetLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    sheetRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
    },
})

export default SideDrawer
