import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Check, Minus } from 'lucide-react-native'
import { SelectorV2Size } from '@juspay/blend-design-system/node'
import type { CheckboxV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import {
    parseBorder,
    parseBorderRadius,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import { SelectorContent } from '../shared/selector/SelectorContent'
import type { CheckboxNativeProps } from './checkbox.types'

/**
 * Checkbox — the native port of web's `CheckboxV2`.
 *
 * The whole row (box + label) is one pressable, so tapping the label
 * toggles — web's label-click parity. The indicator (lucide Check/Minus,
 * like web) scales in via the motion layer; reduce-motion renders it
 * statically. `accessibilityState.checked` reports `'mixed'` for the
 * indeterminate state.
 */
const Checkbox = forwardRef<RNView, CheckboxNativeProps>(function Checkbox(
    {
        checked = false,
        onCheckedChange,
        required = false,
        error = false,
        label,
        subLabel,
        size = SelectorV2Size.MD,
        disabled = false,
        slot,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<CheckboxV2TokensType>('CHECKBOXV2')
    const reduceMotion = useReduceMotion()

    const checkedState =
        checked === 'indeterminate'
            ? 'indeterminate'
            : checked
              ? 'checked'
              : 'unchecked'
    const interactionState = disabled ? 'disabled' : error ? 'error' : 'default'
    const showIndicator = checkedState !== 'unchecked'

    // Web's scale-in keyframe (0.7 → 1, fade), on the motion layer.
    const progress = useSharedValue(showIndicator ? 1 : 0)
    useEffect(() => {
        if (reduceMotion) {
            progress.value = showIndicator ? 1 : 0
            return
        }
        progress.value = withTiming(showIndicator ? 1 : 0, {
            duration: MOTION_DURATION.normal,
            easing: Easing.bezier(...MOTION_EASING.standard),
        })
    }, [progress, showIndicator, reduceMotion])
    const indicatorStyle = useAnimatedStyle(
        () => ({
            opacity: progress.value,
            transform: [{ scale: 0.7 + 0.3 * progress.value }],
        }),
        []
    )

    const boxSize =
        parseDimension(tokens.checkbox.width[size] as string | number) ?? 16
    const radius =
        parseBorderRadius(
            tokens.checkbox.borderRadius[size] as string | number
        ) ?? 4
    const iconSize =
        parseDimension(tokens.checkbox.icon.width[size] as string | number) ??
        12
    const iconColorState = disabled ? 'disabled' : 'default'
    const IndicatorIcon = checkedState === 'indeterminate' ? Minus : Check

    const toggle = () => {
        // Web parity (Radix + the Enter handler): indeterminate resolves to
        // checked; otherwise invert.
        onCheckedChange?.(checked === 'indeterminate' ? true : !checked)
    }

    return (
        <Pressable
            ref={ref}
            onPress={toggle}
            disabled={disabled}
            flexDirection="row"
            alignItems="center"
            gap={tokens.gap as string | number}
            opacity={
                disabled ? Number(tokens.checkbox.opacity) || 0.7 : undefined
            }
            accessibilityRole="checkbox"
            accessibilityState={{
                checked: checked === 'indeterminate' ? 'mixed' : checked,
                disabled,
            }}
            accessibilityLabel={accessibilityLabel ?? label}
            testID={testID}
            style={style}
        >
            <View
                testID={testID ? `${testID}-box` : undefined}
                style={{
                    width: boxSize,
                    height: boxSize,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: String(
                        tokens.checkbox.backgroundColor[checkedState]?.[
                            interactionState
                        ] ?? 'transparent'
                    ),
                    ...(typeof radius === 'number'
                        ? { borderRadius: radius }
                        : radius),
                    ...parseBorder(
                        String(
                            tokens.checkbox.border[checkedState]?.[
                                interactionState
                            ] ?? 'none'
                        )
                    ),
                }}
            >
                {showIndicator && (
                    <Animated.View style={indicatorStyle}>
                        <IndicatorIcon
                            size={iconSize}
                            strokeWidth={
                                Number(
                                    tokens.checkbox.icon.strokeWidth[size]
                                ) || 2.5
                            }
                            color={String(
                                tokens.checkbox.icon.color[
                                    checkedState === 'indeterminate'
                                        ? 'indeterminate'
                                        : 'checked'
                                ]?.[iconColorState] ?? '#FFFFFF'
                            )}
                        />
                    </Animated.View>
                )}
            </View>
            <SelectorContent
                label={label}
                subLabel={subLabel}
                required={required}
                size={size}
                state={interactionState}
                tokens={tokens.content}
                testID={testID ? `${testID}-content` : undefined}
            />
            {slot && <Slot hidden={Boolean(label)}>{slot}</Slot>}
        </Pressable>
    )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
