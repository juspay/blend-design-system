import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import SingleSelectV2VirtualList from '../../../lib/components/SingleSelectV2/SingleSelectV2VirtualList'
import SingleSelectV2Trigger from '../../../lib/components/SingleSelectV2/SingleSelectV2Trigger'
import SingleSelectV2Skeleton from '../../../lib/components/SingleSelectV2/SingleSelectV2Skeleton'
import SingleSelectV2Search from '../../../lib/components/SingleSelectV2/SingleSelectV2Search'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    type FlattenedItem,
} from '../../../lib/components/SingleSelectV2/types'
import { getSingleSelectV2Tokens } from '../../../lib/components/SingleSelectV2/singleSelectV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'

vi.mock(
    '../../../lib/components/SingleSelectV2/SingleSelectV2MenuItems',
    () => ({
        MenuItem: ({ item }: { item: { label: string } }) => (
            <div data-testid="virtual-menu-item">{item.label}</div>
        ),
    })
)

const singleSelectTokens = getSingleSelectV2Tokens(
    FOUNDATION_THEME,
    Theme.LIGHT
).sm

describe('SingleSelectV2 parts', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders virtual list rows for group label, item and separator', () => {
        const flattenedItems: FlattenedItem[] = [
            { id: 'label-1', type: 'label', label: 'Group A' },
            {
                id: 'item-1',
                type: 'item',
                item: { label: 'Option A', value: 'option-a' },
            },
            { id: 'separator-1', type: 'separator' },
            { id: 'bad-row', type: 'item' },
        ]

        const virtualItems = [
            { key: 'label-1', index: 0, start: 0, size: 36, end: 36 },
            { key: 'item-1', index: 1, start: 36, size: 48, end: 84 },
            { key: 'separator-1', index: 2, start: 84, size: 12, end: 96 },
            { key: 'bad-row', index: 3, start: 96, size: 48, end: 144 },
        ]

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <SingleSelectV2VirtualList
                        flattenedItems={flattenedItems}
                        selected=""
                        onSelect={() => {}}
                        singleSelectTokens={singleSelectTokens}
                        size={SingleSelectV2Size.MEDIUM}
                        variant={SingleSelectV2Variant.CONTAINER}
                        virtualViewportHeight={220}
                        virtualItems={virtualItems}
                        totalSize={96}
                        measureElement={vi.fn()}
                        loadingComponent={<div>Loading more</div>}
                        hasMore
                        virtualScrollRef={React.createRef<HTMLDivElement>()}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(screen.getByText('Group A')).toBeInTheDocument()
        expect(screen.getByTestId('virtual-menu-item')).toHaveTextContent(
            'Option A'
        )
        expect(screen.getByText('Loading more')).toBeInTheDocument()
    })

    it('renders trigger in full-width mode with selected text', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.MEDIUM}
                selected="option-1"
                label="Label"
                name="single-select-v2-trigger"
                placeholder="Select option"
                required={false}
                valueLabelMap={{ 'option-1': 'Option 1' }}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize={false}
                isItemSelected
                singleSelectTokens={singleSelectTokens}
                fullWidth
            />
        )

        const trigger = screen.getByRole('button', { name: /option 1/i })
        expect(trigger).toHaveStyle({ width: '100%' })
        expect(trigger).toHaveAttribute('data-element', 'single-select-button')
    })

    it('renders skeleton rows from provided count', () => {
        render(
            <SingleSelectV2Skeleton
                singleSelectTokens={singleSelectTokens}
                skeleton={{ show: true, count: 2, variant: 'pulse' }}
            />
        )

        expect(screen.getAllByTestId('skeleton')).toHaveLength(2)
    })

    it('renders skeleton with variant shimmer and default count when count is 0', () => {
        render(
            <SingleSelectV2Skeleton
                singleSelectTokens={singleSelectTokens}
                skeleton={{ show: true, count: 0, variant: 'shimmer' }}
            />
        )
        expect(screen.getAllByTestId('skeleton')).toHaveLength(3)
    })

    it('renders trigger with maxTriggerWidth and not fullWidth', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.MEDIUM}
                selected=""
                label=""
                name="trigger-width"
                placeholder="Placeholder"
                required={false}
                valueLabelMap={{}}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize={false}
                isItemSelected={false}
                singleSelectTokens={singleSelectTokens}
                fullWidth={false}
                maxTriggerWidth={300}
            />
        )
        expect(
            screen.getByRole('button', { name: /placeholder/i })
        ).toBeInTheDocument()
    })

    it('renders trigger disabled with selected value', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.MEDIUM}
                selected="x"
                label="Label"
                name="trigger-disabled"
                placeholder="Placeholder"
                required={false}
                valueLabelMap={{ x: 'Selected X' }}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize={false}
                isItemSelected
                singleSelectTokens={singleSelectTokens}
                disabled
            />
        )
        expect(
            screen.getByRole('button', { name: /selected x/i })
        ).toBeDisabled()
    })

    it('renders trigger with placeholder when no selection', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.MEDIUM}
                selected=""
                label=""
                name="placeholder-trigger"
                placeholder="Choose one"
                required={false}
                valueLabelMap={{}}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize={false}
                isItemSelected={false}
                singleSelectTokens={singleSelectTokens}
            />
        )
        expect(
            screen.getByRole('button', { name: /choose one/i })
        ).toBeInTheDocument()
        expect(screen.getByText('Choose one')).toBeInTheDocument()
    })

    it('renders trigger with selected value not in valueLabelMap as fallback', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.MEDIUM}
                selected="raw-value"
                label=""
                name="fallback-trigger"
                placeholder="Placeholder"
                required={false}
                valueLabelMap={{}}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize={false}
                isItemSelected
                singleSelectTokens={singleSelectTokens}
            />
        )
        expect(
            screen.getByRole('button', { name: /raw-value/i })
        ).toBeInTheDocument()
    })

    it('renders floating label trigger with required false and selected', () => {
        render(
            <SingleSelectV2Trigger
                size={SingleSelectV2Size.LARGE}
                selected="a"
                label="Field"
                name="floating"
                placeholder="Pick"
                required={false}
                valueLabelMap={{ a: 'Option A' }}
                open={false}
                variant={SingleSelectV2Variant.CONTAINER}
                isSmallScreenWithLargeSize
                isItemSelected
                singleSelectTokens={singleSelectTokens}
            />
        )
        expect(screen.getByText('Option A')).toBeInTheDocument()
        expect(screen.getByText('Field')).toBeInTheDocument()
    })

    it('search ArrowDown focuses first menuitem in dropdown', async () => {
        const user = userEvent.setup()
        const searchInputRef = React.createRef<HTMLInputElement>(null)
        const containerRef = React.createRef<HTMLDivElement>(null)
        render(
            <div data-dropdown="dropdown">
                <SingleSelectV2Search
                    enabled
                    hasItems
                    backgroundColor="#fff"
                    searchPlaceholder="Search"
                    searchText=""
                    onSearchTextChange={() => {}}
                    searchInputRef={searchInputRef}
                    containerRef={containerRef}
                />
                <button type="button" role="menuitem">
                    First
                </button>
            </div>
        )
        const input = screen.getByRole('searchbox')
        input.focus()
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus()
    })
})
