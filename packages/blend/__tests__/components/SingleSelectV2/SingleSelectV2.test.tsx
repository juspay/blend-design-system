import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'
import { SingleSelectV2Size } from '../../../lib/components/SingleSelectV2/SingleSelectV2.types'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const createBasicItems = () => [
    {
        groupLabel: 'Fruits',
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
        ],
    },
]

const createLargeItems = (count = 500) => [
    {
        groupLabel: 'Large List',
        items: Array.from({ length: count }, (_, idx) => ({
            label: `Item ${idx + 1}`,
            value: `item-${idx + 1}`,
            ...(idx % 7 === 0 ? { subLabel: `Sub ${idx + 1}` } : {}),
        })),
    },
]

const createSearchItems = () => [
    {
        groupLabel: 'Cities',
        items: [
            { label: 'Mostar', value: 'mostar' },
            { label: 'Moscow', value: 'moscow' },
            { label: 'Mumbai', value: 'mumbai' },
        ],
    },
]

const createTwoGroupsWithSeparator = () => [
    {
        groupLabel: 'Group A',
        showSeparator: true,
        items: [{ label: 'A1', value: 'a1' }],
    },
    { groupLabel: 'Group B', items: [{ label: 'B1', value: 'b1' }] },
]

const createItemsWithSubMenu = () => [
    {
        items: [
            {
                label: 'Parent',
                value: 'parent',
                subMenu: [{ label: 'Child', value: 'child' }],
            },
        ],
    },
]

