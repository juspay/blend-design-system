import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    getButtonV2Tokens,
    type ButtonV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    getButtonNativeStyles,
    getIconMaxHeight,
    getButtonHeight,
    getLoaderSize,
    getTextColor,
    getButtonV2BorderRadius,
} from '../src/components/Button/button.utils'
import { resolveSurfaceStyle } from '../src/adapters/surfaceStyle'
import { parseBackground } from '../src/adapters/cssStringAdapter'

const tokens = getButtonV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as ButtonV2TokensType

const TYPES = Object.values(ButtonV2Type)
const SIZES = Object.values(ButtonV2Size)
const SUBTYPES = Object.values(ButtonV2SubType)

describe('getIconMaxHeight', () => {
    // Regression: both behaviours below were missing on native — slots always
    // used the size-derived default, so a per-slot override was silently
    // dropped and the inline subType never stretched.
    it('honours a per-slot maxHeight override', () => {
        expect(
            getIconMaxHeight(ButtonV2SubType.DEFAULT, 24, undefined, '16px')
        ).toEqual({ left: 24, right: '16px' })
    })

    it('falls back to the size-derived default', () => {
        expect(
            getIconMaxHeight(
                ButtonV2SubType.DEFAULT,
                undefined,
                undefined,
                '16px'
            )
        ).toEqual({ left: '16px', right: '16px' })
    })

    it('stretches both slots for the inline subType', () => {
        expect(
            getIconMaxHeight(ButtonV2SubType.INLINE, 24, 24, '16px')
        ).toEqual({ left: '100%', right: '100%' })
    })
})

describe('getButtonHeight', () => {
    it("maps the inline subType to RN's auto", () => {
        // Web returns `fit-content`, which RN does not understand.
        expect(getButtonHeight(ButtonV2SubType.INLINE)).toBe('auto')
    })

    it.each([[ButtonV2SubType.DEFAULT], [ButtonV2SubType.ICON_ONLY]])(
        'leaves %s unconstrained',
        (subType) => {
            expect(getButtonHeight(subType)).toBeUndefined()
        }
    )
})

describe('getLoaderSize', () => {
    it.each([
        [ButtonV2Size.SMALL, 16],
        [ButtonV2Size.MEDIUM, 18],
        [ButtonV2Size.LARGE, 20],
    ])('maps %s to %i, matching web', (size, expected) => {
        expect(getLoaderSize(size)).toBe(expected)
    })
})

describe('getTextColor', () => {
    it('uses the disabled token when disabled, ignoring state', () => {
        const disabled = getTextColor(
            true,
            ButtonV2State.DEFAULT,
            ButtonV2Type.PRIMARY,
            ButtonV2SubType.DEFAULT,
            tokens
        )
        expect(disabled).toBe(
            String(
                tokens.text.color[ButtonV2Type.PRIMARY][ButtonV2SubType.DEFAULT]
                    .disabled
            )
        )
    })

    it('honours an explicit state when enabled', () => {
        const active = getTextColor(
            false,
            ButtonV2State.ACTIVE,
            ButtonV2Type.PRIMARY,
            ButtonV2SubType.DEFAULT,
            tokens
        )
        expect(active).toBe(
            String(
                tokens.text.color[ButtonV2Type.PRIMARY][ButtonV2SubType.DEFAULT]
                    .active
            )
        )
    })
})

describe('getButtonV2BorderRadius', () => {
    it('collapses the joined edges for a grouped button', () => {
        const left = getButtonV2BorderRadius(
            ButtonV2Size.SMALL,
            ButtonV2Type.PRIMARY,
            ButtonV2SubType.DEFAULT,
            'left',
            tokens
        )
        const style = resolveSurfaceStyle({ borderRadius: left })
        expect(style.borderTopRightRadius).toBe(0)
        expect(style.borderTopLeftRadius).toBeGreaterThan(0)
    })

    it('squares every corner in the centre position', () => {
        expect(
            getButtonV2BorderRadius(
                ButtonV2Size.SMALL,
                ButtonV2Type.PRIMARY,
                ButtonV2SubType.DEFAULT,
                'center',
                tokens
            )
        ).toBe('0px 0px 0px 0px')
    })
})

describe('Button variant matrix', () => {
    const MATRIX = TYPES.flatMap((buttonType) =>
        SIZES.flatMap((size) =>
            SUBTYPES.map((subType) => ({ buttonType, size, subType }))
        )
    )

    it.each(MATRIX)(
        'resolves $buttonType/$size/$subType to valid RN styles',
        ({ buttonType, size, subType }) => {
            const styles = getButtonNativeStyles(
                false,
                buttonType,
                subType,
                size,
                ButtonV2State.DEFAULT,
                tokens
            )

            const surface = resolveSurfaceStyle({
                background: styles.background,
                border: styles.border,
                borderRadius: styles.borderRadius,
                boxShadow: styles.boxShadow,
                paddingTop: styles.padding.top,
                paddingRight: styles.padding.right,
                paddingBottom: styles.padding.bottom,
                paddingLeft: styles.padding.left,
                gap: styles.gap,
                height: styles.height,
            })

            for (const [key, value] of Object.entries(surface)) {
                expect(value, `${key} must not be undefined`).toBeDefined()
                if (typeof value === 'number') {
                    expect(Number.isNaN(value), `${key} must not be NaN`).toBe(
                        false
                    )
                }
            }

            expect(typeof styles.textColor).toBe('string')
            expect(styles.textColor).not.toBe('transparent')
        }
    )

    it('still resolves a background colour for gradient variants', () => {
        // Regression for the loading-state bug: a gradient token must always
        // yield a usable flat fallback, so a surface that cannot render a
        // gradient (loading, or `expo-linear-gradient` absent) never ends up
        // transparent.
        for (const buttonType of TYPES) {
            const styles = getButtonNativeStyles(
                false,
                buttonType,
                ButtonV2SubType.DEFAULT,
                ButtonV2Size.SMALL,
                ButtonV2State.DEFAULT,
                tokens
            )
            const parsed = parseBackground(styles.background)
            if (parsed?.type !== 'gradient') continue

            const surface = resolveSurfaceStyle({
                background: styles.background,
            })
            expect(surface.backgroundColor).toBe(parsed.colors[0])
        }
    })
})
