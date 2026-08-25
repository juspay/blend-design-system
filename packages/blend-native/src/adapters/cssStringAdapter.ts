import type { ViewStyle } from 'react-native'

/**
 * CSS-string token adapter for React Native.
 *
 * Blend's token factories emit CSS string values (`"6px"`,
 * `"1px solid #E1E4EA"`, `"linear-gradient(180deg, #1A56DB -5%, #2563EB 107.5%)"`).
 * RN's stylesheet engine accepts only numbers or platform-specific style
 * objects, so every token value that touches layout/decoration must be
 * translated here.
 *
 * Every function is pure and defensive: unparseable input returns a safe
 * fallback (usually `undefined`) rather than throwing, so a single bad token
 * never crashes the whole button.
 */

/**
 * A decimal number, in a form the regex engine cannot backtrack over.
 *
 * The obvious spellings — `\d*\.?\d+` and `\d+\.?\d*` — are **ambiguous**:
 * with no `.` present, a run of digits can be divided between the two
 * quantifiers in as many ways as there are digits, so a long non-matching
 * input costs O(n^2). CodeQL flags both as `js/polynomial-redos`, correctly.
 *
 * Here the `.` inside the optional group is mandatory, so each digit run has
 * exactly one valid division and matching stays linear.
 */
const NUMBER = String.raw`-?(?:\d+(?:\.\d+)?|\.\d+)`

/** `"6px"`, `"1.5px"`, `"0"` — a length, with the unit optional. */
const DIMENSION_RE = new RegExp(`^(${NUMBER})(?:px)?$`)

/** `"50%"`, `"33.5%"`, `"-5%"` — a percentage. */
const PERCENT_RE = new RegExp(`^(${NUMBER})%$`)

/**
 * Result of parsing a background token.
 *
 * - `flat` — solid color, apply via `backgroundColor`.
 * - `gradient` — linear gradient, requires a `<LinearGradient>` wrapper.
 * - `null` — `none` / transparent / unparseable; no background.
 */
export type ParsedBackground =
    | { type: 'flat'; color: string }
    | {
          type: 'gradient'
          colors: string[]
          locations: number[]
          start: { x: number; y: number }
          end: { x: number; y: number }
      }
    | null

/**
 * Parse a CSS dimension string (`"6px"`, `"1.5px"`, `"0"`) into a number.
 * Returns `undefined` for non-numeric input.
 *
 * `parseDimension("6px") → 6`
 * `parseDimension("1.5px") → 1.5`
 * `parseDimension("0") → 0`
 */
export function parseDimension(
    value: string | number | undefined
): number | undefined {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'number')
        return Number.isFinite(value) ? value : undefined
    const match = value.trim().match(DIMENSION_RE)
    if (!match) return undefined
    const n = parseFloat(match[1])
    return Number.isNaN(n) ? undefined : n
}

/**
 * RN's type for anything that accepts a length or a percentage
 * (`width`, `maxHeight`, `flexBasis`, ...).
 */
export type RNSize = number | `${number}%` | 'auto'

/**
 * Parse a CSS size value — `width`, `height`, `maxHeight`, `minWidth`, ... —
 * into something RN's stylesheet actually understands.
 *
 * This is deliberately strict. `parseFloat` is NOT a safe fallback here: it
 * turns `"100%"` into `100`, which RN renders as **100 pixels** rather than
 * full width, and it silently accepts `"12abc"` (→ `12`) and `"50em"` (→ `50`).
 * Anything not explicitly understood returns `undefined` so the caller skips
 * the prop instead of laying out a wrong value.
 *
 * ```
 * parseSize(24)            → 24
 * parseSize('24px')        → 24
 * parseSize('50%')         → '50%'
 * parseSize('100%')        → '100%'
 * parseSize('auto')        → 'auto'
 * parseSize('fit-content') → 'auto'   // RN's nearest equivalent
 * parseSize('min-content') → undefined
 * parseSize('calc(1+2)')   → undefined
 * parseSize('50em')        → undefined
 * parseSize('12abc')       → undefined
 * ```
 */
export function parseSize(
    value: string | number | undefined
): RNSize | undefined {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : undefined
    }

    const trimmed = value.trim()
    if (trimmed === '') return undefined

    // `fit-content` has no RN equivalent; `auto` is the closest behaviour
    // (shrink-to-fit within the parent's constraints).
    if (trimmed === 'auto' || trimmed === 'fit-content') return 'auto'

    // Percentages. See `NUMBER` — linear, so a long adversarial input cannot
    // degrade this.
    const pct = trimmed.match(PERCENT_RE)
    if (pct) {
        const n = parseFloat(pct[1])
        return Number.isNaN(n) ? undefined : (`${n}%` as `${number}%`)
    }

    // Bare numbers and `px` lengths.
    return parseDimension(trimmed)
}

