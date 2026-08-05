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
        expect(tokens.sm.overlay.backgroundColor).toBe('rgba(0, 0, 0, 0.5)')
        expect(tokens.lg.footer.gap).toBe(FOUNDATION_THEME.unit[16])
    })

    it('dispatches dark enum and string themes', () => {
        const darkTokens = getModalComponentTokens(FOUNDATION_THEME, Theme.DARK)

        expect(darkTokens).toEqual(getModalDarkTokens(FOUNDATION_THEME))
        expect(darkTokens.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(darkTokens.sm.header.text.title.color).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(getModalComponentTokens(FOUNDATION_THEME, 'dark')).toEqual(
            darkTokens
        )
    })
})
