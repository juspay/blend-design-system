import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    StyleSheet,
    View,
    type LayoutChangeEvent,
    type ViewStyle,
} from 'react-native'
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated'
import type {
    SkeletonShape,
    SkeletonTokensType,
    SkeletonVariant,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { LinearGradient } from '../../adapters/optionalGradient'
import { parseSize } from '../../adapters/cssStringAdapter'
import {
    resolveSkeletonDuration,
    resolveSkeletonRadius,
} from './skeleton.utils'
import type { SkeletonNativeProps } from './skeleton.types'

/**
 * Skeleton — React Native implementation of web's `Skeleton`, resolving the
 * same themed `SKELETON` token slot (base/highlight colours, duration).
 *
 * Two usages, matching web:
 *
 * - **Block**: `<Skeleton width={120} height={16} />` — a placeholder box.
 * - **Wrap**: `<Skeleton>{content}</Skeleton>` — the content keeps its
 *   layout but renders invisible, with the skeleton surface painted over
 *   it. This is what restores the `skeleton` prop parity on Button and Tag.
 *
 * Variants: `pulse` animates opacity between highlight and base; `wave` and
 * `shimmer` sweep a highlight gradient across the box (requiring the
 * optional `expo-linear-gradient` — absent, they degrade to pulse; web's
 * `::after` sweep has no other RN expression). OS reduce-motion renders a
 * static base-coloured box.
 *
 * Hidden from assistive tech: a skeleton is a visual placeholder, and the
 * owning component announces its loading state (the Button/Alert pattern).
 */
const SkeletonImpl = ({
    variant = 'pulse',
    shape = 'rectangle',
    width,
    height,
    borderRadius,
    children,
    style,
    testID,
}: SkeletonNativeProps) => {
    const tokens = useNativeTokens<SkeletonTokensType>('SKELETON')
    const reduceMotion = useReduceMotion()

    const duration = resolveSkeletonDuration(tokens)
    const baseColor = String(tokens.colors.base)
    const highlightColor = String(tokens.colors.highlight)

    const radius =
        borderRadius ?? resolveSkeletonRadius(shape, tokens, width, height)

    // Sweep needs the measured box; pulse does not.
    const [measuredWidth, setMeasuredWidth] = useState(0)
    const onLayout = useCallback((event: LayoutChangeEvent) => {
        setMeasuredWidth(event.nativeEvent.layout.width)
    }, [])

    const canSweep =
        (variant === 'wave' || variant === 'shimmer') &&
        LinearGradient !== null &&
        !reduceMotion
    const pulses = !reduceMotion && !canSweep

    const progress = useSharedValue(0)
    useEffect(() => {
        if (reduceMotion) {
            cancelAnimation(progress)
            progress.value = 0
            return
        }
        progress.value = 0
        progress.value = withRepeat(
            withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
            -1,
            // Pulse breathes in and out; the sweep restarts from the left.
            !canSweep
        )
        return () => cancelAnimation(progress)
    }, [progress, duration, reduceMotion, canSweep])

    const pulseStyle = useAnimatedStyle(
        () => ({
            opacity: pulses ? 1 - progress.value * 0.5 : 1,
        }),
        [pulses]
    )

    const sweepStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateX: canSweep
                        ? -measuredWidth + progress.value * 2 * measuredWidth
                        : 0,
                },
            ],
        }),
        [canSweep, measuredWidth]
    )

    const boxStyle = useMemo<ViewStyle>(
        () => ({
            backgroundColor: baseColor,
            borderRadius: radius,
            overflow: 'hidden',
            ...(children
                ? null
                : {
                      width: parseSize(width) ?? undefined,
                      height: parseSize(height) ?? undefined,
                  }),
        }),
        [baseColor, radius, children, width, height]
    )

    const surface = (
        <Animated.View
            pointerEvents="none"
            onLayout={canSweep ? onLayout : undefined}
            style={[children ? styles.fill : null, boxStyle, pulseStyle]}
            testID={testID ? `${testID}-surface` : undefined}
        >
            {canSweep && measuredWidth > 0 && LinearGradient ? (
                <Animated.View style={[StyleSheet.absoluteFill, sweepStyle]}>
                    <LinearGradient
                        colors={[baseColor, highlightColor, baseColor]}
                        locations={[0.2, 0.5, 0.8]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.fill}
                    />
                </Animated.View>
            ) : null}
        </Animated.View>
    )

    if (!children) {
        return (
            <View
                testID={testID}
                style={style}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden
            >
                {surface}
            </View>
        )
    }

    return (
        <View
            testID={testID}
            style={style}
            pointerEvents="none"
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
        >
            {/* The content sizes the box but stays invisible. */}
            <View style={styles.hiddenContent}>{children}</View>
            {surface}
        </View>
    )
}

export const Skeleton = React.memo(SkeletonImpl)
Skeleton.displayName = 'Skeleton'

const styles = StyleSheet.create({
    hiddenContent: { opacity: 0 },
    fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
})

export default Skeleton

export type { SkeletonShape, SkeletonVariant }
