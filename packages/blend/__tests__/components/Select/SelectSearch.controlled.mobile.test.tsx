import React, { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { render, screen, waitFor } from '../../test-utils'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import MultiSelect from '../../../lib/components/MultiSelect/MultiSelect'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const items = [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
        ],
    },
]

describe('Select mobile controlled search', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
    })

    const assertControlledMobileSearch = async (
        renderSelect: (
            searchText: string,
            onSearchChange: (text: string) => void
        ) => React.ReactNode,
        triggerRole: 'button' | 'combobox'
    ) => {
        const onSearchChange = vi.fn()
        const Harness = () => {
            const [searchText, setSearchText] = useState('')
            return renderSelect(searchText, (text) => {
                onSearchChange(text)
                setSearchText(text)
            })
        }

        render(<Harness />)
        const trigger = screen.getByRole(triggerRole, {
            name: /controlled mobile/i,
        })
        fireEvent.click(trigger)
        const search = await screen.findByPlaceholderText('Search options...')
        fireEvent.change(search, { target: { value: 'a' } })
        fireEvent.change(search, { target: { value: 'ap' } })
        fireEvent.change(search, { target: { value: 'app' } })

        expect(onSearchChange.mock.calls.map(([text]) => text)).toEqual([
            'a',
            'ap',
            'app',
        ])
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()

        const overlay = document.querySelector('[data-drawer="drawer"]')
        expect(overlay).toHaveAttribute('data-state', 'open')
        fireEvent.keyDown(document, { key: 'Escape' })
        await waitFor(() =>
            expect(overlay).toHaveAttribute('data-state', 'closed')
        )
        fireEvent.click(trigger)

        expect(
            await screen.findByPlaceholderText('Search options...')
        ).toHaveValue('app')
        expect(onSearchChange).toHaveBeenCalledTimes(3)
    }

    it('does not filter SingleSelect items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <SingleSelect
                    placeholder="Controlled mobile"
                    items={items}
                    selected=""
                    onSelect={() => {}}
                    searchText={searchText}
                    onSearchChange={onSearchChange}
                />
            ),
            'button'
        ))

    it('does not filter MultiSelect items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <MultiSelect
                    label="Controlled mobile"
                    placeholder="Controlled mobile"
                    items={items}
                    selectedValues={[]}
                    onChange={() => {}}
                    searchText={searchText}
                    onSearchChange={onSearchChange}
                />
            ),
            'button'
        ))

    it('does not filter SingleSelectV2 items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <SingleSelectV2
                    placeholder="Controlled mobile"
                    items={items}
                    selected=""
                    onSelect={() => {}}
                    search={{ searchText, onSearchChange }}
                />
            ),
            'button'
        ))

    it('does not filter MultiSelectV2 items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <MultiSelectV2
                    label="Controlled mobile"
                    placeholder="Controlled mobile"
                    items={items}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ searchText, onSearchChange }}
                />
            ),
            'combobox'
        ))

    it('forwards SingleSelectV2 mobile open changes without clearing controlled search', async () => {
        const onOpenChange = vi.fn()
        render(
            <SingleSelectV2
                placeholder="Controlled mobile lifecycle"
                items={items}
                selected=""
                onSelect={() => {}}
                onOpenChange={onOpenChange}
                search={{ searchText: 'app', onSearchChange: () => {} }}
            />
        )

        const trigger = screen.getByRole('button', {
            name: /controlled mobile lifecycle/i,
        })
        fireEvent.click(trigger)
        expect(
            await screen.findByPlaceholderText('Search options...')
        ).toHaveValue('app')
        expect(onOpenChange).toHaveBeenLastCalledWith(true)

        fireEvent.keyDown(document, { key: 'Escape' })
        await waitFor(() =>
            expect(onOpenChange).toHaveBeenLastCalledWith(false)
        )

        fireEvent.click(trigger)
        expect(
            await screen.findByPlaceholderText('Search options...')
        ).toHaveValue('app')
    })

    const regressionCases = [
        {
            name: 'SingleSelect',
            triggerRole: 'button' as const,
            renderSelect: (
                testItems: typeof items,
                allowCustomValue = false
            ) => (
                <SingleSelect
                    placeholder="Controlled mobile regression"
                    items={testItems}
                    selected=""
                    onSelect={() => {}}
                    searchText="dragon"
                    onSearchChange={() => {}}
                    emptyStateText="Start typing to search"
                    allowCustomValue={allowCustomValue}
                />
            ),
        },
        {
            name: 'MultiSelect',
            triggerRole: 'button' as const,
            renderSelect: (
                testItems: typeof items,
                allowCustomValue = false
            ) => (
                <MultiSelect
                    label="Controlled mobile regression"
                    placeholder="Controlled mobile regression"
                    items={testItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    searchText="dragon"
                    onSearchChange={() => {}}
                    emptyStateText="Start typing to search"
                    allowCustomValue={allowCustomValue}
                />
            ),
        },
        {
            name: 'SingleSelectV2',
            triggerRole: 'button' as const,
            renderSelect: (
                testItems: typeof items,
                allowCustomValue = false
            ) => (
                <SingleSelectV2
                    placeholder="Controlled mobile regression"
                    items={testItems}
                    selected=""
                    onSelect={() => {}}
                    search={{
                        searchText: 'dragon',
                        onSearchChange: () => {},
                        emptyStateText: 'Start typing to search',
                    }}
                    allowCustomValue={allowCustomValue}
                />
            ),
        },
        {
            name: 'MultiSelectV2',
            triggerRole: 'combobox' as const,
            renderSelect: (
                testItems: typeof items,
                allowCustomValue = false
            ) => (
                <MultiSelectV2
                    label="Controlled mobile regression"
                    placeholder="Controlled mobile regression"
                    items={testItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{
                        searchText: 'dragon',
                        onSearchChange: () => {},
                        emptyStateText: 'Start typing to search',
                    }}
                    allowCustomValue={allowCustomValue}
                />
            ),
        },
    ]

    it.each(regressionCases)(
        '$name treats groups without options as an empty controlled mobile result',
        async ({ triggerRole, renderSelect }) => {
            render(renderSelect([{ groupLabel: 'People', items: [] }]))

            fireEvent.click(
                screen.getByRole(triggerRole, {
                    name: /controlled mobile regression/i,
                })
            )

            expect(
                await screen.findAllByText('Start typing to search')
            ).not.toHaveLength(0)
        }
    )

    it.each(regressionCases)(
        '$name renders a controlled custom value with empty mobile results',
        async ({ triggerRole, renderSelect }) => {
            render(renderSelect([], true))

            fireEvent.click(
                screen.getByRole(triggerRole, {
                    name: /controlled mobile regression/i,
                })
            )

            expect(
                await screen.findByText('Specify: "dragon"')
            ).toBeInTheDocument()
            expect(
                screen.queryByText('Start typing to search')
            ).not.toBeInTheDocument()
        }
    )

    it('keeps a synthetic custom value out of legacy mobile Select All', async () => {
        const onSelectionChange = vi.fn()
        render(
            <MultiSelect
                label="Controlled Select All"
                placeholder="Controlled Select All"
                items={[{ items: [{ label: 'Apple', value: 'apple' }] }]}
                selectedValues={[]}
                onChange={() => {}}
                onSelectionChange={onSelectionChange}
                searchText="dragon"
                onSearchChange={() => {}}
                allowCustomValue
                enableSelectAll
            />
        )

        fireEvent.click(
            screen.getByRole('button', { name: /controlled select all/i })
        )
        fireEvent.click(await screen.findByText('Select All'))

        expect(onSelectionChange).toHaveBeenCalledWith(['apple'])
    })
})
