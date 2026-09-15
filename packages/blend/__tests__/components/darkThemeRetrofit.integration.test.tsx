import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '../test-utils'
import ThemeProvider from '../../lib/context/ThemeProvider'
import { Theme } from '../../lib/context/theme.enum'
import { useResponsiveTokens } from '../../lib/hooks/useResponsiveTokens'
import type { AvatarGroupTokensType } from '../../lib/components/AvatarGroup/avatarGroup.tokens'
import type { ButtonGroupTokensType } from '../../lib/components/ButtonGroup/buttonGroup.tokens'
import type { CodeBlockTokenType } from '../../lib/components/CodeBlock/codeBlock.token'
import type { DirectoryTokenType } from '../../lib/components/Directory/directory.tokens'
import type { MobileNavigationTokenType } from '../../lib/components/Sidebar/SidebarMobile/mobile.tokens'
import type { SkeletonTokensType } from '../../lib/components/Skeleton/skeleton.tokens'
import FOUNDATION_THEME from '../../lib/tokens/theme.token'
import AvatarGroup from '../../lib/components/AvatarGroup/AvatarGroup'
import { AvatarSize } from '../../lib/components/Avatar/types'
import CodeBlock from '../../lib/components/CodeBlock/CodeBlock'
import Directory from '../../lib/components/Directory/Directory'
import Skeleton from '../../lib/components/Skeleton/Skeleton'
import SidebarMobileNavigation from '../../lib/components/Sidebar/SidebarMobile'

const TokenProbe = () => {
    const skeleton = useResponsiveTokens<SkeletonTokensType>('SKELETON')
    const directory = useResponsiveTokens<DirectoryTokenType>('DIRECTORY')
    const avatarGroup =
        useResponsiveTokens<AvatarGroupTokensType>('AVATAR_GROUP')
    const buttonGroup =
        useResponsiveTokens<ButtonGroupTokensType>('BUTTON_GROUP')
    const codeBlock = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
    const mobileNavigation =
        useResponsiveTokens<MobileNavigationTokenType>('MOBILE_NAVIGATION')

    return (
        <div
            data-skeleton-base={String(skeleton.colors.base)}
            data-directory-hover={String(
                directory.section.itemList.item.backgroundColor.hover
            )}
            data-avatar-group-overflow={String(
                avatarGroup.overflowCounter.background.default
            )}
            data-button-group-separator={String(buttonGroup.separator.color)}
            data-code-block-background={String(codeBlock.backgroundColor)}
            data-mobile-navigation-background={String(
                mobileNavigation.container.backgroundColor
            )}
        />
    )
}

describe('dark-theme retrofit context wiring', () => {
    it('routes dark ThemeProvider tokens to all retrofit consumers', () => {
        const { container } = render(
            <ThemeProvider theme={Theme.DARK}>
                <TokenProbe />
            </ThemeProvider>
        )

        const probe = container.firstElementChild

        expect(probe).toHaveAttribute(
            'data-skeleton-base',
            FOUNDATION_THEME.colors.gray[800]
        )
        expect(probe).toHaveAttribute(
            'data-directory-hover',
            FOUNDATION_THEME.colors.gray[800]
        )
        expect(probe).toHaveAttribute(
            'data-avatar-group-overflow',
            FOUNDATION_THEME.colors.gray[100]
        )
        expect(probe).toHaveAttribute(
            'data-button-group-separator',
            FOUNDATION_THEME.colors.gray[700]
        )
        expect(probe).toHaveAttribute(
            'data-code-block-background',
            FOUNDATION_THEME.colors.gray[900]
        )
        expect(probe).toHaveAttribute(
            'data-mobile-navigation-background',
            `${FOUNDATION_THEME.colors.gray[900]}B8`
        )
    })

    it('applies dark AvatarGroup selection and overflow chrome', () => {
        const { container } = render(
            <ThemeProvider theme={Theme.DARK}>
                <AvatarGroup
                    size={AvatarSize.MD}
                    avatars={[
                        { id: 1, alt: 'First' },
                        { id: 2, alt: 'Second' },
                        { id: 3, alt: 'Third' },
                    ]}
                    selectedAvatarIds={[1]}
                    maxCount={2}
                />
            </ThemeProvider>
        )

        const selected = container.querySelector(
            '[data-avatar-group-item-selected="true"]'
        )
        const overflow = container.querySelector(
            '[data-avatar-group-overflow="true"]'
        )

        expect(selected).toBeInTheDocument()
        expect(document.head.innerHTML).toContain(
            `outline:2px solid ${FOUNDATION_THEME.colors.gray[900]}`
        )
        expect(overflow).toHaveStyleRule(
            'background-color',
            FOUNDATION_THEME.colors.gray[100]
        )
    })

    it('applies dark CodeBlock and Skeleton surface tokens', () => {
        const { container } = render(
            <ThemeProvider theme={Theme.DARK}>
                <CodeBlock
                    code="const answer = 42"
                    header="Dark code"
                    showCopyButton={false}
                />
                <Skeleton data-testid="dark-skeleton" animate={false} />
            </ThemeProvider>
        )

        expect(
            container.querySelector('[data-codeblock="Dark code"]')
        ).toHaveStyleRule('background-color', FOUNDATION_THEME.colors.gray[900])
        expect(
            container.querySelector('[data-testid="dark-skeleton"]')
        ).toHaveStyleRule('background-color', FOUNDATION_THEME.colors.gray[800])
    })

    it('applies dark Directory item state tokens', () => {
        const { container } = render(
            <ThemeProvider theme={Theme.DARK}>
                <Directory
                    directoryData={[
                        {
                            label: 'Section',
                            isCollapsible: false,
                            items: [{ label: 'Item' }],
                        },
                    ]}
                />
            </ThemeProvider>
        )

        expect(
            container.querySelector('[aria-label="Directory navigation"]')
        ).toHaveStyleRule('gap', FOUNDATION_THEME.unit[24])
    })

    it('keeps SidebarMobileNavigation aligned with the dark app theme', async () => {
        const { container, user } = render(
            <ThemeProvider theme={Theme.DARK}>
                <SidebarMobileNavigation
                    items={Array.from({ length: 6 }, (_, index) => ({
                        label: `Item ${index + 1}`,
                        isSelected: index === 0,
                    }))}
                />
            </ThemeProvider>
        )

        const navigation = container.querySelector('div[style*="max-height"]')

        expect(navigation).toBeInTheDocument()
        expect(document.head.innerHTML).toContain(
            `background-color:${FOUNDATION_THEME.colors.gray[900]}B8`
        )

        await user.click(
            container.querySelector('[aria-label="More options"]')!
        )
        expect(
            container.querySelector('[aria-label="Item 6"]')
        ).toBeInTheDocument()
    })
})
