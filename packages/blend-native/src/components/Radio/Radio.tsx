import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { SelectorV2Size } from '@juspay/blend-design-system/node'
import type { RadioV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { SelectorContent } from '../shared/selector/SelectorContent'
import type { RadioNativeProps } from './radio.types'

/**
 * Radio — the native port of web's `RadioV2`.
 *
 * Ring + inner dot at half the ring's size, the dot scaling in like web's
 * `::after` transition. The whole row is one pressable (label-tap selects).
 * Pressing an already-selected radio does nothing, matching native radio
 * semantics.
 */
const Radio = forwardRef<RNView, RadioNativeProps>(function Radio(
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
    const tokens = useNativeTokens<RadioV2TokensType>('RADIOV2')
    const reduceMotion = useReduceMotion()

    const indicatorState = checked ? 'active' : 'inactive'
    const interactionState = disabled ? 'disabled' : error ? 'error' : 'default'

    const progress = useSharedValue(checked ? 1 : 0)
    useEffect(() => {
        if (reduceMotion) {
            progress.value = checked ? 1 : 0
            return
        }
        progress.value = withTiming(checked ? 1 : 0, {
            duration: MOTION_DURATION.normal,
            easing: Easing.bezier(...MOTION_EASING.standard),
        })
    }, [progress, checked, reduceMotion])
    const dotStyle = useAnimatedStyle(
        () => ({ transform: [{ scale: progress.value }] }),
        []
    )

    const ringSize =
        parseDimension(tokens.radio.height[size] as string | number) ?? 16
    const borderWidth =
        Number(tokens.radio.borderWidth[indicatorState]?.[interactionState]) ||
        1
    const dotSize = ringSize / 2

    const select = () => {
        // Native radio semantics: selecting an already-selected radio is a
        // no-op; deselection happens by selecting a sibling.
        if (!checked) onCheckedChange?.(true)
    }

    return (
        <Pressable
            ref={ref}
            onPress={select}
            disabled={disabled}
            flexDirection="row"
            alignItems="center"
            gap={tokens.gap as string | number}
            accessibilityRole="radio"
            accessibilityState={{ checked, disabled }}
            accessibilityLabel={accessibilityLabel ?? label}
            testID={testID}
            style={style}
        >
            <View
                testID={testID ? `${testID}-ring` : undefined}
                style={{
                    width: ringSize,
                    height: ringSize,
                    borderRadius: ringSize / 2,
                    borderWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: String(
                        tokens.radio.indicator[indicatorState]?.backgroundColor[
                            interactionState
                        ] ?? 'transparent'
                    ),
                    borderColor: String(
                        tokens.radio.indicator[indicatorState]?.borderColor[
                            interactionState
                        ] ?? 'transparent'
                    ),
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: dotSize,
                            height: dotSize,
                            borderRadius: dotSize / 2,
                            backgroundColor: String(
                                tokens.radio.activeIndicator.active
                                    .backgroundColor[
                                    disabled ? 'disabled' : 'default'
                                ] ?? 'transparent'
                            ),
                        },
                        dotStyle,
                    ]}
                />
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

Radio.displayName = 'Radio'

export default Radio
