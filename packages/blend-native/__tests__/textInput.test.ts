import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    InputSizeV2,
    InputStateV2,
    Theme,
    getTextInputV2Tokens,
    type TextInputV2TokensType,
} from '@juspay/blend-design-system/node'
import { getTextInputNativeStyles } from '../src/components/TextInput/textInput.utils'
import { resolveSurfaceStyle } from '../src/adapters/surfaceStyle'

/**
 * Variant matrix for the native TextInput style resolver: every size ×
 * visual state × theme resolves to usable RN values — no `undefined`,
 * `NaN`, or `"undefined"` strings reach a style.
 */

const SIZES = Object.values(InputSizeV2)
const STATES = Object.values(InputStateV2)

const lightTokens = getTextInputV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
    .sm as TextInputV2TokensType
const darkTokens = getTextInputV2Tokens(FOUNDATION_THEME, Theme.DARK)
    .sm as TextInputV2TokensType

const MATRIX = SIZES.flatMap((size) => STATES.map((state) => ({ size, state })))

describe.each([
    ['light', lightTokens],
    ['dark', darkTokens],
])('TextInput styles, %s theme', (_label, tokens) => {
    it.each(MATRIX)('resolves $size/$state cleanly', ({ size, state }) => {
        const styles = getTextInputNativeStyles(tokens, size, state)

        const flat = {
            columnGap: styles.gap,
            ...styles.container,
            ...styles.text,
            placeholderColor: styles.placeholderColor,
        }
        for (const [key, value] of Object.entries(flat)) {
            expect(value, key).toBeDefined()
            expect(value, key).not.toBe('undefined')
        }

        // And the container survives the surface adapter: real border and
        // background, numeric padding, no NaN.
        const surface = resolveSurfaceStyle({
            border: styles.container.border,
            backgroundColor: styles.container.backgroundColor,
            borderRadius: styles.container.borderRadius,
            gap: styles.container.gap,
            paddingTop: styles.container.paddingTop,
            paddingRight: styles.container.paddingRight,
            paddingBottom: styles.container.paddingBottom,
            paddingLeft: styles.container.paddingLeft,
        })
        expect(surface.borderWidth).toBeGreaterThan(0)
        expect(typeof surface.backgroundColor).toBe('string')
        for (const value of Object.values(surface)) {
            if (typeof value === 'number') {
                expect(Number.isNaN(value)).toBe(false)
            }
        }
    })
})

describe('state differentiation', () => {
    it('error, focus and default borders are distinct', () => {
        const border = (state: InputStateV2) =>
            getTextInputNativeStyles(lightTokens, InputSizeV2.MD, state)
                .container.border
        expect(border(InputStateV2.ERROR)).not.toBe(
            border(InputStateV2.DEFAULT)
        )
        expect(border(InputStateV2.FOCUS)).not.toBe(
            border(InputStateV2.DEFAULT)
        )
    })

    it('light and dark resolve different container backgrounds', () => {
        const light = getTextInputNativeStyles(
            lightTokens,
            InputSizeV2.MD,
            InputStateV2.DEFAULT
        )
        const dark = getTextInputNativeStyles(
            darkTokens,
            InputSizeV2.MD,
            InputStateV2.DEFAULT
        )
        expect(light.container.backgroundColor).not.toBe(
            dark.container.backgroundColor
        )
    })
})
