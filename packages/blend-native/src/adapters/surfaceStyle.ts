import type { ViewStyle } from 'react-native'
import {
    parseBackground,
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseDimension,
    parseSize,
    type ParsedBackground,
} from './cssStringAdapter'

/**
 * Shared CSS-string → `ViewStyle` resolution for every native surface.
 *
 * Both `Block` (a plain `View`) and `Pressable` (an interactive surface) need
 * to turn the same token-shaped CSS strings into RN styles. Before this
 * existed, `Pressable` inlined the whole translation and `Block` had none at
 * all — which meant a non-interactive container could not render a border,
 * a radius, or a height. Components that switch between the two depending on
 * whether they are interactive (web's `TagElement = onClick ? PrimitiveButton
 * : Block` pattern) would have rendered differently in each branch.
 *
 * Pure and total: unparseable input is dropped rather than thrown, and no key
 * is emitted for a value that could not be resolved, so `undefined`/`NaN`
 * never reaches RN's stylesheet.
 */

/**
 * Which platform's shadow model to emit.
 *
 * Passed in rather than read from `Platform.OS` so this module stays free of
 * any `react-native` value import and remains unit-testable outside a
 * renderer — the same constraint that shapes `theme/breakpoint.ts` and
 * `primitives/touchTarget.ts`.
 */
export type SurfacePlatform = 'ios' | 'android' | 'web' | 'windows' | 'macos'

export type SurfaceStyleProps = {
    /** CSS-string background token — flat colour, gradient, or `none`. */
    background?: string
    /** CSS-string border shorthand, e.g. `"1px solid #E1E4EA"`. */
    border?: string
    /** CSS border-radius: `"10px"`, `"9999px"`, or a 4-value corner string. */
    borderRadius?: string | number
    /** CSS box-shadow. Inset shadows are dropped (RN cannot render them). */
    boxShadow?: string

    paddingTop?: string | number
    paddingRight?: string | number
    paddingBottom?: string | number
    paddingLeft?: string | number

    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    height?: string | number
    minHeight?: string | number
    maxHeight?: string | number

    flexDirection?: ViewStyle['flexDirection']
    alignItems?: ViewStyle['alignItems']
    justifyContent?: ViewStyle['justifyContent']
    alignSelf?: ViewStyle['alignSelf']
    gap?: string | number
    flexShrink?: number
    flexGrow?: number
    opacity?: number
    overflow?: ViewStyle['overflow']
    /** Solid background colour, already RN-ready. Wins over `background`. */
    backgroundColor?: string
}

/**
 * Assign `value` to `target[key]` only when it is a usable style value.
 * Keeps `undefined` and `NaN` out of the emitted `ViewStyle`.
 */
function put<K extends keyof ViewStyle>(
    target: ViewStyle,
    key: K,
    value: ViewStyle[K] | undefined
): void {
    if (value === undefined || value === null) return
    if (typeof value === 'number' && Number.isNaN(value)) return
    target[key] = value
}

/**
 * Resolve the parsed background into `backgroundColor`, and report whether a
 * gradient was requested. Gradients cannot be expressed as a `ViewStyle`, so
 * callers that support them (`Pressable`) render a `<LinearGradient>` layer
 * and callers that do not fall back to the gradient's first colour.
 */
export function resolveBackground(
    background: string | undefined,
    explicitBackgroundColor: string | undefined
): { backgroundColor?: string; gradient?: ParsedBackground } {
    if (explicitBackgroundColor) {
        return { backgroundColor: explicitBackgroundColor }
    }

    const parsed = parseBackground(background)
    if (!parsed) return {}
    if (parsed.type === 'flat') return { backgroundColor: parsed.color }

    // Gradient — hand it back for the caller to render, and supply the first
    // stop as a static fallback so a non-gradient-capable surface still shows
    // something in the right colour family rather than transparent.
    return { backgroundColor: parsed.colors[0], gradient: parsed }
}

