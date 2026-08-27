import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    SelectV2Size,
    SelectV2Variant,
    Theme,
    getSingleSelectV2Tokens,
    type SingleSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../src/adapters/cssStringAdapter'

const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const
const SIZES = Object.values(SelectV2Size)
const VARIANTS = Object.values(SelectV2Variant)
const TRIGGER_STATES = ['open', 'closed', 'error'] as const

describe('single select token matrix', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getSingleSelectV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as SingleSelectV2TokensType

            it.each(SIZES.flatMap((s) => VARIANTS.map((v) => [s, v] as const)))(
                `${theme}/${breakpoint}: %s/%s trigger geometry parses`,
                (size, variant) => {
                    const trigger = tokens.trigger
                    expect(
                        parseDimension(
                            trigger.height?.[size]?.[variant] as string | number
                        )
                    ).toBeGreaterThan(0)
                    expect(
                        parseDimension(
                            trigger.borderRadius?.[size]?.[variant] as
                                | string
                                | number
                        )
                    ).toBeGreaterThan(0)
                    for (const edge of [
                        'top',
                        'right',
                        'bottom',
                        'left',
                    ] as const) {
                        expect(
                            parseDimension(
                                trigger.padding?.[size]?.[variant]?.[edge] as
                                    | string
                                    | number
                            )
                        ).toBeGreaterThanOrEqual(0)
                    }
                }
            )

            it.each(TRIGGER_STATES.map((s) => [s] as const))(
                `${theme}/${breakpoint}: container %s chrome resolves`,
                (state) => {
                    const bg =
                        tokens.trigger.backgroundColor?.container?.[state]
                    expect(String(bg)).not.toBe('undefined')
                    // The !important suffix is a CSS-specificity artifact —
                    // stripped by SelectTrigger before parseBorder.
                    const outline = String(
                        tokens.trigger.outline?.container?.[state] ?? ''
                    ).replace(/\s*!important\s*$/, '')
                    if (outline && outline !== 'none') {
                        const parsed = parseBorder(outline)
                        expect(parsed.borderColor).toBeDefined()
                        expect(parsed.borderWidth).toBeGreaterThan(0)
                    }
                }
            )

            it(`${theme}/${breakpoint}: panel + dropdown chrome parses`, () => {
                const header = tokens.mobilePanel?.header
                expect(
                    parseBorder(String(header?.borderBottom)).borderColor
                ).toBeDefined()
                const content = tokens.menu.content
                expect(String(content?.backgroundColor)).toMatch(/^#|^rgb/)
                expect(
                    parseBorder(String(content?.border)).borderColor
                ).toBeDefined()
                expect(String(tokens.label?.color?.default)).toMatch(/^#|^rgb/)
                expect(String(tokens.errorMessage?.color)).toMatch(/^#|^rgb/)
            })
        }
    }
})
