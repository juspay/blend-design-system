import { forwardRef } from 'react'
import {
    ActivityIndicator,
    Platform,
    Pressable,
    Text,
    View,
    type DimensionValue,
    type ViewStyle,
    type View as ViewType,
} from 'react-native'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
    type ButtonV2Props,
} from '../../../blend/lib/components/ButtonV2/buttonV2.types'
import { FOUNDATION_THEME } from '../../../blend/lib/tokens'
import { getButtonV2Tokens } from '../../../blend/lib/components/ButtonV2/buttonV2.tokens'

// ─────────────────────────────────────────────────────────────────────────────
// CSS → RN translation helpers
// These live here (not in a shared util) because they are native-only concerns.
// The token FILES themselves are untouched.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parses a CSS background value into something RN can consume.
 *
 * Your tokens use two shapes:
 *   • flat color  → "#FFFFFF" | "rgba(...)"
 *   • gradient    → "linear-gradient(180deg, #1D4ED8 -5%, #3B82F6 107.5%)"
 *   • none/transparent → skip
 *
 * RN's View.backgroundColor only accepts flat colors.
 * Gradients need <LinearGradient colors={[start, end]}>.
 * We extract just the two color stops; percentage offsets are dropped
 * (LinearGradient doesn't support arbitrary stop positions — POC tradeoff).
 */
function parseBackground(value: unknown): {
    isGradient: boolean
    colors: [string, string]
    flat: string
} {
    const css = typeof value === 'string' ? value : ''
    if (!css || css === 'none' || css === 'transparent') {
        return {
            isGradient: false,
            colors: ['transparent', 'transparent'],
            flat: 'transparent',
        }
    }
    const gradientMatch = css.match(/linear-gradient\(([^)]+)\)/)
    if (!gradientMatch) {
        return { isGradient: false, colors: [css, css], flat: css }
    }
    const stops = gradientMatch[1].match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g)
    if (!stops || stops.length < 2) {
        return { isGradient: false, colors: [css, css], flat: css }
    }
    return {
        isGradient: true,
        colors: [stops[0], stops[stops.length - 1]],
        flat: stops[0],
    }
}

/**
 * Parses a CSS border string "1.5px solid #1D4ED8" into RN equivalents.
 * Returns null for "none" borders.
 */
function parseBorder(value: unknown): {
    borderWidth: number
    borderColor: string
} | null {
    const css = typeof value === 'string' ? value : ''
    if (!css || css === 'none' || css === 'transparent') return null
    const match = css.match(/([\d.]+)px\s+\w+\s+(.+)/)
    if (!match) return null
    return {
        borderWidth: parseFloat(match[1]),
        borderColor: match[2].trim(),
    }
}

/**
 * All your shadow tokens use "inset" (e.g. "0px 4px 4px 0px rgba(0,0,0,0.15) inset").
 * RN has no inset shadow primitive — outer shadows only.
 * Inset shadows are intentionally dropped for the POC.
 * Non-inset shadows (if any) are translated to RN's shadow* props.
 */
function parseShadow(value: unknown): Partial<ViewStyle> | null {
    const css = typeof value === 'string' ? value : ''
    if (!css || css === 'none' || css.includes('inset')) return null
    const match = css.match(
        /(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+[\d.]+px\s+rgba?\(([^)]+)\)/
    )
    if (!match) return null
    const parts = match[4].split(',').map((p: string) => parseFloat(p.trim()))
    const [r, g, b, a = 1] = parts
    return {
        shadowColor: `rgb(${r},${g},${b})`,
        shadowOffset: {
            width: parseFloat(match[1]),
            height: parseFloat(match[2]),
        },
        shadowOpacity: a,
        shadowRadius: parseFloat(match[3]),
        elevation: Math.ceil(parseFloat(match[3]) / 2),
    }
}

/**
 * Your token values arrive as CSS strings like "16px", "0", or numbers.
 * RN style props want bare numbers (dp units).
 */
