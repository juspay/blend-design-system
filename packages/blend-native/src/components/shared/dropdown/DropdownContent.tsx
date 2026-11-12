import React, { useCallback, useRef, useState } from 'react'
import {
    Pressable as RNPressable,
    StyleSheet,
    View,
    type LayoutChangeEvent,
    type StyleProp,
    type ViewStyle,
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
 * before measurement completes. The hiding sits on a plain positioner view
 * around the animated surface (as in `AnchoredOverlay`): on the surface
 * itself the animated opacity, which comes later in the style array, won
 * over it and the half-faded panel showed at the layer's corner. The
 * entrance starts only once the position lands, for the same reason.
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
    /** Extra style for the panel surface. */
    style?: StyleProp<ViewStyle>
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
    style,
}: DropdownContentProps) {
    const reduceMotion = useReduceMotion()
    const progress = useSharedValue(0)
    const [mounted, setMounted] = useState(open)

    // On open, only the fresh position counts: the last one would show the
    // panel at its previous anchor for a frame. The last one carries the
    // exit animation, since the positioning hook drops it on close.
    const lastPosition = useRef<AnchoredPosition | null>(null)
    if (position) lastPosition.current = position
    const effectivePosition = open ? position : lastPosition.current
    const hasPosition = effectivePosition !== null

    React.useEffect(() => {
        if (open) {
            setMounted(true)
            if (hasPosition) progress.value = withTiming(1, ENTER)
        } else {
            progress.value = withTiming(0, EXIT, (finished) => {
                if (finished) runOnJS(setMounted)(false)
            })
        }
    }, [open, hasPosition, progress])

    // The position is in window coordinates, but the portal layer is an
    // absolute-fill of the provider, which need not sit at the window origin
    // (inside a host page, under headers). Subtract the layer's own offset,
    // as `AnchoredOverlay` does.
    const layerRef = useRef<View>(null)
    const [layerOffset, setLayerOffset] = useState({ x: 0, y: 0 })
    const measureLayer = useCallback(() => {
        layerRef.current?.measureInWindow((x, y) => {
            setLayerOffset((current) =>
                current.x === x && current.y === y ? current : { x, y }
            )
        })
    }, [])

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

    if (!mounted) return null

    return (
        <Portal>
            {/* Backdrop — transparent press-catcher that closes on tap */}
            <RNPressable
                style={StyleSheet.absoluteFill}
                onPress={handleBackdropPress}
                accessibilityLabel="Close dropdown"
                accessibilityRole="button"
            />
            <View
                ref={layerRef}
                collapsable={false}
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                onLayout={measureLayer}
            />
            <View
                style={[
                    styles.positioner,
                    hasPosition
                        ? {
                              left: effectivePosition!.x - layerOffset.x,
                              top: effectivePosition!.y - layerOffset.y,
                              opacity: 1,
                          }
                        : styles.unmeasured,
                ]}
                onLayout={onContentLayout}
                testID={testID ? `${testID}-positioner` : undefined}
            >
                <Animated.View
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
                        },
                        style,
                        animatedStyle,
                    ]}
                    accessibilityRole="menu"
                    accessibilityLabel={accessibilityLabel}
                    testID={testID}
                >
                    {/* Shrinks to the container's maxHeight, so a long list
                    scrolls instead of pushing what follows it out of view. */}
                    <Block width="100%" overflow="hidden" flexShrink={1}>
                        {children}
                    </Block>
                </Animated.View>
            </View>
        </Portal>
    )
}

DropdownContent.displayName = 'DropdownContent'

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    positioner: { position: 'absolute' },
    unmeasured: { left: 0, top: 0, opacity: 0 },
})
