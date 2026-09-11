import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    PopoverV2Size,
    Theme,
    getPopoverV2Tokens,
    type PopoverV2TokenType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../src/adapters/cssStringAdapter'

const SIZES = Object.values(PopoverV2Size)
const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const

describe('popover token matrix', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getPopoverV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as PopoverV2TokenType

            it.each(SIZES.map((s) => [s] as const))(
                `${theme}/${breakpoint}: %s chrome parses without junk`,
                (size) => {
                    expect(String(tokens.background)).toMatch(/^#|^rgb/)
                    expect(
                        parseDimension(
                            tokens.borderRadius[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                    for (const edge of [
                        'top',
                        'bottom',
                        'left',
                        'right',
                    ] as const) {
                        expect(
                            parseDimension(
                                tokens.padding[edge][size] as string | number
                            )
                        ).toBeGreaterThan(0)
                    }
                    expect(
                        parseDimension(tokens.gap[size] as string | number)
                    ).toBeGreaterThan(0)
                    const top = tokens.TopContainer
                    expect(String(top.heading.color)).toMatch(/^#|^rgb/)
                    expect(String(top.description.color)).toMatch(/^#|^rgb/)
                    expect(
                        parseDimension(
                            top.heading.fontSize[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                    expect(
                        parseDimension(
                            top.heading.IconSize[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                    expect(
                        parseDimension(
                            tokens.bottomContainer.gap[size] as string | number
                        )
                    ).toBeGreaterThan(0)
                }
            )
        }
    }

    it('documents the invalid border token upstream finding', () => {
        // Web's POPOVERV2 border token holds a bare length ("8px") — an
        // invalid CSS border shorthand that browsers silently drop, so no
        // border renders on web and native draws none either. If this ever
        // becomes a real shorthand, wire it up in Popover.tsx.
        const border = String(
            (
                getPopoverV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
                    .sm as PopoverV2TokenType
            ).border
        )
        expect(border).not.toMatch(/solid|dashed/)
    })
})
