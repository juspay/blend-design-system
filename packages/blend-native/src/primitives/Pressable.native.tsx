import React, { useRef, useCallback } from 'react'
import {
    Pressable as RNPressable,
    StyleSheet,
    View,
    ActivityIndicator,
    type PressableProps,
    type ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
    parseBackground,
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseDimension,
    type ParsedBackground,
} from '../adapters/cssStringAdapter'

/**
 * Native `Pressable` — the interactive surface for buttons.
 *
 * Web `PrimitiveButton` is a styled-components `button` with `_active`,
 * `_hover`, `_focusVisible`, `_disabled` pseudo-state style objects. RN has no
 * CSS pseudo-selectors; instead `Pressable` exposes a `style` callback that
 * receives `{ pressed }`.
 *
 * This primitive accepts the same token-derived style inputs as the web
 * version (background, border, borderRadius, shadow, padding) as CSS strings,
 * translates them via the adapter, and merges them into a `ViewStyle` array.
 *
 * If the background token is a gradient (from `parseBackground`), this renders
 * a `<LinearGradient>` wrapper instead of a plain `Pressable` background, so
 * the pressed-state background still works by overlaying an active color.
 *
 * `_hover` is ignored on native — RN has no hover.
 */

export type PressableStateStyle = {
    /** Base (default) styles. */
    base?: ViewStyle
    /** Styles applied while pressed (replaces web `_active`). */
    pressed?: ViewStyle
    /** Styles applied when disabled (replaces web `_disabled`). */
    disabled?: ViewStyle
}

export type PrimitivePressableProps = {
    children?: React.ReactNode
    /** CSS-string background token (gradient / color / none). */
    background?: string
    /** Active-state background (CSS string). */
    activeBackground?: string
    /** Disabled-state background (CSS string). */
    disabledBackground?: string
    /** CSS-string border like `"1px solid #E1E4EA"`. */
    border?: string
    /** Active-state border. */
    activeBorder?: string
    /** Disabled-state border. */
    disabledBorder?: string
    /** CSS-string border radius like `"10px"` or `"10px 0 0 10px"`. */
    borderRadius?: string | number
    /** CSS-string box-shadow. */
    boxShadow?: string
    /** Active-state box-shadow. */
    activeBoxShadow?: string
    paddingTop?: string | number
    paddingRight?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number
    /** Layout — RN is always flex by default. */
    flexDirection?: ViewStyle['flexDirection']
    alignItems?: ViewStyle['alignItems']
    justifyContent?: ViewStyle['justifyContent']
    gap?: string | number
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    height?: string | number
    flexShrink?: number
    disabled?: boolean
    loading?: boolean
    /** Spinner color when `loading` is true. */
    loaderColor?: string
    /** Pressed scale transform (web uses `scale(0.99)`). */
    pressedScale?: number
    onPress?: () => void
    testID?: string
    accessibilityLabel?: string
    accessibilityRole?: PressableProps['accessibilityRole']
    accessible?: boolean
} & Omit<PressableProps, 'style' | 'onPress'> & {
        style?: ViewStyle
    }

function resolveWidthLike(
    v: string | number | undefined
): number | `${number}%` | 'auto' | undefined {
    if (v === undefined || v === null) return undefined
    if (typeof v === 'number') return v
    const trimmed = String(v).trim()
    if (trimmed === 'fit-content' || trimmed === 'auto') return 'auto'
    // Percentage widths
    const pctMatch = trimmed.match(/^(-?\d+(?:\.\d+)?|-?\.\d+)%$/)
    if (pctMatch) return `${parseFloat(pctMatch[1])}%`
    const n = parseFloat(trimmed)
    return Number.isNaN(n) ? undefined : n
}

