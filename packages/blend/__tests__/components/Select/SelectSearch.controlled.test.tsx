import React, { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import MultiSelect from '../../../lib/components/MultiSelect/MultiSelect'
import { MultiSelectSelectionTagType } from '../../../lib/components/MultiSelect/types'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import { MultiSelectV2SelectionTagType } from '../../../lib/components/MultiSelectV2/multiSelectV2.types'
import {
    ControlledMultiSelectV1SearchAdapter,
    ControlledMultiSelectSearchAdapter,
    ControlledSingleSelectV1SearchAdapter,
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

const virtualItems = Array.from({ length: 40 }, (_, index) => ({
    items: [
        {
            label: `Person ${index}`,
            value: `person-${index}`,
        },
    ],
}))

const getVirtualScrollElement = () => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('div'))
    const element =
        elements.find(
            (candidate) =>
                candidate.dataset.element === 'virtual-list' &&
                candidate.style.overflow === 'auto' &&
                candidate.style.height !== ''
        ) ??
        elements.find(
            (candidate) =>
                candidate.style.position === 'relative' &&
                candidate.style.overflow === 'auto' &&
                candidate.style.height !== ''
        )

    if (!element) throw new Error('Virtual scroll element not found')
    return element
}

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
        expect(ControlledSingleSelectV1SearchAdapter).toBeTypeOf('function')
        expect(ControlledMultiSelectV1SearchAdapter).toBeTypeOf('function')
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

    const regressionCases = [
        {
            name: 'SingleSelect',
            triggerRole: 'button' as const,
            renderSelect: (
                testItems: typeof items,
                allowCustomValue = false
            ) => (
                <SingleSelect
                    placeholder="Controlled regression"
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
                    label="Controlled regression"
                    placeholder="Controlled regression"
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
                    placeholder="Controlled regression"
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
                    label="Controlled regression"
                    placeholder="Controlled regression"
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

    it.each(cases)(
        '$name emits every keystroke and never filters consumer items',
        async ({ triggerRole, renderSelect }) => {
            const onSearchChange = vi.fn()
            const { user } = render(renderSelect(onSearchChange))

            const trigger = screen.getByRole(triggerRole, {
                name: /controlled select/i,
            })
            await user.click(trigger)
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

            await user.click(trigger)
            await user.click(trigger)
            expect(
                screen.getByPlaceholderText('Search options...')
            ).toHaveValue('app')
            expect(onSearchChange).toHaveBeenCalledTimes(3)
        }
    )

    it.each(regressionCases)(
        '$name treats groups without options as an empty controlled result',
        async ({ triggerRole, renderSelect }) => {
            const { user } = render(
                renderSelect([{ groupLabel: 'People', items: [] }])
            )

            await user.click(
                screen.getByRole(triggerRole, {
                    name: /controlled regression/i,
                })
            )

            expect(
                screen.getAllByText('Start typing to search')
            ).not.toHaveLength(0)
        }
    )

    it.each(regressionCases)(
        '$name renders a controlled custom value when the consumer items are empty',
        async ({ triggerRole, renderSelect }) => {
            const { user } = render(renderSelect([], true))

            await user.click(
                screen.getByRole(triggerRole, {
                    name: /controlled regression/i,
                })
            )

            expect(screen.getByText('Specify: "dragon"')).toBeInTheDocument()
            expect(
                screen.queryByText('Start typing to search')
            ).not.toBeInTheDocument()
        }
    )

    it.each([
        {
            name: 'MultiSelect',
            triggerRole: 'button' as const,
            renderSelect: (testItems: typeof items) => (
                <MultiSelect
                    label="Remote selection"
                    placeholder="Remote selection"
                    items={testItems}
                    selectedValues={['apple']}
                    onChange={() => {}}
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                    searchText="ban"
                    onSearchChange={() => {}}
                />
            ),
        },
        {
            name: 'MultiSelectV2',
            triggerRole: 'combobox' as const,
            renderSelect: (testItems: typeof items) => (
                <MultiSelectV2
                    label="Remote selection"
                    placeholder="Remote selection"
                    items={testItems}
                    selectedValues={['apple']}
                    onChange={() => {}}
                    selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                    search={{
                        searchText: 'ban',
                        onSearchChange: () => {},
                    }}
                />
            ),
        },
    ])(
        '$name keeps controlled selected values readable across remote result pages',
        async ({ renderSelect }) => {
            const { rerender } = render(
                renderSelect([
                    { items: [{ label: 'Banana', value: 'banana' }] },
                ])
            )

            expect(screen.getByText('apple')).toBeInTheDocument()

            rerender(renderSelect(items))
            expect(screen.getByText('Apple')).toBeInTheDocument()
        }
    )

    it.each([
        {
            name: 'SingleSelect',
            triggerRole: 'button' as const,
            renderSelect: (isSearchLoading: boolean) => (
                <SingleSelect
                    placeholder="Virtual controlled search"
                    items={virtualItems}
                    selected=""
                    onSelect={() => {}}
                    searchText="person"
                    onSearchChange={() => {}}
                    isSearchLoading={isSearchLoading}
                    enableVirtualization
                    maxMenuHeight={200}
                    hasMore
                />
            ),
        },
        {
            name: 'MultiSelect',
            triggerRole: 'button' as const,
            renderSelect: (isSearchLoading: boolean) => (
                <MultiSelect
                    label="Virtual controlled search"
                    placeholder="Virtual controlled search"
                    items={virtualItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    searchText="person"
                    onSearchChange={() => {}}
                    isSearchLoading={isSearchLoading}
                    enableVirtualization
                    maxMenuHeight={200}
                    hasMore
                />
            ),
        },
        {
            name: 'MultiSelectV2',
            triggerRole: 'combobox' as const,
            renderSelect: (isSearchLoading: boolean) => (
                <MultiSelectV2
                    label="Virtual controlled search"
                    placeholder="Virtual controlled search"
                    items={virtualItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{
                        searchText: 'person',
                        onSearchChange: () => {},
                        isSearchLoading,
                    }}
                    enableVirtualization
                    menuDimensions={{ maxHeight: 200 }}
                    hasMore
                />
            ),
        },
    ])(
        '$name reserves search loading space without hiding virtualized results',
        async ({ triggerRole, renderSelect }) => {
            const { user, rerender } = render(renderSelect(false))
            await user.click(
                screen.getByRole(triggerRole, {
                    name: /virtual controlled search/i,
                })
            )

            let initialHeight = 0
            await waitFor(() => {
                initialHeight = Number.parseFloat(
                    getVirtualScrollElement().style.height
                )
                expect(initialHeight).toBeGreaterThan(0)
            })
            rerender(renderSelect(true))

            await waitFor(() => {
                expect(screen.getByText('Searching…')).toBeInTheDocument()
                expect(screen.getByText('Person 0')).toBeInTheDocument()
                expect(
                    Number.parseFloat(getVirtualScrollElement().style.height)
                ).toBe(initialHeight - 36)
            })
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
                allowCustomValue
            />
        )

        await user.click(screen.getByRole('button', { name: /async select/i }))
        expect(screen.getByText('Searching…')).toBeInTheDocument()
        expect(
            screen.queryByText('Start typing to search')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('Specify: "app"')).not.toBeInTheDocument()

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

    it('keeps controlled search status dormant when search is explicitly disabled', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Disabled search"
                items={items}
                selected=""
                onSelect={() => {}}
                enableSearch={false}
                searchText="zzz"
                onSearchChange={() => {}}
                isSearchLoading
            />
        )

        await user.click(
            screen.getByRole('button', { name: /disabled search/i })
        )

        expect(
            screen.queryByPlaceholderText('Search options...')
        ).not.toBeInTheDocument()
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        expect(screen.queryByText('Searching…')).not.toBeInTheDocument()
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
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
                items={[{ items: [{ label: 'Apple', value: 'banana' }] }]}
                selected=""
                onSelect={() => {}}
                search={{ searchText: '', onSearchChange: () => {} }}
            />
        )

        await waitFor(() => expect(searchInput).toHaveFocus())
    })
})
