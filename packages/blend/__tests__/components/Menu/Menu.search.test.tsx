import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import Menu from '../../../lib/components/Menu/Menu'
import { getItemMatchRank } from '../../../lib/components/Menu/utils'
import type {
    MenuGroupType,
    MenuItemType,
} from '../../../lib/components/Menu/types'

const createBasicItems = (): MenuGroupType[] => [
    {
        items: [
            { label: 'Profile', onClick: vi.fn() },
            { label: 'Settings', onClick: vi.fn() },
            { label: 'Sign out', disabled: true },
        ],
    },
]

const createSearchItems = (): MenuGroupType[] => [
    {
        items: [{ label: 'Mostar' }, { label: 'Moscow' }, { label: 'Mumbai' }],
    },
]

const createRankedSearchItems = (): MenuGroupType[] => [
    {
        items: [
            { label: 'Advanced Search Tools', onClick: vi.fn() },
            { label: 'Search', onClick: vi.fn() },
            { label: 'Search Settings', onClick: vi.fn() },
        ],
    },
]

const createSubmenuSearchItems = (): MenuGroupType[] => [
    {
        items: [
            {
                label: 'United States',
                enableSubMenuSearch: true,
                subMenuSearchPlaceholder: 'Search states...',
                onSubMenuSearchEnter: vi.fn(),
                subMenu: [
                    { label: 'California', onClick: vi.fn() },
                    { label: 'New York', onClick: vi.fn() },
                    { label: 'Texas', onClick: vi.fn() },
                ],
            },
        ],
    },
]

describe('Menu search ranking & onEnter', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('ranks search results so exact match appears before prefix and substring', async () => {
        const user = userEvent.setup()
        render(
            <Menu
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
            const searchIdx = texts.findIndex((t) => t === 'Search')
            const prefixIdx = texts.findIndex((t) => t === 'Search Settings')
            const subIdx = texts.findIndex((t) => t === 'Advanced Search Tools')
            expect(searchIdx).toBeGreaterThanOrEqual(0)
            expect(searchIdx).toBeLessThan(prefixIdx)
            expect(prefixIdx).toBeLessThan(subIdx)
        })
    })

    it('calls onEnter with the current search text and filtered groups when Enter is pressed in the search input', async () => {
        const user = userEvent.setup()
        const onEnter = vi.fn()
        render(
            <Menu
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
        expect(filteredGroups.length).toBeGreaterThan(0)
        const matchedTexts = filteredGroups[0].items.map(
            (i: MenuItemType) => i.label
        )
        expect(matchedTexts).toContain('Moscow')
        expect(matchedTexts).toContain('Mostar')
    })

    it('does not call onEnter when enableSearch is false', async () => {
        const user = userEvent.setup()
        const onEnter = vi.fn()
        render(
            <Menu
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
        // Reverse the default ranking: substring → prefix → exact
        const customSort = (items: MenuItemType[], searchText: string) => {
            const lower = searchText.toLowerCase()
            return [...items].sort(
                (a, b) =>
                    getItemMatchRank(b, lower) - getItemMatchRank(a, lower)
            )
        }
        render(
            <Menu
                trigger={<button type="button">Custom sort</button>}
                items={createRankedSearchItems()}
                enableSearch
                searchPlaceholder="Search..."
                searchSortFn={customSort}
            />
        )

        await user.click(screen.getByRole('button', { name: /custom sort/i }))
        const searchInput = await screen.findByPlaceholderText('Search...')
        await user.type(searchInput, 'search')

        await waitFor(() => {
            const items = screen.getAllByRole('menuitem')
            const texts = items.map((i) => i.textContent)
            // Reversed: substring first, exact last
            const searchIdx = texts.findIndex((t) => t === 'Search')
            const prefixIdx = texts.findIndex((t) => t === 'Search Settings')
            const subIdx = texts.findIndex((t) => t === 'Advanced Search Tools')
            expect(subIdx).toBeLessThan(prefixIdx)
            expect(prefixIdx).toBeLessThan(searchIdx)
        })
    })

    it('fires onSubMenuSearchEnter with query and filtered results when Enter is pressed in the sub-menu search input', async () => {
        const user = userEvent.setup()
        const items = createSubmenuSearchItems()
        const onSubMenuSearchEnter = items[0].items[0]
            .onSubMenuSearchEnter as ReturnType<typeof vi.fn>

        render(
            <Menu
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
        fireEvent.change(subSearchInput, { target: { value: 'cal' } })
        fireEvent.keyDown(subSearchInput, { key: 'Enter', code: 'Enter' })

        await waitFor(() => {
            expect(onSubMenuSearchEnter).toHaveBeenCalledTimes(1)
        })
        const [query, filteredResults] = onSubMenuSearchEnter.mock.calls[0]
        expect(query).toBe('cal')
        expect(filteredResults.length).toBe(1)
        expect(filteredResults[0].label).toBe('California')
    })
})