/**
 * Apply the shadow model the platform actually understands.
 *
 * The two are mutually exclusive in practice:
 *
 * - **iOS** renders `shadowColor` / `shadowOffset` / `shadowOpacity` /
 *   `shadowRadius` and ignores `elevation` entirely.
 * - **Android** renders only `elevation`, and before API 28 it ignores
 *   `shadowColor` — so emitting the iOS keys alongside it is at best dead
 *   weight and at worst misleading to anyone reading the resolved style.
 * - **Web** (react-native-web) maps the iOS keys onto `box-shadow`, as do
 *   RN-Windows and RN-macOS — so Android is the only platform that diverges.
 *
 * Emitting both unconditionally, as this used to, meant every surface carried
 * four properties the running platform would never read.
 */
function applyShadow(
    style: ViewStyle,
    shadow: ReturnType<typeof parseBoxShadow>,
    platform: SurfacePlatform
): void {
    if (!shadow) return

    if (platform === 'android') {
        put(style, 'elevation', shadow.elevation)
        return
    }

    put(style, 'shadowColor', shadow.shadowColor)
    put(style, 'shadowOffset', shadow.shadowOffset)
    put(style, 'shadowOpacity', shadow.shadowOpacity)
    put(style, 'shadowRadius', shadow.shadowRadius)
}

/**
 * Translate token-shaped surface props into a `ViewStyle`.
 *
 * Gradients are reported separately via `resolveBackground` — this function
 * emits only the flat-colour fallback, so it is safe for any `View`.
 */
export function resolveSurfaceStyle(
    props: SurfaceStyleProps,
    platform: SurfacePlatform = 'ios'
): ViewStyle {
    const style: ViewStyle = {}

    // ---- Background -----------------------------------------------------
    const { backgroundColor } = resolveBackground(
        props.background,
        props.backgroundColor
    )
    put(style, 'backgroundColor', backgroundColor)

    // ---- Border ---------------------------------------------------------
    const border = parseBorder(props.border)
    put(style, 'borderWidth', border.borderWidth)
    put(style, 'borderColor', border.borderColor)
    put(style, 'borderStyle', border.borderStyle)

    // ---- Radius ---------------------------------------------------------
    const radius = parseBorderRadius(props.borderRadius)
    if (typeof radius === 'number') {
        put(style, 'borderRadius', radius)
    } else if (radius && typeof radius === 'object') {
        put(style, 'borderTopLeftRadius', radius.borderTopLeftRadius)
        put(style, 'borderTopRightRadius', radius.borderTopRightRadius)
        put(style, 'borderBottomRightRadius', radius.borderBottomRightRadius)
        put(style, 'borderBottomLeftRadius', radius.borderBottomLeftRadius)
    }

    // ---- Shadow ---------------------------------------------------------
    applyShadow(style, parseBoxShadow(props.boxShadow), platform)

    // ---- Spacing --------------------------------------------------------
    put(style, 'paddingTop', parseDimension(props.paddingTop))
    put(style, 'paddingRight', parseDimension(props.paddingRight))
    put(style, 'paddingBottom', parseDimension(props.paddingBottom))
    put(style, 'paddingLeft', parseDimension(props.paddingLeft))
    put(style, 'gap', parseDimension(props.gap))

    // ---- Sizing ---------------------------------------------------------
    put(style, 'width', parseSize(props.width))
    put(style, 'minWidth', parseSize(props.minWidth))
    put(style, 'maxWidth', parseSize(props.maxWidth))
    put(style, 'height', parseSize(props.height))
    put(style, 'minHeight', parseSize(props.minHeight))
    put(style, 'maxHeight', parseSize(props.maxHeight))

    // ---- Layout (already RN-shaped) -------------------------------------
    put(style, 'flexDirection', props.flexDirection)
    put(style, 'alignItems', props.alignItems)
    put(style, 'justifyContent', props.justifyContent)
    put(style, 'alignSelf', props.alignSelf)
    put(style, 'flexShrink', props.flexShrink)
    put(style, 'flexGrow', props.flexGrow)
    put(style, 'opacity', props.opacity)
    put(style, 'overflow', props.overflow)

    return style
}
