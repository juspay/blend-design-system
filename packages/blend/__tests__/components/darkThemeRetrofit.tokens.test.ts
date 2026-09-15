import { describe, it, expect } from 'vitest'
import FOUNDATION_THEME from '../../lib/tokens/theme.token'
import { Theme } from '../../lib/context/theme.enum'
import { getSkeletonTokens } from '../../lib/components/Skeleton/skeleton.tokens'
import { getSkeletonLightTokens } from '../../lib/components/Skeleton/skeleton.light.tokens'
import { getSkeletonDarkTokens } from '../../lib/components/Skeleton/skeleton.dark.tokens'
import { getDirectoryTokens } from '../../lib/components/Directory/directory.tokens'
import { getDirectoryLightTokens } from '../../lib/components/Directory/directory.light.tokens'
import { getDirectoryDarkTokens } from '../../lib/components/Directory/directory.dark.tokens'
import { getAvatarGroupTokens } from '../../lib/components/AvatarGroup/avatarGroup.tokens'
import { getAvatarGroupLightTokens } from '../../lib/components/AvatarGroup/avatarGroup.light.tokens'
import { getAvatarGroupDarkTokens } from '../../lib/components/AvatarGroup/avatarGroup.dark.tokens'
import { getButtonGroupTokens } from '../../lib/components/ButtonGroup/buttonGroup.tokens'
import { getButtonGroupLightTokens } from '../../lib/components/ButtonGroup/buttonGroup.light.tokens'
import { getButtonGroupDarkTokens } from '../../lib/components/ButtonGroup/buttonGroup.dark.tokens'
import { getCodeBlockTokens } from '../../lib/components/CodeBlock/codeBlock.token'
import { getCodeBlockLightTokens } from '../../lib/components/CodeBlock/codeBlock.light.tokens'
import { getCodeBlockDarkTokens } from '../../lib/components/CodeBlock/codeBlock.dark.tokens'
import { getMobileNavigationTokens } from '../../lib/components/Sidebar/SidebarMobile/mobile.tokens'
import { getMobileNavigationLightTokens } from '../../lib/components/Sidebar/SidebarMobile/mobile.light.tokens'
import { getMobileNavigationDarkTokens } from '../../lib/components/Sidebar/SidebarMobile/mobile.dark.tokens'

const ft = FOUNDATION_THEME

describe('dark-theme retrofit: no-theme call path equals light', () => {
    it('getSkeletonTokens() matches getSkeletonLightTokens()', () => {
        expect(getSkeletonTokens(ft)).toEqual(getSkeletonLightTokens(ft))
        expect(getSkeletonTokens(ft, Theme.LIGHT)).toEqual(
            getSkeletonLightTokens(ft)
        )
        expect(getSkeletonTokens(ft, Theme.DARK)).toEqual(
            getSkeletonDarkTokens(ft)
        )
        expect(getSkeletonDarkTokens(ft).sm.colors.base).toBe(
            ft.colors.gray[800]
        )
    })

    it('getDirectoryTokens() matches getDirectoryLightTokens()', () => {
        expect(getDirectoryTokens(ft)).toEqual(getDirectoryLightTokens(ft))
        expect(getDirectoryTokens(ft, Theme.DARK)).toEqual(
            getDirectoryDarkTokens(ft)
        )
        expect(
            getDirectoryDarkTokens(ft).sm.section.itemList.item.backgroundColor
                .hover
        ).toBe(ft.colors.gray[800])
    })

    it('getAvatarGroupTokens() matches getAvatarGroupLightTokens()', () => {
        expect(getAvatarGroupTokens(ft)).toEqual(getAvatarGroupLightTokens(ft))
        expect(getAvatarGroupTokens(ft, Theme.DARK)).toEqual(
            getAvatarGroupDarkTokens(ft)
        )
        expect(
            getAvatarGroupDarkTokens(ft).sm.overflowCounter.background.default
        ).toBe(ft.colors.gray[100])
    })

    it('getButtonGroupTokens() matches getButtonGroupLightTokens()', () => {
        expect(getButtonGroupTokens(ft)).toEqual(getButtonGroupLightTokens(ft))
        expect(getButtonGroupTokens(ft, Theme.DARK)).toEqual(
            getButtonGroupDarkTokens(ft)
        )
        expect(getButtonGroupDarkTokens(ft).sm.separator.color).toBe(
            ft.colors.gray[700]
        )
        expect(getButtonGroupTokens(ft).sm.gap.default).toBe(ft.unit[10])
    })

    it('getCodeBlockTokens() matches getCodeBlockLightTokens()', () => {
        expect(getCodeBlockTokens(ft)).toEqual(getCodeBlockLightTokens(ft))
        expect(getCodeBlockTokens(ft, Theme.DARK)).toEqual(
            getCodeBlockDarkTokens(ft)
        )
        expect(getCodeBlockDarkTokens(ft).sm.body.syntax.keyword).toBe(
            ft.colors.purple[400]
        )
        expect(getCodeBlockDarkTokens(ft).sm.backgroundColor).toBe(
            ft.colors.gray[900]
        )
    })

    it('getMobileNavigationTokens() matches getMobileNavigationLightTokens()', () => {
        expect(getMobileNavigationTokens(ft)).toEqual(
            getMobileNavigationLightTokens(ft)
        )
        expect(getMobileNavigationTokens(ft, Theme.DARK)).toEqual(
            getMobileNavigationDarkTokens(ft)
        )
        expect(
            getMobileNavigationDarkTokens(ft).sm.container.backgroundColor
        ).toBe(`${ft.colors.gray[900]}B8`)
    })
})
