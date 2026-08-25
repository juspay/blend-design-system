import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
    getTagV2Tokens,
    type TagV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    getTagBorderRadius,
    getAccessibleName,
    getTagAccessibilityState,
} from '../src/components/Tag/tag.utils'
import { resolveSurfaceStyle } from '../src/adapters/surfaceStyle'

const TYPES = Object.values(TagV2Type)
const COLORS = Object.values(TagV2Color)
const SIZES = Object.values(TagV2Size)
const SUBTYPES = Object.values(TagV2SubType)

const lightTokens = getTagV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as TagV2TokensType
const darkTokens = getTagV2Tokens(FOUNDATION_THEME, Theme.DARK)
    .sm as TagV2TokensType

/**
 * Build the same surface `Tag.tsx` builds, without rendering.
 *
 * The component is a thin composition over this resolution, so exercising it
 * directly covers every variant far more cheaply than mounting 144 trees —
 * and catches the failure that actually matters here: a token shape that
 * produces `NaN` or `undefined` in an RN style.
 */
function resolveTagSurface(
    tokens: TagV2TokensType,
    type: TagV2Type,
    color: TagV2Color,
    size: TagV2Size,
    subType: TagV2SubType,
    tagGroupPosition?: 'center' | 'left' | 'right'
) {
    return resolveSurfaceStyle({
        backgroundColor: String(tokens.backgroundColor[type][color]),
        border: String(tokens.border[type][color]),
        borderRadius: getTagBorderRadius(
            size,
            subType,
            tagGroupPosition,
            tokens
        ),
        height: tokens.height[size],
        // Vertical padding is intentionally omitted, matching the component —
        // see the `text is never vertically clipped` suite below.
        paddingLeft: tokens.padding.left[size],
        paddingRight: tokens.padding.right[size],
        gap: tokens.gap,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    })
}

/** Every combination the component accepts. 3 x 6 x 4 x 2 = 144. */
const MATRIX = TYPES.flatMap((type) =>
    COLORS.flatMap((color) =>
        SIZES.flatMap((size) =>
            SUBTYPES.map((subType) => ({ type, color, size, subType }))
        )
    )
)

