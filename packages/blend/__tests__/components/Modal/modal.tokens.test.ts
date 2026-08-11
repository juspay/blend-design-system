import { describe, expect, it } from 'vitest'
import { getModalDarkTokens } from '../../../lib/components/Modal/modal.dark.tokens'
import { getModalLightTokens } from '../../../lib/components/Modal/modal.light.tokens'
import { getModalComponentTokens } from '../../../lib/components/Modal/modal.tokens'
import { Theme } from '../../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../../lib/tokens'

describe('getModalComponentTokens', () => {
    it('keeps the pre-change light output when no theme is provided', () => {
        const tokens = getModalComponentTokens(FOUNDATION_THEME)

        expect(tokens).toEqual(getModalLightTokens(FOUNDATION_THEME))
        expect(tokens.sm.boxShadow).toBe(FOUNDATION_THEME.shadows.xs)
        expect(tokens.lg.boxShadow).toBe(FOUNDATION_THEME.shadows.lg)
        expect(tokens.sm.borderRadius).toBe(FOUNDATION_THEME.border.radius[12])
        expect(tokens.lg.borderRadius).toBe(FOUNDATION_THEME.border.radius[16])
        expect(tokens.sm.header.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.lg.header.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.sm.header.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.lg.header.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.lg.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.sm.footer.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.lg.footer.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.sm.footer.borderTop).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.lg.footer.borderTop).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.sm.closeButton.color).toBe(
            FOUNDATION_THEME.colors.gray[500]
        )
        expect(tokens.lg.closeButton.color).toBe(
            FOUNDATION_THEME.colors.gray[500]
        )
        expect(tokens.sm.overlay.backgroundColor).toBe('rgba(0, 0, 0, 0.5)')
        expect(tokens.lg.footer.gap).toBe(FOUNDATION_THEME.unit[16])
    })

    it('dispatches dark enum and string themes', () => {
        const darkTokens = getModalComponentTokens(FOUNDATION_THEME, Theme.DARK)

        expect(darkTokens).toEqual(getModalDarkTokens(FOUNDATION_THEME))
        expect(darkTokens.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(darkTokens.lg.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(darkTokens.sm.header.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[600]}`
        )
        expect(darkTokens.lg.header.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[600]}`
        )
        expect(darkTokens.sm.footer.borderTop).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[600]}`
        )
        expect(darkTokens.lg.footer.borderTop).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[600]}`
        )
        expect(darkTokens.sm.header.text.title.color).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(getModalComponentTokens(FOUNDATION_THEME, 'dark')).toEqual(
            darkTokens
        )
    })
})
