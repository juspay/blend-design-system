import React, { useCallback, useRef, useState } from 'react'
import {
    Pressable as RNPressable,
    StyleSheet,
    type LayoutChangeEvent,
} from 'react-native'
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import {
    parseBorder,
    parseBoxShadow,
    parseDimension,
} from '../../../adapters/cssStringAdapter'
import { Portal } from '../../../overlay/portal'
import { Block } from '../../../primitives/Block'
import { MOTION_DURATION, MOTION_EASING } from '../../../motion/motion'
import { useReduceMotion } from '../../../motion/useReduceMotion'
import type { AnchoredPosition } from '../../../overlay/positioning'
import type { DropdownContentTokens } from './dropdown.types'

/**
 * The floating panel — a `Portal`-rendered `Animated.View` with a
 * scale-fade entrance, positioned against the anchor via
 * `useAnchoredPosition`.
 *
 * Stays transparent (opacity 0) until `position` lands — the content must
 * remain mounted so `onLayout` fires, but should not flash at `{0, 0}`
 * before measurement completes.
 */
export type DropdownContentProps = {
    open: boolean
    onClose: () => void
    position: AnchoredPosition | null
    onContentLayout: (event: LayoutChangeEvent) => void
    tokens: DropdownContentTokens
    children?: React.ReactNode
    testID?: string
    accessibilityLabel?: string
}

const ENTER = {
    duration: MOTION_DURATION.normal,
    easing: Easing.bezier(...MOTION_EASING.decelerate),
}
const EXIT = {
    duration: MOTION_DURATION.fast,
    easing: Easing.bezier(...MOTION_EASING.accelerate),
}

export function DropdownContent({
    open,
    onClose,
    position,
    onContentLayout,
    tokens,
    children,
    testID,
    accessibilityLabel,
}: DropdownContentProps) {
    const reduceMotion = useReduceMotion()
    const progress = useSharedValue(0)
    const [mounted, setMounted] = useState(open)

    React.useEffect(() => {
        if (open) {
            setMounted(true)
            progress.value = withTiming(1, ENTER)
        } else {
            progress.value = withTiming(0, EXIT, (finished) => {
                if (finished) runOnJS(setMounted)(false)
            })
        }
    }, [open, progress])

    const animatedStyle = useAnimatedStyle(() => {
        if (reduceMotion) {
            return { opacity: progress.value }
        }
        return {
            opacity: progress.value,
            transform: [{ scale: 0.95 + 0.05 * progress.value }],
        }
    }, [reduceMotion])

    const handleBackdropPress = useCallback(() => {
        onClose()
    }, [onClose])

    const lastPosition = useRef<AnchoredPosition | null>(null)
    if (position) lastPosition.current = position
    const effectivePosition = position ?? lastPosition.current

    if (!mounted) return null

    const hasPosition = effectivePosition !== null

    return (
        <Portal>
            {/* Backdrop — transparent press-catcher that closes on tap */}
            <RNPressable
                style={StyleSheet.absoluteFill}
                onPress={handleBackdropPress}
                accessibilityLabel="Close dropdown"
                accessibilityRole="button"
            />
            <Animated.View
                onLayout={onContentLayout}
                style={[
                    styles.container,
                    {
                        backgroundColor: tokens.backgroundColor,
                        borderRadius: parseDimension(tokens.borderRadius),
                        ...(parseBorder(tokens.border) ?? {}),
                        ...(parseBoxShadow(tokens.boxShadow) ?? {}),
                        paddingTop: parseDimension(tokens.paddingTop),
                        paddingRight: parseDimension(tokens.paddingRight),
                        paddingBottom: parseDimension(tokens.paddingBottom),
                        paddingLeft: parseDimension(tokens.paddingLeft),
                        minWidth: parseDimension(tokens.minWidth),
                        maxWidth: parseDimension(tokens.maxWidth),
                        maxHeight: hasPosition
                            ? effectivePosition!.maxHeight
                            : undefined,
                        // Hidden until position lands so the content does
                        // not flash at {0,0} before measurement completes.
                        opacity: hasPosition ? undefined : 0,
                        position: 'absolute',
                        left: hasPosition ? effectivePosition!.x : 0,
                        top: hasPosition ? effectivePosition!.y : 0,
                    },
                    animatedStyle,
                ]}
                accessibilityRole="menu"
                accessibilityLabel={accessibilityLabel}
                testID={testID}
            >
                <Block width="100%" overflow="hidden">
                    {children}
                </Block>
            </Animated.View>
        </Portal>
    )
}

DropdownContent.displayName = 'DropdownContent'

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
})
