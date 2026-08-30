import { memo, useEffect, useState } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '@juspay/blend-design-system/node'
import type { ProgressBarV2TokenType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_EASING } from '../../motion/motion'
import {
    parseBorderRadius,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import type { ProgressBarNativeProps } from './progressBar.types'
import {
    calculateCircularProgressStroke,
    calculatePercentage,
    clampValue,
    getCircularDiameter,
    normalizeRange,
    parseCircularDashToken,
    parseSegmentedPattern,
    parseTransitionDuration,
} from './progressBar.utils'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

/**
 * Determinate progress — the native port of web's `ProgressBarV2`.
 *
 * Linear animates the fill width, circular animates the SVG dash offset,
 * both with the duration decoded from web's transition tokens and the
 * standard easing curve. Reduce-motion jumps without tweening. The
 * segmented empty track renders discrete tick marks in place of web's
 * `repeating-linear-gradient` (documented divergence).
 */
const ProgressBarImpl = ({
    value,
    min = 0,
    max = 100,
    size = ProgressBarV2Size.MD,
    variant = ProgressBarV2Variant.LINEAR,
    appearance = ProgressBarV2Appearance.SOLID,
    showLabel = false,
    accessibilityLabel,
    testID,
    style,
}: ProgressBarNativeProps) => {
    const tokens = useNativeTokens<ProgressBarV2TokenType>('PROGRESS_BARV2')

    const range = normalizeRange(min, max)
    const clamped = clampValue(value, range.min, range.max)
    const percentage = calculatePercentage(clamped, range.min, range.max)
    const label = `${Math.round(percentage)}%`

    const a11y = {
        accessibilityRole: 'progressbar' as const,
        accessibilityLabel: accessibilityLabel ?? `Progress: ${label}`,
        accessibilityValue: { min: range.min, max: range.max, now: clamped },
    }

    const shared = {
        tokens,
        percentage,
        appearance,
        size,
        showLabel,
        label,
        testID,
    }

    if (variant === ProgressBarV2Variant.CIRCULAR) {
        return (
            <View {...a11y} testID={testID} style={style}>
                <CircularBar {...shared} />
            </View>
        )
    }

    return (
        <View
            {...a11y}
            testID={testID}
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: parseDimension(tokens.linear.gap as string) ?? 8,
                },
                style,
            ]}
        >
            <LinearBar {...shared} />
            {showLabel && <BarLabel tokens={tokens} label={label} />}
        </View>
    )
}

type BarProps = {
    tokens: ProgressBarV2TokenType
    percentage: number
    appearance: ProgressBarV2Appearance
    size: ProgressBarV2Size
    showLabel: boolean
    label: string
    testID?: string
}

function useTweenedProgress(percentage: number, duration: number) {
    const reduceMotion = useReduceMotion()
    const progress = useSharedValue(percentage)
    useEffect(() => {
        if (reduceMotion) {
            progress.value = percentage
            return
        }
        progress.value = withTiming(percentage, {
            duration,
            easing: Easing.bezier(...MOTION_EASING.standard),
        })
    }, [progress, percentage, duration, reduceMotion])
    return progress
}

