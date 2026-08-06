import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within, fireEvent } from '../../test-utils'
import { MultiSelectListV2 } from '../../../lib/components/SelectListV2'
import { resetSelectListV2Warnings } from '../../../lib/components/SelectListV2/utils'
import {
    SelectV2Size,
    SelectV2Variant,
} from '../../../lib/components/SelectV2/selectV2.shared.types'

const basicItems = () => [
    {
        groupLabel: 'Fruits',
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry', disabled: true },
        ],
    },
]

const twoGroups = () => [
    {
        groupLabel: 'Group A',
        showSeparator: true,
        items: [
            { label: 'A1', value: 'a1' },
            { label: 'A2', value: 'a2' },
        ],
    },
    {
        groupLabel: 'Group B',
        items: [{ label: 'B1', value: 'b1' }],
    },
]

const ungroupedItems = () => [
    {
        items: [
            { label: 'X', value: 'x' },
            { label: 'Y', value: 'y' },
        ],
    },
]

const bigItems = (count = 5000) => [
    {
        items: Array.from({ length: count }, (_, i) => ({
            label: `Item ${i}`,
            value: `item-${i}`,
        })),
    },
]

/**
 * jsdom does not implement layout, so `clientHeight` is always 0 and
 * `Element.prototype.scrollTo` does not exist at all. VirtualList relies on
 * both to decide which rows are mounted and to scroll a target row into
 * existence for roving-tabindex jumps. Polyfilling them lets virtualized
 * keyboard navigation run against the real VirtualList instead of a mock.
 */
function useVirtualizationPolyfills() {
    let originalScrollTo: typeof Element.prototype.scrollTo | undefined
    let originalClientHeight: PropertyDescriptor | undefined

    beforeEach(() => {
        originalScrollTo = Element.prototype.scrollTo
        Element.prototype.scrollTo = function (
            this: Element,
            opts?: ScrollToOptions | number
        ) {
            const top =
                typeof opts === 'object' && opts !== null ? opts.top : opts
            if (typeof top === 'number') {
                ;(this as unknown as { scrollTop: number }).scrollTop = top
                this.dispatchEvent(new Event('scroll'))
            }
        } as typeof Element.prototype.scrollTo

        originalClientHeight = Object.getOwnPropertyDescriptor(
            HTMLElement.prototype,
            'clientHeight'
        )
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
            configurable: true,
            get() {
                return 300
            },
        })
    })

    afterEach(() => {
        if (originalScrollTo) Element.prototype.scrollTo = originalScrollTo
        if (originalClientHeight) {
            Object.defineProperty(
                HTMLElement.prototype,
                'clientHeight',
                originalClientHeight
            )
        }
    })
}

