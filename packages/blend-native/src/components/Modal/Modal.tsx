import { useCallback, useEffect, useState } from 'react'
import {
    BackHandler,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import type { ModalV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { Portal } from '../../overlay/portal'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { BottomSheetScrollable } from '../../overlay/sheet/SheetScrollable'
import {
    MOTION_EASING,
    MOTION_PRESETS,
    reducedMotionVariant,
    type MotionEasing,
} from '../../motion/motion'
import { useReduceMotion } from '../../motion/useReduceMotion'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { ModalHeader } from './ModalHeader'
import { ModalFooter } from './ModalFooter'
import type { ModalNativeProps } from './modal.types'

/**
 * Modal — the native port of web's `ModalV2`.
 *
 * Phones (`sm`) present a bottom sheet — exactly what web does under
 * 1024px with vaul, styled from the same MODALV2 tokens — and tablets
 * (`lg`) a centered dialog card with a dimmed backdrop, `scaleFade`
 * entrance, hardware-back/VoiceOver-escape dismissal and the exit
 * keep-mounted pattern.
 */

// Indexing MOTION_EASING with a dynamic key yields a union of tuples,
// which cannot be spread into Easing.bezier directly.
function bezierFor(name: MotionEasing) {
    const [x1, y1, x2, y2] = MOTION_EASING[name]
    return Easing.bezier(x1, y1, x2, y2)
}

export function Modal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    primaryAction,
    secondaryAction,
    showCloseButton = true,
    showHeader = true,
    showFooter = true,
    closeOnBackdropClick = true,
    showDivider = true,
    customHeader,
    customFooter,
    headerSlot,
    dimensions,
    maxHeightFraction,
    testID,
    style,
}: ModalNativeProps) {
    const tokens = useNativeTokens<ModalV2TokensType>('MODALV2')
    const breakpoint = useNativeBreakpoint()
    const reduceMotion = useReduceMotion()
    const preset = reduceMotion
        ? reducedMotionVariant(MOTION_PRESETS.scaleFade)
        : MOTION_PRESETS.scaleFade

    // Keep-mounted through the exit animation (the BottomSheet pattern).
    const [mounted, setMounted] = useState(isOpen)
    const progress = useSharedValue(0)
    const unmount = useCallback(() => setMounted(false), [])

    useEffect(() => {
        if (isOpen) {
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
    }, [isOpen, progress, preset, unmount])

    // Android hardware back closes the dialog instead of the screen.
    useEffect(() => {
        if (!isOpen || breakpoint === 'sm') return
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                onClose()
                return true
            }
        )
        return () => subscription.remove()
    }, [isOpen, breakpoint, onClose])

    const fromOpacity = preset.from.opacity ?? 1
    const toOpacity = preset.to.opacity ?? 1
    const fromScale = preset.from.scale ?? 1
    const toScale = preset.to.scale ?? 1
    const cardStyle = useAnimatedStyle(() => ({
        opacity: fromOpacity + (toOpacity - fromOpacity) * progress.value,
        transform: [
            { scale: fromScale + (toScale - fromScale) * progress.value },
        ],
    }))
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
    }))

    const header = customHeader ?? (
        <ModalHeader
            title={title}
            subtitle={subtitle}
            headerSlot={headerSlot}
            showCloseButton={showCloseButton}
            showDivider={showDivider}
            onClose={onClose}
            tokens={tokens}
            testID={testID ? `${testID}-header` : undefined}
        />
    )
    const footer = customFooter ?? (
        <ModalFooter
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            showDivider={showDivider}
            tokens={tokens}
            testID={testID ? `${testID}-footer` : undefined}
        />
    )

    const bodyPadding = {
        paddingTop: parseDimension(tokens.body.paddingTop as string | number),
        paddingBottom: parseDimension(
            tokens.body.paddingBottom as string | number
        ),
        paddingLeft: parseDimension(tokens.body.paddingLeft as string | number),
        paddingRight: parseDimension(
            tokens.body.paddingRight as string | number
        ),
    }

    if (breakpoint === 'sm') {
        return (
            <BottomSheet
                open={isOpen}
                onClose={onClose}
                backgroundColor={String(tokens.backgroundColor ?? '#FFFFFF')}
                backdropColor={String(
                    tokens.overlay.backgroundColor ?? 'rgba(0, 0, 0, 0.5)'
                )}
                topRadius={
                    parseDimension(tokens.borderRadius as string | number) ?? 16
                }
                dismissOnBackdropPress={closeOnBackdropClick}
                maxHeightFraction={maxHeightFraction}
                accessibilityLabel={title}
                testID={testID}
                style={style}
            >
                {showHeader ? header : null}
                <BottomSheetScrollable>
                    <ScrollView
                        contentContainerStyle={[
                            bodyPadding,
                            {
                                backgroundColor: String(
                                    tokens.body.backgroundColor ?? 'transparent'
                                ),
                            },
                        ]}
                    >
                        {children}
                    </ScrollView>
                </BottomSheetScrollable>
                {showFooter ? footer : null}
            </BottomSheet>
        )
    }

    if (!mounted) return null

    const overlayOffset =
        parseDimension(tokens.overlay.offset as string | number) ?? 16

    return (
        <Portal modal>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: String(
                            tokens.overlay.backgroundColor ??
                                'rgba(0, 0, 0, 0.5)'
                        ),
                    },
                    backdropStyle,
                ]}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                testID={testID ? `${testID}-backdrop` : undefined}
            >
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={closeOnBackdropClick ? onClose : undefined}
                />
            </Animated.View>
            <View
                style={[styles.center, { padding: overlayOffset }]}
                pointerEvents="box-none"
            >
                <Animated.View
                    accessibilityViewIsModal
                    onAccessibilityEscape={onClose}
                    accessibilityLabel={title}
                    testID={testID}
                    style={[
                        {
                            backgroundColor: String(
                                tokens.backgroundColor ?? '#FFFFFF'
                            ),
                            borderRadius:
                                parseDimension(
                                    tokens.borderRadius as string | number
                                ) ?? 16,
                            overflow: 'hidden',
                            minWidth: 320,
                            maxWidth: '90%',
                            maxHeight: '90%',
                            ...dimensions,
                        },
                        cardStyle,
                        style,
                    ]}
                >
                    {showHeader ? header : null}
                    <ScrollView
                        contentContainerStyle={[
                            bodyPadding,
                            {
                                backgroundColor: String(
                                    tokens.body.backgroundColor ?? 'transparent'
                                ),
                            },
                        ]}
                    >
                        {children}
                    </ScrollView>
                    {showFooter ? footer : null}
                </Animated.View>
            </View>
        </Portal>
    )
}

Modal.displayName = 'Modal'

const styles = StyleSheet.create({
    center: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Modal
