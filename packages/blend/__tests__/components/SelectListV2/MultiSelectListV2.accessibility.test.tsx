import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import { axe } from 'jest-axe'
import {
    MultiSelectListV2,
    resetSelectListV2Warnings,
} from '../../../lib/components/SelectListV2'

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

describe('MultiSelectListV2 Accessibility', () => {
    it('passes axe checks in the default state', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks with a selection made', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={['apple', 'banana']}
                onChange={() => {}}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when disabled', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
                disabled
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks with search enabled', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
                search={{ show: true }}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks with select-all and clear-all', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={['apple']}
                onChange={() => {}}
                enableSelectAll
                selectAllText="Select All"
                showClearAll
                clearAllText="Clear all"
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks in the skeleton state', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
                skeleton={{ show: true }}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when virtualized', async () => {
        const { container } = render(
            <MultiSelectListV2
                label="Pick fruits"
                items={[
                    {
                        items: Array.from({ length: 100 }, (_, i) => ({
                            label: `Item ${i}`,
                            value: `item-${i}`,
                        })),
                    },
                ]}
                selectedValues={[]}
                onChange={() => {}}
                enableVirtualization
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('renders role="listbox" with aria-multiselectable="true"', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        const listbox = screen.getByRole('listbox')
        expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
    })

    it('renders rows as role="option" with no nested interactive controls', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={['apple']}
                onChange={() => {}}
            />
        )
        expect(screen.getAllByRole('option')).toHaveLength(3)
        expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
    })

    it('sets aria-setsize and 1-based aria-posinset on every option', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        const options = screen.getAllByRole('option')
        options.forEach((option, index) => {
            expect(option).toHaveAttribute('aria-setsize', '3')
            expect(option).toHaveAttribute('aria-posinset', String(index + 1))
        })
    })

    it('names the listbox from `label` via aria-labelledby', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        expect(
            screen.getByRole('listbox', { name: 'Pick fruits' })
        ).toBeInTheDocument()
    })

    it('wraps a labelled group in role="group" named by the group label', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        const group = screen.getByRole('group', { name: 'Fruits' })
        expect(
            within(group).getByRole('option', { name: 'Apple' })
        ).toBeInTheDocument()
    })

    it('marks the disabled option with aria-disabled and removes it from the tab order', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        const cherry = screen.getByRole('option', { name: 'Cherry' })
        expect(cherry).toHaveAttribute('aria-disabled', 'true')
        expect(cherry).toHaveAttribute('tabIndex', '-1')
    })

    it('marks a fully disabled list with aria-disabled on the listbox and zero tab stops', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
                disabled
            />
        )
        expect(screen.getByRole('listbox')).toHaveAttribute(
            'aria-disabled',
            'true'
        )
        const tabbable = screen
            .getAllByRole('option')
            .filter((option) => option.getAttribute('tabIndex') === '0')
        expect(tabbable).toHaveLength(0)
    })

    it('exposes the select-all row as a tri-state checkbox', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={['apple']}
                onChange={() => {}}
                enableSelectAll
                selectAllText="Select All"
            />
        )
        expect(
            screen.getByRole('checkbox', { name: 'Select All' })
        ).toHaveAttribute('aria-checked', 'mixed')
    })

    it('marks the skeleton state with aria-busy and hides the listbox', () => {
        render(
            <MultiSelectListV2
                label="Pick fruits"
                items={basicItems()}
                selectedValues={[]}
                onChange={() => {}}
                skeleton={{ show: true }}
            />
        )
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        expect(
            document.querySelector('[data-element="select-list-skeleton"]')
        ).toHaveAttribute('aria-busy', 'true')
    })

    it('emits a one-time dev warning, never a thrown error, when unnamed', () => {
        resetSelectListV2Warnings()
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
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
        errorSpy.mockRestore()
    })
})