describe('SingleSelectV2', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('opens and closes when clicking trigger repeatedly', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Select fruit"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
            />
        )

        const trigger = screen.getByRole('button', { name: /select fruit/i })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })

    it('renders non-empty dropdown on first click for large list with auto virtualization', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Select item"
                items={createLargeItems(500)}
                selected=""
                onSelect={() => {}}
            />
        )

        await user.click(screen.getByRole('button', { name: /select item/i }))

        await waitFor(() => {
            const virtualList = document.querySelector(
                '[data-element="virtual-list"]'
            )
            const staticList = document.querySelector(
                '[data-element="menu-content"]'
            )
            expect(virtualList || staticList).toBeTruthy()
            expect(screen.getAllByRole('menuitem').length).toBeGreaterThan(0)
        })
    })

    it('filters virtualized list via search input', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Search large list"
                items={createLargeItems(500)}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )

        await user.click(
            screen.getByRole('button', { name: /search large list/i })
        )

        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.type(searchInput, 'Item 499')

        await waitFor(() => {
            expect(screen.getByText('Item 499')).toBeInTheDocument()
        })
    })

    it('keeps search editable with backspace after menu item receives focus', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Search cities"
                items={createSearchItems()}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )

        await user.click(screen.getByRole('button', { name: /search cities/i }))

        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.type(searchInput, 'mos')
        await user.keyboard('{ArrowDown}')
        await user.keyboard('{Backspace}')

        await waitFor(
            () => {
                expect(searchInput).toHaveValue('mo')
                expect(searchInput).toHaveFocus()
            },
            { timeout: 2000 }
        )
    })

    it('calls onSelect and closes the menu after selection', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()

        render(
            <SingleSelectV2
                placeholder="Select fruit"
                items={createBasicItems()}
                selected=""
                onSelect={onSelect}
            />
        )

        const trigger = screen.getByRole('button', { name: /select fruit/i })
        await user.click(trigger)

        const option = await screen.findByText('Banana')
        await user.click(option)

        expect(onSelect).toHaveBeenCalledWith('banana')
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })

    it('respects disabled state and does not open', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Disabled select"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                disabled
            />
        )

        const trigger = screen.getByRole('button', { name: /disabled select/i })
        expect(trigger).toBeDisabled()
        await user.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('supports controlled open state', async () => {
        const user = userEvent.setup()

        const Controlled = () => {
            const [open, setOpen] = React.useState(false)
            return (
                <SingleSelectV2
                    placeholder="Controlled"
                    items={createBasicItems()}
                    selected=""
                    onSelect={() => {}}
                    open={open}
                    onOpenChange={setOpen}
                />
            )
        }

        render(<Controlled />)
        const trigger = screen.getByRole('button', { name: /controlled/i })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })

    it('shows empty-state message when items are empty', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Empty select"
                items={[]}
                selected=""
                onSelect={() => {}}
            />
        )

        await user.click(screen.getByRole('button', { name: /empty select/i }))
        expect(
            await screen.findByText('No items available')
        ).toBeInTheDocument()
    })

    it('shows no-results message for unmatched search', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="No results select"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )

        await user.click(
            screen.getByRole('button', { name: /no results select/i })
        )
        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.type(searchInput, 'zzzzzz')

        expect(await screen.findByText('No results found')).toBeInTheDocument()
    })

    it('shows skeleton in menu when skeleton.show is true', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Loading"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                skeleton={{ show: true, count: 2, variant: 'pulse' }}
            />
        )
        await user.click(screen.getByRole('button', { name: /loading/i }))
        expect(
            document.querySelectorAll('[data-testid="skeleton"]')
        ).toHaveLength(2)
    })

    it('renders static list with separator when two groups and showSeparator', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Pick"
                items={createTwoGroupsWithSeparator()}
                selected=""
                onSelect={() => {}}
            />
        )
        await user.click(screen.getByRole('button', { name: /pick/i }))
        expect(screen.getByText('Group A')).toBeInTheDocument()
        expect(screen.getByText('Group B')).toBeInTheDocument()
        expect(screen.getByText('A1')).toBeInTheDocument()
        expect(screen.getByText('B1')).toBeInTheDocument()
    })

    it('renders submenu item and opens submenu', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="With submenu"
                items={createItemsWithSubMenu()}
                selected=""
                onSelect={() => {}}
            />
        )
        await user.click(screen.getByRole('button', { name: /with submenu/i }))
        await waitFor(() =>
            expect(screen.getByText('Parent')).toBeInTheDocument()
        )
        await user.click(screen.getByRole('menuitem', { name: /parent/i }))
        await waitFor(() =>
            expect(screen.getByText('Child')).toBeInTheDocument()
        )
    })

    it('search ArrowDown focuses first menuitem', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Search"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )
        await user.click(screen.getByRole('button', { name: /search/i }))
        await user.keyboard('{ArrowDown}')
        await waitFor(() => {
            const first = document.querySelector('[role="menuitem"]')
            expect(first).toBe(document.activeElement)
        })
    })

    it('renders trigger with slot', () => {
        render(
            <SingleSelectV2
                placeholder="With icon"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                slot={<span data-testid="trigger-slot">S</span>}
            />
        )
        expect(screen.getByTestId('trigger-slot')).toBeInTheDocument()
    })

    it('renders floating label trigger on small breakpoint with large size', () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 1200,
        })
        render(
            <SingleSelectV2
                placeholder="Placeholder"
                label="Label"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                size={SingleSelectV2Size.LARGE}
            />
        )
        expect(screen.getByText('Label')).toBeInTheDocument()
        vi.restoreAllMocks()
    })

    it('refocuses search when typing after focusing a menuitem', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Refocus"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )
        await user.click(screen.getByRole('button', { name: /refocus/i }))
        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.keyboard('{ArrowDown}')
        await waitFor(() =>
            expect(document.activeElement).not.toBe(searchInput)
        )
        await user.keyboard('x')
        await waitFor(() => expect(searchInput).toHaveFocus())
    })

    it('Delete key from menu refocuses search input', async () => {
        const user = userEvent.setup()
        render(
            <SingleSelectV2
                placeholder="Delete test"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )
        await user.click(screen.getByRole('button', { name: /delete test/i }))
        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.keyboard('{ArrowDown}')
        await waitFor(() =>
            expect(document.activeElement).not.toBe(searchInput)
        )
        await user.keyboard('{Delete}')
        await waitFor(() => expect(searchInput).toHaveFocus())
    })

    it('passes fullWidth to mobile trigger on mobile breakpoints', () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        })

        render(
            <SingleSelectV2
                placeholder="Mobile full width"
                items={createSearchItems()}
                selected=""
                onSelect={() => {}}
                usePanelOnMobile
                fullWidth
            />
        )

        const trigger = screen.getByRole('button', {
            name: /mobile full width/i,
        })
        expect(trigger).toHaveStyle({ width: '100%' })
        vi.restoreAllMocks()
    })

    it('throws for invalid customTrigger type', () => {
        expect(() =>
            render(
                <SingleSelectV2
                    placeholder="Invalid trigger"
                    items={createBasicItems()}
                    selected=""
                    onSelect={() => {}}
                    customTrigger={'invalid' as unknown as React.ReactElement}
                />
            )
        ).toThrow(
            'SingleSelectV2: customTrigger must be a valid React element.'
        )
    })

    it('renders mobile panel variant on mobile breakpoints', () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        })

        render(
            <SingleSelectV2
                placeholder="Mobile select"
                items={createBasicItems()}
                selected=""
                onSelect={() => {}}
                usePanelOnMobile
            />
        )

        expect(
            screen.getByRole('button', { name: /mobile select/i })
        ).toBeInTheDocument()
        vi.restoreAllMocks()
    })
})
