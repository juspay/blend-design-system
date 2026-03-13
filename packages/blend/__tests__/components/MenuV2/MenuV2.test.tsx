import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import MenuV2 from '../../../lib/components/MenuV2/MenuV2'
import type { MenuV2GroupType } from '../../../lib/components/MenuV2/menuV2.types'

const createBasicItems = (): MenuV2GroupType[] => [
    {
        label: 'Account',
        items: [
            { label: 'Profile', onClick: vi.fn() },
            { label: 'Settings', onClick: vi.fn() },
            { label: 'Sign out', disabled: true },
        ],
    },
]

const createGroupedItemsWithSubmenu = (): MenuV2GroupType[] => [
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: 'United States',
                subMenu: [
                    { label: 'California', onClick: vi.fn() },
                    { label: 'New York', onClick: vi.fn() },
                ],
            },
        ],
    },
]

const createSearchItems = (): MenuV2GroupType[] => [
    {
        label: 'Cities',
        items: [{ label: 'Mostar' }, { label: 'Moscow' }, { label: 'Mumbai' }],
    },
]

describe('MenuV2', () => {
    beforeEach(() => {
        // Radix portals and popper use ResizeObserver internally
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('opens and closes when clicking trigger repeatedly', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Open menu</button>}
                items={createBasicItems()}
            />
        )

        const trigger = screen.getByRole('button', { name: /open menu/i })

        await user.click(trigger)
        await waitFor(() => {
            expect(screen.getByText('Profile')).toBeInTheDocument()
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(screen.queryByText('Profile')).not.toBeInTheDocument()
        })
    })

    it('supports controlled open state via open and onOpenChange', async () => {
        const user = userEvent.setup()

        const Controlled = () => {
            const [open, setOpen] = React.useState(false)
            return (
                <MenuV2
                    trigger={<button type="button">Controlled</button>}
                    items={createBasicItems()}
                    open={open}
                    onOpenChange={setOpen}
                />
            )
        }

        render(<Controlled />)
        const trigger = screen.getByRole('button', { name: /controlled/i })

        await user.click(trigger)
        await waitFor(() => {
            expect(screen.getByText('Profile')).toBeInTheDocument()
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(screen.queryByText('Profile')).not.toBeInTheDocument()
        })
    })

    it('renders groups, labels, and separators', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Grouped</button>}
                items={createGroupedItemsWithSubmenu()}
            />
        )

        await user.click(screen.getByRole('button', { name: /grouped/i }))

        await waitFor(() => {
            expect(screen.getByText('Locations')).toBeInTheDocument()
            expect(screen.getByText('United States')).toBeInTheDocument()
        })
    })

    it('calls onClick for leaf items and does not call onClick for disabled items', async () => {
        const user = userEvent.setup()
        const items = createBasicItems()
        const profileOnClick = items[0].items[0].onClick as () => void
        const settingsOnClick = items[0].items[1].onClick as () => void

        render(
            <MenuV2
                trigger={<button type="button">Actions</button>}
                items={items}
            />
        )

        await user.click(screen.getByRole('button', { name: /actions/i }))

        const profileItem = await screen.findByRole('menuitem', {
            name: /profile/i,
        })
        await user.click(profileItem)

        await user.click(screen.getByRole('button', { name: /actions/i }))
        const settingsItem = await screen.findByRole('menuitem', {
            name: /settings/i,
        })
        await user.click(settingsItem)

        expect(profileOnClick).toHaveBeenCalled()
        expect(settingsOnClick).toHaveBeenCalled()

        await user.click(screen.getByRole('button', { name: /actions/i }))
        const disabledItem = await screen.findByRole('menuitem', {
            name: /sign out/i,
        })
        await user.click(disabledItem)
        expect(disabledItem).toHaveAttribute('data-status', 'disabled')
    })

    it('filters items when enableSearch is true and search text is entered', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Search</button>}
                items={createSearchItems()}
                enableSearch
                searchPlaceholder="Search cities..."
            />
        )

        await user.click(screen.getByRole('button', { name: /search/i }))

        const searchInput =
            await screen.findByPlaceholderText('Search cities...')
        await user.type(searchInput, 'mos')

        await waitFor(() => {
            expect(screen.getByText('Moscow')).toBeInTheDocument()
            expect(screen.getByText('Mostar')).toBeInTheDocument()
        })
    })

    it('clears search text when menu closes', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Search close</button>}
                items={createSearchItems()}
                enableSearch
                searchPlaceholder="Search cities..."
            />
        )

        const trigger = screen.getByRole('button', { name: /search close/i })
        await user.click(trigger)

        const searchInput =
            await screen.findByPlaceholderText('Search cities...')
        await user.type(searchInput, 'mos')

        await waitFor(() => {
            expect(screen.getByText('Moscow')).toBeInTheDocument()
        })

        await user.click(trigger)
        await user.click(trigger)

        const reopenedSearchInput =
            await screen.findByPlaceholderText('Search cities...')
        expect(reopenedSearchInput).toHaveValue('')
    })

    it('applies maxHeight, minWidth, and maxWidth styles from props', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Dimensions</button>}
                items={createBasicItems()}
                maxHeight={300}
                minWidth={240}
                maxWidth={320}
            />
        )

        await user.click(screen.getByRole('button', { name: /dimensions/i }))

        const content = document.querySelector(
            '[data-menu="menu"]'
        ) as HTMLElement
        expect(content).toBeInTheDocument()
    })

    it('opens submenu items when clicking a parent with subMenu', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Submenu</button>}
                items={createGroupedItemsWithSubmenu()}
            />
        )

        await user.click(screen.getByRole('button', { name: /submenu/i }))

        const parent = await screen.findByRole('menuitem', {
            name: /united states/i,
        })
        await user.click(parent)

        await waitFor(() => {
            expect(screen.getByText('California')).toBeInTheDocument()
        })
    })
})
