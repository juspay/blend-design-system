import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'jest-axe'
import { render, screen, within } from '../../test-utils'
import SidebarV3 from '../../../lib/components/SidebarV3/SidebarV3'

describe('SidebarV3 Accessibility', () => {
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

    it('passes axe checks with a closed nested group', async () => {
        const { container } = render(
            <SidebarV3
                topStrip={<span>Application controls</span>}
                data={[
                    {
                        items: [
                            {
                                id: 'analytics',
                                label: 'Analytics',
                                items: [
                                    {
                                        id: 'transactions',
                                        label: 'Transactions',
                                    },
                                ],
                            },
                            { id: 'home', label: 'Home' },
                        ],
                    },
                ]}
            >
                <h1>Home</h1>
            </SidebarV3>
        )
        expect(await axe(container)).toHaveNoViolations()
        expect(screen.getByRole('main')).toHaveTextContent('Home')
    })

    it('moves focus past closed nested items', async () => {
        const { user } = render(
            <SidebarV3
                topStrip="Controls"
                data={[
                    {
                        items: [
                            {
                                id: 'analytics',
                                label: 'Analytics',
                                items: [
                                    {
                                        id: 'transactions',
                                        label: 'Transactions',
                                    },
                                ],
                            },
                            { id: 'home', label: 'Home' },
                        ],
                    },
                ]}
            />
        )
        const hiddenChild = screen.getByRole('button', {
            name: 'Transactions',
            hidden: true,
        })
        expect(hiddenChild).toHaveAttribute('tabindex', '-1')
        screen.getByRole('button', { name: 'Analytics' }).focus()
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('button', { name: 'Home' })).toHaveFocus()
        await user.click(screen.getByRole('button', { name: 'Analytics' }))
        expect(hiddenChild).toHaveAttribute('tabindex', '0')
    })

    it('makes the closed hover preview inert with consumer slots', () => {
        const { container } = render(
            <SidebarV3
                topStrip="Controls"
                sidebarSearch={<button type="button">Search</button>}
                sidebarTopSlot={<button type="button">Account</button>}
                data={[{ items: [{ id: 'home', label: 'Home' }] }]}
                defaultIsExpanded={false}
                enableIntermediateState
            />
        )
        const preview = container.querySelector('[aria-hidden="true"][inert]')
        expect(preview).toBeInTheDocument()
        expect(preview).toContainElement(
            within(preview as HTMLElement).getByRole('button', {
                name: 'Search',
                hidden: true,
            })
        )
    })
})
