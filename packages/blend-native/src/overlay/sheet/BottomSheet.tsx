import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    BackHandler,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
    type LayoutChangeEvent,
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
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'
import {
    clampSheetDrag,
    resolveSheetMaxHeight,
    shouldDismissSheet,
    SHEET_MAX_HEIGHT_FRACTION,
} from './sheetMath'

/**
 * BottomSheet — the gesture-driven sheet foundation.
 *
 * The native replacement for `vaul` and the phone presentation web already
 * prescribes in its Mobile* variants (mobileModalV2, MobileSingleSelectV2,
 * MobilePopoverV2): DrawerV2 and the phone modes of Select/Menu/Modal
 * compose this primitive and pass their token values in — the sheet itself
 * carries structure and physics, not design decisions, which is why its
 * colour props have plain defaults instead of token lookups.
 *
 * Controlled: `open` drives it; every dismiss route (drag, backdrop, the
 * Android back button) calls `onClose` and the owner flips `open` — the
 * exit animation runs, then the sheet unmounts from the portal layer.
 *
 * Requirements: `react-native-reanimated` and `react-native-gesture-handler`
 * (required peers), and a `GestureHandlerRootView` at the app root — apps
 * using react-navigation already have one. `react-native-safe-area-context`
 * is optional: with it (and its provider) mounted, the sheet pads itself
 * past the home indicator; without it the bottom inset is 0.
 *
 * Reduce-motion: the slide collapses to a fade (`useReduceMotion`).
 */

export type BottomSheetProps = {
    /** Whether the sheet is presented. */
    open: boolean
    /** Called whenever the sheet asks to close; the owner flips `open`. */
    onClose: () => void
    children?: React.ReactNode
    /** Cap on sheet height as a fraction of the window. Default 0.9. */
    maxHeightFraction?: number
    /** Backdrop fill. Defaults to 50% black. */
    backdropColor?: string
    /** Sheet surface colour. Component layers pass their token value. */
    backgroundColor?: string
    /** Radius of the two top corners. */
    topRadius?: number
    /** Show the drag handle. Default true. */
    showHandle?: boolean
    handleColor?: string
    /** Allow drag-down to dismiss. Default true. */
    dragToDismiss?: boolean
    /** Dismiss when the backdrop is pressed. Default true. */
    dismissOnBackdropPress?: boolean
    accessibilityLabel?: string
    testID?: string
    /** Style escape hatch for the sheet surface. */
    style?: ViewStyle
}

// ---- Optional safe-area integration -------------------------------------
// `useContext` needs *a* context unconditionally, so when the optional peer
// is absent (or its provider is not mounted) a null-valued fallback stands
// in. Same probe pattern as expo-linear-gradient in `Pressable`.
type EdgeInsets = { top: number; bottom: number; left: number; right: number }
const FallbackInsetsContext = createContext<EdgeInsets | null>(null)

let SafeAreaInsetsContext: React.Context<EdgeInsets | null> =
    FallbackInsetsContext
try {
    if (typeof require === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const safeArea = require('react-native-safe-area-context') as {
            SafeAreaInsetsContext?: React.Context<EdgeInsets | null>
        }
        SafeAreaInsetsContext =
            safeArea.SafeAreaInsetsContext ?? FallbackInsetsContext
    }
} catch {
    SafeAreaInsetsContext = FallbackInsetsContext
}

const ENTER = {
    duration: MOTION_DURATION.slow,
    easing: Easing.bezier(...MOTION_EASING.decelerate),
}
const EXIT = {
    duration: MOTION_DURATION.normal,
    easing: Easing.bezier(...MOTION_EASING.accelerate),
}

