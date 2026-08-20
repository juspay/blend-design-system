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
import { LinearGradient } from 'expo-linear-gradient'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    PaddingDirection,
} from './buttonV2.types'
import type { ButtonV2Props } from './buttonV2.types'
import type { ButtonV2TokensType } from './buttonV2.tokens.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

// ──────────────────────────────────────────────────────────────────
// Translation helpers — token VALUES don't change, these just
// reinterpret the CSS-string shape into something RN can render.
// ──────────────────────────────────────────────────────────────────

/**
 * Token backgrounds are either a flat color ("#FFFFFF") or a CSS
 * linear-gradient string. RN's backgroundColor only accepts the flat
 * case — gradients need <LinearGradient>. This parses just enough of
 * the CSS gradient syntax to extract the stop colors and ignores the
 * percentage offsets (RN's LinearGradient doesn't support non-0/1
 * stop positions the same way CSS does, so this trades a little
 * visual precision for "it actually renders" — fine for a POC).
 */
function parseBackground(cssValue: string | undefined): {
    isGradient: boolean
    colors: [string, string]
    flat: string
} {
    if (!cssValue || cssValue === 'none' || cssValue === 'transparent') {
        return {
            isGradient: false,
            colors: ['transparent', 'transparent'],
            flat: 'transparent',
        }
    }
    const gradientMatch = cssValue.match(/linear-gradient\(([^)]+)\)/)
    if (!gradientMatch) {
        return {
            isGradient: false,
            colors: [cssValue, cssValue],
            flat: cssValue,
        }
    }
    const colorMatches = gradientMatch[1].match(
        /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g
    )
    if (!colorMatches || colorMatches.length < 2) {
        return {
            isGradient: false,
            colors: [cssValue, cssValue],
            flat: cssValue,
        }
    }
    return {
        isGradient: true,
        colors: [colorMatches[0], colorMatches[colorMatches.length - 1]],
        flat: colorMatches[0],
    }
}

/**
 * Token shadow values are CSS box-shadow strings, frequently using
 * `inset` (e.g. "0px 4px 4px 0px rgba(0,0,0,0.15) inset"). RN's View
 * has no `inset` shadow concept at all — shadowOffset/shadowRadius are
 * always an OUTER shadow. Rather than fake an inset effect (not worth
 * the complexity for a POC), inset shadows are simply dropped — only
 * non-inset shadows get translated to RN's shadow* / elevation props.
 * This is a real, known platform gap — flagged here rather than hidden.
 */
function parseShadow(cssValue: string | undefined): {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
} | null {
    if (!cssValue || cssValue === 'none' || cssValue.includes('inset')) {
        return null
    }
    const match = cssValue.match(
        /(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+(-?\d+(?:\.\d+)?)px\s+\d+(?:\.\d+)?px\s+rgba?\(([^)]+)\)/
    )
    if (!match) return null
    const [, x, y, blur, rgba] = match
    const parts = rgba.split(',').map((p) => parseFloat(p.trim()))
    const [r, g, b, a = 1] = parts
    return {
        shadowColor: `rgb(${r}, ${g}, ${b})`,
        shadowOffset: { width: parseFloat(x), height: parseFloat(y) },
        shadowOpacity: a,
        shadowRadius: parseFloat(blur),
        elevation: Math.ceil(parseFloat(blur) / 2),
    }
}

/** CSSObject border-radius/padding/fontSize/fontWeight values arrive as
 * strings like "10px" or "16px" — RN style numbers want a bare number. */
function toNum(value: string | number | null | undefined): number {
    if (value === null || value === undefined) return 0
    if (typeof value === 'number') return value
    const parsed = parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
}

// ──────────────────────────────────────────────────────────────────

