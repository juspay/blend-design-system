import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import MultiSelect from '../../../lib/components/MultiSelect/MultiSelect'
import type { MultiSelectMenuGroupType } from '../../../lib/components/MultiSelect/types'

const createBasicItems = (): MultiSelectMenuGroupType[] => [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' },
        ],
    },
]

describe('MultiSelect menuFooter', () => {
    it('renders menuFooter content when provided', async () => {
        const { user } = render(
            <MultiSelect
                label="Footer"
                placeholder="Footer"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /footer/i }))
        expect(
            await screen.findByRole('button', { name: /create new/i })
        ).toBeInTheDocument()
    })

    it('does not render menuFooter when not provided', async () => {
        const { user } = render(
            <MultiSelect
                label="No footer"
                placeholder="No footer"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
            />
        )
        await user.click(screen.getByRole('button', { name: /no footer/i }))
        await waitFor(() => {
            expect(
                screen.queryByRole('button', { name: /create new/i })
            ).not.toBeInTheDocument()
        })
    })

    it('clicking menuFooter does not close the menu or trigger selection', async () => {
        const onFooterClick = vi.fn()
        const onChange = vi.fn()
        const { user } = render(
            <MultiSelect
                label="Footer click"
                placeholder="Footer click"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={onChange}
                menuFooter={<button onClick={onFooterClick}>Create new</button>}
            />
        )
        const trigger = screen.getByRole('button', {
            name: /footer click/i,
        })
        await user.click(trigger)
        const footerBtn = await screen.findByRole('button', {
            name: /create new/i,
        })
        await user.click(footerBtn)
        expect(onFooterClick).toHaveBeenCalled()
        expect(onChange).not.toHaveBeenCalled()
        await waitFor(() => {
            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })
    })

    it('menuFooter stays visible when list is empty', async () => {
        const { user } = render(
            <MultiSelect
                label="Empty footer"
                placeholder="Empty footer"
                items={[]}
                selectedValues={[]}
                onChange={() => {}}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /empty footer/i }))
        expect(
            await screen.findByRole('button', { name: /create new/i })
        ).toBeInTheDocument()
    })

    it('menuFooter renders alongside primaryAction', async () => {
        const { user } = render(
            <MultiSelect
                label="Both"
                placeholder="Both"
                items={createBasicItems()}
                selectedValues={[]}
                onChange={() => {}}
                primaryAction={{ text: 'Apply', onClick: () => {} }}
                menuFooter={<button>Create new</button>}
            />
        )
        await user.click(screen.getByRole('button', { name: /both/i }))
        expect(
            await screen.findByRole('button', { name: /apply/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /create new/i })
        ).toBeInTheDocument()
    })
})
