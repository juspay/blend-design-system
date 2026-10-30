import { describe, it, expect } from 'vitest'
import {
    AvatarV2Shape,
    AvatarV2Size,
    FOUNDATION_THEME,
    Theme,
    getAvatarGroupTokens,
    type AvatarGroupTokensType,
} from '@juspay/blend-design-system/node'
import {
    getAvatarName,
    getGroupLabel,
    getItemLabel,
    getOverflowLabel,
    getPositionHint,
    splitAvatars,
    toggleSelection,
} from '../src/components/AvatarGroup/avatarGroup.utils'
import { parseDimension, parseSize } from '../src/adapters/cssStringAdapter'

describe('splitAvatars', () => {
    const list = [1, 2, 3, 4, 5, 6, 7]

    it('splits at maxCount', () => {
        expect(splitAvatars(list, 5)).toEqual({
            visible: [1, 2, 3, 4, 5],
            overflow: [6, 7],
        })
    })

    it('never shows fewer than one avatar', () => {
        expect(splitAvatars(list, 0).visible).toEqual([1])
        expect(splitAvatars(list, -3).overflow).toHaveLength(6)
    })

    it('has no overflow when everything fits', () => {
        expect(splitAvatars(list, 10).overflow).toEqual([])
    })
})

describe('toggleSelection', () => {
    it('adds an unselected id and removes a selected one', () => {
        expect(toggleSelection([], 'a')).toEqual(['a'])
        expect(toggleSelection(['a', 'b'], 'a')).toEqual(['b'])
    })

    it('does not mutate the input', () => {
        const input = ['a']
        toggleSelection(input, 'b')
        expect(input).toEqual(['a'])
    })
})

describe('labels', () => {
    it('names an avatar from alt, then fallbackText, then its id', () => {
        expect(getAvatarName({ id: 1, alt: 'Priya', fallbackText: 'PR' })).toBe(
            'Priya'
        )
        expect(getAvatarName({ id: 1, fallbackText: 'PR' })).toBe('PR')
        expect(getAvatarName({ id: 7 })).toBe('Avatar 7')
    })

    it('builds group, item, position and overflow labels', () => {
        expect(getGroupLabel(4, 0)).toBe('Group of 4 avatars')
        expect(getGroupLabel(4, 2)).toBe('Group of 4 avatars, 2 selected')
        expect(getItemLabel('Priya', true)).toBe('Priya, selected')
        expect(getItemLabel('Priya', false)).toBe('Priya')
        expect(getPositionHint(0, 5, 0)).toBe('Avatar 1 of 5')
        expect(getPositionHint(1, 5, 3)).toBe('Avatar 2 of 5, 3 more available')
        expect(getOverflowLabel(1)).toBe(
            '1 more avatar, press to view and select'
        )
        expect(getOverflowLabel(3)).toBe(
            '3 more avatars, press to view and select'
        )
    })
})

describe('AVATAR_GROUP token resolution', () => {
    const sizes = Object.values(AvatarV2Size) as string[]
    const shapes = Object.values(AvatarV2Shape) as string[]

    it.each([Theme.LIGHT, Theme.DARK])(
        '%s: every size and shape the component indexes resolves',
        (theme) => {
            const resolved = getAvatarGroupTokens(FOUNDATION_THEME, theme)
            for (const bp of ['sm', 'lg'] as const) {
                const tokens = resolved[bp] as AvatarGroupTokensType
                for (const size of sizes) {
                    const key = size as keyof typeof tokens.container.marginLeft
                    expect(
                        parseDimension(
                            tokens.container.marginLeft[key] as string
                        )
                    ).toBeGreaterThan(0)
                    const counter = tokens.overflowCounter.size[key]
                    expect(parseSize(counter.width as string)).toBeGreaterThan(
                        0
                    )
                    expect(parseSize(counter.height as string)).toBeGreaterThan(
                        0
                    )
                    expect(Number(counter.fontSize)).toBeGreaterThan(0)
                }
                for (const shape of shapes) {
                    const key =
                        shape as keyof typeof tokens.overflowCounter.borderRadius
                    expect(
                        tokens.overflowCounter.borderRadius[key]
                    ).toBeTruthy()
                }
                expect(
                    parseDimension(tokens.avatar.border.width as string)
                ).toBe(2)
                expect(
                    parseDimension(tokens.avatar.selected.ringWidth as string)
                ).toBe(2)
            }
        }
    )
})
