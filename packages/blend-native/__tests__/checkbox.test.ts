import { describe, it, expect } from 'vitest'
import {
    CheckboxV2CheckedState,
    FOUNDATION_THEME,
    SelectorV2Size,
    Theme,
    getCheckboxV2Tokens,
    type CheckboxV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    parseBorder,
    parseBorderRadius,
    parseDimension,
} from '../src/adapters/cssStringAdapter'

const SIZES = Object.values(SelectorV2Size)
const CHECKED_STATES = Object.values(CheckboxV2CheckedState)
const INTERACTION = ['default', 'error', 'disabled'] as const
const THEMES = [Theme.LIGHT, Theme.DARK]

describe('checkbox token matrix', () => {
    for (const theme of THEMES) {
        const tokens = getCheckboxV2Tokens(FOUNDATION_THEME, theme)
            .sm as CheckboxV2TokensType

        it.each(SIZES.map((s) => [s] as const))(
            `${theme}: %s box geometry parses`,
            (size) => {
                expect(
                    parseDimension(
                        tokens.checkbox.width[size] as string | number
                    )
                ).toBeGreaterThan(0)
                expect(
                    parseBorderRadius(
                        tokens.checkbox.borderRadius[size] as string | number
                    )
                ).toBeDefined()
                expect(
                    parseDimension(
                        tokens.checkbox.icon.width[size] as string | number
                    )
                ).toBeGreaterThan(0)
            }
        )

        it.each(
            CHECKED_STATES.flatMap((c) =>
                INTERACTION.map((i) => [c, i] as const)
            )
        )(`${theme}: %s/%s chrome resolves without junk`, (checked, state) => {
            const bg = tokens.checkbox.backgroundColor[checked]?.[state]
            expect(String(bg)).not.toBe('undefined')
            // Border is either a parseable shorthand or the deliberate
            // transparent/none sentinel — never a half-parsed value.
            const border = String(
                tokens.checkbox.border[checked]?.[state] ?? 'none'
            )
            if (border !== 'transparent' && border !== 'none') {
                const parsed = parseBorder(border)
                expect(parsed.borderWidth).toBeGreaterThan(0)
                expect(parsed.borderColor).toBeTruthy()
            }
        })
    }
})
