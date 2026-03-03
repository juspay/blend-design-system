import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'

const createItems = () => [
    {
        groupLabel: 'Primary',
        items: [
            { label: 'Option 1', value: 'option-1' },
            { label: 'Option 2', value: 'option-2', subLabel: 'With details' },
            { label: 'Option 3', value: 'option-3', disabled: true },
        ],
        showSeparator: true,
    },
]

const createLargeItems = (count = 500) => [
    {
        groupLabel: 'Large',
        items: Array.from({ length: count }, (_, idx) => ({
            label: `Item ${idx + 1}`,
            value: `item-${idx + 1}`,
        })),
    },
]

describe('SingleSelectV2 Accessibility', () => {
    it('passes axe checks in default state', async () => {
        const { container } = render(
            <SingleSelectV2
                label="Select option"
                hintText="Choose one option from the list"
                placeholder="Select an option"
                items={createItems()}
                selected=""
                onSelect={() => {}}
            />
        )

        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks in error state', async () => {
        const { container } = render(
            <SingleSelectV2
                label="Select option"
                placeholder="Select an option"
                items={createItems()}
                selected=""
                onSelect={() => {}}
                error
                errorMessage="This field is required"
            />
        )

        const trigger = screen.getByRole('button')
        expect(trigger).toHaveAttribute('aria-invalid', 'true')
        expect(await axe(container)).toHaveNoViolations()
    })

    it('passes axe checks when opened with search enabled and virtual list', async () => {
        const user = userEvent.setup()
        const { container } = render(
            <SingleSelectV2
                label="Large list"
                placeholder="Select from large list"
                items={createLargeItems(500)}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )

        await user.click(
            screen.getByRole('button', { name: /select from large list/i })
        )

        await waitFor(
            () => {
                expect(
                    screen.getByPlaceholderText('Search options...')
                ).toBeInTheDocument()
                expect(screen.getAllByRole('menuitem').length).toBeGreaterThan(
                    0
                )
            },
            { timeout: 3000 }
        )

        expect(await axe(container)).toHaveNoViolations()
    }, 10000)

    it('supports aria-label and aria-describedby wiring', async () => {
        const { container } = render(
            <React.Fragment>
                <div id="custom-description">Custom description</div>
                <SingleSelectV2
                    placeholder="Custom aria"
                    items={createItems()}
                    selected=""
                    onSelect={() => {}}
                    aria-label="Custom Select Label"
                    aria-describedby="custom-description"
                />
            </React.Fragment>
        )

        const trigger = screen.getByRole('button', {
            name: 'Custom Select Label',
        })
        expect(trigger).toHaveAttribute('aria-describedby')
        expect(trigger.getAttribute('aria-describedby')).toContain(
            'custom-description'
        )
        expect(await axe(container)).toHaveNoViolations()
    })
})
