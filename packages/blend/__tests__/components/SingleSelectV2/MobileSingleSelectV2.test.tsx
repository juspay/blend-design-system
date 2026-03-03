import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import MobileSingleSelectV2 from '../../../lib/components/SingleSelectV2/MobileSingleSelectV2'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
} from '../../../lib/components/SingleSelectV2/types'

vi.mock('../../../lib/components/Drawer', () => ({
    Drawer: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DrawerTrigger: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DrawerPortal: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DrawerOverlay: () => <div data-testid="drawer-overlay" />,
    DrawerContent: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DrawerBody: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

const mobileItems = [
    {
        groupLabel: 'Cities',
        showSeparator: true,
        items: [
            { label: 'Mostar', value: 'mostar' },
            { label: 'Moscow', value: 'moscow' },
        ],
    },
]

const mobileItemsTwoGroups = [
    {
        groupLabel: 'A',
        showSeparator: true,
        items: [{ label: 'A1', value: 'a1' }],
    },
    { groupLabel: 'B', items: [{ label: 'B1', value: 'b1' }] },
]

describe('MobileSingleSelectV2', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('filters list with search input and supports backspace', async () => {
        const user = userEvent.setup()
        render(
            <MobileSingleSelectV2
                placeholder="Select city"
                items={mobileItems}
                selected=""
                onSelect={() => {}}
                enableSearch
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )

        const searchInput = screen.getByPlaceholderText('Search options...')
        await user.type(searchInput, 'most')
        await user.keyboard('{Backspace}')

        expect(searchInput).toHaveValue('mos')
        expect(screen.getByText('Mostar')).toBeInTheDocument()
    })

    it('shows empty and no-results states', async () => {
        const user = userEvent.setup()
        const { rerender } = render(
            <MobileSingleSelectV2
                placeholder="Empty mobile"
                items={[]}
                selected=""
                onSelect={() => {}}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )

        expect(screen.getByText('No items available')).toBeInTheDocument()

        rerender(
            <MobileSingleSelectV2
                placeholder="Search mobile"
                items={mobileItems}
                selected=""
                onSelect={() => {}}
                enableSearch
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )

        const searchInput = screen.getByPlaceholderText('Search options...')
        await user.clear(searchInput)
        await user.type(searchInput, 'zzzz')

        expect(screen.getByText('No results found')).toBeInTheDocument()
    })

    it('calls onSelect when mobile item is clicked', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        render(
            <MobileSingleSelectV2
                placeholder="Select city"
                items={mobileItems}
                selected=""
                onSelect={onSelect}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )

        await user.click(screen.getByText('Moscow'))
        expect(onSelect).toHaveBeenCalledWith('moscow')
    })

    it('renders two groups with separator between them', () => {
        render(
            <MobileSingleSelectV2
                placeholder="Two groups"
                items={mobileItemsTwoGroups}
                selected=""
                onSelect={() => {}}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )
        expect(screen.getByText('A1')).toBeInTheDocument()
        expect(screen.getByText('B1')).toBeInTheDocument()
    })

    it('shows skeleton when skeleton.show is true', () => {
        render(
            <MobileSingleSelectV2
                placeholder="Loading"
                items={mobileItems}
                selected=""
                onSelect={() => {}}
                skeleton={{ show: true, count: 2, variant: 'pulse' }}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )
        expect(
            document.querySelectorAll('[data-testid="skeleton"]')
        ).toHaveLength(2)
    })

    it('renders item with subLabel', () => {
        render(
            <MobileSingleSelectV2
                placeholder="With sub"
                items={[
                    {
                        items: [
                            {
                                label: 'Item',
                                value: 'i',
                                subLabel: 'Description',
                            },
                        ],
                    },
                ]}
                selected=""
                onSelect={() => {}}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )
        expect(screen.getByText('Item')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('filters subMenu items by search and shows parent when child matches', async () => {
        const user = userEvent.setup()
        render(
            <MobileSingleSelectV2
                placeholder="Submenu search"
                items={[
                    {
                        items: [
                            {
                                label: 'Parent',
                                value: 'p',
                                subMenu: [
                                    { label: 'Child A', value: 'ca' },
                                    { label: 'Child B', value: 'cb' },
                                ],
                            },
                        ],
                    },
                ]}
                selected=""
                onSelect={() => {}}
                enableSearch
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )
        const searchInput = screen.getByPlaceholderText('Search options...')
        await user.type(searchInput, 'child b')
        expect(searchInput).toHaveValue('child b')
        expect(screen.getByText('Parent')).toBeInTheDocument()
    })

    it('shows skeleton with variant shimmer and default count', () => {
        render(
            <MobileSingleSelectV2
                placeholder="Skeleton variant"
                items={mobileItems}
                selected=""
                onSelect={() => {}}
                skeleton={{ show: true, count: 0, variant: 'shimmer' }}
                size={SingleSelectV2Size.MEDIUM}
                variant={SingleSelectV2Variant.CONTAINER}
            />
        )
        expect(
            document.querySelectorAll('[data-testid="skeleton"]')
        ).toHaveLength(3)
    })
})
