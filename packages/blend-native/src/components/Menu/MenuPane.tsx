import { useEffect, useRef, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'

/**
 * The push-in pane: when `paneKey` changes (a sub-menu opened or closed),
 * the new content slides in horizontally from the side it came from —
 * measured-width `withTiming`, one interaction that works identically in
 * the sheet and anchored presentations. Chosen over nested sheets (which
 * stack awkwardly) and anchored flyouts (which don't fit touch targets).
 */
export function MenuPane({
    paneKey,
    children,
    testID,
}: {
    /** Depth of the pane stack; direction comes from its change. */
    paneKey: number
    children: React.ReactNode
    testID?: string
}) {
    const reduceMotion = useReduceMotion()
    const translateX = useSharedValue(0)
    const [width, setWidth] = useState(0)
    const previousKey = useRef(paneKey)

    useEffect(() => {
        if (previousKey.current === paneKey) return
        const deeper = paneKey > previousKey.current
        previousKey.current = paneKey
        if (reduceMotion || width === 0) return
        // New content starts offset toward where it "came from" and
        // settles at 0.
        translateX.value = deeper ? width : -width
        translateX.value = withTiming(0, {
            duration: MOTION_DURATION.normal,
            easing: Easing.bezier(...MOTION_EASING.decelerate),
        })
    }, [paneKey, width, reduceMotion, translateX])

    const onLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width)
    }

    const paneStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }))

    return (
        <Animated.View
            onLayout={onLayout}
            style={[{ overflow: 'hidden' }, paneStyle]}
            testID={testID ? `${testID}-pane` : undefined}
        >
            {children}
        </Animated.View>
    )
}

export default MenuPane
