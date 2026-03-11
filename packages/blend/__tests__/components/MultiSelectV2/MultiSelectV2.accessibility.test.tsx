import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import MultiSelectV2 from '../../../lib/components/MultiSelectV2/multiSelectV2'

const createItems = () => [
    {
        groupLabel: 'Options',
        items: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2', disabled: true },
        ],
    },
]

describe('MultiSelectV2 Accessibility', () => {
    it('passes axe checks in default state', async () => {
        const { container } = render(
            <MultiSelectV2
                label="Select options"
                placeholder="Select options"
                items={createItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when opened', async () => {
        const user = userEvent.setup()
        const { container } = render(
            <MultiSelectV2
                label="Select options"
                placeholder="Select options"
                items={createItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        await user.click(
            screen.getByRole('combobox', { name: /select options/i })
        )
        await waitFor(() => {
            expect(screen.getByRole('listbox')).toBeInTheDocument()
        })

        expect(await axe(container)).toHaveNoViolations()
    })

    it('trigger has role combobox and aria-expanded', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Select"
                placeholder="Select"
                items={createItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        const trigger = screen.getByRole('combobox', { name: /select/i })
        expect(trigger).toHaveAttribute('aria-expanded', 'false')

        await user.click(trigger)
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })
    })

    it('menu has role listbox and aria-multiselectable', async () => {
        const user = userEvent.setup()
        render(
            <MultiSelectV2
                label="Select"
                placeholder="Select"
                items={createItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        await user.click(screen.getByRole('combobox', { name: /select/i }))
        const listbox = await screen.findByRole('listbox')
        expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
    })
})
