import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import MenuV2 from '../../../lib/components/MenuV2/MenuV2'
import type { MenuV2GroupType } from '../../../lib/components/MenuV2/menuV2.types'

const createItems = (): MenuV2GroupType[] => [
    {
        label: 'Primary',
        showSeparator: true,
        items: [
            { label: { text: 'Profile' } },
            {
                label: { text: 'Settings' },
                subLabel: 'Preferences and account',
            },
            { label: { text: 'Sign out' }, disabled: true },
        ],
    },
]

describe('MenuV2 Accessibility', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('passes axe checks in default closed state', async () => {
        const { container } = render(
            <MenuV2
                trigger={<button type="button">Account menu</button>}
                items={createItems()}
            />
        )

        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when open with search enabled', async () => {
        const user = userEvent.setup()
        const { container } = render(
            <MenuV2
                trigger={<button type="button">Account with search</button>}
                items={createItems()}
                enableSearch
                searchPlaceholder="Search menu items..."
            />
        )

        await user.click(
            screen.getByRole('button', { name: /account with search/i })
        )

        await waitFor(() => {
            expect(
                screen.getByPlaceholderText('Search menu items...')
            ).toBeInTheDocument()
        })

        expect(await axe(container)).toHaveNoViolations()
    })

    it('marks disabled items for assistive tech and keeps focus order', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Accessible menu</button>}
                items={createItems()}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /accessible menu/i })
        )

        const profile = await screen.findByRole('menuitem', {
            name: /profile/i,
        })
        const settings = screen.getByRole('menuitem', { name: /settings/i })
        const signOut = screen.getByRole('menuitem', { name: /sign out/i })

        expect(signOut).toHaveAttribute('data-status', 'disabled')

        profile.focus()
        await user.keyboard('{ArrowDown}')
        await waitFor(() => {
            expect(settings).toHaveFocus()
        })
    })

    it('exposes aria-checked on selectable items and supports keyboard nav', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()

        const { container } = render(
            <MenuV2
                trigger={<button type="button">Selection menu</button>}
                selectionStyle="checkmark"
                items={[
                    {
                        label: 'Sort',
                        items: [
                            {
                                label: { text: 'Name' },
                                selected: true,
                                onClick: vi.fn(),
                            },
                            {
                                label: { text: 'Date' },
                                selected: false,
                                onClick: onSelect,
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /selection menu/i })
        )

        const name = await screen.findByRole('menuitemradio', {
            name: /^name$/i,
        })
        const date = screen.getByRole('menuitemradio', { name: /^date$/i })

        expect(name).toHaveAttribute('aria-checked', 'true')
        expect(date).toHaveAttribute('aria-checked', 'false')

        name.focus()
        await user.keyboard('{ArrowDown}')
        await waitFor(() => {
            expect(date).toHaveFocus()
        })

        await user.keyboard('{Enter}')
        expect(onSelect).toHaveBeenCalledTimes(1)

        expect(await axe(container)).toHaveNoViolations()
    })

    it('uses menuitemcheckbox with aria-checked for highlight multi-select', async () => {
        const user = userEvent.setup()

        const { container } = render(
            <MenuV2
                trigger={<button type="button">Multi select menu</button>}
                selectionStyle="highlight"
                closeOnSelect={false}
                items={[
                    {
                        items: [
                            { label: { text: 'Grid' }, selected: true },
                            { label: { text: 'List' }, selected: false },
                        ],
                    },
                ]}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /multi select menu/i })
        )

        const grid = await screen.findByRole('menuitemcheckbox', {
            name: /^grid$/i,
        })
        expect(grid).toHaveAttribute('aria-checked', 'true')

        expect(await axe(container)).toHaveNoViolations()
    })
})
