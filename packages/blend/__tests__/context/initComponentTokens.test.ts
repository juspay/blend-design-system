import { describe, it, expect } from 'vitest'
import initTokens from '../../lib/context/initComponentTokens'
import type { ComponentTokenOverrides } from '../../lib/context/ThemeContext'
import { Theme } from '../../lib/context/theme.enum'
import { FOUNDATION_THEME } from '../../lib/tokens'

const EMPTY: ComponentTokenOverrides = {}

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
        expect(light.CARD.sm.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[0]
        )
        expect(light.UPLOAD.sm.container.backgroundColor.idle).toBe(
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

        const modalOverride: ComponentTokenOverrides['MODAL'] = {
            sm: {},
            lg: {},
        }
        const cardOverride: ComponentTokenOverrides['CARD'] = {
            sm: {},
            lg: {},
        }
        const uploadOverride = {
            sm: {},
            lg: {},
        } satisfies ComponentTokenOverrides['UPLOAD']
        const overridden = initTokens(
            {
                MODAL: modalOverride,
                CARD: cardOverride,
                UPLOAD: uploadOverride,
            },
            FOUNDATION_THEME,
            Theme.DARK
        )
        expect(overridden.MODAL).not.toBe(modalOverride)
        expect(overridden.CARD).not.toBe(cardOverride)
        expect(overridden.UPLOAD).not.toBe(uploadOverride)
        expect(overridden.MODAL.sm.body.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(overridden.CARD.sm.backgroundColor).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(overridden.UPLOAD.sm.container.backgroundColor.idle).toBe(
            FOUNDATION_THEME.colors.gray[900]
        )
    })

    it('merges partial ButtonV2 overrides onto dark defaults', () => {
        const dark = initTokens(EMPTY, FOUNDATION_THEME, Theme.DARK)
        const customFocusRing = '0 0 0 4px rgb(1, 2, 3)'
        const overrides: ComponentTokenOverrides = {
            BUTTONV2: {
                sm: {
                    focusRing: {
                        primary: { default: customFocusRing },
                    },
                },
                lg: {
                    focusRing: {
                        primary: { default: customFocusRing },
                    },
                },
            },
        }

        const resolved = initTokens(overrides, FOUNDATION_THEME, Theme.DARK)

        expect(resolved.BUTTONV2.lg.focusRing.primary.default).toBe(
            customFocusRing
        )
        expect(
            resolved.BUTTONV2.lg.backgroundColor.primary.default.default
        ).toBe(dark.BUTTONV2.lg.backgroundColor.primary.default.default)
    })

    it('dispatches the calendar token slice for the active theme', () => {
        const light = initTokens(EMPTY, FOUNDATION_THEME, Theme.LIGHT)
        const dark = initTokens(EMPTY, FOUNDATION_THEME, Theme.DARK)

        expect(dark.CALENDAR?.lg.calendar.backgroundColor).not.toBe(
            light.CALENDAR?.lg.calendar.backgroundColor
        )
        expect(
            dark.CALENDAR?.lg.calendar.calendarGrid.day.text.dayNumber.color
        ).not.toBe(
            light.CALENDAR?.lg.calendar.calendarGrid.day.text.dayNumber.color
        )
    })

    it('returns a different object for a different componentTokens reference', () => {
        const overrideA: ComponentTokenOverrides = {
            BUTTONV2: { sm: {}, lg: {} },
        }
        const overrideB: ComponentTokenOverrides = {
            BUTTONV2: { sm: {}, lg: {} },
        }

        const a = initTokens(overrideA, FOUNDATION_THEME, Theme.LIGHT)
        const b = initTokens(overrideB, FOUNDATION_THEME, Theme.LIGHT)

        expect(a).not.toBe(b)
        expect(a.BUTTONV2).not.toBe(overrideA.BUTTONV2)
        expect(b.BUTTONV2).not.toBe(overrideB.BUTTONV2)
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
            undefined as unknown as ComponentTokenOverrides,
            FOUNDATION_THEME,
            Theme.LIGHT
        )
        const second = initTokens(
            undefined as unknown as ComponentTokenOverrides,
            FOUNDATION_THEME,
            Theme.LIGHT
        )

        expect(second).toBe(first)
        expect(first.BUTTONV2).toBeDefined()
    })
})
