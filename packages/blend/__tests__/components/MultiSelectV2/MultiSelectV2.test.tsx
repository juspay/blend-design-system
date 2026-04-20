import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import { MultiSelectV2SelectionTagType } from '../../../lib/components/MultiSelectV2/multiSelectV2.types'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const createBasicItems = (): {
    groupLabel: string
    items: { label: string; value: string }[]
}[] => [
    {
        groupLabel: 'Fruits',
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
        ],
    },
]

const createLargeItems = (count = 100) => [
    {
        groupLabel: 'Large List',
        items: Array.from({ length: count }, (_, idx) => ({
            label: `Item ${idx + 1}`,
            value: `item-${idx + 1}`,
        })),
    },
]

const createTwoGroups = () => [
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

describe('MultiSelectV2', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('opens and closes when clicking trigger repeatedly', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(
            <MultiSelectV2
                label="Select options"
                placeholder="Select options"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={onChange}
            />
        )

        const trigger = screen.getByRole('combobox', {
            name: /select options/i,
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })

    it('calls onChange when selecting an item and keeps menu open', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <MultiSelectV2
                label="Select fruit"
                placeholder="Select fruit"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={onChange}
            />
        )

        await user.click(
            screen.getByRole('combobox', { name: /select fruit/i })
        )
        const option = await screen.findByRole('option', { name: /banana/i })
        await user.click(option)

        expect(onChange).toHaveBeenCalledWith('banana')
        await waitFor(() => {
            expect(screen.getByRole('combobox')).toHaveAttribute(
                'aria-expanded',
                'true'
            )
        })
    })

    it('calls onChange with array when clear button is clicked', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <MultiSelectV2
                label="Select"
                placeholder="Select"
                items={createBasicItems()}
                selectedValues={['apple', 'banana']}
                onChange={onChange}
            />
        )

        const clearButton = screen.getByRole('button', {
            name: /clear selection/i,
        })
        await user.click(clearButton)

        expect(onChange).toHaveBeenCalledWith([])
    })

    it('respects disabled state and does not open', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Disabled"
                placeholder="Disabled"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                disabled
            />
        )

        const trigger = screen.getByRole('combobox', { name: /disabled/i })
        expect(trigger).toBeDisabled()
        await user.click(trigger)
        expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('shows empty state when items are empty', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Empty"
                placeholder="Empty"
                items={[]}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        await user.click(screen.getByRole('combobox', { name: /empty/i }))
        expect(
            await screen.findByText('No items available')
        ).toBeInTheDocument()
    })

    it('shows no results message for unmatched search', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Search"
                placeholder="Search"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                search={{ show: true }}
            />
        )

        await user.click(screen.getByRole('combobox', { name: /search/i }))
        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.type(searchInput, 'zzzzz')
        expect(await screen.findByText('No results found')).toBeInTheDocument()
    })

    it('filters options via search input', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Search fruit"
                placeholder="Search fruit"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                search={{ show: true }}
            />
        )

        await user.click(
            screen.getByRole('combobox', { name: /search fruit/i })
        )
        const searchInput =
            await screen.findByPlaceholderText('Search options...')
        await user.type(searchInput, 'Ban')
        await waitFor(() => {
            expect(screen.getByText('Banana')).toBeInTheDocument()
        })
        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })

    it('shows skeleton in menu when skeleton.show is true', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Loading"
                placeholder="Loading"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                skeleton={{ show: true, count: 2, variant: 'pulse' }}
            />
        )
        await user.click(screen.getByRole('combobox', { name: /loading/i }))
        expect(
            document.querySelectorAll('[data-testid="skeleton"]')
        ).toHaveLength(2)
    })

    it('renders two groups with labels and separator', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Pick"
                placeholder="Pick"
                items={createTwoGroups()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        await user.click(screen.getByRole('combobox', { name: /pick/i }))
        expect(screen.getByText('Group A')).toBeInTheDocument()
        expect(screen.getByText('Group B')).toBeInTheDocument()
        expect(screen.getByText('A1')).toBeInTheDocument()
        expect(screen.getByText('B1')).toBeInTheDocument()
    })

    it('renders submenu and opens submenu on item click', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="With submenu"
                placeholder="With submenu"
                items={createItemsWithSubMenu()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        await user.click(
            screen.getByRole('combobox', { name: /with submenu/i })
        )
        await waitFor(() =>
            expect(screen.getByText('Parent')).toBeInTheDocument()
        )
        await user.click(screen.getByRole('menuitem', { name: /parent/i }))
        await waitFor(() =>
            expect(screen.getByText('Child')).toBeInTheDocument()
        )
    })

    it('renders trigger with slot', () => {
        render(
            <MultiSelectV2
                label="With icon"
                placeholder="With icon"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                slot={<span data-testid="trigger-slot">S</span>}
            />
        )
        expect(screen.getByTestId('trigger-slot')).toBeInTheDocument()
    })

    it('displays selected count in trigger when selectionTagType is COUNT', () => {
        render(
            <MultiSelectV2
                label="Select"
                placeholder="Select"
                items={createBasicItems()}
                selectedValues={['apple', 'banana']}
                onChange={() => {}}
                selectionTagType={MultiSelectV2SelectionTagType.COUNT}
            />
        )
        expect(screen.getByRole('combobox')).toHaveTextContent('2')
    })

    it('calls onOpenChange when menu opens and closes', async () => {
        const user = userEvent.setup()
        const onOpenChange = vi.fn()

        render(
            <MultiSelectV2
                label="Open change"
                placeholder="Open change"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                onOpenChange={onOpenChange}
            />
        )

        await user.click(screen.getByRole('combobox', { name: /open change/i }))
        expect(onOpenChange).toHaveBeenCalledWith(true)

        await user.click(screen.getByRole('combobox', { name: /open change/i }))
        await waitFor(() => {
            expect(onOpenChange).toHaveBeenCalledWith(false)
        })
    })

    it('renders Select All when enableSelectAll is true', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Select all"
                placeholder="Select all"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                enableSelectAll
                selectAllText="Select All"
            />
        )
        await user.click(screen.getByRole('combobox', { name: /select all/i }))
        expect(await screen.findByText('Select All')).toBeInTheDocument()
    })

    it('has data-multi-select attribute on root', () => {
        render(
            <MultiSelectV2
                label="Select"
                placeholder="Select"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        const root = document.querySelector(
            '[data-multi-select="multi-select"]'
        )
        expect(root).toBeInTheDocument()
    })

    it('renders virtualized list when enableVirtualization and many items', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Large list"
                placeholder="Large list"
                items={createLargeItems(100)}
                selectedValues={[]}
                onChange={() => {}}
                enableVirtualization
            />
        )
        await user.click(screen.getByRole('combobox', { name: /large list/i }))
        await waitFor(() => {
            const options = screen.getAllByRole('option')
            expect(options.length).toBeGreaterThan(0)
        })
    })

    it('renders mobile panel on mobile breakpoint when usePanelOnMobile', () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

        render(
            <MultiSelectV2
                label="Mobile select"
                placeholder="Mobile select"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                usePanelOnMobile
            />
        )

        expect(
            screen.getByRole('combobox', { name: /mobile select/i })
        ).toBeInTheDocument()
        vi.restoreAllMocks()
    })

    it('shows action buttons when primaryAction provided', async () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'lg',
            innerWidth: 1280,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

        const user = userEvent.setup()
        const onApply = vi.fn()
        render(
            <MultiSelectV2
                label="Actions"
                placeholder="Actions"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                primaryAction={{ text: 'Apply', onClick: onApply }}
            />
        )
        await user.click(screen.getByRole('combobox', { name: /actions/i }))
        const applyBtn = await screen.findByRole('button', { name: /apply/i })
        expect(applyBtn).toBeInTheDocument()
        await user.click(applyBtn)
        expect(onApply).toHaveBeenCalled()

        vi.restoreAllMocks()
    })

    it('calls secondaryAction onClick and closes menu when secondary button clicked', async () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'lg',
            innerWidth: 1280,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

        const user = userEvent.setup()
        const onCancel = vi.fn()
        render(
            <MultiSelectV2
                label="With secondary"
                placeholder="With secondary"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                primaryAction={{ text: 'Apply', onClick: () => {} }}
                secondaryAction={{ text: 'Cancel', onClick: onCancel }}
            />
        )
        await user.click(
            screen.getByRole('combobox', { name: /with secondary/i })
        )
        const cancelBtn = await screen.findByRole('button', { name: /cancel/i })
        await user.click(cancelBtn)
        expect(onCancel).toHaveBeenCalled()
        await waitFor(() => {
            expect(
                screen.getByRole('combobox', { name: /with secondary/i })
            ).toHaveAttribute('aria-expanded', 'false')
        })
        vi.restoreAllMocks()
    })
})
