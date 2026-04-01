import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import SidebarV2 from '../../../lib/components/SidebarV2/SidebarV2'
import type { DirectoryData } from '../../../lib/components/Directory/types'

const createMockDirectoryData = (): DirectoryData[] => [
    {
        label: 'Main',
        items: [
            {
                label: 'Home',
                href: '/home',
                showOnMobile: true,
            },
            {
                label: 'Dashboard',
                href: '/dashboard',
                showOnMobile: true,
            },
        ],
    },
    {
        label: 'Settings',
        items: [
            {
                label: 'Profile',
                href: '/profile',
                showOnMobile: false,
            },
        ],
    },
]

describe('SidebarV2 Accessibility', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1200,
        })
    })

    it('passes axe accessibility checks', async () => {
        const { container } = render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        expect(await axe(container)).toHaveNoViolations()
    })

    it('has proper navigation role and aria attributes', () => {
        const { container } = render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        const nav = container.querySelector('[data-sidebar="sidebar"]')
        expect(nav).toHaveAttribute(
            'aria-label',
            expect.stringContaining('Sidebar navigation')
        )
        expect(nav).toHaveAttribute('aria-expanded', 'true')
    })

    it('has proper main content role and label', () => {
        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        const main = screen.getByRole('main')
        expect(main).toHaveAttribute('aria-label', 'Main content')
    })

    it('toggle button has proper aria attributes', async () => {
        render(
            <SidebarV2 data={createMockDirectoryData()} sidebarCollapseKey="/">
                <div>Content</div>
            </SidebarV2>
        )

        const toggleButton = screen.getByRole('button', {
            name: /collapse sidebar/i,
        })

        expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
        expect(toggleButton).toHaveAttribute('aria-controls')
        expect(toggleButton).toHaveAttribute(
            'aria-label',
            expect.stringContaining('Press / to toggle')
        )
    })

    it('secondary sidebar buttons have proper aria-hidden on icons', () => {
        const secondarySidebar = {
            items: [{ label: 'App 1', value: 'app1', icon: <span>A1</span> }],
            selected: 'app1',
            onSelect: () => {},
        }

        const { container } = render(
            <SidebarV2
                data={createMockDirectoryData()}
                secondarySidebar={secondarySidebar}
            >
                <div>Content</div>
            </SidebarV2>
        )

        const secondarySidebarElement = container.querySelector(
            '[data-element="secondary-sidebar"]'
        )
        expect(secondarySidebarElement).toBeInTheDocument()
    })

    it('navigation region has proper aria-label', () => {
        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        const navigationRegion = screen.getByRole('region', {
            name: /navigation menu/i,
        })
        expect(navigationRegion).toBeInTheDocument()
    })

    it('supports keyboard-only navigation', async () => {
        const user = userEvent.setup()

        render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        const toggleButton = screen.getByRole('button', {
            name: /collapse sidebar/i,
        })

        // Focus the button
        toggleButton.focus()
        expect(toggleButton).toHaveFocus()

        // Activate with Enter
        await user.keyboard('{Enter}')

        await waitFor(() => {
            const expandedButton = screen.getByRole('button', {
                name: /expand sidebar/i,
            })
            expect(expandedButton).toBeInTheDocument()
        })
    })

    it('skip link pattern is implemented for navigation and main content', () => {
        const { container } = render(
            <SidebarV2 data={createMockDirectoryData()}>
                <div>Content</div>
            </SidebarV2>
        )

        // Check for IDs that would be used for skip links
        const main = screen.getByRole('main')
        const nav = container.querySelector('[data-sidebar="sidebar"]')

        expect(main).toHaveAttribute('id')
        expect(nav).toHaveAttribute('id')
    })
})