/**
 * Parse a CSS `border` shorthand (`"1px solid #E1E4EA"`) into RN border props.
 * Returns `{ borderWidth, borderColor }` — the only two border properties RN
 * supports uniformly across iOS/Android.
 *
 * `parseBorder("1.5px solid #1A56DB") → { borderWidth: 1.5, borderColor: "#1A56DB" }`
 * `parseBorder("none") → {}`
 */
export function parseBorder(
    value: string | undefined
): Partial<Pick<ViewStyle, 'borderWidth' | 'borderColor'>> {
    if (!value || value === 'none' || value === 'transparent') {
        return {}
    }
    // Match: <width> <style> <color>
    // width: "1px" / "1.5px"
    // style: "solid" / "dashed" / "dotted" (RN only renders solid reliably)
    // color: hex / rgb / rgba / named
    const match = value
        .trim()
        .match(/^(\d*\.?\d+)px\s+(?:solid|dashed|dotted)\s+(.+)$/)
    if (!match) return {}
    const width = parseFloat(match[1])
    const color = match[2].trim()
    if (Number.isNaN(width) || !color) return {}
    return { borderWidth: width, borderColor: color }
}

/**
 * Parse a CSS `border-radius` value into a number or corner-tuple for RN.
 *
 * Single value: `"10px" → 10`
 * Four values (per CSS order TL TR BR BL): `"10px 0 0 10px" → { topLeft: 10, topRight: 0, bottomRight: 0, bottomLeft: 10 }`
 *
 * Returns `undefined` for unparseable input so callers can skip the prop.
 */
export function parseBorderRadius(
    value: string | number | undefined
):
    | number
    | Pick<
          ViewStyle,
          | 'borderTopLeftRadius'
          | 'borderTopRightRadius'
          | 'borderBottomRightRadius'
          | 'borderBottomLeftRadius'
      >
    | undefined {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'number') return value
    const trimmed = value.trim()
    if (trimmed === '' || trimmed === 'none') return undefined

    const parts = trimmed.split(/\s+/).map((p) => parseFloat(p))
    if (parts.some((p) => Number.isNaN(p))) return undefined

    if (parts.length === 1) return parts[0]
    if (parts.length === 4) {
        // CSS order: top-left, top-right, bottom-right, bottom-left
        return {
            borderTopLeftRadius: parts[0],
            borderTopRightRadius: parts[1],
            borderBottomRightRadius: parts[2],
            borderBottomLeftRadius: parts[3],
        }
    }
    // 2 or 3 value shorthands are rare in tokens; fall back to single.
    return parts[0]
}

/**
 * Parse one or more CSS `box-shadow` declarations into RN shadow/elevation props.
 *
 * RN does NOT support `inset` shadows — any `inset` declaration returns `null`
 * (the caller should treat that as "no shadow"). Multiple comma-separated
 * shadows are collapsed into the first non-inset shadow, because RN's shadow
 * API models a single shadow.
 *
 * Focus-ring shadows (`"0 0 0 3px #EFF6FF"`) are parsed normally and become
 * outer shadows — visually acceptable on native.
 *
 * Returns a `ViewStyle` subset: `shadowColor`, `shadowOffset`, `shadowOpacity`,
 * `shadowRadius` (iOS) + `elevation` (Android).
 */
export function parseBoxShadow(
    value: string | undefined
): Pick<
    ViewStyle,
    | 'shadowColor'
    | 'shadowOffset'
    | 'shadowOpacity'
    | 'shadowRadius'
    | 'elevation'