function LinearBar({ tokens, percentage, appearance, size, testID }: BarProps) {
    const [trackWidth, setTrackWidth] = useState(0)

    const height = parseDimension(tokens.linear.height[size] as string) ?? 8
    const segmented = appearance === ProgressBarV2Appearance.SEGMENTED
    const trackRadius =
        parseBorderRadius(tokens.linear.borderRadius[appearance] as string) ?? 0
    // Segmented track has sharp corners (radius 0); the fill token says 2px,
    // but that reveals the transparent track (i.e. the card's white bg)
    // through the rounded corners. Use the track radius for segmented fills.
    const fillRadius = segmented
        ? trackRadius
        : (parseBorderRadius(
              tokens.linear.fill.borderRadius[appearance] as string
          ) ?? 0)
    const duration = parseTransitionDuration(tokens.transition as string)

    const progress = useTweenedProgress(percentage, duration)
    const fillStyle = useAnimatedStyle(
        () => ({ width: `${progress.value}%` }),
        []
    )

    const pattern = segmented
        ? parseSegmentedPattern(
              tokens.linear.empty.backgroundImage[appearance] as
                  | string
                  | undefined,
              tokens.linear.empty.backgroundSize[appearance] as
                  | string
                  | undefined
          )
        : null
    const tickCount =
        pattern && trackWidth > 0 ? Math.ceil(trackWidth / pattern.period) : 0

    const onLayout = segmented
        ? (event: LayoutChangeEvent) =>
              setTrackWidth(event.nativeEvent.layout.width)
        : undefined

    return (
        <View
            onLayout={onLayout}
            testID={testID ? `${testID}-track` : undefined}
            style={{
                flex: 1,
                height,
                overflow: 'hidden',
                backgroundColor: String(
                    tokens.linear.empty.backgroundColor[appearance] ??
                        'transparent'
                ),
                ...(typeof trackRadius === 'number'
                    ? { borderRadius: trackRadius }
                    : trackRadius),
            }}
        >
            {pattern?.markColor && (
                <View
                    pointerEvents="none"
                    style={{
                        ...({
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        } as const),
                        flexDirection: 'row',
                        gap: pattern.period - pattern.markWidth,
                    }}
                >
                    {Array.from({ length: tickCount }, (_, i) => (
                        <View
                            key={i}
                            style={{
                                width: pattern.markWidth,
                                backgroundColor: pattern.markColor as string,
                            }}
                        />
                    ))}
                </View>
            )}
            <Animated.View
                testID={testID ? `${testID}-fill` : undefined}
                style={[
                    {
                        height: '100%',
                        backgroundColor: String(
                            tokens.linear.fill.backgroundColor[appearance]
                        ),
                        ...(typeof fillRadius === 'number'
                            ? { borderRadius: fillRadius }
                            : fillRadius),
                    },
                    fillStyle,
                ]}
            />
        </View>
    )
}

function CircularBar({
    tokens,
    percentage,
    appearance,
    size,
    showLabel,
    label,
    testID,
}: BarProps) {
    const svgSize = getCircularDiameter(
        tokens.circular.size as Record<string, unknown>,
        size,
        parseDimension
    )
    const strokeWidth = tokens.circular.strokeWidth[size]
    const stroke = calculateCircularProgressStroke(
        svgSize,
        strokeWidth,
        percentage
    )
    const dash = parseCircularDashToken(
        tokens.circular.dashArray[appearance] as string | undefined
    )
    const duration = parseTransitionDuration(tokens.circular.motion as string)

    const progress = useTweenedProgress(percentage, duration)
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset:
            stroke.circumference -
            (progress.value / 100) * stroke.circumference,
    }))

    const center = svgSize / 2

    return (
        <View style={{ alignItems: 'center', gap: 4 }}>
            <Svg
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                testID={testID ? `${testID}-svg` : undefined}
            >
                <Circle
                    cx={center}
                    cy={center}
                    r={stroke.radius}
                    stroke={String(tokens.circular.background[appearance])}
                    strokeWidth={strokeWidth}
                    strokeDasharray={dash.length ? dash : undefined}
                    fill="none"
                />
                <AnimatedCircle
                    cx={center}
                    cy={center}
                    r={stroke.radius}
                    stroke={String(tokens.circular.stroke[appearance])}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={[stroke.circumference]}
                    animatedProps={animatedProps}
                    fill="none"
                    // Start at 12 o'clock, web parity.
                    transform={`rotate(-90 ${center} ${center})`}
                />
            </Svg>
            {showLabel && <BarLabel tokens={tokens} label={label} />}
        </View>
    )
}

function BarLabel({
    tokens,
    label,
}: {
    tokens: ProgressBarV2TokenType
    label: string
}) {
    return (
        <Text
            fontSize={tokens.label.fontSize as string | number}
            fontWeight={tokens.label.fontWeight as string | number}
            color={String(tokens.label.color)}
            accessible={false}
            importantForAccessibility="no-hide-descendants"
        >
            {label}
        </Text>
    )
}

export const ProgressBar = memo(ProgressBarImpl)
ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