describe('Tag variant matrix', () => {
    it('covers every documented combination', () => {
        expect(MATRIX).toHaveLength(144)
    })

    describe.each([
        ['light', lightTokens],
        ['dark', darkTokens],
    ])('%s theme', (_label, tokens) => {
        it.each(MATRIX)(
            'resolves $type/$color/$size/$subType to valid RN styles',
            ({ type, color, size, subType }) => {
                const style = resolveTagSurface(
                    tokens,
                    type,
                    color,
                    size,
                    subType
                )

                // No NaN or undefined may reach RN's stylesheet — both
                // silently break layout rather than erroring.
                for (const [key, value] of Object.entries(style)) {
                    expect(value, `${key} must not be undefined`).toBeDefined()
                    if (typeof value === 'number') {
                        expect(
                            Number.isNaN(value),
                            `${key} must not be NaN`
                        ).toBe(false)
                    }
                }

                expect(typeof style.backgroundColor).toBe('string')
                expect(style.borderWidth).toBeGreaterThan(0)
                expect(typeof style.borderColor).toBe('string')
                expect(style.height).toBeGreaterThan(0)
            }
        )
    })

    it('resolves a distinct text colour for every type/color pair', () => {
        for (const type of TYPES) {
            for (const color of COLORS) {
                const textColor = lightTokens.text.color[type][color]
                expect(textColor, `${type}/${color}`).toBeDefined()
                expect(String(textColor)).toMatch(/^#|^rgb/)
            }
        }
    })

    it('differs between light and dark for at least one token', () => {
        // Guards against the dark factory silently returning light values.
        const light = lightTokens.backgroundColor.subtle.primary
        const dark = darkTokens.backgroundColor.subtle.primary
        expect(String(light)).not.toBe(String(dark))
    })
})

describe('text is never vertically clipped', () => {
    // Regression: the tokens define BOTH a fixed height and vertical padding,
    // and for every size the padding leaves a content box shorter than the
    // text's own line height. On web that is harmless — the line box
    // overflows the padding box, nothing is clipped, and `align-items:
    // center` keeps it centred. RN clips instead, which sheared the
    // descenders off "primary", "warning", "purple" and "lg" on iOS while
    // react-native-web rendered them correctly.
    //
    // The component therefore treats `height` as authoritative and drops the
    // (visually inert) vertical padding. These tests pin both halves.

    const BORDER = 2 // 1px top + 1px bottom

    it.each(SIZES)(
        'size %s: the naive box (height minus vertical padding) is too short',
        (size) => {
            const padded =
                parseFloat(String(lightTokens.height[size])) -
                parseFloat(String(lightTokens.padding.top[size])) -
                parseFloat(String(lightTokens.padding.bottom[size])) -
                BORDER
            const lineHeight = Number(lightTokens.text.lineHeight[size])
            // If this ever stops being true the workaround can be revisited.
            expect(padded).toBeLessThan(lineHeight)
        }
    )

    it.each(SIZES)(
        'size %s: the height-authoritative box fits the line height',
        (size) => {
            const box = parseFloat(String(lightTokens.height[size])) - BORDER
            const lineHeight = Number(lightTokens.text.lineHeight[size])
            expect(box).toBeGreaterThanOrEqual(lineHeight)
        }
    )

    it('resolves no vertical padding for a Tag surface', () => {
        const style = resolveTagSurface(
            lightTokens,
            TagV2Type.SUBTLE,
            TagV2Color.PRIMARY,
            TagV2Size.SM,
            TagV2SubType.SQUARICAL
        )
        expect(style.paddingTop).toBeUndefined()
        expect(style.paddingBottom).toBeUndefined()
        // Horizontal padding is still applied — it is not visually inert.
        expect(style.paddingLeft).toBeGreaterThan(0)
        expect(style.paddingRight).toBeGreaterThan(0)
    })
})

describe('getTagBorderRadius', () => {
    it('returns the variant radius when ungrouped', () => {
        const radius = getTagBorderRadius(
            TagV2Size.SM,
            TagV2SubType.SQUARICAL,
            undefined,
            lightTokens
        )
        expect(radius).toBe(
            String(
                lightTokens.borderRadius[TagV2Size.SM][TagV2SubType.SQUARICAL]
            )
        )
    })

    it('uses the full pill radius for the rounded subType', () => {
        const radius = getTagBorderRadius(
            TagV2Size.SM,
            TagV2SubType.ROUNDED,
            undefined,
            lightTokens
        )
        expect(radius).toBe('9999px')
        expect(resolveSurfaceStyle({ borderRadius: radius }).borderRadius).toBe(
            9999
        )
    })

    it('collapses the right edge for a left-positioned tag', () => {
        const radius = getTagBorderRadius(
            TagV2Size.SM,
            TagV2SubType.SQUARICAL,
            'left',
            lightTokens
        )
        const style = resolveSurfaceStyle({ borderRadius: radius })
        expect(style.borderTopRightRadius).toBe(0)
        expect(style.borderBottomRightRadius).toBe(0)
        expect(style.borderTopLeftRadius).toBeGreaterThan(0)
    })

    it('collapses the left edge for a right-positioned tag', () => {
        const radius = getTagBorderRadius(
            TagV2Size.SM,
            TagV2SubType.SQUARICAL,
            'right',
            lightTokens
        )
        const style = resolveSurfaceStyle({ borderRadius: radius })
        expect(style.borderTopLeftRadius).toBe(0)
        expect(style.borderBottomLeftRadius).toBe(0)
        expect(style.borderTopRightRadius).toBeGreaterThan(0)
    })

    it('squares every corner for a centre-positioned tag', () => {
        const radius = getTagBorderRadius(
            TagV2Size.SM,
            TagV2SubType.SQUARICAL,
            'center',
            lightTokens
        )
        expect(radius).toBe('0px 0px 0px 0px')
        const style = resolveSurfaceStyle({ borderRadius: radius })
        expect(style.borderTopLeftRadius).toBe(0)
        expect(style.borderBottomRightRadius).toBe(0)
    })
})

describe('getAccessibleName', () => {
    it('returns undefined for a non-interactive tag', () => {
        // Web does the same: the text content is announced instead.
        expect(getAccessibleName('Beta', false, undefined)).toBeUndefined()
    })

    it('returns the plain text for an interactive tag with no toggle state', () => {
        expect(getAccessibleName('Beta', true, undefined)).toBe('Beta')
    })

    it('appends the pressed state', () => {
        expect(getAccessibleName('Beta', true, true)).toBe('Beta, pressed')
    })

    it('appends the mixed state', () => {
        expect(getAccessibleName('Beta', true, 'mixed')).toBe(
            'Beta, mixed state'
        )
    })

    it('does not append anything when explicitly unpressed', () => {
        expect(getAccessibleName('Beta', true, false)).toBe('Beta')
    })
})

describe('getTagAccessibilityState', () => {
    it('is undefined when non-interactive', () => {
        expect(getTagAccessibilityState(false, true)).toBeUndefined()
    })

    it('is undefined when no toggle state is supplied', () => {
        expect(getTagAccessibilityState(true, undefined)).toBeUndefined()
    })

    it('maps a pressed tag to selected', () => {
        expect(getTagAccessibilityState(true, true)).toEqual({ selected: true })
    })

    it('reports mixed as unselected, since RN has no mixed state', () => {
        // The distinction survives in the accessible name instead.
        expect(getTagAccessibilityState(true, 'mixed')).toEqual({
            selected: false,
        })
    })
})
