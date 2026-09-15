import React from 'react'
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

const expectNoControlledFocusIdentity = () => {
    expect(
        screen.getByText('Apple').closest('[role="menuitem"], [role="option"]')
    ).not.toHaveAttribute('data-value')
}

describe('Select search uncontrolled behavior', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1280,
        })
    })

    it('keeps legacy SingleSelect search opt-in, filters locally, and resets on reopen', async () => {
        const { user } = render(
            <SingleSelect
                placeholder="Legacy single"
                items={items}
                selected=""
                onSelect={() => {}}
                enableSearch
            />
        )

        const trigger = screen.getByRole('button', { name: /legacy single/i })
        await user.click(trigger)
        expectNoControlledFocusIdentity()
        const search = screen.getByPlaceholderText('Search options...')
        fireEvent.change(search, { target: { value: 'app' } })
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.queryByText('Banana')).not.toBeInTheDocument()

        await user.click(trigger)
        await user.click(trigger)
        await waitFor(() => {
            expect(
                screen.getByPlaceholderText('Search options...')
            ).toHaveValue('')
        })
    })

    it('keeps legacy MultiSelect search enabled by default and filters locally', async () => {
        const { user } = render(
            <MultiSelect
                label="Legacy multi"
                placeholder="Legacy multi"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        await user.click(screen.getByRole('button', { name: /legacy multi/i }))
        expectNoControlledFocusIdentity()
        const search = screen.getByPlaceholderText('Search options...')
        fireEvent.change(search, { target: { value: 'ban' } })
        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    it('keeps SingleSelectV2 search opt-in and filters locally', async () => {
        const { user } = render(
            <SingleSelectV2
                placeholder="V2 single"
                items={items}
                selected=""
                onSelect={() => {}}
                search={{ show: true }}
            />
        )

        await user.click(screen.getByRole('button', { name: /v2 single/i }))
        expectNoControlledFocusIdentity()
        const search = screen.getByPlaceholderText('Search options...')
        fireEvent.change(search, { target: { value: 'app' } })
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    it('keeps MultiSelectV2 desktop search enabled by default and filters locally', async () => {
        const { user } = render(
            <MultiSelectV2
                label="V2 multi"
                placeholder="V2 multi"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
            />
        )

        await user.click(screen.getByRole('combobox', { name: /v2 multi/i }))
        expectNoControlledFocusIdentity()
        const search = screen.getByPlaceholderText('Search options...')
        fireEvent.change(search, { target: { value: 'ban' } })
        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    describe('mobile parity', () => {
        beforeEach(() => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: 'sm',
                innerWidth: 480,
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
        })

        const mobileCases = [
            {
                name: 'SingleSelect',
                triggerRole: 'button' as const,
                renderSelect: () => (
                    <SingleSelect
                        placeholder="Uncontrolled mobile"
                        items={items}
                        selected=""
                        onSelect={() => {}}
                        enableSearch
                    />
                ),
            },
            {
                name: 'MultiSelect',
                triggerRole: 'button' as const,
                renderSelect: () => (
                    <MultiSelect
                        label="Uncontrolled mobile"
                        placeholder="Uncontrolled mobile"
                        items={items}
                        selectedValues={[]}
                        onChange={() => {}}
                    />
                ),
            },
            {
                name: 'SingleSelectV2',
                triggerRole: 'button' as const,
                renderSelect: () => (
                    <SingleSelectV2
                        placeholder="Uncontrolled mobile"
                        items={items}
                        selected=""
                        onSelect={() => {}}
                        search={{ show: true }}
                    />
                ),
            },
            {
                name: 'MultiSelectV2',
                triggerRole: 'combobox' as const,
                renderSelect: () => (
                    <MultiSelectV2
                        label="Uncontrolled mobile"
                        placeholder="Uncontrolled mobile"
                        items={items}
                        selectedValues={[]}
                        onChange={() => {}}
                    />
                ),
            },
        ]

        it.each(mobileCases)(
            '$name preserves client-side filtering on mobile',
            async ({ triggerRole, renderSelect }) => {
                render(renderSelect())
                fireEvent.click(
                    screen.getByRole(triggerRole, {
                        name: /uncontrolled mobile/i,
                    })
                )
                fireEvent.change(
                    await screen.findByPlaceholderText('Search options...'),
                    { target: { value: 'ban' } }
                )

                expect(screen.queryByText('Apple')).not.toBeInTheDocument()
                expect(screen.getByText('Banana')).toBeInTheDocument()
            }
        )
    })
})
