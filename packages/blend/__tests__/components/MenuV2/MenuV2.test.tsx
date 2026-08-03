import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import MenuV2 from '../../../lib/components/MenuV2/MenuV2'
import type { MenuV2GroupType } from '../../../lib/components/MenuV2/menuV2.types'

const createBasicItems = (): MenuV2GroupType[] => [
    {
        label: 'Account',
        items: [
            { label: { text: 'Profile' }, onClick: vi.fn() },
            { label: { text: 'Settings' }, onClick: vi.fn() },
            { label: { text: 'Sign out' }, disabled: true },
        ],
    },
]

const createGroupedItemsWithSubmenu = (): MenuV2GroupType[] => [
    {
        label: 'Locations',
        showSeparator: true,
        items: [
            {
                label: { text: 'United States' },
                subMenu: [
                    { label: { text: 'California' }, onClick: vi.fn() },
                    { label: { text: 'New York' }, onClick: vi.fn() },
                ],
            },
        ],
    },
]

const createSearchItems = (): MenuV2GroupType[] => [
    {
        label: 'Cities',
        items: [
            { label: { text: 'Mostar' } },
            { label: { text: 'Moscow' } },
            { label: { text: 'Mumbai' } },
        ],
    },
]

const createRankedSearchItems = (): MenuV2GroupType[] => [
    {
        label: 'Results',
        items: [
            { label: { text: 'Advanced Search Tools' }, onClick: vi.fn() },
            { label: { text: 'Search' }, onClick: vi.fn() },
            { label: { text: 'Search Settings' }, onClick: vi.fn() },
        ],
    },
]

const createSubmenuSearchItems = (): MenuV2GroupType[] => [
    {
        label: 'Locations',
        items: [
            {
                label: { text: 'United States' },
                enableSubMenuSearch: true,
                subMenuSearchPlaceholder: 'Search states...',
                onSubMenuSearchEnter: vi.fn(),
                subMenu: [
                    { label: { text: 'California' }, onClick: vi.fn() },
                    { label: { text: 'New York' }, onClick: vi.fn() },
                    { label: { text: 'Texas' }, onClick: vi.fn() },
                ],
            },
        ],
    },
]

