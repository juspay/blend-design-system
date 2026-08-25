import { useCallback, useContext, useEffect, useSyncExternalStore } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Portal } from '../portal'
import { SafeAreaInsetsContext } from '../safeAreaInsets'
import {
    MOTION_DURATION,
    MOTION_EASING,
    MOTION_PRESETS,
} from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { useLiveRegionAnnounce } from '../../a11y/useLiveRegion'
import {
    dismissToast,
    getToasts,
    getVisibleToasts,
    subscribeToasts,
    type ToastEntry,
} from './toastStore'

/**
 * The toast rendering surface, mounted once by `BlendNativeProvider`.
 *
 * Subscribes to the store and renders the newest `MAX_VISIBLE_TOASTS`
 * bottom-stacked above everything through a `Portal`. Each toast slides up
 * on entry (a fade under reduce-motion), owns its auto-dismiss timer, and
 * announces itself to assistive tech when asked.
 */
export function ToastOutlet() {
    const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)
    const insets = useContext(SafeAreaInsetsContext)

    const visible = getVisibleToasts(toasts)
    if (visible.length === 0) return null

    return (
        <Portal>
            <View
                style={[
                    styles.stack,
                    { paddingBottom: (insets?.bottom ?? 0) + 16 },
                ]}
                pointerEvents="box-none"
                testID="blend-toast-outlet"
            >
                {visible.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </View>
        </Portal>
    )
}

ToastOutlet.displayName = 'ToastOutlet'

function ToastItem({ toast }: { toast: ToastEntry }) {
    const reduceMotion = useReduceMotion()
    const progress = useSharedValue(0)

    const dismiss = useCallback(() => dismissToast(toast.id), [toast.id])

    // Enter animation once per toast id.
    useEffect(() => {
        progress.value = withTiming(1, {
            duration: MOTION_PRESETS.slideUp.duration,
            easing: Easing.bezier(...MOTION_EASING.decelerate),
        })
    }, [progress])

    // Auto-dismiss owns its timer; content replacement (same id) restarts it.
    useEffect(() => {
        if (toast.duration === null) return
        const timer = setTimeout(dismiss, toast.duration)
        return () => clearTimeout(timer)
    }, [toast.id, toast.duration, toast.content, dismiss])

    useLiveRegionAnnounce(toast.announcement, Boolean(toast.announcement))

    const animatedStyle = useAnimatedStyle(() => {
        if (reduceMotion) {
            return { opacity: progress.value, transform: [{ translateY: 0 }] }
        }
        return {
            opacity: progress.value,
            transform: [
                {
                    translateY:
                        (1 - progress.value) *
                        (MOTION_PRESETS.slideUp.from.translateY ?? 16),
                },
            ],
        }
    }, [reduceMotion])

    return (
        <Animated.View
            style={animatedStyle}
            accessibilityLiveRegion={toast.announcement ? 'polite' : 'none'}
        >
            {typeof toast.content === 'function'
                ? toast.content(dismiss)
                : toast.content}
        </Animated.View>
    )
}

/** Exit duration is not modelled yet — dismissal unmounts immediately;
 * SnackbarV2 will own richer exit choreography when it lands. Kept simple
 * so the host stays predictable under the synchronous test mock. */
export const TOAST_EXIT_DURATION = MOTION_DURATION.fast

const styles = StyleSheet.create({
    stack: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
    },
})
