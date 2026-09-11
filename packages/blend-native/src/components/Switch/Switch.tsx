import { forwardRef, useEffect } from 'react'
import type { View as RNView } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { SelectorV2Size } from '@juspay/blend-design-system/node'
import type { SwitchV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { MOTION_DURATION, MOTION_EASING } from '../../motion/motion'
import Pressable from '../../primitives/Pressable'
import Slot from '../../primitives/Slot'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import { SelectorContent } from '../shared/selector/SelectorContent'
import type { SwitchNativeProps } from './switch.types'

/** Web positions the thumb at `top: 1px; left: 1px` — the track inset. */
const THUMB_INSET = 1

/**
 * Switch — the native port of web's `SwitchV2`.
 *
 * Track + absolutely-positioned thumb sliding on the motion layer. The
 * thumb's travel is COMPUTED from the track and thumb width tokens
 * (`trackWidth − thumbWidth − 2×inset`) — web hardcodes `12px`/`16px` in
 * the component, so the computed form stays correct if the tokens change.
 * The whole row is one pressable (label-tap toggles).
 */
const Switch = forwardRef<RNView, SwitchNativeProps>(function Switch(
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
    const tokens = useNativeTokens<SwitchV2TokensType>('SWITCHV2')
    const reduceMotion = useReduceMotion()

    const trackWidth =
        parseDimension(tokens.switch.width[size] as string | number) ?? 32
    const trackHeight =
        parseDimension(tokens.switch.height[size] as string | number) ?? 16
    const thumbWidth =
        parseDimension(tokens.switch.thumb.width[size] as string | number) ?? 14
    const thumbHeight =
        parseDimension(tokens.switch.thumb.height[size] as string | number) ??
        14
    const travel = Math.max(0, trackWidth - thumbWidth - 2 * THUMB_INSET)

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
    const thumbStyle = useAnimatedStyle(
        () => ({ transform: [{ translateX: progress.value * travel }] }),
        [travel]
    )

    const trackState = checked ? 'checked' : 'unchecked'
    const interactionState = disabled ? 'disabled' : 'default'
    const contentState = disabled ? 'disabled' : error ? 'error' : 'default'

    return (
        <Pressable
            ref={ref}
            onPress={() => onCheckedChange?.(!checked)}
            disabled={disabled}
            flexDirection="row"
            alignItems="center"
            gap={tokens.gap as string | number}
            accessibilityRole="switch"
            accessibilityState={{ checked, disabled }}
            accessibilityLabel={accessibilityLabel ?? label}
            testID={testID}
            style={style}
        >
            <Animated.View
                testID={testID ? `${testID}-track` : undefined}
                style={{
                    width: trackWidth,
                    height: trackHeight,
                    borderRadius: trackHeight / 2,
                    justifyContent: 'center',
                    backgroundColor: String(
                        tokens.switch.backgroundColor[trackState]?.[
                            interactionState
                        ] ?? 'transparent'
                    ),
                }}
            >
                <Animated.View
                    testID={testID ? `${testID}-thumb` : undefined}
                    style={[
                        {
                            position: 'absolute',
                            left: THUMB_INSET,
                            width: thumbWidth,
                            height: thumbHeight,
                            borderRadius: thumbHeight / 2,
                            backgroundColor: String(
                                tokens.switch.thumb.backgroundColor ?? '#FFFFFF'
                            ),
                            ...parseBorder(
                                String(tokens.switch.thumb.border ?? 'none')
                            ),
                        },
                        thumbStyle,
                    ]}
                />
            </Animated.View>
            <SelectorContent
                label={label}
                subLabel={subLabel}
                required={required}
                size={size}
                state={contentState}
                tokens={tokens.content}
                testID={testID ? `${testID}-content` : undefined}
            />
            {slot && <Slot hidden={Boolean(label)}>{slot}</Slot>}
        </Pressable>
    )
})

Switch.displayName = 'Switch'

export default Switch
