import { memo, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import type { SpinnerTokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import type { SpinnerNativeProps } from './spinner.types'
import {
    SPINNER_CENTER,
    SPINNER_VIEWBOX,
    getSpinDuration,
    getSpinnerGeometry,
} from './spinner.utils'

/**
 * Loading spinner — the native port of web's `Spinner`.
 *
 * Same arc: a track circle at 30% opacity under a quarter-circumference
 * arc, drawn in web's 48-unit viewBox and scaled to the size token. Web
 * spins the arc with SVG SMIL; native rotates it with a Reanimated linear
 * loop at the token duration. Reduce-motion renders the static arc, web
 * parity.
 */
const SpinnerImpl = ({
    size = 'md',
    color = 'default',
    label = 'Loading',
    overlay = false,
    testID,
    style,
}: SpinnerNativeProps) => {
    const tokens = useNativeTokens<SpinnerTokensType>('SPINNER')
    const reduceMotion = useReduceMotion()
    const rotation = useSharedValue(0)

    const geometry = getSpinnerGeometry(size, tokens)
    const duration = getSpinDuration(tokens)

    useEffect(() => {
        if (reduceMotion) {
            cancelAnimation(rotation)
            rotation.value = 0
            return
        }
        rotation.value = 0
        rotation.value = withRepeat(
            withTiming(360, { duration, easing: Easing.linear }),
            -1
        )
        return () => cancelAnimation(rotation)
    }, [rotation, reduceMotion, duration])

    const spinStyle = useAnimatedStyle(
        () => ({ transform: [{ rotate: `${rotation.value}deg` }] }),
        []
    )

    const indicator = (
        <View
            accessibilityRole="progressbar"
            accessibilityLabel={label}
            testID={testID}
            style={overlay ? undefined : style}
        >
            <Animated.View style={spinStyle}>
                <Svg
                    width={geometry.size}
                    height={geometry.size}
                    viewBox={`0 0 ${SPINNER_VIEWBOX} ${SPINNER_VIEWBOX}`}
                >
                    <Circle
                        cx={SPINNER_CENTER}
                        cy={SPINNER_CENTER}
                        r={geometry.radius}
                        stroke={String(tokens.trackColor)}
                        strokeWidth={geometry.strokeWidth}
                        strokeOpacity={0.3}
                        fill="none"
                    />
                    <Circle
                        cx={SPINNER_CENTER}
                        cy={SPINNER_CENTER}
                        r={geometry.radius}
                        stroke={String(tokens.colors[color])}
                        strokeWidth={geometry.strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={geometry.dashArray}
                        fill="none"
                        // Start the arc at 12 o'clock, web parity.
                        transform={`rotate(-90 ${SPINNER_CENTER} ${SPINNER_CENTER})`}
                    />
                </Svg>
            </Animated.View>
        </View>
    )

    if (!overlay) return indicator

    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                styles.overlay,
                { backgroundColor: String(tokens.overlay.backgroundColor) },
                style,
            ]}
            testID={testID ? `${testID}-overlay` : undefined}
        >
            {indicator}
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export const Spinner = memo(SpinnerImpl)
Spinner.displayName = 'Spinner'

export default Spinner