const ButtonV2 = forwardRef<ViewType, ButtonV2Props>((props, ref) => {
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
        justifyContent = 'center',
    } = props

    // Same hook the web ButtonV2 uses — pulls the live, theme-aware
    // token object for the current breakpoint. Nothing about this hook
    // or the tokens it returns has been changed.
    const tokens = useResponsiveTokens<ButtonV2TokensType>('BUTTONV2')

    const isInline = subType === ButtonV2SubType.INLINE
    const isDisabled = disabled || loading
    const buttonState = isDisabled
        ? ButtonV2State.DISABLED
        : ButtonV2State.DEFAULT

    const bg = parseBackground(
        tokens.backgroundColor[buttonType][subType][buttonState] as
            | string
            | undefined
    )
    const bgPressed = parseBackground(
        tokens.backgroundColor[buttonType][subType][ButtonV2State.ACTIVE] as
            | string
            | undefined
    )
    const shadow = parseShadow(
        tokens.shadow[buttonType][subType][buttonState] as string | undefined
    )
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
    const fontSize = toNum(tokens.text.fontSize[size])
    const fontWeight = String(tokens.text.fontWeight[size]) as
        | '400'
        | '500'
        | '600'
        | '700'
    const textColor = tokens.text.color[buttonType][subType][
        buttonState
    ] as string
    const gap = toNum(tokens.gap)

    const handlePress = () => {
        if (isDisabled)
            return // Native has no DOM MouseEvent; the web onClick signature expects one,
            // so we pass undefined and cast to satisfy the type.
        ;(onClick as ((e?: unknown) => void) | undefined)?.()
    }

    const content = (
        <>
            {loading ? (
                <ActivityIndicator size="small" color={textColor} />
            ) : (
                <>
                    {leftSlot?.slot && <View>{leftSlot.slot}</View>}
                    {text && (
                        <Text
                            style={{
                                fontSize,
                                fontWeight,
                                color: textColor,
                                textAlign: 'center',
                            }}
                        >
                            {text}
                        </Text>
                    )}
                    {rightSlot?.slot && <View>{rightSlot.slot}</View>}
                </>
            )}
        </>
    )

    const sharedStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: justifyContent as ViewStyle['justifyContent'],
        gap,
        width: width as DimensionValue | undefined,
        alignSelf: width ? undefined : 'flex-start',
        paddingTop: isInline ? 0 : paddingTop,
        paddingRight: isInline ? 0 : paddingRight,
        paddingBottom: isInline ? 0 : paddingBottom,
        paddingLeft: isInline ? 0 : paddingLeft,
        borderRadius: isInline ? 0 : borderRadius,
    }

    // Gradient backgrounds (e.g. PRIMARY/DANGER/SUCCESS in the tokens)
    // need a real <LinearGradient> wrapper — flat backgrounds (e.g.
    // SECONDARY) render as a normal Pressable.
    if (bg.isGradient && !isInline) {
        return (
            <Pressable
                ref={ref}
                onPress={handlePress}
                disabled={isDisabled}
                accessibilityRole="button"
                accessibilityState={{ disabled: isDisabled, busy: loading }}
                accessibilityLabel={text}
                style={[
                    sharedStyle,
                    shadow && Platform.OS === 'ios' ? shadow : null,
                    shadow && Platform.OS === 'android'
                        ? { elevation: shadow.elevation }
                        : null,
                    { overflow: 'hidden' },
                ]}
            >
                {({ pressed }: { pressed: boolean }) => (
                    <LinearGradient
                        colors={
                            pressed
                                ? [bgPressed.flat, bgPressed.flat]
                                : bg.colors
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            sharedStyle,
                            { borderRadius: isInline ? 0 : borderRadius },
                        ]}
                    >
                        {content}
                    </LinearGradient>
                )}
            </Pressable>
        )
    }

    // Flat-color path (SECONDARY, INLINE, or any non-gradient state)
    return (
        <Pressable
            ref={ref}
            onPress={handlePress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled, busy: loading }}
            accessibilityLabel={text}
            style={({ pressed }: { pressed: boolean }) => [
                sharedStyle,
                {
                    backgroundColor: isInline
                        ? 'transparent'
                        : pressed
                          ? bgPressed.flat
                          : bg.flat,
                },
                shadow && Platform.OS === 'ios' ? shadow : null,
                shadow && Platform.OS === 'android'
                    ? { elevation: shadow.elevation }
                    : null,
            ]}
        >
            {content}
        </Pressable>
    )
})

ButtonV2.displayName = 'ButtonV2'

export default ButtonV2
