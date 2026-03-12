import { describe, it, expect } from 'vitest'
import { getPopoverV2DarkToken } from '../../../lib/components/PopoverV2/popoverV2.dark.tokens'
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

            expect(sm.gap.sm).toBe(ft.unit[12])
            expect(sm.gap.md).toBe(ft.unit[12])
            expect(sm.gap.lg).toBe(ft.unit[12])

            expect(sm.borderRadius.sm).toBe(ft.border.radius[8])
            expect(sm.borderRadius.md).toBe(ft.border.radius[8])
            expect(sm.borderRadius.lg).toBe(ft.border.radius[8])
        })

        it('sm: padding all sides and sizes', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const sm = tokens.sm

            expect(sm.padding.left.sm).toBe(ft.unit[16])
            expect(sm.padding.left.md).toBe(ft.unit[16])
            expect(sm.padding.left.lg).toBe(ft.unit[16])
            expect(sm.padding.right.sm).toBe(ft.unit[16])
            expect(sm.padding.right.md).toBe(ft.unit[16])
            expect(sm.padding.right.lg).toBe(ft.unit[16])
            expect(sm.padding.top.sm).toBe(ft.unit[12])
            expect(sm.padding.top.md).toBe(ft.unit[12])
            expect(sm.padding.top.lg).toBe(ft.unit[12])
            expect(sm.padding.bottom.sm).toBe(ft.unit[16])
            expect(sm.padding.bottom.md).toBe(ft.unit[16])
            expect(sm.padding.bottom.lg).toBe(ft.unit[16])
        })

        it('sm: TopContainer.heading all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const h = tokens.sm.TopContainer.heading

            expect(h.fontSize.sm).toBe(ft.font.size.body.md.fontSize)
            expect(h.fontSize.md).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontSize.lg).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontSize.lg).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontWeight.sm).toBe(ft.font.weight[600])
            expect(h.fontWeight.md).toBe(ft.font.weight[600])
            expect(h.fontWeight.lg).toBe(ft.font.weight[600])
            expect(h.color).toBe(ft.colors.gray[900])
            expect(h.lineHeight.sm).toBe(ft.font.size.body.md.lineHeight)
            expect(h.lineHeight.md).toBe(ft.font.size.body.lg.lineHeight)
            expect(h.lineHeight.lg).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('sm: TopContainer.description all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const d = tokens.sm.TopContainer.description

            expect(d.fontSize.sm).toBe(ft.font.size.body.sm.fontSize)
            expect(d.fontSize.md).toBe(ft.font.size.body.md.fontSize)
            expect(d.fontSize.lg).toBe(ft.font.size.body.lg.fontSize)
            expect(d.fontWeight.sm).toBe(ft.font.weight[500])
            expect(d.fontWeight.md).toBe(ft.font.weight[500])
            expect(d.fontWeight.lg).toBe(ft.font.weight[500])
            expect(d.color).toBe(ft.colors.gray[500])
            expect(d.lineHeight.sm).toBe(ft.font.size.body.sm.lineHeight)
            expect(d.lineHeight.md).toBe(ft.font.size.body.md.lineHeight)
            expect(d.lineHeight.lg).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('sm: footer.gap', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            expect(tokens.sm.bottomContainer.gap.sm).toBe(ft.unit[12])
            expect(tokens.sm.bottomContainer.gap.md).toBe(ft.unit[12])
            expect(tokens.sm.bottomContainer.gap.lg).toBe(ft.unit[12])
        })

        it('lg: top-level and gap/borderRadius/zIndex', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const lg = tokens.lg

            expect(lg.background).toBe(ft.colors.gray[900])
            expect(lg.border).toBe(ft.border.radius[8])
            expect(lg.shadow).toBe(ft.shadows)
            expect(lg.zIndex).toBe(1000)

            expect(lg.gap.sm).toBe(ft.unit[12])
            expect(lg.gap.md).toBe(ft.unit[12])
            expect(lg.gap.lg).toBe(ft.unit[12])

            expect(lg.borderRadius.sm).toBe(ft.border.radius[8])
            expect(lg.borderRadius.md).toBe(ft.border.radius[8])
            expect(lg.borderRadius.lg).toBe(ft.border.radius[8])
        })

        it('lg: padding all sides and sizes', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const lg = tokens.lg

            expect(lg.padding.left.sm).toBe(ft.unit[16])
            expect(lg.padding.left.md).toBe(ft.unit[16])
            expect(lg.padding.left.lg).toBe(ft.unit[16])
            expect(lg.padding.right.sm).toBe(ft.unit[16])
            expect(lg.padding.right.md).toBe(ft.unit[16])
            expect(lg.padding.right.lg).toBe(ft.unit[16])
            expect(lg.padding.top.sm).toBe(ft.unit[12])
            expect(lg.padding.top.md).toBe(ft.unit[12])
            expect(lg.padding.top.lg).toBe(ft.unit[12])
            expect(lg.padding.bottom.sm).toBe(ft.unit[16])
            expect(lg.padding.bottom.md).toBe(ft.unit[16])
            expect(lg.padding.bottom.lg).toBe(ft.unit[16])
        })

        it('lg: TopContainer.heading all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const h = tokens.lg.TopContainer.heading

            expect(h.fontSize.sm).toBe(ft.font.size.body.md.fontSize)
            expect(h.fontSize.md).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontSize.lg).toBe(ft.font.size.body.lg.fontSize)
            expect(h.fontWeight.sm).toBe(ft.font.weight[600])
            expect(h.fontWeight.md).toBe(ft.font.weight[600])
            expect(h.fontWeight.lg).toBe(ft.font.weight[600])
            expect(h.color).toBe(ft.colors.gray[0])
            expect(h.lineHeight.sm).toBe(ft.font.size.body.md.lineHeight)
            expect(h.lineHeight.md).toBe(ft.font.size.body.lg.lineHeight)
            expect(h.lineHeight.lg).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('lg: TopContainer.description all keys', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            const d = tokens.lg.TopContainer.description

            expect(d.fontSize.sm).toBe(ft.font.size.body.sm.fontSize)
            expect(d.fontSize.md).toBe(ft.font.size.body.md.fontSize)
            expect(d.fontSize.lg).toBe(ft.font.size.body.lg.fontSize)
            expect(d.fontWeight.sm).toBe(ft.font.weight[500])
            expect(d.fontWeight.md).toBe(ft.font.weight[500])
            expect(d.fontWeight.lg).toBe(ft.font.weight[500])
            expect(d.color).toBe(ft.colors.gray[400])
            expect(d.lineHeight.sm).toBe(ft.font.size.body.sm.lineHeight)
            expect(d.lineHeight.md).toBe(ft.font.size.body.md.lineHeight)
            expect(d.lineHeight.lg).toBe(ft.font.size.body.lg.lineHeight)
        })

        it('lg: footer.gap', () => {
            const tokens = getPopoverV2DarkToken(FOUNDATION_THEME)
            expect(tokens.lg.bottomContainer.gap.sm).toBe(ft.unit[12])
            expect(tokens.lg.bottomContainer.gap.md).toBe(ft.unit[12])
            expect(tokens.lg.bottomContainer.gap.lg).toBe(ft.unit[12])
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
            expect(tokens.sm.TopContainer.heading.color).toBe('#000')
            expect(tokens.sm.TopContainer.description.color).toBe('#888')

            expect(tokens.lg.background).toBe('#000')
            expect(tokens.lg.TopContainer.heading.color).toBe('#fff')
            expect(tokens.lg.TopContainer.description.color).toBe('#aaa')
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
                'TopContainer',
                'bottomContainer',
            ] as const

            for (const key of keys) {
                expect(tokens.sm).toHaveProperty(key)
                expect(tokens.lg).toHaveProperty(key)
            }

            expect(tokens.sm.TopContainer).toHaveProperty('heading')
            expect(tokens.sm.TopContainer).toHaveProperty('description')
            expect(tokens.sm.TopContainer).toHaveProperty('gap')
            expect(tokens.sm.padding).toHaveProperty('left')
            expect(tokens.sm.padding).toHaveProperty('right')
            expect(tokens.sm.padding).toHaveProperty('top')
            expect(tokens.sm.padding).toHaveProperty('bottom')
        })
    })
})
