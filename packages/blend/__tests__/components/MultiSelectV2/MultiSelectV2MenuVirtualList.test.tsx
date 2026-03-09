import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test-utils'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import MultiSelectV2MenuVirtualList from '../../../lib/components/MultiSelectV2/MultiSelectV2MenuVirtualList'
import { flattenMenuGroups } from '../../../lib/components/MultiSelectV2/utils'
import { getMultiSelectV2Tokens } from '../../../lib/components/MultiSelectV2/multiSelectV2.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import { Theme } from '../../../lib/context/theme.enum'
import type { MultiSelectV2GroupType } from '../../../lib/components/MultiSelectV2/types'

vi.mock('../../../lib/components/VirtualList/VirtualList', () => {
    const MockVirtualList = ({
        items,
        renderItem,
    }: {
        items: {
            id: string
            type: string
            label?: string
            item?: { label: string; value: string }
            groupId?: number
        }[]
        renderItem: (arg: { item: (typeof items)[0] }) => React.ReactNode
    }) => (
        <div data-testid="virtual-list">
            {items.map((item, index) => (
                <div key={item.id ?? index}>{renderItem({ item })}</div>
            ))}
        </div>
    )
    return { default: MockVirtualList }
})

const tokens = getMultiSelectV2Tokens(FOUNDATION_THEME, Theme.LIGHT).sm

const groupsWithLabelAndSeparator: MultiSelectV2GroupType[] = [
    {
        groupLabel: 'Group A',
        showSeparator: true,
        items: [
            { label: 'Option A1', value: 'a1' },
            { label: 'Option A2', value: 'a2' },
        ],
    },
    {
        groupLabel: 'Group B',
        items: [{ label: 'Option B1', value: 'b1' }],
    },
]

describe('MultiSelectV2MenuVirtualList', () => {
    beforeEach(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as unknown as typeof ResizeObserver
    })

    it('renders label, separator, and item rows when VirtualList calls renderItem', () => {
        const flattened = flattenMenuGroups(groupsWithLabelAndSeparator)
        const itemIndexMap = new Map<string, number>()
        flattened
            .filter((i) => i.type === 'item')
            .forEach((item, idx) => {
                if (item.id) itemIndexMap.set(item.id, idx)
            })
        const allItemsFlat = groupsWithLabelAndSeparator.flatMap((g) => g.items)

        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2MenuVirtualList
                        flattenedItems={flattened}
                        itemIndexMap={itemIndexMap}
                        allItemsFlat={allItemsFlat}
                        selected={[]}
                        onSelect={() => {}}
                        tokens={tokens}
                        height={300}
                        itemHeight={48}
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )

        expect(screen.getByTestId('virtual-list')).toBeInTheDocument()
        expect(screen.getByText('Group A')).toBeInTheDocument()
        expect(screen.getByText('Group B')).toBeInTheDocument()
        expect(
            screen.getByRole('option', { name: /option a1/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('option', { name: /option a2/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('option', { name: /option b1/i })
        ).toBeInTheDocument()
    })

    it('renders with paddingTop from tokens', () => {
        const flattened = flattenMenuGroups([
            { items: [{ label: 'X', value: 'x' }] },
        ])
        const itemIndexMap = new Map([['item-0', 0]])
        render(
            <RadixMenu.Root open>
                <RadixMenu.Content>
                    <MultiSelectV2MenuVirtualList
                        flattenedItems={flattened}
                        itemIndexMap={itemIndexMap}
                        allItemsFlat={[{ label: 'X', value: 'x' }]}
                        selected={[]}
                        onSelect={() => {}}
                        tokens={tokens}
                        height={200}
                        itemHeight={40}
                        paddingTop="0.5rem"
                    />
                </RadixMenu.Content>
            </RadixMenu.Root>
        )
        expect(screen.getByRole('option', { name: /x/i })).toBeInTheDocument()
    })
})
