import { describe, it, expect } from 'vitest'
import { FOUNDATION_THEME, Theme } from '@juspay/blend-design-system/node'
import { resolveFontFamilies } from '../src/theme/fonts'
import { resolveThemeSetting, SYSTEM_THEME } from '../src/theme/systemTheme'

describe('resolveFontFamilies', () => {
    it('defaults every role to the foundation font tokens', () => {
        const resolved = resolveFontFamilies(FOUNDATION_THEME)
        expect(resolved.body).toBe(String(FOUNDATION_THEME.font.family.body))
        expect(resolved.display).toBe(
            String(FOUNDATION_THEME.font.family.display)
        )
        expect(resolved.heading).toBe(
            String(FOUNDATION_THEME.font.family.heading)
        )
        expect(resolved.mono).toBe(String(FOUNDATION_THEME.font.family.mono))
    })

    it('token defaults are non-empty strings', () => {
        // Guards the access path — if the foundation shape moves, this fails
        // loudly instead of silently resolving every role to null.
        const resolved = resolveFontFamilies(FOUNDATION_THEME)
        for (const value of Object.values(resolved)) {
            expect(typeof value).toBe('string')
            expect((value as string).length).toBeGreaterThan(0)
        }
    })

    it("'system' disables every role", () => {
        const resolved = resolveFontFamilies(FOUNDATION_THEME, 'system')
        expect(resolved).toEqual({
            display: null,
            body: null,
            heading: null,
            mono: null,
        })
    })

    it('a partial map overrides only the named roles', () => {
        const resolved = resolveFontFamilies(FOUNDATION_THEME, {
            mono: 'JetBrainsMono',
        })
        expect(resolved.mono).toBe('JetBrainsMono')
        expect(resolved.body).toBe(String(FOUNDATION_THEME.font.family.body))
    })

    it('null disables a single role, keeping the rest', () => {
        const resolved = resolveFontFamilies(FOUNDATION_THEME, { body: null })
        expect(resolved.body).toBeNull()
        expect(resolved.heading).toBe(
            String(FOUNDATION_THEME.font.family.heading)
        )
    })
})

describe('resolveThemeSetting', () => {
    it('passes explicit themes through untouched', () => {
        expect(resolveThemeSetting(Theme.DARK, 'light')).toBe(Theme.DARK)
        expect(resolveThemeSetting(Theme.LIGHT, 'dark')).toBe(Theme.LIGHT)
        expect(resolveThemeSetting('brand-x', 'dark')).toBe('brand-x')
    })

    it("resolves 'system' from the colour scheme", () => {
        expect(resolveThemeSetting(SYSTEM_THEME, 'dark')).toBe(Theme.DARK)
        expect(resolveThemeSetting(SYSTEM_THEME, 'light')).toBe(Theme.LIGHT)
    })

    it("resolves 'system' to light when the OS reports nothing", () => {
        expect(resolveThemeSetting(SYSTEM_THEME, null)).toBe(Theme.LIGHT)
        expect(resolveThemeSetting(SYSTEM_THEME, undefined)).toBe(Theme.LIGHT)
    })
})
