import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '../../test-utils'
import { axe } from 'jest-axe'
import { SelectListV2 } from '../../../lib/components/SelectListV2'
import { resetSelectListV2Warnings } from '../../../lib/components/SelectListV2/utils'

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

describe('SelectListV2 Accessibility', () => {
    it('passes axe checks in the default state', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks with a selection made', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected="banana"
                onSelect={() => {}}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when disabled', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
                disabled
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks with search enabled', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
                search={{ show: true }}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks in the skeleton state', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
                skeleton={{ show: true }}
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when virtualized', async () => {
        const { container } = render(
            <SelectListV2
                label="Pick a fruit"
                items={[
                    {
                        items: Array.from({ length: 100 }, (_, i) => ({
                            label: `Item ${i}`,
                            value: `item-${i}`,
                        })),
                    },
                ]}
                selected=""
                onSelect={() => {}}
                enableVirtualization
            />
        )
        expect(await axe(container)).toHaveNoViolations()
    })

    it('renders role="listbox", never role="radiogroup"', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        expect(screen.getByRole('listbox')).toBeInTheDocument()
        expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
    })

    it('does not set aria-multiselectable', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        expect(screen.getByRole('listbox')).not.toHaveAttribute(
            'aria-multiselectable'
        )
    })

    it('renders rows as role="option", never role="radio"', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        expect(screen.getAllByRole('option')).toHaveLength(3)
        expect(screen.queryAllByRole('radio')).toHaveLength(0)
    })

    it('sets aria-setsize and 1-based aria-posinset on every option', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
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
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        expect(
            screen.getByRole('listbox', { name: 'Pick a fruit' })
        ).toBeInTheDocument()
    })

    it('wraps a labelled group in role="group" named by the group label', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        const group = screen.getByRole('group', { name: 'Fruits' })
        expect(
            within(group).getByRole('option', { name: 'Apple' })
        ).toBeInTheDocument()
    })

    it('marks the disabled option with aria-disabled and removes it from the tab order', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
            />
        )
        const cherry = screen.getByRole('option', { name: 'Cherry' })
        expect(cherry).toHaveAttribute('aria-disabled', 'true')
        expect(cherry).toHaveAttribute('tabIndex', '-1')
    })

    it('marks a fully disabled list with aria-disabled on the listbox and zero tab stops', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
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

    it('marks the skeleton state with aria-busy and hides the listbox', () => {
        render(
            <SelectListV2
                label="Pick a fruit"
                items={basicItems()}
                selected=""
                onSelect={() => {}}
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
                <SelectListV2
                    items={basicItems()}
                    selected=""
                    onSelect={() => {}}
                />
            )
        ).not.toThrow()
        expect(errorSpy).toHaveBeenCalledTimes(1)
        errorSpy.mockRestore()
    })
})
