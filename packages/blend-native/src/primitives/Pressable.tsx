import React, {
    forwardRef,
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react'
import {
    Pressable as RNPressable,
    View,
    ActivityIndicator,
    type GestureResponderEvent,
    type LayoutChangeEvent,
    type PressableProps,
    type View as RNView,
    type ViewStyle,
} from 'react-native'
import {
    parseBackground,
    parseBorder,
    parseBoxShadow,
} from '../adapters/cssStringAdapter'
import {
    resolveSurfaceStyle,
    type SurfaceStyleProps,
} from '../adapters/surfaceStyle'
import {
    MIN_TOUCH_TARGET,
    resolveHitSlop,
    sameHitSlop,
    type HitSlop,
} from './touchTarget'
import { useLiveRegionAnnounce } from '../a11y/useLiveRegion'

export { MIN_TOUCH_TARGET }

/**
 * Native `Pressable` — the interactive surface for buttons, tags, and any
 * other pressable token-driven component.
 *
 * Web's `PrimitiveButton` is a styled-components `button` with `_active`,
 * `_hover`, `_focusVisible` and `_disabled` pseudo-state objects. RN has no
 * CSS pseudo-selectors; instead `Pressable` exposes a `style` callback
 * receiving `{ pressed }`. This primitive takes the same token-derived CSS
 * strings, translates them through the shared adapter, and composes them per
 * state.
 *
 * `_hover` is ignored — RN has no hover. `_focusVisible` is ignored — there
 * is no focus ring on touch.
 */

/**
 * `expo-linear-gradient` is an **optional** peer.
 *
 * Requiring it outright would mean every consumer must adopt Expo modules
 * just to render a gradient variant. When it is absent the surface falls back
 * to the gradient's first colour, which `resolveSurfaceStyle` already
 * supplies as `backgroundColor` — so a gradient button degrades to a solid
 * one rather than rendering transparent.
 */
type GradientComponent = React.ComponentType<{
    colors: readonly string[]
    locations?: readonly number[]
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    style?: ViewStyle
}>

let LinearGradient: GradientComponent | null = null
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    LinearGradient = require('expo-linear-gradient')
        .LinearGradient as GradientComponent
} catch {
    LinearGradient = null
}

/**
 * Note this extends `SurfaceStyleProps`, exactly as `BlockProps` does.
 *
 * That shared base is load-bearing, not cosmetic. Components that switch
 * between `Block` and `Pressable` depending on interactivity (Tag, and web's
 * `TagElement = onClick ? PrimitiveButton : Block` pattern) build one surface
 * object and hand it to whichever they render. If the two accepted different
 * prop sets, the extras would fall silently into `...rest` in one branch and
 * vanish — and TypeScript would not catch it, because spreading an object
 * into JSX skips excess-property checking. Keeping one base makes that class
 * of bug unrepresentable.
 */
export type PrimitivePressableProps = SurfaceStyleProps & {
    children?: React.ReactNode
    /** Active-state background (CSS string). */
    activeBackground?: string
    /** Disabled-state background (CSS string). */
    disabledBackground?: string
    activeBorder?: string
    disabledBorder?: string
    activeBoxShadow?: string

    disabled?: boolean
    /**
     * Render a spinner in place of `children` while keeping the surface
     * chrome (background, border, padding) intact — the same substitution
     * web performs in `renderButtonContent`.
     */
    loading?: boolean
    loaderColor?: string
    loaderSize?: number | 'small' | 'large'
    /** Announced to screen readers when `loading` becomes true. */
    loadingAccessibilityLabel?: string
    /** Pressed scale transform (web uses `scale(0.99)`). */
    pressedScale?: number
    /**
     * Minimum tappable size in points. When the rendered surface is smaller,
     * `hitSlop` expands the touch area without changing the visual box.
     *
     * Apple HIG asks for 44x44pt and Material for 48x48dp; small controls
     * (an `xs` Tag is 20pt tall) fall well under both by design, so the tap
     * target has to be widened rather than the control. Pass `0` to opt out.
     */
    minTouchTarget?: number

    onPress?: (event: GestureResponderEvent) => void
    style?: ViewStyle
} & Omit<PressableProps, 'style' | 'onPress' | 'disabled' | 'children'>

