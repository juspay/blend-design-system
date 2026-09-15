import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '../../test-utils'
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

const cases = [
    {
        name: 'SingleSelect desktop',
        mobile: false,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <SingleSelect
                placeholder="Accessible search"
                items={items}
                selected=""
                onSelect={() => {}}
                searchText="a"
                onSearchChange={() => {}}
                isSearchLoading
            />
        ),
    },
    {
        name: 'MultiSelect desktop',
        mobile: false,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <MultiSelect
                label="Accessible search"
                placeholder="Accessible search"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
                searchText="a"
                onSearchChange={() => {}}
                isSearchLoading
            />
        ),
    },
    {
        name: 'SingleSelectV2 desktop',
        mobile: false,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <SingleSelectV2
                placeholder="Accessible search"
                items={items}
                selected=""
                onSelect={() => {}}
                search={{
                    searchText: 'a',
                    onSearchChange: () => {},
                    isSearchLoading: true,
                }}
            />
        ),
    },
    {
        name: 'MultiSelectV2 desktop',
        mobile: false,
        triggerRole: 'combobox' as const,
        renderSelect: () => (
            <MultiSelectV2
                label="Accessible search"
                placeholder="Accessible search"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
                search={{
                    searchText: 'a',
                    onSearchChange: () => {},
                    isSearchLoading: true,
                }}
            />
        ),
    },
    {
        name: 'SingleSelect mobile',
        mobile: true,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <SingleSelect
                placeholder="Accessible search"
                items={items}
                selected=""
                onSelect={() => {}}
                searchText="a"
                onSearchChange={() => {}}
                isSearchLoading
            />
        ),
    },
    {
        name: 'MultiSelect mobile',
        mobile: true,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <MultiSelect
                label="Accessible search"
                placeholder="Accessible search"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
                searchText="a"
                onSearchChange={() => {}}
                isSearchLoading
            />
        ),
    },
    {
        name: 'SingleSelectV2 mobile',
        mobile: true,
        triggerRole: 'button' as const,
        renderSelect: () => (
            <SingleSelectV2
                placeholder="Accessible search"
                items={items}
                selected=""
                onSelect={() => {}}
                search={{
                    searchText: 'a',
                    onSearchChange: () => {},
                    isSearchLoading: true,
                }}
            />
        ),
    },
    {
        name: 'MultiSelectV2 mobile',
        mobile: true,
        triggerRole: 'combobox' as const,
        renderSelect: () => (
            <MultiSelectV2
                label="Accessible search"
                placeholder="Accessible search"
                items={items}
                selectedValues={[]}
                onChange={() => {}}
                search={{
                    searchText: 'a',
                    onSearchChange: () => {},
                    isSearchLoading: true,
                }}
            />
        ),
    },
]

describe('Select controlled search accessibility', () => {
    it.each(cases)(
        '$name announces retained-result loading without disabling the results',
        async ({ mobile, triggerRole, renderSelect }) => {
            vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
                breakPointLabel: mobile ? 'sm' : 'lg',
                innerWidth: mobile ? 480 : 1280,
            } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

            const { user } = render(renderSelect())
            await user.click(
                screen.getByRole(triggerRole, { name: /accessible search/i })
            )

            expect(await screen.findByText('Searching…')).toBeInTheDocument()
            const status = screen
                .getAllByRole('status')
                .find((candidate) => candidate.textContent === 'Searching')
            expect(status).toBeDefined()
            expect(status?.closest('[aria-busy="true"]')).toBeNull()
            expect(screen.getByText('Apple')).toBeInTheDocument()
            expect(screen.getByText('Banana')).toBeInTheDocument()
        }
    )

    it('does not expose search loading semantics when search is disabled', async () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'lg',
            innerWidth: 1280,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

        const { user } = render(
            <SingleSelect
                placeholder="Disabled accessible search"
                items={items}
                selected=""
                onSelect={() => {}}
                enableSearch={false}
                searchText="a"
                onSearchChange={() => {}}
                isSearchLoading
            />
        )
        await user.click(
            screen.getByRole('button', {
                name: /disabled accessible search/i,
            })
        )

        expect(screen.queryByRole('status')).not.toBeInTheDocument()
        expect(
            document.querySelector('[aria-busy="true"]')
        ).not.toBeInTheDocument()
    })

    it('announces empty and refreshed controlled result states', async () => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'lg',
            innerWidth: 1280,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)

        const renderSelect = (resultItems: typeof items) => (
            <SingleSelect
                placeholder="Result announcements"
                items={resultItems}
                selected=""
                onSelect={() => {}}
                searchText="app"
                onSearchChange={() => {}}
                emptyStateText="Start typing to search"
            />
        )
        const { user, rerender } = render(renderSelect([]))
        await user.click(
            screen.getByRole('button', { name: /result announcements/i })
        )

        expect(screen.getByRole('status')).toHaveTextContent(
            'Start typing to search'
        )

        rerender(renderSelect(items))

        expect(screen.getByRole('status')).toHaveTextContent(
            'Search results updated'
        )
    })
})
