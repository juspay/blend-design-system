import React, { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import MultiSelect from '../../../lib/components/MultiSelect/MultiSelect'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import {
    ControlledMultiSelectSearchAdapter,
    ControlledSingleSelectSearchAdapter,
} from '../../fixtures/ControlledSelectSearchAdapter'

const items = [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
        ],
    },
]

const useControlledSearch = (onChange: (text: string) => void) => {
    const [searchText, setSearchText] = useState('')
    return {
        searchText,
        onSearchChange: (text: string) => {
            onChange(text)
            setSearchText(text)
        },
    }
}

describe('Select search controlled behavior', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1280,
        })
    })

    it('supports consumer adapters through the public package surface', () => {
        expect(ControlledSingleSelectSearchAdapter).toBeTypeOf('function')
        expect(ControlledMultiSelectSearchAdapter).toBeTypeOf('function')
    })

    const cases = [
        {
            name: 'SingleSelect',
            triggerRole: 'button' as const,
            renderSelect: (onChange: (text: string) => void) => {
                const Harness = () => {
                    const search = useControlledSearch(onChange)
                    return (
                        <SingleSelect
                            placeholder="Controlled select"
                            items={items}
                            selected=""
                            onSelect={() => {}}
                            {...search}
                        />
                    )
                }
                return <Harness />
            },
        },
        {
            name: 'MultiSelect',
            triggerRole: 'button' as const,
            renderSelect: (onChange: (text: string) => void) => {
                const Harness = () => {
                    const search = useControlledSearch(onChange)
                    return (
                        <MultiSelect
                            label="Controlled select"
                            placeholder="Controlled select"
                            items={items}
                            selectedValues={[]}
                            onChange={() => {}}
                            {...search}
                        />
                    )
                }
                return <Harness />
            },
        },
        {
            name: 'SingleSelectV2',
            triggerRole: 'button' as const,
            renderSelect: (onChange: (text: string) => void) => {
                const Harness = () => {
                    const search = useControlledSearch(onChange)
                    return (
                        <SingleSelectV2
                            placeholder="Controlled select"
                            items={items}
                            selected=""
                            onSelect={() => {}}
                            search={search}
                        />
                    )
                }
                return <Harness />
            },
        },
        {
            name: 'MultiSelectV2',
            triggerRole: 'combobox' as const,
            renderSelect: (onChange: (text: string) => void) => {
                const Harness = () => {
                    const search = useControlledSearch(onChange)
                    return (
                        <MultiSelectV2
                            label="Controlled select"
                            placeholder="Controlled select"
                            items={items}
                            selectedValues={[]}
                            onChange={() => {}}
                            search={search}
                        />
                    )
                }
                return <Harness />
            },
        },
    ]

    it.each(cases)(
        '$name emits every keystroke and never filters consumer items',
        async ({ triggerRole, renderSelect }) => {
            const onSearchChange = vi.fn()
            const { user } = render(renderSelect(onSearchChange))

            await user.click(
                screen.getByRole(triggerRole, { name: /controlled select/i })
            )
            await user.type(
                screen.getByPlaceholderText('Search options...'),
                'app'
            )

            expect(onSearchChange.mock.calls.map(([text]) => text)).toEqual([
                'a',
                'ap',
                'app',
            ])
            expect(screen.getByText('Apple')).toBeInTheDocument()
            expect(screen.getByText('Banana')).toBeInTheDocument()
        }
    )

    it('shows controlled loading and custom empty states inside the menu', async () => {
        const { user, rerender } = render(
            <SingleSelect
                placeholder="Async select"
                items={[]}
                selected=""
                onSelect={() => {}}
                searchText="app"
                onSearchChange={() => {}}
                isSearchLoading
                emptyStateText="Start typing to search"
            />
        )

        await user.click(screen.getByRole('button', { name: /async select/i }))
        expect(screen.getByText('Searching…')).toBeInTheDocument()
        expect(
            screen.queryByText('Start typing to search')
        ).not.toBeInTheDocument()

        rerender(
            <SingleSelect
                placeholder="Async select"
                items={[]}
                selected=""
                onSelect={() => {}}
                searchText="app"
                onSearchChange={() => {}}
                emptyStateText="Start typing to search"
            />
        )

        expect(screen.getAllByText('Start typing to search')).not.toHaveLength(
            0
        )
    })

    it('recovers focus when an async result removes the focused option', async () => {
        const { user, rerender } = render(
            <SingleSelectV2
                placeholder="Async focus"
                items={items}
                selected=""
                onSelect={() => {}}
                search={{ searchText: '', onSearchChange: () => {} }}
            />
        )

        await user.click(screen.getByRole('button', { name: /async focus/i }))
        const searchInput = screen.getByPlaceholderText('Search options...')
        await user.keyboard('{ArrowDown}')
        expect(
            screen.getByText('Apple').closest('[role="menuitem"]')
        ).toHaveFocus()

        rerender(
            <SingleSelectV2
                placeholder="Async focus"
                items={[{ items: [{ label: 'Banana', value: 'banana' }] }]}
                selected=""
                onSelect={() => {}}
                search={{ searchText: '', onSearchChange: () => {} }}
            />
        )

        await waitFor(() => expect(searchInput).toHaveFocus())
    })
})