> | null {
    if (!value || value === 'none') return null

    // Split on commas that separate multiple shadow declarations — but NOT
    // commas inside rgba()/rgb() parens, which are part of a color, not
    // separators. `(?![^(]*\))` = skip commas inside parens.
    const shadows = value
        .split(/,(?![^(]*\))/)
        .map((s) => s.trim())
        .filter(Boolean)

    // Find the first non-inset shadow — RN cannot render inset shadows at all.
    const outer = shadows.find((s) => !/\binset\b/i.test(s))
    if (!outer) return null

    // Extract the color first, then parse numbers from the remainder.
    // This avoids picking up digits from inside rgba(...) as offsets.
    const colorMatch = outer.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)/i)
    const numericPart = outer
        .replace(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)/gi, ' ')
        .replace(/\binset\b/gi, ' ')
    const nums =
        numericPart.match(/-?\d*\.?\d+/g)?.map((t) => parseFloat(t)) ?? []

    const [offsetX = 0, offsetY = 0, blur = 0, spread = 0] = nums

    // RN's shadowRadius is the blur radius, not the spread.
    // Elevation approximates the combined shadow depth on Android.
    const shadowColor = colorMatch?.[0] ?? '#000000'

    // If shadowColor is rgba(), extract the rgb for shadowColor and keep the
    // alpha separately for shadowOpacity (iOS multiplies them).
    let resolvedColor = shadowColor
    let resolvedOpacity = 1
    const rgbaMatch = shadowColor.match(
        /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i
    )
    if (rgbaMatch) {
        const [, r, g, b, a] = rgbaMatch
        resolvedColor = `rgb(${r}, ${g}, ${b})`
        resolvedOpacity = a ? parseFloat(a) : 1
    }

    // Elevation: a rough heuristic — use blur + |offsetY| as the depth cue.
    // Spread on focus rings (e.g. `0 0 0 3px`) should still produce visible
    // elevation, so include it.
    const elevation = Math.max(blur, spread, Math.abs(offsetY))

    return {
        shadowColor: resolvedColor,
        shadowOffset: { width: offsetX, height: offsetY },
        shadowOpacity: resolvedOpacity,
        shadowRadius: blur + spread,
        elevation,
    }
}

/**
 * Parse a CSS `background` value into a `ParsedBackground`.
 *
 * - `"linear-gradient(180deg, #1A56DB -5%, #2563EB 107.5%)"` → gradient descriptor
 *   (percentage midpoints outside [0,1] are clamped — known limitation)
 * - `"#FFFFFF"` / `"rgb(255,255,255)"` → flat color
 * - `"none"` / `"transparent"` → null
 */
export function parseBackground(value: string | undefined): ParsedBackground {
    if (!value || value === 'none' || value === 'transparent') return null

    // Gradient?
    const gradientMatch = value.match(
        /linear-gradient\(\s*(\d+)deg\s*,\s*(.+)\s*\)/i
    )
    if (gradientMatch) {
        const angle = parseFloat(gradientMatch[1])
        const stopsStr = gradientMatch[2]

        // Parse color stops: "<color> <position>?" separated by commas.
        // Blend gradient tokens use hex colors (no embedded commas), so a
        // simple split on "," is safe. Each stop is trimmed, then split on
        // whitespace to separate color from its optional percentage position.
        // Positions may be outside [0,1] (e.g. "-5%", "107.5%") — clamped.
        const stopStrs = stopsStr
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        const colors: string[] = []
        const locations: number[] = []
        for (const stop of stopStrs) {
            // "color" or "color position%"
            const parts = stop.split(/\s+/)
            colors.push(parts[0])
            if (parts[1]) {
                const pct = parseFloat(parts[1]) / 100
                locations.push(Math.min(1, Math.max(0, pct)))
            } else {
                locations.push(0)
            }
        }

        if (colors.length < 2) {
            // Degenerate gradient — treat as flat color.
            return colors[0] ? { type: 'flat', color: colors[0] } : null
        }

        // If locations weren't specified, distribute evenly.
        const allZero = locations.every((l) => l === 0)
        let resolvedLocations = locations
        if (allZero) {
            resolvedLocations = colors.map((_, i) => i / (colors.length - 1))
        }

        // Convert CSS angle (0deg = bottom→top) to RN {start, end} coords.
        // RN's LinearGradient uses normalized [0,1] coordinates on the bounding box.
        // 0deg → start={x:0.5,y:1} end={x:0.5,y:0}
        // 90deg → start={x:0,y:0.5} end={x:1,y:0.5}
        // 180deg → start={x:0.5,y:0} end={x:0.5,y:1}
        const rad = (angle * Math.PI) / 180
        const start = {
            x: 0.5 - Math.sin(rad) * 0.5,
            y: 0.5 + Math.cos(rad) * 0.5,
        }
        const end = {
            x: 0.5 + Math.sin(rad) * 0.5,
            y: 0.5 - Math.cos(rad) * 0.5,
        }

        return {
            type: 'gradient',
            colors,
            locations: resolvedLocations,
            start,
            end,
        }
    }

    // Solid color (hex / rgb / rgba / named)
    if (/^(#[0-9a-fA-F]{3,8}|rgba?\(|[a-z]+)/i.test(value)) {
        return { type: 'flat', color: value }
    }

    return null
}

/**
 * Merge multiple style objects into one, skipping `undefined` values.
 * Helper for composing adapter output with caller-provided overrides.
 */
export function mergeStyles<T extends object>(...styles: (T | undefined)[]): T {
    const result: Record<string, unknown> = {}
    for (const s of styles) {
        if (!s) continue
        for (const key of Object.keys(s)) {
            const val = (s as Record<string, unknown>)[key]
            if (val !== undefined && val !== null) {
                result[key] = val
            }
        }
    }
    return result as T
}
