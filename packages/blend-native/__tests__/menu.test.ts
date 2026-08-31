import { describe, it, expect } from 'vitest'
import {
    FOUNDATION_THEME,
    Theme,
    flattenMenuV2Groups,
    filterMenuV2Groups,
    getMenuV2Tokens,
    type MenuV2GroupType,
    type MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../src/adapters/cssStringAdapter'

const THEMES = [Theme.LIGHT, Theme.DARK]
const BREAKPOINTS = ['sm', 'lg'] as const
const VARIANT_PATHS = ['default', 'action.primary', 'action.danger'] as const
const STATES = ['default', 'active', 'disabled', 'selected'] as const

const dig = (node: unknown, path: string): unknown =>
    path
        .split('.')
        .reduce((acc, key) => (acc as Record<string, unknown>)?.[key], node)

describe('menu token matrix', () => {
    for (const theme of THEMES) {
        for (const breakpoint of BREAKPOINTS) {
            const tokens = getMenuV2Tokens(FOUNDATION_THEME, theme)[
                breakpoint
            ] as MenuV2TokensType

            it(`${theme}/${breakpoint}: surface chrome parses`, () => {
                expect(String(tokens.backgroundColor)).toMatch(/^#|^rgb/)
                expect(
                    parseBorder(String(tokens.border)).borderColor
                ).toBeDefined()
                expect(
                    parseDimension(tokens.borderRadius as string | number)
                ).toBeGreaterThan(0)
                expect(
                    parseDimension(tokens.minWidth as string | number)
                ).toBeGreaterThan(0)
            })

            it.each(
                VARIANT_PATHS.flatMap((v) => STATES.map((s) => [v, s] as const))
            )(
                `${theme}/${breakpoint}: %s/%s item colours resolve`,
                (variant, state) => {
                    const item = tokens.group.item
                    for (const base of [
                        'backgroundColor',
                        'text.color',
                        'text.subText.color',
                    ]) {
                        const value = dig(item, `${base}.${variant}.${state}`)
                        expect(String(value)).toMatch(/^#|^rgb/)
                    }
                }
            )
        }
    }
})

describe('menu list flattening (node utils on native item shapes)', () => {
    const groups = [
        {
            label: 'Payouts',
            items: [
                { label: { text: 'Settle now' }, onPress: () => {} },
                { label: { text: 'Schedule' }, disabled: true },
            ],
            showSeparator: true,
        },
        {
            items: [
                {
                    label: { text: 'Danger zone' },
                    variant: 'action',
                    actionType: 'danger',
                },
            ],
        },
    ] as unknown as MenuV2GroupType[]

    it('flattens labels, items and separators in order', () => {
        const rows = flattenMenuV2Groups(groups)
        expect(rows.map((r) => r.type)).toEqual([
            'label',
            'item',
            'item',
            'separator',
            'item',
        ])
    })

    it('filters by label text', () => {
        const filtered = filterMenuV2Groups(groups, 'settle')
        expect(filtered).toHaveLength(1)
        expect(filtered[0].items).toHaveLength(1)
        expect(filtered[0].items[0].label.text).toBe('Settle now')
    })
})
