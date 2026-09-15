import {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

/** Ignore jitter below this, or the header flickers on a slow drag. */
const DEAD_ZONE = 6

/** Near the top the header always comes back, whatever the direction. */
const REVEAL_ABOVE = 24

const DURATION = 180

/**
 * Collapses a header as the user scrolls down and brings it back on the way
 * up, so a phone screen spends its height on the component rather than on
 * chrome.
 *
 * The animation runs on the UI thread — the handler is a worklet — so it
 * keeps up with the scroll instead of trailing it by a frame.
 */
export function useHideOnScroll(height: number) {
    const hidden = useSharedValue(0)
    const lastOffset = useSharedValue(0)
    /**
     * Where the animation is heading, which is not the same as where it
     * currently is. Without it, every scroll frame would restart `withTiming`
     * towards a target it is already moving to, and the easing would stutter.
     */
    const target = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            const offset = event.contentOffset.y
            const delta = offset - lastOffset.value
            lastOffset.value = offset

            let next = target.value
            if (offset <= REVEAL_ABOVE) next = 0
            else if (delta > DEAD_ZONE) next = 1
            else if (delta < -DEAD_ZONE) next = 0

            if (next !== target.value) {
                target.value = next
                hidden.value = withTiming(next, { duration: DURATION })
            }
        },
    })

    /** Bring the header back — after switching component, say. */
    const reveal = () => {
        target.value = 0
        lastOffset.value = 0
        hidden.value = withTiming(0, { duration: DURATION })
    }

    const style = useAnimatedStyle(() => ({
        height: interpolate(
            hidden.value,
            [0, 1],
            [height, 0],
            Extrapolation.CLAMP
        ),
        opacity: interpolate(hidden.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }))

    return { onScroll, style, reveal }
}
