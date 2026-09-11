import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    TooltipV2Size,
    getTooltipV2Tokens,
    type TooltipV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../src/adapters/cssStringAdapter'

const SIZES = Object.values(TooltipV2Size)
const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const

describe('tooltip token matrix', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getTooltipV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as TooltipV2TokensType

            it.each(SIZES.map((s) => [s] as const))(
                `${theme}/${breakpoint}: %s chrome parses without junk`,
                (size) => {
                    expect(String(tokens.background)).toMatch(/^#|^rgb/)
                    expect(
                        parseDimension(
                            tokens.borderRadius[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                    expect(
                        parseDimension(tokens.maxWidth[size] as string | number)
                    ).toBeGreaterThan(0)
                    // "4px 6px" shorthand: both parts parse.
                    const parts = String(tokens.padding[size])
                        .trim()
                        .split(/\s+/)
                    for (const part of parts) {
                        expect(parseDimension(part)).not.toBeNaN()
                    }
                    expect(String(tokens.text.color)).toMatch(/^#|^rgb/)
                    expect(
                        parseDimension(
                            tokens.text.fontSize[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                    expect(
                        parseDimension(
                            tokens.text.lineHeight[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                }
            )
        }
    }
})