export function BottomSheet({
    open,
    onClose,
    children,
    maxHeightFraction = SHEET_MAX_HEIGHT_FRACTION,
    backdropColor = 'rgba(0, 0, 0, 0.5)',
    backgroundColor = '#FFFFFF',
    topRadius = 16,
    showHandle = true,
    handleColor = 'rgba(0, 0, 0, 0.2)',
    dragToDismiss = true,
    dismissOnBackdropPress = true,
    accessibilityLabel,
    testID,
    style,
}: BottomSheetProps) {
    // Mounted outlives `open` by one exit animation.
    const [mounted, setMounted] = useState(open)
    const progress = useSharedValue(0)
    const dragY = useSharedValue(0)
    const sheetHeight = useSharedValue(0)
    const window = useWindowDimensions()
    const insets = useContext(SafeAreaInsetsContext)
    const reduceMotion = useReduceMotion()

    const unmount = useCallback(() => setMounted(false), [])

    useEffect(() => {
        if (open) {
            setMounted(true)
            progress.value = withTiming(1, ENTER)
        } else {
            // Drag offset folds into the exit so a gesture-dismissed sheet
            // continues downward from wherever the finger left it.
            dragY.value = withTiming(0, EXIT)
            progress.value = withTiming(0, EXIT, (finished) => {
                if (finished) runOnJS(unmount)()
            })
        }
    }, [open, progress, dragY, unmount])

    // Android hardware back closes the sheet instead of the screen.
    useEffect(() => {
        if (!open) return
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                onClose()
                return true
            }
        )
        return () => subscription.remove()
    }, [open, onClose])

    const onSheetLayout = useCallback(
        (event: LayoutChangeEvent) => {
            sheetHeight.value = event.nativeEvent.layout.height
        },
        [sheetHeight]
    )

    const pan = Gesture.Pan()
        .enabled(dragToDismiss)
        .onChange((event) => {
            dragY.value = clampSheetDrag(event.translationY)
        })
        .onEnd((event) => {
            if (
                shouldDismissSheet(
                    event.translationY,
                    event.velocityY,
                    sheetHeight.value
                )
            ) {
                runOnJS(onClose)()
            } else {
                dragY.value = withSpring(0, { damping: 22, stiffness: 320 })
            }
        })

    const windowHeight = window.height
    const sheetStyle = useAnimatedStyle(() => {
        if (reduceMotion) {
            return {
                opacity: progress.value,
                transform: [{ translateY: dragY.value }],
            }
        }
        // Until the first layout lands, the full window height keeps the
        // sheet parked off-screen instead of flashing in place.
        const height = sheetHeight.value || windowHeight
        return {
            opacity: 1,
            transform: [
                { translateY: (1 - progress.value) * height + dragY.value },
            ],
        }
    }, [reduceMotion, windowHeight])

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
    }))

    if (!mounted) return null

    const maxHeight = resolveSheetMaxHeight(
        windowHeight,
        insets?.top ?? 0,
        maxHeightFraction
    )

    return (
        <Portal>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: backdropColor },
                    backdropStyle,
                ]}
                testID={testID ? `${testID}-backdrop` : undefined}
                // The sheet is the modal surface; VoiceOver skips the
                // backdrop (it could not reach it past
                // accessibilityViewIsModal anyway).
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
                    onLayout={onSheetLayout}
                    accessibilityViewIsModal
                    accessibilityLabel={accessibilityLabel}
                    testID={testID}
                    style={[
                        styles.sheet,
                        {
                            maxHeight,
                            backgroundColor,
                            borderTopLeftRadius: topRadius,
                            borderTopRightRadius: topRadius,
                            paddingBottom: insets?.bottom ?? 0,
                        },
                        sheetStyle,
                        style,
                    ]}
                >
                    {showHandle ? (
                        <View
                            style={[
                                styles.handle,
                                { backgroundColor: handleColor },
                            ]}
                        />
                    ) : null}
                    {children}
                </Animated.View>
            </GestureDetector>
        </Portal>
    )
}

BottomSheet.displayName = 'BottomSheet'

const styles = StyleSheet.create({
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    handle: {
        alignSelf: 'center',
        width: 36,
        height: 4,
        borderRadius: 2,
        marginTop: 8,
        marginBottom: 4,
    },
})

export default BottomSheet
