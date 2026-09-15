import { describe, expect, it } from 'vitest'
import { getCardDarkTokens } from '../../../lib/components/Card/card.dark.tokens'
import { getCardLightTokens } from '../../../lib/components/Card/card.light.tokens'
import { getCardTokens } from '../../../lib/components/Card/card.tokens'
import { CardVariant } from '../../../lib/components/Card/types'
import { Theme } from '../../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../../lib/tokens'

describe('getCardTokens', () => {
    it('keeps the pre-change light output when no theme is provided', () => {
        const tokens = getCardTokens(FOUNDATION_THEME)

        expect(tokens).toEqual(getCardLightTokens(FOUNDATION_THEME))
        expect(tokens.sm.backgroundColor).toBe(FOUNDATION_THEME.colors.gray[0])
        expect(tokens.lg.backgroundColor).toBe(FOUNDATION_THEME.colors.gray[0])
        expect(tokens.sm.header[CardVariant.DEFAULT]?.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[25]
        )
        expect(tokens.lg.header[CardVariant.DEFAULT]?.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[25]
        )
        expect(tokens.sm.header[CardVariant.DEFAULT]?.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.lg.header[CardVariant.DEFAULT]?.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.sm.header.text.title.color).toBe(
            FOUNDATION_THEME.colors.gray[800]
        )
        expect(tokens.lg.header.text.subTitle.color).toBe(
            FOUNDATION_THEME.colors.gray[500]
        )
        expect(tokens.sm.body.text.title.color).toBe(
            FOUNDATION_THEME.colors.gray[800]
        )
        expect(tokens.lg.body.text.content.color).toBe(
            FOUNDATION_THEME.colors.gray[500]
        )
        expect(tokens.sm.border).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[200]}`
        )
        expect(tokens.lg.body.gap[CardVariant.DEFAULT]).toBe(
            FOUNDATION_THEME.unit[16]
        )
    })

    it('dispatches the dark theme token set', () => {
        const darkTokens = getCardTokens(FOUNDATION_THEME, Theme.DARK)

        expect(darkTokens).toEqual(getCardDarkTokens(FOUNDATION_THEME))
        expect(darkTokens.sm.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(darkTokens.lg.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(darkTokens.sm.header[CardVariant.DEFAULT]?.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[800]
        )
        expect(darkTokens.lg.header[CardVariant.DEFAULT]?.borderBottom).toBe(
            `1px solid ${FOUNDATION_THEME.colors.gray[700]}`
        )
        expect(darkTokens.sm.body.text.content.color).toBe(
            FOUNDATION_THEME.colors.gray[300]
        )
        expect(darkTokens.lg.body.text.content.color).toBe(
            FOUNDATION_THEME.colors.gray[300]
        )
        expect(getCardTokens(FOUNDATION_THEME, 'dark')).toEqual(darkTokens)
    })
})
