import { describe, expect, it } from 'vitest'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import { Theme } from '../../../lib/context/theme.enum'
import initTokens from '../../../lib/context/initComponentTokens'
import {
    getTableToken,
    type ResponsiveTableTokens,
} from '../../../lib/components/DataTable/dataTable.tokens'
import { getTableLightTokens } from '../../../lib/components/DataTable/table.light.tokens'
import { getTableDarkTokens } from '../../../lib/components/DataTable/table.dark.tokens'

const flatten = (
    value: unknown,
    prefix = '',
    output: Record<string, unknown> = {}
): Record<string, unknown> => {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        for (const [key, child] of Object.entries(
            value as Record<string, unknown>
        )) {
            flatten(child, prefix ? `${prefix}.${key}` : key, output)
        }
        return output
    }

    output[prefix] = value
    return output
}

describe('getTableToken theme dispatch', () => {
    const light = getTableLightTokens(FOUNDATION_THEME)
    const dark = getTableDarkTokens(FOUNDATION_THEME)

    it('preserves the pre-change light output when no theme is passed', () => {
        expect(getTableToken(FOUNDATION_THEME)).toStrictEqual(light)
    })

    it('returns light tokens for light and unknown themes', () => {
        expect(getTableToken(FOUNDATION_THEME, Theme.LIGHT)).toStrictEqual(
            light
        )
        expect(getTableToken(FOUNDATION_THEME, 'light')).toStrictEqual(light)
        expect(getTableToken(FOUNDATION_THEME, 'sepia')).toStrictEqual(light)
    })

    it('returns dark tokens for the enum and the provider string value', () => {
        expect(getTableToken(FOUNDATION_THEME, Theme.DARK)).toStrictEqual(dark)
        expect(getTableToken(FOUNDATION_THEME, 'dark')).toStrictEqual(dark)
    })

    it('flows the theme through initTokens', () => {
        expect(
            initTokens({}, FOUNDATION_THEME, Theme.LIGHT)
                .TABLE as ResponsiveTableTokens
        ).toStrictEqual(light)
        expect(
            initTokens({}, FOUNDATION_THEME, Theme.DARK)
                .TABLE as ResponsiveTableTokens
        ).toStrictEqual(dark)
    })
})

describe('DataTable light/dark token parity', () => {
    const light = getTableToken(FOUNDATION_THEME, Theme.LIGHT)
    const dark = getTableToken(FOUNDATION_THEME, Theme.DARK)

    it.each(['sm', 'lg'] as const)(
        'keeps identical %s token key sets across themes',
        (breakpoint) => {
            expect(Object.keys(flatten(dark[breakpoint])).sort()).toEqual(
                Object.keys(flatten(light[breakpoint])).sort()
            )
        }
    )

    it.each(['sm', 'lg'] as const)(
        'recolours the %s table surfaces',
        (breakpoint) => {
            const lightValues = flatten(light[breakpoint])
            const darkValues = flatten(dark[breakpoint])
            const differingKeys = Object.keys(lightValues).filter(
                (key) => lightValues[key] !== darkValues[key]
            )

            expect(differingKeys.length).toBeGreaterThan(0)
        }
    )

    it('covers the major DataTable surfaces in dark mode', () => {
        expect(dark.lg.header.title.color).not.toBe(light.lg.header.title.color)
        expect(dark.lg.dataTable.bulkActions.backgroundColor).not.toBe(
            light.lg.dataTable.bulkActions.backgroundColor
        )
        expect(dark.lg.dataTable.table.header.backgroundColor).not.toBe(
            light.lg.dataTable.table.header.backgroundColor
        )
        expect(dark.lg.dataTable.table.body.backgroundColor).not.toBe(
            light.lg.dataTable.table.body.backgroundColor
        )
        expect(dark.lg.dataTable.table.footer.backgroundColor).not.toBe(
            light.lg.dataTable.table.footer.backgroundColor
        )
        expect(
            dark.lg.dataTable.table.header.filter.selectedBackground
        ).not.toBe(light.lg.dataTable.table.header.filter.selectedBackground)
        expect(
            dark.lg.dataTable.table.body.cell.expandable.expandButton['&:hover']
                .backgroundColor
        ).not.toBe(
            light.lg.dataTable.table.body.cell.expandable.expandButton[
                '&:hover'
            ].backgroundColor
        )
    })
})
