import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, within } from '../../test-utils'
import {
    SelectListV2,
    resetSelectListV2Warnings,
} from '../../../lib/components/SelectListV2'
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

describe('SelectListV2', () => {
    beforeEach(() => {
        resetSelectListV2Warnings()
    })

    describe('Rendering', () => {
        it('renders a listbox with every item as an option', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(screen.getByRole('listbox')).toBeInTheDocument()
            expect(screen.getAllByRole('option')).toHaveLength(3)
        })

        it('does not use radiogroup/radio semantics', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected="apple"
                    onSelect={() => {}}
                />
            )
            expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
            expect(screen.queryAllByRole('radio')).toHaveLength(0)
        })

        it('does not set aria-multiselectable on the listbox', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(screen.getByRole('listbox')).not.toHaveAttribute(
                'aria-multiselectable'
            )
        })

        it('wraps each labelled group in role="group" with the label as its aria-label, and hides the visible label text', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={ungroupedItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(screen.queryByRole('group')).not.toBeInTheDocument()
        })

        it('renders separators as aria-hidden with no role', () => {
            const { container } = render(
                <SelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const separator = container.querySelector(
                '[data-element="select-list-separator"]'
            )
            expect(separator).toBeInTheDocument()
            expect(separator).toHaveAttribute('aria-hidden', 'true')
            expect(separator).not.toHaveAttribute('role')
        })

        it('sets aria-setsize to the total option count and 1-based aria-posinset on every option', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(
                screen.getByRole('option', { name: 'Cherry' })
            ).toHaveAttribute('aria-disabled', 'true')
            expect(
                screen.getByRole('option', { name: 'Apple' })
            ).not.toHaveAttribute('aria-disabled')
        })

        it('shows a checkmark only on the selected option, never a radio', () => {
            const { container } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected="banana"
                    onSelect={() => {}}
                />
            )
            expect(
                container.querySelector(
                    '[data-id="banana"][data-state="selected"][data-element="checkbox"]'
                )
            ).toBeInTheDocument()
            expect(
                container.querySelector(
                    '[data-id="apple"][data-element="checkbox"]'
                )
            ).not.toBeInTheDocument()
        })

        it('reflects `selected` via aria-selected', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected="banana"
                    onSelect={() => {}}
                />
            )
            expect(
                screen.getByRole('option', { name: 'Banana' })
            ).toHaveAttribute('aria-selected', 'true')
            expect(
                screen.getByRole('option', { name: 'Apple' })
            ).toHaveAttribute('aria-selected', 'false')
        })
    })

    describe('disabled', () => {
        it('disables every row, and the listbox has zero tab stops and aria-disabled', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const tabbable = screen
                .getAllByRole('option')
                .filter((option) => option.getAttribute('tabIndex') === '0')
            expect(tabbable).toHaveLength(1)
        })

        it('does not call onSelect when a disabled row is clicked', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={onSelect}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Cherry' }))
            expect(onSelect).not.toHaveBeenCalled()
        })
    })

    describe('skeleton', () => {
        it('replaces the body with aria-busy and renders no tab stops', () => {
            const { container } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Visible label"
                    aria-label="Hidden label"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(
                screen.getByRole('listbox', { name: 'Visible label' })
            ).toBeInTheDocument()
        })

        it('falls back to `aria-label` when there is no `label`', () => {
            render(
                <SelectListV2
                    aria-label="Only aria label"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                    <SelectListV2
                        items={basicItems()}
                        selected=""
                        onSelect={() => {}}
                    />
                )
            ).not.toThrow()
            expect(errorSpy).toHaveBeenCalledTimes(1)
            expect(errorSpy.mock.calls[0][0]).toMatch(/neither `label` nor/)

            errorSpy.mockClear()
            render(
                <SelectListV2
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(errorSpy).not.toHaveBeenCalled()
            errorSpy.mockRestore()
        })
    })

    describe('name', () => {
        it('derives the listbox id and search aria-controls from `name`', () => {
            render(
                <SelectListV2
                    label="Pick"
                    name="fruits"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
        // NOTE: as of writing, `tokens.menu.padding[size][variant]` (the only
        // consumer of `size`/`variant` in the list body) is hard-coded to the
        // same 6px on every side for every SM/MD/LG x CONTAINER/NO_CONTAINER
        // combination in both singleSelectV2.*.tokens.ts and
        // multiSelectV2.*.tokens.ts, and `tokens.menu.item` (the option row's
        // own font/padding) isn't split by size at all. So neither prop
        // currently has any observable effect on SelectListV2's rendering —
        // see the final report for details. These tests only assert the
        // props are accepted.
        it('accepts every `size` value without crashing', () => {
            ;[SelectV2Size.SM, SelectV2Size.MD, SelectV2Size.LG].forEach(
                (size) => {
                    expect(() =>
                        render(
                            <SelectListV2
                                label={`Pick ${size}`}
                                items={basicItems()}
                                selected=""
                                onSelect={() => {}}
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
                    <SelectListV2
                        label="Pick"
                        items={basicItems()}
                        selected=""
                        onSelect={() => {}}
                        variant={SelectV2Variant.NO_CONTAINER}
                    />
                )
            ).not.toThrow()
        })
    })

    describe('Selection', () => {
        it('calls onSelect with the clicked value', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={onSelect}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Banana' }))
            expect(onSelect).toHaveBeenCalledWith('banana')
        })

        it('re-activating the selected option with allowDeselect emits an empty string', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected="banana"
                    onSelect={onSelect}
                    allowDeselect
                />
            )
            await user.click(screen.getByRole('option', { name: 'Banana' }))
            expect(onSelect).toHaveBeenCalledWith('')
        })

        it('without allowDeselect, re-activating the selected option emits the same value', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected="banana"
                    onSelect={onSelect}
                />
            )
            await user.click(screen.getByRole('option', { name: 'Banana' }))
            expect(onSelect).toHaveBeenCalledWith('banana')
        })
    })

    describe('Keyboard navigation', () => {
        it('ArrowDown/ArrowUp move the active option, skip disabled rows, and fire zero selection callbacks', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={onSelect}
                />
            )
            const [apple, banana, cherry] = screen.getAllByRole('option')
            apple.focus()
            expect(apple).toHaveFocus()

            await user.keyboard('{ArrowDown}')
            expect(banana).toHaveFocus()

            // Cherry is disabled, so ArrowDown from Banana must not land on it.
            await user.keyboard('{ArrowDown}')
            expect(cherry).not.toHaveFocus()
            expect(banana).toHaveFocus()

            await user.keyboard('{ArrowUp}')
            expect(apple).toHaveFocus()

            expect(onSelect).not.toHaveBeenCalled()
        })

        it('Home/End jump to the first/last selectable option', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const [apple, banana] = screen.getAllByRole('option')
            apple.focus()
            await user.keyboard('{End}')
            // Cherry is disabled, so the last selectable option is Banana.
            expect(banana).toHaveFocus()
            await user.keyboard('{Home}')
            expect(apple).toHaveFocus()
        })

        it('Enter and Space select the focused row', async () => {
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={onSelect}
                />
            )
            const apple = screen.getByRole('option', { name: 'Apple' })
            apple.focus()
            await user.keyboard('{Enter}')
            expect(onSelect).toHaveBeenCalledWith('apple')

            onSelect.mockClear()
            await user.keyboard(' ')
            expect(onSelect).toHaveBeenCalledWith('apple')
        })

        it('ArrowDown from the search input moves focus into the first option', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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

        it('does not route typing anywhere when search is disabled', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            const apple = screen.getByRole('option', { name: 'Apple' })
            apple.focus()
            await user.keyboard('b')
            expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
            expect(apple).toHaveFocus()
        })
    })

    describe('Search', () => {
        it('is off by default', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
            expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
        })

        it('enables the search input via search.show', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true }}
                />
            )
            expect(screen.getByRole('searchbox')).toBeInTheDocument()
        })

        it('uses a custom placeholder', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true, placeholder: 'Find a fruit' }}
                />
            )
            expect(
                screen.getByPlaceholderText('Find a fruit')
            ).toBeInTheDocument()
        })

        it('uncontrolled: filters items and keeps surviving group labels', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={twoGroups()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'A1')
            await waitFor(() => {
                expect(screen.getByText('A1')).toBeInTheDocument()
            })
            expect(screen.queryByText('A2')).not.toBeInTheDocument()
            expect(screen.queryByText('B1')).not.toBeInTheDocument()
            // Group A survives because it still has a matching item; the old
            // (deprecated) SelectDrawer dropped group labels on filtering.
            expect(screen.getByText('Group A')).toBeInTheDocument()
            expect(screen.queryByText('Group B')).not.toBeInTheDocument()
        })

        it('controlled: disables internal filtering and calls onSearchChange', async () => {
            const onSearchChange = vi.fn()
            const { user, rerender } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{
                        show: true,
                        searchText: '',
                        onSearchChange,
                    }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'zzz')
            expect(onSearchChange).toHaveBeenCalled()
            // Internal filtering is disabled, so items still render as given
            // even though the typed text matches nothing.
            expect(screen.getByText('Apple')).toBeInTheDocument()

            rerender(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true, emptyStateText: 'Nothing here' }}
                />
            )
            await user.type(screen.getByRole('searchbox'), 'zzzzz')
            expect(await screen.findByText('Nothing here')).toBeInTheDocument()
        })

        it('shows a loading indicator when search.isSearchLoading is true', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true, isSearchLoading: true }}
                />
            )
            expect(screen.getByText('Searching…')).toBeInTheDocument()
        })
    })

    describe('allowCustomValue', () => {
        it('appends a custom-value row labelled with customValueLabel when there is no exact match', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true }}
                    allowCustomValue
                    customValueLabel="Add"
                />
            )
            await user.type(screen.getByRole('searchbox'), 'mango')
            expect(await screen.findByText('Add: "mango"')).toBeInTheDocument()
        })

        it('does not append a custom-value row when there is an exact match', async () => {
            const { user } = render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    search={{ show: true }}
                    allowCustomValue
                />
            )
            await user.type(screen.getByRole('searchbox'), 'Apple')
            await waitFor(() => {
                expect(screen.getAllByRole('option')).toHaveLength(1)
            })
            expect(screen.queryByText(/Specify:/)).not.toBeInTheDocument()
        })
    })

    describe('subMenu (hard-rejected)', () => {
        it('does not render nested children, renders the parent as an ordinary row, and warns once in dev', async () => {
            const errorSpy = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {})
            const onSelect = vi.fn()
            const { user } = render(
                <SelectListV2
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
                    selected=""
                    onSelect={onSelect}
                />
            )
            expect(screen.queryByText('Child')).not.toBeInTheDocument()
            expect(errorSpy).toHaveBeenCalledTimes(1)
            expect(errorSpy.mock.calls[0][0]).toMatch(/subMenu/)

            const parent = screen.getByRole('option', { name: 'Parent' })
            await user.click(parent)
            expect(onSelect).toHaveBeenCalledWith('parent')
            errorSpy.mockRestore()
        })
    })

    describe('Infinite scroll (non-virtualized)', () => {
        it('renders loadingComponent while hasMore is true', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    hasMore
                    loadingComponent={<div>Loading more…</div>}
                />
            )
            expect(screen.getByText('Loading more…')).toBeInTheDocument()
        })

        it('does not render loadingComponent when hasMore is false', () => {
            render(
                <SelectListV2
                    label="Pick"
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                    loadingComponent={<div>Loading more…</div>}
                />
            )
            expect(screen.queryByText('Loading more…')).not.toBeInTheDocument()
        })

        it('accepts onEndReached/endReachedThreshold without crashing', () => {
            expect(() =>
                render(
                    <SelectListV2
                        label="Pick"
                        items={basicItems()}
                        selected=""
                        onSelect={() => {}}
                        hasMore
                        endReachedThreshold={50}
                        onEndReached={() => {}}
                    />
                )
            ).not.toThrow()
        })

        // Skipped: the non-virtualized scroll handler in
        // SelectListV2Surface reads `el.scrollHeight`/`el.clientHeight`
        // straight off the DOM to compute distance-from-bottom. jsdom has no
        // layout engine, so both are always 0 no matter the content or a
        // fired `scroll` event — every scroll event trivially satisfies
        // `distanceFromBottom <= threshold` since both operands are 0, which
        // would pass regardless of whether the threshold math is correct.
        // The virtualized onEndReached test below is a meaningful substitute
        // because VirtualList computes distance analytically from
        // itemHeight * count instead of reading DOM geometry.
        it.skip('fires onEndReached once the non-virtualized scroll area nears the bottom (unreliable in jsdom, see comment)', () => {})
    })

    describe('Virtualization', () => {
        useVirtualizationPolyfills()

        it('renders far fewer DOM options than the source item count', () => {
            render(
                <SelectListV2
                    label="Big"
                    items={bigItems(5000)}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    maxHeight={300}
                />
            )
            expect(screen.getAllByRole('option').length).toBeLessThan(100)
        })

        it('keyboard End reaches the last option in a 5000-item virtualized list', async () => {
            const { user } = render(
                <SelectListV2
                    label="Big"
                    items={bigItems(5000)}
                    selected=""
                    onSelect={() => {}}
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

        it('does not wrap groups in role="group" (rows mount independently)', () => {
            render(
                <SelectListV2
                    label="Big"
                    items={[
                        {
                            groupLabel: 'Group A',
                            items: [{ label: 'A1', value: 'a1' }],
                        },
                    ]}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    maxHeight={300}
                />
            )
            expect(screen.queryByRole('group')).not.toBeInTheDocument()
            expect(screen.getByRole('option', { name: 'A1' })).toHaveAttribute(
                'aria-setsize',
                '1'
            )
        })

        it('wires virtualListItemHeight/virtualListOverscan: a larger overscan renders more rows', () => {
            const { container: small } = render(
                <SelectListV2
                    label="Big"
                    items={bigItems(500)}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    virtualListItemHeight={40}
                    virtualListOverscan={0}
                />
            )
            const { container: large } = render(
                <SelectListV2
                    label="Big2"
                    items={bigItems(500)}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    virtualListItemHeight={40}
                    virtualListOverscan={40}
                />
            )
            const smallCount = within(small).getAllByRole('option').length
            const largeCount = within(large).getAllByRole('option').length
            expect(largeCount).toBeGreaterThan(smallCount)
        })

        it('wires hasMore/loadingComponent: renders loadingComponent while hasMore is true', () => {
            render(
                <SelectListV2
                    label="Big"
                    items={bigItems(5)}
                    selected=""
                    onSelect={() => {}}
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
                <SelectListV2
                    label="Big"
                    items={bigItems(20)}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    virtualListItemHeight={48}
                    hasMore
                    onEndReached={onEndReachedDefault}
                />
            )
            render(
                <SelectListV2
                    label="Big2"
                    items={bigItems(20)}
                    selected=""
                    onSelect={() => {}}
                    enableVirtualization
                    virtualListItemHeight={48}
                    hasMore
                    endReachedThreshold={700}
                    onEndReached={onEndReachedWithThreshold}
                />
            )
            // 20 * 48 = 960 total height; containerHeight is polyfilled to
            // 300, leaving a 660px distance from the bottom at mount, which
            // only a raised threshold (700) crosses.
            await waitFor(() => {
                expect(onEndReachedWithThreshold).toHaveBeenCalled()
            })
            expect(onEndReachedDefault).not.toHaveBeenCalled()
        })
    })
})
