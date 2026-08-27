import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, Pressable, StyleSheet, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import { Portal } from '../portal'
import { useAnchoredPosition } from '../useAnchoredPosition'
import type { Alignment, Placement } from '../positioning'
import {
    MOTION_EASING,
    MOTION_PRESETS,
    reducedMotionVariant,
    type MotionEasing,
} from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'

// Indexing MOTION_EASING with a dynamic key yields a union of tuples,
// which cannot be spread into Easing.bezier directly.
function bezierFor(name: MotionEasing) {
    const [x1, y1, x2, y2] = MOTION_EASING[name]
    return Easing.bezier(x1, y1, x2, y2)
}

/**
 * AnchoredOverlay — the internal building block behind every anchored
 * surface: Tooltip at all sizes, and the tablet (`lg`) mode of Popover,
 * Menu and the Selects. Not public: components own their prop contracts,
 * this owns the shared anatomy.
 *
 * Anatomy: the trigger renders inline inside a `collapsable={false}` view
 * that carries the anchor ref; while open, a portal layer hosts a
 * touch-capturing backdrop (which is what makes anchor re-measure
 * unnecessary — nothing can scroll under an open overlay) and the content,
 * positioned by `useAnchoredPosition`, animated with the `scaleFade`
 * preset via measured `withTiming` shared values, kept mounted through the
 * exit animation like `BottomSheet`. Android back and VoiceOver's escape
 * gesture both request close.
 */

export type AnchoredOverlayProps = {
    open: boolean
    /** Every dismiss route calls this; the owner flips `open`. */
    onRequestClose: () => void
    /** The anchor. Rendered inline where the component sits. */
    trigger: React.ReactNode
    placement?: Placement
    alignment?: Alignment
    /** Gap between anchor and content, in points. */
    offset?: number
    viewportPadding?: number
    /** Edge length of the arrow square; omit for no arrow. */
    arrowSize?: number
    arrowColor?: string
    /**
     * `'transparent'` captures outside taps without dimming (tooltip,
     * menu); a color string dims and captures; `false` renders no backdrop
     * (outside taps fall through to the app).
     */
    backdrop?: 'transparent' | string | false
    /** Styles the positioned content container (surface chrome). */
    contentStyle?: StyleProp<ViewStyle>
    /** Hide the app and lower layers from assistive tech while open. */
    modal?: boolean
    children?: React.ReactNode
    accessibilityLabel?: string
    testID?: string
}

export function AnchoredOverlay({
    open,
    onRequestClose,
    trigger,
    placement = 'bottom',
    alignment = 'start',
    offset = 8,
    viewportPadding = 8,
    arrowSize,
    arrowColor = '#000000',
    backdrop = 'transparent',
    contentStyle,
    modal = false,
    children,
    accessibilityLabel,
    testID,
}: AnchoredOverlayProps) {
    // Mounted outlives `open` by one exit animation (the BottomSheet
    // pattern), so the fade-out is visible.
    const [mounted, setMounted] = useState(open)
    const progress = useSharedValue(0)
    const reduceMotion = useReduceMotion()
    const preset = reduceMotion
        ? reducedMotionVariant(MOTION_PRESETS.scaleFade)
        : MOTION_PRESETS.scaleFade

    const { anchorRef, onContentLayout, position, arrow } = useAnchoredPosition(
        {
            open,
            placement,
            alignment,
            offset,
            viewportPadding,
            arrowSize,
        }
    )

    const unmount = useCallback(() => setMounted(false), [])

    useEffect(() => {
        if (open) {
            setMounted(true)
            progress.value = withTiming(1, {
                duration: preset.duration,
                easing: bezierFor(preset.easing),
            })
        } else {
            progress.value = withTiming(
                0,
                {
                    duration: preset.exitDuration,
                    easing: bezierFor(preset.exitEasing),
                },
                (finished) => {
                    if (finished) runOnJS(unmount)()
                }
            )
        }
    }, [open, progress, preset, unmount])

    // Android hardware back closes the overlay instead of the screen.
    useEffect(() => {
        if (!open) return
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                onRequestClose()
                return true
            }
        )
        return () => subscription.remove()
    }, [open, onRequestClose])

    const fromOpacity = preset.from.opacity ?? 1
    const toOpacity = preset.to.opacity ?? 1
    const fromScale = preset.from.scale ?? 1
    const toScale = preset.to.scale ?? 1
    const motionStyle = useAnimatedStyle(() => ({
        opacity: fromOpacity + (toOpacity - fromOpacity) * progress.value,
        transform: [
            {
                scale: fromScale + (toScale - fromScale) * progress.value,
            },
        ],
    }))

    const dimsBackdrop =
        typeof backdrop === 'string' && backdrop !== 'transparent'
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: dimsBackdrop ? progress.value : 1,
    }))

    return (
        <>
            <View collapsable={false} ref={anchorRef}>
                {trigger}
            </View>
            {mounted ? (
                <Portal modal={modal}>
                    {backdrop !== false ? (
                        <Animated.View
                            style={[StyleSheet.absoluteFill, backdropStyle]}
                            accessible={false}
                            importantForAccessibility="no-hide-descendants"
                            testID={testID ? `${testID}-backdrop` : undefined}
                        >
                            <Pressable
                                style={[
                                    StyleSheet.absoluteFill,
                                    dimsBackdrop && {
                                        backgroundColor: backdrop,
                                    },
                                ]}
                                onPress={onRequestClose}
                            />
                        </Animated.View>
                    ) : null}
                    <View
                        // Positioner: parks the content invisibly until the
                        // first measurement lands (unmounting instead would
                        // keep onLayout from ever firing).
                        style={[
                            styles.positioner,
                            position
                                ? {
                                      left: position.x,
                                      top: position.y,
                                      maxWidth: position.maxWidth,
                                      maxHeight: position.maxHeight,
                                      opacity: 1,
                                  }
                                : styles.unmeasured,
                        ]}
                        pointerEvents={position ? 'box-none' : 'none'}
                        onLayout={onContentLayout}
                        onAccessibilityEscape={onRequestClose}
                        accessibilityLabel={accessibilityLabel}
                        testID={testID}
                    >
                        <Animated.View style={[contentStyle, motionStyle]}>
                            {children}
                            {arrowSize && arrow ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: arrow.x - arrowSize / 2,
                                        top: arrow.y - arrowSize / 2,
                                        width: arrowSize,
                                        height: arrowSize,
                                        backgroundColor: arrowColor,
                                        transform: [{ rotate: '45deg' }],
                                    }}
                                    testID={
                                        testID ? `${testID}-arrow` : undefined
                                    }
                                />
                            ) : null}
                        </Animated.View>
                    </View>
                </Portal>
            ) : null}
        </>
    )
}

AnchoredOverlay.displayName = 'AnchoredOverlay'

const styles = StyleSheet.create({
    positioner: { position: 'absolute' },
    unmeasured: { left: 0, top: 0, opacity: 0 },
})

export default AnchoredOverlay