function toNum(value: unknown): number {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
        const n = parseFloat(value)
        return Number.isNaN(n) ? 0 : n
    }
    return 0
}

// ─────────────────────────────────────────────────────────────────────────────
// ButtonV2.native.tsx
// Same prop API as ButtonV2.tsx — buttonType, size, subType, text,
// leftSlot, rightSlot, loading, disabled, onClick, fullWidth, width, state.
// skeleton and buttonGroupPosition are not implemented (POC scope).
// ─────────────────────────────────────────────────────────────────────────────

const ButtonV2Native = forwardRef<ViewType, ButtonV2Props>((props, ref) => {
    const {
        buttonType = ButtonV2Type.PRIMARY,
        size = ButtonV2Size.SMALL,
        subType = ButtonV2SubType.DEFAULT,
        text,
        leftSlot,
        rightSlot,
        disabled = false,
        onClick,
        loading = false,
        width,
        state = ButtonV2State.DEFAULT,
        // skeleton and buttonGroupPosition excluded from POC
    } = props

    // Same hook your web ButtonV2 already calls — no changes to the hook
    // or the token files it returns.

    const allTokens = getButtonV2Tokens(FOUNDATION_THEME)
    const tokens = allTokens.sm

    const isInline = subType === ButtonV2SubType.INLINE
    const isDisabled = disabled || loading
    const tokenState: ButtonV2State = isDisabled
        ? ButtonV2State.DISABLED
        : state === ButtonV2State.HOVER || state === ButtonV2State.ACTIVE
          ? ButtonV2State.DEFAULT // hover/active are derived on native, not props
          : state

    // ── background ──────────────────────────────────────────────────────────
    const bg = parseBackground(
        tokens.backgroundColor[buttonType][subType][tokenState]
    )
    const bgPressed = parseBackground(
        tokens.backgroundColor[buttonType][subType][ButtonV2State.ACTIVE]
    )

    // ── border ───────────────────────────────────────────────────────────────
    const borderDefault = parseBorder(
        tokens.border[buttonType][subType][ButtonV2State.DEFAULT]
    )
    const borderDisabled = parseBorder(
        tokens.border[buttonType][subType][ButtonV2State.DISABLED]
    )
    const borderPressed = parseBorder(
        tokens.border[buttonType][subType][ButtonV2State.ACTIVE]
    )
    const activeBorder = (pressed: boolean) =>
        (pressed ? borderPressed : borderDefault) ?? borderDefault

    // ── shadow (all inset in your tokens → null for POC) ────────────────────
    const shadowStyle = parseShadow(
        tokens.shadow[buttonType][subType][tokenState]
    )

    // ── spacing / radius ─────────────────────────────────────────────────────
    const borderRadius = toNum(tokens.borderRadius[size][buttonType][subType])
    const paddingTop = toNum(
        tokens.padding[PaddingDirection.TOP][size][buttonType][subType]
    )
    const paddingRight = toNum(
        tokens.padding[PaddingDirection.RIGHT][size][buttonType][subType]
    )
    const paddingBottom = toNum(
        tokens.padding[PaddingDirection.BOTTOM][size][buttonType][subType]
    )
    const paddingLeft = toNum(
        tokens.padding[PaddingDirection.LEFT][size][buttonType][subType]
    )

    // ── typography ───────────────────────────────────────────────────────────
    const fontSize = toNum(tokens.text.fontSize[size])
    const fontWeight = String(
        tokens.text.fontWeight[size]
    ) as ViewStyle['borderRadius'] extends never
        ? never
        : '400' | '500' | '600' | '700'
    const lineHeight = toNum(tokens.text.lineHeight?.[size])
    const gap = toNum(tokens.gap)

    // ── text/icon color ──────────────────────────────────────────────────────
    const textColor = (pressed = false): string => {
        if (isInline) {
            // inline subtype changes text color on press, not background
            const pressedState = pressed ? ButtonV2State.ACTIVE : tokenState
            return String(
                tokens.text.color[buttonType][subType][pressedState] ??
                    'transparent'
            )
        }
        return String(
            tokens.text.color[buttonType][subType][tokenState] ?? 'transparent'
        )
    }

    const handlePress = () => {
        if (isDisabled) return
        onClick?.(undefined as any)
    }

    // ── shared pressable container style ────────────────────────────────────
    const containerStyle = (pressed: boolean): ViewStyle => {
        const border = isDisabled ? borderDisabled : activeBorder(pressed)
        return {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap,
            alignSelf: width ? undefined : 'flex-start',
            width: width as DimensionValue | undefined,
            paddingTop: isInline ? 0 : paddingTop,
            paddingRight: isInline ? 0 : paddingRight,
            paddingBottom: isInline ? 0 : paddingBottom,
            paddingLeft: isInline ? 0 : paddingLeft,
            borderRadius: isInline ? 0 : borderRadius,
            borderWidth:
                !isInline && !bg.isGradient && border ? border.borderWidth : 0,
            borderColor:
                !isInline && !bg.isGradient && border
                    ? border.borderColor
                    : 'transparent',
            // flat background — overridden to 'transparent' in gradient path
            backgroundColor: isInline
                ? 'transparent'
                : bg.isGradient
                  ? 'transparent' // gradient fills via <LinearGradient> child
                  : isDisabled
                    ? bg.flat
                    : pressed
                      ? bgPressed.flat
                      : bg.flat,
            // outer shadow (inset shadows from your tokens are dropped — no RN equivalent)
            ...(shadowStyle && Platform.OS === 'ios' ? shadowStyle : {}),
            ...(shadowStyle && Platform.OS === 'android'
                ? {
                      elevation:
                          (shadowStyle as { elevation?: number }).elevation ??
                          0,
                  }
                : {}),
            overflow: bg.isGradient && !isInline ? 'hidden' : 'visible',
        }
    }

    const renderContent = (pressed: boolean) => {
        const color = textColor(pressed)

        if (loading) {
            return (
                <ActivityIndicator
                    size="small"
                    color={String(
                        tokens.text.color[buttonType][subType][
                            ButtonV2State.DEFAULT
                        ]
                    )}
                />
            )
        }

        return (
            <>
                {leftSlot?.slot && (
                    <View style={{ flexShrink: 0 }}>{leftSlot.slot}</View>
                )}
                {text ? (
                    <Text
                        style={{
                            fontSize,
                            fontWeight: fontWeight as
                                | '400'
                                | '500'
                                | '600'
                                | '700',
                            lineHeight: lineHeight || undefined,
                            color,
                            textAlign: 'center',
                        }}
                        numberOfLines={1}
                    >
                        {text}
                    </Text>
                ) : null}
                {rightSlot?.slot && (
                    <View style={{ flexShrink: 0 }}>{rightSlot.slot}</View>
                )}
            </>
        )
    }

    // ── gradient path (primary, danger, success default/active states) ───────
    if (bg.isGradient && !isInline) {
        return (
            <Pressable
                ref={ref}
                onPress={handlePress}
                disabled={isDisabled}
                accessibilityRole="button"
                accessibilityState={{ disabled: isDisabled, busy: loading }}
                accessibilityLabel={text}
                style={({ pressed }) => ({
                    ...containerStyle(pressed),
                    backgroundColor:
                        pressed && !isDisabled ? bgPressed.flat : bg.flat,
                })}
            >
                {({ pressed }) => renderContent(pressed)}
            </Pressable>
        )
    }

    // ── flat path (secondary, inline, disabled gradient fallback) ────────────
    return (
        <Pressable
            ref={ref}
            onPress={handlePress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            accessibilityLabel={text}
            style={({ pressed }) => containerStyle(pressed)}
        >
            {({ pressed }) => renderContent(pressed)}
        </Pressable>
    )
})

ButtonV2Native.displayName = 'ButtonV2Native'

export default ButtonV2Native
