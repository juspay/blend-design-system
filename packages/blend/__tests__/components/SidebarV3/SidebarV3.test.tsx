import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import SidebarV3 from '../../../lib/components/SidebarV3/SidebarV3'
import SidebarV2 from '../../../lib/components/SidebarV2/SidebarV2'
import { getSidebarV3Tokens } from '../../../lib/components/SidebarV3/sidebarV3.tokens'
import type { DirectoryData } from '../../../lib/components/Directory/types'
import { FOUNDATION_THEME } from '../../../lib/tokens'

const data: DirectoryData[] = [
    {
        items: [
            { id: 'home', label: 'Home', href: '/home', showOnMobile: true },
            {
                id: 'analytics',
                label: 'Analytics',
                items: [
                    {
                        id: 'transactions',
                        label: 'Transactions',
                        href: '/transactions',
                    },
                ],
            },
        ],
    },
    {
        label: 'Products',
        items: [{ id: 'payments', label: 'Payments', href: '/payments' }],
    },
]

describe('SidebarV3', () => {
    beforeEach(() => {
        HTMLElement.prototype.scrollTo = vi.fn()
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1200,
        })
        window.dispatchEvent(new Event('resize'))
    })

    it('renders the strip, rounded surface, search slot, navigation and content', () => {
        const { container } = render(
            <SidebarV3
                data={data}
                topStrip={<span>Juspay controls</span>}
                sidebarSearch={<button type="button">Quick search</button>}
                height="800px"
            >
                <p>Page content</p>
            </SidebarV3>
        )
        expect(
            screen.getByRole('banner', { name: 'Application controls' })
        ).toHaveTextContent('Juspay controls')
        expect(
            container.querySelector('[data-sidebar-v3-surface]')
        ).toBeInTheDocument()
        expect(
            container.querySelector('[data-sidebar-v3-search]')
        ).toHaveTextContent('Quick search')
        expect(screen.getByRole('main')).toHaveTextContent('Page content')
        expect(container.querySelector('[data-sidebar-v3]')).toHaveStyle({
            height: '800px',
        })
    })

    it('keeps the search out of the collapsed rail and restores it on expansion', async () => {
        const { user, container } = render(
            <SidebarV3
                data={data}
                topStrip="Controls"
                sidebarSearch="Quick search"
                defaultIsExpanded={false}
            />
        )
        expect(container.querySelector('[data-sidebar-v3-search]')).toBeNull()
        await user.click(
            screen.getByRole('button', { name: /expand sidebar/i })
        )
        expect(
            container.querySelector('[data-sidebar-v3-search]')
        ).toHaveTextContent('Quick search')
    })

    it('expands nested items with pointer and keyboard while hiding collapsed content', async () => {
        const { user, container } = render(
            <SidebarV3 data={data} topStrip="Controls" />
        )
        const analytics = screen.getByRole('button', { name: 'Analytics' })
        const submenu = container.querySelector(
            '[aria-label="Analytics submenu"]'
        ) as HTMLElement
        expect(analytics).toHaveAttribute('aria-expanded', 'false')
        expect(submenu.closest('[inert]')).toBeInTheDocument()
        await user.click(analytics)
        expect(analytics).toHaveAttribute('aria-expanded', 'true')
        expect(
            within(submenu).getByRole('link', { name: 'Transactions' })
        ).toBeInTheDocument()
        analytics.focus()
        await user.keyboard('{ArrowLeft}')
        expect(analytics).toHaveAttribute('aria-expanded', 'false')
        expect(submenu.closest('[inert]')).toBeInTheDocument()
    })

    it('keeps the V2 mobile navigation source and displays the strip', () => {
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 375,
        })
        window.dispatchEvent(new Event('resize'))
        const { container } = render(
            <SidebarV3 data={data} topStrip="Mobile controls" />
        )
        expect(
            screen.getByRole('banner', { name: 'Application controls' })
        ).toHaveTextContent('Mobile controls')
        expect(container.querySelector('[data-sidebar="sidebar"]')).toHaveStyle(
            { display: 'none' }
        )
        expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('preserves controlled expansion callbacks', async () => {
        const onExpandedChange = vi.fn()
        const { user } = render(
            <SidebarV3
                data={data}
                topStrip="Controls"
                isExpanded
                onExpandedChange={onExpandedChange}
            />
        )
        await user.click(
            screen.getByRole('button', { name: /collapse sidebar/i })
        )
        expect(onExpandedChange).toHaveBeenCalledWith(false)
    })

    it('marks the active item and accepts an initially expanded nested path', () => {
        render(
            <SidebarV3
                data={data}
                topStrip="Controls"
                activeItem="home"
                defaultExpandedItems={['analytics']}
            />
        )
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
            'data-status',
            'selected'
        )
        expect(
            screen.getByRole('button', { name: 'Analytics' })
        ).toHaveAttribute('aria-expanded', 'true')
    })

    it('renders only the navigation data supplied by the consumer', () => {
        render(
            <SidebarV3
                data={[
                    {
                        items: [
                            {
                                id: 'custom',
                                label: 'Custom workspace',
                                href: '/custom',
                            },
                        ],
                    },
                ]}
                topStrip="Controls"
            />
        )
        expect(
            screen.getByRole('link', { name: 'Custom workspace' })
        ).toBeInTheDocument()
        expect(
            screen.queryByRole('link', { name: 'Home' })
        ).not.toBeInTheDocument()
    })

    it('keeps V2 disclosure behavior separate from V3 motion', async () => {
        const { user, container } = render(<SidebarV2 data={data} />)
        const analytics = screen.getByRole('button', { name: 'Analytics' })
        expect(
            container.querySelector('[aria-label="Analytics submenu"]')
        ).toBeNull()
        await user.click(analytics)
        expect(
            container.querySelector('[aria-label="Analytics submenu"]')
        ).toBeInTheDocument()
    })

    it('provides separate light and dark V3 token defaults', () => {
        const light = getSidebarV3Tokens(FOUNDATION_THEME, 'light')
        const dark = getSidebarV3Tokens(FOUNDATION_THEME, 'dark')
        expect(light.lg.frame.stripHeight).toBe(FOUNDATION_THEME.unit[48])
        expect(light.lg.navigation.selectedBackgroundColor).toBe(
            FOUNDATION_THEME.colors.primary[50]
        )
        expect(dark.lg.navigation.selectedBackgroundColor).toBe(
            FOUNDATION_THEME.colors.primary[900]
        )
        expect(light.lg.frame.stripPaddingInline).toBe(
            FOUNDATION_THEME.unit[16]
        )
        expect(light.lg.navigation.separatorOffset).toBe(
            FOUNDATION_THEME.unit[12]
        )
        expect(light.lg.navigation.guideOffset).toBe(FOUNDATION_THEME.unit[6])
    })
})
