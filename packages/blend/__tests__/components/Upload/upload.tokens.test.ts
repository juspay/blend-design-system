import { describe, expect, it } from 'vitest'
import { getUploadDarkTokens } from '../../../lib/components/Upload/upload.dark.tokens'
import { getUploadLightTokens } from '../../../lib/components/Upload/upload.light.tokens'
import { getUploadTokens } from '../../../lib/components/Upload/upload.tokens'
import { Theme } from '../../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../../lib/tokens'

describe('getUploadTokens', () => {
    it('keeps the pre-change light output when no theme is provided', () => {
        const tokens = getUploadTokens(FOUNDATION_THEME)

        expect(tokens).toEqual(getUploadLightTokens(FOUNDATION_THEME))
        expect(tokens.sm.container.backgroundColor.idle).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(tokens.lg.container.content.actionable.gap).toBe(
            FOUNDATION_THEME.unit[24]
        )
    })

    it('dispatches the dark theme token set', () => {
        const darkTokens = getUploadTokens(FOUNDATION_THEME, Theme.DARK)

        expect(darkTokens).toEqual(getUploadDarkTokens(FOUNDATION_THEME))
        expect(darkTokens.sm.container.backgroundColor.idle).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(darkTokens.sm.container.border.dragActive).toBe(
            `1px dashed ${FOUNDATION_THEME.colors.primary[500]}`
        )
        expect(darkTokens.sm.container.content.text.subtitle.color).toBe(
            FOUNDATION_THEME.colors.gray[400]
        )
        expect(darkTokens.sm.container.content.actionable.errorText.color).toBe(
            FOUNDATION_THEME.colors.red[400]
        )
        expect(getUploadTokens(FOUNDATION_THEME, 'dark')).toEqual(darkTokens)
    })
})
