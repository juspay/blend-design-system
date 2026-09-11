import {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
    Easing,
    runOnJS,
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
 * bottom-stacked above everything through a priority `Portal` — priority
 * keeps toasts painting above overlays that mount later (a sheet opened
 * after a toast must not cover it). Each toast slides up on entry, slides
 * away on exit (fades under reduce-motion), owns its auto-dismiss timer —
 * paused while a finger is on it — and announces itself to assistive tech
 * when asked.
 */

/** Toasts paint above ordinary overlay layers (sheets, menus, modals). */
export const TOAST_PORTAL_PRIORITY = 1

export const TOAST_EXIT_DURATION = MOTION_DURATION.fast

function sameEntries(
    a: readonly ToastEntry[],
    b: readonly ToastEntry[]
): boolean {
    return a.length === b.length && a.every((entry, i) => entry === b[i])
}

export function ToastOutlet() {
    const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts)
    const insets = useContext(SafeAreaInsetsContext)

    const visible = getVisibleToasts(toasts)

    // Entries that just left the store are kept mounted, flagged `exiting`,
    // until their exit animation reports done — the keep-mounted pattern
    // from BottomSheet. Departures are detected with the official
    // setState-during-render derived-state form (store entries are stable
    // object references, so identity comparison is exact and a same-id
    // content replacement never triggers an exit).
    const [prevVisible, setPrevVisible] = useState<readonly ToastEntry[]>([])
    const [exitingList, setExitingList] = useState<readonly ToastEntry[]>([])
    if (!sameEntries(prevVisible, visible)) {
        const visibleIds = new Set(visible.map((entry) => entry.id))
        const departed = prevVisible.filter(
            (entry) => !visibleIds.has(entry.id)
        )
        setPrevVisible(visible)
        setExitingList((current) => [
            ...current.filter((entry) => !visibleIds.has(entry.id)),
            ...departed.filter(
                (entry) => !current.some((c) => c.id === entry.id)
            ),
        ])
    }

    const handleExited = useCallback((id: string) => {
        setExitingList((current) => current.filter((entry) => entry.id !== id))
    }, [])

    if (visible.length === 0 && exitingList.length === 0) return null

    return (
        <Portal priority={TOAST_PORTAL_PRIORITY}>
            <View
                style={[
                    styles.stack,
                    { paddingBottom: (insets?.bottom ?? 0) + 16 },
                ]}
                pointerEvents="box-none"
                testID="blend-toast-outlet"
            >
                {visible.map((entry) => (
                    <ToastItem
                        key={entry.id}
                        toast={entry}
                        exiting={false}
                        onExited={handleExited}
                    />
                ))}
                {exitingList.map((entry) => (
                    <ToastItem
                        key={entry.id}
                        toast={entry}
                        exiting
                        onExited={handleExited}
                    />
                ))}
            </View>
        </Portal>
    )
}

ToastOutlet.displayName = 'ToastOutlet'

function ToastItem({
    toast,
    exiting,
    onExited,
}: {
    toast: ToastEntry
    exiting: boolean
    onExited: (id: string) => void
}) {
    const reduceMotion = useReduceMotion()
    const progress = useSharedValue(0)

    const dismiss = useCallback(() => dismissToast(toast.id), [toast.id])

    // Enter once per toast id; exit when the store drops the entry, then
    // report done so the outlet releases the retained item.
    const notifyExited = useCallback(
        () => onExited(toast.id),
        [onExited, toast.id]
    )
    useEffect(() => {
        if (exiting) {
            progress.value = withTiming(
                0,
                {
                    duration: TOAST_EXIT_DURATION,
                    easing: Easing.bezier(...MOTION_EASING.accelerate),
                },
                (finished) => {
                    if (finished) runOnJS(notifyExited)()
                }
            )
            return
        }
        progress.value = withTiming(1, {
            duration: MOTION_PRESETS.slideUp.duration,
            easing: Easing.bezier(...MOTION_EASING.decelerate),
        })
    }, [progress, exiting, notifyExited])

    // Auto-dismiss owns its timer, with remaining-time bookkeeping so a
    // finger on the toast pauses the countdown (the sonner behaviour).
    // Content replacement (same id) restarts the full duration.
    const remainingRef = useRef<number | null>(null)
    const startedAtRef = useRef(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const stopTimer = useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }, [])

    const startTimer = useCallback(() => {
        stopTimer()
        if (remainingRef.current === null || exiting) return
        startedAtRef.current = Date.now()
        timerRef.current = setTimeout(dismiss, remainingRef.current)
    }, [dismiss, exiting, stopTimer])

    const pauseTimer = useCallback(() => {
        if (timerRef.current === null || remainingRef.current === null) return
        stopTimer()
        remainingRef.current = Math.max(
            0,
            remainingRef.current - (Date.now() - startedAtRef.current)
        )
    }, [stopTimer])

    useEffect(() => {
        remainingRef.current = toast.duration
        startTimer()
        return stopTimer
        // The full duration restarts when the toast's identity or content
        // changes; startTimer/stopTimer identities are stable per item.
    }, [toast.id, toast.duration, toast.content, startTimer, stopTimer])

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
            onTouchStart={pauseTimer}
            onTouchEnd={startTimer}
            onTouchCancel={startTimer}
        >
            {typeof toast.content === 'function'
                ? toast.content(dismiss)
                : toast.content}
        </Animated.View>
    )
}

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