describe('MultiSelectListV2', () => {
    beforeEach(() => {
        resetSelectListV2Warnings()
    })

    describe('Rendering', () => {
        it('renders a listbox with aria-multiselectable and every item as an option', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const listbox = screen.getByRole('listbox')
            expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
            expect(screen.getAllByRole('option')).toHaveLength(3)
        })

        it('wraps each labelled group in role="group" and hides the visible label text', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const groupA = screen.getByRole('group', { name: 'Group A' })
            expect(
                within(groupA).getByRole('option', { name: 'A1' })
            ).toBeInTheDocument()
            expect(screen.getByText('Group A')).toHaveAttribute(
                'aria-hidden',
                'true'
            )
        })

        it('does not wrap ungrouped items in role="group"', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={ungroupedItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(screen.queryByRole('group')).not.toBeInTheDocument()
        })

        it('renders separators as aria-hidden with no role', () => {
            const { container } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const separator = container.querySelector(
                '[data-element="select-list-separator"]'
            )
            expect(separator).toBeInTheDocument()
            expect(separator).toHaveAttribute('aria-hidden', 'true')
            expect(separator).not.toHaveAttribute('role')
        })

        it('sets aria-setsize and 1-based aria-posinset on every option', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const options = screen.getAllByRole('option')
            expect(options).toHaveLength(3)
            options.forEach((option, index) => {
                expect(option).toHaveAttribute('aria-setsize', '3')
                expect(option).toHaveAttribute(
                    'aria-posinset',
                    String(index + 1)
                )
            })
        })

        it('marks disabled rows with aria-disabled', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('option', { name: 'Cherry' })
            ).toHaveAttribute('aria-disabled', 'true')
        })

        it('reflects selectedValues via aria-selected and has no nested interactive checkbox', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['banana']}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('option', { name: 'Banana' })
            ).toHaveAttribute('aria-selected', 'true')
            expect(
                screen.getByRole('option', { name: 'Apple' })
            ).toHaveAttribute('aria-selected', 'false')
            // The multi indicator is decorative (SelectItemIndicator), never a
            // second focusable/interactive control inside the option row.
            expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
        })
    })

    describe('disabled', () => {
        it('disables every row, and the listbox has zero tab stops and aria-disabled', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    disabled
                />
            )
            const listbox = screen.getByRole('listbox')
            expect(listbox).toHaveAttribute('aria-disabled', 'true')
            screen.getAllByRole('option').forEach((option) => {
                expect(option).toHaveAttribute('tabIndex', '-1')
                expect(option).toHaveAttribute('aria-disabled', 'true')
            })
        })

        it('an enabled list has exactly one tab stop', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const tabbable = screen
                .getAllByRole('option')
                .filter((option) => option.getAttribute('tabIndex') === '0')
            expect(tabbable).toHaveLength(1)
        })

        it('does not call onChange when a disabled row is clicked', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={onChange}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Cherry' }))
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('skeleton', () => {
        it('replaces the body with aria-busy and renders no tab stops', () => {
            const { container } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    skeleton={{ show: true, count: 4, variant: 'pulse' }}
                />
            )
            expect(
                container.querySelector('[data-element="select-list-skeleton"]')
            ).toHaveAttribute('aria-busy', 'true')
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(
                container.querySelectorAll('[data-testid="skeleton"]')
            ).toHaveLength(4)
            expect(
                Array.from(container.querySelectorAll('*')).some(
                    (el) => (el as HTMLElement).tabIndex === 0
                )
            ).toBe(false)
        })
    })

    describe('Accessible name', () => {
        it('prefers `label` over `aria-label`', () => {
            render(
                <MultiSelectListV2
                    label="Visible label"
                    aria-label="Hidden label"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('listbox', { name: 'Visible label' })
            ).toBeInTheDocument()
        })

        it('falls back to `aria-label` when there is no `label`', () => {
            render(
                <MultiSelectListV2
                    aria-label="Only aria label"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(
                screen.getByRole('listbox', { name: 'Only aria label' })
            ).toBeInTheDocument()
        })

        it('emits a one-time dev warning and never throws when neither is provided', () => {
            const errorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {})
            expect(() =>
                render(
                    <MultiSelectListV2
                        items={basicItems()}
                        selectedValues={[]}
                        onChange={() => {}}
                    />
                )
            ).not.toThrow()
            expect(errorSpy).toHaveBeenCalledTimes(1)
            expect(errorSpy.mock.calls[0][0]).toMatch(/neither `label` nor/)
            errorSpy.mockRestore()
        })
    })

    describe('name', () => {
        it('derives the listbox id and search aria-controls from `name`', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    name="fruits"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            const listbox = screen.getByRole('listbox')
            expect(listbox).toHaveAttribute('id', 'fruits-list')
            expect(screen.getByRole('searchbox')).toHaveAttribute(
                'aria-controls',
                'fruits-list'
            )
        })
    })

    describe('size and variant', () => {
        // Same finding as SelectListV2: `menu.padding[size][variant]` (the
        // only consumer of these two props in the list body) is a uniform
        // 6px for every combination in multiSelectV2.*.tokens.ts. Neither
        // prop currently has an observable effect here; see final report.
        it('accepts every `size` value without crashing', () => {
            ;[SelectV2Size.SM, SelectV2Size.MD, SelectV2Size.LG].forEach(
                (size) => {
                    expect(() =>
                        render(
                            <MultiSelectListV2
                                label={`Pick ${size}`}
                                items={basicItems()}
                                selectedValues={[]}
                                onChange={() => {}}
                                size={size}
                            />
                        )
                    ).not.toThrow()
                }
            )
        })

        it('accepts `variant` without crashing', () => {
            expect(() =>
                render(
                    <MultiSelectListV2
                        label="Pick"
                        items={basicItems()}
                        selectedValues={[]}
                        onChange={() => {}}
                        variant={SelectV2Variant.NO_CONTAINER}
                    />
                )
            ).not.toThrow()
        })
    })

    describe('Selection', () => {
        it('calls both onChange (legacy) and onSelectionChange (full array) when toggling on', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Banana' }))
            expect(onChange).toHaveBeenCalledWith('banana')
            expect(onSelectionChange).toHaveBeenCalledWith(['apple', 'banana'])
        })

        it('toggling a selected value removes it', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple', 'banana']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Banana' }))
            expect(onChange).toHaveBeenCalledWith('banana')
            expect(onSelectionChange).toHaveBeenCalledWith(['apple'])
        })
    })

    describe('Keyboard navigation', () => {
        it('ArrowDown/ArrowUp move the active option, skip disabled rows, and fire zero selection callbacks', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={onChange}
                />
            )
            const [apple, banana, cherry] = screen.getAllByRole('option')
            apple.focus()

            await user.keyboard('{ArrowDown}')
            expect(banana).toHaveFocus()

            await user.keyboard('{ArrowDown}')
            expect(cherry).not.toHaveFocus()
            expect(banana).toHaveFocus()

            await user.keyboard('{ArrowUp}')
            expect(apple).toHaveFocus()

            expect(onChange).not.toHaveBeenCalled()
        })

        it('Home/End jump to the first/last selectable option', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            const [apple, banana] = screen.getAllByRole('option')
            apple.focus()
            await user.keyboard('{End}')
            expect(banana).toHaveFocus()
            await user.keyboard('{Home}')
            expect(apple).toHaveFocus()
        })

        it('Enter and Space toggle the focused row', async () => {
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={onChange}
                />
            )
            const apple = screen.getByRole('option', { name: 'Apple' })
            apple.focus()
            await user.keyboard('{Enter}')
            expect(onChange).toHaveBeenCalledWith('apple')

            onChange.mockClear()
            await user.keyboard(' ')
            expect(onChange).toHaveBeenCalledWith('apple')
        })

        it('ArrowDown from the search input moves focus into the first option', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            const searchInput = screen.getByRole('searchbox')
            searchInput.focus()
            await user.keyboard('{ArrowDown}')
            expect(screen.getByRole('option', { name: 'Apple' })).toHaveFocus()
        })

        it('routes printable characters typed on a row into the search input', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            const apple = screen.getByRole('option', { name: 'Apple' })
            apple.focus()
            await user.keyboard('b')
            const searchInput = screen.getByRole('searchbox')
            expect(searchInput).toHaveFocus()
            expect(searchInput).toHaveValue('b')
        })
    })

    describe('Search', () => {
        it('is off by default', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
        })

        it('enables the search input via search.show', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            expect(screen.getByRole('searchbox')).toBeInTheDocument()
        })

        it('uncontrolled: filters items and keeps surviving group labels', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'A1')
            await waitFor(() => {
                expect(screen.getByText('A1')).toBeInTheDocument()
            })
            expect(screen.queryByText('A2')).not.toBeInTheDocument()
            expect(screen.queryByText('B1')).not.toBeInTheDocument()
            expect(screen.getByText('Group A')).toBeInTheDocument()
            expect(screen.queryByText('Group B')).not.toBeInTheDocument()
        })

        it('controlled: disables internal filtering and calls onSearchChange', async () => {
            const onSearchChange = vi.fn()
            const { user, rerender } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{
                        show: true,
                        searchText: '',
                        onSearchChange,
                    }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'zzz')
            expect(onSearchChange).toHaveBeenCalled()
            expect(screen.getByText('Apple')).toBeInTheDocument()

            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{
                        show: true,
                        searchText: 'zzz',
                        onSearchChange,
                    }}
                />
            )
            expect(screen.getByText('Apple')).toBeInTheDocument()
        })

        it('shows the default empty state when nothing matches', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'zzzzz')
            expect(
                await screen.findByText('No results found')
            ).toBeInTheDocument()
        })

        it('overrides the empty state text via search.emptyStateText', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true, emptyStateText: 'Nothing here' }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'zzzzz')
            expect(await screen.findByText('Nothing here')).toBeInTheDocument()
        })
    })

    describe('allowCustomValue', () => {
        it('appends a custom-value row labelled with customValueLabel when there is no exact match', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ show: true }}
                    allowCustomValue
                    customValueLabel="Add"
                />
            )
            await user.type(screen.getByRole('searchbox'), 'mango')
            expect(await screen.findByText('Add: "mango"')).toBeInTheDocument()
        })
    })

    describe('subMenu (hard-rejected)', () => {
        it('does not render nested children, renders the parent as an ordinary row, and warns once in dev', async () => {
            const errorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {})
            const onChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={[
                        {
                            items: [
                                {
                                    label: 'Parent',
                                    value: 'parent',
                                    subMenu: [
                                        { label: 'Child', value: 'child' },
                                    ],
                                },
                            ],
                        },
                    ]}
                    selectedValues={[]}
                    onChange={onChange}
                />
            )
            expect(screen.queryByText('Child')).not.toBeInTheDocument()
            expect(errorSpy).toHaveBeenCalledTimes(1)
            expect(errorSpy.mock.calls[0][0]).toMatch(/subMenu/)

            const parent = screen.getByRole('option', { name: 'Parent' })
            await user.click(parent)
            expect(onChange).toHaveBeenCalledWith('parent')
            errorSpy.mockRestore()
        })
    })

    describe('enableSelectAll', () => {
        it('does not render a select-all row by default', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                />
            )
            expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
        })

        it('renders a tri-state select-all row that selects all, then clears all', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user, rerender } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            const selectAll = screen.getByRole('checkbox', {
                name: 'Select All',
            })
            expect(selectAll).toHaveAttribute('aria-checked', 'false')

            await user.click(selectAll)
            // Cherry is disabled, so select-all only covers Apple/Banana.
            expect(onSelectionChange).toHaveBeenLastCalledWith([
                'apple',
                'banana',
            ])

            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            expect(
                screen.getByRole('checkbox', { name: 'Select All' })
            ).toHaveAttribute('aria-checked', 'mixed')

            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple', 'banana']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            const fullyChecked = screen.getByRole('checkbox', {
                name: 'Select All',
            })
            expect(fullyChecked).toHaveAttribute('aria-checked', 'true')

            await user.click(fullyChecked)
            expect(onSelectionChange).toHaveBeenLastCalledWith([])
        })

        it('excludes disabled and alwaysSelected items from select-all scope', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={[
                        {
                            items: [
                                { label: 'Apple', value: 'apple' },
                                {
                                    label: 'Pinned',
                                    value: 'pinned',
                                    alwaysSelected: true,
                                },
                                {
                                    label: 'Off limits',
                                    value: 'off',
                                    disabled: true,
                                },
                            ],
                        },
                    ]}
                    selectedValues={[]}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            await user.click(
                screen.getByRole('checkbox', { name: 'Select All' })
            )
            expect(onSelectionChange).toHaveBeenCalledWith(['apple'])

            const pinned = screen.getByRole('option', { name: 'Pinned' })
            expect(pinned).toHaveAttribute('aria-disabled', 'true')
        })

        it('hides the select-all row entirely when every item is disabled or alwaysSelected (no available values)', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={[
                        {
                            items: [
                                {
                                    label: 'Pinned',
                                    value: 'pinned',
                                    alwaysSelected: true,
                                },
                                {
                                    label: 'Off limits',
                                    value: 'off',
                                    disabled: true,
                                },
                            ],
                        },
                    ]}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            expect(
                screen.queryByRole('checkbox', { name: 'Select All' })
            ).not.toBeInTheDocument()
        })

        it('does not emit legacy per-item onChange for bulk select-all gestures', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user, rerender } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            await user.click(
                screen.getByRole('checkbox', { name: 'Select All' })
            )
            // Cherry is disabled, so only Apple/Banana are in scope.
            expect(onChange).not.toHaveBeenCalled()
            expect(onSelectionChange).toHaveBeenCalledWith(['apple', 'banana'])

            onChange.mockClear()
            onSelectionChange.mockClear()
            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple', 'banana']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            await user.click(
                screen.getByRole('checkbox', { name: 'Select All' })
            )
            expect(onChange).not.toHaveBeenCalled()
            expect(onSelectionChange).toHaveBeenCalledWith([])
        })

        it('with controlled search, select-all scope covers the full items prop and excludes the synthetic custom-value row', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                    allowCustomValue
                    search={{
                        show: true,
                        searchText: 'mango',
                        onSearchChange: () => {},
                    }}
                />
            )
            expect(screen.getByText('Specify: "mango"')).toBeInTheDocument()

            await user.click(
                screen.getByRole('checkbox', { name: 'Select All' })
            )
            // The synthetic custom-value row is not part of the caller's
            // `items`, so it must not be swept up by select-all.
            expect(onSelectionChange).toHaveBeenCalledWith(['apple', 'banana'])
        })

        it('the select-all row (as a checkbox widget, not a menu item) toggles on Enter and Space', async () => {
            const onSelectionChange = vi.fn()
            const { user, rerender } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            const selectAll = screen.getByRole('checkbox', {
                name: 'Select All',
            })
            selectAll.focus()
            await user.keyboard('{Enter}')
            expect(onSelectionChange).toHaveBeenLastCalledWith([
                'apple',
                'banana',
            ])

            onSelectionChange.mockClear()
            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple', 'banana']}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                />
            )
            screen.getByRole('checkbox', { name: 'Select All' }).focus()
            await user.keyboard(' ')
            expect(onSelectionChange).toHaveBeenLastCalledWith([])
        })

        it('the select-all row respects the list-wide `disabled` prop: aria-disabled, no tab stop, and clicks/keys are no-ops', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                    disabled
                />
            )
            const selectAll = screen.getByRole('checkbox', {
                name: 'Select All',
            })
            expect(selectAll).toHaveAttribute('aria-disabled', 'true')
            expect(selectAll).toHaveAttribute('tabIndex', '-1')

            await user.click(selectAll)
            expect(onSelectionChange).not.toHaveBeenCalled()

            selectAll.focus()
            await user.keyboard('{Enter}')
            expect(onSelectionChange).not.toHaveBeenCalled()
        })
    })

    describe('showClearAll', () => {
        it('renders a clear-all button, disabled when nothing is selected', () => {
            const { rerender } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    showClearAll
                    clearAllText="Clear all"
                />
            )
            expect(
                screen.getByRole('button', { name: 'Clear all' })
            ).toBeDisabled()

            rerender(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={() => {}}
                    showClearAll
                    clearAllText="Clear all"
                />
            )
            expect(
                screen.getByRole('button', { name: 'Clear all' })
            ).not.toBeDisabled()
        })

        it('clears the selection by default, and onClearAll overrides that behaviour', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple', 'banana']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    showClearAll
                />
            )
            await user.click(screen.getByRole('button', { name: /clear/i }))
            expect(onChange).not.toHaveBeenCalled()
            expect(onSelectionChange).toHaveBeenCalledWith([])
        })

        it('calls onClearAll instead of the default clear behaviour when provided', async () => {
            const onClearAll = vi.fn()
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    showClearAll
                    onClearAll={onClearAll}
                />
            )
            await user.click(screen.getByRole('button', { name: /clear/i }))
            expect(onClearAll).toHaveBeenCalledTimes(1)
            expect(onSelectionChange).not.toHaveBeenCalled()
        })
    })

    describe('maxSelections', () => {
        it('disables unselected rows at the cap and blocks selecting them', async () => {
            const onChange = vi.fn()
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={onChange}
                    onSelectionChange={onSelectionChange}
                    maxSelections={1}
                />
            )
            const banana = screen.getByRole('option', { name: 'Banana' })
            expect(banana).toHaveAttribute('aria-disabled', 'true')

            await user.click(banana)
            expect(onChange).not.toHaveBeenCalled()
            expect(onSelectionChange).not.toHaveBeenCalled()
        })

        it('still allows deselecting an already-selected row at the cap', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={['apple']}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    maxSelections={1}
                />
            )
            const apple = screen.getByRole('option', { name: 'Apple' })
            expect(apple).not.toHaveAttribute('aria-disabled')
            await user.click(apple)
            expect(onSelectionChange).toHaveBeenCalledWith([])
        })

        it('clamps select-all to the cap', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                    maxSelections={1}
                />
            )
            await user.click(
                screen.getByRole('checkbox', { name: 'Select All' })
            )
            expect(onSelectionChange).toHaveBeenCalledWith(['apple'])
        })

        it('disables select-all when maxSelections leaves no capacity', async () => {
            const onSelectionChange = vi.fn()
            const { user } = render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onSelectionChange={onSelectionChange}
                    enableSelectAll
                    selectAllText="Select All"
                    maxSelections={0}
                />
            )
            const selectAll = screen.getByRole('checkbox', {
                name: 'Select All',
            })
            expect(selectAll).toHaveAttribute('aria-disabled', 'true')
            expect(selectAll).toHaveAttribute('tabIndex', '-1')

            await user.click(selectAll)
            expect(onSelectionChange).not.toHaveBeenCalled()
        })
    })

    describe('Virtualization', () => {
        useVirtualizationPolyfills()

        it('renders far fewer DOM options than the source item count', () => {
            render(
                <MultiSelectListV2
                    label="Big"
                    items={bigItems(5000)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    maxHeight={300}
                />
            )
            expect(screen.getAllByRole('option').length).toBeLessThan(100)
        })

        it('keyboard End reaches the last option in a 5000-item virtualized list', async () => {
            const { user } = render(
                <MultiSelectListV2
                    label="Big"
                    items={bigItems(5000)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    maxHeight={300}
                />
            )
            screen.getAllByRole('option')[0].focus()
            await user.keyboard('{End}')
            await waitFor(
                () => {
                    expect(
                        screen.getByRole('option', { name: 'Item 4999' })
                    ).toBeInTheDocument()
                },
                { timeout: 5000 }
            )
            expect(document.activeElement).toHaveAttribute(
                'aria-posinset',
                '5000'
            )
        })

        it('re-arms virtual pagination when a new page changes the row set', async () => {
            const onEndReached = vi.fn()
            const { rerender } = render(
                <MultiSelectListV2
                    label="Paged"
                    items={bigItems(20)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    endReachedThreshold={2200}
                    hasMore
                    onEndReached={onEndReached}
                />
            )

            await waitFor(
                () => {
                    expect(onEndReached).toHaveBeenCalledTimes(1)
                },
                { timeout: 5000 }
            )

            rerender(
                <MultiSelectListV2
                    label="Paged"
                    items={bigItems(40)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    endReachedThreshold={2200}
                    hasMore
                    onEndReached={onEndReached}
                />
            )

            await waitFor(
                () => {
                    expect(onEndReached).toHaveBeenCalledTimes(2)
                },
                { timeout: 5000 }
            )
        })

        it('wires hasMore/loadingComponent: renders loadingComponent while hasMore is true', () => {
            render(
                <MultiSelectListV2
                    label="Big"
                    items={bigItems(5)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    hasMore
                    loadingComponent={<div>Loading more…</div>}
                />
            )
            expect(screen.getByText('Loading more…')).toBeInTheDocument()
        })

        it('wires onEndReached/endReachedThreshold', async () => {
            const onEndReachedDefault = vi.fn()
            const onEndReachedWithThreshold = vi.fn()
            render(
                <MultiSelectListV2
                    label="Big"
                    items={bigItems(20)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    virtualListItemHeight={48}
                    hasMore
                    onEndReached={onEndReachedDefault}
                />
            )
            render(
                <MultiSelectListV2
                    label="Big2"
                    items={bigItems(20)}
                    selectedValues={[]}
                    onChange={() => {}}
                    enableVirtualization
                    virtualListItemHeight={48}
                    hasMore
                    endReachedThreshold={700}
                    onEndReached={onEndReachedWithThreshold}
                />
            )
            await waitFor(() => {
                expect(onEndReachedWithThreshold).toHaveBeenCalled()
            })
            expect(onEndReachedDefault).not.toHaveBeenCalled()
        })
    })

    describe('Infinite scroll (non-virtualized)', () => {
        it('renders loadingComponent while hasMore is true', () => {
            render(
                <MultiSelectListV2
                    label="Pick"
                    items={basicItems()}
                    selectedValues={[]}
                    onChange={() => {}}
                    hasMore
                    loadingComponent={<div>Loading more…</div>}
                />
            )
            expect(screen.getByText('Loading more…')).toBeInTheDocument()
        })

        it('accepts onEndReached/endReachedThreshold without crashing', () => {
            expect(() =>
                render(
                    <MultiSelectListV2
                        label="Pick"
                        items={basicItems()}
                        selectedValues={[]}
                        onChange={() => {}}
                        hasMore
                        endReachedThreshold={50}
                        onEndReached={() => {}}
                    />
                )
            ).not.toThrow()
        })

        // Skipped for the same reason as SelectListV2: the non-virtualized
        // scroll handler reads `el.scrollHeight`/`el.clientHeight` off the
        // DOM, both of which are always 0 in jsdom, making the threshold
        // math unassertable. The virtualized onEndReached test above covers
        // the same wiring via VirtualList's analytically-computed distance.
        it.skip('fires onEndReached once the non-virtualized scroll area nears the bottom (unreliable in jsdom, see comment)', () => {})

        // Same technique as SelectListV2: override scrollHeight/clientHeight
        // at the prototype level (both for the mount-time re-check and the
        // scroll handler) so the latch's real distance-from-bottom math runs
        // against non-zero geometry instead of jsdom's always-0 layout.
        // scrollTop is a real, directly-settable jsdom property. Exercised
        // here too since MultiSelectListV2 renders its own instance of the
        // shared SelectListV2Surface.
        it('fires onEndReached once inside the threshold band, then re-arms after scrolling back out', () => {
            const originalScrollHeight = Object.getOwnPropertyDescriptor(
                HTMLElement.prototype,
                'scrollHeight'
            )
            const originalClientHeight = Object.getOwnPropertyDescriptor(
                HTMLElement.prototype,
                'clientHeight'
            )
            Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
                configurable: true,
                get: () => 1000,
            })
            Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
                configurable: true,
                get: () => 300,
            })

            try {
                const onEndReached = vi.fn()
                const { container } = render(
                    <MultiSelectListV2
                        label="Pick"
                        items={basicItems()}
                        selectedValues={[]}
                        onChange={() => {}}
                        hasMore
                        endReachedThreshold={50}
                        onEndReached={onEndReached}
                    />
                )
                const scrollEl = container.querySelector(
                    '[data-element="select-list-scroll"]'
                ) as HTMLElement

                // Mount check: distance = 1000 - (0 + 300) = 700 > 50, so it
                // does not fire just from mounting far from the bottom.
                expect(onEndReached).not.toHaveBeenCalled()

                // Far from bottom, explicit scroll event: still > 50.
                scrollEl.scrollTop = 0
                fireEvent.scroll(scrollEl)
                expect(onEndReached).not.toHaveBeenCalled()

                // Inside the band: distance = 1000 - (680 + 300) = 20 <= 50.
                scrollEl.scrollTop = 680
                fireEvent.scroll(scrollEl)
                expect(onEndReached).toHaveBeenCalledTimes(1)

                // Still inside the band: the latch must not refire.
                fireEvent.scroll(scrollEl)
                expect(onEndReached).toHaveBeenCalledTimes(1)

                // Back out of the band, the latch resets but does not itself fire.
                scrollEl.scrollTop = 0
                fireEvent.scroll(scrollEl)
                expect(onEndReached).toHaveBeenCalledTimes(1)

                // Back inside the band: the re-armed latch fires again.
                scrollEl.scrollTop = 680
                fireEvent.scroll(scrollEl)
                expect(onEndReached).toHaveBeenCalledTimes(2)
            } finally {
                if (originalScrollHeight) {
                    Object.defineProperty(
                        HTMLElement.prototype,
                        'scrollHeight',
                        originalScrollHeight
                    )
                }
                if (originalClientHeight) {
                    Object.defineProperty(
                        HTMLElement.prototype,
                        'clientHeight',
                        originalClientHeight
                    )
                }
            }
        })
    })
})
