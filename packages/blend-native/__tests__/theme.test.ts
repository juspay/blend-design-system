import { describe, it, expect } from 'vitest'
import {
    BREAKPOINTS,
    FOUNDATION_THEME,
    Theme,
    TagV2Color,
    TagV2Type,
    getTagV2Tokens,
    mergeTokenTree,
    type TagV2TokensType,
} from '@juspay/blend-design-system/node'
import { resolveBreakpoint } from '../src/theme/breakpoint'
import {
    NATIVE_TOKEN_REGISTRY,
    NATIVE_TOKEN_SLOTS,
    isNativeTokenSlot,
} from '../src/theme/nativeTokenRegistry'

describe('resolveBreakpoint', () => {
    it.each([
        [320, 'sm'],
        [375, 'sm'],
        [768, 'sm'],
        [1023, 'sm'],
        [1024, 'lg'],
        [1440, 'lg'],
    ])('maps width %i to %s', (width, expected) => {
        expect(resolveBreakpoint(width)).toBe(expected)
    })

    it('maps widths below the sm threshold to lg, matching web', () => {
        // Deliberately mirrors the quirk in web's `useBreakPoints`: only
        // 320-1023 is 'sm', so anything narrower falls through to 'lg'.
        // Reproduced so a given width resolves identically on both platforms.
        expect(resolveBreakpoint(319)).toBe('lg')
        expect(resolveBreakpoint(0)).toBe('lg')
    })

    it('honours custom thresholds', () => {
        const custom = { sm: 0, lg: 600 }
        expect(resolveBreakpoint(100, custom)).toBe('sm')
        expect(resolveBreakpoint(700, custom)).toBe('lg')
    })

    it('uses the web package thresholds by default', () => {
        expect(BREAKPOINTS).toEqual({ sm: 320, lg: 1024 })
    })
})

describe('nativeTokenRegistry', () => {
    it('registers every currently-shipped component', () => {
        expect(NATIVE_TOKEN_SLOTS.slice().sort()).toEqual([
            'ACCORDIONV2',
            'ALERTV2',
            'AVATARV2',
            'BUTTONV2',
            'CARDV2',
            'CHECKBOXV2',
            'KEYVALUEPAIRV2',
            'PROGRESS_BARV2',
            'RADIOV2',
            'SKELETON',
            'SNACKBARV2',
            'SPINNER',
            'SWITCHV2',
            'TABSV2',
            'TAGV2',
            'TEXT_AREA_V2',
            'TEXT_INPUTV2',
        ])
    })

    it('maps each slot to a callable token factory', () => {
        for (const slot of NATIVE_TOKEN_SLOTS) {
            expect(typeof NATIVE_TOKEN_REGISTRY[slot]).toBe('function')
        }
    })

    it('produces a token object per breakpoint for each slot', () => {
        for (const slot of NATIVE_TOKEN_SLOTS) {
            const responsive = NATIVE_TOKEN_REGISTRY[slot](
                FOUNDATION_THEME,
                Theme.LIGHT
            )
            expect(responsive).toHaveProperty('sm')
            expect(responsive).toHaveProperty('lg')
        }
    })

    it('recognises known slots and rejects unknown ones', () => {
        expect(isNativeTokenSlot('TAGV2')).toBe(true)
        expect(isNativeTokenSlot('BUTTONV2')).toBe(true)
        expect(isNativeTokenSlot('DATATABLE')).toBe(false)
        // Must not be fooled by inherited Object.prototype keys.
        expect(isNativeTokenSlot('toString')).toBe(false)
        expect(isNativeTokenSlot('constructor')).toBe(false)
    })
})

describe('componentTokens overrides', () => {
    // Native shares web's `mergeTokenTree` rather than reimplementing it, so
    // override semantics cannot drift between the two platforms. These tests
    // pin the behaviour native depends on.
    const base = getTagV2Tokens(FOUNDATION_THEME, Theme.LIGHT)

    it('applies a deep override without disturbing sibling paths', () => {
        const merged = mergeTokenTree(base, {
            sm: {
                backgroundColor: {
                    [TagV2Type.SUBTLE]: { [TagV2Color.PRIMARY]: '#FF0000' },
                },
            },
        }) as typeof base

        const smTokens = merged.sm as TagV2TokensType
        expect(
            String(
                smTokens.backgroundColor[TagV2Type.SUBTLE][TagV2Color.PRIMARY]
            )
        ).toBe('#FF0000')

        // A sibling colour under the same type is untouched...
        expect(
            String(
                smTokens.backgroundColor[TagV2Type.SUBTLE][TagV2Color.SUCCESS]
            )
        ).toBe(
            String(
                (base.sm as TagV2TokensType).backgroundColor[TagV2Type.SUBTLE][
                    TagV2Color.SUCCESS
                ]
            )
        )

        // ...as is an entirely different token group.
        expect(String(smTokens.gap)).toBe(
            String((base.sm as TagV2TokensType).gap)
        )
    })

    it('leaves the other breakpoint untouched', () => {
        const merged = mergeTokenTree(base, {
            sm: { gap: '99px' },
        }) as typeof base

        expect(String((merged.sm as TagV2TokensType).gap)).toBe('99px')
        expect(String((merged.lg as TagV2TokensType).gap)).toBe(
            String((base.lg as TagV2TokensType).gap)
        )
    })

    it('returns defaults untouched when there is no override', () => {
        expect(mergeTokenTree(base, undefined)).toBe(base)
    })

    it('skips undefined values inside an override', () => {
        const merged = mergeTokenTree(base, {
            sm: { gap: undefined },
        }) as typeof base
        expect(String((merged.sm as TagV2TokensType).gap)).toBe(
            String((base.sm as TagV2TokensType).gap)
        )
    })

    it('does not mutate the defaults it merges onto', () => {
        const before = String((base.sm as TagV2TokensType).gap)
        mergeTokenTree(base, { sm: { gap: '77px' } })
        expect(String((base.sm as TagV2TokensType).gap)).toBe(before)
    })
})

describe('theme dispatch', () => {
    it('returns different values for light and dark', () => {
        const light = getTagV2Tokens(FOUNDATION_THEME, Theme.LIGHT)
            .sm as TagV2TokensType
        const dark = getTagV2Tokens(FOUNDATION_THEME, Theme.DARK)
            .sm as TagV2TokensType
        expect(
            String(light.backgroundColor[TagV2Type.SUBTLE][TagV2Color.PRIMARY])
        ).not.toBe(
            String(dark.backgroundColor[TagV2Type.SUBTLE][TagV2Color.PRIMARY])
        )
    })

    it('accepts the raw string form of the theme, as web does', () => {
        const viaEnum = getTagV2Tokens(FOUNDATION_THEME, Theme.DARK)
            .sm as TagV2TokensType
        const viaString = getTagV2Tokens(FOUNDATION_THEME, 'dark')
            .sm as TagV2TokensType
        expect(String(viaString.gap)).toBe(String(viaEnum.gap))
        expect(
            String(
                viaString.backgroundColor[TagV2Type.SUBTLE][TagV2Color.PRIMARY]
            )
        ).toBe(
            String(
                viaEnum.backgroundColor[TagV2Type.SUBTLE][TagV2Color.PRIMARY]
            )
        )
    })
})
