import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import SidebarV2MobileNavigation from '../../../lib/components/SidebarV2/SidebarV2MobileNavigation'
import type { SidebarV2MobileNavigationItem } from '../../../lib/components/SidebarV2/SidebarV2MobileNavigation/types'

const makeNavItems = (
    count: number,
    options?: { onClick?: () => void }
): SidebarV2MobileNavigationItem[] =>
    Array.from({ length: count }, (_, i) => ({
        label: `Nav ${i + 1}`,
        onClick: options?.onClick ?? vi.fn(),
        isSelected: i === 0,
        leftSlot: <span data-testid={`nav-icon-${i}`} aria-hidden />,
    }))

describe('SidebarV2MobileNavigation', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver

        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 812,
        })
        Object.defineProperty(window, 'visualViewport', {
            writable: true,
            configurable: true,
            value: {
                height: 812,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            },
        })
    })

    it('renders a navigation landmark and primary items', () => {
        const items = makeNavItems(3)

        render(
            <SidebarV2MobileNavigation items={items} onHeightChange={vi.fn()} />
        )

        expect(
            screen.getByRole('navigation', { name: /app navigation/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Nav 1' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Nav 3' })
        ).toBeInTheDocument()
    })

    it('invokes onClick when a primary item is activated', async () => {
        const user = userEvent.setup()
        const onClick = vi.fn()
        const items = makeNavItems(2, { onClick })

        render(<SidebarV2MobileNavigation items={items} />)

        await user.click(screen.getByRole('button', { name: 'Nav 2' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('shows More and expands the secondary region for overflow items', async () => {
        const user = userEvent.setup()
        const items = makeNavItems(6)

        render(<SidebarV2MobileNavigation items={items} />)

        const more = screen.getByRole('button', { name: /more options/i })
        expect(more).toHaveAttribute('aria-expanded', 'false')

        await user.click(more)

        await waitFor(() => {
            expect(more).toHaveAttribute('aria-expanded', 'true')
        })

        expect(
            screen.getByRole('button', { name: 'Nav 6' })
        ).toBeInTheDocument()
    })

    it('renders primary action when enabled', () => {
        const items = makeNavItems(2)

        render(
            <SidebarV2MobileNavigation
                items={items}
                showPrimaryActionButton
                primaryActionButtonProps={{
                    'aria-label': 'Compose',
                    onClick: vi.fn(),
                }}
            />
        )

        expect(
            screen.getByRole('button', { name: 'Compose' })
        ).toBeInTheDocument()
    })
})