describe('MenuV2 selection', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders trailing checkmark and menuitemradio for selected items', async () => {
        const user = userEvent.setup()
        const onSelectName = vi.fn()

        render(
            <MenuV2
                trigger={<button type="button">Sort menu</button>}
                selectionStyle="checkmark"
                selectionMode="single"
                items={[
                    {
                        label: 'Sort',
                        items: [
                            {
                                label: { text: 'Name' },
                                selected: true,
                                onClick: onSelectName,
                            },
                            {
                                label: { text: 'Date' },
                                selected: false,
                                onClick: vi.fn(),
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /sort menu/i }))

        const nameItem = await screen.findByRole('menuitemradio', {
            name: /^name$/i,
        })
        const dateItem = screen.getByRole('menuitemradio', { name: /^date$/i })

        expect(nameItem).toHaveAttribute('aria-checked', 'true')
        expect(nameItem).toHaveAttribute('data-state', 'selected')
        expect(dateItem).toHaveAttribute('aria-checked', 'false')
        expect(
            nameItem.querySelector('[data-element="menu-item-checkmark"]')
        ).toBeInTheDocument()
        expect(
            dateItem.querySelector('[data-element="menu-item-checkmark"]')
        ).not.toBeInTheDocument()
    })

    it('applies highlight selection without checkmark', async () => {
        const user = userEvent.setup()

        render(
            <MenuV2
                trigger={<button type="button">View menu</button>}
                selectionStyle="highlight"
                selectionMode="multiple"
                closeOnSelect={false}
                items={[
                    {
                        label: 'Views',
                        items: [
                            { label: { text: 'Grid' }, selected: true },
                            { label: { text: 'List' }, selected: false },
                        ],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /view menu/i }))

        const grid = await screen.findByRole('menuitemcheckbox', {
            name: /^grid$/i,
        })
        expect(grid).toHaveAttribute('aria-checked', 'true')
        expect(grid).toHaveAttribute('data-selection-style', 'highlight')
        expect(
            grid.querySelector('[data-element="menu-item-checkmark"]')
        ).not.toBeInTheDocument()
    })

    it('keeps visual style independent from single and multiple selection semantics', async () => {
        const user = userEvent.setup()

        render(
            <MenuV2
                trigger={<button type="button">Mixed menu</button>}
                selectionStyle="highlight"
                selectionMode="single"
                items={[
                    {
                        label: 'Multiple',
                        selectionStyle: 'checkmark',
                        selectionMode: 'multiple',
                        items: [{ label: { text: 'Pinned' }, selected: true }],
                    },
                    {
                        label: 'Single',
                        items: [{ label: { text: 'Compact' }, selected: true }],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /mixed menu/i }))

        const pinned = await screen.findByRole('menuitemcheckbox', {
            name: /^pinned$/i,
        })
        expect(pinned).toHaveAttribute('data-selection-style', 'checkmark')
        expect(pinned).toHaveAttribute('data-selection-mode', 'multiple')
        expect(
            pinned.querySelector('[data-element="menu-item-checkmark"]')
        ).toBeInTheDocument()

        const compact = screen.getByRole('menuitemradio', {
            name: /^compact$/i,
        })
        expect(compact).toHaveAttribute('data-selection-style', 'highlight')
        expect(compact).toHaveAttribute('data-selection-mode', 'single')
        expect(
            compact.querySelector('[data-element="menu-item-checkmark"]')
        ).not.toBeInTheDocument()
    })

    it('keeps the menu open when closeOnSelect is false', async () => {
        const user = userEvent.setup()
        const onToggle = vi.fn()

        render(
            <MenuV2
                trigger={<button type="button">Multi menu</button>}
                selectionStyle="highlight"
                selectionMode="multiple"
                closeOnSelect={false}
                items={[
                    {
                        items: [
                            {
                                label: { text: 'Alpha' },
                                selected: false,
                                onClick: onToggle,
                            },
                            {
                                label: { text: 'Beta' },
                                selected: true,
                                onClick: vi.fn(),
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /multi menu/i }))
        const alpha = await screen.findByRole('menuitemcheckbox', {
            name: /^alpha$/i,
        })
        await user.click(alpha)

        expect(onToggle).toHaveBeenCalledTimes(1)
        expect(
            screen.getByRole('menuitemcheckbox', { name: /^alpha$/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('menuitemcheckbox', { name: /^beta$/i })
        ).toBeInTheDocument()
    })

    it('keeps the menu open for Enter and Space when closeOnSelect is false', async () => {
        const user = userEvent.setup()
        const onAlpha = vi.fn()
        const onBeta = vi.fn()

        render(
            <MenuV2
                trigger={<button type="button">Keyboard multi menu</button>}
                selectionMode="multiple"
                closeOnSelect={false}
                items={[
                    {
                        items: [
                            {
                                label: { text: 'Alpha' },
                                selected: false,
                                onClick: onAlpha,
                            },
                            {
                                label: { text: 'Beta' },
                                selected: true,
                                onClick: onBeta,
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /keyboard multi menu/i })
        )

        const alpha = await screen.findByRole('menuitemcheckbox', {
            name: /^alpha$/i,
        })
        alpha.focus()
        await user.keyboard('{Enter}')
        expect(onAlpha).toHaveBeenCalledTimes(1)
        expect(alpha).toBeInTheDocument()

        await user.keyboard('{ArrowDown}')
        const beta = screen.getByRole('menuitemcheckbox', { name: /^beta$/i })
        expect(beta).toHaveFocus()
        await user.keyboard(' ')
        expect(onBeta).toHaveBeenCalledTimes(1)
        expect(beta).toBeInTheDocument()
    })

    it('closes the menu on select by default', async () => {
        const user = userEvent.setup()

        render(
            <MenuV2
                trigger={<button type="button">Single menu</button>}
                selectionStyle="checkmark"
                items={[
                    {
                        items: [
                            {
                                label: { text: 'One' },
                                selected: false,
                                onClick: vi.fn(),
                            },
                        ],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /single menu/i }))
        const one = await screen.findByRole('menuitemradio', { name: /^one$/i })
        await user.click(one)

        await waitFor(() => {
            expect(
                screen.queryByRole('menuitemradio', { name: /^one$/i })
            ).not.toBeInTheDocument()
        })
    })

    it('does not change rendering when selected is omitted', async () => {
        const user = userEvent.setup()

        render(
            <MenuV2
                trigger={<button type="button">Plain menu</button>}
                items={[
                    {
                        items: [
                            { label: { text: 'Action' }, onClick: vi.fn() },
                        ],
                    },
                ]}
            />
        )

        await user.click(screen.getByRole('button', { name: /plain menu/i }))
        const action = await screen.findByRole('menuitem', {
            name: /^action$/i,
        })
        expect(action).not.toHaveAttribute('aria-checked')
        expect(action).not.toHaveAttribute('data-selection-style')
        expect(
            action.querySelector('[data-element="menu-item-checkmark"]')
        ).not.toBeInTheDocument()
    })
})

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
                dimensions={{
                    maxHeight: 300,
                    minWidth: 240,
                    maxWidth: 320,
                }}
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

    it('ranks search results so exact match appears before prefix and substring', async () => {
        const user = userEvent.setup()
        render(
            <MenuV2
                trigger={<button type="button">Ranked</button>}
                items={createRankedSearchItems()}
                enableSearch
                searchPlaceholder="Search..."
            />
        )

        await user.click(screen.getByRole('button', { name: /ranked/i }))
        const searchInput = await screen.findByPlaceholderText('Search...')
        await user.type(searchInput, 'search')

        await waitFor(() => {
            const items = screen.getAllByRole('menuitem')
            const texts = items.map((i) => i.textContent)
            // Exact "Search" should come before prefix "Search Settings"
            // and substring "Advanced Search Tools"
            const searchIdx = texts.findIndex((t) => t === 'Search')
            const prefixIdx = texts.findIndex((t) => t === 'Search Settings')
            const subIdx = texts.findIndex((t) => t === 'Advanced Search Tools')
            expect(searchIdx).toBeLessThan(prefixIdx)
            expect(prefixIdx).toBeLessThan(subIdx)
        })
    })

    it('calls onEnter with the current search text and filtered groups when Enter is pressed in the search input', async () => {
        const user = userEvent.setup()
        const onEnter = vi.fn()
        render(
            <MenuV2
                trigger={<button type="button">Enter</button>}
                items={createSearchItems()}
                enableSearch
                searchPlaceholder="Search cities..."
                onEnter={onEnter}
            />
        )

        await user.click(screen.getByRole('button', { name: /enter/i }))
        const searchInput =
            await screen.findByPlaceholderText('Search cities...')
        await user.type(searchInput, 'mos')
        await user.keyboard('{Enter}')

        await waitFor(() => {
            expect(onEnter).toHaveBeenCalledTimes(1)
        })
        const [query, filteredGroups] = onEnter.mock.calls[0]
        expect(query).toBe('mos')
        // At least one group, with at least one matching item (Moscow, Mostar)
        expect(filteredGroups.length).toBeGreaterThan(0)
        const matchedTexts = filteredGroups[0].items.map(
            (i: { label: { text: string } }) => i.label.text
        )
        expect(matchedTexts).toContain('Moscow')
        expect(matchedTexts).toContain('Mostar')
    })

    it('does not call onEnter when enableSearch is false', async () => {
        const user = userEvent.setup()
        const onEnter = vi.fn()
        render(
            <MenuV2
                trigger={<button type="button">No search</button>}
                items={createBasicItems()}
                onEnter={onEnter}
            />
        )

        await user.click(screen.getByRole('button', { name: /no search/i }))
        await user.keyboard('{Enter}')
        expect(onEnter).not.toHaveBeenCalled()
    })

    it('honors a custom searchSortFn that overrides the default ranking', async () => {
        const user = userEvent.setup()
        // Reverse-alphabetical custom sort
        const customSort = (items: { label: { text: string } }[]) =>
            [...items].sort().reverse()
        render(
            <MenuV2
                trigger={<button type="button">Custom sort</button>}
                items={createSearchItems()}
                enableSearch
                searchPlaceholder="Search cities..."
                searchSortFn={customSort as never}
            />
        )

        await user.click(screen.getByRole('button', { name: /custom sort/i }))
        const searchInput =
            await screen.findByPlaceholderText('Search cities...')
        await user.type(searchInput, 'mo')

        await waitFor(() => {
            const items = screen.getAllByRole('menuitem')
            const texts = items.map((i) => i.textContent)
            // Custom sort reverses alphabetical order of matches
            const mostarIdx = texts.findIndex((t) => t === 'Mostar')
            const moscowIdx = texts.findIndex((t) => t === 'Moscow')
            const mumbaiIdx = texts.findIndex((t) => t === 'Mumbai')
            // Mumbai shouldn't match "mo" at all
            expect(mumbaiIdx).toBe(-1)
            expect(moscowIdx).toBeLessThan(mostarIdx)
        })
    })

    it('fires onSubMenuSearchEnter with query and filtered results when Enter is pressed in the sub-menu search input', async () => {
        const user = userEvent.setup()
        const items = createSubmenuSearchItems()
        const onSubMenuSearchEnter = items[0].items[0]
            .onSubMenuSearchEnter as ReturnType<typeof vi.fn>

        render(
            <MenuV2
                trigger={<button type="button">Submenu search</button>}
                items={items}
            />
        )

        await user.click(
            screen.getByRole('button', { name: /submenu search/i })
        )
        const parent = await screen.findByRole('menuitem', {
            name: /united states/i,
        })
        await user.click(parent)

        const subSearchInput =
            await screen.findByPlaceholderText('Search states...')
        // fireEvent is used for the keydown to reliably target the sub-menu
        // portal input in jsdom (userEvent.keyboard can lose focus in portals).
        fireEvent.change(subSearchInput, { target: { value: 'cal' } })
        fireEvent.keyDown(subSearchInput, { key: 'Enter', code: 'Enter' })

        await waitFor(() => {
            expect(onSubMenuSearchEnter).toHaveBeenCalledTimes(1)
        })
        const [query, filteredResults] = onSubMenuSearchEnter.mock.calls[0]
        expect(query).toBe('cal')
        expect(filteredResults.length).toBe(1)
        expect(filteredResults[0].label.text).toBe('California')
    })
})
