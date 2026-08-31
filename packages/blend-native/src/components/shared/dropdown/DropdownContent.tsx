import React, { useCallback } from 'react'
import {
    Pressable as RNPressable,
    StyleSheet,
    type DimensionValue,
    type LayoutChangeEvent,
} from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
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

    React.useEffect(() => {
        progress.value = withTiming(open ? 1 : 0, open ? ENTER : EXIT)
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

    if (!open && progress.value === 0) return null

    const hasPosition = position !== null

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
                        borderColor: tokens.border ? undefined : undefined,
                        borderRadius: tokens.borderRadius,
                        paddingTop: tokens.paddingTop as
                            | DimensionValue
                            | undefined,
                        paddingRight: tokens.paddingRight as
                            | DimensionValue
                            | undefined,
                        paddingBottom: tokens.paddingBottom as
                            | DimensionValue
                            | undefined,
                        paddingLeft: tokens.paddingLeft as
                            | DimensionValue
                            | undefined,
                        minWidth: tokens.minWidth as DimensionValue | undefined,
                        maxWidth: tokens.maxWidth as DimensionValue | undefined,
                        maxHeight: hasPosition
                            ? position!.maxHeight
                            : undefined,
                        // Hidden until position lands so the content does
                        // not flash at {0,0} before measurement completes.
                        opacity: hasPosition ? undefined : 0,
                        position: 'absolute',
                        left: hasPosition ? position!.x : 0,
                        top: hasPosition ? position!.y : 0,
                    },
                    animatedStyle,
                ]}
                accessibilityRole="menu"
                accessibilityLabel={accessibilityLabel}
                testID={testID}
            >
                <Block
                    background={tokens.boxShadow}
                    width="100%"
                    overflow="hidden"
                >
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