export function Pressable({
    children,
    background,
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
    gap,
    width,
    minWidth,
    maxWidth,
    height,
    flexShrink,
    disabled = false,
    loading = false,
    loaderColor,
    pressedScale = 0.99,
    onPress,
    testID,
    accessibilityLabel,
    accessibilityRole = 'button',
    accessible = true,
    style,
    ...rest
}: PrimitivePressableProps) {
    // Pre-compute parsed token fragments (these don't change between presses).
    const parsedBg = useRef<ParsedBackground>(parseBackground(background))
    if (background !== undefined) {
        // keep ref fresh if prop changes
        parsedBg.current = parseBackground(background)
    }
    const parsedActiveBg = useRef(parseBackground(activeBackground))
    if (activeBackground !== undefined) {
        parsedActiveBg.current = parseBackground(activeBackground)
    }

    const baseBorder = useRef(border)
    baseBorder.current = border
    const baseRadius = useRef(borderRadius)
    baseRadius.current = borderRadius
    const baseShadow = useRef(boxShadow)
    baseShadow.current = boxShadow

    const pad = {
        paddingTop: parseDimension(paddingTop),
        paddingRight: parseDimension(paddingRight),
        paddingBottom: parseDimension(paddingBottom),
        paddingLeft: parseDimension(paddingLeft),
    }

    const isGradient = parsedBg.current?.type === 'gradient'
    const isDisabled = disabled || loading

    // Build the base ViewStyle (non-state-dependent).
    const baseStyleObj: ViewStyle = {
        ...pad,
        flexDirection,
        alignItems,
        justifyContent,
        gap: parseDimension(gap),
        width: resolveWidthLike(width),
        minWidth: resolveWidthLike(minWidth),
        maxWidth: resolveWidthLike(maxWidth),
        height: resolveWidthLike(height),
        flexShrink,
        overflow: 'hidden',
    }

    // Border radius — applied to the outer container regardless of gradient.
    const radiusStyle = useRef<ViewStyle>({})
    const r = parseBorderRadius(baseRadius.current)
    if (typeof r === 'number') {
        radiusStyle.current = { borderRadius: r }
    } else if (r && typeof r === 'object') {
        radiusStyle.current = r
    } else {
        radiusStyle.current = {}
    }

    // Base border (default state).
    const baseBorderObj = parseBorder(baseBorder.current)

    // Bleed gradient into border zone to eliminate antialiasing gap.
    const borderBleed = -(baseBorderObj.borderWidth ?? 1)

    // Base shadow (default state).
    const baseShadowObj = parseBoxShadow(baseShadow.current) ?? {}

    // Active border/shadow.
    const activeBorderObj = parseBorder(activeBorder)
    const activeShadowObj = parseBoxShadow(activeBoxShadow) ?? {}

    // Disabled background.
    const disabledBgParsed = parseBackground(disabledBackground)
    const disabledBgColor =
        disabledBgParsed?.type === 'flat' ? disabledBgParsed.color : undefined

    // Flat-color backgrounds are applied directly to Pressable style.
    // Gradient backgrounds require a LinearGradient wrapper.
    const flatBgColor =
        parsedBg.current?.type === 'flat' ? parsedBg.current.color : undefined
    const activeFlatBgColor =
        parsedActiveBg.current?.type === 'flat'
            ? parsedActiveBg.current.color
            : undefined

    // ---- Style builders for Pressable's `style` callback ----
    const buildBaseStyle = (): ViewStyle => ({
        ...baseStyleObj,
        ...radiusStyle.current,
        ...baseBorderObj,
        ...baseShadowObj,
        ...(isDisabled
            ? { backgroundColor: disabledBgColor }
            : { backgroundColor: flatBgColor }),
        opacity: isDisabled ? 1 : 1,
    })

    const buildPressedStyle = (): ViewStyle => ({
        // Active background overrides flat color (gradients handled separately).
        ...(activeFlatBgColor ? { backgroundColor: activeFlatBgColor } : {}),
        ...activeBorderObj,
        ...activeShadowObj,
        transform: [{ scale: pressedScale }],
    })

    const buildDisabledStyle = (): ViewStyle => ({
        backgroundColor: disabledBgColor,
        ...parseBorder(disabledBorder),
        // Disabled state keeps base shadow or drops it — tokens decide.
    })

    const handlePress = useCallback(() => {
        if (isDisabled || loading) return
        onPress?.()
    }, [isDisabled, loading, onPress])

    // ---- Loading state ----
    if (loading) {
        const loadingStyle: ViewStyle = {
            ...baseStyleObj,
            ...radiusStyle.current,
            ...baseBorderObj,
            backgroundColor: flatBgColor ?? disabledBgColor,
            opacity: 0.8,
        }
        return (
            <View
                style={[loadingStyle, style]}
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole={accessibilityRole}
                accessible={accessible}
            >
                <ActivityIndicator color={loaderColor ?? '#2563EB'} />
            </View>
        )
    }

    // ---- Gradient background path ----
    //
    // Structure: outer View carries border + borderRadius + overflow:hidden,
    // Pressable inside handles touch and absolute-fill gradient, content View
    // inside handles visual padding.
    //
    //   <View style={[border, radius, overflow:'hidden']}>
    //     <Pressable style={[{flex:1}]}>
    //       <LinearGradient absoluteFill />          ← fills border box
    //       <View style={[padding, layout]}> {children} </View>
    //     </Pressable>
    //   </View>
    //
    // The outer View's border-radius + overflow:hidden clips the gradient to
    // the border curve.  The gradient absolute-fill covers the full area
    // including under the border, so there's no white wedge at corners.
    if (isGradient && !isDisabled && parsedBg.current?.type === 'gradient') {
        const g = parsedBg.current
        const activeG = parsedActiveBg.current
        const activeIsGradient = activeG?.type === 'gradient'

        // Content padding — applied to the inner layout View, NOT the
        // Pressable, so the gradient's absoluteFill covers the full border box.
        const contentPadding = {
            paddingTop: pad.paddingTop,
            paddingRight: pad.paddingRight,
            paddingBottom: pad.paddingBottom,
            paddingLeft: pad.paddingLeft,
        }

        return (
            <RNPressable
                onPress={handlePress}
                disabled={isDisabled}
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole={accessibilityRole}
                accessible={accessible}
                style={({ pressed }: { pressed: boolean }) => [
                    // Border + radius + shadow + clipping all on the Pressable
                    // itself — the Pressable scales with transform; everything
                    // scales together, so no edges peek out behind the parent.
                    {
                        ...radiusStyle.current,
                        ...baseBorderObj,
                        ...baseShadowObj,
                        borderRadius: typeof r === 'number' ? r : undefined,
                        ...(r && typeof r === 'object' ? r : {}),
                        overflow: 'hidden',
                        width: resolveWidthLike(width),
                        minWidth: resolveWidthLike(minWidth),
                        maxWidth: resolveWidthLike(maxWidth),
                        height: resolveWidthLike(height),
                        flexShrink,
                        flexDirection,
                    },
                    pressed && { transform: [{ scale: pressedScale }] },
                    pressed ? activeBorderObj : undefined,
                    pressed ? activeShadowObj : undefined,
                    style,
                ]}
                {...rest}
            >
                {({ pressed }: { pressed: boolean }) => (
                    <>
                        {/* Gradient — negative inset bleeds into the border
                            zone so no antialiasing gap forms between the
                            border and gradient edge. The Pressable's
                            overflow:hidden + borderRadius clips the bleed. */}
                        <LinearGradient
                            colors={
                                g.colors as unknown as [
                                    string,
                                    string,
                                    ...string[],
                                ]
                            }
                            locations={
                                g.locations as unknown as [
                                    number,
                                    number,
                                    ...number[],
                                ]
                            }
                            start={g.start}
                            end={g.end}
                            style={{
                                ...StyleSheet.absoluteFill,
                                top: borderBleed,
                                right: borderBleed,
                                bottom: borderBleed,
                                left: borderBleed,
                            }}
                        />
                        {/* Active overlay — flat color when pressed */}
                        {pressed && !activeIsGradient && activeFlatBgColor && (
                            <View
                                style={{
                                    ...StyleSheet.absoluteFill,
                                    top: borderBleed,
                                    right: borderBleed,
                                    bottom: borderBleed,
                                    left: borderBleed,
                                    backgroundColor: activeFlatBgColor,
                                }}
                            />
                        )}
                        {/* Active gradient overlay when pressed */}
                        {pressed &&
                            activeIsGradient &&
                            activeG?.type === 'gradient' && (
                                <LinearGradient
                                    colors={
                                        activeG.colors as unknown as [
                                            string,
                                            string,
                                            ...string[],
                                        ]
                                    }
                                    locations={
                                        activeG.locations as unknown as [
                                            number,
                                            number,
                                            ...number[],
                                        ]
                                    }
                                    start={activeG.start}
                                    end={activeG.end}
                                    style={{
                                        ...StyleSheet.absoluteFill,
                                        top: borderBleed,
                                        right: borderBleed,
                                        bottom: borderBleed,
                                        left: borderBleed,
                                    }}
                                />
                            )}
                        {/* Content wrapper — padding + layout lives here,
                            NOT on the Pressable, so the gradient fills
                            the border box edge-to-edge. */}
                        <View
                            style={[
                                contentPadding,
                                {
                                    flex: 1,
                                    alignItems,
                                    justifyContent,
                                    gap: parseDimension(gap),
                                    flexDirection,
                                },
                            ]}
                        >
                            {children}
                        </View>
                    </>
                )}
            </RNPressable>
        )
    }

    // ---- Flat / disabled path ----
    return (
        <RNPressable
            onPress={handlePress}
            disabled={isDisabled}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={accessibilityRole}
            accessible={accessible}
            style={({ pressed }: { pressed: boolean }) => [
                buildBaseStyle(),
                isDisabled ? buildDisabledStyle() : null,
                !isDisabled && pressed ? buildPressedStyle() : null,
                style,
            ]}
            {...rest}
        >
            {children}
        </RNPressable>
    )
}

export default Pressable
