import { describe, it, expect } from 'vitest'
import {
    AvatarV2Shape,
    AvatarV2Size,
    AvatarV2Status,
    AvatarV2StatusPosition,
    FOUNDATION_THEME,
    Theme,
    getAvatarV2Tokens,
    getColorFromText,
    type AvatarV2TokensType,
} from '@juspay/blend-design-system/node'
import {
    getAvatarAccessibleLabel,
    getInitials,
    resolveStatusPosition,
} from '../src/components/Avatar/avatar.utils'
import {
    parseBorder,
    parseBoxShadow,
    parseSize,
} from '../src/adapters/cssStringAdapter'

const SIZES = Object.values(AvatarV2Size)
const SHAPES = Object.values(AvatarV2Shape)
const THEMES = [Theme.LIGHT, Theme.DARK]

describe('avatar token matrix', () => {
    for (const theme of THEMES) {
        const tokens = getAvatarV2Tokens(FOUNDATION_THEME, theme)
            .sm as AvatarV2TokensType

        it.each(
            SHAPES.flatMap((shape) =>
                SIZES.map(
                    (size) => [shape, size] as [AvatarV2Shape, AvatarV2Size]
                )
            )
        )(
            `${theme}: %s/%s resolves sizes, chrome and dot position`,
            (shape, size) => {
                expect(
                    parseSize(tokens.container.width[size] as string)
                ).toBeGreaterThan(0)
                expect(
                    parseSize(tokens.container.height[size] as string)
                ).toBeGreaterThan(0)
                // Status chrome: fractional 0.5px borders and the ring shadow
                // must both survive the parsers.
                const border = parseBorder(
                    String(tokens.container.status.border[size])
                )
                expect(border.borderWidth).toBeGreaterThan(0)
                expect(
                    parseBoxShadow(String(tokens.container.status.boxShadow))
                ).not.toBeNull()
                // Dot offsets are fractional/negative px strings — every corner
                // must resolve to finite numbers.
                for (const position of Object.values(AvatarV2StatusPosition)) {
                    const offsets = resolveStatusPosition(
                        tokens,
                        shape,
                        size,
                        position
                    )
                    for (const value of Object.values(offsets)) {
                        if (value !== undefined) {
                            expect(Number.isFinite(value)).toBe(true)
                        }
                    }
                }
            }
        )
    }
})

describe('avatar fallback', () => {
    it('explicit fallbackText wins and uppercases', () => {
        expect(getInitials('jd', 'Someone Else')).toBe('JD')
        expect(getInitials('abcdef', undefined)).toBe('AB')
    })

    it('derives initials from alt via the shared /node helper', () => {
        expect(getInitials(undefined, 'Jane Doe')).toBe('JD')
        expect(getInitials(undefined, 'Cher')).toBe('C')
    })

    it('hashes the same name to the same palette color as web', () => {
        expect(getColorFromText('jane doe')).toBe(getColorFromText('jane doe'))
        expect(getColorFromText('')).toMatch(/^#/)
    })

    it('folds the status into the accessible name', () => {
        expect(getAvatarAccessibleLabel('Jane', AvatarV2Status.ONLINE)).toBe(
            'Jane, online'
        )
        expect(getAvatarAccessibleLabel('Jane', undefined)).toBe('Jane')
        expect(getAvatarAccessibleLabel(undefined, undefined)).toBe('Avatar')
    })
})