const PressableImpl = forwardRef<RNView, PrimitivePressableProps>(
    function Pressable(
        {
            children,
            background,
            backgroundColor,
            activeBackground,
            disabledBackground,
            border,
            activeBorder,
            disabledBorder,
            borderRadius,
            boxShadow,
            activeBoxShadow,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            flexDirection,
            alignItems,
            justifyContent,
            alignSelf,
            gap,
            width,
            minWidth,
            maxWidth,
            height,
            minHeight,
            maxHeight,
            flexShrink,
            flexGrow,
            opacity,
            overflow,
            disabled = false,
            loading = false,
            loaderColor,
            loaderSize = 'small',
            loadingAccessibilityLabel = 'Loading, please wait',
            pressedScale = 0.99,
            minTouchTarget = MIN_TOUCH_TARGET,
            onPress,
            style,
            accessibilityRole = 'button',
            accessible = true,
            ...rest
        },
        ref
    ) {
        // Parsing is memoised on the inputs themselves. The previous
        // implementation stored these in refs and reassigned `.current`
        // during render — a render-phase side effect that breaks under
        // StrictMode/concurrent rendering, and which also kept a stale parse
        // whenever a prop transitioned from a value back to `undefined`.
        const parsedBg = useMemo(
            () => parseBackground(background),
            [background]
        )
        const parsedActiveBg = useMemo(
            () => parseBackground(activeBackground),
            [activeBackground]
        )
        const parsedDisabledBg = useMemo(
            () => parseBackground(disabledBackground),
            [disabledBackground]
        )

        const activeBorderStyle = useMemo(
            () => parseBorder(activeBorder),
            [activeBorder]
        )
        const disabledBorderStyle = useMemo(
            () => parseBorder(disabledBorder),
            [disabledBorder]
        )
        const activeShadowStyle = useMemo(
            () => parseBoxShadow(activeBoxShadow) ?? {},
            [activeBoxShadow]
        )

        // Loading and disabled are deliberately *separate* concerns, matching
        // web: `ButtonV2` passes `disabled={isDisabled}` to `PrimitiveButton`
        // and computes `isDisabled` from the `disabled` prop alone, while
        // `renderButtonContent` swaps in a spinner when loading. So a loading
        // button keeps its normal chrome — including its gradient — and only
        // its content changes.
        //
        // Collapsing the two (the earlier `isInert = disabled || loading`)
        // made every loading button render in the disabled colour.

        /** Blocks presses. Both states are non-interactive. */
        const isInteractionBlocked = disabled || loading
        /** Applies disabled chrome. Only the real disabled state does. */
        const usesDisabledChrome = disabled

        const surface = useMemo(
            () =>
                resolveSurfaceStyle({
                    background,
                    backgroundColor,
                    border,
                    borderRadius,
                    boxShadow,
                    paddingTop,
                    paddingRight,
                    paddingBottom,
                    paddingLeft,
                    flexDirection,
                    alignItems,
                    justifyContent,
                    alignSelf,
                    gap,
                    width,
                    minWidth,
                    maxWidth,
                    height,
                    minHeight,
                    maxHeight,
                    flexShrink,
                    flexGrow,
                    opacity,
                    overflow,
                }),
            [
                background,
                backgroundColor,
                border,
                borderRadius,
                boxShadow,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                flexDirection,
                alignItems,
                justifyContent,
                alignSelf,
                gap,
                width,
                minWidth,
                maxWidth,
                height,
                minHeight,
                maxHeight,
                flexShrink,
                flexGrow,
                opacity,
                overflow,
            ]
        )

        const isGradient = parsedBg?.type === 'gradient'
        const canRenderGradient = isGradient && LinearGradient !== null

        const activeFlatBgColor =
            parsedActiveBg?.type === 'flat' ? parsedActiveBg.color : undefined
        const disabledBgColor =
            parsedDisabledBg?.type === 'flat'
                ? parsedDisabledBg.color
                : parsedDisabledBg?.type === 'gradient'
                  ? parsedDisabledBg.colors[0]
                  : undefined

        // RN's equivalent of web's `aria-live="polite"` announcement. On
        // Android `accessibilityState.busy` already conveys this, so the hook
        // only speaks on iOS — see `a11y/useLiveRegion`.
        useLiveRegionAnnounce(loadingAccessibilityLabel, loading)

        const handlePress = useCallback(
            (event: GestureResponderEvent) => {
                if (disabled || loading) return
                onPress?.(event)
            },
            [disabled, loading, onPress]
        )

        const accessibilityState = useMemo(
            () => ({ disabled: isInteractionBlocked, busy: loading }),
            [isInteractionBlocked, loading]
        )

        /** The press-down scale, matching web's `transform: scale(0.99)`. */
        const pressedTransform = useMemo<ViewStyle>(
            () => ({ transform: [{ scale: pressedScale }] }),
            [pressedScale]
        )

        // Memoised so the `style` callback below composes stable references.
        // RN re-invokes that callback on every press transition; rebuilding
        // these objects each time would allocate on every touch.
        const disabledStyle = useMemo<ViewStyle | undefined>(
            () =>
                usesDisabledChrome
                    ? {
                          ...(disabledBgColor
                              ? { backgroundColor: disabledBgColor }
                              : {}),
                          ...disabledBorderStyle,
                      }
                    : undefined,
            [usesDisabledChrome, disabledBgColor, disabledBorderStyle]
        )

        const pressedStyle = useMemo<ViewStyle>(
            () => ({
                ...(activeFlatBgColor
                    ? { backgroundColor: activeFlatBgColor }
                    : {}),
                ...activeBorderStyle,
                ...activeShadowStyle,
                ...pressedTransform,
            }),
            [
                activeFlatBgColor,
                activeBorderStyle,
                activeShadowStyle,
                pressedTransform,
            ]
        )

        // Widen the tap target once laid out, if the control is smaller than
        // the minimum. `hitSlop` extends only the touch region, so layout and
        // appearance are untouched.
        //
        // The resolved slop is stored rather than the raw dimensions, and it
        // starts as `undefined` — the same value a compliant control resolves
        // to. A control already at or above the minimum therefore never
        // changes state and never re-renders; only ones that actually need
        // slop pay for a second pass. Storing `{ width, height }` instead made
        // every Pressable on the screen re-render on mount.
        const [hitSlop, setHitSlop] = useState<HitSlop | undefined>(undefined)

        const handleLayout = useCallback(
            (event: LayoutChangeEvent) => {
                const { width, height } = event.nativeEvent.layout
                const next = resolveHitSlop(width, height, minTouchTarget)
                setHitSlop((previous) =>
                    sameHitSlop(previous, next) ? previous : next
                )
            },
            [minTouchTarget]
        )

        const content = loading ? (
            <ActivityIndicator size={loaderSize} color={loaderColor} />
        ) : (
            children
        )

        // ---- Gradient path ----------------------------------------------
        //
        //   <Pressable border + radius + overflow:hidden>
        //     <LinearGradient absoluteFill (bled into the border zone) />
        //     <View padding + layout> {content} </View>
        //   </Pressable>
        //
        // The gradient absolute-fills the whole border box — including under
        // the border — so no antialiasing wedge forms at the corners, and the
        // Pressable's own radius + overflow:hidden clips the bleed.
        if (
            canRenderGradient &&
            !usesDisabledChrome &&
            parsedBg?.type === 'gradient'
        ) {
            const gradient = parsedBg
            const Gradient = LinearGradient as GradientComponent
            const borderWidth = (surface.borderWidth as number | undefined) ?? 1
            const bleed = -borderWidth

            // Negative inset bleeds the gradient into the border zone so no
            // antialiasing gap forms between border and gradient edge; the
            // frame's radius + overflow:hidden clips the overhang.
            const bleedStyle: ViewStyle = {
                position: 'absolute',
                top: bleed,
                right: bleed,
                bottom: bleed,
                left: bleed,
            }

            // The gradient fills the border box, so padding and inner layout
            // move to a child view; the Pressable keeps only the frame
            // (border, radius, sizing) plus the clip.
            const {
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                flexDirection: frameFlexDirection,
                alignItems: frameAlignItems,
                justifyContent: frameJustifyContent,
                gap: frameGap,
                ...frame
            } = surface

            const contentLayout: ViewStyle = {
                flex: 1,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                flexDirection: frameFlexDirection,
                alignItems: frameAlignItems,
                justifyContent: frameJustifyContent,
                gap: frameGap,
            }

            const frameStyle: ViewStyle = {
                ...frame,
                flexDirection: frameFlexDirection,
                overflow: 'hidden',
            }

            return (
                <RNPressable
                    ref={ref}
                    onPress={handlePress}
                    disabled={isInteractionBlocked}
                    accessibilityRole={accessibilityRole}
                    accessible={accessible}
                    accessibilityState={accessibilityState}
                    onLayout={minTouchTarget ? handleLayout : undefined}
                    hitSlop={hitSlop}
                    style={({ pressed }) => [
                        frameStyle,
                        pressed ? pressedTransform : undefined,
                        pressed ? activeBorderStyle : undefined,
                        pressed ? activeShadowStyle : undefined,
                        style,
                    ]}
                    {...rest}
                >
                    {({ pressed }) => (
                        <>
                            <Gradient
                                colors={gradient.colors}
                                locations={gradient.locations}
                                start={gradient.start}
                                end={gradient.end}
                                style={bleedStyle}
                            />
                            {pressed && parsedActiveBg?.type === 'gradient' && (
                                <Gradient
                                    colors={parsedActiveBg.colors}
                                    locations={parsedActiveBg.locations}
                                    start={parsedActiveBg.start}
                                    end={parsedActiveBg.end}
                                    style={bleedStyle}
                                />
                            )}
                            {pressed && activeFlatBgColor && (
                                <View
                                    style={[
                                        bleedStyle,
                                        { backgroundColor: activeFlatBgColor },
                                    ]}
                                />
                            )}
                            <View style={contentLayout}>{content}</View>
                        </>
                    )}
                </RNPressable>
            )
        }

        // ---- Flat path ---------------------------------------------------
        // Also the fallback when a gradient is requested but
        // `expo-linear-gradient` is not installed: `resolveSurfaceStyle` has
        // already set `backgroundColor` to the gradient's first stop.
        return (
            <RNPressable
                ref={ref}
                onPress={handlePress}
                disabled={isInteractionBlocked}
                accessibilityRole={accessibilityRole}
                accessible={accessible}
                accessibilityState={accessibilityState}
                onLayout={minTouchTarget ? handleLayout : undefined}
                hitSlop={hitSlop}
                style={({ pressed }) => [
                    surface,
                    disabledStyle,
                    !isInteractionBlocked && pressed ? pressedStyle : undefined,
                    style,
                ]}
                {...rest}
            >
                {content}
            </RNPressable>
        )
    }
)

/** Memoised — see the note on `Block`. */
export const Pressable = memo(PressableImpl)
Pressable.displayName = 'Pressable'

export default Pressable
