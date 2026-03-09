import { describe, it, expect } from 'vitest'
import { getPopoverV2DarkToken } from '../../../lib/components/PopoverV2/popoverV2.dark.token'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'
import type { FoundationTokenType } from '../../../lib/tokens/theme.token'
import type { ResponsivePopoverV2Tokens } from '../../../lib/components/PopoverV2/popoverV2.token'

const ft = FOUNDATION_THEME

describe('popoverV2.dark.token', () => {
    describe('getPopoverV2DarkToken', () => {
        it('returns ResponsivePopoverV2Tokens with sm and lg breakpoints', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            expect(tokens).toHaveProperty('sm')
            expect(tokens).toHaveProperty('lg')
            expect(Object.keys(tokens)).toEqual(['sm', 'lg'])
        })

        it('sm: top-level and gap/borderRadius/zIndex', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const sm = tokens.sm

            expect(sm.background).toBe(ft.colors.gray[0])
            expect(sm.border).toBe(ft.border.radius[8])
            expect(sm.shadow).toBe(ft.shadows)
            expect(sm.zIndex).toBe(1000)

            expect(sm.gap.small).toBe(ft.unit[12])
            expect(sm.gap.medium).toBe(ft.unit[12])
            expect(sm.gap.large).toBe(ft.unit[12])

            expect(sm.borderRadius.small).toBe(ft.border.radius[8])
            expect(sm.borderRadius.medium).toBe(ft.border.radius[8])
            expect(sm.borderRadius.large).toBe(ft.border.radius[8])
        })

        it('sm: padding all sides and sizes', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const sm = tokens.sm

            expect(sm.padding.left.small).toBe(ft.unit[16])
            expect(sm.padding.left.medium).toBe(ft.unit[16])
            expect(sm.padding.left.large).toBe(ft.unit[16])
            expect(sm.padding.right.small).toBe(ft.unit[16])
            expect(sm.padding.right.medium).toBe(ft.unit[16])
            expect(sm.padding.right.large).toBe(ft.unit[16])
            expect(sm.padding.top.small).toBe(ft.unit[12])
            expect(sm.padding.top.medium).toBe(ft.unit[12])
            expect(sm.padding.top.large).toBe(ft.unit[12])
            expect(sm.padding.bottom.small).toBe(ft.unit[16])
            expect(sm.padding.bottom.medium).toBe(ft.unit[16])
            expect(sm.padding.bottom.large).toBe(ft.unit[16])
        })

        it('sm: headerContainer.heading all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const h = tokens.sm.headerContainer.heading

            expect(h.fontSize.small).toBe(ft.font.size.body.md.fontSize)
            expect(h.fontSize.medium).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontSize.large).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontWeight.small).toBe(ft.font.weight[600])
            expect(h.fontWeight.medium).toBe(ft.font.weight[600])
            expect(h.fontWeight.large).toBe(ft.font.weight[600])
            expect(h.color).toBe(ft.colors.gray[900])
            expect(h.lineHeight.small).toBe(ft.font.size.body.md.lineHeight)
            expect(h.lineHeight.medium).toBe(ft.font.size.body.lg.lineHeight)
            expect(h.lineHeight.large).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('sm: headerContainer.description all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const d = tokens.sm.headerContainer.description

            expect(d.fontSize.small).toBe(ft.font.size.body.sm.fontSize)
            expect(d.fontSize.medium).toBe(ft.font.size.body.md.fontSize)
            expect(d.fontSize.large).toBe(ft.font.size.body.lg.fontSize)
            expect(d.fontWeight.small).toBe(ft.font.weight[500])
            expect(d.fontWeight.medium).toBe(ft.font.weight[500])
            expect(d.fontWeight.large).toBe(ft.font.weight[500])
            expect(d.color).toBe(ft.colors.gray[500])
            expect(d.lineHeight.small).toBe(ft.font.size.body.sm.lineHeight)
            expect(d.lineHeight.medium).toBe(ft.font.size.body.md.lineHeight)
            expect(d.lineHeight.large).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('sm: footer.gap', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            expect(tokens.sm.footer.gap.small).toBe(ft.unit[12])
            expect(tokens.sm.footer.gap.medium).toBe(ft.unit[12])
            expect(tokens.sm.footer.gap.large).toBe(ft.unit[12])
        })

        it('lg: top-level and gap/borderRadius/zIndex', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const lg = tokens.lg

            expect(lg.background).toBe(ft.colors.gray[900])
            expect(lg.border).toBe(ft.border.radius[8])
            expect(lg.shadow).toBe(ft.shadows)
            expect(lg.zIndex).toBe(1000)

            expect(lg.gap.small).toBe(ft.unit[12])
            expect(lg.gap.medium).toBe(ft.unit[12])
            expect(lg.gap.large).toBe(ft.unit[12])

            expect(lg.borderRadius.small).toBe(ft.border.radius[8])
            expect(lg.borderRadius.medium).toBe(ft.border.radius[8])
            expect(lg.borderRadius.large).toBe(ft.border.radius[8])
        })

        it('lg: padding all sides and sizes', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const lg = tokens.lg

            expect(lg.padding.left.small).toBe(ft.unit[16])
            expect(lg.padding.left.medium).toBe(ft.unit[16])
            expect(lg.padding.left.large).toBe(ft.unit[16])
            expect(lg.padding.right.small).toBe(ft.unit[16])
            expect(lg.padding.right.medium).toBe(ft.unit[16])
            expect(lg.padding.right.large).toBe(ft.unit[16])
            expect(lg.padding.top.small).toBe(ft.unit[12])
            expect(lg.padding.top.medium).toBe(ft.unit[12])
            expect(lg.padding.top.large).toBe(ft.unit[12])
            expect(lg.padding.bottom.small).toBe(ft.unit[16])
            expect(lg.padding.bottom.medium).toBe(ft.unit[16])
            expect(lg.padding.bottom.large).toBe(ft.unit[16])
        })

        it('lg: headerContainer.heading all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const h = tokens.lg.headerContainer.heading

            expect(h.fontSize.small).toBe(ft.font.size.body.md.fontSize)
            expect(h.fontSize.medium).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontSize.large).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontWeight.small).toBe(ft.font.weight[600])
            expect(h.fontWeight.medium).toBe(ft.font.weight[600])
            expect(h.fontWeight.large).toBe(ft.font.weight[600])
            expect(h.color).toBe(ft.colors.gray[0])
            expect(h.lineHeight.small).toBe(ft.font.size.body.md.lineHeight)
            expect(h.lineHeight.medium).toBe(ft.font.size.body.lg.lineHeight)
            expect(h.lineHeight.large).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('lg: headerContainer.description all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const d = tokens.lg.headerContainer.description

            expect(d.fontSize.small).toBe(ft.font.size.body.sm.fontSize)
            expect(d.fontSize.medium).toBe(ft.font.size.body.md.fontSize)
            expect(d.fontSize.large).toBe(ft.font.size.body.lg.fontSize)
            expect(d.fontWeight.small).toBe(ft.font.weight[500])
            expect(d.fontWeight.medium).toBe(ft.font.weight[500])
            expect(d.fontWeight.large).toBe(ft.font.weight[500])
            expect(d.color).toBe(ft.colors.gray[400])
            expect(d.lineHeight.small).toBe(ft.font.size.body.sm.lineHeight)
            expect(d.lineHeight.medium).toBe(ft.font.size.body.md.lineHeight)
            expect(d.lineHeight.large).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('lg: footer.gap', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            expect(tokens.lg.footer.gap.small).toBe(ft.unit[12])
            expect(tokens.lg.footer.gap.medium).toBe(ft.unit[12])
            expect(tokens.lg.footer.gap.large).toBe(ft.unit[12])
        })

        it('returns correct type and uses custom foundation tokens', () => {
            const custom: FoundationTokenType = {
                ...FOUNDATION_THEME,
                colors: {
                    ...FOUNDATION_THEME.colors,
                    gray: {
                        ...FOUNDATION_THEME.colors.gray,
                        0: '#fff',
                        400: '#aaa',
                        500: '#888',
                        900: '#000',
                    },
                },
            }

            const tokens: ResponsivePopoverV2Tokens =
                getPopoverV2DarkToken(custom)

            expect(tokens.sm.background).toBe('#fff')
            expect(tokens.sm.headerContainer.heading.color).toBe('#000')
            expect(tokens.sm.headerContainer.description.color).toBe('#888')

            expect(tokens.lg.background).toBe('#000')
            expect(tokens.lg.headerContainer.heading.color).toBe('#fff')
            expect(tokens.lg.headerContainer.description.color).toBe('#aaa')
        })

        it('returns full token shape for both breakpoints', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)

            const keys = [
                'background',
                'border',
                'shadow',
                'gap',
                'zIndex',
                'borderRadius',
                'padding',
                'headerContainer',
                'footer',
            ] as const

            for (const key of keys) {
                expect(tokens.sm).toHaveProperty(key)
                expect(tokens.lg).toHaveProperty(key)
            }

            expect(tokens.sm.headerContainer).toHaveProperty('heading')
            expect(tokens.sm.headerContainer).toHaveProperty('description')
            expect(tokens.sm.padding).toHaveProperty('left')
            expect(tokens.sm.padding).toHaveProperty('right')
            expect(tokens.sm.padding).toHaveProperty('top')
            expect(tokens.sm.padding).toHaveProperty('bottom')
        })
    })
})
