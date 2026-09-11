import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    getModalV2Tokens,
    type ModalV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../src/adapters/cssStringAdapter'

const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const

describe('modal token matrix (flat — no size axis)', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getModalV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as ModalV2TokensType

            it(`${theme}/${breakpoint}: surface and overlay chrome parse`, () => {
                expect(String(tokens.backgroundColor)).toMatch(/^#|^rgb/)
                expect(String(tokens.overlay.backgroundColor)).toMatch(
                    /^#|^rgb/
                )
                expect(
                    parseDimension(tokens.borderRadius as string | number)
                ).toBeGreaterThan(0)
                expect(
                    parseDimension(tokens.overlay.offset as string | number)
                ).toBeGreaterThan(0)
            })

            it(`${theme}/${breakpoint}: header/body/footer sections parse`, () => {
                for (const section of ['header', 'body', 'footer'] as const) {
                    const s = tokens[section]
                    for (const edge of [
                        'paddingTop',
                        'paddingBottom',
                        'paddingLeft',
                        'paddingRight',
                    ] as const) {
                        expect(
                            parseDimension(s[edge] as string | number)
                        ).toBeGreaterThanOrEqual(0)
                    }
                }
                const headerDivider = parseBorder(
                    String(tokens.header.borderBottom)
                )
                expect(headerDivider.borderColor).toBeDefined()
                const footerDivider = parseBorder(
                    String(tokens.footer.borderTop)
                )
                expect(footerDivider.borderColor).toBeDefined()
                expect(String(tokens.header.text.title.color)).toMatch(
                    /^#|^rgb/
                )
                expect(String(tokens.header.text.subtitle.color)).toMatch(
                    /^#|^rgb/
                )
                expect(String(tokens.closeButton.color)).toMatch(/^#|^rgb/)
            })
        }
    }
})
