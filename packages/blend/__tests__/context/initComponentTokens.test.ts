import { describe, it, expect } from 'vitest'
import initTokens from '../../lib/context/initComponentTokens'
import type { ComponentTokenType } from '../../lib/context/ThemeContext'
import { Theme } from '../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../lib/tokens'

const EMPTY: ComponentTokenType = {}

describe('initTokens memoisation', () => {
    it('returns the same object for identical inputs', () => {
        const first = initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)
        const second = initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)

        expect(second).toBe(first)
    })

    it('returns a different object per theme', () => {
        const light = initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)
        const dark = initTokens(EMPTY, FOUNDATION_THEME, Theme.DARK)

        expect(dark).not.toBe(light)
    })

    it('passes the theme to legacy surface token fallbacks', () => {
        const light = initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)
        const dark = initTokens(EMPTY, FOUNDATION_THEME, Theme.DARK)

        expect(light.MODAL.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(dark.MODAL.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(dark.CARD.sm.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(dark.UPLOAD.sm.container.backgroundColor.idle).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )

        const modalOverride = { sm: {}, lg: {} } as ComponentTokenType['MODAL']
        const overridden = initTokens(
            { MODAL: modalOverride },
            FOUNDATION_THEME,
            Theme.DARK
        )
        expect(overridden.MODAL).toBe(modalOverride)
    })

    it('returns a different object for a different componentTokens reference', () => {
        const overrideA: ComponentTokenType = {
            BUTTONV2: { sm: {}, lg: {} } as ComponentTokenType['BUTTONV2'],
        }
        const overrideB: ComponentTokenType = {
            BUTTONV2: { sm: {}, lg: {} } as ComponentTokenType['BUTTONV2'],
        }

        const a = initTokens(overrideA, FOUNDATION_THEME, Theme.LIGHT)
        const b = initTokens(overrideB, FOUNDATION_THEME, Theme.LIGHT)

        expect(a).not.toBe(b)
        expect(a.BUTTONV2).toBe(overrideA.BUTTONV2)
        expect(b.BUTTONV2).toBe(overrideB.BUTTONV2)
        expect(initTokens(overrideA, FOUNDATION_THEME, Theme.LIGHT)).toBe(a)
    })

    it('returns a different object for a different foundationTokens reference', () => {
        const forkedFoundation = { ...FOUNDATION_THEME }

        expect(initTokens(EMPTY, forkedFoundation, Theme.LIGHT)).not.toBe(
            initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)
        )
    })

    it('treats a missing componentTokens argument as an empty override', () => {
        const first = initTokens(
            undefined as unknown as ComponentTokenType,
            FOUNDATION_THEME,
            Theme.LIGHT
        )
        const second = initTokens(
            undefined as unknown as ComponentTokenType,
            FOUNDATION_THEME,
            Theme.LIGHT
        )

        expect(second).toBe(first)
        expect(first.BUTTONV2).toBeDefined()
    })
})
